const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Credential = require('../models/credentials');
const User = require('../models/user');

exports.newCred = function(req, res, next){
    const { app, login, alt_login, key, user_id } = req.body;

    User.findAll({
        where: { id: user_id }
    }).then(user =>{
        if(user.length > 0){
            Credential.create({
                user_id: user_id,
                app: app,
                login: login,
                key: key,
                altLogin: alt_login
            }).then(cred =>{
                console.log(cred)
                res.json({ status: true, msg: 'created new credential' });
            })
        }else{
            res.json({ status: false, msg: 'Found no user with that id' });
        }
    })
}

exports.fetchCreds = function(req, res,next){
    const { user_id } = req.params;
    console.log(user_id);
    Credential.findAll({ where: { user_id: user_id } })
    .then(cred =>{
        console.log(cred.length)
        if(cred.length > 0){
            res.json({ status: true, msg: 'your credentials', cred })
        }else{
            res.json({ status: false, msg: 'you have no credentials', })
        }
    })
    .catch(err => console.log(err))

}