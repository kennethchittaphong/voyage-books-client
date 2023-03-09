import React from 'react';
// import Image from 'next/image';
// import { FiMenu } from 'react-icons/fi';
// import { AiOutlineUser } from 'react-icons/ai';
import {
  Navbar, Container, Image, Button,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';
import { signOut } from '../utils/auth';

export default function NavBar({ user }) {
  const router = useRouter();
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <Image
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Voyage Books
          </Navbar.Brand>

          <div className="profileAvatar">
            <Button
              className="avatarButton"
              onClick={() => (
                router.push(`/users/${user.id}`)
              )}
            >
              <Avatar src={user?.profile_image_url} />
            </Button>
          </div>

          <Button variant="danger" onClick={signOut}>
            Sign out
          </Button>

        </Container>
      </Navbar>
    </>
  );
}

NavBar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired,
    profile_image_url: PropTypes.string.isRequired,
  }).isRequired,
};
