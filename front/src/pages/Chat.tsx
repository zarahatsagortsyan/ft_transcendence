
// // function Chat() {
// //     return (
// //         <h1>Barev</h1>
// //     );
// // }

// // export default Chat

// import React, { useState } from 'react';
// import './Chat.css';

// interface Message {
//   id: number;
//   text: string;
// }

// const Chat: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState('');

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setNewMessage(event.target.value);
//   };

//   const handleFormSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     if (newMessage.trim() === '') {
//       return;
//     }
//     const message: Message = {
//       id: Date.now(),
//       text: newMessage.trim(),
//     };
//     setMessages((prevMessages) => [...prevMessages, message]);
//     setNewMessage('');
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-messages">
//         {messages.map((message) => (
//           <div key={message.id} className="chat-message">
//             {message.text}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleFormSubmit} className="chat-form">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={handleInputChange}
//           placeholder="Enter your message"
//           className="chat-input"
//         />
//         <button type="submit" className="chat-button">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Chat;

// import React, { useState, useRef, useEffect } from 'react';
// import './Chat.css';

// interface ChatProps {
//   messages: string[];
// }

// const Chat: React.FC<ChatProps> = ({ messages = [] }) => {
//   const [inputValue, setInputValue] = useState('');
//   const chatContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(event.target.value);
//   };

//   const handleFormSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     if (inputValue.trim() !== '') {
//       addMessage(inputValue);
//       setInputValue('');
//     }
//   };

//   const addMessage = (message: string) => {
//     // Perform any necessary actions with the message, such as sending it to a server or updating the state in a parent component
//     console.log('New message:', message);
//   };

//   const scrollToBottom = () => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   };

//   return (
//     <div className="chat-container" ref={chatContainerRef}>
//       <div className="chat-messages">
//         {messages.map((message, index) => (
//           <div key={index} className="chat-message">
//             {message}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleFormSubmit} className="chat-form">
//         <input
//           type="text"
//           value={inputValue}
//           onChange={handleInputChange}
//           placeholder="Enter your message"
//           className="chat-input"
//         />
//         <button type="submit" className="chat-button">
//           Send
//         </button>
//       </form>
//     </div>
//   );

// };

// export default Chat;

// import React from 'react';
// import './Chat.css';

// interface ChatWindowProps {
//   messages: string[];
// }

// const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
//   return (
//     <div className="chat-window">
//       {messages.map((message, index) => (
//         <div key={index} className="chat-message">
//           {message}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ChatWindow;

// import React, { useState } from 'react';
// import './Chat.css';

// interface ChatProps {
//   messages: string[];
// }

// const Chat: React.FC<ChatProps> = ({ messages }) => {
//   const [newMessage, setNewMessage] = useState('');

//   const handleSend = () => {
//     if (newMessage.trim() !== '') {
//       // Add the new message to the existing messages array
//       const updatedMessages = [...messages, newMessage];
//       // Clear the input field
//       setNewMessage('');
//       // Perform any action with the updated messages array (e.g., send to a server)
//       console.log(updatedMessages);
//     }
//   };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setNewMessage(event.target.value);
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-window">
//         {messages.map((message, index) => (
//           <div key={index} className="chat-message">
//             {message}
//           </div>
//         ))}
//       </div>
//       <div className="chat-input">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={newMessage}
//           onChange={handleInputChange}
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

import React, { useState } from 'react';
import './Chat.css';

interface ChatProps {
  messages: string[];
}

const Chat: React.FC<ChatProps> = ({ messages }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messageList, setMessageList] = useState(messages);

  const handleSend = () => {
    if (newMessage.trim() !== '') {
      const updatedMessages = [...messageList, newMessage];
      setMessageList(updatedMessages);
      setNewMessage('');
      console.log(updatedMessages);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messageList.map((message, index) => (
          <div key={index} className="chat-message">
            {message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;



