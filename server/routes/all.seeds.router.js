const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET Route for all seeds inventory
router.get('/', (req, res) => {
    console.log('req.user.id:', req.user.id);
    const queryText = `SELECT "user_seed_inventory".*, 
    "seeds"."seed_category" AS category,
    "user_info"."username", 
    "user_info"."latitude" AS lat,
    "user_info"."longitude" AS lng
    FROM "user_seed_inventory"
    JOIN "seeds" ON "user_seed_inventory"."seed_id" = "seeds"."id"
    JOIN "user_info" ON "user_seed_inventory"."user_id" = "user_info"."id"
    WHERE "user_id" !=$1;`;
    pool.query(queryText, [req.user.id])
        .then((result) => {
            res.send(result.rows);
            console.log(`Got all user's seeds back from the db`, result.rows);

        })
        .catch((error) => {
            console.log(`GET error ${queryText}`, error);
            res.sendStatus(500);
        })
});

module.exports = router;
