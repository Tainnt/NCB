var failHtml = '<div class="alert alert-danger">' +
    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
    '<strong> Có lỗi xảy ra:</strong> Tên đăng nhập hoặc mật khẩu không đúng' +
    '</div>';

$('#submit').on('click', function() {

    var usn = $('#username').val(),
        pw = $('#password').val();

    $.ajax({
        type: 'POST',
        url: '/login',
        data: { username: usn, password: pw },
        dataType: 'json',
        async: false,
        success: function(response) {
            if (response.data) {
                alert('Đăng nhập thành công');
                window.location = '/room';
            } else
                $("#errors").html(failHtml);
        }
    });
});

$('#register').on('click', function() {
    window.location = '/register';
});

document.getElementById("username").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("submit").click();
    }
});

document.getElementById("password").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("submit").click();
    }
});