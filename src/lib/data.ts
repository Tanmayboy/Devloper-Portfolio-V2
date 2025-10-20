import { Code, Bot, Braces, Paintbrush, SwatchBook, type LucideIcon } from "lucide-react";

export const skills: { name: string; icon: LucideIcon }[] = [
  { name: 'React', icon: Braces },
  { name: 'Next.js', icon: Braces },
  { name: 'TypeScript', icon: Code },
  { name: 'Node.js', icon: Code },
  { name: 'Tailwind CSS', icon: Paintbrush },
  { name: 'Three.js', icon: SwatchBook },
  { name: 'GenAI', icon: Bot },
];

export const projects = [
  {
    id: 'proj1',
    title: 'Project Alpha',
    description: 'A cutting-edge web application for task management, built with the latest technologies to ensure performance and scalability.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com',
    demoUrl: '#',
    imageId: '1',
  },
  {
    id: 'proj2',
    title: 'Project Beta',
    description: 'An e-commerce platform with a focus on user experience and a seamless checkout process. Features a 3D product viewer.',
    tags: ['React', 'Three.js', 'Node.js'],
    githubUrl: 'https://github.com',
    demoUrl: '#',
    imageId: '2',
  },
  {
    id: 'proj3',
    title: 'Project Gamma',
    description: 'A generative AI-powered content creation tool that helps users write articles, blogs, and social media posts.',
    tags: ['GenAI', 'Python', 'FastAPI'],
    githubUrl: 'https://github.com',
    demoUrl: '#',
    imageId: '3',
  },
    {
    id: 'proj4',
    title: 'Project Delta',
    description: 'A data visualization dashboard for analyzing complex datasets with interactive charts and graphs.',
    tags: ['D3.js', 'React', 'Firebase'],
    githubUrl: 'https://github.com',
    demoUrl: '#',
    imageId: '4',
  },
];

export const socialLinks = {
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  discord: `https://discord.com/users/${process.env.DISCORD_USER_ID}`,
};
