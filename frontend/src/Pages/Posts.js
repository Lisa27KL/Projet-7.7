import React from "react";
import Navbar from "../Common/Navbar";
import PostNews from "../Components/Posts/PostNews";
import PostsEdit from "../Components/Posts/PostsEdit";
import welcome from "../Common/img/welcome.png";
import { PostProvider } from "../Components/Posts/PostContext";

const Posts = () => {
  const { pseudo } = JSON.parse(sessionStorage.getItem("user"));

  return (
    <PostProvider>
      <div className="posts-backgroundImg">
        <div className="navbarTop">
          <div className="Pseudo">
            <img src={welcome} alt="welcomeImage" className="welcomeImg" />
            Mes Salutations Distinguées {pseudo}
          </div>

          <div className="navbar-Column">
            <Navbar />
          </div>
        </div>
        <div className="cardsDesign">
          <div className="postsEdit-Column">
            <PostsEdit />
          </div>
          <div className="postNews-Column">
            <PostNews />
          </div>
        </div>
      </div>
    </PostProvider>
  );
};

export default Posts;
