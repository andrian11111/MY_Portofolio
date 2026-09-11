import ProjectCard, { Project } from "./ProjectCard";

const iotProjects: Project[] = [
  {
    title: "Capacitor Discharge Ignition Programable",
    description:
      "An electronic ignition system for vehicles that allows the spark timing to be adjusted and reprogrammed via a computer or mobile device. Users can freely customize ignition timing curves and engine RPM limits to achieve optimal power.",
    tags: ["C++", "Arduino IDE"],
    image: "eggspire.png",
    github: "https://github.com/andrian11111",
    demo: "",
  },

  {
    title: "Motorcycle Security",
    description:
      "An IoT-based motorcycle security system designed to shut off the engine and send a notification in the event of a theft attempt; it also features an alarm..",
    tags: ["C++", "Arduino IDE", "React", "API Website"],
    image: "IoT.png",
    github: "https://github.com/andrian11111",
    demo: "",
  },
];

export default function IoT() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {iotProjects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}