"use client";

import { useState } from "react";
import { Bell, LogOut, Search } from "lucide-react";
import { ContentDrawer } from "./content-drawer";
import { Button } from "@/components/ui/button";

type Link = {
  href: string;
  label: string;
};

const links: Link[] = [
  { href: "/", label: "Home" },
  { href: "/faq", label: "FAQ" },
  { href: "/newsroom", label: "Newsroom" },
  { href: "/prices", label: "Prices" },
  { href: "/flights", label: "Flights" },
  { href: "/branches", label: "Branches" },
];

export function AdminNavigation() {
  const [activeDrawer, setActiveDrawer] = useState<string | null>("/");

 
  const handleOpenDrawer = (href: string) => {
    if (href === "/prices") {
      setActiveDrawer(href);
    } else {
      setActiveDrawer(null); // Close other drawers
    }
  };

  return (
    <>
      <header className="h-16 flex">
        <nav className="flex items-center space-x-8">
          {links.map((link: Link) => (
            <Button
            variant='link'
              key={link.href}
              onClick={() => handleOpenDrawer(link.href)}
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
            onClick={() => handleOpenDrawer("search")}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </button>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative bg-white rounded-full p-2 shadow-md"
          >
            <Bell className="h-5 w-5 text-gray-600" />
          </Button>
          <Button
            className="bg-secondary hover:bg-secondary/90 flex flex-row-reverse"
            icon={<LogOut className="h-5 w-12 mr-2" />}
          >
            Logout
          </Button>
        </div>
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
