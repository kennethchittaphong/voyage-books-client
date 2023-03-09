import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, Typography, CardMedia, Button,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function PostDetails({ postObj }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.cardContainer}>
        <h3>{postObj.title}</h3>
        <h5>{postObj.location}</h5>
        <Button>Subscribe</Button>
        <Card className={classes.card}>{typeof postObj.image === 'string' && <CardMedia className={classes.media} image={postObj.image} title={postObj.title} />}</Card>
      </div>
      <div className={classes.descriptionContainer}>
        <Typography variant="body" color="textSecondary">
          {postObj.content}
        </Typography>
      </div>
    </div>
  );
}

PostDetails.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
};
