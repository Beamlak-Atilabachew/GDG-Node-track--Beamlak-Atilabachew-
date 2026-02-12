import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    console.log('GET /products called');
    const { category, minPrice, maxPrice } = req.query;

    let filter = {};

    if (category) filter.category = category;

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    console.log('Filter:', filter);
    const products = await Product.find(filter);
    console.log('Products found:', products.length);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    console.error('Error in getProducts:', err);
    res.status(500).json({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ msg: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    if (!name || price < 0 || stock < 0) {
      return res.status(400).json({ msg: "Invalid product data" });
    }

    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product)
      return res.status(404).json({ msg: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product)
      return res.status(404).json({ msg: "Product not found" });

    res.json({ msg: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
