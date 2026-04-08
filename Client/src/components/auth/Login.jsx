import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Zap, Mail, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, user } = useSelector(store => store.auth)

  const [input, setInput] = useState({ email: "", password: "", role: "" })

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Login failed')
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => { if (user) navigate('/') }, [])

  return (
    <div className='min-h-screen page-bg flex items-center justify-center px-4 relative overflow-hidden'>
      {/* Background glow orbs */}
      <div className='hero-glow w-96 h-96 -top-32 -left-32'
        style={{ background: 'radial-gradient(circle, rgba(229,32,42,0.4), transparent)' }} />
      <div className='hero-glow w-80 h-80 -bottom-20 -right-20'
        style={{ background: 'radial-gradient(circle, rgba(229,32,42,0.2), transparent)' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md relative z-10'
      >
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center gap-2 mb-4'>
            <div className='w-9 h-9 rounded-xl flex items-center justify-center'
              style={{ background: 'linear-gradient(135deg, #e5202a, #ff4757)' }}>
              <Zap className='w-5 h-5 text-white' fill='white' />
            </div>
            <span className='text-2xl font-bold text-white'>
              Red<span className='gradient-text'>Hire</span>
            </span>
          </div>
          <h2 className='text-2xl font-bold text-white'>Welcome back</h2>
          <p className='text-[#8888aa] text-sm mt-1'>Sign in to your account to continue</p>
        </div>

        {/* Card */}
        <div className='glass-card p-8 rounded-2xl' style={{ background: 'rgba(255,255,255,0.05)' }}>
          <form onSubmit={submitHandler} className='space-y-5'>
            {/* Email */}
            <div>
              <Label className='text-[#c8c8d8] text-sm mb-1.5 block'>Email address</Label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8888aa]' />
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="john.doe@gmail.com"
                  className='w-full pl-10 pr-4 py-2.5 rounded-lg text-sm text-white input-glass'
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label className='text-[#c8c8d8] text-sm mb-1.5 block'>Password</Label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8888aa]' />
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  className='w-full pl-10 pr-4 py-2.5 rounded-lg text-sm text-white input-glass'
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <Label className='text-[#c8c8d8] text-sm mb-3 block'>I am a</Label>
              <div className='grid grid-cols-2 gap-3'>
                {['student', 'recruiter'].map(role => (
                  <label key={role}
                    className='flex items-center justify-center gap-2 p-3 rounded-lg cursor-pointer border transition-all duration-200'
                    style={{
                      background: input.role === role ? 'rgba(229,32,42,0.12)' : 'rgba(255,255,255,0.04)',
                      border: input.role === role ? '1px solid rgba(229,32,42,0.4)' : '1px solid rgba(255,255,255,0.08)',
                    }}>
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={input.role === role}
                      onChange={changeEventHandler}
                      className='sr-only'
                    />
                    <span className='capitalize text-sm font-medium'
                      style={{ color: input.role === role ? '#ff4757' : '#8888aa' }}>
                      {role === 'student' ? '🎓 Student' : '🏢 Recruiter'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className='w-full py-3 rounded-lg font-semibold text-sm btn-red flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-60'
            >
              {loading ? <><Loader2 className='w-4 h-4 animate-spin' /> Signing in...</> : 'Sign In →'}
            </button>

            <p className='text-center text-sm text-[#8888aa]'>
              Don't have an account?{' '}
              <Link to="/signup" className='text-[#ff4757] hover:text-[#ff6b75] font-medium transition-colors'>
                Create one
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
