const Utils = require("../../common/utils/utils");
const RequestMgr = require("../../common/http/RequestMgr");

const httpResponseState = {
    success: 0,
    error: 1,
    timeOut: 2
};

let testHttpMgr = {};

testHttpMgr.httpRequest = function (domain, param, callback) {
    RequestMgr.httpRequest(domain, param, (data) => {
        if (!data) {
            console.log("TestHttpMgr response data error: ", data);
            return;
        }

        //请求成功回调
        let parseData = JSON.parse(data);
        if (parseData.errCode) {
            console.log("errCode = " + parseData.errCode + "errMsg = " + parseData.errMsg);
            Utils.invokeCallback(callback, parseData.data, httpResponseState.error, parseData.errCode, parseData.errMsg);

            let errStr = parseData.errCode.toString();
            if (errStr) {
                console.log("errCode: ", errStr);
            }
            return;
        }
        Utils.invokeCallback(callback, parseData.data, httpResponseState.success, parseData.errCode);
    }, (data) => {
        //请求错误回调
        console.warn("HttpRequest error: ", param, data);
        let parseData = JSON.parse(data);
        Utils.invokeCallback(callback, parseData.data, httpResponseState.error);
    }, (data) => {
        //请求超时回调
        console.warn("HttpRequest time out: ", param, data);
        let parseData = JSON.parse(data);
        Utils.invokeCallback(callback, parseData.data, httpResponseState.timeOut);
    });
};

//联系客服
testHttpMgr.get_contact = function (callback) {
    let domain = "hall";
    let param = {
        p: {
            cmd: "get_contact"
        }
    };

    this.httpRequest(domain, param, (data, isState) => {
        if (isState === 0) {
            Utils.invokeCallback(callback, data);
        }
    });
};

//帮助url
testHttpMgr.getHelpUrl = function (callback) {
    let domain = "hall";
    let param = {
        p: {
            cmd: "get_help_url"
        }
    };
    this.httpRequest(domain, param, (data, isState) => {
        if (isState === 0) {
            Utils.invokeCallback(callback, data);
        }
    });
};

//获取用户信息
testHttpMgr.getUserInfo = function (userId, callback) {
    let domain = "hall";
    let param = {
        p: {
            cmd: "get_user_info",
            userId: userId
        }
    };

    this.httpRequest(domain, param, (data, isState) => {
        if (isState === 0) {
            Utils.invokeCallback(callback, data);
        }
    });
};

//修改用户信息
testHttpMgr.modifyInfo = function (userId, modifyData, callback) {
    let domain = "hall";
    let param = {
        p: {
            cmd: "modify_info",
            userId: userId,
            data: modifyData
        }
    };

    this.httpRequest(domain, param, (data, isState) => {
        if (isState === 0) {
            Utils.invokeCallback(callback, data);
        }
    });
};

//进入大厅
testHttpMgr.entry = function (callback) {
    let osType = cc.LL.NativeApi.getDeviceTypeStr();
    let domain = "hall";
    let param = {
        p: {
            cmd: "entry",
            osType: osType,
            appVer: cc.LL.version,
            resVer: cc.LL.resVersion,
            userId: cc.VV.gameUserInfo.getUserId().toString(),
            token: cc.VV.gameUserInfo.getToken(),
            tokenExpirationTime: cc.VV.gameUserInfo.getTokenExpirationTime(),
            deviceId: cc.LL.NativeApi.getDeviceId()
        }
    };

    console.log("requestEntry param = ", param);
    this.httpRequest(domain, param, (data, isState) => {
        Utils.invokeCallback(callback, data, isState);
    });
};

testHttpMgr.guestLogin = function (callback) {
    let osType = cc.LL.NativeApi.getDeviceTypeStr();
    let domain = "hall";
    let param = {
        p: {
            cmd: "guest_login",
            osType: osType,
            deviceId: cc.LL.NativeApi.getDeviceId()
        }
    };

    this.httpRequest(domain, param, (data, isState) => {
        if (isState === 0) {
            if (!data) {
                console.warn("guest_login response data error. data: ", data);
                return;
            }
            Utils.invokeCallback(callback, data);
        }
    });
};






module.exports = testHttpMgr;
