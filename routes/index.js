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

module.exports = router