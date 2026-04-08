import React, { useState } from 'react'
import { Search, MapPin, Sparkles } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"

const trendingRoles = ["Frontend Dev", "Backend Dev", "Data Scientist", "UI/UX Designer", "DevOps", "ML Engineer"]

function HeroSection() {
    const [query, setQuery] = useState("")
    const [location, setLocation] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') searchJobHandler()
    }

    return (
        <section className='relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-8'>
            {/* Animated background orbs */}
            <div className='hero-glow w-[600px] h-[600px] -top-40 left-1/2 -translate-x-1/2 animate-pulse-glow'
                style={{ background: 'radial-gradient(circle, rgba(229,32,42,0.15), transparent 70%)' }} />
            <div className='hero-glow w-80 h-80 top-20 left-10'
                style={{ background: 'radial-gradient(circle, rgba(229,32,42,0.08), transparent)' }} />
            <div className='hero-glow w-64 h-64 top-40 right-10'
                style={{ background: 'radial-gradient(circle, rgba(100,100,255,0.06), transparent)' }} />

            {/* Grid overlay */}
            <div className='absolute inset-0 opacity-[0.03]'
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }} />

            <div className='relative z-10 text-center px-4 w-full max-w-4xl mx-auto'>
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8'
                    style={{ background: 'rgba(229,32,42,0.1)', border: '1px solid rgba(229,32,42,0.25)' }}
                >
                    <Sparkles className='w-3.5 h-3.5 text-[#ff4757]' />
                    <span className='text-sm text-[#ff4757] font-medium'>Your Next Career Starts Here</span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.7 }}
                    className='text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4'
                >
                    Find Your{' '}
                    <span className='gradient-text'>Dream Career</span>
                    <br />
                    With RedHire
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className='text-[#8888aa] text-lg max-w-2xl mx-auto mb-10'
                >
                    Connect with top companies, discover opportunities tailored to your skills,
                    and land your next role faster than ever.
                </motion.p>

                {/* Glass Search Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className='glass-card p-4 rounded-2xl max-w-2xl mx-auto mb-8'
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                    <div className='flex flex-col sm:flex-row gap-3'>
                        {/* Search Input */}
                        <div className='flex-1 flex items-center gap-3 px-4 py-3 rounded-xl'
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <Search className='w-4 h-4 text-[#8888aa] shrink-0' />
                            <input
                                type="text"
                                placeholder="Job title, company, or keyword..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className='flex-1 bg-transparent text-white text-sm outline-none placeholder:text-[#8888aa]'
                            />
                        </div>

                        {/* Location */}
                        <div className='flex items-center gap-3 px-4 py-3 rounded-xl sm:w-44'
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <MapPin className='w-4 h-4 text-[#8888aa] shrink-0' />
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className='flex-1 bg-transparent text-sm text-[#8888aa] outline-none cursor-pointer'
                            >
                                <option value="" style={{ background: '#1a1a2e' }}>Location</option>
                                {['New York', 'San Francisco', 'Austin', 'Seattle', 'Chicago', 'Remote'].map(loc => (
                                    <option key={loc} value={loc} style={{ background: '#1a1a2e' }}>{loc}</option>
                                ))}
                            </select>
                        </div>

                        {/* Search Button */}
                        <button
                            onClick={searchJobHandler}
                            className='px-6 py-3 rounded-xl font-semibold text-sm btn-red flex items-center gap-2 cursor-pointer shrink-0'
                        >
                            <Search className='w-4 h-4' />
                            Search Jobs
                        </button>
                    </div>
                </motion.div>

                {/* Trending Chips */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className='flex flex-wrap items-center justify-center gap-2'
                >
                    <span className='text-xs text-[#8888aa] mr-1'>Trending:</span>
                    {trendingRoles.map((role, i) => (
                        <button
                            key={role}
                            onClick={() => { dispatch(setSearchedQuery(role)); navigate("/browse"); }}
                            className='px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-200'
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#c8c8d8',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(229,32,42,0.1)'
                                e.currentTarget.style.borderColor = 'rgba(229,32,42,0.3)'
                                e.currentTarget.style.color = '#ff4757'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                                e.currentTarget.style.color = '#c8c8d8'
                            }}
                        >
                            {role}
                        </button>
                    ))}
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className='flex items-center justify-center gap-8 mt-14'
                >
                    {[
                        { value: '10K+', label: 'Active Jobs' },
                        { value: '5K+', label: 'Companies' },
                        { value: '50K+', label: 'Hires Made' },
                    ].map(stat => (
                        <div key={stat.label} className='text-center'>
                            <div className='text-2xl font-bold gradient-text'>{stat.value}</div>
                            <div className='text-xs text-[#8888aa] mt-0.5'>{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection