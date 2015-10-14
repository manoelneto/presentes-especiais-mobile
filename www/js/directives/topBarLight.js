app.directive('topBarLight', function() {
  return {
    link: function(scope, el, attrs) {
      if (window.StatusBar) {
        return StatusBar.style(1);
      }
    }
  };
});
