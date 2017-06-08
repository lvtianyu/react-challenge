/**
 * 时间转换方法
 */
var timeFormatting = (function () {
    //传入时间戳和连接符号
    function transformTimestamp(timeStamp, linkSymbol) {
        const time = new Date(timeStamp);
        let yy = time.getFullYear(),
            mm = time.getMonth() + 1,
            dd = time.getDate();
        if (linkSymbol) {
            return yy + linkSymbol + mm + linkSymbol + dd;
        } else {
            return yy + '年' + mm + '月' + dd + '日';
        }
    }
    //格式化成Java可以直接使用的符号格式
    function formatTime(timeStamp) {
        const time = new Date(timeStamp);
        let yy = time.getFullYear(),
            MM = time.getMonth() + 1,
            dd = time.getDate(),
            hh = time.getHours(),
            mm = time.getMinutes(),
            ss = time.getSeconds();
        return yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
    }

    return {
        toDate: transformTimestamp,
        toFormate: formatTime
    }
}());

//获取链接上某个key的值
var queryValue = (function () {
    function getQueryValue(href, query) {
        var pattern = new RegExp("[?&]" + query + "\=([^&]+)", "g");
        var matcher = pattern.exec(href);
        var items = null;
        if (null != matcher) {
            try {
                items = decodeURIComponent(decodeURIComponent(matcher[1]));
            } catch (e) {
                try {
                    items = decodeURIComponent(matcher[1]);
                } catch (e) {
                    items = matcher[1];
                }
            }
        }
        return items;
    }

    return {
        get: getQueryValue
    }
}());


var animation = (function () {
    function startrun(obj, attr, target, fn) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var cur = 0;
            if (attr == "opacity") {
                cur = Math.round(parseFloat(getstyle(obj, attr)) * 100);
            } else {
                cur = parseInt(getstyle(obj, attr));
            }
            var speed = (target - cur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (cur == target) {
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
            } else {
                if (attr == "opacity") {
                    obj.style.filter = "alpha(opacity=" + (cur + speed) + ")";
                    obj.style.opacity = (cur + speed) / 100;
                } else {
                    obj.style[attr] = cur + speed + "px";
                }
            }

        }, 30); /*运动速度*/

        function getstyle(obj, name) {
            if (obj.currentStyle) {
                return obj.currentStyle[name];
            } else {
                return getComputedStyle(obj, false)[name];
            }
        }
    }

    return startrun;

}())

const utils = {
    timeFormatting,
    queryValue,
    animation
}

export default utils;