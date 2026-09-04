import {
  CheckCircle2,
  Clock3,
  Cpu,
  FileText,
  ShieldAlert,
} from "lucide-react"
import StatusBadge from "../ui/StatusBadge"

interface SyncResultProps {
  classification: "not_violation" | "possible_violation" | "inconclusive"
  confidence: number
  reason: string
  model: string
  modelVersion: string
  processingTime: number
}

const classificationData = {
  not_violation: {
    title: "Não infrator",
    description: "Nenhum indício relevante de violação foi identificado.",
    status: "success" as const,
    icon: CheckCircle2,
  },

  possible_violation: {
    title: "Possível violação",
    description: "O conteúdo apresenta características que justificam análise adicional.",
    status: "warning" as const,
    icon: ShieldAlert,
  },

  inconclusive: {
    title: "Inconclusivo",
    description: "Não foi possível determinar uma classificação com segurança.",
    status: "neutral" as const,
    icon: FileText,
  },
}

function SyncResult({
  classification,
  confidence,
  reason,
  model,
  modelVersion,
  processingTime,
}: SyncResultProps) {
  const data = classificationData[classification]
  const Icon = data.icon

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      {/* Cabeçalho */}
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100">
              <Icon className="h-5 w-5 text-slate-700" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Resultado da classificação
              </p>

              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                {data.title}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {data.description}
              </p>
            </div>
          </div>

          <StatusBadge status={data.status}>
            Classificação concluída
          </StatusBadge>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="space-y-6 p-6">
        {/* Confiança */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">
              Confiança da classificação
            </span>

            <span className="text-sm font-semibold text-slate-900">
              {confidence}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-900 transition-all"
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>

        {/* Justificativa */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <FileText size={16} className="text-slate-400" />

            <h3 className="text-sm font-semibold text-slate-800">
              Justificativa
            </h3>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm leading-6 text-slate-600">
              {reason}
            </p>
          </div>
        </div>

        {/* Metadados */}
        <div className="grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-3">
          <Metadata
            icon={<Cpu size={16} />}
            label="Modelo"
            value={model}
          />

          <Metadata
            icon={<FileText size={16} />}
            label="Versão"
            value={modelVersion}
          />

          <Metadata
            icon={<Clock3 size={16} />}
            label="Tempo"
            value={`${processingTime} ms`}
          />
        </div>
      </div>
    </div>
  )
}

interface MetadataProps {
  icon: React.ReactNode
  label: string
  value: string
}

function Metadata({ icon, label, value }: MetadataProps) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-2 text-xs text-slate-400">
        {icon}
        {label}
      </div>

      <p className="text-sm font-medium text-slate-800">
        {value}
      </p>
    </div>
  )
}

export default SyncResult