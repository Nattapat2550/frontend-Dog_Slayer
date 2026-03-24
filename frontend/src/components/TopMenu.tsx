"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function TopMenu() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md shadow-sm border-b z-50 flex items-center justify-between px-4 md:px-12 transition-all">
        {/* Logo และ ชื่อแบรนด์ */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-orange-600 tracking-tight">
          <Image 
            src="/img/logo.png" 
            alt="DogSlayer Logo" 
            width={32} 
            height={32} 
            className="w-8 h-8 object-contain drop-shadow-sm" 
          />a
          <div>Dog<span className="text-gray-800">Slayer</span></div>
        </Link>
        
        {/* Hamburger Icon สำหรับจอมือถือ */}
        <button 
          className="md:hidden text-gray-600 hover:text-orange-600 focus:outline-none p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* เมนูสำหรับจอ Desktop */}
        <div className="hidden md:flex gap-4 md:gap-8 items-center font-medium">
          <Link href="/restaurant" className="text-gray-600 hover:text-orange-600 transition">Restaurants</Link>
          
          {session ? (
            <>
              {session.user.role === "admin" ? (
                <Link href="/admin/manage" className="text-gray-600 hover:text-orange-600">Admin Panel</Link>
              ) : (
                <Link href="/mybookings" className="text-gray-600 hover:text-orange-600">My Bookings</Link>
              )}
              <button 
                onClick={() => signOut({ callbackUrl: '/' })} 
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-red-50 hover:text-red-600 transition text-sm font-semibold"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-orange-600 transition">Log In</Link>
              <Link href="/register" className="bg-orange-600 text-white px-5 py-2 rounded-full hover:bg-orange-700 transition shadow-md shadow-orange-500/30">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* เมนู Dropdown สำหรับจอมือถือ */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 bg-white border-b shadow-lg z-40 md:hidden flex flex-col p-4 gap-3 font-medium animate-fade-in-down">
          {/* จัด Restaurants ให้อยู่กึ่งกลาง */}
          <Link href="/venue" className="text-center text-gray-600 hover:text-orange-600 py-2 rounded-xl hover:bg-gray-50 transition" onClick={() => setIsMobileMenuOpen(false)}>
            Restaurants
          </Link>
          
          {session ? (
            <>
              {session.user.role === "admin" ? (
                <Link href="/admin/manage" className="text-center text-gray-600 hover:text-orange-600 py-2 rounded-xl hover:bg-gray-50 transition" onClick={() => setIsMobileMenuOpen(false)}>Admin Panel</Link>
              ) : (
                <Link href="/mybooking" className="text-center text-gray-600 hover:text-orange-600 py-2 rounded-xl hover:bg-gray-50 transition" onClick={() => setIsMobileMenuOpen(false)}>My Bookings</Link>
              )}
              <div className="pt-2 border-t mt-1">
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut({ callbackUrl: '/' });
                  }} 
                  className="w-full text-center bg-red-50 text-red-600 px-4 py-3 rounded-xl hover:bg-red-100 transition font-semibold"
                >
                  Log Out
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t mt-1">
              <Link href="/login" className="text-center bg-gray-50 text-gray-700 px-5 py-3 rounded-xl hover:bg-gray-100 transition" onClick={() => setIsMobileMenuOpen(false)}>Log In</Link>
              <Link href="/register" className="text-center bg-orange-600 text-white px-5 py-3 rounded-xl hover:bg-orange-700 transition shadow-md" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}