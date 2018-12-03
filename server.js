///////////////////////////////////////////////////////
/////////////PHẦN HOAT DONG SERVER/////////////////////
//////////////////////////////////////////////////////
var express = require("express");
const parseurl = require('parseurl')
var bodyParser = require('body-parser');
const session = require('express-session')
var db = require('./DB-v2');
var app = express();

var onlineUser = [];
let sess;


var server = require("http").Server(app);
var io = require("socket.io")(server);

// app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));;

app.use(session({
    secret: 'doraemon',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 300000
    }
}));

app.use(function(req, res, next) {
    if (!req.session.views) {
        req.session.views = {}
    }

    // // get the url pathname
    // const pathname = parseurl(req).pathname

    // // count the views
    // req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
    // console.log(req.session.views[pathname])
    next();
});

server.listen(3000, function() {
    console.log('Server is running at port: 3000!')
});

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

app.get('/room', function(request, response) {
    sess = request.session;
    console.log('room', sess.id, ' ', sess.username);
    sess.username ? response.sendFile(__dirname + '/views/room.html') : response.redirect('/');
    // response.redirect('/main');
    // sess.username ? response.render('admin', { username: sess.username }) : response.render('login');
    // response.sendFile(__dirname + '/views/room.html');
});

app.get('/create', function(request, response) {
    sess = request.session;
    console.log('create', sess.id, ' ', sess.username);
    sess.username ? response.sendFile(__dirname + '/views/createMap.html') : response.redirect('/');
    // response.sendFile(__dirname + '/views/createMap.html');
});

app.get('/fight', function(request, response) {
    sess = request.session;
    console.log('fight', sess.id, ' ', sess.username);
    sess.username ? response.sendFile(__dirname + '/views/fight.html') : response.redirect('/');
    // response.sendFile(__dirname + '/views/fight.html');
});

app.get('/register', function(request, response) {
    response.sendFile(__dirname + '/views/register.html');
});

app.get('/gamepad', function(request, response) {
    sess = request.session;
    console.log('gamepad', sess.id, ' ', sess.username);
    response.sendFile(__dirname + '/views/gamepad.html');
});

app.get('/logout', function(request, response) {
    // console.log(request.session.username);
    // onlineUser.splice(onlineUser.indexOf(request.session.username), 1);
    // console.log(onlineUser);

    // console.log(onlineUser.indexOf(request.session.username));
    request.session.destroy((err) => {
        err ? console.log(err) : response.redirect('/')
    });
});

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/login', urlencodedParser, function(req, res) {
    request = {
        usn: req.body.username,
        pw: req.body.password
    };
    console.log(request);
    db.selectPlayer(req.body.username, req.body.password, function(isExist) {
        if (isExist) {
            if (!onlineUser.includes(req.body.username)) {
                onlineUser.push(req.body.username);
                console.log(onlineUser);
                res.send({ data: 1 });
            } else {
                res.send({ data: -1 });
            }
        } else {
            res.send({ data: 0 });
        }
    })
    sess = req.session;
    sess.username = req.body.username;
    // res.end('done');
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

var data_from_console;
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
        // Note: the 2 lines above could be replaced with this next one:
        // response.writeHead(200, {'Content-Type': 'application/json'})

        //const responseBody = { headers, method, url, body };
        //PHA const responseBody = {body};
        const responseBody = body;

        //post_data = JSON.stringify(responseBody);
        data_from_console = JSON.stringify(responseBody);
        console.log(data_from_console);

        // STARTGAME(data_from_console, 1);
        // JOINROOM(data.DATA);
    });
});

app.post('/hit', function(request, response) {
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
        // Note: the 2 lines above could be replaced with this next one:
        // response.writeHead(200, {'Content-Type': 'application/json'})

        //const responseBody = { headers, method, url, body };
        //PHA const responseBody = {body};
        const responseBody = "H:O";
        post_data = JSON.stringify(responseBody);
        response.send(post_data);
        //post_data = JSON.stringify(responseBody);
        // data_from_console = JSON.stringify(responseBody);
        // console.log(data_from_console);

        // STARTGAME(data_from_console, 1);
        // JOINROOM(data.DATA);
    });
});

