$( document ).ready(function() {
  var getScrollHeight = function() {
    return document.getElementById("inputArea").scrollHeight;
  }

  $('#inputArea').keyup(function(){
    $('#inputArea').css('height', getScrollHeight()+'px');
  })

});