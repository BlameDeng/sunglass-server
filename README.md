# Sunglass

## React单页/Vue多页 商城应用

[React 版单页预览](http://www.denglin.xyz)   
[Vue 版多页预览](http://www.denglin.xyz/home.html)

### 技术栈

Node + Koa2 + Sequelize

### 实现的页面

- 首页
- 商品分类页
- 商品详情页
- 用户登录页
- 用户资料页
- 购物车
- 订单页

### 把项目跑起来

克隆项目到本地

#### 安装依赖

```
yarn install
```

#### 启动项目

```
node app
```

浏览器打开 http://localhost:8000/home.html

### 项目结构

```
.
├─ database/            # 数据库目录
├─ middleware/          # 中间件
├─ public/              # 发布的代码（静态资源）
├─ routes/              # 服务端路由
├── app.js              # 启动文件
```
