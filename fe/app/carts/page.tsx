'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag } from 'lucide-react'

export default function CartPage() {
  // Sample cart data - trong thực tế sẽ lấy từ context/redux hoặc API
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      productId: 1,
      name: 'iPhone 15 Pro Max',
      price: 29000000,
      quantity: 1,
      image: '',
      inStock: true
    },
    {
      id: 2,
      productId: 3,
      name: 'MacBook Air M2',
      price: 35000000,
      quantity: 1,
      image: '',
      inStock: true
    },
    {
      id: 3,
      productId: 6,
      name: 'AirPods Pro',
      price: 6000000,
      quantity: 2,
      image: '',
      inStock: true
    },
  ])

  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  // Tính tổng tiền
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shippingFee = subtotal > 50000000 ? 0 : 30000 // Miễn phí ship cho đơn > 50tr
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount / 100) : 0
  const total = subtotal + shippingFee - discount

  // Cập nhật số lượng
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  // Xóa sản phẩm
  const removeItem = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) {
      setCartItems(cartItems.filter(item => item.id !== id))
    }
  }

  // Áp dụng mã giảm giá
  const applyCoupon = () => {
    // Giả lập kiểm tra mã giảm giá
    const validCoupons: {[key: string]: number} = {
      'GIAM10': 10,
      'GIAM20': 20,
      'FREESHIP': 0 // Có thể xử lý riêng cho freeship
    }

    const upperCode = couponCode.toUpperCase()
    if (validCoupons[upperCode] !== undefined) {
      setAppliedCoupon({ code: upperCode, discount: validCoupons[upperCode] })
      alert(`Áp dụng mã giảm giá ${upperCode} thành công!`)
    } else {
      alert('Mã giảm giá không hợp lệ!')
    }
  }

  // Xóa mã giảm giá
  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-gray-100 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={64} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Giỏ hàng trống</h2>
          <p className="text-gray-600 mb-8">
            Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá và thêm sản phẩm yêu thích!
          </p>
          <Link 
            href="/products"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <ArrowLeft size={20} />
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
        <span>/</span>
        <span className="text-gray-900">Giỏ hàng</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            {/* Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 font-semibold text-sm">
              <div className="col-span-6">Sản phẩm</div>
              <div className="col-span-2 text-center">Đơn giá</div>
              <div className="col-span-2 text-center">Số lượng</div>
              <div className="col-span-2 text-right">Tổng</div>
            </div>

            {/* Cart Items List */}
            <div className="divide-y">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="grid md:grid-cols-12 gap-4 items-center">
                    {/* Product Info */}
                    <div className="md:col-span-6 flex gap-4">
                      <div className="w-24 h-24 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">IMG</span>
                      </div>
                      <div className="flex-1">
                        <Link 
                          href={`/products/${item.productId}`}
                          className="font-semibold hover:text-blue-600 transition"
                        >
                          {item.name}
                        </Link>
                        {item.inStock ? (
                          <p className="text-sm text-green-600 mt-1">Còn hàng</p>
                        ) : (
                          <p className="text-sm text-red-600 mt-1">Hết hàng</p>
                        )}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-red-600 hover:text-red-800 mt-2 flex items-center gap-1"
                        >
                          <Trash2 size={14} />
                          Xóa
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 text-center">
                      <p className="font-semibold text-blue-600">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 flex justify-center">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-16 text-center border-x focus:outline-none"
                          min="1"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="md:col-span-2 text-right">
                      <p className="font-bold text-lg">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Shopping */}
          <Link 
            href="/products"
            className="inline-flex items-center gap-2 mt-6 text-blue-600 hover:text-blue-800 transition"
          >
            <ArrowLeft size={20} />
            Tiếp tục mua sắm
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-6">Tóm tắt đơn hàng</h2>

            {/* Coupon */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Mã giảm giá</label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Tag size={16} className="text-green-600" />
                    <span className="font-semibold text-green-800">{appliedCoupon.code}</span>
                    <span className="text-sm text-green-600">(-{appliedCoupon.discount}%)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
                  >
                    Áp dụng
                  </button>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6 pb-6 border-b">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                <span className="font-semibold">
                  {shippingFee === 0 ? (
                    <span className="text-green-600">Miễn phí</span>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>
              {appliedCoupon && discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá</span>
                  <span className="font-semibold">-{formatPrice(discount)}</span>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold">Tổng cộng</span>
              <span className="text-2xl font-bold text-blue-600">{formatPrice(total)}</span>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-center block"
            >
              Tiến hành thanh toán
            </Link>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
              <p className="flex items-center gap-2 mb-2">
                ✓ Miễn phí vận chuyển cho đơn hàng trên 50 triệu
              </p>
              <p className="flex items-center gap-2 mb-2">
                ✓ Bảo hành chính hãng
              </p>
              <p className="flex items-center gap-2">
                ✓ Đổi trả trong 7 ngày
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}