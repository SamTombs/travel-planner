Project 2 - Travel Planner CRUD App

<img width="800" alt="Screenshot 2025-07-07 at 08 50 17" src="https://github.com/user-attachments/assets/19bcedf8-6d3a-406b-8763-576788f74e0f" />

# TravelMate

This CRUD application is a simple yet powerful tool for organizing your life. Whether you're planning a trip, managing a to-do list, or keeping track of places you want to visit, this app helps you create, view, update, and delete entries easily. With a clean EJS-powered interface and a MongoDB backend, you can store and manage tasks, destinations, and psssenger information — all in one place.

View Page https://github.com/SamTombs/travel-planner      (Deployed link removed due to 3rd Party API issues)

Trello Board (https://trello.com/b/UceKyFh1/project-2-crud-app)

## Inspiration for the app

I travel a lot and was constantly juggling random notes, to-do lists, and bits of info about people I’m traveling with or places I want to go. I wanted something simple where I could keep track of all that in one place — without relying on five different apps. This little CRUD app lets me add passengers, save locations, manage travel tasks, and update things as I go. Nothing fancy — just a straightforward way to stay organized while I’m on the move.

## Wire Frames

<img width="300" alt="concept home page" src="https://github.com/user-attachments/assets/ab90b2bd-0c59-4959-bdd1-7416d25247da"/> <img width="300" alt="concept trip page" src="https://github.com/user-attachments/assets/0ed8c688-60d4-40f0-bc8e-4ea3118c2280" /> <img width="300" alt="concept new page" src="https://github.com/user-attachments/assets/03720e42-df2b-455d-a33f-6da8614d9d1b"/><img width="300" alt="partial_NavBar_(3)" src="https://github.com/user-attachments/assets/d8ecce2d-042f-4127-9ea9-0a1c8f40b1c7" /> <img width="300" alt="partial_NavBar_(2)" src="https://github.com/user-attachments/assets/3abee095-fe10-4abd-8b67-78616e75eae0" />



I wanted to keep the concept simple from the start — just a clean, easy-to-use app where I could add, edit, and manage information without any clutter. Nothing complicated, just something that does what I need it to do.

## Explorer

<img width="150" height="500" alt="partial_NavBar_(5)" src="https://github.com/user-attachments/assets/94139e5d-783a-4d56-9c58-98113b2efb8e" />
<img width="180" height="700" alt="Travel Planner" src="https://github.com/user-attachments/assets/8029d7a8-7559-4cda-8c10-f084789f68ca" />



## Features

- Register and Sign in to your own account
- View your list of trips
- Create a trip, view a list of destinations using countryApi.io
- View your trip including some information pertaining to the chosen country
- Edit the passengers details, dates and todo list.
- Delete your trip

## Technologies Used

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40" style="vertical-align:middle;"/> 
  Node.js
</p>

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="40" style="vertical-align:middle;"/> 
  Express
</p>

<p>
<img src="https://github.com/user-attachments/assets/38f03b82-87ea-4393-bada-514109ed86b8" width="40" alt="EJS" 

  EJS
</p>

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="40" style="vertical-align:middle;"/> 
  MongoDB
</p>

<p>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongoose/mongoose-original.svg" width="40" style="vertical-align:middle;"/> 
  Mongoose
</p>

## Third Party Api

To enhance the functionality of the app, I integrated a third-party API from countryapi.IO that provides country data. This API allows me to fetch details like country names, codes, and flags dynamically, which is especially useful for auto-filling important information when viewing the trip. I used the native fetch function to make the API call and processed the response using Object.keys to extract and display the relevant information.

Sadly since launching the project the third party API has had multiple certification erros. Leading to my api being viewed in GitHub but not being able to fetch the country data from the API.

<img width="500" alt="countryAPI" src="https://github.com/user-attachments/assets/0582c6fd-097f-490f-a0fb-ba8d804bd433"/>

## Installation

Basic Installation
   ```zsh
   git clone https://github.com/SamTombs/travel-planner.git
   cd travel-planner
   ```
   ```zsh
   npm install
   ```

   ```zsh
   code .
   ```

   ```zsh
   touch .env
   ```

   ```zsh
   touch .gitignore
   ```
   
   ```zsh
   nodemon
   ```

## Future Enhancements

- There is a myriad of further enhancements I would like to make.
- UX and UI: I want it to be easier to update and create todos.
- CSS: Introduce new font styles, button improvements and mobile nav-burger responsiveness


## Stretch Goals

- [ ] Create an itinerary page which hold a day to day planner for the trip.
- [ ] Countdown Clock on the View Trips page.
- [ ] TODO UX for updating todo list.
- [ ] Current weather forecast for the selected destination.
- [ ] Reccommendation page, such as a packing list, things to do, etc.
