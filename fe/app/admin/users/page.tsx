'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, Mail, Phone, MapPin, Search, Filter, UserCheck, UserX } from 'lucide-react'

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Sample data - sẽ thay bằng API
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0901234567',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      role: 'customer',
      status: 'active',
      totalOrders: 12,
      totalSpent: 85000000,
      joinDate: '2024-01-15',
      avatar: ''
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0912345678',
      address: '456 Đường XYZ, Quận 2, TP.HCM',
      role: 'customer',
      status: 'active',
      totalOrders: 8,
      totalSpent: 45000000,
      joinDate: '2024-02-20',
      avatar: ''
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@email.com',
      phone: '0923456789',
      address: '789 Đường DEF, Quận 3, TP.HCM',
      role: 'customer',
      status: 'active',
      totalOrders: 25,
      totalSpent: 125000000,
      joinDate: '2023-11-10',
      avatar: ''
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      email: 'phamthid@email.com',
      phone: '0934567890',
      address: '321 Đường GHI, Quận 4, TP.HCM',
      role: 'customer',
      status: 'inactive',
      totalOrders: 3,
      totalSpent: 15000000,
      joinDate: '2024-03-05',
      avatar: ''
    },
    {
      id: 5,
      name: 'Admin User',
      email: 'admin@estore.com',
      phone: '0945678901',
      address: 'Văn phòng chính',
      role: 'admin',
      status: 'active',
      totalOrders: 0,
      totalSpent: 0,
      joinDate: '2023-01-01',
      avatar: ''
    },
  ])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return (
        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center gap-1 w-fit">
          <UserCheck size={12} />
          Hoạt động
        </span>
      )
    }
    return (
      <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800 flex items-center gap-1 w-fit">
        <UserX size={12} />
        Không hoạt động
      </span>
    )
  }

  const getRoleBadge = (role: string) => {
    if (role === 'admin') {
      return <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Quản trị viên</span>
    }
    return <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Khách hàng</span>
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter(u => u.id !== id))
    }
  }

  const handleToggleStatus = (id: number) => {
    setUsers(users.map(u => 
      u.id === id 
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
        : u
    ))
  }

  const totalCustomers = users.filter(u => u.role === 'customer').length
  const activeCustomers = users.filter(u => u.role === 'customer' && u.status === 'active').length
  const totalRevenue = users.reduce((sum, u) => sum + u.totalSpent, 0)
  const avgOrderValue = totalRevenue / users.reduce((sum, u) => sum + u.totalOrders, 0) || 0

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-black">Quản lý người dùng</h1>
          <p className="text-gray-600">Tổng số: {users.length} người dùng</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
          <Plus size={20} />
          Thêm người dùng
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Tổng khách hàng</p>
            <div className="bg-blue-100 p-2 rounded">
              <UserCheck className="text-blue-600" size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-blue-600">{totalCustomers}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Đang hoạt động</p>
            <div className="bg-green-100 p-2 rounded">
              <UserCheck className="text-green-600" size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-green-600">{activeCustomers}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Tổng doanh thu</p>
            <div className="bg-purple-100 p-2 rounded">
              <Mail className="text-purple-600" size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-purple-600">{formatPrice(totalRevenue)}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Giá trị TB/đơn</p>
            <div className="bg-orange-100 p-2 rounded">
              <Filter className="text-orange-600" size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-orange-600">{formatPrice(avgOrderValue)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-blue-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-blue-300 bg-blue-50 rounded-lg focus:outline-none focus:border-blue-500 text-black placeholder-gray-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-blue-100 text-gray-700 focus:outline-none focus:border-blue-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Không hoạt động</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người dùng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Liên hệ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng chi tiêu
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
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    Không tìm thấy người dùng nào
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Tham gia: {formatDate(user.joinDate)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <Mail size={14} className="text-gray-400" />
                          <span className="text-gray-900">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <Phone size={14} className="text-gray-400" />
                          <span className="text-gray-600">{user.phone}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 text-xs">{user.address}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-sm font-semibold text-gray-900">
                        {user.totalOrders}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-blue-600">
                        {formatPrice(user.totalSpent)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className={`${
                            user.status === 'active' 
                              ? 'text-orange-600 hover:text-orange-800' 
                              : 'text-green-600 hover:text-green-800'
                          } transition`}
                          title={user.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                        >
                          {user.status === 'active' ? <UserX size={18} /> : <UserCheck size={18} />}
                        </button>
                        <button
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="Chỉnh sửa"
                        >
                          <Edit2 size={18} />
                        </button>
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-800 transition"
                            title="Xóa"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
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
            Hiển thị <span className="font-medium">{filteredUsers.length}</span> trên{' '}
            <span className="font-medium">{users.length}</span> người dùng
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
    </div>
  )
}