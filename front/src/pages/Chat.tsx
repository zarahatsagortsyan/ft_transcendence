
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

// import React, { useState } from 'react';
// import './Chat.css';

// interface ChatProps {
//   messages: string[];
// }

// const Chat: React.FC<ChatProps> = ({ messages }) => {
//   const [newMessage, setNewMessage] = useState('');
//   const [messageList, setMessageList] = useState(messages);

//   const handleSend = () => {
//     if (newMessage.trim() !== '') {
//       const updatedMessages = [...messageList, newMessage];
//       setMessageList(updatedMessages);
//       setNewMessage('');
//       console.log(updatedMessages);
//     }
//   };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setNewMessage(event.target.value);
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-window">
//         {messageList.map((message, index) => (
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
//           onKeyDown={handleKeyDown}
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

// import React, { useState } from 'react';
// import './Chat.css';

// interface ChatProps {
//   messages: string[];
// }

// const Chat: React.FC<ChatProps> = ({ messages }) => {
//   const [newMessage, setNewMessage] = useState('');
//   const [messageList, setMessageList] = useState(messages);
//   const [channelList, setChannelList] = useState<string[]>([]);

//   const handleSend = () => {
//     if (newMessage.trim() !== '') {
//       const updatedMessages = [...messageList, newMessage];
//       setMessageList(updatedMessages);
//       setNewMessage('');
//       console.log(updatedMessages);
//     }
//   };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setNewMessage(event.target.value);
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       handleSend();
//     }
//   };

//   const handleChannelAdd = (channelName: string, isPrivate: boolean) => {
//     // Logic to add a new channel to the channelList
//     const channelType = isPrivate ? 'Private' : 'Public';
//     const newChannel = `${channelType} - ${channelName}`;
//     setChannelList([...channelList, newChannel]);
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-sidebar">
//         <div className="search-line">
//           <input type="text" placeholder="Search" />
//         </div>
//         <div className="channel-list">
//           <h3>Channels</h3>
//           {channelList.map((channel, index) => (
//             <div key={index} className="channel-item">
//               {channel}
//             </div>
//           ))}
//           <div className="add-channel">
//             <input type="text" placeholder="Channel Name" />
//             <label>
//               Private:
//               <input type="checkbox" />
//             </label>
//             <button>Add Channel</button>
//           </div>
//         </div>
//       </div>
//       <div className="chat-window">
//         {messageList.map((message, index) => (
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
//           onKeyDown={handleKeyDown}
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

// import React, { useState } from 'react';
// import './Chat.css';

// interface ChatProps {
//   messages: string[];
// }

// interface Channel {
//   name: string;
//   isPrivate: boolean;
//   password?: string;
// }

// const Chat: React.FC<ChatProps> = ({ messages }) => {
//   const [newMessage, setNewMessage] = useState('');
//   const [messageList, setMessageList] = useState(messages);
//   const [channelList, setChannelList] = useState<Channel[]>([]);
//   const [showAddChannel, setShowAddChannel] = useState(false);
//   const [newChannelName, setNewChannelName] = useState('');
//   const [isPrivateChannel, setIsPrivateChannel] = useState(false);
//   const [channelPassword, setChannelPassword] = useState('');
//   const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

//   const handleSend = () => {
//     if (newMessage.trim() !== '') {
//       const updatedMessages = [...messageList, newMessage];
//       setMessageList(updatedMessages);
//       setNewMessage('');
//       console.log(updatedMessages);
//       if (selectedChannel) {
//         // Perform logic to send message to the selected channel
//         console.log(`Sending message "${newMessage}" to channel: ${selectedChannel.name}`);
//       }
//     }
//   };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setNewMessage(event.target.value);
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       // Find the channel by name
//       const channel = channelList.find(channel => channel.name === event.currentTarget.value);
//       if (channel) {
//         setSelectedChannel(channel);
//       } else {
//         setSelectedChannel(null);
//       }
//     }
//   };

//   const handleToggleAddChannel = () => {
//     setShowAddChannel(!showAddChannel);
//     setNewChannelName('');
//     setIsPrivateChannel(false);
//     setChannelPassword('');
//   };

//   const handleNewChannelNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setNewChannelName(event.target.value);
//   };

//   const handleIsPrivateChannelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setIsPrivateChannel(event.target.checked);
//   };

//   const handleChannelPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setChannelPassword(event.target.value);
//   };

