/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Button, Link } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getPosts } from '../utils/data/postData';
import PostCard from '../components/Post/PostCard';
import PostSearch from '../components/Post/PostSearch';
import { getSubscribesByUser } from '../utils/data/subscriberData';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const { user } = useAuth();
  const [load, setLoad] = useState(false);

  const getAllPosts = () => {
    getPosts().then((postArr) => {
      setPosts(postArr);
      // setFilteredPosts(postArr);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    if (user && user.id) {
      getSubscribesByUser(user.id).then((data) => {
        setSubscribers(data);
      });
    }
  }, [user]);

  const filterPostFunc = () => {
    const data = posts.filter((post) => subscribers.some((subscriber) => post.user.id === subscriber.subscribed.id));
    setFilteredPosts(data);
  };

  return (
    <>
      <div className="text-center my-4">
        <div className="addIcon">
          <Link passHref href="/posts/new">
            <AddIcon />
            Create
          </Link>
        </div>
        {/* <Link passHref href="/posts/subscription/{postId}"> */}
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            filterPostFunc();
            setLoad(!load);
          }}
        >
          Subscriptions
        </Button>
        {/* </Link> */}

        <PostSearch posts={posts} setFilteredPosts={setFilteredPosts} />
        <div className="d-flex flex-wrap">
          {load ? filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} onUpdate={getAllPosts} />
          )) : posts.map((post) => (
            <PostCard key={post.id} post={post} onUpdate={getAllPosts} />
          ))}
        </div>

      </div>
    </>
  );
}

export default Home;
