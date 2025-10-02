import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Về chúng tôi */}
          <div>
            <h3 className="font-bold text-lg mb-4">E-Store</h3>
            <p className="text-gray-400 mb-4">
              Cửa hàng thương mại điện tử hàng đầu Việt Nam, cung cấp sản phẩm chất lượng với giá tốt nhất.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-pink-400 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-blue-300 transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h3 className="font-bold text-lg mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Chính sách */}
          <div>
            <h3 className="font-bold text-lg mb-4">Chính sách</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Chính sách vận chuyển
                </Link>
              </li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="font-bold text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <span>1900 xxxx</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <span>support@estore.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 E-Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}