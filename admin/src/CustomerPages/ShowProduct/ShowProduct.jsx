import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar"
import './ShowProduct.css';

const ShowProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [showAllMaterials, setShowAllMaterials] = useState(false);
  const [sortBy, setSortBy] = useState('sizeMM');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:4000/customers/product/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
        
        // Set default selections for variable products
        if (data.type === 'variable' && data.variable?.variations?.length > 0) {
          setSelectedVariation(data.variable.variations[0]);
          if (data.variable.variations[0].prices?.length > 0) {
            setSelectedMaterial(data.variable.variations[0].prices[0]);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Sorted variations
  const sortedVariations = useMemo(() => {
    if (!product?.variable?.variations) return [];
    
    const sorted = [...product.variable.variations].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'sizeMM' || sortBy === 'sizeInch') {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      } else {
        aValue = String(aValue || '').toLowerCase();
        bValue = String(bValue || '').toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return sorted;
  }, [product, sortBy, sortOrder]);

  // Pagination
  const paginatedVariations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedVariations.slice(startIndex, endIndex);
  }, [sortedVariations, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedVariations.length / itemsPerPage);

  // Filtered materials
  const filteredMaterials = useMemo(() => {
    if (!selectedVariation?.prices) return [];
    return showAllMaterials ? selectedVariation.prices : selectedVariation.prices.slice(0, 10);
  }, [selectedVariation, showAllMaterials]);

  const handleVariationChange = (variation) => {
    setSelectedVariation(variation);
    if (variation.prices?.length > 0) {
      setSelectedMaterial(variation.prices[0]);
    } else {
      setSelectedMaterial(null);
    }
    setCurrentPage(1);
  };

  const handleMaterialChange = (material) => {
    setSelectedMaterial(material);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  if (loading) {
    return (
      <div className="show-product-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="show-product-container">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/')} className="back-button">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="show-product-container">
        <div className="error-message">
          <h2>Product Not Found</h2>
          <button onClick={() => navigate('/')} className="back-button">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="show-product-container">
        <div className="product-detail-wrapper">
         

          <div className="product-content">
            {/* Product Image */}
            <div className="product-image-section">
              {product.image ? (
                <img 
                  src={`http://localhost:4000/uploads/${product.image}`} 
                  alt={product.name}
                  className="product-image"
                />
              ) : (
                <div className="no-image-placeholder">
                  <span>No Image Available</span>
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="product-info-section">
              <h1 className="product-name">{product.name}</h1>
              
              {product.category && (
                <div className="product-category">
                  <span className="category-label">Category:</span>
                  <span className="category-name">{product.category.category}</span>
                </div>
              )}

              <div className="product-description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>

              {/* Simple Product Pricing */}
              {product.type === 'simple' && product.simple && (
                <div className="simple-product-pricing">
                  <h3>Pricing</h3>
                  <div className="price-details">
                    <div className="price-item">
                      <span className="price-label">Regular Price:</span>
                      <span className="price-value">₹{product.simple.regularPrice}</span>
                    </div>
                    <div className="price-item">
                      <span className="price-label">Selling Price:</span>
                      <span className="price-value selling-price">₹{product.simple.sellingPrice}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Variable Product Options */}
              {product.type === 'variable' && product.variable && (
                <div className="variable-product-options">
                  <h3>Product Options</h3>
                  
                  {/* Variations Table */}
                  {sortedVariations.length > 0 && (
                    <div className="variations-section">
                      <h4>Available Variations ({sortedVariations.length})</h4>
                      
                      <div className="variations-table-container">
                        <table className="variations-table">
                          <thead>
                            <tr>
                              <th onClick={() => handleSort('sizeMM')} className="sortable-header">
                                Size (MM)
                                {sortBy === 'sizeMM' && (
                                  <span className="sort-indicator">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                )}
                              </th>
                              <th onClick={() => handleSort('sizeInch')} className="sortable-header">
                                Size (Inch)
                                {sortBy === 'sizeInch' && (
                                  <span className="sort-indicator">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                )}
                              </th>
                              <th onClick={() => handleSort('unit')} className="sortable-header">
                                Unit
                                {sortBy === 'unit' && (
                                  <span className="sort-indicator">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                )}
                              </th>
                              <th>Materials</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedVariations.map((variation, index) => (
                              <tr 
                                key={index}
                                className={`variation-row ${selectedVariation === variation ? 'selected' : ''}`}
                                onClick={() => handleVariationChange(variation)}
                              >
                                <td>{variation.sizeMM || '-'}</td>
                                <td>{variation.sizeInch || '-'}</td>
                                <td>{variation.unit || '-'}</td>
                                <td>
                                  <span className="material-count">
                                    {variation.prices ? `${variation.prices.length} materials` : '0 materials'}
                                  </span>
                                </td>
                                <td>
                                  <button 
                                    className="select-variation-btn"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleVariationChange(variation);
                                    }}
                                  >
                                    Select
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="pagination">
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="pagination-btn"
                          >
                            Previous
                          </button>
                          
                          <div className="page-numbers">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                              const pageNum = i + 1;
                              return (
                                <button
                                  key={pageNum}
                                  onClick={() => setCurrentPage(pageNum)}
                                  className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                                >
                                  {pageNum}
                                </button>
                              );
                            })}
                            {totalPages > 5 && (
                              <span className="page-ellipsis">...</span>
                            )}
                          </div>
                          
                          <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="pagination-btn"
                          >
                            Next
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Materials Section */}
                  {selectedVariation && selectedVariation.prices && selectedVariation.prices.length > 0 && (
                    <div className="materials-section">
                      <div className="materials-header">
                        <h4>Available Materials ({selectedVariation.prices.length})</h4>
                        {selectedVariation.prices.length > 10 && (
                          <button
                            onClick={() => setShowAllMaterials(!showAllMaterials)}
                            className="toggle-materials-btn"
                          >
                            {showAllMaterials ? 'Show Less' : 'Show All'}
                          </button>
                        )}
                      </div>
                      
                      <div className="materials-grid">
                        {filteredMaterials.map((material, index) => (
                          <div 
                            key={index}
                            className={`material-card ${selectedMaterial === material ? 'selected' : ''}`}
                            onClick={() => handleMaterialChange(material)}
                          >
                            <div className="material-name">{material.materialName}</div>
                            <div className="material-price">₹{material.price}</div>
                          </div>
                        ))}
                      </div>
                      
                      {!showAllMaterials && selectedVariation.prices.length > 10 && (
                        <div className="materials-footer">
                          <span>Showing 10 of {selectedVariation.prices.length} materials</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Selected Options Summary */}
                  {selectedVariation && selectedMaterial && (
                    <div className="selected-options-summary">
                      <h4>Selected Options</h4>
                      <div className="summary-details">
                        <div className="summary-item">
                          <span className="summary-label">Size:</span>
                          <span className="summary-value">
                            {selectedVariation.sizeMM && `${selectedVariation.sizeMM}`}
                            {selectedVariation.sizeInch && ` (${selectedVariation.sizeInch})`}
                          </span>
                        </div>
                        <div className="summary-item">
                          <span className="summary-label">Material:</span>
                          <span className="summary-value">{selectedMaterial.materialName}</span>
                        </div>
                        <div className="summary-item">
                          <span className="summary-label">Price:</span>
                          <span className="summary-value price">₹{selectedMaterial.price}</span>
                        </div>
                        {selectedVariation.unit && (
                          <div className="summary-item">
                            <span className="summary-label">Unit:</span>
                            <span className="summary-value">{selectedVariation.unit}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="product-actions">
                <button className="add-to-cart-btn">
                  Add to Cart
                </button>
                <button className="buy-now-btn">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;