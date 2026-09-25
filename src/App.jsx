import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { Toaster } from 'sonner'
import Dictionary from './components/Dictionary'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='bg-image '>
      <Toaster richColors position='top-center'/>
      <Navbar />
      <div className='px-12 py-10'>
        <Hero />
        <Dictionary />
      </div>
      <Footer />
    </div>
  )
}

export default App