const bookthisorderModel = require("../model/bookthisorder1");

// Example controller function
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new bookthisorderModel(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrder = async (req, res) => {
    try {
   
      const order = await bookthisorderModel.find()
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.status(200).json({msg:order});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Example controller function
exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await bookthisorderModel.findById(orderId)
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({msg:order});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Example controller function
exports.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await bookthisorderModel.findByIdAndUpdate(
      orderId,
      req.body,
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Example controller function
exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await bookthisorderModel.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
