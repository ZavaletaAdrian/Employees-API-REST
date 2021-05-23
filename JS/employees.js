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
    var body = document.getElementsByTagName("body")[0];
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
    for (var i = 0; i < employees.length; i++) {
      var hilera = document.createElement("tr");

          var celdaId = document.createElement("td");
        var textoId = document.createTextNode(`${employees[i].employee_id}`);
        celdaId.appendChild(textoId);
        hilera.appendChild(celdaId);
      
        var celdaEmployee_name = document.createElement("td");
        var textoEmployee_name = document.createTextNode(`${employees[i].employee_name}`);
        celdaEmployee_name.appendChild(textoEmployee_name);
        hilera.appendChild(celdaEmployee_name);

        var celdaLast_name = document.createElement("td");
        var textoLast_name = document.createTextNode(`${employees[i].last_name}`);
        celdaLast_name.appendChild(textoLast_name);
        hilera.appendChild(celdaLast_name);

        var celdaMail = document.createElement("td");
        var textoMail = document.createTextNode(`${employees[i].mail}`);
        celdaMail.appendChild(textoMail);
        hilera.appendChild(celdaMail);

        var celdaPass = document.createElement("td");
        var textoPass = document.createTextNode(`${employees[i].pass}`);
        celdaPass.appendChild(textoPass);
        hilera.appendChild(celdaPass);

        var celdaPhone_num = document.createElement("td");
        var textoPhone_num = document.createTextNode(`${employees[i].phone_num}`);
        celdaPhone_num.appendChild(textoPhone_num);
        hilera.appendChild(celdaPhone_num);

        var celdaAddress = document.createElement("td");
        var textoAddress = document.createTextNode(`${employees[i].address}`);
        celdaAddress.appendChild(textoAddress);
        hilera.appendChild(celdaAddress);

        var celdaModif = document.createElement("td");
        var textoModif = document.createTextNode(`Modificar`);
        celdaModif.appendChild(textoModif);
        hilera.appendChild(celdaModif);

        var celdaBorrar = document.createElement("td");
        var textoBorrar = document.createTextNode(`Borrar`);
        celdaBorrar.appendChild(textoBorrar);
        hilera.appendChild(celdaBorrar);

      tblBody.appendChild(hilera);
    }
    tabla.appendChild(tblBody);
    body.appendChild(tabla);
}