const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const multer = require('multer');

// controllers
const controllers = require('../controllers/index');

// index route
router.get('/credentials/:id', (req, res)=>{
  console.log(req.params.id);
  res.json({ status: true, msg: 'You reached me!' })
})

// signup route
router.post('/signup', [
    // validate input fields
    check('fname').isLength({ min: 1 }),
    check('lname').isLength({ min: 1 }),
    check('username').isLength({ min: 1 }),
    check('email').isEmail(),
    check('password').isLength({ min: 6 })
  ], controllers.signup)


// login route
router.post('/login', controllers.login);


// get profile details
router.get('/profile', (req, res)=>{ console.log(req.body) })


module.exports = router;

// install cuncurrently as a dev-dependency