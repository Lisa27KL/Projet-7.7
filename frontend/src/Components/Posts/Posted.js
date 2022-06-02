import React from "react";
// import LikesDislikes from "../LikesDislikes/likesDislikes";

const Posted = ({ post }) => {
  const { pseudo } = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div className="bigCard">
      <div className="cardPosted">
        <div className="talks">
          <div className="postedPseudo">Posté par : {pseudo}</div>
          <p className="postedMessage">{post.message}</p>
        </div>
        {/* <div className="likes"><LikesDislikes/> </div> */}
      </div>
      <div className="postedImage">
          <img src={post.image} alt="imagesPosted" className="imgPosted" />
        </div>
    </div>
  );
};

export default Posted;
