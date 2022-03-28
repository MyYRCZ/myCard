'usr strict'

//ui界面之间的事件调用
var eventUiUtil = {
    handlers: {},

    //监听指定函数
    addEventHandler: function(eventName, tagNode, func, funcThis) {
        let handlers = this.handlers;
        if (!handlers[eventName]) {
            handlers[eventName] = [];
        }
        if (cc.isValid(tagNode)) {
            tagNode.on(eventName, func, funcThis);
            handlers[eventName].push(tagNode);
        }
    },

    //触发指定函数
    emitEvent: function (eventName, param1, param2, param3, param4, param5) {
        let eventHandlers = this.handlers[eventName];
        if (eventHandlers) {
            let delHandlers = [];
            for (let i = 0, len = eventHandlers.length; i < len; i ++) {
                let handlerNode = eventHandlers[i];
                if (cc.isValid(handlerNode)) {
                    handlerNode.emit(eventName, param1, param2, param3, param4, param5);
                } else {
                    delHandlers.push(handlerNode);
                }
            }

            for (let j = 0, len = delHandlers.length; j < len; j ++) {
                this.removeEventHandler(eventName, delHandlers[j]);
            }
        }
    },

    //移除指定事件
    removeEventHandler: function (eventName, tagNode) {
        let eventHandlers = this.handlers[eventName];
        if (eventHandlers) {
            for (let i = 0, len = eventHandlers.length; i < len; i ++) {
                let handlerNode = eventHandlers[i];
                if (handlerNode === tagNode) {
                    if (cc.isValid(handlerNode)) {
                        handlerNode.off(eventName);
                    }
                    eventHandlers.splice(i, 1);
                    break;
                }
            }

            if (this.handlers[eventName].length === 0) {
                delete this.handlers[eventName];
            }
        }
    },

    //移除全部事件
    removeAllEventHandler: function (eventName) {
        let eventHandlers = this.handlers[eventName];
        if (eventHandlers) {
            let len = eventHandlers.length;
            for (let i = 0; i < len; i ++) {
                let handlerNode = eventHandlers[i];
                handlerNode.off(eventName);
            }
            eventHandlers.splice(0, len);
            delete this.handlers[eventName];
        }
    }
};

module.exports = eventUiUtil;