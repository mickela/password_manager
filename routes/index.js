const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const multer = require('multer');


// controllers
const user = require('../controllers/user');
const credentials = require('../controllers/credentials');
const updateuser = require('../controllers/updateuser');

// index route
router.get('/credentials/:user_id', credentials.fetchCreds)

// create credentials
router.post('/credentials', multer().array(), credentials.newCred);

// update credentials
router.put('/credentials', multer().array(), credentials.updateCred);

// delete credentials
router.delete('/credentials', multer().array(), credentials.deleteCred);

// signup route
router.post('/signup', [
  // validate input fields
  check('fname').isLength({ min: 2 }),
  check('lname').isLength({ min: 2 }),
  check('username').isLength({ min: 3 }),
  check('email').isEmail(),
  check('password').isLength({ min: 6 })
], user.signup)


// login route
router.post('/login', multer().array(), user.login);


// get profile details
router.get('/profile/:id', user.profile);

// update user details
router.put('/editprofile', [
  // validate input fields
  check('fname').isLength({ min: 1 }),
  check('lname').isLength({ min: 1 }),
  check('username').isLength({ min: 1 }),
  check('email').isEmail(),
],  updateuser.details);

router.put('/newpassword', multer().array(), [
  check('password').isLength({ min: 6 }),
  check('new_password').isLength({ min: 6 })
], updateuser.changepassword);

module.exports = router;

// install concurrently as a dev-dependency