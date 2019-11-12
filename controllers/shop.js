// ================ Dependencies ================ //
const express = require('express')
const router = express.Router()
const Shop = require('../models/shop.js')

router.get('/seed', (req, res) => {
    Shop.create(
        [
            {
                name:'Columbian',
                price:12,
                notes:'chocolate',
                description:'tradional coffee',
                img:'./public/imgs/cappuccino.jpg'
            },
            // {
            //     name:'Columbian',
            //     price:12,
            //     notes:'chocolate',
            //     description:'tradional coffee',
            //     img:'/cupWithCookie.jpg'
            // },
            // {
            //     name:'Columbian',
            //     price:12,
            //     notes:'chocolate',
            //     description:'tradional coffee',
            //     img:'/cupWithCookie.jpg'
            // }
        ],
        (error, data) => {
            res.redirect('/shop')
        }
    )
});


// New Item Route tested
router.get('/products/new', (req, res) => {
    res.render('new.ejs')
})

// Create Route tested
router.post('/', (req, res) => {
    if (req.body.img === ""){
        req.body.img = '/imgs/happy-coffee.jpg'
    }
    Shop.create(req.body, (error, newItem) => {
        console.log(req.body)
        res.redirect('shop/products')
    })
})

// Products page tested
router.get('/products', (req, res) => {
    Shop.find({}, (error, allShop) => {
        res.render('products.ejs', {
            shop: allShop
         })
    })
})

// Show Route tested
router.get('/products/:id', (req, res) => {
    Shop.findById(req.params.id, (error, foundShop) =>{
        res.render('show.ejs', {
            shop: foundShop
        })
    }) 
})


// Delete Route broken
router.delete('/products/:id', (req, res) => {
    Shop.findByIdAndRemove(req.params.id, (error, deletedShop) => {
        res.redirect('/shop');
    })
})

// Edit Route broken
router.get('/products/:id/edit', (req, res) => {
    Shop.findById(req.params.id, (error, foundShop) =>{
        res.render('edit.ejs', {
            shop: foundShop
        })
    })
})

// Index Route tested
router.get('/', (req, res) => {
    res.render('index.ejs')
})

// Pairings Route tested
router.get('/pairings', (req, res) => {
    res.render('pairings.ejs')
})
// Brewguide Route tested
router.get('/brewguide', (req, res) => {
    res.render('brewguide.ejs')
})
// Map Route tested
router.get('/map', (req, res) => {
    res.render('map.ejs')
})

// Put/Update Route
router.put('/:id', (req,res) => {
    Shop.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new:true}, (error, updatedShop) => {
        res.redirect('/shop')
        }
    )
})

module.exports = router;
