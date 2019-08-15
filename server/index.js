const express = require('express')
const app = express()

// 允许跨域
app.use(require('cors')())

// express识别JSON数据
app.use(express.json())

const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost:27017/element-admin', {
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true
})

// 模型
const Article = mongoose.model(
  'Article',
  new mongoose.Schema({
    title: { type: String },
    desc: { type: String }
  })
)
// 新增文章
app.post('/api/articles', async (req, res) => {
  const articles = await Article.create(req.body)
  res.send(articles)
})

// 文章列表
app.get('/api/articles', async (req, res) => {
  const articles = await Article.find()
  res.send(articles)
})

// 删除文章
app.delete('/api/article/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.send({
    status: true
  })
})

// 文章详情
app.get('/api/articles/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.send(article)
})

// 修改文章
app.put('/api/articles/:id', async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body)
  res.send(article)
})

app.get('/', async (req, res) => {
  res.send('index')
})

app.listen(3001, () => {
  console.log('Server is running')
})
