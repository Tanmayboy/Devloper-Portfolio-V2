import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages, type ImagePlaceholder } from "@/lib/placeholder-images";
import ElectricBorder from "./electric-border";
import { useTheme } from "next-themes";

type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  imageId: string;
};

export default function ProjectCard({
  title,
  description,
  tags,
  githubUrl,
  demoUrl,
  imageId,
}: ProjectCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === imageId);
  const { theme } = useTheme();
  
  // Using hsl values from globals.css for a theme-consistent color
  const electricColor = theme === 'dark' ? '#A7CBCF' : '#65979f';

  return (
    <ElectricBorder
      color={electricColor}
      speed={1}
      chaos={0.5}
      thickness={1}
      style={{ borderRadius: 'var(--radius)' }}
    >
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-card/80 backdrop-blur-sm">
        {image && (
          <div className="relative aspect-video w-full">
              <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
          </div>
        )}
        <CardHeader>
          <CardTitle className="font-headline">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-5 w-5" />
                <span className="sr-only">Live Demo</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </ElectricBorder>
  );
}
