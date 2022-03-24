
module.exports = {
    //所有事件注册回调

    //网络事件消息定义
    EVENT_NET: {
        //登录
        EVENT_LOGIN: {
            GUEST_LOGIN: "guest_login"
        },

        EVENT_GAME: {
            ON_KICK: "onKick",                    //被踢
            CLOSE_CONNECTOR: "closeConnect",      //断线
            GAME_SHOW: "gameShow",
            RECONNECT_GAME: "reconnectGame",      //断线重连
            LOGOUT_GAME: "logoutGame"             //登出
        },

        EVENT_ROOM: {

            //网络层监听
            CREATOR_DIAMOND_NOT_ENOUGH: "CreatorDiamondNotEnough",
            SIT_DOWN                  : "SitDown",
            CHANGE_SEAT               : "ChangeSeat",
            STAND_UP                  : "StandUp",
            READY                     : "Ready",
            GAME_START                : "GameStart",
            GPS_REPORT                : "GpsReport",
            CHAT                      : "Chat",
            THROW_PROP                : "ThrowProp",
            ROOM_OVER                 : "RoomOver",
            USER_COIN                 : "UserCoin",
            USER_DIAMOND              : "UserDiamond",

            JOIN_ROOM: "join_room"                //加入房间(只加入金币场)
        },

        EVENT_TONGITS: {
            //网络层监听
            onDealCard:      "onDealCard",          //发牌
            onGetCard:       "onGetCard",           //抓牌
            onDumpCard:      "onDumpCard",          //打牌
            onDrop:          "onDrop",              //亮牌
            onPickUp:        "onPickUp",            //捡牌通知(组合)
            onFillMeld:      "onFillMeld",          //补牌
            onFight:         "onFight",             //比牌
            onChallenge:     "onChallenge",         //挑战
            onFold:          "onFold",              //弃牌
            onTrust:         "onTrust",             //托管
            onCancelTrust:   "onCancelTrust",       //取消托管
            onGameResult:    "onGameResult",        //游戏结算
            onNoticeByUids:  "onNoticeByUids",      //跑马灯
            onNotice:        "onNotice",            //跑马灯
            onSettle:        "onSettle",            //结束
        }
    },     
}