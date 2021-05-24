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

function displayEmployee(employees) {
    
    //BUSCADOR
    var body = document.getElementById("body");
    var div = document.createElement("div");
    div.setAttribute("class", "mb-4");
    var tabla = document.createElement("table");
    tabla.id = "resultado";
    tabla.setAttribute("class", "class-form")
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
    <tr class="table-secondary">
        <td class="table-primary" style="color:black">ID</td>
        <td class="table-primary" style="color:black">Nombre(s)</td>
        <td class="table-primary" style="color:black">Apellido(s)</td>
        <td class="table-primary" style="color:black">Correo</td>
        <td class="table-primary" style="color:black">Contraseña</td>
        <td class="table-primary" style="color:black">Numero de Teléfono</td>
        <td class="table-primary" style="color:black">Dirección</td>
        <td class="table-primary" style="color:black">Borrar</td>
        <td class="table-primary" style="color:black">Modificar</td>
    </tr>`;
    for(let employee of employees){
            resultado.innerHTML += `
                <tbody>
                    <tr class="table-primary">
                        <td class="table-primary"id="id" value=${employee.employee_id}>${employee.employee_id}</td>
                        <td class="table-primary">${employee.employee_name}</td>
                        <td class="table-primary">${employee.last_name}</td>
                        <td class="table-primary">${employee.mail}</td>
                        <td class="table-primary">${employee.pass}</td>
                        <td class="table-primary">${employee.phone_num}</td>
                        <td class="table-primary">${employee.address}</td>
                        <td class="table-primary"><button class="btn btn-danger" onclick="Borrar(${employee.employee_id})">Eliminar</button></td>
                        <td class="table-primary"><button class="btn btn-info" onclick="a(${employee.employee_id})">Modificar</button></td>
                    </tr>
                </tbody>
            `}

    const filtrar = ()=>{
        resultado.innerHTML = `
        <tr class="table-secondary">
            <td class="table-primary">ID</td>
            <td class="table-primary">Nombre(s)</td>
            <td class="table-primary">Apellido(s)</td>
            <td class="table-primary">Correo</td>
            <td class="table-primary">Contraseña</td>
            <td class="table-primary">Numero de Teléfono</td>
            <td class="table-primary">Dirección</td>
            <td class="table-primary">Borrar</td>
            <td class="table-primary">Modificar</td>
        </tr>`;
        const texto = inputTexto.value.toLowerCase();
        for(let employee of employees){
            let nombre = employee.employee_name.toLowerCase();
            if(nombre.indexOf(texto) != -1){
                resultado.innerHTML += `
                    <tbody>
                        <tr>
                            <td id="id" value=${employee.employee_id}>${employee.employee_id}</td>
                            <td>${employee.employee_name}</td>
                            <td>${employee.last_name}</td>
                            <td>${employee.mail}</td>
                            <td>${employee.pass}</td>
                            <td>${employee.phone_num}</td>
                            <td>${employee.address}</td>
                            <td><button class="btn btn-danger" onclick="Borrar(${employee.employee_id})">Eliminar</button></td>
                            <td><button class="btn btn-info" onclick="a(${employee.employee_id})">Modificar</button></td>
                        </tr>
                    </tbody>
                `
            }
        }
        if(resultado.innerHTML === ''){
            resultado.innerHTML += `
                <li>Empleado no encontrado</li>
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
            // localStorage.setItem("token", res.data.message);
            window.location.href = "employees.html";
            alert("Empleado Eliminado Correctamente");
        }else{
            alert("No puedes eliminar este usuario!");
        }
    }).catch(function(err){
        console.log(err);
    });
}

// function Modify(identificador){
//     axios.put(url + "employees/" + identificador, headers)
//     .then(function(res){
//         if(res.data.code === 200){
//             // localStorage.setItem("token", res.data.message);
//             window.location.href = "formEmployee.html";
//         }
//     }).catch(function(err){
//         console.log(err);
//     });
// }

