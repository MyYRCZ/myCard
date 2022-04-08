'use strict'

cc.Class({
    extends: cc.Component,

    properties: {
        cardPrefab: cc.Prefab
    },

    onLoad () {
        cc.LL.nodeUtil.addButtonOnClickWithArray(this, this.node, [
            "bg/btn_start"
        ], this.onBtnCallBack.bind(this));

        cc.LL.nodeUtil.addTargetNode(this, this.node, [
            "title"
        ]);
    },

    onBtnCallBack (event) {
        if (event.node.name === "btn_start") {
            this.onStart();
        }
    },

    onStart () {
        this.title.removeAllChildren();
        cc.LL.timerUtil.setTimeOutRepeat(0.1, 12, this.title, () => {
            let item = cc.instantiate(this.cardPrefab);
            this.title.addChild(item);
        }, () => {
            console.log("完成");
            let children = this.title.children;
            let num = 0;
            cc.LL.timerUtil.setTimeOutRepeat(0.15, children.length, this.title, () => {
                children[num].emit("startBeat");
                num++;
            }, () => {

            });
        });
    },

    titleSetLayout () {
        // this.layout = this.title.getComponent(cc.Layout).spacing = 
    },



    start () {

    },
});
