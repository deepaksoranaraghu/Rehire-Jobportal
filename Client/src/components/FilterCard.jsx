import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { SlidersHorizontal, RotateCcw } from 'lucide-react'

const filterData = [
    {
        filterType: "Location",
        array: ["New York", "San Francisco", "Austin", "Seattle", "Chicago", "Remote"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Full Stack", "Data Scientist", "Machine Learning"]
    },
    {
        filterType: "Salary",
        array: ["0-50k USD", "50k-80k USD", "80k-120k USD", "120k-200k USD", "200k+ USD"]
    }
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState("")
    const dispatch = useDispatch()

    const changeHandler = (value) => setSelectedValue(value === selectedValue ? "" : value)

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue])

    return (
        <div className='rounded-2xl p-4'
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-2'>
                    <SlidersHorizontal className='w-4 h-4 text-[#ff4757]' />
                    <h3 className='text-white font-semibold text-sm'>Filters</h3>
                </div>
                {selectedValue && (
                    <button
                        onClick={() => setSelectedValue("")}
                        className='flex items-center gap-1 text-xs text-[#8888aa] hover:text-[#ff4757] transition-colors cursor-pointer'
                    >
                        <RotateCcw className='w-3 h-3' />
                        Reset
                    </button>
                )}
            </div>

            <div className='space-y-5'>
                {filterData.map((data, index) => (
                    <div key={index}>
                        <h4 className='text-xs font-semibold text-[#8888aa] uppercase tracking-wider mb-3'>
                            {data.filterType}
                        </h4>
                        <div className='space-y-1.5'>
                            {data.array.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => changeHandler(item)}
                                    className='w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 cursor-pointer'
                                    style={{
                                        background: selectedValue === item ? 'rgba(229,32,42,0.12)' : 'transparent',
                                        border: selectedValue === item ? '1px solid rgba(229,32,42,0.3)' : '1px solid transparent',
                                        color: selectedValue === item ? '#ff4757' : '#c8c8d8',
                                    }}
                                    onMouseEnter={e => {
                                        if (selectedValue !== item) {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                                            e.currentTarget.style.color = '#ffffff'
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        if (selectedValue !== item) {
                                            e.currentTarget.style.background = 'transparent'
                                            e.currentTarget.style.color = '#c8c8d8'
                                        }
                                    }}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FilterCard
