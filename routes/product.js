'use strict'
const Router = require('koa-router')
const Product = require('../database/product')

const router = new Router()

const newArrival = async (ctx, next) => {
    let results = await Product.findAll()
    let arrival = []
    results.slice(results.length - 3).forEach(product => {
        arrival.push(product.toJSON())
    })
    ctx.response.status = 200
    ctx.response.body = { status: 'success', data: arrival }
}

const allProducts = async (ctx, next) => {
    let results = await Product.findAll()
    let all = []
    results.forEach(product => {
        all.push(product.toJSON())
    })
    ctx.response.status = 200
    ctx.response.body = { status: 'success', data: all }
}

const singleProduct = async (ctx, next) => {
    const id = ctx.request.query.id
    let result = await Product.findById(id)
    if (result) {
        ctx.response.status = 200
        ctx.response.body = { status: 'success', data: result.toJSON() }
    } else {
        ctx.response.status = 200
        ctx.response.body = { status: 'fail', msg: '商品不存在' }
    }
}

const recommend = async (ctx, next) => {
    ctx.response.status = 200
    const gender = ctx.request.query.gender
    let results = await Product.findAll()
    let recommendProducts = []
    if (gender === 'male' || gender === 'female') {
        let array = results.filter(product => product.category === gender)
        recommendProducts = array.slice(array.length - 3).map(product => product.toJSON())
    } else {
        recommendProducts = results.slice(results.length - 3).map(product => product.toJSON())
    }
    ctx.response.body = { status: 'success', data: recommendProducts }
}

router.get('/newarrival', newArrival)
router.get('/allproducts', allProducts)
router.get('/singleproduct', singleProduct)
router.get('/recommend', recommend)


module.exports = router