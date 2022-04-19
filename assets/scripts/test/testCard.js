
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
        let beatAnim = cc.tween(this.node)
            .to(0.15, {position: cc.v2(this.node.x, 25)})
            .delay(0.1)
            .to(0.15, {position: cc.v2(this.node.x, 0)})
            .start();

        // this.anim = cc.tween(this.node)
        //     .repeat(5, beatAnim)
        //     .start();
    },
});
