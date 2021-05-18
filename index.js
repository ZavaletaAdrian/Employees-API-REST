// Dependencies
const morgan = require("morgan");
const express = require("express");
const app = express();
// Routes
const employee = require("./routes/employees");
const user = require("./routes/user");
// Middlewares
const auth = require("./middleware/auth");
const cors = require("./middleware/cors");
const index =  require("./middleware/index");
const notFound = require("./middleware/notFound");

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);

app.use("/user", user);
app.use(auth);
app.use("/employee", employee);

app.use(notFound);

app.listen(process.env.PORT || 3000, () =>{
    console.log('Server is running...');
});