import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { useNavigate } from 'react-router-dom'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { setSingleCompany } from '@/redux/companySlice'
import axios from 'axios'
import { Building2, ArrowLeft, Loader2 } from 'lucide-react'
import Footer from '../shared/Footer'

const CompanyCreate = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [companyName, setCompanyName] = useState("")
    const [loading, setLoading] = useState(false)

    const registerNewCompany = async () => {
        if (!companyName.trim()) return toast.error("Company name is required")
        setLoading(true)
        try {
            const response = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            if (response.data.success) {
                dispatch(setSingleCompany(response.data.company))
                toast.success(response.data.message)
                navigate(`/admin/companies/${response.data.company._id}`)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to create company')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='page-bg min-h-screen'>
            <Navbar />
            <div className='max-w-xl mx-auto px-4 sm:px-[5%] py-16'>
                <button
                    onClick={() => navigate("/admin/companies")}
                    className='flex items-center gap-2 text-[#8888aa] hover:text-white transition-colors mb-8 cursor-pointer text-sm'
                >
                    <ArrowLeft className='w-4 h-4' />
                    Back to Companies
                </button>

                <div className='p-8 rounded-2xl'
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(20px)' }}>
                    <div className='flex items-center gap-3 mb-6'>
                        <div className='w-10 h-10 rounded-xl flex items-center justify-center'
                            style={{ background: 'rgba(229,32,42,0.12)', border: '1px solid rgba(229,32,42,0.2)' }}>
                            <Building2 className='w-5 h-5 text-[#ff4757]' />
                        </div>
                        <div>
                            <h1 className='text-xl font-bold text-white'>Register Company</h1>
                            <p className='text-[#8888aa] text-sm'>You can update this later</p>
                        </div>
                    </div>

                    <div className='mb-6'>
                        <Label className='text-[#c8c8d8] text-sm mb-2 block'>Company Name</Label>
                        <input
                            type="text"
                            placeholder="Jobhunt, Microsoft, etc."
                            onChange={(e) => setCompanyName(e.target.value)}
                            className='w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200'
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                            onFocus={e => {
                                e.target.style.borderColor = 'rgba(229,32,42,0.4)'
                                e.target.style.boxShadow = '0 0 0 2px rgba(229,32,42,0.1)'
                            }}
                            onBlur={e => {
                                e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                                e.target.style.boxShadow = 'none'
                            }}
                        />
                    </div>

                    <div className='flex gap-3'>
                        <button
                            onClick={() => navigate("/admin/companies")}
                            className='flex-1 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 text-[#c8c8d8]'
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={registerNewCompany}
                            disabled={loading}
                            className='flex-1 py-2.5 rounded-xl text-sm font-semibold btn-red cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60'
                        >
                            {loading ? <><Loader2 className='w-4 h-4 animate-spin' /> Creating...</> : 'Continue →'}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CompanyCreate
