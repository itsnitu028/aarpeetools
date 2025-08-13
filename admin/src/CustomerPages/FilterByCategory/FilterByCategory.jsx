import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import './FilterByCategory.css';
import CopyrightPage from "../../CustomerComponents/CopyrightPage/CopyrightPage.jsx"

const FilterByCategory = () => {
  const { id: categoryId } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('name');
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

  // Get product price (for sorting)
  const getProductPrice = (product) => {
    if (product.type === 'simple' && product.simple) {
      return product.simple.sellingPrice || 0;
    }
    if (product.type === 'variable' && product.variable?.variations?.[0]?.prices?.[0]) {
      return product.variable.variations[0].prices[0].price || 0;
    }
    return 0;
  };

  // Filter products based on search term and type
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'all' || product.type === selectedType;

    return matchesSearch && matchesType;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return getProductPrice(a) - getProductPrice(b);
      case 'price-high':
        return getProductPrice(b) - getProductPrice(a);
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

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSortBy('name');
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="product-page-container">
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
        <div className="product-page-container">
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
      <div className="product-page-container">
        {/* Header */}
        <div className="product-page-header">
          <h1>{category?.category || 'Products'}</h1>
          <p>Discover our wide range of high-quality cutting tools and equipment</p>
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
              <label>Type:</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Types</option>
                <option value="simple">Simple</option>
                <option value="variable">Variable</option>
              </select>
            </div>

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
              <div
                key={product._id}
                className="product-card"
                onClick={() => handleProductClick(product._id)}
              >
               <div className="product-image-container">
  {product.image ? (
    <img
      src={`http://localhost:4000/uploads/${product.image}`}
      alt={product.name}
      className="product-image"
    />
  ) : product.imageUrls && product.imageUrls.length > 0 ? (
    <img
      src={product.imageUrls[0]}
      alt={product.name}
      className="product-image"
    />
  ) : (
    <div className="no-image-placeholder">
      <span>No Image</span>
    </div>
  )}
  <div className="product-type-badge">
    {product.type === 'variable' ? 'Variable' : 'Simple'}
  </div>
</div>

                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>

                  {product.category && (
                    <div className="product-category">
                      {product.category.category}
                    </div>
                  )}

                  <p className="product-description">
                    {product.description?.length > 100
                      ? `${product.description.substring(0, 100)}...`
                      : product.description}
                  </p>

                  <div className="product-pricing">
                    {product.type === 'simple' && product.simple ? (
                      <div className="simple-pricing">
                        <span className="regular-price">₹{product.simple.regularPrice}</span>
                        <span className="selling-price">₹{product.simple.sellingPrice}</span>
                      </div>
                    ) : product.type === 'variable' && product.variable?.variations?.[0]?.prices?.[0] ? (
                      <div className="variable-pricing">
                        <span className="price-label">Starting from:</span>
                        <span className="selling-price">₹{product.variable.variations[0].prices[0].price}</span>
                      </div>
                    ) : (
                      <div className="no-price">
                        <span>Price not available</span>
                      </div>
                    )}
                  </div>

                  <div className="product-actions">
                    <button className="view-details-btn">
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
              <p>Try adjusting your search or filter criteria</p>
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
  );
};

export default FilterByCategory;
