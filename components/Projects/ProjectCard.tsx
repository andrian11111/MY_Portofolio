import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  demo?: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  const imageSrc = project.image.startsWith("/") ? project.image : `/${project.image}`;

  return (
    <div className="project-card group relative bg-gray-900/30 border border-gray-800 rounded-xl sm:rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-500 flex flex-col">
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={imageSrc}
          alt={project.title}
          width={600}
          height={400}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
          unoptimized
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 sm:gap-4">
          {project.github && (
            <a
              href={project.github}
              className="p-2 sm:p-3 bg-gray-800 rounded-full hover:bg-amber-500 hover:text-black transition-all duration-300 transform hover:scale-110"
              title="View Code"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 sm:w-5 h-4 sm:h-5" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              className="p-2 sm:p-3 bg-gray-800 rounded-full hover:bg-rose-500 hover:text-white transition-all duration-300 transform hover:scale-110"
              title="View Live"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 sm:w-5 h-4 sm:h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-amber-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-500 mb-4 flex-1 text-xs sm:text-sm leading-relaxed font-sans">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full bg-gray-800 text-gray-400 border border-gray-700 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
