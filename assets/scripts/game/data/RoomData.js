//通用数据结构
'use strict'

//俱乐部等级
// const CLUB_LEVEL = {
//     NORMAL_CLUB: 0,
//     HIGH_CLUB:   1,
//     NO_CLUB:     2
// };

// function PlayerInfo (info) {
//     if (!(this instanceof PlayerInfo)) {
//         return new PlayerInfo(info);
//     }

//     this.info = info;

//     this.userId     = info.userId;           //用户ID
//     this.nickname   = info.nickname;         //用户昵称
//     this.avatarId   = info.avatarId;         //用户头像url
//     this.frameId    = info.frameId;          //用户头像框ID
//     this.sex        = info.sex || 0;         //性别

//     this.seat       = info.seat;             //座位号
//     this.score      = info.score;            //当前积分/金币
//     this.online     = info.online || true;   //在线状态(1/0)

//     this.bReady     = info.bReady || true;   //是否已准备
//     this.bGame      = info.bGame || true;    //是否游戏中
//     this.bQuit      = info.bQuit || true;    //是否退出
// };

// function RoomInfo (roomInfo) {
//     if (!(this instanceof roomInfo)) {
//         return new RoomInfo(roomInfo);
//     }
//     this.roomInfo = roomInfo;

//     //初始化座位  0:站起
//     this.mySeat        = 0;
//     this.myViewPosSeat = 1;

//     this.mSubKey            = roomInfo.subKey;            //子密钥(金币场)
//     this.mRoomType          = roomInfo.roomType;          //房间类型
//     this.mGameType          = roomInfo.gameType;          //游戏类型
//     this.mMinGameScore      = roomInfo.minGameScore;      //游戏的最少分数
//     this.mMaxGameScore      = roomInfo.maxGameScore;      //继续游戏的最大分数  -1无效值
//     this.mMinBringInScore   = roomInfo.minBringInScore;   //最少带入分数
//     this.mMaxBringInScore   = roomInfo.maxBringInScore;   //最大带入分数  -1无限制
//     this.mMaxPlayers        = roomInfo.maxPlayers;        //最大游戏人数
//     this.mActTimeout        = roomInfo.actTimeout;        //超时时间(创建时客户端传递的格式){timeoutReady: 5, timeoutDumpCard: 15, timeoutGameResult: 5}
//     this.mBasicScore        = roomInfo.basicScore;        //低分
//     this.mBPlayed           = roomInfo.bPlayed;           //玩家是否在本房间游戏过

//     this.mPot               = roomInfo.pot;               //奖池玩法(总底注1)
//     this.mPotAmount         = roomInfo.potAmount;         //底池积累了几次
//     this.mWinMap            = roomInfo.winMap;            //key-userId, value-局数
//     this.mPotAnti           = roomInfo.potAnti;           //每局下的钱注入到底池  0-无底池
//     this.mPotCollectInnings = roomInfo.potCollectInnings; //胜几局后拿走底池

//     this.mBGpsOpened        = roomInfo.bGpsOpened;        //是否开启GPS提示
//     this.mClubId            = roomInfo.clubId;            //房间所属俱乐部ID null/"": 非俱乐部房间
//     this.mClubManagerList   = roomInfo.clubManagerList;   //俱乐部管理员列表

//     this.mIsAA              = roomInfo.isAA;              //是否AA支付
//     this.mCostDiamonds      = roomInfo.costDiamonds;      //需要消耗钻石数
//     this.mCreatorId         = roomInfo.creatorId;         //房主ID
//     this.mSettleScoreType   = roomInfo.settleScoreType;   //结算方式
//     this.mLeftSeconds       = roomInfo.leftSeconds;       //房间剩余时间
//     this.mStarted           = roomInfo.started;           //房间是否已开始

//     this.setPlayers(roomInfo.players);

//     this.mSettleData        = null;                       //结算数据
// };

// PlayerInfo.prototype.setGameInfoForKey = function (key, value) {
//     this.roomInfo[key] = value;
// };

// PlayerInfo.prototype.getGameInfoForKey = function (key) {
//     return this.roomInfo[key];
// };

let roomInfoData = function () {
    this.resetData();
};

let gameData = roomInfoData.prototype;
let gameInstance = null;

gameData.resetData = function () {
    this.roomData = {};
    this.userInfoData = {};
};

gameData.setPlayerInfo = function (info) {
    if (!info || typeof info !== "object" || !info.userId || info.userId === "" ) {
        return;
    }

    this.userInfoData[info.userId] = info;
};

gameData.getAllPlayerInfo = function () {
    return JSON.parse(JSON.stringify(this.userInfoData));
};

gameData.getPlayers = function () {
    if (this.roomData) {
        return this.roomData.players;
    }
    return null;
};

gameData.getGameStartData = function () {
    let startData = {};
    startData.potAnti = this.roomData.potAnti;
    startData.pot = this.roomData.pot;
    startData.potAmount = this.roomData.potAmount;
    startData.winMap = this.roomData.winMap;
    return startData;
};

gameData.getPlayerInfoBySeat = function (seat) {
    for (let key in this.userInfoData) {
        let element = this.userInfoData[key];
        if (element.seat == seat) {
            return element;
        }
    }
};

gameData.getPlayerSeatToUiSeat = function (seat) {
    
};

gameData.getPlayerInfoByUserId = function (userId) {
    return this.userInfoData[userId];
};

gameData.setRoomData = function (data) {
    for (let key in data) {
        let value = data[key];
        this.setRoomDataForKey(key, value);
    }
};

gameData.resetUserInfoData = function () {
    this.userInfoData = {};
};

gameData.setRoomDataForKey = function (key, value) {
    this.roomData[key] = value;
};

gameData.getRoomData = function () {
    return this.roomData;
};

gameData.getRoomDataForKey = function (key) {
    return this.roomData[key];
};

module.exports = {
    Instance: function () {
        if (!gameInstance) {
            gameInstance = new roomInfoData();
        }
        return gameInstance;
    },
    Destroy: function () {
        if (gameInstance) {
            gameInstance.destroy();
        }
    },
};




