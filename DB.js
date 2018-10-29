var mysql = require('mysql2');

var conn = mysql.createConnection({
    host: 'doanncb.cmgo5lgdr42o.us-west-2.rds.amazonaws.com',
    user: 'root',
    password: '12345678',
    database: 'battle_ship',
});

conn.connect(function(err) {
    if (err)
        throw err.stack;
    else
        console.log('Connect successful');
});