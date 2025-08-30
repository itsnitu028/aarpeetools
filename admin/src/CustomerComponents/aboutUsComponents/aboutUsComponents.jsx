import React from 'react';

const AboutUsComponents = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-8 px-2">
      <div className="text-5xl font-bold mb-4 text-[#bd0000] text-center">
        About Us
      </div>
      <div className="max-w-9/10 text-xl/10 mb-8 text-[#000] text-justify ">
        Established in 1995, AAR PEE TOOLS has been a trusted name in the industry, committed to delivering high-quality cutting tools that meet the evolving needs of our clients. With a strong focus on precision, durability, and innovation, we specialize in manufacturing HSS cutting tools, carbide end mills, drills, and more. Our products are globally recognized for their exceptional performance, reliability, and sturdiness, setting new benchmarks in the market.
      </div>
      <button
        className="px-8 py-3 rounded-full font-medium bg-[#bd0000] text-white text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#BE3144] mx-auto hover:text-black"
        style={{ borderRadius: '9999px' }}
      >
        Learn More
      </button>
    </div>
  );
};

export default AboutUsComponents; 