import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-8 lg:px-8">{children}</main>
      <Footer />
    </div>
  )
}
