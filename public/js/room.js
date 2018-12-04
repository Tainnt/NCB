var phong = [0, 0, 0]; // chua mang phong
var sophong = 3; //All phong = lenght(phong)
var controsophonghientai = 1; //
var socketroom = io.connect("http://localhost:3000");
var room = document.getElementById("room");
var hieuungroom = document.getElementById("hieuungroom")
var roomtx = room.getContext("2d");
var hieuungroomtx = hieuungroom.getContext("2d")
var b = 40;
var toadocontro = [20, 60, 100];
var userla;
hieuungroomtx.rect(0, toadocontro[controsophonghientai - 1], 450, 30);
hieuungroomtx.stroke();

socketroom.on("Room", function(data) {
    console.log(data);
    if (data.COOKIE == getCookie("Bantausession")) {
        socketroom.emit("RoomResponse", { RESULT: 1 });
        if (data.RESULT === 'full') {
            alert("Phong day");
        } else if (data.RESULT === 'ok') {
            window.location = '/create';
        }

        phong = data.PHONG;
        hieuungroomtx.clearRect(0, 0, hieuungroom.width, hieuungroom.height);
        hieuungroomtx.beginPath();
        hieuungroomtx.rect(0, toadocontro[data.POIN - 1], 450, 30);
        hieuungroomtx.stroke();
        b = 40;
        roomtx.clearRect(0, 0, room.width, room.height);
        roomtx.beginPath();
        for (var i = 1; i <= sophong; i++) {
            roomtx.font = "30px Arial";
            roomtx.fillStyle = "#2c3e50";
            roomtx.fillText("Phòng " + i + "     Số người chơi: " + phong[i - 1] + "/2", 15, b);
            b += 40;
        }
    } else
        socketroom.emit("RoomResponse", { RESULT: 0 })
});

socketroom.on("NumOfPlayerInRoom", function(data) {
    phong = data.PHONG;
    console.log(phong);
    for (var i = 1; i <= sophong; i++) {
        roomtx.font = "30px Arial";
        roomtx.fillStyle = "#2c3e50";
        roomtx.fillText("Phòng " + i + "     Số người chơi: " + phong[i - 1] + "/2", 15, b);
        b += 40;
    }
});

var x = getCookie("Bantausession");

socketroom.emit('YeuCauUser', {
    COKI: x,
});

socketroom.on("ResYeuCauUser", function(data) {
    var userla = data.USerLa;
    var element = document.getElementById('id_cua_toi');
    element.innerHTML = ' ' + userla;
    // console.log(element);
    // console.log(element.innerHTML);
});


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$('#logout').on('click', function() {
    window.location = '/logout';
});