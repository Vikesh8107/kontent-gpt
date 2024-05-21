import React, { useState, useEffect, KeyboardEvent } from "react";
import axios from "axios";
import WelcomeBanner from "./WelcomeBanner";
import ChatInterface from "./ChatInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface ChatBarProps {
  email: string | null;
  displayName: string | null;
}

const ChatBar: React.FC<ChatBarProps> = ({ email, displayName }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState("");
  const [recordedResultText, setRecordedResultText] = useState("");
  const [selectedRadio, setSelectedRadio] = useState<number | null>(null);
  const [requestValue, setRequestValue] = useState<number | null>(null);
  const [isChatStarted, setIsChatStarted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // For loading state
  const [chatHistory, setChatHistory] = useState<
    Array<{ role: string; text: string }>
  >([]);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    // Load chat history from localStorage on component mount
    const savedChatHistory = localStorage.getItem("chatHistory");
    if (savedChatHistory) {
      setChatHistory(JSON.parse(savedChatHistory));
      setIsChatStarted(true);
    }
  }, []);

  useEffect(() => {
    // Save chat history to localStorage whenever it changes
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  const handleRadioClick = (value: number) => {
    setSelectedRadio(value);
    setRequestValue(value);
  };

  const handleNewChat = () => {
    window.location.reload();
  };

  const handleSubmit = async () => {
    if (requestValue == null || recordedText.trim() === "") return;

    // Add user's question to chat history
    const updatedChatHistory = [
      ...chatHistory,
      { role: "user", text: recordedText },
    ];
    setChatHistory(updatedChatHistory);
    setRecordedText(""); // Clear the input text immediately
    setIsChatStarted(true);
    setLoading(true); // Start loading

    try {
      // Define headers with the token
      const headers = {
        token: token,
      };

      const response = await axios.post(
        "https://kontentgpt-production-838d.up.railway.app/submit_with_type",
        {
          prompt: recordedText || "",
          type: requestValue === 1 ? "Short Form" : "Long Form",
        },
        { headers }
      );

      let outputString =
        typeof response.data.output === "string"
          ? response.data.output
          : JSON.stringify(response.data.output);

      outputString = outputString.replace(/\*\*/g, "").replace(/\\n/g, "\n");

      setTimeout(() => {
        setRecordedResultText(outputString);
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { role: "bot", text: outputString },
        ]);

        setSelectedRadio(null);
        setLoading(false); // Stop loading
      }, 2000); // Simulate delay for animation
    } catch (error) {
      console.error("Error submitting data:", error);
      setLoading(false); // Stop loading on error
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default behavior of form submission
      handleSubmit();
    }
  };

  return (
    <>
      {!isChatStarted && <WelcomeBanner displayName={displayName} />}
      <div className="fixed bottom-7 mt-25 left-0 right-0 top-20 flex justify-end items-center flex-col gap-2">
        {isChatStarted && (
          <ChatInterface
            email={email}
            chatHistory={chatHistory}
            loading={loading}
          />
        )}
        <div className="relative">
          <textarea
            placeholder="Type your script data here..."
            value={recordedText}
            onChange={(e) => setRecordedText(e.target.value)}
            className="h-16 w-96 py-2 px-4 bg-gray-200 ml-20 mr-10 text-black border-none rounded-2xl pr-20 resize-none overflow-y-auto placeholder-center"
            style={{
              width: "calc(100vw - 180px)",
              maxWidth: "800px",
              minWidth: "320px",
              fontSize: "16px",
              height: "60px",
              maxHeight: "200px",
            }}
            onKeyDown={handleKeyPress}
          />

          <button
            className="absolute top-2 right-16 bg-gray-200 text-black rounded-full p-3 hover:bg-gray-300"
            onClick={handleSubmit}
            title="Submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>

        <div className="flex flex-row gap-5">
          <div className="mt-0.9 ml-3 flex items-center">
            <span>Select Short or Long Form</span>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="ml-2 sm:ml-10 lg:ml-4"
              fade
            />
          </div>
          <div className="flex items-center">
            <button
              id="default-radio-1"
              type="button"
              value=""
              name="default-radio"
              className={`w-128 h-8 text-blue-600 border-gray-300 min-w-24 rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 ${
                selectedRadio === 1
                  ? "bg-gradient-to-r from-blue-300 via-purple-400 to-red-300"
                  : "bg-gradient-to-r from-white to-gray-100"
              }`}
              onClick={() => handleRadioClick(1)}
            >
              <label
                id="default-radio-1"
                className="ms-2 me-2 text-sm font-medium text-black"
              >
                Short Form
              </label>
            </button>
          </div>

          <div className="flex items-center">
            <button
              id="default-radio-2"
              type="button"
              value=""
              name="default-radio"
              className={`w-128 h-8 text-blue-600 border-gray-300 min-w-24 rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 ${
                selectedRadio === 2
                  ? "bg-gradient-to-r from-blue-300 via-purple-400 to-red-300"
                  : "bg-gradient-to-r from-white to-gray-100"
              }`}
              onClick={() => handleRadioClick(2)}
            >
              <label
                id="default-radio-2"
                className="ms-2 me-2 text-sm font-medium text-black"
              >
                Long Form
              </label>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBar;
