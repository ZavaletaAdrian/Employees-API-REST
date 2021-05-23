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
        // AquiVaLaFuncionCrearForm();
    }else{
        window.location.href = "index.html";
    }
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