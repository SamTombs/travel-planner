const express = require('express');
const router = express.Router({ mergeParams: true }); 
const Trip = require('../models/trips');
const axios = require('axios');

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
        res.render('trips/new', {
            countries,
            passengerSlots: [0, 1, 2],
        });
    } catch (error) {
        console.log(error)
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

router.get('/:id', async (req, res) => {
    try {
        const tripId = req.params.id;
        const selectedTrip = await Trip.findOne({
            _id: tripId,
            users: { $in: [req.session.user._id] }
        });
        if (!selectedTrip) {
        return res.status(404).send('Trip not found');
}
        //This code takes the countries from a selected trip, fetches detailed information for each from the REST Countries API using Axios, and stores the resulting country data in an array called countries.

        // Make an array the selectedTrip.countries field
        // If it's already an array, use it as-is; otherwise, wrap it in one
        const tripCountries = Array.isArray(selectedTrip.countries)
            ? selectedTrip.countries
            : [selectedTrip.countries];

            console.log('Selected Trip in an array', tripCountries)
        // For each country in the trip, create a GET request to the REST Countries API
        // `fullText=true` ensures an exact name match (e.g., "United States" won't match just "United")
        const countryDataPromises = tripCountries.map(country =>
            axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fullText=true`)
        );
        console.log('DATA PROMISES', countryDataPromises)
        //Works through the full list of countries and then return the response data.
        //Promise.all loops over and returns a single piece
        // Returns an array of responses
        const responses = await Promise.all(countryDataPromises);
        // Extract the first result from each response (API returns an array per country name)
        const countries = responses.map(r => r.data[0]); 
        res.render('trips/show', {
            selectedTrip,
            countries,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching country data');
    }
});

router.post('/new', async (req, res) => {
    try {
         const emptyPassengers = req.body.passengers || [];
    // Remove passengers that are empty (both fields blank)
        const filterPassengers = emptyPassengers.filter(p =>
        p.name?.trim() && p.passportNumber?.trim()
    );
        const newTrip = new Trip({
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            countries: req.body.countries,
            passengers: filterPassengers,
            users: [req.session.user._id]
        });
        console.log('Created new trip', newTrip),
        await newTrip.save();
        res.redirect('/trips');
    } catch (error) {
        console.log('Couldnt add trip', error.message);
    }
});

router.put('/:id', async (req, res) => {
  try {
    const tripId = req.params.id;
    const filterPassengers = (req.body.passengers || []).filter(p =>
    p.name?.trim() && p.passportNumber?.trim()
    );
    const updatedTrip = await Trip.findOneAndUpdate(
      { _id: tripId, users: req.session.user._id },
      { ...req.body, passengers: filterPassengers },
      { new: true, runValidators: true }
    );
    res.redirect(`/trips/${tripId}`);
    console.log('Trip updated', updatedTrip);
    } catch (error) {
        console.log('Couldnt update trip', error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
    const tripId = req.params.id;
    const selectedTrip = await Trip.findOne({ _id: tripId, users: req.session.user._id})
    await selectedTrip.deleteOne(); 
    console.log('Deleted Trip', selectedTrip)
    res.redirect('/trips');  
    } catch (error) {
        console.log('Error', error.message);
    }
});

module.exports = router;

//Tuesday
// The todo info needs to be added to new.ejs, edit.ejs
// The TODO and Itinerary are going to be embedded in the TripSchema
// Trips editTodo.ejs, Trips edit.ejs 
// put todo in similar to passengers
// create the itinerary page.(seperate page)
// For Itinerary I can put it on the trips controller as /:id/itinerary/edit

//Wednesday, Thursday
// style with bulma

// Friday - Project presentation day
// READ.ME
// stretch goals
// go through checklist  
