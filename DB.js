var mysql = require('mysql2');

var conn = mysql.createConnection({
    host: 'doanncb.cmgo5lgdr42o.us-west-2.rds.amazonaws.com',
    user: 'root',
    password: '12345678',
    database: 'battle_ship',
});

// conn.connect(function(err) {
//     //nếu có nỗi thì in ra
//     if (err) throw err.stack;
//     //nếu thành công
//     var sql = "CREATE TABLE player (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT , username varchar(20) not null, password varchar(10) not null)";
//     conn.query(sql, function(err) {
//         if (err) throw err;
//         console.log('Create table successful');
//     });
// });

conn.connect(function(err) {
    //nếu có nỗi thì in ra
    if (err) throw err.stack;
    //nếu thành công
    var sql = "INSERT INTO player(username,password) values ('Tai', '123'),('Pha','123'), ('Men', '123')";
    conn.query(sql, function(err) {
        if (err) throw err;
        console.log('Insert successful');
    });
});