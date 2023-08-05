import { storeToken } from "./Auth";
import { getUserData } from "./User";

export const twoFAGenerate = () => {
    return fetchPost(null, "generate", null);
  };
  
  export const twoFAAuth = (
    twoFAcode: string,
    user_name: string,
    userSignIn: any
  ) => {
    let raw = JSON.stringify({
      username: user_name,
      twoFAcode: twoFAcode,
    });
    console.log("rawwwwwwww: ",raw);
    console.log("----twofa userSignin: ",userSignIn);
    return fetchPost(raw, "authenticate", userSignIn);
  };
  
  export const twoFAOn = (code: string) => {
    let raw = JSON.stringify({
      twoFAcode: code,
    });
    console.log("TURN ON");
    return fetchPost(raw, "turn-on", null);
  };
  
  export const twoFAOff = () => {
    return fetchPost(null, "turn-off", null);
  };
  
  const authRawHeader = () => {
    let token = "bearer " + localStorage.getItem("userToken");
    console.log("Authentication token: " + token);
    let myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    console.log("ZRT", myHeaders.get("Authorization"));
    return myHeaders;
  };
  
  const fetchPost = async (body: any, url: string, userSignIn: any) => {
    console.log("-----userSignIn: fetchPost:: -----", userSignIn);
    // let fetchUrl = process.env.REACT_APP_BACKEND_URL + "/auth/2fa/" + url;
    console.log("Post request for 2FA\n");
    let fetchUrl = 'http://localhost:3001' + "/auth/2fa/" + url;
    console.log("FetchURL: " + fetchUrl);
    console.log("Bodyyyyy: " + body);

    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: authRawHeader(),
        body: body,
        redirect: "follow",
      });
      const result_1 = await response.json();
      console.log("ES Response:", response.headers.get('Authorization'));
      // console.log("Before post error on: " + response);
      if (!response.ok) {
        console.log("POST error on ", url);
        return null;
      }
      if (url !== "generate") {
        storeToken(result_1);
        if (url === "authenticate") {
          if (localStorage.getItem("userToken")) {
            console.log("UserToken from ");
            
            await getUserData();
            if (localStorage.getItem("userName")) userSignIn();
            else return null;
          }
        }
      }
      return result_1;
    } catch (error) {
      return console.log("error", error);
    }
  };