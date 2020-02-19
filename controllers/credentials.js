const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Credential = require('../models/credentials');
const User = require('../models/user');

exports.newCred = function(req, res, next){
    const { app, login, alt_login, key, user_id } = req.body;

    if( app.length > 1 && login.length > 1 && alt_login.length > 1 && key.length > 1 && user_id.length !== 0 ){
        
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
        
    }else{
        res.json({ status: false, msg: 'Form can not be empty' });
    }

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

exports.updateCred = function(req, res, next){

    const { user_id, id, app, login, key, alt_login } = req.body;
    console.log(req.body);

    Credential.update({ 
        app: app,
        login: login,
        key: key,
        altLogin: alt_login,
        updatedAt: Date.now()
    }, { 
        where: { 
            id: id, 
            user_id: user_id 
        } 
    })
    .then(resp => {
        if(resp.length > 0){
            res.json({ status: true, msg: 'updated credentials' });
        }else{
            res.json({ status: false, msg: 'wrong parameters passed' });
        }
        console.log(resp)
    })
    .catch(err => {
        console.log(err)
        res.json({ status: false, msg: 'can not update credentials at the moment' });
    })

}

exports.deleteCred = function(req, res, next){

    const { id, user_id } = req.body;

    Credential.destroy({
        where: {
            id: id,
            user_id: user_id
        }
    }).then(resp =>{

        if(resp === 1){
            res.json({ status: true, msg: 'deleted credentials' });
        }else{
            res.json({ status: false, msg: 'wrong parameters passed' });
        }

        console.log(resp)

    }).catch(err =>{

        console.log(err)
        res.json({ status: false, msg: 'can not delete credentials at the moment' });
    })

}