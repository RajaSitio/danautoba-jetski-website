
"use client";

import Link from "next/link";
import Image from 'next/image';
import { Menu as MenuIcon, HelpCircle, Package, ChevronDown, Newspaper, Waves } from 'lucide-react';
import { LanguageToggle } from '@/components/common/language-toggle';
import { useTranslation } from '@/hooks/use-language';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from '@/components/ui/scroll-area';
import { packageData } from "@/data/packages";

type NavItemConfig = {
  href: string;
  labelKey: string;
  id: 'beranda' | 'paket' | 'aktivitas-lain' | 'faq' | 'blog';
  icon?: React.ElementType;
  isPopover?: boolean;
};

const navItems: NavItemConfig[] = [
  { href: '/', labelKey: 'menuHome', id: 'beranda' },
  { href: '/#packages', labelKey: 'menuPackages', id: 'paket', icon: Package, isPopover: true },
  { href: '/aktivitas-lain', labelKey: 'menuOtherActivities', id: 'aktivitas-lain', icon: Waves },
  { href: '/faq', labelKey: 'menuFAQ', id: 'faq', icon: HelpCircle },
  { href: '/blog', labelKey: 'menuBlog', id: 'blog', icon: Newspaper },
];

export function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPackagePopoverOpen, setIsPackagePopoverOpen] = useState(false);
  const popoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePopoverEnter = () => {
    if (popoverTimeoutRef.current) {
      clearTimeout(popoverTimeoutRef.current);
    }
    setIsPackagePopoverOpen(true);
  };

  const handlePopoverLeave = () => {
    popoverTimeoutRef.current = setTimeout(() => {
      setIsPackagePopoverOpen(false);
    }, 200); // A small delay to allow moving cursor to the popover content
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (popoverTimeoutRef.current) {
        clearTimeout(popoverTimeoutRef.current);
      }
    };
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const mobileNavLinkClasses = "block px-4 py-3 rounded-md text-lg font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
        scrolled ? "bg-background/60 backdrop-blur-lg" : "bg-transparent"
      )}
    >
      <div className="container flex h-20 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center group">
          <Image
            src="https://archive.org/download/logo-baru-jetski-danau-toba-samosir/logo%20baru%20jetski%20danau%20toba%20samosir.png"
            alt={t('logo_alt_text')}
            width={1080}
            height={171}
            className="h-12 w-auto object-contain transition-transform group-hover:scale-105 duration-300"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            if (item.isPopover) {
              const isPaketActive = pathname.startsWith('/paket') || pathname === item.href;
              return (
                <Popover key={item.id} open={isPackagePopoverOpen} onOpenChange={setIsPackagePopoverOpen}>
                  <div onMouseEnter={handlePopoverEnter} onMouseLeave={handlePopoverLeave}>
                    <PopoverTrigger asChild>
                       <Button asChild variant={isPaketActive ? "secondary" : "ghost"} className="px-3 py-2">
                        <Link href={item.href} className="flex items-center gap-1">
                          {item.icon && React.createElement(item.icon, {className: "h-5 w-5"})}
                          {t(item.labelKey)}
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-64" 
                      align="start"
                      onMouseEnter={handlePopoverEnter}
                      onMouseLeave={handlePopoverLeave}
                    >
                      <div className="grid gap-2">
                        <p className="font-semibold text-primary px-2 pb-1 text-sm border-b border-border mb-1">{t('menuPackages')}</p>
                        {packageData.map((pkg) => (
                          <Link
                            key={pkg.id}
                            href={`/paket/${pkg.id}`}
                            className={cn(
                              "block p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm",
                                pathname === `/paket/${pkg.id}` ? 'bg-accent text-accent-foreground' : 'text-foreground'
                            )}
                            onClick={() => setIsPackagePopoverOpen(false)}
                          >
                            {t(pkg.shortTitleKey || pkg.titleKey)}
                          </Link>
                        ))}
                      </div>
                    </PopoverContent>
                  </div>
                </Popover>
              );
            }
            
            const isActive = pathname === item.href || (item.id === 'blog' && pathname.startsWith('/blog')) || (item.id === 'aktivitas-lain' && pathname.startsWith('/aktivitas-lain'));
            return (
               <Button asChild variant={isActive ? "secondary" : "ghost"} key={item.id}>
                <Link href={item.href} className="px-3 py-2 flex items-center gap-2">
                  {item.icon && React.createElement(item.icon, {className: "h-5 w-5"})}
                  {t(item.labelKey)}
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="flex items-center space-x-2">
          <LanguageToggle />
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
              aria-label={t('toggle_menu_aria_label', { defaultValue: 'Open menu' })}
              className="text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-background p-0 flex flex-col">
          <SheetHeader>
            <SheetTitle className="sr-only">{t('mobile_menu_title')}</SheetTitle>
          </SheetHeader>
          <div className="p-6 border-b border-border">
            <Link href="/" onClick={closeMobileMenu} className="inline-block">
              <Image
                src="https://archive.org/download/logo-baru-jetski-danau-toba-samosir/logo%20baru%20jetski%20danau%20toba%20samosir.png"
                alt={t('logo_alt_text')}
                width={1080}
                height={171}
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>
          <ScrollArea className="flex-grow">
            <nav className="flex flex-col space-y-2 p-6">
              {navItems.map((item) => {
                if (item.isPopover) {
                  return (
                    <div key={`mobile-${item.id}`}>
                      <h3 className="px-4 py-2 text-base font-semibold text-primary">{t('menuPackages')}</h3>
                      {packageData.map((pkg) => (
                          <Link
                              key={`mobile-${pkg.id}`}
                              href={`/paket/${pkg.id}`}
                              className={cn(mobileNavLinkClasses, "text-base pl-8", pathname === `/paket/${pkg.id}` && 'bg-accent text-accent-foreground')}
                              onClick={closeMobileMenu}
                          >
                              {t(pkg.shortTitleKey || pkg.titleKey)}
                          </Link>
                      ))}
                    </div>
                  );
                }

                const isActive = pathname === item.href || (item.id === 'blog' && pathname.startsWith('/blog')) || (item.id === 'aktivitas-lain' && pathname.startsWith('/aktivitas-lain'));
                return (
                  <Link
                    key={`mobile-${item.id}`}
                    href={item.href}
                    className={cn(mobileNavLinkClasses, "flex items-center gap-3", isActive && 'bg-accent text-accent-foreground')}
                    onClick={closeMobileMenu}
                  >
                    {item.icon && React.createElement(item.icon, { className: "h-5 w-5" })}
                    {t(item.labelKey)}
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </header>
  );
}
