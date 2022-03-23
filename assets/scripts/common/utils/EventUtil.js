//一对多事件回调
var eventUtil = {
    handlers: {},

    //监听指定函数
    eventOn: function (eventName, func, functionThis) {
        let handlers = this.handlers;
        if (!handlers[eventName]) {
            handlers[eventName] = [];
        }

        //检查是不是已经有过注册
        if (this.check(handlers[eventName], func, functionThis)) {
            let callbackObj = {function: func, tag: functionThis};
            handlers[eventName].push(callbackObj);
        } else {
            console.warn("eventOn err eventName = ", eventName, func, functionThis);
        }
    },

    //触发指定事件
    eventEmit: function (eventName) {
        let eventHandlers = this.handlers[eventName];
        if (eventHandlers) {
            for (let i = 0, len = eventHandlers.length; i < len; ++i) {
                let handler = eventHandlers[i];
                handler.function.apply(handler.tag, Array.prototype.slice.call(arguments, 1));
            }
        }
    },

    //事件移除
    eventOff: function (eventName, func, functionThis) {
        let eventHandlers = this.handlers[eventName];
        if (eventHandlers) {
            for (let i = 0, len = eventHandlers.length; i < len; ++i) {
                let handlerObj = eventHandlers[i];
                if (handlerObj.function === func && handlerObj.tag === functionThis) {
                    eventHandlers.splice(i, 1);
                    break;
                }
            }

            if (this.handlers[eventName].length === 0) {
                delete this.handlers[eventName];
            }
        }
    },

    eventOffAll: function (eventName, func, functionThis) {
        let eventHandlers = this.handlers[eventName];
        if (eventHandlers) {
            let len = eventHandlers.length;
            eventHandlers.splice(0, len);
            delete this.handlers[eventName];
        }
    },

    check: function(eventHandlers, func, funcThis) {
        for (let i = 0, len = eventHandlers.length; i < len; ++i) {
            let handlerObj = eventHandlers[i];
            if (handlerObj.function === func && handlerObj.tag === funcThis) {
                return false;
            }
        }
        return true;
    }
};

module.exports = eventUtil;