angular.module('OnlineStore.factories', [])
.factory('Products', ['$resource', function($resource) {
    return $resource('/api/products/:id', { id: '@id' });
}])
.factory('Purchases', ['$resource', function($resource) {
    return $resource('/api/purchases/:id', { id: '@id' });
}])
.factory("Contact", ["$resource", function ($resource) {
        return $resource('/api/contact/:id');
}]);


