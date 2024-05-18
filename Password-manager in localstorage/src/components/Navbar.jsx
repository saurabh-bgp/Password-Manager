import React from 'react'

const Navbar = () => {
  return (
   <nav className='flex justify-between p-3 bg-violet-700 text-lg text-white'>
    <div className='left ml-4 font-bold text-white text-2xl'>
      <span className='text-red-400'>&lt;Your </span>
     <span className='text-green-500'>Logo/&gt;</span>
    </div>
    <div className="right">
      <ul className='flex px-3 gap-5'>
        {/* <li><a className='hover:text-green-500' href="">Home</a></li>
        <li><a className='hover:text-green-500' href="">About US</a></li>
        <li><a className='hover:text-green-500' href="">Contact</a></li> */}
          <button className='text-white bg-green-500 rounded-3xl ring-1
           ring-white flex gap-4 justify-between items-center'>
          <img className='invert rounded-full w-10 p-1' src="/icons/githubicon.png" alt="github icon" />
          <span className='font-bold mr-3'>Github</span>
          </button>
      </ul>
    </div>
   </nav>
  )
}

export default Navbar
