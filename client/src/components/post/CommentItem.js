import React, { Fragment } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment } from '../../actions/post';

const CommentItem = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    postId,
    comment: { _id, text, name, avatar, user, date },
  } = props;

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => dispatch(deleteComment(postId, _id))}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
