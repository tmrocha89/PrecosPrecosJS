var app = angular.module('PrecosPrecos', ['ngRoute', 'ngResource']).run(function($rootScope){
//colocar aqui as alteracoes na rootScope
//uso para mostrar/esconder elementos
/*
   NAO É ACONSELHADO USAR ISTO!! (VARIAVEIS GLOBAIS)
*/
	$rootScope.authenticated = false;
	$rootScope.currentUser = '';

	/*  local logout */
	$rootScope.signout = function(){
		$http.get('/auth/signout');

		$rootScope.authenticated = false;
		$rootScope.currentUser = '';
	};

});

var DIVISAO_INDEX = "";
var DIVISAO_CREATE = "";
var DIVISAO_EDIT = "";

var LOJA_INDEX = "";
var LOJA_CREATE = "";
var LOJA_EDIT = "";

var PRODUTO_INDEX = "";
var PRODUTO_CREATE = "";
var PRODUTO_EDIT = "";
var PRODUTO_DETAIL = "";


var _INDEX = "";
var _CREATE = "";
var _EDIT = "";
var _DETAIL = "";


app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'main.html',
			controller: 'appController'
		})

		.when('/divisoes',{
			templateUrl : 'Divisao/divisoes.html',
			controller : 'divisaoController'
		})

		.when('/divisoes/create',{
			templateUrl : 'Divisao/createDivisao.html',
			controller : 'divisaoController'
		})

		.when('/divisoes/edit/:id',{
			templateUrl : 'Divisao/editarDivisao.html',
			controller : 'divisaoController'
		})

		.when('/lojas',{
			templateUrl : 'Loja/lojas.html',
			controller : 'lojaController'
		})

		.when('/lojas/create',{
			templateUrl : 'Loja/createLoja.html',
			controller : 'lojaController'
		})

		.when('/lojas/edit/:id',{
			templateUrl : 'Loja/editarLoja.html',
			controller : 'lojaController'
		})

		.when('/comprados',{
			templateUrl : 'divisao.html',
			controller : 'appController'
		})

		.when('/produtos',{
			templateUrl : 'Produto/produtos.html',
			controller : 'produtoController'
		})

		.when('/produtos/create',{
			templateUrl : 'Produto/createProduto.html',
			controller : 'produtoController'
		})

		.when('/produtos/edit/:id',{
			templateUrl : 'Produto/editarProduto.html',
			controller : 'produtoController'
		})

		.when('/precos/:idProduto',{
			templateUrl : 'Preco/precos.html',
			controller : 'precoController'
		})

		.when('/precos/:idProduto/create',{
			templateUrl : 'Preco/createPreco.html',
			controller : 'precoController'
		})

		.when('/precos/:idProduto/edit/:id',{
			templateUrl : 'Preco/editarPreco.html',
			controller : 'precoController'
		})

		.when('/imagens/:idProduto',{
				templateUrl : 'Imagem/imagens.html',	//Falta
			controller : 'imagemController'
		})

		.when('/camas',{
			templateUrl : 'Cama/camas.html',	//Falta
			controller : 'camaController'
		})

		.when('/camas/create',{
			templateUrl : 'Cama/createCama.html',	//Falta
			controller : 'camaController'
		})

		.when('/camas/edit/:id',{
			templateUrl : 'Cama/editarCama.html',	//Falta
			controller : 'camaController'
		})

		.when('/aspiradores',{
			templateUrl : 'Aspirador/aspiradores.html',	//Falta
			controller : 'aspiradorController'
		})

		.when('/aspiradores/create',{
			templateUrl : 'Aspirador/createAspirador.html',	//Falta
			controller : 'aspiradorController'
		})

		.when('/aspiradores/edit/:id',{
			templateUrl : 'Aspirador/editarAspirador.html',	//Falta
			controller : 'aspiradorController'
		})

		.when('/colchoes',{
			templateUrl : 'Colchao/colchoes.html',	//Falta
			controller : 'colchaoController'
		})

		.when('/colchoes/create',{
			templateUrl : 'Colchao/createColchao.html',	//Falta
			controller : 'colchaoController'
		})

		.when('/colchoes/edit/:id',{
			templateUrl : 'Colchao/editarColchao.html',	//Falta
			controller : 'colchaoController'
		})

		.when('/figorificos',{
			templateUrl : 'Figorifico/figorificos.html',	//Falta
			controller : 'figorificoController'
		})

		.when('/figorificos/create',{
			templateUrl : 'Figorifico/createFigorifico.html',
			controller : 'figorificoController'
		})

		.when('/figorificos/edit/:id',{
			templateUrl : 'Figorifico/editarFigorifico.html',
			controller : 'figorificoController'
		})

		.when('/maqslavarroupa',{
			templateUrl : 'MaqLavarRoupa/maqsLavarRoupa.html',
			controller : 'maqLavarRoupaController'
		})

		.when('/maqslavarroupa/create',{
			templateUrl : 'MaqLavarRoupa/createMaqLavarRoupa.html',
			controller : 'maqLavarRoupaController'
		})

		.when('/maqslavarroupa/edit/:id',{
			templateUrl : 'MaqLavarRoupa/editarMaqLavarRoupa.html',
			controller : 'maqLavarRoupaController'
		})

		.when('/login',{
			templateUrl : 'login.html',
			controller : 'authController'
		})

		.when('/signup',{
			templateUrl : 'register.html',
			controller : 'authController'
		});
});



