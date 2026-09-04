import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Cpu,
  FileText,
  Layers3,
  ShieldAlert,
} from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import BatchProgress from "../components/analysis/BatchProgress"
import StatusBadge from "../components/ui/StatusBadge"

const results = [
  {
    id: 1,
    content: "Exemplo de publicação analisada pelo sistema.",
    classification: "Não infrator",
    confidence: 96,
  },
  {
    id: 2,
    content: "Conteúdo potencialmente incompatível com as políticas.",
    classification: "Possível violação",
    confidence: 82,
  },
  {
    id: 3,
    content: "Outra publicação utilizada para demonstração.",
    classification: "Não infrator",
    confidence: 94,
  },
  {
    id: 4,
    content: "Conteúdo cuja classificação não apresentou segurança suficiente.",
    classification: "Inconclusivo",
    confidence: 51,
  },
]

function BatchDetails() {
  const navigate = useNavigate()
  const { id } = useParams()

  const processed = 1000
  const total = 1000

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      {/* Voltar */}
      <button
        onClick={() => navigate("/history")}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Voltar para o histórico
      </button>

      {/* Cabeçalho */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Layers3 size={17} className="text-slate-400" />

            <span className="text-sm font-medium text-slate-500">
              Processamento em lote
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Processamento #{id}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Detalhes e resultados do processamento assíncrono.
          </p>
        </div>

        <StatusBadge status="success">
          Processamento concluído
        </StatusBadge>
      </div>

      {/* Resumo */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={<FileText size={19} />}
          label="Total de publicações"
          value="1.000"
        />

        <SummaryCard
          icon={<CheckCircle2 size={19} />}
          label="Não infratores"
          value="864"
        />

        <SummaryCard
          icon={<ShieldAlert size={19} />}
          label="Possíveis violações"
          value="83"
        />

        <SummaryCard
          icon={<Clock3 size={19} />}
          label="Tempo total"
          value="02m 14s"
        />
      </div>

      {/* Progresso + Metadados */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-6">
            <h2 className="font-semibold text-slate-900">
              Progresso
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Informações sobre a execução do processamento.
            </p>
          </div>

          <BatchProgress
            processed={processed}
            total={total}
          />
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900">
            Configuração
          </h2>

          <div className="mt-5 space-y-5">
            <DetailItem
              icon={<Cpu size={16} />}
              label="Modelo"
              value="SocialGuard AI"
            />

            <DetailItem
              icon={<Layers3 size={16} />}
              label="Versão"
              value="1.0"
            />

            <DetailItem
              icon={<Clock3 size={16} />}
              label="Início"
              value="04/09/2026 09:28"
            />

            <DetailItem
              icon={<CheckCircle2 size={16} />}
              label="Finalização"
              value="04/09/2026 09:30"
            />
          </div>
        </section>
      </div>

      {/* Resultados */}
      <section className="mt-6 rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="font-semibold text-slate-900">
            Resultados da classificação
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Amostra dos conteúdos processados.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {results.map((result) => (
            <ResultRow
              key={result.id}
              result={result}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

interface SummaryCardProps {
  icon: React.ReactNode
  label: string
  value: string
}

function SummaryCard({
  icon,
  label,
  value,
}: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
        {icon}
      </div>

      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
        {value}
      </p>
    </div>
  )
}

interface DetailItemProps {
  icon: React.ReactNode
  label: string
  value: string
}

function DetailItem({
  icon,
  label,
  value,
}: DetailItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-slate-400">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 text-sm font-medium text-slate-700">
          {value}
        </p>
      </div>
    </div>
  )
}

interface ResultRowProps {
  result: {
    id: number
    content: string
    classification: string
    confidence: number
  }
}

function ResultRow({ result }: ResultRowProps) {
  const isViolation =
    result.classification === "Possível violação"

  const isInconclusive =
    result.classification === "Inconclusivo"

  return (
    <div className="px-6 py-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-500">
            {result.id}
          </div>

          <div className="min-w-0">
            <p className="text-sm leading-6 text-slate-600">
              {result.content}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <StatusBadge
            status={
              isViolation
                ? "warning"
                : isInconclusive
                  ? "neutral"
                  : "success"
            }
          >
            {result.classification}
          </StatusBadge>

          <span className="text-sm font-medium text-slate-700">
            {result.confidence}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default BatchDetails