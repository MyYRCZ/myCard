const HttpMgr = require("./common/http/HttpMgr");
const NativeApi = require("./common/utils/NativeApi");
const sceneManager = require("./game/manager/SceneManager");
const stringUtil = require("./common/utils/StringUtil");
const timerUtil = require("./common/utils/TimerUtil");
const nodeUtil = require("./common/utils/NodeUtil");
const componentUtil = require("./common/utils/ComponentUtil");
const eventUtil = require("./common/utils/EventUtil");
const localStorageUtil = require("./common/utils/LocalStorageUtil");
const netPomelo = require("./common/net/NetPomelo");


let LL = {
    urlLink: "47.105.196.119:56789",
    timeOut: 5000,
    timeOutNum: 3,

    version: "1.1.6",
    resVersion: "1106",

    HttpMgr: HttpMgr,
    stringUtil: stringUtil,
    NativeApi: NativeApi,
    sceneManager: sceneManager,
    timerUtil: timerUtil,
    nodeUtil: nodeUtil,
    componentUtil: componentUtil,
    eventUtil: eventUtil,
    localStorageUtil: localStorageUtil,
    netPomelo: netPomelo,

    init() {
        //切到后台
        cc.game.on(cc.game.EVENT_HIDE, () => {
            cc.VV.gameStateMgr.gameHide();
        });

        //从后台切回
        cc.game.on(cc.game.EVENT_SHOW, () => {
            cc.VV.gameStateMgr.gameShow();
        });
    }
};

cc.LL = module.exports = LL;