var settingKey = "chatworkcranziness_setting"; 
var tagEscape = false;
var cranzinessLevel = 10;

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


// background.jsからの呼び出し
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request.method == "applyTagEscape") {
      tagEscape = request.value;
    }
    if (request.method == "applyCranzinessLevel") {
      cranzinessLevel = request.value;
    }
    sendResponse({});
  }
);


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
      
      var escapeFlag = false;
      
      for(i=0; i<originText.length; i++){
        
        var random = Math.round( Math.random()*100 );
        var charCode = originText.charCodeAt(i);
        
        if (tagEscape && originText[i] == "[") {
          escapeFlag = true;
        }
        
        if(!escapeFlag && random < cranzinessLevel){
          charCode = Math.round( Math.random()*3000 );
        }
        newText += String.fromCharCode(charCode);
        
        if (originText[i] == "]") {
          escapeFlag = false;
        }
      }
      
      $(this).val(newText);
    }
  });
  /////////////////////////////
  
  // 設定ロード

  chrome.runtime.sendMessage({method: "getLocalStorage"}, function(response) {
    if(response.data) {
      var setting = JSON.parse(response.data);
      if (setting["tag_escape"]) {
        tagEscape = setting["tag_escape"];
      }
      if (setting["cranziness_level"]) {
        cranzinessLevel = setting["cranziness_level"];
      }
    }
  });
  
  chrome.runtime.sendMessage({method: "pageActionShow"}, function(response) {});
})();
