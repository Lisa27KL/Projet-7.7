import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Common/Header";
import Footer from "./Common/Footer";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Posts from "./Pages/Posts";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
