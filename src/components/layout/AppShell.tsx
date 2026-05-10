import { Link, Outlet } from 'react-router-dom'

export function AppShell() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-black text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-4xl font-bold hover:opacity-90">
            <span className="text-5xl">🧮</span>
            <span>MathsKid</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/mental-maths"
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 transition-colors px-6 py-3 rounded-full text-xl font-semibold"
            >
              <span className="text-2xl">🧠</span>
              <span>Mental Maths</span>
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-6 py-3 rounded-full text-xl font-semibold"
            >
              <span className="text-2xl">📊</span>
              <span>My Dashboard</span>
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}
