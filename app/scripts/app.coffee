dont = angular.module("dont", ['ui.router'])

dont.config ($stateProvider, $urlRouterProvider) ->
  $urlRouterProvider.otherwise("/state1")
  $stateProvider
    .state 'home',
      url: "/home",
      views:
        head:
          templateUrl: "views/head.html"
          controller: 'HeadCtrl'
        main:
          templateUrl: "views/home.html"
          controller: 'HomeCtrl'
    .state 'login',
      url: "/login",
      views:
        head:
          templateUrl: "views/head.html"
          controller: 'HeadCtrl'
        main:
          templateUrl: "views/login.html"
          controller: 'LoginCtrl'
    .state 'choose',
      url: "/choose"
      views:
        head:
          templateUrl: "views/head.html"
          controller: 'HeadCtrl'
        main:
          templateUrl: "views/choose.html"
          controller: 'ChooseCtrl'
    .state 'want_group',
      url: "/want_group"
      views:
        head:
          templateUrl: "views/head.html"
          controller: 'HeadCtrl'
        main:
          templateUrl: "views/want_group.html"
          controller: 'WantGroupCtrl'
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