/** */

let gameEventInterface = {};

gameEventInterface.init = function () {
    this.addEventHandler();
};

gameEventInterface.addEventHandler = function () {
    cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_GAME.LOGOUT_GAME, this.logoutGame, this);
};

/**登出 */
gameEventInterface.logoutGame = function (callback) {
    console.log("&&&&&&&&&&&&", "断开连接");
    //停止检查连接
    cc.VV.gameNetMgr._stopCheckPomeloConnect();

    //TODO 清除游戏数据

    //断开连接
    cc.LL.netPomelo.closeConnector(() => {
        //清除本地存储
        cc.LL.localStorageUtil.clear();

        //切换场景
        cc.LL.sceneManager.switchScene(cc.LL.sceneManager.SCENE_NAME.LOGIN, cc.LL.sceneManager.SCENE_NAME.HALL, () => {
            
        });
    });
};

module.exports = gameEventInterface;