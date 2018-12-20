const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles axios request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const formatted_address = req.body.formatted_address;
  
  const queryText = `INSERT INTO user_info (username, password, first_name, last_name, latitude, longitude, formatted_address) 
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`;

  pool.query(queryText, [username, password, first_name, last_name, latitude, longitude, formatted_address])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/editProfile/:id', rejectUnauthenticated, (req, res) => {
    const reqId = req.body.id
    const username = req.body.username;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const profile_pic = req.body.profile_pic;

    const sqlText = `UPDATE user_info SET ("username", "first_name", "last_name", "profile_pic") = ($1, $2, $3, $4)
    WHERE id=$5`;
    
    pool.query(sqlText, [username, first_name, last_name, profile_pic, reqId])
      .then(() => { res.sendStatus(201); })
      .catch((error) => {
        console.log(`PUT error ${queryText}`, error);
        res.sendStatus(500);
      });
  });

  router.put('/editLocation/:id', rejectUnauthenticated, (req, res) => {
    const reqId = req.body.id
    const latitude = req.body.lat;
    const longitude = req.body.lng;
    const formatted_address = req.body.formatted_address;

    const sqlText = `UPDATE user_info SET ("latitude", "longitude", "formatted_address") = ($1, $2, $3)
    WHERE id=$4`;
    
    pool.query(sqlText, [latitude, longitude, formatted_address, reqId])
      .then(() => { res.sendStatus(201); })
      .catch((error) => {
        console.log(`PUT error ${queryText}`, error);
        res.sendStatus(500);
      });
  });

module.exports = router;
