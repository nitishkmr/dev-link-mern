import React, { Fragment, useEffect } from 'react';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/spinner';
import { useDispatch, useSelector } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
// import PostForm from './PostForm';

const Posts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts());
    }, []);

    // this useSelector after dispatch(getPosts) only
    const postFromState = useSelector(state => state.post);
    const {posts, loading} = postFromState;

    return loading ? <Spinner /> : <Fragment>
        <h1 className='large text-primary'>Posts</h1>
        <p className='lead'>
            <i className='fas fa-user' /> Welcome to the community
        </p>
        <PostForm />
        <div className='posts'>
            {posts.map(post => (
                <PostItem key={post._id} post={post} />
            ))}
        </div>
    </Fragment>
}

export default Posts;