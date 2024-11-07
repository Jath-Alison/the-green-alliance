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
- TeamID
- Criteria Value

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

    console.log("Received " + req.url + " " + req.method);

    if (req.method == "OPTIONS") {
        // console.log("Options sent");

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end("Page Exists");
    } else if (req.method == "GET") {
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
                            userid: result[0].userid,
                            username: result[0].username,
                            password: result[0].password
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
        } else if (q.cmd == "getCriteriaConfig") {
            con.query(`Select * From criteria_config where user_id=${q.userid} and event_id=${q.eventid}`, function (err, result) {
                if (err) throw err;

                var error_out = false;
                var error_desc_out = "";
                var data_out = [];

                if (result.length == 0) {
                    error_out = true;
                    error_desc_out = "No Criteria Configs Found";
                } else if (result.length > 0) {
                    data_out = result;
                }

                res.statusCode = 200;
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Content-Type', 'application/json');

                var out = {
                    status: {
                        error: error_out,
                        error_desc: error_desc_out
                    },
                    data: data_out
                };

                res.end(JSON.stringify(out));

            });
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end("Page not Found");
        }
    } else if (req.method == "POST") {
        console.log("Post Received");
        if (q.cmd == "setCriteriaConfig") {
            let data = '';
            req.on('data', chunk => {
                data += chunk.toString();
            });
            req.on('end', () => {
                // console.log('POST data:', data);
                res.setHeader('Access-Control-Allow-Origin', '*');

                res.setHeader('Content-Type', 'application/json');

                let criteria_config = JSON.parse(data);
                let queryString = '';

                for (let i = 0; i < criteria_config.data.length; i++) {
                    queryString = `Update criteria_config Set criteria_name='${criteria_config.data[i].criteria_name}', criteria_weight=${criteria_config.data[i].criteria_weight} Where criteria_id=${criteria_config.data[i].criteria_id};`;
                    con.query(queryString, function (err, result) {
                        if (err) throw err;
                    });
                }


                res.end(data);
            });
        } else if (q.cmd == "addCriteriaConfig") {
            let data = '';
            req.on('data', chunk => {
                data += chunk.toString();
            });
            req.on('end', () => {
                // console.log('POST data:', data);
                res.setHeader('Access-Control-Allow-Origin', '*');

                res.setHeader('Content-Type', 'application/json');

                let criteria_config = JSON.parse(data);
                let queryString = '';

                queryString = `Insert Into criteria_config (user_id, event_id, criteria_name, criteria_weight) Values (${criteria_config.user_id}, ${criteria_config.event_id}, '${criteria_config.criteria_name}', ${criteria_config.criteria_weight});`;
                con.query(queryString, function (err, result) {
                    if (err) throw err;
                });


                res.end(data);
            });
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end("Page not Found");
    }

});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});