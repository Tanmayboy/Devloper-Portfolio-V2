"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Code2, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle, SheetDescription } from '../ui/sheet';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled ? "bg-background/80 backdrop-blur-sm border-b" : "bg-transparent border-b border-transparent"
    )}>
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Code2 className="h-8 w-8 text-primary" />
          <span className="font-headline text-xl font-bold">DevDepth</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  A list of navigation links to move around the page.
                </SheetDescription>
                <div className='p-6'>
                  <div className="flex justify-between items-center mb-8">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                      <Code2 className="h-8 w-8 text-primary" />
                      <span className="font-headline text-xl font-bold">DevDepth</span>
                    </Link>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetClose>
                  </div>
                  <nav className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                      <SheetClose key={link.href} asChild>
                        <Link href={link.href} className="text-lg font-medium">
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
