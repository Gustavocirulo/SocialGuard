import {
  Bell,
  ChevronDown,
  Menu,
} from "lucide-react"

interface HeaderProps {
  onMenuClick: () => void
}

function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        {/* Menu mobile */}
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          aria-label="Abrir menu"
        >
          <Menu size={21} />
        </button>

        <div className="min-w-0">
          <p className="text-xs text-slate-500 sm:text-sm">
            Plataforma de análise
          </p>

          <h2 className="truncate text-base font-semibold text-slate-900 sm:text-lg">
            Monitoramento de conteúdo
          </h2>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 sm:gap-5">
        <button
          type="button"
          className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          aria-label="Notificações"
        >
          <Bell size={20} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600" />
        </button>

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        <button
          type="button"
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
            AG
          </div>

          <div className="hidden text-left md:block">
            <p className="text-sm font-medium text-slate-900">
              Administrador
            </p>

            <p className="text-xs text-slate-500">
              Pesquisador
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-slate-400 md:block"
          />
        </button>
      </div>
    </header>
  )
}

export default Header