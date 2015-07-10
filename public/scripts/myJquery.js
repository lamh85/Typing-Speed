$( document ).ready(function() {
  var getScrollHeight = function() {
    return document.getElementById("inputArea").scrollHeight;
  }

  $('#inputArea').keypress(function(){
    $('#inputArea').css('height', getScrollHeight()+'px');
  })

});