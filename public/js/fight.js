//toa do cac vi tri cua player 2
var toadoxplayer1 = [10, 70, 130, 190, 250, 310, 370, 430, 490, 550];
var toadoyplayer1 = [10, 70, 130, 190, 250, 310, 370, 430, 490, 550];

var toadoxplayer2 = [660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200];
var toadoyplayer2 = [10, 70, 130, 190, 250, 310, 370, 430, 490, 550];

var shotorno = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
//lay thong tin
var c = document.getElementById("player1");
var hieuung = document.getElementById("hieuungshot");
var player2 = document.getElementById("player2");

var ctx = c.getContext("2d");
var hieuungctx = hieuung.getContext("2d");
var player2ctx = player2.getContext("2d");

var muctieu = document.getElementById("muctieu");
var muctieuctx = muctieu.getContext("2d");

//khai bao hinh anh su dung
var imgco = document.getElementById("co");
var imgkhong = document.getElementById("khongco");
var tenlua = document.getElementById("tenlua");
var tenlua2 = document.getElementById("tenlua2");
var mtieuco = document.getElementById("mtco");
var mtieuko = document.getElementById("mtko");
var chucmung = document.getElementById("chucmung");
var chucmayman = document.getElementById("chucmayman");
//khai bao bien
const toadophaoXplayer1 = 310;
const toadophaoYplayer1 = 310;
const toadophaoXplayer2 = 900;
const toadophaoYplayer2 = 250;
var posX = toadophaoXplayer1;
var posY = toadophaoYplayer1;
var posX2 = toadophaoXplayer2;
var posY2 = toadophaoYplayer2;
var vao1lan = true;
var vao1lan2 = true;
var vx = 0;
var vy = 0;
var vx2 = 0;
var vy2 = 0;
var checkshotornoshot = 0;
//HAM HIEU UNG BAN TRUNG BAN HUT
function hieuungchucmungp1(time, hieuung) {
    setTimeout(function() {
        muctieuctx.clearRect(0, 0, muctieu.width, muctieu.height);
        muctieuctx.beginPath();
        muctieuctx.drawImage(hieuung, 300, 50, time, time);
        if (time > 300) {
            time -= 4;
            hieuungchucmungp1(time, hieuung);
        }
        if (time <= 300 && time >= (20)) {
            time -= 20;
            hieuungchucmungp1(time, hieuung);
        }
    }, 10)
}

function hieuungchucmungp2(time, hieuung) {
    setTimeout(function() {
        muctieuctx.clearRect(0, 0, muctieu.width, muctieu.height);
        muctieuctx.beginPath();
        muctieuctx.drawImage(hieuung, 1000, 500, time, time);
        if (time < -300) {
            time += 4;
            hieuungchucmungp2(time, hieuung);
        }
        if (time >= -300 && time <= (-20)) {
            time += 20;
            hieuungchucmungp2(time, hieuung);
        }
    }, 10)
}
//Ham nay de ve muc tieu
function dohoamuctieu(newXp2, newYp2, OKorNO) {
    if (OKorNO == 0) {
        muctieuctx.clearRect(0, 0, muctieu.width, muctieu.height);
        muctieuctx.beginPath();
        muctieuctx.drawImage(mtieuco, newXp2, newYp2, 60, 60);
    } else {
        muctieuctx.clearRect(0, 0, muctieu.width, muctieu.height);
        muctieuctx.beginPath();
        muctieuctx.drawImage(mtieuko, newXp2, newYp2, 60, 60);
    }
}
// ham nay de ve ten lua ban qua doi thu
function dohoashot(newX, newY, data) { //data la gia tri gui qua 0-100.
    if (vao1lan) {
        vx = newX - posX;
        vy = newY - posY;
        vao1lan = false;
    }
    setTimeout(function() {
        posX += vx * 1 / 300;
        posY += vy * 1 / 300;
        hieuungctx.clearRect(0, 0, hieuung.width, hieuung.height);
        hieuungctx.beginPath();
        hieuungctx.drawImage(tenlua, posX, posY, 60, 60);
        if (posX <= newX - 3) {
            dohoashot(newX, newY, data);
        } else {
            if (data >= 1) {
                player2ctx.drawImage(imgco, newX, newY);
                hieuungchucmungp1(500, chucmung);
                muctieuctx.drawImage(mtieuko, newX, newY, 60, 60);
            } else {
                player2ctx.drawImage(imgkhong, newX, newY);
                hieuungchucmungp1(500, chucmayman);
            }
            posX = toadophaoXplayer1;
            posY = toadophaoYplayer1;
            vao1lan = true;
            hieuungctx.clearRect(0, 0, hieuung.width, hieuung.height);
            hieuungctx.beginPath();
            hieuungctx.drawImage(tenlua, -100, 0, 60, 60);
            muctieuctx.drawImage(mtieuko, newX, newY, 60, 60);
        }
    }, 1)
}

