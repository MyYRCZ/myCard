var NativeApi = {};

NativeApi.getDeviceTypeStr = function () {
    if (cc.sys.isNative) {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            return "android";
        } else if (cc.sys.os == cc.sys.OS_IOS) {
            return "ios";
        } 
    }
    return "h5";
};

NativeApi.getDeviceId = function () {
    if (cc.sys.isNative && cc.sys.isMobile) {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            var ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getMachineID", "()Ljava/lang/String;");
            cc.log("NativeApi.getDeviceID ret="+ret);
            return ret;
        } else if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("Native", "getDeveice");
        }
    }
    return null;
};

NativeApi.trackEvent = function (eventName, eventKey, eventVal) {

};

NativeApi.eventHideGame = function () {
    this.trackEvent("hide_game", "", "0");
};

NativeApi.eventShowGame = function () {
    this.trackEvent("show_game", "", "0");
};



module.exports = NativeApi;