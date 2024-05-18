import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full'>
         <div className='left ml-4 font-bold text-white text-2xl'>
      <span className='text-red-400'>&lt;Your </span>
     <span className='text-green-500'>Logo/&gt;</span>
    </div>
    <div className='flex justify-center items-center'>
        Created with <img className='w-5 mx-2 rounded-full' src="icons/loveicon.jpg" alt="love icon" /> by Saurabh Kumar
    </div>
    </div>
  )
}

export default Footer
