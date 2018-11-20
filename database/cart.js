'use strict'
const path = require('path')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.join(__dirname, './data/cart.sqlite')
})

const Cart = sequelize.define('cart', {
    uid: {
        type: Sequelize.STRING
    },
    products: {
        type: Sequelize.JSON
    }
})

// Cart.sync({ force: true })
//     .then(() => {
//         Cart.create({
//                 uid: 6,
//                 products: [{ id: 12, count: 1 }]
//             })
//             .then(res => {
//                 console.log(res.toJSON())
//             })
//     })

module.exports = Cart