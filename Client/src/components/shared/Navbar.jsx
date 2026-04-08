import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import {
    BriefcaseBusiness, BuildingIcon, HomeIcon, LogOut,
    MenuIcon, SearchCheck, User2, Zap
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from "framer-motion"

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);

    const logoutHandler = async () => {
        try {
            const response = await axios.post(`${USER_API_END_POINT}/logout`, {}, { withCredentials: true })
            if (response.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || 'Logout failed');
        }
    }

    const resetQuery = () => dispatch(setSearchedQuery(''));

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className='sticky top-0 z-50 navbar-glass'
        >
            <div className='flex items-center justify-between mx-auto h-16 px-4 sm:px-[5%] lg:px-[8%]'>

                {/* Logo */}
                <div onClick={() => { navigate("/"); resetQuery(); }} className='cursor-pointer flex items-center gap-2'>
                    <div className='w-8 h-8 rounded-lg flex items-center justify-center'
                        style={{ background: 'linear-gradient(135deg, #e5202a, #ff4757)' }}>
                        <Zap className='w-4 h-4 text-white' fill='white' />
                    </div>
                    <h1 className='text-xl font-bold text-white'>
                        Red<span className='gradient-text'>Hire</span>
                    </h1>
                </div>

                {/* Center Nav Links */}
                <ul className='hidden sm:flex font-medium items-center gap-6 text-sm'>
                    {user && user.role === "recruiter" ? (
                        <>
                            <li>
                                <Link to="/admin/companies"
                                    className='text-[#8888aa] hover:text-white transition-colors duration-200'>
                                    Companies
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/jobs"
                                    className='text-[#8888aa] hover:text-white transition-colors duration-200'>
                                    Jobs
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/" onClick={resetQuery}
                                    className='text-[#8888aa] hover:text-white transition-colors duration-200'>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/jobs"
                                    className='text-[#8888aa] hover:text-white transition-colors duration-200'>
                                    Explore Jobs
                                </Link>
                            </li>
                            <li>
                                <Link to="/browse" onClick={resetQuery}
                                    className='text-[#8888aa] hover:text-white transition-colors duration-200'>
                                    Browse
                                </Link>
                            </li>
                        </>
                    )}
                </ul>

                {/* Right Side */}
                <div className='flex items-center gap-3'>
                    {!user ? (
                        <div className='hidden sm:flex items-center gap-2'>
                            <Link to="/login">
                                <button className='px-4 py-2 text-sm rounded-lg btn-ghost text-[#c8c8d8] cursor-pointer'>
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className='px-4 py-2 text-sm rounded-lg btn-red font-semibold cursor-pointer'>
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer ring-2 ring-transparent hover:ring-red-500/40 transition-all duration-200 w-9 h-9">
                                    <AvatarImage
                                        src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                                        alt="profile"
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-72 p-0 overflow-hidden'
                                style={{
                                    background: '#1a1a2e',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                }}>
                                <div className='p-4 border-b border-white/10'>
                                    <div className='flex gap-3 items-center'>
                                        <Avatar className="w-10 h-10">
                                            <AvatarImage
                                                src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                                                alt="profile"
                                            />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-semibold text-white text-sm'>{user?.fullname}</h4>
                                            <p className='text-xs text-[#8888aa] mt-0.5'>{user?.profile?.bio || 'No bio yet'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='p-2'>
                                    {user?.role === "student" && (
                                        <Link to="/profile">
                                            <div className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors'>
                                                <User2 className='w-4 h-4 text-[#8888aa]' />
                                                <span className='text-sm text-[#c8c8d8]'>View Profile</span>
                                            </div>
                                        </Link>
                                    )}
                                    <div onClick={logoutHandler}
                                        className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 cursor-pointer transition-colors group'>
                                        <LogOut className='w-4 h-4 text-[#8888aa] group-hover:text-red-400' />
                                        <span className='text-sm text-[#c8c8d8] group-hover:text-red-400'>Logout</span>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}

                    {/* Mobile Hamburger */}
                    <div className='sm:hidden'>
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className='p-2 rounded-lg hover:bg-white/5 transition-colors text-[#c8c8d8]'>
                                    <MenuIcon className='w-5 h-5' />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className='w-64 p-2 mr-2'
                                style={{
                                    background: '#1a1a2e',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                }}>
                                {user && user.role === "recruiter" ? (
                                    <div className='flex flex-col gap-1'>
                                        <div onClick={() => navigate("/admin/companies")}
                                            className='flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 cursor-pointer'>
                                            <BuildingIcon className='w-4 h-4 text-[#8888aa]' />
                                            <span className='text-sm text-[#c8c8d8]'>Companies</span>
                                        </div>
                                        <div onClick={() => navigate("/admin/jobs")}
                                            className='flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 cursor-pointer'>
                                            <BriefcaseBusiness className='w-4 h-4 text-[#8888aa]' />
                                            <span className='text-sm text-[#c8c8d8]'>Jobs</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex flex-col gap-1'>
                                        <div onClick={() => { navigate("/"); resetQuery(); }}
                                            className='flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 cursor-pointer'>
                                            <HomeIcon className='w-4 h-4 text-[#8888aa]' />
                                            <span className='text-sm text-[#c8c8d8]'>Home</span>
                                        </div>
                                        <div onClick={() => navigate("/jobs")}
                                            className='flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 cursor-pointer'>
                                            <BriefcaseBusiness className='w-4 h-4 text-[#8888aa]' />
                                            <span className='text-sm text-[#c8c8d8]'>Explore Jobs</span>
                                        </div>
                                        <div onClick={() => { navigate("/browse"); resetQuery(); }}
                                            className='flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 cursor-pointer'>
                                            <SearchCheck className='w-4 h-4 text-[#8888aa]' />
                                            <span className='text-sm text-[#c8c8d8]'>Browse</span>
                                        </div>
                                        {!user && (
                                            <>
                                                <hr className='border-white/10 my-1' />
                                                <div onClick={() => navigate("/login")}
                                                    className='flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 cursor-pointer'>
                                                    <span className='text-sm text-[#c8c8d8]'>Login</span>
                                                </div>
                                                <div onClick={() => navigate("/signup")}
                                                    className='px-3 py-2.5 rounded-lg btn-red text-center cursor-pointer text-sm font-medium'>
                                                    Get Started
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Navbar
