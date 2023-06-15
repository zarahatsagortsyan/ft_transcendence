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
  const chatMessages: string[] = [];

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
