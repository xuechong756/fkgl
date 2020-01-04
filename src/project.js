require = function n(a, s, l) {
    function h(e, t) {
        if (!s[e]) {
            if (!a[e]) {
                var i = "function" == typeof require && require;
                if (!t && i) return i(e, !0);
                if (r) return r(e, !0);
                var o = new Error("Cannot find module '" + e + "'");
                throw o.code = "MODULE_NOT_FOUND", o
            }
            var c = s[e] = {
                exports: {}
            };
            a[e][0].call(c.exports, function(t) {
                return h(a[e][1][t] || t)
            }, c, c.exports, n, a, s, l)
        }
        return s[e].exports
    }
    for (var r = "function" == typeof require && require, t = 0; t < l.length; t++) h(l[t]);
    return h
}({
    CollectionBox: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "0b664Tow55F8Ie+ejSGluQk", "CollectionBox"), cc.Class({
            extends: cc.Component,
            properties: {
                spriteImg: {
                    default: null,
                    type: cc.Sprite
                },
                introducetext: {
                    default: null,
                    type: cc.Label
                },
                nametext: {
                    default: null,
                    type: cc.Label
                }
            },
            initData: function(i) {
                this.image = i.image, cc.loader.load(i.image, function(t, e) {
                    this.spriteImg && (this.spriteImg.spriteFrame = new cc.SpriteFrame(e), this.spriteImg.node.anchorX = .5, this.spriteImg.node.anchorY = .5), this.nametext.string = i.name, this.introducetext.string = i.player + "人正在玩"
                }.bind(this))
            },
            onCloseView: function() {
                this.node.destroy()
            },
            start: function() {
                this.spriteImg.node.on("touchend", function() {
                    console.log("点击图片"), this.BtnClick()
                }, this), this.node.on("touchend", function() {
                    console.log("点击到了")
                }, this)
            },
            BtnClick: function() {
                console.log("点击图片"), cc.sys.platform == cc.sys.WECHAT_GAME && wx.previewImage({
                    current: this.image,
                    urls: [this.image],
                    success: function() {
                        console.log("加载图片成功！")
                    }
                })
            }
        }), cc._RF.pop()
    }, {}],
    CollectionViewItem: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "9dbf2zh+y9FmLi0fxVbqMVr", "CollectionViewItem"), cc.Class({
            properties: {
                spriteIcon: {
                    default: null,
                    type: cc.Sprite
                },
                mask: {
                    default: null,
                    type: cc.Mask
                },
                gameName: {
                    default: null,
                    type: cc.Label
                },
                gameWx: {
                    default: null,
                    type: cc.Prefab
                }
            },
            start: function() {
                this.node.on("touchstart", function() {}, this), this.node.on("touchend", function() {
                    this.BtnEndClick()
                }, this), this.node.on("btnClicked", function() {
                    this.BtnClick()
                }, this)
            },
            init_data: function(t, e) {
                console.log("数据id" + t.id), this.id = t.id, this.name = t.name, this.pic = t.radius_img, this.image = t.image, this.appid = t.appid, this.player = t.player, this.same = t.same, e % 2 == 0 ? (console.log("改变颜色"), this.node.color = new cc.color(83, 83, 83, 255)) : this.node.color = new cc.color(51, 51, 51, 255), console.log("坐标" + this.node.x + "  :" + this.node.y), this.createImage(this.pic)
            },
            setnodesize: function() {
                var t = this.gameName.node.height;
                this.setText(this.gameName.getComponent(cc.Label), this.name, this.node.width), this.gameName.node.x = this.node.width / 2, this.gameName.node.y = t / 2;
                var e = this.node.width - t - t / 2;
                this.mask.node.setContentSize(e, e), this.spriteIcon.node.setContentSize(e, e), this.spriteIcon.node.x = this.node.width / 2, this.spriteIcon.node.y = 1.1 * t + e / 2, console.log("this.node.width", this.node.width), console.log("this.node.height", this.node.height)
            },
            getitemlength: function(t) {
                return t.width > t.height ? t.height : t.width
            },
            createImage: function(t) {
                var e = this;
                if ("" != t && null != t && null != t && cc.sys.platform == cc.sys.WECHAT_GAME) try {
                    var i = wx.createImage();
                    i.onload = function() {
                        try {
                            var t = new cc.Texture2D;
                            t.initWithElement(i), t.handleLoadedTexture(), e.spriteIcon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t), e.setnodesize()
                        } catch (t) {}
                    }, i.src = t
                } catch (t) {
                    cc.log(t)
                }
            },
            setText: function(t, e, i) {
                e = e.toString();
                for (var o = 0; o <= e.length; o++)
                    if (t.string = e.substr(0, o), t.node.width + 18 >= i && o != e.length) return void(t.string = e.substr(0, o) + "...")
            },
            BtnStartClick: function() {
                var t = cc.scaleTo(.1, 1.2, 1.2).easing(cc.easeCubicActionOut()),
                    e = cc.scaleTo(.1, 1, 1).easing(cc.easeCubicActionOut()),
                    i = cc.sequence(t, e, cc.callFunc(this.BtnEndClick, this));
                this.node.runAction(i)
            },
            BtnEndClick: function() {
                var t = cc.scaleTo(.1, 1.2, 1.2).easing(cc.easeCubicActionOut()),
                    e = cc.scaleTo(.1, 1, 1).easing(cc.easeCubicActionOut()),
                    i = cc.sequence(t, e);
                this.node.runAction(i), this.node.dispatchEvent(new cc.Event.EventCustom("btnClicked", !0))
            },
            navigateToMiniProgram: function(t) {
                cc.sys.platform == cc.sys.WECHAT_GAME && wx.navigateToMiniProgram({
                    appId: t,
                    path: null,
                    extraData: "wx4aab7ee381936b54",
                    envVersion: "release"
                })
            },
            BtnClick: function() {
                this.navigateToMiniProgram(this.appid)
            },
            extends: cc.Component
        }), cc._RF.pop()
    }, {}],
    CollectionView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "fb74aquCxNLU5jkguDU6efc", "CollectionView");
        var o = t("Global");
        cc.Class({
            extends: cc.Component,
            properties: {
                content: {
                    default: null,
                    type: cc.Node
                },
                CollectionViewItemPrefab: {
                    default: null,
                    type: cc.Prefab
                },
                scrollview: {
                    default: null,
                    type: cc.Node
                },
                gameOverView: cc.Node
            },
            onLoad: function() {
                this.isScale = !0, this.isStart = !0, this.laypos = 0, this.Collectiondata = null, this.showcount = null, this.iteminterval = null, this.default_showcount = 4, this.default_iteminterval = 10, this.scale = .64, this.isData = !1, this.isShowAni = !1, this.scrollview_scaleXs = this.scrollview.scaleX, this.scrollview_scaleYs = this.scrollview.scaleY
            },
            start: function() {
                this.initContent(), console.log("缩放之前的大小" + this.scrollview_scaleYs), this.scrollview.on("touchend", function(t) {
                    console.log("点击视图"), this.isScale || this.isShowAni || (console.log("放大缩小"), this.BtnClick())
                }, this), this.node.on(cc.Node.EventType.TOUCH_START, function(t) {
                    this.isScale && this.scrollview.active && !this.isShowAni && (console.log("缩小11" + this.isScale), this.BtnClick())
                }, this), this.gameOverView.on(cc.Node.EventType.TOUCH_START, function(t) {
                    this.isScale && this.scrollview.active && !this.isShowAni && (console.log("缩小11" + this.isScale), this.BtnClick())
                }, this), this.scrollview.runAction(cc.sequence(cc.fadeIn(1), cc.delayTime(1)))
            },
            showAnimation: function() {
                console.log("播放动画"), this.isShowAni = !0, this.scrollview.getComponent(cc.ScrollView).scrollToTop(.1), this.isScale && (this.scrollview.width > this.scrollview.height ? (this.scrollview.setScale(this.scrollview_scaleXs, this.scale), this.content.setScale(this.scale, 1), this.content.width = this.content.width * this.scale) : (this.scrollview.setScale(this.scale, this.scrollview_scaleYs), this.content.setScale(1, this.scale), this.content.height = this.content.height * this.scale)), this.scrollview.runAction(cc.sequence(cc.scaleTo(1, this.scrollview_scaleXs, this.scrollview_scaleYs), cc.callFunc(this.setViewScale.bind(this)))), this.content.runAction(cc.scaleTo(1, 1, 1)), this.scrollview.width > this.scrollview.height ? this.content.width = this.content.width / this.scale : this.content.height = this.content.height / this.scale
            },
            setViewScale: function() {
                this.isScale = !0, this.isShowAni = !1, this.scrollview.getComponent(cc.ScrollView).scrollToTop(.1)
            },
            BtnClick: function() {
                this.scrollview.getComponent(cc.ScrollView).scrollToTop(.1), this.isScale ? (this.scrollview.width > this.scrollview.height ? (this.scrollview.setScale(this.scrollview_scaleXs, this.scale), this.content.setScale(this.scale, 1), this.content.width = this.content.width * this.scale) : (this.scrollview.setScale(this.scale, this.scrollview_scaleYs), this.content.setScale(1, this.scale), this.content.height = this.content.height * this.scale), this.isScale = !1) : (this.scrollview.setScale(this.scrollview_scaleXs, this.scrollview_scaleYs), this.content.setScale(1, 1), this.scrollview.width > this.scrollview.height ? this.content.width = this.content.width / this.scale : this.content.height = this.content.height / this.scale, this.isScale = !0)
            },
            getShowitemCount: function() {
                if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                    var t = cc.director.getWinSizeInPixels(),
                        e = 0;
                    e = this.scrollview.width > this.scrollview.height ? t.width : t.height;
                    var i = this.content.children,
                        o = 0,
                        c = 0;
                    for (console.log("nodelength", e), c = 0; c < i.length && !(e <= (o += this.getitemlength(i[c]))); c++);
                    console.log("index", c), console.log("showcount" + this.showcount), this.showcount > c + 1 && (this.showcount = c + 1), console.log("this.showcount", this.showcount)
                }
            },
            initContent: function() {
                this.content.anchorX = 0, this.content.anchorY = 0, this.content.x = -this.scrollview.width / 2, this.content.y = -this.scrollview.height / 2
            },
            initGameItem: function(t) {
                if (console.log("信息长度" + t.length), this.content) {
                    console.log("data", t), this.content.removeAllChildren();
                    for (var e = 0; e < t.length; e++) {
                        var i = cc.instantiate(this.CollectionViewItemPrefab);
                        i.getComponent("CollectionViewItem").init_data(t[e], e), this.content.addChild(i)
                    }
                    this.scrollview.getComponent(cc.ScrollView).scrollToTop(.1), this.getShowitemCount(), this.interval(), this.Refreshcontent()
                }
            },
            Refreshcontent: function() {
                for (var t = this.content.children, e = 0; e < t.length; e++) this.setItemPos(t[e]);
                this.RefreshcontentLength()
            },
            GetGameData: function() {
                var e = null;
                if (console.log("展示游戏互导功能"), null != o.gameData) return console.log("全局的参数11" + o.gameData), this.scrollview.active = !0, void this.initGameItem(o.gameData);
                cc.sys.platform == cc.sys.WECHAT_GAME && wx.request({
                    url: "https://flzs.yzrom.com/index.php/api/v2/program/get_program",
                    data: {
                        limit: 10,
                        type: "1",
                        appid: "wxb1275a606ac46b05"
                    },
                    method: "POST",
                    success: function(t) {
                        if (console.log("返回数据：", t), t && 200 == t.statusCode) {
                            if (this.Collectiondata = t.data.data, !this.Collectiondata.list || 0 === this.Collectiondata.list.length) return console.log("数据长度为0"), void(this.scrollview.active = !1);
                            this.isData = !0, o.isStart || (this.scrollview.active = !0), e = t.data.data.list, o.gameData = e, this.initGameItem(e)
                        } else this.scrollview.active = !1
                    }.bind(this),
                    fail: function() {
                        console.log("请求失败？")
                    }
                })
            },
            setItemPos: function(t) {
                var e = this.getitemlength(t);
                console.log("this.getitemlength(item)", this.getitemlength(t)), this.scrollview.width > this.scrollview.height ? t.setPosition(this.laypos, 0) : t.setPosition(0, this.laypos), console.log("设置之后的位置" + this.laypos), this.laypos = this.laypos + e + this.iteminterval
            },
            getitemlength: function(t) {
                return this.scrollview.width > this.scrollview.height ? t.width : t.height
            },
            getShowcount: function() {
                var t = this.content.children,
                    e = this.showcount;
                return t.length < this.showcount && (e = t.length), e
            },
            interval: function() {
                for (var t = 0, e = this.content.children, i = 0; i < 6; i++) t += this.getitemlength(e[i]);
                this.getitemlength(this.scrollview) - t < 0 && this.default_iteminterval
            },
            RefreshcontentLength: function(t) {
                for (var e = this.content.children, i = e.length, o = 0, c = 0; c < i; c++) o += this.getitemlength(e[c]);
                o += this.iteminterval * (i - 1), this.scrollview.width > this.scrollview.height ? this.content.width < o && (this.content.width = o) : this.content.height < o && (this.content.height = o)
            }
        }), cc._RF.pop()
    }, {
        Global: "Global"
    }],
    Global: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "39df5glsoFMF7MHjepo2OHl", "Global");
        var o = {
            isShowGameView: 0,
            gameData: null,
            gadViewData: null,
            isStart: !1,
            gameCount: 0,
            shareStatus: 1,
            userAppid: "",
            gameAppid: "wxb1275a606ac46b05",
            getData: function() {
                if (null != cc.sys.localStorage.getItem("userData") && null != cc.sys.localStorage.getItem("userData")) {
                    var t = JSON.parse(cc.sys.localStorage.getItem("userData"));
                    this.gameCount = t.gameNum
                } else this.gameCount = 0
            },
            saveData: function() {
                var t = {
                    name: "user",
                    gameNum: this.gameCount
                };
                cc.sys.localStorage.setItem("userData", JSON.stringify(t)), cc.sys.localStorage.setItem("isData", 1), console.log("复活次数" + this.gameCount)
            },
            initStorage: function() {
                var t = cc.sys.localStorage.getItem("isData");
                if (null == t || 0 == t || null == t) {
                    console.log("local data init");
                    var e = {
                        name: "user",
                        gameNum: this.gameCount
                    };
                    cc.sys.localStorage.setItem("userData", JSON.stringify(e)), cc.sys.localStorage.setItem("isData", 1)
                }
            }
        };
        e.exports = o, cc._RF.pop()
    }, {}],
    WatchVideo: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a55ffCuc1pNOJr/btNm2aMm", "WatchVideo"), cc.Class({
            extends: cc.Component,
            properties: {},
            start: function() {
                this.node.on("watchVideo", function(t) {
                    this.onVideoGet("adunit-6a218ee9739626db", t.detail.callback, t.detail.target)
                }, this)
            },
            onVideoGet: function(t, e, i) {
                "undefined" == typeof wx ? console.log("it is not wechat") : "2.0.4" <= wx.getSystemInfoSync().SDKVersion ? this.showAd(t, e, i) : (wx.showToast({
                    title: "微信版本过低，无法看广告",
                    icon: "none",
                    image: "",
                    duration: 0
                }), this.delayfun(1.5, function() {
                    return wx.hideToast()
                }))
            },
            delayfun: function(t, e) {
                var i = cc.sequence(cc.delayTime(t), cc.callFunc(e, this));
                this.node.runAction(i)
            },
            showAd: function(t, e, i) {
                var o = this;
                if (!t) return console.log("没有视频广告ID"), wx.showToast({
                    title: "没有广告ID，无法看广告",
                    icon: "none",
                    image: "",
                    duration: 15e3
                }), void this.delayfun(1.5, function() {
                    return wx.hideToast()
                });
                this.videoAd || (this.videoAd = wx.createRewardedVideoAd({
                    adUnitId: t
                })), this.videoAd.load().then(function() {
                    o.videoAd.show(), o.videoAd.onClose(function(t) {
                        o.videoAd.offClose(), (t && t.isEnded || void 0 === t) && (console.log("视屏广告成功"), e.call(i))
                    })
                }).catch(function(t) {
                    return console.log(t.errMsg)
                }), this.videoAd.onError(function(t) {
                    console.log("看视频错误信息："), console.log(t.errCode), console.log(t.errMsg)
                })
            }
        }), cc._RF.pop()
    }, {}],
    ball: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "80bb7wfVeVHBbaqpN8D31eF", "ball"), cc.Class({
            extends: cc.Component,
            properties: {
                first_col: 0
            },
            start: function() {}
        }), cc._RF.pop()
    }, {}],
    bottom: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "7effaNVISFC8bDVJ8XPY09C", "bottom"), cc.Class({
            extends: cc.Component,
            properties: {
                mainNode: cc.Node,
                a_bottom_bounce: cc.AudioClip
            },
            onBeginContact: function(t, e, i) {
                1 == this.mainNode.getComponent("game").slowMode && (this.mainNode.getComponent("game").end_game(), cc.audioEngine.stop(this.mainNode.getComponent("game").heartBeat)), 1 == this.mainNode.getComponent("game").toggleAudio && i.body.linearVelocity.y < -180 && cc.audioEngine.play(this.a_bottom_bounce, !1)
            }
        }), cc._RF.pop()
    }, {}],
    comboSet: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "20dacTuJipFB7ROVYFXnEXi", "comboSet"), cc.Class({
            extends: cc.Component,
            properties: {
                mainNode: cc.Node,
                a_boardHit: cc.AudioClip
            },
            onBeginContact: function(t, e, i) {
                1 == this.mainNode.getComponent("game").toggleAudio && i.body.linearVelocity.y < -280 && cc.audioEngine.play(this.a_boardHit), i.node.getComponent("ball").first_col = 1
            }
        }), cc._RF.pop()
    }, {}],
    floatingadItem: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "2e4daBT9b1P45Mulen3tH9y", "floatingadItem");
        var o = cc.Enum({
            type_button: 1,
            type_timePopup: 2,
            type_buttonPopup: 3
        });
        cc.Class({
            extends: cc.Component,
            properties: {
                ad_icon: {
                    default: null,
                    type: cc.Sprite,
                    tooltip: "要显示的图片"
                },
                ad_type: {
                    default: o.type_button,
                    type: cc.Enum(o),
                    tooltip: "漂浮广告的类型：type_button是浮窗类型，type_timePopup是倒计时类型，type_buttonPopup是按钮关闭类型"
                },
                ad_Showtime: {
                    default: 7,
                    visible: function() {
                        return this.ad_type == o.type_timePopup
                    },
                    tooltip: "倒计时广告关闭时间"
                },
                ad_timetext: {
                    default: 7,
                    visible: function() {
                        return this.ad_type == o.type_timePopup
                    },
                    type: cc.Label,
                    tooltip: "倒计时广告时间显示文字"
                },
                isReplaceImg: {
                    default: !0,
                    tooltip: "设置显示图片是否可以更改"
                }
            },
            start: function() {
                this.node.on("touchend", function() {
                    this.navigateToMiniProgram()
                }.bind(this))
            },
            unuse: function() {
                this.ad_Showtime = 7, this.node.active = !1
            },
            reuse: function() {
                this.node.active = !0
            },
            init: function(t, e) {
                t && 0 != t.length && (this.name = t.name, this.image = t.image, this.link = t.link, this.appid = t.appid, this.target = e, this.isReplaceImg && this.createImage(this.image))
            },
            navigateToMiniProgram: function() {
                if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                    if (!this.appid) return void console.log("没有APPID！");
                    wx.navigateToMiniProgram({
                        appId: this.appid,
                        path: this.link,
                        extraData: "",
                        envVersion: "release"
                    })
                }
            },
            createImage: function(t) {
                var e = this;
                if ("" != t && null != t && null != t && cc.sys.platform == cc.sys.WECHAT_GAME) try {
                    var i = wx.createImage();
                    i.onload = function() {
                        try {
                            var t = new cc.Texture2D;
                            t.initWithElement(i), t.handleLoadedTexture(), e.ad_icon.spriteFrame = new cc.SpriteFrame(t)
                        } catch (t) {}
                    }, i.src = t
                } catch (t) {
                    cc.log(t)
                }
            },
            onCloseButtonClick: function() {
                this.closeAd()
            },
            closeAd: function() {
                this.target.FloatingAdPool.put(this.node)
            },
            update: function(t) {
                this.ad_type == o.type_timePopup && (this.ad_Showtime -= t, this.ad_timetext && (this.ad_timetext = Math.floor(this.ad_Showtime).toString), this.ad_Showtimes <= 0 && this.closeAd())
            }
        }), cc._RF.pop()
    }, {}],
    floatingadview: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "f932bvm2DhGebp6SSeqbnce", "floatingadview");
        var c = t("Global");
        cc.Class({
            extends: cc.Component,
            properties: {
                floatingad_prefab: {
                    default: null,
                    type: cc.Prefab,
                    tooltip: "浮窗的预制体"
                },
                floatingad_node: {
                    default: [],
                    type: cc.Node,
                    tooltip: "浮窗的节点数组"
                }
            },
            start: function() {
                this.FloatingAddata = null, this.FloatingAdPool = new cc.NodePool("floatingadItem"), this.floatingad_node && (this.floatingad_node.active = !1)
            },
            GetGameData: function() {
                null == c.gadViewData ? wx.request({
                    url: "https://flzs.yzrom.com/index.php/api/v2/program/get_program",
                    data: {
                        limit: 10,
                        type: "1",
                        appid: "wxb1275a606ac46b05"
                    },
                    method: "POST",
                    success: function(t) {
                        console.log("FloatingAddata返回数据：", t), t && 200 == t.statusCode && t.data && t.data.data && (this.FloatingAddata = t.data.data.suspend, c.gadViewData = t.data.data.suspend, this.FloatingAddata && 0 !== this.FloatingAddata.length ? this.initGameItem(this.FloatingAddata) : console.log("数据长度为0"))
                    }.bind(this),
                    fail: function() {
                        console.log("请求失败？")
                    }
                }) : this.initGameItem(c.gadViewData)
            },
            initGameItem: function(t) {
                if (t && 0 !== t.length && 0 < this.floatingad_node.length && t)
                    for (var e = this.floatingad_node.length, i = t.length - 1, o = 0; o < e; o++) this.floatingad_node[o] && (t[o] ? (c.isStart || (this.floatingad_node[o].active = !0), this.floatingad_node[o].getComponent("floatingadItem").init(t[o], this)) : (c.isStart || (this.floatingad_node[o].active = !1), this.floatingad_node[o].getComponent("floatingadItem").init(t[i], this)))
            },
            ShowfloatingAd: function() {
                var t = null;
                if (0 < this.FloatingAdPool.size()) t = this.FloatingAdPool.get();
                else {
                    if (console.log("FloatingAdPool---"), this.floatingad_prefab && (t = cc.instantiate(this.floatingad_prefab)), !this.FloatingAddata) return;
                    t.getComponent("floatingadItem").init(this.FloatingAddata[0], this), cc.Canvas.instance.node.addChild(t, 100)
                }
            }
        }), cc._RF.pop()
    }, {
        Global: "Global"
    }],
    game: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "5c11ddoyKNMJ5TmRGO/0Ktp", "game");
        var c = t("Global");
        cc.Class({
            extends: cc.Component,
            properties: {
                score: 0,
                first_col: 0,
                ball: cc.Node,
                ball_trail: cc.Node,
                direction: -1,
                right_board: cc.Node,
                right_front: cc.Node,
                left_board: cc.Node,
                left_front: cc.Node,
                game_layer: cc.Node,
                score_label: cc.Label,
                right_ring: cc.Node,
                timeBar: cc.Node,
                timeNode: cc.Node,
                goal_effect: cc.Prefab,
                comboPrefab: cc.Prefab,
                shatter1: cc.Prefab,
                shatter2: cc.Prefab,
                pauseIcon: cc.Node,
                game_over: cc.Node,
                restart_btn: cc.Node,
                share_btn: cc.Node,
                home_btn: cc.Node,
                guide: cc.Node,
                timeout: cc.Node,
                ball_shadow: cc.Node,
                comboPlus: cc.Prefab,
                game_pause: cc.Node,
                loadGraphics: cc.Graphics,
                crowd: {
                    default: [],
                    type: cc.Prefab
                },
                crowd_layer: cc.Node,
                toggleAudio: !0,
                a_ambience: cc.AudioClip,
                a_addForce: cc.AudioClip,
                a_applause: cc.AudioClip,
                a_scoreNet: cc.AudioClip,
                a_flameon: cc.AudioClip,
                a_fireSound: cc.AudioClip,
                a_timeOut: cc.AudioClip,
                a_btnClick1: cc.AudioClip,
                a_btnClick2: cc.AudioClip,
                a_heart: cc.AudioClip,
                a_wauw: cc.AudioClip,
                a_yeah: cc.AudioClip,
                a_boom: cc.AudioClip,
                gadView: cc.Node,
                leftView: cc.Node,
                tvBtn: cc.Node,
                shareBtn: cc.Node,
                gameCountTxt: cc.Label
            },
            onLoad: function() {
                var e = this;
                c.initStorage(), c.getData(), cc.director.getCollisionManager().enabled = !0, cc.director.getPhysicsManager().enabled = !0, cc.director.getPhysicsManager().gravity = cc.v2(0, -640), e.node.on("touchstart", function() {
                    1 != e.slowMode && (e.playAudio(e.a_addForce), 0 == e.started && (e.ballRigid.gravityScale = 9, e.guide.active = !1, e.pauseIcon.active = !0, console.log("游戏开始"), c.getData(), c.isStart || (e.setViewActive(!1), c.isStart = !0), e.ball_trail.children[0].getComponent(cc.ParticleSystem).resetSystem()), e.ballRigid.linearVelocity = cc.v2(360 * e.direction, 1650), e.ballRigid.angularVelocity = 700 * e.direction)
                }), e.pauseIcon.on("touchstart", function() {
                    e.playAudio(e.a_btnClick1)
                }), e.pauseIcon.on("touchend", function() {
                    e.playAudio(e.a_btnClick2), e.game_pause.active = !0, e.started = 0, e.game_pause.runAction(cc.sequence(cc.callFunc(e.pauseBack, e), cc.delayTime(.5), cc.callFunc(e.fadeSetting, e))), e.normalCrowdAct()
                }), e.restart_btn.on("touchstart", function() {
                    e.playAudio(e.a_btnClick1)
                }), e.restart_btn.on("touchend", function() {
                    e.playAudio(e.a_btnClick2), e.ball.setPosition(cc.p(136.3, 353, 4)), e.init(), cc.director.getPhysicsManager().gravity = cc.v2(0, -640), e.game_over.children[0].opacity = 0, e.game_over.children[1].opacity = 0, e.game_over.children[1].setScaleY(0), e.game_over.children[2].opacity = 0, e.game_over.children[7].opacity = 0, e.game_over.children[7].active = !1, e.game_over.children[5].active = !1, e.game_over.active = !1, e.tvBtn.active = !1, e.shareBtn.active = !1, 0 < c.gameCount && (c.gameCount -= 1, c.saveData()), e.timeNode.active = !0, e.pauseIcon.active = !0, e.guide.active = !0, e.left_board.setPosition(cc.p(-514, -13)), e.left_front.setPosition(cc.p(-250, -56.6)), e.left_board.children[3].setPosition(cc.p(44, e.backcolY - 66.7)), e.left_board.children[4].setPositionY(e.backcolY), e.left_board.children[2].setPositionY(-43), e.right_board.setPosition(cc.p(622, 147)), e.right_front.setPosition(cc.p(554.5, 103)), e.right_board.children[3].setPosition(cc.p(44, e.backcolY - 66.7)), e.right_board.children[4].setPosition(cc.p(26.6, e.backcolY)), e.right_board.children[2].setPosition(cc.p(64.2, -43)), e.node.getComponent(cc.Animation).play("left-board-move"), e.normalCrowdAct(), e.timeBar.color = cc.Color.GREEN
                }), e.game_pause.children[2].on("touchstart", function() {
                    e.playAudio(e.a_btnClick1)
                }), e.game_pause.children[2].on("touchend", function() {
                    e.playAudio(e.a_btnClick2), e.toggleSetting ? (e.game_pause.children[1].runAction(cc.spawn(cc.scaleTo(.3, 1, 1), cc.fadeTo(.5, 255))), e.toggleSetting = !1) : (e.game_pause.children[1].runAction(cc.spawn(cc.scaleTo(.3, 1, 0), cc.fadeTo(.2, 0))), e.toggleSetting = !0)
                }), e.game_pause.children[3].on("touchstart", function() {
                    e.playAudio(e.a_btnClick1)
                }), e.game_pause.children[3].on("touchend", function() {
                    e.playAudio(e.a_btnClick2), e.game_pause.active = !1, e.game_pause.children[3].setPosition(cc.p(10, -69)), e.game_pause.children[3].opacity = 0, e.started = 1
                }), e.game_over.children[2].on("touchstart", function() {
                    e.playAudio(e.a_btnClick1)
                }), e.game_over.children[2].on("touchend", function() {
                    e.playAudio(e.a_btnClick2), e.toggleSetting ? (e.game_over.children[1].runAction(cc.spawn(cc.scaleTo(.3, 1, 1), cc.fadeTo(.5, 255))), e.toggleSetting = !1) : (e.game_over.children[1].runAction(cc.spawn(cc.scaleTo(.3, 1, 0), cc.fadeTo(.2, 0))), e.toggleSetting = !0)
                }), e.shareBtn.on("touchend", function() {
                    e.onShareEvent()
                }), e.tvBtn.on("touchend", function() {
                    var t = new cc.Event.EventCustom("watchVideo", !0);
                    t.detail = {
                        callback: function() {
                            c.gameCount = 3, c.saveData(), e.continueGame()
                        },
                        target: this
                    }, e.node.dispatchEvent(t)
                }), e.loadGraphics.node.children[0].on("touchend", function() {
                    e.continueGame()
                }), e.home_btn.on("touchstart", function() {
                    e.playAudio(e.a_btnClick1), cc.director.loadScene("main")
                }), e.home_btn.on("touchend", function() {
                    e.playAudio(e.a_btnClick2), cc.director.loadScene("main")
                }), this.getShareStatus()
            },
            onShareEvent: function() {
                var t = this;
                if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                    var e = Math.floor(3 * Math.random());
                    wx.shareAppMessage({
                        title: "无兄弟，不篮球!",
                        imageUrl: "https://dccbg.yzrom.com/enve_caige/game/201809/fengkuanglqiu/share.png"
                    }), this.scheduleOnce(function() {
                        if (0 == e) return wx.showToast({
                            title: "分享未成功，请重新分享",
                            icon: "none",
                            image: "",
                            duration: 2e3
                        }), void console.log("提示分享未成功");
                        0 < e && (wx.showToast({
                            title: "分享成功",
                            icon: "none",
                            image: "",
                            duration: 2e3
                        }), c.gameCount = 3, c.saveData(), t.continueGame())
                    }, 2)
                }
            },
            start: function() {
                this.ambiencePlay = cc.audioEngine.play(this.a_ambience, !0), this.ballRigid = this.ball.getComponent(cc.RigidBody), this.init(), this.top_score = cc.sys.localStorage.getItem("dunk_score"), null != this.top_score && 0 != this.top_score && null != this.top_score || (this.top_score = 0), this.crowdArr = [], this.crowdGen(), this.guide.active = !0, this.normalCrowdAct(), this.isUnShowShareView = 0, this.getIsShare(), cc.sys.platform == cc.sys.WECHAT_GAME && (wx.showShareMenu({
                    withShareTicket: !0
                }), wx.onShareAppMessage(function() {
                    return {
                        title: "无兄弟，不篮球！",
                        imageUrl: "https://dccbg.yzrom.com/enve_caige/game/201809/fengkuanglqiu/share.png"
                    }
                }))
            },
            update: function(t) {
                this.ballPos = this.ball.getPosition(), this.ball_trail.setPosition(this.ballPos), this.updateShadow(), 1 == this.started && this.timeCal(t), this.drawIt && this.updateDraw(t)
            },
            init: function() {
                this.score = 0, this.offtime = 6, this.started = 0, this.comboNum = 0, this.direction = -1, this.slowMode = 0, this.delta = 0, this.toggleSetting = !0, this.fire = !1, this.idle = !0, this.isShared = !1, this.drawIt = !1, this.ball_trail.children[0].getComponent(cc.ParticleSystem).stopSystem(), this.ball_trail.children[1].getComponent(cc.ParticleSystem).stopSystem(), this.ball.children[1].active = !1, this.ball.children[0].active = !0, this.ballPos = this.ball.getPosition(), this.ball_trail.setPosition(this.ballPos), this.ballRigid.gravityScale = 0, this.ballRigid.linearVelocity = cc.v2(0, 0), this.backcolY = 23.1, this.lowComboMessage = ["厉害了!", "进球!", "空心!", "牛逼了老铁!", "漂亮!", "嘭!", "加热!"], this.highComboMessage = ["燃烧吧，骚年!", "这个好!", "YEAH!", "嘭!", "好球!", "WOW!", "带劲!", "蓝心!"], this.timeBar.setPositionX(0), this.ballRigid.angularVelocity = 0, this.ball_shadow.opacity = 0, this.score_label.string = this.score, this.pauseIcon.active = !1
            },
            goal: function(t) {
                var e, i;
                (console.log("进球"), this.delta = 0, 4 < this.offtime ? this.offtime -= .1 : this.offtime <= 4 && 2.5 < this.offtime && (this.offtime -= .05), 0 == t ? (this.doCombo(), this.hotCrowdAct()) : (this.comboNum = 0, this.middleCrowdAct()), 0 == this.started && (this.started = 1, cc.audioEngine.stop(this.ambiencePlay)), -1 == this.direction) ? ((e = cc.instantiate(this.goal_effect)).parent = this.left_board, e.setPosition(cc.p(118, -53)), e.runAction(cc.sequence(cc.delayTime(1), cc.removeSelf(!0))), this.right_board.children[3].setPositionY(this.backcolY - 66.7), this.right_board.children[4].setPositionY(this.backcolY), this.right_board.children[2].setPositionY(-43), this.left_board.children[2].getComponent(cc.PhysicsCircleCollider).enabled = !1, this.node.getComponent(cc.Animation).play("board1"), this.left_board.runAction(cc.sequence(cc.delayTime(.8), cc.callFunc(this.randomPos1, this))), 2 < this.comboNum ? (this.left_board.children[1].active = !1, this.playAudio(this.a_flameon), (i = cc.instantiate(this.shatter1)).parent = this.left_board, i.setPosition(cc.p(60, 50)), i.runAction(cc.sequence(cc.delayTime(1), cc.removeSelf(!0)))) : this.playAudio(this.a_scoreNet)) : ((e = cc.instantiate(this.goal_effect)).parent = this.right_board, e.setPosition(cc.p(-118, -53)), e.runAction(cc.sequence(cc.delayTime(1), cc.removeSelf(!0))), this.left_board.children[3].setPositionY(this.backcolY - 66.7), this.left_board.children[4].setPositionY(this.backcolY), this.left_board.children[2].setPositionY(-43), this.right_board.children[2].getComponent(cc.PhysicsCircleCollider).enabled = !1, this.node.getComponent(cc.Animation).play("board2"), this.right_board.runAction(cc.sequence(cc.delayTime(.8), cc.callFunc(this.randomPos2, this))), 2 < this.comboNum ? (this.right_board.children[1].active = !1, this.playAudio(this.a_flameon), (i = cc.instantiate(this.shatter2)).parent = this.right_board, i.setPosition(cc.p(-60, 50)), i.runAction(cc.sequence(cc.delayTime(1), cc.removeSelf(!0)))) : this.playAudio(this.a_scoreNet));
                this.comboNum < 2 && 1 == this.fire && (cc.audioEngine.stop(this.fire_effect), this.ball.children[1].active = !1, this.ball_trail.children[1].getComponent(cc.ParticleSystem).stopSystem(), this.ball_trail.children[0].getComponent(cc.ParticleSystem).resetSystem(), this.fire = !1), 1 == this.slowMode && (cc.director.getPhysicsManager().gravity = cc.v2(0, -640), this.slowMode = 0, cc.audioEngine.stop(this.heartBeat)), this.direction = -1 * this.direction, this.score += 1, this.score_label.string = this.score.toString()
            },
            randomPos1: function() {
                var t = Math.floor(334 * Math.random() - 107);
                this.left_board.setPositionY(t), this.left_board.children[3].setPositionY(this.backcolY - 66.7), this.left_board.children[4].setPositionY(this.backcolY), this.left_board.children[2].setPositionY(-43), this.left_board.children[2].getComponent(cc.PhysicsCircleCollider).enabled = !0, this.left_front.setPositionY(t - 43.3), this.left_board.children[1].active = !0
            },
            randomPos2: function() {
                var t = Math.floor(334 * Math.random() - 107);
                this.right_board.setPositionY(t), this.right_board.children[3].setPositionY(this.backcolY - 66.7), this.right_board.children[4].setPositionY(this.backcolY), this.right_board.children[2].setPositionY(-43), this.right_board.children[2].getComponent(cc.PhysicsCircleCollider).enabled = !0, this.right_front.setPositionY(t - 43.3), this.right_board.children[1].active = !0
            },
            timeCal: function(t) {
                this.delta += t;
                var e = this.delta / this.offtime * 320 * -1;
                this.timeBar.setPositionX(e);
                var i = Math.floor(this.delta / this.offtime * 255);
                if (this.timeBar.color = new cc.Color(i, 255 - i, 0), !(this.delta < this.offtime || 1 == this.slowMode)) {
                    this.playAudio(this.a_timeOut), this.toggleAudio && (this.heartBeat = cc.audioEngine.play(this.a_heart, !0));
                    var o = this.ballRigid.linearVelocity,
                        c = this.ballRigid.angularVelocity;
                    this.ballRigid.linearVelocity = cc.v2(o.x / 6, o.y / 6), this.ballRigid.angularVelocity = c / 6, cc.director.getPhysicsManager().gravity = cc.v2(0, -30), this.slowMode = 1;
                    this.timeout;
                    this.timeout.active = !0, this.timeout.runAction(cc.sequence(cc.spawn(cc.scaleTo(.1, 1), cc.fadeTo(.1, 255)), cc.delayTime(1), cc.spawn(cc.moveBy(.3, 500, 0), cc.fadeTo(.3, 0)), cc.callFunc(function(t) {
                        t.setPositionX(0), t.active = !1
                    }))), this.node.runAction(cc.sequence(cc.delayTime(5), cc.callFunc(this.forceEnd, this)))
                }
            },
            doCombo: function() {
                this.comboNum += 1;
                var t = Math.floor(7 * Math.random());
                if (this.playAudio(this.a_applause), 1 < this.comboNum) {
                    this.ball.children[1].active = !0, this.ball_trail.children[1].getComponent(cc.ParticleSystem).resetSystem(), this.ball_trail.children[0].getComponent(cc.ParticleSystem).stopSystem(), this.toggleAudio && 0 == this.fire && (this.fire = !0, this.fire_effect = cc.audioEngine.play(this.a_fireSound, !0)), this.toggleAudio && (2 == t ? cc.audioEngine.play(this.a_yeah) : 3 == t ? cc.audioEngine.play(this.a_boom) : 5 == t && cc.audioEngine.play(this.a_wauw));
                    var e = this.highComboMessage[t];
                    this.score += this.comboNum
                } else e = this.lowComboMessage[t];
                var i = cc.instantiate(this.comboPrefab);
                i.parent = this.game_layer, i.setPosition(cc.p(0, 867)), i.children[0].getComponent(cc.Label).string = e, i.children[1].getComponent(cc.Label).string = "连击 X" + this.comboNum, i.runAction(cc.sequence(cc.scaleTo(.1, 1.3), cc.scaleTo(.1, 1), cc.delayTime(.5), cc.moveBy(.1, -50, 0), cc.spawn(cc.moveBy(.3, 500, 0), cc.fadeTo(.3, 0)), cc.removeSelf(!0)));
                var o = 300 - 600 * Math.random();
                (e = cc.instantiate(this.comboPlus)).parent = this.node, e.getComponent(cc.Label).string = "+" + this.comboNum, e.setPosition(cc.p(200 * this.direction, 0)), e.runAction(cc.sequence(cc.moveBy(2, 0, o), cc.removeSelf(!0)))
            },
            setViewActive: function(t) {
                var e = this.node.getComponent("CollectionView");
                1 == c.isShowGameView ? (null != c.gameData ? (e.scrollview.active = t, this.leftView.active = !t) : (e.scrollview.active = !1, this.leftView.active = !1), null != c.gadViewData ? this.gadView.active = t : this.gadView.active = !1, t && (e.showAnimation(), this.node.getComponent(cc.Animation).play("rqcodeicon"))) : (e.scrollview.active = !1, this.leftView.active = !1, this.gadView.active = !1)
            },
            end_game: function() {
                0 != this.started && (c.isStart = !1, console.log("started的值：" + this.started), this.started = 0, 1 == this.isUnShowShareView && this.setViewActive(!0), this.timeNode.active = !1, this.pauseIcon.active = !1, this.fire && (cc.audioEngine.stop(this.fire_effect), this.fire = !1), this.score > this.top_score && (cc.sys.localStorage.setItem("dunk_score", this.score), this.top_score = this.score), this.game_over.children[4].getComponent(cc.Label).string = this.score, 0 == this.isUnShowShareView ? (console.log("进来了"), this.game_over.children[5].active = !0, this.game_over.children[5].getComponent(cc.Label).string = "最高分 " + this.top_score, this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(this.showEndWin, this), cc.callFunc(this.fadeIn, this), cc.delayTime(.5), cc.callFunc(this.btnAppear, this), cc.delayTime(.3), cc.callFunc(this.btnUp, this)))) : 0 == this.isUnShowShareView ? (this.showEndWin(), this.fadeIn(), this.showShareG()) : this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(this.showEndWin, this), cc.callFunc(this.fadeIn, this), cc.delayTime(.5), cc.callFunc(this.showShareG, this))), cc.audioEngine.stop(this.heartBeat), wx.postMessage({
                    msgType: 1,
                    score: this.top_score
                }))
            },
            continueGame: function() {
                this.loadGraphics.node.active = !1, this.game_over.children[9].active = !1, this.drawIt = !1, this.game_over.active = !1, this.timeNode.active = !0, this.pauseIcon.active = !0, this.tvBtn.active = !1, this.shareBtn.active = !1, this.delta = 0, this.slowMode = 0, this.offtime = 6, cc.director.getPhysicsManager().gravity = cc.v2(0, -640), this.ball.setPosition(cc.p(136.3, 353, 4)), this.timeBar.color = cc.Color.GREEN, this.timeBar.setPositionX(0), this.isShared = !0, this.game_over.children[0].opacity = 0, this.setViewActive(!1), 0 < c.gameCount && (c.gameCount -= 1, c.saveData())
            },
            showEndWin: function() {
                this.game_over.active = !0, this.slowMode = 0
            },
            fadeIn: function() {
                this.game_over.children[0].runAction(cc.fadeTo(.5, 220))
            },
            showShareG: function() {
                console.log("object"), this.drawShape(0), 0 == c.isShowGameView ? (this.loadGraphics.node.active = !1, this.game_over.children[9].active = !1) : 0 < c.gameCount ? (this.updateShape(), this.loadGraphics.node.active = !0, this.gameCountTxt.string = "剩余复活:+" + c.gameCount, this.game_over.children[9].active = !0) : (console.log("获取的分享状态" + c.shareStatus), 0 == c.shareStatus && (console.log("不强制分享"), this.btnUp()), this.tvBtn.active = !0, this.shareBtn.active = !0)
            },
            getShareStatus: function() {
                cc.sys.platform == cc.sys.WECHAT_GAME && wx.request({
                    url: "https://flzs.yzrom.com/index.php/api/Xcxswitch/getShare",
                    data: {
                        app: "wxb1275a606ac46b05"
                    },
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    method: "GET",
                    success: function(t) {
                        console.log("请求成功"), t && 200 == t.statusCode && (console.log("kaiguan" + JSON.stringify(t)), console.log("分享状态：" + t.data.item.status), c.shareStatus = t.data.item.status, console.log("获取的分享状态" + c.shareStatus))
                    }.bind(this),
                    fail: function() {
                        console.log("请求失败？")
                    }
                })
            },
            getIsShare: function() {
                if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                    var e = this,
                        i = this.node.getComponent("CollectionView"),
                        o = this.node.getComponent("floatingadview");
                    wx.request({
                        url: "https://flzs.yzrom.com/index.php/api/Xcxswitch",
                        data: {
                            app: "wxb1275a606ac46b05"
                        },
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        method: "GET",
                        success: function(t) {
                            console.log("请求成功"), t && 200 == t.statusCode && (console.log("kaiguan" + JSON.stringify(t)), console.log("资源数据" + t.data), e.isUnShowShareView = t.data, c.isShowGameView = t.data, 1 == e.isUnShowShareView && (i.GetGameData(), o.GetGameData(), e.node.getComponent(cc.Animation).play("rqcodeicon")))
                        }.bind(this),
                        fail: function() {
                            console.log("请求失败？")
                        }
                    })
                }
            },
            updateShape: function() {
                this.drawIt = !0, this.delta = 0
            },
            btnAppear: function() {
                this.game_over.children[2].runAction(cc.fadeTo(.2, 255))
            },
            btnUp: function() {
                this.game_over.children[7].active = !0, this.game_over.children[7].runAction(cc.fadeTo(.2, 255))
            },
            updateShadow: function() {
                this.ballPos.y < 285 && (this.ball_shadow.x = this.ballPos.x, this.ball_shadow.opacity = Math.floor(285 - this.ballPos.y), this.ball_shadow.scale = (285 - this.ballPos.y) / 225)
            },
            pauseBack: function() {
                this.game_pause.children[0].runAction(cc.fadeTo(.3, 150))
            },
            fadeSetting: function() {
                this.game_pause.children[2].runAction(cc.fadeTo(.3, 255)), this.game_pause.children[3].runAction(cc.spawn(cc.fadeTo(.3, 255), cc.moveBy(.3, 0, 100)))
            },
            AudioSet: function() {
                this.toggleAudio ? (this.toggleAudio = !1, this.game_pause.children[1].children[0].active = !0, this.game_pause.children[1].children[1].active = !1, 0 == this.started ? cc.audioEngine.stop(this.ambiencePlay) : (this.fire && cc.audioEngine.stop(this.fire_effect), this.slowMode && cc.audioEngine.stop(this.heartBeat))) : (this.toggleAudio = !0, this.game_pause.children[1].children[0].active = !1, this.game_pause.children[1].children[1].active = !0, 0 == this.started ? this.ambiencePlay = cc.audioEngine.play(this.a_ambience, !0) : this.fire && (this.fire_effect = cc.audioEngine.play(this.a_fireSound, !0)))
            },
            AudioSet2: function() {
                this.toggleAudio ? (this.toggleAudio = !1, this.game_over.children[1].children[0].active = !0, this.game_over.children[1].children[1].active = !1, 0 == this.started && cc.audioEngine.stop(this.ambiencePlay)) : (this.toggleAudio = !0, this.game_over.children[1].children[0].active = !1, this.game_over.children[1].children[1].active = !0, 0 == this.started && (this.ambiencePlay = cc.audioEngine.play(this.a_ambience, !0)))
            },
            crowdGen: function() {
                for (var t = 0, e = 0; e < 4; e++) {
                    var i = cc.p(-258, 310);
                    1 < e && (i = cc.p(i.x, i.y - 410));
                    for (var o = 0; o < 8; o++) {
                        t += 1;
                        var c = Math.floor(15 * Math.random());
                        (a = cc.instantiate(this.crowd[c])).scale = 1.1, 4 == o && (i = cc.p(i.x + 110, i.y)), a.parent = this.crowd_layer, a.setPosition(cc.p(i.x + 58 * o, i.y - 92 * e)), this.crowdArr[t] = a
                    }
                    var n = cc.p(-258, 133);
                    1 < e && (n = cc.p(n.x, n.y - 70));
                    for (o = 0; o < 4; o++) {
                        t += 1;
                        var a;
                        c = Math.floor(15 * Math.random());
                        (a = cc.instantiate(this.crowd[c])).scale = 1.1, 2 == o && (n = cc.p(n.x + 340, n.y)), a.parent = this.crowd_layer, a.setPosition(cc.p(n.x + 58 * o, n.y - 88 * e)), this.crowdArr[t] = a
                    }
                }
            },
            normalCrowdAct: function() {
                for (var t = 1; t < 48; t += 5) {
                    var e = Math.random(),
                        i = cc.repeat(cc.sequence(cc.rotateBy(.1 * e, -10), cc.rotateBy(.1 * e, 10)), 2);
                    .5 < e ? this.crowdArr[t].runAction(cc.sequence(cc.delayTime(10 * e), i)) : .3 < e && e < .5 ? this.crowdArr[t].runAction(cc.sequence(cc.delayTime(2 * e), i)) : this.crowdArr[t].runAction(cc.sequence(cc.delayTime(5 * e), i))
                }
            },
            middleCrowdAct: function() {
                for (var t = 1; t < 48; t++) {
                    var e = Math.random();
                    if (!(.3 < e)) {
                        var i = cc.repeat(cc.sequence(cc.rotateBy(.05 + .1 * e, -10), cc.rotateBy(.05 + .1 * e, 10)), 2);
                        this.crowdArr[t].runAction(cc.sequence(cc.delayTime(1 * e), i))
                    }
                }
            },
            hotCrowdAct: function() {
                for (var t = 1; t < 48; t += 2) {
                    var e = Math.random();
                    if (!(.3 < e)) {
                        var i = cc.sequence(cc.spawn(cc.rotateBy(.2, -20 * (.3 - e)), cc.moveBy(.2, -5, 40)), cc.spawn(cc.rotateBy(.2, 20 * (.3 - e)), cc.moveBy(.2, 5, -40)));
                        this.crowdArr[t].runAction(cc.sequence(cc.delayTime(2 * e), i))
                    }
                }
            },
            forceEnd: function() {
                150 < this.ball.y || this.slowMode && this.end_game()
            },
            drawShape: function(t) {
                var e = this.loadGraphics;
                e.clear(), e.arc(0, 0, 102, 0 * Math.PI, (2 - t) * Math.PI, !0), e.lineTo(0, 0), e.fill()
            },
            updateDraw: function(t) {
                this.delta += t, (6 < this.delta || 0 == c.isShowGameView) && (console.log("进来了ma" + this.isUnShowShareView), this.drawIt = !1, this.loadGraphics.node.active = !1, this.game_over.children[9].active = !1, this.game_over.children[5].active = !0, this.game_over.children[5].getComponent(cc.Label).string = "最高分 " + this.top_score, this.node.runAction(cc.sequence(cc.callFunc(this.btnAppear, this), cc.delayTime(.3), cc.callFunc(this.btnUp, this)))), this.drawShape(this.delta / 3)
            },
            playAudio: function(t) {
                this.toggleAudio && cc.audioEngine.play(t, !1)
            }
        }), cc._RF.pop()
    }, {
        Global: "Global"
    }],
    goal_detector: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "ea5e9ZDgL5CEpmB2YzjHadU", "goal_detector"), cc.Class({
            extends: cc.Component,
            properties: {
                mainNode: cc.Node,
                LRproperty: 0
            },
            onCollisionEnter: function(t, e) {
                this.enterY = t.node.y, "ball" == t.node.group && (t.node.getComponent("ball").first_col = 0)
            },
            onCollisionExit: function(t, e) {
                var i = t.node.y - this.enterY;
                this.mainNode.getComponent("game").direction != this.LRproperty && (t.node.getComponent(cc.RigidBody).linearVelocity.y < -10 && i < -10 && this.mainNode.getComponent("game").goal(t.getComponent("ball").first_col))
            }
        }), cc._RF.pop()
    }, {}],
    leftView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "0cf7e1oIIJHiowrjvifYf/L", "leftView");
        var o = t("Global");
        cc.Class({
            extends: cc.Component,
            properties: {
                btnLeft: cc.Node,
                layoutNode: cc.Node,
                leftViewItemPre: cc.Prefab,
                leftAni: cc.Node,
                leftBg: cc.Node
            },
            start: function() {
                this.isSwitch = !1, this.leftBg.opacity = 100, this.wid = this.node.getComponent(cc.Widget).left, this.btnLeft.on("touchend", function() {
                    this.onLeftEvent()
                }, this);
                var t = cc.repeatForever(cc.rotateBy(1, 360));
                this.leftAni.runAction(t), this.initView()
            },
            onLeftEvent: function() {
                if (console.log("点击left按钮"), this.isSwitch) {
                    var t = cc.moveBy(.2, cc.p(this.wid, 0));
                    this.node.runAction(t), this.leftBg.runAction(cc.fadeTo(.2, 100)), this.btnLeft.runAction(cc.rotateTo(.2, 0)), this.isSwitch = !1
                } else {
                    t = cc.moveBy(.2, cc.p(-this.wid, 0));
                    this.node.runAction(t), this.leftBg.runAction(cc.fadeIn(.2)), this.btnLeft.runAction(cc.rotateTo(.2, 180)), this.isSwitch = !0
                }
            },
            initView: function() {
                console.log("左侧数据" + o.gameData);
                var t = o.gameData;
                if (!t) return console.log("数据为空"), void(this.node.active = !1);
                if (!(0 < this.layoutNode.children.length)) {
                    console.log("data", t), this.layoutNode.removeAllChildren();
                    for (var e = 0; e < t.length; e++) {
                        var i = cc.instantiate(this.leftViewItemPre);
                        i.getComponent("CollectionViewItem").init_data(t[e], e), this.layoutNode.addChild(i)
                    }
                }
            }
        }), cc._RF.pop()
    }, {
        Global: "Global"
    }],
    main: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "4597ddUH8VKZ6JxYcPLF08R", "main"), cc.Class({
            extends: cc.Component,
            properties: {
                start_btn: cc.Node,
                rankView: cc.Sprite,
                a_btnClick1: cc.AudioClip,
                a_btnClick2: cc.AudioClip
            },
            onLoad: function() {
                var t = this;
                t.start_btn.on("touchstart", function() {
                    cc.audioEngine.play(t.a_btnClick1)
                }), t.start_btn.on("touchend", function() {
                    cc.audioEngine.play(t.a_btnClick2), cc.director.loadScene("game")
                })
            },
            start: function() {
                cc.director.preloadScene("game")
            },
            update: function(t) {
                this._updateSubDomainCanvas()
            },
            _updateSubDomainCanvas: function() {
                null != window.sharedCanvas && (this.tex.initWithElement(window.sharedCanvas), this.tex.handleLoadedTexture(), this.rankView.spriteFrame = new cc.SpriteFrame(this.tex))
            }
        }), cc._RF.pop()
    }, {}],
    redpackteGet: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "eef83jtf1xM7YeIjYU+NA/9", "redpackteGet"), cc.Class({
            extends: cc.Component,
            properties: {
                getred_Node: cc.Node,
                openred_Node: cc.Node,
                openvalue_text: cc.Label,
                allvalue_text: cc.Label
            },
            start: function() {
                this.onEnable()
            },
            onEnable: function() {
                this.openvalue = 0, this.showpanle(!1)
            },
            initredManager: function(t) {
                this.redManager = t
            },
            showpanle: function(t) {
                this.getred_Node.active = !t, this.openred_Node.active = t
            },
            getredData: function() {
                this.redManager.openRedpackCode()
            },
            onOpenBtnClick: function() {
                console.log("点击红包按钮"), this.getredData()
            },
            openred: function() {
                this.showpanle(!0), this.redManager.gainRedPacket(this.openvalue), this.allvalue_text.string = "当前余额:￥" + this.redManager.getRedValue(), this.openvalue_text.string = "￥" + this.redManager.getGiftRedValue()
            },
            onCloseBtnClick: function() {
                this.node.active = !1, this.redManager.delaget.started = 1
            }
        }), cc._RF.pop()
    }, {}],
    redpackteManager: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a910cPqzuRKfolG+KP33TaT", "redpackteManager");
        var o = t("Global");
        cc.Class({
            extends: cc.Component,
            properties: {
                redpacket_Node: cc.Node,
                putpacket_Prefab: cc.Prefab,
                getpacket_Prefab: cc.Prefab
            },
            onLoad: function() {
                this.redpacket_Node.getComponent("redpackteNode").initredManager(this), this.login()
            },
            start: function() {
                this.redvalue = 0, this.redCode = "", this.redMoney = 0, this.node.on("Put-redpacket", function(t) {
                    this.putredpacket()
                }, this), this.node.on("Show-Toast", function(t) {
                    var e = t.getUserData();
                    this.showToast(e)
                }, this), this.node.on("Get-redpacket", function(t) {
                    this.delaget = t.detail.target, this.generateRedpacket()
                }, this), this.node.on("Login-Success", function(t) {
                    console.log("分发登录成功"), this.getTotalMoney()
                }, this)
            },
            getRedValue: function() {
                return this.redvalue ? this.redvalue : 0
            },
            getGiftRedValue: function() {
                return 0 < this.redMoney ? this.redMoney : 0
            },
            gainRedPacket: function(t) {
                t && (this.redvalue += t)
            },
            putredpacket: function() {
                this.putpacket ? this.putpacket.active = !0 : (this.putpacket = cc.instantiate(this.putpacket_Prefab), this.putpacket.getComponent("redpacktePut").initredManager(this), cc.Canvas.instance.node.addChild(this.putpacket, 150))
            },
            getredpacket: function(t) {
                this.getpacket ? this.getpacket.active = !0 : (this.getpacket = cc.instantiate(this.getpacket_Prefab), this.getpacket.getComponent("redpackteGet").initredManager(this), cc.Canvas.instance.node.addChild(this.getpacket, 150))
            },
            generateRedpacket: function() {
                if (26 <= this.getRedValue) return !1;
                var t = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0][Math.floor(20 * Math.random())];
                return console.log("index", t), 0 < t && (this.delaget.started = 0, this.getredpacket(), !0)
            },
            showToast: function(t) {
                cc.sys.platform == cc.sys.WECHAT_GAME && wx.showToast({
                    title: t,
                    icon: "none",
                    duration: 1500
                })
            },
            openRedpackCode: function() {
                var t = new cc.Event.EventCustom("watchVideo", !0);
                t.detail = {
                    callback: this.getRedpackCode,
                    target: this
                }, this.node.dispatchEvent(t)
            },
            getRedpackCode: function() {
                var e = this;
                cc.sys.platform == cc.sys.WECHAT_GAME && wx.request({
                    url: "https://flzs.yzrom.com/index.php/api/gm/Game/getCode",
                    data: {
                        appid: o.userAppid,
                        programid: o.gameAppid
                    },
                    method: "POST",
                    success: function(t) {
                        console.log("请求红包成功", t), t && 200 == t.data.code && "success" == t.data.msg && t.data.item && (e.redCode = t.data.item.code, e.getRedpackMoney())
                    },
                    fail: function() {
                        console.log("请求红包失败");
                        e.showToast("打开红包失败")
                    }
                })
            },
            getRedpackMoney: function() {
                var e = this;
                cc.sys.platform == cc.sys.WECHAT_GAME && wx.request({
                    url: "https://flzs.yzrom.com/index.php/api/gm/Game/validateCode",
                    data: {
                        appid: o.userAppid,
                        programid: o.gameAppid,
                        code: e.redCode
                    },
                    method: "POST",
                    success: function(t) {
                        t && 200 == t.data.code && "success" == t.data.msg && t.data.item && (console.log("请求红包金额成功"), e.redMoney = t.data.item.money, e.redvalue = t.data.item.total_money, e.getpacket.getComponent("redpackteGet").openred(), e.redpacket_Node.getComponent("redpackteNode").init())
                    },
                    fail: function() {
                        console.log("请求红包金额失败");
                        e.showToast("打开红包失败")
                    }
                })
            },
            getTotalMoney: function() {
                var e = this;
                cc.sys.platform == cc.sys.WECHAT_GAME && wx.request({
                    url: "https://flzs.yzrom.com/index.php/api/gm/Game/getTotalMoney",
                    data: {
                        appid: o.userAppid,
                        programid: o.gameAppid
                    },
                    method: "POST",
                    success: function(t) {
                        console.log("请求红包余额成功"), t && 200 == t.data.code && "success" == t.data.msg && t.data.item && (e.redvalue = t.data.item.total_money, e.redpacket_Node.getComponent("redpackteNode").init())
                    },
                    fail: function() {
                        console.log("请求红包余额失败")
                    }
                })
            },
            login: function() {
                var e = this;
                cc.sys.platform == cc.sys.WECHAT_GAME && (console.log("微信登录"), wx.login({
                    success: function(t) {
                        t.code ? e.LoginSuccess(t) : console.log("登录失败！" + t.errMsg)
                    }
                }))
            },
            LoginSuccess: function(t) {
                var i = this;
                console.log("微信登录成功" + o.gameAppid + t.code), wx.request({
                    url: "https://flzs.yzrom.com/index.php/api/gm/wx/login",
                    data: {
                        code: t.code,
                        programid: o.gameAppid
                    },
                    method: "POST",
                    success: function(t) {
                        if (console.log("登录成功", t), t && 200 == t.data.code && "success" == t.data.msg && t.data.item) {
                            o.userAppid = t.data.item.openid, cc.sys.localStorage.setItem("userAppid", o.userAppid);
                            var e = new cc.Event.EventCustom("Login-Success", !0);
                            i.node.dispatchEvent(e)
                        }
                    },
                    fail: function(t) {
                        console.log("登录失败" + t.errMsg)
                    }
                })
            }
        }), cc._RF.pop()
    }, {
        Global: "Global"
    }],
    redpackteNode: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "5160bjDK81PCIyRT7csBCM3", "redpackteNode"), cc.Class({
            extends: cc.Component,
            properties: {
                numberLabel: {
                    default: null,
                    type: cc.Label
                }
            },
            start: function() {
                this.node.on("touchend", function() {
                    var t = new cc.Event.EventCustom("Put-redpacket", !0);
                    this.node.dispatchEvent(t)
                }, this), this.init()
            },
            initredManager: function(t) {
                this.redManager = t
            },
            init: function() {
                this.numberLabel.string = "￥" + this.redManager.getRedValue()
            }
        }), cc._RF.pop()
    }, {}],
    redpacktePut: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "75b2fmnj7ZKyIJZE2gU/8l3", "redpacktePut"), cc.Class({
            extends: cc.Component,
            properties: {
                numberLabel: {
                    default: null,
                    type: cc.Label
                }
            },
            start: function() {
                this.onEnable()
            },
            onEnable: function() {
                this.numberLabel.string = "余额:￥" + this.redManager.getRedValue()
            },
            initredManager: function(t) {
                this.redManager = t
            },
            onPutBtnClick: function() {
                var t = this.redManager.getRedValue();
                if (!t || t < 30) {
                    var e = new cc.Event.EventCustom("Show-Toast", !0);
                    e.setUserData("满30元才能提现哦！"), this.node.dispatchEvent(e)
                }
            },
            onCloseBtnClick: function() {
                this.node.active = !1
            }
        }), cc._RF.pop()
    }, {}],
    ring: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "016d5QTmZ9I+pmDPdqnMmBB", "ring"), cc.Class({
            extends: cc.Component,
            properties: {
                front_ring: cc.Node,
                LRval: 1,
                a_rimHit: cc.AudioClip,
                mainNode: cc.Node
            },
            onBeginContact: function(t, e, i) {
                var o = i.body.linearVelocity.y;
                if (1 == this.mainNode.getComponent("game").toggleAudio && i.body.linearVelocity.y < -280 && cc.audioEngine.play(this.a_rimHit, !1, 1), o < -1e3) {
                    var c = cc.rotateBy(.05, 10 * this.LRval),
                        n = cc.rotateBy(.05, 10 * this.LRval),
                        a = cc.rotateBy(.05, -10 * this.LRval),
                        s = cc.rotateBy(.05, -10 * this.LRval);
                    this.node.runAction(cc.sequence(c, a)), this.front_ring.runAction(cc.sequence(n, s))
                }
            }
        }), cc._RF.pop()
    }, {}],
    top_detector: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "46c33iJUzJG16Y52NOanQxo", "top_detector"), cc.Class({
            extends: cc.Component,
            properties: {
                mainNode: cc.Node
            },
            onCollisionEnter: function(t, e) {
                this.mainNode.getComponent("game").first_col = "top"
            }
        }), cc._RF.pop()
    }, {}],
    wall: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "cf8b2eVpZ5H4p0cZ77FYokx", "wall"), cc.Class({
            extends: cc.Component,
            properties: {
                LR: 0
            },
            start: function() {},
            onCollisionEnter: function(t, e) {
                var i = t.node.getPosition();
                t.node.setPosition(-.95 * i.x, i.y)
            }
        }), cc._RF.pop()
    }, {}]
}, {}, ["CollectionBox", "CollectionView", "CollectionViewItem", "floatingadItem", "floatingadview", "Global", "WatchVideo", "ball", "bottom", "comboSet", "game", "goal_detector", "leftView", "main", "redpackteGet", "redpackteManager", "redpackteNode", "redpacktePut", "ring", "top_detector", "wall"]);