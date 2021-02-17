const db = require('../models')
const Product = db.Product
const Cart = db.Cart
const CartItem = db.CartItem
const PAGE_LIMIT = 10
const OFFSET = 0

module.exports = {
  getCart: (req, res) => {
    Cart.findByPk(req.session.cartId, {
      include: [{
        model: Product,
        as: 'items'
      }],
      raw: true,
      nest: true
    }).then(cart => {
      cart = cart || { items: [] }
      let totalPrice = cart.items.length > 0 ? cart.items.map(d => d.price * d.CartItem.quantity).reduce((a, b) => a + b) : 0
      return res.render('cart', {
        cart,
        totalPrice
      })
    })
  }
}