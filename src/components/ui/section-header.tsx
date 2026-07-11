import Link from "next/link"

interface SectionHeaderProps {
  title: string
  href?: string
}

export function SectionHeader({ title, href }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-display font-bold text-[16px] uppercase tracking-[-0.01em] text-pv-text">
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="text-[11px] text-pv-muted font-medium uppercase tracking-[0.03em] hover:text-pv-text transition-colors"
        >
          VIEW ALL &gt;
        </Link>
      )}
    </div>
  )
}
