'use strict'
const utils = require("./../../common/utils/utils");
//房间网络层

let roomNetMgr = {};

roomNetMgr.sendMsg = function (route, params, callback) {

    console.log("sendMsg-->params", route, params);

    cc.VV.gameNetMgr.send(route, params, (status, data) => {
        if (status === 0) {
            console.log(route, "sendMsg-resp->data = ", data);
        } else {
           // let errorStr = cc.VV.gameConfig.getErrorStr(status.toString());
           // console.warn(route, "sendMsg fail", errorStr);
        }

        utils.invokeCallback(callback, data, status);
    });
};

//加入房间
roomNetMgr.roomJoin = function (roomType, subKey, roomId, callback) {
    let route = roomType + ".roomHandler.join";
    let params = {};
    if (roomId) {
        params.roomId = roomId;
    }

    if (subKey) {
        params.subKey = subKey;
    }

    this.sendMsg(route, params, (data, status) => {
        if (status != 0) {
            //TODO 提示
        }
        utils.invokeCallback(callback, data);
    });
};


//-----------------------------服务器推送消息协议(push)------------------------------
//房主钻石不足
roomNetMgr.onCreatorDiamondNotEnough = function (data) {
    
};

//坐下通知[通]
roomNetMgr.onSitDown = function (data) {
    console.log("坐下", data);
};

//换座通知[通]
roomNetMgr.onChangeSeat = function (data) {
    console.log("换座", data);
};

//站起通知[通]
roomNetMgr.onStandUp = function (data) {
    console.log("站起通知", data);
};

//准备通知[通]
roomNetMgr.onReady = function (data) {
    console.log("准备通知", data);
};

//游戏开始通知
roomNetMgr.onGameStart = function (data) {
    console.log("游戏开始通知", data);
};

//gps通知[通]
roomNetMgr.onGpsReport = function (data) {
    console.log("gps通知", data);
};

//聊天通知[通]
roomNetMgr.onChat = function (data) {
    console.log("聊天通知", data);
};

//扔道具通知[通]
roomNetMgr.onThrowProp = function (data) {
    console.log("扔道具通知", data);
};

//房间结束通知[通]
roomNetMgr.onRoomOver = function (data) {
    console.log("房间结束通知", data);
};

//金币变化通知[通]
roomNetMgr.onUserCoin = function (data) {
    console.log("金币变化通知", data);
};

//钻石变化通知[通]
roomNetMgr.onUserDiamond = function (data) {
    console.log("钻石变化通知", data);
};



//--------------------------------监听服务器推送消息----------------------------------
roomNetMgr.initRoomMsgHandler = function () {
    this.removeRoomMsgHandler();
    cc.VV.gameNetMgr.addEventHandler("push.onCreatorDiamondNotEnough", this.onCreatorDiamondNotEnough.bind(this));
    cc.VV.gameNetMgr.addEventHandler("push.onSitDown", this.onSitDown.bind(this));
    cc.VV.gameNetMgr.addEventHandler("push.onChangeSeat", this.onChangeSeat.bind(this));
    cc.VV.gameNetMgr.addEventHandler("push.onStandUp", this.onStandUp.bind(this));
    cc.VV.gameNetMgr.addEventHandler("push.onReady", this.onReady.bind(this));
    cc.VV.gameNetMgr.addEventHandler("push.onGameStart", this.onGameStart.bind(this));
    cc.VV.gameNetMgr.addEventHandler("push.onGpsReport", this.onGpsReport.bind(this));
    cc.VV.gameNetMgr.addEventHandler("push.onChat", this.onChat.bind(this));
    cc.VV.gameNetMgr.addEventHandler("push.onThrowProp", this.onThrowProp.bind(this));
    cc.VV.gameNetMgr.addEventHandler("push.onRoomOver", this.onRoomOver.bind(this));
    cc.VV.gameNetMgr.addEventHandler("push.onUserCoin", this.onUserCoin.bind(this));
    cc.VV.gameNetMgr.addEventHandler("push.onUserDiamond", this.onUserDiamond.bind(this));
};

roomNetMgr.removeRoomMsgHandler = function () {
    cc.VV.gameNetMgr.removeEventHandler("push.onCreatorDiamondNotEnough");
    cc.VV.gameNetMgr.removeEventHandler("push.onSitDown");
    cc.VV.gameNetMgr.removeEventHandler("push.onChangeSeat");
    cc.VV.gameNetMgr.removeEventHandler("push.onStandUp");
    cc.VV.gameNetMgr.removeEventHandler("push.onReady");
    cc.VV.gameNetMgr.removeEventHandler("push.onGameStart");
    cc.VV.gameNetMgr.removeEventHandler("push.onGpsReport");
    cc.VV.gameNetMgr.removeEventHandler("push.onChat");
    cc.VV.gameNetMgr.removeEventHandler("push.onThrowProp");
    cc.VV.gameNetMgr.removeEventHandler("push.onRoomOver");
    cc.VV.gameNetMgr.removeEventHandler("push.onUserCoin");
    cc.VV.gameNetMgr.removeEventHandler("push.onUserDiamond");
};

module.exports = roomNetMgr;