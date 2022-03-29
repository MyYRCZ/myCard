'use strict'

cc.Class({
    extends: cc.Component,

    properties: {
        
        cardPrefab: cc.Prefab,
        dealCardDur: 0.2,
        pokerSpaceX: -50,

        isMovingCard: null,
        isTouch: false,
        //托管状态
        _isTrust: false
    },

    onLoad () {
        cc.LL.eventUiUtil.addEventHandler(cc.VV.eventViewConfig.initMyCards, this.node, this.initMyCards, this);

        cc.LL.nodeUtil.addTargetNode(this, this.node, [
            "hand_card",
            "hand_card/card_single"
        ]);

        cc.LL.componentUtil.addUiTargetComponent(this, this.node, {
            Layout: [
                "hand_card/card_single"
            ]
        });

        this.hand_card.on(cc.Node.EventType.TOUCH_START, this.onSelectStart, this);
        this.hand_card.on(cc.Node.EventType.TOUCH_MOVE, this.onSelectMove, this);
        this.hand_card.on(cc.Node.EventType.TOUCH_CANCEL, this.onSelectCancel, this);
        this.hand_card.on(cc.Node.EventType.TOUCH_END, this.onSelectEnd, this);
    },

    onDestroy () {
        cc.LL.eventUiUtil.removeEventHandler(cc.VV.eventViewConfig.initMyCards, this.node, this.initMyCards, this);

        this.hand_card.off(cc.Node.EventType.TOUCH_START, this.onSelectStart, this);
        this.hand_card.off(cc.Node.EventType.TOUCH_MOVE, this.onSelectMove, this);
        this.hand_card.off(cc.Node.EventType.TOUCH_CANCEL, this.onSelectCancel, this);
        this.hand_card.off(cc.Node.EventType.TOUCH_END, this.onSelectEnd, this);
    },

    start () {

    },

    //初始化手牌
    initMyCards (infoCards) {
        console.log("myCards = ", infoCards);

        //重置卡牌
        this.resetCards();
        this._isTrust = false;

        //展示手牌
        this.hand_card.active = true;
        this.hand_card.y = -62;
        this.hand_card.scale = 1;

        //生成牌
        for (const element of infoCards) {
            //创建牌
            this.createCard(element);
        }

        this.sortCard();
    },

    //重置卡牌
    resetCards () {
        this._cardsObj = {};
        this._sortType = 0;
    },

    //生成牌
    createCard(cardNum) {
        let card = cc.instantiate(this.cardPrefab);
        card.name = cardNum.toString();
        this.card_single.addChild(card);
        card.emit("init", cardNum);

        this._cardsObj[cardNum] = card;
    },

    sortCard (anim = true) {
        let sortCards = cc.VV.pokerMgr.tongitsSortHandCards(this._sortType, this.getAllCardNum());
        this._sortType++;

        //把所有牌放到single中
        for (const cardNum in this._cardsObj) {
            let card = this.getCardByCardNum(cardNum);
            card.setParent(this.card_single);
        }

        if (anim) this.playDealCardAnim();
    },

    getAllCardNum () {
        return Object.keys(this._cardsObj).map((key) => { return +key});
    },

    //通过扑克牌值获取节点
    getCardByCardNum (cardNum) {
        if (this.isCreateCardByNum(cardNum) == false) {
            this.createCard(cardNum);
        }

        return this._cardsObj[cardNum];
    },

    //判断是否创建了指定点数的牌
    isCreateCardByNum (cardNum) {
        if (this._cardsObj[cardNum]) {
            return true;
        }
        return false;
    },

    //播放发牌动画
    playDealCardAnim () {
        this.Layout_card_single.spacingX = -94;

        cc.tween(this.Layout_card_single)
            .to(this.dealCardDur, {spacingX: this.pokerSpaceX})
            .start();
    },

    onSelectStart (event) {
        if (this.hand_card.children.length <= 0) return;
        this.isTouch = true;
        this.startIndex = -1;
        this.endIndex = -1;
        this.cardWidth = this.cardPrefab.data.width;
        this.cardHeight = this.cardPrefab.data.height;

        let mousePos = this.hand_card.convertToNodeSpaceAR(event.getLocation());

        this.startIndex = this.getNodeIndexByPosX(mousePos.x);
        console.log("Index = ", this.startIndex);
    },

    onSelectMove (event) {

    },

    onSelectCancel (event) {
        
    },

    onSelectEnd (event) {

    },

    getNodeIndexByPosX(posX) {
        let nodes = this.card_single.children;
        console.log("this.hand_card.children = ", nodes);
        if (nodes.length <= 0) {
            console.warn("getNodeIndexByPosX no children");
            return -1;
        }

        for (let i = 0; i < nodes.length; ++i) {
            let _posX = nodes[i].position.x;
            if (i == nodes.length - 1) {
                if (posX > (_posX - this.cardWidth / 2) && posX < (_posX + this.cardWidth / 2)) {
                    return i;
                }
            }

            if (posX > (_posX - this.cardWidth / 2) && posX < _posX) {
                return i;
            }
        }
        return -1;
    }

    ////给牌添加触摸事件
    // cardAddTouchEvent (card, cardNum) {
    //     card.on(cc.Node.EventType.TOUCH_MOVE, (event) => {

    //     });

    //     card.on(cc.Node.EventType.TOUCH_CANCEL, (event) => {

    //     });

    //     card.on(cc.Node.EventType.TOUCH_END, (event) => {

    //     });
    // },

    // //初始化移动的牌
    // initMoveCards (cardNum, touchLocation) {

    // },

    // //点击散牌 弹出
    // onClickCard (card) {

    // },

    // //移动选中的牌
    // moveSelectCard (touchLocation, card) {

    // },



});
