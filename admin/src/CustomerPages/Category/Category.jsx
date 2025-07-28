import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../Navbar/Navbar.jsx'
import CopyrightPage from "../../CustomerComponents/CopyrightPage/CopyrightPage.jsx"
import redbasket from '../../assets/banner.png'
import HSStoolbit from '../../assets/HSS_tool_Bit.png' 
import carbideend from '../../assets/carbide end mill.png'
import hsspunches from "../../assets/hss punches.png"
import carbidecenters from "../../assets/carbide centers.png"
import hssreamers from "../../assets/hss reamers.png"

const Category = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const categories = [
          {
        id: 1,
        name: "HSS Tool Bit",
        image: HSStoolbit
      },
    {
      id: 2,
      name: "Carbide End Mills",
      image: carbideend
    },
    {
      id: 3,
      name: "HSS Punches",
      image: hsspunches
    },
    {
      id: 4,
      name: "Carbide Centers",
      image: carbidecenters
    },
    {
      id: 5,
      name: "HSS Reamers",
      image: hssreamers
    },
  
  ];
  return (
    <div>
      <Navbar />
      <div 
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={redbasket} 
          alt="Red Basket" 
          className={`w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] object-cover opacity-60 transition-transform duration-1000 ease-out ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
      </div>
      
      {/* Our Categories Section */}
      <div className="max-w-full mx-auto px-20 mt-8 mb-12">
        <div className="text-6xl font-bold text-center mb-8 text-[#872341]  border-[#872341] pb-2">
          Our Categories
        </div>
        
                <div className="grid  md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <NavLink 
              key={category.id} 
              to={`/category/${category.id}`}
              className="flex flex-col hover:scale-105 transition-transform duration-300 cursor-pointer no-underline hover:no-underline"
              style={{ textDecoration: 'none' }}
            >
              <div className="bg-white border shadow-sm h-[280px]">
                <div className="py-3 h-full flex flex-col">
                  <div className="w-full h-[100px] sm:h-[120px] md:h-[140px] lg:h-[160px] xl:h-[180px] flex items-center justify-center">
                    {category.image && typeof category.image === 'string' && category.image.includes('Image') ? (
                      <span className="text-gray-500 text-sm">{category.image}</span>
                    ) : (
                      <img src={category.image} alt={category.name} className="w-full h-full object-contain" />
                    )}
                  </div>
                  <div className="flex-1 flex items-end justify-center pt-2">
                    <p className="text-red-800 text-center font-medium text-2xl sm:text-xl md:text-2xl">
                      {category.name}
                    </p>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    <CopyrightPage  />  
    </div>
  )
  }
  
export default Category