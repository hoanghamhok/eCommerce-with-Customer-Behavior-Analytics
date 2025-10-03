'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User, Menu, Heart } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            E-Store
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-blue-600 transition">
              Trang chủ
            </Link>
            <Link href="/products" className="hover:text-blue-600 transition">
              Sản phẩm
            </Link>
            <Link href="/admin" className="hover:text-blue-600 transition">
              Quản trị
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {/* Icons + Auth */}
          <div className="flex items-center gap-4">
            {/* Wishlist Icon */}
            <Link href="/wishlist" className="hover:text-pink-600 transition relative">
              <Heart size={24} />
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            
            {/* Cart Icon */}
            <Link href="/carts" className="hover:text-blue-600 transition relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

           {/* User Icon */}
            <Link href="/profile/1" className="hover:text-blue-600 transition hidden md:block">
              <User size={24} />
            </Link>

            {/* Đăng nhập & Đăng ký */}
            <Link 
              href="/login" 
              className="hidden lg:block px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              Đăng nhập
            </Link>
            <Link 
              href="/register" 
              className="hidden lg:block px-4 py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-50 transition"
            >
              Đăng ký
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden hover:text-blue-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link href="/" className="hover:text-blue-600 transition">
                Trang chủ
              </Link>
              <Link href="/products" className="hover:text-blue-600 transition">
                Sản phẩm
              </Link>
              <Link href="/admin" className="hover:text-blue-600 transition">
                Quản trị
              </Link>
              <Link 
                href="/login" 
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition text-center"
              >
                Đăng nhập
              </Link>
              <Link 
                href="/register" 
                className="px-4 py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-50 transition text-center"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}