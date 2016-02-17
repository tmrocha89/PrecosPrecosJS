var mongoose = require('mongoose');

var marcaSchema = mongoose.Schema({

    nome : String
});

mongoose.model('Marca', marcaSchema);