const express = require('express');
const router = express.Router({ mergeParams: true }); 
const axios = require('axios');
const Trip = require('../models/trips');

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
        // For each country in the trip, create a GET request to the REST Countries API
        // `fullText=true` ensures an exact name match (e.g., "United States" won't match just "United")
        const countryDataPromises = tripCountries.map(country =>
            axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fullText=true`)
        );
        //Works through the full list of countries and then return the response data.
        //Promise.all loops over and returns a single piece
        // Returns an array of responses
        const responses = await Promise.all(countryDataPromises);
        // Extract the first result from each response (API returns an array per country name)
        const countries = responses.map(r => r.data[0]); 
        res.render('destinations/index', { countries, selectedTrip });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching country data');
    }
});

module.exports = router;
