import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import AppLayout from "./components/layout/AppLayout"
import Dashboard from "./pages/Dashboard"
import SyncAnalysis from "./pages/SyncAnalysis"
import BatchAnalysis from "./pages/BatchAnalysis"
import History from "./pages/History"
import BatchDetails from "./pages/BatchDetails"
import Settings from "./pages/Settings"
import SyncDetails from "./pages/SyncDetails"

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/analysis/sync"
            element={<SyncAnalysis />}
          />

          <Route
            path="/analysis/batch"
            element={<BatchAnalysis />}
          />

          <Route
            path="/history"
            element={<History />}
          />

          <Route
            path="/analysis/batch/:id"
            element={<BatchDetails />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="/analysis/sync/:id"
            element={<SyncDetails />}
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App