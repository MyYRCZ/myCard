
cc.Class({
    extends: cc.Component,

    properties: {
        viewPos: 0,
        dropPanelAnimTime: 1.5,
        _logicPos: 0,
        _dropPanelAnimTime: null
    },

    onLoad () {
        cc.LL.eventUiUtil.addEventHandler(cc.VV.eventConfig.EVENT_VIEW.VIEW_ROOM.ROOM_UPDATE_SEAT, this.node, this.roomUpdateSeat, this);

        //-------------------------------------------------------------打牌相关--------------------------------------------------------------
        cc.LL.eventUiUtil.addEventHandler(cc.VV.eventConfig.EVENT_VIEW.VIEW_TONGITS.TONGITS_DEAL_CARD, this.node, this.onDealCard, this);

        cc.LL.nodeUtil.addTargetNode(this, this.node, [
            "seat_ui"
        ]);
    },

    onDestroy () {
        cc.LL.eventUiUtil.removeEventHandler(cc.VV.eventConfig.EVENT_VIEW.VIEW_ROOM.ROOM_UPDATE_SEAT, this.node);
        cc.LL.eventUiUtil.addEventHandler(cc.VV.eventConfig.EVENT_VIEW.VIEW_TONGITS.TONGITS_DEAL_CARD, this.node);
    },

    start () {

    },

    roomUpdateSeat (seat, info) {
        if (!this.isMySeat(seat)) return;
        
        //更新玩家信息
        this.updatePlayerInfo(info);        
    },

    updatePlayerInfo (playerInfo) {
        this.seat_ui.emit("init", playerInfo);
        if (!playerInfo) this.updateCardNum(false);
    },

    updateCardNum (active = true) {
        console.log("viewPos: ", this.viewPos, "not playerInfo");
    },

    isMySeat (seat) {
        if (this.viewPos !== seat) return false;
        return true;
    },

    isNo1Seat (pos) {
        return pos === 1;
    },

    //发牌
    onDealCard (usersCardInfo) {
        console.log("发牌(UI--Seat.js)", usersCardInfo);
        usersCardInfo.forEach((info) => {
            if (!this.isMySeat(info.seat)) return;

            //1号位  生成牌
            if (this.isNo1Seat(info.seat)) {
                cc.LL.eventUiUtil.emitEvent(cc.VV.eventViewConfig.initMyCards, info.cards);
            } else {
                //2 3 号位置 头像上展示牌

            }
        });
    }
});
