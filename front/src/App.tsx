// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { Routes, Route} from "react-router-dom"
// import { Container } from 'react-bootstrap'
// // import { Login } from "./pages/Login"
// import Login from "./pages/Login"
// import SetNick from "./pages/SetNick"
// import Profile from "./pages/Profile"
// import Chat from "./pages/Chat"
// import Game from "./pages/Game"


// function App() {
  
//   return <Container>
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/setnick" element={<SetNick />} />
//       <Route path="/profile" element={<Profile />} />
//       <Route path="/profile/chat" element={<Chat />} />
//       <Route path="/profile/game" element={<Game />} />
//     </Routes>
//   </Container>
// }

// export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Login from './pages/Login';
import SetNick from './pages/SetNick';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Game from './pages/Game';

function App() {
  // Dummy chat messages for testing
  const chatMessages: { [channelName: string]: string[] } = {};

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/setnick" element={<SetNick />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/chat" element={<Chat messages={chatMessages} />} />
        <Route path="/profile/game" element={<Game />} />
      </Routes>
    </Container>
  );
}

export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Container } from 'react-bootstrap';
// import Login from './pages/Login';
// import SetNick from './pages/SetNick';
// import Profile from './pages/Profile';
// import Chat from './pages/Chat';
// import Game from './pages/Game';

// function App() {
//   // Dummy chat messages for testing
//   const chatMessages: string[] = [];

//   return (
//     <Container>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/setnick" element={<SetNick />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/profile/chat" element={<Chat messages={chatMessages} />} />
//           <Route path="/profile/game" element={<Game />} />
//         </Routes>
//       </Router>
//     </Container>
//   );
// }

// export default App;


// import React, { useState, useEffect } from 'react';

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// const App: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch('/api/users');
//       const data = await response.json();
//       setUsers(data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Users</h1>
//       <ul>
//         {users.map(user => (
//           <li key={user.id}>
//             {user.name} - {user.email}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;
