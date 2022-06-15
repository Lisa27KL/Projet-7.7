import React, { useContext } from "react";
import UserContext from "../../Components/Profile/UserContext";
import { DateProfile } from "../../Services/Date";
import ProfileSettings from "./ProfileSettings";

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="profile">
        <ProfileSettings />
        <div className="cardAvatar">
          <div className="welcomeProfile">
            <h2> Hey c'est moi </h2>
            <br />
            <h3 className="avatarName">{user.pseudo}</h3>
          </div>

          <div className="profile-container">
            <div className="updateProfile-container">
              <div className="mySideAvatar">
                <div>
                  <img src={user.image} alt="" className="avatarImg" />
                </div>
              </div>
              <div className="profileDate">
                Nous sommes le ~ {DateProfile()}
              </div>
            </div>
          </div>
        </div>

        <div className="biographyCards">
          <h3 className="talkingToYou">Je vous parle de moi :</h3>

          <p className="myBiography">{user.bio}</p>
          <div className="profileEmail">
            <h2 className="myEmail">Mon email : </h2>
            <h3 className="emailProfile">{user.email}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
