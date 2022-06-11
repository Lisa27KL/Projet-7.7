exports.authHeader = () =>{
    const user = JSON.parse(sessionStorage.getItem("user"));
    // const token = user.token;

    if (user && user.token){
        return  {headers:{Authorization: "Bearer " + user.token}};
    } else {
        return  {};
    }
};