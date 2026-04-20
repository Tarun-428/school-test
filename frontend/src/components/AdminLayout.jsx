import AdminSidebar from './AdminSidebar'

export default function AdminLayout({ children, title }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <h1 className="font-heading font-bold text-2xl text-gray-900 tracking-wide">{title}</h1>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">A</div>
            <span className="text-sm text-gray-600 font-medium">Admin</span>
          </div>
        </header>
        {/* Page content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
