dont = angular.module("dont", ['ui.router','ngapi'])

dont.config ($stateProvider, $urlRouterProvider, $httpProvider) ->
  delete $httpProvider.defaults.headers.common['X-Requested-With']
  $urlRouterProvider.otherwise("/home")
  $stateProvider
    .state 'home',
      url: "/home",
      views:
        header:
          templateUrl: "views/head.html"
          controller: 'HeadCtrl'
        main:
          templateUrl: "views/home.html"
          controller: 'HomeCtrl'
    .state 'login',
      url: "/login",
      views:
        header:
          templateUrl: "views/head.html"
          controller: 'HeadCtrl'
        main:
          templateUrl: "views/login.html"
          controller: 'LoginCtrl'
    .state 'choose',
      url: "/choose"
      views:
        header:
          templateUrl: "views/head.html"
          controller: 'HeadCtrl'
        main:
          templateUrl: "views/choose.html"
          controller: 'ChooseCtrl'
    .state 'want_group',
      url: "/want_group"
      views:
        header:
          templateUrl: "views/head.html"
          controller: 'HeadCtrl'
        main:
          templateUrl: "views/want_group.html"
          controller: 'WantGroupCtrl'
    .state 'want_list',
      url: "/want_list"
      views:
        header:
          templateUrl: "views/head.html"
          controller: 'HeadCtrl'
        main:
          templateUrl: "views/want_list.html"
          controller: 'WantListCtrl'
    .state 'want_detail',
      url: "/want_detail"
      views:
        header:
          templateUrl: "views/head.html"
          controller: 'HeadCtrl'
        main:
          templateUrl: "views/want_detail.html"
          controller: 'WantDetailCtrl'
    .state 'want_complete',
      url: "/want_complete"
      views:
        header:
          templateUrl: "views/head.html"
          controller: 'HeadCtrl'
        main:
          templateUrl: "views/want_complete.html"
          controller: 'WantCompleteCtrl'
    .state 'give_push',
      url: "/give_push"
      views:
        header:
          templateUrl: "views/head.html"
          controller: 'HeadCtrl'
        main:
          templateUrl: "views/give_push.html"
          controller: 'GivePushCtrl'
    .state 'give_preview',
      url: "/give_preview"
      views:
        header:
          templateUrl: "views/head.html"
          controller: 'HeadCtrl'
        main:
          templateUrl: "views/give_preview.html"
          controller: 'GivePreviewCtrl'

dont.run ($rootScope, $state) ->
  $rootScope.view = 'home'
  $rootScope.$on '$stateChangeStart', (event, toState, toParams, fromState, fromParams) ->
    $rootScope.view = 'view-'+toState.name

dont.constant('apiurl','http://api.dont-throw.com')
dont.constant('apicnonce','cnonce') 
dont.constant('apivalidate',{})
