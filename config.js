	var myApp = angular.module('mainApp', ['ngRoute']);
	
	myApp.config(['$routeProvider', function ($routeProvider) {
	        $routeProvider.when('/', {
	                templateUrl: './template/home.html',
	                controller: 'invoiceController'
	            });
	        $routeProvider.when('/add-item', {
	                templateUrl: './template/add-item.html',
	                controller: 'AddStockController'
	            });
	        $routeProvider.when('/add-new-item', {
	                templateUrl: './template/add-new-item.html'
	            });
	        $routeProvider.when('/table', {
	                templateUrl: './template/table.html'
	            });
	        $routeProvider.when('/invoice', {
	                templateUrl: './template/invoice.html'
	            });
	        $routeProvider.otherwise({redirectTo: '/'});
	    }
	]);

	
