const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.render('index.ejs', { users })
    } catch (err) {
        console.log('Error getting users')
        res.redirect('/');
    }
})

router.get('/show', async (req, res) => {
    try {
    const user = await User.findById(req.params.userId);
    res.render('trips/show.ejs', { user });
    } catch (err) {
        console.log('Error loading user profile')
        res.redirect('/trips');
    }
})

module.exports = router;
