dont.controller "GivePushCtrl", ($scope,$fileUploader) ->
  $scope.tags = []
  $scope.updatelists = '';
  $scope.addTag = (e) ->
    offsetX = e.offsetX / $(e.target).width() * 100
    offsetY = e.offsetY / $(e.target).height() * 100
    console.log 'GivePushCtrl[offsetX]: '+offsetX
    console.log 'GivePushCtrl[offsetY]: '+offsetY
    $scope.tags.push {x:offsetX, y:offsetY}

  uploader = $fileUploader.create(
    scope: $scope # to automatically update the html
    url: "http://api.dont-throw.com/updatefile/img"
    filters: [(item) -> # first user filter
      console.log "filter1"
      true
    ]
  )
	# ADDING FILTER
	
  uploader.filters.push (item) -> # second user filter
	  console.log "filter2"
	  true   
  # REGISTER HANDLERS
  # uploader.bind( 'afteraddingfile', function( event, item ) {
  #     console.log( 'After adding a file', item );
  # });
  # uploader.bind( 'afteraddingall', function( event, items ) {
  #     console.log( 'After adding all files', items );
  # });
  # uploader.bind( 'changedqueue', function( event, items ) {
  #     console.log( 'Changed queue', items );
  # });
  # uploader.bind( 'beforeupload', function( event, item ) {
  #     console.log( 'Before upload', item );
  # });
  # uploader.bind( 'progress', function( event, item, progress ) {
  #     console.log( 'Progress: ' + progress );
  # });
  # uploader.bind( 'success', function( event, xhr, item ) {
  #     console.log( 'Success: ' + xhr.response );
  # });
  uploader.bind "complete", (event, xhr, item) ->
    console.log "Complete: " + xhr.response
    _x = angular.fromJson(xhr.response)
    $scope.picPool.push
      u: _x.n
      m: 0

    $scope.oi = false
    console.log $scope.picPool[0]
    _ym = 0
    angular.forEach $scope.picPool, (v, i) ->
      _ym = 1  if v.m is 1

    $scope.picPool[0].m = 1  if _ym is 0


  # uploader.bind( 'progressall', function( event, progress ) {
  #     console.log( 'Total progress: ' + progress );
  # });
  uploader.bind "completeall", (event, items) ->
    
    # console.log( 'All files are transferred' );
    $scope.oi = false


  #console.log(event);
  $scope.uploader = uploader
