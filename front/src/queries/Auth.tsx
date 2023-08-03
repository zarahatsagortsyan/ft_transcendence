import { auth } from './headers'
import { getUserData } from './User'

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const fetchPost = async (
  raw: string,
  userInfo: any,
  userSignIn: any,
  url: string
) => {
  let fetchUrl = process.env.REACT_APP_BACKEND_URL + "/auth/" + url;

  try {
    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    });
    const result_1 = await response.json();
    if (!response.ok) {
      console.log("POST error on ", url);
      return "error: " + url;
    }
    if (result_1.twoFA) {
      const url = "/2FA?user=" + result_1.username;
      window.location.href = url;
    } else {
      userInfo.clear();
      storeToken(result_1);
      if (localStorage.getItem("userToken")) {
        await getUserData();
        if (localStorage.getItem("userName")) userSignIn();
        else return "error";
      }
    }
  } catch (error) {
    return console.log("error", error);
  }
};

export const signIn = (userInfo: any, userSignIn: any) => {
  let raw = JSON.stringify({
    username: userInfo.email,
    password: userInfo.password,
  });
  return fetchPost(raw, userInfo, userSignIn, "signin");
};

export const signUp = (userInfo: any, userSignIn: any) => {
  let raw = JSON.stringify({
    email: userInfo.email,
    password: userInfo.password,
    username: userInfo.username,
  });
  return fetchPost(raw, userInfo, userSignIn, "signup");
};

export const storeToken = (token: any) => {
  localStorage.setItem("userToken", token.access_token);
  localStorage.setItem("userRefreshToken", token.refresh_token);
};

export const logOut = () => {
  return fetchPostLogout();
};

const fetchPostLogout = async () => {
  //let fetchUrl = process.env.REACT_APP_BACKEND_URL + "/auth/logout";
  let fetchUrl = "http://localhost:3001"+ "/auth/logout";
  try {
    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: auth(),
      redirect: "follow",
    });
    const result_1 = await response.text();
    if (!response.ok) {
      console.log("POST error on logout");
      return "error";
    }
    return result_1;
  } catch (error) {
    return console.log("error", error);
  }
};
