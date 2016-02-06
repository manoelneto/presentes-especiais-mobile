app.factory "GalleryImageStrategy", [ '$q', ($q)->
  defaultOptions =
    maximumImagesCount: 10
    width: 800
    height: 800
    quality: 80


  class GalleryImageStrategy
    constructor: (options) ->
      @options = angular.extend({}, options, defaultOptions)

    loadPicture: ->
      $q (resolve, reject) ->
        imagePicker.getPictures (results) ->
          console.log results
          i = 0
          while i < results.length
            console.log 'Image URI: ' + results[i]
            i++
          resolve(results)
        , (error) ->
          console.log "error getting photos"
          # error getting photos
          reject(error)
        , @options

  GalleryImageStrategy
]
