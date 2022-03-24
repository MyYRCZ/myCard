//tongits 网络层监听和逻辑事件监听

'use strict'

//游戏动作
const GAME_ACTION = {
    ACT_DUMP:         1,      //打牌
    ACT_GET_CARD:     2,      //抓牌
    ACT_PICK_UP:      3,      //捡牌(吃碰)
    ACT_FILL_MELD:    4,      //填充亮出的牌
    ACT_DROP:         5,      //亮牌
    ACT_FIGHT:        6,      //比牌
    ACT_CHALLENGE:    7,      //挑战比牌
    ACT_FOLD:         8,      //放弃比牌
    ACT_TRUST:        9,      //托管
    ACT_CANCEL_TRUST: 10      //取消托管
};

//游戏状态
const GAME_STATE = {
    GS_WAITING:       0,       //等待
    GS_DEAL_CARD:     1,       //发牌
    GS_DUMP:          2,       //打牌
    GS_FIGHTING:      3,       //比牌
    GS_GAME_RESULT:   4,       //游戏结算
    GS_DESTROY:       5        //销毁
};

//比牌状态
const FIGHT_STATE = {
    FS_FIGHTING:      1,        //发起比牌
    FS_CHALLENGE:     2,        //挑战
    FS_FOLD:          3         //弃牌
};

//站起原因
const STAND_UP_REASON = {
    NORMAL:           1,        //正常站起
    TRUST:            2,        //托管站起
    OFFLINE:          3,        //离线站起
    GOLD_MORE:        4,        //金币太多
    GOLD_LESS:        5,        //金币不足
    DIAMOND_LESS:     6         //钻石不足
};

//商店类型
const SHOP_TYPE = {
    GOLD:             0,        //金币
    DIAMOND:          1,        //钻石
    PACKAGE:          2         //礼包
};


cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        
        //-----------------------监听消息(room)-------------------------
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.CREATOR_DIAMOND_NOT_ENOUGH, this.onCreatorDiamondNotEnough, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.SIT_DOWN, this.onSitDown, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.CHANGE_SEAT, this.onChangeSeat, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.STAND_UP, this.onStandUp, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.READY, this.onReady, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.GAME_START, this.onGameStart, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.GPS_REPORT, this.onGpsReport, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.CHAT, this.onChat, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.THROW_PROP, this.onThrowProp, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.ROOM_OVER, this.onRoomOver, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.USER_COIN, this.onUserCoin, this);

        //---------------------监听消息(tongits)-------------------------
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onDealCard, this.onDealCard, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onGetCard, this.onGetCard, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onDumpCard, this.onDumpCard, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onDrop, this.onDrop, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onPickUp, this.onPickUp, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onFillMeld, this.onFillMeld, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onFight, this.onFight, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onChallenge, this.onChallenge, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onFold, this.onFold, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onTrust, this.onTrust, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onCancelTrust, this.onCancelTrust, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onGameResult, this.onGameResult, this);
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onSettle, this.onSettle, this);
    },

    onDestroy () {
        //-----------------------移除监听(room)-------------------------
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.CREATOR_DIAMOND_NOT_ENOUGH, this.onCreatorDiamondNotEnough, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.SIT_DOWN, this.onSitDown, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.CHANGE_SEAT, this.onChangeSeat, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.STAND_UP, this.onStandUp, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.READY, this.onReady, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.GAME_START, this.onGameStart, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.GPS_REPORT, this.onGpsReport, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.CHAT, this.onChat, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.THROW_PROP, this.onThrowProp, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.ROOM_OVER, this.onRoomOver, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.USER_COIN, this.onUserCoin, this);

        //---------------------移除监听(tongits)-------------------------
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onDealCard, this.onDealCard, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onGetCard, this.onGetCard, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onDumpCard, this.onDumpCard, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onDrop, this.onDrop, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onPickUp, this.onPickUp, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onFillMeld, this.onFillMeld, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onFight, this.onFight, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onChallenge, this.onChallenge, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onFold, this.onFold, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onTrust, this.onTrust, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onCancelTrust, this.onCancelTrust, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onGameResult, this.onGameResult, this);
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_TONGITS.onSettle, this.onSettle, this);
    },

    start () {

    },

    //--------------------------------------------room-------------------------------------------
    //房主钻石不足
    onCreatorDiamondNotEnough: function (data) {

    },

    //坐下
    onSitDown: function (data) {

    },

    //换坐
    onChangeSeat: function (data) {

    },

    //站起
    onStandUp: function (data) {

    },

    //准备
    onReady: function (data) {

    },

    //游戏开始
    onGameStart: function (data) {

    },

    //Gps
    onGpsReport: function (data) {

    },

    //聊天
    onChat: function (data) {

    },

    //扔道具
    onThrowProp: function (data) {

    },

    //房间结束
    onRoomOver: function (data) {

    },

    //金币变化
    onUserCoin: function (data) {

    },

    //--------------------------------------------tongits-------------------------------------------

    //发牌
    onDealCard: function (data) {

    },

    //抓牌
    onGetCard: function (data) {

    },

    //打牌
    onDumpCard: function (data) {

    },

    //亮牌
    onDrop: function (data) {

    },

    //捡牌(组合)
    onPickUp: function (data) {

    },

    //补牌
    onFillMeld: function (data) {

    },

    //比牌
    onFight: function (data) {

    },

    //挑战
    onChallenge: function (data) {

    },

    //弃牌
    onFold: function (data) {

    },

    //托管
    onTrust: function (data) {

    },

    //取消托管
    onCancelTrust: function (data) {

    },

    //游戏结算
    onGameResult: function (data) {

    },

    //结束
    onSettle: function (data) {

    },

});
