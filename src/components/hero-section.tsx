
"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import Hyperspeed from "./Hyperspeed";
import { hyperspeedPresets } from "@/lib/hyperspeed-presets";
import SplitText from './split-text';

const titles = ["Full-Stack Developer", "Tech Enthusiast", "Creative Coder"];

export default function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 4000); // Change title every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex h-[calc(100vh-4rem)] min-h-[500px] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full">
        <Hyperspeed
          effectOptions={hyperspeedPresets.one}
        />
      </div>
      <div className="container relative z-10 mx-auto max-w-7xl px-4 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          John Doe
        </h1>
        <div className="mt-3 text-lg text-primary sm:text-xl md:text-2xl font-headline min-h-[2.5rem] md:min-h-[3rem]">
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
        <p className="mx-auto mt-6 max-w-2xl text-base text-foreground/80 sm:text-lg">
          Crafting elegant, high-performance web solutions that bring ideas to life.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="#projects">
            <Button size="lg" className="w-full sm:w-auto">
              View My Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
