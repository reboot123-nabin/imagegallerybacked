const mongoose=require('mongoose');

const dotenv=require("dotenv");

dotenv.config({path:'./config.env'});
const DB=process.env.DATABASE;

mongoose.connect(DB,{
    useNewUrlParser: true,
 useCreateIndex: true,
 useUnifiedTopology : true
}).then(()=>{
    console.log('connection successsful  ');
}).catch((err)=>console.log('no connection'));
