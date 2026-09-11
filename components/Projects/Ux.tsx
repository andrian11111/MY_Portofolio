import ProjectCard, { Project } from "./ProjectCard";

const uxProjects: Project[] = [
  {
    title: "Ngekost Design",
    description:
      "Mobile Ngekost Application Interface Design",
    tags: ["Figma", "UI/UX Design", "Wireframing", "User Research"],
    image: "yahud.png",
    github: "",
    demo: "",
  },
  {
    title: "Gerai UMKM Design",
    description:
      "Mobile Gerai UMKMt Application Interface Design",
    tags: ["Figma", "Prototyping", "Design System"],
    image: "uh.png",
    github: "", 
    demo: "",
  },
];

export default function Ux() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {uxProjects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}
