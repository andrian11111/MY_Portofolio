"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ExternalLink, Calendar, MapPin, X } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const certificates = [

    {
        title: "SERTIFIKAT BNSP",
        issuer: "Badan Nasional Sertifikasi Profesi (BNSP) melalui LSP Teknologi Digital",
        date: "20 Januari 2026",
        description: "Sertifikasi profesional untuk skema Pengembang Mobile Pratama (Junior Mobile Developer). Menandakan penguasaan standar kompetensi kerja nasional dalam pengembangan aplikasi mobile, mencakup pemahaman struktur kode yang efisien, fungsionalitas aplikasi, dan implementasi teknologi Aplikasi modern.",
        icon: <Award className="w-6 h-6 text-amber-400" />,
        color: "from-amber-500/20 to-orange-500/20",
        border: "group-hover:border-amber-500/50",
        image: '/sertifikat/BNSP Mobile.png'
    },
    {
        title: "Sertifikat Belajar Dasar Cloud Computing",
        issuer: "Dicoding",
        date: "2025",
        description: "Sertifikasi profesional untuk skema Belajar Dasar Cloud Computing.",
        icon: <Award className="w-6 h-6 text-amber-400" />,
        color: "from-amber-500/20 to-orange-500/20",
        border: "group-hover:border-amber-500/50",
        image: "/sertifikat/Belajar Dasar Cloud.png"
    },
    {
        title: "Sertifikat Penghargaan Lomba",
        issuer: "Perserta Lomba CodexPlore",
        date: "1 Agustus 2025",
        description: "Sertifikat Penghargaan Peserta Lomba CodexPlore(Website).",
        icon: <Award className="w-6 h-6 text-amber-400" />,
        color: "from-amber-500/20 to-orange-500/20",
        border: "group-hover:border-amber-500/50",
        image: "/sertifikat/w.jpeg"
    },
    {
        title: "Srtifiat Fuerdamental SQL",
        issuer: "DQLab",
        date: "14 Februari 2024",
        description: "Sertifikat pelatihan Fuerdamental SQL.",
        icon: <Award className="w-6 h-6 text-amber-400" />,
        color: "from-amber-500/20 to-orange-500/20",
        border: "group-hover:border-amber-500/50",
        image: "/sertifikat/Fuerdamental SQL.png"
    },
    {
        title: "Sertifikat Argoritma dan pemograman dasar",
        issuer: "CODEPOLITAN",
        date: "Tahun Akademik 2024/2025",
        description: "Sertif Pelatihan Argoritma dan pemograman dasar - CODEPOLITAN.",
        icon: <Award className="w-6 h-6 text-amber-400" />,
        color: "from-amber-500/20 to-orange-500/20",
        border: "group-hover:border-amber-500/50",
        image: "/sertifikat/CODEPOLITAN.png"
    },
  


];

export default function Certificates() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedImage]);

    useEffect(() => {
        const cards = containerRef.current?.querySelectorAll(".cert-card");

        if (cards) {
            gsap.fromTo(
                cards,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }
    }, []);

    return (
        <section ref={sectionRef} id="certificates" className="py-20 md:py-32 bg-[#0a0a0f] relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[120px] -z-10" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 border border-amber-500/30 rounded-full bg-amber-500/5 backdrop-blur-sm text-sm font-mono text-amber-400">
                        <Award className="w-4 h-4" />
                        Recognitions
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                        Certificates & Achievements
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        A collection of certifications and honors that validate my technical skills and professional growth in the field of technology.
                    </p>
                </div>

                <div
                    ref={containerRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                >
                    {certificates.map((cert, index) => (
                        <div
                            key={index}
                            className={`cert-card group relative p-6 sm:p-8 bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl hover:bg-gray-800/60 transition-all duration-500 flex flex-col h-full ${cert.border} hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)]`}
                        >
                            {/* Decorative Corner Glow */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cert.color} blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-gray-800/80 rounded-xl border border-gray-700 group-hover:border-transparent transition-all duration-500 group-hover:scale-110">
                                        {cert.icon}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 font-mono text-[10px] sm:text-xs">
                                        <Calendar className="w-3 h-3 text-amber-500" />
                                        {cert.date}
                                    </div>
                                </div>

                                <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-amber-400 transition-colors duration-300">
                                    {cert.title}
                                </h3>
                                <div className="flex items-center gap-2 text-amber-400/80 mb-4 text-xs sm:text-sm font-medium">
                                    <MapPin className="w-3 h-3" />
                                    {cert.issuer}
                                </div>
                                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 flex-grow">
                                    {cert.description}
                                </p>
                            </div>

                            <div className="mt-auto relative z-10 pt-6 border-t border-gray-800 group-hover:border-gray-700 transition-colors">
                                {cert.image ? (
                                    <button
                                        onClick={() => setSelectedImage(cert.image)}
                                        className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white group/btn hover:text-amber-400 transition-colors"
                                    >
                                        View Certificate
                                        <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                    </button>
                                ) : (
                                    <span className="text-xs sm:text-sm font-medium text-gray-500 italic">
                                        Certificate pending
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="fixed top-4 right-4 md:top-6 md:right-6 p-2.5 text-gray-300 hover:text-white bg-gray-800/80 hover:bg-gray-700/80 rounded-full transition-all z-[110] shadow-lg"
                        aria-label="Close modal"
                    >
                        <X className="w-6 h-6 md:w-8 md:h-8" />
                    </button>

                    <div
                        className="relative max-w-5xl w-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage}
                            alt="Certificate View"
                            width={1200}
                            height={800}
                            className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            priority
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
