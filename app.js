const express = require('express')
const app = express()
const port = 3010
const router = require('./routers/index');
const session = require('express-session');

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true })); 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));

app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})