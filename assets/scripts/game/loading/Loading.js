cc.Class({
    extends: cc.Component,

    properties: {
        progressBar: cc.ProgressBar,
        progressBarIconNode: cc.Node
    },

    onLoad () {
        this.isProgress = true;
        this.progressBarIcon = this.progressBarIconNode.getComponent(cc.Widget);
    },

    start () {

    },

    update (dt) {
        if (this.progressBar && this.isProgress) {
            this.progressBar.progress += dt;
            if (this.progressBar.progress >= 1) {
                this.progressBar.progress = 1;
                this.switchScene();
                this.isProgress = false;
            }

            this.progressBarIcon.updateAlignment();
        }
    },

    switchScene () {
        //初始化全局数据在热更新后
        cc.LL.init();
        cc.VV.init();

        cc.LL.sceneManager.preLoadScene(cc.LL.sceneManager.SCENE_NAME.LOGIN, () => {
            cc.LL.sceneManager.switchScene(cc.LL.sceneManager.SCENE_NAME.LOGIN, cc.LL.sceneManager.SCENE_NAME.LOADING);
        });
    },
});
