'use strict'
const Router = require('koa-router')
const router = new Router()

const Cart = require('../database/cart')
const Product = require('../database/product')

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

const addToCart = async (ctx, next) => {
    ctx.response.status = 200
    let { id, count, type } = ctx.request.body
    let uid = ctx.state.user.id
    let result = await Cart.findOne({ where: { uid } }).then(cart => cart.toJSON())
    let products = result.products
    let sku = products.find(item => item.id === id)
    if (sku) {
        if (type === 'changeCount') {
            let index = products.indexOf(sku)
            products.splice(index, 1, { id, count })
        }
    } else {
        products.push({ id, count })
    }
    await Cart.update({ products }, { where: { uid } })
    let cart = await Cart.findOne({ where: { uid } }).then(cart => cart.toJSON())
    cart = await getDetail(cart)
    ctx.response.body = { status: 'success', data: cart }
}

const removeFromCart = async (ctx, next) => {
    ctx.response.status = 200
    let { id } = ctx.request.body
    let uid = ctx.state.user.id
    let result = await Cart.findOne({ where: { uid } }).then(cart => cart.toJSON())
    let products = result.products.filter(item => item.id !== id)
    await Cart.update({ products }, { where: { uid } })
    let cart = await Cart.findOne({ where: { uid } }).then(cart => cart.toJSON())
    cart = await getDetail(cart)
    ctx.response.body = { status: 'success', data: cart }
}

router.patch('/addtocart', addToCart)
router.patch('/removefromcart', removeFromCart)

module.exports = router