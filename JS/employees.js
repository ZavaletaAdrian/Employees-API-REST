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
        loadEmployee();
    }else{
        window.location.href = "index.html";
    }
}

function loadEmployee(){
    axios.get(url + "employees", headers)
    .then(function(res){
        // console.log(res);
        displayEmployee(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
}

function Crear(){
    document.getElementById('crear').addEventListener('click', function(){
        window.location.href = "createEmployee.html";
    });
}

function CreateEmployee(){

    var name = document.getElementById('name');
    var last_name = document.getElementById('last_name');
    var mail = document.getElementById('mail');
    var pass = document.getElementById('pass');
    var phone_num = document.getElementById('phone_num');
    var address = document.getElementById('address');

    axios({
        url: url + 'employees/',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
        },
        data: {
            employee_name: name.value,
            last_name: last_name.value,
            mail: mail.value,
            pass: pass.value,
            phone_num: phone_num.value,
            address: address.value,
        }
    }).then(res => {
        if(res.data.code === 201){
            swal("Usuario Creado", "Usuario Creado Correctamente", "success")
            .then(() => {
                window.location.href = "employees.html";
            });
        }
    }).catch(error =>{
        console.log(error.response);
    });
}

function displayEmployee(employees) {
    
    //BUSCADOR
    var body = document.getElementById("body");
    var div = document.createElement("div");
    div.setAttribute("class", "table");
    div.setAttribute("style", "margin: 20px, 20px, 20px");
    var tabla = document.createElement("table");
    tabla.id = "resultado";
    tabla.setAttribute("class", "table-light")
    var inputBuscador = document.getElementById("inputTexto");
    // inputBuscador.type = "text";
    // inputBuscador.id = "inputTexto";
    // inputBuscador.setAttribute("class", "form-control");
    div.appendChild(inputBuscador);
    div.appendChild(tabla);
    body.appendChild(div);

    const inputTexto = document.querySelector('#inputTexto');
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = `
    <tr class="table-info">
        <td class="table-info">ID</td>
        <td class="table-info">Nombre(s)</td>
        <td class="table-info">Apellido(s)</td>
        <td class="table-info">Correo</td>
        <td class="table-info">Contraseña</td>
        <td class="table-info">Numero de Teléfono</td>
        <td class="table-info">Dirección</td>
        <td class="table-info">Borrar</td>
        <td class="table-info">Modificar</td>
    </tr>`;
    for(let employee of employees){
            resultado.innerHTML += `
                <tbody>
                    <tr class="table-light">
                        <td class="table-light" id="id" value=${employee.employee_id}>${employee.employee_id}</td>
                        <td class="table-light">${employee.employee_name}</td>
                        <td class="table-light">${employee.last_name}</td>
                        <td class="table-light">${employee.mail}</td>
                        <td class="table-light">${employee.pass}</td>
                        <td class="table-light">${employee.phone_num}</td>
                        <td class="table-light">${employee.address}</td>
                        <td class="table-light"><button class="btn btn-danger" onclick="Borrar(${employee.employee_id})">Eliminar</button></td>
                        <td class="table-light"><button class="btn btn-info" onclick="a(${employee.employee_id})">Modificar</button></td>
                    </tr>
                </tbody>
            `}

    const filtrar = ()=>{
        resultado.innerHTML = `
        <tr class="table-info">
            <td class="table-info">ID</td>
            <td class="table-info">Nombre(s)</td>
            <td class="table-info">Apellido(s)</td>
            <td class="table-info">Correo</td>
            <td class="table-info">Contraseña</td>
            <td class="table-info">Numero de Teléfono</td>
            <td class="table-info">Dirección</td>
            <td class="table-info">Borrar</td>
            <td class="table-info">Modificar</td>
        </tr>`;
        const texto = inputTexto.value.toLowerCase();
        for(let employee of employees){
            let nombre = employee.employee_name.toLowerCase();
            let apellido = employee.last_name.toLowerCase();
            let mail = employee.mail.toLowerCase();
            let phone = employee.phone_num.toLowerCase();
            let address = employee.address.toLowerCase();



            if(nombre.indexOf(texto) != -1 || apellido.indexOf(texto) != -1 || mail.indexOf(texto) != -1 ||
            phone.indexOf(texto) != -1 || address.indexOf(texto) != -1){
                resultado.innerHTML += `
                    <tbody>
                        <tr class="table-light">
                            <td class="table-light" id="id" value=${employee.employee_id}>${employee.employee_id}</td>
                            <td class="table-light">${employee.employee_name}</td>
                            <td class="table-light">${employee.last_name}</td>
                            <td class="table-light">${employee.mail}</td>
                            <td class="table-light">${employee.pass}</td>
                            <td class="table-light">${employee.phone_num}</td>
                            <td class="table-light">${employee.address}</td>
                            <td class="table-light"><button class="btn btn-danger" onclick="Borrar(${employee.employee_id})">Eliminar</button></td>
                            <td class="table-light"><button class="btn btn-info" onclick="a(${employee.employee_id})">Modificar</button></td>
                        </tr>
                    </tbody>
                `
            }
            function contarTagsTR() {
                var trs = document.getElementsByTagName('tr');
                var i=0;
                for (var tr in trs){i++;}
                return i;
            }
        }
        if(contarTagsTR() < 5 ){
            resultado.innerHTML += `
                <label>Empleado no encontrado</label>
                `
        }
    }
    inputTexto.addEventListener('keyup', filtrar);
}


function a(identificador){
    axios.get(url + "employees/" + identificador, headers)
    .then(function(res){
        if(res.data.code === 200){
            window.location.href = "formEmployee.html?id=" + identificador;
        }
    }).catch(function(err){
        console.log(err);
    });
}

function Borrar(identificador){
    axios.delete(url + "employees/" + identificador, headers)
    .then(function(res){
        if(res.data.code === 200){
            swal("Usuario Eliminado", "Usuario Eliminado Correctamente", "success")
            .then(() => {
                window.location.href = "employees.html";
            });
        }else{
            alert("No puedes eliminar este usuario!");
        }
    }).catch(function(err){
        console.log(err);
    });
}