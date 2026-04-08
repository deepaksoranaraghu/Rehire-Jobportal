import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Plus, Search } from 'lucide-react'
import Footer from '../shared/Footer'

const Companies = () => {
  useGetAllCompanies()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [input, setInput] = useState("")

  useEffect(() => {
    dispatch(setSearchCompanyByText(input))
  }, [input])

  return (
    <div className='page-bg min-h-screen'>
      <Navbar />
      <div className='max-w-6xl mx-auto px-4 sm:px-[5%] py-10'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-2xl font-bold text-white'>Companies</h1>
            <p className='text-[#8888aa] text-sm mt-1'>Manage your registered companies</p>
          </div>
          <button
            onClick={() => navigate("/admin/companies/create")}
            className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold btn-red cursor-pointer'
          >
            <Plus className='w-4 h-4' />
            New Company
          </button>
        </div>

        {/* Search */}
        <div className='flex items-center gap-3 mb-6 px-4 py-2.5 rounded-xl max-w-sm'
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Search className='w-4 h-4 text-[#8888aa]' />
          <input
            type="text"
            placeholder="Filter by name..."
            onChange={(e) => setInput(e.target.value)}
            className='flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#8888aa]'
          />
        </div>

        <CompaniesTable />
      </div>
      <Footer />
    </div>
  )
}

export default Companies
