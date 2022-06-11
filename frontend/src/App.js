import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Common/Header";
import Footer from "./Common/Footer";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Posts from "./Pages/Posts";
import { UserProvider } from "./Components/Profile/UserContext";
import Token from "./Services/Token";

function App () {
  const { token, setToken } = Token();

  if (!token) {
  return  (
      <>
        <Header /> 
        <Home setToken={setToken} />;
        <Footer /> 
       </> 
    );
  }

  return (
    <BrowserRouter>
      <Header />
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </UserProvider>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