/* Service */
app.factory('divisaoService', function($resource){ //http
	/*var factory = {};factory.getAll = function(){return $http.get('/api/divisoes');}return factory;*/
	var divisao = {nome: ''};
	return {
			resource: $resource('/api/divisoes/:id', {id : '@_id'}, {
				'update': { method:'PUT' }
			}),
	        divisao: divisao}
	        ;
});

/* Service */
app.factory('lojaService', function($resource){ //http
	/*var factory = {};factory.getAll = function(){return $http.get('/api/divisoes');}return factory;*/
	var loja = {nome: '', local: ''};
	return {
			resource: $resource('/api/lojas/:id', {id : '@_id'}, {
				'update': { method:'PUT' }
			}),
	        loja: loja
	    	};
});

/* Service */
app.factory('produtoService', function($resource){ //http
	/*var factory = {};factory.getAll = function(){return $http.get('/api/divisoes');}return factory;*/
	var produto = { nome: '', obs: '', divisao: {nome:''}, marca: '', precos: [], imagens:[] };
	return {
			resource: $resource('/api/produtos/:id', {id : '@_id'}, {
				'update': { method:'PUT' }
			}),
	        produto: produto
	    	};
});

/* Service */
app.factory('precoService', function($resource){ //http
	/*var factory = {};factory.getAll = function(){return $http.get('/api/divisoes');}return factory;*/
	var preco = { valor: 0,  eCampanha: false, loja: {nome:'', local:''} };
	return {
			resource: $resource('/api/precos/:id', {id : '@_id'}, {
				'update': { method:'PUT' }
			}),
	        preco: preco
	    	};
});

/* Service */
app.factory('imagemService', function($resource){ //http
	/*var factory = {};factory.getAll = function(){return $http.get('/api/divisoes');}return factory;*/
	return {
			resource: $resource('/api/imagens/:id', {id : '@_id'}, {
				'update': { method:'PUT' }})
	    	};
});

/* Service */
app.factory('camaService', function($resource){ //http
	/*var factory = {};factory.getAll = function(){return $http.get('/api/divisoes');}return factory;*/
	var cama = { nome: '', obs: '', divisao: {nome:''}, marca: '', precos: [], imagens:[], altura:0, comprimento:0, largura:0 };
	return {
			resource: $resource('/api/camas/:id', {id : '@_id'}, {
				'update': { method:'PUT' }
			}),
	        produto: cama
	    	};
});

