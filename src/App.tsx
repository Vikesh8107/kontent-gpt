// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import ChatBar from "./components/ChatBar";
import Menubutton from "./components/Menubutton";
import Logo from "./components/Logo";
import HowToUse from "./Pages/howtouse";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUS";
import SignUp from "./components/SignUp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App: React.FC = () => {
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check if the JWT token exists in local storage or session storage
    const jwtToken =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
    if (jwtToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  return (
    <Router>
      <div className="h-screen bg-gray-100">
        <Menubutton isMenuExpanded={isMenuExpanded} toggleMenu={toggleMenu} />
        <Logo
          isMenuExpanded={isMenuExpanded}
          toggleMenu={toggleMenu}
          displayName={null}
          email={undefined}
        />
        <Routes>
          <Route path="/howtouse" element={<HowToUse />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <ChatBar email={null} displayName={null} />
              ) : (
                <Navigate to="/signup" />
              )
            }
          />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
