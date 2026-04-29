import { Link, Outlet } from 'react-router-dom'

export function AppShell() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-black text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-90">
            <span className="text-3xl">🧮</span>
            <span>MathsKid</span>
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-full text-sm font-semibold"
          >
            <span>📊</span>
            <span>My Dashboard</span>
          </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}
