'use client'

import { use } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { 
  User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, 
  ShoppingBag, Heart, Settings, LogOut 
} from 'lucide-react'
import { getOrdersByUserId, formatPrice, getStatusColor } from '@/lib/data/orders'

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState<'info' | 'orders' | 'wishlist' | 'settings'>('info')

  // Get orders for this user from shared data - moved inside component body after unwrapping
  const orders = getOrdersByUserId(id)
  const totalOrders = orders.length
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0)

  // Sample user data
  const [userData, setUserData] = useState({
    id,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0901234567',
    avatar: '',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    birthDate: '1990-01-01',
    joinDate: '2024-01-15'
  })

  const [editData, setEditData] = useState({ ...userData })

  const handleSave = () => {
    setUserData(editData)
    setIsEditing(false)
    alert('Cập nhật thông tin thành công!')
  }

  const handleCancel = () => {
    setEditData({ ...userData })
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
          <span>/</span>
          <span className="text-gray-900">Trang cá nhân</span>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                  {userData.name.charAt(0)}
                </div>
                <h2 className="text-xl font-bold mb-1">{userData.name}</h2>
                <p className="text-sm text-gray-600">{userData.email}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
                  <p className="text-xs text-gray-600">Đơn hàng</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {formatPrice(totalSpent).slice(0, -2)}đ
                  </p>
                  <p className="text-xs text-gray-600">Đã chi tiêu</p>
                </div>
              </div>

              {/* Menu */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'info' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <User size={20} />
                  <span>Thông tin cá nhân</span>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <ShoppingBag size={20} />
                  <span>Đơn hàng của tôi</span>
                </button>

                <Link
                  href="/wishlist"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <Heart size={20} />
                  <span>Danh sách yêu thích</span>
                </Link>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <Settings size={20} />
                  <span>Cài đặt</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition">
                  <LogOut size={20} />
                  <span>Đăng xuất</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Thông tin cá nhân */}
            {activeTab === 'info' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Thông tin cá nhân</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      <Edit2 size={18} />
                      Chỉnh sửa
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                      >
                        <X size={18} />
                        Hủy
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        <Save size={18} />
                        Lưu
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Họ và tên</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="text"
                          value={isEditing ? editData.name : userData.name}
                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="email"
                          value={isEditing ? editData.email : userData.email}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Số điện thoại</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="tel"
                          value={isEditing ? editData.phone : userData.phone}
                          onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Ngày sinh</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="date"
                          value={isEditing ? editData.birthDate : userData.birthDate}
                          onChange={(e) => setEditData({ ...editData, birthDate: e.target.value })}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Địa chỉ</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="text"
                          value={isEditing ? editData.address : userData.address}
                          onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Ngày tham gia:</span>{' '}
                      {new Date(userData.joinDate).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Đơn hàng */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-bold">Đơn hàng của tôi</h2>
                </div>

                <div className="p-6">
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag className="mx-auto mb-4 text-gray-400" size={64} />
                      <p className="text-gray-600 mb-4">Bạn chưa có đơn hàng nào</p>
                      <Link
                        href="/products"
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Mua sắm ngay
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{order.id}</h3>
                              <p className="text-sm text-gray-600">Ngày đặt: {order.date}</p>
                            </div>
                            <span
                              className={`px-3 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}
                            >
                              {getStatusLabel(order.status)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-lg font-bold text-blue-600">
                              {formatPrice(order.total)}
                            </p>
                            <Link
                              href={`/orders/${order.id}`}
                              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                            >
                              Xem chi tiết
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-bold">Cài đặt tài khoản</h2>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Đổi mật khẩu</h3>
                    <div className="space-y-4">
                      <input
                        type="password"
                        placeholder="Mật khẩu hiện tại"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="password"
                        placeholder="Mật khẩu mới"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="password"
                        placeholder="Xác nhận mật khẩu mới"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Cập nhật mật khẩu
                      </button>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4 text-red-600">Vùng nguy hiểm</h3>
                    <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                      Xóa tài khoản
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Import helper function at top
function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    processing: 'Đang xử lý',
    shipped: 'Đang giao',
    delivered: 'Đã giao',
    cancelled: 'Đã hủy'
  }
  return labels[status] || status
}