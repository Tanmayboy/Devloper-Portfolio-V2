import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { socialLinks } from '@/lib/data';
import { getDiscordUser } from '@/services/discord';
import DiscordIcon from '../icons/discord-icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from 'next/image';

export default async function Footer() {

  let discordUser = null;
  if (process.env.DISCORD_USER_ID) {
    discordUser = await getDiscordUser();
  }

  return (
    <footer id="contact" className="border-t bg-background/50">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} DevDepth. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
          <Link href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
          <Link href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
          {discordUser && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={socialLinks.discord} target="_blank" rel="noopener noreferrer" aria-label="Discord">
                    <DiscordIcon className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex items-center gap-2">
                    <Image src={discordUser.avatar.link} alt={discordUser.username} width={24} height={24} className="rounded-full" />
                    <p>{discordUser.global_name}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </footer>
  );
}
