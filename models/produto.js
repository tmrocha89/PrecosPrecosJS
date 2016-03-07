var mongoose = require('mongoose');
var Precos = mongoose.model('Preco');
var Imagens = mongoose.model('Imagem');

var options = {discriminatorKey: 'kind'};

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
    }]
}, options); //{collection : 'produtos', discriminatorKey : 'kind'});

/*
*
*  Middleware: Deletes preco and imagens 
*
*/
produtoSchema.post('remove', function(/* next */){
	if(this.precos){
		for (var p = this.precos.length - 1; p >= 0; p--) {
			Precos.remove({ _id : this.precos[p]}).exec();
		}
	}
console.log(this.imagens);
	if(this.imagens){
		for (var i = this.imagens.length - 1; i >= 0; i--) {
			Imagens.remove({ _id : this.imagens[i]}).exec();
		}
	}

	//return next(); ??????????????????????????????????????????????????????????????????????????
});

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
