require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');




//crear el servidor 
const app = express();

// Cors
app.use(cors());


//Base de datos
dbConnection();

//XHOcTEj5DG52XLOl
//spar_user

//rUTAS
app.get('/', (req, res)=>{
    res.json({
        ok:true,
        msg:"Hola mundo"
    })
});








app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port `+process.env.PORT);
})