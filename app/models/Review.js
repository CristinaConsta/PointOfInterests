const mongoose = require('mongoose');
var autoIncrementId = require('mongoose-sequence')(mongoose);

const Review= new mongoose.Schema({
    Id: Number,
    poi_id:       {type: Number, required: true},
    review:        {type: String, required: true},
});

Review.plugin(autoIncrementId, {id:'seq', inc_field: 'Id'});
module.exports = mongoose.model('Review', Review);