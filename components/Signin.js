import React from 'react';
import {
  Navbar, Button, Container, Image,
} from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <Image
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Voyage Books
          </Navbar.Brand>
          <Button variant="danger" onClick={signIn}>
            Sign In
          </Button>
        </Container>
      </Navbar>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          margin: '0 auto',
          zIndex: 1,
          minHeight: '25rem',
          width: '100%',
          minWidth: '30rem',
          paddingBlock: '0 5rem',
        }}
      >
        <h1>Hello</h1>
        <p>Click the button below to login!</p>
        <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </>
  );
}

export default Signin;
