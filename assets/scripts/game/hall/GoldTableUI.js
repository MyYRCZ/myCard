'use strict'

cc.Class({
    extends: cc.Component,

    properties: {
        callback: null,
        data: null
    },

    onLoad () {
        this.node.on("init", this.init, this);

        cc.LL.componentUtil.addUiTargetComponent(this, this.node, {
            Label: [
                "gold_label"
            ]
        });

        cc.LL.nodeUtil.addNodeOnClick(this, this.node, (event) => {
            if (this.callback) this.callback(this.data.subKey);
        });
    },

    start () {

    },

    init (data, callback) {
        this.data = data;
        this.callback = callback;
        this.Label_gold_label.string = data.basicScore;
    },

    // update (dt) {},
});
