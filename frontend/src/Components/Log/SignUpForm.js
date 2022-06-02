import React, { useState } from "react";
import axios from "axios";
import LogInForm from "./LogInForm";

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
            console.log(res);
            setFormSubmit(true);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="signupForm-page">
      {formSubmit ? (
        <>
          <LogInForm />
          <h4 id="success">Enregistrement réussi, veuillez-vous connecter</h4>
        </>
      ) : (
        <div>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="signup-form-container"
          >
            <h2 className="title-form-signup"> Rejoignez-nous</h2>
            <label className="form-signup">Pseudo:</label>
            <br />
            <input
              className="form-cards-signup"
              type="text"
              value={pseudo}
              required
              onChange={(e) => {
                handlePseudoChange(e);
              }}
            />

            <br />
            <label className="form-signup">Email:</label>
            <br />
            <input
              className="form-cards-signup"
              type="email"
              value={email}
              required
              onChange={(e) => {
                handleEmailChange(e);
              }}
            />
            <br />
            <label className="form-signup">Mot de passe:</label>
            <br />
            <input
              className="form-cards-signup"
              type="password"
              value={password}
              required
              onChange={(e) => {
                handlePasswordChange(e);
              }}
            />
            <br />
            <label className="form-signup">Confirmez Mot de passe:</label>
            <br />
            <input
              className="form-cards-signup"
              type="password"
              value={confPassword}
              required
              onChange={(e) => {
                handleConfPasswordChange(e);
              }}
            />
            <br />
            <div className="terms-checked">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms" id="terms-conditions">
                J'accepte les{" "}
                <a href="/" target="blank" rel="noopener noreferrer">
                  conditions générales
                </a>
              </label>
            </div>
            <div id="errorMsgSignUp"></div>
            <input
              type="submit"
              value="Inscription"
              className="button-signup"
            />
          </form>
        </div>
      )}
    </div>
  );
}
export default SignUpForm;
