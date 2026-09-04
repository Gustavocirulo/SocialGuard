import type { ReactNode } from "react"

interface StatusBadgeProps {
  status: "success" | "warning" | "error" | "neutral"
  children: ReactNode
}

const styles = {
  success: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  warning: "bg-amber-50 text-amber-700 ring-amber-600/20",
  error: "bg-red-50 text-red-700 ring-red-600/20",
  neutral: "bg-slate-100 text-slate-600 ring-slate-500/20",
}

const dots = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  neutral: "bg-slate-400",
}

function StatusBadge({
  status,
  children,
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dots[status]}`}
      />

      {children}
    </span>
  )
}

export default StatusBadge