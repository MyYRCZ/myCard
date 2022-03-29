/**
 *  @file poker_suit.js
 *  @brief 牌型分析（不支持带王玩法，带王玩法大小王可以组合sets，不能组合straight）
 *  @version 1.0
 *  @since 1.0
 *  @author chenwei<tristing.chan@163.com>
 *  @date 2021-9-23  Created it
 */
'use strict';

let pokerUtil = require("./poker_util");
let pokerConst = require("./poker_const");

// 组合优先顺序
const FORMAT_PRIORITY_ORDER = {
    BOMB_SETS_STRAIGHT: 1,      // bomb sets straight
    BOMB_STRAIGHT_SETS: 2,      // bomb straight sets
    SETS_STRAIGHT_BOMB: 3,      // sets straight bomb sets, straight 后的 bomb 需要有 sets，防止 bomb 被 straight 截断
    // SETS_BOMB_STRAIGHT: 4,      // 4 = 1
    STRAIGHT_BOMB_SETS: 5,
    // STRAIGHT_SETS_BOMB: 6       // 6 = 5
};

// 格式化后的牌对象
let CardObject = function () {
    this.groups = [];           // { meldType:int, cards:[int] }
    this.looseCards = {
        cards: [],
        score: 0
    };

    this.addGroup = function (groupObject) {
        this.groups.push(groupObject);
    };

    this.setLooseCards = function (cards, score) {
        this.looseCards.cards = cards;
        this.looseCards.score = score;
    };

    this.getSpecialCardCount = function () {
        let specialCardCount = 0;
        for (let i = 0; i < this.groups.length; ++i) {
            if (this.groups[i].meldType == pokerConst.MELD_TYPE.MELD_SPECIAL_STRAIGHT ||
                this.groups[i].meldType == pokerConst.MELD_TYPE.MELD_SPECIAL_SETS) {
                ++specialCardCount;
            }
        }
        return specialCardCount;
    };

    this.getScore = function () {
        return this.looseCards.score;
    };

    this.getObjectData = function () {
        return {
            groups: this.groups,
            looseCards: this.looseCards
        };
    };
};

// 从cardArray中找可以跟singleCard成组的牌数组
function getCanGroupList(cardArray, singleCard, outCardsList) {
    if (!(cardArray instanceof Array) || cardArray.length < 2) {
        return [];
    }

    // 先找sets
    let setsCardList = [];
    for (let i = 0; i < cardArray.length; ++i) {
        if (pokerUtil.getCardWeight(cardArray[i]) == pokerUtil.getCardWeight(singleCard)) {
            setsCardList.push(cardArray[i]);
        }
    }

    if (setsCardList.length >= 2) {
        outCardsList.push(setsCardList);
    }

    let straightCardList = [singleCard];
    for (let i = 0; i < cardArray.length; ) {
        let minCard = straightCardList[0];
        let maxCard = straightCardList[straightCardList.length-1];
        if (cardArray[i] == minCard - 1) {
            straightCardList.unshift(cardArray[i]);
            i = 0;
        } else if (cardArray[i] == maxCard + 1) {
            straightCardList.push(cardArray[i]);
            i = 0;
        } else {
            ++i;
        }
    }

    if (straightCardList.length >= 3) {
        straightCardList.splice(straightCardList.indexOf(singleCard), 1);
        outCardsList.push(straightCardList);
    }
}

// singleCard跟cardArray连起来是否成组
function canGroup(cardArray, singleCard) {
    if (!(cardArray instanceof Array) || cardArray.length < 2) {
        return false;
    }

    return isGroup([].concat(cardArray).concat([singleCard]));
}

// 是否是sets
function isSets(cardArray) {
    if (!(cardArray instanceof Array) || cardArray.length < 3) {
        return false;
    }

    let cardWeight = pokerUtil.getCardWeight(cardArray[0]);
    for (let i = 1; i < cardArray.length; ++i) {
        if (pokerUtil.getCardWeight(cardArray[i]) != cardWeight) {
            return false;
        }
    }

    return true;
}

// 是否是顺子(同花顺)
function isStraight(cardArray) {
    if (!(cardArray instanceof Array) || cardArray.length < 3) {
        return false;
    }

    cardArray.sort();

    // 不需要单独判断同花色，点数相连的必是同花色
    let firstWeight = cardArray[0];
    for (let i = 1; i < cardArray.length; ++i) {
        if (cardArray[i] != firstWeight + i) {
            return false;
        }
    }

    return true;
}

