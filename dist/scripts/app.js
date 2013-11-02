var dont;

dont = angular.module("dont", []);

dont.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/state1");
  return $stateProvider.state('state1', {
    url: "/state1",
    templateUrl: "partials/state1.html"
  }).state('state1.list', {
    url: "/list",
    templateUrl: "partials/state1.list.html",
    controller: function($scope) {
      return $scope.items = ["A", "List", "Of", "Items"];
    }
  }).state('state2', {
    url: "/state2",
    templateUrl: "partials/state2.html"
  }).state('state2.list', {
    url: "/list",
    templateUrl: "partials/state2.list.html",
    controller: function($scope) {
      return $scope.things = ["A", "Set", "Of", "Things"];
    }
  });
});

/*
//@ sourceMappingURL=app.js.map
*/