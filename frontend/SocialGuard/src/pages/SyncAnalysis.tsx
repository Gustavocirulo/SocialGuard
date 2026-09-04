import { RotateCcw, Send, Sparkles } from "lucide-react"
import { useState } from "react"
import SyncResult from "../components/analysis/SyncResult"

function SyncAnalysis() {
  const [content, setContent] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const handleAnalyze = () => {
    if (!content.trim()) return

    setIsProcessing(true)
    setShowResult(false)

    // Simulação temporária da chamada para a IA.
    setTimeout(() => {
      setIsProcessing(false)
      setShowResult(true)
    }, 1500)
  }

  const handleReset = () => {
    setContent("")
    setShowResult(false)
    setIsProcessing(false)
  }

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <p className="mb-1 text-sm font-medium text-slate-500">
          Análises
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Análise síncrona
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Analise uma publicação individual e receba a classificação
          imediatamente.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr] lg:grid-cols-2">
        {/* Entrada */}
        <section className="rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900">
                <Sparkles className="h-5 w-5 text-white" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Conteúdo da publicação
                </h2>

                <p className="text-xs text-slate-500">
                  Insira o conteúdo que deseja analisar.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <label
              htmlFor="content"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Texto
            </label>

            <textarea
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              maxLength={5000}
              placeholder="Digite ou cole aqui o conteúdo da publicação..."
              className="min-h-64 w-full resize-none rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />

            <div className="mt-2 flex justify-between">
              <span className="text-xs text-slate-400">
                Máximo de 5.000 caracteres
              </span>

              <span className="text-xs text-slate-400">
                {content.length}/5000
              </span>
            </div>

            {/* Modelo */}
            <div className="mt-6">
              <label
                htmlFor="model"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Modelo de análise
              </label>

              <select
                id="model"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              >
                <option>SocialGuard AI — Padrão</option>
                <option>SocialGuard AI — Alta precisão</option>
              </select>
            </div>

            {/* Botões */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleAnalyze}
                disabled={!content.trim() || isProcessing}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={16} />

                {isProcessing
                  ? "Processando..."
                  : "Executar análise"}
              </button>

              {showResult && (
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  <RotateCcw size={16} />
                  Nova análise
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Resultado */}
        <section>
          {isProcessing && (
            <ProcessingState />
          )}

          {!isProcessing && !showResult && (
            <EmptyResultState />
          )}

          {!isProcessing && showResult && (
            <SyncResult
              classification="possible_violation"
              confidence={82}
              reason="O conteúdo apresenta características potencialmente incompatíveis com as políticas de conteúdo da plataforma. A classificação deve ser considerada como uma indicação preliminar e pode exigir revisão humana."
              model="SocialGuard AI"
              modelVersion="1.0"
              processingTime={842}
            />
          )}
        </section>
      </div>
    </div>
  )
}

function EmptyResultState() {
  return (
    <div className="flex min-h-[500px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8">
      <div className="max-w-sm text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
          <Sparkles className="h-5 w-5 text-slate-400" />
        </div>

        <h3 className="text-sm font-semibold text-slate-800">
          Aguardando análise
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          O resultado da classificação aparecerá aqui após
          a execução da análise.
        </p>
      </div>
    </div>
  )
}

function ProcessingState() {
  return (
    <div className="flex min-h-[500px] items-center justify-center rounded-xl border border-slate-200 bg-white p-8">
      <div className="max-w-sm text-center">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
        </div>

        <h3 className="text-sm font-semibold text-slate-900">
          Processando conteúdo
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          A publicação está sendo analisada pelo modelo de
          inteligência artificial.
        </p>

        <div className="mx-auto mt-5 h-1.5 max-w-xs overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-2/3 animate-pulse rounded-full bg-slate-900" />
        </div>
      </div>
    </div>
  )
}

export default SyncAnalysis