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
    inputID.setAttribute("id", "employee_idINP");
    inputID.setAttribute("value", JSON.stringify(empleado.employee_id));
    inputID.setAttribute("disabled", "");
    div[0].appendChild(inputID);

    // INPUT TAG de employee_name
    // <input type="text" class="form-control" name="employee_name" id="employee_name" placeholder="Nombre(s)">   
    var inputEmployee_name = document.createElement("input");
    inputEmployee_name.setAttribute("type", "text");
    inputEmployee_name.setAttribute("class", "form-control");
    inputEmployee_name.setAttribute("name", "employee_name");
    inputEmployee_name.setAttribute("id", "employee_nameINP");
    var valueInputEmployee_Name = JSON.stringify(empleado.employee_name).replace(/['"]+/g, '');
    inputEmployee_name.setAttribute("value", valueInputEmployee_Name);
    inputEmployee_name.setAttribute("placeholder", "Nombre(s)");
    div[1].appendChild(inputEmployee_name);

    //INPUT TAG de LAST_NAME
    // <input type="text" class="form-control" name="last_name" id="last_name" placeholder="Apellido(s)">
    var inputLast_name = document.createElement("input");
    inputLast_name.setAttribute("type", "text");
    inputLast_name.setAttribute("class", "form-control");
    inputLast_name.setAttribute("name", "last_name");
    inputLast_name.setAttribute("id", "last_nameINP");
    var valueInputLast_Name =  JSON.stringify(empleado.last_name).replace(/['"]+/g, '');
    inputLast_name.setAttribute("value", valueInputLast_Name);
    inputLast_name.setAttribute("placeholder", "Apellido(s)");
    div[2].appendChild(inputLast_name);

    //INPUT TAG de MAIL
    // <input type="email" class="form-control" name="email" id="mail" placeholder="example@mail.com">
    var inputMail = document.createElement("input");
    inputMail.setAttribute("type", "text");
    inputMail.setAttribute("class", "form-control");
    inputMail.setAttribute("name", "mail");
    inputMail.setAttribute("id", "mailINP");
    var valueInputMail = JSON.stringify(empleado.mail).replace(/['"]+/g, '');
    inputMail.setAttribute("value", valueInputMail);
    inputMail.setAttribute("placeholder", "example@mail.com");
    div[3].appendChild(inputMail);

    //INPUT TAG de PASS
    // <input type="password" class="form-control" name="password" id="pass" placeholder="**********">
    var inputPass = document.createElement("input");
    inputPass.setAttribute("type", "password");
    inputPass.setAttribute("class", "form-control");
    inputPass.setAttribute("name", "password");
    inputPass.setAttribute("id", "passINP");
    var valueInputPass = JSON.stringify(empleado.pass).replace(/['"]+/g, '');
    inputPass.setAttribute("value", valueInputPass);
    inputPass.setAttribute("placeholder", "**********");
    div[4].appendChild(inputPass);

    //INPUT TAG de NUMTELEFONO
    // <input type="text" class="form-control" name="phone" id="phone_num" placeholder="(123) 111-22-33">
    var inputNumTel = document.createElement("input");
    inputNumTel.setAttribute("type", "text");
    inputNumTel.setAttribute("class", "form-control");
    inputNumTel.setAttribute("name", "phone");
    inputNumTel.setAttribute("id", "phone_numINP");
    var valueInputPhone_Num = JSON.stringify(empleado.phone_num).replace(/['"]+/g, '');
    inputNumTel.setAttribute("value", valueInputPhone_Num);
    inputNumTel.setAttribute("placeholder", "(123) 111-22-33");
    div[5].appendChild(inputNumTel);

    //INPUT TAG DE DIRECCION
    // <input type="text" class="form-control" name="address" id="address" placeholder="Direccion">
    var inputAddress = document.createElement("input");
    inputAddress.setAttribute("type", "text");
    inputAddress.setAttribute("class", "form-control");
    inputAddress.setAttribute("name", "address");
    inputAddress.setAttribute("id", "addressINP");
    var valueInputAddress = JSON.stringify(empleado.address).replace(/['"]+/g, '');
    inputAddress.setAttribute("value", valueInputAddress);
    inputAddress.setAttribute("placeholder", "Direccion");
    div[6].appendChild(inputAddress);


}

function Modify(){
    var id = document.getElementById('employee_idINP').value;
    var name = document.getElementById('employee_nameINP').value;
    var last_name = document.getElementById('last_nameINP').value;
    var mail = document.getElementById('mailINP').value;
    var pass = document.getElementById('passINP').value;
    var phone_num = document.getElementById('phone_numINP').value;
    var address = document.getElementById('addressINP').value;
    
    // console.log(id);
    // console.log(name);
    // console.log(mail);
    // console.log(last_name);
    // console.log(pass);
    // console.log(phone_num);
    // console.log(address);
    // console.log('https://node-js-final.herokuapp.com/employees/' + id);

    axios({
        method: 'put',
        url: 'https://node-js-final.herokuapp.com/employees/' + id,
        data:{
            employee_id: id,
            employee_name: name,
            last_name: last_name,
            phone_num: phone_num,
            mail: mail,
            address: address,
            pass: pass
        }
    }).then(function(res){
        if(res.data.code === 200){
            localStorage.setItem("token", res.data.message);
            console.log(JSON.stringify(res));
            alert("Actualización Exitosa!");
            window.location.href = "employees.html";
        }
    }).catch(function(err){
        console.log(err);
    });
}