var mongoose = require('mongoose');
var Precos = mongoose.model('Preco');
var Imagens = mongoose.model('Imagem');

var options = {discriminatorKey: 'kind'};


var removeChilds = function(/* next */){
	if(this.precos){
		for (var p = this.precos.length - 1; p >= 0; p--) {
			Precos.remove({ _id : this.precos[p]}).exec();
		}
	}

	if(this.imagens){
		for (var i = this.imagens.length - 1; i >= 0; i--) {
			Imagens.remove({ _id : this.imagens[i]}).exec();
		}
	}

	//return next(); ??????????????????????????????????????????????????????????????????????????
};

var produtoSchema = mongoose.Schema({

    nome : String,
    obs : String,
    divisao: {
    	type : mongoose.Schema.Types.ObjectId,
    	ref: 'Divisao'
    },
    marca : String,
    precos : [{
    	type : mongoose.Schema.Types.ObjectId,
    	ref: 'Preco'
    }],
    imagens: [{
    	type : mongoose.Schema.Types.ObjectId,
    	ref: 'Imagem'
    }],
    adquirido: Boolean,
    precoAdquirido: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'Preco'
    }
}, options); //{collection : 'produtos', discriminatorKey : 'kind'});

/*
*
*  Middleware: Deletes preco and imagens 
*
*/
produtoSchema.post('remove', removeChilds);

var Produto = mongoose.model('Produto', produtoSchema);


var aspiradorSchema = mongoose.Schema({
	decibeis : Number,
	potencia : Number,
	temSaco : Boolean,
	classEnergetica : String
}, options);

aspiradorSchema.post('remove', removeChilds);

Produto.discriminator('Aspirador', aspiradorSchema);

var camaSchema = mongoose.Schema({
	comprimento : Number,
	largura: Number,
	altura: Number
}, options);

camaSchema.post('remove', removeChilds);

Produto.discriminator('Cama', camaSchema);

var colchaoSchema = mongoose.Schema({
	comprimento : Number,
	largura: Number,
	altura: Number
}, options);

colchaoSchema.post('remove', removeChilds);

Produto.discriminator('Colchao', colchaoSchema);

var figorificoSchema = mongoose.Schema({
	capCongelador : Number,
	capFigorifico : Number,
	classEnergetica : String
}, options);

figorificoSchema.post('remove', removeChilds);

Produto.discriminator('Figorifico', figorificoSchema);

var maqLavarRoupaSchema = mongoose.Schema({
	capacidade : Number,
	temLavagemManual : Boolean,
	classEnergetica : String
}, options);

maqLavarRoupaSchema.post('remove', removeChilds);

Produto.discriminator('MaqLavarRoupa', maqLavarRoupaSchema);
