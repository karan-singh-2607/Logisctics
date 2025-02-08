'use client'

import { useState } from "react"
import { Search } from 'lucide-react'
import { ContentDrawer } from "@/app/components/content-drawer"

const links = [
  { href: '/', label: 'Home' },
  { href: '/faq', label: 'FAQ' },
  { href: '/newsroom', label: 'Newsroom' },
  { href: '/prices', label: 'Prices' },
  { href: '/flights', label: 'Flights' },
  { href: '/branches', label: 'Branches' },
]

export function AdminNavigation() {
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null)

  return (
    <>
      <nav className="flex items-center space-x-8">
        {links.map((link) => (
          <button
            key={link.href}
            onClick={() => setActiveDrawer(link.href)}
            className="nav-link"
          >
            {link.label}
          </button>
        ))}
        <button 
          className="text-gray-600 hover:text-secondary"
          onClick={() => setActiveDrawer('search')}
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </button>
      </nav>

      {/* Content Drawers */}
      {links.map((link) => (
        <ContentDrawer
          key={link.href}
          open={activeDrawer === link.href}
          onOpenChange={(open) => setActiveDrawer(open ? link.href : null)}
          title={link.label}
        >
          <div className="text-gray-600">
            Content for {link.label}
          </div>
        </ContentDrawer>
      ))}

      {/* Search Drawer */}
      <ContentDrawer
        open={activeDrawer === 'search'}
        onOpenChange={(open) => setActiveDrawer(open ? 'search' : null)}
        title="Search"
      >
        <div className="text-gray-600">
          Search content here
        </div>
      </ContentDrawer>
    </>
  )
}

