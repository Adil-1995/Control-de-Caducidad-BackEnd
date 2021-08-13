require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');




//crear el servidor 
const app = express();

// Cors: let you receive api calls from different domaines
app.use(cors());

//Lectura y parseo del body
app.use(express.json())


//Base de datos
dbConnection();

// Rutas
app.use('/api/productos',require('./routes/productos'));






app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port `+process.env.PORT);
})