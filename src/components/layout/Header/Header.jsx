import { useNavigate, useLocation } from 'react-router-dom'
import { Bell, LogOut } from 'lucide-react'

import useAuth from '../../../features/auth/hooks/useAuth'

const pageTitles = {
  '/': 'Dashboard Overview',
  '/customers': 'Customers',
  '/orders': 'Orders',
  '/profile': 'My Profile',
}

export default function Header() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user, logout } = useAuth()

  const title = pageTitles[pathname] || 'Admin Dashboard'

  const initials = (user?.name || 'Admin User')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          Workspace / Management
        </p>

        <h1 className="mt-1 text-xl font-bold text-slate-900">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50"
        >
          <Bell size={19} />
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
          {initials}
        </div>

        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-slate-800">
            {user?.name}
          </p>

          <p className="text-xs text-slate-500">
            {user?.email}
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          title="Log out"
          aria-label="Log out"
          className="rounded-xl p-2.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
        >
          <LogOut size={19} />
        </button>
      </div>
    </header>
  )
}