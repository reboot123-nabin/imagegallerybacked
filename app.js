
//const mongoose = require('mongoose');//third party --for connecting with mongodb
const express = require('express');//third party
const bodyParser =require('body-parser');//core module
const dotenv=require("dotenv");

dotenv.config({path:'./config.env'});
const DB=process.env.DATABASE;
const PORT=process.env.PORT;
const cors=require('cors');
const db=require('./db/db');
dotenv.config({path:'../config.env'});

const user_route=require('./routes/user_route');

const app=express();

app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}));

app.use(user_route);
app.listen(PORT,()=>{
    console.log(`server is runnning at port ${PORT}`)
})
// app.listen(3000);