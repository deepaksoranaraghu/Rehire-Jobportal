import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import JobApplicantsTable from './JobApplicantsTable'
import axios from 'axios'
import { APPLICANT_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import { Users } from 'lucide-react'
import Footer from '../shared/Footer'

const JobApplicants = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const jobId = params.id
    const { allApplicants } = useSelector(store => store.application)

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const response = await axios.get(`${APPLICANT_API_END_POINT}/${jobId}/applicants`, { withCredentials: true })
                if (response.data.success) dispatch(setAllApplicants(response.data.job))
            } catch (error) { console.error(error) }
        }
        fetchAllApplicants()
    }, [])

    return (
        <div className='page-bg min-h-screen'>
            <Navbar />
            <div className='max-w-6xl mx-auto px-4 sm:px-[5%] py-10'>
                <div className='flex items-center gap-3 mb-8'>
                    <div className='w-10 h-10 rounded-xl flex items-center justify-center'
                        style={{ background: 'rgba(229,32,42,0.12)', border: '1px solid rgba(229,32,42,0.2)' }}>
                        <Users className='w-5 h-5 text-[#ff4757]' />
                    </div>
                    <div>
                        <h1 className='text-2xl font-bold text-white'>
                            Applicants{' '}
                            <span className='gradient-text'>({allApplicants?.applications?.length || 0})</span>
                        </h1>
                        <p className='text-[#8888aa] text-sm'>Review and manage all applicants</p>
                    </div>
                </div>
                <JobApplicantsTable />
            </div>
            <Footer />
        </div>
    )
}

export default JobApplicants
