dont = angular.module("dont", [])

dont.config ($stateProvider, $urlRouterProvider) ->
  $urlRouterProvider.otherwise("/state1")
  $stateProvider
    .state 'home',
      url: "/home",
      views:
        head:
          template: "view/head.html"
          controller: ($scope) ->
            $scope.things = ["A", "Set", "Of", "Things"]
        main:
          template: "view/home.html"
          controller: ($scope) ->
            $scope.things = ["A", "Set", "Of", "Things"]
    .state 'login',
      url: "/login",
      views:
        head:
          template: "view/head.html"
          controller: ($scope) ->
            $scope.things = ["A", "Set", "Of", "Things"]
        main:
          template: "view/login.html"
          controller: ($scope) ->
            $scope.things = ["A", "Set", "Of", "Things"]
    .state 'choose',
      url: "/choose"
      views:
        head:
          template: "view/head.html"
          controller: ($scope) ->
            $scope.things = ["A", "Set", "Of", "Things"]
        main:
          template: "view/choose.html"
          controller: ($scope) ->
            $scope.things = ["A", "Set", "Of", "Things"]
    .state 'want_group',
      url: "/want_group"
    .state 'want_list',
      url: "/want_list"
    .state 'want_detail',
      url: "/want_detail"
    .state 'want_complete',
      url: "/want_complete"
    .state 'give_push',
      url: "/give_push"
    .state 'give_preview',
      url: "/give_preview"