/* eslint-disable react/prop-types */
import { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import NewConversationsModal from "./NewConversationsModal";
import NewContactsModal from "./NewContactsModal";

const Sidebar = ({ id }) => {
  const [activeKey, setActiveKey] = useState("conversations");
  const conversationsIsOpen = activeKey === "conversations";

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey="conversations">Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="contacts">Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-end overflow-auto flex-grow-1">
          <Tab.Pane eventKey="conversations">
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey="contacts">
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="border-top border-end small p-2">
          Your Id: <span className="text-muted">{id}</span>
        </div>
        <Button className="rounded-0" onClick={handleShow}>
          New {conversationsIsOpen ? "Conversation" : "Contacts"}
        </Button>
      </Tab.Container>

      <Modal show={show} onHide={handleClose}>
        {conversationsIsOpen ? (
          <NewConversationsModal handleClose={handleClose} />
        ) : (
          <NewContactsModal handleClose={handleClose} />
        )}
      </Modal>
    </div>
  );
};

export default Sidebar;
