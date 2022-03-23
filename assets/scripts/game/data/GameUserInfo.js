/**用户信息管理类 */

function userInfo (userId) {
    if (!(this instanceof userInfo)) {
        return new userInfo(userId);
    }

    this.userId          = userId;      //用户ID
    this.nickname        = "";          //用户昵称
    this.gold            = 0;           //用户金币数量
    this.diamond         = 0;           //用户钻石数量
    this.avatarId        = "";          //用户头像url
    this.sex             = 0;           //用户性别

    this.loginType = 0;
}

userInfo.prototype.setUserInfo = function (userInfo) {
    this.userId    = userInfo.userId;
    this.nickname  = userInfo.nickname;
    this.gold      = userInfo.gold;
    this.diamond   = userInfo.diamond;
    this.avatarId  = userInfo.avatarId;
    this.sex       = userInfo.sex || 0;
}

userInfo.prototype.setUserId = function (userId) {
    this.userId = userId;
};

let gameUserInfo = {
    userInfo: null,
    gameData: null,
    netData: null
};

function netData() {
    if (!(this instanceof netData)) {
        return new netData();
    }

    this.token = "";
    this.tokenExpirationTime = "";
}

gameUserInfo.init = function () {
    this.netData = new netData();
};

gameUserInfo.setUserId = function (userId) {
    if (this.userInfo) {
        this.userInfo.setUserId(userId);
    } else {
        this.userInfo = new userInfo(userId);
    }
};

gameUserInfo.setLoginType = function (loginType) {
    if (this.userInfo) {
        this.userInfo.loginType = loginType;
    }
};

gameUserInfo.getLoginType = function () {
    if (this.userInfo) {
        return this.userInfo.loginType;
    }
};

gameUserInfo.getUserInfo = function () {
    return this.userInfo;
}

gameUserInfo.isGuestLogin = function () {
    return (this.userInfo.loginType % 10) === 0;
};

gameUserInfo.setUserNickName = function (name) {
    this.userInfo.nickname = name;
};

gameUserInfo.setUserSex = function (sex) {
    this.userInfo.sex = sex;
};

gameUserInfo.setUserAvatarId = function (url) {
    this.userInfo.avatarId = url;
};

gameUserInfo.setUserGold = function (gold) {
    this.userInfo.gold = gold;
};

gameUserInfo.setUserDiamond = function (diamond) {
    this.userInfo.diamond = diamond;
};

gameUserInfo.addUserGold = function (gold) {
    this.userInfo.gold += gold;
};

gameUserInfo.addUserDiamond = function (diamond) {
    this.userInfo.diamond += diamond;
};

gameUserInfo.setToken = function (token) {
    this.netData.token = token;
};

gameUserInfo.setTokenExpirationTime = function (tokenExpirationTime) {
    this.netData.tokenExpirationTime = tokenExpirationTime;
};

gameUserInfo.setFacebookUrl = function (url) {
    this.facebookUrl = url;
};

gameUserInfo.getFacebookUrl = function (url) {
    return this.facebookUrl;
};

gameUserInfo.getUserId = function () {
    return this.userInfo.userId;
};

gameUserInfo.getUserName = function () {
    return this.userInfo.nickname;
};

gameUserInfo.getUserSex = function () {
    return this.userInfo.sex;
};

gameUserInfo.getUserGold = function () {
    return this.userInfo.gold;
};

gameUserInfo.getUserDiamonds = function () {
    return this.userInfo.diamond;
};

gameUserInfo.getToken = function () {
    return this.netData.token;
};

gameUserInfo.getTokenExpirationTime = function () {
    return this.netData.tokenExpirationTime;
};

gameUserInfo.setEntryData = function (data) {
    if (!data) return;

    this.setUserId(data.userId);
    this.setUserNickName(data.nickname);
    this.setUserGold(data.gold);
    this.setUserDiamond(data.diamond);
    this.setUserAvatarId(data.avatarId);
    this.setFacebookUrl(data.facebookUrl);
};

module.exports = gameUserInfo;







