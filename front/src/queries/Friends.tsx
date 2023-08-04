import { authContent } from "./headers";

export const getUserFriends = (otherId: number) => {
    let body = JSON.stringify({
      otherId: otherId,
    });
    return fetchGet("getAllFriends", authContent, body);
  };
  
  export const addFriendQuery = (otherId: number) => {
    let body = JSON.stringify({
      otherId: otherId,
    });
    return fetchGet("friendRequest", authContent, body);
  };
  
  export const removeFriendQuery = (otherId: number) => {
    let body = JSON.stringify({
      otherId: otherId,
    });
    return fetchGet("rmFriend", authContent, body);
  };
  
  export const blockUserQuery = (otherId: number) => {
    let body = JSON.stringify({
      otherId: otherId,
    });
    return fetchGet("blockUser", authContent, body);
  };
  
  export const unblockUserQuery = (otherId: number) => {
    let body = JSON.stringify({
      otherId: otherId,
    });
    return fetchGet("unblockUser", authContent, body);
  };
  
  export const cancelInviteQuery = (otherId: number) => {
    let body = JSON.stringify({
      otherId: otherId,
    });
    return fetchGet("friendRequestCancel", authContent, body);
  };
  
  export const denyInviteQuery = (otherId: number) => {
    let body = JSON.stringify({
      otherId: otherId,
    });
    return fetchGet("friendRequestDecline", authContent, body);
  };
  
  const fetchGet = async (url: string, header: any, body: any) => {
    let fetchUrl = process.env.REACT_APP_BACKEND_URL + "/users/" + url;
    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: header(),
        body: body,
        redirect: "follow",
      });
      const result = await response.json();
      if (!response.ok) {
        console.log("POST error on ", url);
        return "error";
      }
      return result;
    } catch (error) {
      return console.log("error", error);
    }
  };