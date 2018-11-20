'use strict'
const Router = require('koa-router')
const router = new Router()
const crypto = require('crypto')
const User = require('../database/user')
const Cart = require('../database/cart')
const Order = require('../database/order')
const key = require('./key.js')
//加密
function encrypt(params) {
    const hmac = crypto.createHmac('sha256', key.hmac_key)
    hmac.update(params)
    return hmac.digest('hex')
}
//获取用户所有订单
async function getUserOrders(uid) {
    let orders = await Order.findAll({ where: { uid } }).then(res => {
        let array = []
        if (res.length) {
            res.forEach(item => {
                array.push(item.toJSON())
            })
        }
        return array
    })
    return orders
}

const getOrder = async (ctx, next) => {
    let uid = ctx.state.user.id
    let id = ctx.request.query.id
    ctx.response.status = 200
    if (id) {
        let order = await Order.findById(id).then(res => {
            if (res) {
                return res.toJSON()
            }
        })
        ctx.response.body = { status: 'success', data: order }
    } else {
        let orders = await getUserOrders(uid)
        ctx.response.body = { status: 'success', data: orders }
    }
}

const payment = async (ctx, next) => {
    let uid = ctx.state.user.id
    ctx.response.status = 200
    let data = ctx.request.body
    let user = await User.findById(uid)
    if (user) {
        if (encrypt(data.password) === user.toJSON().password) {
            const promises = []
            const ids = []
            data.products.forEach(product => {
                ids.push(product.id)
                promises.push(Order.create({ uid, product, status: 'toConfirm' }))
            })
            await Promise.all(promises)
            let cart = await Cart.findOne({ where: { uid } }).then(res => res.toJSON())
            let { products } = cart
            products = products.filter(item => ids.indexOf(item.id) === -1)
            await Cart.update({ products }, { where: { uid } })
            let orders = await getUserOrders(uid)
            ctx.response.body = { status: 'success', data: orders }
        } else {
            ctx.response.body = { status: 'fail', msg: '密码不正确' }
        }
    } else {
        ctx.response.body = { status: 'fail', msg: '用户不存在' }
    }
}

const changeOrderStatus = async (ctx, next) => {
    ctx.response.status = 200
    let uid = ctx.state.user.id
    let { order, status } = ctx.request.body
    let result = await Order.update({ status }, { where: { id: order.id } })
    if (result[0]) {
        let orders = await getUserOrders(uid)
        ctx.response.body = { status: 'success', data: orders }
    } else {
        ctx.response.body = { status: 'fail', msg: '订单不存在' }
    }
}

const deleteOrder = async (ctx, next) => {
    ctx.response.status = 200
    let uid = ctx.state.user.id
    let id = ctx.request.body.id
    let result = await Order.destroy({ where: { id } })
    if (result) {
        let orders = await getUserOrders(uid)
        ctx.response.body = { status: 'success', data: orders }
    } else {
        ctx.response.body = { status: 'fail', msg: '订单不存在' }
    }
}

router.get('/getorder', getOrder)
router.post('/payment', payment)
router.patch('/changeorderstatus', changeOrderStatus)
router.delete('/deleteorder',deleteOrder)

module.exports = router