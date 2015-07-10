
    // document.getElementById("inputArea").scrollHeight;
    // $('textarea').css('height',(742 + 20)+'px');

$( document ).ready(function() {
  var originalHeight;
  var scrollHeight;

  originalHeight = $('#inputArea').height();
  var getScrollHeight = function() {
    return document.getElementById("inputArea").scrollHeight;
  }

  $('#inputArea').keyup(function(){
    $('#inputArea').css('height', getScrollHeight()+'px');
    console.log(getScrollHeight());
  })

});