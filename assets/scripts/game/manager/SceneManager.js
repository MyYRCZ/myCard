let sceneManager = {};

sceneManager.SCENE_NAME = {
    NONE:       "",
    LOADING:    "loading",
    LOGIN:      "login",
    HALL:       "hall",
    GAME:       "game",
    TONGITS:    "tongits"
};

sceneManager.switchScene = function (targetScene, srcScene, callback) {
    console.log("***switch scene***  targetScene = ", targetScene, "   srcScene = ", srcScene);

    //TODO:广播切换场景


    //end
    cc.director.loadScene(targetScene, () => {
        if (callback && typeof callback === "function") {
            callback();
        }
    });
};

sceneManager.preLoadScene = function (targetScene, callback) {
    cc.director.preloadScene(targetScene, () => {
        if (callback && typeof callback === "function") {
            callback();
        }
    });
};

module.exports = sceneManager;