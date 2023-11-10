import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";

const NewContactsModal = ({ handleClose }) => {
  const idRef = useRef();
  const nameRef = useRef();
  const { createContact } = useContacts();

  const handleSubmit = (e) => {
    e.preventDefault();
    createContact(idRef.current.value, nameRef.current.value);
    handleClose();
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Create Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} id="form1">
          <Form.Group>
            <Form.Label>Id: </Form.Label>
            <Form.Control type="text" ref={idRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name: </Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleClose}
          type="submit"
          form="form1"
        >
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
};

export default NewContactsModal;
