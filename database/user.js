'use strict'
const path = require('path')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: path.join(__dirname, './data/user.sqlite')
})

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING
  },
  nickyname: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
})

// User.sync({ force: true })
//     .then(() => {
//         User.create({
//                 username: '1',
//                 nickyname: '',
//                 gender: 'male',
//                 password: '123456'
//             })
//             .then(res => {
//                 console.log(res.toJSON())
//             })
//     })

module.exports = User
