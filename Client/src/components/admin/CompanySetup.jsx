import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { ArrowLeft, Loader2, Building2, Globe, MapPin, Image } from 'lucide-react'
import { Label } from '../ui/label'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import Footer from '../shared/Footer'

const CompanySetup = () => {
    const [loading, setLoading] = useState(false)
    const [fileName, setFileName] = useState('')
    const navigate = useNavigate()
    const params = useParams()
    const companyId = params.id
    useGetCompanyById(companyId)
    const { singleCompany } = useSelector(store => store.company)

    const [input, setInput] = useState({
        companyName: "", description: "", website: "", location: "", file: null
    })

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })
    const changeFileHandler = (e) => {
        const f = e.target.files?.[0]
        setInput({ ...input, file: f })
        setFileName(f?.name || '')
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('companyName', input.companyName)
            formData.append('description', input.description)
            formData.append('website', input.website)
            formData.append('location', input.location)
            if (input.file) formData.append('file', input.file)

            const response = await axios.post(`${COMPANY_API_END_POINT}/update/${companyId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            })
            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/admin/companies")
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Update failed')
        } finally { setLoading(false) }
    }

    useEffect(() => {
        setInput({
            companyName: singleCompany?.companyName || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website || "",
            location: singleCompany?.location || "",
            file: singleCompany?.file || null,
        })
    }, [singleCompany, companyId])

    const inputStyle = {
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '10px', color: 'white',
        padding: '10px 14px', fontSize: '14px', outline: 'none', width: '100%',
        transition: 'border-color 0.2s, box-shadow 0.2s',
    }
    const handleFocus = (e) => {
        e.target.style.borderColor = 'rgba(229,32,42,0.4)'
        e.target.style.boxShadow = '0 0 0 2px rgba(229,32,42,0.1)'
    }
    const handleBlur = (e) => {
        e.target.style.borderColor = 'rgba(255,255,255,0.1)'
        e.target.style.boxShadow = 'none'
    }

    const fields = [
        { name: 'companyName', label: 'Company Name', type: 'text', placeholder: 'Your company name', icon: Building2 },
        { name: 'description', label: 'Description', type: 'text', placeholder: 'Brief company description', icon: null },
        { name: 'website', label: 'Website', type: 'url', placeholder: 'https://company.com', icon: Globe },
        { name: 'location', label: 'Location', type: 'text', placeholder: 'City, Country', icon: MapPin },
    ]

    return (
        <div className='page-bg min-h-screen'>
            <Navbar />
            <div className='max-w-2xl mx-auto px-4 sm:px-[5%] py-10'>
                <button
                    onClick={() => navigate("/admin/companies")}
                    className='flex items-center gap-2 text-[#8888aa] hover:text-white transition-colors mb-8 cursor-pointer text-sm'
                >
                    <ArrowLeft className='w-4 h-4' />
                    Back to Companies
                </button>

                <div className='flex items-center gap-3 mb-8'>
                    <div className='w-10 h-10 rounded-xl flex items-center justify-center'
                        style={{ background: 'rgba(229,32,42,0.12)', border: '1px solid rgba(229,32,42,0.2)' }}>
                        <Building2 className='w-5 h-5 text-[#ff4757]' />
                    </div>
                    <div>
                        <h1 className='text-2xl font-bold text-white'>Company Setup</h1>
                        <p className='text-[#8888aa] text-sm'>Update your company information</p>
                    </div>
                </div>

                <div className='p-8 rounded-2xl'
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
                    <form onSubmit={submitHandler}>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5'>
                            {fields.map(({ name, label, type, placeholder }) => (
                                <div key={name}>
                                    <Label className='text-[#c8c8d8] text-sm mb-2 block'>{label}</Label>
                                    <input
                                        type={type}
                                        name={name}
                                        value={input[name]}
                                        onChange={changeEventHandler}
                                        placeholder={placeholder}
                                        style={inputStyle}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                    />
                                </div>
                            ))}

                            {/* Logo upload */}
                            <div className='sm:col-span-2'>
                                <Label className='text-[#c8c8d8] text-sm mb-2 block'>Company Logo</Label>
                                <label className='flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors'
                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.15)' }}>
                                    <Image className='w-4 h-4 text-[#8888aa]' />
                                    <span className='text-sm text-[#8888aa]'>{fileName || 'Upload logo image...'}</span>
                                    <input type="file" accept="image/*" onChange={changeFileHandler} className='hidden' />
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className='w-full py-3 rounded-xl font-semibold text-sm btn-red flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50'
                        >
                            {loading ? <><Loader2 className='w-4 h-4 animate-spin' /> Saving...</> : 'Save Changes →'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CompanySetup
