var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'mysql-ncb.cdmcpyfgppxt.us-east-1.rds.amazonaws.com',
    user: 'root',
    password: '12345678',
    database: 'mysql-ncb',
});

//connect.
conn.connect(function(err) {
    //nếu có nỗi thì in ra
    if (err) throw err.stack;
    //nếu thành công
    var sql = "CREATE TABLE player (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT , username varchar(30) not null, password varchar(10) not null)";
    conn.query(sql, function(err) {
        if (err) throw err;
        console.log('Create table successful');
    });
});
//close connect
// conn.end(function (err) {
//     if (err) throw err;
//     console.log('DB closes');
// });
//insert
// conn.connect(function (err){
//     //nếu có nỗi thì in ra
//     if (err) throw err.stack;
//     //nếu thành công
//     var sql = "INSERT INTO player(username,password) values ('Tai', '123'),('Pha','456'), ('Men', '789')";
//     conn.query(sql, function (err) {
//         if (err) throw err;
//         console.log('Insert successful');
//     });
// });