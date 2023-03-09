/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CommentForm from '../../components/Comments/CommentForm';
import CommentCard from '../../components/Comments/CommentCard';
import { getAllCommentsByPost } from '../../utils/data/commentData';
import PostDetails from '../../components/Post/PostDetails';

export default function ViewSinglePost() {
  const [postDetails, setPostDetails] = useState({});
  const router = useRouter();
  const { postId } = router.query;
  const [comments, setComments] = useState([]);

  const getAndSetComments = () => {
    getAllCommentsByPost(postId).then(setComments);
  };

  useEffect(() => {
    getAndSetComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  return (
    <div className="d-flex flex-wrap justify-content-between flex-column">
      <div>
        <PostDetails postObj={postDetails} />
      </div>
      <div>
        <CommentForm postId={postDetails.id} getAndSetComments={getAndSetComments} />
        {comments?.map((comment) => (
          <CommentCard commentObj={comment} key={comment.id} getAndSetComments={getAndSetComments} />
        ))}
      </div>
    </div>
  );
}
