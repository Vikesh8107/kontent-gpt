import React, { useState, useEffect, useRef } from "react";
import brandLogo from "../assets/logo/brand_logo1.png";
import { getAuth, signOut, User } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface LogoProps {
  isMenuExpanded: boolean;
  toggleMenu: () => void;
  displayName: string | null;
  email: any;
}

const Logo: React.FC<LogoProps> = ({
  isMenuExpanded,
  toggleMenu,
  displayName,
  email,
}) => {
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userPhotoURL, setUserPhotoURL] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      userMenuRef.current &&
      !userMenuRef.current.contains(event.target as Node)
    ) {
      setUserMenuOpen(false);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        // console.log(user);
        setUserEmail(user.email);
        setUserName(user.displayName);
        setUserPhotoURL(user.photoURL);
      } else {
        setUserEmail(null);
        setUserName(null);
        setUserPhotoURL(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const isMobile = window.innerWidth <= 768;

  const handleSignOut = async () => {
    const auth = getAuth();
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <div>
      <div
        className="logo"
        style={{
          position: "absolute",
          top: "25px",
          left: isMobile
            ? isMenuExpanded
              ? "11%"
              : "60px"
            : isMenuExpanded
            ? "15%"
            : "60px",
          transition: "left 0.3s ease-in-out",
          zIndex: 1000,
        }}
      >
        <div
          className="beta-text"
          style={{
            position: "absolute",
            top: "50%",
            right: "-35px",
            transform: "translateY(-50%)",
            padding: "3px 6px",
            borderRadius: "850px",
            background: "#4741a5",
            color: "white",
            fontWeight: "bold",
            fontSize: "10px",
            textTransform: "uppercase",
            zIndex: 1000,
          }}
        >
          Beta
        </div>
        <a href="./signup">
          <img
            src={brandLogo}
            alt="KontentGpt Logo"
            style={{ width: "168px", height: "auto" }}
          />
        </a>
      </div>
      <nav className="bg-white border-gray-200 dark:bg-gray-100 fixed top-0 right-0 z-50">
        <div className="flex items-center justify-between mt-8 p-4">
          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={toggleUserMenu}
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              style={{ position: "fixed", right: "20px", top: "20px" }}
            >
              <span className="sr-only">Open user menu</span>
              <img
                src={userPhotoURL ? userPhotoURL : undefined}
                className="w-8 h-8 rounded-full ml-0.2"
              />
            </button>
          </div>
        </div>
        {isUserMenuOpen && (
          <div
            ref={userMenuRef}
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg"
            style={{ top: "70px", right: "20px" }}
          >
            <div className="bg-white shadow-lg rounded-lg p-10 px-6 w-full max-w-md mx-auto mt-8">
              <div className="flex flex-col items-start mt-[-25px]">
                <div className="text-xl font-semibold text-gray-600 ">
                  {userName}
                </div>
                <div className="text-sm font-thin text-gray-800 mt-1.5">
                  <span className="inline-block max-w-[50%] max-h-[10%] overflow-ellipsis">
                    {userEmail}
                  </span>{" "}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200"></div>
            <div className="py-3 ml-5 mr-8">
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-2 py-1 text-gray-700 hover:bg-blue-300 font-source-sans-3 font-regular text-lg text-white font-medium bg-[#4741a5] rounded-lg"
              >
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className="mr-2 ml-5"
                />
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Logo;
