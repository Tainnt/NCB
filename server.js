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
    sess = request.session;
    // sess.username ? response.redirect('/room') : response.sendFile(__dirname + '/views/index.html');
    var temp = 0;
    for (var i = SESSIONID.length - 1; i >= 0; i--) {
        if (SESSIONID[i] == request.sessionID) {
            if (STRUCT[i].KiemTraTrangThai() == 0) {
                response.sendFile(__dirname + '/views/index.html');
                // response.redirect('/');
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 1) {
                // response.sendFile(__dirname + '/views/room.html');
                response.redirect('/room')
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 2) {
                // response.sendFile(__dirname + '/views/createMap.html');
                response.redirect('/create');
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 3) {
                // response.sendFile(__dirname + '/views/fight.html');
                response.redirect('/fight');
                temp = 1;
            }
            //console.log("Trang thai sau: " + STRUCT[i].KiemTraTrangThai() + " " + STRUCT[i].username);
        }
    }
    if (temp == 0) {
        response.sendFile(__dirname + '/views/index.html');
    }
});

app.get('/room', function(request, response) {
    sess = request.session;
    // sess.username ? response.sendFile(__dirname + '/views/room.html') : response.redirect('/');
    if (sess.username) {
        //v7+
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == request.sessionID) {
                //console.log("Trang thai truoc: " + STRUCT[i].KiemTraTrangThai() + " " + STRUCT[i].username);
                if (STRUCT[i].KiemTraTrangThai() == 0) {
                    STRUCT[i].setTrangThai("room");
                }
                //console.log("Trang thai sau: " + STRUCT[i].KiemTraTrangThai() + " " + STRUCT[i].username);
            }
        }
        //v7-
    }
    var temp = 0;
    for (var i = SESSIONID.length - 1; i >= 0; i--) {
        if (SESSIONID[i] == request.sessionID) {
            if (STRUCT[i].KiemTraTrangThai() == 0) {
                response.sendFile(__dirname + '/views/index.html');
                // response.redirect('/');
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 1) {
                response.sendFile(__dirname + '/views/room.html');
                // response.redirect('/room')
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 2) {
                // response.sendFile(__dirname + '/views/createMap.html');
                response.redirect('/create');
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 3) {
                // response.sendFile(__dirname + '/views/fight.html');
                response.redirect('/fight');
                temp = 1;
            }
            //console.log("Trang thai sau: " + STRUCT[i].KiemTraTrangThai() + " " + STRUCT[i].username);
        }
    }
    if (temp == 0) {
        response.sendFile(__dirname + '/views/index.html');
    }
});

app.get('/create', function(request, response) {
    sess = request.session;
    // sess.username ? response.sendFile(__dirname + '/views/createMap.html') : response.redirect('/');
    if (sess.username) {
        //v7+
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == request.sessionID) {
                //console.log("Trang thai truoc: " + STRUCT[i].KiemTraTrangThai() + " " + STRUCT[i].username);
                if (STRUCT[i].KiemTraTrangThai() == 1) {
                    STRUCT[i].setTrangThai("create");
                }
                //console.log("Trang thai sau: " + STRUCT[i].KiemTraTrangThai() + " " + STRUCT[i].username);
            }
        }
        //v7-
    }

    var temp = 0;
    for (var i = SESSIONID.length - 1; i >= 0; i--) {
        if (SESSIONID[i] == request.sessionID) {
            if (STRUCT[i].KiemTraTrangThai() == 0) {
                response.sendFile(__dirname + '/views/index.html');
                // response.redirect('/');
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 1) {
                // response.sendFile(__dirname + '/views/room.html');
                response.redirect('/room')
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 2) {
                response.sendFile(__dirname + '/views/createMap.html');
                // response.redirect('/create');
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 3) {
                // response.sendFile(__dirname + '/views/fight.html');
                response.redirect('/fight');
                temp = 1;
            }
            //console.log("Trang thai sau: " + STRUCT[i].KiemTraTrangThai() + " " + STRUCT[i].username);
        }
    }
    if (temp == 0) {
        response.sendFile(__dirname + '/views/index.html');
    }
});

