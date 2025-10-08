const express = require("express");
const router = express.Router({ mergeParams: true });
const Trip = require("../models/trips");

const apiKey = process.env.COUNTRY_API_KEY;

const url = `https://countryapi.io/api/all?apikey=${apiKey}`;

router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find({ users: { $in: req.session.user._id } });
    res.render("trips/index.ejs", {
      trips,
      userId: [req.session.user],
    });
  } catch (error) {
    console.error("Error loading trips:", error);
    res.redirect("/");
  }
});

router.get("/new", async (req, res, next) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const destinations = Object.keys(data)
      .map((countryCode) => ({ name: data[countryCode].name }))
      .sort((a, b) => (a.name > b.name ? 1 : -1));
    res.render("trips/new", {
      destinations,
    });
  } catch (error) {
    next(error);
  }
});

// Update page
router.get("/:id/edit", async (req, res) => {
  try {
    const tripId = req.params.id;
    const selectedTrip = await Trip.findOne({
      _id: tripId,
      users: { $in: req.session.user._id },
    });
    console.log(selectedTrip);
    res.render("trips/edit", {
      selectedTrip,
    });
  } catch (error) {
    console.log("Error", error.message);
  }
});

// Show page
router.get("/:id", async (req, res) => {
  try {
    const tripId = req.params.id;
    const selectedTrip = await Trip.findOne({
      _id: tripId,
      users: { $in: req.session.user._id },
    });
    const todos = selectedTrip.todos.id(req.params._id);
    console.log("TODOS LIST", todos);
    const nameUrl = `https://countryapi.io/api/name/${selectedTrip.countries}?apikey=${apiKey}`;
    const response = await fetch(nameUrl);
    const countryDetails = await response.json();
    const countryValues = Object.values(countryDetails);
    console.log("TRIP", selectedTrip);
    res.render("trips/show", {
      selectedTrip,
      countryDetails: countryValues,
      todos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching country data");
  }
});

router.post("/new", async (req, res) => {
  const transformReqBody = (body) => {
    const todos = [];

    for (const key in body) {
      const match = key.match(/^todos(\d+)$/);
      if (match) {
        const index = match[1];
        const todoText = body[`todos${index}`];
        const isComplete = body[`isComplete${index}`] === "on";

        todos.push({ name: todoText, isComplete });
      }
    }

    const { startDate, endDate, passengers, countries } = body;

    return {
      startDate,
      endDate,
      passengers,
      countries,
      todos,
    };
  };

  const requestBody = transformReqBody(req.body);

  try {
    await Trip.create({
      startDate: requestBody.startDate,
      endDate: requestBody.endDate,
      countries: requestBody.countries,
      passengers: requestBody.passengers,
      todos: requestBody.todos,
      users: req.session.user._id,
    });

    res.redirect("/trips");
  } catch (error) {
    console.log("Couldnt add trip", error.message);
  }
});

// PUT route for updating a trip by its ID
router.put("/:id", async (req, res) => {
  
  // Helper function to transform the raw request body into a structured format
  const transformReqBody = (body) => {
    const todos = [];

    // Loop through each key in the body to extract todo items
    for (const key in body) {
      const match = key.match(/^todos(\d+)$/); // Match keys like "todos0", "todos1", etc.
      if (match) {
        const index = match[1];
        const todoText = body[`todos${index}`]; // Get the text of the todo
        const isComplete = body[`isComplete${index}`] === "on"; // Checkbox returns "on" if checked

        todos.push({ name: todoText, isComplete }); // Push each todo item to the list
      }
    }

    // Extract the other non-todo fields from the form
    const { startDate, endDate, passengers, countries } = body;

    // Return the structured object
    return {
      startDate,
      endDate,
      passengers,
      countries,
      todos,
    };
  };

  // Transform the incoming form data
  const requestBody = transformReqBody(req.body);

  try {
    const tripId = req.params.id; // Extract the trip ID from the route parameter

    // Find and update the trip document if the current user is part of it
    const updatedTrip = await Trip.findOneAndUpdate(
      { _id: tripId, users: { $in: req.session.user._id } }, // Ensure user has access
      {
        startDate: requestBody.startDate,
        endDate: requestBody.endDate,
        passengers: requestBody.passengers,
        todos: requestBody.todos,
      },
      { new: true } // Return the updated document
    );

    res.redirect(`/trips/${tripId}`); // Redirect to the updated trip's page
    console.log("Trip updated", updatedTrip); // Log the updated trip for debugging
  } catch (error) {
    console.log("Couldnt update trip", error.message); // Log any error encountered
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tripId = req.params.id;
    const selectedTrip = await Trip.findOne({
      _id: tripId,
      users: { $in: req.session.user._id },
    });
    await selectedTrip.deleteOne();
    console.log("Deleted Trip", selectedTrip);
    res.redirect("/trips");
  } catch (error) {
    console.log("Error", error.message);
  }
});

module.exports = router;


// READ.ME
// go through checklist
