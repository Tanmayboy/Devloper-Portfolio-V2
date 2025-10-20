"use client";

import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef, useState } from 'react';

const ContextMenu = () => {
  const menuRef = useRef<HTMLElement>(null);
  const [h1, setH1] = useState(255);
  const [h2, setH2] = useState(222);
  const { toast } = useToast();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--hue1', h1.toString());
    root.style.setProperty('--hue2', h2.toString());
  }, [h1, h2]);

  const handleNavigation = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("johndoe@example.com");
    toast({
      title: "Email Copied!",
      description: "johndoe@example.com has been copied to your clipboard.",
    });
    closeMenu();
  };

  const closeMenu = () => {
    menuRef.current?.classList.remove('open');
  }

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      const menu = menuRef.current;
      if (!menu) return;

      const $target = event.target as HTMLElement;
      const isMenu = menu.contains($target);

      if (!isMenu) {
        event.preventDefault();
        
        const menuBox = menu.getBoundingClientRect();
        const bodyBox = { width: window.innerWidth, height: window.innerHeight };
        const targetPos = { x: event.clientX, y: event.clientY };
        const padding = { x: 30, y: 20 };

        if (targetPos.x + menuBox.width >= bodyBox.width - padding.x) {
          targetPos.x = bodyBox.width - menuBox.width - padding.x;
        }

        if (targetPos.y + menuBox.height >= bodyBox.height - padding.y) {
          targetPos.y = bodyBox.height - menuBox.height - padding.y;
        }

        menu.style.left = `${targetPos.x}px`;
        menu.style.top = `${targetPos.y}px`;
        menu.classList.add('open');
      }
    };

    const handleClick = (event: MouseEvent) => {
        const menu = menuRef.current;
        if (menu && !menu.contains(event.target as Node)) {
            menu.classList.remove('open');
        }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
        <aside id="menu" ref={menuRef} className="dark">
            <div className="p-4">
                <ul id="menu-items">
                    <li onClick={() => handleNavigation('#about')}>About</li>
                    <li onClick={() => handleNavigation('#projects')}>Projects</li>
                    <li onClick={() => handleNavigation('#contact')}>Contact</li>
                    <hr className="border-border my-2" />
                    <li onClick={handleCopyEmail}>Copy Email</li>
                </ul>
            </div>
            <footer className="dark p-4 rounded-b-lg" style={{background: 'hsl(var(--background))'}}>
                <h2 className="text-sm font-bold mb-2">Pick your own colors!</h2>
                <div className="flex flex-col gap-2">
                    <input type="range" id="h1" min="0" max="360" value={h1} onChange={(e) => setH1(parseInt(e.target.value, 10))} className="w-full" />
                    <input type="range" id="h2" min="0" max="360" value={h2} onChange={(e) => setH2(parseInt(e.target.value, 10))} className="w-full" />
                </div>
            </footer>
        </aside>
    </>
  );
};

export default ContextMenu;
