const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Posts');
const Profile = require('../../models/Profile');

// @route   POST api/posts
// @desc    Create a post
// @access  Private (token to be passed here for auth - logged in only)
router.post('/',
    [
        auth,
        [
            check('text', 'Text is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id       //connecting with the ObjectID of user who posted
            });

            const post = await newPost.save();
            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }
);


// @route   GET api/posts
// @desc    Get all posts
// @access  Private (token to be passed here for auth - logged in only)
// This is kept private so that user should sign up to see the posts and to connect with other devs
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   GET api/posts/:id
// @desc    Get post by Post ID 
// @access  Private (token to be passed here for auth - logged in only)
// This is kept private so that user should sign up to see the posts and to connect with other devs
router.get('/:id', auth, async (req, res) => {
    try {
        const posts = await Post.findById(req.params.id);
        if (!posts) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});


// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private (token to be passed here for auth - logged in only)
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Check if the loggedin user is the writer of the post
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await post.remove();
        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});


// LIKES

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private (token to be passed here for auth - logged in only)
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked by the curr user
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' });
        }

        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/posts/unlike/:id
// @desc    Like a post
// @access  Private (token to be passed here for auth - logged in only)
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked by the curr user
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post not yet liked' });
        }

        //Get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Add & Remove Comments

// @route   POST api/posts/comment/:id
// @desc    Comment a post
// @access  Private (token to be passed here for auth - logged in only)
router.post('/comment/:id',
    [
        auth,
        [
            check('text', 'Text is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.id);

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id       //connecting with the ObjectID of user who posted
            };

            post.comment.unshift(newComment);

            await post.save();
            res.json(post.comment);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Comment a post
// @access  Private (token to be passed here for auth - logged in only)
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        // const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        //Pull out the comment
        const comment = post.comment.find(comment => comment.id === req.params.comment_id);

        //Make sure comment exists
        if (!comment) {
            return res.status(404).json({ msg: "Comment doesn't exist" })
        }

        //Check User
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        //Get remove index
        const removeIndex = post.comment.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comment.splice(removeIndex, 1);
        await post.save();
        res.json(post.comment);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})




module.exports = router;