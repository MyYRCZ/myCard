const stringUtil = require("./StringUtil");

//点击类型
const EVENT_ON_CLICK_TYPE = {
    ON_CLICK_BUTTON: 1,
    ON_CLICK_TOGGLE: 2,
    ON_CLICK_SPRITE: 3
};

let nodeUtil = {};

//根据数组路径批量添加节点
nodeUtil.addTargetNode = function (targetNode, rootNode, pathArray) {
    if (!targetNode) {
        console.warn("target node is invalid");
        return;
    }

    if (!Array.isArray(pathArray)) {
        console.warn("path array is not array");
        return;
    }

    for (let idx = 0; idx < pathArray.length; idx++) {
        let nodeStr = pathArray[idx];
        let pathNode = null;
        if (!rootNode) {
            pathNode = cc.find(nodeStr);
        } else {
            pathNode = cc.find(nodeStr, rootNode);
        }

        if (!pathNode) {
            console.warn("cannot find path node, path: ", pathArray[idx]);
            continue;
        }

        let nodeName = stringUtil.subStringWithLast(nodeStr, "/", nodeStr.length);
        if (targetNode[nodeName]) {

        }
        targetNode[nodeName] = pathNode;
    }
};

// 添加数组点击事件
nodeUtil.addEventOnClickWithArray = function (targetNode, rootNode, pathArray, callback, onClickType, eventName) {
    if (!targetNode) {
        console.warn("target node is invalid!");
        return;
    }

    if (!Array.isArray(pathArray)) {
        console.warn("path array is not array!");
        return;
    }

    if (typeof callback !== "function") {
        console.warn("callback is not a function!");
        return;
    }

    for (let idx = 0; idx < pathArray.length; ++idx) {
        let pathNode = null;
        if (!rootNode) {
            pathNode = cc.find(pathArray[idx]);
        } else {
            pathNode = cc.find(pathArray[idx], rootNode);
        }

        if (!pathNode) {
            console.warn("cannot find path node, path:", pathArray[idx]);
            continue;
        }

        let pathComponent = null;
        if (onClickType === EVENT_ON_CLICK_TYPE.ON_CLICK_TOGGLE) {
            pathComponent = pathNode.getComponent(cc.Toggle);
        } else {
            pathComponent = pathNode.getComponent(cc.Button);
        }

        if (!pathComponent) {
            console.warn("cannot find path component, path:", pathArray[idx]);
            return;
        }

        eventName = eventName || "click"; 
        pathComponent.node.off(eventName);
        pathComponent.node.on(eventName, (event) => {

            //防止连续点击
            pathComponent.enable = false;
            callback(event);
            cc.LL.timerUtil.setTimeOut(0.5, pathComponent.node, () => {
                pathComponent.enable = true;
            });
        }, targetNode);
    }
};

//给节点批量添加点击事件
nodeUtil.addNodeOnClick = function (target, targetNode, callback, eventName, banDoubleClick = false) {
    if (!targetNode) {
        console.warn("targetNode is invalid");
        return;
    }

    if (typeof callback !== "function") {
        console.warn("callback is not a function");
        return;
    }

    eventName = eventName || cc.Node.EventType.TOUCH_END;

    //是否禁止连续点击
    if (banDoubleClick) {
        targetNode.on(eventName, callback, target);
    } else {
        let newCallback = (event) => {
            callback(event);

            cc.LL.timerUtil.setTimeOut(0.5, targetNode, () => {
                targetNode.once(eventName, newCallback, target);
            });
        };
        targetNode.once(eventName, newCallback, target);
    }
};

//给按钮批量添加点击事件
nodeUtil.addButtonOnClickWithArray = function (targetNode, rootNode, pathArray, callback, eventName) {
    if (!eventName || typeof eventName !== "string") {
        eventName = 'click';
    }

    this.addEventOnClickWithArray(targetNode, rootNode, pathArray, callback, EVENT_ON_CLICK_TYPE.ON_CLICK_BUTTON, eventName);
};

module.exports = nodeUtil;

