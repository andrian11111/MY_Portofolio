import ProjectCard, { Project } from "./ProjectCard";

const webProjects: Project[] = [
  {
    title: "Local Bizzy",
    description:
      "Local Bizzy is an e-commerce platform for UMKM products.",
    tags: [
      "Vite",
      "Tailwind",
      "Laravel",
      "MySQL",
    ],
    image: "local.jpeg",
    github: "https://github.com/andrian11111",
    demo: "",
  },
  {
    title: "CMS Website Project",
    description:
      "CMS Website Project is a Content Management System for managing website content.",
    tags: ["Next.js", "Tailwind", "Prisma", "PostgreSQL"],
    image: "cms.png",
    github: "https://github.com/andrian11111",
    demo: ""
  },

];

export default function Web() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {webProjects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}
