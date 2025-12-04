let http = require('http');
let fs = require('fs');

const server = http.createServer(
    (req, res) => {
        
        let file = "";

        switch(req.url){
            case '/':
                file = './index.html';
                break;
            case '/about':
                file = './About.html';
                break;
            case '/contact':
                file = './Contact.html';
                break;
            default:
                file = './404.html';
        }
        let data = fs.readFileSync(file, 'utf-8');
        res.end(data);
    }
);

server.listen(9000, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log(`Server start at http://localhost:9000`);
    }
});