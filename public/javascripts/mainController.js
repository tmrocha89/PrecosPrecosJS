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

		.when('/camas',{
			templateUrl : 'divisao.html',
			controller : 'appController'
		})

		.when('/colchoes',{
			templateUrl : 'divisao.html',
			controller : 'appController'
		})

		.when('/figorificos',{
			templateUrl : 'divisao.html',
			controller : 'appController'
		})

		.when('/maqslavarroupa',{
			templateUrl : 'divisao.html',
			controller : 'appController'
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
app.controller('produtoController', function($scope, $location, produtoService, divisaoService){
	
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
