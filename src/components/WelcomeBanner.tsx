import React from "react";
import "./WelcomeBanner.css";
/* eslint-disable-next-line padded-blocks */
import Slider from "react-slick";
/* eslint-disable-next-line padded-blocks */
import { ReactTyped } from "react-typed";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
/* eslint-disable-next-line padded-blocks */
import { getAuth, signOut } from "firebase/auth";
/* eslint-disable-next-line padded-blocks */
import SlidingAnimation from "./Marquee";
/* eslint-disable-next-line padded-blocks */
import HowToUse from "../Pages/howtouse";

interface WelcomeBannerProps {
  displayName: string | null;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ displayName }) => {
  const redirectToHowToUse = () => {
    window.location.href = "/howtouse";
  };

  return (
    <>
      <div className="flex justify-center mt-[-2px] ml-[-95px]">
        <div className="relative">
          <div className="welcome-banner text-black font-source-sans-3 font-bold">
            Hey {displayName && `${displayName}, `}
            <br />
            <div className="font-source-sans-3 mt-[-20px]">
            <span className="font-source-sans-3 text-black">
              I am your Content{" "}
              <span className="inline-block text-[#4741a5] font-bold">
                {/* <ReactTyped
                  strings={["Assistant"]}
                  typeSpeed={100}
                  backSpeed={50}
                  backDelay={1500}
                  loop
                /> */}
                Writer
              </span>
            </span>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mt-0.1">
        <SlidingAnimation gradientColor={""} />
      </div> */}
      {/* <div className="flex justify-center items-center mt-4 font-source-sans-3 font-light">
        <a
          href="/howtouse"
          style={{
            padding: "10px 25px",
            background: "#4741a5",
            color: "white",
            border: "none",
            borderRadius: "23px",
            cursor: "pointer",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,1)",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          How to use
        </a>
      </div> */}
    </>
  );
};

export default WelcomeBanner;
