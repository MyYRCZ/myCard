const roomKey = {
    subKey:               "subKey",               //房间子密钥
    roomType:             "roomType",             //房间类型
    roomId:               "roomId",               //房间ID 
    gameType:             "gameType",             //游戏类型 
    minGameScore:         "minGameScore",         //游戏的最少分数
    maxGameScore:         "maxGameScore",         //游戏的最大分数  -1:无效值
    minBringInScore:      "minBringInScore",      //最少带入分数
    maxBringInScore:      "maxBringInScore",      //最大带入分数 -1:无限制
    maxPlayers:           "maxPlayers",           //最大游戏人数
    actTimeout:           "actTimeout",           //超时时间(创建客户端传递的格式) {timeoutReady: 5, timeoutDumpCard: 15, timeoutGameResult: 5}
    basicScore:           "basicScore",           //底分
    bPlayed:              "bPlayed",              //玩家是否在本房间游戏过
    pot:                  "pot",                  //奖池玩法 总底池1
    potAmount:            "potAmount",            //底池积累了几次
    winMap:               "winMap",               //key-userId, value-局数
    potAnti:              "potAnti",              //每局下的钱注入到底池  0-无底池
    potCollectInnings:    "potCollectInnings",    //胜几局后拿走奖池
    bGpsOpened:           "bGpsOpened",           //是否开启GPS提示
    clubId:               "clubId",               //房间所属俱乐部ID null/"": 非俱乐部房间
    clubManagerList:      "clubManagerList",      //俱乐部管理员列表
    isAA:                 "isAA",                 //是否AA支付
    costDiamonds:         "costDiamonds",         //需要消耗钻石数
    creatorId:            "creatorId",            //房主ID
    settleScoreType:      "settleScoreType",      //结果结算方式，客户端暂时没用 0虚拟积分 普通俱乐部普通自建房  1金币场 2 俱乐部积分 只有高级采用
    leftSeconds:          "leftSeconds",          //房间剩余时间
    started:              "started"               //房间是否已开始
};

const userInfoKey = {
    userId:               "userId",               //用户ID
    nickname:             "nickname",             //昵称
    avatarId:             "avatarId",             //头像url
    frameId:              "frameId",              //头像框ID(暂时默认值)
    sex:                  "sex",                  //性别
    seat:                 "seat",                 //座位号
    score:                "score",                //当前积分/金币
    online:               "online",               //在线状态(1/0)
    bReady:               "bReady",               //是否已准备(1/0, 游戏已开始忽略该字段)
    bGame:                "bGame",                //是否游戏中
    bQuit:                "bQuit"                 //是否退出
};

const dataKey = {
    roomKey: roomKey,
    userInfoKey: userInfoKey
};

module.exports = dataKey;