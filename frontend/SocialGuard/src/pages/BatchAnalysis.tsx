import {
  CheckCircle2,
  FileJson,
  FileText,
  Layers3,
  Upload,
  X,
} from "lucide-react"
import { useEffect, useState } from "react"
import BatchProgress from "../components/analysis/BatchProgress"
import StatusBadge from "../components/ui/StatusBadge"

type ProcessingStatus =
  | "idle"
  | "pending"
  | "processing"
  | "completed"
  | "failed"

interface SelectedFile {
  name: string
  size: number
  type: string
}

function BatchAnalysis() {
  const [selectedFile, setSelectedFile] =
    useState<SelectedFile | null>(null)

  const [status, setStatus] =
    useState<ProcessingStatus>("idle")

  const [processed, setProcessed] = useState(0)

  const total = 1000

  useEffect(() => {
    if (status !== "processing") {
      return
    }

    const interval = setInterval(() => {
      setProcessed((current) => {
        const next = current + 50

        if (next >= total) {
          clearInterval(interval)
          setStatus("completed")
          return total
        }

        return next
      })
    }, 500)

    return () => clearInterval(interval)
  }, [status])

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    setSelectedFile({
      name: file.name,
      size: file.size,
      type: file.type,
    })

    setStatus("idle")
    setProcessed(0)
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setStatus("idle")
    setProcessed(0)
  }

  const handleStartProcessing = () => {
    if (!selectedFile) return

    setStatus("pending")

    setTimeout(() => {
      setStatus("processing")
    }, 1000)
  }

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <p className="mb-1 text-sm font-medium text-slate-500">
          Análises
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Análise em lote
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Processe múltiplas publicações de forma assíncrona
          e acompanhe o progresso do processamento.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px] lg:grid-cols-2">
        {/* Upload */}
        <section className="rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900">
                <Layers3 className="h-5 w-5 text-white" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Novo processamento
                </h2>

                <p className="text-xs text-slate-500">
                  Envie um arquivo contendo as publicações.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {!selectedFile ? (
              <FileDropzone onFileChange={handleFileChange} />
            ) : (
              <SelectedFileCard
                file={selectedFile}
                onRemove={handleRemoveFile}
              />
            )}

            {/* Modelo */}
            <div className="mt-6">
              <label
                htmlFor="batch-model"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Modelo de análise
              </label>

              <select
                id="batch-model"
                disabled={status === "processing"}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50"
              >
                <option>
                  SocialGuard AI — Padrão
                </option>

                <option>
                  SocialGuard AI — Alta precisão
                </option>
              </select>
            </div>

            {/* Botão */}
            <button
              onClick={handleStartProcessing}
              disabled={
                !selectedFile ||
                status === "pending" ||
                status === "processing"
              }
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Upload size={16} />

              {status === "pending"
                ? "Criando processamento..."
                : status === "processing"
                  ? "Processamento em andamento"
                  : status === "completed"
                    ? "Processamento concluído"
                    : "Iniciar processamento"}
            </button>
          </div>
        </section>

        {/* Status */}
        <section>
          <ProcessingStatus
            status={status}
            processed={processed}
            total={total}
          />
        </section>
      </div>
    </div>
  )
}

interface FileDropzoneProps {
  onFileChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
}

function FileDropzone({
  onFileChange,
}: FileDropzoneProps) {
  return (
    <label
      htmlFor="batch-file"
      className="flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 text-center transition hover:border-slate-300 hover:bg-slate-100"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
        <Upload className="h-5 w-5 text-slate-500" />
      </div>

      <p className="text-sm font-semibold text-slate-800">
        Selecione um arquivo para análise
      </p>

      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
        Faça upload de um arquivo contendo as
        publicações que serão processadas.
      </p>

      <span className="mt-5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
        Selecionar arquivo
      </span>

      <p className="mt-4 text-xs text-slate-400">
        Formatos aceitos: CSV e JSON
      </p>

      <input
        id="batch-file"
        type="file"
        accept=".csv,.json"
        onChange={onFileChange}
        className="hidden"
      />
    </label>
  )
}

