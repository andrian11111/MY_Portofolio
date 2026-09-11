"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Mail, Calendar, Briefcase, Linkedin } from "lucide-react";
import Image from "next/image";
import TypeWriter from "./ui/TypeWriter";
import LanyardCard from "./ui/LanyardCard";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });

        tl.fromTo(
            imageRef.current,
            { opacity: 0, x: -50, scale: 0.9 },
            { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power3.out" }
        ).fromTo(
            contentRef.current,
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
            "-=0.5"
        );
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="py-16 sm:py-20 md:py-32 bg-[#0d0d12] relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            <div className="absolute top-1/2 right-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-rose-500/5 rounded-full blur-[100px] md:blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-amber-500/5 rounded-full blur-[80px] md:blur-[100px]" />

            <div className="container px-4 sm:px-6 mx-auto relative z-10">
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 border border-amber-500/30 rounded-full bg-amber-500/5 backdrop-blur-sm text-xs sm:text-sm font-mono text-amber-400">
                        <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-amber-400" />
                        About Me
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Get to Know Me
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-20 items-center">

                    {/* ================= LEFT ================= */}
                    <div
                        ref={imageRef}
                        className="relative flex justify-center lg:justify-start"
                    >
                        <LanyardCard />
                    </div>

                    {/* ================= RIGHT ================= */}
                    <div
                        ref={contentRef}
                        className="flex flex-col justify-start lg:pt-10 text-center lg:text-left"
                    >
                        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
                            Hi, I&apos;m{" "}
                            <span className="text-amber-400">
                                Andrian Alfiani
                            </span>
                        </h3>

                        <div className="mt-6">
                            <TypeWriter />
                        </div>

                        <div className="mt-6">
                            <p className="text-gray-400 mb-6 leading-relaxed text-base">
                                I&apos;m a passionate Full-Stack Developer based in Indonesia
                                with a love for creating beautiful, functional, and
                                user-friendly applications. I specialize in building modern web
                                applications using cutting-edge technologies.
                            </p>

                            <p className="text-gray-400 mb-8 leading-relaxed text-base">
                                With a strong foundation in both frontend and backend
                                development, I enjoy turning complex problems into simple,
                                elegant solutions. When I&apos;m not coding, you can find me
                                exploring new technologies, contributing to open-source
                                projects, or learning something new.
                            </p>
                        </div>

                        {/* INFO CARDS */}
                        <div className="grid grid-cols-2 gap-4">

                            {/* Location */}
                            <div className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-amber-500/30 transition-colors">
                                <div className="p-2 bg-amber-500/10 rounded-lg">
                                    <MapPin className="w-5 h-5 text-amber-400" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Location</p>
                                    <p className="text-white text-sm font-medium">
                                        Indonesia
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <a
                                href="mailto:andrean.alfian2003@gmail.com"
                                className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-rose-500/30 transition-colors"
                            >
                                <div className="p-2 bg-rose-500/10 rounded-lg">
                                    <Mail className="w-5 h-5 text-rose-400" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Email</p>
                                    <p className="text-white text-sm">
                                        andrean.alfian2003@gmail.com
                                    </p>
                                </div>
                            </a>

                            {/* Linkedin */}
                            <a
                                href="https://www.linkedin.com/in/andrian-alfiani-734957325
/"
                                target="_blank"
                                className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-amber-500/30 transition-colors"
                            >
                                <div className="p-2 bg-amber-500/10 rounded-lg">
                                    <Linkedin className="w-5 h-5 text-amber-400" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">LinkedIn</p>
                                    <p className="text-white text-sm">Connect</p>
                                </div>
                            </a>

                            {/* Experience */}
                            <div className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-amber-500/30 transition-colors">
                                <div className="p-2 bg-amber-500/10 rounded-lg">
                                    <Briefcase className="w-5 h-5 text-amber-400" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Experience</p>
                                    <p className="text-white text-sm">2+ Years</p>
                                </div>
                            </div>

                            {/* Availability */}
                            <div className="col-span-2 flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-rose-500/30 transition-colors">
                                <div className="p-2 bg-rose-500/10 rounded-lg">
                                    <Calendar className="w-5 h-5 text-rose-400" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Availability</p>
                                    <p className="text-white text-sm">
                                        Full-time / Freelance
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-8 justify-center lg:justify-start">
                            <div className="flex flex-row gap-2 sm:gap-3 flex-1 sm:flex-initial">
                                <a
                                    href="https://drive.google.com/file/d/1l9Mh2ZYAe4z4swk10vIX7PPpOr0FJF_a/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 text-center text-xs sm:text-base flex items-center justify-center gap-2"
                                >
                                    <span className="hidden sm:inline">CV</span> (IDN)
                                </a>
                                <a
                                    href="https://drive.google.com/file/d/1l9Mh2ZYAe4z4swk10vIX7PPpOr0FJF_a/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 text-center text-xs sm:text-base flex items-center justify-center gap-2"
                                >
                                    <span className="hidden sm:inline">CV</span> (ENG)
                                </a>
                            </div>
                            <a
                                href="https://wa.me/6287710176594"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 sm:px-6 py-2.5 sm:py-3 border border-gray-700 bg-gray-900/50 hover:bg-gray-800/50 hover:border-amber-500/50 transition-all duration-300 font-medium rounded-lg text-center text-white text-sm sm:text-base flex-1 sm:flex-none"
                            >
                                Let&apos;s Talk
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section >
    );
}

