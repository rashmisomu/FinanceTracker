const express=require('express');
const app=express();
const {db}=require('./db/db');
const {readdirSync}=require('fs');//reads file in a folder
const cors = require('cors');
require('dotenv').config();

//middlewares
app.use(express.json());
app.use(cors());

//routes
console.log(readdirSync('./routes').map((route)=>app.use('/api/v1',require('./routes/'+route))));

const PORT =process.env.PORT || 3000;
const server=()=>{
    db();
    app.listen(PORT,()=>{
       console.log("Listen to port", PORT);
    });
  
};
server();