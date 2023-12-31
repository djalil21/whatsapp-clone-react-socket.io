import { ListGroup } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";

const Contacts = () => {
  const { contacts } = useContacts();
  return (
    <ListGroup variant="flush">
      {contacts.map((item) => (
        <ListGroup.Item key={item.id}>
          {item.id} {item.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Contacts;
