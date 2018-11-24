const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET Route for all seeds inventory
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM user_seed_inventory;`;
    pool.query(queryText)
        .then((result) => {
            console.log(`Got all user's seeds back from the db`);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`GET error ${queryText}`, error);
            res.sendStatus(500);
        })
});

module.exports = router;
