const express = require('express')
const router = express.Router()

const productController = require('../controllers/productController')
const cartController = require('../controllers/cartController')

//GET home page
router.get('/', (req, res) => {
  res.render('index')
})

router.get('/products', productController.getProducts)

router.get('/cart', cartController.getCart)
router.post('/cart', cartController.postCart)
router.post('/cartItem/:cartItemId/add', cartController.addCartItem)
router.post('/cartItem/:cartItemId/sub', cartController.subCartItem)

module.exports = router