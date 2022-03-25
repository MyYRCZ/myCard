const GAME_STATE = {
    GS_WAITING: 0,
    GS_DEAL_CARD: 1,       //发牌
    GS_DUMP: 2,            //打牌
    GS_FIGHTING: 3,        //pk/挑战
    GS_GAME_RESULT: 4,     //单局游戏结束
    GS_DESTROY: 5          //游戏已销毁
};

let gameStateMgr = {};
gameStateMgr._isGameHide = false;
// gameStateMgr.gameState = GAME_STATE.GS_WAITING;
// console.log("********", cc.VV.gameEnum.GAME_STATE);
// gameStateMgr.gameState = cc.VV.gameEnum.GAME_STATE.GS_WAITING;

gameStateMgr.getIsGameHide = function () {
    return this._isGameHide;
};

gameStateMgr.gameHide = function () {
    console.warn("---------game hide---------");
    cc.LL.NativeApi.eventHideGame();
    this._isGameHide = true;
    let scene = cc.director.getScene();
    if (scene.name == cc.LL.sceneManager.SCENE_NAME.GAME) {
        cc.LL.netPomelo.closeConnector();
        cc.LL.eventUtil.eventEmit(cc.VV.eventConfig.EVENT_NET.EVENT_GAME.CLOSE_CONNECTOR);
    }
};

gameStateMgr.gameShow = function () {
    console.warn("-------------game show------------");
    cc.LL.NativeApi.eventShowGame();
    this._isGameHide = false;
    cc.VV.gameNetMgr.checkPomeloConnect();

    cc.LL.eventUtil.eventEmit(cc.VV.eventConfig.EVENT_NET.EVENT_GAME.GAME_SHOW);
};

gameStateMgr.gameDisConnect = function (state) {

};

gameStateMgr.setGameState = function(state) {
    this.gameState = state;
};

gameStateMgr.getGameState = function() {
    return this.gameState;
};

gameStateMgr.canTakeOutCard = function () {
    if (this.gameState == GAME_STATE.GS_DUMP) {
        return true;
    }

    return false;
};

module.exports = gameStateMgr;