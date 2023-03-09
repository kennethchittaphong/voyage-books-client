import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  Card, CardActionArea, CardMedia, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function PostCard({ post }) {
  const router = useRouter();
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => router.push(`../posts/${post.id}`)}>
        <CardMedia className={classes.media} image={post?.image} title={post.title} />
        <Typography gutterBottom variant="h5" component="h2">
          {post.title}
          {post.location}
        </Typography>
      </CardActionArea>
    </Card>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,

  }).isRequired,
};
