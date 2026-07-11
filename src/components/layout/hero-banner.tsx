import Image from "next/image"

export function HeroBanner() {
  return (
    <section className="bg-pv-primary border-[3px] border-pv-border rounded-[10px] p-5 my-4">
      <div className="flex items-center gap-3 mb-3">
        <Image src="/logo.png" alt="PlayVault" width={48} height={48} className="rounded-[6px]" />
        <div>
          <p className="text-[#111111] text-[11px] font-bold uppercase tracking-[0.08em]">
            Welcome to PlayVault
          </p>
          <h1 className="font-display font-black text-[24px] leading-[1.2] text-[#111111] max-w-[380px]">
            Discover & Share Indie Games
          </h1>
        </div>
      </div>
      <p className="text-[13px] text-[#111111] max-w-[500px]">
        A community-driven platform to discover, share, and play indie games.
        No hosting &mdash; just great games with external links.
      </p>
    </section>
  )
}
