// when a post is clicked - to open discussion on it

import React, { Fragment, useEffect } from 'react';
import { getPost } from '../../actions/post';
import Spinner from '../layout/spinner';
import { useDispatch, useSelector } from 'react-redux';
import PostItem from '../posts/PostItem'; //reusing it 
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost(props.match.params.id));
  }, []);
  const postFromState = useSelector(state => state.post);
  const {post, loading} = postFromState;

    return loading || post == null ? <Spinner /> : <Fragment>
    <Link to='/posts' className='btn'>Back to Posts</Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comment.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
} 

export default Post;