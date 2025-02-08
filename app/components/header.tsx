'use client'

import Image from "next/image"
import { WebNavigation } from "./web-nav"

export function Header() {
  return (
    <header className="h-16 border-b">
      <div className="container h-full flex items-center justify-between">
        {/* <div className="flex items-center space-x-2">
          <Image
            src="/ka-flag.png"
            alt="KA"
            width={24}
            height={16}
            className="w-6"
          />
          <span className="text-sm font-medium">KA</span>
        </div> */}
        <WebNavigation />
      </div>
    </header>
  )
}

