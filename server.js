'use strict'

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const myconnection = require('express-myconnection');
const cors = require('cors');
require('dotenv').config();

const casosRoutes = require('./routes/casos');
const app = express();

//* Conexión base de datos
const dbOptions = {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE
}

//* Middlewares
app.use(myconnection(mysql, dbOptions, 'single'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

//* Routes
app.use('/casos', casosRoutes);

//* Server Running
app.set('port', process.env.SERVERPORT);
app.listen(app.get('port'), ()=>{
    console.log("El server ya esta corriendo en el puerto: ", app.get('port'));
})