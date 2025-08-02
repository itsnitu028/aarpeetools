import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../../Components/SideBar/SideBar';
import { MdAddShoppingCart } from 'react-icons/md';

const Add_Product = () => {
  const { register, handleSubmit, watch, reset } = useForm();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [variations, setVariations] = useState([]); // multiple variations

  const watchType = watch('type');
  const token =
    document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1] ||
    localStorage.getItem('auth-token');

  useEffect(() => {
    axios
      .get('http://localhost:4000/getCategories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  // Add a blank variation
  const addVariation = () => {
    setVariations((prev) => [
      ...prev,
      { sizeInch: '', sizeMM: '', unit: '', prices: [{ materialName: '', price: '' }] }
    ]);
  };

  // Update variation field
  const updateVariation = (index, field, value) => {
    const updated = [...variations];
    updated[index][field] = value;
    setVariations(updated);
  };

  // Add material-price row inside variation
  const addMaterialPrice = (variationIndex) => {
    const updated = [...variations];
    updated[variationIndex].prices.push({ materialName: '', price: '' });
    setVariations(updated);
  };

  // Update material-price field
  const updateMaterialPrice = (variationIndex, priceIndex, field, value) => {
    const updated = [...variations];
    updated[variationIndex].prices[priceIndex][field] = value;
    setVariations(updated);
  };

  // Remove material-price
  const removeMaterialPrice = (variationIndex, priceIndex) => {
    const updated = [...variations];
    updated[variationIndex].prices.splice(priceIndex, 1);
    setVariations(updated);
  };

  // Remove entire variation
  const removeVariation = (index) => {
    setVariations((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('type', data.type);
    formData.append('category', data.category);
    formData.append('image', data.image[0]);

    if (data.type === 'simple') {
      formData.append(
        'simple',
        JSON.stringify({
          regularPrice: data.regularPrice,
          sellingPrice: data.sellingPrice
        })
      );
    } else if (data.type === 'variable') {
      formData.append('variable', JSON.stringify({ variations }));
    }

    try {
      const response = await axios.post('http://localhost:4000/addProduct', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setMessage('Product added successfully');
        reset();
        setVariations([]);
        setTimeout(() => navigate('/api/admin/home'), 1000);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage('Failed to add product');
    }
  };

  return (
    <>
      {token && (
        <div className="min-h-screen bg-gradient-to-br from-[#2c3e50] to-[#1c2833] text-white">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 min-h-screen bg-[#1e293b]">
              <SideBar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl shadow-2xl p-10 w-full max-w-3xl">
                <h2 className="text-2xl font-bold text-center mb-10 flex items-center justify-center gap-3">
                  <MdAddShoppingCart className="text-4xl text-white/80" />
                  Add New Product
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <input
                    className="w-full p-3 rounded-lg text-white my-2 bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/40"
                    placeholder="Product Name"
                    {...register('name', { required: true })}
                  />

                  <textarea
                    className="w-full p-3 rounded-lg text-white my-2 bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/40"
                    placeholder="Description"
                    {...register('description', { required: true })}
                  />

                  <select
                    className="w-full p-3 rounded-lg my-2 bg-white/10 border border-white/30 text-gray focus:outline-none focus:ring-2 focus:ring-white/40"
                    {...register('category', { required: true })}
                  >
                    <option value="" className="text-white bg-gray-600">
                      Select Category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id} className="text-white bg-gray-600 ">
                        {cat.category}
                      </option>
                    ))}
                  </select>

                  <select
                    className="w-full p-3 rounded-lg my-2 bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                    {...register('type', { required: true })}
                  >
                    <option value="" className="text-white bg-gray-600">
                      Select Product Type
                    </option>
                    <option value="simple" className="text-white bg-gray-600">
                      Simple
                    </option>
                    <option value="variable" className="text-white bg-gray-600">
                      Variable
                    </option>
                  </select>

                  {/* Variable Product Fields */}
                  {watchType === 'variable' && (
                    <>
                      <button
                        type="button"
                        onClick={addVariation}
                        className="bg-green-600 px-4 py-2 rounded-lg"
                      >
                        + Add Variation
                      </button>

                      {variations.map((variation, vIndex) => (
                        <div
                          key={vIndex}
                          className="border p-3 my-3 rounded bg-white/20 flex flex-col gap-2"
                        >
                          <input
                            placeholder="Size (Inch)"
                            value={variation.sizeInch}
                            onChange={(e) => updateVariation(vIndex, 'sizeInch', e.target.value)}
                            className="p-2 bg-white/10 border border-white/30 rounded"
                          />
                          <input
                            placeholder="Size (MM)"
                            value={variation.sizeMM}
                            onChange={(e) => updateVariation(vIndex, 'sizeMM', e.target.value)}
                            className="p-2 bg-white/10 border border-white/30 rounded"
                          />
                          <input
                            placeholder="Unit"
                            value={variation.unit}
                            onChange={(e) => updateVariation(vIndex, 'unit', e.target.value)}
                            className="p-2 bg-white/10 border border-white/30 rounded"
                          />

                          {/* Materials Section */}
                          <div className="pl-4">
                            <p className="font-semibold">Materials & Prices</p>
                            {variation.prices.map((priceItem, pIndex) => (
                              <div
                                key={pIndex}
                                className="flex gap-2 items-center my-1"
                              >
                                <input
                                  placeholder="Material Name"
                                  value={priceItem.materialName}
                                  onChange={(e) =>
                                    updateMaterialPrice(vIndex, pIndex, 'materialName', e.target.value)
                                  }
                                  className="p-2 bg-white/10 border border-white/30 rounded"
                                />
                                <input
                                  placeholder="Price"
                                  value={priceItem.price}
                                  onChange={(e) =>
                                    updateMaterialPrice(vIndex, pIndex, 'price', e.target.value)
                                  }
                                  className="p-2 bg-white/10 border border-white/30 rounded"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeMaterialPrice(vIndex, pIndex)}
                                  className="bg-red-600 px-3 py-1 rounded"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}

                            <button
                              type="button"
                              onClick={() => addMaterialPrice(vIndex)}
                              className="bg-green-500 px-3 py-1 mt-2 rounded"
                            >
                              + Add Material
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeVariation(vIndex)}
                            className="bg-red-600 px-3 py-1 mt-3 rounded"
                          >
                            Remove Variation
                          </button>
                        </div>
                      ))}
                    </>
                  )}

                  {/* Image Upload */}
                  <input
                    type="file"
                    className="w-full px-3 py-2 my-2 rounded-lg bg-white/20 text-white border border-white/30 file:bg-gray-600 file:text-white file:rounded-md file:px-4 file:py-2 file:border-0 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...register('image', { required: true })}
                  />

                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-blue-600 my-2 hover:bg-blue-700 transition duration-300 text-white px-6 py-3 rounded-lg w-1/2"
                    >
                      Submit
                    </button>
                  </div>

                  {message && <p className="text-center mt-4 text-red-400">{message}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Add_Product;



// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import SideBar from '../../Components/SideBar/SideBar';
// import { MdAddShoppingCart } from 'react-icons/md';

// const Add_Product = () => {
//   const { register, handleSubmit, watch, reset } = useForm();
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [message, setMessage] = useState('');

//   const watchType = watch('type');
//   const token = document.cookie
//   .split('; ')
//   .find(row => row.startsWith('token='))
//   ?.split('=')[1] || localStorage.getItem('auth-token');

//   useEffect(() => {
//     axios
//       .get('http://localhost:4000/getCategories')
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error('Error fetching categories:', err));
//   }, []);

//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append('name', data.name);
//     formData.append('description', data.description);
//     formData.append('type', data.type);
//     formData.append('category', data.category);
//     formData.append('image', data.image[0]);

//     if (data.type === 'simple') {
//       formData.append(
//         'simple',
//         JSON.stringify({
//           regularPrice: data.regularPrice,
//           sellingPrice: data.sellingPrice,
//         })
//       );
//     } else if (data.type === 'variable') {
//       formData.append(
//         'variable',
//         JSON.stringify({
//           color: data.color,
//           size: data.size,
//         })
//       );
//     }

//     try {
//       const response = await axios.post('http://localhost:4000/addProduct', formData,{
//           headers: {
//              'Authorization': `Bearer ${token}`,
//           },
//       });
//       if (response.data.success) {
//         setMessage('Product added successfully');
//         reset();
//         setTimeout(() => navigate('/api/admin/home'), 1000);
//       } else {
//         setMessage(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage('Failed to add product');
//     }
//   };

//   return (
//     <>
//       {token && (
//         <div className="min-h-screen bg-gradient-to-br from-[#2c3e50] to-[#1c2833] text-white">
//           <div className="flex">
//             {/* Sidebar */}
//             <div className="w-64 min-h-screen bg-[#1e293b]">
//               <SideBar />
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 flex items-center justify-center p-10">
//               <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl shadow-2xl p-10 w-full max-w-3xl">
//                 <h2 className="text-2xl font-bold text-center mb-10 flex items-center justify-center gap-3">
//                   <MdAddShoppingCart className="text-4xl text-white/80" />
//                   Add New Product
//                 </h2>

//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                   <input
//                     className="w-full p-3 rounded-lg text-white my-2 bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
//                     placeholder="Product Name"
//                     {...register('name', { required: true })}
//                   />

//                   <textarea
//                     className="w-full p-3 rounded-lg text-white my-2 bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
//                     placeholder="Description"
//                     {...register('description', { required: true })}
//                   />

//                   <select
//                     className="w-full p-3 rounded-lg my-2 bg-white/10 border border-white/30 text-gray focus:outline-none focus:ring-2 focus:ring-white/40"
//                     {...register('category', { required: true })}
//                   >
//                     <option value="" className='text-white bg-gray-600'>Select Category</option>
//                     {categories.map((cat) => (
//                       <option key={cat._id} value={cat._id} className='text-white bg-gray-600 ' >
//                         {cat.category}
//                       </option>
//                     ))}
//                   </select>

//                   <select
//                     className="w-full p-3 rounded-lg my-2 bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
//                     {...register('type', { required: true })}
//                   >
//                     <option value="" className='text-white bg-gray-600'>Select Product Type</option>
//                     <option value="simple" className='text-white bg-gray-600'>Simple</option>
//                     <option value="variable" className='text-white bg-gray-600'>Variable</option>
//                   </select>

//                   {watchType === 'simple' && (
//                     <>
//                       <input
//                         className="w-full p-3 rounded-lg my-2 bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
//                         placeholder="Regular Price"
//                         {...register('regularPrice')}
//                       />
//                       <input
//                         className="w-full p-3 rounded-lg my-2 bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
//                         placeholder="Selling Price"
//                         {...register('sellingPrice')}
//                       />
//                     </>
//                   )}

//                   {watchType === 'variable' && (
//                     <>
//                       <input
//                         className="w-full p-3 rounded-lg bg-white/10 my-2 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
//                         placeholder="Color"
//                         {...register('color')}
//                       />
//                       <input
//                         className="w-full p-3 rounded-lg bg-white/10 my-2 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
//                         placeholder="Size"
//                         {...register('size')}
//                       />
//                     </>
//                   )}

//                   <input
//                     type="file"
//                     className="w-full px-3 py-2 my-2 rounded-lg bg-white/20 text-white border border-white/30 file:bg-gray-600 file:text-white file:rounded-md file:px-4 file:py-2 file:border-0 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     {...register('image', { required: true })}
//                   />

//                   <div className="text-center">
//                     <button
//                       type="submit"
//                       className="bg-blue-600 my-2 hover:bg-blue-700 transition duration-300 text-white px-6 py-3 rounded-lg w-1/2"
//                     >
//                       Submit
//                     </button>
//                   </div>

//                   {message && (
//                     <p className="text-center mt-4 text-red-400">{message}</p>
//                   )}
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Add_Product;

