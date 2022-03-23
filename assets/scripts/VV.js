const eventConfig = require("./game/config/eventConfig");
const gameConfig = require("./game/config/GameConfig");
const gameNetMgr = require("./common/net/GameNetMgr");
const gameStateMgr = require("./game/manager/GameStateMgr");
let VV = {
    num: 4,    
    eventConfig: eventConfig,
    gameNetMgr: gameNetMgr,
    gameStateMgr: gameStateMgr,
    gameConfig: gameConfig,

    init: function () {
        this.testHttpMgr = require("./game/manager/TestHttpMgr");
        this.gameUserInfo = require("./game/data/GameUserInfo");
        this.gameConfig = require("./game/config/GameConfig");
        this.gameEventInterface = require("./game/interface/GameEventInterface");
        this.roomNetMgr = require("./game/manager/RoomNetMgr");
        this.tongitsNetMgr = require("./game/manager/TongitsNetMgr");
        this.gameUserInfo.init();  
        this.gameEventInterface.init();
        this.roomNetMgr.initRoomMsgHandler();
        this.tongitsNetMgr.initGameMsgHandler();
    },

};

cc.VV = module.exports = VV;