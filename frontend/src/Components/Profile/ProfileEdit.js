import React, { useState, useContext } from "react";
import UserContext from "../../Components/Profile/UserContext";
import { DateProfile } from "../../Services/DateContext";



const Profile = ({profil}) => {
  const {user, updateUser, deleteUser } = useContext(UserContext);

  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [bio, setbio] = useState("");
  
  const handleBioProfile = (e) => {
    setbio(e.target.value);
  };

  const handleImageProfile = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleModify = (e) => {
    e.preventDefault();
    
    if(bio || image){
      const formData = new FormData();
      formData.append("bio", bio);

      if(file)formData.append("image", file);
      if(window.confirm("Votre profil vous plaît-il ?"))
      updateUser(formData);
    }
  };


 

  return (
    <>

      <div className="profile">
        {/* First Column */}
        <div className="profileNews-Profile">
          <div className="profileEmail">
            <h2>Mon email : </h2>
            <h3>{user.email}</h3>
          </div>
        </div>

        {/* Second Column */}
        <div className="cardAvatar">
          <div className="welcomeProfile">
            Hello<h2 id="avatarName">{user.pseudo}</h2>comment vas-tu aujourd'hui ?
          </div>

          <div className="profile-container">
            <div className="updateProfile-container">
              <div className="mySideAvatar">
                <label id="avatar">Hey ! C'est moi là !! </label>
                
                  <div>
                    <img src={image} alt="" id="avatarImg" />
                  </div>
                <input
                  id="avatarFile"
                  type="file"
                  name="image"
                  onChange={(e) => {
                    handleImageProfile(e);
                  }}
                />
              </div>
              <div className="profileDate">Nous sommes le ~ {DateProfile()}</div>
            </div>
          </div>
        </div>

        {/* Third Column */}
        <div className="biographyCards">
          <h3 id="talkingToYou">Je vous parle de moi :</h3>

          <textarea
            id="myBiography"
            type="text"
            defaultValue={user.bio}
            onChange={(e) => {
              handleBioProfile(e);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
