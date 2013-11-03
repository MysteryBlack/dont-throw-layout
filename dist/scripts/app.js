var dont;

dont = angular.module("dont", ['ui.router', 'ngapi', 'files']);

dont.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $urlRouterProvider.otherwise("/home");
  return $stateProvider.state('home', {
    url: "/home",
    views: {
      head: {
        templateUrl: "views/head.html",
        controller: 'HeadCtrl'
      },
      main: {
        templateUrl: "views/home.html",
        controller: 'HomeCtrl'
      }
    }
  }).state('login', {
    url: "/login",
    views: {
      head: {
        templateUrl: "views/head.html",
        controller: 'HeadCtrl'
      },
      main: {
        templateUrl: "views/login.html",
        controller: 'LoginCtrl'
      }
    }
  }).state('choose', {
    url: "/choose",
    views: {
      head: {
        templateUrl: "views/head.html",
        controller: 'HeadCtrl'
      },
      main: {
        templateUrl: "views/choose.html",
        controller: 'ChooseCtrl'
      }
    }
  }).state('want_group', {
    url: "/want_group",
    views: {
      head: {
        templateUrl: "views/head.html",
        controller: 'HeadCtrl'
      },
      main: {
        templateUrl: "views/want_group.html",
        controller: 'WantGroupCtrl'
      }
    }
  }).state('want_list', {
    url: "/want_list",
    views: {
      head: {
        templateUrl: "views/head.html",
        controller: 'HeadCtrl'
      },
      main: {
        templateUrl: "views/want_list.html",
        controller: 'WantListCtrl'
      }
    }
  }).state('want_detail', {
    url: "/want_detail",
    views: {
      head: {
        templateUrl: "views/head.html",
        controller: 'HeadCtrl'
      },
      main: {
        templateUrl: "views/want_detail.html",
        controller: 'WantDetailCtrl'
      }
    }
  }).state('want_complete', {
    url: "/want_complete",
    views: {
      head: {
        templateUrl: "views/head.html",
        controller: 'HeadCtrl'
      },
      main: {
        templateUrl: "views/want_complete.html",
        controller: 'WantCompleteCtrl'
      }
    }
  }).state('give_push', {
    url: "/give_push",
    views: {
      head: {
        templateUrl: "views/head.html",
        controller: 'HeadCtrl'
      },
      main: {
        templateUrl: "views/give_push.html",
        controller: 'GivePushCtrl'
      }
    }
  }).state('give_preview', {
    url: "/give_preview/:id",
    resolve: {
      data: function($http) {
        return $http({
          method: "GET",
          url: "http://api.dont-throw.com/get/location"
        });
      }
    },
    views: {
      head: {
        templateUrl: "views/head.html",
        controller: 'HeadCtrl'
      },
      main: {
        templateUrl: "views/give_preview.html",
        controller: 'GivePreviewCtrl'
      }
    }
  });
});

dont.run(function($rootScope, $state, ThingsSvc) {
  $rootScope.view = 'home';
  return $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    $rootScope.view = 'view-' + toState.name;
    if (toState.name === 'want_list') {
      return ThingsSvc.update((function() {
        if (!$rootScope.$$phase) {
          return $rootScope.$apply();
        }
      }));
    }
  });
});

dont.filter('selected', function() {
  return function(input) {
    var res;
    res = [];
    angular.forEach(input, function(item, key) {
      if (item.selected) {
        return res.push(item);
      }
    });
    return res;
  };
});

dont.constant('apiurl', 'http://api.dont-throw.com');

dont.constant('apicnonce', 'cnonce');

dont.constant('apivalidate', {});

/*
//@ sourceMappingURL=app.js.map
*/