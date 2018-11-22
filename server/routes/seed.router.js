const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

// POST route for user's seeds inventory
router.post('/', async (req, res) => {
    console.log(`in seed.router.js POST for '/'`);
    const client = await pool.connect();

    try {
        const {
            description,
            imageUrl,
            personId
        } = req.body;
        await client.query('BEGIN')
        await client.query(`INSERT INTO item ("description","image_url","person_id")
        VALUES ($1, $2, $3);`, [description, imageUrl, personId]);

        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error post /shelf', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
});

module.exports = router;