/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getPosts } from '../utils/data/postData';
import PostCard from '../components/Post/PostCard';
import PostSearch from '../components/Post/PostSearch';

function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const getAllPosts = () => {
    getPosts().then((postArr) => {
      setPosts(postArr);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <div className="text-center my-4">
        <div className="addIcon">
          <Link passHref href="/posts/new">
            <AddIcon />
          </Link>
        </div>
        <PostSearch posts={posts} setFilteredPosts={setFilteredPosts} />
        <div className="d-flex flex-wrap">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onUpdate={getAllPosts} />
          ))}
        </div>

      </div>
    </>
  );
}

export default Home;
