import AdminSidebar from './AdminSidebar'

export default function AdminLayout({ children, title }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 flex min-w-0 flex-col pb-24 md:pb-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between md:px-8 md:py-4">
          <h1 className="font-heading font-bold text-xl text-gray-900 tracking-wide md:text-2xl">{title}</h1>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">A</div>
            <span className="hidden text-sm text-gray-600 font-medium sm:inline">Admin</span>
          </div>
        </header>
        {/* Page content */}
        <div className="flex-1 overflow-x-hidden p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
