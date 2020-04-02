const {Schema,model} = require('mongoose');

let userSchema = new Schema({
    nombre:{
        type: String,
        required: true
    },
    codigo:{
        type: String,
        required: true
    },
    tipoMembresia:{
        type: String,
        required: true,
        enum:['socio','invitado','cortesia', 'canje']
    }
})

module.exports = model('User',userSchema)