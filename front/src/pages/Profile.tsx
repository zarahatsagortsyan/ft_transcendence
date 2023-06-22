// export default function Profile() {
//     return (
//         <nav>
//           <ul>
//             <li>
//               <a href="/">Home</a>
//             </li>
//             <li>
//               <a href="/about">About</a>
//             </li>
//             <li>
//               <a href="/contact">Contact</a>
//             </li>
//           </ul>
//         </nav>
//       );
// }

// ProfilePage.tsx

// ProfilePage.tsx
// -------------------
// import React, { useState } from 'react';
// import './Profile.css'; // Import CSS file for styling

// interface ProfilePageProps {
//   // Define any required props for the ProfilePage component
// }

// const ProfilePage: React.FC<ProfilePageProps> = () => {
//   const [profilePic, setProfilePic] = useState<string>(''); // State for profile picture
//   const [name, setName] = useState<string>(''); // State for name
//   const [nickname, setNickname] = useState<string>(''); // State for nickname
//   const [twoFactorAuth, setTwoFactorAuth] = useState<boolean>(false); // State for two-factor authentication

//   const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     // Handle profile picture change logic
//     const file = event.target.files?.[0];
//     if (file) {
//       // Perform necessary operations such as uploading the file to a server and updating the profilePic state
//       const imageUrl = URL.createObjectURL(file);
//       setProfilePic(imageUrl);
//     }
//   };

//   const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     // Handle name change logic
//     const value = event.target.value;
//     setName(value);
//   };

//   const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     // Handle nickname change logic
//     const value = event.target.value;
//     setNickname(value);
//   };

//   const handleTwoFactorAuthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     // Handle two-factor authentication change logic
//     const value = event.target.checked;
//     setTwoFactorAuth(value);
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     // Handle form submission logic, such as sending updated profile data to a server
//     console.log('Profile updated:', { profilePic, name, nickname, twoFactorAuth });
//   };

//   return (
//     <div className="profile-page">
//       <h1>Profile Page</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Profile Picture:</label>
//           <input type="file" accept="image/*" onChange={handleProfilePicChange} />
//           {profilePic && <img src={profilePic} alt="Profile" className="profile-pic" />}
//         </div>
//         <div className="form-group">
//           <label>Name:</label>
//           <input type="text" value={name} onChange={handleNameChange} />
//         </div>
//         <div className="form-group">
//           <label>Nickname:</label>
//           <input type="text" value={nickname} onclear={handleNicknameChange} />
//         </div>
//         <div className="form-group">
//           <label>
//             Two-Factor Authentication:
//             <input type="checkbox" checked={twoFactorAuth} onChange={handleTwoFactorAuthChange} />
//           </label>
//         </div>
//         <button type="submit" className="btn-submit">Save</button>
//       </form>
//     </div>
//   );
// };

// export default ProfilePage;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Profile.css'; // Import CSS file for styling

// interface ProfileProps {
//   // Define any required props for the ProfilePage component
// }

// const Profile: React.FC<ProfileProps> = () => {
//   const [profilePic, setProfilePic] = useState<string>(''); // State for profile picture
//   const [name, setName] = useState<string>(''); // State for name
//   const [nickname, setNickname] = useState<string>(''); // State for nickname
//   const [twoFactorAuth, setTwoFactorAuth] = useState<boolean>(false); // State for two-factor authentication

//   const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     // Handle profile picture change logic
//     const file = event.target.files?.[0];
//     if (file) {
//       // Perform necessary operations such as uploading the file to a server and updating the profilePic state
//       const imageUrl = URL.createObjectURL(file);
//       setProfilePic(imageUrl);
//     }
//   };

//   const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     // Handle name change logic
//     const value = event.target.value;
//     setName(value);
//   };

//   const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     // Handle nickname change logic
//     const value = event.target.value;
//     setNickname(value);
//   };

//   const handleTwoFactorAuthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     // Handle two-factor authentication change logic
//     const value = event.target.checked;
//     setTwoFactorAuth(value);
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     // Handle form submission logic, such as sending updated profile data to a server
//     console.log('Profile updated:', { profilePic, name, nickname, twoFactorAuth });
//   };

//   return (
//     <div className="profile-page">
//       <h1>Profile Page</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Profile Picture:</label>
//           <input type="file" accept="image/*" onChange={handleProfilePicChange} />
//           {profilePic && <img src={profilePic} alt="Profile" className="profile-pic" />}
//         </div>
//         <div className="form-group">
//           <label>Name:</label>
//           <input type="text" value={name} onChange={handleNameChange} />
//         </div>
//         <div className="form-group">
//           <label>Nickname:</label>
//           <input type="text" value={nickname} onChange={handleNicknameChange} />
//         </div>
//         <div className="form-group">
//           <label>
//             Two-Factor Authentication:
//             <input type="checkbox" checked={twoFactorAuth} onChange={handleTwoFactorAuthChange} />
//           </label>
//         </div>
//         <button type="submit" className="btn-submit">Save</button>
//       </form>

//       <div className="button-group">
//         <Link to="/profile/chat" className="btn btn-chat">Chat</Link>
//         <Link to="/profile/game" className="btn btn-game">Game</Link>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Switch } from 'antd';
import './Profile.css'; // Import CSS file for styling

interface ProfileProps {
  // Define any required props for the Profile component
}

const Profile: React.FC<ProfileProps> = () => {
  const [profilePic, setProfilePic] = useState<string>(''); // State for profile picture
  const [name, setName] = useState<string>(''); // State for name
  const [nickname, setNickname] = useState<string>(''); // State for nickname
  const [twoFactorAuth, setTwoFactorAuth] = useState<boolean>(false); // State for two-factor authentication

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle profile picture change logic
    const file = event.target.files?.[0];
    if (file) {
      // Perform necessary operations such as uploading the file to a server and updating the profilePic state
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle name change logic
    const value = event.target.value;
    setName(value);
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle nickname change logic
    const value = event.target.value;
    setNickname(value);
  };

  const handleTwoFactorAuthChange = (checked: boolean) => {
    // Handle two-factor authentication change logic
    setTwoFactorAuth(checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic, such as sending updated profile data to a server
    console.log('Profile updated:', { profilePic, name, nickname, twoFactorAuth });
  };

  return (
    <div className="profile-page">
      <div className="side-menu">
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
      </div>
      <div className="main-content">
        <h1>Profile Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Profile Picture:</label>
            <input type="file" accept="image/*" onChange={handleProfilePicChange} />
            {profilePic && <img src={profilePic} alt="Profile" className="profile-pic" />}
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" value={name} disabled />
          </div>
          <div className="form-group">
            <label>Nickname:</label>
            <input type="text" value={nickname} onChange={handleNicknameChange} />
          </div>
          <div className="form-group">
            <label>
              Two-Factor Authentication:
              <Switch checked={twoFactorAuth} onChange={handleTwoFactorAuthChange} />
            </label>
          </div>
          <button type="submit" className="btn-submit">
            Save
          </button>
        </form>

        <div className="additional-info">
          <h2>Additional Information</h2>
          <div>
            <p>Matches: 10</p>
            <p>Won Matches: 5</p>
            <p>
              <Link to="/profile">Friend List</Link>
            </p>
            <p>
              <Link to="/profile">Friend Requests</Link>
            </p>
            <p>
              <Link to="/profile">Achievements</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
