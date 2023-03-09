import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteComment } from '../../utils/data/commentData';

export default function CommentCard({ commentObj, onUpdate }) {
  const deleteThisComment = () => {
    deleteComment(commentObj.id).then(() => {
      onUpdate();
      window.location.reload();
    });
  };

  return (
    <Card style={{ width: '25rem', margin: '5%' }}>
      <Card.Body>
        <h4> {commentObj.content}</h4>
        <h6>{commentObj.createdOn}</h6>
        <Link href={`/Posts/${commentObj.id}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/Posts/edit/${commentObj.id}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisComment} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    post_id: PropTypes.number,
    content: PropTypes.string,
    createdOn: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

CommentCard.defaultProps = {
  commentObj: PropTypes.shape({
    id: 1,
    post_id: 1,
    content: '',
    createdOn: '',
  }),
};
