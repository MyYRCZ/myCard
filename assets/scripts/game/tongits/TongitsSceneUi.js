


cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        cc.LL.eventUiUtil.addEventHandler(cc.VV.eventConfig.EVENT_VIEW.VIEW_ROOM.ROOM_INFO, this.node, this.roomInfo, this);
    },

    onDestroy () {
        cc.LL.eventUiUtil.removeEventHandler(cc.VV.eventConfig.EVENT_VIEW.VIEW_ROOM.ROOM_INFO, this.node);
    },

    start () {

    },

    roomInfo (players, startData, roomInfo) {
        this.updateAllSeat(players);
    },

    updateAllSeat (players) {
        for (const seat in players) {
            let _seat = players[seat].seat;
            cc.LL.eventUiUtil.emitEvent(cc.VV.eventConfig.EVENT_VIEW.VIEW_ROOM.ROOM_UPDATE_SEAT, _seat, players[seat]);
        }
    }

    // update (dt) {},
});
