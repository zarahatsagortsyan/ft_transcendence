// import { useNavigate } from "react-router-dom";

// export default function SignIn() {
//   let navigate = useNavigate();

//   async function handleClick(event: any) {
//     event.preventDefault();
//     navigate("/auth/signup");
//   }

//   return (
//     <div>
//       <h3 className="Auth-form-title">Sign in.</h3>
//       <div className="text-secondary">
//         Don't have an account yet? &nbsp;
//         <a href="/signup" onClick={handleClick}>
//             Sign up with 42
//         </a>
//       </div>
//     </div>
//   );
// }

// import { useNavigate } from "react-router-dom";

export default function SignIn() {
  // let navigate = useNavigate();

  // async function handleClick(event: any) {
  //   event.preventDefault();
  //   navigate("/auth/signup");
  // }

  const handle42SignUp = () => {
    window.location.href =
      "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-75d175baeea78763f7aa474aa964d04836779fec7243a0d29769ee24a1783a39&redirect_uri=http%3A%2F%2F10.18.116.247%3A3000%2Fauth%2Fredirect&response_type=code&state=absjhasagsgsajg";
  };

  return (
    <div>
      <h3 className="Auth-form-title">Sign in.</h3>
      <div className="text-secondary">
        Don't have an account yet? &nbsp;
        <a href="#" onClick={handle42SignUp}>
          Sign up with 42
        </a>
      </div>
    </div>
  );
}

