/**
 *
 */
const utils = require("../../common/utils/utils")

cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: [],
            type: [cc.Node]
        },
        spineBg: {
            default: null,
            type: cc.Node,
        }
    },

    onLoad() {
        this.m_dr = cc.size(1280, 720);////默认分辨率
        var cvs = this.node.getComponent(cc.Canvas);
        this.AutoFitForCanvas(cvs);

        this.node.AutoFitForCanvas = this.AutoFitForCanvas.bind(this);
        this.node.AutoFitForBgs_ByPsize = this.AutoFitForBgs_ByPsize.bind(this);
    },

    AutoFitForCanvas: function (cvs) {
        ////设置整体Canvas的宽高缩放。
        ////-------按比例缩放-----适应屏幕----------
        var size = cc.view.getFrameSize();
        if (!utils.isNull(cvs) && !utils.isUndefined(cvs)) {
            this.m_dr = cvs.designResolution;
            var dr = this.m_dr;

            var finalW = size.width;
            var finalH = size.height;

            if ((size.width / size.height) > (dr.width / dr.height)) {
                //!#zh: 是否优先将设计分辨率高度撑满视图高度。 */
                //cvs.fitHeight = true;
                //如果更长，则用定高
                finalH = dr.height;
                finalW = finalH * size.width / size.height;
            } else {
                /*!#zh: 是否优先将设计分辨率宽度撑满视图宽度。 */
                //cvs.fitWidth = true;
                //如果更短，则用定宽
                finalW = dr.width;
                finalH = size.height / size.width * finalW;
            }
            cvs.designResolution = cc.size(finalW, finalH);
            cvs.node.width = finalW;
            cvs.node.height = finalH;
        }
        this.AutoFitForBgs_ByPsize(size);
        this.autoFitForSpineBgBySize(cvs.designResolution);
    },

    AutoFitForBgs_ByPsize: function (psize) {
        ////设置背景板的缩放------按屏幕/设备大小缩放
        if (!utils.isNull(this.bg) && utils.isArray(this.bg)) {
            var fitWidth = true;
            var dr = this.m_dr;////默认分辨率
            //如果更宽，则使用定高
            if ((psize.width / psize.height) > (dr.width / dr.height)) {
                fitWidth = false;
            }

            for (var i = 0; i < this.bg.length; ++i) {
                //自由缩放撑满
                if (this.bg[i]) {
                    if (fitWidth) {
                        this.bg[i].height = this.bg[i].width / psize.width * psize.height;
                    } else {
                        this.bg[i].width = this.bg[i].height / psize.height * psize.width;
                    }
                }
            }
        }
    },

    autoFitForSpineBgBySize: function (size) {
        if (!this.spineBg) {
            return;
        }

        this.spineBg.scaleX = size.width / this.spineBg.width;
        this.spineBg.scaleY = size.height / this.spineBg.height;
    },
})