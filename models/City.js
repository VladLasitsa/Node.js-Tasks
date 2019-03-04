'use strict';
import mongoose from 'mongoose';
import db from '../database/connect';

const CitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name of the city']
    },
    country: String,
    capital: Boolean,
    location: {
        lat: Number,
        long: Number
    },
    lastModifiedDate: Date
});

CitySchema.pre('save', function(next) {
    if (!this.lastModifiedDate) this.lastModifiedDate = new Date;
    next();
});

CitySchema.pre('findOneAndUpdate', function(next) {
    if (!this.lastModifiedDate) this.lastModifiedDate = new Date;
    next();
});

const City = db.model("City", CitySchema);

module.exports = City;