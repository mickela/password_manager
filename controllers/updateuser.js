const { check, validationResult } = require('express-validator');
const multer = require('multer');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const path = require('path');


// set storage engine for image
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

// check file type
function checkFileType(file, cb){
    // allowed extensions
    const filetypes = /jpeg|jpg|png|gif/;
    // check extensions
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // check mime type
    const mimetype = filetypes.test(file.mimetype)
    if(mimetype && extname ){
        return cb(null, true)
    }else{
        cb('Error: Image only');
        cb('Error: Image only');
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 },
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
}).single('picture');

exports.details = function(req, res, next){
    upload(req, res, (err)=>{
        // console.log(req.body)
        // console.log(req.file)

        const { id, fname, lname, username, email, picture } = req.body;

        let toUpdate = {};
        
        if(req.file){
            const image = `uploads/${req.file.filename}`;
            toUpdate = { first_name: fname, last_name: lname, username: username, email: email, image, updatedAt: Date.now() }
        }else{
            toUpdate = { first_name: fname, last_name: lname, username: username, email: email, image: picture, updatedAt: Date.now() }
        }

        User.update(toUpdate, { 
            where: { id }
        }).then(user =>{
            // console.log(user)
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
            res.json({ status: false, msg: 'can not update user details at the moment' });
            // console.log(err)
        })
    })
}

exports.changepassword = function(req, res, next){

    let { id, password, new_password } = req.body;
    console.log(req.body);

    if( password.length < 6 || new_password.length < 6 ){
        res.json({ status: false, msg: 'Password can not be less than 6 characters' });
    }else{

        User.findAll({
            // get user details
            where: { id: id }

        }).then(user =>{

            // console.log(user)
            if(user.length === 1){
                
                // parse user data to js object
                const parsedData = JSON.parse(JSON.stringify(user))[0];


                // check if user-entered password matches password from db
                bcrypt.compare(password, parsedData.password)
                .then(response =>{
                    if(response === true){

                        // hash new_password
                        bcrypt.genSalt(10, (err, salt)=> {
                            bcrypt.hash(new_password, salt, (err, hash)=>{
                                if(err) throw err;
                                //  set new_password to hash
                                new_password = hash;

                                // set password in db to hashed new_password

                                User.update({ password: new_password }, { where: { id: id } })
                                .then(user =>{
                                    if(user.length === 1){
                                        res.json({ status: true, msg: 'Updated successfully' })
                                    }else{
                                        res.json({ status: false, msg: 'can not update password at the moment' })
                                    }
                                })
                                .catch(err =>{
                                    let errorMsg = err.errors[0].message;
                                    console.log(errorMsg)
                                    
                                    
                                    res.json({ status: false, msg: 'can not update password at the moment' })
                                    
                                })

                            })
                        })

                    }else{
                        res.json({ status: false, msg: 'Wrong password' });
                    }
                })
            }
        })
    }


}