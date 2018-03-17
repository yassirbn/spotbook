var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpotSchema = new Schema({
  
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    required:false
  }/*,
  photo: {
    type: any,
    required:false
  }*/
});

module.exports = mongoose.model('Spot', SpotSchema);