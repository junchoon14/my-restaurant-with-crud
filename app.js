const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

mongoose.connect('mongodb://localhost/my_restaurant', { useNewUrlParser: true })
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

// home route
app.get('/', (req, res) => {
  res.render('index')
})

// show detail
app.get('/restaurants/:restaurant_id', (req, res) => {
  res.render('show')
})

// listen
app.listen(3000, () => {
  console.log('App is running!')
})