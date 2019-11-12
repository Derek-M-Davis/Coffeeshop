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
                img:'Show Details'
            },
            {
                name:'Geometry Blend',
                price:16,
                notes:'Blueberry, Sweet Lemon',
                description:'Geometry has been defined as "describing spaces that lie beyond the normal range of human experience." Soon it will also be defined as "that coffee from Onyx that I am in love with and completely redefined my relationship with coffee."',
                img:'Show Details'
            },
            {
                name:'Monarch Expresso',
                price:15,
                notes:'Dark Chocolate, Dried berries',
                description:'Monarch is our most developed roast. It is a flavor profile that we designed to work well with fats. This coffee works extremely well with cream or as an espresso that has a high volume of milk. A very sweet sugar dense coffee that binds to the fats and creates multiple complex sugar browning notes from Swiss chocolate to cacao depending on the amount of milk added. Enjoy as drip or espresso.',
                img:'Show Details'
            },
            {
                name:'Kenya Kiunyu AA',
                price:22,
                notes:'Blackberry, brown sugar',
                description:'Kiunyu (key-in-you) has arrived at the roastery, and we (Onyx) are super excited. This coffee is from a washing station we have worked with for three years, and we always look forward to the amazing offerings they produce. This micro-lot is no different and exudes a similar taste profile that we have come to love. Sweet, nectar-like blackberry flavors, and bright stone fruit notes, similar to an apricot, are at the forefront of this coffee. When ground, a delicate floral note, like orange blossom or honeysuckle, presents itself almost immediately. If the roastery crew gets excited about a coffee, you should, as well. Enjoy! ',
                img:'Show Details'
            },
            {
                name:'Guatemala Chaguite',
                price:17,
                notes:'Caramel, Nectarine',
                description:'Welcome to comfort my friends. This sweet and silky offering from Guatemala hails from our friends, the Perez family. You may have seen them from our Finca Isnul offering that has become quite famous. Chaguite, however, is new to us and comes from a neighboring uncle of within the Perez family in Huehuetenango. This coffee is a dense, high grown Caturra variety that shows itself through its sweetness. This is not a tropical acid bomb; this is a complex, sugar-dense sweet coffee that works extremely well black or with milk. Some coffees require exact precision in brewing and a palate to appreciate, but this is not that coffee. You will not mess this up, and it will taste amazing no matter what you do',
                img:'Show Details'
            },
            {
                name:'Bella Donovan',
                price:17,
                notes:'Raspberry, chocolate',
                description:'Bella Donovan is the wool sweater of our blends—comforting, cozy, and enveloping. Our most popular blend, Bella is a variation of the archetypal Moka-Java pairing, in which a wild and jammy natural from Ethiopia finds balance with more substantive coffees from Sumatra and Peru. It stands on the darker side of things, weathers the rigors of the automatic drip machine well, and stands up to milk or cream—though it is just as elegant black.',
                img:'Show Details'
            },
            {
                name:'Three Africas',
                price:17,
                notes:'Golden Raisen, lemon Zest',
                description:'Three Africas marries the radiant fruit of two coffees from Ethiopia, one washed and one natural, with the balance and authority of a washed coffee from Uganda. Each component excels on its own, but together, they traverse boundaries. No matter the brew method, this blend, which is our brightest, has good body and an approachable complexity that takes to cream well, but stands just as radiantly on its own.',
                img:'Show Details'
            },
            {
                name:'Hayes Valley Espresso',
                price:17,
                notes:'Baking Chocolate, Orange Zest, brown sugar',
                description:'We developed our darkest espresso for the launch of our first brick-and-mortar in our friend Loring’s garage in Hayes Valley. Years later, it remains the standard espresso in all of our cafes. Lower-toned and minimally bright, Hayes Valley Espresso pulls a straight shot with a voluptuous tawny crema and a somewhat dangerous-looking viscosity. Milk, in any quantity, adds romance to the coffee’s brooding aspects, bringing out the inherent chocolate and adding a smooth, rounded touch.',
                img:'Show Details'
            },
            {
                name:'Colombia La Palma y El Tucan El Charquito',
                price:23,
                notes:'Pineapple, rosehips, Cranberry',
                description:'This exceedingly rare offering comes from the young but highly respected Colombia estate La Palma y El Tucan. Known as boundary pushers in the coffee world, this estate experiments with all of the variables that contribute to high-quality coffees, creating microlots that can’t be repeated. This small lot was grown to La Palma’s exacting specifications by El Charquito, a neighboring farm, and then processed by the estate anaerobically. This newer processing trend can yield extraordinarily complex coffee when done well. In this case, processing Castillo without oxygen took the cultivar to new heights, surprising our green buying team with its intensity and clarity.',
                img:'Show Details'
            },
        ],
        (error, data) => {
            res.redirect('/shop')
        }
    )
});


// New Item Route tested
router.get('/shop/new', (req, res) => {
    res.render('new.ejs')
})

// Edit Route broken
router.get('/shop/:id/edit', (req, res) => {
    Shop.findById(req.params.id, (error, foundShop) =>{
        res.render('edit.ejs', {
            shop: foundShop
        })
    })
})

// Delete Route broken
router.delete('/shop/:id', (req, res) => {
    Shop.findByIdAndRemove(req.params.id, (error, deletedShop) => {
        res.redirect('/');
    })
})

// Show Route tested
router.get('/shop/:id', (req, res) => {
    Shop.findById(req.params.id, (error, foundShop) =>{
        res.render('show.ejs', {
            shop: foundShop
        })
    }) 
})

// Put/Update Route
router.put('/shop/:id', (req,res) => {
    Shop.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new:true}, (error, updatedShop) => {
        res.redirect('/')
        }
    )
})

// Create Route tested
router.post('/', (req, res) => {
    if (req.body.img === ""){
        req.body.img = '/imgs/happy-coffee.jpg'
    }
    Shop.create(req.body, (error, newItem) => {
        console.log(req.body)
        res.redirect('/')
    })
})

// Products page tested
router.get('/shop', (req, res) => {
    Shop.find({}, (error, allShop) => {
        res.render('products.ejs', {
            shop: allShop
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



module.exports = router;
