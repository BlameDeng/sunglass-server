'use strict'
const path = require('path')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.join(__dirname, './data/reveiver.sqlite')
})

const Reveiver = sequelize.define('reveiver', {
    uid: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    detail: {
        type: Sequelize.STRING
    }
})

// Reveiver.sync({ force: true })
//     .then(() => {
//         Reveiver.create({
//                 uid: '333',
//                 name: '222',
//                 phone: '2222',
//                 address: '000',
//                 detail: 'aaa'
//             })
//             .then(res => {
//                 console.log(res.toJSON())
//             })
//     })

module.exports = Reveiver