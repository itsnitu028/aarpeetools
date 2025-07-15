import React from 'react'
import Navbar from '../../CustomerPages/Navbar/Navbar'
import Hero from '../../CustomerPages/Hero/Hero'
import AboutUsComponents from '../aboutUsComponents/aboutUsComponents'
import FeaturedProducts from '../featuredProducts/featuredProducts.jsx'
import BestSelling from '../bestSelling/BestSelling.jsx'

const CustomerHome = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <AboutUsComponents />
      <FeaturedProducts />
      <BestSelling />
    </div>
  )
}

export default CustomerHome