app.get('/fight', function(request, response) {
    sess = request.session;
    // sess.username ? response.sendFile(__dirname + '/views/fight.html') : response.redirect('/');
    if (sess.username) {
        //v7+
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == request.sessionID) {
                //console.log(STRUCT[i].KiemTraTrangThai() + "Trang thai truoc");
                if (STRUCT[i].KiemTraTrangThai() == 2) {
                    STRUCT[i].setTrangThai("fight");
                }
                //console.log(STRUCT[i].KiemTraTrangThai() + "Trang thai sau");
            }
        }
        //v7-
    }
    var temp = 0;
    for (var i = SESSIONID.length - 1; i >= 0; i--) {
        if (SESSIONID[i] == request.sessionID) {
            if (STRUCT[i].KiemTraTrangThai() == 0) {
                response.sendFile(__dirname + '/views/index.html');
                // response.redirect('/');
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 1) {
                // response.sendFile(__dirname + '/views/room.html');
                response.redirect('/room')
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 2) {
                // response.sendFile(__dirname + '/views/create.html');
                response.redirect('/create');
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 3) {
                response.sendFile(__dirname + '/views/fight.html');
                // response.redirect('/fight');
                temp = 1;
            }
            //console.log("Trang thai sau: " + STRUCT[i].KiemTraTrangThai() + " " + STRUCT[i].username);
        }
    }
    if (temp == 0) {
        response.sendFile(__dirname + '/views/index.html');
    }
    //FYEUCAUCHECKSERVER();
});

app.get('/register', function(request, response) {
    response.sendFile(__dirname + '/views/register.html');
});

app.get('/gamepad', function(request, response) {
    response.sendFile(__dirname + '/views/gamepad.html');
});

app.get('/logout', function(request, response) {
    checkID.splice(checkUser.indexOf(request.session.username), 1);
    // gamepadArr.push(userGamepad[checkUser.indexOf(request.session.username)] + "");
    // gamepadArr.sort();
    userGamepad.splice(checkUser.indexOf(request.session.username), 1);
    // SESSIONUSER.splice(SESSIONUSER.indexOf(request.session.username), 1);
    checkUser.splice(checkUser.indexOf(request.session.username), 1);
    for (var i = SESSIONID.length - 1; i >= 0; i--) {
        if (SESSIONID[i] == request.sessionID) {
            STRUCT[i].setTrangThai('');
        }
    }
    console.log("checkUser: " + checkUser);
    console.log("checkID: " + checkID);
    console.log("userGamepad: " + userGamepad);
    console.log("gamepadArr: " + gamepadArr);
    io.sockets.emit("gamepadArr", { arr: gamepadArr, ss: checkID, id: userGamepad });
    // request.session.destroy((err) => {
    //     err ? console.log(err) : response.redirect('/')
    // });
    response.redirect('/');
});

app.get('/test', function(request, response) {
    socket.emit('hit', { hit: true, COKI: x });
});

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/login', urlencodedParser, function(req, res) {

    db.selectPlayer(req.body.username, req.body.password, function(isExist) {
        if (isExist) {
            if (!checkUser.includes(req.body.username)) {
                checkUser.push(req.body.username);
                checkID.push(req.sessionID);
                console.log("checkUser: " + checkUser);
                console.log("checkID: " + checkID);
                res.send({ data: 1, ID: req.sessionID, usr: req.body.username });
                var temp = 0;
                for (var i = SESSIONID.length - 1; i >= 0; i--) {
                    if (SESSIONID[i] == req.sessionID) {
                        SESSIONUSER[i] = req.body.username;
                        //v7+
                        STRUCT[i] = new User();
                        STRUCT[i].setTrangThai("login");
                        STRUCT[i].setUer(req.sessionID);
                        //v7-
                        temp = 1;
                    }
                }
                if (temp == 0) {
                    SESSIONID.push(req.sessionID);
                    SESSIONUSER.push(req.body.username);
                    //V7+
                    STRUCT[useronline] = new User();
                    STRUCT[useronline].setTrangThai("login");
                    STRUCT[useronline].setUer(req.sessionID);
                    useronline += 1;
                    //V7-
                }
            } else {
                res.send({ data: -1 });
            }
        } else {
            res.send({ data: 0 });
        }
        //console.log(req.session.username);
        // console.log("SESSIONID: " + SESSIONID);
        // console.log("SESSIONUSER: " + SESSIONUSER);
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

        const responseBody = body;

        //post_data = JSON.stringify(responseBody);
        data_from_console = JSON.stringify(responseBody);
        if (data_from_console.length != 0) {
            console.log("data_from_console: " + data_from_console);
            var reqKey = data_from_console[1];
            var reqID = data_from_console.slice(3, 8);

            console.log("id: " + reqID);
            console.log("reqKey: " + reqKey);
            //===============UNCOMMENT UNDER FUNCTIONS DE TEST BANG BOARD THAT=================//
            FYEUCAUCHECKSERVER();
            var index = userGamepad.indexOf(reqID);
            var ID = SESSIONID.indexOf(checkID[index]);
            console.log("id nguoi choi: " + ID);
            //GAME(reqKey, ID);
        }
    });
});

