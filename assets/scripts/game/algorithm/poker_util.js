/**
 *  @file poker_util.js
 *  @brief 通用方法
 *  @version 1.0
 *  @since 1.0
 *  @author chenwei<tristing.chan@163.com>
 *  @date 2021-9-23  Created it
 */
'use strict';

const pokerConst = require('./poker_const');

// 整数判断
function isInteger(x) {
    return (typeof x === 'number') && (x % 1 === 0);
}

// 返回最大值
function max(a, b) {
    return ((a) > (b)) ? (a) : (b);
}

// 返回最小值
function min(a, b) {
    return ((a) < (b)) ? (a) : (b);
}

// 获取牌的点数
function getCardPoint(card) {
    return isInteger(card) ? min(card & 0x0F, 10) : 0;
}

// 获取牌的权重值
function getCardWeight(card) {
    return isInteger(card) ? (card & 0x0F) : 0;
}

// 返回牌的花色值 1-4
function getCardColor(card) {
    return isInteger(card) ? ((card >> 4) & 0x0F) : 0;
}

// 获取指定花色的牌列表
function getCardListByColor(cards, color) {
    if (!Array.isArray(cards)) {
        return [];
    }

    let cardArray = [];
    for (let i = 0; i < cards.length; ++i) {
        if (getCardColor(cards[i]) == color) {
            cardArray.push(cards[i]);
        }
    }

    return cardArray;
}

// 获取除了指定花色之外的牌列表
function getCardListExceptColor(cards, color) {
    if (!Array.isArray(cards)) {
        return [];
    }

    let cardArray = [];
    for (let i = 0; i < cards.length; ++i) {
        if (getCardColor(cards[i]) != color) {
            cardArray.push(cards[i]);
        }
    }

    return cardArray;
}

// 获取整型牌的字符串描述，用于日志打印
function getCardDesc(card) {
    let point = getCardWeight(card);
    let color = getCardColor(card);
    let s1 = point.toString();
    if (point === 1) {
        s1 = "A";
    } else if (point === 11) {
        s1 = "J";
    } else if (point === 12) {
        s1 = "Q";
    } else if (point === 13) {
        s1 = "K";
    }

    let s2 = "";
    if (color === pokerConst.CARD_COLOR.COLOR_DIAMOND) {
        s2 = "D";
    } else if (color === pokerConst.CARD_COLOR.COLOR_CLUB) {
        s2 = "C";
    } else if (color === pokerConst.CARD_COLOR.COLOR_HEART) {
        s2 = "H";
    } else if (color === pokerConst.CARD_COLOR.COLOR_SPADE) {
        s2 = "S";
    }

    return (s2 + s1);
}

// 获取牌的描述子串, 用于日志打印
function getCardString(cards) {
    if (!(cards instanceof Array)) {
        return "";
    }

    let s = "";
    for (let i = 0; i < cards.length; ++i) {
        s = s + cards[i] + "(" + getCardDesc(cards[i]) + ") ";
    }

    return s;
}

// 获取除了某个花色外的其它花色列表
function getColorListExceptColor(exceptedColor) {
    let arr = [
        pokerConst.CARD_COLOR.COLOR_DIAMOND,
        pokerConst.CARD_COLOR.COLOR_CLUB,
        pokerConst.CARD_COLOR.COLOR_HEART,
        pokerConst.CARD_COLOR.COLOR_SPADE
    ];
    let idx = arr.indexOf(exceptedColor);
    if (idx >= 0) {
        arr.splice(idx, 1);
    }

    return arr;
}

// 计算一组牌的点数之和
function calScore(cards) {
    if (!Array.isArray(cards)) {
        return 0;
    }

    let scores = 0;
    for (let i = 0; i < cards.length; ++i) {
        scores += getCardPoint(cards[i]);
    }

    return scores;
}

// 判断牌是否为额外奖励牌, bonusCardMode: 0-无 1-K, 2-A, 3-AK
function isBonusCard(card, bonusCardMode) {
    bonusCardMode = bonusCardMode || 0;
    let weightArray = [];
    if ((bonusCardMode & 1) == 1) {
        weightArray.push(13);
    }

    if ((bonusCardMode >> 1) == 1) {
        weightArray.push(1);
    }

    return weightArray.indexOf(getCardWeight(card)) >= 0;
}

// 排序规则，按花色、按点数
function sortCards(cards, sortType) {
    if (!(cards instanceof  Array)) {
        return false;
    }

    if (sortType == pokerConst.SORT_CARD_TYPE.SORT_BY_COLOR) {
        cards.sort( (card1, card2) => {
            let color1 = getCardColor(card1);
            let color2 = getCardColor(card2);
            if (color1 !== color2) {
                return color1 - color2;
            }

            let weight1 = getCardWeight(card1);
            let weight2 = getCardWeight(card2);

            return weight1 - weight2;
        });

    } else if (sortType == pokerConst.SORT_CARD_TYPE.SORT_BY_WEIGHT) {
        cards.sort( (card1, card2) => {
            let weight1 = getCardWeight(card1);
            let weight2 = getCardWeight(card2);

            if (weight1 != weight2) {
                return weight1 - weight2;
            }

            let color1 = getCardColor(card1);
            let color2 = getCardColor(card2);
            return color1 - color2;
        });
    }

    return true;
}

module.exports = {
    isInteger: isInteger,
    getCardPoint: getCardPoint,
    getCardWeight: getCardWeight,
    getCardColor: getCardColor,
    getCardListByColor: getCardListByColor,
    getCardListExceptColor: getCardListExceptColor,
    getColorListExceptColor: getColorListExceptColor,
    getCardDesc: getCardDesc,
    getCardString : getCardString,
    calScore: calScore,
    isBonusCard: isBonusCard,
    sortCards: sortCards,
};

