angular.module('OnlineStore.controllers', [])
.controller('WelcomeController', ['SEOService', '$location', function(SEOService, $location) {
    SEOService.setSEO({
        title: 'Depot/U Online Store | Welcome ',
        description: 'Welcome to the Depot/U Online Store',
        image: 'http://' + $location.host() + '/images/blog.png',
        url: $location.absUrl()
    });
}])
.controller('ProductlistController', ['$scope', 'SEOService', '$location','Products', 'CheckoutService', function($scope, SEOService, $location, Products, CheckoutService) {
    $scope.productlist = Products.query();
    console.log($scope.productlist);

    $scope.detailMode = false; // start off NOT showing details anywhere on the page

    SEOService.setSEO({
        title: 'Depot/U Online Store | Product List',
        description: 'Items available for purchase',
        image: 'http://' + $location.host() + '/images/blog.png',
        url: $location.absUrl()
    });
    

    $scope.goToCheckout = function(product) {
        var size = product.size;
        var quantity = product.quantity;
        console.log(size);
        console.log(quantity);
        
        var checkoutData = {
            size,
            quantity
        }
        CheckoutService.set(checkoutData);
        $location.path('/products/' + product.id);
    }
        $scope.toggleDetails = function(product) {
            if (product.showingDetails === true) { // if the clicked product is already showing details
                product.showingDetails = false; // make the clicked product not show details
                $scope.detailMode = false; // indicate that we are NOT showing details somewhere on the page
            } else { // the clicked product is not already showing details
                if ($scope.detailMode !== true) { // if we are NOT showing details anywhere on the page
                    product.showingDetails = true; // show details for this product
                    $scope.detailMode = true; // indicate that we ARE showing details somewhere on the page
                }
            }
    };

}])
.controller('SingleProductController', ['$scope', '$routeParams', '$location', 'SEOService', 'Products', 'Purchases', 'CheckoutService', function ($scope, $routeParams, $location, SEOService, Products, Purchases, CheckoutService) {
    var productId = $routeParams.id;
    $scope.product = Products.get({ id: productId });

    $scope.checkoutItem = CheckoutService.get();
    console.log($scope.checkoutItem);
    
    $scope.chargeCard = function () {
        Stripe.card.createToken({
            number: $scope.cardNumber,
            cvc: $scope.cvc,
            exp_month: $scope.expMonth,
            exp_year: $scope.expYear
        }, function (status, response) {
            if (response.error) {
                console.log(response.error);
            } else {
                //everthing went through 'ok', stripe has generated a token for the card
                var stripeToken = response.id;
                var data = {
                    productid: productId,
                    price: $scope.amount,
                    token: stripeToken,
                    description: $scope.product.description,
                    email: $scope.email // we need to add an input box for the email
                }
                console.log(data);

                var purchase = new Purchases(data);
                purchase.$save(function(success) {
                    console.log('successful transaction');
                });
                $location.path('/products');
            }
        });
    }

    SEOService.setSEO({
        title: 'Depot/U Online Store | Checkout',
        description: 'Purchase page',
        image: 'http://' + $location.host() + '/images/blog.png',
        url: $location.absUrl()
    });
}])
    //send message controller
.controller('ContactController', ['$scope', '$location', 'SEOService', 'Contact', function ($scope, $location, SEOService, Contact) {
    $scope.sendMessage = function () {
        console.log('inside contact controller');
        var contactInfo = {
            fromEmail: $scope.fromEmail,
            subject: $scope.subject,
            content: $scope.content
        }
        var contact = new Contact(contactInfo);
        contact.$save(function () {
            console.log('Email send ok');
            $location.path('/');
        }, function (err) {
            console.log(err);

        })
    }

    SEOService.setSEO({
        title: 'Depot/U Online Store | Contact Us',
        description: 'Get in touch with the Depot/U Online Store staff',
        image: 'http://' + $location.host() + '/images/blog.png',
        url: $location.absUrl()
    });
}])

