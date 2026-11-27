
import { Outlet } from 'react-router-dom'

import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function MainLayout() {
  return (
    <div dir="rtl" className="h-screen overflow-hidden bg-[var(--bg)]">

      <Sidebar />

      <div className="mr-64 flex h-full min-w-0 flex-col">
        <Topbar />

        <main className="min-h-0 flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

    </div>
  )
}
