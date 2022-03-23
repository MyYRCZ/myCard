
var localStorageUtil = {};

localStorageUtil.keyObj = {
    loginEntry:       "loginEntry",
    loginData:        "loginData",
    languageKey:      "languageKey",
    recentMessages:   "recentMessages",
    historyPurchase:  "historyPurchase",
    localFilePath:    "localFilePath",
    kvConfig:         "kvConfig",
    createRoomKey:    "createRoomKey"
};

localStorageUtil.setItemValue = function(key, value) {
    if (this.keyObj[key] === null || this.keyObj[key] === undefined) {
        console.error("setItem key 不存在");
        return;
    }

    if (value === "" || value === undefined) {
        console.error("setItem value 为空字符串或为undefined");
        return;
    }

    cc.sys.localStorage.setItem(key, value);
};

localStorageUtil.getItem = function (key) {
    if (this.keyObj[key] === null || this.keyObj[key] === undefined) {
        console.error("getItem key 为空或为undefined");
        return;
    }

    let value = cc.sys.localStorage.getItem(key);
    if (!value && key == this.keyObj.languageKey) {
        //value = "ph"  菲律宾
        value = "en";
    }
    return value;
};

localStorageUtil.removeItem = function (key) {
    if (this.keyObj[key] === null || this.keyObj[key] === undefined) {
        console.error("-----------removeItem key 为空或为undefined----------");
        return null;
    }

    cc.sys.localStorage.removeItem(key);
};

localStorageUtil.clear = function () {
    let keys = Object.keys(this.keyObj);
    for (let i = 0; i < keys.length; ++i) {
        this.removeItem(keys[i]);
    }
};

module.exports = localStorageUtil;