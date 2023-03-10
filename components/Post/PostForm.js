/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPost, getPosts, updatePost } from '../../utils/data/postData';

const initialState = {
  title: '',
  location: '',
  photo_url: '',
  content: '',
};

function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getPosts().then(setPosts);
    if (obj) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.id) {
      const payload = {
        post_id: formInput.postId,
        title: formInput.title,
        location: formInput.location,
        photo_url: formInput.photoUrl,
        content: formInput.content,
        id: formInput.id,
        creation_date: obj.creationDate,
      };
      updatePost(payload).then(() => router.push('/'));
    } else {
      const payload = {
        post_id: formInput.postId,
        title: formInput.title,
        location: formInput.location,
        content: formInput.content,
        photo_url: formInput.photoUrl,
        uid: user.uid,
      };
      createPost(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{formInput.id ? 'Update' : 'Create'} a Post</h2>

      <FloatingLabel controlId="floatingInput1" label="Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter Title" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Location" className="mb-3">
        <Form.Control type="text" placeholder="Enter Location" name="location" value={formInput.location} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Upload Photo" className="mb-3">
        <Form.Control type="text" placeholder="Upload Photo URL" name="photoUrl" value={formInput.photoUrl} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="content" className="mb-3">
        <Form.Control type="text" placeholder="Enter Content" name="content" value={formInput.content} onChange={handleChange} required />
      </FloatingLabel>

      <Button type="submit">{formInput.id ? 'Update' : 'Create'} a Post</Button>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    location: PropTypes.string,
    photo_url: PropTypes.string,
    content: PropTypes.string,
    postId: PropTypes.string,
    creationDate: PropTypes.string,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};

export default PostForm;
