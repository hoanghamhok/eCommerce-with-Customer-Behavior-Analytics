'use client'

import Link from 'next/link'
import { Package, ShoppingBag, FolderTree, Users } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-black">Dashboard Admin</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Link 
          href="/admin/products"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
        >
          <Package className="text-purple-600 mb-4" size={40} />
          <h3 className="font-bold text-lg text-black">Sản phẩm</h3>
          <p className="text-gray-600">Quản lý sản phẩm</p>
        </Link>
        
        <Link 
          href="/admin/orders"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
        >
          <ShoppingBag className="text-blue-600 mb-4" size={40} />
          <h3 className="font-bold text-lg text-black">Đơn hàng</h3>
          <p className="text-gray-600">Quản lý đơn hàng</p>
        </Link>
        
        <Link 
          href="/admin/categories"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
        >
          <FolderTree className="text-orange-600 mb-4" size={40} />
          <h3 className="font-bold text-lg text-black">Danh mục</h3>
          <p className="text-gray-600">Quản lý danh mục</p>
        </Link>
        
        <Link 
          href="/admin/users"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
        >
          <Users className="text-green-600 mb-4" size={40} />
          <h3 className="font-bold text-lg text-black">Khách hàng</h3>
          <p className="text-gray-600">Quản lý khách hàng</p>
        </Link>
      </div>
    </div>
  )
}