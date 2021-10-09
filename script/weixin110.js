/*
^https?:\/\/weixin110\.qq\.com\/cgi-bin\/mmspamsupport-bin\/newredirectconfirmcgi url script-response-body https://raw.githubusercontent.com/Joker0408-1/KillAD/main/script/weixin110.js
*/

var str = ($response.body);

str = str.match(/:&#x2f;&#x2f;(\S*)"}/)[1].replace(/&#x2f;/g, '/').replace(/&amp;/g, '&').split("\"")[0]
let opener = str.indexOf("m.tb.cn") != -1 ? "taobao://" + str: ($response.body)
//console.log(str);

const $ = new cmp()

if (str.indexOf("m.tb.cn") != -1) {
    $.notify(``,"微信助手","🛍如需访问该链接，请点击本通知跳转", opener)
} else if (str.indexOf("如需浏览")) {
    $.notify(``,"微信助手","🔗如需访问该链接，请点击本通知跳转", "https://"+str)
}

$done({body: $response.body});

function cmp() {
    _isQuanX = typeof $task != "undefined"
    _isLoon = typeof $loon != "undefined"
    _isSurge = typeof $httpClient != "undefined" && !_isLoon
    this.notify = (title, subtitle, message, url) => {
        if (_isLoon) $notification.post(title, subtitle, message, url)
        if (_isQuanX) $notify(title, subtitle, message, { "open-url": url })
        if (_isSurge) $notification.post(title, subtitle, message, { url: url })
    }
}
