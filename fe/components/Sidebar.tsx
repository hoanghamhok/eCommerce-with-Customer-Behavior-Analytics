'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingBag, FolderTree, Users, Settings } from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      href: '/admin',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      href: '/admin/categories',
      label: 'Danh mục',
      icon: FolderTree
    },
    {
      href: '/admin/products',
      label: 'Sản phẩm',
      icon: Package
    },
    {
      href: '/admin/orders',
      label: 'Đơn hàng',
      icon: ShoppingBag
    },
    {
      href: '/admin/users',
      label: 'Khách hàng',
      icon: Users
    },
    {
      href: '/admin/settings',
      label: 'Cài đặt',
      icon: Settings
    },
  ]

  return (
    <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}