import React, { useState } from "react";
import axios from "axios";

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


    axios
      .post(`${process.env.REACT_APP_API_URL}api/users/login`, {
        email,
        password,
      })
      .then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data))
        window.location = "/posts";
      })

      .catch((error) => {

        if(error){
          document.getElementById("errorMsgLogIn").innerHTML = "Vérifiez vos informations ou Inscrivez-vous avant d'essayer de vous connecter !"
        }
      
      });
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

        <label className="form-login">Email:</label>
        <br />
        <input
          className="form-cards-login"
          type="email"
          value={email}
          required
          onChange={(e) => {
            handleEmailChange(e);
          }}
        />
        <br />

        <label className="form-login">Password:</label>
        <br />
        <input
          className="form-cards-login"
          type="password"
          value={password}
          required
          onChange={(e) => {
            handlePasswordChange(e);
          }}
        />
        <br />
        <input type="submit" value="Se Connecter" className="button-login" />
        
        <div id="errorMsgLogIn"></div>

      </form>
    </div>
  );
}

export default LogInForm;
