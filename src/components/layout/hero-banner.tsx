import Image from 'next/image'

export function HeroBanner() {
  return (
    <section className="my-4 rounded-[10px] border-[3px] border-pv-border bg-pv-primary p-5">
      <div className="mb-3 flex items-center gap-3">
        <Image src="/logo.png" alt="PlayVault" width={48} height={48} className="rounded-[6px]" />
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#111111]">
            Welcome to PlayVault
          </p>
          <h1 className="max-w-[380px] font-display text-[24px] font-black leading-[1.2] text-[#111111]">
            Discover & Share Indie Games
          </h1>
        </div>
      </div>
      <p className="max-w-[500px] text-[13px] text-[#111111]">
        A community-driven platform to discover, share, and play indie games. No hosting &mdash;
        just great games with external links.
      </p>
    </section>
  )
}
