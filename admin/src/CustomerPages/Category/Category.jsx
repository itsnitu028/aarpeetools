import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../Navbar/Navbar.jsx'
import CopyrightPage from "../../CustomerComponents/CopyrightPage/CopyrightPage.jsx"
import redbasket from '../../assets/banner.png'
import './Category.css'
import Banner from '../../CustomerComponents/banner/banner.jsx'
import FreeShipping from '../../CustomerComponents/freeShipping/freeShipping.jsx'

const Category = () => {
 
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(10);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/customers/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      console.log('Fetched categories:', data);
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(category => {
    const matchesSearch = searchTerm === '' || 
      category.category.toLowerCase().includes(searchTerm.toLowerCase()) ;
    
    return matchesSearch;
  });

  // Pagination
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  };

 

  if (loading) {
    return (
      <div>
        <Navbar />
        
        <div className="category-page-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading categories...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
         <Banner />
        <div className="category-page-container">
          <div className="error-message">
            <h2>Error</h2>
            <p>{error}</p>
            <button onClick={fetchCategories} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <FreeShipping />
      
       {/* <div 
          className="banner-section"
         
        >
          <img 
            src={redbasket} 
            alt="Banner" 
            className='opacity-80 w-full h-full'
            
          />
        </div> */}
      <div className="category-page-container">
        {/* Banner Section */}
       

        <div className="category-page-header">
          <h1>Our Categories</h1>
          <p>Discover our wide range of high-quality cutting tools and equipment</p>
        </div>

        {/* Filters and Search */}
        <div className="filters-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
         
          </div>

        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <p>
            Showing {currentCategories.length} of {filteredCategories.length} categories
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Categories Grid */}
        {currentCategories.length > 0 ? (
          <div className="categories-grid">
            {currentCategories.map((category) => (
              <NavLink
                key={category._id}
                to={`/category/${category._id}`}
                className="category-card"
                style={{ textDecoration: 'none' }}
              >
                <div className="category-content">
                  
                  
                  <div className="category-info">
                    <h3 className="category-name">{category.category}</h3>
                    
               

                    <div className="category-actions">
                      <button className="view-category-btn">
                        View Products
                      </button>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        ) : (
          <div className="no-categories">
            <div className="no-categories-content">
              <h3>No categories found</h3>
              <p>Try adjusting your search criteria</p>
              
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>

            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`page-number ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        )}
      </div>
      <Banner />
      <CopyrightPage />
    </div>
  )
}

export default Category