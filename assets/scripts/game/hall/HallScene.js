//大厅逻辑
'use strict'

const utils = require("../../common/utils/utils");
const VV = require("../../VV");

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        //注册event事件
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.JOIN_ROOM, this.joinRoom, this);
    },

    onDestroy () {
        //移除event事件
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.JOIN_ROOM, this.joinRoom, this);
    },

    start () {

    },

    //加入金币场
    joinRoom: function (subKey, callback) {
        //TODO 检查本地是否有强退房间信息 有的话回到之前的房间

        let roomType = cc.VV.gameConfig.ROOM_TYPE.COIN_ROOM;
        cc.VV.roomNetMgr.roomJoin(roomType, subKey, null, (data) => {
            //TODO 存储房间信息
            console.log("***********", cc.VV.roomData);
            cc.VV.roomData.setRoomDataForKey(cc.VV.dataKey.roomKey.roomId, data.roomId);
            cc.VV.roomData.setRoomDataForKey(cc.VV.dataKey.roomKey.roomType, roomType);

            utils.invokeCallback(callback, data);
            //切换场景(在场景内申请roomInfo)
            cc.LL.sceneManager.switchScene(cc.LL.sceneManager.SCENE_NAME.GAME, cc.LL.sceneManager.SCENE_NAME.HALL);
        });
    },

    // update (dt) {},
});
