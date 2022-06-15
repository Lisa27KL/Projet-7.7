import React, { useState } from "react";
import axios from "axios";
import LogInForm from "./LogInForm";
import signupIcon from "../../Common/img/sinupIcon.webp"

function SignUpForm() {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  //RegEx
  let namesRegExp = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç' -]{2,}$");
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9àâäéèêëïîôöùûüç.-_]+[@]{1}[a-zA-Z0-9.-_]+[.][a-z]{2,10}$"
  );

  // Validate Form
  const validPseudo = namesRegExp.test(pseudo);
  const validEmail = emailRegExp.test(email);

  const validateForm = validPseudo && validEmail;

  const handlePseudoChange = (e) => {
    setPseudo(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfPasswordChange = (e) => {
    setConfPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorMsg = document.getElementById("errorMsgSignUp");
    const terms = document.getElementById("terms");

    if (!validPseudo) {
      return (errorMsg.innerHTML = "Oh Désolé votre PSEUDO est invalide (2 lettres minimum) ! ");
    } else if (!validEmail) {
      return (errorMsg.innerHTML = "Oh Désolé votre EMAIL est invalide ! ");
    } else if (password !== confPassword) {
      return (errorMsg.innerHTML = "Veuillez écrire le même mot de passe ! ");
    } else if (!validateForm) {
      return (errorMsg.innerHTML =
        "Veuillez remplir le formulaire correctement !");
    } else if (!terms.checked && validateForm) {
      return (errorMsg.innerHTML =
        "Veuillez accepter les conditions générales svp !");
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}api/users/signup`, {
          pseudo,
          email,
          password,
        })
        .then((res) => {
            setFormSubmit(true);
        })
        .catch((error) => ({message : error}));
    }
  };

  return (
    <div className="signupForm-page">
      {formSubmit ? (
        <>
          <LogInForm />
          <h4 className="success">Enregistrement réussi, veuillez-vous connecter</h4>
        </>
      ) : (
        <div>
          <form
            onSubmit={(e) => {
              handleSubmit(e)
            }}
            className="signup-form-container"
          >
            <h2 className="title-form-signup"> Rejoignez-nous</h2>
            <br />
            <input
              className="form-cards-signup"
              type="text"
              value={pseudo}
              placeholder="Saississez votre Pseudo"
              required
              onChange={(e) => {
                handlePseudoChange(e);
              }}
            />

            <br />
            <br />
            <input
              className="form-cards-signup"
              type="email"
              value={email}
              placeholder="Saississez votre Email"
              required
              onChange={(e) => {
                handleEmailChange(e);
              }}
            />
            <br />
            <br />
            <input
              className="form-cards-signup"
              type="password"
              value={password}
              placeholder="Saississez votre Mot de Passe"
              required
              onChange={(e) => {
                handlePasswordChange(e);
              }}
            />
            <br />
            <br />
            <input
              className="form-cards-signup"
              type="password"
              value={confPassword}
              placeholder="Confirmez votre Mot de Passe"
              required
              onChange={(e) => {
                handleConfPasswordChange(e);
              }}
            />
            <br />
            <div className="terms-checked">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms" className="terms-conditions">
                J'accepte les{" "}
                <a href="/" target="blank" rel="noopener noreferrer">
                  conditions générales
                </a>
              </label>
            </div>
            <div id="errorMsgSignUp"></div>
            <img src={signupIcon} alt="signUpIcon" className="signupIcon" onClick={(e) => {handleSubmit(e)}}/>
          </form>
        </div>
      )}
    </div>
  );
}
export default SignUpForm;
