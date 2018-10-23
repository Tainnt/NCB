function PrintName() {
	Name =document.getElementById('txtTen').value;
	Pass =document.getElementById('txtMatKhau').value;
	if(Name != '' && Pass != '')
		document.getElementById("hello").innerHTML = ('Chào bạn <b><i>'+Name+'<i><b>');
	else
		document.getElementById("hello").innerHTML = ('<b>Bạn chưa nhập tên người dùng hoặc mật khẩu<b>');
}