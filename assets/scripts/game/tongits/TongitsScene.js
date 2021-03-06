//tongits 网络层监听和逻辑事件监听
const utils = require("../../common/utils/utils");
'use strict'

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
        this.initGame (false);
    },

    initGame: function (isConnectAgain) {
        //申请roomInfo
        let roomId = cc.VV.roomData.getRoomDataForKey(cc.VV.dataKey.roomKey.roomId);
        let roomType = cc.VV.roomData.getRoomDataForKey(cc.VV.dataKey.roomKey.roomType);

        this.getRoomInfo(roomType, roomId, (bSuccess) => {
            if (bSuccess) {
                //TODO 是否有保存的roomInfo

                this.initGameState(isConnectAgain);
                
            } else {
                //申请roomInfo失败
            }
        });

    },

    getRoomInfo: function (roomType, roomId, callback) {
        console.log("getRoomInfo.......");
        cc.VV.roomNetMgr.roomGetInfo(roomType, roomId, (data) => {
            console.log("getRoomInfo = ", data);
            if (data.result !== 0) {
                utils.invokeCallback(callback, data);
                return;
            } 

            //存储房间数据
            cc.VV.roomData.resetUserInfoData();
            cc.VV.roomData.setRoomData(data.roomInfo);

            //设置房间ID
            cc.VV.roomData.setRoomDataForKey(cc.VV.dataKey.roomKey.roomId, roomId);

            //设置用户信息
            let players = data.roomInfo.players;
            for (let key in players) {
                let element = players[key];
                cc.VV.roomData.setPlayerInfo(element);
            }

            //存储游戏信息
            // if (data.gameInfo) {
            //     cc.VV.tongitsData.clearGame();
            //     cc.VV.tongitsData.setGameInfo(data.gameInfo);
            // } else {
            //     //模拟游戏数据初始化
            //     cc.VV.tongitsData.clearGame();
                

            // }


            utils.invokeCallback(callback, data);
        });
    },

    initGameState: function(isConnectAgain) {
        let roomInfo = cc.VV.roomData.getRoomData();
        if (roomInfo) {
            //TODO  判断是不是自建房
            //end

            //通知界面更新
            // let players = cc.VV.roomData.getPlayers();
            // let startData = cc.VV.roomData.getGameStartData();
            // cc.LL.eventUiUtil.emitEvent(cc.VV.eventConfig.EVENT_VIEW.VIEW_ROOM.ROOM_INFO, players, startData, roomInfo);

            let roomPlayers = cc.VV.roomData.getAllPlayerInfo();
            let startData = cc.VV.roomData.getGameStartData();
            // for (let key in roomPlayers) {
            //     let playerInfo = roomPlayers[key];
            //     // let uiSeat = cc.VV.roomData.getPlayerSeatToUiSeat(playerInfo.seat);
            //     let seat = playerInfo.seat;
            // }
            cc.LL.eventUiUtil.emitEvent(cc.VV.eventConfig.EVENT_VIEW.VIEW_ROOM.ROOM_INFO, roomPlayers, startData, roomInfo);
        }
    },

    //--------------------------------------------room-------------------------------------------
    //房主钻石不足
    onCreatorDiamondNotEnough: function (data) {

    },

    //坐下
    onSitDown: function (data) {
        console.log("坐下通知(tongitsScene)", data);
        cc.LL.eventUiUtil.emitEvent(cc.VV.eventConfig.EVENT_VIEW.VIEW_ROOM.ROOM_UPDATE_SEAT, data.userInfo.seat, data.userInfo);
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

        //ui通知
        cc.LL.eventUiUtil.emitEvent(cc.VV.eventConfig.EVENT_VIEW.VIEW_TONGITS.TONGITS_DEAL_CARD, data.usersCardInfo, data.leftCardCount);
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
