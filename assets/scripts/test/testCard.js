
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        this.node.on("startBeat", this.onStartBeat, this);
    },

    start () {

    },

    onStartBeat() {
        this.beatAnim = cc.tween(this.node)
            .to(0.15, {position: cc.v2(this.node.x, 25)})
            .delay(0.1)
            .to(0.15, {position: cc.v2(this.node.x, 0)})
            .start();
    },
});
