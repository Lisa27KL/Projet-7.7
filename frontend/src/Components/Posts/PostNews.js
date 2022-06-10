import React, { useContext } from "react";
import PostContext from "./PostContext";
import Posted from "./Posted";
//import Commented from "../Comments/Commented";

const PostNews = () => {
  const {posts} = useContext(PostContext);

  return (
    <div className="actuality">
      <ul className="messagesArea">
      <h2 className="thread">En Actualité : </h2>
        {posts.map((post, id) =>(
          <Posted key={id} post={post}/>))}
      </ul>
     {/* <ul className="commentsArea">
       {posts.map((comment,postId) => (
         <Commented key={postId} comment={comment}/>
       ))}
       </ul>  */}
    </div>
  );
}

export default PostNews;
