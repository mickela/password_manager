const { check, validationResult } = require('express-validator');
const multer = require('multer');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.details = function(req, res, next){
    // console.log(req.body)
    const { id, fname, lname, username, email } = req.body;

    User.update({ first_name: fname, last_name: lname, username: username, email: email, updatedAt: Date.now() }, { 
        where: { id }
    }).then(user =>{
        console.log(user)
        if(user.length === 1){
            res.json({ status: true, msg: "User details updated successfully" });
        }else{
            res.json({ status: false, msg: 'can not update user details at the moment' });
        }
    })
    .catch(err =>{
        let errorMsg = err.errors[0].message;
        console.log(errorMsg)
        
        if( errorMsg === 'email must be unique'){
            res.json({ status: false, msg: 'It seems that email already exists' });
        }
        else if( errorMsg === 'username must be unique' ){
            res.json({ status: false, msg: 'It seems that username is not available' });
        }
        else{
            res.json({ status: false, msg: 'can not update user details at the moment' });
        }

    })
}