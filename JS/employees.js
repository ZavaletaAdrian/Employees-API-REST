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
    var body = document.getElementsByTagName("body")[0];
    var tabla = document.createElement("table");
    tabla.id = "resultado";
    var inputBuscador = document.createElement("input");
    inputBuscador.type = "text";
    inputBuscador.id = "inputTexto";
    body.appendChild(inputBuscador);
    body.appendChild(tabla);

    const inputTexto = document.querySelector('#inputTexto');
    const resultado = document.querySelector('#resultado');
    for(let employee of employees){
            resultado.innerHTML += `
                <tbody>
                    <tr>
                        <td>${employee.employee_id}</td>
                        <td>${employee.employee_name}</td>
                        <td>${employee.last_name}</td>
                        <td>${employee.mail}</td>
                        <td>${employee.pass}</td>
                        <td>${employee.phone_num}</td>
                        <td>${employee.address}</td>
                        <td><a href='https://node-js-final.herokuapp.com/delete/${employee.employee_id}'>Eliminar</a></td>
                        <td><a href='https://node-js-final.herokuapp.com/modify/${employee.employee_id}'>Modificar</a></td>
                    </tr>
                </tbody>
            `}

    const filtrar = ()=>{
        resultado.innerHTML = '';
        const texto = inputTexto.value.toLowerCase();
        for(let employee of employees){
            let nombre = employee.employee_name.toLowerCase();
            if(nombre.indexOf(texto) != -1){
                resultado.innerHTML += `
                    <tbody>
                        <tr>
                            <td>${employee.employee_id}</td>
                            <td>${employee.employee_name}</td>
                            <td>${employee.last_name}</td>
                            <td>${employee.mail}</td>
                            <td>${employee.pass}</td>
                            <td>${employee.phone_num}</td>
                            <td>${employee.address}</td>
                            <td><a href='https://node-js-final.herokuapp.com/delete/${employee.employee_id}'>Eliminar</a></td>
                            <td><a href='https://node-js-final.herokuapp.com/modify/${employee.employee_id}'>Modificar</a></td>
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