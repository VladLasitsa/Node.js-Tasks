"use strict";
import uniqid from 'uniqid';

class Product {
    constructor() {
        this.products = [
            {
                id: "product-1",
                name: "product for Vlad"
            }
        ];
        console.log("Product module");
    }

    createProduct(product) {
        const newProduct = {
            id: uniqid(),
            name: product.name
        };
        this.products.push(newProduct);
        return newProduct;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    getList() {
        return this.products;
    }
}

export default Product;