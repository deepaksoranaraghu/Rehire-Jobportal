import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2, Zap, Mail, Lock, Phone, User, Upload } from 'lucide-react'
import { motion } from 'framer-motion'

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, user } = useSelector(store => store.auth)
  const [fileName, setFileName] = useState('')

  const [input, setInput] = useState({
    fullname: "", email: "", password: "",
    phoneNumber: "", role: "", file: ""
  })

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0]
    setInput({ ...input, file })
    setFileName(file?.name || '')
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("password", input.password)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("role", input.role)
    if (input.file) formData.append("file", input.file)

    try {
      dispatch(setLoading(true))
      const response = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      if (response.data.success) {
        navigate("/login")
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Registration failed')
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => { if (user) navigate("/") }, [])

  const fields = [
    { name: 'fullname', label: 'Full Name', type: 'text', placeholder: 'John Doe', Icon: User },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', Icon: Mail },
    { name: 'phoneNumber', label: 'Phone Number', type: 'text', placeholder: '+1 (555) 000-0000', Icon: Phone },
    { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••', Icon: Lock },
  ]

  return (
    <div className='min-h-screen page-bg flex items-center justify-center px-4 py-8 relative overflow-hidden'>
      <div className='hero-glow w-96 h-96 -top-32 -right-32'
        style={{ background: 'radial-gradient(circle, rgba(229,32,42,0.3), transparent)' }} />
      <div className='hero-glow w-72 h-72 bottom-0 -left-20'
        style={{ background: 'radial-gradient(circle, rgba(229,32,42,0.2), transparent)' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md relative z-10'
      >
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
          <h2 className='text-2xl font-bold text-white'>Create your account</h2>
          <p className='text-[#8888aa] text-sm mt-1'>Join thousands of professionals on RedHire</p>
        </div>

        <div className='glass-card p-8 rounded-2xl' style={{ background: 'rgba(255,255,255,0.05)' }}>
          <form onSubmit={submitHandler} className='space-y-4'>
            {fields.map(({ name, label, type, placeholder, Icon }) => (
              <div key={name}>
                <Label className='text-[#c8c8d8] text-sm mb-1.5 block'>{label}</Label>
                <div className='relative'>
                  <Icon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8888aa]' />
                  <input
                    type={type}
                    name={name}
                    value={input[name]}
                    onChange={changeEventHandler}
                    placeholder={placeholder}
                    className='w-full pl-10 pr-4 py-2.5 rounded-lg text-sm text-white input-glass'
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>
              </div>
            ))}

            {/* Role */}
            <div>
              <Label className='text-[#c8c8d8] text-sm mb-3 block'>I am a</Label>
              <div className='grid grid-cols-2 gap-3'>
                {['student', 'recruiter'].map(role => (
                  <label key={role}
                    className='flex items-center justify-center gap-2 p-3 rounded-lg cursor-pointer transition-all duration-200'
                    style={{
                      background: input.role === role ? 'rgba(229,32,42,0.12)' : 'rgba(255,255,255,0.04)',
                      border: input.role === role ? '1px solid rgba(229,32,42,0.4)' : '1px solid rgba(255,255,255,0.08)',
                    }}>
                    <input type="radio" name="role" value={role}
                      checked={input.role === role}
                      onChange={changeEventHandler} className='sr-only' />
                    <span className='capitalize text-sm font-medium'
                      style={{ color: input.role === role ? '#ff4757' : '#8888aa' }}>
                      {role === 'student' ? '🎓 Student' : '🏢 Recruiter'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Profile Photo */}
            <div>
              <Label className='text-[#c8c8d8] text-sm mb-1.5 block'>Profile Photo <span className='text-[#8888aa]'>(optional)</span></Label>
              <label className='flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200'
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.15)' }}>
                <Upload className='w-4 h-4 text-[#8888aa]' />
                <span className='text-sm text-[#8888aa]'>{fileName || 'Click to upload photo'}</span>
                <input type="file" accept="image/*" onChange={changeFileHandler} className='hidden' />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className='w-full py-3 rounded-lg font-semibold text-sm btn-red flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-60'
            >
              {loading ? <><Loader2 className='w-4 h-4 animate-spin' /> Creating account...</> : 'Create Account →'}
            </button>

            <p className='text-center text-sm text-[#8888aa]'>
              Already have an account?{' '}
              <Link to="/login" className='text-[#ff4757] hover:text-[#ff6b75] font-medium transition-colors'>
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default Signup
