"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Smartphone, Cpu, Video, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "Web Development",
        description: "Crafting modern, highly responsive, and user-centric web applications tailored to solve complex problems and deliver exceptional performance.",
        features: [
            "Single Page Apps & Server-Side Rendering",
            "State-of-the-art Frontend (React, Next.js)",
            "Robust Backends & API Integrations",
            "Database Design & Performance Tuning"
        ],
        icon: Code2,
        color: "#f59e0b", // Amber
        gradient: "from-amber-500/20 to-orange-500/10",
        borderHover: "hover:border-amber-500/50",
        iconColor: "text-amber-400",
        glowColor: "rgba(245,158,11,0.15)",
    },
    {
        title: "Mobile Development",
        description: "Building native-quality cross-platform mobile apps that offer smooth performance, intuitive UI/UX, and reliable offline capabilities.",
        features: [
            "Cross-Platform Apps (React Native/Flutter)",
            "Intuitive UI/UX Navigation Flows",
            "Local Storage & Secure Data Caching",
            "App Store & Google Play Optimization"
        ],
        icon: Smartphone,
        color: "#fb7185", // Rose
        gradient: "from-rose-500/20 to-orange-500/10",
        borderHover: "hover:border-rose-500/50",
        iconColor: "text-rose-400",
        glowColor: "rgba(251,113,133,0.15)",
    },
    {
        title: "Internet of Things (IoT)",
        description: "Integrating physical hardware with digital solutions, enabling smart automation, real-time sensor monitoring, and telemetry data visualization.",
        features: [
            "Hardware Integrations (ESP32, Arduino)",
            "Real-time Dashboards & Data Telemetry",
            "MQTT, WebSockets & HTTP Protocols",
            "Sensors & Actuators Automation Logic"
        ],
        icon: Cpu,
        color: "#34d399", // Emerald
        gradient: "from-emerald-500/20 to-teal-500/10",
        borderHover: "hover:border-emerald-500/50",
        iconColor: "text-emerald-400",
        glowColor: "rgba(52,211,153,0.15)",
    },
    {
        title: "Video Editing",
        description: "Creating engaging visual content through creative storytelling, dynamic motion graphics, pacing alignment, and advanced color grading.",
        features: [
            "Dynamic Cuts, Pacing & Syncing",
            "Engaging Motion Graphics & Text Assets",
            "Color Correction & Professional Grading",
            "Sound Design & Audio Enhancement"
        ],
        icon: Video,
        color: "#fb7185", // Rose
        gradient: "from-rose-500/20 to-orange-500/10",
        borderHover: "hover:border-rose-500/50",
        iconColor: "text-rose-400",
        glowColor: "rgba(251,113,133,0.15)",
    }
];

export default function Services() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cards = gridRef.current?.querySelectorAll(".service-card");

        if (cards) {
            gsap.fromTo(
                cards,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            id="services"
            className="py-16 md:py-24 bg-[#0a0a0f] relative overflow-hidden"
        >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/3 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container px-4 mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 mb-4 px-3 sm:px-4 py-1.5 sm:py-2 border border-amber-500/30 rounded-full bg-amber-500/5 backdrop-blur-sm text-xs sm:text-sm font-mono text-amber-400">
                        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                        My Services
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-3xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Solutions I Provide
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base px-4">
                        Leveraging technology and creativity to build premium digital experiences and solve real-world problems.
                    </p>
                </div>

                {/* Grid */}
                <div
                    ref={gridRef}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={index}
                                className={`service-card group relative bg-gray-900/20 border border-gray-800/80 rounded-2xl p-6 transition-all duration-500 flex flex-col justify-between ${service.borderHover}`}
                                style={{
                                    boxShadow: `0 4px 30px rgba(0, 0, 0, 0.4)`,
                                    background: `linear-gradient(135deg, rgba(17, 24, 39, 0.4) 0%, rgba(3, 7, 18, 0.6) 100%)`
                                }}
                            >
                                {/* Glow Highlight Overlay */}
                                <div
                                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                                />

                                <div className="relative z-10">
                                    {/* Icon Container */}
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-gray-900 border border-gray-800 transition-transform duration-500 group-hover:scale-110 group-hover:border-amber-500/25`}>
                                        <Icon className={`w-6 h-6 ${service.iconColor} transition-transform duration-500`} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                        {service.description}
                                    </p>

                                    {/* Features List */}
                                    <ul className="space-y-2 mb-6">
                                        {service.features.map((feature, fIndex) => (
                                            <li key={fIndex} className="flex items-start gap-2 text-xs text-gray-500">
                                                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${service.iconColor.replace('text-', 'bg-')}`} />
                                                <span className="flex-1 leading-snug">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Custom subtle indicator at bottom */}
                                <div className="relative z-10 flex items-center justify-between text-xs text-gray-600 font-mono mt-auto pt-2 border-t border-gray-800/40">
                                    <span>SERVICE_0{index + 1}</span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-gray-400">
                                        Active &rarr;
                                    </span>
                                </div>

                                {/* Glowing shadow ring on hover */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                                    style={{
                                        boxShadow: `0 0 30px -5px ${service.glowColor}`
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
