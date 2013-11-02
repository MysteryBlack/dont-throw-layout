app.controller "PhotoCtrl", ($scope, $routeParams, $timeout, PhotoSvc, SelectSvc, UserSvc, Tab, Configs) ->
  $scope.items = []
  $scope.limit = 0

  $scope.tab = Tab

  $scope.selected = SelectSvc.fetch()

  $scope.box =
    wrap_width: 1000
    wrap_height: 1000
    width: 1
    height: 1

  $scope.toolbar = false
  
  $scope.user = UserSvc.info()


  $scope.$watch UserSvc.status, () ->
    $scope.user = UserSvc.info()
    if UserSvc.status() is 'login'
      PhotoSvc.reset_sid($scope.user.sid)
      switch Tab
        when 'album'
          $scope.items = PhotoSvc.album()
        when 'selected'
          $scope.items = SelectSvc.fetch()
        when 'albumPhoto'
          $scope.items = PhotoSvc.photo($routeParams.id)
          $scope.album = PhotoSvc.get_album($routeParams.id)
        else
          $scope.items = PhotoSvc.photo()

  run_zoom = no
  $scope.zoom = 50
  $scope.zoom_start = (e) ->
    run_zoom = yes
  $scope.zoom_listener = (e,focus) ->
    return if run_zoom isnt yes and focus isnt yes
    positionX = e.pageX - $('.zoom .zoom-meso').offset().left
    range = $('.zoom .zoom-meso').width()
    positionX = 0 if positionX < 0
    positionX = range if positionX > range
    $scope.zoom = positionX/range*100
    $scope.box.width = $scope.zoom / 100 + 0.5
    $scope.box.height = $scope.zoom / 100 + 0.5
    return false
  $scope.zoom_end = (e) ->
    run_zoom = no

  $scope.init = () ->
    Configs.set_step(1, Tab)
    $scope.toolbar = true if $scope.selected.length > 0
    $('body').attr('class','view-photo')
    switch Tab
      when 'album'
        $scope.box.type = 'album'
      else
        $scope.box.type = 'photo'

  # $scope.$watch $scope.selected, () ->
  #   $scope.preview = []
  #   item = SelectSvc.fetch()
  #   last = 6

  #   console.log $scope.preview

  #   item_length = item.length
  #   $scope.preview.push(input[i]) for i in [item_length-last...item_length] when i > -1

  $scope.toolbar_toggle = () ->
    $scope.toolbar = !$scope.toolbar

  $scope.select = (item) ->
    item.hover = off
    switch item.type
      when 'photo'
        if item.selected
          SelectSvc.del(item)
        else
          SelectSvc.add(item)
          $scope.toolbar = true
      when 'album'
        if item.selected > 0
          angular.forEach item.data, (photo, key) -> SelectSvc.del(photo) if photo.selected
        else
          angular.forEach item.data, (photo, key) -> SelectSvc.add(photo) unless photo.selected
          $scope.toolbar = true

  $scope.enter = (item, e) ->
    return if $(e.target).hasClass('checkbox')
    item.hover = off
    switch item.type
      when 'photo'
        if item.selected
          SelectSvc.del(item)
        else
          SelectSvc.add(item)
          $scope.toolbar = true
      when 'album'
        location.hash = '#/albumPhoto/'+item.id
        

  $scope.clear = () ->
    SelectSvc.clear()

  (listener = ()->
    reDisplay = off

    width = $('#main').width()
    if width isnt $scope.box.wrap_width
      $scope.box.wrap_width = width
      reDisplay = on

    height = $('#main').height()
    if height isnt $scope.box.wrap_height
      $scope.box.wrap_height = height
      reDisplay = on

    if $scope.items.length > $scope.limit
      if $(document).height()-$(window).height() < $(document).scrollTop() + 500
        $scope.limit += 100
        $scope.limit = $scope.items.length if $scope.limit > $scope.items.length
        reDisplay = on

    $scope.$apply() unless $scope.$$phase if reDisplay

    $scope.listen = $timeout(listener, 1000)

  )()

  $scope.$on '$locationChangeStart', () ->
    $timeout.cancel($scope.listen) if $scope.listen
