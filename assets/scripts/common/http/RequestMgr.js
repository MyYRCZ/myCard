let Utils = require("../utils/utils");

let RequestMgr = {};

RequestMgr._url = null;

RequestMgr.httpRequest = function (domain, param, onSuccessCallBack, onErrorCallBack, onTimeOutCallBack) {
    if (!this._url) {
        this._url = cc.LL.urlLink;
        console.log("url:  ", this._url);
    }

    let url = this._url + "/" + domain;

    if (param && param.p) {
        param.p["gameType"] = 501;
        param.p["loginType"] = 0;
    }

    if (Utils.isEmptyObject(param)) {
        return;
    }

    let onRequestSuccess = (data) => {
        if (Utils.isFunction(onSuccessCallBack)) {
            onSuccessCallBack(data);
        }
    }

    let onRequestError = (data) => {
        if (Utils.isFunction(onErrorCallBack)) {
            onErrorCallBack(data);
        }
    }

    let onRequestTimeOut = (data) => {
        if (Utils.isFunction(onTimeOutCallBack)) {
            onTimeOutCallBack(data);
        }
    }

    cc.LL.HttpMgr.get("http", url, param, {
        onTimeOut: onRequestTimeOut,
        onError: onRequestError,
        onSuccess: onRequestSuccess
    }, 5000, 5);
}; 

module.exports = RequestMgr;