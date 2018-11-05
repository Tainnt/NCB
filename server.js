///////////////////////////////////////////////////////
/////////////PHẦN HOAT DONG SERVER/////////////////////
//////////////////////////////////////////////////////
var express = require("express");
var bodyParser = require('body-parser');
var db = require('./DB-v2');
var app = express();
app.use(express.static("public"));
// app.set("view engine", "ejs");
// app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);

// var port = process.env.PORT || 3000;
app.use(express.static('public'));

server.listen(3000, function() {
    console.log('Server is running at port: 3000!')
})

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

app.get('/fight', function(request, response) {
    response.sendFile(__dirname + '/views/fight.html');
});

app.get('/register', function(request, response) {
    response.sendFile(__dirname + '/views/register.html');
});

app.get('/taycam', function(request, response) {
    response.sendFile(__dirname + '/views/taycam.html');
});

// app.get('/views/register.html', function(request, response) {
//     response.sendFile(__dirname + '/views/register.html');
// });

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/login', urlencodedParser, function(req, res) {
    request = {
        usn: req.body.username,
        pw: req.body.password
    };
    console.log(request);
    db.selectPlayer(req.body.username, req.body.password, function(isExist) {
        if (isExist) {
            res.send({ data: 1 });
        } else {
            res.send({ data: 0 });
        }
    })
});

app.post('/register', urlencodedParser, function(req, res) {
    request = {
        usn: req.body.username,
        pw: req.body.password
    };
    console.log(request);
    db.insertPlayer(req.body.username, req.body.password);
    res.send({ data: 1 });
});
////////////////////////////////////////////////////////
///////PHẦN XỬ LÝ//////////////////////////////////////
///////////////////////////////////////////////////////

//so do tau chien cua player1 1:co - 0:khong
var tauchienplayer1_array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];
var tauchienplayer2_array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

var controplayer1 = 1; // luu vi tri hien tai cua con tro player1 tat ca 100 vi tri 1-100.
var controplayer2 = 1; // luu vi tri hien tai cua con tro player2 tat ca 100 vi tri 1-100.
var controcontrol = 0; // luu du lieu tu tay cam gui len server UP/DOWN/LEFT/RIGHT/OK/CENCEL.
var shot = 0; // kiem tra xem tai vi tri do co thuyen khong, gui len wed 1:co - 0:khong
var error = 0;


io.on("connection", function(socket) {
    console.log("Co nguoi ket noi server, socket: " + socket.id);
    socket.on('SendTextToSerVer', function(data) {
        console.log(data);
        if (data.P == 1) {
            XuLyDuLieuGuiLenP1(data.DATA);
            HienThiKetQuaLenAllClientP1();
        } else {
            XuLyDuLieuGuiLenP2(data.DATA)
            HienThiKetQuaLenAllClientP2();
            console.log(controplayer2);
        }

    });
});


function XuLyDuLieuGuiLenP1(controcontrol) {

    if (controcontrol == "L" || controcontrol == "R" || controcontrol == "U" || controcontrol == "D" || controcontrol == "O" || controcontrol == "C") {
        if (controcontrol == "L") {
            if (controplayer1 == 1) {
                controplayer1 = 100;
            } else { controplayer1 -= 1; }
        } else if (controcontrol == "R") {
            if (controplayer1 == 100) {
                controplayer1 = 1;
            } else { controplayer1 += 1; }
        } else if (controcontrol == "U") {
            if (Math.floor((controplayer1) / 10) == 0 || controplayer1 == 10) {
                controplayer1 += 90;
            } else { controplayer1 -= 10; }
        } else if (controcontrol == "D") {
            if (Math.floor((controplayer1) / 10) == 9 || controplayer1 == 100) {
                controplayer1 -= 90;
            } else { controplayer1 += 10; }
        } else if (controcontrol == "O") {
            shot = 1;
        }
    } else { error = 1; }
}

function XuLyDuLieuGuiLenP2(controcontrol) {

    if (controcontrol == "L" || controcontrol == "R" || controcontrol == "U" || controcontrol == "D" || controcontrol == "O" || controcontrol == "C") {
        if (controcontrol == "L") {
            if (controplayer2 == 1) {
                controplayer2 = 100;
            } else { controplayer2 -= 1; }
        } else if (controcontrol == "R") {
            if (controplayer2 == 100) {
                controplayer2 = 1;
            } else { controplayer2 += 1; }
        } else if (controcontrol == "U") {
            if (Math.floor((controplayer2) / 10) == 0 || controplayer2 == 10) {
                controplayer2 += 90;
            } else { controplayer2 -= 10; }
        } else if (controcontrol == "D") {
            if (Math.floor((controplayer2) / 10) == 9 || controplayer2 == 100) {
                controplayer2 -= 90;
            } else { controplayer2 += 10; }
        } else if (controcontrol == "O") {
            shot = 1;
        }
    } else { error = 1; }
}

function HienThiKetQuaLenAllClientP1() {
    if (tauchienplayer2_array[controplayer1 - 1] == 1) {
        io.sockets.emit("NewData", { CONTRO: controplayer1, SHOT: shot, ERROR: error } /*{hinh:data, link:l}*/ );
    } else if (tauchienplayer2_array[controplayer1 - 1] == 0) {
        io.sockets.emit("NewData", { CONTRO: -controplayer1, SHOT: shot, ERROR: error } /*{hinh:data, link:l}*/ );
    }
    shot = 0;
    error = 0;
}

function HienThiKetQuaLenAllClientP2() {
    if (tauchienplayer1_array[controplayer2 - 1] == 1) {
        io.sockets.emit("NewData2", { CONTRO: controplayer2, SHOT: shot, ERROR: error } /*{hinh:data, link:l}*/ );
    } else if (tauchienplayer1_array[controplayer2 - 1] == 0) {
        io.sockets.emit("NewData2", { CONTRO: -controplayer2, SHOT: shot, ERROR: error } /*{hinh:data, link:l}*/ );
    }
    shot = 0;
    error = 0;
}