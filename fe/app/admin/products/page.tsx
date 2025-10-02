'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, Eye, Search } from 'lucide-react'
import Link from 'next/link'

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Sample data - sẽ thay bằng API
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'iPhone 15 Pro Max', 
      category: 'Điện thoại',
      price: 29000000, 
      stock: 25,
      status: 'active',
      image: ''
    },
    { 
      id: 2, 
      name: 'Samsung Galaxy S24 Ultra', 
      category: 'Điện thoại',
      price: 25000000, 
      stock: 18,
      status: 'active',
      image: ''
    },
    { 
      id: 3, 
      name: 'MacBook Air M2', 
      category: 'Laptop',
      price: 35000000, 
      stock: 12,
      status: 'active',
      image: ''
    },
    { 
      id: 4, 
      name: 'Dell XPS 13', 
      category: 'Laptop',
      price: 28000000, 
      stock: 8,
      status: 'active',
      image: ''
    },
    { 
      id: 5, 
      name: 'iPad Pro 12.9"', 
      category: 'Tablet',
      price: 28000000, 
      stock: 0,
      status: 'out_of_stock',
      image: ''
    },
    { 
      id: 6, 
      name: 'AirPods Pro', 
      category: 'Phụ kiện',
      price: 6000000, 
      stock: 45,
      status: 'active',
      image: ''
    },
  ])

  const categories = ['all', 'Điện thoại', 'Laptop', 'Tablet', 'Phụ kiện']

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const getStatusBadge = (status: string, stock: number) => {
    if (stock === 0) {
      return <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800">Hết hàng</span>
    }
    if (stock < 10) {
      return <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Sắp hết</span>
    }
    return <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">Còn hàng</span>
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-black">Quản lý sản phẩm</h1>
          <p className="text-gray-600">Tổng số: {products.length} sản phẩm</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
          <Plus size={20} />
          Thêm sản phẩm mới
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-blue-400" size={20} />
            <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-blue-300 bg-blue-50 rounded-lg 
                        focus:outline-none focus:border-blue-500 text-black placeholder-gray-500"
            />
            </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-blue-100 text-gray-700 focus:outline-none focus:border-blue-500">
            <option value="all">Tất cả danh mục</option>
            {categories.filter(c => c !== 'all').map((category) => (
                <option key={category} value={category}>
                {category}
                </option>
            ))}
            </select>

        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Danh mục
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tồn kho
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Không tìm thấy sản phẩm nào
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-500 text-xs">IMG</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {product.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{product.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-blue-600">
                        {formatPrice(product.price)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{product.stock}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(product.status, product.stock)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          className="text-gray-600 hover:text-blue-600 transition"
                          title="Xem chi tiết"
                        >
                          <Eye size={18} />
                        </Link>
                        <button
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="Chỉnh sửa"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-800 transition"
                          title="Xóa"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
          <div className="text-sm text-gray-700">
            Hiển thị <span className="font-medium">{filteredProducts.length}</span> trên{' '}
            <span className="font-medium">{products.length}</span> sản phẩm
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition disabled:opacity-50" disabled>
              Trước
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition">
              2
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition">
              Sau
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Tổng sản phẩm</p>
          <p className="text-2xl font-bold text-blue-600">{products.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Còn hàng</p>
          <p className="text-2xl font-bold text-green-600">
            {products.filter(p => p.stock > 0).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Hết hàng</p>
          <p className="text-2xl font-bold text-red-600">
            {products.filter(p => p.stock === 0).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Tổng giá trị</p>
          <p className="text-2xl font-bold text-purple-600">
            {formatPrice(products.reduce((sum, p) => sum + (p.price * p.stock), 0))}
          </p>
        </div>
      </div>
    </div>
  )
}