var gamepadArr = [];
app.post('/board-info', function(request, response) {
    const { headers, method, url } = request;
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        response.on('error', (err) => {
            console.error(err);
        });
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');

        // if (body == 'b_i') {
        //     gamepadArr.push(gamepadArr.length + 1);
        //     post_data = JSON.stringify(gamepadArr.length + "");
        //     response.send(post_data);
        //     // io.sockets.emit("gamepadArr", { arr: gamepadArr });
        //     io.sockets.emit("gamepadArr", { arr: gamepadArr, ss: SESSIONID, id: userGamepad });
        // } else {
        //     post_data = JSON.stringify("error");
        //     response.send(post_data);
        // }
        console.log(body);
        if (!gamepadArr.includes(body))
            gamepadArr.push(body);
        // gamepadArr.sort();
        // post_data = JSON.stringify(gamepadArr.length + "");
        // post_data = JSON.stringify("connected");
        post_data = "\"connected\"";
        response.send(post_data);
        io.sockets.emit("gamepadArr", { arr: gamepadArr, ss: checkID, id: userGamepad });
    });
});

var vibrator = false;
app.post('/hit-or-not', function(request, response) {
    const { headers, method, url } = request;
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        response.on('error', (err) => {
            console.error(err);
        });

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        console.log(body);
        if (gamepadArr.includes(body)) {
            var flag = false;
            io.sockets.on('hit', function(data) {
                if (data.hit) {
                    var index = 0;
                    for (index = 0; index < checkID.length; index++) {
                        if (checkID[index] == data.COKI)
                            break;
                    }
                    console.log("Gamepad vibrator: " + gamepadArr[index])
                    post_data = JSON.stringify(gamepadArr[index]);
                    response.send(post_data);
                    flag = true;
                }
            });
            if (!flag) {
                post_data = JSON.stringify("");
                response.send(post_data);
            }
        } else {
            post_data = JSON.stringify("Can't find gamepad");
            response.send(post_data);
        }
        // if (body == 'H?') {
        //     if (vibrator) {
        //         post_data = JSON.stringify("H:O");
        //         response.send(post_data);
        //     }
        // } else {
        //     post_data = JSON.stringify("error");
        //     response.send(post_data);
        // }
    });
});

////////////////////////////////////////////////////////
///////PHẦN XỬ LÝ//////////////////////////////////////
///////////////////////////////////////////////////////

//++++++++++++++++Function User++++++++++++++++++++++++++++++++++++++++++++++++++++
//---Chuc nang: Luu giu thong tin cua user(STRUCT)-----//
//---Tham so: Khong//
//---Cach dung: khong dung trong chuong trinh - chi dung phuong thuc cua no--------------
//trang thai 0: dang nhap va chon tay cam
//Trang thai 1: room
//trang thai 2: creatmap
//trang thai 3: fight
function User() {
    // Thuộc tính chinh
    this.username = '';
    this.trangthai = '';
    // Thuộc tính room
    this.vitriphong = 1;
    this.keyvaoroom = 0;
    // Thuộc tính create map
    this.controplayercreate = 1;
    this.shotcreate = 0;
    this.keycreate = 'R';
    this.shipmap = [];
    // Thuộc tính fight
    this.sangsang = 0;
    this.controplayerfight = 1;
    this.shotfight = 0;
    this.playagain = 0;

    // Phương thức
    this.setUer = function(username) {
        this.username = username;
    };
    this.setTrangThai = function(trangthai) {
        this.trangthai = trangthai;
    };
    this.setViTriPhong = function(sophong) {
        this.vitriphong = sophong;
    };
    this.setKeyVaoRoom = function(key) {
        this.keyvaoroom = key;
    };
    this.setConTroPlayerCreat = function(contro) {
        this.controplayercreate = contro;
    };
    this.setShotCreat = function(shot) {
        this.shotcreate = shot;
    };
    this.setKeyCreat = function(keycr) {
        this.keycreate = keycr;
    };
    this.setShipMap = function(shipm) {
        this.shipmap = shipm;
    };
    this.setSangSang = function(ss) {
        this.sangsang = ss;
    };
    this.setConTroPlayerFight = function(controf) {
        this.controplayerfight = controf;
    };
    this.setShotFight = function(shotf) {
        this.shotfight = shotf;
    };
    this.setPlayAgain = function(again) {
        this.playagain = again;
    };

    this.KiemTraTrangThai = function() {
        if (this.trangthai == "room") {
            return 1;
        } else if (this.trangthai == "create") {
            return 2;
        } else if (this.trangthai == "fight") {
            return 3;
        } else { return 0 }
    };

    // Phải return this thì mới tạo mới được đối tượng
    return this;
}
var STRUCT = [];
var PHONGS = new TPHONG();
//V12
function TPHONG() {

    this.phong1 = [];
    this.phong2 = [];
    this.phong3 = [];
    // Thuộc tính fight


    // Phương thức
    this.setPhong1 = function(phong) {
        if (this.phong1.length == 0) {
            this.phong1[0] = phong;
        } else this.phong1[1] = phong;
    };
    this.setPhong2 = function(phong) {
        if (this.phong2.length == 0) {
            this.phong2[0] = phong;
        } else this.phong2[1] = phong;
    };
    this.setPhong3 = function(phong) {
        if (this.phong3.length == 0) {
            this.phong3[0] = phong;
        } else this.phong3[1] = phong;
    };

    this.KiemTraTrangThai = function() {
        if (this.trangthai == "room") {
            return 1;
        } else if (this.trangthai == "create") {
            return 2;
        } else if (this.trangthai == "fight") {
            return 3;
        } else { return 0 }
    };

    // Phải return this thì mới tạo mới được đối tượng
    return this;
}
//v12-
//V7-
SESSIONID = [];
SESSIONUSER = [];
userGamepad = [];
var checkUser = [];
var checkID = [];
var useronline = 0;
//so do tau chien cua player1 1:co - 0:khong
var p1Ship = [];
var p2Ship = [];

