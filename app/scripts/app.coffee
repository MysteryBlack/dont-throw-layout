dont = angular.module("dont", ['ui.router','ngapi','files'])

dont.config ($stateProvider, $urlRouterProvider, $httpProvider) ->
  delete $httpProvider.defaults.headers.common['X-Requested-With']
  $urlRouterProvider.otherwise("/home")
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
      views:
        head:
          templateUrl: "views/head.html"
          controller: 'HeadCtrl'
        main:
          templateUrl: "views/want_list.html"
          controller: 'WantListCtrl'
    .state 'want_detail',
      url: "/want_detail"
      views:
        head:
          templateUrl: "views/head.html"
          controller: 'HeadCtrl'
        main:
          templateUrl: "views/want_detail.html"
          controller: 'WantDetailCtrl'
    .state 'want_complete',
      url: "/want_complete"
      views:
        head:
          templateUrl: "views/head.html"
          controller: 'HeadCtrl'
        main:
          templateUrl: "views/want_complete.html"
          controller: 'WantCompleteCtrl'
    .state 'give_push',
      url: "/give_push"
      views:
        head:
          templateUrl: "views/head.html"
          controller: 'HeadCtrl'
        main:
          templateUrl: "views/give_push.html"
          controller: 'GivePushCtrl'
    .state 'give_preview',
      url: "/give_preview/:id",
      resolve:
        data:($http) ->
          $http
            method: "GET"
            url: "http://api.dont-throw.com/get/location"

      views:
        head:
          templateUrl: "views/head.html"
          controller: 'HeadCtrl'
        main:
          templateUrl: "views/give_preview.html"
          controller: 'GivePreviewCtrl'

dont.run ($rootScope, $state, ThingsSvc) ->
  $rootScope.view = 'home'
  $rootScope.$on '$stateChangeStart', (event, toState, toParams, fromState, fromParams) ->
    $rootScope.view = 'view-'+toState.name
    ThingsSvc.update (() -> $rootScope.$apply() unless $rootScope.$$phase) if toState.name is 'want_list'

dont.filter 'selected', () ->
  (input) ->
    res = []
    angular.forEach input, (item, key) -> 
      res.push(item) if item.selected
    return res

dont.constant('apiurl','http://api.dont-throw.com')
dont.constant('apicnonce','cnonce') 
dont.constant('apivalidate',{})
