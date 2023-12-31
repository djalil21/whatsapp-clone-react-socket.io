/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";

function arrayEquality(a, b) {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
}

const ConversationsContext = createContext();

export const useConversations = () => {
  return useContext(ConversationsContext);
};

export const ConversationsProvider = ({ children, id }) => {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();
  const socket = useSocket();
  const createConversation = (recipients) => {
    setConversations((prev) => [...prev, { recipients, messages: [] }]);
  };

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prev) => {
        let madeChange = false;
        const newMessage = { sender, text };
        const newConversations = prev.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [...prev, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket == null) return;

    socket.on("receive-message", addMessageToConversation);

    return () => socket.off("receive-message");
  }, [socket, addMessageToConversation]);

  const sendMessage = (recipients, text) => {
    socket.emit("send-message", { recipients, text });
    addMessageToConversation({ recipients, text, sender: id });
  };

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      return { ...message, senderName: name, fromMe };
    });

    const selected = index === selectedConversationIndex;

    return { ...conversation, messages, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    createConversation,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    setSelectedConversationIndex,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};
