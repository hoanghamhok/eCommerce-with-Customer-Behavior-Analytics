import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

export default function HomePage() {
  // Sample data - sẽ thay bằng API call thực tế
  const featuredProducts = [
    { id: 1, name: 'iPhone 15 Pro', price: 29000000, image: '' },
    { id: 2, name: 'Samsung Galaxy S24', price: 25000000, image: '' },
    { id: 3, name: 'MacBook Air M2', price: 35000000, image: '' },
    { id: 4, name: 'iPad Pro', price: 28000000, image: '' },
  ]

  return (
    <div className ="bg-white">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Chào mừng đến cửa hàng</h1>
          <p className="text-xl mb-8">Khám phá sản phẩm chất lượng với giá tốt nhất</p>
          <Link 
            href="/products" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-block"
          >
            Xem sản phẩm
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-red-500">Sản phẩm nổi bật</h2>
          <Link href="/products" className="text-blue-600 hover:underline">
            Xem tất cả →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-red-500">Danh mục sản phẩm</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Điện thoại', 'Laptop', 'Tablet', 'Phụ kiện'].map((category) => (
              <Link 
                key={category}
                href="/products"
                className="bg-gray-100 p-8 rounded-lg text-center hover:bg-gray-200 transition"
              >
                <h3 className="font-semibold text-lg text-black">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}