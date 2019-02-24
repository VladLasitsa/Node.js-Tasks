"use strict";
import jwt from "jsonwebtoken";

export function jwtTokenVerify(req, res, next) {
    const token = req.parsedCookies.token;
    if (req.path.startsWith("/login") || req.path.startsWith("/auth") || (req.isAuthenticated && req.isAuthenticated())) {
        next();
    } else {
        jwt.verify(token, 'shhhhh', (err, decodedToken) => {
            if (err || !decodedToken){
                res.status(400).json({
                    code: "400",
                    message: "Invalid auth token"
                });
            } else {
                next();
            }
        });
    }
};