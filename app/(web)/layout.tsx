import { Header } from "@/app/components/header"
import { Sidebar } from "@/app/components/sidebar"

export default function WebLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-[410px] p-8">
        <Header />
        <div className="container py-8">
          {children}
        </div>
      </main>
    </div>
  )
}

