import React, { useContext } from "react";
import UserContext from "../Profile/UserContext";
import PostContext from "./PostContext";
import Posted from "./Posted";
//import Commented from "../Comments/Commented";

const PostNews = () => {
  const { posts } = useContext(PostContext);
  const { user } = useContext(UserContext);

  return (
    <div className="actuality">
        <ul className="messagesArea">
          <h2 className="thread">En Actualité : </h2>
          <div className="postedArea">
          {posts.map((post, id) => (
            <Posted key={id} post={post} user={user} />
          ))}
        </div>
        </ul>
        {/* <ul className="commentsArea">
       {posts.map((comment,postId) => (
         <Commented key={postId} comment={comment}/>
       ))}
       </ul>  */}
    </div>
  );
};

export default PostNews;
