const pointOfInterest = require("../models/PointOfInterest");


exports.create=async(req, res)=>{
  try { 
  var data=new pointOfInterest();
   data.name=req.body.name;
   data.type=req.body.type;
   data.country=req.body.country;
   data.region=req.body.region;
   data.lon=Number(req.body.lon);
   data.lat=Number(req.body.lat);
   data.description=req.body.description;
   data.recomendations=0;
   console.log(data);
   await data.save(function(err, doc) {
     if (err) return console.error(err);
     res.redirect('/');
   });
  }
   catch(err) {res.status(400).send("Unable to save")};
 };


 //Api created to find the point of Interest
exports.find=(req, res)=>{
   pointOfInterest.find({region: {'$regex': req.params.region,$options:'i'}}, function (err, result) {
     if (err)
        console.log("Couldn't retrieve data");     
     //console.log(result);
     res.send(result);
  })
};

//rest Api to increase the recommendations by user
 exports.update=async (req, res)=>{
  var id=Number(req.params.Id);
  pointOfInterest.updateOne({ poi_id: id }, { $inc: { recomendations: 1 }}, {new: false}).then((result) => {
        if (!result) {
             console.log("Error");
            return res.status(404).send();
        }
        res.send({"success": 1});
    }).catch((error) => {
     console.log(error);
        res.status(500).send(error);
    })  
  };
