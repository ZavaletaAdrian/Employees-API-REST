const express = require("express");
const jwt = require("jsonwebtoken");
const user = express.Router();
const db = require("../config/database");

user.post("/signin", async (req, res, next) =>{
    const {employee_name, last_name, mail, pass, phone_num, address} = req.body;

    if(employee_name && last_name && mail && pass && phone_num && address){
        let query = "INSERT INTO employees employees (employee_name, last_name, mail, pass, phone_num, address) " 
        query += `VALUES ('${employee_name}', '${last_name}', '${mail}', '${pass}', '${phone_num}', '${address}');`;
        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(201).json({ code: 201, message: "Usuario registrado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error, intente nuevamente" });
    }
    return res.status(500).json({ code: 500, message: "Campos Incompletos"});
});

user.post("/login", async (req, res, next) => {
    const {mail, pass} = req.body;

    const query = `SELECT * FROM employees WHERE mail = '${mail}' AND pass = '${pass}';`;
    const rows = await db.query(query);

    if(mail && pass){
        if(rows.length == 1){
            const token = jwt.sign({
                employee_id: rows[0].employee_id,
                employee_mail: rows[0].employee_mail
            }, "debugkey");
            return res.status(200).json({ code: 200, message: token});
        }else{
            return res.status(200).json({ code: 200, message: "Usuario y/o Contraseña Incorrectos, intente de nuevo."});
        }
    }
    return res.status(500).json({ code: 500, message: "Campos Incompletos"});
});

user.get("/", async (req, res, next) =>{
    const query = "SELECT * FROM employees";
    const rows = await db.query(query);

    return res.status(200).json({ code: 200, message: rows});
});

module.exports = user;