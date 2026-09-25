import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

const App = () => {
  return (
    <div className='bg-image'>
      <Navbar />
      <div className='px-12 py-10'>
        <Hero />
      </div>
    </div>
  )
}

export default App