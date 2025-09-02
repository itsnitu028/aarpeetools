import React, { useContext } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import carbide_end_mill from "../../assets/carbide end mill.png" 
import { Link } from 'react-router-dom';
import { MdOutlineDelete } from "react-icons/md";
import Button from '@mui/material/Button';


const CartPanel = ({toggleCartPanel}) => {
 
  return (
    <>
    
    <div className='flex items-center justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)]'>
        <h4 className='poppins-semibold'>Shopping Cart (1) </h4>
       <IoCloseSharp  className="text-[20px] cursor-pointer"
           onClick={toggleCartPanel(false)}/>
        
    </div>
    <div className="scroll w-full max-h-[300px] overflow-y-auto overflow-x-hidden py-3 px-4">
      <div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4">
      <div className="img w-[25%] overflow-hidden h-[100px] ">
      <Link to="/product/68894ca9f4821494023465df"
       className="block group" style={{ textDecoration: "none", color: "#000000" }} >
      <img src={carbide_end_mill} className="w-[100px] h-[100px] border-black border-1 rounded-md "/>
      </Link>
      </div>
      <div className="info w-[75%] pr-5 relative">
      <h4 className="text-[14px] font-[500]"><Link to="/product/68894ca9f4821494023465df"
       className="link transition-all hover:!text-red-500 text-[18px]" style={{ textDecoration: "none", color: "#000000" }} >Hss Tool Bit</Link></h4>
       <p className='flex items-center gap-5'>
        <span>Qty: <span>2</span></span>
        <span className='text-red-500 font-bold'>Price: Rs.50</span>
       </p>
       <MdOutlineDelete className='absolute top-[10px] right-[10px] cursor-pointer text-[20px] hover:text-red-500 transition-all' />
</div>
</div>
<div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4 mt-4">
      <div className="img w-[25%] overflow-hidden h-[120px] ">
      <img src={carbide_end_mill} className="w-[100px] h-[100px] border-black border-1 rounded-md"/>
      </div>
      <div className="info w-[75%] pr-5 relative">
      <h4 className="text-[14px] font-[500]"><Link to="/product/68894ca9f4821494023465df"
       className="link transition-all hover:!text-red-500 text-[18px]" style={{ textDecoration: "none", color: "#000000" }} >Hss Tool Bit</Link></h4>
       <p className='flex items-center gap-5'>
        <span>Qty: <span>2</span></span>
        <span className='text-red-500 font-bold'>Price: Rs.50</span>
       </p>
       <MdOutlineDelete className='absolute top-[10px] right-[10px] cursor-pointer text-[20px] hover:text-red-500 transition-all' />
</div>
</div>
<div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4 mt-4">
      <div className="img w-[25%] overflow-hidden h-[120px] ">
      <img src={carbide_end_mill} className="w-[100px] h-[100px] border-black border-1 rounded-md"/>
      </div>
      <div className="info w-[75%] pr-5 relative">
      <h4 className="text-[14px] font-[500]"><Link to="/product/68894ca9f4821494023465df"
       className="link transition-all hover:!text-red-500 text-[18px]" style={{ textDecoration: "none", color: "#000000" }}>Hss Tool Bit</Link></h4>
       <p className='flex items-center gap-5'>
        <span>Qty: <span>2</span></span>
        <span className='text-red-500 font-bold'>Price: Rs.50</span>
       </p>
       <MdOutlineDelete className='absolute top-[10px] right-[10px] cursor-pointer text-[20px] hover:text-red-500 transition-all' />
</div>
</div>
<div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4 mt-4">
      <div className="img w-[25%] overflow-hidden h-[120px] ">
      <img src={carbide_end_mill} className="w-[100px] h-[100px] border-black border-1 rounded-md"/>
      </div>
      <div className="info w-[75%] pr-5 relative">
      <h4 className="text-[14px] font-[500]"><Link to="/product/68894ca9f4821494023465df"
       className="link transition-all hover:!text-red-500 text-[18px]" style={{ textDecoration: "none", color: "#000000" }}>Hss Tool Bit</Link></h4>
       <p className='flex items-center gap-5'>
        <span>Qty: <span>2</span></span>
        <span className='text-red-500 font-bold'>Price: Rs.50</span>
       </p>
       <MdOutlineDelete className='absolute top-[10px] right-[10px] cursor-pointer text-[20px] hover:text-red-500 transition-all' />
</div>
</div>
<div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4 mt-4">
      <div className="img w-[25%] overflow-hidden h-[120px] ">
      <img src={carbide_end_mill} className="w-[100px] h-[100px] border-black border-1 rounded-md"/>
      </div>
      <div className="info w-[75%] pr-5 relative">
      <h4 className="text-[14px] font-[500]"><Link to="/product/68894ca9f4821494023465df"
       className="link transition-all hover:!text-red-500 text-[18px]" style={{ textDecoration: "none", color: "#000000" }} >Hss Tool Bit</Link></h4>
       <p className='flex items-center gap-5'>
        <span>Qty: <span>2</span></span>
        <span className='text-red-500 font-bold'>Price: Rs.50</span>
       </p>
       <MdOutlineDelete className='absolute top-[10px] right-[10px] cursor-pointer text-[20px] hover:text-red-500 transition-all' />
</div>
</div>
<div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4 mt-4">
      <div className="img w-[25%] overflow-hidden h-[120px] ">
      <img src={carbide_end_mill} className="w-[100px] h-[100px] border-black border-1 rounded-md"/>
      </div>
      <div className="info w-[75%] pr-5 relative">
      <h4 className="text-[14px] font-[500]"><Link to="/product/68894ca9f4821494023465df"
       className="link transition-all hover:!text-red-500 text-[18px]" style={{ textDecoration: "none", color: "#000000" }}>Hss Tool Bit</Link></h4>
       <p className='flex items-center gap-5'>
        <span>Qty: <span>2</span></span>
        <span className='text-red-500 font-bold'>Price: Rs.50</span>
       </p>
       <MdOutlineDelete className='absolute top-[10px] right-[10px] cursor-pointer text-[20px] hover:text-red-500 transition-all' />
</div>
</div>

    </div>

    <br />
  <div className='bottomSec absolute bottom-[10px] w-full'>
<div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex
items-center justify-between flex-col">
<div className="flex items-center justify-between w-full">
<span className='18px font-[600]'>1 Item</span>
<span className="text-red-500 font-bold">Rs. 100.00</span>
</div>
</div>
   <br />
<div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex
items-center justify-between flex-col">
<div className="flex items-center justify-between w-full">
<span className='18px font-[600]'>Sub-Total (Including Tax)</span>
<span className="text-red-500 font-bold">Rs. 100.00</span>
</div>
<div className="flex items-center justify-between w-full">
<span className='18px font-[600]'>Shipping</span>
<span className="text-red-500 font-bold">Rs. 80.00</span>
</div>
<div className="flex items-center justify-between w-full">
<span className='18px font-[600]'>Total Amount</span>
<span className="text-red-500 font-bold">Rs. 180.00</span>
</div>
<br/>
<div className="flex items-center justify-between w-full gap-5">
  <Link to="/cart" className='w-[100%]' >
  <Button className=" btn-lg w-full " variant="outlined" color='error'>View Cart</Button>
  </Link>
  <Link to="/checkout"  className='w-[100%]' >
  <Button className="btn-lg w-full" variant="contained" color="success">Checkout</Button>
  </Link>
</div>
</div>
</div>

    </>
    
  )
}

export default CartPanel