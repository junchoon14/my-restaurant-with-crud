const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })
const db = mongoose.connection

// connenet error
db.on('error', () => {
  console.log('mongodb error!')
})

// connect success
db.once('open', () => {
  console.log('mongodb connected!')
})

const Restaurant = require('./models/restaurant')

// setting static files
app.use(express.static('public'))

// main route
app.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })
})

// 列出全部 Todo
app.get('/restaurants', (req, res) => {
  res.send('列出所有 Todo')
})

// 新增一筆 Todo 頁面
app.get('/restaurants/new', (req, res) => {
  res.send('新增 Todo 頁面')
})

// 顯示一筆 Todo 的詳細內容
app.get('/restaurants/:id', (req, res) => {
  res.send('顯示 Todo 的詳細內容')
})

// 新增一筆  Todo
app.post('/restaurants', (req, res) => {
  res.send('建立 Todo')
})

// 修改 Todo 頁面
app.get('/restaurants/:id/edit', (req, res) => {
  res.send('修改 Todo 頁面')
})

// 修改 Todo
app.post('/restaurants/:id', (req, res) => {
  res.send('修改 Todo')
})

// 刪除 Todo
app.post('/restaurants/:id/delete', (req, res) => {
  res.send('刪除 Todo')
})

// show detail
app.get('/restaurants/:restaurant_id', (req, res) => {
  res.render('show')
})

// listen
app.listen(3000, () => {
  console.log('App is running!')
})