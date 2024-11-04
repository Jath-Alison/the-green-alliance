const { createServer } = require('node:http');
var url = require('url');

/*

3 tables

CustomerLogin
- UserID
- Username
- Password
CriteriaConfig
- CriteriaID
- UserID
- EventID
- Criteria Name
- Criteria Weight
CriteriaEntries
- Criteria ID

*/

var mysql = require('mysql');
const { error } = require('node:console');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "JathSQL_123",
    database: "TheGreenAllianceDb"
});

const hostname = '';
const port = 3000;

const server = createServer((req, res) => {

    var q = url.parse(req.url, true).query;

    if (q.cmd == "login") {
        con.query(`Select * From user where username='${q.username}' and password='${q.password}'`, function (err, result) {
            if (err) throw err;

            if (result.length == 1) {
                res.statusCode = 200;
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Content-Type', 'application/json');

                var out = {
                    status: {
                        error: false,
                        error_desc: ""
                    },
                    data: {
                        UserID: result[0].userid,
                        Username: result[0].username,
                        Password: result[0].password
                    }

                };

                res.end(JSON.stringify(out));
            } else {
                res.statusCode = 200;
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Content-Type', 'application/json');


                var out = {
                    status: {
                        error: true,
                        error_desc: "invalid username or password"
                    },
                    data: {}

                };

                res.end(JSON.stringify(out));
            }
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end("Page not Found");
    }

});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});