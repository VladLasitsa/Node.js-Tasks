"use strict";
import express from 'express';
import {User, Product, Review} from '../models';

const product = new Product();
const review = new Review();
const user = new User();

const router = express.Router();

router.get('/api/products', function(req, res) {
  res.send(product.getList());
});

router.get('/api/products/:id', function(req, res) {
    const neededProduct = product.getProductById(req.params.id);
    res.send(neededProduct ? neededProduct : `Product by id: ${req.params.id} is not found`);
});

router.get('/api/products/:id/reviews', function(req, res) {
    const reviewsForProduct = review.getReviews(req.params.id);
    res.send(reviewsForProduct ? reviewsForProduct : `Reviews for product with id: ${req.params.id} is not found`);
});

router.post('/api/products', function(req, res) {
    res.send(product.create(req.body));
});

router.get('/api/users', function(req, res) {
    res.send(user.getList());
});

export default router;