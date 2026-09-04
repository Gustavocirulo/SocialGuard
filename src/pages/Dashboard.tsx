import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileSearch,
  Layers3,
  ShieldAlert,
} from "lucide-react";
import { useNavigate } from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate()
  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <p className="mb-1 text-sm font-medium text-slate-500">
          Visão geral
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Acompanhe os processamentos e resultados das análises
          automatizadas de conteúdo.
        </p>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total de análises"
          value="1.248"
          description="Nos últimos 30 dias"
          icon={<FileSearch size={20} />}
        />

        <StatCard
          title="Em processamento"
          value="03"
          description="Processamentos ativos"
          icon={<Clock3 size={20} />}
        />

        <StatCard
          title="Concluídas"
          value="1.186"
          description="95% do total"
          icon={<CheckCircle2 size={20} />}
        />

        <StatCard
          title="Possíveis violações"
          value="86"
          description="Classificações preliminares"
          icon={<ShieldAlert size={20} />}
        />
      </div>

      {/* Modos de análise */}
      <div className="mt-8">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-slate-900">
            Iniciar análise
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Escolha o modo de processamento adequado ao volume de conteúdo.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
            <AnalysisModeCard
                icon={<FileSearch size={22} />}
                title="Análise síncrona"
                description="Analise uma publicação individual e receba o resultado imediatamente."
                button="Nova análise"
                onClick={() => navigate("/analysis/sync")}
            />

            <AnalysisModeCard
                icon={<Layers3 size={22} />}
                title="Análise em lote"
                description="Envie múltiplas publicações e acompanhe o processamento de forma assíncrona."
                button="Criar processamento"
                onClick={() => navigate("/analysis/batch")}
            />
        </div>
      </div>

      {/* Processamentos recentes */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="font-semibold text-slate-900">
              Processamentos recentes
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Últimas atividades registradas na plataforma.
            </p>
          </div>

            <button
            type="button"
            onClick={() => navigate("/history")}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
            Ver histórico
            <ArrowRight size={16} />
            </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  ID
                </th>

                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Tipo
                </th>

                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Progresso
                </th>

                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Data
                </th>
              </tr>
            </thead>

            <tbody>
              <TableRow
                id="#1024"
                type="Síncrono"
                status="Concluído"
                progress="—"
                date="09:32"
              />

              <TableRow
                id="#1023"
                type="Lote"
                status="Processando"
                progress="73%"
                date="09:28"
              />

              <TableRow
                id="#1022"
                type="Lote"
                status="Concluído"
                progress="100%"
                date="09:15"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}

function StatCard({
  title,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">
          {title}
        </span>

        <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
          {icon}
        </div>
      </div>

      <p className="text-2xl font-bold tracking-tight text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>
    </div>
  )
}

interface AnalysisModeCardProps {
  icon: React.ReactNode
  title: string
  description: string
  button: string
  onClick: () => void
}

function AnalysisModeCard({
  icon,
  title,
  description,
  button,
  onClick,
}: AnalysisModeCardProps) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-sm">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-slate-900 text-white">
        {icon}
      </div>

      <h3 className="text-base font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
        {description}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
      >
        {button}

        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>
    </div>
  )
}

interface TableRowProps {
  id: string
  type: string
  status: string
  progress: string
  date: string
}

function TableRow({
  id,
  type,
  status,
  progress,
  date,
}: TableRowProps) {
  const isProcessing = status === "Processando"

  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="px-6 py-4 text-sm font-medium text-slate-900">
        {id}
      </td>

      <td className="px-6 py-4 text-sm text-slate-600">
        {type}
      </td>

      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ${
            isProcessing
              ? "bg-amber-50 text-amber-700"
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isProcessing
                ? "bg-amber-500"
                : "bg-emerald-500"
            }`}
          />

          {status}
        </span>
      </td>

      <td className="px-6 py-4 text-sm text-slate-600">
        {progress}
      </td>

      <td className="px-6 py-4 text-sm text-slate-500">
        {date}
      </td>
    </tr>
  )
}

export default Dashboard