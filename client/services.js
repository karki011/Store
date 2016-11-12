angular.module('OnlineStore.services', [])

    .service('SEOService', ['$rootScope', function ($rootScope) {
        this.setSEO = function (seoObj) {
            $rootScope.seo = {};
            for (var prop in seoObj) {
                $rootScope.seo[prop] = seoObj[prop];
            }
        }
    }])
    .service('CheckoutService', function () {
        var savedData = {}

        function set(data) {
            savedData = data;
            console.log(savedData);
        }
        function get() {
            return savedData;
        }

        return {
            set: set,
            get: get
        }
    });