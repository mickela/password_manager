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



exports.signup = function(req, res, next){

    upload(req, res, (err) =>{

        if(err){
            res.status(422).json({ status: false, msg: err })
        }else{

            if(req.file == undefined){
                res.status(422).json({ status: false, msg: 'Error: No file selected!' })
            }else{

                const image = `uploads/${req.file.filename}`;

                // errors, if any
                        
                const errors = validationResult(req.body)
                if (!errors.isEmpty()) {
                    console.log(errors)
                    return res.status(422).json({ status: false, msg: "It seems you entered invalid data", errors: errors.array() })
                }

                let { fname, lname, email, username, password } = req.body;
                
                
                console.log(req.body)
                console.log(image)
            
            // check if username or email already exists
                User.findAll({ 
                    where: {
                        [Op.or]: [{email: email}, {username: username}]
                      } 
                })
                .then(user =>{
                    console.log(user.length)
                    if(user.length > 0){
                        res.json({ status: false, msg: 'user already exists!', errors: [] })
                    }else{
                        // hash password
                        bcrypt.genSalt(10, (err, salt)=> {
                           bcrypt.hash(password, salt, (err, hash)=>{
                               if(err) throw err;
                               //  set password to hash
                               password = hash;
                            
                               // Create a new user
                               User.create({ first_name: fname, last_name: lname, email, username, password, image })
                               .then(user => {
                                   console.log("User's auto-generated ID:", user.id);
                                   // User is now registered and can log in
                                   res.json({ status: true, msg: 'User created successfully' });
                               })
                               .catch(err => { 
                                   console.log(err) 
                                   res.json({ status: false, msg: 'Oops, something went wrong. Try again later' })
                               })
                           }
                       )})
                    }
                })

            }
        }
        

        
    }) // close upload

}




exports.login = function(req, res, next){
    // collect username and password that user entered
    const { username, password } = req.body;

    // check if username or email exists
    User.findAll({ 
        where: {
            [Op.or]: [{email: username}, {username: username}]
          } 
    })
    .then(user =>{
        console.log(user.length)
        if(user.length > 0){
            // username/email is correct
            const data = JSON.stringify(user);    
            
            

            // parse user data to js object
            let parsedData = JSON.parse(data)[0];
            console.log(parsedData)

            // check if password matches hashed password
            bcrypt.compare(password, parsedData.password).then((response) => {
                console.log(response);

                if(response === true){
                    // send user details
                    res.json({ status: true, msg: "Correct credentials", userData: 
                        {
                            id: parsedData.id,
                            fname: parsedData.first_name,
                            lname: parsedData.last_name,
                            email: parsedData.email,
                            username: parsedData.username,
                            picture: parsedData.image
                        }
                    })
                }else{
                    res.json({ status: false, msg: "Wrong password", errors: [] });
                }
            });



        }else{
            // tell user that username/email is incorrect
            res.json({ status: false, msg: "Username or email incorrect ", errors: [] });
        }
    })
}

exports.profile = function(req, res, next){
    console.log(req.params);
    const { id } = req.params;

    User.findAll({ where: { id: id } })
    .then(user =>{
        console.log(user.length)
        if(user.length > 0){
            // username/email is correct
            const data = JSON.stringify(user);    
            
            // parse user data to js object
            let parsedData = JSON.parse(data)[0];
            console.log(parsedData)

            const { first_name, last_name, username, email, image } = parsedData;
            res.json({ status: true, msg: 'User found', details: { first_name, last_name, username, email, image } });
            
        }else{
            console.log(user)
            res.json({ status: false, msg: 'User not found' });
        }

    })

}

// install cuncurrently as a dev-dependency 