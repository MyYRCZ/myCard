let basePanel = cc.Class({
    extends: cc.Component,

    properties: {
        bgNode: cc.Node,
        fromX: 2000,
        toX: 0,
        fromY: 0,
        toY: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("init", this.init, this);
    },

    start () {
        cc.LL.nodeUtil.addNodeOnClick(this, this.node, (event) => {
            this.show(false);
        });
    },

    init () {
        this.show(true);
    },

    show (state) {
        if (!this.bgNode) return;

        if (!state) {
            this.hide();
            return;
        }

        this.bgNode.setPosition(cc.v2(this.fromX, this.fromY));
        if (this.tween) this.tween.stop();
        this.tween = cc.tween(this.bgNode)
            .to(0.2, {position: cc.v2(this.toX, this.toY)})
            .call(() => {
                this.node.active = state;
            })
            .start();
    },

    hide () {
        if (!this.bgNode) return;

        if (this.tween) this.tween.stop();
        this.tween = cc.tween(this.bgNode)
            .to(0.2, {position: cc.v2(this.fromX, this.fromY)})
            .call(() => {
                this.node.active = false;
            })
            .start();
    },


    // update (dt) {},
});
