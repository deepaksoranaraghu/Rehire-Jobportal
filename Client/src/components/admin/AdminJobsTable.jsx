import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Eye, MoreHorizontal, Briefcase } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
    const navigate = useNavigate()
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)

    useEffect(() => {
        const filtered = allAdminJobs.filter(job =>
            !searchJobByText ||
            job?.company?.companyName?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
            job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
        )
        setFilterJobs(filtered)
    }, [allAdminJobs, searchJobByText])

    if (!filterJobs || filterJobs.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center py-20'>
                <div className='w-14 h-14 rounded-2xl flex items-center justify-center mb-4'
                    style={{ background: 'rgba(229,32,42,0.08)', border: '1px solid rgba(229,32,42,0.15)' }}>
                    <Briefcase className='w-6 h-6 text-[#ff4757]' />
                </div>
                <p className='text-white font-medium'>No jobs posted yet</p>
                <p className='text-[#8888aa] text-sm mt-1'>Post your first job to start receiving applicants</p>
            </div>
        )
    }

    return (
        <div className='overflow-x-auto rounded-xl' style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <table className='table-glass'>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Role</th>
                        <th>Date</th>
                        <th className='text-right'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filterJobs.map((job, i) => (
                        <motion.tr
                            key={job._id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                        >
                            <td><span className='text-[#8888aa]'>{job?.company?.companyName}</span></td>
                            <td><span className='font-medium text-white'>{job?.title}</span></td>
                            <td><span className='text-[#8888aa]'>{job?.createdAt.split("T")[0]}</span></td>
                            <td className='text-right'>
                                <Popover>
                                    <PopoverTrigger className='cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors'>
                                        <MoreHorizontal className='w-4 h-4 text-[#8888aa]' />
                                    </PopoverTrigger>
                                    <PopoverContent className='w-40 p-2'
                                        style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                                        <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                            className='flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors'>
                                            <Eye className='w-3.5 h-3.5 text-[#8888aa]' />
                                            <span className='text-sm text-[#c8c8d8]'>Applicants</span>
                                        </div>
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

export default AdminJobsTable
