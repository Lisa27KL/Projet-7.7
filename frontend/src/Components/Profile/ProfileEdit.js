import React, { useContext } from "react";
import UserContext from "../../Components/Profile/UserContext";
import { DateProfile } from "../../Services/Date";


const Profile = ({profil}) => {
  const {user } = useContext(UserContext);

  return (
    <>

      <div className="profile">
        {/* First Column */}
        <div className="profileNews-Profile">
          <div className="profileEmail">
            <h2>Mon email : </h2>
            <h3 className="emailProfile">{user.email}</h3>
          </div>
        </div>

        {/* Second Column */}
        <div className="cardAvatar">
          <div className="welcomeProfile">
          <h2> Hey c'est moi </h2>
          <br/>
          <h3 id="avatarName">{user.pseudo}</h3>
          </div>

          <div className="profile-container">
            <div className="updateProfile-container">
              <div className="mySideAvatar">                
                  <div>
                    <img src={user.image} alt="" id="avatarImg" />
                  </div>
              </div>
              <div className="profileDate">Nous sommes le ~ {DateProfile()}</div>
            </div>
          </div>
        </div>

        {/* Third Column */}
        <div className="biographyCards">
          <h3 id="talkingToYou">Je vous parle de moi :</h3>

          <p id="myBiography">{user.bio}</p>
          
        </div>
      </div>
    </>
  );
};

export default Profile;
