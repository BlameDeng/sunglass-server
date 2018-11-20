'use strict'
const path = require('path')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.join(__dirname, './data/product.sqlite')
})

const Product = sequelize.define('product', {
    name: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.INTEGER
    },
    discount: {
        type: Sequelize.INTEGER
    },
    main_image: {
        type: Sequelize.STRING
    },
    sub_image: {
        type: Sequelize.STRING
    },
    detail: {
        type: Sequelize.STRING
    }
})

module.exports = Product