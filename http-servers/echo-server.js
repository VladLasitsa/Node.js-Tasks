const http = require('http'),
    url = require('url');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    const urlParsed = url.parse(req.url, true);
    const query = urlParsed.query;
    if (Object.keys(query).length > 0) {
        let message = 'Parameters: \n';
        for (key in query) {
            message += `${key}: ${query[key]} \n`
        }
        res.end(message);
    } else {
        res.end('Query parameters are not found');
    }
}).listen(8084);