//   const handleAddChannel = () => {
//     const newChannel: Channel = {
//       name: newChannelName,
//       isPrivate: isPrivateChannel,
//       password: isPrivateChannel ? channelPassword : undefined,
//     };
//     setChannelList([...channelList, newChannel]);
//     handleToggleAddChannel();
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-sidebar">
//         <div className="search-line">
//           <input type="text" placeholder="Search" onKeyDown={handleKeyDown} />
//         </div>
//         <div className="channel-list">
//           <h3>Channels</h3>
//           {channelList.map((channel, index) => (
//             <div
//               key={index}
//               className={`channel-item ${selectedChannel === channel ? 'selected' : ''}`}
//               onClick={() => setSelectedChannel(channel)}
//             >
//               {channel.name}
//             </div>
//           ))}
//           <div className="add-channel">
//             {!showAddChannel ? (
//               <button onClick={handleToggleAddChannel}>+ Add Channel</button>
//             ) : (
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Channel Name"
//                   value={newChannelName}
//                   onChange={handleNewChannelNameChange}
//                 />
//                 <label>
//                   Private:
//                   <input type="checkbox" checked={isPrivateChannel} onChange={handleIsPrivateChannelChange} />
//                 </label>
//                 {isPrivateChannel && (
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     value={channelPassword}
//                     onChange={handleChannelPasswordChange}
//                   />
//                 )}
//                 <button onClick={handleAddChannel}>Add Channel</button>
//                 <button onClick={handleToggleAddChannel}>Cancel</button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="chat-window">
//         {selectedChannel ? (
//           <div>
//             <h3>{selectedChannel.name}</h3>
//             {messageList.map((message, index) => (
//               <div key={index} className="chat-message">
//                 {message}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div>Please select a channel to view messages.</div>
//         )}
//       </div>
//       <div className="chat-input">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={newMessage}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Chat.css';

// interface ChatProps {
//   messages: { [channelName: string]: string[] };
// }

// interface Channel {
//   name: string;
//   isPrivate: boolean;
//   password?: string;
// }

// const Chat: React.FC<ChatProps> = ({ messages }) => {
//   const [newMessage, setNewMessage] = useState('');
//   const [channelList, setChannelList] = useState<Channel[]>([]);
//   const [showAddChannel, setShowAddChannel] = useState(false);
//   const [newChannelName, setNewChannelName] = useState('');
//   const [isPrivateChannel, setIsPrivateChannel] = useState(false);
//   const [channelPassword, setChannelPassword] = useState('');
//   const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSend = () => {
//     if (newMessage.trim() !== '') {
//       if (selectedChannel) {
//         const updatedMessages = {
//           ...messages,
//           [selectedChannel.name]: [...(messages[selectedChannel.name] || []), newMessage],
//         };
//         setNewMessage('');
//         console.log(updatedMessages);
//       }
//     }
//   };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setNewMessage(event.target.value);
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       const channel = channelList.find((channel) => channel.name === event.currentTarget.value);
//       if (channel) {
//         setSelectedChannel(channel);
//       } else {
//         setSelectedChannel(null);
//       }
//     }
//   };

//   const handleToggleAddChannel = () => {
//     setShowAddChannel(!showAddChannel);
//     setNewChannelName('');
//     setIsPrivateChannel(false);
//     setChannelPassword('');
//   };

//   const handleNewChannelNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setNewChannelName(event.target.value);
//   };

//   const handleIsPrivateChannelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setIsPrivateChannel(event.target.checked);
//   };

//   const handleChannelPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setChannelPassword(event.target.value);
//   };

//   const handleAddChannel = () => {
//     const newChannel: Channel = {
//       name: newChannelName,
//       isPrivate: isPrivateChannel,
//       password: isPrivateChannel ? channelPassword : undefined,
//     };
//     setChannelList([...channelList, newChannel]);
//     setSelectedChannel(newChannel);
//     setNewChannelName('');
//     setIsPrivateChannel(false);
//     setChannelPassword('');
//   };

//   const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredChannels = channelList.filter((channel) =>
//     channel.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="chat-container">
//       <div className="chat-sidebar">
//         <ul>
//           <li>
//             <Link to="/profile">Profile</Link>
//           </li>
//           <li>
//             <Link to="/profile/chat">Chat</Link>
//           </li>
//           <li>
//             <Link to="/profile/game">Game</Link>
//           </li>
//           <li>
//             <Link to="/profile/users">Users</Link>
//           </li>
//           <li>
//             <Link to="/logout">Logout</Link>
//           </li>
//         </ul>
//         <div className="search-line">
//           <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchQueryChange} />
//         </div>
//         <div className="channel-list">
//           <h3>Channels</h3>
//           {filteredChannels.map((channel, index) => (
//             <div
//               key={index}
//               className={`channel-item ${selectedChannel === channel ? 'selected' : ''}`}
//               onClick={() => setSelectedChannel(channel)}
//             >
//               {channel.name}
//             </div>
//           ))}
//           <div className="add-channel">
//             {!showAddChannel ? (
//               <button onClick={handleToggleAddChannel}>+ Add Channel</button>
//             ) : (
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Channel Name"
//                   value={newChannelName}
//                   onChange={handleNewChannelNameChange}
//                 />
//                 <label>
//                   Private:
//                   <input type="checkbox" checked={isPrivateChannel} onChange={handleIsPrivateChannelChange} />
//                 </label>
//                 {isPrivateChannel && (
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     value={channelPassword}
//                     onChange={handleChannelPasswordChange}
//                   />
//                 )}
//                 <button onClick={handleAddChannel}>Add Channel</button>
//                 <button onClick={handleToggleAddChannel}>Cancel</button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="chat-window">
//         {selectedChannel ? (
//           <div>
//             <h3>{selectedChannel.name}</h3>
//             {messages[selectedChannel.name]?.map((message, index) => (
//               <div key={index} className="chat-message">
//                 {message}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div>Please select a channel to view messages.</div>
//         )}
//       </div>
//       <div className="chat-input">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={newMessage}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

