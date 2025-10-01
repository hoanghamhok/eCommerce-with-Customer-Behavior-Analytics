'use client'

import { useState } from 'react'
import ProductCard from '@/components/ProductCard'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const products = [
    { id: 1, name: 'iPhone 15 Pro Max', price: 29000000, category: 'phone', image: '' },
    { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 25000000, category: 'phone', image: '' },
    { id: 3, name: 'MacBook Air M2', price: 35000000, category: 'laptop', image: '' },
    { id: 4, name: 'Dell XPS 13', price: 28000000, category: 'laptop', image: '' },
    { id: 5, name: 'iPad Pro 12.9"', price: 28000000, category: 'tablet', image: '' },
    { id: 6, name: 'AirPods Pro', price: 6000000, category: 'accessory', image: '' },
  ]

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'phone', name: 'Điện thoại' },
    { id: 'laptop', name: 'Laptop' },
    { id: 'tablet', name: 'Tablet' },
    { id: 'accessory', name: 'Phụ kiện' },
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  return (
    <div className="container mx-auto px-4 py-8 text-blue-600" >
      <h1 className="text-3xl font-bold mb-8">Sản phẩm</h1>
      
      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className="w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-4">Danh mục</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-4 py-2 rounded transition ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <h3 className="font-bold text-lg mb-4 mt-6">Giá</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Dưới 10 triệu</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">10 - 20 triệu</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Trên 20 triệu</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              Hiển thị {filteredProducts.length} sản phẩm
            </p>
            <select className="border rounded px-3 py-2">
              <option>Mới nhất</option>
              <option>Giá thấp đến cao</option>
              <option>Giá cao đến thấp</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}