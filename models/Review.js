'use strict';
module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        comment: DataTypes.STRING
    }, {});

    return Review;
};