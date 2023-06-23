// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Users.css';

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// const Users: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([
//     { id: 1, name: 'John Doe', email: 'john@example.com' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
//     { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
//   ]);

//   return (
//     <div className="users-container">
//       <div className="sidebar">
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
//       </div>
//       <div className="users-content">
//         <h1>Users</h1>
//         <ul>
//           {users.map((user) => (
//             <li key={user.id}>
//               <div>Name: {user.name}</div>
//               <div>Email: {user.email}</div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Users;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Users.css';

interface User {
  id: number;
  name: string;
  email: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // Perform logout logic here
    // Set showLogoutModal to true to display the logout modal window
    setShowLogoutModal(true);
  };

  return (
    <div className="users-container">
      <div className="sidebar">
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
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
      <div className="users-content">
        <h1>Users</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <div>Name: {user.name}</div>
              <div>Email: {user.email}</div>
            </li>
          ))}
        </ul>
      </div>
      {showLogoutModal && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <h2>Logout Confirmation</h2>
            <p>Are you sure you want to logout?</p>
            <div className="logout-modal-actions">
              <button onClick={() => setShowLogoutModal(false)}>Cancel</button>
              <button onClick={() => handleLogout()}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
