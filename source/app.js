var app = angular.module('app',['ngRoute','templates']);

app.config(['$routeProvider', '$locationProvider', 
 function($routeProvider,$locationProvider) {
	$routeProvider.when('/', {
		templateUrl: 'login.html',
		controller: 'loginCtrl',
		controllerAs: 'login'
	})
	/*.when('/users', {
		templateUrl: 'usersList.html'
	})*/
	.when('/users/:userId', {
		templateUrl: 'usersEdit.html'
	})
	.when('/products', {
		templateUrl: 'productsList.html',
		controller: 'productsListCtrl',
		controllerAs: 'productsList'
	})
	.when('/products/:productsId', {
		templateUrl: 'productsEdit.html'
	})
	.otherwise({
		redirectTo: '/'
	});
	$locationProvider.html5Mode({enabled: true, requireBase: false});
	$locationProvider.hashPrefix('!');
}]);
