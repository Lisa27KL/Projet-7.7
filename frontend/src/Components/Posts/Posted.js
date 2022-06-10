//import axios from "axios";
import React, { useContext, useState } from "react";
import PostContext from "./PostContext";
import { DateToString, TimeToString } from "../../Services/DateContext";
import folder from "../../Common/img/folder.png";
import eraser from "../../Common/img/eraser1.png";

const Posted = ({ post }) => {
  const {getPseudo} = useContext(PostContext);
  const {deletePost} = useContext(PostContext);
  const {updatePost} = useContext(PostContext);
  const [message, setMessage] = useState("");

  const handleDelete = (id) =>{
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce post ?")){
      deletePost(id);
    }
  };
  
  const handleModify = (id) =>{
    if (window.confirm("Êtes-vous sûr de vouloir modifier ce post ?")){
      setMessage(id.target.value);
      updatePost(id);
    }
  };

  const pseudo = (userId) =>{
    getPseudo(userId);
  }

  return (
    <>
    {/* Message ---------------------------- */}
    <div className="bigCard">
      <div className="cardPosted">
        <div className="talks">
          {/* <div className="postedPseudo">Posté par : {pseudo(post.userId)}</div> */}
          
          <div className="postedPseudo">Posté par : {pseudo}</div>

          
          <p className="postedMessage">{post.message}</p>
        </div>

        {/* Date and Time -------------------- */}
        <div className="dateTime">
          <time className="date">
            Le {DateToString(post.createdAt, "D/M/YY")}
          </time>
          <br />
          <time className="time">{TimeToString(post.createdAt, "H : M")}</time>
        </div>
        {/* <div className="likes"><LikesDislikes/> </div> */}
      </div>
      <div className="postedImage">
        <img src={post.image} alt="Aucun fichier" className="imgPosted" />
      </div>
    </div>

    {/* Actions Delete and Modify --------------------  */}
    
    <div id="actions">
        



    <textarea
    type="textarea" 
    value={message}
    required
    // onClick={(e)=>{handleModify(post.id)}}
    className="writeModification"
    />
    
      {/* <img src={eraser} 
      alt="eraserModify" 
      id="eraserPost" 
      /> */}


    {/* {message ? (
              <div>
                <img src={message} alt="eraserModify"  id="eraserPost" />{" "}
              </div>
            ) : null} */}

            <div id="modifyDeleteBtn">
    <button 
    type="button" 
    onClick={(e)=>{handleModify(post.id)}}
    className="actionModifyPosted">

      <img src={eraser} 
      alt="eraserModify" 
      id="eraserPost" 
      />
    </button> 


    <button 
    type="button" 
    onClick={()=>{handleDelete(post.id)}} 
    className="actionDeletePosted">

      <img
        src={folder}
        alt="binDelete"
        id="binPost"
      />

    </button>
    </div>
  </div>
  </>
  );
}

export default Posted;