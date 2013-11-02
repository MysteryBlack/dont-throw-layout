var dont;

dont = angular.module("dont", []);

dont.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/state1");
  return $stateProvider.state('home', {
    url: "/home",
    views: {
      head: {
        template: "view/head.html",
        controller: function($scope) {
          return $scope.things = ["A", "Set", "Of", "Things"];
        }
      },
      main: {
        template: "view/home.html",
        controller: function($scope) {
          return $scope.things = ["A", "Set", "Of", "Things"];
        }
      }
    }
  }).state('login', {
    url: "/login",
    views: {
      head: {
        template: "view/head.html",
        controller: function($scope) {
          return $scope.things = ["A", "Set", "Of", "Things"];
        }
      },
      main: {
        template: "view/login.html",
        controller: function($scope) {
          return $scope.things = ["A", "Set", "Of", "Things"];
        }
      }
    }
  }).state('choose', {
    url: "/choose",
    views: {
      head: {
        template: "view/head.html",
        controller: function($scope) {
          return $scope.things = ["A", "Set", "Of", "Things"];
        }
      },
      main: {
        template: "view/choose.html",
        controller: function($scope) {
          return $scope.things = ["A", "Set", "Of", "Things"];
        }
      }
    }
  }).state('want_group', {
    url: "/want_group"
  }).state('want_list', {
    url: "/want_list"
  }).state('want_detail', {
    url: "/want_detail"
  }).state('want_complete', {
    url: "/want_complete"
  }).state('give_push', {
    url: "/give_push"
  }).state('give_preview', {
    url: "/give_preview"
  });
});

/*
//@ sourceMappingURL=app.js.map
*/