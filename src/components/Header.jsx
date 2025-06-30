import React from 'react'
import { Link } from 'react-router-dom'
import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'

const Header = () => {
  return (
    <>
    <div className='flex justify-between text-3xl font-semibold border-b-2 border-b-orange-500 px-4 py-4'>
      <div className="container mx-auto flex justify-between items-center">
        <Link to={"/"}
        className="text-3xl font-bold tracking-tight text-orange-500"
        >
          EatZy
        </Link>

        <div className='md:hidden px-2'>
          <MobileNav />
        </div>
        <div className='hidden md:block '>
          <DesktopNav />
        </div>
      </div>
    </div>
    </>
  )
}

export default Header