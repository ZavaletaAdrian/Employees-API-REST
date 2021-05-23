window.onload = init;

function init(){
    if(!localStorage.getItem("token")){
        document.querySelector('.registrate').addEventListener('click', function(){
            window.location.href = "signIn.html";
        });
    }else{
        window.location.href = "employees.html";
    }
}

function login(){
    var mail = document.getElementById('mail').value;
    var pass = document.getElementById('pass').value;

    axios({
        method: 'post',
        url: 'https://node-js-final.herokuapp.com/user/login',
        data:{
            employee_mail: mail,
            pass: pass,
        }
    }).then(function(res){
        if(res.data.code === 200){
            localStorage.setItem("token", res.data.message);
            window.location.href = "employees.html";
        }else{
            alert("Usuario y/o Contraseña Incorrectos");
        }
    }).catch(function(err){
        console.log(err);
    });
}