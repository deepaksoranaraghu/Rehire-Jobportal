import React from 'react'
import { Link } from 'react-router-dom'
import { Zap, Twitter, Linkedin, Github, Mail } from 'lucide-react'

const Footer = () => {
    return (
        <footer style={{ background: 'rgba(13,13,20,0.95)', borderTop: '1px solid rgba(255,255,255,0.07)' }}
            className='mt-auto'>
            <div className='max-w-7xl mx-auto px-4 sm:px-[5%] lg:px-[8%] py-12'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                    {/* Brand */}
                    <div className='col-span-1 md:col-span-2'>
                        <div className='flex items-center gap-2 mb-4'>
                            <div className='w-7 h-7 rounded-lg flex items-center justify-center'
                                style={{ background: 'linear-gradient(135deg, #e5202a, #ff4757)' }}>
                                <Zap className='w-3.5 h-3.5 text-white' fill='white' />
                            </div>
                            <span className='text-lg font-bold text-white'>
                                Red<span className='gradient-text'>Hire</span>
                            </span>
                        </div>
                        <p className='text-sm text-[#8888aa] max-w-xs leading-relaxed'>
                            The modern hiring platform connecting top talent with world-class companies.
                            Find your next opportunity with RedHire.
                        </p>
                        <div className='flex gap-3 mt-5'>
                            {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
                                <div key={i}
                                    className='w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200'
                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = 'rgba(229,32,42,0.15)';
                                        e.currentTarget.style.borderColor = 'rgba(229,32,42,0.3)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                    }}>
                                    <Icon className='w-3.5 h-3.5 text-[#8888aa]' />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className='text-white text-sm font-semibold mb-4'>Platform</h4>
                        <ul className='space-y-2.5'>
                            {['Explore Jobs', 'Browse Companies', 'Salary Insights', 'Career Advice'].map(item => (
                                <li key={item}>
                                    <span className='text-sm text-[#8888aa] hover:text-[#ff6b75] cursor-pointer transition-colors duration-200'>
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className='text-white text-sm font-semibold mb-4'>Company</h4>
                        <ul className='space-y-2.5'>
                            {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'].map(item => (
                                <li key={item}>
                                    <span className='text-sm text-[#8888aa] hover:text-[#ff6b75] cursor-pointer transition-colors duration-200'>
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3'
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className='text-xs text-[#8888aa]'>© 2025 RedHire. All rights reserved.</p>
                    <p className='text-xs text-[#8888aa]'>
                        Built with ❤️ for the future of hiring
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer