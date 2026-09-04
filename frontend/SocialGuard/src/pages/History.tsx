import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileSearch,
  Layers3,
  Search,
  XCircle,
} from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

type AnalysisType = "sync" | "batch"
type AnalysisStatus = "completed" | "processing" | "failed"

interface HistoryItem {
  id: number
  type: AnalysisType
  status: AnalysisStatus
  posts: number
  result: string
  date: string
  time: string
}

const historyData: HistoryItem[] = [
  {
    id: 1024,
    type: "sync",
    status: "completed",
    posts: 1,
    result: "Não infrator",
    date: "04/09/2026",
    time: "09:32",
  },
  {
    id: 1023,
    type: "batch",
    status: "processing",
    posts: 1000,
    result: "73% processado",
    date: "04/09/2026",
    time: "09:28",
  },
  {
    id: 1022,
    type: "batch",
    status: "completed",
    posts: 100,
    result: "96 possíveis casos",
    date: "04/09/2026",
    time: "09:15",
  },
  {
    id: 1021,
    type: "sync",
    status: "completed",
    posts: 1,
    result: "Possível violação",
    date: "04/09/2026",
    time: "09:02",
  },
  {
    id: 1020,
    type: "batch",
    status: "completed",
    posts: 500,
    result: "42 possíveis casos",
    date: "03/09/2026",
    time: "17:41",
  },
  {
    id: 1019,
    type: "batch",
    status: "failed",
    posts: 2500,
    result: "Falha no processamento",
    date: "03/09/2026",
    time: "16:23",
  },
]

function History() {
  const navigate = useNavigate()

  const [typeFilter, setTypeFilter] = useState<
    "all" | AnalysisType
  >("all")

  const [statusFilter, setStatusFilter] = useState<
    "all" | AnalysisStatus
  >("all")

  const [search, setSearch] = useState("")

  const filteredData = historyData.filter((item) => {
    const matchesType =
      typeFilter === "all" || item.type === typeFilter

    const matchesStatus =
      statusFilter === "all" ||
      item.status === statusFilter

    const matchesSearch =
      item.id.toString().includes(search)

    return (
      matchesType &&
      matchesStatus &&
      matchesSearch
    )
  })

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <p className="mb-1 text-sm font-medium text-slate-500">
          Dados
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Histórico
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Consulte os processamentos realizados e acompanhe
          seus resultados.
        </p>
      </div>

      {/* Filtros */}
      <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Busca */}
          <div className="relative max-w-sm flex-1">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Buscar por ID..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>

          {/* Filtros */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(
                  event.target.value as
                    | "all"
                    | AnalysisType
                )
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-slate-400"
            >
              <option value="all">
                Todos os tipos
              </option>

              <option value="sync">
                Síncrono
              </option>

              <option value="batch">
                Em lote
              </option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as
                    | "all"
                    | AnalysisStatus
                )
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-slate-400"
            >
              <option value="all">
                Todos os status
              </option>

              <option value="completed">
                Concluído
              </option>

              <option value="processing">
                Processando
              </option>

              <option value="failed">
                Falhou
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <HeaderCell>ID</HeaderCell>
                <HeaderCell>Tipo</HeaderCell>
                <HeaderCell>Status</HeaderCell>
                <HeaderCell>Publicações</HeaderCell>
                <HeaderCell>Resultado</HeaderCell>
                <HeaderCell>Data</HeaderCell>
                <HeaderCell />
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <HistoryRow
                  key={item.id}
                  item={item}
                  onClick={() =>
                    navigate(
                      item.type === "batch"
                        ? `/analysis/batch/${item.id}`
                        : `/analysis/sync/${item.id}`
                    )
                  }
                />
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="px-6 py-16 text-center">
            <Search className="mx-auto h-6 w-6 text-slate-300" />

            <p className="mt-3 text-sm font-medium text-slate-700">
              Nenhum processamento encontrado
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Tente ajustar os filtros da busca.
            </p>
          </div>
        )}
      </div>

      {/* Rodapé */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <span>
          {filteredData.length} processamento(s)
        </span>

        <span>
          Dados demonstrativos
        </span>
      </div>
    </div>
  )
}

interface HeaderCellProps {
  children?: React.ReactNode
}

function HeaderCell({ children }: HeaderCellProps) {
  return (
    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </th>
  )
}

interface HistoryRowProps {
  item: HistoryItem
  onClick: () => void
}

function HistoryRow({
  item,
  onClick,
}: HistoryRowProps) {
  const isBatch = item.type === "batch"

  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70">
      <td className="px-6 py-4">
        <span className="text-sm font-semibold text-slate-900">
          #{item.id}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          {isBatch ? (
            <Layers3 size={16} />
          ) : (
            <FileSearch size={16} />
          )}

          {isBatch ? "Em lote" : "Síncrono"}
        </div>
      </td>

      <td className="px-6 py-4">
        <HistoryStatus status={item.status} />
      </td>

      <td className="px-6 py-4 text-sm text-slate-600">
        {item.posts.toLocaleString("pt-BR")}
      </td>

      <td className="px-6 py-4 text-sm text-slate-600">
        {item.result}
      </td>

      <td className="px-6 py-4">
        <div>
          <p className="text-sm text-slate-600">
            {item.date}
          </p>

          <p className="text-xs text-slate-400">
            {item.time}
          </p>
        </div>
      </td>

      <td className="px-6 py-4 text-right">
        <button
          onClick={onClick}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        >
          Detalhes
          <ArrowRight size={14} />
        </button>
      </td>
    </tr>
  )
}

function HistoryStatus({
  status,
}: {
  status: AnalysisStatus
}) {
  if (status === "completed") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
        <CheckCircle2 size={13} />
        Concluído
      </span>
    )
  }

  if (status === "processing") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
        <Clock3 size={13} />
        Processando
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
      <XCircle size={13} />
      Falhou
    </span>
  )
}

export default History