/* Service */
app.factory('aspiradorService', function($resource){ //http
	/*var factory = {};factory.getAll = function(){return $http.get('/api/divisoes');}return factory;*/
	var aspirador = { nome: '', obs: '', divisao: {nome:''}, marca: '', precos: [], imagens:[], potencia:0, decibeis:0, temSaco:false };
	return {
			resource: $resource('/api/aspiradores/:id', {id : '@_id'}, {
				'update': { method:'PUT' }
			}),
	        produto: aspirador
	    	};
});

/* Service */
app.factory('colchaoService', function($resource){ //http
	/*var factory = {};factory.getAll = function(){return $http.get('/api/divisoes');}return factory;*/
	var colchao = { nome: '', obs: '', divisao: {nome:''}, marca: '', precos: [], imagens:[], altura:0, comprimento:0, largura:0 };
	return {
			resource: $resource('/api/colchoes/:id', {id : '@_id'}, {
				'update': { method:'PUT' }
			}),
	        produto: colchao
	    	};
});

/* Service */
app.factory('figorificoService', function($resource){ //http
	/*var factory = {};factory.getAll = function(){return $http.get('/api/divisoes');}return factory;*/
	var figorifico = { nome: '', obs: '', divisao: {nome:''}, marca: '', precos: [], imagens:[], capCongelador:0, capFigorifico:0, classEnergetica:0 };
	return {
			resource: $resource('/api/figorificos/:id', {id : '@_id'}, {
				'update': { method:'PUT' }
			}),
	        produto: figorifico
	    	};
});

/* Service */
app.factory('maqLavarRoupaService', function($resource){ //http
	/*var factory = {};factory.getAll = function(){return $http.get('/api/divisoes');}return factory;*/
	var maqLavarRoupa = { nome: '', obs: '', divisao: {nome:''}, marca: '', precos: [], imagens:[], capacidade:0, temLavagemManual:0, classEnergetica:0 };
	return {
			resource: $resource('/api/MaqsLavarRoupa/:id', {id : '@_id'}, {
				'update': { method:'PUT' }
			}),
	        produto: maqLavarRoupa
	    	};
});

app.controller('appController', function($scope){ });


/*
	Divisoes
*/
app.controller('divisaoController', function($scope, $location, divisaoService){
	
	if($location.$$path == "/produtos/create")
		divisaoService.divisao = {nome: ''};

	$scope.divisoes = divisaoService.resource.query();
	$scope.divisao = divisaoService.divisao;


	$scope.post = function(){
		console.log("a fazer um post de divisao " + $scope.divisao.nome);
		divisaoService.resource.save($scope.divisao, function(){ //alterei novaDivisao
			$location.path('/divisoes');
		});
	};

	$scope.delete = function(divObj){
		divisaoService.resource.delete({id: divObj.id},function(divisao){
			$location.path('/divisoes');
		});
	};

	//este metodo é chamado pelo 'index'
	$scope.edit = function(divObj){
		console.log('editing... /divisoes/edit/'+divObj.id);
		divisaoService.resource.get({id: divObj.id},function(divisao){
			divisaoService.divisao = divisao;
			console.log("Divisao: "+divisao.nome+ "__"+divisao._id);
			$location.path('/divisoes/edit/'+divisao._id);
		});
	};

	$scope.update = function(){
		console.log("teste update");
		console.log("updating...."+$scope.divisao._id);
		divisaoService.resource.update({id:$scope.divisao._id},$scope.divisao,
			function(){
				divisaoService.divisao = {nome: ''};
				$location.path('/divisoes');
			});
	};
});


