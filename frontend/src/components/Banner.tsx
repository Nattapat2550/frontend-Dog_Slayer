'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Banner() {
  const router = useRouter();
  const { data: session } = useSession();
  const [index, setIndex] = useState(0);
  
  // รูปภาพร้านอาหาร (อย่าลืมนำรูปเหล่านี้ไปใส่ในโฟลเดอร์ public/img/)
  const images = [
    '/img/cover1.jpg',
    '/img/cover2.jpg',
    '/img/cover3.jpg',
    '/img/cover4.jpg'
  ];

  return (
    <div 
      className="relative w-full h-[85vh] sm:h-screen cursor-pointer overflow-hidden group" 
      onClick={() => setIndex((index + 1) % images.length)}
    >
      <Image 
        src={images[index]} 
        alt="Restaurant Venue" 
        fill
        className="object-cover transition-opacity duration-700 ease-in-out" 
        priority
      />
      
      {/* Overlay พื้นหลังดำจางๆ เพื่อให้ตัวหนังสืออ่านง่าย */}
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-6 sm:p-12 transition-all duration-300">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-xl tracking-tight">
          Savor the <span className="bg-orange-600 text-white px-2 py-1 rounded">Perfect Moment</span>
        </h1>
        <p className="text-base sm:text-lg md:text-2xl text-gray-100 max-w-2xl drop-shadow-md font-light">
          Discover top-rated restaurants, exquisite menus, and secure your table for an unforgettable dining experience.
        </p>
      </div>

      {/* แสดงชื่อผู้ใช้ถ้า Log in แล้ว (ปรับมุมและขนาดตามจอ) */}
      {session && (
         <div className="absolute top-6 sm:top-8 right-4 sm:right-8 z-30 font-medium text-white bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg text-sm sm:text-base">
           Welcome, {session.user?.name}
         </div>
      )}

      {/* ปุ่ม Call to Action (มือถืออยู่ตรงกลาง, จอใหญ่อยู่ขวาล่าง) */}
      <button 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:bottom-12 sm:right-12 bg-orange-600 text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/30 hover:-translate-y-1 transition-all duration-300 z-30 w-[80%] sm:w-auto text-lg"
        onClick={(e) => {
          e.stopPropagation(); 
          router.push('/venue');
        }}
      >
        Start Reserve
      </button>
    </div>
  );
}