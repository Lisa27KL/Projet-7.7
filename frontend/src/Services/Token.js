import { useState } from "react";

export default function Token() {
  const getToken = () => {
    const session = sessionStorage.getItem("user");
    const user = JSON.parse(session);
    return user?.token;
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setToken(user.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}