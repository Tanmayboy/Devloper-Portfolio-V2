import { projects } from "@/lib/data";
import ProjectCard from "./project-card";

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-16 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              My Projects
            </h2>
            <p className="mx-auto max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Here are some of the projects I've worked on. Feel free to explore them.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:max-w-none">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
