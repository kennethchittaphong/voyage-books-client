/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getPostsByUser } from '../../utils/data/postData';
import PostCard from '../../components/Post/PostCard';
import UserCard from '../../components/UserCard';
import { getSingleUser } from '../../utils/data/userData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewSingleUser() {
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuth();
  const [posts, setPosts] = useState();
  const router = useRouter();
  const { userId } = router.query;
  const [singleUser, setSingleUser] = useState(null);

  const getTheUser = () => {
    getSingleUser(userId).then(setSingleUser);
    getPostsByUser(userId).then(setPosts);
  };

  useEffect(() => {
    getTheUser();
  }, [router]);

  return (
    <>
      <div>
        {singleUser && (<UserCard userObj={singleUser} />)}
      </div>
      <hr />
      <div>
        {posts?.map((post) => (<PostCard key={post.id} post={post} onUpdate={getTheUser} />))}
      </div>
    </>
  );
}
