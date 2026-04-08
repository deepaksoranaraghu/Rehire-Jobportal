import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import FilterCard from './FilterCard'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { setSearchedQuery } from '@/redux/jobSlice'
import { SlidersHorizontal, X, Search } from 'lucide-react'

function Jobs() {
    const dispatch = useDispatch()
    useGetAllJobs()

    const { allJobs, searchedQuery } = useSelector(state => state.job)
    const [filterJobs, setFilterJobs] = useState([])
    const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false)

    useEffect(() => {
        if (searchedQuery) {
            const filtered = allJobs.filter(job => {
                const sq = searchedQuery.toLowerCase();
                let match = false;
                
                if (job?.title?.toLowerCase().includes(sq) ||
                    job?.description?.toLowerCase().includes(sq) ||
                    job?.location?.toLowerCase().includes(sq)) {
                    match = true;
                }

                if (sq.includes('usd')) {
                    const salary = Number(job?.salary);
                    if (!isNaN(salary)) {
                        if (sq === "0-50k usd" && salary <= 50000) match = true;
                        else if (sq === "50k-80k usd" && salary > 50000 && salary <= 80000) match = true;
                        else if (sq === "80k-120k usd" && salary > 80000 && salary <= 120000) match = true;
                        else if (sq === "120k-200k usd" && salary > 120000 && salary <= 200000) match = true;
                        else if (sq === "200k+ usd" && salary > 200000) match = true;
                    }
                }
                
                return match;
            })
            setFilterJobs(filtered)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery])

    useEffect(() => {
        return () => { dispatch(setSearchedQuery("")) }
    }, [dispatch])

    return (
        <div className='page-bg min-h-screen'>
            <Navbar />

            <div className='px-4 sm:px-[5%] lg:px-[8%] py-8'>
                {/* Header */}
                <div className='flex items-center justify-between mb-6'>
                    <div>
                        <h1 className='text-2xl font-bold text-white'>
                            {searchedQuery ? `Results for "${searchedQuery}"` : 'Explore Jobs'}
                        </h1>
                        <p className='text-[#8888aa] text-sm mt-1'>
                            {filterJobs.length} opportunities found
                        </p>
                    </div>
                    {/* Mobile filter toggle */}
                    <button
                        className='sm:hidden flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium'
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#c8c8d8' }}
                        onClick={() => setIsFilterBoxOpen(!isFilterBoxOpen)}
                    >
                        {isFilterBoxOpen ? <X className='w-4 h-4' /> : <SlidersHorizontal className='w-4 h-4' />}
                        {isFilterBoxOpen ? 'Close' : 'Filters'}
                    </button>
                </div>

                <div className='flex gap-6'>
                    {/* Desktop Filter Sidebar */}
                    <aside className='hidden sm:block w-56 shrink-0'>
                        <div className='sticky top-24'>
                            <FilterCard />
                        </div>
                    </aside>

                    {/* Mobile Filter */}
                    <AnimatePresence>
                        {isFilterBoxOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className='sm:hidden overflow-hidden'
                            >
                                <FilterCard />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Job Grid */}
                    <div className='flex-1'>
                        {filterJobs.length === 0 ? (
                            <div className='flex flex-col items-center justify-center py-24'>
                                <div className='w-16 h-16 rounded-2xl flex items-center justify-center mb-4'
                                    style={{ background: 'rgba(229,32,42,0.1)', border: '1px solid rgba(229,32,42,0.2)' }}>
                                    <Search className='w-8 h-8 text-[#ff4757]' />
                                </div>
                                <h3 className='text-white font-semibold text-lg mb-2'>No jobs found</h3>
                                <p className='text-[#8888aa] text-sm text-center max-w-xs'>
                                    Try adjusting your filters or search with different keywords
                                </p>
                                <button
                                    onClick={() => dispatch(setSearchedQuery(''))}
                                    className='mt-5 px-5 py-2.5 rounded-xl text-sm btn-red cursor-pointer'
                                >
                                    Clear filters
                                </button>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                                <AnimatePresence>
                                    {filterJobs.map((job, i) => (
                                        <motion.div
                                            key={job._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3, delay: i * 0.03 }}
                                        >
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Jobs