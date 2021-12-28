const Review = require("../models/Review");

exports.findReview=async (req, res)=>{
    try {
    var id=parseInt(req.params.poi_id);
    console.log(id);
    await review.find({poi_id: id}, function (err, reviews) {
       if (err)
          {console.log("Couldn't retrieve data");     
          console.log(reviews);
          }
       else if (Object.keys(reviews).length === 0)
        {  reviews=[{"Id": 0,
           "poi_id": req.params.poi_id,
            "review": ""      
       }];
         console.log("Eroare");
         //   res.render('review', {reviews: reviews});
    }
      //  else
      //     res.render('review', {reviews: reviews});
      //  //res.send(result);

    } )
 }
 catch (err) {res.status(400).send("Unable to retrieve")};
 };

// exports.findReview = async (req, res) => {
//    try {
//       console.log(req.params.poi_id);
//       const Review = await Review.findOne({ poi_id: req.params.poi_id }, function (err, Reviews) {
//          if (Review) {
//             Reviews = [{
//                "Id": 0,
//                "poi_id": req.params.poi_id,
//                "review": ""
//             }];
//             res.render('review', { Reviews: Reviews });
//          } else
//             res.redirect("/");
//       })
//    }
//    catch (err) { res.status(400).send("Unable to retrieve") };
// };


exports.addReview = async (req, res) => {
   try {
      console.log(req.body);
      var data = new Review();
      data.poi_id = req.body.poi_id;
      data.review = req.body.review;
      //console.log(data);
      await data.save(function (err, doc) {
         if (err) return console.error(err);
         res.redirect('/');
      });
   }
   catch (err) { res.status(400).send("Unable to save") };
};
