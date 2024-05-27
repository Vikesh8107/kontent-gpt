import FastMarquee from "react-fast-marquee";
import "./Marquee.css";
import img1 from "../assets/reviewSS/testimonial1.jpeg";
import img2 from "../assets/reviewSS/testimonial2.jpeg";
import img3 from "../assets/reviewSS/testimonial3.jpeg";
import img4 from "../assets/reviewSS/testimonial4.jpeg";
import img5 from "../assets/reviewSS/testimonial5.jpeg";
import img6 from "../assets/reviewSS/testimonial6.jpeg";
import img7 from "../assets/reviewSS/testimonial7.jpeg";
import img8 from "../assets/reviewSS/testimonial8.jpeg";
import img9 from "../assets/reviewSS/testimonial9.jpeg";
import img10 from "../assets/reviewSS/testimonial10.jpeg";
import img11 from "../assets/reviewSS/testimonial11.jpeg";

interface MarqueeProps {
  gradientColor: string;
  gradient?: boolean;
  gradientWidth?: number | string;
}

const Marquee: React.FC<MarqueeProps> = () => {
  return (
    <div className="images">
      <FastMarquee
        direction="left"
        speed={180}
        pauseOnHover
        gradient={true}
        gradientColor="white"
        gradientWidth="50px"
      >
        <div className="image_wrapper">
          <img
            src={img1}
            alt=""
            width={170}
            height={200}
            className="rounded-image"
          />
        </div>
        <div className="image_wrapper">
          <img
            src={img2}
            alt=""
            width={170}
            height={200}
            className="rounded-image"
          />
        </div>
        <div className="image_wrapper">
          <img
            src={img3}
            alt=""
            width={300}
            height={200}
            className="rounded-image"
          />
        </div>
        <div className="image_wrapper">
          <img
            src={img4}
            alt=""
            width={300}
            height={200}
            className="rounded-image"
          />
        </div>
        <div>
          <img
            src={img5}
            alt=""
            width={200}
            height={200}
            className="rounded-image"
          />
        </div>
        <div className="image_wrapper">
          <img
            src={img6}
            alt=""
            width={300}
            height={200}
            className="rounded-image"
          />
        </div>
        <div className="image_wrapper">
          <img
            src={img7}
            alt=""
            width={200}
            height={200}
            className="rounded-image"
          />
        </div>
        <div className="image_wrapper">
          <img
            src={img8}
            alt=""
            width={300}
            height={200}
            className="rounded-image"
          />
        </div>
        <div className="image_wrapper">
          <img
            src={img9}
            alt=""
            width={300}
            height={200}
            className="rounded-image"
          />
        </div>
        <div className="image_wrapper">
          <img
            src={img10}
            alt=""
            width={150}
            height={300}
            className="rounded-image"
          />
        </div>
        <div className="image_wrapper">
          <img
            src={img11}
            alt=""
            width={300}
            height={200}
            className="rounded-image"
          />
        </div>
      </FastMarquee>
    </div>
  );
};

export default Marquee;
