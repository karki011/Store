angular.module('OnlineStore', ['ngResource', 'ngRoute', 'OnlineStore.controllers', 'OnlineStore.factories', 'OnlineStore.services'])

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'views/welcome.html',
            controller: 'WelcomeController'
        })
        .when('/products', {
            templateUrl: 'views/productlist.html',
            controller: 'ProductlistController'
        })
        .when('/products/:id', {
        templateUrl: 'views/itempage.html',
        controller: 'SingleProductController'
         })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactController'
        })
        .when('/checkout', {
            templateUrl: 'views/checkout.html'
        
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
