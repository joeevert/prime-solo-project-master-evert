const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET Route for all seeds inventory
router.get('/', (req, res) => {
    console.log('req.user.id:', req.user.id);
    const queryText = `SELECT user_info.*,
    array_to_JSON(array_agg(user_seed_inventory.id)) AS item_id, 
    array_to_JSON(array_agg(user_seed_inventory.description)) AS description, 
    array_to_JSON(array_agg(user_seed_inventory.quantity)) AS quantity,
    array_to_JSON(array_agg(user_seed_inventory.seed_id)) AS seed_id,
    array_to_JSON(array_agg(seeds.seed_category)) AS category
    FROM user_info
    JOIN user_seed_inventory ON user_info.id = user_seed_inventory.user_id
    JOIN seeds ON user_seed_inventory.seed_id = seeds.id
    WHERE user_info.id != $1
    GROUP BY user_info.id;`;
    pool.query(queryText, [req.user.id])
        .then((result) => {
            res.send(result.rows);
            // console.log(`Got all user's seeds back from the db`, result.rows);
            console.log(`Got all user's seeds back from the db`);
        })
        .catch((error) => {
            console.log(`GET error ${queryText}`, error);
            res.sendStatus(500);
        })
});

module.exports = router;
