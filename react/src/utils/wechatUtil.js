var weChat = (function () {
    function judgeLogin(redirectUri) {
        !localStorage.getItem('userId') && (location.href = 'http://camp.liver-cloud.com/platform/wechat/weixin.do?redirectUrl=' + redirectUri)
    }
    return {
        isLogin: judgeLogin
    }
}())

export default weChat;