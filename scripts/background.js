var settingKey = "chatworkcranziness_setting"; 
var tagEscape = false;
var cranzinessLevel = 10;

var getTagEscape = function() {
    return tagEscape;
};

var getCranzinessLevel = function() {
    return cranzinessLevel;
};

var setTagEscape = function(v) {
    if(v){
        tagEscape = true;
    } else {
        tagEscape = false;
    }
    
    applyTagEscape();
};

var setCranzinessLevel = function(v) {
    if(isNaN(v)) return false;
    if(v <= 0) return false;
    if(v > 100) return false;
    
    cranzinessLevel = Math.round(v);
    applyCranzinessLevel();
    return true;
};

var saveSetting = function() {
    var setting = new Object();
    setting["tag_escape"] = tagEscape;
    setting["cranziness_level"] = cranzinessLevel;
    
    var str = JSON.stringify(setting);
    localStorage.setItem(settingKey, str);
};

var loadSetting = function() {
    var setting = localStorage.getItem(settingKey);
    if(setting){
        return JSON.parse(setting);
    } else {
        return null;
    }
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getLocalStorage") {
        sendResponse({data: localStorage[settingKey]});
    } else if (request.method == "pageActionShow") {
        chrome.pageAction.show(sender.tab.id);
        sendResponse({});
    } else {
        sendResponse({});
    }
});

var applyTagEscape = function() {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(tab.id, {method: "applyTagEscape", value:tagEscape}, function(response) {});
  });
};

var applyCranzinessLevel = function() {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(tab.id, {method: "applyCranzinessLevel", value:cranzinessLevel}, function(response) {});
  });
}