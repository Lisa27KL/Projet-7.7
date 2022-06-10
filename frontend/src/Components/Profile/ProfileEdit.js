import React, { useState } from "react";
import axios from "axios";

const Profile = ({ post }) => {
  const { pseudo } = JSON.parse(sessionStorage.getItem("user"));
  const { email } = JSON.parse(sessionStorage.getItem("user"));

  const [avatar, setAvatar] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  //const [newImageFile, setNewImageFile] = useState("");

  const handleMessageChange = (e) => {
    setMessage({message : " "});
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile({file : ""});
  };

  let newDate = new Date();
  //Date
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const dayMonthYear = `${date < 10 ? `0${date}` : `${date}`}${"/"}${
    month < 10 ? `0${month}` : `${month}`
  }${"/"}${year}`;

  //Time
  const hour = newDate.getHours();
  const minutes = newDate.getMinutes();
  const time = `${hour < 10 ? `0${hour}` : `${hour}`}${":"}${
    minutes < 10 ? `0${minutes}` : `${minutes}`
  }`;

  const avatarUser = (e) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.token;
    const formData = new FormData();
    formData.append("message", message);
    formData.append("image", file);

    axios
      .post(`${process.env.REACT_APP_API_URL}api/posts/`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(res =>{ return res.data.message})
      .catch((error) => ({
        message: error,
      }));
  };

  return (
    <>
      <div className="profile">
        {/* First Column */}
        <div className="profileNews-Profile">
          <div className="profileEmail">
            <h2>Mon email : </h2>
            <h3>{email}</h3>
          </div>
        </div>

        {/* Second Column */}
        <div className="cardAvatar">
          <div className="welcomeProfile">
            Hello<h2 id="avatarName">{pseudo}</h2>comment vas-tu aujourd'hui ?
          </div>

          <div className="profile-container">
            <div className="updateProfile-container">
              <div className="mySideAvatar">
                <label id="avatar">Hey ! C'est moi là !! </label>
                <form
                  onSubmit={(e) => {
                    avatarUser(e);
                  }}
                >
                  <div>
                    <img src={avatar} alt="" id="avatarImg" />
                  </div>
                </form>
                <input
                  id="avatarFile"
                  type="file"
                  name="image"
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                />
              </div>
              <div className="profileDate">Nous sommes le ~ {dayMonthYear}</div>
              <div className="profileTime"> Il est actuellement ~ {time}</div>
            </div>
          </div>
        </div>

        {/* Third Column */}
        <div className="biographyCards">
          <h3 id="talkingToYou">Je vous parle de moi :</h3>

          <textarea
            id="myBiography"
            type="textarea"
            value={message}
            required
            onChange={(e) => {
              handleMessageChange(e);
            }}
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default Profile;
