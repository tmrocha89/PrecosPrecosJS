var mongoose = require('mongoose');

var imagemSchema = mongoose.Schema({
    nome : String,
    tipo: String,
    data : String
});

mongoose.model('Imagem', imagemSchema);