"use strict";
import express from 'express';
import jwt from "jsonwebtoken";
import {User, Product, Review} from '../models';
import passport from '../utils/authenticationStrategiesUtil';

const product = new Product();
const review = new Review();
const user = new User();

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
    const foundUser = user.findUserByLoginAndPassword(req.body);
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

router.get('/api/products', (req, res) => {
  res.send(product.getList());
});

router.get('/api/products/:id', (req, res) => {
    const neededProduct = product.getProductById(req.params.id);
    res.send(neededProduct ? neededProduct : `Product by id: ${req.params.id} is not found`);
});

router.get('/api/products/:id/reviews', (req, res) => {
    const reviewsForProduct = review.getReviews(req.params.id);
    res.send(reviewsForProduct ? reviewsForProduct : `Reviews for product with id: ${req.params.id} is not found`);
});

router.post('/api/products', (req, res) => {
    res.send(product.createProduct(req.body));
});

router.get('/api/users', function(req, res) {
    res.send(user.getList());
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