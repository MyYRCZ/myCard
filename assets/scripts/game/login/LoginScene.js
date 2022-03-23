cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        cc.LL.eventUtil.eventOn(cc.VV.eventConfig.EVENT_NET.EVENT_LOGIN, this.onBtnClickGuest, this);          //监听游客登录事件
    },

    onDestroy () {
        cc.LL.eventUtil.eventOff(cc.VV.eventConfig.EVENT_NET.EVENT_LOGIN, this.onBtnClickGuest, this);         //移除监听游客登录
    },

    start () {

    },

    onBtnClickGuest () {
        cc.VV.testHttpMgr.guestLogin(this.guestLoginCallback.bind(this));
    },

    guestLoginCallback (data) {
        console.log("guess login -> data = ", data);
        this._setLoginGameUserInfo(data);
        this._setLoginGameUserInfoToLocalStorage(data);
        this.requestEntry();
    },

    /**设置登录游戏数据 */
    _setLoginGameUserInfo (userInfo) {
        console.log("set userInfo data = ", JSON.stringify(userInfo));

        cc.VV.gameUserInfo.setUserId(userInfo.userId);
        cc.VV.gameUserInfo.setToken(userInfo.token);
        cc.VV.gameUserInfo.setTokenExpirationTime(userInfo.tokenExpirationTime);
        cc.VV.gameUserInfo.setLoginType(userInfo.loginType);
    },

    /**设置登录游戏数据到本地 */
    _setLoginGameUserInfoToLocalStorage (userInfo) {
        cc.LL.localStorageUtil.setItemValue("loginData", JSON.stringify({
            userId: userInfo.userId,
            token: userInfo.token,
            tokenExpirationTime: userInfo.tokenExpirationTime,
            loginType: userInfo.loginType || 0
        }));
    },

    /**从本地存储获得登录数据 */
    _getLoginDataFromLocalStorage () {
        let dataString = cc.LL.localStorageUtil.getItem("loginData");
        console.log("goto game by guest data string = ", dataString);

        let dataObject = null;
        if (dataString) {
            try {
                dataObject = JSON.parse(dataString);
            } catch(e) {
                console.error("invalid dataString format.");
            }
        }
        return dataObject;
    },

    /**更新登录数据到本地存储 */
    _updateLoginDataToLocalStorage (userInfo) {
        let loginParams = this._getLoginDataFromLocalStorage() || {};
        for (let k in userInfo) {
            loginParams[k] = userInfo[k];
        }

        cc.LL.localStorageUtil.setItemValue("loginData", JSON.stringify(loginParams));
    },

    /**进入大厅 */
    requestEntry () {
        cc.VV.testHttpMgr.entry((entryData, isState) => {
            if (isState === 0) {
                if (entryData) {
                    //设置大厅数据
                    cc.VV.gameUserInfo.setEntryData(entryData);

                    //大厅 config
                    let hallSetting = entryData["hallSetting"];
                    if (hallSetting) {
                        //TODO 大厅数据
                        cc.VV.gameConfig.hallConfig.setHallSetting(hallSetting);

                    }

                }

                if (entryData.newLoginData) {
                    this._updateLoginDataToLocalStorage(entryData.newLoginData);
                }

                //创建websocket连接
                cc.VV.gameNetMgr.initPomelo((bSuccess, data) => {
                    if (bSuccess) {
                        console.log("initPomelo success!!!", data);

                        let isReconnectGame = ("roomId" in data);
                        if (isReconnectGame) {
                            //TODO有正在进行游戏的房间直接切到正在进行游戏的房间

                        } else {
                            //TODO没有正在进行的游戏直接切换大厅场景
                            cc.LL.sceneManager.switchScene(cc.LL.sceneManager.SCENE_NAME.HALL, cc.LL.sceneManager.SCENE_NAME.LOGIN);
                        }

                    } else {
                        console.log("login initPomelo fail!!!");
                    }
                }, (bSuccess, errCallback) => {
                    if (bSuccess) {

                    } else {

                    }
                    //隐藏正在连接
                });
            } else {
                //隐藏正在连接
            }
        });
    },

    //切换场景
    switchScene () {
        cc.LL.sceneManager.switchScene(cc.LL.sceneManager.SCENE_NAME.HALL, cc.LL.sceneManager.SCENE_NAME.LOGIN);
    },

    // update (dt) {},
});
