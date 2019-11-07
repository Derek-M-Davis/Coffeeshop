// ================ Dependencies ================ //
const express = require('express')
const router = express.Router()
const Shop = require('../models/shop.js')

// New Item Route tested
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

// Create Route tested
router.post('/', (req, res) => {
    res.send(req.body)
    console.log(req.body)
})

// Index Route tested
router.get('/', (req, res) => {
    res.render('index.ejs')
})

module.exports = router;
