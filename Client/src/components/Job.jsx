import React from 'react'
import { Bookmark, MapPin, Clock, TrendingUp } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Job = ({ job }) => {
    const navigate = useNavigate()

    const daysAgo = (mongodbTime) => {
        const diff = new Date() - new Date(mongodbTime)
        const days = Math.floor(diff / (1000 * 3600 * 24))
        return days === 0 ? "Today" : `${days}d ago`
    }

    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className='relative flex flex-col h-full p-5 rounded-2xl cursor-pointer group'
            style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(229,32,42,0.3)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(229,32,42,0.12), 0 0 0 1px rgba(229,32,42,0.15)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
            }}
        >
            {/* Top Row */}
            <div className='flex items-center justify-between mb-4'>
                <span className='text-xs text-[#8888aa] flex items-center gap-1'>
                    <Clock className='w-3 h-3' />
                    {daysAgo(job?.createdAt)}
                </span>
                <button
                    className='w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200'
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(229,32,42,0.1)'
                        e.currentTarget.style.borderColor = 'rgba(229,32,42,0.3)'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    }}
                >
                    <Bookmark className='w-3.5 h-3.5 text-[#8888aa]' />
                </button>
            </div>

            {/* Company Info */}
            <div className='flex items-center gap-3 mb-4'>
                <div className='w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center shrink-0'
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <AvatarImage
                        src={job?.company?.logo || "https://ui-avatars.com/api/?name=" + job?.company?.companyName + "&background=e5202a&color=fff&size=48"}
                        alt="company"
                        className='w-full h-full object-cover'
                    />
                </div>
                <div>
                    <h3 className='text-white font-semibold text-sm'>{job?.company?.companyName}</h3>
                    <div className='flex items-center gap-1 mt-0.5'>
                        <MapPin className='w-3 h-3 text-[#8888aa]' />
                        <span className='text-xs text-[#8888aa]'>{job?.location || 'US'}</span>
                    </div>
                </div>
            </div>

            {/* Job Title */}
            <h2 className='text-white font-bold text-base mb-2 leading-snug'>{job?.title}</h2>
            <p className='text-[#8888aa] text-xs mb-4 leading-relaxed line-clamp-2'>{job?.description}</p>

            {/* Badges */}
            <div className='flex flex-wrap items-center gap-2 mb-5'>
                <span className='px-2.5 py-1 rounded-full text-xs font-medium badge-blue'>
                    {job?.position} positions
                </span>
                <span className='px-2.5 py-1 rounded-full text-xs font-medium badge-red'>
                    {job?.jobType}
                </span>
                <span className='px-2.5 py-1 rounded-full text-xs font-medium badge-purple'>
                    ${job?.salary} USD
                </span>
            </div>

            {/* Actions */}
            <div className='flex items-center gap-3 mt-auto'>
                <button
                    onClick={() => navigate(`/description/${job._id}`)}
                    className='flex-1 py-2.5 rounded-xl text-sm font-medium btn-red cursor-pointer'
                >
                    View Details
                </button>
                <button
                    className='py-2.5 px-4 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 text-[#c8c8d8]'
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                    Save
                </button>
            </div>
        </motion.div>
    )
}

export default Job
