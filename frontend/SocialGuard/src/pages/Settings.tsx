import { useState } from "react"
import {
  CheckCircle2,
  Database,
  Save,
  Settings as SettingsIcon,
  SlidersHorizontal,
} from "lucide-react"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import Select from "../components/ui/Select"
import Card from "../components/ui/Card"

function Settings() {
  const [model, setModel] = useState("SocialGuard AI")
  const [modelVersion, setModelVersion] = useState("1.0")
  const [confidenceThreshold, setConfidenceThreshold] = useState("70")
  const [maxBatchSize, setMaxBatchSize] = useState("1000")
  const [autoProcessing, setAutoProcessing] = useState(true)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 3000)
  }

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white">
              <SettingsIcon size={20} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Configurações
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Configure os parâmetros utilizados nas análises de conteúdo.
              </p>
            </div>
          </div>
        </div>

        {/* Feedback */}
        {saved && (
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <CheckCircle2 size={18} />

            <span>
              Configurações salvas com sucesso.
            </span>
          </div>
        )}

        <div className="space-y-6">
          {/* Configuração do modelo */}
          <section className="rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  <SlidersHorizontal size={18} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Modelo de classificação
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Defina o modelo utilizado para classificar as publicações.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2">
              <div>
                <Select
                    id="model"
                    label="Modelo"
                    value={model}
                    onChange={(event) => setModel(event.target.value)}
                    >
                    <option>SocialGuard AI</option>
                    <option>Modelo local</option>
                </Select>
              </div>

              <div>
                <Select
                    id="modelVersion"
                    label="Versão"
                    value={modelVersion}
                    onChange={(event) => setModelVersion(event.target.value)}>
                    <option>1.0</option>
                    <option>1.1</option>
                    <option>2.0</option>
                </Select>
              </div>
            </div>
          </section>

          {/* Processamento */}
          <section className="rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  <Database size={18} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Processamento
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Defina limites e comportamentos do processamento.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2">
              <div>
                <div className="relative">
                    <Input
                    id="confidence"
                    label="Limite de confiança"
                    type="number"
                    min="0"
                    max="100"
                    value={confidenceThreshold}
                    onChange={(event) =>
                        setConfidenceThreshold(event.target.value)
                    }
                    helperText="Classificações abaixo desse valor podem ser consideradas inconclusivas."
                    />

                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    %
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Máximo de posts por lote
                </label>

                <input
                  type="number"
                  min="1"
                  value={maxBatchSize}
                  onChange={(event) =>
                    setMaxBatchSize(event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Limite utilizado para novos processamentos em lote.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-200 px-6 py-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Processamento automático
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Iniciar automaticamente o processamento após o envio do
                    lote.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setAutoProcessing(!autoProcessing)}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    autoProcessing
                      ? "bg-slate-900"
                      : "bg-slate-300"
                  }`}
                  aria-label="Alternar processamento automático"
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                      autoProcessing
                        ? "left-6"
                        : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Informações */}
          <section className="rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-sm font-semibold text-slate-900">
                Informações do sistema
              </h2>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-3">
              <InfoItem
                label="Aplicação"
                value="SocialGuard"
              />

              <InfoItem
                label="Ambiente"
                value="Desenvolvimento"
              />

              <InfoItem
                label="Versão"
                value="0.1.0"
              />
            </div>
          </section>

          {/* Ações */}
          <div className="flex justify-end">
            <Button
            onClick={handleSave}
            size="lg"
            >
            <Save size={17} />
            Salvar configurações
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface InfoItemProps {
  label: string
  value: string
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-800">
        {value}
      </p>
    </div>
  )
}

export default Settings