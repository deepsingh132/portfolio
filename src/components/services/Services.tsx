"use client";

import { useRef } from "react";
import "./services.scss";
import { motion, useInView } from "framer-motion";

const variants = {
  initial: {
    x: -500,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const Services = () => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <motion.div
      className="services"
      variants={variants}
      initial="initial"
      whileInView="animate"
      ref={ref}
      animate={"animate"}
    >
      <motion.div className="textContainer" variants={variants}>
        <p>
          Crafting Seamless User Experiences
          <br /> With React and Next.js
        </p>
        <hr />
      </motion.div>
      <motion.div className="titleContainer" variants={variants}>
        <div className="title">
          <img src="/people.webp" width={50} height={50} alt="" />
          <h1>
            <motion.b whileHover={{ color: "orange" }}>Transforming</motion.b>{" "}
            Ideas
          </h1>
        </div>
        <div className="title">
          <h1>
            <motion.b whileHover={{ color: "orange" }}>Into</motion.b>{" "}
            Functionality
          </h1>
          <button
            onClick={() => window.open("https://www.github.com/deepsingh132")}
          >
            WHAT DO I DO?
          </button>
        </div>
      </motion.div>
      <motion.div className="listContainer" variants={variants}>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>React Development</h2>
          <p>
            As a front-end developer, I specialize in crafting dynamic and
            interactive web applications using React.js. My proficiency extends
            to leveraging the power of React components to build scalable and
            maintainable user interfaces.
          </p>
          <button>Go</button>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>E-Commerce Solutions</h2>
          <p>
            I take pride in having developed a fully functional e-commerce
            website, showcasing my ability to implement end-to-end solutions.
            This includes user-friendly product displays, secure payment
            gateways, and a smooth checkout process. I understand the
            intricacies of creating an online shopping experience that is both
            engaging and efficient.
          </p>
          <button>Go</button>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>Responsive Design</h2>
          <p>
            Ensuring a consistent and enjoyable user experience across various
            devices is at the core of my development philosophy. I specialize in
            creating responsive designs that adapt seamlessly to different
            screen sizes, providing users with a visually appealing and
            intuitive interface.
          </p>
          <button>Go</button>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>Component-Based Architecture</h2>
          <p>
            My development approach revolves around the principles of
            component-based architecture. By breaking down complex applications
            into modular components, I enhance maintainability and reusability,
            resulting in more efficient and scalable projects.
          </p>
          <button>Go</button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Services;
