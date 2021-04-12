const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'        // ref to users model
    },
    text: {
        type: String,
        required: true
    },
    name: {                     // name and avatar in posts model also as
        type: String            // if user gets deleted then also their posts can be there
    },
    avatar: {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comment: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {                     // name and avatar in posts model also as
                type: String            // if user gets deleted then also their posts can be there
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = Post = mongoose.model('post', PostSchema);