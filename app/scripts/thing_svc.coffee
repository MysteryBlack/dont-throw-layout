dont.service 'ThingsSvc', [ ()->
  things_lite = []
  things = []

  @fetch = () -> things
  @update = (completed) ->
    $.ajax
      url: "http://api.dont-throw.com/tag/all"
      cache: false
      type: 'GET'
      dataType: "json"
    .done (res) ->
      # things.shift() while things.length > 0
      angular.forEach res.data, (item, key) ->
        return if things_lite[item.id]?
        things.push
          id: item.id
          photo: 'https://s3-us-west-2.amazonaws.com/dont-throw/'+item.picid
          x: item.x
          y: item.y
          name: item.tagname
          position: 50
          selected: no
        things_lite[item.id] = on
      completed()

  @length = () -> things.length
]