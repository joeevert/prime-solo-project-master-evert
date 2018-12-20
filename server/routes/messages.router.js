const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// POST route for adding seeds to user's seed inventory
router.post('/', rejectUnauthenticated, (req, res) => {
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

// GET route for user's messages
router.get('/', rejectUnauthenticated, (req, res) => {
    // console.log(req.params);
    console.log('req.user.id:', req.user.id);
    const messagesSentQuery = `SELECT messages.*, user_info.username, user_seed_inventory.description, seeds.seed_category FROM messages
        JOIN user_info ON messages.received_by = user_info.id
        JOIN user_seed_inventory ON messages.line_item = user_seed_inventory.id
        JOIN seeds ON user_seed_inventory.seed_id = seeds.id
        WHERE sent_by=$1
        ORDER BY messages.status DESC;`;
    const messagesReceivedQuery = `SELECT messages.*, user_info.username, user_seed_inventory.description, seeds.seed_category FROM messages
        JOIN user_info ON messages.sent_by = user_info.id
        JOIN user_seed_inventory ON messages.line_item = user_seed_inventory.id
        JOIN seeds ON user_seed_inventory.seed_id = seeds.id
        WHERE received_by=$1
        ORDER BY messages.status DESC;`;
    pool.query(messagesSentQuery, [req.user.id])
        .then( rows => {
            sent = rows.rows
    pool.query(messagesReceivedQuery, [req.user.id])
        .then( rows => {
            received = rows.rows
            result = {sent: sent, received: received}
            res.send(result);
    })})
    .catch((error) => {
    console.log('GET error from the server', error);
    res.sendStatus(500);
    })
});

// PUT route to confirm seed request
router.put('/:id', rejectUnauthenticated, (req, res) => {
    const itemId = req.params.id;
    console.log('itemId', itemId);
    const sqlText = `UPDATE messages SET status = NOT status WHERE id=$1;`;
    pool.query(sqlText, [itemId])
        .then((result) => {
            console.log('Confirmed request', sqlText);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`PUT error ${sqlText}`, error);
            res.sendStatus(500);
        })
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const reqId = req.params.id;
    console.log('DELETE request for request id', reqId);
    const sqlText = `DELETE FROM messages WHERE id=$1;`;
    pool.query(sqlText, [reqId])
        .then((result) => {
            console.log('request canceled');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error in deleting ${sqlText}`, error);
            res.sendStatus(500);
        })
});

module.exports = router;
