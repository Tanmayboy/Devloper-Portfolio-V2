
"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import SplitText from "./split-text";

const titles = ["Welcome", "स्वागत", "Willkommen", "ようこそ"];

const LoadingScreen = ({ loading }: { loading: boolean }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
      }, 1500); // Change title every 1.5 seconds

      return () => clearInterval(interval);
    }
  }, [loading]);


  useEffect(() => {
    if (loading) {
      const animationTimer = setTimeout(() => {
        setIsAnimating(true);
        if (typeof window !== "undefined") {
            createHalftoneEffect();
        }
      }, 1500);

      return () => {
        clearTimeout(animationTimer);
      };
    }
  }, [loading]);

  const createHalftoneEffect = () => {
    const svg = svgRef.current;
    if (!svg) return;

    const clipPath = svg.querySelector("#halftone-clip");
    if (!clipPath) return;

    while (clipPath.firstChild) {
      clipPath.removeChild(clipPath.firstChild);
    }
    
    const config = {
      rows: 25,
      cols: 25,
      duration: 1.5, 
      stagger: 0.02, 
      direction: "center"
    };

    const numCircles = config.rows * config.cols;
    const maxRadius = Math.ceil(Math.sqrt(((window.innerWidth/config.cols) ** 2 + (window.innerHeight/config.rows) ** 2)) / 2);

    const getRevealDelay = (row: number, col: number, rows: number, cols: number) => {
        const centerRow = Math.floor(rows / 2);
        const centerCol = Math.floor(cols / 2);
        const dist = Math.sqrt(Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2));
        return dist * config.stagger;
    };

    for (let i = 0; i < numCircles; i++) {
        const row = Math.floor(i / config.cols);
        const col = i % config.cols;

        const x = (col + 0.5) * (100 / config.cols) + "%";
        const y = (row + 0.5) * (100 / config.rows) + "%";
        const revealDelay = getRevealDelay(row, col, config.rows, config.cols);
        
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", "0");

        const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        animate.setAttribute("attributeName", "r");
        animate.setAttribute("values", `0;${maxRadius}`);
        animate.setAttribute("dur", `${config.duration}s`);
        animate.setAttribute("fill", "freeze");
        animate.setAttribute("begin", `${revealDelay}s`);

        circle.appendChild(animate);
        clipPath.appendChild(circle);
    }
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[100] flex h-full w-full items-center justify-center bg-black transition-opacity duration-300",
          loading ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div 
          className="w-full h-full flex items-center justify-center"
          style={{
            clipPath: isAnimating ? 'url(#halftone-clip)' : 'none'
          }}
        >
            <div className={cn(
                "flex flex-col items-center justify-center transition-opacity duration-500",
                isAnimating ? "opacity-0" : "opacity-100"
            )}>
              <div className="font-headline text-5xl font-bold text-white min-h-[4rem]">
                {titles.map((title, index) => (
                  <div key={title} style={{ display: index === titleIndex ? 'block' : 'none' }}>
                    <SplitText
                      text={title}
                      delay={50}
                      splitType="chars"
                      className=" "
                    />
                  </div>
                ))}
              </div>
            </div>
        </div>

        <div 
          className="absolute inset-0 z-[-1] bg-black"
          style={{
              clipPath: isAnimating ? 'url(#halftone-clip)' : 'none'
          }}
        />
      </div>
      <svg ref={svgRef} className="fixed w-0 h-0">
          <clipPath id="halftone-clip" clipPathUnits="objectBoundingBox">
          </clipPath>
      </svg>
    </>
  );
};

export default LoadingScreen;
