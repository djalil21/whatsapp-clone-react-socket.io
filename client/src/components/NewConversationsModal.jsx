/* eslint-disable react/prop-types */
import { Button, Form, Modal } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useState } from "react";
import { useConversations } from "../contexts/ConversationsProvider";

const NewConversationsModal = ({ handleClose }) => {
  const { contacts } = useContacts();
  const [selectedContacts, setSelectedContacts] = useState([]);

  const { createConversation } = useConversations();

  const handleCheckbox = (id) => {
    setSelectedContacts((prev) => {
      if (prev.includes(id)) {
        return prev.filter((prevId) => prevId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createConversation(selectedContacts);
    handleClose();
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Create Conversation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} id="form1">
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContacts.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckbox(contact.id)}
              />
            </Form.Group>
          ))}
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

export default NewConversationsModal;
