"use client";

import { useState } from "react";
import { Bell, LogOut, Search } from "lucide-react";
import { ContentDrawer } from "./content-drawer";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'

type Link = {
  href: string;
  label: string;
};

const links: Link[] = [
  { href: "/", label: "Home" },
  { href: "/faq", label: "FAQ" },
  { href: "/newsroom", label: "Newsroom" },
  { href: "/#pricing", label: "Prices" },
  { href: "/flights", label: "Flights" },
  { href: "/branches", label: "Branches" },
];

export function WebNavigation() {
  const router = useRouter()
  const [activeDrawer, setActiveDrawer] = useState<string | null>("/");

 
  const handleNavigation = (href: string) => {
    // setActiveDrawer(href);
    router.push(href);
  };

  return (
    <>
      <header className="h-16 flex">
        <nav className="flex items-center space-x-8">
          {links.map((link: Link) => (
            <Button
            variant='link'
              key={link.href}
              onClick={() => handleNavigation(link.href)}
              className={`relative text-medium px-0 py-0 ${
                activeDrawer === link.href
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {link.label}
              {activeDrawer === link.href && (
                <span className="absolute  left-0 w-full h-[2px] bg-secondary rounded-full"></span>
              )}
            </Button>
          ))}
          <button
            className="text-gray-600 hover:text-primary"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </button>
        </nav>
      </header>

       {/* Content Drawers */}
       {links.map((link: Link) =>
        link.href === "/prices" ? (
          <ContentDrawer
            key={link.href}
            open={activeDrawer === link.href}
            onOpenChange={(open: boolean) =>
              setActiveDrawer(open ? link.href : null)
            }
            title={link.label}
          >
            <div className="text-gray-600">Content for {link.label}</div>
          </ContentDrawer>
        ) : null // Render drawer only for "Prices"
      )}

      {/* Search Drawer */}
      <ContentDrawer
        open={activeDrawer === "search"}
        onOpenChange={(open: boolean) =>
          setActiveDrawer(open ? "search" : null)
        }
        title="Search"
      >
        <div className="text-gray-600">Search content here</div>
      </ContentDrawer>
    </>
  );
}
