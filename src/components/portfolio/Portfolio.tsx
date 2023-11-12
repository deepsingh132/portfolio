"use client";

import { useEffect, useRef, useState } from "react";
import "./portfolio.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface Project {
  repo: string;
  forks: number;
  stars: number;
  link: string;
  language: string;
  image: string;
  description: string;
  website: string;
}

const Single = ({ item }: { item: Project }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);


  return (
    <section>
      <div className="container">
        <div className="wrapper">
          <div className="imageContainer" ref={ref}>
            {item.repo === "BooksBy" && (
              <img
                src="https://github.com/deepsingh132/BooksBy/raw/main/Screenshots/desktophome.png"
                width={500}
                height={500}
                alt=""
              />
            )}
            {item.repo === "Artsphere" && (
              <img
                src="https://github.com/deepsingh132/Artsphere/raw/main/screenshots/home.png"
                width={500}
                height={500}
                alt=""
              />
            )}
            {item.repo === "CuChat" && (
              <img
                src="https://github.com/deepsingh132/CuChat/raw/master/Screenshots/homepage.png"
                style={{
                  width: "185px",
                  height: "100%",
                }}
                alt=""
              />
            )}
            {item.repo === "FaceTrace" && (
              <img
                src="https://camo.githubusercontent.com/919bed350cfd4895b8dc9c035b4aa80fc4562ffe29e5a50f142e9dda088ee029/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3430302f312a3453774d4d6944495f326d4230645971446d757655672e676966"
                style={{
                  width: "185px",
                  height: "100%",
                }}
                alt=""
              />
            )}
          </div>
          <motion.div className="textContainer" style={{ y }}>
            <h2>
              {item.repo === "BooksBy" && "E-comm Platform"}
              {item.repo === "Artsphere" && "Next.js Twitter Plus"}
              {item.repo === "CuChat" && "X-Platform Chat App"}
              {item.repo === "FaceTrace" && "Facial ID App"}
            </h2>
            <p>{item.description}</p>
            <p>
              <a href={item.link} target="_blank">
                {item.link}
              </a>
            </p>
            <button
              onClick={() =>
                window.open(item?.website ? item.website : item.link, "_blank")
              }
            >
              See Demo
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      //TODO: api by https://github.com/egoist
      const res = await fetch(
        "https://gh-pinned-repos--master.deno.dev/?username=deepsingh132"
      );
      const data = await res.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    updateScreenWidth();
    window.addEventListener("resize", updateScreenWidth);
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  console.log(screenWidth);

  return (
    <div className="portfolio" ref={ref}>
      {screenWidth > 768 && (
        <div className="progress">
          <h1>Featured Works</h1>
          <motion.div style={{ scaleX }} className="progressBar"></motion.div>
        </div>
      )}

      {projects.map((item: any) => (
        <Single item={item} key={item?.repo} />
      ))}
      {screenWidth < 768 && (
        <div className="progress">
          <h1>Featured Works</h1>
          <motion.div style={{ scaleX }} className="progressBar"></motion.div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
