// Dependencies
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
require('dotenv').config()

const PORT = process.env.PORT || 3000;

// Database

const MONGODB_URI = process.env.MONGODB_URI
console.log(MONGODB_URI)

mongoose.connect(MONGODB_URI), {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex: true }

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'))

// Middleware
// use public folder for static assets
app.use(express.static('public'))

// populate req.body with parsed info from forms
app.use(express.urlencoded({extended:false}))

app.use(express.json())
// Be able to use delete and out routs
app.use(methodOverride('method'))


// ROutes
app.get('/', (req,res) => {
    res.send('hello world')
})


// Listener
app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT)
})