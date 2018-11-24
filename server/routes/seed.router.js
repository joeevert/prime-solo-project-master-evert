const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET Route for user's seeds inventory
router.get('/',  rejectUnauthenticated, (req, res) => {
    console.log('req.user.id:', req.user.id);
    const queryText = `SELECT "user_seed_inventory".*, "seeds"."seed_category" AS category FROM "user_seed_inventory"
    JOIN "seeds" ON "user_seed_inventory"."seed_id" = "seeds"."id"
    WHERE "user_id"=$1;`;
    pool.query(queryText, [req.user.id])
        .then((result) => {
            console.log(`Got user's seeds back from the db`);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`GET error ${queryText}`, error);
            res.sendStatus(500);
        })
});

// POST route for adding seeds to user's seed inventory
router.post('/', (req, res) => {
    const seed = req.body;
    console.log('seed:', seed);
    const queryText = `INSERT INTO user_seed_inventory ("description", "quantity", "seed_id", "user_id")
        VALUES ($1, $2, $3, $4);`;
    pool.query(queryText, [seed.description, seed.quantity, seed.seed_id, seed.user_id])
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log(`POST error ${queryText}`, error);
            res.sendStatus(500);
        })
});


// POST route for adding seeds to user's seed inventory
// router.post('/', async (req, res) => {
//     console.log(`in seed.router.js POST for '/'`);
//     const client = await pool.connect();
//     const queryText = `INSERT INTO user_seed_inventory ("description", "quantity", "seed_id", "user_id")
// 	VALUES ($1, $2, $3, $4);`;
//     try {
//         const {
//             seed_description,
//             quantity,
//             seed_id,
//             user_id
//         } = req.body;
//         await client.query('BEGIN')
//         await client.query(queryText, [description, quantity, seed_id, user_id]);

//         await client.query('COMMIT')
//         res.sendStatus(201);
//     } catch (error) {
//         await client.query('ROLLBACK')
//         console.log('Error post /shelf', error);
//         res.sendStatus(500);
//     } finally {
//         client.release()
//     }
// });

module.exports = router;