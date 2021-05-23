window.onload = init;

function init(){
    if(!localStorage.getItem("token")){
        document.querySelector('.iniciarSesion').addEventListener('click', function(){
            window.location.href = "Login.html";
        });

        document.getElementById('registrarme').addEventListener('click', signin);
    }else{
        window.location.href = "employees.html";
    }
}

function signin(){
    var name = document.getElementById('name').value;
    var last_name = document.getElementById('last_name').value;
    var mail = document.getElementById('mail').value;
    var pass = document.getElementById('pass').value;
    var phone_num = document.getElementById('phone_num').value;
    var address = document.getElementById('address').value;

    axios({
        method: 'post',
        url: 'https://node-js-final.herokuapp.com/user/signin',
        data:{
            employee_name: name,
            last_name: last_name,
            mail: mail,
            pass: pass,
            phone_num: phone_num,
            address: address
        }
    }).then(function(res){
        console.log(res);
        alert("Registro Exitoso!");
        window.location.href = "index.html";
    }).catch(function(err){
        console.log(err);
    });
}