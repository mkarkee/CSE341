fs = require('fs')
const requestHandler = (req, res) => {
    const url = req.url;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Prove 01</title></head>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        res.end();
    }
    if (url === '/users'){
        const file_data = fs.readFileSync('users.txt', 'utf8');
        const users = file_data.trim().split('\n');
        console.log(users);
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Prove 01</title></head>');
        res.write('<body><ul>');
        for (var i=0; i < users.length; i++) {
            res.write('<li>');
            res.write(users[i]);
            res.write('</li>');
        }
        res.write('</ul></body>');
        res.write('</html>');
        res.end();
    }
    
    if(url === '/create-user') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            console.log(username);
            fs.appendFileSync('users.txt', '\n' + username);
            
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }
};

module.exports = requestHandler;

