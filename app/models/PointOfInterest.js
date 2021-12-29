const mongoose = require("mongoose");

var autoIncrementId = require('mongoose-sequence')(mongoose);

const poi = new mongoose.Schema({
      poi_id:       {type:Number, unique: true},
      name:         {type: String, required: true},
      type:         {type: String, required: true},
      country:      {type: String, required: true},
      region:       {type: String, required: true},
      lat:          {type: Number, required: true},
      lon:          {type: Number, required: true},
      description:  {type: String, required: true},
      recomendations: {type:Number, required: true, default: 0}
  });
  
poi.plugin(autoIncrementId, {id:'order_seq', inc_field: 'poi_id'});
module.exports = mongoose.model('pointsofinterest', poi);