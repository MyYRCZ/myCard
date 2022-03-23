'use strict'
const BasePanel = require("./../base/BasePanel");

cc.Class({
    extends: BasePanel,

    properties: {

    },

    onLoad () {
        this._super();

        cc.LL.componentUtil.addUiTargetComponent(this, this.node, {
            Label: [
                "bg_panel/node_id/id_label"
            ]
        });

        cc.LL.nodeUtil.addButtonOnClickWithArray(this, this.node, [
            "bg_panel/btn_close",
            "bg_panel/btn_sign_out"
        ], this.onBtnCallBack.bind(this));
    },

    start () {
        this._super();
    },

    init (userInfo) {
        this._super();
        this.Label_id_label.string = userInfo.userId;
    },

    onBtnCallBack (event) {
        if (event.node.name === "btn_close") {
            this.show(false);
        }

        if (event.node.name === "btn_sign_out") {
            cc.LL.eventUtil.eventEmit(cc.VV.eventConfig.EVENT_NET.EVENT_GAME.LOGOUT_GAME);
        }
    }

    // update (dt) {},
});