var controplayer1 = 1; // luu vi tri hien tai cua con tro player1 tat ca 100 vi tri 1-100.
var controplayer2 = 1; // luu vi tri hien tai cua con tro player2 tat ca 100 vi tri 1-100.
var controcontrol = 0; // luu du lieu tu tay cam gui len server UP/DOWN/LEFT/RIGHT/OK/CENCEL.
var shot = 0; // kiem tra xem tai vi tri do co thuyen khong, gui len wed 1:co - 0:khong
var error = 0;
var key = 'O';

var result = 'none';
var controsophonghientai = 1; // chua con tro chi so phong hien tai
var phong = []; // chua mang phong
phong[0] = 0;
phong[1] = 0;
phong[2] = 0;

//++++++++++++++++Function JOINROOM++++++++++++++++++++++++++++++++++++++++++++++++++++
//---Chuc nang: Quan ly con tro trong trang room-----//
//---Tham so: 1. TEXTDATA (U,D,L,R,O,C) 2.controsophonghientai (la vi tri con tro hien tai)//
//---Cach dung: Duoc goi trong ham GAME------------------------------
function JOINROOM(TEXTDATA, controsophonghientai) {
    result = 'none';
    if (TEXTDATA == "U" && controsophonghientai > 1) {
        controsophonghientai -= 1;
    }
    if (TEXTDATA == "D" && controsophonghientai < 3) {
        controsophonghientai += 1;
    }
    return controsophonghientai;
}

