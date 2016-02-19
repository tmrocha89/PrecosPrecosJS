var mongoose = require('mongoose');

var precoSchema = mongoose.Schema({

    valor : Number,
    eCampanha : Boolean,
    loja: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'Loja'
    }

});

mongoose.model('Preco', precoSchema);