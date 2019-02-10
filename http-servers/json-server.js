const http = require('http');

const product = {
    id: 1,
    name: 'Suprem T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [
        {
            color: 'blue'
        }, {
            size: 'XL'
        }
    ]
};

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/json'});
  res.write(JSON.stringify(product));
  res.end();
}).listen(8082);