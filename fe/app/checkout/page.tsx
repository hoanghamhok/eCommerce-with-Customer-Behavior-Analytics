'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard, Truck, MapPin, Phone, Mail, User, CheckCircle } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const [step, setStep] = useState(1) // 1: Thông tin, 2: Thanh toán, 3: Xác nhận

  // Form data
  const [formData, setFormData] = useState({
    // Thông tin giao hàng
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    note: '',
    
    // Phương thức thanh toán
    paymentMethod: 'cod', // cod, banking, card
    
    // Thông tin thẻ (nếu chọn card)
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVV: ''
  })

  // Sample cart data - trong thực tế lấy từ context/redux
  const cartItems = [
    { id: 1, name: 'iPhone 15 Pro Max', price: 29000000, quantity: 1, image: '' },
    { id: 2, name: 'AirPods Pro', price: 6000000, quantity: 2, image: '' },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shippingFee = 30000
  const total = subtotal + shippingFee

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 1) {
      // Validate thông tin giao hàng
      if (!formData.fullName || !formData.phone || !formData.address) {
        alert('Vui lòng điền đầy đủ thông tin giao hàng')
        return
      }
      setStep(2)
    } else if (step === 2) {
      // Validate thanh toán
      if (formData.paymentMethod === 'card') {
        if (!formData.cardNumber || !formData.cardName || !formData.cardExpiry || !formData.cardCVV) {
          alert('Vui lòng điền đầy đủ thông tin thẻ')
          return
        }
      }
      setStep(3)
    } else if (step === 3) {
      // Xác nhận đơn hàng
      alert('Đặt hàng thành công! Cảm ơn bạn đã mua hàng.')
      router.push('/orders') // Chuyển đến trang đơn hàng
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
          <span>/</span>
          <Link href="/carts" className="hover:text-blue-600">Giỏ hàng</Link>
          <span>/</span>
          <span className="text-gray-900">Thanh toán</span>
        </div>

        {/* Back Button */}
        <Link 
          href="/carts"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft size={20} />
          Quay lại giỏ hàng
        </Link>

        {/* Steps Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[
              { num: 1, title: 'Thông tin giao hàng', icon: Truck },
              { num: 2, title: 'Thanh toán', icon: CreditCard },
              { num: 3, title: 'Xác nhận', icon: CheckCircle }
            ].map((s, index) => {
              const Icon = s.icon
              return (
                <div key={s.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      step >= s.num 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      <Icon size={24} />
                    </div>
                    <span className={`mt-2 text-sm font-medium ${
                      step >= s.num ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      {s.title}
                    </span>
                  </div>
                  {index < 2 && (
                    <div className={`w-24 h-1 mx-4 ${
                      step > s.num ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Thông tin giao hàng */}
              {step === 1 && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-2xl font-bold mb-6">Thông tin giao hàng</h2>
                  
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 text-gray-400" size={20} />
                          <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nguyễn Văn A"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0901234567"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="example@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Địa chỉ <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="text"
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Số nhà, tên đường"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Thành phố</label>
                        <select
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Chọn thành phố</option>
                          <option value="hanoi">Hà Nội</option>
                          <option value="hcm">TP. Hồ Chí Minh</option>
                          <option value="danang">Đà Nẵng</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Quận/Huyện</label>
                        <input
                          type="text"
                          value={formData.district}
                          onChange={(e) => setFormData({...formData, district: e.target.value})}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Quận/Huyện"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Phường/Xã</label>
                        <input
                          type="text"
                          value={formData.ward}
                          onChange={(e) => setFormData({...formData, ward: e.target.value})}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Phường/Xã"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Ghi chú</label>
                      <textarea
                        value={formData.note}
                        onChange={(e) => setFormData({...formData, note: e.target.value})}
                        rows={3}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ghi chú cho người giao hàng..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Tiếp tục
                  </button>
                </div>
              )}

              {/* Step 2: Phương thức thanh toán */}
              {step === 2 && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-2xl font-bold mb-6">Phương thức thanh toán</h2>
                  
                  <div className="space-y-4">
                    {/* COD */}
                    <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                        className="mt-1 mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Truck size={20} className="text-blue-600" />
                          <span className="font-semibold">Thanh toán khi nhận hàng (COD)</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Thanh toán bằng tiền mặt khi nhận hàng
                        </p>
                      </div>
                    </label>

                    {/* Chuyển khoản */}
                    <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="banking"
                        checked={formData.paymentMethod === 'banking'}
                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                        className="mt-1 mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CreditCard size={20} className="text-blue-600" />
                          <span className="font-semibold">Chuyển khoản ngân hàng</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Chuyển khoản qua Internet Banking hoặc tại ngân hàng
                        </p>
                      </div>
                    </label>

                    {/* Thẻ tín dụng */}
                    <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                        className="mt-1 mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CreditCard size={20} className="text-blue-600" />
                          <span className="font-semibold">Thẻ tín dụng/Ghi nợ</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Thanh toán bằng thẻ Visa, Mastercard, JCB
                        </p>
                      </div>
                    </label>

                    {/* Card Details */}
                    {formData.paymentMethod === 'card' && (
                      <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Số thẻ</label>
                          <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                            className="w-full px-4 py-3 border rounded-lg"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Tên trên thẻ</label>
                          <input
                            type="text"
                            value={formData.cardName}
                            onChange={(e) => setFormData({...formData, cardName: e.target.value})}
                            className="w-full px-4 py-3 border rounded-lg"
                            placeholder="NGUYEN VAN A"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Ngày hết hạn</label>
                            <input
                              type="text"
                              value={formData.cardExpiry}
                              onChange={(e) => setFormData({...formData, cardExpiry: e.target.value})}
                              className="w-full px-4 py-3 border rounded-lg"
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">CVV</label>
                            <input
                              type="text"
                              value={formData.cardCVV}
                              onChange={(e) => setFormData({...formData, cardCVV: e.target.value})}
                              className="w-full px-4 py-3 border rounded-lg"
                              placeholder="123"
                              maxLength={3}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                    >
                      Quay lại
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Tiếp tục
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Xác nhận đơn hàng */}
              {step === 3 && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-2xl font-bold mb-6">Xác nhận đơn hàng</h2>
                  
                  {/* Thông tin giao hàng */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Truck size={20} className="text-blue-600" />
                      Thông tin giao hàng
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Người nhận:</span> {formData.fullName}</p>
                      <p><span className="font-medium">SĐT:</span> {formData.phone}</p>
                      {formData.email && <p><span className="font-medium">Email:</span> {formData.email}</p>}
                      <p><span className="font-medium">Địa chỉ:</span> {formData.address}, {formData.ward}, {formData.district}, {formData.city}</p>
                      {formData.note && <p><span className="font-medium">Ghi chú:</span> {formData.note}</p>}
                    </div>
                  </div>

                  {/* Phương thức thanh toán */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <CreditCard size={20} className="text-blue-600" />
                      Phương thức thanh toán
                    </h3>
                    <p className="text-sm">
                      {formData.paymentMethod === 'cod' && 'Thanh toán khi nhận hàng (COD)'}
                      {formData.paymentMethod === 'banking' && 'Chuyển khoản ngân hàng'}
                      {formData.paymentMethod === 'card' && 'Thẻ tín dụng/Ghi nợ'}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                    >
                      Quay lại
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                      Đặt hàng
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Đơn hàng của bạn</h3>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs text-gray-500">IMG</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-sm text-gray-600">x{item.quantity}</p>
                      <p className="font-semibold text-blue-600">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển</span>
                  <span className="font-semibold">{formatPrice(shippingFee)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="text-lg font-semibold">Tổng cộng</span>
                  <span className="text-2xl font-bold text-blue-600">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}