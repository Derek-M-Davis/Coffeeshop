// ================ Dependencies ================ //
const express = require('express')
const router = express.Router()
const Shop = require('../models/shop.js')

// New Item Route tested
router.get('/products/new', (req, res) => {
    res.render('new.ejs')
})

// Create Route tested
router.post('/', (req, res) => {
    // if (req.body.img === ""){
    //     req.body.img = './public/imgs/happy-coffee.jpg'
    // }
    Shop.create(req.body, (error, newItem) => {
        res.send(newItem)
    })
    console.log(req.body)
   
})

// Index Route tested
router.get('/', (req, res) => {
    res.render('index.ejs')
})

// Products page tested-no data yet
router.get('/products', (req, res) => {
    Shop.find({}, (error, allShop) => {
        res.render('products.ejs', {
            shop: allShop
         })
    })
})


// Show Route untested no data yet
router.get('/products/:id', (req, res) => {
    Shop.findById(req.params.id, (error, foundShop) =>{
        res.render('show.ejs', {
            shop: foundShop
        })
    }) 
})

// Edit Route
router.get('/prducts/:id/edit', (req, res) => {
    Shop.findById(req.params.id, (error, foundShop) =>{
        res.render('edit.ejs', {
            shop: foundShop
        })
    })
})

// Delete Route
router.delete('/products/:id',(req, res) => {
    Shop.findByIdAndRemove(req.params.id, (error, deletedShop) => {
        res.redirect('/products')
    })
})

// Put/Update Route
router.put('/products/:id', (req,res) => {
    Shop.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new:true}, (error, updatedShop) => {
        res.redirect('/products')
        }
    )
})



module.exports = router;
