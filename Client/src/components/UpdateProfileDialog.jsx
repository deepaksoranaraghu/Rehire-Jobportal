import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(store => store.auth)
    const [fileName, setFileName] = useState('')

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: user?.profile?.resume || "",
    })

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })
    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
        setFileName(file?.name || '')
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('fullname', input.fullname)
            formData.append('email', input.email)
            formData.append('phoneNumber', input.phoneNumber)
            formData.append('bio', input.bio)
            formData.append('skills', input.skills)
            if (input.file) formData.append('file', input.file)

            const response = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            })
            if (response.data.success) {
                dispatch(setUser(response.data.user))
                toast.success("Profile updated successfully")
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Update failed')
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    const fields = [
        { id: 'fullname', label: 'Name', type: 'text', placeholder: 'Your full name' },
        { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
        { id: 'phoneNumber', label: 'Phone', type: 'text', placeholder: '+1 555 000 0000' },
        { id: 'bio', label: 'Bio', type: 'text', placeholder: 'Short bio...' },
        { id: 'skills', label: 'Skills', type: 'text', placeholder: 'React, Node.js, Python...' },
    ]

    return (
        <Dialog open={open}>
            <DialogContent
                onInteractOutside={() => setOpen(false)}
                className='p-0 overflow-hidden'
                style={{
                    background: '#1a1a2e',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    color: '#f0f0f8',
                }}
            >
                <DialogHeader className='px-6 pt-6 pb-4' style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <DialogTitle className='text-white text-lg font-semibold'>Update Profile</DialogTitle>
                </DialogHeader>

                <form onSubmit={submitHandler}>
                    <div className='px-6 py-5 space-y-4'>
                        {fields.map(({ id, label, type, placeholder }) => (
                            <div key={id} className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor={id} className='text-right text-[#8888aa] text-sm'>{label}</Label>
                                <input
                                    id={id}
                                    name={id}
                                    type={type}
                                    value={input[id]}
                                    onChange={changeEventHandler}
                                    placeholder={placeholder}
                                    className='col-span-3 px-3 py-2 rounded-lg text-sm text-white outline-none transition-all duration-200'
                                    style={{
                                        background: 'rgba(255,255,255,0.06)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                    }}
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
                        ))}
                        {/* File */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className='text-right text-[#8888aa] text-sm'>Resume</Label>
                            <label className='col-span-3 flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer'
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.15)' }}>
                                <span className='text-xs text-[#8888aa]'>{fileName || 'Upload PDF...'}</span>
                                <input type="file" accept="application/pdf" onChange={fileChangeHandler} className='hidden' />
                            </label>
                        </div>
                    </div>

                    <DialogFooter className='px-6 pb-6 pt-4' style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        <button
                            type="submit"
                            disabled={loading}
                            className='w-full py-2.5 rounded-xl font-semibold text-sm btn-red flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60'
                        >
                            {loading ? <><Loader2 className='w-4 h-4 animate-spin' /> Saving...</> : 'Save Changes'}
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog
