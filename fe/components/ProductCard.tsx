import Link from 'next/link'
import { ShoppingCart, Heart } from 'lucide-react'

interface ProductCardProps {
  product?: {
    id: number
    name: string
    price: number
    image?: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  // Default product nếu không truyền vào
  const defaultProduct = {
    id: 1,
    name: 'Tên sản phẩm',
    price: 5000000,
    image: ''
  }

  const prod = product || defaultProduct

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group">
      <Link href={`/products/${prod.id}`}>
        <div className="relative">
          {/* Product Image */}
          <div className="bg-gray-200 h-64 flex items-center justify-center overflow-hidden">
            {prod.image ? (
              <img 
                src={prod.image} 
                alt={prod.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
            ) : (
              <span className="text-gray-500">Hình ảnh sản phẩm</span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
            <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
              <Heart size={18} />
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-black font-bold text-lg mb-2 line-clamp-2 hover:text-blue-600">
            {prod.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <p className="text-blue-600 font-bold text-xl">
              {formatPrice(prod.price)}
            </p>
            
            <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}