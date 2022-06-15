import React, { useContext } from "react";
import UserContext from "../Profile/UserContext";
import PostContext from "./PostContext";
import Posted from "./Posted";

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
      
    </div>
  );
};

export default PostNews;
