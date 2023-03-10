import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import PropTypes, { number, string } from 'prop-types';
import {
  Card, Typography, CardMedia, Button,
} from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { deletePost } from '../../utils/data/postData';
import { useAuth } from '../../utils/context/authContext';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 150,
  },
});

export default function PostDetails({ postObj }) {
  const { user } = useAuth();
  const router = useRouter();
  const [editToggle, setEditToggle] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const handleToggle = () => {
    if (editToggle === false) {
      setEditToggle(true);
    } else {
      setEditToggle(false);
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.cardContainer}>
        <h3>{postObj.title}</h3>
        <h5>{postObj.location}</h5>
        <Card className={classes.card}>
          {postObj.photoUrl && <CardMedia className={classes.media} image={postObj.photoUrl} title={postObj.title} />}
        </Card>
      </div>
      <div className={classes.descriptionContainer}>
        <Typography variant="body" color="textSecondary">
          {postObj.content}
        </Typography>
      </div>
      <Button>Subscribe</Button>
      <div>
        { postObj?.user?.id === user.id
              && (
              <div>
                <Link href={`/posts/edit/${postObj?.id}`} passHref>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </Link>
                <Button variant="link" startIcon={<DeleteIcon />} onClick={() => deletePost(postObj.id).then(() => router.push('/'))}>
                  DELETE
                </Button>
              </div>
              )}
        {postObj?.user?.id && (
        // eslint-disable-next-line @next/next/link-passhref
        <Link href={`/users/${postObj.user.id}`}>
          <span>Profile</span>
        </Link>
        )}

      </div>
    </div>
  );
}

PostDetails.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    photoUrl: PropTypes.string,
    location: PropTypes.string,
    user: PropTypes.shape({
      id: number,
      first_name: string,
      last_name: string,
    }),
  }).isRequired,
};
