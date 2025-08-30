import React from 'react'
import Navbar from '../../CustomerPages/Navbar/Navbar'
import Hero from '../../CustomerPages/Hero/Hero'
import AboutUsComponents from '../aboutUsComponents/aboutUsComponents'
import FeaturedProducts from '../featuredProducts/featuredProducts.jsx'
import BestSelling from '../bestSelling/BestSelling.jsx'
import MoreOnAboutUs from '../MoreOnAboutUs/MoreOnAboutUs.jsx'
import OurQualities from '../OurQualities/OurQualities.jsx'
import CopyrightPage from '../CopyrightPage/CopyrightPage.jsx'
import FreeShipping from '../freeShipping/freeShipping.jsx'
import Frontpagebanner from '../frontpagebanner/frontpagebanner.jsx'
import './CustomerHome.css'

const CustomerHome = () => {
  return (
    <div className="customer-home-container">
      <div className="home-content-wrapper">
        {/* Navbar Section */}
        <div className="navbar-section">
          <Navbar />
        </div>

        <div>
          <FreeShipping />
        </div>

        {/* Hero Section */}
        <div className="hero-section">
          <Hero />
        </div>

         {/* Featured Products Section */}
         <div className="featured-section mb-8">
          <FeaturedProducts />
        </div>

        {/* About Us Section */}
        <div className="about-section">
          <AboutUsComponents />
        </div>

       <div>
          <Frontpagebanner />
        </div>

        {/* Best Selling Section */}
        <div className="bestselling-section">
          <BestSelling />
        </div>

        {/* More About Us Section */}
        <div className="more-about-section">
          <MoreOnAboutUs />
        </div>

        {/* Our Qualities Section */}
        <div className="qualities-section">
          <OurQualities />
        </div>

       

        {/* Copyright Section */}
        <div className="copyright-section">
          <CopyrightPage />
        </div>
      </div>
    </div>
  )
}

export default CustomerHome