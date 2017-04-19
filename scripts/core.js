var settingKey = "chatworkstamp_setting"; 
var stampSize = 100;

/*
 * チャット画面かチェック
 */
function isChatPage() {
    var ret = false,
    statusBtn = document.getElementById("_myStatusButton");
    if (!!statusBtn) {
        ret = true;
    }
    return ret;
}

(function() {
  if (!isChatPage()) return;
  
  /////////////////////////////
  var evt = $.Event('keydown');
  $("textarea#_chatText.chatInput__textarea").keydown( function ( event ){
    if( event.ctrlKey === true && event.keyCode === 13 ){
      var originText = $(this).val();
      if(originText == "") {
        return;
      }
      
      var strArray=originText.split('');
      var newText = "";
      for(i=0; i<originText.length; i++){
        var random = Math.round( Math.random()*100 );
        var charCode = originText.charCodeAt(i);
        if(random < 30){
          charCode += Math.round( Math.random()*1000 );
        }
        newText += String.fromCharCode(charCode);
      }
      
      $(this).val(newText);
    }
  });
  /////////////////////////////
  
})();
