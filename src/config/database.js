const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/turnos',{
    useUnifiedTopology:true,
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify: false
})
.then(db=>console.log('connected database'))
.catch(err => console.log(err))