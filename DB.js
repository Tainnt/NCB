var mysql = require('mysql2');

var conn = mysql.createConnection({
    host: 'mysql-ncb.cdmcpyfgppxt.us-east-1.rds.amazonaws.com',
    user: 'root',
    password: '12345678',
    database: 'player',
});

//connect.
// conn.connect(function(err) {
//     //nếu có nỗi thì in ra
//     if (err)
//         throw err.stack;
//     else
//         console.log('Connect successful');
// });

conn.query(
    'SELECT * FROM battle_ship_player',
    function(err, results, fields) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    }
);