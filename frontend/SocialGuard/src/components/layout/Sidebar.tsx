import {
  BarChart3,
  FileSearch,
  History,
  Layers3,
  Settings,
  ShieldCheck,
} from "lucide-react"
import { NavLink } from "react-router-dom"

function Sidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-slate-200 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>

          <div>
            <h1 className="text-sm font-bold tracking-wide text-slate-900">
              SOCIALGUARD
            </h1>

            <p className="text-xs text-slate-500">
              AI Content Analysis
            </p>
          </div>
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-4 py-6">
        <div className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Principal
        </div>

        <div className="space-y-1">
          <NavItem
            to="/dashboard"
            icon={<BarChart3 size={18} />}
            label="Dashboard"
          />
        </div>

        <div className="mb-3 mt-8 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Análises
        </div>

        <div className="space-y-1">
          <NavItem
            to="/analysis/sync"
            icon={<FileSearch size={18} />}
            label="Análise síncrona"
          />

          <NavItem
            to="/analysis/batch"
            icon={<Layers3 size={18} />}
            label="Análise em lote"
          />
        </div>

        <div className="mb-3 mt-8 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Dados
        </div>

        <div className="space-y-1">
          <NavItem
            to="/history"
            icon={<History size={18} />}
            label="Histórico"
          />
        </div>
      </nav>

      {/* Configurações */}
      <div className="border-t border-slate-200 p-4">
        <NavItem
          to="/settings"
          icon={<Settings size={18} />}
          label="Configurações"
        />
      </div>
    </aside>
  )
}

interface NavItemProps {
  to: string
  icon: React.ReactNode
  label: string
}

function NavItem({ to, icon, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
          isActive
            ? "bg-slate-900 text-white"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  )
}

export default Sidebar