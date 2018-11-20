'use strict'
const Koa = require('koa')
const koaBody = require('koa-body')
const Router = require('koa-router')
const cors = require('koa2-cors')
const koajwt = require('koa-jwt')

const path = require('path')
const serve = require('koa-static')
const staticCache = require('koa-static-cache')

const key = require('./routes/key')

const auth = require('./routes/auth')
const product = require('./routes/product')
const cart = require('./routes/cart')
const receiver = require('./routes/receiver')
const order = require('./routes/order')
const evaluation = require('./routes/evaluation')

const app = new Koa()
app.use(cors())

app.use(
  staticCache(path.join(__dirname, './public'), {
    maxAge: 7 * 24 * 60 * 60
  })
)

const staticPath = './public'
app.use(serve(path.join(__dirname, staticPath)))

const router = new Router()

app.use((ctx, next) => {
  return next().catch(error => {
    if (error.status === 401) {
      if (ctx.url === '/auth/check') {
        ctx.response.status = 200
        ctx.response.body = {
          status: 'fail',
          msg: '用户未登录',
          isLogin: false
        }
      } else {
        ctx.response.status = 401
        ctx.response.body = {
          status: 'fail',
          msg: '无权限（未登录）',
          isLogin: false
        }
      }
    } else {
      throw error
    }
  })
})

router.use('/auth', auth.routes())
router.use('/product', product.routes())
router.use('/cart', cart.routes())
router.use('/receiver', receiver.routes())
router.use('/order', order.routes())
router.use('/evaluation', evaluation.routes())

app.use(
  koajwt({ secret: key.jwt_key }).unless({
    path: [/\/product\/.+/, '/auth/login']
  })
)

app.use(koaBody({ multipart: true, strict: false }))
app.use(router.routes())

const port = 8000
app.listen(port, () => {
  console.log(`Koa2开始监听${port}端口`)
})
