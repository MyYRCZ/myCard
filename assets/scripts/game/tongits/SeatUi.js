
cc.Class({
    extends: cc.Component,

    properties: {
        viewPos: 0,
        changeColorTime: 3
    },

    onLoad () {
        this.node.on("init", this.init, this);

        cc.LL.nodeUtil.addTargetNode(this, this.node, [
            "seat_empty",
            "seat"
        ]);

        cc.LL.componentUtil.addUiTargetComponent(this, this.node, {
            Label: [
                "seat/label_name",
                "seat/coin_bg/label_coin"
            ]
        });
    },

    start () {

    },

    init (userInfo) {
        console.log("init playerInfo = ", userInfo);
        this.userInfo = userInfo;

        this.seat_empty.active = !this.userInfo;
        this.seat.active = this.userInfo;

        this.initUI ();
    },

    initUI () {
        if (this.userInfo) {
            this.Label_label_name.string = this.userInfo.nickname;
            this.Label_label_coin.string = this.userInfo.score;
        } else {

        }
    },

    // update (dt) {},
});
