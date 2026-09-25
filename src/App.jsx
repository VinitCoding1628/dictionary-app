import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { Toaster } from 'sonner'
import Dictionary from './components/Dictionary'

const App = () => {
  return (
    <div className='bg-image '>
      <Toaster richColors position='top-center'/>
      <Navbar />
      <div className='px-12 py-10'>
        <Hero />
        <Dictionary />
      </div>
    </div>
  )
}

export default App