import mongoose from "mongoose";

const variationSchema = new mongoose.Schema({
  sizeMM: { type: String },        // e.g., "1MM X 75MM"
  sizeInch: { type: String },      // e.g., '3/64" X 3"'
  prices: [
    {
      materialName: { type: String }, // e.g., "Material M-35 (5% Co)"
      price: { type: Number }         // e.g., 110
    }
  ],
  unit: { type: String } // e.g., "PCS"
});

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  image: {
    type: String,
    // required: true
  },
  type: {
    type: String,
    enum: ['simple', 'variable'],
    required: true
  },
  simple: {
    regularPrice: Number,
    sellingPrice: Number,
  },
  variable: {
    variations: [variationSchema]
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  }
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
