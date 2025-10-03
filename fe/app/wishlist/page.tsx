'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Trash2, ArrowLeft, X } from 'lucide-react'

export default function WishlistPage() {
  // Sample wishlist data - trong thực tế sẽ lấy từ context/redux hoặc API
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      productId: 1,
      name: 'iPhone 15 Pro Max',
      price: 29000000,
      originalPrice: 32000000,
      image: '',
      inStock: true,
      discount: 10
    },
    {
      id: 2,
      productId: 3,
      name: 'MacBook Air M2',
      price: 35000000,
      originalPrice: 38000000,
      image: '',
      inStock: true,
      discount: 8
    },
    {
      id: 3,
      productId: 5,
      name: 'iPad Pro 12.9"',
      price: 28000000,
      originalPrice: 30000000,
      image: '',
      inStock: false,
      discount: 7
    },
    {
      id: 4,
      productId: 6,
      name: 'AirPods Pro',
      price: 6000000,
      originalPrice: 7000000,
      image: '',
      inStock: true,
      discount: 14
    },
  ])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  // Xóa sản phẩm khỏi wishlist
  const removeItem = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id))
  }

  // Thêm vào giỏ hàng
  const addToCart = (productId: number) => {
    // Logic thêm vào giỏ hàng
    alert('Đã thêm vào giỏ hàng!')
  }

  // Xóa tất cả
  const clearWishlist = () => {
    if (confirm('Bạn có chắc muốn xóa tất cả sản phẩm yêu thích?')) {
      setWishlistItems([])
    }
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-pink-50 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
            <Heart size={64} className="text-pink-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Danh sách yêu thích trống</h2>
          <p className="text-gray-600 mb-8">
            Bạn chưa có sản phẩm nào trong danh sách yêu thích. Hãy khám phá và lưu các sản phẩm bạn thích!
          </p>
          <Link 
            href="/products"
            className="inline-flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition"
          >
            <ArrowLeft size={20} />
            Khám phá sản phẩm
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-pink-600">Trang chủ</Link>
        <span>/</span>
        <span className="text-gray-900">Danh sách yêu thích</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Danh sách yêu thích</h1>
          <p className="text-gray-600">Bạn có {wishlistItems.length} sản phẩm yêu thích</p>
        </div>
        {wishlistItems.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-red-600 hover:text-red-800 flex items-center gap-2 transition"
          >
            <Trash2 size={18} />
            Xóa tất cả
          </button>
        )}
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow hover:shadow-xl transition group relative">
            {/* Remove Button */}
            <button
              onClick={() => removeItem(item.id)}
              className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition opacity-0 group-hover:opacity-100"
            >
              <X size={16} className="text-red-600" />
            </button>

            {/* Discount Badge */}
            {item.discount > 0 && (
              <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                -{item.discount}%
              </div>
            )}

            {/* Product Image */}
            <Link href={`/products/${item.productId}`}>
              <div className="bg-gray-200 h-64 rounded-t-lg flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                ) : (
                  <span className="text-gray-500">Hình ảnh sản phẩm</span>
                )}
              </div>
            </Link>

            {/* Product Info */}
            <div className="p-4">
              <Link 
                href={`/products/${item.productId}`}
                className="font-semibold text-lg mb-2 hover:text-pink-600 transition line-clamp-2 block"
              >
                {item.name}
              </Link>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-pink-600">
                    {formatPrice(item.price)}
                  </span>
                  {item.originalPrice > item.price && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(item.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              {item.inStock ? (
                <p className="text-sm text-green-600 mb-3">✓ Còn hàng</p>
              ) : (
                <p className="text-sm text-red-600 mb-3">✗ Hết hàng</p>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => addToCart(item.productId)}
                  disabled={!item.inStock}
                  className={`flex-1 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                    item.inStock
                      ? 'bg-pink-500 text-white hover:bg-pink-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={18} />
                  Thêm vào giỏ
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Actions */}
      <div className="mt-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <Link 
          href="/products"
          className="flex items-center gap-2 text-pink-600 hover:text-pink-800 transition"
        >
          <ArrowLeft size={20} />
          Tiếp tục mua sắm
        </Link>

        <div className="flex gap-4">
          <Link
            href="/carts"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Xem giỏ hàng
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="bg-pink-50 p-6 rounded-lg text-center">
          <Heart className="mx-auto mb-3 text-pink-500" size={40} />
          <h3 className="font-bold mb-2">Lưu sản phẩm yêu thích</h3>
          <p className="text-sm text-gray-600">
            Lưu lại các sản phẩm bạn quan tâm để xem sau
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <ShoppingCart className="mx-auto mb-3 text-blue-500" size={40} />
          <h3 className="font-bold mb-2">Mua sắm dễ dàng</h3>
          <p className="text-sm text-gray-600">
            Thêm nhanh vào giỏ hàng khi sẵn sàng mua
          </p>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg text-center">
          <svg className="mx-auto mb-3 text-purple-500" fill="none" stroke="currentColor" width="40" height="40" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <h3 className="font-bold mb-2">Thông báo giá tốt</h3>
          <p className="text-sm text-gray-600">
            Nhận thông báo khi sản phẩm giảm giá
          </p>
        </div>
      </div>
    </div>
  )
}