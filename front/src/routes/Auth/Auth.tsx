// import { useCallback, useContext, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import { Outlet } from "react-router-dom";
// import { IUserInfo } from "../../globals/Interfaces";
// import { GUserInputsRefs } from "../../globals/variables";
// import { useAuth } from "../../globals/contexts";
// import { signUp, signIn } from "../../queries/Auth";
// import { getLeaderBoard, getUserData } from "../../queries/User";
// import { NotifCxt } from "../../App";

// export default function Auth() {
//   const notif = useContext(NotifCxt);
//   let navigate = useNavigate();
//   let auth = useAuth();
//   let location = useLocation();
//   const hrefURL = process.env.REACT_APP_BACKEND_URL + "/auth/42";

//   const userSignIn = useCallback(() => {
//     let username = localStorage.getItem("userName");
//     console.log("username: ", username);
//     if (username)
//       auth.signin(username, () => {
//         navigate("/app/private-profile", { replace: true });
//         window.location.reload();
//       });
//     console.log("user is signed in");
//   }, [navigate, auth]);

//   useEffect(() => {
//     const access_token = location.search.split("=")[1];
//     if (access_token) {
//       console.log(access_token);
//       localStorage.setItem("userToken", access_token);
//       const fetchData = async () => {
//         const data = await getUserData();
//         if (data === "error") {
//           notif?.setNotifText(
//             "Unable to retrieve your information. Please try again later!"
//           );
//         } else {
//           await getLeaderBoard();
//           userSignIn();
//           notif?.setNotifText(
//             "Welcome " + localStorage.getItem("userName") + "!"
//           );
//         }
//         notif?.setNotifShow(true);
//       };
//       fetchData();
//     }
//   }, [location.search, notif, userSignIn]);
  

  // const handleSubmit = (event: any) => {
  //   let userInfo: IUserInfo = {
  //     username: null,
  //     email: null,
  //     password: null,
  //     clear: function () {
  //       this.username = null;
  //       this.email = null;
  //       this.password = null;
  //     },
  //   };

  //   event.preventDefault();
  //   if (GUserInputsRefs.username.current?.value)
  //     userInfo.username = GUserInputsRefs.username.current.value;
  //   userInfo.email = GUserInputsRefs!.email!.current!.value;
  //   userInfo.password = GUserInputsRefs!.password!.current!.value;
  //   if (userInfo.username && userInfo.email && userInfo.password) {
  //     const signUpUser = async () => {
  //       const result = await signUp(userInfo, userSignIn);
  //       if (result && result.includes("error")) {
  //         result.includes("signUp")
  //           ? notif?.setNotifText(
  //               "User already exists. Please enter another username and/or email."
  //             )
  //           : notif?.setNotifText("Unable to sign up. Please try again.");
  //       }
  //     };
  //     signUpUser();
  //   } else {
  //     const signInUser = async () => {
  //       const result = await signIn(userInfo, userSignIn);
  //       if (result && result.includes("error")) {
  //         result.includes("signIn")
  //           ? notif?.setNotifText(
  //               "User does not exists. Please enter a valid email and/or username."
  //             )
  //           : notif?.setNotifText("Could not retreive user. Please try again.");
  //       }
  //     };
  //     signInUser();
  //   }
  // };

//   return (
//     <div className="Auth-form-container">
//       <form className="Auth-form" onSubmit={handleSubmit}>
//         <div className="Auth-form-content">
//           <Outlet />
//           <Button
//             variant="secondary"
//             className="submit-button"
//             size="sm"
//             href={hrefURL}
//           >
//             Sign in with 42
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }


import { useCallback, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Outlet } from "react-router-dom";
import { IUserInfo } from "../../globals/Interfaces";
import { GUserInputsRefs } from "../../globals/variables";
import { useAuth } from "../../globals/contexts";
import { signUp, signIn } from "../../queries/Auth";
import { getLeaderBoard, getUserData } from "../../queries/User";
import { NotifCxt } from "../../App";

export default function Auth() {
  const notif = useContext(NotifCxt);
  let navigate = useNavigate();
  let auth = useAuth();
  let location = useLocation();
  const hrefURL = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-c57abb96df660cfb09912c39dc9e3b4dc20bd2741f4281216ca1bdb29b76bd3f&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Fcallback&response_type=code"; // Updated API endpoint

  const userSignIn = useCallback(() => {
    let username = localStorage.getItem("userName");
    console.log("username: ", username);
    if (username)
    {
      console.log("oaoaoao" + username);
      
      auth.signin(username, () => {
        navigate("/app/private-profile", { replace: true });
        window.location.reload();
      });
    }
    console.log("user is signed in");
  }, [navigate, auth]);

  useEffect(() => {
    const access_token = location.search.split("=")[1];
    if (access_token) {
      console.log(access_token);
      localStorage.setItem("userToken", access_token);
      const fetchData = async () => {
        const data = await getUserData();
        if (data === "error") {
          notif?.setNotifText(
            "Unable to retrieve your information. Please try again later!"
          );
        } else {
          await getLeaderBoard();
          userSignIn();
          notif?.setNotifText(
            "Welcome " + localStorage.getItem("userName") + "!"
          );
        }
        notif?.setNotifShow(true);
      };
      fetchData();
    }
  }, [location.search, notif, userSignIn]);

  const handle42SignIn = () => {
    window.location.href = hrefURL; // Redirect the user to the 42 OAuth sign-in page
  };

    const handleSubmit = (event: any) => {
    let userInfo: IUserInfo = {
      username: null,
      email: null,
      password: null,
      clear: function () {
        this.username = null;
        this.email = null;
        this.password = null;
      },
    };

    event.preventDefault();
    if (GUserInputsRefs.username.current?.value)
      userInfo.username = GUserInputsRefs.username.current.value;
    userInfo.email = GUserInputsRefs!.email!.current!.value;
    userInfo.password = GUserInputsRefs!.password!.current!.value;
    if (userInfo.username && userInfo.email && userInfo.password) {
      const signUpUser = async () => {
        const result = await signUp(userInfo, userSignIn);
        if (result && result.includes("error")) {
          result.includes("signUp")
            ? notif?.setNotifText(
                "User already exists. Please enter another username and/or email."
              )
            : notif?.setNotifText("Unable to sign up. Please try again.");
        }
      };
      signUpUser();
    } else {
      const signInUser = async () => {
        const result = await signIn(userInfo, userSignIn);
        if (result && result.includes("error")) {
          result.includes("signIn")
            ? notif?.setNotifText(
                "User does not exists. Please enter a valid email and/or username."
              )
            : notif?.setNotifText("Could not retreive user. Please try again.");
        }
      };
      signInUser();
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <Outlet />
          <Button
            variant="secondary"
            className="submit-button"
            size="sm"
            onClick={handle42SignIn} // Call the handle42SignIn function on button click
          >
            Sign in with 42
          </Button>
        </div>
      </form>
    </div>
  );
}

