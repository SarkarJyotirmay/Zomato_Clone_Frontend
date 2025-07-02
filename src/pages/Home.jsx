import React from 'react'
import Hero from '../components/Hero'
import SearchBar from '../components/SearchBar'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const handleSearchSubmit = (searchFromValues)=>{
    navigate(`/search/${searchFromValues.searchQuery}`)
  }
  return (
    <>
    <Hero /> 
    <div className="flex flex-col gap-12  ">
      <div className="top bg-amber-100 rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-8  m-auto w-[90%] ">
        <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-orange-500'>
          We care for your hunger
        </h1>
        <span className='text-xl text-yellow-600 font-semibold'>
          We are just a click away!
        </span>
        
        <SearchBar placeHolder={"Search by city or town"} onSubmit={handleSearchSubmit}/>
      </div>

      <div className="bottom grid md:grid-cols-2 gap-5">
        <img src={"/landing.png"} alt="landing image" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>
            Download the EatZy App for faster ordering and personalised
            recommendations
          </span>
          <img src={"/appDownload.png"} />
        </div>
      </div>
    </div>
    </>
  )
}

export default Home