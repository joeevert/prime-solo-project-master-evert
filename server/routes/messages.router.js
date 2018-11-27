const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// POST route for adding seeds to user's seed inventory
router.post('/', (req, res) => {
    const newMessage = req.body;
    console.log('message:', newMessage);
    const queryText = `INSERT INTO messages ("line_item", "message", "quantity", "received_by", "sent_by")
        VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [newMessage.line_item, newMessage.message, newMessage.quantity, newMessage.received_by, newMessage.sent_by])
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log(`POST error ${queryText}`, error);
            res.sendStatus(500);
        })
});

// GET Route for user's sent messages
router.get('/',  rejectUnauthenticated, (req, res) => {
    console.log('req.user.id:', req.user.id);
    const queryText = `SELECT messages.*, user_info.username, user_seed_inventory.description, seeds.seed_category FROM messages
        JOIN user_info ON messages.received_by = user_info.id
        JOIN user_seed_inventory ON messages.line_item = user_seed_inventory.id
        JOIN seeds ON user_seed_inventory.seed_id = seeds.id
        WHERE sent_by=$1;`;
    pool.query(queryText, [req.user.id])
        .then((result) => {
            console.log(`Got user's sent messages back from the db`);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`GET error ${queryText}`, error);
            res.sendStatus(500);
        })
});

module.exports = router;
