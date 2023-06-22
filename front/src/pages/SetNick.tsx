// import React, { useState } from 'react';

// function SetNick() {
//     const [nickname, setNickname] = useState('');

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setNickname(event.target.value);
//   };

//   const handleFormSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     // Perform any necessary actions with the nickname, such as sending it to a server or updating the state in a parent component
//     console.log('Nickname:', nickname);
//     // Reset the nickname input field
//     setNickname('');
//   };

//   return (
//     <div className="set-nickname-window" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
//       <h2>Set username</h2>
//       <form onSubmit={handleFormSubmit}>
//         {/* <div class="v-card_text"></div> */}
//         <input type="text" value={nickname} onChange={handleInputChange} placeholder="Enter your nickname" />
//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// }

// export default SetNick

// import React, { useState } from 'react';
// // import './SetNick.css'
// import './SetNick.css';


// const SetNick: React.FC = () => {
//   const [nickname, setNickname] = useState<string>('');

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setNickname(event.target.value);
//   };

//   const handleFormSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     // Perform any necessary actions with the nickname, such as sending it to a server or updating the state in a parent component
//     console.log('Nickname:', nickname);
//     // Reset the nickname input field
//     setNickname('');
//   };

//   return (
//     <div className="set-nickname-window" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
//       <h2>Set Username</h2>
//       <form onSubmit={handleFormSubmit}>
//         <input type="text" value={nickname} onChange={handleInputChange} placeholder="Enter your nickname" />
//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// };

// export default SetNick;


import React, { useState } from 'react';
import './SetNick.css';

const SetNick: React.FC = () => {
  const [nickname, setNickname] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Perform any necessary actions with the nickname, such as sending it to a server or updating the state in a parent component
    console.log('Nickname:', nickname);
    // Reset the nickname input field
    setNickname('');
  };

  return (
    <div className="set-nickname-window">
      <h2>Set Nickname</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="input-container">
          <input type="text" value={nickname} onChange={handleInputChange} placeholder="Enter your nickname" />
        </div>
        <div className="button-container">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default SetNick;
