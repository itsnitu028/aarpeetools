import React from 'react';
import logo from '../../assets/aarpee invert.png'; // Adjust if your logo filename is different
import phoneIcon from '../../assets/phone-removebg-preview.png';
import emailIcon from '../../assets/email-icon-removebg-preview.png';
import houseIcon from '../../assets/house.png';

const CopyrightPage = () => {
  return (
    <footer className="bg-[#131a22] text-[#11162a] pt-12 pb-6 px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between">
        {/* Left Section */}
        <div className="flex-1 ml-5">
          <div className="flex items-center gap-3 mb-2">
            <img src={logo} alt="AAR PEE TOOLS" className="h-30 w-50 object-contain" />
          </div>
          <div className="ml-3 w-[290px] h-1 bg-white mb-4"></div>
          <div className="flex items-center gap-2 mb-2">
            {/* Phone Icon */}
            <a href="tel:+918178160362" className="flex items-center gap-2 text-white text-xl mb-2 no-underline font-light text-[15px]"
            style={{ textDecoration: 'none' }}>
              <img src={phoneIcon} alt="Phone" className="w-10 h-10 object-contain" />
              (+91) 8178160362
            </a>
          </div>
          <div className="flex items-center gap-2 mb-2">
            {/* Email Icon */}
            <a href="mailto:ladaarora1@yahoo.in" className="flex items-center gap-2 text-white text-xl mb-2 no-underline hover:no-underline font-light text-[15px]" style={{ textDecoration: 'none' }}>
              <img src={emailIcon} alt="Email" className="ml-1 w-8 h-10 object-contain" />
              ladaarora1@yahoo.in
            </a>
          </div>
          <div className="flex items-center gap-2 mb-6">
            {/* House Icon */}
            <a href="https://www.google.com/maps/search/?api=1&query=3405,+Chawri+Bazar+Rd,+Bazar+Sirkiwalan,+Khush+Dil,+Old+Delhi,+Delhi,+110006" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white text-xl mb-2 no-underline hover:no-underline font-light text-[15px]" style={{ textDecoration: 'none' }}>
              <img src={houseIcon} alt="Address" className="ml-1 w-8 h-8 object-contain" />
              3405/105, Haqim Baqa, Chawri Bazar, Delhi-110006
            </a>
          </div>
       
         
        </div>
        {/* Right Section */}
        <div className="flex-1 flex flex-col items-end justify-between mt-8 md:mt-0">
          <div>
            <div className="font-bold text-white text-4xl mb-2">Company</div>
            <ul className="text-white text-base">
              <li className="mb-1 hover:underline cursor-pointer">About Us</li>
              <li className="hover:underline cursor-pointer">Contact Us</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <div className="text-sm text-white mb-2 mr-2">Copyright © 2025 AAR PEE TOOLS</div>
      </div>
    </footer>
  );
};

export default CopyrightPage;