import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PostForm from '../../../components/Post/PostForm';
import { getSinglePost } from '../../../utils/data/postData';

export default function EditPet() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { postId } = router.query;

  useEffect(() => {
    getSinglePost(postId).then(setEditItem);
  }, [postId]);

  return (<PostForm obj={editItem} />);
}
