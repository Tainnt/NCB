var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'mysql-ncb.cdmcpyfgppxt.us-east-1.rds.amazonaws.com',
    user: 'root',
    password: '12345678',
    database: 'player',
});

//connect.
conn.connect(function(err) {
    //nếu có nỗi thì in ra
    if (err)
        throw err.stack;
    else
        console.log('Connect successful');
    //nếu thành công
    // var sql = "CREATE TABLE player (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT , username varchar(30) not null, password varchar(10) not null)";
    // conn.query(sql, function(err) {
    //     if (err) throw err;
    //     console.log('Create table successful');
    //});
});