import React, { useEffect, useState } from "react";
import axios from "axios";
import Posted from "./Posted";

function PostNews() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user === null) {
      window.location = "/";
    }

    const token = user.token;
    axios
      .get(`${process.env.REACT_APP_API_URL}api/posts/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })

      .then((res) => setPosts(res.data))
      
      .catch((error) => ({ message: error }));
  }, []);

  return (
    <div className="actuality">
      <h2 className="thread">En Actualité : </h2>
      <ul className="messagesArea">
        {posts.map((post, id) => (
          <Posted key={id} post={post}/>
        ))}
      </ul>
    </div>
  );
}

//Brouillon : onReply={handleSubmitReply} onEdit={handleEditPost} onDelete={handleDeletePost}
export default PostNews;
