const pointOfInterest = require("../models/PointOfInterest");
const rest = require("../public/rest.js");



exports.create=async(req, res)=>{
  try{
  let newpoi=await pointOfInterest.findOne({name: req.body.name});
  if(newpoi){
    res.render("create-poi" , {lon:null, lat:null, errors: {name: {message: "The name is already used"}}})
    return;
  }else {
   newpoi = new pointOfInterest({
   name:req.body.name,
   type:req.body.type,
   country:req.body.country,
   region:req.body.region,
   lon:Number(req.body.lon),
   lat:Number(req.body.lat),
   description:req.body.description,
   recomendations:0,});
   if(!req.body.name){
    res.render("create-poi", {lon:null, lat:null, errors: {name: {message: "Please fill a name"}} })
    return
   }else if(!req.body.type){
    res.render("create-poi", {lon:null, lat:null, errors: {name: {message: "Please fill a type"}} })
    return
   }else if(!req.body.country){
    res.render("create-poi", {lon:null, lat:null, errors: {name: {message: "Please fill a country"}} })
    return
   }else if(!req.body.region){
    res.render("create-poi", {lon:null, lat:null, errors: {name: {message: "Please fill a region"}} })
    return
   }else if(!req.body.description){
    res.render("create-poi", {lon:null, lat:null, errors: {name: {message: "Please fill a description"}} })
    return
   }
   else{
    await newpoi.save(function(err, doc) {
      if (err) return console.error(err);
      res.redirect("/");
    });
   }
   }
   }
    catch(err) {res.status(400).send("Unable to save")};
   };


 //Api endpoint to find the point of Interest by Region

exports.find=(req, res)=>{
   pointOfInterest.find({region: {'$regex': req.params.region,$options:'i'}}, function (err, result) {
     if (err)
        console.log("Couldn't retrieve data");     
     //console.log(result);
     res.send(result);
  })
};

//Api endpoint to increase the recommendations by user
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
