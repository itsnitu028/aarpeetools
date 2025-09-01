import React, { useContext } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import carbide_end_mill from "../../assets/carbide end mill.png" 
import { Link } from 'react-router-dom';


const CartPanel = ({toggleCartPanel}) => {
 
  return (
    <>
    
    <div className='flex items-center justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)]'>
        <h4 className='poppins-semibold'>Shopping Cart (1) </h4>
       <IoCloseSharp  className="text-[20px] cursor-pointer"
           onClick={toggleCartPanel(false)}/>
        
    </div>
    <div className="scroll w-full max-h-[600px] overflow-y-auto overflow-x-hidden py-3 px-4">
      <div className="cartItem w-full flex items-center gap-4">
      <div className="img w- [30%]">
      <img src={carbide_end_mill} className="w-[100px] h-[100px]"/>
      </div>
      <div className="info w-[70%]">
      <h4 className="text-[16px] font-[500]"><Link to="/product/68894ca9f4821494023465df"
       className="link" style={{ textDecoration: "none", color: "#000000" }}>Hss Tool Bit</Link></h4>
</div>
</div>
    </div>
    </>
    
  )
}

export default CartPanel