const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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

module.exports = router;
