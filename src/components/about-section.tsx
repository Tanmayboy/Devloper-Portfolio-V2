import { skills } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import TiltCard from "./tilt-card";

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
        <div className="space-y-4">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            About Me
          </h2>
          <p className="text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            I'm a passionate full-stack developer with a love for creating beautiful and functional web applications. With a strong foundation in both front-end and back-end technologies, I enjoy tackling complex problems and turning ideas into reality. I'm always eager to learn new things and improve my skills.
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <TiltCard key={skill.name}>
              <Card className="flex h-full flex-col items-center justify-center p-4 aspect-square bg-card hover:bg-secondary">
                <CardContent className="flex flex-col items-center justify-center gap-2 p-0">
                  <skill.icon className="h-8 w-8 text-primary" />
                  <span className="text-center text-sm font-medium">{skill.name}</span>
                </CardContent>
              </Card>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
