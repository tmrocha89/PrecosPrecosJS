var mongoose = require('mongoose');

var options = {discriminatorKey: 'kind'};

var produtoSchema = mongoose.Schema({

    nome : String,
    obs : String,
    divisao: {
    	type : mongoose.Schema.Types.ObjectId,
    	ref: 'Divisao'
    },
    marca : {
    	type : mongoose.Schema.Types.ObjectId,
    	ref: 'Marca'
    },
    precos : [{
    	type : mongoose.Schema.Types.ObjectId,
    	ref: 'Preco'
    }],
    imagens: [{
    	type : mongoose.Schema.Types.ObjectId,
    	ref: 'Imagem'
    }]
}, options); //{collection : 'produtos', discriminatorKey : 'kind'});

var Produto = mongoose.model('Produto', produtoSchema);

var aspiradorSchema = mongoose.Schema({
	decibeis : Number,
	potencia : Number,
	temSaco : Boolean,
	classEnergetica : String
}, options);

Produto.discriminator('Aspirador', aspiradorSchema);

var camaSchema = mongoose.Schema({
	comprimento : Number,
	largura: Number,
	altura: Number
}, options);

Produto.discriminator('Cama', camaSchema);

var colchaoSchema = mongoose.Schema({
	comprimento : Number,
	largura: Number,
	altura: Number
}, options);

Produto.discriminator('Colchao', colchaoSchema);

var figorificoSchema = mongoose.Schema({
	capCongelador : Number,
	capFigorifico : Number,
	classEnergetica : String
}, options);

Produto.discriminator('Figorifico', figorificoSchema);

var maqLavarRoupaSchema = mongoose.Schema({
	capacidade : Number,
	temLavagemManual : Boolean,
	classEnergetica : String
}, options);

Produto.discriminator('MaqLavarRoupa', maqLavarRoupaSchema);
