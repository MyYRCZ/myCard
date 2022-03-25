'use strict'

//游戏动作
const GAME_ACTION = {
    ACT_DUMP:         1,      //打牌
    ACT_GET_CARD:     2,      //抓牌
    ACT_PICK_UP:      3,      //捡牌(吃碰)
    ACT_FILL_MELD:    4,      //填充亮出的牌
    ACT_DROP:         5,      //亮牌
    ACT_FIGHT:        6,      //比牌
    ACT_CHALLENGE:    7,      //挑战比牌
    ACT_FOLD:         8,      //放弃比牌
    ACT_TRUST:        9,      //托管
    ACT_CANCEL_TRUST: 10      //取消托管
};

//游戏状态
const GAME_STATE = {
    GS_WAITING:       0,       //等待
    GS_DEAL_CARD:     1,       //发牌
    GS_DUMP:          2,       //打牌
    GS_FIGHTING:      3,       //比牌
    GS_GAME_RESULT:   4,       //游戏结算
    GS_DESTROY:       5        //销毁
};

//比牌状态
const FIGHT_STATE = {
    FS_FIGHTING:      1,        //发起比牌
    FS_CHALLENGE:     2,        //挑战
    FS_FOLD:          3         //弃牌
};

//站起原因
const STAND_UP_REASON = {
    NORMAL:           1,        //正常站起
    TRUST:            2,        //托管站起
    OFFLINE:          3,        //离线站起
    GOLD_MORE:        4,        //金币太多
    GOLD_LESS:        5,        //金币不足
    DIAMOND_LESS:     6         //钻石不足
};

//商店类型
const SHOP_TYPE = {
    GOLD:             0,        //金币
    DIAMOND:          1,        //钻石
    PACKAGE:          2         //礼包
};

module.exports = {
    GAME_ACTION:      GAME_ACTION,
    GAME_STATE:       GAME_STATE,
    FIGHT_STATE:      FIGHT_STATE,
    STAND_UP_REASON:  STAND_UP_REASON,
    SHOP_TYPE:        SHOP_TYPE
};