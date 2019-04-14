const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

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

// main page
app.get('/restaurants', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })
})

// create data page
app.get('/restaurants/create', (req, res) => {
  return res.render('create')
})

// show detail
app.get('/restaurants/:id', (req, res) => {
  Restaurant.find((err, restaurants) => {
    const restaurant = restaurants.find(restaurant => restaurant.id == req.params.id)
    if (err) return console.error(err)
    return res.render('show', { restaurant: restaurant })
  })
})

// post data to database
app.post('/restaurants', (req, res) => {
  const restaurant = Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  })

  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')                        // 新增完成後，將使用者導回首頁
  })
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