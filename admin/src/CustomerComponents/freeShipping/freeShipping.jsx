import React from 'react';
import { Truck } from 'lucide-react';
import './freeShipping.css';

const FreeShipping = () => {
  return (
    <div className="w-full bg-gray-100 border border-red-400 py-3 px-4 free-shipping-banner">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left side - Truck icon and FREE SHIPPING text */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Truck className="w-8 h-8 text-black truck-icon" />
          
          </div>
          <span className="font-extrabold text-black text-2xl uppercase tracking-wider drop-shadow-sm">
            FREE SHIPPING
          </span>
        </div>

        {/* Center - Main promotional text */}
        <div className="text-black text-lg font-semibold tracking-wide">
          Free Delivery On Orders Above Rs.2000
        </div>

        {/* Right side - Condition text */}
        <div className="font-bold text-black text-xl tracking-wide">
          - Only Rs.2000*
        </div>       
      </div>
    </div>
  );
};

export default FreeShipping;