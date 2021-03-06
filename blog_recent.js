const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    if(req.url == '/'){
        getTitles(res);
    }else{
        console.log('你输入的地址：'+req.url+" 有误");
        res.end('你输入的地址：'+req.url+" 有误");
    }
}).listen(8081);

function getTitles(res){
    fs.readFile('./titles.json', (err, data) => {
        if(err) return hadError(err, res);
        getTemplate(JSON.parse(data.toString()), res);
    })
}

function getTemplate(titles, res){
    fs.readFile('./template.html', (err, data) => {
        if(err) return hadError(err, res);
        formatHtml(titles, data.toString(), res);
    });
}

function formatHtml(titles, tmpl, res){
    const html = tmpl.replace("%", titles.join('</li><li>'));
    res.end(html);
}

function hadError(err, res){
    console.error(err);
    res.end('Server Error');
}

console.log('Server running at http://127.0.0.1:8081/');