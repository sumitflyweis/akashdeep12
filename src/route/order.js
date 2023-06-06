const express = require("express");
const router = express.Router();
const menuController = require("../controller/order");

// router.get('/menus', menuController.getMenus);
router.post('/', menuController.createOrder);
router.post('/:id', menuController.processOrderByorderId);
// router.put('/menus/:id', menuController.updateMenu);
// router.delete('/menus/:id', menuController.deleteMenu);

module.exports = router;