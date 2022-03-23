require("../3rd/pomelo-creator-client");
const utils = require("../utils/utils");

cc.pomeloGate = new cc.Pomelo();
cc.pomeloConnector = new cc.Pomelo();

let netPomelo = {};

const gateEventList = [];
const gateMsgList = [
    "gate.gateHandler.queryEntry"
];

netPomelo.initGate = function (host, port, callback, pomeloCallback) {
    this.init(cc.pomeloGate, host, port, callback, pomeloCallback);
};

netPomelo.initConnector = function (host, port, callback, pomeloCallback) {
    this.init(cc.pomeloConnector, host, port, callback, pomeloCallback);
};

netPomelo.init = function (pomelo, host, port, callback, pomeloCallback) {
    let options = {
        host: host,
        port: port,
        log: true
    };

    pomelo.on("close", (data) => {
        utils.invokeCallback(pomeloCallback, "close", data);
    });

    pomelo.on("disconnect", (data) => {
        utils.invokeCallback(pomeloCallback, "disconnect", data);
    });

    pomelo.on("error", (data) => {
        utils.invokeCallback(pomeloCallback, "error", data);
    });

    pomelo.on("io-error", (data) => {
        utils.invokeCallback(pomeloCallback, "io-error", data);
    });

    pomelo.on("reconnect", (data) => {
        utils.invokeCallback(pomeloCallback, "reconnect", data);
    });

    pomelo.on("onProtocol", (data) => {
        utils.invokeCallback(pomeloCallback, "onProtocol", data);
    });

    pomelo.on("heartbeat timeout", (data) => {
        utils.invokeCallback(pomeloCallback, "heartbeat timeout", data);
        pomelo.disconnect();
    });

    pomelo.on("onKick", (data) => {
        utils.invokeCallback(pomeloCallback, "onKick", data);
        pomelo.disconnect();
    });

    //初始化pomelo
    pomelo.init(options, (socket) => {
        console.log("init return");
        utils.invokeCallback(callback, !!socket);
    });
};

//发送消息
netPomelo.send = function(route, params, callback) {
    if (!route) {
        return;
    }

    let p = cc.pomeloConnector;
    if (gateMsgList.indexOf(route) >= 0) {
        p = cc.pomeloGate;
    }

    p.request(route, params, (data) => {
        if (callback) {
            let status = data.code || data.result;
            callback(status, data);
        }
    });
};

//在连接上添加事件监听
netPomelo.addEventHandler = function (route, handler) {
    if (!route) return;

    let p = cc.pomeloConnector;
    if (gateEventList.indexOf(route) >= 0) {
        p = cc.pomeloGate;
    }

    if (handler && typeof(handler) === "function") {
        p.on(route, handler);
    }
};

//从连接上移除事件监听
netPomelo.removeEventHandler = function (route) {
    if (!route) return;

    let p = cc.pomeloConnector;
    if (gateEventList.indexOf(route) >= 0) {
        p = cc.pomeloGate;
    }

    p.removeEventListener(route);
};

netPomelo.closeGate = function (callback) {
    cc.pomeloGate.disconnect(callback);
};

netPomelo.closeConnector = function (callback) {
    cc.pomeloConnector.disconnect(callback);
};

netPomelo.closeAll = function (callback) {
    this.closeGate();
    this.closeConnector();
};

module.exports = netPomelo;