/*
	Lojas
*/
app.controller('lojaController', function($scope, $location, lojaService){
	
	if($location.$$path == "/lojas/create")
		lojaService.loja = {nome: '', local: ''};

	$scope.lojas = lojaService.resource.query();
	$scope.loja = lojaService.loja;


	$scope.post = function(){
		console.log("a fazer um post de loja " + $scope.loja.nome);
		lojaService.resource.save($scope.loja, function(){ //alterei novaDivisao
			$location.path('/lojas');
		});
	};

	$scope.delete = function(lojaObj){
		lojaService.resource.delete({id: lojaObj.id},function(loja){
			$location.path('/lojas');
		});
	};

	//este metodo é chamado pelo 'index'
	$scope.edit = function(lojaObj){
		console.log('editing... /lojas/edit/'+lojaObj.id);
		lojaService.resource.get({id: lojaObj.id},function(loja){
			lojaService.loja = loja;
			console.log("Divisao: "+loja.nome+ "__"+loja._id);
			$location.path('/lojas/edit/'+loja._id);
		});
	};

	$scope.update = function(){
		console.log("teste update");
		console.log("updating...."+$scope.loja._id);
		lojaService.resource.update({id:$scope.loja._id},$scope.loja,
			function(){
				lojaService.loja = {nome: '', local: ''};
				$location.path('/lojas');
			});
	};
});

/*
	Produtos
*/
app.controller('produtoController', function($scope, $location, produtoService, divisaoService, imagemService){
	
	if($location.$$path == "/produtos/create")
		produtoService.produto = { nome: '', obs: '', divisao: {nome:''} , marca: '', precos: [], imagens:[] };

	$scope.produtos = produtoService.resource.query();


	$scope.produto = produtoService.produto;
	$scope.divisoes = divisaoService.resource.query();


	console.log($scope.produtos);

	$scope.post = function(){
		console.log("a fazer um post de produto " + $scope.produto);
		produtoService.resource.save($scope.produto, function(){ //alterei novaDivisao
			$location.path('/produtos');
		});
	};

	$scope.delete = function(prodObj){
		produtoService.resource.delete({id: prodObj.id},function(produto){
			$location.path('/produtos');
		});
	};

	//este metodo é chamado pelo 'index'
	$scope.edit = function(prodObj){
		console.log('editing... /produtos/edit/'+prodObj.id);
		produtoService.resource.get({id: prodObj.id},function(produto){
			produtoService.produto = produto;
			console.log("Produto: "+produto.nome+ "__"+produto._id);
			$location.path('/produtos/edit/'+produto._id);
		});
	};

	$scope.update = function(){
		console.log("teste update");
		console.log("updating...."+$scope.produto._id);
		produtoService.resource.update({id:$scope.produto._id},$scope.produto,
			function(){
				produtoService.produto = { nome: '', obs: '', divisao: {nome:''} , marca: '', precos: [], imagens:[] };
				$location.path('/produtos');
			}, function(err){console.log(err);});
	};
});

/*
	Precos
*/
app.controller('precoController', function($scope, $routeParams, $location, precoService, produtoService, lojaService){
	
	$scope.produtoID = $routeParams.idProduto;

	if(/^(create)$/.test($location.$$path) )
		prService.preco = { valor: 0,  eCampanha: false, loja: {nome:'', local:''} };  // ?????????????????????????????????????????

										/* !!!!!! SEGURANÇA !!!!!!!! */
	$scope.produto = produtoService.resource.get({id:$scope.produtoID},function(produto){
		console.log("Chegou o produto: "+produto.precos);
		$scope.precos = [];
		for(i=0; i < produto.precos.length; i++){
			precoService.resource.get({id:produto.precos[i]._id}, function(preco){
				$scope.precos.push(preco);
			});
		}
	});

	$scope.lojas = lojaService.resource.query();

	$scope.preco = precoService.preco;

	console.log("Url do produto: "+$routeParams.idProduto);

	$scope.post = function(){
		console.log("a fazer um post de preco " + $scope.preco);
		precoService.resource.save($scope.preco, function(preco){ //alterei novaDivisao
			console.log("registei: "+preco._id);
			$scope.produto.precos.push(preco._id);
			produtoService.resource.update({id:$scope.produtoID},$scope.produto,
				function(){
					$location.path('/precos/'+$scope.produtoID);
				});
		});
	};

	$scope.delete = function(precoObj){
		precoService.resource.delete({id: precoObj.id},function(preco){
			$location.path('/precos/'+$scope.produtoID);
		});
	};

	//este metodo é chamado pelo 'index'
	$scope.edit = function(precodObj){
		console.log('editing... /precos/edit/'+precodObj.id);
		precoService.resource.get({id: precodObj.id},function(preco){
			precoService.preco = preco;
			console.log("Preco: "+preco.nome+ "__"+preco._id);
			$location.path('/precos/'+$scope.produtoID+'/edit/'+preco._id);					// fix me
		});
	};

	$scope.update = function(){
		console.log("teste update");
		console.log("updating...."+$scope.preco._id);
		precoService.resource.update({id:$scope.preco._id},$scope.preco,
			function(){
				precoService.preco = { valor: 0,  eCampanha: false, loja: {nome:'', local:''} };
				$location.path('/precos/'+$scope.produtoID);
			}, function(err){console.log(err);});
	};
});

