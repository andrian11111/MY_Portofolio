import ProjectCard, { Project } from "./ProjectCard";

const videoProjects: Project[] = [
  {
    title: "Portfolio Video",
    description: "A high-quality personal portfolio video showcasing development skills and creative works.",
    tags: ["Capcut"],
    image: "edit.png",
  },
  
];

export default function Video() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {videoProjects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}
