'use client'

import { use } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, Package, Truck, CheckCircle, Clock, XCircle, 
  MapPin, Phone, User, CreditCard 
} from 'lucide-react'
import { getOrderById, formatPrice, getStatusColor, getStatusLabel } from '@/lib/data/orders'

const statusConfig = {
  pending: { icon: Clock },
  confirmed: { icon: CheckCircle },
  processing: { icon: Package },
  shipped: { icon: Truck },
  delivered: { icon: CheckCircle },
  cancelled: { icon: XCircle }
}

export default function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params)
  const order = getOrderById(orderId)

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy đơn hàng</h2>
          <p className="text-gray-600 mb-4">Đơn hàng {orderId} không tồn tại</p>
          <Link 
            href="/profile/1"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Quay lại trang cá nhân
          </Link>
        </div>
      </div>
    )
  }

  const StatusIcon = statusConfig[order.status].icon

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Link 
            href={`/profile/${order.userId}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft size={20} />
            Quay lại trang cá nhân
          </Link>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-2">Đơn hàng #{order.id}</h1>
                <p className="text-gray-600">Đặt ngày: {new Date(order.date).toLocaleDateString('vi-VN')}</p>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getStatusColor(order.status)}`}>
                  <StatusIcon size={18} />
                  <span className="font-medium">{getStatusLabel(order.status)}</span>
                </div>
                {order.trackingNumber && (
                  <p className="text-sm text-gray-600 mt-2">
                    Mã vận đơn: <span className="font-mono font-semibold">{order.trackingNumber}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order Progress */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">Trạng thái đơn hàng</h2>
          <div className="relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
              <div 
                className="h-full bg-blue-600 transition-all duration-500"
                style={{ 
                  width: order.status === 'delivered' ? '100%' : 
                         order.status === 'shipped' ? '66%' : 
                         order.status === 'processing' ? '33%' : '0%' 
                }}
              />
            </div>
            
            <div className="relative flex justify-between">
              {(['confirmed', 'processing', 'shipped', 'delivered'] as const).map((status, idx) => {
                const isActive = ['confirmed', 'processing', 'shipped', 'delivered'].indexOf(order.status) >= idx
                const Icon = statusConfig[status].icon
                
                return (
                  <div key={status} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      <Icon size={20} />
                    </div>
                    <p className="text-xs text-center font-medium">{getStatusLabel(status)}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-blue-600" />
              Địa chỉ giao hàng
            </h2>
            <div className="space-y-2 text-gray-700">
              <p className="flex items-start gap-2">
                <User size={18} className="mt-0.5 flex-shrink-0" />
                <span className="font-semibold">{order.shippingAddress.name}</span>
              </p>
              <p className="flex items-start gap-2">
                <Phone size={18} className="mt-0.5 flex-shrink-0" />
                <span>{order.shippingAddress.phone}</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>{order.shippingAddress.address}, {order.shippingAddress.city}</span>
              </p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <CreditCard size={20} className="text-blue-600" />
              Thông tin thanh toán
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Phương thức:</span>
                <span className="font-semibold">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính:</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phí vận chuyển:</span>
                <span>{order.shipping === 0 ? 'Miễn phí' : formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <span className="font-bold">Tổng cộng:</span>
                <span className="font-bold text-blue-600 text-lg">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-4">Chi tiết sản phẩm</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50 transition">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package size={32} className="text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{item.productName}</h3>
                  <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                  <p className="text-sm text-gray-600">Đơn giá: {formatPrice(item.price)}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">{formatPrice(item.total)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <h3 className="font-semibold mb-2 text-yellow-800">Ghi chú</h3>
            <p className="text-gray-700">{order.notes}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          {order.status === 'pending' && (
            <button className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              Hủy đơn hàng
            </button>
          )}
          {order.status === 'delivered' && (
            <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Mua lại
            </button>
          )}
          <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
            Liên hệ hỗ trợ
          </button>
        </div>
      </div>
    </div>
  )
}