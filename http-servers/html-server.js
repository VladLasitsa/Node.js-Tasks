const http = require('http'),
    fs = require('fs'),
    through = require('through2'),
    path = require('path');

function preparingHTML(buffer, encoding, next) {
    this.push(buffer.toString().replace('{message}', 'Hello Mr. Fantastic!'));
    next();
}

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.createReadStream(path.resolve(__dirname, 'index.html'))
    .on('end', () => res.end())
    .on('error', error => console.error(error))
    .pipe(through(preparingHTML))
    .pipe(res);
}).listen(8081);