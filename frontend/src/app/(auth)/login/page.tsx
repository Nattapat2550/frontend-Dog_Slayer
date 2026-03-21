"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) return setError("กรุณากรอกอีเมลของคุณ");
    if (!password) return setError("กรุณากรอกรหัสผ่านของคุณ");

    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    
    if (res?.error) {
        setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
        setLoading(false);
    } else { 
        setSuccess("🎉 เข้าสู่ระบบสำเร็จ! กำลังพาท่านเข้าสู่หน้าหลัก...");
        setTimeout(() => {
            router.push("/"); 
            router.refresh(); 
        }, 1200);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen p-4 sm:p-8 bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-3xl shadow-lg border border-gray-100 w-full max-w-md flex flex-col gap-4 sm:gap-6 transition-all">
        <div className="text-center mb-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">เข้าสู่ระบบ</h1>
            <p className="text-gray-500 mt-2 text-sm">ยินดีต้อนรับกลับมา! โปรดเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
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
            <input type="email" placeholder="อีเมล (Email Address)" 
              className="w-full p-3 sm:p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm sm:text-base" 
              onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="รหัสผ่าน (Password)" 
              className="w-full p-3 sm:p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm sm:text-base" 
              onChange={e => setPassword(e.target.value)} />
        </div>

        <button type="submit" disabled={loading || !!success} 
          className="w-full bg-gray-900 text-white p-3 sm:p-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed mt-1">
            {loading ? "กำลังดำเนินการ..." : "เข้าสู่ระบบ"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-2">
            ยังไม่มีบัญชีใช่ไหม? <Link href="/register" className="text-blue-600 font-semibold hover:underline">สมัครสมาชิก</Link>
        </p>
      </form>
    </main>
  );
}