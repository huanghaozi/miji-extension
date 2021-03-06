arrayTips = [];
window.baidu = {
    sug: function (json) {
        arrayTips = json.s;
    }
};
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    baiduTips(request.keyword);
    setTimeout(function () {
        sendResponse(arrayTips);
    },100);
    return true;
});
function baiduTips(keyword){
    url1 = "http://suggestion.baidu.com/su?cb=window.baidu.sug&wd=" + keyword;
    $.ajax({
        type: 'get',
        url: url1,
        dataType: 'text',
        success: function(result) {
            eval(result);
        }
    });
}
function bingTips(keyword){
    url2 = "http://api.bing.com/qsonhs.aspx?type=cb&q=" + keyword;
    initTips = $.ajax({
        url:url2,
        async:false
    })
}
function soTips(keyword){
    url3 = "https://sug.so.360.cn/suggest?encodein=utf-8&encodeout=utf-8&word=" + keyword;
    initTips = $.ajax({
        url:url3,
        async:false
    })
}
function sougouTips(keyword){
    url4 = "https://www.sogou.com/suggnew/ajajjson";
    window.sogou = {
        sug: function(json) {
            console.log(json)
        }
    };
    initTips = $.ajax({
        type : 'get',
        url:url4,
        data : {
            type : "web",
            key : keyword,
        },
        cache :false,
        jsonp: "callback",
        jsonpCallback:"success",
        dataType : 'jsonp',
        success:function(data){
            console.log("success");
        },
        error:function(data){
            console.log("error");
        }
    });
}
