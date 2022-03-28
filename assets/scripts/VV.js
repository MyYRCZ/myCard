const gameEnum         = require("./game/data/GameEnum");
const eventConfig      = require("./game/config/eventConfig");
const gameConfig       = require("./game/config/GameConfig");
const gameNetMgr       = require("./common/net/GameNetMgr");
const gameStateMgr     = require("./game/manager/GameStateMgr");
const dataKey          = require("./game/data/DataKey");
const eventViewConfig  = require("./game/config/EventViewConfig");

let VV = {
    num: 4,    
    eventConfig:      eventConfig,
    gameNetMgr:       gameNetMgr,
    gameStateMgr:     gameStateMgr,
    gameConfig:       gameConfig,
    gameEnum:         gameEnum,
    dataKey:          dataKey,
    eventViewConfig:  eventViewConfig,

    init: function () {
        this.testHttpMgr        = require("./game/manager/TestHttpMgr");
        this.gameUserInfo       = require("./game/data/GameUserInfo");
        this.gameConfig         = require("./game/config/GameConfig");
        this.gameEventInterface = require("./game/interface/GameEventInterface");
        this.roomNetMgr         = require("./game/manager/RoomNetMgr");
        this.tongitsNetMgr      = require("./game/manager/TongitsNetMgr");
        this.roomData           = require("./game/data/RoomData").Instance();
        this.tongitsData        = require("./game/data/TongitsData");

        this.gameUserInfo.init();  
        this.gameEventInterface.init();
        this.roomNetMgr.initRoomMsgHandler();
        this.tongitsNetMgr.initGameMsgHandler();
    },

};

cc.VV = module.exports = VV;