import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Briefcase, Clock } from 'lucide-react'

const statusStyles = {
    pending: { class: 'badge-yellow', label: 'Pending' },
    accepted: { class: 'badge-green', label: 'Accepted' },
    rejected: { class: 'badge-red', label: 'Rejected' },
}

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job)

    if (!allAppliedJobs || allAppliedJobs.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center py-16'>
                <div className='w-14 h-14 rounded-2xl flex items-center justify-center mb-4'
                    style={{ background: 'rgba(229,32,42,0.08)', border: '1px solid rgba(229,32,42,0.15)' }}>
                    <Briefcase className='w-6 h-6 text-[#ff4757]' />
                </div>
                <p className='text-[#8888aa] text-sm'>You haven't applied to any jobs yet.</p>
            </div>
        )
    }

    return (
        <div className='overflow-x-auto rounded-xl' style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <table className='table-glass'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Job Role</th>
                        <th>Company</th>
                        <th className='text-right'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {allAppliedJobs.map((item, index) => {
                        const st = statusStyles[item.status] || statusStyles.pending
                        return (
                            <motion.tr
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <td>
                                    <div className='flex items-center gap-2'>
                                        <Clock className='w-3.5 h-3.5 text-[#8888aa]' />
                                        <span className='text-[#8888aa] text-sm'>{item?.createdAt.split("T")[0]}</span>
                                    </div>
                                </td>
                                <td><span className='font-medium'>{item?.job?.title}</span></td>
                                <td><span className='text-[#8888aa]'>{item?.job?.company?.companyName}</span></td>
                                <td className='text-right'>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${st.class}`}>
                                        {st.label}
                                    </span>
                                </td>
                            </motion.tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AppliedJobTable
