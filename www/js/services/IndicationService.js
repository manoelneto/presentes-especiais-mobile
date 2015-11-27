app.service('IndicationService', [
  '$http', '$q', '$timeout', function($http, $q, $timeout) {
    var posts, url;
    posts = [
      {
        message: "Bora trabalharrr"
      }, {
        message: "Teste de mensagem"
      }
    ];
    this.loadPostsFaked = function() {
      return $q(function(resolve, reject) {
        var theReponse;
        theReponse = {
          data: {
            data: posts
          }
        };
        return $timeout(function() {
          return resolve(theReponse);
        }, 5000);
      });
    };
    url = "https://graph.facebook.com/v2.5/paginademusicaelife/posts?access_token=CAACEdEose0cBANIKWR2v3789mjAxojCYKWwJX7aZCdvk9mZBur8GfDsYU0vGE9kEeFCtePPd8fsiSz8QdsjyUv7c2djARdl8emuSTHKhIkMRTWgc69BdxlQAC0w1vn0RNroeTBxQcLkiItvFUn0wMVO7SaFdWFTNzBaD4ZCCOPWKxwi4LPyCPDm7pTeWnCZAbvowv4sTP7Az8HxRmI44";
    this.loadPosts = function() {
      return $http.get(url);
    };
    return this;
  }
]);
