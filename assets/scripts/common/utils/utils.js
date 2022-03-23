var Util = {
    invokeCallback: function (callback) {
        if (!!callback && typeof callback === "function") {
            callback.apply(null, Array.prototype.slice.call(arguments, 1));
        }
    },

    type: function (obj) {
        let toString = Object.prototype.toString;
        let types = {
            "undefined": "undefined",
            "number": "number",
            "boolean": "boolean",
            "string": "string",
            "[object Function]": "function",
            "[object RegExp]": "regexp",
            "[object Array]": "array",
            "[object Date]": "date",
            "[object Error]": "error"
        };

        return types[typeof obj] || types[toString.call(obj)] || (obj ? "object" : null);
    },

    isObject: function (obj) {
        if (this.type(obj) === "object") {
            return true;
        }
        return false;
    },

    isEmptyObject: function (obj) {
        if (!this.isObject(obj)) {
            return false;
        }

        for (let key in obj) {
            return false;
        }
        return true;
    },

    isFunction: function (value) {
        return typeof value === "function";
    },

    checkParam: function (param) {
        if (this.isNull(param)) {
            return false;
        }

        if (this.isUndefined(param)) {
            return false;
        }
        return true;
    },

    isNull: function (value) {
        if (!value && typeof (value) !== "undefined" && value != 0) {
            return true;
        }
        return false;
    },

    isUndefined: function (value) {
        if (typeof (value) == "undefined") {
            return true;
        }
        return false;
    },

    isString: function (str) {
        return typeof str === "string" || str instanceof String;
    },

    isStringAndNotNull: function (obj) {
        if (this.isString(obj)) {
            if (obj.length > 0) {
                return true;
            }
        }
        return false;
    },

    isArray: function (value) {
        return Array.isArray(value);
    }
};

module.exports = Util;