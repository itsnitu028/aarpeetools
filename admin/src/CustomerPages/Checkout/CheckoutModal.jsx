import React, { useContext } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { MyContext } from '../../App'

const CheckoutModal = ({ open, onClose }) => {
  const { cartSubtotal } = useContext(MyContext);
  const shipping = cartSubtotal > 0 ? 80 : 0;
  const total = cartSubtotal + shipping;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Checkout</DialogTitle>
      <DialogContent>
        <div className='py-2'>
          <div className='mb-3'>
            <div className='flex items-center justify-between'>
              <span className='text-[14px]'>Items Subtotal</span>
              <span className='font-semibold'>Rs. {cartSubtotal.toFixed(2)}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-[14px]'>Shipping</span>
              <span className='font-semibold'>{shipping === 0 ? 'FREE' : `Rs. ${shipping.toFixed(2)}`}</span>
            </div>
            <Divider className='my-2' />
            <div className='flex items-center justify-between'>
              <span className='text-[16px] font-bold'>Total</span>
              <span className='text-red-500 font-bold'>Rs. {total.toFixed(2)}</span>
            </div>
          </div>

          <div className='mt-4'>
            <h4 className='font-semibold mb-2'>Payment methods</h4>
            <div className='grid grid-cols-2 gap-3'>
              <div className='border rounded p-3'>
                <div className='text-[13px] mb-2'>Scan and Pay via UPI apps</div>
                <div className='flex items-center justify-center'>
                  <div className='w-[160px] h-[160px] bg-[rgba(0,0,0,0.06)] grid place-items-center rounded'>
                    <div className='w-[120px] h-[120px] bg-[rgba(0,0,0,0.2)]'></div>
                  </div>
                </div>
                <div className='text-center text-[12px] mt-2 text-gray-500'>Demo QR placeholder</div>
              </div>
              <div className='border rounded p-3'>
                <div className='text-[13px] mb-2'>Cards / Netbanking</div>
                <div className='text-[12px] text-gray-600'>Use debit/credit cards or netbanking. (Demo)</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='outlined' color='inherit'>Close</Button>
        <Button onClick={onClose} variant='contained' color='success'>Pay Now</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CheckoutModal
