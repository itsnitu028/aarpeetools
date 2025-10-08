import React, { useContext } from 'react'
import Navbar from '../../CustomerPages/Navbar/Navbar'
import FreeShipping from '../../CustomerComponents/freeShipping/freeShipping'
import { FaShoppingBag, FaMinus, FaPlus } from 'react-icons/fa'
import { MyContext } from '../../App'
import { Link } from 'react-router-dom'
import carbide_end_mill from "../../assets/carbide end mill.png"
import SuggestedProducts from '../../CustomerComponents/SuggestedProducts/SuggestedProducts'
import CopyrightPage from '../../CustomerComponents/CopyrightPage/CopyrightPage'

const CartPage = () => {
  const { cartItems, cartSubtotal, removeFromCart, updateCartItemQuantity, setOpenCheckout } = useContext(MyContext);
  const itemCount = cartItems.reduce((sum, it) => sum + (it.quantity || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="navbar-section">
        <Navbar />
      </div>

      <div className='mb-15'>
        <FreeShipping />
      </div>

      <div className="cartpage-section container mx-auto px-4 py-8 my-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Cart Content Area */}
          <div className="flex-1 bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">YOUR CART</h1>
              <div className="bg-blue-600 text-white px-4 py-2 rounded mb-6">
                There are {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
              </div>

              {/* Product Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Product</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Unit Price</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Quantity</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Subtotal</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-8 text-gray-500">
                          Your cart is empty.
                        </td>
                      </tr>
                    )}
                    {cartItems.map((item, index) => {
                      const key = `${item.productId}|${item.variationKey || ''}|${item.materialName || ''}`;
                      return (
                        <tr key={key} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-200`}>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-4">
                              <Link to={`/product/${item.productId}`} className="block">
                                <img 
                                  src={item.imageUrl || carbide_end_mill} 
                                  alt={item.name}
                                  className="w-20 h-20 object-cover rounded border border-gray-300"
                                />
                              </Link>
                              <div>
                                <Link 
                                  to={`/product/${item.productId}`}
                                  className="font-medium text-gray-800 text-sm hover:text-red-500 transition-colors"
                                >
                                  {item.name}
                                </Link>
                                <div className="mt-1 space-x-3 text-xs text-gray-600">
                                  {item.sizeLabel && <span>Size: {item.sizeLabel}</span>}
                                  {item.unit && <span>Unit: {item.unit}</span>}
                                  {item.materialName && <span>Material: {item.materialName}</span>}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-gray-700">Rs {item.price}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => updateCartItemQuantity(index, (item.quantity || 1) - 1)}
                                disabled={(item.quantity || 1) <= 1}
                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <FaMinus className="text-xs" />
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity || 1}</span>
                              <button 
                                onClick={() => updateCartItemQuantity(index, (item.quantity || 1) + 1)}
                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                              >
                                <FaPlus className="text-xs" />
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-medium text-gray-800">Rs. {Number(item.price) * (item.quantity || 0)}</span>
                          </td>
                          <td className="py-4 px-4">
                            <button 
                              onClick={() => removeFromCart(index)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Cart Totals Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">CART TOTALS</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">{itemCount} {itemCount === 1 ? 'Item' : 'Items'}</span>
                  <span className="text-red-600 font-medium">Rs. {cartSubtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Sub-Total (Including Tax)</span>
                  <span className="text-red-600 font-medium">Rs. {cartSubtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Shipping</span>
                  <span className="text-red-600 font-medium">Rs. 80.00</span>
                </div>
                
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="text-gray-800 font-semibold">Total Amount</span>
                  <span className="text-red-600 font-bold text-lg">Rs. {(cartSubtotal + 80).toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={() => setOpenCheckout(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <FaShoppingBag />
                <span>Checkout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <SuggestedProducts />
      <CopyrightPage />
    </div>
  )
}

export default CartPage