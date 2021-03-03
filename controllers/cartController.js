const db = require('../models')
const Product = db.Product
const Cart = db.Cart
const CartItem = db.CartItem
const PAGE_LIMIT = 10
const OFFSET = 0

module.exports = {
  //取得購物車內容
  getCart: (req, res) => {
    Cart.findByPk(req.session.cartId, {
      include: [{
        model: Product,
        as: 'items'
      }]
    }).then(cart => {
      cart = cart || { items: [] }
      //拿取cart.items以及CartItem的原生物件
      cart = cart.items.map(item => ({
        ...item.dataValues,
        CartItem: item.CartItem.dataValues
      }))

      //計算購物車總金額
      let totalPrice = cart.length > 0 ? cart.map(d => d.price * d.CartItem.quantity).reduce((a, b) => a + b) : 0
      return res.render('cart', {
        cart,
        totalPrice
      })
    })
  },

  //新增商品資料至購物車
  postCart: (req, res) => {
    Cart.findOrCreate({
      where: {
        id: req.session.cartId || 0
      }
    }).then(([cart, created]) => {
      return CartItem.findOrCreate({
        where: {
          CartId: cart.id,
          ProductId: req.body.productId
        },
        default: {
          CartId: cart.id,
          ProductId: req.body.productId
        }
      }).then(([cartItem, created]) => {
        return cartItem.update({
          quantity: (cartItem.quantity || 0) + 1
        }).then(cartItem => {
          req.session.cartId = cart.id
          req.session.save(() => res.redirect('back'))
        })
      })
    })
  },

  //增加購物車商品數量
  addCartItem: (req, res) => {
    CartItem.findByPk(req.params.cartItemId)
      .then(cartItem => {
        cartItem.update({
          quantity: cartItem.quantity + 1
        }).then(cartItem => res.redirect('back'))
      })
  },

  //減少購物車商品數量
  subCartItem: (req, res) => {
    CartItem.findByPk(req.params.cartItemId)
      .then(cartItem => {
        cartItem.update({
          quantity: cartItem.quantity - 1 >= 1 ? cartItem.quantity - 1 : 1
        }).then(cartItem => res.redirect('back'))
      })
  }

}