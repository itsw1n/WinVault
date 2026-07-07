import { Card } from "@/components/ui/card"

interface StatCardProps {
  label: string
  value: number
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <Card className="p-4 flex flex-col gap-1">
      <span className="text-xs font-bold uppercase tracking-wide text-pv-muted">
        {label}
      </span>
      <span className="font-display text-3xl font-bold text-pv-text">
        {value}
      </span>
    </Card>
  )
}