/*
	Imagens
*/
app.controller('imagemController', function($scope, $routeParams, $location, imagemService, produtoService){

	$scope.imagem = { nome: '',  type: '' , data: '' };
	$scope.produtoID = $routeParams.idProduto;
	console.log("Url do produto: "+$routeParams.idProduto);


										/* !!!!!! SEGURANÇA !!!!!!!! */
	$scope.produto = produtoService.resource.get({id:$scope.produtoID},function(produto){
		console.log("Chegou o produto com as imagens: "+produto.imagens);
		$scope.imagens = [];
		for(i=0; i < produto.imagens.length; i++){
			imagemService.resource.get({id: produto.imagens[i]._id}, function(imagem){
				$scope.imagens.push(imagem);
			});
		}
	});


	$scope.post = function(element){
		$scope.imagem = element.files[0];
		console.log("a fazer um post de imagem " + $scope.imagem);
		var reader = new FileReader();

		reader.onload = function(event){//		console.log("Resultado:::: " + event.target.result);
		var novaImagem = {data: event.target.result, nome: $scope.imagem.name, tipo: $scope.imagem.type};
		imagemService.resource.save(novaImagem, function(imagem){ //alterei novaDivisao

			$scope.produto.imagens.push(imagem._id);
			produtoService.resource.update({id:$scope.produtoID},$scope.produto,
				function(){
					$location.path('/imagens/'+$scope.produtoID);
				});
			});
		};
		reader.readAsDataURL($scope.imagem);
	};
	$scope.delete = function(imgObj){
		imagemService.resource.delete({id: imgObj.id},function(imagem){
			$location.path('/imagens/'+$scope.produtoID);
		});
	};
});

/*
	Camas
*/
app.controller('camaController', function($scope, $location, camaService, divisaoService){
	
	if($location.$$path == "/camas/create")
		camaService.produto = { nome: '', obs: '', divisao: {nome:''} , marca: '', precos: [], imagens:[] };

	$scope.produtos = camaService.resource.query();
	$scope.produto = camaService.produto;
	$scope.divisoes = divisaoService.resource.query();


	console.log($scope.camas);

	$scope.post = function(){
		console.log("a fazer um post de uma cama " + $scope.produto);
		$scope.produto.kind = "Cama";
		camaService.resource.save($scope.produto, function(){ //alterei novaDivisao
			$location.path('/camas');
		});
	};

	$scope.delete = function(camaObj){
		camaService.resource.delete({id: camaObj.id},function(cama){
			$location.path('/camas');
		});
	};

	//este metodo é chamado pelo 'index'
	$scope.edit = function(camaObj){
		console.log('editing... /camas/edit/'+camaObj.id);
		camaService.resource.get({id: camaObj.id},function(cama){
			camaService.produto = cama;
			console.log("Cama: "+cama.nome+ "__"+cama._id);
			$location.path('/camas/edit/'+cama._id);
		});
	};

	$scope.update = function(){
		console.log("teste update");
		console.log("updating...."+$scope.produto._id);
		camaService.resource.update({id:$scope.produto._id},$scope.produto,
			function(){
				$location.path('/camas');
			}, function(err){console.log(err);});
	};
});

