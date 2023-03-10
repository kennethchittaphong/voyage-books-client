/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { registerUser } from '../utils/auth'; // Update with path to registerUser
import { updateUser } from '../utils/data/userData';

const initialUserState = {
  firstName: '',
  lastName: '',
  about: '',
  email: '',
  profileImageUrl: '',
};
function RegisterForm({ user, onUpdate }) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialUserState);

  useEffect(() => {
    if (user.id) {
      setFormData(user);
    }
  }, [user, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('name, value ===', name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.id) {
      updateUser(formData, user.id);
      router.push(`../../users/${user.id}`);
    } else {
      registerUser(user, formData).then(() => onUpdate(user.uid));
    }
  };

  return (
    <>
      <h1>{user.id ? 'Edit User Profile' : 'Create User Profile'}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">

          <Form.Control name="firstName" placeholder="Enter your first name" required value={formData.firstName} onChange={handleChange} />

          <Form.Control name="lastName" placeholder="Enter your last name" required value={formData.lastName} onChange={handleChange} />

          <Form.Control name="profileImageUrl" placeholder="Add a photo image" required value={formData.profileImageUrl} onChange={handleChange} />

          <Form.Control name="about" as="textarea" placeholder="Share information about yourself" required value={formData.about} onChange={handleChange} />

          <Form.Control name="email" placeholder="Enter your email" required value={formData.email} onChange={handleChange} />

        </Form.Group>
        <Button variant="primary" type="submit">
          {user.id ? 'Update' : 'Submit'}
        </Button>
      </Form>
    </>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func,
};

export default RegisterForm;
