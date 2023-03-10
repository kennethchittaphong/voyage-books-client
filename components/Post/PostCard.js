/* eslint-disable @next/next/no-img-element */
import {
  ImageList, ImageListItemBar, ImageListItem, CardActionArea, Container,
} from '@mui/material';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';

export default function PostCard({ post }) {
  const router = useRouter();
  return (
    <Container>
      <ImageList sx={{ width: 700, height: 450 }}>
        <CardActionArea onClick={() => router.push(`../posts/${post.id}`)}>
          <ImageListItem key={post.photo_url}>
            <img
              src={post.photo_url}
              alt={post.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={post.title}
              subtitle={post.location}
              position="below"
            />
          </ImageListItem>
        </CardActionArea>
      </ImageList>
    </Container>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    photo_url: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
};
