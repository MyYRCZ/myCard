//
module.exports = {
    hallSetting: {},

    setHallSetting: function(hallSetting) {
        this.hallSetting = hallSetting;
    },

    getServerArray: function() {
        return this.hallSetting["gateServerArray"];
    },

    kvConfig: {
        hallConfig: {
            version: "1.0.0",
            config: {
                rake: 300
            }
        },
        roomConfig: {
            version: "1.0.0",
            config: [
                {
                    basicScore: 1000,
                    minGameScore: 10000,
                    maxGameScore: 100000,
                    subKey: "tongits-1000"
                },
                {
                    basicScore: 3500,
                    minGameScore: 35000,
                    maxGameScore: 500000,
                    subKey: "tongtis-3500"
                },
                {
                    basicScore: 8000,
                    minGameScore: 80000,
                    maxGameScore: -1,
                    subKey: "tongtis-8000"
                }
            ]
        }
    },

    getRoomConfig: function () {
        return this.kvConfig.roomConfig.config;
    },
};
