const Cart = require('../database/cart')
const Product = require('../database/product')

async function getCartInfo(uid) {
    let cart = await Cart.findOne({ where: { uid } })
    if (cart) {
        return await getDetail(cart.toJSON())
    } else {
        let temp = await Cart.create({ uid, products: [] }).then(cart => cart.toJSON())
        return await getDetail(temp)
    }
}
async function getDetail(cart) {
    let detail = []
    for (let i = 0; i < cart.products.length; i++) {
        let item = cart.products[i]
        let product = await Product.findById(item.id).then(res => {
            if (res) {
                return res.toJSON()
            } else {
                return {}
            }
        })
        detail.push({ count: item.count, ...product })
    }
    cart.products = detail
    return cart
}

module.exports = getCartInfo