'use strict'
const Router = require('koa-router')
const router = new Router()

const Evaluation = require('../database/evaluation')
const Order = require('../database/order')

async function getEvaluationByPid(pid) {
    return await Evaluation.findAll({ where: { pid } }).then(res => {
        let array = []
        if (res.length) {
            res.forEach(item => {
                array.push(item.toJSON())
            })
        }
        return array
    })
}

const getEvaluation = async (ctx, next) => {
    let pid = ctx.request.query.id
    ctx.response.status = 200
    let evaluation = await getEvaluationByPid(pid)
    ctx.response.body = { status: 'success', data: evaluation }
}

const createEvaluation = async (ctx, next) => {
    let uid = ctx.state.user.id
    ctx.response.status = 200
    let data = ctx.request.body
    let { pid, oid } = data
    await Evaluation.create({ uid, ...data }).then(res => res.toJSON())
    await Order.update({ status: 'done' }, { where: { id: oid } })
    let newEvaluation = await getEvaluationByPid(pid)
    ctx.response.body = { status: 'success', data: newEvaluation }
}

router.get('/getevaluation', getEvaluation)
router.post('/createevaluation', createEvaluation)

module.exports = router