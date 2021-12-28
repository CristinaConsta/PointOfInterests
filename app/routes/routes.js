const passport=require('passport');

module.exports = (app) => {
    const poi = require("../controllers/pointOfInterest.js");
    const user=require("../controllers/user.js");
    const review=require("../controllers/review.js");
    const express=require('express');
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    // RestAPI for retrieving points of interests by region
    app.get('/create-poi/:region', poi.find);
       
    // Create a new Note
    app.post('/create-poi', poi.create);

    // Recommend a Note with noteId
    app.get('/recomm/:Id', poi.update);


  // Retrieve all Reviews
   app.get('/review/:poi_id', review.findReview); 

  //  Add review
   app.post('/addreview', review.addReview); 
};