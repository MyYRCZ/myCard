/**
 *  @file poker_const.js
 *  @brief 常量定义
 *  @version 1.0
 *  @since 1.0
 *  @author chenwei<tristing.chan@163.com>
 *  @date 2021-9-23  Created it
 */
'use strict';

const POKER_CARDS = [
    // A    2     3     4     5     6     7     8     9    10     J     Q     K
    0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D,   // 方片
    0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D,   // 梅花
    0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x3C, 0x3D,   // 红桃
    0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4A, 0x4B, 0x4C, 0x4D,   // 黑桃
    // 小王、大王
    0xEE, 0xEF,
];

// 牌花色
const CARD_COLOR = {
    COLOR_DIAMOND: 1,           // 方片
    COLOR_CLUB: 2,              // 梅花
    COLOR_HEART: 3,             // 红桃
    COLOR_SPADE: 4              // 黑桃
};

// 牌型
const MELD_TYPE = {
    MELD_NONE: 0,               // 不成型
    MELD_SETS: 1,               // 三条
    MELD_SPECIAL_SETS: 2,       // 炸弹
    MELD_STRAIGHT: 3,           // 普通顺子
    MELD_SPECIAL_STRAIGHT: 4,   // 特殊牌型顺子
};

// 排序方式
const SORT_CARD_TYPE = {
    SORT_BY_WEIGHT: 1,          // 按权重排序
    SORT_BY_COLOR: 2,           // 按花色排序
};

module.exports = {
    POKER_CARDS: POKER_CARDS,
    CARD_COLOR: CARD_COLOR,
    MELD_TYPE: MELD_TYPE,
    SORT_CARD_TYPE: SORT_CARD_TYPE,
};

