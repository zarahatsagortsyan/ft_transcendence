import { auth } from './headers'

export const getUserBlocked = () => {
    return fetchGet("getBlocked", storeFriendsInfo);
  };
  
  export const getUserPending = () => {
    return fetchGet("getAllPending", storeFriendsInfo);
  };
  
  export const getUserData = () => {
    return fetchGet("getMe", storeUserInfo);
  };
  
  export const getLeaderBoard = () => {
    return fetchGet("getLeaderboard", storeLeaderBoardInfo);
  };
  
  const fetchGet = async (url: string, callback: any) => {
    console.log('back_rl',process.env.BACK_URL);
    let fetchUrl = 'http://localhost:3001' + "/users/" + url;
    console.log(fetchUrl);
    try {
      console.log('auth()', auth());
      console.log('sdfsdfsdf', fetchUrl);
      const response = await fetch(fetchUrl, {
        method: "GET",
        headers: auth(),
        body: null,
        redirect: "follow",
      });
      const result_1 = await response.json();
      console.log(response);
      if (!response.ok) {
        return "error";
      }
      return callback(result_1);
    } catch (error) {
      return console.log("error", error);
    }
  };
  
  export const storeUserInfo = (result: any) => {
    localStorage.setItem("userID", result.id);
    localStorage.setItem("userName", result.user_name);
    // localStorage.setItem("userEmail", result.email);
    localStorage.setItem("userPicture", result.avatar);
    localStorage.setItem("userGamesWon", result.gamesWon);
    localStorage.setItem("userGamesLost", result.gamesLost);
    localStorage.setItem("userGamesPlayed", result.gamesPlayed);
    localStorage.setItem("userAuth", result.two_factor_auth);

  };
  
  export const storeFriendsInfo = (result: any) => {
    return result;
  };
  
  export const storeLeaderBoardInfo = (result: any) => {
    return result;
  };