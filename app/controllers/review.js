const Review = require("../models/Review");
const poi = require("../models/PointOfInterest");
const { promiseImpl } = require("ejs");

exports.findReview = async (req, res) => {
   try {
      var id = parseInt(req.params.poi_id);
      const reviews= await Review.find({ poi_id: req.params.poi_id });
      const thename = await poi.find({poi_id:id}).select({"name":1, "_id":0});
      res.render("review", { reviews: reviews, id : id, name:thename});
   } catch (err) { res.status(400).send("Unable to retrieve") };
};


exports.addReview = async (req, res) => {
   try {
      console.log(req.body);
      var data = new Review();
      data.poi_id = req.body.poi_id;
      data.review = req.body.review;
      console.log(data);
      await data.save(function (err, doc) {
         if (err) return console.error(err);
         res.redirect('/');
      });
   }
   catch (err) { res.status(400).send("Unable to save") };
};
