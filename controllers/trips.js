const express = require('express');
const router = express.Router({ mergeParams: true }); 
const Trip = require('../models/trips');
const axios = require('axios');
const Todo = require('../models/todo');

router.get('/', async (req, res) => {
    try {
        const trips = await Trip.find({ users: req.session.user._id });
        res.render('trips/index.ejs', {
            trips,
            userId: req.session.user
        });
    } catch (error) {
        console.error('Error loading trips:', error);
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,cca2');
        const countries = response.data
        .sort((a, b) => a.name.common.localeCompare(b.name.common));
        res.render('trips/new', {countries});
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const tripId = req.params.id;
        const selectedTrip = await Trip.findOne({ _id: tripId, users: req.session.user._id})
        console.log(selectedTrip)
        const todos = await Todo.find({ tripId: tripId });
        res.render('trips/show', {
            selectedTrip,
            todos
        }); 
    } catch (error) {
        console.log('Failed to show page');
    }
    
})

router.get('/:id/edit', async (req, res) => {
    try {
      const tripId = req.params.id;
      const selectedTrip = await Trip.findOne({ _id: tripId, users: req.session.user._id})
      console.log(selectedTrip)
      res.render('trips/edit', {
        trip: selectedTrip
      });

    } catch (error) {
        console.log('Error', error.message)
    }
    
})

router.post('/new', async (req, res) => {
    try {
        const newTrip = new Trip({
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            countries: req.body.countries,
            users: [req.session.user._id]
        });
        console.log(newTrip),
        await newTrip.save();
        res.redirect('/trips');
    } catch (error) {
        console.log('Couldnt add trip', error.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
      const tripId = req.params.id;
      const selectedTrip = await Trip.findOne({ _id: tripId, users: [req.session.user._id]})
      selectedTrip.set(req.body)
      await selectedTrip.save()
      res.redirect(`/trips/${tripId}`);
      console.log('Updated')
    } catch (error) {
        console.log('Couldnt update trip', error.message);
    }
})

module.exports = router;
