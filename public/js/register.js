var failHtml = '<div class="alert alert-danger">' +
    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
    '<strong> Có lỗi xảy ra:</strong> Mật khẩu chưa chính xác' +
    '</div>';

$('#register').on('click', function() {
    var usn = $('#usernameRegister').val(),
        pw1 = $('#passwordRegister1').val(),
        pw2 = $('#passwordRegister2').val();
    if (pw1 != '' && pw2 != '' && pw1 == pw2) {
        $.ajax({
            type: 'POST',
            url: '/register',
            data: { username: usn, password: pw1 },
            dataType: 'json',
            async: false,
            success: function(response) {
                if (response.data) {
                    window.location = '/';
                    alert('Đăng kí thành công');
                }
            }
        });
    } else {
        $("#errors").empty().append(failHtml);
    }
});