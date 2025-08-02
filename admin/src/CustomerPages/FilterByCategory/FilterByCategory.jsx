import React, { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import Navbar from '../Navbar/Navbar.jsx'
import CopyrightPage from "../../CustomerComponents/CopyrightPage/CopyrightPage.jsx"
import redbasket from '../../assets/banner.png'
import './FilterByCategory.css'

const FilterByCategory = () => {
  const { id: categoryId } = useParams();
  const [isHovered, setIsHovered] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  useEffect(() => {
    if (categoryId) {
      fetchCategoryDetails();
      fetchProductsByCategory();
    } else {
      setLoading(false);
      setError('No category ID provided');
    }
  }, [categoryId]);

  const fetchCategoryDetails = async () => {
    try {
      const response = await fetch(`http://localhost:4000/customers/categories/${categoryId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch category details');
      }
      const data = await response.json();
      setCategory(data);
    } catch (err) {
      console.error('Error fetching category details:', err);
    }
  };

  const fetchProductsByCategory = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:4000/customers/products/category/${categoryId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
        setError('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search term and price range
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesPrice = priceRange === 'all' || 
      (priceRange === 'low' && product.price <= 100) ||
      (priceRange === 'medium' && product.price > 100 && product.price <= 500) ||
      (priceRange === 'high' && product.price > 500);
    
    return matchesSearch && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.productName.toLowerCase().localeCompare(b.productName.toLowerCase());
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      default:
        return 0;
    }
  });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSortBy('name');
    setPriceRange('all');
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="filter-category-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="filter-category-container">
          <div className="error-message">
            <h2>Error</h2>
            <p>{error}</p>
            <button onClick={fetchProductsByCategory} className="retry-button">
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
      <div className="filter-category-container">
        {/* Banner Section */}
        <div 
          className="banner-section"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img 
            src={redbasket} 
            alt="Banner" 
            className={`banner-image ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
        </div>

        {/* Header Section */}
        <div className="category-header">
          <div className="breadcrumb">
            <NavLink to="/categories" className="breadcrumb-link">Categories</NavLink>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">{category?.category || 'Products'}</span>
          </div>
          <h1>{category?.category || 'Products'}</h1>
          {category?.description && (
            <p className="category-description">{category.description}</p>
          )}
          

        </div>

        {/* Filters and Search */}
        <div className="filters-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <i className="search-icon">🔍</i>
          </div>

          <div className="filter-controls">
            <div className="filter-group">
              <label>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Price Range:</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Prices</option>
                <option value="low">Under $100</option>
                <option value="medium">$100 - $500</option>
                <option value="high">Over $500</option>
              </select>
            </div>

            <button onClick={clearFilters} className="clear-filters-btn">
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <p>
            Showing {currentProducts.length} of {sortedProducts.length} products
            {searchTerm && ` for "${searchTerm}"`}
            {category && ` in ${category.category}`}
          </p>
        </div>

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <div className="products-grid">
            {currentProducts.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image-container">
                  {product.imageUrls && product.imageUrls.length > 0 ? (
                    <img 
                      src={product.imageUrls[0]} 
                      alt={product.productName}
                      className="product-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className="product-placeholder"
                    style={{ 
                      display: product.imageUrls && product.imageUrls.length > 0 ? 'none' : 'flex' 
                    }}
                  >
                    <span className="product-icon">📦</span>
                  </div>
                </div>

                <div className="product-content">
                  <h3 className="product-name" title={product.productName}>
                    {product.productName}
                  </h3>
                  
                  {product.description && (
                    <div className="product-description-wrapper">
                      <p className="product-description">
                        {product.description.length > 100
                          ? `${product.description.substring(0, 100)}...`
                          : product.description}
                      </p>
                    </div>
                  )}

                  <div className="product-pricing">
                    <div className="simple-pricing">
                      <span className="price-label">Price:</span>
                      <span className="selling-price">₹{product.price}</span>
                    </div>
                  </div>

                  {product.stock !== undefined && (
                    <div className="product-stock">
                      <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                        {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                      </span>
                    </div>
                  )}

                  <div className="product-actions">
                    <button 
                      onClick={() => window.location.href = `/product/${product._id}`}
                      className="view-details-btn"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-products">
            <div className="no-products-content">
              <h3>No products found</h3>
              <p>Try adjusting your search criteria or filters</p>
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear All Filters
              </button>
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
      <CopyrightPage />
    </div>
  )
}

export default FilterByCategory