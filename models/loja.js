var mongoose = require('mongoose');

var lojaSchema = mongoose.Schema({
    nome : String,
    local : String
});

mongoose.model('Loja', lojaSchema);