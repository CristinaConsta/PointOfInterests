const mongoose = require('mongoose');
var autoIncrementId = require('mongoose-sequence')(mongoose);

const review= new mongoose.Schema({
    Id: Number,
    poi_id:       {type: Number, required: true},
    review:        {type: String, required: true},
});

review.plugin(autoIncrementId, {id:'seq', inc_field: 'Id'});
module.exports = mongoose.model('review', review);