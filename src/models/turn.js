const { Schema, model } = require('mongoose');

let turnSchema = new Schema({
    campo:{
        type:Number,
        reuired:true
    },
    hora:{
        type:String,
        reuired:true
    },
    idusuario:{
        type:String,
    },
    idmonitor:{
        type:String,
    },
    idprofesor:{
        type:String,
    },
    tiempo:{
        type:Number,
        reuired:true
    }
})

module.exports = model('Turn', turnSchema)