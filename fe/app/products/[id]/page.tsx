'use client'

import { useState, use } from 'react'
import { ShoppingCart, Heart, Share2 } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params); // unwrap Promise
  const { id } = resolvedParams;
  const [quantity, setQuantity] = useState(1);

  // Sample data - sẽ fetch từ API
  const product = {
    id,
    name: 'iPhone 15 Pro Max',
    price: 29000000,
    description: 'iPhone 15 Pro Max với chip A17 Pro mạnh mẽ, camera 48MP chuyên nghiệp, màn hình Super Retina XDR 6.7 inch và khung titan cao cấp.',
    specifications: [
      { label: 'Màn hình', value: '6.7" Super Retina XDR' },
      { label: 'Chip', value: 'Apple A17 Pro' },
      { label: 'Camera', value: '48MP + 12MP + 12MP' },
      { label: 'RAM', value: '8GB' },
      { label: 'Dung lượng', value: '256GB' },
    ],
    images: ['', '', ''],
    category: 'Điện thoại'
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-blue-600">Sản phẩm</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="bg-gray-200 rounded-lg mb-4 aspect-square flex items-center justify-center">
            <span className="text-gray-500 text-lg">Hình ảnh sản phẩm</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 rounded aspect-square flex items-center justify-center cursor-pointer hover:border-2 hover:border-blue-500">
                <span className="text-gray-400 text-xs">{i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className='text-black'>
          <h1 className="text-3xl font-bold mb-4 text-black">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
            <span className="bg-red-500 text-white px-3 py-1 rounded text-sm">
              -15%
            </span>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Specifications */}
          <div className="mb-6 border rounded-lg p-4">
            <h3 className="font-bold mb-3">Thông số kỹ thuật</h3>
            <div className="space-y-2">
              {product.specifications.map((spec, index) => (
                <div key={index} className="flex justify-between py-2 border-b last:border-b-0">
                  <span className="text-gray-600">{spec.label}:</span>
                  <span className="font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Số lượng:</label>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border rounded hover:bg-gray-100"
              >
                -
              </button>
              <input 
                type="number" 
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-20 h-10 border rounded text-center"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-6">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2">
              <ShoppingCart size={20} />
              Thêm vào giỏ hàng
            </button>
            <button className="w-12 h-12 border rounded-lg hover:bg-gray-100 flex items-center justify-center">
              <Heart size={20} />
            </button>
            <button className="w-12 h-12 border rounded-lg hover:bg-gray-100 flex items-center justify-center">
              <Share2 size={20} />
            </button>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
            <p className="flex items-center gap-2">
              ✓ Miễn phí vận chuyển toàn quốc
            </p>
            <p className="flex items-center gap-2">
              ✓ Bảo hành chính hãng 12 tháng
            </p>
            <p className="flex items-center gap-2">
              ✓ Đổi trả trong 7 ngày
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}