io.on("connection", function(socket) {
    //socket.emit("NumOfPlayerInRoom", { PHONG: phong });
    YEUCAUUSER();
    //socket.emit("ShipPos", { P1: p1Ship, P2: p2Ship });
    FYEUCAUCHECKSERVER();
    socket.emit("gamepadArr", { arr: gamepadArr, ss: checkID, id: userGamepad });
    socket.on('gamepadSelected', function(data) {
        userGamepad[checkID.indexOf(data.COKI)] = gamepadArr[data.i];
        console.log("checkUser: " + checkUser);
        console.log("userGamepad: " + userGamepad);
        // gamepadArr.splice(data.i, 1);
        io.sockets.emit("gamepadArr", { arr: gamepadArr, ss: checkID, id: userGamepad });
    });
    //Nhung cau lenh trong ham nay dc su dung trong ham POST
    socket.on('SendTextToSerVer', function(data) {
        console.log(data);
        FYEUCAUCHECKSERVER();
        GAME(data.DATA, data.P);
    });
    socket.on('pointerChange', function(data) {
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data.COKI) {
                console.log("User: " + SESSIONUSER[i]);
                console.log("pointer: " + STRUCT[i].controplayercreate);
                STRUCT[i].controplayercreate = data.pt + 1;
                console.log("edit pointer: " + STRUCT[i].controplayercreate);
            }
        }
    });
    //++++++++++++++++Function YEUCAUUSER++++++++++++++++++++++++++++++++++++++++++++++++++++
    //---Chuc nang: Yeu cau cac client check trang thai user tren SERVER-----//
    //---Tham so: Khong//
    //---Cach dung: Dc dung khi lan dau load trang html moi--------------
    function YEUCAUUSER() {
        socket.on("YeuCauUser", function(data) {
            //console.log("COOKIE " + data.COKI);
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
    }

    function CHECKLUOT(data) {

        var enemy = data;
        var EnemyLa = 0;
        var YOU = 0;
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data) {
                YOU = STRUCT[i].sangsang;
                if (STRUCT[i].vitriphong == 1) {
                    if (PHONGS.phong1.length == 2) {
                        if (PHONGS.phong1[0] == data) {
                            EnemyLa = 1;
                        } else { EnemyLa = 2; }
                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 2) {
                    if (PHONGS.phong2.length == 2) {

                        if (PHONGS.phong2[0] == data) {
                            EnemyLa = 1;
                        } else { EnemyLa = 2; }
                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 3) {
                    if (PHONGS.phong3.length == 2) {
                        if (PHONGS.phong3[0] == data) {
                            EnemyLa = 1;
                        } else { EnemyLa = 2; }
                    } else {
                        EnemyLa = 0;
                    }
                }
                break;
            }
        }
        return EnemyLa;
    }

    function SHIPENYMYMAP(data) {

        var enemy = data;
        var EnemyLa = 0;
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data) {
                YOU = STRUCT[i].sangsang;
                if (STRUCT[i].vitriphong == 1) {
                    if (PHONGS.phong1.length == 2) {
                        if (PHONGS.phong1[0] == data) {
                            enemy = PHONGS.phong1[1];
                        } else { enemy = PHONGS.phong1[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].shipmap;
                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 2) {
                    if (PHONGS.phong2.length == 2) {

                        if (PHONGS.phong2[0] == data) {
                            enemy = PHONGS.phong2[1];
                        } else { enemy = PHONGS.phong2[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].shipmap;

                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 3) {
                    if (PHONGS.phong3.length == 2) {
                        if (PHONGS.phong3[0] == data) {
                            enemy = PHONGS.phong3[1];
                        } else { enemy = PHONGS.phong3[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].shipmap;
                                //console.log("enemy la:" + EnemyLa);
                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                }
                break;
            }
        }
        return EnemyLa;
    }

    function CHECKSHOTENEMY(data) {

        var enemy = data;
        var EnemyLa = 0;
        var YOU = 0;
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data) {
                YOU = STRUCT[i].sangsang;
                if (STRUCT[i].vitriphong == 1) {
                    if (PHONGS.phong1.length == 2) {
                        if (PHONGS.phong1[0] == data) {
                            enemy = PHONGS.phong1[1];
                        } else { enemy = PHONGS.phong1[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].shotfight;
                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 2) {
                    if (PHONGS.phong2.length == 2) {

                        if (PHONGS.phong2[0] == data) {
                            enemy = PHONGS.phong2[1];
                        } else { enemy = PHONGS.phong2[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].shotfight;

                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 3) {
                    if (PHONGS.phong3.length == 2) {
                        if (PHONGS.phong3[0] == data) {
                            enemy = PHONGS.phong3[1];
                        } else { enemy = PHONGS.phong3[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].shotfight;
                                //console.log("enemy la:" + EnemyLa);
                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                }
                break;
            }
        }
        return EnemyLa;
    }

    function CHECKCONTROENEMY(data) {

        var enemy = data;
        var EnemyLa = 0;
        var YOU = 0;
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data) {
                YOU = STRUCT[i].sangsang;
                if (STRUCT[i].vitriphong == 1) {
                    if (PHONGS.phong1.length == 2) {
                        if (PHONGS.phong1[0] == data) {
                            enemy = PHONGS.phong1[1];
                        } else { enemy = PHONGS.phong1[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].controplayerfight;
                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 2) {
                    if (PHONGS.phong2.length == 2) {

                        if (PHONGS.phong2[0] == data) {
                            enemy = PHONGS.phong2[1];
                        } else { enemy = PHONGS.phong2[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].controplayerfight;

                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 3) {
                    if (PHONGS.phong3.length == 2) {
                        if (PHONGS.phong3[0] == data) {
                            enemy = PHONGS.phong3[1];
                        } else { enemy = PHONGS.phong3[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].controplayerfight;
                                //console.log("enemy la:" + EnemyLa);
                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                }
                break;
            }
        }
        return EnemyLa;
    }

    function CHECKSS(data) {

        var enemy = data;
        var EnemyLa = 0;
        var YOU = 0;
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data) {
                YOU = STRUCT[i].sangsang;
                if (STRUCT[i].vitriphong == 1) {
                    if (PHONGS.phong1.length == 2) {
                        if (PHONGS.phong1[0] == data) {
                            enemy = PHONGS.phong1[1];
                        } else { enemy = PHONGS.phong1[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].sangsang;
                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 2) {
                    if (PHONGS.phong2.length == 2) {

                        if (PHONGS.phong2[0] == data) {
                            enemy = PHONGS.phong2[1];
                        } else { enemy = PHONGS.phong2[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].sangsang;

                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 3) {
                    if (PHONGS.phong3.length == 2) {
                        if (PHONGS.phong3[0] == data) {
                            enemy = PHONGS.phong3[1];
                        } else { enemy = PHONGS.phong3[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].sangsang;
                                //console.log("enemy la:" + EnemyLa);
                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                }
                break;
            }
        }
        return EnemyLa * YOU;
    }

    function CHECKPLAYAGAIN(data) {

        var enemy = data;
        var EnemyLa = 0;
        var YOU = 0;
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data) {
                YOU = STRUCT[i].playagain;
                if (STRUCT[i].vitriphong == 1) {
                    if (PHONGS.phong1.length == 2) {
                        if (PHONGS.phong1[0] == data) {
                            enemy = PHONGS.phong1[1];
                        } else { enemy = PHONGS.phong1[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].playagain;
                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 2) {
                    if (PHONGS.phong2.length == 2) {

                        if (PHONGS.phong2[0] == data) {
                            enemy = PHONGS.phong2[1];
                        } else { enemy = PHONGS.phong2[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].playagain;

                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 3) {
                    if (PHONGS.phong3.length == 2) {
                        if (PHONGS.phong3[0] == data) {
                            enemy = PHONGS.phong3[1];
                        } else { enemy = PHONGS.phong3[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].playagain;
                                //console.log("enemy la:" + EnemyLa);
                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                }
                break;
            }
        }
        return EnemyLa * YOU;
    }

    function YEUCAUENEMY(data) {

        var enemy = data;
        var EnemyLa = "Chưa có đối thủ";
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data) {
                if (STRUCT[i].vitriphong == 1) {
                    if (PHONGS.phong1.length == 2) {
                        if (PHONGS.phong1[0] == data) {
                            enemy = PHONGS.phong1[1];
                        } else { enemy = PHONGS.phong1[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = SESSIONUSER[i];
                                //console.log("enemy la:" + EnemyLa);
                                break;
                            }
                        }

                    } else {
                        EnemyLa = "Chưa có đối thủ";
                    }

                } else if (STRUCT[i].vitriphong == 2) {
                    if (PHONGS.phong2.length == 2) {
                        if (PHONGS.phong2[0] == data) {
                            enemy = PHONGS.phong2[1];
                        } else { enemy = PHONGS.phong2[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = SESSIONUSER[i];
                                //console.log("enemy la:" + EnemyLa);
                                break;
                            }
                        }

                    } else {
                        EnemyLa = "Chưa có đối thủ";
                    }

                } else if (STRUCT[i].vitriphong == 3) {
                    if (PHONGS.phong3.length == 2) {
                        if (PHONGS.phong3[0] == data) {
                            enemy = PHONGS.phong3[1];
                        } else { enemy = PHONGS.phong3[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = SESSIONUSER[i];
                                //console.log("enemy la:" + EnemyLa);
                                break;
                            }
                        }

                    } else {
                        EnemyLa = "Chưa có đối thủ";
                    }

                }
                break;
            }
        }
        return EnemyLa;
    }

    socket.on("REQYEUCAUCHECKSERVER", function(data) {
        //console.log(data.COKI);
        var temp = 0;
        var ENE = YEUCAUENEMY(data.COKI);
        var checkss = CHECKSS(data.COKI);
        var controenemy = CHECKCONTROENEMY(data.COKI);
        var shotenemy = CHECKSHOTENEMY(data.COKI);
        var luot = CHECKLUOT(data.COKI);
        var enymymap = SHIPENYMYMAP(data.COKI);
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data.COKI) {
                socket.emit('RESYEUCAUCHECKSERVER', {
                    DATANE: "Ban Da Yeu Cau check thanh cong" + i,
                    emPHONG: phong,
                    emVITRICONTROPHONG: STRUCT[i].vitriphong,
                    emKEYVAOROOM: STRUCT[i].keyvaoroom,

                    emCONTROPLAYERCREATE: STRUCT[i].controplayercreate,
                    emSHOTLAYERCREATE: STRUCT[i].shotcreate,
                    emKEYPLAYERCREATE: STRUCT[i].keycreate,

                    emSHIPMAP: STRUCT[i].shipmap,
                    emENEMY: ENE,
                    emSS: checkss,

                    emCONTROPLAYERFIGHT: STRUCT[i].controplayerfight,
                    emSHOTLAYERFIGHT: STRUCT[i].shotfight,
                    emCONTROENEMY: controenemy,
                    emSHOTENEMY: shotenemy,
                    emLUOT: luot,
                    emSHIPMAPENYMY: enymymap,

                });
                temp = 1;
            }
            if (temp == 0 && i == -1) {
                socket.emit('RESYEUCAUCHECKSERVER', {
                    DATANE: "Ban khong co quyen check",
                });
            }
        }
    });
    //v7-
    socket.on('sendShipPos', function(data) {
        //console.log(data);
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data.COOKIE) {
                STRUCT[i].setShipMap(data.Arr);
                STRUCT[i].setSangSang(1);
                console.log("SS cua thang vua gui" + STRUCT[i].sangsang + " " + data.COOKIE);
            }
        }

    });
    socket.on('Playagain', function(data) {
        //console.log(data);
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data.COOKIE) {
                STRUCT[i].setPlayAgain(1);
                console.log("Playagain cua thang vua gui" + STRUCT[i].playagain + " " + data.COOKIE);
                var CHECKPA = CHECKPLAYAGAIN(data.COOKIE);
                socket.emit('RESPlayagain', {
                    emPlayAgain: CHECKPA,

                });
            }
        }

    });
    socket.on('CLEAR', function(data) {
        //console.log(data);
        for (var i = SESSIONID.length - 1; i >= 0; i--) {

            STRUCT[i].setPlayAgain(0);
            STRUCT[i].setTrangThai("create");
            STRUCT[i].setShotCreat(0);
            STRUCT[i].setKeyCreat(0);
            STRUCT[i].setConTroPlayerFight(1);
            STRUCT[i].setSangSang(0);
            STRUCT[i].setShotFight(0);
            STRUCT[i].setConTroPlayerCreat(0);
            io.sockets.emit('CLEAROK', {});
        }
    });
});


function XuLyDuLieuGuiLen(controcontrol, controplayer1) {
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
        shot = -1;
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
//++++++++++++++++Function GAME++++++++++++++++++++++++++++++++++++++++++++++++++++
//---Chuc nang: Xu ly toan bo du lieu tu luc tao phong den luc ket thuc game-----//
//---Tham so: 1. DuLieuGuiLen (U,D,L,R,O,C) 2.IDNguoiChoi (1,2,3,...)//
//---Cach dung: Neu nhan du lieu thi se chay ham nay------------------------------
function GAME(DuLieuGuiLen, IDNguoiChoi) {
    if (DuLieuGuiLen != 'L' && DuLieuGuiLen != 'R' && DuLieuGuiLen != 'U' &&
        DuLieuGuiLen != 'D' && DuLieuGuiLen != 'O' && DuLieuGuiLen != 'C') {
        console.log("Du lieu gui len khong hop le: " + DuLieuGuiLen);
    }
    switch (STRUCT[IDNguoiChoi - 1].KiemTraTrangThai()) {
        case 0:
            console.log("Moi dang nhap thoi");
            break;
        case 1:
            console.log("Dang o room");
            var phongx = STRUCT[IDNguoiChoi - 1].vitriphong;
            console.log("Phong hien tai: " + phongx);
            console.log("Data gui len: " + DuLieuGuiLen);
            if (DuLieuGuiLen == 'O') {
                if (phong[phongx - 1] < 2) {
                    console.log("Ban da vao phong: " + phongx);
                    if (phongx == 1) {
                        PHONGS.setPhong1(STRUCT[IDNguoiChoi - 1].username);
                        phong[0] = PHONGS.phong1.length;
                    } else if (phongx == 2) {
                        PHONGS.setPhong2(STRUCT[IDNguoiChoi - 1].username);
                        phong[1] = PHONGS.phong2.length;
                    } else if (phongx == 3) {
                        PHONGS.setPhong3(STRUCT[IDNguoiChoi - 1].username);
                        phong[2] = PHONGS.phong3.length;
                    }
                    console.log(PHONGS.phong1[0] + " phong1");
                    console.log(PHONGS.phong2 + " phong2");
                    console.log(PHONGS.phong3 + " phong3");
                    STRUCT[IDNguoiChoi - 1].setKeyVaoRoom("ok");
                } else if (phong[controsophonghientai - 1] == 2) {
                    STRUCT[IDNguoiChoi - 1].setKeyVaoRoom("full");
                }
            }
            STRUCT[IDNguoiChoi - 1].setViTriPhong(JOINROOM(DuLieuGuiLen, phongx));
            console.log("Mang phong hien tai: " + phong)
            break;
        case 2:
            //STRUCT[data.P-1].setKeyVaoRoom("0"); // cho quay ve trang thai truoc
            console.log("Dang tao map");
            var controplayer1 = STRUCT[IDNguoiChoi - 1].controplayercreate;
            if (DuLieuGuiLen == 'L') {
                if (Math.abs(controplayer1 % 10) != 1) {
                    controplayer1 -= 1;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerCreat(controplayer1);
                }
                //key = 'L';
                STRUCT[IDNguoiChoi - 1].setKeyCreat('L');
            } else if (DuLieuGuiLen == 'R') {
                if (Math.abs(controplayer1 % 10) != 0) {
                    controplayer1 += 1;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerCreat(controplayer1);
                }
                //key = 'R';
                STRUCT[IDNguoiChoi - 1].setKeyCreat('R');
            } else if (DuLieuGuiLen == 'U') {
                if (Math.abs(Math.floor((controplayer1) / 10)) != 0 && controplayer1 != 10) {
                    controplayer1 -= 10;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerCreat(controplayer1);
                }
                //key = 'U';
                STRUCT[IDNguoiChoi - 1].setKeyCreat('U');
            } else if (DuLieuGuiLen == 'D') {
                if (Math.abs(Math.floor((controplayer1) / 10)) != 9 && controplayer1 != 100) {
                    controplayer1 += 10;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerCreat(controplayer1);
                } else if (controplayer1 == 90) {
                    controplayer1 += 10;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerCreat(controplayer1);
                }
                //key = 'D';
                STRUCT[IDNguoiChoi - 1].setKeyCreat('D');
            } else if (DuLieuGuiLen == 'O') {
                //shot = 1;
                var temp = STRUCT[IDNguoiChoi - 1].shotcreate;
                temp += 1;
                STRUCT[IDNguoiChoi - 1].setShotCreat(temp);
                //key = 'O';
                STRUCT[IDNguoiChoi - 1].setKeyCreat('O');
            } else if (DuLieuGuiLen == 'C') {
                //shot = 1;
                var temp = STRUCT[IDNguoiChoi - 1].shotcreate;
                temp += 1;
                STRUCT[IDNguoiChoi - 1].setShotCreat(temp);
                //key = 'C';
                STRUCT[IDNguoiChoi - 1].setKeyCreat('C');
            } else {
                //error = 1;
            }

            break;
        case 3:
            console.log("Dang trong tran");
            var controplayer1 = STRUCT[IDNguoiChoi - 1].controplayerfight;
            if (DuLieuGuiLen == 'L') {
                if (controplayer1 == 1) {
                    controplayer1 = 100;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerFight(controplayer1);
                } else {
                    controplayer1 -= 1;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerFight(controplayer1);
                }

            } else if (DuLieuGuiLen == 'R') {
                if (controplayer1 == 100) {
                    controplayer1 = 1;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerFight(controplayer1);
                } else {
                    controplayer1 += 1;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerFight(controplayer1);
                }
            } else if (DuLieuGuiLen == 'U') {
                if (Math.floor((controplayer1) / 10) == 0 || controplayer1 == 10) {
                    controplayer1 += 90;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerFight(controplayer1);
                } else {
                    controplayer1 -= 10;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerFight(controplayer1);
                }
            } else if (DuLieuGuiLen == 'D') {
                if ((Math.floor((controplayer1) / 10) == 9 || controplayer1 == 100) && controplayer1 != 90) {
                    controplayer1 -= 90;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerFight(controplayer1);
                } else {
                    controplayer1 += 10;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerFight(controplayer1);
                }
            } else if (DuLieuGuiLen == 'O') {
                //shot = 1;
                var temp = STRUCT[IDNguoiChoi - 1].shotfight;
                temp += 1;
                STRUCT[IDNguoiChoi - 1].setShotFight(temp);
                // } else if (DuLieuGuiLen == 'C') {
                //     //shot = 1;
                //     var temp = STRUCT[IDNguoiChoi-1].shotcreate;
                //         temp+=1;
                //     STRUCT[IDNguoiChoi-1].setShotCreat(temp);
                // } else {
                //error = 1;
            }
            break;
        case 4:
            day = "Thursday";
            break;
    }
}

//++++++++++++++++Function FYEUCAUCHECKSERVER++++++++++++++++++++++++++++++++++++++++++++++++++++
//---Chuc nang: Yeu cau cac client check trang thai cua client do tren SERVER-----//
//---Tham so: Khong//
//---Cach dung: Dc dung khi co du lieu gui len hoac khi lan dau load trang html moi--------------
function FYEUCAUCHECKSERVER() {
    io.sockets.emit('YEUCAUCHECKSERVER', {
        CHECK: 1,
    });
}

function XuLyConTroFight(controcontrol) {

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