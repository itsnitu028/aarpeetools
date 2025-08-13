import React from 'react';
import deliveryImg from '../../assets/Safe Delivery.png';
import bestQualityImg from '../../assets/Best Quality.png';
import customerSatisfactionImg from '../../assets/Customer Satisfaction.png';

const qualities = [
  {
    img: deliveryImg,
    title: "Fast Delivery",
    desc: (
      <>
        Service Available <br />
        Domestic and International
      </>
    ),
  },
  {
    img: bestQualityImg,
    title: "Best Quality",
    desc: (
      <>
        Premium quality you can trust <br />
        built to last, made to impress
      </>
    ),
  },
  {
    img: customerSatisfactionImg,
    title: "Customer Satisfaction",
    desc: (
      <>
        Trusted service with guaranteed <br />
        customer satisfaction
      </>
    ),
  },
];

const OurQualities = () => {
  return (
    <div className="bg-[#2c3e50] py-16 ">
      <div className="max-w-full mx-auto flex flex-col md:flex-row justify-evenly items-center gap-8">
        {qualities.map((q, idx) => (
          <div key={idx} className="flex flex-col items-center text-center flex-1">
            <div className="w-48 h-48 rounded-full  flex items-center justify-center mb-4 overflow-hidden">
              <img src={q.img} alt={q.title} className=" object-contain" />
            </div>
            <h3 className="text-white text-2xl font-bold mb-2">{q.title}</h3>
            <p className="text-white text-base font-light">{q.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurQualities;