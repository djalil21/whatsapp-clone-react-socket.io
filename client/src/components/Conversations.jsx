import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

const Conversations = () => {
  const { conversations, setSelectedConversationIndex } = useConversations();
  return (
    <ListGroup variant="flush">
      {conversations.map((c, i) => (
        <ListGroupItem
          key={i}
          active={c.selected}
          action
          onClick={() => setSelectedConversationIndex(i)}
        >
          {c.recipients.map((r) => r.name).join(", ")}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default Conversations;
