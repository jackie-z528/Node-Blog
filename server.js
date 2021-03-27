const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, resp) => {

    // lodash
    const num = _.random(0, 20);
    console.log(num);

    

    // Setting header content type
    resp.setHeader('Content-Type', 'text/html');

    let path = './views';

    switch (req.url) {
        case '/':
            path += '/index.html';
            resp.statusCode = 200;
            break;
        case '/About':
            path += '/about.html';
            resp.statusCode = 200;
            break;
        case '/about-me':
            resp.setHeader('Location', '/About');
            resp.statusCode = 301;
            resp.end();
            break;
        default:
            path += '/404.html';
            resp.statusCode = 404;
            break;
    }

    // Sending html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            resp.end();
        } else {
            // resp.write(data);
            resp.end(data);
        }
    });

});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});

