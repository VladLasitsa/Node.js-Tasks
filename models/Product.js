"use strict";
'use strict';
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: DataTypes.STRING
    }, {});

    return Product;
};