const utils = require("./utils");
stringUtil = {};

stringUtil.subStringWithLast = function (_str, _findStr, _end) {
    let str = _str.substring(_str.lastIndexOf(_findStr) + 1, _end);
    return str;
};

stringUtil.isEmpty = function (value) {
    var isEmpty = false;
    if (utils.isUndefined(value)) {
        return true;
    }

    if (utils.isNull(value)) {
        isEmpty = true;
    }

    return isEmpty;
};

module.exports = stringUtil;