"use strict";
import cookie from 'cookie';

export function cookieParser(req, res, next) {
    const cookies = req.headers.cookie;
    req.parsedCookies = cookies ? cookie.parse(cookies) : {};
    next();
};