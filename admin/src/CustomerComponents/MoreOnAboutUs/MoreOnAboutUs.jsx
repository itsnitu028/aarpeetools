import React from 'react';
import moreOnAboutUsImg from '../../assets/moreOnAboutUs.png';
import moreOnAboutUsImg1 from '../../assets/moreOnAboutUs1.png';
import './MoreOnAboutUs.css';


const MoreOnAboutUs = () => {
  return (
    <div className="moau-container">
      <div className="moau-content">
        <h1 className="moau-title">
          From Workshop to Warehouse<br />
          We've Got You Covered.
        </h1>
        <p className="moau-desc">
          <span className="moau-bold">At AAR PEE TOOLS</span>, we believe quality starts with precision.<br />
          With decades of experience in manufacturing and supply,<br />
          we offer a wide range of reliable tools designed to meet industrial standards.<br />
          Durable, affordable, and built to perform — every time.
        </p>
        <button className="moau-btn">Our Products</button>
      </div>
      <div className="moau-imgs-wrapper">
        <div className="moau-flip-img">
          <div className="moau-flip-inner">
            <img src={moreOnAboutUsImg} alt="Cutting Tools" className="moau-img moau-img-front" />
            <img src={moreOnAboutUsImg1} alt="Cutting Tools" className="moau-img moau-img-back" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoreOnAboutUs;