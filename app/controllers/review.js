const review = require("../models/Review");

exports.findReview=async (req, res)=>{
    try {
    var id=parseInt(req.params.poi_id);
    console.log(id);
    await review.find({poi_id: id}, function (err, result) {
       if (err)
          {console.log("Couldn't retrieve data");     
          console.log(result);
          }
    else if (Object.keys(result).length === 0)
        {  result=[{"Id": 0,
           "poi_id": req.params.poi_id,
            "review": ""      
       }];
           res.render('review', {result: result});
    }
       else
          res.render('review', {result: result});
       //res.send(result);
 
    } )
 }
 catch (err) {res.status(400).send("Unable to retrieve")};
 };
 
 exports.addReview=async(req, res)=>{
    try { 
    console.log(req.body);
    var data=new review();
     data.poi_id=req.body.poi_id;
     data.review=req.body.review;
     //console.log(data);
     await data.save(function(err, doc) {
       if (err) return console.error(err);
       res.redirect('/');
     });
    }
     catch(err) {res.status(400).send("Unable to save")};
   };
 