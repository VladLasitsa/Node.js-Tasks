"use strict";
import express from 'express';
import jwt from "jsonwebtoken";
import {User, Product, City} from '../models';
import passport from '../utils/authenticationStrategiesUtil';

const router = express.Router();

function errorResponse(data) {
    return {
        code: "404",
        message: "Not Found",
        data: data
    };
}

router.post('/auth', (req, res) => {
    res.contentType('application/json');
    User.findOne({login: req.body.login, password: req.body.password}, (err, foundUser) => {
        let response;
        if (foundUser) {
            res.status(200);
            const token = jwt.sign({
                username: foundUser.login
            }, 'shhhhh', { expiresIn: '15m' })
            response = {
                code: "200",
                message: "OK",
                data: {
                    user: {
                        username: foundUser.name,
                        email: foundUser.email
                    }
                },
                token
            }
        } else {
            res.status(404);
            response = errorResponse({
                errorMessag: "User with entered login and password doesn't exists"
            });
        }
        res.send(response);
    });
});

router.get('/api/city', (req, res) => {
    City.count().exec((err, count) => {
        if (err) {
            res.send(err);
        } else {
            const random = Math.floor(Math.random() * count)
            City.findOne().skip(random).exec((err, result) => {
                res.send(err ? err : result);
            });
        }
    });
});

router.get('/api/cities', (req, res) => {
    City.find((err, result) => {
        res.send(err ? err : result);
    });
});

router.post('/api/cities', (req, res) => {
    const newCity = new Product(req.body);
    newCity.save((err, result => {
        res.send(err ? err : result);
    }));
});

router.get('/api/products', (req, res) => {
    Product.find((err, result) => {
        res.send(err ? err : result);
    });
});

router.get('/api/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, neededProduct) => {
        res.send(neededProduct ? neededProduct : `Product by id: ${req.params.id} is not found`);
    });
});

router.post('/api/products', (req, res) => {
    const newProduct = new Product({
        name: req.body.name
    });
    newProduct.save((err, result) => {
        console.log(err, result);
        res.send(err ? err : result);
    });
});

router.put('/api/cities/:id', (req, res) => {
    City.findByIdAndUpdate(req.params.id, req.body, {new: true, upsert: true}, (err, result) => {
        res.send(err ? err : result);
    });
});

router.delete('/api/products/:id', (req, res) => {
    Product.deleteOne({ _id: req.params.id }, function (err) {
        res.send(err ? err : "OK");
    });
});

router.delete('/api/users/:id', (req, res) => {
    User.deleteOne({ _id: req.params.id }, function (err) {
        res.send(err ? err : "OK");
    });
});

router.delete('/api/cities/:id', (req, res) => {
    City.deleteOne({ _id: req.params.id }, function (err) {
        res.send(err ? err : "OK");
    });
});

router.get('/api/users', function(req, res) {
    User.find(((err, result) => {
        res.send(err ? err : result);
    }));
});

router.post('/login', passport.authenticate("local", {
    failureRedirect: "/"
}), (req, res) => {
    res.json(req.user);
});

router.get('/auth/facebook', passport.authenticate("facebook"));

router.get('/auth/facebook/callback', passport.authenticate("facebook", {
    successRedirect: "/api/products",
    failureRedirect: "/login"
}));

router.get('/auth/twitter', passport.authenticate("twitter"));

router.get('/auth/twitter/callback', passport.authenticate("twitter", {
    successRedirect: "/api/products",
    failureRedirect: "/login"
}));

router.get('/auth/google', passport.authenticate("google", { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/auth/google/callback', passport.authenticate("google", {
    successRedirect: "/api/products",
    failureRedirect: "/login"
}));

export default router;