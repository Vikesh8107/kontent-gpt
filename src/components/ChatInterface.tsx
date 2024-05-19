import React, { useState, useEffect } from "react";
import k from "../assets/logo/k.png";
import { MdPerson } from "react-icons/md";
import LoadingAnimation from "./LoadingAnimation"; // Import your loading animation component

interface ChatInterfaceProps {
  chatHistory: Array<{ role: string; text: string }>;
  email: string | null;
  loading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  chatHistory,
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
      className="w-full h-full flex flex-col gap-5 overflow-y-auto items-center"
      style={{ scrollbarWidth: "thin", scrollbarColor: "inherit" }}
    >
      <div
        className={`${
          isMobile ? "w-full" : "w-1/2"
        } h-full flex flex-col gap-5 p-5 justify-start items-start overflow-y-auto max-h-[calc(100vh-200px)]`}
      >
        {loading ? (
          <LoadingAnimation />
        ) : (
          chatHistory.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user"
                  ? "justify-end items-end"
                  : "justify-start items-start"
              } w-full`}
            >
              {message.role === "user" ? (
                <div className="flex items-center gap-2">
                  <MdPerson className="text-2xl" />
                  <p className="bg-gray-200 text-black rounded-lg p-2">
                    {message.text}
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <img src={k} className="h-10" alt="Logo" />
                  <p className="bg-gradient-to-r from-blue-300 via-purple-400 to-red-300 text-black rounded-lg p-2">
                    {message.text}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
