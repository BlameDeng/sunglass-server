'use strict'
const path = require('path')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.join(__dirname, './data/order.sqlite')
})

const Order = sequelize.define('order', {
    uid: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    },
    product: {
        type: Sequelize.JSON
    }
})

// Order.sync({ force: true })
//     .then(() => {
//         Order.create({
//                 uid: '333',
//                 product: { xxx: 'xx' },
//                 status: 'xxx'
//             })
//             .then(res => {
//                 console.log(res.toJSON())
//             })
//     })

module.exports = Order