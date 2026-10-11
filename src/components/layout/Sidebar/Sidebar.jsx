import { NavLink } from 'react-router-dom'

import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  UserRound,
  PanelsTopLeft,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Customers', path: '/customers', icon: Users },
  { label: 'Orders', path: '/orders', icon: ShoppingCart },
  { label: 'My Profile', path: '/profile', icon: UserRound },
]

export default function Sidebar() {
  return (
    <aside className="w-full shrink-0 border-b border-slate-200 bg-white p-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r md:p-6">
      <div className="mb-6 flex items-center gap-3 md:mb-10">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <PanelsTopLeft size={24} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            NOVA
          </h2>

          <p className="text-xs text-slate-500">
            ADMIN CONSOLE
          </p>
        </div>
      </div>

      <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Workspace
      </p>

      <nav className="flex gap-2 overflow-x-auto md:flex-col">
        {navItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}