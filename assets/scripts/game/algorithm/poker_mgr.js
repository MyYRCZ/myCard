'use strict'

let pokerSuit = require("./poker_suit");
let pokerUtil = require("./poker_util");
let pokerConst = require("./poker_const");

let pokerMgr = {};

pokerMgr.tongitsSortHandCards = function (sortCardType, sortHandCards) {
    let cardObject = {};
    let score = 0;
    switch (sortCardType) {
        case cc.VV.gameEnum.SORT_TYPE.TYPE_COLOR:
            pokerUtil.sortCards(sortHandCards, pokerConst.SORT_CARD_TYPE.SORT_BY_COLOR);
            cardObject = pokerSuit.NewCardObject();
            score = pokerUtil.calScore(sortHandCards);
            cardObject.setLooseCards(sortHandCards, score);
            break;
        
        case cc.VV.gameEnum.SORT_TYPE.TYPE_WEIGHT:
            pokerUtil.sortCards(sortHandCards, pokerConst.SORT_CARD_TYPE.SORT_BY_WEIGHT);
            cardObject = pokerSuit.NewCardObject();
            score = pokerUtil.calScore(sortHandCards);
            cardObject.setLooseCards(sortHandCards, score);
            break;

        case cc.VV.gameEnum.SORT_TYPE.TYPE_BEST:
            cardObject.pokerSuit.getBestCardObject(sortHandCards);
            break;
    }
    return cardObject;
};

module.exports = pokerMgr;