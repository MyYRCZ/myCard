/**
 * HttpMgr管理http短链接请求
 */

const http = require("./http");
const Utils = require("../utils/utils");

let HttpMgr = {
    /**
     * 
     * @param {http/https} protocol 
     * @param {请求连接} url 
     * @param {请求参数} param 
     * @param {请求回调函数} handler 
     * @param {单次请求超时时间} timeOut 
     * @param {请求超时重试次数} timeOutNum 
     * @returns 
     */
    get: function (protocol, url, param, handler, timeOut, timeOutNum) {
        let _protocol = "http";
        if (protocol === "https") {
            _protocol = "https";
        }

        if (!Utils.checkParam(url) && Utils.isStringAndNotNull(url)) {
            console.log("url = ", url);
            return;
        }

        if (!Utils.checkParam(param) && Utils.isEmptyObject(param)) {
            console.log("param: ", param);
            return;
        }

        if (!Utils.checkParam(handler) && Utils.isEmptyObject(handler)) {
            console.log("handler: ", handler);
            return;
        }

        let _timeOut = timeOut || cc.LL.timeOut;
        let _timeOutNum = timeOutNum || cc.LL.timeOutNum;
        http.requestByGet(_protocol, url, param, _timeOut, _timeOutNum, handler);
    }
};

module.exports = HttpMgr;