// 是否成组
function isGroup(cardArray) {
    return (isSets(cardArray) || isStraight(cardArray));
}

// 是否可以往组合牌里填牌
function canFillMeld(meldCards, cards) {
    if (!isGroup(meldCards) || !(Array.isArray(cards)) || cards.length === 0) {
        return false;
    }

    meldCards.sort();

    if (pokerUtil.getCardWeight(meldCards[0]) == pokerUtil.getCardWeight(meldCards[1])) {
        // sets
        return (cards.length === 1 && pokerUtil.getCardWeight(meldCards[0]) == pokerUtil.getCardWeight(cards[0]));
    } else {
        return isStraight([].concat(meldCards).concat(cards));
    }
}

// 根据顺序计算牌型
function formatCards(cardArray, priorityOrder) {
    if (!(cardArray instanceof Array)) {
        return null;
    }

    let cardObject = new CardObject();
    let cards = [].concat(cardArray);

    let getBombList = function() {
        // 提取炸弹
        if (cards.length == 0) {
            return ;
        }
        let bombList = [];
        getSets(cards, bombList, 4, true);
        for (let i = 0; i < bombList.length; ++i) {
            cardObject.addGroup({
                cards: bombList[i],
                meldType: pokerConst.MELD_TYPE.MELD_SPECIAL_SETS
            });
        }
    };

    let getSetsList = function() {
        // 提取三条
        if (cards.length == 0) {
            return ;
        }
        let setsList = [];
        getSets(cards, setsList, 3, true);
        for (let i = 0; i < setsList.length; ++i) {
            cardObject.addGroup({
                cards: setsList[i],
                meldType: pokerConst.MELD_TYPE.MELD_SETS
            });
        }
    };

    let getStraight = function() {
        // 组顺子
        if (cards.length == 0) {
            return ;
        }
        let straightList = [];
        groupStraight(cards, straightList, true);
        for (let i = 0; i < straightList.length; ++i) {
            cardObject.addGroup({
                cards: straightList[i],
                meldType: straightList[i].length >= 5 ? pokerConst.MELD_TYPE.MELD_SPECIAL_STRAIGHT : pokerConst.MELD_TYPE.MELD_STRAIGHT
            });
        }
    };

    let fsm = [getBombList, getSetsList, getStraight];
    if (priorityOrder == FORMAT_PRIORITY_ORDER.BOMB_STRAIGHT_SETS) {
        fsm = [getBombList, getStraight, getSetsList];
    /*
    else if (priorityOrder == FORMAT_PRIORITY_ORDER.SETS_BOMB_STRAIGHT) {
        fsm = [getSetsList, getBombList, getStraight];
    */
    } else if (priorityOrder == FORMAT_PRIORITY_ORDER.SETS_STRAIGHT_BOMB) {
        fsm = [getSetsList, getStraight, getBombList, getSetsList];
    } else if (priorityOrder == FORMAT_PRIORITY_ORDER.STRAIGHT_BOMB_SETS) {
        fsm = [getStraight, getBombList, getSetsList];
    /*
    } else if (priorityOrder == FORMAT_PRIORITY_ORDER.STRAIGHT_SETS_BOMB) {
        fsm = [getStraight, getSetsList, getBombList];
    */
    }
    fsm.forEach( (fn) => {
        fn();
    });

    pokerUtil.sortCards(cards, pokerConst.SORT_CARD_TYPE.SORT_BY_WEIGHT);
    cardObject.setLooseCards(cards, pokerUtil.calScore(cards));

    return cardObject;
}

// 提取顺子分组
function groupStraight(cardArray, outStraightList, bSplice) {
    if (!(cardArray instanceof Array) || cardArray.length < 3) {
        return ;
    }

    cardArray.sort();

    let cardArrayList = [];
    let tmpList = [cardArray[0]];
    let prevCard = cardArray[0];
    for (let i = 1; i < cardArray.length; ++i) {
        if (cardArray[i] != prevCard + 1) {
            cardArrayList.push(tmpList);
            tmpList = [];
        }
        tmpList.push(cardArray[i]);
        prevCard = cardArray[i];
    }

    if (tmpList.length > 0) {
        cardArrayList.push(tmpList);
    }

    let looseCards = [];
    for (let i = 0; i < cardArrayList.length; ++i) {
        if (cardArrayList[i].length >= 3) {
            outStraightList.push(cardArrayList[i]);
        } else {
            looseCards.push.apply(looseCards, cardArrayList[i]);
        }
    }

    if (bSplice) {
        cardArray.length = 0;
        cardArray.push.apply(cardArray, looseCards);
    }
}

