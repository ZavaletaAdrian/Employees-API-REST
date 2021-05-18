const express = require("express");
const jwt = require("jsonwebtoken");
const user = express.Router();
const db = require("../config/database");


module.exports = user;