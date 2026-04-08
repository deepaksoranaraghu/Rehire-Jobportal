import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICANT_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { toast } from 'sonner'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { MapPin, DollarSign, Briefcase, Users, Calendar, Clock, CheckCircle2, Loader2 } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { motion } from 'framer-motion'

const JobDescription = () => {
  const dispatch = useDispatch()
  const { singleJob } = useSelector(state => state.job)
  const { user } = useSelector(state => state.auth)

  const isInitiallyApplied = singleJob?.applications?.some(a => a.applicant === user?._id) || false
  const [isApplied, setIsApplied] = useState(isInitiallyApplied)
  const [applying, setApplying] = useState(false)

  const params = useParams()
  const jobId = params.id

  const applyJobHandler = async () => {
    setApplying(true)
    try {
      const response = await axios.post(`${APPLICANT_API_END_POINT}/apply/${jobId}`, {}, { withCredentials: true })
      if (response.data.success) {
        setIsApplied(true)
        const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
        dispatch(setSingleJob(updatedSingleJob))
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to apply')
    } finally {
      setApplying(false)
    }
  }

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(res.data.job.applications.some(a => a.applicant === user?._id))
        }
      } catch (error) { console.error(error) }
    }
    fetchJob()
  }, [jobId, dispatch, user?._id])

  const meta = [
    { icon: MapPin, label: 'Location', value: singleJob?.location },
    { icon: DollarSign, label: 'Salary', value: singleJob?.salary ? `$${singleJob.salary} USD` : null },
    { icon: Briefcase, label: 'Job Type', value: singleJob?.jobType },
    { icon: Clock, label: 'Experience', value: singleJob?.experienceLevel != null ? `${singleJob.experienceLevel} yrs` : null },
    { icon: Users, label: 'Openings', value: singleJob?.position },
    { icon: Calendar, label: 'Posted', value: singleJob?.createdAt?.split("T")[0] },
  ]

  return (
    <div className='page-bg min-h-screen'>
      <Navbar />
      <div className='max-w-6xl mx-auto px-4 sm:px-[5%] py-10'>
        <div className='flex flex-col lg:flex-row gap-8'>

          {/* Main Content */}
          <div className='flex-1 min-w-0'>
            {/* Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='p-6 rounded-2xl mb-6'
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(20px)' }}
            >
              <div className='flex items-start gap-4'>
                <div className='w-14 h-14 rounded-xl overflow-hidden shrink-0'
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <AvatarImage
                    src={singleJob?.company?.logo || `https://ui-avatars.com/api/?name=${singleJob?.company?.companyName}&background=e5202a&color=fff&size=56`}
                    alt="company"
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='flex-1'>
                  <p className='text-[#8888aa] text-sm'>{singleJob?.company?.companyName}</p>
                  <h1 className='text-white font-bold text-2xl mt-1'>{singleJob?.title}</h1>
                  <div className='flex flex-wrap gap-2 mt-3'>
                    <span className='px-3 py-1 rounded-full text-xs font-medium badge-blue'>
                      {singleJob?.position} positions
                    </span>
                    <span className='px-3 py-1 rounded-full text-xs font-medium badge-red'>
                      {singleJob?.jobType}
                    </span>
                    <span className='px-3 py-1 rounded-full text-xs font-medium badge-purple'>
                      ${singleJob?.salary} USD
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Meta Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className='grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6'
            >
              {meta.map(({ icon: Icon, label, value }) => value && (
                <div key={label} className='p-4 rounded-xl'
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className='flex items-center gap-2 mb-1'>
                    <Icon className='w-3.5 h-3.5 text-[#ff4757]' />
                    <span className='text-xs text-[#8888aa]'>{label}</span>
                  </div>
                  <p className='text-white text-sm font-medium'>{value}</p>
                </div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className='p-6 rounded-2xl mb-4'
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <h2 className='text-white font-semibold text-lg mb-4 pb-3'
                style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                Job Overview
              </h2>
              <p className='text-[#c8c8d8] text-sm leading-relaxed'>{singleJob?.description}</p>
            </motion.div>

            {/* Requirements */}
            {singleJob?.requirements?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='p-6 rounded-2xl'
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <h2 className='text-white font-semibold text-lg mb-4 pb-3'
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  Requirements
                </h2>
                <ul className='space-y-2.5'>
                  {singleJob.requirements.map((req, i) => (
                    <li key={i} className='flex items-start gap-3'>
                      <CheckCircle2 className='w-4 h-4 text-[#ff4757] mt-0.5 shrink-0' />
                      <span className='text-[#c8c8d8] text-sm'>{req}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Sticky Apply Panel */}
          <aside className='lg:w-72 shrink-0'>
            <div className='sticky top-24'>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className='p-6 rounded-2xl'
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(20px)' }}
              >
                <h3 className='text-white font-semibold mb-4'>Ready to apply?</h3>
                <p className='text-[#8888aa] text-sm mb-5'>
                  {singleJob?.applications?.length || 0} applicants so far. Don't miss this opportunity.
                </p>

                <button
                  onClick={isApplied ? null : applyJobHandler}
                  disabled={isApplied || applying}
                  className='w-full py-3 rounded-xl font-semibold text-sm cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 disabled:cursor-not-allowed'
                  style={isApplied ? {
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#8888aa',
                  } : {
                    background: 'linear-gradient(135deg, #e5202a, #ff4757)',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(229,32,42,0.3)',
                  }}
                >
                  {applying ? <><Loader2 className='w-4 h-4 animate-spin' /> Applying...</>
                    : isApplied ? <><CheckCircle2 className='w-4 h-4' /> Applied</>
                      : 'Apply Now →'}
                </button>

                <div className='mt-4 pt-4 space-y-3'
                  style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-[#8888aa]'>Total Applicants</span>
                    <span className='text-white font-medium'>{singleJob?.applications?.length || 0}</span>
                  </div>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-[#8888aa]'>Openings</span>
                    <span className='text-white font-medium'>{singleJob?.position}</span>
                  </div>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-[#8888aa]'>Posted</span>
                    <span className='text-white font-medium'>{singleJob?.createdAt?.split("T")[0]}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default JobDescription
