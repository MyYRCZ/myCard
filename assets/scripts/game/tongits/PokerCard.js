'use strict'


cc.Class({
    extends: cc.Component,

    properties: {
        pokerAtlas: cc.SpriteAtlas,
        cardNum: 0,
        isSmallCard: false
    },

    onLoad () {
        this.node.on("init", this.init, this);


        cc.LL.nodeUtil.addTargetNode(this, this.node, [
            "card_back",
            "star",
            "mask",
            "fight"
        ]);
    },

    start () {

    },

    //初始化扑克
    init (cardNum, finish) {
        this.cardNum = cardNum;
        this.node.name = cardNum.toString();

        if (cardNum === -1) {
            this.card_back.active = true;
            if (finish) finish();
            return;
        }

        let pokerName = this.getPokerName(cardNum);
        this.node.getComponent(cc.Sprite).spriteFrame = this.pokerAtlas.getSpriteFrame(pokerName);
    },

    getPokerName (cardNum) {
        let count = cc.VV.poker_util.getCardWeight(cardNum);
        let color = cc.VV.poker_util.getCardColor(cardNum);
        let name = "poker_card_" + color + "_" + count;
        if (this.isSmallCard) {
            name = "small_" + name;
        }
        return name;
    }


});
