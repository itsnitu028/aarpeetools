import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div>
        <div className=' text-center'>
       <h1 className='m-auto w-100 h-100 flex justify-center items-center' > 404 Page Not Found </h1>
       <p className='text-lg'> The page you are looking for does not exist. </p>
       <Link to='/' className='text-blue-500'> Go to Home </Link>
       </div>
        </div>
  )
}

export default PageNotFound