"use client"

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const login = async (data: any) => {
    try {
      const res = await axios.post("/api/user/login", data);
      if (res.status === 200) {
        toast.success("Welcome back!");
        setTimeout(() => router.push("/"), 1200);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#111111]">

      {/* ── Left: Black brand panel ── */}
      <div className="hidden md:flex md:w-2/5 bg-[#0A0A0A] flex-col justify-between p-10">
        {/* Top brand */}
        <div className="flex items-center gap-2.5">
          <img src="/lastlogo.png" className="w-8 h-8 rounded-lg" alt="Scambaiters"
            onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
          <span className="text-white font-bold text-lg">Scambaiters</span>
        </div>

        {/* Collab avatars */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center mb-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVF9XCN-3m0QhFLhp6NOK63wB2hRJXfmBcpg&s"
              className="w-14 h-14 rounded-full border-[3px] border-[#0A0A0A] z-10 relative object-cover"
              alt="You"
            />
            <img
              src="/lastlogo.png"
              className="w-14 h-14 rounded-full border-[3px] border-[#0A0A0A] -ml-4 z-20 relative object-cover"
              alt="Scambaiters"
              onError={(e) => { (e.target as HTMLImageElement).src='https://via.placeholder.com/56/ffffff/000000?text=S'; }}
            />
            <span className="ml-4 text-white/30 text-xs font-semibold uppercase tracking-widest">collab</span>
          </div>
          <h2 className="text-white text-3xl font-bold leading-tight mb-3 !text-white">
            Together we<br />fight scams.
          </h2>
          <p className="text-white/40 text-sm leading-relaxed">
            Join our community of scam fighters protecting people every day.
          </p>

          {/* Pastel accent tags */}
          <div className="flex gap-2 mt-8 flex-wrap">
            {['#FFD6E0','#FFF5CC','#C8F5E0','#CCE8FF'].map((color, i) => (
              <span key={i} className="px-3 py-1 rounded-full text-[11px] font-semibold text-black/60"
                style={{ backgroundColor: color }}>
                {['Awareness','Community','Safety','Action'][i]}
              </span>
            ))}
          </div>
        </div>

        <p className="text-white/20 text-xs">© 2026 Scambaiters</p>
      </div>

      {/* ── Right: White form ── */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-[#111111]">
        <div className="w-full max-w-sm">

          {/* Mobile brand */}
          <div className="flex items-center gap-2 mb-8 md:hidden">
            <img src="/lastlogo.png" className="w-7 h-7 rounded-lg" alt="Scambaiters"
              onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
            <span className="font-bold text-[#0A0A0A]">Scambaiters</span>
          </div>

          <h1 className="text-2xl font-bold text-[#F0F0F0] mb-1 !text-2xl">Sign in</h1>
          <p className="text-white/35 text-sm mb-7">Welcome back — good to see you.</p>

          <form onSubmit={handleSubmit(login)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-white/35 uppercase tracking-wider block mb-1.5">Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full h-11 px-4 bg-[#1A1A1A] border border-white/[0.08] hover:border-white/[0.2] focus:border-white/50 rounded-2xl text-sm text-[#F0F0F0] placeholder-white/20 outline-none transition-all duration-200 font-medium"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">Email is required</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-white/35 uppercase tracking-wider block mb-1.5">Password</label>
              <input
                {...register("password", { required: true })}
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full h-11 px-4 bg-[#1A1A1A] border border-white/[0.08] hover:border-white/[0.2] focus:border-white/50 rounded-2xl text-sm text-[#F0F0F0] placeholder-white/20 outline-none transition-all duration-200 font-medium"
              />
              {errors.password && <p className="text-xs text-red-500 mt-1">Password is required</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-[#0A0A0A] hover:bg-[#333] disabled:opacity-50 text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 mt-2"
            >
              {isSubmitting
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : 'Sign In →'
              }
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-xs text-white/25 font-medium">or</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>

          {/* Google */}
          <button className="w-full h-11 flex items-center justify-center gap-3 bg-[#1A1A1A] border border-white/[0.08] hover:border-white/[0.18] rounded-2xl text-sm font-semibold text-[#F0F0F0] transition-all duration-200">
            <svg className="h-4 w-4" viewBox="-0.5 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd">
                <path d="M9.827 24c0-1.524.253-2.985.705-4.356L2.623 13.604A23.76 23.76 0 00.214 24c0 3.736.868 7.261 2.406 10.388l7.904-6.051A14.17 14.17 0 019.827 24" fill="#FBBC05"/>
                <path d="M23.714 10.133c3.311 0 6.302 1.174 8.652 3.094L39.202 6.4C35.036 2.773 29.695.533 23.714.533 14.427.533 6.445 5.844 2.623 13.604l7.91 6.04c1.822-5.532 7.017-9.511 13.18-9.511" fill="#EB4335"/>
                <path d="M23.714 37.867c-6.165 0-11.36-3.979-13.182-9.511l-7.908 6.038C6.445 42.156 14.427 47.467 23.714 47.467c5.732 0 11.204-2.035 15.311-5.849l-7.507-5.804c-2.118 1.334-4.785 2.053-7.804 2.053" fill="#34A853"/>
                <path d="M46.145 24c0-1.387-.213-2.88-.534-4.267H23.714v9.067h12.602c-.63 3.091-2.346 5.467-4.8 7.014l7.507 5.804C43.339 37.614 46.145 31.649 46.145 24" fill="#4285F4"/>
              </g>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-xs text-white/30 mt-6">
            No account?{' '}
            <button onClick={() => router.push('/Account/signup')}
              className="font-bold text-white hover:underline underline-offset-2 transition-all">
              Sign up free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
