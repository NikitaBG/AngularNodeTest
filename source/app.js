var app = angular.module('app',['ngRoute','templates']);

app.config(['$routeProvider', '$locationProvider', 
 function($routeProvider,$locationProvider) {
	$routeProvider.when('/', {
		templateUrl: 'main.html'
	})
	.when('/mycloud', {
		templateUrl: 'main.html'
	})
	.otherwise({
		redirectTo: '/'
	});
	$locationProvider.html5Mode({enabled: true, requireBase: false});
	$locationProvider.hashPrefix('!');
}]);
