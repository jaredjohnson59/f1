App.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
        $routeProvider
            // route for the home page
            .when('/', {
              templateUrl: 'public/template/normalInfoPanel.html',
              controller: 'controller',
              paramExample: 'false' //Pass false to hide detail page
            })

            // route for the driver page
            .when('/drivers/:driver', {

                templateUrl: 'public/template/normalInfoPanel.html',
                controller: 'controller',
                paramExample: 'true' //Pass True to show detail page
            })

            .otherwise({
              redirectTo: '/'
		});

            // use the HTML5 History API
      //  $locationProvider.html5Mode(true);
    }])
