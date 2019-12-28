var config = require('../config');
var jwt = require("jsonwebtoken");
var User = require('../models/adminModel');
async function auth (token) {
    console.log("Is authenticating");
    if(!token)
    {
        console.log('Valar');
        var err = new Error("Not Authenticated");
        err.status = 401;
        return new Promise(reject => reject("NOAUTH"));
    }
    else
    {
        const {_id,name} = jwt.verify(token,config.secretOrKey);
        console.log(name);
        User.find({name}).then((user)=>{
            if(!user)
            {
                var err = new Error("Not Authenticated");
                err.status = 401;
                return new Promise(reject => reject('NOAUTH'));
            }
            else
            {
                console.log("true");
                return new Promise(resolve => resolve("Resolved"));
            }
        })
        .catch((err)=>console.log(err));
    }
    // console.log(req.session);
    // if (!req.session.user) {
    //     var authHeader = req.headers.authorization;
    //     if (!authHeader) {
    //         var err = new Error('You are not authenticated!');
    //         res.setHeader('WWW-Authenticate', 'Basic');                        
    //         err.status = 401;
    //         next(err);
    //         return;
    //     }
    //     var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    //     var user = auth[0];
    //     var pass = auth[1];
    //     if (user == 'admin' && pass == 'password') {
    //         req.session.user = 'admin';
    //         next(); // authorized
    //     } else {
    //         var err = new Error('You are not authenticated!');
    //         res.setHeader('WWW-Authenticate', 'Basic');
    //         err.status = 401;
    //         next(err);
    //     }
    // }
    // else {
    //     if (req.session.user === 'admin') {
    //         console.log('req.session: ',req.session);
    //         next();
    //     }
    //     else {
    //         var err = new Error('You are not authenticated!');
    //         err.status = 401;
    //         next(err);
    //     }
    // }
}

module.exports = auth;