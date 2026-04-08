import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function LatestJobs() {
    const { allJobs } = useSelector(state => state.job)

    return (
        <motion.section
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className='px-4 sm:px-[5%] lg:px-[8%] py-16'
        >
            <div className='flex items-center justify-between mb-8'>
                <div>
                    <h2 className='text-3xl sm:text-4xl font-bold text-white'>
                        Latest &{' '}
                        <span className='gradient-text'>Top</span> Openings
                    </h2>
                    <p className='text-[#8888aa] text-sm mt-2'>Handpicked opportunities from top companies</p>
                </div>
                <Link to="/jobs"
                    className='hidden sm:flex items-center gap-2 text-sm font-medium text-[#ff4757] hover:text-[#ff6b75] transition-colors'>
                    View all <ArrowRight className='w-4 h-4' />
                </Link>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {allJobs?.slice(0, 6).map((job, index) => (
                    <motion.div
                        key={job._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.07, duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <LatestJobCards job={job} />
                    </motion.div>
                ))}
            </div>

            <div className='text-center mt-8 sm:hidden'>
                <Link to="/jobs">
                    <button className='px-6 py-2.5 rounded-lg text-sm btn-red'>
                        View all jobs →
                    </button>
                </Link>
            </div>
        </motion.section>
    )
}

export default LatestJobs