interface SelectedFileCardProps {
  file: SelectedFile
  onRemove: () => void
}

function SelectedFileCard({
  file,
  onRemove,
}: SelectedFileCardProps) {
  const isJson = file.name.toLowerCase().endsWith(".json")

  const formattedSize =
    file.size < 1024 * 1024
      ? `${Math.max(1, Math.round(file.size / 1024))} KB`
      : `${(file.size / 1024 / 1024).toFixed(2)} MB`

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200">
            {isJson ? (
              <FileJson className="h-5 w-5 text-slate-600" />
            ) : (
              <FileText className="h-5 w-5 text-slate-600" />
            )}
          </div>

          <div>
            <p className="max-w-xs truncate text-sm font-semibold text-slate-800">
              {file.name}
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              {formattedSize}
            </p>
          </div>
        </div>

        <button
          onClick={onRemove}
          className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-slate-700"
          title="Remover arquivo"
        >
          <X size={17} />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600">
        <CheckCircle2 size={14} />
        Arquivo pronto para processamento
      </div>
    </div>
  )
}

interface ProcessingStatusProps {
  status: ProcessingStatus
  processed: number
  total: number
}

function ProcessingStatus({
  status,
  processed,
  total,
}: ProcessingStatusProps) {
  if (status === "idle") {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-slate-200">
            <Layers3 className="h-5 w-5 text-slate-400" />
          </div>

          <h3 className="text-sm font-semibold text-slate-800">
            Nenhum processamento ativo
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Após iniciar um lote, o status do processamento
            será exibido nesta área.
          </p>
        </div>
      </div>
    )
  }

  if (status === "pending") {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Processamento
            </p>

            <h2 className="mt-1 text-lg font-semibold text-slate-900">
              Preparando lote
            </h2>
          </div>

          <StatusBadge status="neutral">
            Pendente
          </StatusBadge>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />

          <p className="text-sm text-slate-500">
            O processamento está sendo colocado na fila.
          </p>
        </div>
      </div>
    )
  }

  if (status === "processing") {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Processamento #1025
            </p>

            <h2 className="mt-1 text-lg font-semibold text-slate-900">
              Análise em andamento
            </h2>
          </div>

          <StatusBadge status="warning">
            Processando
          </StatusBadge>
        </div>

        <div className="mt-8">
          <BatchProgress
            processed={processed}
            total={total}
          />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-200 pt-5">
          <Metric
            label="Processados"
            value={processed.toLocaleString("pt-BR")}
          />

          <Metric
            label="Pendentes"
            value={(total - processed).toLocaleString("pt-BR")}
          />
        </div>
      </div>
    )
  }

  if (status === "completed") {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Processamento #1025
            </p>

            <h2 className="mt-1 text-lg font-semibold text-slate-900">
              Processamento concluído
            </h2>
          </div>

          <StatusBadge status="success">
            Concluído
          </StatusBadge>
        </div>

        <div className="mt-8">
          <BatchProgress
            processed={processed}
            total={total}
          />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-200 pt-5">
          <Metric
            label="Total analisado"
            value={total.toLocaleString("pt-BR")}
          />

          <Metric
            label="Possíveis violações"
            value="83"
          />

          <Metric
            label="Não infratores"
            value="864"
          />

          <Metric
            label="Inconclusivos"
            value="53"
          />
        </div>

        <button className="mt-6 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
          Ver resultados detalhados
        </button>
      </div>
    )
  }

  return null
}

interface MetricProps {
  label: string
  value: string
}

function Metric({
  label,
  value,
}: MetricProps) {
  return (
    <div>
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-lg font-semibold text-slate-900">
        {value}
      </p>
    </div>
  )
}

export default BatchAnalysis