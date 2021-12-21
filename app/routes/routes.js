const passport=require('passport');

module.exports = (app) => {
    const poi = require("../controllers/pointOfInterest.js");
    const user=require("../controllers/user.js");
    const express=require('express');
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    // Retrieve a single Note with noteId
    app.get('/create-poi/:region', poi.find);
       
    // Create a new Note
    app.post('/create-poi', poi.create);

    // Update a Note with noteId
    // app.get('/recom/:Id', pois.update);


  // Retrieve all Reviews
//    app.get('/review/:poi_id', reviews.findReview); 

   // Retrieve all Reviews
//    app.post('/addreview', reviews.addReview); 
};