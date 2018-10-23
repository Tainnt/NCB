function PrintName() {
	Name =document.getElementById('txtTen').value;
	Pass =document.getElementById('txtMatKhau').value;
	if(Name != '' && Pass != '')
		document.getElementById("hello").innerHTML = ('Welcome <b><i>'+Name+'<i><b>');
	else
		document.getElementById("hello").innerHTML = ('<b>Incorrect username or password<b>');
}