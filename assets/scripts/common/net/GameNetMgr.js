let utils = require("../utils/utils");

let gameNetMgr = {};

const CONN_STATE = {
    DISCONNECT: 0,
    CONNECTING: 1,
    CONNECTED: 2
};

gameNetMgr._connectorHost = null;
gameNetMgr._connectorPort = null;
gameNetMgr._checkInterval = null;
gameNetMgr._connState = CONN_STATE.DISCONNECT;

/**初始化Pomelo */
gameNetMgr.initPomelo = function (callback, errCallback) {
    let self = this;

    if (self._connState === CONN_STATE.CONNECTED) {
        console.log("init pomelo had connected");
        return utils.invokeCallback(callback, true, {});
    }

    let serverArray = cc.VV.gameConfig.hallConfig.getServerArray();
    if (!(Array.isArray(serverArray) && serverArray.length > 0)) {
        console.error("invalid serverArray:", serverArray);
        return utils.invokeCallback(errCallback, false);
    }

    let gateHost = serverArray[0]["ip"];
    let gatePost = serverArray[0]["port"];

    console.log("init gate connect, ip/port = " + gateHost + "/" + gatePost);
    cc.LL.netPomelo.initGate(gateHost, gatePost, (bOk) => {
        console.log("init gate return: ", bOk);
        if (!bOk) {
            console.error("init gate connect failed. ip/port = " + gateHost + "/" + gatePost);
            return utils.invokeCallback(errCallback, false);
        }

        cc.LL.netPomelo.send("gate.gateHandler.queryEntry", {
            uid: cc.VV.gameUserInfo.getUserId()
        }, (error, data) => {
            if (error) {
                console.error("query connector data failed.error: ", error);
                return utils.invokeCallback(errCallback, false);
            }

            console.log("query connector address return: ", data.host, + "/" + data.port);
            self._connectorHost = data.host;
            self._connectorPort = data.port;

            cc.LL.netPomelo.closeGate();
            self._connectPomelo(callback);
        });
    }, (eventData) => {
        console.log("gate server eventData = ", eventData);
        if (eventData === "io-error") {
            utils.invokeCallback(errCallback, false);
        }
    });
};

gameNetMgr._connectPomelo = function (callback) {
    let self = this;

    console.log("connect pomelo...");
    if (self._connState === CONN_STATE.CONNECTED) {
        console.log("pomelo had connected");
        self._connectEntry(callback);
        return;
    }

    if (self._connState === CONN_STATE.CONNECTING) {
        //正在连接不回调 在真正连接结果中回调
        console.log("pomelo in connecting...");
        return;
    }

    self._connState = CONN_STATE.CONNECTING;

    cc.LL.netPomelo.initConnector(self._connectorHost, self._connectorPort, (bSuccess) => {
        console.log("connect pomelo return : ", bSuccess);
        if (!bSuccess) {
            console.error("connect failed. ip/port = " + self._connectorHost + "/" + self._connectorPort);
            self._connState = CONN_STATE.DISCONNECT;
            return utils.invokeCallback(callback, false);
        }

        self._connState = CONN_STATE.CONNECTED;
        self._connectEntry(callback);
    }, (eventType) => {
        console.log("connector server eventType = ", eventType);

        if (eventType === "disconnect") {
            self._connState = CONN_STATE.DISCONNECT;
        } else if (eventType === "onKick") {
            cc.LL.eventUtil.eventEmit(cc.VV.eventConfig.EVENT_NET.EVENT_GAME.ON_KICK);
        } else if (eventType === "heartbeat timeout") {
            cc.LL.eventUtil.eventEmit(cc.VV.eventConfig.EVENT_NET.EVENT_GAME.CLOSE_CONNECTOR);
        }
    });
};

gameNetMgr._connectEntry = function (callback) {
    let param = {};
    param.uid = cc.VV.gameUserInfo.getUserId();
    param.token = cc.VV.gameUserInfo.getToken();
    param.tokenExpirationTime = cc.VV.gameUserInfo.getTokenExpirationTime();
    param.loginType = 1;
    param.deviceId = cc.LL.NativeApi.getDeviceId() || "";

    console.log("connector.entryHandler.entry", param);

    cc.LL.netPomelo.send("connector.entryHandler.entry", param, (error, data) => {
        if (error) {
            console.log("connector.entryHandler.entry, error = ", error, "data = ", data);
            return utils.invokeCallback(callback, false, data);
        } 

        this._startCheckPomeloConnectTimer();
        console.log("connector.entryHandler.entry success data = ", data);
        utils.invokeCallback(callback, true, data);
    });
};

//entry connector 成功后定时检查连接状态
gameNetMgr._startCheckPomeloConnectTimer = function () {
    if (this._checkInterval) {
        return;
    }

    this._checkInterval = setInterval(() => {
        console.log("-----------check pomelo connect---------");
        this.checkPomeloConnect();
    }, 5000);
};

gameNetMgr._stopCheckPomeloConnect = function () {
    if (this._checkInterval) {
        clearInterval(this._checkInterval);
        this._checkInterval = null;
    }
};

gameNetMgr.checkPomeloConnect = function () {
    let isGameHide = cc.VV.gameStateMgr.getIsGameHide();

    if (isGameHide) {
        //如果是且后台则不重连
        return;
    }

    if (this._connState !== CONN_STATE.DISCONNECT) {
        return;
    }

    //之前连接成功过才会有定时检查
    if (!this._checkInterval) {
        return;
    }

    console.log("checkPomeloConnect---已经断开连接---");

    //断线重连
    cc.LL.eventUtil.eventEmit(cc.VV.eventConfig.EVENT_NET.EVENT_GAME.RECONNECT_GAME);
};

gameNetMgr.send = function (route, params, callback) {
    if (this._connState !== CONN_STATE.CONNECTED) {
        console.log("send failed. disconnect");
        return this.checkPomeloConnect();
    }

    cc.LL.netPomelo.send(route, params, (status, data) => {
        if (callback && typeof(callback) === "function") {
            callback(status, data);
        }
    });
};

gameNetMgr.addEventHandler = function (router, callback) {
    if (!router) {
        return;
    }

    if (typeof(callback) === "function") {
        cc.LL.netPomelo.addEventHandler(router, callback);
    }
};

gameNetMgr.removeEventHandler = function (router) {
    if (!router) {
        return;
    }

    cc.LL.netPomelo.removeEventHandler(router);
};

gameNetMgr.logout = function () {
    this._stopCheckPomeloConnect();
    cc.LL.netPomelo.closeConnector(() => {
        console.log("logout clear local storage");
        cc.LL.localStorageUtil.clear();
        cc.LL.NativeApi.logOutFacebook();

        //TODO 注销facebook

        //TODO 切换场景
    });
};

module.exports = gameNetMgr;
