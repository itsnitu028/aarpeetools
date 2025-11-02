import React, { useContext } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import carbide_end_mill from "../../assets/carbide end mill.png" 
import { Link } from 'react-router-dom';
import { MdOutlineDelete } from "react-icons/md";
import Button from '@mui/material/Button';
import { MyContext } from "../../App";


const CartPanel = ({toggleCartPanel}) => {
  const { cartItems, cartSubtotal, removeFromCart, updateCartItemQuantity, setOpenCheckout } = useContext(MyContext);
  const itemCount = cartItems.reduce((sum, it) => sum + (it.quantity || 0), 0);
 
  return (
    <>
    
    <div className='flex items-center justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)]'>
        <h4 className='poppins-semibold'>Shopping Cart ({itemCount}) </h4>
       <IoCloseSharp  className="text-[20px] cursor-pointer"
           onClick={toggleCartPanel(false)}/>
        
    </div>
    <div className="scroll w-full max-h-[300px] overflow-y-auto overflow-x-hidden py-3 px-4">
      {cartItems.length === 0 && (
        <div className="text-center py-8 text-gray-500">Your cart is empty.</div>
      )}
      {cartItems.map((item, index) => {
        const key = `${item.productId}|${item.variationKey || ''}|${item.materialName || ''}`;
        return (
        <div key={key} className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4">
      <div className="img w-[25%] overflow-hidden h-[100px] ">
      <Link to={`/product/${item.productId}`}
       className="block group" style={{ textDecoration: "none", color: "#000000" }} >
      <img src={item.imageUrl || carbide_end_mill} className="w-[100px] h-[100px] border-black border-1 rounded-md "/>
      </Link>
      </div>
      <div className="info w-[75%] pr-5 relative">
      <h4 className="text-[14px] font-[500]"><Link to={`/product/${item.productId}`}
       className="link transition-all hover:!text-red-500 text-[18px]" style={{ textDecoration: "none", color: "#000000" }} >{item.name}</Link></h4>
       <p className='flex items-center gap-3 flex-wrap'>
        {item.sizeLabel && <span className="text-sm">Size: <span>{item.sizeLabel}</span></span>}
        {item.unit && <span className="text-sm">Unit: <span>{item.unit}</span></span>}
        {item.materialName && <span className="text-sm">Material: <span>{item.materialName}</span></span>}
       </p>
       <p className='flex items-center gap-5'>
        <span className="flex items-center gap-2">Qty: 
          <button className='px-2 border' onClick={()=>updateCartItemQuantity(index, (item.quantity||1)-1)} disabled={(item.quantity||1) <= 1}>-</button>
          <span>{item.quantity}</span>
          <button className='px-2 border' onClick={()=>updateCartItemQuantity(index, (item.quantity||1)+1)}>+</button>
        </span>
        <span className='text-red-500 font-bold'>Price: Rs.{Number(item.price) * (item.quantity||0)}</span>
       </p>
       <MdOutlineDelete onClick={()=>removeFromCart(index)} className='absolute top-[10px] right-[10px] cursor-pointer text-[20px] hover:text-red-500 transition-all' />
</div>
</div>
      )})}

    </div>

    <br />
  <div className='bottomSec absolute bottom-[10px] w-full'>
<div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex
items-center justify-between flex-col">
<div className="flex items-center justify-between w-full">
<span className='18px font-[600]'>{itemCount} {itemCount===1? 'Item':'Items'}</span>
<span className="text-red-500 font-bold">Rs. {cartSubtotal.toFixed(2)}</span>
</div>
</div>
   <br />
<div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex
items-center justify-between flex-col">
<div className="flex items-center justify-between w-full">
<span className='18px font-[600]'>Sub-Total (Including Tax)</span>
<span className="text-red-500 font-bold">Rs. {cartSubtotal.toFixed(2)}</span>
</div>
<div className="flex items-center justify-between w-full">
<span className='18px font-[600]'>Shipping</span>
<span className="text-red-500 font-bold">Rs. 80.00</span>
</div>
<div className="flex items-center justify-between w-full">
<span className='18px font-[600]'>Total Amount</span>
<span className="text-red-500 font-bold">Rs. {(cartSubtotal + 80).toFixed(2)}</span>
</div>
<br/>
{/* <div className="flex items-center justify-between w-full gap-5">
  <Link to="/cart" className='w-[100%]' >
  <Button className=" btn-lg w-full " variant="outlined" color='error'>View Cart</Button>
  </Link>
  <button onClick={()=>{ setOpenCheckout(true); toggleCartPanel(false)(); }} className='w-[100%]'>
  <Button className="btn-lg w-full" variant="contained" color="success">Checkout</Button>
  </button>
</div> */}
<div className="flex items-center justify-between w-full gap-5">

{/*  View Cart */}
<Button
  component={Link}
  to="/cart"
  className="btn-lg w-full"
  variant="outlined"
  color="error"
  fullWidth
>
  View Cart
</Button>

{/*  Checkout */}
<Button
  onClick={() => {
    setOpenCheckout(true);
    toggleCartPanel(false)();
  }}
  className="btn-lg w-full"
  variant="contained"
  color="success"
  fullWidth
>
  Checkout
</Button>

</div>
</div>
</div>

    </>
    
  )
}

export default CartPanel