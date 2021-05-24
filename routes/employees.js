const express = require("express");
const employee = express.Router();
const db = require("../config/database");
// Agregar empleados
employee.post("/", async (req, res, next) =>{
    const { employee_name, last_name, phone_num, mail, address, pass } = req.body;
    
    if(employee_name && last_name && phone_num && mail && address && pass){
        let query = "INSERT INTO employees (employee_name, last_name, phone_num, mail, pass, address)";
        query += ` VALUES('${employee_name}', ${last_name}, ${phone_num}, ${mail}, ${pass}, ${address})`;
    
        const rows = await db.query(query);
    
        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Empleado insertado correctamente"});
        }    
    
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});
// Eliminar empleados
employee.delete("/:id([0-9]{1,3})", async (req, res, next) =>{
    const query = `DELETE FROM employees WHERE employee_id=${req.params.id}`;
    const rows = await db.query(query);
    if(rows.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Empleado borrado correctamente" });
    }
    return res.status(404).json({code: 404, message: "Empleado no encontrado"});
});
// Modificar datos de empleados
// employee.put("/:id([0-9]{1,3})", async (req, res, next) =>{
//     const { employee_name, last_name, phone_num, mail, address, pass} = req.body;
    
//     if(employee_name && last_name && phone_num && mail && address && pass){
//         let query = `UPDATE employees SET employee_name='${employee_name}',last_name=${last_name},phone_num=${phone_num},mail=${mail},address=${address},pass=${pass} WHERE employee_id=${req.params.id}`;
    
//         const rows = await db.query(query);
    
//         if(rows.affectedRows == 1){
//             return res.status(200).json({code: 200, message: "Empleado actualizado correctamente"});
//         }    
    
//         return res.status(500).json({code: 500, message: "Ocurrió un error"});
//     }
//     return res.status(500).json({code: 500, message: "Campos incompletos"});

// });

employee.patch("/:id([0-9]{1,3})", async (req, res, next) =>{
    if(req.body.employee_name){
        let query = `UPDATE employees SET employee_name='${employee_name}',last_name=${last_name},phone_num=${phone_num},mail=${mail},address=${address},pass=${pass} WHERE employee_id=${req.params.id}`;
    
        const rows = await db.query(query);
    
        if(rows.affectedRows == 1){
            return res.status(200).json({code: 200, message: "Empleado actualizado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }

    return res.status(500).json({code: 500, message: "Campos incompletos"});
});
// Mostrar todos los empleados
employee.get("/", async (req, res, next) => {
    const empl =  await db.query("SELECT * FROM employees");
    return res.status(200).json({ code: 200, message: empl});
});
// Buscar empleado por ID
employee.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    const empl = await db.query("SELECT * FROM employees WHERE employee_id = " + id);
    (empl) ? res.status(200).json({ code: 200, message: empl}) : res.status(404).json({ code: 404, message: "Empleado no encontrado"});
});
// // Buscar empleado por Nombre
// employee.get('/:name([A-Za-z]+)', async (req, res, next) => {

//     const name = req.params.name;
//     const empl = await db.query("SELECT * FROM employees WHERE employee_name = '" + name.toLowerCase() + "'");

//     (empl.length > 0) ? res.status(200).json({ code: 200, message: empl}) : res.status(404).json({ code: 404, message: "Empleado no encontrado"});
// });

module.exports = employee;