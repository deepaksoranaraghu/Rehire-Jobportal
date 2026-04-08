import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Contact, Mail, Pen, FileText, Star, Briefcase, ExternalLink } from 'lucide-react'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import Footer from './shared/Footer'
import { motion } from "framer-motion"

function Profile() {
    useGetAppliedJobs()
    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth)

    const cardStyle = {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
    }

    return (
        <div className='page-bg min-h-screen'>
            <Navbar />
            <div className='max-w-5xl mx-auto px-4 sm:px-[5%] py-10'>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='p-6 sm:p-8 rounded-2xl mb-6'
                    style={cardStyle}
                >
                    <div className='flex flex-col sm:flex-row items-start gap-6'>
                        {/* Avatar + Name */}
                        <div className='flex items-center gap-5 flex-1'>
                            <div className='relative'>
                                <div className='w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-red-500/30'>
                                    <Avatar className="w-full h-full">
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                                            alt="profile"
                                            className='w-full h-full object-cover'
                                        />
                                    </Avatar>
                                </div>
                                <div className='absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center'
                                    style={{ background: 'linear-gradient(135deg, #e5202a, #ff4757)' }}>
                                    <Star className='w-2.5 h-2.5 text-white' fill='white' />
                                </div>
                            </div>
                            <div>
                                <h1 className='text-xl font-bold text-white'>{user?.fullname}</h1>
                                <p className='text-[#8888aa] text-sm mt-1'>{user?.profile?.bio || 'No bio added yet'}</p>
                                <div className='flex items-center gap-4 mt-3'>
                                    <div className='flex items-center gap-1.5 text-xs text-[#8888aa]'>
                                        <Mail className='w-3.5 h-3.5' />
                                        <span>{user?.email}</span>
                                    </div>
                                    {user?.phoneNumber && (
                                        <div className='flex items-center gap-1.5 text-xs text-[#8888aa]'>
                                            <Contact className='w-3.5 h-3.5' />
                                            <span>{user?.phoneNumber}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Edit Button */}
                        <button
                            onClick={() => setOpen(true)}
                            className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200'
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#c8c8d8' }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'rgba(229,32,42,0.3)'
                                e.currentTarget.style.color = '#ff4757'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                                e.currentTarget.style.color = '#c8c8d8'
                            }}
                        >
                            <Pen className='w-3.5 h-3.5' />
                            Edit Profile
                        </button>
                    </div>

                    <div className='mt-6 pt-6 grid sm:grid-cols-2 gap-4'
                        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        {/* Skills */}
                        <div>
                            <h3 className='text-white text-sm font-semibold mb-3'>Skills</h3>
                            <div className='flex flex-wrap gap-2'>
                                {user?.profile?.skills?.length > 0
                                    ? user.profile.skills.map((skill, i) => (
                                        <span key={i}
                                            className='px-3 py-1 rounded-full text-xs font-medium'
                                            style={{ background: 'rgba(229,32,42,0.1)', border: '1px solid rgba(229,32,42,0.2)', color: '#ff6b75' }}>
                                            {skill}
                                        </span>
                                    ))
                                    : <span className='text-[#8888aa] text-sm'>No skills added</span>
                                }
                            </div>
                        </div>

                        {/* Resume */}
                        <div>
                            <h3 className='text-white text-sm font-semibold mb-3'>Resume</h3>
                            {user?.profile?.resume ? (
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href={user.profile.resume}
                                    className='inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200'
                                    style={{
                                        background: 'rgba(255,255,255,0.06)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: '#c8c8d8',
                                    }}
                                >
                                    <FileText className='w-4 h-4 text-[#ff4757]' />
                                    {user.profile.resumeOriginalName || 'View Resume'}
                                    <ExternalLink className='w-3.5 h-3.5' />
                                </a>
                            ) : (
                                <span className='text-[#8888aa] text-sm'>No resume uploaded</span>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Applied Jobs */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className='p-6 sm:p-8 rounded-2xl'
                    style={cardStyle}
                >
                    <div className='flex items-center gap-2 mb-6'>
                        <Briefcase className='w-5 h-5 text-[#ff4757]' />
                        <h2 className='text-white font-semibold text-lg'>Applied Jobs</h2>
                    </div>
                    <AppliedJobTable />
                </motion.div>

            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
            <Footer />
        </div>
    )
}

export default Profile
