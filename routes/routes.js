"use strict";
import Sequelize from 'sequelize';
import express from 'express';
import jwt from "jsonwebtoken";
import uuid from 'uuid/v1';
import {User, Product, Review} from '../models';
import passport from '../utils/authenticationStrategiesUtil';
import {sequelize} from '../database/connect';

const product = Product(sequelize, Sequelize);
const user = User(sequelize, Sequelize);
const review = Review(sequelize, Sequelize);

review.belongsTo(user, {as: 'user'});
review.belongsTo(product, {as: 'product'});

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
    user.findOrCreate({where: {login: req.body.login, password: req.body.password, id: uuid()}}).spread((user, created) => {
        let response;
        if (user) {
            res.status(200);
            const token = jwt.sign({
                login: user.login
            }, 'shhhhh', { expiresIn: '15m' })
            response = {
                code: "200",
                message: "OK",
                data: {
                    user
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

router.get('/api/products', (req, res) => {
  product.findAll().then(products => {
    res.send(products);
});
});

router.get('/api/products/:id', (req, res) => {
    product.findByPk(req.params.id).then(neededProduct => {
        res.send(neededProduct ? neededProduct : `Product by id: ${req.params.id} is not found`);
    });
});

router.get('/api/products/:id/reviews', (req, res) => {
    review.findAll({where: {productId: req.params.id}}).then(reviews => {
        res.send(reviews ? reviews : `Reviews for product with id: ${req.params.id} is not found`);
    });
});

router.post('/api/products/:id/review', (req, res) => {
    const oReview = {
        comment: req.body.comment,
        userId: req.body.userId,
        id: uuid(),
        productId: req.params.id
    }
    review.create(oReview).then(review => {
        res.send(review);
    });
});

router.post('/api/products', (req, res) => {
    req.body.id = uuid();
    product.create(req.body).then(createdProduct => {
        res.send(createdProduct);
    });
});

router.get('/api/users', function(req, res) {
    user.findAll().then(users => {
        res.send(users);
    });
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