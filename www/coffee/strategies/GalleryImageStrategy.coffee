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
          parsedFiles = []
          encodePromises = []

          results.forEach (result) ->
            promise = $q (r, rj) ->

              window.plugins.Base64.encodeFile result, (base64) ->
                parsedFiles.push base64
                r()

            encodePromises.push promise

          $q.all(encodePromises).then ->
            resolve(parsedFiles)

        , (error) ->
          console.log "error getting photos"
          # error getting photos
          reject(error)
        , @options

  GalleryImageStrategy
]
