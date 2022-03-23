var utils = require("../utils/utils");
var stringUtil = require("../utils/StringUtil");
var componentConfig = require("../../game/config/ComponentConfig");
var componentUtil = {};

/**获取节点的组件 */
componentUtil.addUiTargetComponent = function (_target, _targetNode, _component) {
    if (utils.isNull(_target) || utils.isUndefined(_target)) {
        console.warn("ComponentUtil.addUiTargetComponent target is null or undefined");
        return;
    }

    if (utils.isNull(_component) || utils.isUndefined(_component)) {
        console.warn("ComponentUtil.addUiTargetComponent component is null or undefined");
        return;
    }

    for (const key in _component) {
        if (utils.isArray(_component[key]) && _component[key].length > 0) {
            for (var num = 0; num < _component[key].length; num++) {
                if (!stringUtil.isEmpty(_component[key][num])) {
                    if (key in componentConfig) {
                        var str = _component[key][num];
                        var str1 = stringUtil.subStringWithLast(str, "/", str.length);
                        if (utils.isNull(_targetNode) || utils.isUndefined(_targetNode)) {
                            var _node = cc.find(str);
                            if (_node) {
                                _target[key + "_" + str1] = _node.getComponent(componentConfig[key]);
                            } else {
                                cc.error("cannot find node str = " + str);
                            }
                        } else {
                            var _node = cc.find(str, _targetNode);
                            if (_node) {
                                _target[key + "_" + str1] = _node.getComponent(componentConfig[key]);
                            } else {
                                cc.error("cannot find node str = " + str);
                            }
                        }
                    } else {
                        console.error("componentUtil.addUiTargetComponent " + key + "not in componentConfig");
                    }
                } else {
                    console.error("componentUtil.addUitargetComponent " + key + "has string is null");
                }
            }
        } else {
            console.error("componentUtil.addUiTargetComponent " + key + "Array is not Array or null");
        }
    }
};

module.exports = componentUtil;

