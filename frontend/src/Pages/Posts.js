import React from "react";
import LeftNavbar from "../Common/LeftNavbar";
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

          <div className="leftNavbar-Column">
            <LeftNavbar />
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
