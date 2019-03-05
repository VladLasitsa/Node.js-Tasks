'use strict';
import mongoose from 'mongoose';
import db from '../database/connect';

const ProductSchema = new mongoose.Schema({
    name: String,
    lastModifiedDate: Date
});

ProductSchema.pre('save', function(next) {
    if (!this.lastModifiedDate) this.lastModifiedDate = new Date;
    next();
});

const Product = db.model("Product", ProductSchema);

const data = [
    {'name': 'media'},
    {'name': 'media2'},
    {'name': 'media3'}
];

Product.collection.insertMany(data, (err, r) => {
    err && console.log(err);
});

module.exports = Product;