// 列出所有组合，查找tongits，有tongits则优先特殊牌型。没有tongits优先特殊牌型中分数最低的
function getBestCardObject(cardArray) {
    let cardObjectList = [];
    let hasSpecialCard = false;

    for (let pOrderKey in FORMAT_PRIORITY_ORDER) {
        if (!FORMAT_PRIORITY_ORDER.hasOwnProperty(pOrderKey)) {
            continue;
        }

        let pOrder = FORMAT_PRIORITY_ORDER[pOrderKey];
        let tmpCardObject = formatCards([].concat(cardArray), pOrder);
        cardObjectList.push(tmpCardObject);
        hasSpecialCard = hasSpecialCard || (tmpCardObject.getSpecialCardCount() > 0);
    }

    if (cardObjectList.length == 0) {
        return null;
    }

    let cardObject = cardObjectList[0];
    for (let i = 1; i < cardObjectList.length; ++i) {
        if (cardObject.getScore() == 0) {
            // tongits 特殊牌型更多优先
            if (cardObjectList[i].getScore() == 0 &&
                cardObjectList[i].getSpecialCardCount() > cardObject.getSpecialCardCount()) {
                cardObject = cardObjectList[i];
            }
        } else if (cardObjectList[i].getScore() == 0) {
            cardObject = cardObjectList[i];
        } else {
            // 非tongits，特殊牌型更多优先，同样多分数低优先
            if (cardObjectList[i].getSpecialCardCount() < cardObject.getSpecialCardCount()) {
                continue;
            }

            // 特殊牌型更多或同样数量特殊牌型但分数更低
            if (cardObjectList[i].getSpecialCardCount() > cardObject.getSpecialCardCount() ||
                cardObjectList[i].getScore() < cardObject.getScore()) {
                cardObject = cardObjectList[i];
            }
        }
    }

    return cardObject;
}

// 是否是tongits
function isTongits(cardArray) {
    let cardObject = getBestCardObject(cardArray);
    return (cardObject && cardObject.getScore() == 0);
}

// 提取sets分组, 有炸弹时选择3条不会被提取出来
function getSets(cardArray, outSetsList, setsLen, bSplice) {
    if (!(cardArray instanceof Array) || cardArray.length < setsLen) {
        return ;
    }

    // key-point value-[card]
    let keyCount = {};
    for (let i = 0; i < cardArray.length; ++i) {
        let key = pokerUtil.getCardWeight(cardArray[i]);
        if (keyCount.hasOwnProperty(key)) {
            keyCount[key].push(cardArray[i]);
        } else {
            keyCount[key] = [cardArray[i]];
        }
    }

    for (let key in keyCount) {
        if (!keyCount.hasOwnProperty(key)) {
            continue;
        }

        if (keyCount[key].length !== setsLen) {
            continue;
        }

        outSetsList.push(keyCount[key]);
        if (bSplice) {
            for (let i = 0; i < keyCount[key].length; ++i) {
                cardArray.splice(cardArray.indexOf(keyCount[key][i]), 1);
            }
        }
    }
}

function NewCardObject(){
    return new CardObject();
}

module.exports = {
    FORMAT_PRIORITY_ORDER: FORMAT_PRIORITY_ORDER,

    getCanGroupList: getCanGroupList,   // 获取可以跟指定牌成组的牌列表(二维数组)，用于上家打牌，判断哪些手牌可提起进行组合
    canGroup: canGroup,                 // 判断选牌是否可组合
    isSets: isSets,                     // 是否是sets判断，包括炸弹
    isStraight: isStraight,             // 是否是顺金判断
    isGroup: isGroup,                   // 是否成组，sets或顺金
    canFillMeld: canFillMeld,           // 是否可以跟指定牌型成组

    getSets: getSets,                   // 按 sets 分组， 支持三条和四条
    groupStraight: groupStraight,       // 按顺子分组
    formatCards: formatCards,
    getBestCardObject: getBestCardObject,   // 获取最优牌型
    isTongits: isTongits,               // 是否是tongits
    NewCardObject:NewCardObject,        //new一个CardObject对象               
};

