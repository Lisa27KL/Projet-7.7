import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [logInModal, setLogInModal] = useState(props.login);

  const handleModals = (e) => {
    if (e.target.id === "signup") {
      setLogInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setLogInModal(true);
    }
  };
  return (
    <div>
      <div>
        <ul id="homeConnection">
          <li
            onClick={handleModals}
            id="signup"
            className={signUpModal ? "active-btn" : null}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={logInModal ? "active-btn" : null}
          >
            Se connecter
          </li>
        </ul>
        {signUpModal && <SignUpForm />}
        {logInModal && <LogInForm />}
      </div>
    </div>
  );
};

export default Log;
