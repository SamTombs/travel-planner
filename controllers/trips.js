const express = require('express');
const router = express.Router({ mergeParams: true }); 
const Trip = require('../models/trips');

const url = 'https://countryapi.io/api/all?apikey=4lThQv6dCro8bAsbgAB6Eekb85e5GHnfsjv9uj2w';

const apiKey = process.env.API_KEY;

router.get('/', async (req, res) => {
    try {
        const trips = await Trip.find({ users: { $in: req.session.user._id} });
        res.render('trips/index.ejs', {
            trips,
            userId: [req.session.user],
        });
    } catch (error) {
        console.error('Error loading trips:', error);
        res.redirect('/');
    }
});

router.get('/new', async (req, res, next) => {

    console.log('URL', url)
    try {
        const response = await fetch(url)
        const data = await response.json()
        const destinations = Object.keys(data).map(countryCode => ({name: data[countryCode].name})).sort((a, b) => a.name > b.name? 1 : -1)
        res.render('trips/new', {
            destinations,
        }
        )
    } catch (error) {
        next(error)
    }
})

// Update page
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

// Show page
router.get('/:id', async (req, res) => {

    
    try {
        const tripId = req.params.id;
        const selectedTrip = await Trip.findOne({
            _id: tripId,
            users: [req.session.user._id], 
        });
        const nameUrl = `https://countryapi.io/api/name/${selectedTrip.countries}?apikey=${apiKey}`
        const response = await fetch(nameUrl)
        const countryDetails = await response.json()
       
        console.log('COUNTRY DETAILS', countryDetails)
        if (!selectedTrip) {
        return res.status(404).send('Trip not found');
}
        const countryValues = Object.values(countryDetails);
        res.render('trips/show', { 
            selectedTrip,
            countryDetails: countryValues,
         });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching country data');
    }
});

router.post('/new', async (req, res) => {
    try {
        const newTrip = new Trip({
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            countries: req.body.countries,
            passengers: req.body.passengers,
            users: req.session.user._id
        });
        await newTrip.save();
        res.redirect('/trips');
    } catch (error) {
        console.log('Couldnt add trip', error.message);
    }
});

router.put('/:id', async (req, res) => {
  try {
    // Passengers to be edited here
    const tripId = req.params.id;
    const updatedTrip = await Trip.findOneAndUpdate(
      { _id: tripId, users: req.session.user._id },
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


//Back to consuming and API
// Wednesday
// The todo info needs to be added to new.ejs, edit.ejs
// The TODO and Itinerary are going to be embedded in the TripSchema
// Trips editTodo.ejs, Trips edit.ejs 
// put todo in similar to passengers
// create the itinerary page.(seperate page)
// For Itinerary I can put it on the trips controller as /:id/itinerary/edit

//Thursday
// style with bulma

// Friday - Project presentation day
// READ.ME
// stretch goals
// go through checklist  