function dohoashot2(newX, newY, data) { //data la gia tri gui qua 0-100.
    if (vao1lan2) {
        vx2 = newX - posX2;
        vy2 = newY - posY2;
        vao1lan2 = false;
    }
    setTimeout(function() {
        posX2 += vx2 * 1 / 300;
        posY2 += vy2 * 1 / 300;
        hieuungctx.clearRect(0, 0, hieuung.width, hieuung.height);
        hieuungctx.beginPath();
        hieuungctx.drawImage(tenlua2, posX2, posY2, 60, 60);
        if (posX2 >= newX - 3) {
            dohoashot2(newX, newY, data);
        } else {
            if (data >= 1) {
                ctx.drawImage(imgco, newX, newY);
                hieuungchucmungp2(-500, chucmung);
                muctieuctx.drawImage(mtieuko, newX, newY, 60, 60);
            } else {
                ctx.drawImage(imgkhong, newX, newY);
                hieuungchucmungp2(-500, chucmayman);
            }
            posX2 = toadophaoXplayer2;
            posY2 = toadophaoYplayer2;
            vao1lan2 = true;
            hieuungctx.clearRect(0, 0, hieuung.width, hieuung.height);
            hieuungctx.beginPath();
            hieuungctx.drawImage(tenlua2, -100, 0, 60, 60);
            muctieuctx.drawImage(mtieuko, newX, newY, 60, 60);
        }
    }, 1)
}
//Ket noi den Socket server
// var socket = io.connect("http://localhost:3000");
var socket = io.connect("http://doanncb.ddns.net/:3000");
//CAP NHAT TRAN CHIEN
socket.on('NewData', function(data) {
    console.log(data);
    //alert(data.CONTRO);
    var requestData = Math.abs(data.CONTRO);
    if (data.SHOT) {
        if (shotorno[(Math.abs(requestData - 1))] == 0) {
            dohoashot(toadoxplayer2[(Math.abs(requestData - 1)) % 10], toadoyplayer2[Math.floor((Math.abs(requestData - 1)) / 10)], data.CONTRO);
            shotorno[(Math.abs(requestData - 1))] += 1;
        } else {
            alert("Chỗ này bạn bắn rồi!");
            dohoamuctieu(toadoxplayer2[(Math.abs(requestData - 1)) % 10], toadoyplayer2[Math.floor((Math.abs(requestData - 1)) / 10)], 1)
        }

    } else {
        dohoamuctieu(toadoxplayer2[(Math.abs(requestData - 1)) % 10], toadoyplayer2[Math.floor((Math.abs(requestData - 1)) / 10)], shotorno[Math.abs(requestData - 1)])
    }
});
socket.on('NewData2', function(data) {
    console.log(data);
    //alert(data.CONTRO);
    var requestData = Math.abs(data.CONTRO);
    if (data.SHOT) {
        if (shotorno[(Math.abs(requestData - 1))] == 0) {
            dohoashot2(toadoxplayer1[(Math.abs(requestData - 1)) % 10], toadoyplayer1[Math.floor((Math.abs(requestData - 1)) / 10)], data.CONTRO);
            shotorno[(Math.abs(requestData - 1))] += 1;
        } else {
            alert("Chỗ này bạn bắn rồi!");
            dohoamuctieu(toadoxplayer1[(Math.abs(requestData - 1)) % 10], toadoyplayer1[Math.floor((Math.abs(requestData - 1)) / 10)], 1)
        }

    } else {
        dohoamuctieu(toadoxplayer1[(Math.abs(requestData - 1)) % 10], toadoyplayer1[Math.floor((Math.abs(requestData - 1)) / 10)], shotorno[Math.abs(requestData - 1)])
    }
});
//su kien click nut
// var BTNSEND = $("#shot");
//     BTNSEND.click(function(){
//         console.log("user click " + this.id);
//         TEXTDATA = $('#textnhanduoc').val();
//         socket.emit('SendTextToSerVer', TEXTDATA);
//         });
// nhan su kien click
// $('#shot').on('click', function() {
//     var x = $('#toadox').val(),
//         y = $('#textnhanduoc').val();
//     if (x != '' && y != '') {
//         $.ajax({
//             type: 'POST',
//             url: '/fight',
//             data: { toadox: x, toadoy: y },
//             dataType: 'json',
//             async: false,
//             success: function(response) {
//             //alert(response.data);
//             var requestData=Math.abs(response.data);
//             if(response.data2)
//             {   if(shotorno[(Math.abs(requestData-1))]==0)
//                 {dohoashot(toadoxplayer2[(Math.abs(requestData-1))%10],toadoyplayer2[Math.floor((Math.abs(requestData-1))/10)],response.data);
//                     shotorno[(Math.abs(requestData-1))]+=1;}
//                 else{alert("Bắn rồi mà bắn gì nữa bạn");
//                     dohoamuctieu(toadoxplayer2[(Math.abs(requestData-1))%10],toadoyplayer2[Math.floor((Math.abs(requestData-1))/10)],1)
//                     }

//             }else{
//                 dohoamuctieu(toadoxplayer2[(Math.abs(requestData-1))%10],toadoyplayer2[Math.floor((Math.abs(requestData-1))/10)],shotorno[ Math.abs(requestData-1)])
//             }
//          }
//          });
//      } else {
//          $("#errors").empty().append(failHtml);
//      }
// });