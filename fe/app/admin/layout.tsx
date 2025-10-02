import Sidebar from '@/components/Sidebar'

export const metadata = {
  title: 'Admin - Quản trị hệ thống',
  description: 'Trang quản trị e-commerce',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}