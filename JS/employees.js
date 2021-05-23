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
      for (var j = 0; j < 2; j++) {
        var celda = document.createElement("td");
        var textoCelda = document.createTextNode(`${employees[i].employee_id}`);
        var textoCelda = document.createTextNode(`${employees[i].employee_name}`);
        var textoCelda = document.createTextNode(`${employees[i].last_name}`);
        var textoCelda = document.createTextNode(`${employees[i].mail}`);
        var textoCelda = document.createTextNode(`${employees[i].pass}`);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
      }
      tblBody.appendChild(hilera);
    }
    tabla.appendChild(tblBody);
    body.appendChild(tabla);
    tabla.setAttribute("border", "2");
}