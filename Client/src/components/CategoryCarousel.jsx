import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from "framer-motion"

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Cyber Security",
    "Machine Learning",
]

function CategoryCarousel() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='px-4 sm:px-[5%] lg:px-[8%] py-12'
        >
            <div className='text-center mb-8'>
                <h2 className='text-2xl sm:text-3xl font-bold text-white mb-2'>
                    Browse by <span className='gradient-text'>Category</span>
                </h2>
                <p className='text-[#8888aa] text-sm'>Find the perfect role for your skill set</p>
            </div>

            <Carousel className="w-full max-w-4xl mx-auto">
                <CarouselContent className='-ml-3'>
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="basis-[55%] sm:basis-1/3 md:basis-1/4 pl-3">
                            <button
                                onClick={() => searchJobHandler(cat)}
                                className='w-full py-3 px-4 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 text-center'
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#c8c8d8',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'rgba(229,32,42,0.1)'
                                    e.currentTarget.style.borderColor = 'rgba(229,32,42,0.3)'
                                    e.currentTarget.style.color = '#ff4757'
                                    e.currentTarget.style.transform = 'scale(1.03)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                                    e.currentTarget.style.color = '#c8c8d8'
                                    e.currentTarget.style.transform = 'scale(1)'
                                }}
                            >
                                {cat}
                            </button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious
                    className='border-white/10 text-white hover:bg-white/10 hover:text-white'
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                />
                <CarouselNext
                    className='border-white/10 text-white hover:bg-white/10 hover:text-white'
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                />
            </Carousel>
        </motion.section>
    )
}

export default CategoryCarousel