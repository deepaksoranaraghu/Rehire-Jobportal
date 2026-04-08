import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal, CheckCircle, XCircle, FileText, Users } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICANT_API_END_POINT } from '@/utils/constant'
import { motion } from 'framer-motion'

const shortListingStatus = ["Accepted", "Rejected"]

const JobApplicantsTable = () => {
    const { allApplicants } = useSelector(store => store.application)

    const statusHandler = async (status, id) => {
        try {
            const response = await axios.post(`${APPLICANT_API_END_POINT}/status/${id}/update`,
                { status }, { withCredentials: true })
            if (response.data.success) toast.success(response.data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to update status')
        }
    }

    const applications = allApplicants?.applications || []

    if (applications.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center py-20'>
                <div className='w-14 h-14 rounded-2xl flex items-center justify-center mb-4'
                    style={{ background: 'rgba(229,32,42,0.08)', border: '1px solid rgba(229,32,42,0.15)' }}>
                    <Users className='w-6 h-6 text-[#ff4757]' />
                </div>
                <p className='text-white font-medium'>No applicants yet</p>
                <p className='text-[#8888aa] text-sm mt-1'>Applications will appear here when candidates apply</p>
            </div>
        )
    }

    return (
        <div className='overflow-x-auto rounded-xl' style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <table className='table-glass'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Resume</th>
                        <th>Applied</th>
                        <th className='text-right'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((item, i) => (
                        <motion.tr
                            key={item._id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                        >
                            <td><span className='font-medium text-white'>{item?.applicant?.fullname}</span></td>
                            <td><span className='text-[#8888aa]'>{item?.applicant?.email}</span></td>
                            <td><span className='text-[#8888aa]'>{item?.applicant?.phoneNumber || 'N/A'}</span></td>
                            <td>
                                {item?.applicant?.profile?.resume ? (
                                    <a
                                        href={item.applicant.profile.resume}
                                        target='_blank'
                                        rel='noreferrer'
                                        className='flex items-center gap-1.5 text-[#ff4757] hover:text-[#ff6b75] transition-colors text-sm'
                                    >
                                        <FileText className='w-3.5 h-3.5' />
                                        View
                                    </a>
                                ) : <span className='text-[#8888aa]'>N/A</span>}
                            </td>
                            <td><span className='text-[#8888aa]'>{item?.createdAt?.split("T")[0]}</span></td>
                            <td className='text-right'>
                                <Popover>
                                    <PopoverTrigger className='cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors'>
                                        <MoreHorizontal className='w-4 h-4 text-[#8888aa]' />
                                    </PopoverTrigger>
                                    <PopoverContent className='w-40 p-2'
                                        style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                                        {shortListingStatus.map((status, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => statusHandler(status, item._id)}
                                                className='flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors'
                                            >
                                                {status === 'Accepted'
                                                    ? <CheckCircle className='w-3.5 h-3.5 text-green-400' />
                                                    : <XCircle className='w-3.5 h-3.5 text-red-400' />
                                                }
                                                <span className='text-sm text-[#c8c8d8]'>{status}</span>
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default JobApplicantsTable
