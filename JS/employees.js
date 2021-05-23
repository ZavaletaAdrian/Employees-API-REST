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

function displayEmployee(employees){
    var table = document.querySelector("table");
    for(var i = 0; i < employees.length; i++){
        // body.innerHTML += `<h3>${employees[i].employee_name}</h3>`;
        table.innerHTML += `<tr>`;
        table.innerHTML += `<td>${employees[i].employee_id}</td>`;
        table.innerHTML += `<td>${employees[i].employee_name}</td>`;
        table.innerHTML += `<td>${employees[i].last_name}</td>`;
        table.innerHTML += `<td>${employees[i].mail}</td>`;
        table.innerHTML += `<td>${employees[i].pass}</td>`;
        table.innerHTML += `</tr>`;
    }
}