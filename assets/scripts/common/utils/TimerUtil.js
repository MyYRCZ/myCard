var timerUtil = {
    //多少秒后执行(time: 秒)
    setTimeOut: function (time, targetNode, callback) {
        if (targetNode) {
            cc.tween(targetNode)
            .delay(time)
            .call(() => {
                if (callback) {
                    callback();
                }
            })
            .start();
        } else {
            console.warn("setTimeOut targetNode is null");
        }
    },

    setTimeOutToTimes: function (time, times, targetNode, callback) {
        let repeatTimes = 1;
        if (times) {
            repeatTimes = times;
        }

        if (targetNode) {
            let action = cc.tween(targetNode)
                        .delay(time)
                        .call(() => {
                            if (callback) {
                                callback();
                            }
                        })

            let act = cc.tween(targetNode)
                        .repeat(repeatTimes, action)
                        .start()

            return act;
        } else {
            console.warn("setTimeOut targetNode is null")
            return null;
        }
    },

    setTimeOutForever: function (time, targetNode, callback) {
        if (targetNode) {
            let action = cc.tween(targetNode)
                            .delay(time)
                            .call(() => {
                                if (callback) {
                                    callback();
                                }
                            })

            let act = cc.tween(targetNode)
                        .repeatForever(action)
                        .start()

            return act
        } else {
            console.warn("setTimeOut targetNode is null");
            return;
        }
    },

    setTimeOutForeverFirstCall: function (time, targetNode, callback) {
        if (callback) {
            callback();
        }
        this.setTimeOutForever(time, targetNode, callback);
    }
};

module.exports = timerUtil;
