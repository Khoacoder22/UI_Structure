import { Outlet } from 'react-router-dom'

import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 md:flex">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Header />

        <main className="mx-auto w-full max-w-[1400px] p-4 sm:p-6 lg:p-8">
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  )
}