const db = require('../models')
const Product = db.Product
const Cart = db.Cart
const CartItem = db.CartItem
const PAGE_LIMIT = 10
const OFFSET = 0

module.exports = {
  getCart: (req, res) => {
    Cart.findAll({
      include: [{
        model: Product,
        as: 'items'
      }],
      raw: true,
      nest: true
    }).then(cart => {
      let totalPrice = cart.length > 0 ? cart.map(item => item.items.price * item.items.CartItem.quantity).reduce((acc, curr) => acc + curr) : 0
      return res.render('cart', {
        cart,
        totalPrice
      })
    })
  }
}