function STARTGAME(TEXTDATA, PLAYER) {
    if (PLAYER == 1) {
        XuLyDuLieuGuiLenP1(TEXTDATA);
        HienThiKetQuaLenAllClientP1();
        // KIEMTRAENDGAME();
    } else {
        XuLyDuLieuGuiLenP2(TEXTDATA)
        HienThiKetQuaLenAllClientP2();
        // KIEMTRAENDGAME();
    }
}

////////////////////////////////////////////////////////
///////PHẦN XỬ LÝ//////////////////////////////////////
///////////////////////////////////////////////////////

var NumOfGamePad = 0;

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

function JOINROOM(TEXTDATA, TEXTCOOKIE) {
    result = 'none';
    if (TEXTDATA == "\"=U\"" && controsophonghientai > 1) {
        controsophonghientai -= 1;
    }
    if (TEXTDATA == "\"=D\"" && controsophonghientai < 3) {
        controsophonghientai += 1;
    }
    if (TEXTDATA == "\"=O\"") {
        if (phong[controsophonghientai - 1] < 2) {
            console.log("Ban da vao phong " + controsophonghientai);
            phong[controsophonghientai - 1] += 1;
            result = 'ok';
        } else if (phong[controsophonghientai - 1] == 2) {
            result = 'full';
        }
    }
    console.log(phong);
    io.sockets.emit("ROOM", { POIN: controsophonghientai, PHONG: phong, RESULT: result, COOKIE: TEXTCOOKIE });
}

io.on("connection", function(socket) {
    socket.emit("NumOfPlayerInRoom", { PHONG: phong, name: sess != null ? sess.username : 'null' });
    socket.emit("ShipPos", { P1: p1Ship, P2: p2Ship });
    // console.log("Co nguoi ket noi server, socket: " + socket.id);
    // var url = socket.handshake.headers.referer;

    socket.on('SendTextToSerVer', function(data) {
        console.log(data);

        STARTGAME(data.DATA, data.P);
        JOINROOM(data.DATA, data.COOKIE);
        //RESTARTGAME();

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
    if (controcontrol == "\"=L\"" || controcontrol == "\"=R\"" || controcontrol == "\"=U\"" || controcontrol == "\"=D\"" || controcontrol == "\"=O\"" || controcontrol == "\"=C\"") {
        if (controcontrol == "\"=L\"") {
            if (Math.abs(controplayer1 % 10) != 1) {
                controplayer1 -= 1;
            }
            key = 'L';
        } else if (controcontrol == "\"=R\"") {
            if (Math.abs(controplayer1 % 10) != 0) {
                controplayer1 += 1;
            }
            key = 'R';
        } else if (controcontrol == "\"=U\"") {
            if (Math.abs(Math.floor((controplayer1) / 10)) != 0) {
                controplayer1 -= 10;
            }
            key = 'U';
        } else if (controcontrol == "\"=D\"") {
            if (Math.abs(Math.floor((controplayer1) / 10)) != 9) {
                controplayer1 += 10;
            }
            key = 'D';
        } else if (controcontrol == "\"=O\"") {
            shot = 1;
            key = 'O';
        } else if (controcontrol == "\"=C\"") {
            shot = 1;
            key = 'C';
        }
    } else { error = 1; }
}


function XuLyDuLieuGuiLenP2(controcontrol) {
    if (controcontrol == "\"=L\"" || controcontrol == "\"=R\"" || controcontrol == "\"=U\"" || controcontrol == "\"=D\"" || controcontrol == "\"=O\"" || controcontrol == "\"=C\"") {
        if (controcontrol == "\"=L\"") {
            if (Math.abs(controplayer2 % 10) != 1) {
                controplayer2 -= 1;
            }
            key = 'L';
        } else if (controcontrol == "\"=R\"") {
            if (Math.abs(controplayer2 % 10) != 0) {
                controplayer2 += 1;
            }
            key = 'R';
        } else if (controcontrol == "\"=U\"") {
            if (Math.abs(Math.floor((controplayer2) / 10)) != 0) {
                controplayer2 -= 10;
            }
            key = 'U';
        } else if (controcontrol == "\"=D\"") {
            if (Math.abs(Math.floor((controplayer2) / 10)) != 9) {
                controplayer2 += 10;
            }
            key = 'D';
        } else if (controcontrol == "\"=O\"") {
            shot = 1;
            key = 'O';
        } else if (controcontrol == "\"=C\"") {
            shot = 1;
            key = 'C';
        }
    } else { error = 1; }
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