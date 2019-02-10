"use strict";
import uniqid from 'uniqid';

class Review {
    constructor() {
        this.reviews = [
            {
                id: "review-1",
                text: "very good product",
                userId: "test-person-1",
                productId: "product-1"
            }
        ];
        console.log("Review module");
    }

    createReview(review) {
        this.reviews.push({
            id: uniqid(),
            text: review.text,
            userId: review.userId,
            productId: review.productId
        });
    }

    getReviews(productId) {
        return this.reviews.filter(review => review.productId === productId);
    }
}

export default Review;