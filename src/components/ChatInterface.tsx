import React, { useState, useEffect } from "react";
import k from "../assets/logo/k.png";
import LoadingAnimation from "./LoadingAnimation"; // Import your loading animation component

interface ChatInterfaceProps {
  question: string;
  answer: string;
  email: string | null;
  loading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  question,
  answer,
  email,
  loading,
}) => {
  const isMobile = window.innerWidth <= 768;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Initially assume not logged in

  useEffect(() => {
    // Check if the user is logged in when the email changes
    setIsLoggedIn(email !== null);
  }, [email]); // Trigger effect when email changes

  return (
    <div
      className="w-full h-full flex flex-col gap-5 overflow-y-auto items-center "
      style={{ scrollbarWidth: "thin", scrollbarColor: "inherit" }}
    >
      <div
        className={`${
          isMobile ? "w-full" : "w-1/2"
        } h-full flex flex-row gap-5 p-5 justify-center items-start`}
      >
        {loading ? (
          <LoadingAnimation />
        ) : (
          <>
            <img src={k} className="h-10" alt="Logo" />
            <p>{answer}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
