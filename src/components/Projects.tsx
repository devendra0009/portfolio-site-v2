import { Section } from "./Section";
import { Folder, ExternalLink, Github } from "lucide-react";

const PROJECTS = [
  {
    title: "Buzzer",
    description: "A scalable social media platform supporting user profiles, posts, and feeds. Features real-time chatting using WebSockets and audio/video calling via WebRTC.",
    tech: ["Spring Boot", "ReactJS", "Kafka", "AWS SNS"],
    github: "https://github.com/devendra0009/buzzer-be",
    live: ""
  },
  {
    title: "DpBattle",
    description: "A contest-based social platform allowing users to create battles, upload content, vote, and engage dynamically with other users.",
    tech: ["MERN", "Redux", "Vercel", "OnRender"],
    github: "https://github.com/devendra0009/dpBattleFrontend",
    live: "https://dp-battle-frontend.vercel.app"
  },
  {
    title: "Tri2Do App",
    description: "All-in-one DSA solving platform with 6 sheets support from different creators. Built with smooth UI/UX and various problem-solving functionalities.",
    tech: ["NextJs", "TailwindCss", "WebScraping", "Antd"],
    github: "https://github.com/devendra0009/tri2doo",
    live: "https://tri2do.vercel.app/"
  },
  // {
  //   title: "Ecommerce App",
  //   description: "An ecommerce app where you can shop and add/remove any product you want. User and admin portal provided communicating with custom-made APIs.",
  //   tech: ["MongoDB", "ExpressJs", "ReactJs", "NodeJs"],
  //   github: "https://github.com/devendra0009/backend-ecom",
  //   live: "https://backend-ecom-yeai.onrender.com/"
  // },
  {
    title: "Mopie App",
    description: "Dynamic web-app displaying all latest and upcoming movie details using TMDB API. Users can search movies, login/register, and add them to watch later.",
    tech: ["NextJs", "Tailwind", "MongoDB", "TMDB API"],
    github: "https://github.com/devendra0009/MopieApp",
    live: "https://mopie-app.vercel.app/"
  },
  {
    title: "myDiary App",
    description: "A digital diary app handling Create, Read, Update and Delete capabilities for your daily text entries.",
    tech: ["ReactJS", "NodeJs", "ExpressJs", "MongoDB"],
    github: "https://github.com/devendra0009/myDiaryFrontend",
    live: "https://my-diary-rgwg.onrender.com/"
  },
  {
    title: "KhabriBhai App",
    description: "A live news providing app keeping you updated with the latest alerts around the world using an external News API.",
    tech: ["ReactJS", "BootStrap", "News API"],
    github: "https://github.com/devendra0009/KhabriBhai",
    live: "https://devendra0009.github.io/KhabriBhai/"
  },
  {
    title: "WordTwin App",
    description: "React built app which dynamically fetches the synonym or related vocabulary for any inputted word.",
    tech: ["ReactJS", "BootStrap", "Word Synonym API"],
    github: "https://github.com/devendra0009/Word_Twin",
    live: "https://devendra0009.github.io/Word_Twin/"
  },
  {
    title: "TaskSaver App",
    description: "A fast to-do list application powered by the browser's native localStorage to save and persist your tasks offline.",
    tech: ["ReactJS", "CSS", "Local Storage"],
    github: "https://github.com/devendra0009/taskSaver",
    live: "https://devendra0009.github.io/taskSaver/"
  },
  {
    title: "Calculator App",
    description: "A functional calculator that performs classic arithmetics, engineered entirely relying on React's useReducer hook.",
    tech: ["ReactJS", "useReducer()"],
    github: "https://github.com/devendra0009/Calculator",
    live: "https://devendra0009.github.io/Calculator/"
  }
];

export function Projects() {
  return (
    <Section id="projects" number="04" title="Projects">
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <div 
              key={index} 
              className="group h-full flex flex-col justify-between p-6 sm:p-8 bg-[#050505] border border-borderDark rounded hover:-translate-y-2 hover:border-accent-amber transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <Folder className="w-10 h-10 text-accent-amber stroke-[1.5]" />
                  <div className="flex gap-4">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-accent-amber transition-colors">
                        <Github className="w-5 h-5 stroke-[2]" />
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-accent-amber transition-colors">
                        <ExternalLink className="w-5 h-5 stroke-[2]" />
                      </a>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-light group-hover:text-accent-amber transition-colors mb-3">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-auto pt-4">
                {project.tech.map((tech, i) => (
                  <span key={i} className="text-xs font-mono text-gray-500">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
