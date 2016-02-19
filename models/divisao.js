var mongoose = require('mongoose');

var divisaoSchema = mongoose.Schema({

    nome : String
});

mongoose.model('Divisao', divisaoSchema);