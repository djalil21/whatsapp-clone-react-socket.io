/* eslint-disable react/prop-types */
import { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { v4 as uuid } from "uuid";

const Login = ({ onIdSubmit }) => {
  const idRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    onIdSubmit(idRef.current.value);
  };

  const createNewID = () => {
    onIdSubmit(uuid());
  };
  return (
    <Container
      className="d-flex align-items-center"
      style={{ height: "100vh" }}
    >
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group className="mb-2">
          <Form.Label>Enter your id:</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
        <Button type="submit" className="me-2">
          login
        </Button>
        <Button variant="secondary" onClick={createNewID}>
          create new id
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
