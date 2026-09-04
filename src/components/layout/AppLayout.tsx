import { useState } from "react"
import type { ReactNode } from "react"
import { Menu, X } from "lucide-react"

import Sidebar from "./Sidebar"
import Header from "./Header"

interface AppLayoutProps {
  children: ReactNode
}

function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Sidebar mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/30"
            onClick={() => setSidebarOpen(false)}
          />

          <div className="relative z-50 h-full w-64">
            <div className="absolute right-3 top-5">
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="rounded-lg bg-white p-2 text-slate-500 shadow-sm transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Fechar menu"
              >
                <X size={20} />
              </button>
            </div>

            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppLayout