"use client";

import { useEffect, useRef, useState } from "react";
import "./portfolio.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface Project {
  name: string;
  forks: number;
  stars: number;
  url: string;
  language: string;
  image: string;
  description: string;
  homepageUrl: string;
}

const Single = ({ item }: { item: Project }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  function truncate(str: string, n: number) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <section>
      <div className="container">
        <div className="wrapper">
          <div className="imageContainer" ref={ref}>
            {item.name === "BooksBy" && (
              <img
                src="https://github.com/deepsingh132/BooksBy/raw/main/Screenshots/desktophome.png"
                width={500}
                height={500}
                alt=""
              />
            )}
            {item.name === "Artsphere" && (
              <img
                src="https://github.com/deepsingh132/Artsphere/raw/main/screenshots/home.png"
                width={500}
                height={500}
                alt=""
              />
            )}
            {item.name === "CuChat" && (
              <img
                src="https://github.com/deepsingh132/CuChat/raw/master/Screenshots/homepage.png"
                style={{
                  width: "185px",
                  height: "100%",
                }}
                alt=""
              />
            )}
            {item.name === "FaceTrace" && (
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
              {item.name === "BooksBy" && "E-comm Platform"}
              {item.name === "Artsphere" && "Next.js Twitter Plus"}
              {item.name === "CuChat" && "X-Platform Chat App"}
              {item.name === "FaceTrace" && "Facial ID App"}
            </h2>
            <p>{truncate(item.description, 200)}</p>
            <p>
              <a href={item.url} target="_blank">
                {item.url}
              </a>
            </p>
            {item.homepageUrl && (
              <button>
                <a href={item.homepageUrl} target="_blank">
                  See Demo
                </a>
              </button>)
            }
            {
              // for notes
              item.name === "BooksBy" && (
                <span>
                  *Note:{" "}
                  The server is hosted on render, Please wait 10-15 seconds for the instance to start.
                </span>

              )
            }
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [screenWidth, setScreenWidth] = useState(0);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}`, {
          cache: "force-cache",
        });
        const data = await res.json();
        setProjects(data?.repos);
        setFetching(false);
      } catch (error) {
        console.error("Error fetching projects from github", error);
        setFetching(false);
      }
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

  return (
    <div className="portfolio" ref={ref}>
      {screenWidth > 768 && (
        <div className="progress">
          <h1>Featured Works</h1>
          <motion.div style={{ scaleX }} className="progressBar"></motion.div>
        </div>
      )}

      {
        fetching ? <div className="spinner"></div> :
        projects.map((item: any) => (
        <Single item={item} key={item?.name} />
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
