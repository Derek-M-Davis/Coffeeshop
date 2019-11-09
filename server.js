// ================ Dependencies ================ //
const express        = require('express')
const methodOverride = require('method-override')
const mongoose       = require('mongoose')
// const bootstrap      = require('bootstrap')
const app            = express()
const db             = mongoose.connection
const PORT           = process.env.PORT || 3000;
require('dotenv').config()

// ================ Database ================ //

const MONGODB_URI = process.env.MONGODB_URI
console.log(MONGODB_URI)

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex: true })

// ============== Middleware =================== //
// use public folder for static assets
app.use(express.static('public'))
// populate req.body with parsed info from forms
app.use(express.urlencoded({extended:true}))
// Returns middlesware associated with JSON
app.use(express.json())
// Be able to use delete and out routes
app.use(methodOverride('method'))

// ============= Controllers ================= //
const shopsController = require('./controllers/shop.js');
app.use('/shop', shopsController);



// ==============Error/Server Status================ /

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'))

// Listener
app.listen(PORT, () => {
    console.log('Brewing on port: ' + PORT)
})