import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-[1400px] mx-auto px-4 lg:px-8 py-8 w-full">
        {children}
      </main>
      <Footer />
    </div>
  )
}
