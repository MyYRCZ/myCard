//Tongits 通讯层逻辑

const utils = require("../../common/utils/utils");
let tongitsNetMgr = {};

tongitsNetMgr.sendMsg = function (route, params, callback) {
    console.log("sendMsg-->params", route, params);

    cc.VV.gameNetMgr.send(route, params, (status, data) => {
        if (status === 0) {
            console.log(route, " sendMsg resp--> data = ", data);
        } else {
            // let errorStr = cc.VV.gameConfig.getErrorStr(status.toString());
            // console.warn(route + " sendMsg fail ", errorStr);
        }

        utils.invokeCallback(callback, data, status);
    });
};

//------------------------------游戏操作(request)------------------------------




//---------------------------服务器推送消息协议(push)---------------------------

//发牌通知
tongitsNetMgr.onDealCard = function (data) {
    console.log("发牌通知--tongitsNetMgr.onDealCard", data);
};

//抓牌通知
tongitsNetMgr.onGetCard = function (data) {
    console.log("抓牌通知--tongitsNetMgr.onGetCard", data);
};

//打牌通知
tongitsNetMgr.onDumpCard = function (data) {
    console.log("打牌通知--tongitsNetMgr.onDumpCard", data);
};

//亮牌通知
tongitsNetMgr.onDrop = function (data) {
    console.log("亮牌通知--tongitsNetMgr.onDrop", data);
};

//捡最后打的牌组合通知
tongitsNetMgr.onPickUp = function (data) {
    console.log("捡最后打的牌组合通知--tongitsNetMgr.onPickUp", data);
};

//补牌通知
tongitsNetMgr.onFillMeld = function (data) {
    console.log("补牌通知--tongitsNetMgr.onFillMeld", data);
};

//比牌通知
tongitsNetMgr.onFight = function (data) {
    console.log("比牌通知--tongitsNetMgr.onFight", data);
};

//挑战通知
tongitsNetMgr.onChallenge = function (data) {
    console.log("挑战通知--tongitsNetMgr.onChallenge", data);
};

//弃牌通知
tongitsNetMgr.onFold = function (data) {
    console.log("弃牌通知--tongitsNetMgr.onFold", data);
};

//托管通知
tongitsNetMgr.onTrust = function (data) {
    console.log("托管通知--tongitsNetMgr.onTrust", data);
};

//取消托管通知
tongitsNetMgr.onCancelTrust = function (data) {
    console.log("取消托管通知--tongitsNetMgr.onCancelTrust", data);
};

//结束通知
tongitsNetMgr.onSettle = function (data) {
    console.log("结束通知--tongitsNetMgr.onSettle", data);
};

//结算通知
tongitsNetMgr.onGameResult = function (data) {
    console.log("结算通知--tongitsNetMgr.onGameResult", data);
};

//跑马灯通知
tongitsNetMgr.onNoticeByUids = function (data) {

};

//跑马灯通知
tongitsNetMgr.onNotice = function (data) {

};


//--------------------------监听服务器推送消息-------------------------
tongitsNetMgr.initGameMsgHandler = function () {
    this.removeGameMsgHandler();
    cc.VV.gameNetMgr.addEventHandler("tongits.onDealCard", this.onDealCard.bind(this));
    cc.VV.gameNetMgr.addEventHandler("tongits.onGetCard", this.onGetCard.bind(this));
    cc.VV.gameNetMgr.addEventHandler("tongits.onDumpCard", this.onDumpCard.bind(this));
    cc.VV.gameNetMgr.addEventHandler("tongits.onDrop", this.onDrop.bind(this));
    cc.VV.gameNetMgr.addEventHandler("tongits.onPickUp", this.onPickUp.bind(this));
    cc.VV.gameNetMgr.addEventHandler("tongits.onFillMeld", this.onFillMeld.bind(this));
    cc.VV.gameNetMgr.addEventHandler("tongits.onFight", this.onFight.bind(this));
    cc.VV.gameNetMgr.addEventHandler("tongits.onChallenge", this.onChallenge.bind(this));
    cc.VV.gameNetMgr.addEventHandler("tongits.onFold", this.onFold.bind(this));
    cc.VV.gameNetMgr.addEventHandler("tongits.onTrust", this.onTrust.bind(this));
    cc.VV.gameNetMgr.addEventHandler("tongits.onCancelTrust", this.onCancelTrust.bind(this));
    cc.VV.gameNetMgr.addEventHandler("push.onSettle", this.onSettle.bind(this));
    cc.VV.gameNetMgr.addEventHandler("push.onGameResult", this.onGameResult.bind(this));

    cc.VV.gameNetMgr.addEventHandler("connector.entry.onNoticeByUids", this.onNoticeByUids.bind(this));
    cc.VV.gameNetMgr.addEventHandler("connector.entry.onNotice", this.onNotice.bind(this));
};

tongitsNetMgr.removeGameMsgHandler = function () {
    cc.VV.gameNetMgr.removeEventHandler("tongits.onDealCard");
    cc.VV.gameNetMgr.removeEventHandler("tongits.onGetCard");
    cc.VV.gameNetMgr.removeEventHandler("tongits.onDumpCard");
    cc.VV.gameNetMgr.removeEventHandler("tongits.onDrop");
    cc.VV.gameNetMgr.removeEventHandler("tongits.onPickUp");
    cc.VV.gameNetMgr.removeEventHandler("tongits.onFillMeld");
    cc.VV.gameNetMgr.removeEventHandler("tongits.onFight");
    cc.VV.gameNetMgr.removeEventHandler("tongits.onChallenge");
    cc.VV.gameNetMgr.removeEventHandler("tongits.onFold");
    cc.VV.gameNetMgr.removeEventHandler("tongits.onTrust");
    cc.VV.gameNetMgr.removeEventHandler("tongits.onCancelTrust");
    cc.VV.gameNetMgr.removeEventHandler("push.onSettle");
    cc.VV.gameNetMgr.removeEventHandler("push.onGameResult");

    cc.VV.gameNetMgr.removeEventHandler("connector.entry.onNoticeByUids");
    cc.VV.gameNetMgr.removeEventHandler("connector.entry.onNotice");
};

module.exports = tongitsNetMgr;