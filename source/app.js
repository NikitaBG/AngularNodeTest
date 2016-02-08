var app = angular.module('app',['ngRoute','ngResource','templates','appControllers','appServices','appDirectives']);

app.config(['$routeProvider', '$locationProvider', 
 function($routeProvider,$locationProvider) {
	$routeProvider.when('/', {
		templateUrl: 'login.html',
		controller: 'loginCtrl',
		controllerAs: 'login',
		access: { requiredLogin: false }
	})
	.when('/users/:userId', {
		templateUrl: 'usersEdit.html',
		controller: 'userEditCtrl',
		controllerAs: 'userEdit',
		access: { requiredLogin: true }
	})
	.when('/products', {
		templateUrl: 'productsList.html',
		controller: 'productsListCtrl',
		controllerAs: 'productsList',
		access: { requiredLogin: true }
	})
	.when('/products/:productsId', {
		templateUrl: 'productsEdit.html',
		controller: 'productsEditCtrl',
		controllerAs: 'productsEdit',
		access: { requiredLogin: true }
	})
	.when('/products/new', {
		templateUrl: 'productsEdit.html',
		controller: 'productsEditCtrl',
		controllerAs: 'productsEdit',
		access: { requiredLogin: true }
	})
	.when('/notFound', {
		templateUrl: 'notFound.html',
		access: { requiredLogin: false }
	})
	.otherwise({
		redirectTo: '/notFound'
	});

	$locationProvider.html5Mode({enabled: true, requireBase: false});
	$locationProvider.hashPrefix('!');
}]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('tokenService');
});

app.run(function($rootScope, $location, $window, authService) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        if (nextRoute.access && nextRoute.access.requiredLogin && !authService.isLogged && !$window.sessionStorage.token) {
            $location.path("/");
        }
    });
});

var appControllers = angular.module('appControllers', []);
var appServices = angular.module('appServices', []);
var appDirectives = angular.module('appDirectives', []);