import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Cpu,
  FileText,
  ShieldAlert,
} from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

import StatusBadge from "../components/ui/StatusBadge"

function SyncDetails() {
  const navigate = useNavigate()
  const { id } = useParams()

  const analysis = {
    id: id ?? "1024",
    classification: "possible_violation",
    confidence: 82,
    model: "SocialGuard AI",
    modelVersion: "1.0",
    processingTime: 842,
    createdAt: "04/09/2026 às 09:32",
    content:
      "Exemplo de publicação analisada pelo sistema para demonstração da classificação automática.",
    reason:
      "O conteúdo apresenta elementos que podem indicar uma possível violação das políticas analisadas. A classificação deve ser utilizada como apoio à análise humana.",
  }

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Cabeçalho */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate("/history")}
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={17} />
            Voltar ao histórico
          </button>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900">
                  Análise #{analysis.id}
                </h1>

                <StatusBadge status="success">
                  Concluída
                </StatusBadge>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Resultado detalhado da análise síncrona.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/analysis/sync")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              Nova análise
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Resultado principal */}
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <ShieldAlert size={21} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Resultado da classificação
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Classificação produzida pelo modelo de IA.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                    Classificação
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-amber-800">
                    Possível violação
                  </h3>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-amber-700">
                    {analysis.reason}
                  </p>
                </div>

                <div className="shrink-0 text-center">
                  <div className="text-3xl font-bold text-amber-800">
                    {analysis.confidence}%
                  </div>

                  <p className="mt-1 text-xs text-amber-600">
                    Confiança
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="h-2 overflow-hidden rounded-full bg-amber-100">
                  <div
                    className="h-full rounded-full bg-amber-500"
                    style={{
                      width: `${analysis.confidence}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Conteúdo analisado */}
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                <FileText size={19} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Conteúdo analisado
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Publicação enviada para classificação.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm leading-7 text-slate-700">
                {analysis.content}
              </p>
            </div>
          </section>

          {/* Informações técnicas */}
          <section className="rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-sm font-semibold text-slate-900">
                Informações da análise
              </h2>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
              <InfoItem
                icon={<Cpu size={17} />}
                label="Modelo"
                value={analysis.model}
              />

              <InfoItem
                icon={<CheckCircle2 size={17} />}
                label="Versão"
                value={analysis.modelVersion}
              />

              <InfoItem
                icon={<Clock3 size={17} />}
                label="Tempo"
                value={`${analysis.processingTime} ms`}
              />

              <InfoItem
                icon={<FileText size={17} />}
                label="Criada em"
                value={analysis.createdAt}
              />
            </div>
          </section>

          {/* Aviso */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 px-5 py-4">
            <p className="text-sm leading-6 text-blue-800">
              <strong>Observação:</strong> a classificação apresentada é
              produzida automaticamente por um modelo de inteligência
              artificial e deve ser utilizada como apoio à análise humana.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface InfoItemProps {
  icon: React.ReactNode
  label: string
  value: string
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div>
      <div className="flex items-center gap-2 text-slate-400">
        {icon}

        <span className="text-xs font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  )
}

export default SyncDetails