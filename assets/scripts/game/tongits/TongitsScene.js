'use strict'


cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.SIT_DOWN, this.onSitDown, this);
    },

    onDestroy () {
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.SIT_DOWN, this.onSitDown, this);
    },

    start () {

    },

    onSitDown: function (data) {
        
    },

    // update (dt) {},
});
