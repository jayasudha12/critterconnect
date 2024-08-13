// server/models/Pet.js
const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  id:{
    type: String,
    required:true
},
userid:{
  type :String,
  required:true
},
  name: { 
    type: String, 
    required: true 
},
  pettype: { 
    type: String, 
    required: true 
}, 
  breedtype: { 
    type: String, 
    required: true 
}, 
  gender: { 
    type: String 
}, 
  vaccinated: { 
    type: String 
}, 
  age: { 
    type: String, 
    required: true 
}, 

  description: { 
    type: String 
},
  price: { 
    type: Number, 
    required: true 
}, 
  image: { 
    type: String,
    required:true

  }, 
  weight: { 
    type: String, 
    required: true 
  }, 
  height: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now } 
});

module.exports = mongoose.model('Pet', PetSchema);
