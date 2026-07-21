import Link from 'next/link'

interface SectionHeaderProps {
  title: string
  href?: string
}

export function SectionHeader({ title, href }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="font-display text-[16px] font-bold uppercase tracking-[-0.01em] text-pv-text">
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="text-[11px] font-medium uppercase tracking-[0.03em] text-pv-muted transition-colors hover:text-pv-text"
        >
          VIEW ALL &gt;
        </Link>
      )}
    </div>
  )
}
