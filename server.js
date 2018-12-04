///////////////////////////////////////////////////////
/////////////PHẦN HOAT DONG SERVER/////////////////////
//////////////////////////////////////////////////////
var express = require("express");
var session = require("express-session")
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./DB-v2');
var app = express();
app.use(express.static("public"));

let sess;

var server = require("http").Server(app);
var io = require("socket.io")(server);

// app.use(bodyParser.json());
app.use(express.static('public'));

app.use(cookieParser());
app.use(session({
    secret: 'hahahihi8585',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

server.listen(3000, function() {
    console.log('Server is running at port: 3000!')
});

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

app.get('/room', function(request, response) {
    sess = request.session;
    sess.username ? response.sendFile(__dirname + '/views/room.html') : response.redirect('/');
});

app.get('/create', function(request, response) {
    sess = request.session;
    sess.username ? response.sendFile(__dirname + '/views/createMap.html') : response.redirect('/');
});

app.get('/fight', function(request, response) {
    sess = request.session;
    sess.username ? response.sendFile(__dirname + '/views/fight.html') : response.redirect('/');
});

app.get('/register', function(request, response) {
    response.sendFile(__dirname + '/views/register.html');
});

app.get('/gamepad', function(request, response) {
    response.sendFile(__dirname + '/views/gamepad.html');
});

app.get('/logout', function(request, response) {
    SESSIONID.splice(SESSIONID.indexOf(request.session), 1);
    SESSIONUSER.splice(SESSIONUSER.indexOf(request.session.username), 1);

    request.session.destroy((err) => {
        err ? console.log(err) : response.redirect('/')
    });
});

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/login', urlencodedParser, function(req, res) {

    db.selectPlayer(req.body.username, req.body.password, function(isExist) {
        if (isExist) {
            if (!SESSIONUSER.includes(req.body.username)) {
                res.send({ data: 1, ID: req.sessionID, usr: req.body.username });
                var temp = 0;
                for (var i = SESSIONID.length - 1; i >= 0; i--) {
                    if (SESSIONID[i] == req.sessionID) {
                        SESSIONUSER[i] = req.body.username;
                        temp = 1;
                    }
                }
                if (temp == 0) {
                    SESSIONID.push(req.sessionID);
                    SESSIONUSER.push(req.body.username);
                }
            } else {
                res.send({ data: -1 });
            }
        } else {
            res.send({ data: 0 });
        }
        //console.log(req.session.username);
        console.log("SESSIONID: " + SESSIONID);
        console.log("SESSIONUSER: " + SESSIONUSER);
    })
    sess = req.session;
    sess.username = req.body.username;
});

app.post('/register', urlencodedParser, function(req, res) {
    request = {
        usn: req.body.username,
        pw: req.body.password
    };
    console.log(request);
    db.findPlayer(req.body.username, function(isExist) {
        if (isExist) {
            res.send({ data: -1 });
        } else {
            db.insertPlayer(req.body.username, req.body.password);
            res.send({ data: 1 });
        }
    })
});

app.post('/', function(request, response) {
    const { headers, method, url } = request;
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        // BEGINNING OF NEW STUFF

        response.on('error', (err) => {
            console.error(err);
        });

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');

        const responseBody = body;

        //post_data = JSON.stringify(responseBody);
        var data_from_console = JSON.stringify(responseBody);
        console.log(data_from_console);

        STARTGAME(data_from_console, 1);
        JOINROOM(data.DATA);
    });
});

app.post('/board-info', function(request, response) {
    const { headers, method, url } = request;
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        // BEGINNING OF NEW STUFF
        console.log(body);

        const responseBody = "Gotta";
        var post_data = JSON.stringify(responseBody);
        response.send(post_data);
    });
});

app.post('/hit-or-not', function(request, response) {
    const { headers, method, url } = request;
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        // BEGINNING OF NEW STUFF

        response.on('error', (err) => {
            console.error(err);
        });

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');

        const responseBody = "H:O";
        var post_data = JSON.stringify(responseBody);
        response.send(post_data);
    });
});

function STARTGAME(DATA, PLAYER, COOKIE) {
    if (PLAYER == 1) {
        XuLyDuLieuGuiLenP1(DATA);
        HienThiKetQuaLenAllClientP1();
        // KIEMTRAENDGAME();
    } else {
        XuLyDuLieuGuiLenP2(DATA)
        HienThiKetQuaLenAllClientP2();
        // KIEMTRAENDGAME();
    }
}

////////////////////////////////////////////////////////
///////PHẦN XỬ LÝ//////////////////////////////////////
///////////////////////////////////////////////////////
SESSIONID = [];
SESSIONUSER = [];

//so do tau chien cua player1 1:co - 0:khong
var p1Ship = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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
var p2Ship = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
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
var key = 'O';

var result = 'none';
var controsophonghientai = 1; // chua con tro chi so phong hien tai
var phong = [0, 0, 0]; // chua mang phong

