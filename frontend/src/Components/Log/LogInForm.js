import React, { useState } from "react";
import axios from "axios";
import loginIcon from "../../Common/img/loginIcon.webp"

function LogInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}api/users/login`, {
      email,
      password,
    })
    .then((res) => {
      sessionStorage.setItem("user", JSON.stringify(res.data));
      window.location = "/posts";
    })
    .catch((error) => {
      if(error){
        document.getElementById("errorMsgLogIn").innerHTML = "Vérifiez vos informations ou Inscrivez-vous avant d'essayer de vous connecter !"
      }});
  };

  
  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="login-form-container"
      >
        <h2 className="title-form-login"> Connectez-vous</h2>

        <br />
        <input
          className="form-cards-login"
          type="email"
          value={email}
          placeholder="Saisissez votre Email"
          required
          onChange={(e) => {
            handleEmailChange(e);
          }}
        />
        <br />

        <br />
        <input
          className="form-cards-login"
          type="password"
          value={password}
          placeholder="Saisissez votre Mot de Passe"
          required
          onChange={(e) => {
            handlePasswordChange(e);
          }}
        />
        <br />
        <img src={loginIcon} alt="loginIcon" className="loginIcon" onClick={(e) => {handleSubmit(e)}}/>

        <div id="errorMsgLogIn"></div>

      </form>
    </div>
  );
}

export default LogInForm;
