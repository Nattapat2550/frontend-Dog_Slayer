"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", tel: "", role: "user" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ตรวจสอบข้อมูลอย่างละเอียดและแจ้งเตือนให้ชัดเจน
    if (!formData.name) return setError("กรุณากรอกชื่อ-นามสกุลของคุณ");
    if (!formData.email) return setError("กรุณากรอกอีเมลที่สามารถใช้งานได้");
    if (!formData.tel) return setError("กรุณากรอกเบอร์โทรศัพท์สำหรับติดต่อ");
    if (!formData.password) return setError("กรุณากำหนดรหัสผ่านของคุณ");
    if (formData.password.length < 6) return setError("รหัสผ่านสั้นเกินไป (ต้องมีความยาวอย่างน้อย 6 ตัวอักษร)");
    
    setLoading(true);
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
    
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess("🎉 สมัครสมาชิกสำเร็จ! ระบบกำลังพาท่านไปหน้าเข้าสู่ระบบ...");
        setTimeout(() => {
            router.push("/login");
        }, 1500);
      } else {
        const data = await res.json();
        setError(data.message || "การสมัครสมาชิกขัดข้อง กรุณาลองใหม่อีกครั้ง");
        setLoading(false);
      }
    } catch { 
      setError("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ในขณะนี้"); 
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen p-4 sm:p-8 bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-3xl shadow-lg border border-gray-100 w-full max-w-md flex flex-col gap-4 sm:gap-6 transition-all">
        <div className="text-center mb-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">สร้างบัญชีใหม่</h1>
            <p className="text-gray-500 mt-2 text-sm">เข้าร่วมกับเราเพื่อเริ่มการจองได้ทันที</p>
        </div>

        {/* กล่องแจ้งเตือน Error */}
        {error && (
            <div className="flex items-start gap-2 text-red-700 bg-red-50 p-4 rounded-xl text-sm border border-red-200">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                <p className="font-medium leading-relaxed">{error}</p>
            </div>
        )}

        {/* กล่องแจ้งเตือน Success */}
        {success && (
            <div className="flex items-center gap-2 text-green-700 bg-green-50 p-4 rounded-xl text-sm border border-green-200">
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <p className="font-medium">{success}</p>
            </div>
        )}
        
        <div className="flex flex-col gap-3">
            <input type="text" placeholder="Full Name" 
              className="w-full p-3 sm:p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm sm:text-base" 
              onChange={e => setFormData({...formData, name: e.target.value})} />
            <input type="email" placeholder="Email Address" 
              className="w-full p-3 sm:p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm sm:text-base" 
              onChange={e => setFormData({...formData, email: e.target.value})} />
            <input type="tel" placeholder="Phone Number" 
              className="w-full p-3 sm:p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm sm:text-base" 
              onChange={e => setFormData({...formData, tel: e.target.value})} />
            <input type="password" placeholder="Password (min 6 chars)" 
              className="w-full p-3 sm:p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm sm:text-base" 
              onChange={e => setFormData({...formData, password: e.target.value})} />
        </div>

        <button type="submit" disabled={loading || !!success} 
          className="w-full bg-blue-600 text-white p-3 sm:p-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed mt-1">
            {loading ? "Waiting..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-2">
            Already have an account? <Link href="/login" className="text-blue-600 font-semibold hover:underline">Log in here</Link>
        </p>
      </form>
    </main>
  );
}