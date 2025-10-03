// lib/data/orders.ts
export type OrderItem = {
  id: string
  productName: string
  productImage: string
  quantity: number
  price: number
  total: number
}

export type Order = {
  id: string
  userId: string
  date: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  shippingAddress: {
    name: string
    phone: string
    address: string
    city: string
  }
  paymentMethod: string
  trackingNumber?: string
  notes?: string
}

export const sampleOrders: Order[] = [
  {
    id: 'ORD001',
    userId: '1',
    date: '2025-10-01',
    status: 'delivered',
    items: [
      {
        id: '1',
        productName: 'iPhone 15 Pro Max 256GB',
        productImage: '/images/iphone15.jpg',
        quantity: 1,
        price: 29000000,
        total: 29000000
      }
    ],
    subtotal: 29000000,
    shipping: 0,
    total: 29000000,
    shippingAddress: {
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      address: '123 Đường ABC',
      city: 'Quận 1, TP.HCM'
    },
    paymentMethod: 'COD',
    trackingNumber: 'VN123456789',
    notes: 'Giao hàng giờ hành chính'
  },
  {
    id: 'ORD002',
    userId: '1',
    date: '2025-09-28',
    status: 'shipped',
    items: [
      {
        id: '2',
        productName: 'Samsung Galaxy S24 Ultra',
        productImage: '/images/samsung-s24.jpg',
        quantity: 1,
        price: 25000000,
        total: 25000000
      },
      {
        id: '3',
        productName: 'Galaxy Buds 2 Pro',
        productImage: '/images/buds2pro.jpg',
        quantity: 1,
        price: 4500000,
        total: 4500000
      }
    ],
    subtotal: 29500000,
    shipping: 0,
    total: 29500000,
    shippingAddress: {
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      address: '123 Đường ABC',
      city: 'Quận 1, TP.HCM'
    },
    paymentMethod: 'Chuyển khoản',
    trackingNumber: 'VN987654321'
  },
  {
    id: 'ORD003',
    userId: '1',
    date: '2025-09-20',
    status: 'delivered',
    items: [
      {
        id: '4',
        productName: 'MacBook Pro 14" M3',
        productImage: '/images/macbook-pro.jpg',
        quantity: 1,
        price: 45000000,
        total: 45000000
      }
    ],
    subtotal: 45000000,
    shipping: 0,
    total: 45000000,
    shippingAddress: {
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      address: '123 Đường ABC',
      city: 'Quận 1, TP.HCM'
    },
    paymentMethod: 'COD',
    trackingNumber: 'VN456789123'
  }
]

// Helper functions
export const getOrderById = (orderId: string): Order | undefined => {
  return sampleOrders.find(order => order.id === orderId)
}

export const getOrdersByUserId = (userId: string): Order[] => {
  return sampleOrders.filter(order => order.userId === userId)
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(price)
}

export const getStatusLabel = (status: Order['status']): string => {
  const labels = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    processing: 'Đang xử lý',
    shipped: 'Đang giao',
    delivered: 'Đã giao',
    cancelled: 'Đã hủy'
  }
  return labels[status]
}

export const getStatusColor = (status: Order['status']): string => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    processing: 'bg-purple-100 text-purple-800',
    shipped: 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return colors[status]
}