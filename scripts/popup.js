$(function(){
    var BG = chrome.extension.getBackgroundPage();
    
    window.addEventListener('unload', function(ev){
        BG.saveSetting();
    }, false);

    var setting = BG.loadSetting();
    
    if(setting){
        BG.setTagEscape(setting["tag_escape"]);
        BG.setCranzinessLevel(setting["cranziness_level"]);
    }
    
    if(BG.getTagEscape()){
      $('.chatwork_cranziness_setting .tag_escape').prop('checked', true);
    } else {
      $('.chatwork_cranziness_setting .tag_escape').prop('checked', false);
    }
    $('.chatwork_cranziness_setting .cranziness_level').val(BG.getCranzinessLevel());
    
    $('.chatwork_cranziness_setting .tag_escape').on('change', function(){
        BG.setTagEscape($(this).prop('checked'));
    });
    $('.chatwork_cranziness_setting .cranziness_level').on('change', function(){
        BG.setCranzinessLevel($(this).val());
    });
});