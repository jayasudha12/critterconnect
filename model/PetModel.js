const mongoose = require('mongoose');
const petschema = new mongoose.Schema({
    petid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    pettype:{
        type:String,
        required:true
    },
    breedtype:{
            type:String,
            required:true
        }
    ,
    gender:{
        type:String
    },
    vaccinated:{
        type:String
    },                  
    age:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    price:{
        type:String,
        required:true
    }

})