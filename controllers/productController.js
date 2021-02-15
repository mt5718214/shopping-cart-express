const db = require('../models')
const Product = db.Product
const PAGE_LIMIT = 3
const OFFSET = 0

module.exports = {
  getProducts: (req, res) => {
    Product.findAndCountAll({
      offset: OFFSET,
      limit: PAGE_LIMIT,
      raw: true,
      nest: true
    }).then(products => {
      res.render('products', { products })
    })
  }
}