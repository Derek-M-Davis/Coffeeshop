const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
    name:String,
    price:Number,
    notes:String,
    description:String,
    img:String
})

const Shop = mongoose.model('Shop', shopSchema)

module.exports = Shop;