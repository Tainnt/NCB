var mysql = require('mysql2');

var conn = mysql.createConnection({
    host: 'mysql-ncb.cdmcpyfgppxt.us-east-1.rds.amazonaws.com',
    user: 'root',
    password: '12345678',
    database: 'player',
});

conn.connect(function(err) {
    if (err)
        throw err.stack;
    else
        console.log('Connect successful');
});