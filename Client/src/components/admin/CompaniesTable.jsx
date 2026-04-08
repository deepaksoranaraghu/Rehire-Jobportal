import React, { useEffect, useState } from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Building2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company)
    const navigate = useNavigate()
    const [filterCompany, setFilterCompany] = useState(companies)

    useEffect(() => {
        const filtered = companies.filter(c =>
            !searchCompanyByText || c?.companyName?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        )
        setFilterCompany(filtered)
    }, [companies, searchCompanyByText])

    if (!filterCompany || filterCompany.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center py-20'>
                <div className='w-14 h-14 rounded-2xl flex items-center justify-center mb-4'
                    style={{ background: 'rgba(229,32,42,0.08)', border: '1px solid rgba(229,32,42,0.15)' }}>
                    <Building2 className='w-6 h-6 text-[#ff4757]' />
                </div>
                <p className='text-white font-medium'>No companies registered yet</p>
                <p className='text-[#8888aa] text-sm mt-1'>Create your first company to get started</p>
            </div>
        )
    }

    return (
        <div className='overflow-x-auto rounded-xl' style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <table className='table-glass'>
                <thead>
                    <tr>
                        <th>Logo</th>
                        <th>Company Name</th>
                        <th>Registered</th>
                        <th className='text-right'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filterCompany.map(company => (
                        <tr key={company._id}>
                            <td>
                                <div className='w-9 h-9 rounded-lg overflow-hidden'
                                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <Avatar className='w-full h-full'>
                                        <AvatarImage
                                            src={company?.logo || `https://ui-avatars.com/api/?name=${company.companyName}&background=e5202a&color=fff&size=36`}
                                            className='w-full h-full object-cover'
                                        />
                                    </Avatar>
                                </div>
                            </td>
                            <td><span className='font-medium text-white'>{company?.companyName}</span></td>
                            <td><span className='text-[#8888aa]'>{company.createdAt.split("T")[0]}</span></td>
                            <td className='text-right'>
                                <Popover>
                                    <PopoverTrigger className='cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors'>
                                        <MoreHorizontal className='w-4 h-4 text-[#8888aa]' />
                                    </PopoverTrigger>
                                    <PopoverContent className='w-36 p-2'
                                        style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                                        <div onClick={() => navigate(`/admin/companies/${company._id}`)}
                                            className='flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors'>
                                            <Edit2 className='w-3.5 h-3.5 text-[#8888aa]' />
                                            <span className='text-sm text-[#c8c8d8]'>Edit</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CompaniesTable
