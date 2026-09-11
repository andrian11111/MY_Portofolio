"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Folder } from "lucide-react";
import Web from "./Projects/Web";
import Mobile from "./Projects/Mobile";
import IoT from "./Projects/IoT";
import Video from "./Projects/Video";
import Ux from "./Projects/Ux";

gsap.registerPlugin(ScrollTrigger);

type CategoryType = "Web" | "Mobile" | "IoT" | "Video" | "Ui/Ux";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<CategoryType>("Web");

  useEffect(() => {
    // Initial scroll trigger animation on first load
    const cards = containerRef.current?.querySelectorAll(".project-card");
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    // Trigger stagger animation when category changes
    const cards = containerRef.current?.querySelectorAll(".project-card");
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          overwrite: "auto",
        }
      );
    }
  }, [category]);

  const categories: CategoryType[] = ["Web", "Mobile", "IoT", "Video", "Ui/Ux"];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-16 md:py-24 bg-[#0a0a0f] relative"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 sm:px-4 py-1.5 sm:py-2 border border-amber-500/30 rounded-full bg-amber-500/5 backdrop-blur-sm text-xs sm:text-sm font-mono text-amber-400">
            <Folder className="w-3 sm:w-4 h-3 sm:h-4" />
            Featured Work
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-3xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            My Projects
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base px-4 mb-6">
            Here are some of the projects I've worked on. Each one was a unique
            challenge that helped me grow as a developer.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => {
              const isActive = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all duration-300 ${
                    isActive
                      ? "border-amber-500/30 bg-amber-500/10 text-amber-400 font-medium"
                      : "border-gray-700 bg-gray-900 text-gray-300 hover:border-amber-500 hover:text-amber-400"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Category Projects Render */}
        <div ref={containerRef}>
          {category === "Web" && <Web />}
          {category === "Mobile" && <Mobile />}
          {category === "IoT" && <IoT />}
          {category === "Video" && <Video />}
          {category === "Ui/Ux" && <Ux />}
        </div>
      </div>
    </section>
  );
}