// __________________________________________________________

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Chat.css';

interface ChatProps {
  messages: { [channelName: string]: string[] };
}

interface Channel {
  name: string;
  isPrivate: boolean;
  password?: string;
}

const Chat: React.FC<ChatProps> = ({ messages }) => {
  const [newMessage, setNewMessage] = useState('');
  const [channelList, setChannelList] = useState<Channel[]>([]);
  const [showAddChannel, setShowAddChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [isPrivateChannel, setIsPrivateChannel] = useState(false);
  const [channelPassword, setChannelPassword] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // const updateMessages = (updatedMessages: { [channelName: string]: string[] }) => {
  //   // Update the messages state
  //   setMessages({ ...updatedMessages });
  // };

  // const setMessages = (updatedMessages: { [channelName: string]: string[] }) => {
  //   // Update the messages state
  //   updateMessages(updatedMessages);
  // };
  
  const updateMessages = (updatedMessages: { [channelName: string]: string[] }) => {
    // Update the messages state directly
    setMessages({ ...updatedMessages });
  };
  
  const setMessages = (updatedMessages: { [channelName: string]: string[] }) => {
    // Call the updateMessages function
    updateMessages(updatedMessages);
  };
  

  const handleSend = () => {
    if (newMessage.trim() !== '') {
      if (selectedChannel) {
        const updatedMessages = {
          ...messages,
          [selectedChannel.name]: [...(messages[selectedChannel.name] || []), newMessage],
        };
        setNewMessage('');
        updateMessages(updatedMessages);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const channel = channelList.find((channel) => channel.name === event.currentTarget.value);
      if (channel) {
        setSelectedChannel(channel);
      } else {
        setSelectedChannel(null);
      }
    }
  };

  const handleToggleAddChannel = () => {
    setShowAddChannel(!showAddChannel);
    setNewChannelName('');
    setIsPrivateChannel(false);
    setChannelPassword('');
  };

  const handleNewChannelNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewChannelName(event.target.value);
  };

  const handleIsPrivateChannelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPrivateChannel(event.target.checked);
  };

  const handleChannelPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChannelPassword(event.target.value);
  };

  const handleAddChannel = () => {
    const newChannel: Channel = {
      name: newChannelName,
      isPrivate: isPrivateChannel,
      password: isPrivateChannel ? channelPassword : undefined,
    };
    setChannelList([...channelList, newChannel]);
    setSelectedChannel(newChannel);
    setShowAddChannel(false);
  };

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredChannels = channelList.filter((channel) =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/profile/chat">Chat</Link>
          </li>
          <li>
            <Link to="/profile/game">Game</Link>
          </li>
          <li>
            <Link to="/profile/users">Users</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
        <div className="search-line">
          <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchQueryChange} />
        </div>
        <div className="channel-list">
          <h3>Channels</h3>
          {filteredChannels.map((channel, index) => (
            <div
              key={index}
              className={`channel-item ${selectedChannel === channel ? 'selected' : ''}`}
              onClick={() => setSelectedChannel(channel)}
            >
              {channel.name}
            </div>
          ))}
          <div className="add-channel">
            {!showAddChannel ? (
              <button onClick={handleToggleAddChannel}>+ Add Channel</button>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="Channel Name"
                  value={newChannelName}
                  onChange={handleNewChannelNameChange}
                />
                <label>
                  Private:
                  <input type="checkbox" checked={isPrivateChannel} onChange={handleIsPrivateChannelChange} />
                </label>
                {isPrivateChannel && (
                  <input
                    type="password"
                    placeholder="Password"
                    value={channelPassword}
                    onChange={handleChannelPasswordChange}
                  />
                )}
                <button onClick={handleAddChannel}>Add Channel</button>
                <button onClick={handleToggleAddChannel}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="chat-window">
        {selectedChannel ? (
          <div>
            <h3>{selectedChannel.name}</h3>
            <div className="chat-messages">
              {messages[selectedChannel.name]?.map((message, index) => (
                <div key={index} className="chat-message">
                  {message}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>Please select a channel to view messages.</div>
        )}
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


