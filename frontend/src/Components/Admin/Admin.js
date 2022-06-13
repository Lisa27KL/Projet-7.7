import React, { useContext, useState } from "react";
import UserContext from "../Profile/UserContext";
//import eraser from "../../Common/img/eraser1.png";
//import stamp2 from "../../Common/img/stamp2.png";
// import bin from "../../Common/img/delete.png";
import group from "../../Common/img/group.png";


//il faut que tu récuperes tous les users et que tu map pour les récupérer !

const Admin = ({profileUser}) => {
  const {updateUser, deleteUser} = useContext(UserContext);
  
  const [update, setUpdate] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPseudo, setNewPseudo] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newFile, setNewFile] = useState();
  const [file, setFile] = useState("");

  console.log(profileUser);
  const handleNewBio = (e) => {
    setNewBio(e.target.value);
  };

  const handleNewEmail = (e) => {
    setNewEmail(e.target.value);
  };

  const handleNewPseudo = (e) => {
    setNewPseudo(e.target.value);
  };

  const handleNewImage = (e) => {
    setNewImage(URL.createObjectURL(e.target.files[0]));
    setNewFile(e.target.files[0]);
  };

  const handleModify = (id) => {
    if (newBio || newFile || newEmail || newPseudo || newImage) {
      const formData = new FormData();

      if (newBio) formData.append("bio", newBio);
      if (newFile) formData.append("image", newFile);
      if (newImage) formData.append("image", file);
      if (newEmail) formData.append("email", newEmail);
      if (newPseudo) formData.append("pseudo", newPseudo);
      if (window.confirm("Etes-vous sûr de vouloir modifier?")) {
        updateUser(id, formData);
        setUpdate(!update);
        empty();
      }
    }
  };

  const empty = (e) => {
    setNewBio("");
    setNewEmail("");
    setNewPseudo("");
    setNewImage("");
    setNewFile("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      deleteUser(id);
    }
  };
  return (
  <><div>
 <div className="usersProfile">
 <div className="blocActions">
   <div className="usersProfiles">
        
            <div className="settingsModification">
            <p >{profileUser.email}</p>
            <p >{profileUser.pseudo}</p>
            <p >{profileUser.bio}</p>
            </div>
              {/* <textarea
                type="text"
                defaultValue={profileUser.pseudo}
                onChange={(e) => handleNewPseudo(e)}
                className="settingsModification"
              /> */}
              {/* <textarea
                type="text"
                defaultValue={profileUser.email}
                onChange={(e) => handleNewEmail(e)}
                className="settingsModification"
                />
                <textarea
                type="text"
                defaultValue={profileUser.bio}
                onChange={(e) => handleNewBio(e)}
                className="settingsModification"
              /> */}
            
          
          </div>    
</div></div>
</div>
  
  </>

  ) 
  
};

export default Admin;
