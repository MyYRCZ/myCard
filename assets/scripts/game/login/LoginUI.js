cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        cc.LL.nodeUtil.addButtonOnClickWithArray(this, this.node, [
            "login/btn_facebook",
            "login/btn_green"
        ], this.onBtnCallBack.bind(this));
    },

    start () {

    },

    onBtnCallBack(event) {
        if (event.node.name === "btn_facebook") {
            console.log("click facebook");
        }

        if (event.node.name === "btn_green") {
            this.onBtnGreen();
        }
    },

    onBtnGreen() {
       cc.LL.eventUtil.eventEmit(cc.VV.eventConfig.EVENT_NET.EVENT_LOGIN);
    },

    



    // update (dt) {},
});
