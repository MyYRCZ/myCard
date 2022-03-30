'use strict'

cc.Class({
    extends: cc.Component,

    properties: {
        hintLabel: cc.RichText,
        mask: cc.Node,
        speed: 50,
        startX: 0,
        endX: 0
    },

    onLoad () {

    },

    start () {
        this.hintLabel.string = this.showContent(10000);
        this.contentSize = this.hintLabel.node.getBoundingBox();
        this.startX = this.mask.width * this.mask.anchorX;
        this.endX = -this.startX - this.contentSize.width;
        this.hintLabel.node.x = this.startX;
    },

    update (dt) {
        if (this.hintLabel.node.x < this.endX) {
            this.hintLabel.node.x = this.startX;
        }

        this.hintLabel.node.x -= this.speed * dt;
    },

    showContent (coinNum) {
        let startStr = "Since your last game gold field game is not over, your ";
        let endStr = " Gold coins, locked in the gold field.";
        let showStr = startStr + "<color=#F1FF1B>" + coinNum + "</c>" + endStr;
        return showStr;
    }
});
