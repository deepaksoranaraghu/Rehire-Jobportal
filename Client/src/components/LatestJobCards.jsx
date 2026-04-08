import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Clock, Bookmark } from 'lucide-react'
import { motion } from 'framer-motion'

function LatestJobCards({ job }) {
  const navigate = useNavigate()

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      onClick={() => navigate(`/description/${job._id}`)}
      className='p-5 rounded-2xl cursor-pointer'
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(229,32,42,0.3)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(229,32,42,0.1)'
        e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
      }}
    >
      <div className='flex items-start justify-between mb-3'>
        <div>
          <h3 className='font-semibold text-white text-sm'>{job?.company?.companyName}</h3>
          <div className='flex items-center gap-1 mt-1'>
            <MapPin className='w-3 h-3 text-[#8888aa]' />
            <p className='text-xs text-[#8888aa]'>US</p>
          </div>
        </div>
        <Bookmark className='w-4 h-4 text-[#8888aa] hover:text-[#ff4757] transition-colors cursor-pointer shrink-0' />
      </div>
      <h2 className='font-bold text-white text-base mb-1'>{job?.title}</h2>
      <p className='text-xs text-[#8888aa] mb-3 line-clamp-2 leading-relaxed'>{job?.description}</p>
      <div className='flex items-center gap-2 flex-wrap'>
        <span className='px-2.5 py-1 rounded-full text-xs font-medium badge-blue'>{job?.position} pos</span>
        <span className='px-2.5 py-1 rounded-full text-xs font-medium badge-red'>{job?.jobType}</span>
        <span className='px-2.5 py-1 rounded-full text-xs font-medium badge-purple'>${job?.salary} USD</span>
      </div>
    </motion.div>
  )
}

export default LatestJobCards