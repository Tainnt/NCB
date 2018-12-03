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

hieuungroomtx.rect(0, toadocontro[controsophonghientai - 1], 450, 30);
hieuungroomtx.stroke();

socketroom.on("ROOM", function(data) {
    console.log(data);
    if (document.cookie == data.COOKIE) {
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
    }
});

socketroom.on("NumOfPlayerInRoom", function(data) {
    console.log(data);
    document.cookie = "username=" + data.name;
    // console.log(document.cookie);

    for (var i = 1; i <= sophong; i++) {
        roomtx.font = "30px Arial";
        roomtx.fillStyle = "#2c3e50";
        roomtx.fillText("Phòng " + i + "     Số người chơi: " + phong[i - 1] + "/2", 15, b);
        b += 40;
    }
});

$('#logout').on('click', function() {
    window.location = '/logout';
});