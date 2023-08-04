// import { Container } from "react-bootstrap";
// // import { ReactComponent as Logo } from './logo.svg';
// import myImage from './logo.png';

// function Login() {
//     const handleLogin = () => {
//         // Handle login logic here
//       };
//     // return <h1>Login page</h1>
//     return (
//         <Container className="login-page">
//           {/* <Logo /> */}
//           <img src={myImage} alt="Logo" className="logo" />
//           <button onClick={handleLogin} className="login-button" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '25rem', height: '4rem' }}>
//             Login
//           </button>
//         </Container>
//       );

// }

// export default Login

// import React from 'react';
// import { Container, Button } from 'react-bootstrap';
// import myImage from './logo.png';
// import './Login.css';

// function Login() {
//   const handleLogin = () => {
//     // Handle login logic here
//   };

//   return (
//     <Container className="login-page">
//       <img src={myImage} alt="Logo" className="logo" />
//       <Button onClick={handleLogin} className="login-button">
//         Login
//       </Button>
//     </Container>
//   );
// }

// export default Login;

import React from 'react';
import { Container, Button } from 'react-bootstrap';
import myImage from './logo.png';
import './Login.css';

function Login() {
  const handleLogin = () => {
    // Handle login logic here
  };

  return (
    <Container fluid className="login-page">
      <div className="logo-container">
        <img src={myImage} alt="Logo" className="logo" />
      </div>
      <a href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-c57abb96df660cfb09912c39dc9e3b4dc20bd2741f4281216ca1bdb29b76bd3f&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Fcallback&response_type=code">
        <Button onClick={handleLogin} className="login-button">
          Login
        </Button>
      </a>
    </Container>
  );
}

export default Login;
