const express = require('express');
const router = express.Router({ mergeParams: true }); 
const Trip = require('../models/trips');
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const trips = await Trip.findById(req.params.tripId);
        
    
    
    } catch (error) {
        
    }
})
