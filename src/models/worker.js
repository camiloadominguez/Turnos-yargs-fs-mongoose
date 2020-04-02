const {Schema,model} = require('mongoose');

let workerSchema = new Schema({
    nombre:{
        type:String,
        required:true
    },
    rol:{
        type:String,
        required:true,
        enum:["profesor","monitor"]
    },
    codigo:{
        type:String,
        required:true,
        unique:true
    }
})

module.exports = model('Worker',workerSchema)