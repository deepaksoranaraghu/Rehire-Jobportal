import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Loader2, ArrowLeft, PlusCircle, AlertCircle } from 'lucide-react'
import Footer from '../shared/Footer'

const PostJob = () => {
    const { companies } = useSelector(store => store.company)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        title: "", description: "", requirements: "",
        salary: "", location: "", experience: "",
        jobType: "", position: 0, companyId: "",
    })

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(c => c.companyName.toLowerCase() === value.toLowerCase())
        setInput({ ...input, companyId: selectedCompany._id })
    }
    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })

    const postNewJob = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            })
            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/admin/jobs")
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to post job')
        } finally {
            setLoading(false)
        }
    }

    const inputStyle = {
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '10px',
        color: 'white',
        padding: '10px 14px',
        fontSize: '14px',
        outline: 'none',
        width: '100%',
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
        { name: 'title', label: 'Job Title', type: 'text', placeholder: 'e.g. Senior Frontend Developer' },
        { name: 'description', label: 'Description', type: 'text', placeholder: 'Brief job description...' },
        { name: 'requirements', label: 'Requirements', type: 'text', placeholder: 'React, Node.js, ... (comma separated)' },
        { name: 'salary', label: 'Salary (USD)', type: 'number', placeholder: 'e.g. 100000' },
        { name: 'location', label: 'Location', type: 'text', placeholder: 'e.g. New York, Remote' },
        { name: 'jobType', label: 'Job Type', type: 'text', placeholder: 'Full Time / Part Time' },
        { name: 'experience', label: 'Experience (years)', type: 'number', placeholder: 'e.g. 2' },
        { name: 'position', label: 'Openings', type: 'number', placeholder: 'e.g. 3' },
    ]

    return (
        <div className='page-bg min-h-screen'>
            <Navbar />
            <div className='max-w-2xl mx-auto px-4 sm:px-[5%] py-10'>
                <button
                    onClick={() => navigate("/admin/jobs")}
                    className='flex items-center gap-2 text-[#8888aa] hover:text-white transition-colors mb-8 cursor-pointer text-sm'
                >
                    <ArrowLeft className='w-4 h-4' />
                    Back to Jobs
                </button>

                <div className='flex items-center gap-3 mb-8'>
                    <div className='w-10 h-10 rounded-xl flex items-center justify-center'
                        style={{ background: 'rgba(229,32,42,0.12)', border: '1px solid rgba(229,32,42,0.2)' }}>
                        <PlusCircle className='w-5 h-5 text-[#ff4757]' />
                    </div>
                    <div>
                        <h1 className='text-2xl font-bold text-white'>Post a New Job</h1>
                        <p className='text-[#8888aa] text-sm'>Fill in the details to attract top talent</p>
                    </div>
                </div>

                <div className='p-8 rounded-2xl'
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
                    <form onSubmit={postNewJob}>
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

                            {/* Company Select */}
                            {companies.length > 0 && (
                                <div className='sm:col-span-2'>
                                    <Label className='text-[#c8c8d8] text-sm mb-2 block'>Company</Label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger
                                            className='w-full text-[#c8c8d8]'
                                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', height: '42px' }}>
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            <SelectGroup>
                                                {companies.map(company => (
                                                    <SelectItem key={company._id} value={company.companyName}
                                                        className='text-[#c8c8d8] hover:text-white'>
                                                        {company.companyName}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        {companies.length === 0 && (
                            <div className='flex items-center gap-3 p-4 rounded-xl mb-5'
                                style={{ background: 'rgba(229,32,42,0.08)', border: '1px solid rgba(229,32,42,0.2)' }}>
                                <AlertCircle className='w-4 h-4 text-[#ff4757] shrink-0' />
                                <p className='text-sm text-[#ff6b75]'>
                                    Please{' '}
                                    <span
                                        className='font-semibold cursor-pointer underline'
                                        onClick={() => navigate("/admin/companies/create")}
                                    >
                                        register a company
                                    </span>{' '}
                                    first before posting a job.
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || companies.length === 0}
                            className='w-full py-3 rounded-xl font-semibold text-sm btn-red flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50'
                        >
                            {loading ? <><Loader2 className='w-4 h-4 animate-spin' /> Posting...</> : 'Post Job →'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PostJob
