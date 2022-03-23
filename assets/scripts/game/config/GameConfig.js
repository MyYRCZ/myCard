module.exports = {
    ROOM_TYPE: {
        CARD_ROOM: "room",       //房卡房间
        COIN_ROOM: "droom",      //金币分配
        MATCH_ROOM: "mroom"      //比赛房间
    },

    hallConfig: require("./HallConfig"),

    getRoomConfig: function () {
        return this.hallConfig.getRoomConfig();
    },

    getErrorStr: function () {
        
    }
};
