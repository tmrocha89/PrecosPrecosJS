var app = angular.module('PrecosPrecos', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'main.html',
			controller: 'mainController'
		});
/*
		.when('/divisoes',{
			templateUrl : 'divisao.html',
			controller : 'divisaoController'
		});*/
});



app.controller('mainController', function($scope){
	
	$scope.posts = []; //contem todos os posts a mostrar
	$scope.newPost = {created_by: '', text:'', created_at:''};



	$scope.post = function(){
		$scope.newPost.created_at = Date.now();
		$scope.posts.push($scope.newPost); //os restantes dados ja foram preenchidos
		$scope.newPost = {created_by: '', text:'', created_at:''};
	};

});