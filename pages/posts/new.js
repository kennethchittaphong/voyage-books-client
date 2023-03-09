import React from 'react';
import { useAuth } from '../../utils/context/authContext';
import PostForm from '../../components/Post/PostForm';

export default function AddPost() {
  const { user } = useAuth();

  return (
    <PostForm user={user} />
  );
}