/*
	Aspirador
*/
app.controller('aspiradorController', function($scope, $location, aspiradorService, divisaoService){
	
	if($location.$$path == "/aspiradores/create")
		aspiradorService.produto = { nome: '', obs: '', divisao: {nome:''}, marca: '', precos: [], imagens:[], potencia:0, decibeis:0, temSaco:false };

	$scope.produtos = aspiradorService.resource.query();
	$scope.produto = aspiradorService.produto;
	$scope.divisoes = divisaoService.resource.query();


	console.log($scope.aspiradores);

	$scope.post = function(){
		console.log("a fazer um post de uma aspirador " + $scope.produto);
		$scope.produto.kind = "Aspirador";
		aspiradorService.resource.save($scope.produto, function(){ //alterei novaDivisao
			$location.path('/aspiradores');
		});
	};

	$scope.delete = function(aspiradorObj){
		aspiradorService.resource.delete({id: aspiradorObj.id},function(aspirador){
			$location.path('/aspiradores');
		});
	};

	//este metodo é chamado pelo 'index'
	$scope.edit = function(aspiradorObj){
		console.log('editing... /aspiradores/edit/'+aspiradorObj.id);
		aspiradorService.resource.get({id: aspiradorObj.id},function(aspirador){
			aspiradorService.produto = aspirador;
			console.log("Aspirador: "+aspirador.nome+ "__"+aspirador._id);
			$location.path('/aspiradores/edit/'+aspirador._id);
		});
	};

	$scope.update = function(){
		console.log("teste update");
		console.log("updating...."+$scope.produto._id);
		aspiradorService.resource.update({id:$scope.produto._id},$scope.produto,
			function(){
				$location.path('/aspiradores');
			}, function(err){console.log(err);});
	};
});

/*
	Colchao
*/
app.controller('colchaoController', function($scope, $location, colchaoService, divisaoService){
	
	if($location.$$path == "/colchoes/create")
		colchaoService.produto = { nome: '', obs: '', divisao: {nome:''} , marca: '', precos: [], imagens:[] };

	$scope.produtos = colchaoService.resource.query();
	$scope.produto = colchaoService.produto;
	$scope.divisoes = divisaoService.resource.query();


	$scope.post = function(){
		console.log("a fazer um post de uma colchao " + $scope.produto);
		$scope.produto.kind = "Colchao";
		colchaoService.resource.save($scope.produto, function(){ //alterei novaDivisao
			$location.path('/colchoes');
		});
	};

	$scope.delete = function(colchaoObj){
		colchaoService.resource.delete({id: colchaoObj.id},function(colchao){
			$location.path('/colchoes');
		});
	};

	//este metodo é chamado pelo 'index'
	$scope.edit = function(colchaoObj){
		console.log('editing... /colchoes/edit/'+colchaoObj.id);
		colchaoService.resource.get({id: colchaoObj.id},function(colchao){
			colchaoService.produto = colchao;
			console.log("Colchao: "+colchao.nome+ "__"+colchao._id);
			$location.path('/colchoes/edit/'+colchao._id);
		});
	};

	$scope.update = function(){
		console.log("teste update");
		console.log("updating...."+$scope.produto._id);
		colchaoService.resource.update({id:$scope.produto._id},$scope.produto,
			function(){
				$location.path('/colchoes');
			}, function(err){console.log(err);});
	};
});


