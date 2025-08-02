import React from 'react';
import logo from '../../assets/aarpee invert.png'; // Adjust if your logo filename is different
import phoneIcon from '../../assets/phone-removebg-preview.png';
import emailIcon from '../../assets/email-icon-removebg-preview.png';
import houseIcon from '../../assets/house.png';

const CopyrightPage = () => {
  return (
    <footer className="bg-[#131a22] text-[#11162a]   pb-4 md:pb-6 px-4 md:px-10 w-full">
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-start gap-8 md:gap-0">
        {/* Left Section */}
        <div className="flex flex-col items-start w-full md:w-auto md:ml-5">
          <div className="flex items-center gap-3 mb-2">
            <img src={logo} alt="AAR PEE TOOLS" className="h-16 w-24 md:h-30 md:w-50 object-contain" />
          </div>
          <div className="w-32 md:w-[200px] h-1 bg-white mb-4"></div>
          <div className="flex items-center gap-2 mb-2">
            {/* Phone Icon */}
            <a href="tel:+918178160362" className="flex items-center gap-2 text-white text-base md:text-xl mb-2 no-underline font-light text-[15px] md:text-[15px]" style={{ textDecoration: 'none' }}>
              <img src={phoneIcon} alt="Phone" className="w-7 h-7 md:w-10 md:h-10 object-contain" />
              (+91) 8178160362
            </a>
          </div>
          <div className="flex items-center gap-2 mb-2">
            {/* Email Icon */}
            <a href="mailto:ladaarora1@yahoo.in" className="flex items-center gap-2 text-white text-base md:text-xl mb-2 no-underline hover:no-underline font-light text-[15px] md:text-[15px]" style={{ textDecoration: 'none' }}>
              <img src={emailIcon} alt="Email" className="ml-1 w-6 h-7 md:w-8 md:h-10 object-contain" />
              ladaarora1@yahoo.in
            </a>
          </div>
          <div className="flex items-center gap-2 mb-6">
            {/* House Icon */}
            <a href="https://www.google.com/maps/search/?api=1&query=3405,+Chawri+Bazar+Rd,+Bazar+Sirkiwalan,+Khush+Dil,+Old+Delhi,+Delhi,+110006" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white text-base md:text-xl mb-2 no-underline hover:no-underline font-light text-[15px] md:text-[15px]" style={{ textDecoration: 'none' }}>
              <img src={houseIcon} alt="Address" className="ml-1 w-6 h-6 md:w-8 md:h-8 object-contain" />
              3405/105, Haqim Baqa, Chawri Bazar, Delhi-110006
            </a>
          </div>
        </div>
        {/* Right Section */}
        <div className="flex flex-col items-end w-full md:w-auto md:mr-5 mt-4 md:mt-0">
          <div>
            <div className="font-bold text-white text-2xl md:text-4xl mb-2 text-right">Company</div>
            <ul className="text-white text-base text-right">
              <li className="mb-1 hover:underline cursor-pointer">About Us</li>
              <li className="hover:underline cursor-pointer">Contact Us</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center md:justify-end mt-4 md:mt-0">
        <div className="text-xs md:text-sm text-white mb-2 mr-0 md:mr-2 text-center md:text-right">Copyright © 2025 AAR PEE TOOLS</div>
      </div>
    </footer>
  );
};

export default CopyrightPage;