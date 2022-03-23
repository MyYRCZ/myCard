'use strict'
const utils = require("../../common/utils/utils");
const baseSceneUI = require("./../base/BaseSceneUI");

const hallBtnType = cc.Enum({
    AVATAR: "btn_avatar"
});

cc.Class({
    extends: baseSceneUI,

    properties: {
        animDurTime: 0.5
    },

    onLoad () {
        cc.LL.nodeUtil.addTargetNode(this, this.node, [
            "ui_layout/panel_node",
            "ui_layout/bg_role",
            "ui_layout/bg_role/role",
            "ui_layout/bottom/node_bottom",
            "ui_layout/bottom/node_bottom/bg_bottom",
            "ui_layout/bottom/node_activity/btn_activity",
            "ui_layout/bottom/node_quick/btn_quick",
            "ui_layout/top/node_avatar/btn_avatar",
            "ui_layout/top/node_gold/bg_gold",
            "ui_layout/top/node_diamond/bg_diamond",
            "ui_layout/top/node_setting/btn_setting",
            "ui_layout/middle/gold_table"
        ]);

        cc.LL.componentUtil.addUiTargetComponent(this, this.node, {
            Label: [
                "ui_layout/top/node_avatar/btn_avatar/nick_name",
                "ui_layout/top/node_avatar/btn_avatar/label_id",
                "ui_layout/top/node_gold/bg_gold/gold_label",
                "ui_layout/top/node_diamond/bg_diamond/diamond_label"
            ]
        });

        cc.LL.nodeUtil.addButtonOnClickWithArray(this, this.node, [
            "ui_layout/top/node_avatar/btn_avatar"
        ], this.onBtnCallBack.bind(this));

        this.refreshUserInfo();
        this.initUI();
    },

    loadPrefab () {
        this.prefabPath = {
            userInfoPanel: "prefabs/hall/user_info_panel"
        }
        this.readyLoadPrefabs();
    },

    start () {
        this.loadPrefab();

        this.roomConfig = cc.VV.gameConfig.getRoomConfig();

        let goldTableArray = this.gold_table.children;
        for (let i = 0; i < goldTableArray.length; ++i) {
            goldTableArray[i].emit("init", this.roomConfig[i], this.enterGoldTable);
        }
    },

    initUI () {
        this.bg_bottom.width = cc.winSize.width;
        
        this.playAnimation(this.role, cc.v2(this.role.x, this.role.y), cc.v2(this.role.x + 2000, this.role.y), this.animDurTime);
        this.playAnimation(this.bg_bottom, cc.v2(this.bg_bottom.x, this.bg_bottom.y), cc.v2(this.bg_bottom.x, this.bg_bottom.y + 500), this.animDurTime);
        this.playAnimation(this.btn_activity, cc.v2(this.btn_activity.x, this.btn_activity.y), cc.v2(0, 0), this.animDurTime + 0.1);
        this.playAnimation(this.btn_quick, cc.v2(this.btn_quick.x, this.btn_quick.y), cc.v2(0, 0), this.animDurTime + 0.1);
        
        //top
        this.playAnimation(this.btn_avatar, cc.v2(this.btn_avatar.x, this.btn_avatar.y), cc.v2(0, 0), this.animDurTime);
        this.playAnimation(this.bg_gold, cc.v2(this.bg_gold.x, this.bg_gold.y), cc.v2(0, 0), this.animDurTime);
        this.playAnimation(this.bg_diamond, cc.v2(this.bg_diamond.x, this.bg_diamond.y), cc.v2(0, 0), this.animDurTime);
        this.playAnimation(this.btn_setting, cc.v2(this.btn_setting.x, this.btn_setting.y), cc.v2(0, 0), this.animDurTime);

        //middle
        this.playAnimation(this.gold_table, cc.v2(this.gold_table.x, this.gold_table.y), cc.v2(0, 0), this.animDurTime);
    },

    playAnimation (targetNode, formPos, toPos, animDur, callback) {
        targetNode.setPosition(formPos);
        cc.tween(targetNode)
            .to(animDur, {position: toPos}, {easing: "smooth"})
            .call(() => {
                if (!callback) return;
                utils.invokeCallback(callback);
            })
            .start()
    },

    onBtnCallBack (event) {
        switch(event.node.name) {
            case hallBtnType.AVATAR:
                this.showPanel(this.prefabPath.userInfoPanel, (panel) => {
                    panel.emit("init", this._userInfo, () => {
                        this.refreshUserInfo();
                    });
                });
                break;
        }
    },

    enterGoldTable (subKey) {
        console.log("进入金币场", subKey);
        cc.LL.eventUtil.eventEmit(cc.VV.eventConfig.EVENT_NET.EVENT_ROOM.JOIN_ROOM, subKey, (data) => {
            console.log("EVENT_ROOM.JOIN_ROOM = ", data);
        });
    },

    refreshUserInfo () {
        this._userInfo = cc.VV.gameUserInfo.getUserInfo();
        console.log("game userInfo = ", this._userInfo);
        this.Label_nick_name.string = this._userInfo.nickname;
        this.Label_label_id.string = "ID " + this._userInfo.userId;
        this.Label_gold_label.string = this._userInfo.gold;
        this.Label_diamond_label.string = this._userInfo.diamond;
    },

    showPanel (path, callback) {
        this.getPrefabByPath(path, (prefab) => {
            this.showPanelWithPrefab(prefab, callback);
        });
    },

    showPanelWithPrefab (prefab, callback, parent = this.panel_node) {
        this.panel_node.destroyAllChildren();
        let panel = cc.instantiate(prefab);
        parent.addChild(panel);
        if (callback) callback(panel);
    }

    // update (dt) {},
});
