import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";



// CREATE ORDER (POST /orders)
export const createOrder = async (req, res) => {
  try {
    const { customerName, customerPhone } = req.body;

    // Validate required fields
    if (!customerName || !customerPhone) {
      return res.status(400).json({ 
        message: "Customer name and phone are required" 
      });
    }

    // Get the cart (single cart document with items array)
    const cart = await Cart.findOne().populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let items = [];
    let total = 0;

    for (let item of cart.items) {
      const product = item.productId;

      // Check stock
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} is out of stock`,
        });
      }

      // Reduce stock
      product.stock -= item.quantity;
      await product.save();

      items.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      total += item.quantity * product.price;
    }

    // Create order
    const order = await Order.create({
      items,
      total,
      customerName,
      customerPhone,
    });

    // Clear cart
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL ORDERS (GET /orders)
export const getOrders = async (req, res) => {
  try {
    console.log('GET /orders called');
    const orders = await Order.find().populate("items.product");
    console.log('Orders found:', orders.length);
    
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('Error in getOrders:', error);
    res.status(500).json({ message: error.message });
  }
};


// GET ORDER BY ID (GET /orders/:id)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
