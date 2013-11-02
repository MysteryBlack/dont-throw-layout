var dont;

dont = angular.module("dont", ['ui.router', 'ngapi']);

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
    url: "/give_preview",
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

dont.controller("DocumentCtrl", function($scope, $state,$http) {
  $http.defaults.useXDomain = true;
  // $http.post('http://127.0.0.1:3000/api/user/signup',{
  //     password: '1234',
  //     login: 'test223',
  //     email:'admin1@test.com',
  //     display:'test'
  //   }).success(function(data){
  //     console.log('======');
  //     console.log(data);
  //     console.log('======');
  //   })

  $scope.yoyo = function() {
    return console.log($scope.pass);
  };
  $scope.view = 'home';
  return $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    return $scope.view = 'view-' + toState.name;
  });
});

dont.constant('apiurl', 'http://127.0.0.1:3000');

dont.constant('apicnonce', 'cnonce');

dont.constant('apivalidate', {});

/*
//@ sourceMappingURL=app.js.map
*/