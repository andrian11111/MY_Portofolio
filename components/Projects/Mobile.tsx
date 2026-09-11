import ProjectCard, { Project } from "./ProjectCard";

const mobileProjects: Project[] = [
  
  {
    title: "Gerai UMKM Apps",
    description: "An interactive mobile educational platform providing course access, progress tracking, and interactive quizzes.",
    tags: ["Flutter", "Dart", "Firebase", "GetX"],
    image: "MM.png",
    github: "",
  },
];

export default function Mobile() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {mobileProjects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}