function JOINROOM(DATA, PLAYER, COOKIE) {
    result = 'none';
    if (DATA == "U" && controsophonghientai > 1) {
        controsophonghientai -= 1;
    }
    if (DATA == "D" && controsophonghientai < 3) {
        controsophonghientai += 1;
    }
    if (DATA == "O") {
        if (phong[controsophonghientai - 1] < 2) {
            console.log("Ban da vao phong " + controsophonghientai);
            phong[controsophonghientai - 1] += 1;
            result = 'ok';
        } else if (phong[controsophonghientai - 1] == 2) {
            result = 'full';
        }
    }
    console.log(phong);
    io.sockets.emit("Room", { POIN: controsophonghientai, PHONG: phong, RESULT: result, COOKIE: COOKIE });
}

io.on("connection", function(socket) {
    socket.emit("NumOfPlayerInRoom", { PHONG: phong });
    socket.emit("ShipPos", { P1: p1Ship, P2: p2Ship });
    socket.emit("data-user", { usr: SESSIONUSER, ID: SESSIONID });

    socket.on('SendTextToSerVer', function(data) {
        console.log(data);

        STARTGAME(data.DATA, data.P, data.COOKIE);
        JOINROOM(data.DATA, data.P, data.COOKIE);
        //RESTARTGAME();

    });
    socket.on("YeuCauUser", function(data) {
        console.log("COOKIE " + data.COKI);
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data.COKI) {
                socket.emit('ResYeuCauUser', {
                    USerLa: SESSIONUSER[i],
                });
                break;
            } else {
                socket.emit('ResYeuCauUser', {
                    USerLa: "Chưa đăng nhập",
                });
            }
        }
    });

    socket.on('sendShipPos', function(data) {
        if (data.player == 1) {
            p1Ship = data.Arr;
            console.log('added to p1Ship');
        } else if (data.player == 2) {
            p2Ship = data.Arr;
            console.log('added to p2Ship');
        } else
            console.log('Khong tim thay tau');
    });
});


function XuLyDuLieuGuiLenP1(controcontrol) {
    if (controcontrol == "L") {
        if (Math.abs(controplayer1 % 10) != 1) {
            controplayer1 -= 1;
        }
        key = 'L';
    } else if (controcontrol == "R") {
        if (Math.abs(controplayer1 % 10) != 0) {
            controplayer1 += 1;
        }
        key = 'R';
    } else if (controcontrol == "U") {
        if (Math.abs(Math.floor((controplayer1) / 10)) != 0) {
            controplayer1 -= 10;
        }
        key = 'U';
    } else if (controcontrol == "D") {
        if (Math.abs(Math.floor((controplayer1) / 10)) != 9) {
            controplayer1 += 10;
        }
        key = 'D';
    } else if (controcontrol == "O") {
        shot = 1;
        key = 'O';
    } else if (controcontrol == "C") {
        shot = 1;
        key = 'C';
    } else {
        error = 1;
    }
}


function XuLyDuLieuGuiLenP2(controcontrol) {
    if (controcontrol == "L\"=L\"") {
        if (Math.abs(controplayer2 % 10) != 1) {
            controplayer2 -= 1;
        }
        key = 'L';
    } else if (controcontrol == "R") {
        if (Math.abs(controplayer2 % 10) != 0) {
            controplayer2 += 1;
        }
        key = 'R';
    } else if (controcontrol == "U") {
        if (Math.abs(Math.floor((controplayer2) / 10)) != 0) {
            controplayer2 -= 10;
        }
        key = 'U';
    } else if (controcontrol == "D") {
        if (Math.abs(Math.floor((controplayer2) / 10)) != 9) {
            controplayer2 += 10;
        }
        key = 'D';
    } else if (controcontrol == "O") {
        shot = 1;
        key = 'O';
    } else if (controcontrol == "C") {
        shot = 1;
        key = 'C';
    } else {
        error = 1;
    }
}

function HienThiKetQuaLenAllClientP1() {
    if (p2Ship[controplayer1 - 1] != 'N') {
        io.sockets.emit("NewData", { CONTRO: controplayer1, SHOT: shot, ERROR: error, KEY: key, SHIP: p1Ship });
    } else {
        io.sockets.emit("NewData", { CONTRO: -controplayer1, SHOT: shot, ERROR: error, KEY: key, SHIP: p1Ship });
    }
    shot = 0;
    error = 0;
}

function HienThiKetQuaLenAllClientP2() {
    if (p1Ship[controplayer2 - 1] != 'N') {
        io.sockets.emit("NewData2", { CONTRO: controplayer2, SHOT: shot, ERROR: error } /*{hinh:data, link:l}*/ );
    } else {
        io.sockets.emit("NewData2", { CONTRO: -controplayer2, SHOT: shot, ERROR: error } /*{hinh:data, link:l}*/ );
    }
    shot = 0;
    error = 0;
}