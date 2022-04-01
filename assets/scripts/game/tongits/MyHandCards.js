'use strict'

cc.Class({
    extends: cc.Component,

    properties: {
        
        cardPrefab: cc.Prefab,
        dealCardDur: 0.2,
        pokerSpaceX: -50,

        cardYOffset: 25,

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
        this.hand_card.on(cc.Node.EventType.TOUCH_END, this.onSelectCancel, this);
    },

    onDestroy () {
        cc.LL.eventUiUtil.removeEventHandler(cc.VV.eventViewConfig.initMyCards, this.node, this.initMyCards, this);

        this.hand_card.off(cc.Node.EventType.TOUCH_START, this.onSelectStart, this);
        this.hand_card.off(cc.Node.EventType.TOUCH_MOVE, this.onSelectMove, this);
        this.hand_card.off(cc.Node.EventType.TOUCH_CANCEL, this.onSelectCancel, this);
        this.hand_card.off(cc.Node.EventType.TOUCH_END, this.onSelectCancel, this);
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

    onReset () {
        this.isPressDown = false;
        this.startIndex = -1;
        this.endIndex = -1;
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
        // console.log("Index = ", this.startIndex);
    },

    onSelectMove (event) {
        if (this.isPressDown && this.card_single.children.length <= 0) return;

        //鼠标坐标转成相对于当前节点的坐标
        let mousePos = this.hand_card.convertToNodeSpaceAR(event.getLocation());
        if (!this.checkValidArea(mousePos.x, mousePos.y)) {
            return;
        }

        this.endIndex = this.getNodeIndexByPosX(mousePos.x);
        // console.log("endIndex === ", this.endIndex);
        if (this.endIndex === -1) return;

        if (this.startIndex >= 0 && this.endIndex >= 0) {
            let tuple = this.minOrMax(this.startIndex, this.endIndex);
            this.targetNodes = [];
            let nodes = this.card_single.children;
            for (let i = 0; i < nodes.length; i++) {
                const element = nodes[i];
                if (i <= tuple.max && i >= tuple.min) {
                    this.targetNodes.push(element);
                }
            }
            this.onSelectCard(this.targetNodes);
        }
    },

    onSelectCancel (event) {
        if (!this.isPressDown && this.card_single.children.length <= 0) return;

        let mousePos = this.hand_card.convertToNodeSpaceAR(event.getLocation());

        //在区域内将区域内节点加入
        if (this.checkValidArea(mousePos.x, mousePos.y)) {
            this.targetNodes = [];
            this.endIndex = this.getNodeIndexByPosX(mousePos.x);
            if (this.startIndex >= 0 && this.endIndex >= 0) {
                let tuple = this.minOrMax(this.startIndex, this.endIndex);
                let nodes = this.card_single.children;
                for (let i = 0; i < nodes.length; i++) {
                    const element = nodes[i];
                    if (i <= tuple.max && i >= tuple.min) {
                        this.targetNodes.push(element);
                    }
                }
            }
        }

        let res = this.dealChooseCardEnd(this.targetNodes || []);
        console.log("allSelectCard === ", this.targetNodes);
        if (res) {
            this.selectCardEnd(res);
        } else {
            this.selectCardEnd(this.targetNodes);
        }
        this.onReset();
    },

    onSelectEnd (event) {

    },

    //通过触摸坐标的X获得牌的Index(从左往右0,1,2...)
    getNodeIndexByPosX(posX) {
        let nodes = this.card_single.children;
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
    },
    
    //检查(x, y)是否在有效范围内
    checkValidArea(x, y) {
        let nodes = this.card_single.children;
        if (nodes.length <= 0) {
            return false;
        }

        let checkValidAreaX = (posX) => {
            let areaLeft = nodes[0].x - this.cardWidth / 2;
            let areaRight = nodes[nodes.length - 1].x + this.cardWidth / 2;
            return posX <= areaRight && posX >= areaLeft;
        };

        let checkValidAreaY = (posY) => {
            let areaTop = this.cardHeight / 2;
            let areaBottom = -(this.cardHeight / 2);
            return posY <= areaTop && posY >= areaBottom;
        };

        return checkValidAreaX(x) && checkValidAreaY(y);
    },

    //选择牌
    onSelectCard (nodes) {
        let children = this.card_single.children;
        for (let index = 0; index < children.length; index++) {
            const child = children[index];
            if (nodes.indexOf(child) >= 0) {
                child.emit("showMask", true);
            } else {
                child.emit("showMask", false);
            }
        }
    },

    minOrMax (x, y) {
        if (x <= y) {
            return {min: x, max: y};
        }
        return {min: y, max: x};
    },

    dealChooseCardEnd (nodes) {
        if (nodes.length < 6) return;

        let pokerArr = [], downNum = 0, upNum = 0;
        for (let index = 0; index < nodes.length; index++) {
            const element = nodes[index];
            pokerArr.push(element.pokerIndex);
        }
    },

    selectCardEnd (nodes) {
        let children = this.card_single.children;
        for (let index = 0; index < children.length; index++) {
            const child = children[index];
            child.emit("showMask", false);
            if (nodes.indexOf(child) >= 0) {
                this.onClickCard(child);
            }
        }

        if (!nodes || nodes.length <= 1) return;

        //TODO 获取最优牌
        // let childrenNum = this.getAllSelectCardNum();
    },

    //点击牌牌弹出
    onClickCard (card) {
        if (card.y >= this.cardYOffset) {
            card.y = 0;
        } else {
            card.y = this.cardYOffset;
        }
    },

    //获取牌的数据
    getAllSelectCardNum () {
        let nodes = this.card_single.children;
        let cardNum = [];
        nodes.forEach((card) => {
            if (card.y >= this.cardYOffset) {
                cardNum.push(this.getCardNameByCard(card));
            }
        });

        return cardNum;
    },

    getCardNameByCard (card) {
        return +card.name;
    },

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
