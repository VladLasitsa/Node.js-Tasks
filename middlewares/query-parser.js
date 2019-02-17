"use strict";
import url from 'url';
import queryString  from 'query-string';

export function queryParser(req, res, next) {
    const query = url.parse(req.url).query;
    req.parsedQuery = query && Object.keys(query).length > 0 ? queryString.parse(query) : null;
    next();
};