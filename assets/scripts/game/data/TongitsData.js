'use strict'
//----------------------------------------DroppedCardInfo-------------------------------------
function DroppedCardInfo (info) {
    if (!(this instanceof DroppedCardInfo)) {
        return new DroppedCardInfo(info);
    }

    this.droppedId     = info.droppedId;      //全局唯一ID
    this.droppedType   = info.droppedType;    //1-sets  2-特殊sets  3-顺子  4-特殊顺子
    this.cards         = info.cards;          //牌数组
    this.extraCard     = info.extraCard;      //自己的亮则为-1 否则为别人打出的自己pick up的牌
    this.fillCards     = info.fillCards;      //亮出后附加的牌 插牌
};

//-------------------------------------------NextActData--------------------------------------
function NextActData (actData) {
    if (!(this instanceof NextActData)) {
        return new NextActData(actData);
    }

    this.nextSeat     = actData.nextSeat;
    this.canGetCard   = actData.canGetCard;
    this.canFight     = actData.canFight;
};

//-------------------------------------------RoundConfig-----------------------------------------
function RoundConfig () {
    if (!(this instanceof RoundConfig)) {
        return new RoundConfig();
    }

    this.roundConfig = {
        roundNextHand: 0
    };
};

RoundConfig.prototype.setRoundConfigForKey = function (configKey, configValue) {
    if (configValue >= 0) {
        this.roundConfig[configKey] = configValue;
        return configValue;
    } else {
        return this.roundConfig[configKey];
    }
};

//-----------------------------------------GamePlayerInfo-----------------------------------------

function GamePlayerInfo (info) {
    if (!(this instanceof GamePlayerInfo)) {
        return new GamePlayerInfo(info);
    }

    this.userIf        = info.userId;           //玩家I D
    this.seat          = info.seat;             //座位号
    this.bTrust        = info.bTrust || false;  //托管
    this.cardInfo = {
        handCards: [],                          //当前手里的牌
        droppedCardList: []                     //亮出来的牌
    };

    if (info.cardInfo) {
        this.cardInfo.handCard = info.cardInfo.handCards;

        //转成自己的结构
        for(let i = 0; i < info.cardInfo.droppedCardList.length; ++i) {
            this.cardInfo.droppedCardList.push(new DroppedCardInfo(info.cardInfo.droppedCardList[i]));
        }
    }
}; 

//--------------------------------------------GameInfo-------------------------------------------
function GameInfo () {
    if (!(this instanceof GameInfo)) {
        return new GameInfo();
    }

    this.dealerSeat        = -1;       //庄家座位号第一个打牌的人
    this.gameState         = -1;       //当前游戏状态
    this.fightingData      = {};       //gameState 等于GS_FIGHTING时有效
    this.nextActData       = null;     //gameState 等于GS_DUMP时有效 
    this.dumpCardList      = [];       //打出牌的栈(抠出了被pick up的牌)
    this.dumpCardHistory   = [];       //打牌历史记录 所有打出的牌 包括被pick up的牌
    this.canPickUpCard     = -1;       //最后打出的牌 pick up后设置为-1，不可以再pick up
    this.leftCardCount     = 0;        //剩余没抓的牌
    this.lastGetCardSeat   = -1;       //最后抓牌的座位号
    this.leftTimeout       = 0;        //剩余超时时间
    this.rule              = [];       //游戏规则 
    this.players           = {};       //用户列表
    this.mySeat            = 0;        //默认自己的位置是0
    this.curTakeoutSeat    = 0;        //当前打牌的座位

};

GameInfo.prototype.setGameInfo = function(gameInfo) {
    this.dealerSeat        = gameInfo.dealerSeat;                       //庄家座位号第一个打牌的人
    this.gameState         = gameInfo.gameState;                        //当前游戏状态
    this.fightingData      = gameInfo.fightingData                      //gameState 等于GS_FIGHTING时有效
    this.nextActData       = new NextActData(gameInfo.nextActData);     //gameState 等于GS_DUMP时有效 
    this.dumpCardList      = gameInfo.dumpCardList;                     //打出牌的栈(抠出了被pick up的牌)
    this.dumpCardHistory   = gameInfo.dumpCardHistory                   //打牌历史记录 所有打出的牌 包括被pick up的牌
    this.canPickUpCard     = gameInfo.canPickUpCard;                    //最后打出的牌 pick up后设置为-1，不可以再pick up
    this.leftCardCount     = gameInfo.leftCardCount;                    //剩余没抓的牌
    this.lastGetCardSeat   = gameInfo.lastGetCardSeat;                  //最后抓牌的座位号
    this.leftTimeout       = gameInfo.leftTimeout;                      //剩余超时时间
    this.rule              = gameInfo.rule;                             //游戏规则 
    this.setPlayers(gameInfo.players);
};

//设置单个玩家信息
GameInfo.prototype.setPlayerInfo = function (info) {
    if (!info) {
        console.warn("set player info--> info = ", info);
        return;
    }

    let gamePlayerInfo = new GamePlayerInfo(info);
    this.players[info.seat] = gamePlayerInfo;

    let mySelfId = cc.VV.gameUserInfo.getUserId();
    if (mySelfId == info.userId) {
        this.mySeat = info.seat;
    }    
};

GameInfo.prototype.setPlayers = function (players) {
    this.players = {};
    for (let i = 0; i < players.length; ++i) {
        this.setPlayerInfo(players[i]);
    }
};


//----------------------------------------------GameData----------------------------------------------
let tongitsData = {

    gameInfo: new GameInfo(),
    roundConfig: new RoundConfig(),
    bStart: false,

    setGameInfo: function (gameInfo) {
        this.bStart = true;
        this.gameInfo.setGameInfo(gameInfo);
    },

    //清除游戏数据
    clearGame: function () {
        this.gameInfo    = new GameInfo();
        this.roundConfig = new RoundConfig();
        this.bStart      = false;
    },
};

module.exports = tongitsData;