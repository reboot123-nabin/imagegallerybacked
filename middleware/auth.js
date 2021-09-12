const jwt=require('jsonwebtoken');
//const { findOne } = require('../modules/bus_model');

const User=require('../modules/user_model');

//const Admin=require('..modules/adminModel');
//const passenger=require('../modules/passengerModel');
//const driver=require('../modules/driverModel');
//main ---guard
module.exports.verifyUser=function(req,res,next){
    //console.log(req.headers.authorization)
    try{
    const token= req.headers.authorization.split(" ")[1];
    console.log(token);
    const data=jwt.verify(token,'secretkey')
    //we have id only
    console.log(data.userId);
    User.findOne({_id:data.userId})
    .then(function(result){
        
       req.userInfo=result;//all information of user
       //console.log(req.userInfo)
        next();
    })
    .catch(function(e){
        res.status(401).json({error:e})
    });//

    //console.log(data);
    //console.log(token);
    //console.log(data.userId)

    }
    catch(e){
        res.status(401).json({error:e})
    }
}


// //main ---guard
// module.exports.verifyAdmin=function(req,res,next){
//     try{
//     const token= req.headers.authorization.split(" ")[1];
//     const data=jwt.verify(token,'secretkey')
//     //we have id only
//     console.log(data.userId);
//     Admin.findOne({_id:data.userId})
//     .then(function(result){
//         //console.log(result)
//        req.AdminInfo=result;//all information of user
//         next();
//     })
//     .catch(function(e){
//         res.status(401).json({error:e})
//     });//

//     //console.log(data);
//     //console.log(token);
//     //console.log(data.userId)
//     next();
//     }
//     catch(e){
//         res.status(401).json({error:e})
//     }
// }


// //main ---guard
// module.exports.verifypassenger=function(req,res,next){
//     try{
//     const token= req.headers.authorization.split(" ")[1];
//     const data=jwt.verify(token,'secretkey')
//     //we have id only
//     console.log(data.userId);
//     User.findOne({_id:data.userId})
//     .then(function(result){
//         //console.log(result)
//        req.userInfo=result;//all information of user
//         next();
//     })
//     .catch(function(e){
//         res.status(401).json({error:e})
//     });//

//     //console.log(data);
//     //console.log(token);
//     //console.log(data.userId)
//     next();
//     }
//     catch(e){
//         res.status(401).json({error:e})
//     }
// }




// //main ---guard
// module.exports.verifydriver=function(req,res,next){
//     try{
//     const token= req.headers.authorization.split(" ")[1];
//     const data=jwt.verify(token,'secretkey')
//     //we have id only
//     console.log(data.userId);
//     User.findOne({_id:data.userId})
//     .then(function(result){
//         //console.log(result)
//        req.driverInfo=result;//all information of user
//         next();
//     })
//     .catch(function(e){
//         res.status(401).json({error:e})
//     });//

//     //console.log(data);
//     //console.log(token);
//     //console.log(data.userId)
//     next();
//     }
//     catch(e){
//         res.status(401).json({error:e})
//     }
// }




































































//second guard-----
module.exports.verifyAdmin=function(req,res,next){
    
    if(!req.userInfo){
        return res.status(401).json({message:"Invalid users"})
    }
    else if(req.userInfo.userType!=='Admin'){
        return res.status(401).json({message:"Unauthorized!!"})
    }
    next();
}

//third guard for reader

module.exports.verifyPassenger=function(req,res,next){
    if(!req.userInfo){
        return res.status(401).json({message:"Invalid users"})
    }
    else if(req.userInfo.userType!=='passenger'){
        return req.status(401).json({message:"Unauthorized!!"})
    }
    next();
}

//double
module.exports.verifyPassengerAdmin=function(req,res,next){
    if(!req.userInfo){
        return res.status(401).json({message:"Invalid users"})
    }
    else if(req.userInfo.userType!=='User' || req.userInfo.userType=='Admin'){
        return req.status(401).json({message:"Unauthorized!!"})
    }
    next();
}
//fourth guard

module.exports.verifyDriver=function(req,res,next){
    if(!req.userInfo){
        return res.status(401).json({message:"Invalid users"})
    }
    else if(req.userInfo.userType!=='Driver'){
        return req.status(401).json({message:"Unauthorized!!"})
    }
    next();
}