/*
	Figorifico
*/
app.controller('figorificoController', function($scope, $location, figorificoService, divisaoService){
	
	if($location.$$path == "/figorificos/create")
		figorificoService.produto = { nome: '', obs: '', divisao: {nome:''}, marca: '', precos: [], imagens:[], capCongelador:0, capFigorifico:0, classEnergetica:0 };

	$scope.produtos = figorificoService.resource.query();
	$scope.produto = figorificoService.produto;
	$scope.divisoes = divisaoService.resource.query();

	$scope.post = function(){
		console.log("a fazer um post de uma figorifico " + $scope.produto);
		$scope.produto.kind = "Figorifico";
		figorificoService.resource.save($scope.produto, function(){ //alterei novaDivisao
			$location.path('/figorificos');
		});
	};

	$scope.delete = function(figorificoObj){
		figorificoService.resource.delete({id: figorificoObj.id},function(figorifico){
			$location.path('/figorificos');
		});
	};

	//este metodo é chamado pelo 'index'
	$scope.edit = function(figorificoObj){
		console.log('editing... /figorificos/edit/'+figorificoObj.id);
		figorificoService.resource.get({id: figorificoObj.id},function(figorifico){
			figorificoService.produto = figorifico;
			console.log("Figorifico: "+figorifico.nome+ "__"+figorifico._id);
			$location.path('/figorificos/edit/'+figorifico._id);
		});
	};

	$scope.update = function(){
		console.log("teste update");
		console.log("updating...."+$scope.produto._id);
		figorificoService.resource.update({id:$scope.produto._id}, $scope.produto,
			function(){
				$location.path('/figorificos');
			}, function(err){console.log(err);});
	};
});

/*
	Maquina de Lavar Roupa
*/
app.controller('maqLavarRoupaController', function($scope, $location, maqLavarRoupaService, divisaoService){
	
	if($location.$$path == "/maqslavarroupa/create")
		maqLavarRoupaService.produto = { nome: '', obs: '', divisao: {nome:''}, marca: '', precos: [], imagens:[], capacidade:0, temLavagemManual:0, classEnergetica:0 };

	$scope.produtos = maqLavarRoupaService.resource.query();
	$scope.produto = maqLavarRoupaService.produto;
	$scope.divisoes = divisaoService.resource.query();

	$scope.post = function(){
		console.log("a fazer um post de uma maqLavarRoupa " + $scope.produto);
		$scope.produto.kind = "MaqLavarRoupa";
		maqLavarRoupaService.resource.save($scope.produto, function(){ //alterei novaDivisao
			$location.path('/maqslavarroupa');
		});
	};

	$scope.delete = function(maqRoupaObj){
		maqLavarRoupaService.resource.delete({id: maqRoupaObj.id},function(maqLavarRoupa){
			$location.path('/maqslavarroupa');
		});
	};

	//este metodo é chamado pelo 'index'
	$scope.edit = function(maqRoupaObj){
		console.log('editing... /maqslavarroupa/edit/'+maqRoupaObj.id);
		maqLavarRoupaService.resource.get({id: maqRoupaObj.id},function(maqLavarRoupa){
			maqLavarRoupaService.produto = maqLavarRoupa;
			console.log("Figorifico: "+maqLavarRoupa.nome+ "__"+maqLavarRoupa._id);
			$location.path('/maqslavarroupa/edit/'+maqLavarRoupa._id);
		});
	};

	$scope.update = function(){
		console.log("teste update");
		console.log("updating...."+$scope.produto._id);
		maqLavarRoupaService.resource.update({id:$scope.produto._id}, $scope.produto,
			function(){
				$location.path('/maqslavarroupa');
			}, function(err){console.log(err);});
	};
});
										/*         dependencias              */
app.controller('authController', function($scope, $rootScope, $http, $location){
//$http -> Returns a promise with success and error callbacks
//$http.get('/Url').success(successCallback)
// .get  .head   .post   .put    .delete
//$location -> para alterar o URL e redirecionar o user
	$scope.login = function(){
		$http.post('/auth/login', $scope.user).success(function(data){
			$rootScope.authenticated = true;
			$rootScope.currentUser = data.user.username;
			$location.path('/');
		});
	};

	$scope.register = function(){
		$http.post('/auth/signup', $scope.user).success(function(data){
			$rootScope.authenticated = true;
			$rootScope.currentUser = data.user.username;
			$location.path('/');
		});
	};

});
