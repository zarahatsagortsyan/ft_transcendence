import { authContent } from "./headers";

export const getOtherUser = (otherUsername: number) => {
    let body = JSON.stringify({
      otherId: otherUsername,
    });
    console.log("getOtherUser body ", body);
    return fetchGetOtherUser("getUser", body);
  };
  
  const fetchGetOtherUser = async (url: string, body: any) => {
    //let fetchUrl = process.env.REACT_APP_BACKEND_URL + "/users/" + url;
    let fetchUrl = 'http://localhost:3001' + "/users/" + url;
    console.log("fetchGetOtherUSer: ", fetchUrl);
    console.log("authContent()", authContent());
    console.log("body  nbjbjb()", body);
    
    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: authContent(),
        body: body,
        redirect: "follow",
      });
      const result_1 = await response.json();
      if (!response.ok) return "error";
      return result_1;
    } catch (error) {
      return console.log("error", error);
    }
  };