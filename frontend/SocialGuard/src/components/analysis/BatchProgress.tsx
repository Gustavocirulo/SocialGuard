interface BatchProgressProps {
  processed: number
  total: number
}

function BatchProgress({
  processed,
  total,
}: BatchProgressProps) {
  const percentage =
    total > 0
      ? Math.round((processed / total) * 100)
      : 0

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">
          Progresso do processamento
        </span>

        <span className="text-sm font-semibold text-slate-900">
          {percentage}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-slate-900 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-2 flex justify-between text-xs text-slate-400">
        <span>
          {processed.toLocaleString("pt-BR")} processados
        </span>

        <span>
          {total.toLocaleString("pt-BR")} total
        </span>
      </div>
    </div>
  )
}

export default BatchProgress