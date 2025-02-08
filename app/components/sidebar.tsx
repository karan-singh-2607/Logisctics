'use client'

import Image from "next/image"
import Link from "next/link"
import { UserSection } from "./sidebar/user-section"
import { AppDownloads } from "./sidebar/app-downloads"
import { LOGO } from "@/public"

export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-[410px] bg-primary rounded-r-xl p-6 flex flex-col overflow-y-scroll scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:scrollbar-thumb-gray-400">
      <div className="p-8 space-y-20">
        <Link href="/" className="block mb-8">
          <LOGO />
        </Link>
        <UserSection />
      </div>
      <div className="mt-auto p-6 space-y-6">
        <AppDownloads />
        <div className="space-y-2">
          <Link href="/terms" className="block text-sm text-gray-400 hover:text-gray-300">
            Terms & Agreement
          </Link>
          <Link href="/policy" className="block text-sm text-gray-400 hover:text-gray-300">
            User policy
          </Link>
          <p className="text-xs text-gray-500">
            Copyright 2024, All Rights Reserved by USA2GEORGIA
          </p>
        </div>
      </div>
    </aside>
  )
}
