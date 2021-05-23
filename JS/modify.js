window.onload = init;
var headers = {};
var url = "https://node-js-final.herokuapp.com/";

function init(){
    if(localStorage.getItem("token")){
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadId();
    }else{
        window.location.href = "index.html";
    }
}

var url_string = window.location.href; //window.location.href
var url2 = new URL(url_string);
var c = url2.searchParams.get("id");
function loadId(){
    // console.log(c);
    axios.get(url + "employees/" + c, headers)
    .then(function(res){
        console.log(res);
        infoInputs(res.data.message[0]);
    }).catch(function(err){
        console.log(err);
    })
}

function infoInputs(empleado){

    var div = document.getElementsByClassName("mb-4");
    
    // INPUT TAG de ID
    // <input type="text" class="form-control" name="employee_id" id="employee_id" disabled>
    var inputID = document.createElement("input");
    inputID.setAttribute("type", "text");
    inputID.setAttribute("class", "form-control");
    inputID.setAttribute("name", "employee_id");
    inputID.setAttribute("id", "employee_id");
    inputID.setAttribute("value", JSON.stringify(empleado.employee_id));
    inputID.setAttribute("disabled", "");
    div[0].appendChild(inputID);

    // INPUT TAG de employee_name
    // <input type="text" class="form-control" name="employee_name" id="employee_name" placeholder="Nombre(s)">   
    var inputEmployee_name = document.createElement("input");
    inputEmployee_name.setAttribute("type", "text");
    inputEmployee_name.setAttribute("class", "form-control");
    inputEmployee_name.setAttribute("name", "employee_name");
    inputEmployee_name.setAttribute("id", "employee_name");
    inputEmployee_name.setAttribute("value", empleado.employee_name);
    inputEmployee_name.setAttribute("placeholder", "Nombre(s)");
    div[1].appendChild(inputEmployee_name);

    //INPUT TAG de LAST_NAME
    // <input type="text" class="form-control" name="last_name" id="last_name" placeholder="Apellido(s)">
    var inputLast_name = document.createElement("input");
    inputLast_name.setAttribute("type", "text");
    inputLast_name.setAttribute("class", "form-control");
    inputLast_name.setAttribute("name", "last_name");
    inputLast_name.setAttribute("id", "last_name");
    inputLast_name.setAttribute("value", empleado.last_name);
    inputLast_name.setAttribute("placeholder", "Apellido(s)");
    div[2].appendChild(inputLast_name);

    //INPUT TAG de MAIL
    // <input type="email" class="form-control" name="email" id="mail" placeholder="example@mail.com">
    var inputMail = document.createElement("input");
    inputMail.setAttribute("type", "text");
    inputMail.setAttribute("class", "form-control");
    inputMail.setAttribute("name", "mail");
    inputMail.setAttribute("id", "mail");
    inputMail.setAttribute("value", empleado.mail);
    inputMail.setAttribute("placeholder", "example@mail.com");
    div[3].appendChild(inputMail);

    //INPUT TAG de PASS
    // <input type="password" class="form-control" name="password" id="pass" placeholder="**********">
    var inputPass = document.createElement("input");
    inputPass.setAttribute("type", "password");
    inputPass.setAttribute("class", "form-control");
    inputPass.setAttribute("name", "password");
    inputPass.setAttribute("id", "pass");
    inputPass.setAttribute("value", empleado.pass);
    inputPass.setAttribute("placeholder", "**********");
    div[4].appendChild(inputPass);

    //INPUT TAG de NUMTELEFONO
    // <input type="text" class="form-control" name="phone" id="phone_num" placeholder="(123) 111-22-33">
    var inputNumTel = document.createElement("input");
    inputNumTel.setAttribute("type", "text");
    inputNumTel.setAttribute("class", "form-control");
    inputNumTel.setAttribute("name", "phone");
    inputNumTel.setAttribute("id", "phone_num");
    inputNumTel.setAttribute("value", empleado.phone_num);
    inputNumTel.setAttribute("placeholder", "(123) 111-22-33");
    div[5].appendChild(inputNumTel);

    //INPUT TAG DE DIRECCION
    // <input type="text" class="form-control" name="address" id="address" placeholder="Direccion">
    var inputAddress = document.createElement("input");
    inputAddress.setAttribute("type", "text");
    inputAddress.setAttribute("class", "form-control");
    inputAddress.setAttribute("name", "address");
    inputAddress.setAttribute("id", "address");
    inputAddress.setAttribute("value", empleado.address);
    inputAddress.setAttribute("placeholder", "Direccion");
    div[6].appendChild(inputAddress);


}

function Modify(){
    var id = document.getElementById('employee_id').value;
    var name = document.getElementById('employee_name').value;
    var last_name = document.getElementById('last_name').value;
    var mail = document.getElementById('mail').value;
    var pass = document.getElementById('pass').value;
    var phone_num = document.getElementById('phone_num').value;
    var address = document.getElementById('address').value;

    axios({
        method: 'put',
        url: 'https://node-js-final.herokuapp.com/employees/' + id,
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
        alert("Actualización Exitosa!");
        window.location.href = "employees.html";
    }).catch(function(err){
        console.log(err);
    });
}