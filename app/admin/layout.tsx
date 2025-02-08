import Image from "next/image";
import { Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfile } from "./components/sidebar/user-profile";
import { CreditSection } from "./components/sidebar/credit-section";
import { LockerCard } from "./components/sidebar/locker-card";
import { Navigation } from "./components/sidebar/navigation";
import { LOGO } from "@/public";
import { AppDownloads } from "../components/sidebar/app-downloads";
import Link from "next/link";
import { AdminNavigation } from "../components/admin-nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-[410px] bg-primary flex flex-col fixed h-full rounded-r-xl p-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:scrollbar-thumb-gray-400">
        <div className="p-8">
          {/* Logo and Language */}
          <div className="flex items-center justify-between mb-8">
            <LOGO />
          </div>

          {/* User Profile */}
          <UserProfile name="teona Kvesadze" suiteId="U126388" />

          {/* Credit Section */}
          <CreditSection unusedCredits={0.0} amountDue={0.0} />

          {/* Locker Card */}
          <LockerCard />

          {/* Navigation */}
          <Navigation />

          <div className="mt-auto p-6 space-y-6">
            <AppDownloads />
            <div className="space-y-2">
              <Link
                href="/terms"
                className="block text-sm text-gray-400 hover:text-gray-300"
              >
                Terms & Agreement
              </Link>
              <Link
                href="/policy"
                className="block text-sm text-gray-400 hover:text-gray-300"
              >
                User policy
              </Link>
              <p className="text-xs text-gray-500">
                Copyright 2024, All Rights Reserved by USA2GEORGIA
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[410px] px-32 py-10 bg-[#f7f6f5]">
        {/* Header */}
        <AdminNavigation />
        {/* Page Content */}
        <div className="container py-6 mt-4">{children}</div>
      </main>
    </div>
  );
}
