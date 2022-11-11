import React, { useState } from "react";
import { useAuth } from "../context/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

function NewUser() {
  const { register } = useAuth();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [profilepic, setProfilepic] = useState();

  function handleSubmit(e) {
    e.preventDefault();

    register({ username, email, password, Avatar: profilepic });
  }

  return (
    <div>
      <header>
        <h1>Throw Down</h1>
        <h2>Get your game on!</h2>
      </header>
      <div className="flex">
        <span className="content">
          <h3 className="signup">
            <Link to="/">Previous page</Link>
          </h3>
          <Form className="signup">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter email"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setProfilepic(e.target.files[0])}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </span>
      </div>
    </div>
  );
}

export default NewUser;
