const passport=require('passport');

module.exports = (app) => {
    const poi = require("../controllers/pointOfInterest.js");
    const user=require("../controllers/user.js");
    const review=require("../controllers/review.js");
    const express=require('express');
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    // RestAPI for retrieving points of interests by region
    app.get('/find-poi/:region', poi.find);
       
    // Create a new point of interest
    app.post('/create-poi', poi.create);

    // Recommend a poi
    app.get('/recomm/:Id', poi.update);


  // Retrieve all Reviews for a POI
   app.get('/review/:poi_id', review.findReview); 


  //  Add a review to a POI
   app.post('/addreview', review.addReview); 
};