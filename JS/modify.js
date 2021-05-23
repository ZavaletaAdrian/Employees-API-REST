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

function loadId(){
    axios.get(url + "employees/", headers)
    .then(function(res){
        // console.log(res);
        infoInputs(res.data.message);
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
    inputID.setAttribute("value", empleado[0].employee_id);
    inputID.setAttribute("disabled", "");
    div[0].appendChild(inputID);

    // INPUT TAG de employee_name
    // <input type="text" class="form-control" name="employee_name" id="employee_name" placeholder="Nombre(s)">   
    var inputEmployee_name = document.createElement("input");
    inputEmployee_name.setAttribute("type", "text");
    inputEmployee_name.setAttribute("class", "form-control");
    inputEmployee_name.setAttribute("name", "employee_name");
    inputEmployee_name.setAttribute("id", "employee_name");
    inputEmployee_name.setAttribute("value", empleado[0].employee_name);
    inputEmployee_name.setAttribute("placeholder", "Nombre(s)");
    div[1].appendChild(inputEmployee_name);

    //INPUT TAG de LAST_NAME
    // <input type="text" class="form-control" name="last_name" id="last_name" placeholder="Apellido(s)">
    var inputLast_name = document.createElement("input");
    inputLast_name.setAttribute("type", "text");
    inputLast_name.setAttribute("class", "form-control");
    inputLast_name.setAttribute("name", "last_name");
    inputLast_name.setAttribute("id", "last_name");
    inputLast_name.setAttribute("value", empleado[0].last_name);
    inputLast_name.setAttribute("placeholder", "Apellido(s)");
    div[2].appendChild(inputLast_name);

    //INPUT TAG de MAIL
    // <input type="email" class="form-control" name="email" id="mail" placeholder="example@mail.com">
    var inputMail = document.createElement("input");
    inputMail.setAttribute("type", "text");
    inputMail.setAttribute("class", "form-control");
    inputMail.setAttribute("name", "mail");
    inputMail.setAttribute("id", "mail");
    inputMail.setAttribute("value", empleado[0].mail);
    inputMail.setAttribute("placeholder", "example@mail.com");
    div[3].appendChild(inputMail);

    //INPUT TAG de PASS
    // <input type="password" class="form-control" name="password" id="pass" placeholder="**********">
    var inputPass = document.createElement("input");
    inputPass.setAttribute("type", "password");
    inputPass.setAttribute("class", "form-control");
    inputPass.setAttribute("name", "password");
    inputPass.setAttribute("id", "pass");
    inputPass.setAttribute("value", empleado[0].pass);
    inputPass.setAttribute("placeholder", "**********");
    div[4].appendChild(inputPass);

    //INPUT TAG de NUMTELEFONO
    // <input type="text" class="form-control" name="phone" id="phone_num" placeholder="(123) 111-22-33">
    var inputNumTel = document.createElement("input");
    inputNumTel.setAttribute("type", "text");
    inputNumTel.setAttribute("class", "form-control");
    inputNumTel.setAttribute("name", "phone");
    inputNumTel.setAttribute("id", "phone_num");
    inputNumTel.setAttribute("value", empleado[0].phone_num);
    inputNumTel.setAttribute("placeholder", "(123) 111-22-33");
    div[5].appendChild(inputNumTel);

    //INPUT TAG DE DIRECCION
    // <input type="text" class="form-control" name="address" id="address" placeholder="Direccion">
    var inputAddress = document.createElement("input");
    inputAddress.setAttribute("type", "text");
    inputAddress.setAttribute("class", "form-control");
    inputAddress.setAttribute("name", "address");
    inputAddress.setAttribute("id", "address");
    inputAddress.setAttribute("value", empleado[0].address);
    inputAddress.setAttribute("placeholder", "Direccion");
    div[6].appendChild(inputAddress);


}

function Modify(){
    axios.put(url + "employees/" + identificador, headers)
    .then(function(res){
        if(res.data.code === 200){
            // localStorage.setItem("token", res.data.message);
            window.location.href = "employees.html";
            alert("Empleado Actualizado Correctamente");
        }else{
            alert("No se pudo actualizar este empleado, intenta de nuevo!");
        }
    }).catch(function(err){
        console.log(err);
    });
}