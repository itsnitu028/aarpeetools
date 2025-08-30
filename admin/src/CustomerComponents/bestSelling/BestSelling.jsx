import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cuttingTools from "../../assets/cutting tools.png";
import cuttingTools1 from "../../assets/cutting tools 1.png";
import carbideDrill from "../../assets/image.png";
import carbideReamer from "../../assets/bg.png";
import taperShank from "../../assets/Mask group.png";
import slotDrill from "../../assets/logo-new.png";
import { useState } from 'react';
import "./BestSelling.css";


const products = [
    {
      name: "HSS Center Drill",
      price: 299,
      oldPrice: 400,
      image: cuttingTools,
    },
    {
      name: "HSS End Mill",
      price: 499,
      oldPrice: 650,
      image: cuttingTools1,
    },
    {
      name: "Carbide Drill Bit",
      price: 799,
      oldPrice: 950,
      image: carbideDrill,
    },
    {
      name: "Solid Carbide Reamer",
      price: 599,
      oldPrice: 800,
      image: carbideReamer,
    },
    {
      name: "HSS Taper Shank Drill",
      price: 399,
      oldPrice: 550,
      image: taperShank,
    },
    {
      name: "HSS Slot Drill",
      price: 349,
      oldPrice: 500,
      image: slotDrill,
    },
  ];

const BestSelling = () => {
   
    const [hoveredIndex, setHoveredIndex] = useState(null);

  
  
     const settings = {
    dots:true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div>
      
    <div style={{ width: '95%', margin: '0 auto' }}>

    <div className="font-bold text-5xl py-5" style={{ textAlign: "center", color: "#bd0000" }}>Best Selling Products</div>
      <Slider {...settings}>
        {products.map((product, idx) => (
          <div key={idx} style={{ padding: '0 16px', display: 'flex', justifyContent: 'center' }}>
            <div className="product-card mt-4" style={{
               width: 300,
               height: 350,
               border: "2px solid #ccc",
               padding: 16,
               borderRadius: 8,
               background: '#fff',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'flex-start',
               gap:2,
               overflow:"hidden"
            }}>
              <img
                className="product-image"
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  overflow:"hidden",
                  marginBottom: 24
                }}
              />
              <h4 style={{ margin: 0, textAlign: "center" }}>{product.name}</h4>
              <p style={{ margin: "8px 0 0 0", textAlign: "center" }}>
                Rs. {product.price}{" "}
                <span style={{ textDecoration: "line-through", color: "#888" }}>
                  Rs. {product.oldPrice}
                </span>
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    </div>
    );
}

export default BestSelling