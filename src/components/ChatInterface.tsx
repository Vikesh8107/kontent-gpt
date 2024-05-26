import React, { useEffect, useRef, useState } from "react";
import k from "../assets/logo/k.png";
import { MdPerson } from "react-icons/md";
import LoadingAnimation from "./LoadingAnimation";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ChatInterfaceProps {
  latestMessages: Array<{ id: number; role: string; text: string }>;
  email: string | null;
  loading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  latestMessages,
  email,
  loading,
}) => {
  const isMobile = window.innerWidth <= 768;
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => {
      setCopiedMessageId(null);
    }, 2000);
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [latestMessages, loading]);

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
        {latestMessages.map((message, index) => (
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
                <p className="bg-gray-200 text-black rounded-lg p-2 font-source-sans-3 font-regular whitespace-pre-line">
                  {message.text}
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <img src={k} className="h-10" alt="Logo" />
                <div className="relative">
                  <p className="text-black rounded-lg p-2 font-source-sans-3 font-light whitespace-pre-line">
                    {message.text}
                  </p>
                  <div className="absolute top-full left-2 mt-2">
                    <FontAwesomeIcon
                      icon={copiedMessageId === message.id ? faCheck : faCopy}
                      className="cursor-pointer text-gray-500 hover:text-gray-700"
                      onClick={() => handleCopy(message.id, message.text)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div style={{ marginLeft: loading ? "45px" : "0" }}>
          {loading && <LoadingAnimation />}
        </div>
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default ChatInterface;
