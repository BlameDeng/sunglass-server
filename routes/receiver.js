'use strict'
const Router = require('koa-router')
const router = new Router()

const Receiver = require('../database/receiver')

const getReceiver = async (ctx, next) => {
    let uid = ctx.state.user.id
    ctx.response.status = 200
    let receiver = await Receiver.findOne({ where: { uid } })
    if (receiver) {
        ctx.response.body = { status: 'success', data: receiver.toJSON() }
    } else {
        let temp = await Receiver.create({ uid, name: '', phone: '', address: '', detail: '' }).then(res => res.toJSON())
        ctx.response.body = { status: 'success', data: temp }
    }
}

const updateReceiver = async (ctx, next) => {
    let uid = ctx.state.user.id
    ctx.response.status = 200
    let data = ctx.request.body
    let result = await Receiver.findOne({ where: { uid } })
    if (result) {
        await Receiver.update({ ...data }, { where: { uid } })
        let receiver = await Receiver.findOne({ where: { uid } }).then(res => res.toJSON())
        ctx.response.body = { status: 'success', data: receiver }
    } else {
        ctx.response.body = { status: 'fail', msg: '收货人信息不存在' }
    }
}

router.get('/getreceiver', getReceiver)
router.patch('/updatereceiver', updateReceiver)

module.exports = router