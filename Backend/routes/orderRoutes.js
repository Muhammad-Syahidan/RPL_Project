const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, updateOrderStatus } = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/', getAllOrders); // Jalur untuk melihat semua pesanan
router.put('/:id', updateOrderStatus); // Jalur untuk mengubah status

module.exports = router;