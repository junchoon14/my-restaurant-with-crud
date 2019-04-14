const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

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