# ShowProduct Component

## Overview
The ShowProduct component is a comprehensive product detail page that displays product information based on the Product schema. It supports both simple and variable product types with interactive selection options.

## Features

### Product Display
- **Product Image**: Displays the product image with fallback for missing images
- **Product Name**: Large, prominent display of the product name
- **Category**: Shows the product category with styled badge
- **Description**: Displays the product description in a formatted section

### Product Type Support

#### Simple Products
- Displays regular price and selling price
- Clean, card-based layout for pricing information
- Highlighted selling price for better visibility

#### Variable Products
- **Variations Selection**: Interactive cards for selecting product variations (size, unit)
- **Material Selection**: Grid layout for selecting different materials and their prices
- **Options Summary**: Real-time summary of selected options with pricing
- **Dynamic Updates**: Selections update the summary automatically

### User Experience
- **Loading States**: Spinner animation while fetching product data
- **Error Handling**: Graceful error messages with navigation options
- **Responsive Design**: Mobile-friendly layout with responsive grid
- **Interactive Elements**: Hover effects and visual feedback for selections
- **Navigation**: Back button for easy navigation

### Action Buttons
- **Add to Cart**: Green button for adding items to cart
- **Buy Now**: Red button for immediate purchase
- Both buttons have hover effects and modern styling

## API Integration

### Endpoints Used
- `GET /customers/product/:id` - Fetch product details by ID
- `GET /customers/products` - Fetch all products (for navigation)

### Data Structure
The component expects product data in the following format:

```javascript
{
  _id: string,
  name: string,
  description: string,
  image: string,
  type: 'simple' | 'variable',
  category: {
    _id: string,
    name: string
  },
  simple: {
    regularPrice: number,
    sellingPrice: number
  },
  variable: {
    variations: [
      {
        sizeMM: string,
        sizeInch: string,
        unit: string,
        prices: [
          {
            materialName: string,
            price: number
          }
        ]
      }
    ]
  }
}
```

## Usage

### Route Configuration
The component is configured to work with the route `/product/:id` where `:id` is the product ID.

### Navigation
```javascript
// Navigate to product detail page
navigate(`/product/${productId}`);

// Navigate back
navigate(-1);
```

## Styling

### CSS Classes
- `.show-product-container` - Main container with gradient background
- `.product-detail-wrapper` - White card wrapper with shadow
- `.product-content` - Grid layout for image and info sections
- `.variation-card` - Interactive cards for variation selection
- `.material-card` - Interactive cards for material selection
- `.selected-options-summary` - Summary section for selected options

### Responsive Breakpoints
- **Desktop**: Two-column layout (image + info)
- **Tablet (768px)**: Single column layout
- **Mobile (480px)**: Compact layout with adjusted spacing

## Dependencies
- React Router DOM for navigation
- CSS for styling (no external UI libraries required)
- Fetch API for data retrieval

## Error Handling
- Network errors with user-friendly messages
- Product not found scenarios
- Loading states for better UX
- Graceful fallbacks for missing data

## Future Enhancements
- Add to cart functionality
- Wishlist integration
- Product reviews and ratings
- Related products section
- Image gallery for multiple product images
- Quantity selector
- Share product functionality 