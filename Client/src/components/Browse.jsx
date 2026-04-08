import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { motion } from "framer-motion"
import { Search } from 'lucide-react'

const Browse = () => {
    useGetAllJobs()
    const { allJobs } = useSelector(store => store.job)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => { dispatch(setSearchedQuery("")) }
    }, [dispatch])

    return (
        <div className='page-bg min-h-screen'>
            <Navbar />
            <div className='px-4 sm:px-[5%] lg:px-[8%] py-10'>
                <div className='mb-8'>
                    <h1 className='text-2xl font-bold text-white'>
                        Search Results{' '}
                        <span className='gradient-text'>({allJobs.length})</span>
                    </h1>
                    <p className='text-[#8888aa] text-sm mt-1'>
                        Discover opportunities that match your search
                    </p>
                </div>

                {allJobs.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-24'>
                        <div className='w-16 h-16 rounded-2xl flex items-center justify-center mb-4'
                            style={{ background: 'rgba(229,32,42,0.1)', border: '1px solid rgba(229,32,42,0.2)' }}>
                            <Search className='w-8 h-8 text-[#ff4757]' />
                        </div>
                        <h3 className='text-white font-semibold text-lg mb-2'>No jobs found</h3>
                        <p className='text-[#8888aa] text-sm text-center max-w-xs'>
                            Try adjusting your search terms or browse all available jobs
                        </p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
                    >
                        {allJobs.map((job, i) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04, duration: 0.3 }}
                            >
                                <Job job={job} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default Browse
