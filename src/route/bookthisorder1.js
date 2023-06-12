const express = require("express");
const router = express.Router();
const orderController = require("../controller/bookthisorder1");

// Create a new order
router.post("/", orderController.createOrder);

router.get("/", orderController.getAllOrder);

// Get order by ID
router.get("/:id", orderController.getOrderById);

// Update an existing order
router.put("/:id", orderController.updateOrder);

// Delete an order
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
