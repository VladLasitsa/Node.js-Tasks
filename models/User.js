'use strict';
import mongoose from 'mongoose';
import db from '../database/connect';

const UserSchema = new mongoose.Schema({
    name: String,
    login: {
        type: String,
        validate: {
            validator: function(login) {
                return login.length > 10;
            },
            message: 'Login should be more then 10 symbols'
        }
    },
    password: {
        type: String,
        validate: {
            validator: function(password) {
                return password.length > 16;
            },
            message: 'Password should be more then 16 symbols'
        }
    },
    lastModifiedDate: Date
});

UserSchema.pre('save', function(next) {
    if (!this.lastModifiedDate) this.lastModifiedDate = new Date;
    next();
});

const User = db.model("User", UserSchema);

const data = [
    {'name': 'Vlad Lasitsa', 'login': 'vladik', 'password': 'media'},
    {'name': 'Anastasiya Novak', 'login': 'banana', 'password': 'media1'},
    {'name': 'Maryia Hil', 'login': 'agent of shield', 'password': 'media2'}
];
User.collection.insertMany(data, (err, r) => {
    console.log(err)
});

module.exports = User;