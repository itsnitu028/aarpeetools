import React from 'react';
import logo from '../../assets/logo-new.png'; // Adjust if your logo filename is different

const CopyrightPage = () => {
  return (
    <footer className="bg-[#be3144] text-[#11162a] pt-8 pb-2 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between">
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <img src={logo} alt="AAR PEE TOOLS" className="h-14 w-14 object-contain" />
            <span className="font-bold text-xl tracking-widest">AAR PEE TOOLS</span>
          </div>
          <div className="h-1 w-56 bg-[#11162a] mb-4"></div>
          <div className="flex items-center gap-2 mb-2">
            {/* Phone Icon */}
            <svg className="w-6 h-6" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a2 2 0 011.94 1.52l.7 2.8a2 2 0 01-.45 1.95l-1.27 1.27a16.06 16.06 0 006.6 6.6l1.27-1.27a2 2 0 011.95-.45l2.8.7A2 2 0 0121 18.72V21a2 2 0 01-2 2h-1C7.82 23 1 16.18 1 8V7a2 2 0 012-2z" />
            </svg>
            <span className="text-white">(+91) 8178160362</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            {/* Email Icon */}
            <svg className="w-6 h-6" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v4" />
            </svg>
            <span className="text-white">ladaarora1@yahoo.in</span>
          </div>
          <div className="flex items-center gap-2 mb-6">
            {/* Home Icon */}
            <svg className="w-6 h-6" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v6a2 2 0 002 2h4a2 2 0 002-2v-6m-6 0h6" />
            </svg>
            <span className="text-white">3405/105, HajiM Baqa, Chawri Bazar, Delhi-110006</span>
          </div>
          <div className="mt-4 mb-2 font-bold text-2xl text-[#11162a]">Get In Touch</div>
          <div className="flex gap-4 mb-4">
            {/* Instagram */}
            <a href="#" className="text-white hover:text-[#11162a]">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <circle cx="17.5" cy="6.5" r="1" />
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" className="text-white hover:text-[#11162a]">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            {/* WhatsApp */}
            <a href="#" className="text-white hover:text-[#11162a]">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21.05 16.54A9 9 0 003.5 6.5l-1.44 4.13a1 1 0 00.27 1.09l2.2 2.2a1 1 0 001.09.27l4.13-1.44a9 9 0 0010.54 10.54l-1.44-4.13a1 1 0 00-.27-1.09l-2.2-2.2a1 1 0 00-1.09-.27z" />
              </svg>
            </a>
          </div>
        </div>
        {/* Right Section */}
        <div className="flex-1 flex flex-col items-end justify-between mt-8 md:mt-0">
          <div>
            <div className="font-bold text-2xl mb-2">Company</div>
            <ul className="text-white text-base">
              <li className="mb-1 hover:underline cursor-pointer">About Us</li>
              <li className="hover:underline cursor-pointer">Contact Us</li>
            </ul>
          </div>
          <div className="mt-auto text-sm text-[#11162a] mb-2">
            Copyright © 2025 AAR PEE TOOLS
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CopyrightPage;