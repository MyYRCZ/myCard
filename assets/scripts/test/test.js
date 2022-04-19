'use strict'

cc.Class({
    extends: cc.Component,

    properties: {
        cardPrefab: cc.Prefab
    },

    onLoad() {
        cc.LL.nodeUtil.addButtonOnClickWithArray(this, this.node, [
            "bg/btn_start"
        ], this.onBtnCallBack.bind(this));

        cc.LL.nodeUtil.addTargetNode(this, this.node, [
            "title1",
            "title2",
            "title3",
            "title4",
        ]);
    },

    onBtnCallBack(event) {
        if (event.node.name === "btn_start") {
            this.onStart(this.title1.getChildByName("title"));
            this.onStart(this.title2.getChildByName("title"));
            this.onStart(this.title3.getChildByName("title"));
            this.onStart(this.title4.getChildByName("title"));
        }
    },

    onStart(testNode) {
        testNode.removeAllChildren();
        testNode.parent.getChildByName("bg").active = false;
        testNode.parent.getChildByName("bg").getChildByName("triming_label").active = false;
        testNode.parent.getChildByName("bg").getChildByName("trim_success_label").active = false;
        cc.LL.timerUtil.setTimeOutRepeat(0.1, 12, testNode, () => {
            let item = cc.instantiate(this.cardPrefab);
            testNode.addChild(item);
        }, () => {
            console.log("完成");
            testNode.parent.getChildByName("bg").active = true;
            testNode.parent.getChildByName("bg").getChildByName("triming_label").active = true;
            this.beatAnim(testNode, 5);
        });
    },

    beatAnim(testNode, limitNum) {
        if (limitNum <= 0) {
            testNode.parent.getChildByName("bg").getChildByName("triming_label").active = false;
            testNode.parent.getChildByName("bg").getChildByName("trim_success_label").active = true;
            return;
        }

        let children = testNode.children;
        let num = 0;
        cc.LL.timerUtil.setTimeOutRepeat(0.15, children.length, testNode, () => {
            children[num].emit("startBeat");
            num++;
        }, () => {
            console.log("动作完成");
            limitNum--;
            return this.beatAnim(testNode, limitNum);
        });
    },

    test1(num) {
        console.log(num);
    },



    start() {

    },
});
