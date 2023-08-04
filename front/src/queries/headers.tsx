export const auth = () => {
    let token = "Bearer " + localStorage.getItem("userToken");
    let myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    return myHeaders;
  };
  
  export const authContent = () => {
    let token = "bearer " + localStorage.getItem("userToken");
    let myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    return myHeaders;
  };