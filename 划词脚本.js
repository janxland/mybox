// ==UserScript==
// @name         题海 x 划词搜题
// @version      2.1.0
// @namespace    题海官方团队
// @description  所有网页均支持划词搜题,也可输入文本搜题悬浮窗可拖动可关闭,可个性化设置解除网页禁止复制限制适用于各类问答,网课问题,竞赛问题,专业术语,业务名称,情景问题,在线作业等
// @author       题海官方团队
// @match        *://*/*
// @grant        GM_getResourceText
// @grant        GM_info
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_setClipboard
// @run-at       document-end
// @connect      app.itihey.com
// @connect      lyck6.cn
// @connect      localhost
// @resource     Vue http://lib.baomitu.com/vue/2.6.0/vue.min.js
// @resource     TCaptcha https://turing.captcha.qcloud.com/TCaptcha.js
// @resource     JQ361JS https://cdn.bootcdn.net/ajax/libs/jquery/3.6.1/jquery.min.js
// @resource     jqueryweui https://cdn.bootcdn.net/ajax/libs/jquery-weui/1.2.1/js/jquery-weui.min.js
// @resource     weuiCss https://cdn.bootcdn.net/ajax/libs/weui/2.5.12/style/weui.min.css
// @resource     questionCss https://app.itihey.com/static/css/question_search.css
// @resource     bootstrap https://app.itihey.com/static/css/bootstrap.min.css
// @resource     Table https://www.forestpolice.org/ttf/2.0/table.json
// @require      https://greasyfork.org/scripts/466179-typr%E5%BA%93/code/Typr%E5%BA%93.js?version=1189955
// @require      https://lib.baomitu.com/cryptico/0.0.1343522940/hash.min.js
// @require      https://lib.baomitu.com/jquery/3.6.0/jquery.min.js
// @antifeature  membership 关注微信公众号
// @icon         data:image/png;base64,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
// ==/UserScript==




(function () {
    'use strict';

    (function($) {
        var tips = [];
        function handleWindowResize() {
            $.each(tips, function() {
                this.refresh(true);
            });
        }
        $(window).resize(handleWindowResize);

        $.JPopBox = function(elm, options) {
            this.$elm = $(elm);
            this.opts = this.getOptions(options);
            var popBoxHtml=[];
            popBoxHtml.push('<div class="'+this.opts.className+'">');
            if(this.opts.title!=""){
                popBoxHtml.push('<div class="JPopBox-tip-title">'+this.opts.title+'</div>');
            }
            if(this.opts.isShowArrow){
                popBoxHtml.push('<div class="JPopBox-tip-arrow JPopBox-tip-arrow-top JPopBox-tip-arrow-right JPopBox-tip-arrow-bottom JPopBox-tip-arrow-left" style="visibility:inherit"></div>');
            }
            popBoxHtml.push('<div class="JPopBox-tip-content"></div>'),
                popBoxHtml.push('</div>');
            this.$tip = $(popBoxHtml.join('')).appendTo(document.body);
            this.$arrow = this.$tip.find('div.JPopBox-tip-arrow');
            this.$inner = this.$tip.find('div.JPopBox-tip-content');
            this.disabled = false;
            this.content = null;
            this.init();
        };

        $.JPopBox.hideAll = function() {
            $.each(tips, function() {
                this.hide();
            });
        };

        $.JPopBox.prototype = {
            getOptions:function(options){
                options = $.extend({}, $.fn.jPopBox.defaults, options);
                if (options.delay && typeof options.delay == 'number') {
                    options.delay = {
                        show: options.delay,
                        hide: options.delay
                    };
                }
                if (typeof options.offset == 'number') {
                    options.offset = {
                        X: options.offset,
                        Y: options.offset
                    };
                }
                return options
            },
            init: function() {
                tips.push(this);
                this.$elm.data('jPopBox', this);
                if (this.opts.trigger != 'none') {
                    this.opts.trigger!="click" && this.$elm.on({
                        'mouseenter.jPopBox': $.proxy(this.mouseenter, this),
                        'mouseleave.jPopBox': $.proxy(this.mouseleave, this)
                    });
                    switch (this.opts.trigger) {
                        case 'click':
                            this.$elm.on('click.jPopBox', $.proxy(this.toggle, this));
                            break;
                        case 'hover':
                            if (this.opts.isTipHover)
                                this.$tip.hover($.proxy(this.clearTimeouts, this), $.proxy(this.mouseleave, this));
                            break;
                        case 'focus':
                            this.$elm.on({
                                'focus.jPopBox': $.proxy(this.showDelayed, this),
                                'blur.jPopBox': $.proxy(this.hideDelayed, this)
                            });
                            break;
                    }
                }
            },
            toggle:function(){
                var active=this.$tip.data('active');
                if(!active)
                    this.showDelayed();
                else
                    this.hideDelayed();
            },
            mouseenter: function(e) {
                if (this.disabled)
                    return true;
                this.updateCursorPos(e);
                this.$elm.attr('title', '');
                if (this.opts.trigger == 'focus')
                    return true;
                this.showDelayed();
            },
            mouseleave: function(e) {
                if (this.disabled || this.asyncAnimating && (this.$tip[0] === e.relatedTarget || jQuery.contains(this.$tip[0], e.relatedTarget)))
                    return true;
                if (this.opts.trigger == 'focus')
                    return true;
                this.hideDelayed();
            },
            mousemove: function(e) {
                if (this.disabled)
                    return true;
                this.updateCursorPos(e);
                if (this.opts.isFollowCursor && this.$tip.data('active')) {
                    this.calcPos();
                    this.$tip.css({left: this.pos.l, top: this.pos.t});
                }
            },
            show: function() {
                this.$elm.trigger($.Event('show.jPopBox'));
                if (this.disabled || this.$tip.data('active'))
                    return;
                this.reset();
                this.update();
                if (!this.content)
                    return;
                this.display();
                this.$elm.trigger($.Event('shown.jPopBox'));
            },
            showDelayed: function(timeout) {
                this.clearTimeouts();
                this.showTimeout = setTimeout($.proxy(this.show, this), typeof timeout == 'number' ? timeout:this.opts.delay.show);
            },
            hide: function() {
                this.$elm.trigger($.Event('hide.jPopBox'));
                if (this.disabled || !this.$tip.data('active'))
                    return;
                this.display(true);
                this.$elm.trigger($.Event('hidden.jPopBox'));
            },
            hideDelayed: function(timeout) {
                this.clearTimeouts();
                this.hideTimeout = setTimeout($.proxy(this.hide, this),typeof timeout == 'number' ? timeout :this.opts.delay.hide);
            },
            reset: function() {
                this.$tip.queue([]).detach().css('visibility', 'hidden').data('active', false);
                this.$inner.find('*').jPopBox('hide');
                this.$arrow.length && (this.$arrow[0].className = 'JPopBox-tip-arrow JPopBox-tip-arrow-top JPopBox-tip-arrow-right JPopBox-tip-arrow-bottom JPopBox-tip-arrow-left');
                this.asyncAnimating = false;
            },
            update: function(content, dontOverwriteOption) {
                if (this.disabled)
                    return;

                var async = content !== undefined;
                if (async) {
                    if (!dontOverwriteOption)
                        this.opts.content = content;
                    if (!this.$tip.data('active'))
                        return;
                } else {
                    content = this.opts.content;
                }

                // update content only if it has been changed since last time
                var self = this,
                    newContent = typeof content == 'function' ?
                        content.call(this.$elm[0], function(newContent) {
                            self.update(newContent);
                        }) : content;
                if (this.content !== newContent) {
                    this.$inner.empty().append(newContent);
                    this.content = newContent;
                }
                this.refresh(async);
            },
            refresh: function(async) {
                if (this.disabled)
                    return;
                if (async) {
                    if (!this.$tip.data('active'))
                        return;
                }
                this.$tip.css({left: 0, top: 0}).appendTo(document.body);
                if (this.opacity === undefined)
                    this.opacity = this.$tip.css('opacity');
                this.calcPos();
                this.$tip.css({left: this.pos.l, top: this.pos.t});
            },
            display: function(hide) {
                var active = this.$tip.data('active');
                if (active && !hide || !active && hide)
                    return;

                this.$tip.stop();
                var from = {}, to = {};
                from.opacity = hide ? this.$tip.css('opacity') : 0;
                to.opacity = hide ? 0 : this.opacity;
                this.$tip.css(from).animate(to, 300);

                hide ? this.$tip.queue($.proxy(this.reset, this)) : this.$tip.css('visibility', 'inherit');
                this.$tip.data('active', !active);
            },
            disable: function() {
                this.reset();
                this.disabled = true;
            },
            enable: function() {
                this.disabled = false;
            },
            destroy: function() {
                this.reset();
                this.$tip.remove();
                delete this.$tip;
                this.content = null;
                this.$elm.off('.jPopBox').removeData('jPopBox');
                tips.splice($.inArray(this, tips), 1);
            },
            clearTimeouts: function() {
                if (this.showTimeout) {
                    clearTimeout(this.showTimeout);
                    this.showTimeout = 0;
                }
                if (this.hideTimeout) {
                    clearTimeout(this.hideTimeout);
                    this.hideTimeout = 0;
                }
            },
            updateCursorPos: function(e) {
                this.eventX = e.pageX;
                this.eventY = e.pageY;
            },
            calcPos: function() {
                this.tipOuterW = this.$tip.outerWidth();
                this.tipOuterH = this.$tip.outerHeight();
                var pos = {l: 0, t: 0, arrow: ''},
                    $win = $(window),
                    win = {
                        l: $win.scrollLeft(),
                        t: $win.scrollTop(),
                        w: $win.width(),
                        h: $win.height()
                    }, xL, xC, xR, yT, yC, yB,arrowOuterWH,placement,isAuto=false;
                var elmOffset = this.$elm.offset(),
                    elm = {
                        l: elmOffset.left,
                        t: elmOffset.top,
                        w: this.$elm.outerWidth(),
                        h: this.$elm.outerHeight()
                    };
                xL = elm.l;	        // left
                xC = xL + Math.floor(elm.w / 2);    // h center
                xR = xL + elm.w;    // right
                yT = elm.t;	        // top
                yC = yT + Math.floor(elm.h / 2);    // v center
                yB = yT +elm.h;	    // bottom
                placement=this.opts.placement;
                var autoReg=/\s?auto?\s?/i;
                isAuto=autoReg.test(placement);
                if (isAuto) placement = placement.replace(autoReg, '') || 'top';
                //calc left position
                switch (placement) {
                    case "top":
                    case "bottom":
                        pos.l = xC - Math.floor(this.tipOuterW / 2)-this.opts.offset.X;
                        {
                            if (pos.l + this.tipOuterW > win.l + win.w)
                                pos.l = win.l + win.w - this.tipOuterW;
                            else if (pos.l < win.l)
                                pos.l = win.l;
                        }
                        break;
                    case "right":
                        arrowOuterWH=this.setArrowAndGetWH(placement);
                        pos.l = xR + this.opts.offset.X+arrowOuterWH.W;
                        if (isAuto && pos.l + this.tipOuterW > win.l + win.w){
                            arrowOuterWH=this.setArrowAndGetWH("left");
                            pos.l =xL - this.tipOuterW - this.opts.offset.X-arrowOuterWH.W;
                        }
                        break;
                    case "left":
                        arrowOuterWH=this.setArrowAndGetWH(placement);
                        pos.l = xL - this.tipOuterW- this.opts.offset.X-arrowOuterWH.W;
                        if (isAuto && pos.l < win.l){
                            arrowOuterWH=this.setArrowAndGetWH("right");
                            pos.l =xR + this.opts.offset.X+arrowOuterWH.W;
                        }
                        break;
                }
                //calc top position
                switch (placement) {
                    case "top":
                        arrowOuterWH=this.setArrowAndGetWH(placement);
                        pos.t = yT - this.tipOuterH - this.opts.offset.Y-arrowOuterWH.H;
                        if (isAuto && pos.t < win.t) {
                            arrowOuterWH=this.setArrowAndGetWH("bottom");
                            pos.t = yB + this.opts.offset.Y+arrowOuterWH.H;
                        }
                        break;
                    case "bottom":
                        arrowOuterWH=this.setArrowAndGetWH(placement);
                        pos.t = yB+ this.opts.offset.Y +arrowOuterWH.H;
                        if (isAuto && pos.t + this.tipOuterH > win.t + win.h) {
                            arrowOuterWH=this.setArrowAndGetWH("top");
                            pos.t = yT - this.tipOuterH - this.opts.offset.Y-arrowOuterWH.H;
                        }
                        break;
                    case "right":
                    case "left":
                        pos.t = yC - Math.floor(this.tipOuterH / 2)-this.opts.offset.Y;
                        {
                            if (pos.t + this.tipOuterH > win.t + win.h){
                                pos.t = win.t + win.h - this.tipOuterH;
                            }
                            else if (pos.t < win.t)
                                pos.t = win.t;
                        }
                        break;
                }
                this.pos = pos;
            },
            setArrowAndGetWH:function(placement){
                var arrowOuteWH={};
                var W=0,H=0;
                if(this.$arrow.length){
                    this.$arrow.attr("class", "JPopBox-tip-arrow JPopBox-tip-arrow-" + placement);
                    W = this.$arrow.outerWidth();
                    H = this.$arrow.outerHeight();
                }
                arrowOuteWH.W=W;
                arrowOuteWH.H=H;
                return arrowOuteWH;
            }
        };
        $.fn.jPopBox = function(options) {
            if (typeof options == 'string') {
                var args = arguments,
                    method = options;
                Array.prototype.shift.call(args);
                if (method == 'destroy') {
                    this.die ?
                        this.die('mouseenter.jPopBox').die('focus.jPopBox') :
                        $(document).undelegate(this.selector, 'mouseenter.jPopBox').undelegate(this.selector, 'focus.jPopBox');
                }
                return this.each(function() {
                    var jPopBox = $(this).data('jPopBox');
                    if (jPopBox && jPopBox[method])
                        jPopBox[method].apply(jPopBox, args);
                });
            }

            var opts = $.extend({}, $.fn.jPopBox.defaults, options);
            if (!$('#jPopBox-css-' + opts.className)[0])
                $(['<style id="jPopBox-css-',opts.className,'" type="text/css">',
                    'div.',opts.className,'{visibility:hidden;position:absolute;top:0;left:0;}',
                    'div.',opts.className,' div.JPopBox-tip-arrow{visibility:hidden;position:absolute;font:1px/1px sans-serif;}',
                    '</style>'].join('')).appendTo('head');

            return this.each(function() {
                new $.JPopBox(this, opts);
            });
        };

        // default settings
        $.fn.jPopBox.defaults = {
            title:'',                   // 标题
            content:'',	                // 弹出框内容 ('string', element, function(updateCallback){...})
            className:'JPopBox-tip-white',	    // class名称
            placement:'top',            // 如何定位弹出框 (top|bottom|left|right|auto)。当指定为 auto 时，会动态调整弹出框。例如，如果 placement 是 "auto left"，弹出框将会尽可能显示在左边，在情况不允许的情况下它才会显示在右边
            delay:100,                  // 延迟显示和隐藏弹出框的毫秒数,对 trigger:none 手动触发类型不适用。如果提供的是一个数字，那么延迟将会应用于显示和隐藏。如果提供的是一个对象{ show: 500, hide: 100 }，那么延迟将会分别应用于显示和隐藏
            trigger:'hover',	        // 如何触发弹出框 ('click',hover', 'focus', 'none'),none为手动触发
            offset:0,                   // 方向偏移量，值为负数时，将会反向偏移。如果提供的是一个数字，那么偏移量将会应用于X轴和Y轴。如果提供的是一个对象{ X:200, Y: 100 }，那么偏移量将会分别应用于X轴和Y轴
            isShowArrow:true,           // 是否显示指向箭头
            isTipHover:true             // 是否允许在弹出框上移动，而不自动隐藏。只对trigger:hover有效。
        };
    })(jQuery);

    /**
     * 字符串模板格式化
     * @param {string} formatStr - 字符串模板
     * @returns {string} 格式化后的字符串
     * @example
     * StringFormat("ab{0}c{1}ed",1,"q")  output "ab1cqed"
     */


    function StringFormat(formatStr) {
        var args = arguments;
        return formatStr.replace(/\{(\d+)\}/g, function (m, i) {
            i = parseInt(i);
            return args[i + 1];
        });
    }

    /**
     * 日期格式化
     * @param {Date} date - 日期
     * @param {string} formatStr - 格式化模板
     * @returns {string} 格式化日期后的字符串
     * @example
     * DateFormat(new Date(),"yyyy-MM-dd")  output "2020-03-23"
     * @example
     * DateFormat(new Date(),"yyyy/MM/dd hh:mm:ss")  output "2020/03/23 10:30:05"
     */
    function DateFormat(date, formatStr) {
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(formatStr)) {
            formatStr = formatStr.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(formatStr)) {
                formatStr = formatStr.replace(
                    RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return formatStr;
    }

    /**
     * 清除dom元素默认事件
     * @param {object} e - dom元素
     */
    function ClearBubble(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    }

    /**
     * 寻找最外层doc
     * @param _self
     * @param top
     * @returns {*|string|boolean|number|string|Window}
     */
    function searchOutDocument(_self, top) {
        try {
            while (top !== _self.top) {
                top = top.parent.document ? top.parent : _self.top;
                if (top.location.pathname === '/mycourse/studentstudy') break;
            }
        } catch (err) {
            top = _self;
        }
        return top;
    }

    //面板
    var Panel={
        popBoxEl:{},
        randomCode:"",
        Create:function(title,placement,isShowArrow,content,shownFn){
            var self=this;
            $(self.popBoxEl).jPopBox({
                title: title,
                className: 'JPopBox-tip-white',
                placement: placement,
                trigger: 'none',
                isTipHover: true,
                isShowArrow: isShowArrow,
                content: function(){
                    return StringFormat('<div id="panelBody{0}">{1}</div>',self.randomCode,content);
                }
            });
            $(self.popBoxEl).on("shown.jPopBox",function(){
                var $panel=$("div.JPopBox-tip-white");
                typeof shownFn === 'function' && shownFn($panel);
            });
            $(self.popBoxEl).jPopBox('show');
        },
        Update:function(Fn){
            var $panel=$("div.JPopBox-tip-white");
            Fn($panel);    
        },
        Destroy:function(){
            //$(this.popBoxEl).jPopBox("hideDelayed");
            $(this.popBoxEl).jPopBox("destroy");
        },
        CreateStyle:function(){
            var s="";
            s+=StringFormat("#panelBody{0}>div input,#panelBody{0}>div select{padding: 3px; margin: 0; background: #fff; font-size: 14px; border: 1px solid #a9a9a9; color:black;width: auto;min-height: auto; }",this.randomCode);
            s+=StringFormat("#panelBody{0}>div:first-child{padding-bottom: 5px;height:30px}",this.randomCode);
            s+=StringFormat("#panelBody{0}>div:last-child hr{border: 1px inset #eeeeee;background: none;height: 0px;margin: 0px;}",this.randomCode);
            return s;
        }
    };

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    var sso_pb = {};

    var googleProtobuf = {};

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */

    (function (exports) {
    	var $jscomp = $jscomp || {};
    	$jscomp.scope = {};
    	$jscomp.findInternal = function (a, b, c) {
    	    a instanceof String && (a = String(a));
    	    for (var d = a.length, e = 0; e < d; e++) {
    	        var f = a[e];
    	        if (b.call(c, f, e, a)) return {i: e, v: f}
    	    }
    	    return {i: -1, v: void 0}
    	};
    	$jscomp.ASSUME_ES5 = !1;
    	$jscomp.ASSUME_NO_NATIVE_MAP = !1;
    	$jscomp.ASSUME_NO_NATIVE_SET = !1;
    	$jscomp.SIMPLE_FROUND_POLYFILL = !1;
    	$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
    	    a != Array.prototype && a != Object.prototype && (a[b] = c.value);
    	};
    	$jscomp.getGlobal = function (a) {
    	    return "undefined" != typeof window && window === a ? a : "undefined" != typeof commonjsGlobal && null != commonjsGlobal ? commonjsGlobal : a
    	};
    	$jscomp.global = $jscomp.getGlobal(commonjsGlobal);
    	$jscomp.polyfill = function (a, b, c, d) {
    	    if (b) {
    	        c = $jscomp.global;
    	        a = a.split(".");
    	        for (d = 0; d < a.length - 1; d++) {
    	            var e = a[d];
    	            e in c || (c[e] = {});
    	            c = c[e];
    	        }
    	        a = a[a.length - 1];
    	        d = c[a];
    	        b = b(d);
    	        b != d && null != b && $jscomp.defineProperty(c, a, {configurable: !0, writable: !0, value: b});
    	    }
    	};
    	$jscomp.polyfill("Array.prototype.findIndex", function (a) {
    	    return a ? a : function (a, c) {
    	        return $jscomp.findInternal(this, a, c).i
    	    }
    	}, "es6", "es3");
    	$jscomp.checkStringArgs = function (a, b, c) {
    	    if (null == a) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
    	    if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
    	    return a + ""
    	};
    	$jscomp.polyfill("String.prototype.endsWith", function (a) {
    	    return a ? a : function (a, c) {
    	        var b = $jscomp.checkStringArgs(this, a, "endsWith");
    	        a += "";
    	        void 0 === c && (c = b.length);
    	        c = Math.max(0, Math.min(c | 0, b.length));
    	        for (var e = a.length; 0 < e && 0 < c;) if (b[--c] != a[--e]) return !1;
    	        return 0 >= e
    	    }
    	}, "es6", "es3");
    	$jscomp.polyfill("Array.prototype.find", function (a) {
    	    return a ? a : function (a, c) {
    	        return $jscomp.findInternal(this, a, c).v
    	    }
    	}, "es6", "es3");
    	$jscomp.polyfill("String.prototype.startsWith", function (a) {
    	    return a ? a : function (a, c) {
    	        var b = $jscomp.checkStringArgs(this, a, "startsWith");
    	        a += "";
    	        var e = b.length, f = a.length;
    	        c = Math.max(0, Math.min(c | 0, b.length));
    	        for (var g = 0; g < f && c < e;) if (b[c++] != a[g++]) return !1;
    	        return g >= f
    	    }
    	}, "es6", "es3");
    	$jscomp.polyfill("String.prototype.repeat", function (a) {
    	    return a ? a : function (a) {
    	        var b = $jscomp.checkStringArgs(this, null, "repeat");
    	        if (0 > a || 1342177279 < a) throw new RangeError("Invalid count value");
    	        a |= 0;
    	        for (var d = ""; a;) if (a & 1 && (d += b), a >>>= 1) b += b;
    	        return d
    	    }
    	}, "es6", "es3");
    	var COMPILED = !0, goog = goog || {};
    	goog.global = commonjsGlobal || self;
    	goog.exportPath_ = function (a, b, c) {
    	    a = a.split(".");
    	    c = c || goog.global;
    	    a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
    	    for (var d; a.length && (d = a.shift());) a.length || void 0 === b ? c = c[d] && c[d] !== Object.prototype[d] ? c[d] : c[d] = {} : c[d] = b;
    	};
    	goog.define = function (a, b) {
    	    return b
    	};
    	goog.FEATURESET_YEAR = 2012;
    	goog.DEBUG = !0;
    	goog.LOCALE = "en";
    	goog.TRUSTED_SITE = !0;
    	goog.STRICT_MODE_COMPATIBLE = !1;
    	goog.DISALLOW_TEST_ONLY_CODE = !goog.DEBUG;
    	goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
    	goog.provide = function (a) {
    	    if (goog.isInModuleLoader_()) throw Error("goog.provide cannot be used within a module.");
    	    goog.constructNamespace_(a);
    	};
    	goog.constructNamespace_ = function (a, b) {
    	    goog.exportPath_(a, b);
    	};
    	goog.getScriptNonce = function (a) {
    	    if (a && a != goog.global) return goog.getScriptNonce_(a.document);
    	    null === goog.cspNonce_ && (goog.cspNonce_ = goog.getScriptNonce_(goog.global.document));
    	    return goog.cspNonce_
    	};
    	goog.NONCE_PATTERN_ = /^[\w+/_-]+[=]{0,2}$/;
    	goog.cspNonce_ = null;
    	goog.getScriptNonce_ = function (a) {
    	    return (a = a.querySelector && a.querySelector("script[nonce]")) && (a = a.nonce || a.getAttribute("nonce")) && goog.NONCE_PATTERN_.test(a) ? a : ""
    	};
    	goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
    	goog.module = function (a) {
    	    if ("string" !== typeof a || !a || -1 == a.search(goog.VALID_MODULE_RE_)) throw Error("Invalid module identifier");
    	    if (!goog.isInGoogModuleLoader_()) throw Error("Module " + a + " has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
    	    if (goog.moduleLoaderState_.moduleName) throw Error("goog.module may only be called once per module.");
    	    goog.moduleLoaderState_.moduleName = a;
    	};
    	goog.module.get = function (a) {
    	    return goog.module.getInternal_(a)
    	};
    	goog.module.getInternal_ = function (a) {
    	    return null
    	};
    	goog.ModuleType = {ES6: "es6", GOOG: "goog"};
    	goog.moduleLoaderState_ = null;
    	goog.isInModuleLoader_ = function () {
    	    return goog.isInGoogModuleLoader_() || goog.isInEs6ModuleLoader_()
    	};
    	goog.isInGoogModuleLoader_ = function () {
    	    return !!goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.GOOG
    	};
    	goog.isInEs6ModuleLoader_ = function () {
    	    if (goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.ES6) return !0;
    	    var a = goog.global.$jscomp;
    	    return a ? "function" != typeof a.getCurrentModulePath ? !1 : !!a.getCurrentModulePath() : !1
    	};
    	goog.module.declareLegacyNamespace = function () {
    	    goog.moduleLoaderState_.declareLegacyNamespace = !0;
    	};
    	goog.declareModuleId = function (a) {
    	    if (goog.moduleLoaderState_) goog.moduleLoaderState_.moduleName = a; else {
    	        var b = goog.global.$jscomp;
    	        if (!b || "function" != typeof b.getCurrentModulePath) throw Error('Module with namespace "' +
    	            a + '" has been loaded incorrectly.');
    	        b = b.require(b.getCurrentModulePath());
    	        goog.loadedModules_[a] = {exports: b, type: goog.ModuleType.ES6, moduleId: a};
    	    }
    	};
    	goog.setTestOnly = function (a) {
    	    if (goog.DISALLOW_TEST_ONLY_CODE) throw a = a || "", Error("Importing test-only code into non-debug environment" + (a ? ": " + a : "."));
    	};
    	goog.forwardDeclare = function (a) {
    	};
    	goog.getObjectByName = function (a, b) {
    	    a = a.split(".");
    	    b = b || goog.global;
    	    for (var c = 0; c < a.length; c++) if (b = b[a[c]], null == b) return null;
    	    return b
    	};
    	goog.globalize = function (a, b) {
    	    b = b || goog.global;
    	    for (var c in a) b[c] = a[c];
    	};
    	goog.addDependency = function (a, b, c, d) {
    	};
    	goog.ENABLE_DEBUG_LOADER = !0;
    	goog.logToConsole_ = function (a) {
    	    goog.global.console && goog.global.console.error(a);
    	};
    	goog.require = function (a) {
    	};
    	goog.requireType = function (a) {
    	    return {}
    	};
    	goog.basePath = "";
    	goog.nullFunction = function () {
    	};
    	goog.abstractMethod = function () {
    	    throw Error("unimplemented abstract method");
    	};
    	goog.addSingletonGetter = function (a) {
    	    a.instance_ = void 0;
    	    a.getInstance = function () {
    	        if (a.instance_) return a.instance_;
    	        goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
    	        return a.instance_ = new a
    	    };
    	};
    	goog.instantiatedSingletons_ = [];
    	goog.LOAD_MODULE_USING_EVAL = !0;
    	goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
    	goog.loadedModules_ = {};
    	goog.DEPENDENCIES_ENABLED = !COMPILED ;
    	goog.TRANSPILE = "detect";
    	goog.ASSUME_ES_MODULES_TRANSPILED = !1;
    	goog.TRANSPILE_TO_LANGUAGE = "";
    	goog.TRANSPILER = "transpile.js";
    	goog.hasBadLetScoping = null;
    	goog.useSafari10Workaround = function () {
    	    if (null == goog.hasBadLetScoping) {
    	        try {
    	            var a = !eval('"use strict";let x = 1; function f() { return typeof x; };f() == "number";');
    	        } catch (b) {
    	            a = !1;
    	        }
    	        goog.hasBadLetScoping = a;
    	    }
    	    return goog.hasBadLetScoping
    	};
    	goog.workaroundSafari10EvalBug = function (a) {
    	    return "(function(){" + a + "\n;})();\n"
    	};
    	goog.loadModule = function (a) {
    	    var b = goog.moduleLoaderState_;
    	    try {
    	        goog.moduleLoaderState_ = {moduleName: "", declareLegacyNamespace: !1, type: goog.ModuleType.GOOG};
    	        if (goog.isFunction(a)) var c = a.call(void 0, {}); else if ("string" === typeof a) goog.useSafari10Workaround() && (a = goog.workaroundSafari10EvalBug(a)), c = goog.loadModuleFromSource_.call(void 0, a); else throw Error("Invalid module definition");
    	        var d = goog.moduleLoaderState_.moduleName;
    	        if ("string" === typeof d && d) goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(d,
    	            c) : goog.SEAL_MODULE_EXPORTS && Object.seal && "object" == typeof c && null != c && Object.seal(c), goog.loadedModules_[d] = {
    	            exports: c,
    	            type: goog.ModuleType.GOOG,
    	            moduleId: goog.moduleLoaderState_.moduleName
    	        }; else throw Error('Invalid module name "' + d + '"');
    	    } finally {
    	        goog.moduleLoaderState_ = b;
    	    }
    	};
    	goog.loadModuleFromSource_ = function (a) {
    	    eval(a);
    	    return {}
    	};
    	goog.normalizePath_ = function (a) {
    	    a = a.split("/");
    	    for (var b = 0; b < a.length;) "." == a[b] ? a.splice(b, 1) : b && ".." == a[b] && a[b - 1] && ".." != a[b - 1] ? a.splice(--b, 2) : b++;
    	    return a.join("/")
    	};
    	goog.loadFileSync_ = function (a) {
    	    if (goog.global.CLOSURE_LOAD_FILE_SYNC) return goog.global.CLOSURE_LOAD_FILE_SYNC(a);
    	    try {
    	        var b = new goog.global.XMLHttpRequest;
    	        b.open("get", a, !1);
    	        b.send();
    	        return 0 == b.status || 200 == b.status ? b.responseText : null
    	    } catch (c) {
    	        return null
    	    }
    	};
    	goog.transpile_ = function (a, b, c) {
    	    var d = goog.global.$jscomp;
    	    d || (goog.global.$jscomp = d = {});
    	    var e = d.transpile;
    	    if (!e) {
    	        var f = goog.basePath + goog.TRANSPILER, g = goog.loadFileSync_(f);
    	        if (g) {
    	            (function () {
    	                (0, eval)(g + "\n//# sourceURL=" + f);
    	            }).call(goog.global);
    	            if (goog.global.$gwtExport && goog.global.$gwtExport.$jscomp && !goog.global.$gwtExport.$jscomp.transpile) throw Error('The transpiler did not properly export the "transpile" method. $gwtExport: ' + JSON.stringify(goog.global.$gwtExport));
    	            goog.global.$jscomp.transpile =
    	                goog.global.$gwtExport.$jscomp.transpile;
    	            d = goog.global.$jscomp;
    	            e = d.transpile;
    	        }
    	    }
    	    e || (e = d.transpile = function (a, b) {
    	        goog.logToConsole_(b + " requires transpilation but no transpiler was found.");
    	        return a
    	    });
    	    return e(a, b, c)
    	};
    	goog.typeOf = function (a) {
    	    var b = typeof a;
    	    if ("object" == b) if (a) {
    	        if (a instanceof Array) return "array";
    	        if (a instanceof Object) return b;
    	        var c = Object.prototype.toString.call(a);
    	        if ("[object Window]" == c) return "object";
    	        if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
    	        if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
    	    } else return "null";
    	    else if ("function" == b && "undefined" == typeof a.call) return "object";
    	    return b
    	};
    	goog.isArray = function (a) {
    	    return "array" == goog.typeOf(a)
    	};
    	goog.isArrayLike = function (a) {
    	    var b = goog.typeOf(a);
    	    return "array" == b || "object" == b && "number" == typeof a.length
    	};
    	goog.isDateLike = function (a) {
    	    return goog.isObject(a) && "function" == typeof a.getFullYear
    	};
    	goog.isFunction = function (a) {
    	    return "function" == goog.typeOf(a)
    	};
    	goog.isObject = function (a) {
    	    var b = typeof a;
    	    return "object" == b && null != a || "function" == b
    	};
    	goog.getUid = function (a) {
    	    return Object.prototype.hasOwnProperty.call(a, goog.UID_PROPERTY_) && a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
    	};
    	goog.hasUid = function (a) {
    	    return !!a[goog.UID_PROPERTY_]
    	};
    	goog.removeUid = function (a) {
    	    null !== a && "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
    	    try {
    	        delete a[goog.UID_PROPERTY_];
    	    } catch (b) {
    	    }
    	};
    	goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
    	goog.uidCounter_ = 0;
    	goog.getHashCode = goog.getUid;
    	goog.removeHashCode = goog.removeUid;
    	goog.cloneObject = function (a) {
    	    var b = goog.typeOf(a);
    	    if ("object" == b || "array" == b) {
    	        if ("function" === typeof a.clone) return a.clone();
    	        b = "array" == b ? [] : {};
    	        for (var c in a) b[c] = goog.cloneObject(a[c]);
    	        return b
    	    }
    	    return a
    	};
    	goog.bindNative_ = function (a, b, c) {
    	    return a.call.apply(a.bind, arguments)
    	};
    	goog.bindJs_ = function (a, b, c) {
    	    if (!a) throw Error();
    	    if (2 < arguments.length) {
    	        var d = Array.prototype.slice.call(arguments, 2);
    	        return function () {
    	            var c = Array.prototype.slice.call(arguments);
    	            Array.prototype.unshift.apply(c, d);
    	            return a.apply(b, c)
    	        }
    	    }
    	    return function () {
    	        return a.apply(b, arguments)
    	    }
    	};
    	goog.bind = function (a, b, c) {
    	    Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
    	    return goog.bind.apply(null, arguments)
    	};
    	goog.partial = function (a, b) {
    	    var c = Array.prototype.slice.call(arguments, 1);
    	    return function () {
    	        var b = c.slice();
    	        b.push.apply(b, arguments);
    	        return a.apply(this, b)
    	    }
    	};
    	goog.mixin = function (a, b) {
    	    for (var c in b) a[c] = b[c];
    	};
    	goog.now = goog.TRUSTED_SITE && Date.now || function () {
    	    return +new Date
    	};
    	goog.globalEval = function (a) {
    	    if (goog.global.execScript) goog.global.execScript(a, "JavaScript"); else if (goog.global.eval) {
    	        if (null == goog.evalWorksForGlobals_) {
    	            try {
    	                goog.global.eval("var _evalTest_ = 1;");
    	            } catch (d) {
    	            }
    	            if ("undefined" != typeof goog.global._evalTest_) {
    	                try {
    	                    delete goog.global._evalTest_;
    	                } catch (d) {
    	                }
    	                goog.evalWorksForGlobals_ = !0;
    	            } else goog.evalWorksForGlobals_ = !1;
    	        }
    	        if (goog.evalWorksForGlobals_) goog.global.eval(a); else {
    	            var b = goog.global.document, c = b.createElement("script");
    	            c.type = "text/javascript";
    	            c.defer =
    	                !1;
    	            c.appendChild(b.createTextNode(a));
    	            b.head.appendChild(c);
    	            b.head.removeChild(c);
    	        }
    	    } else throw Error("goog.globalEval not available");
    	};
    	goog.evalWorksForGlobals_ = null;
    	goog.getCssName = function (a, b) {
    	    if ("." == String(a).charAt(0)) throw Error('className passed in goog.getCssName must not start with ".". You passed: ' + a);
    	    var c = function (a) {
    	        return goog.cssNameMapping_[a] || a
    	    }, d = function (a) {
    	        a = a.split("-");
    	        for (var b = [], d = 0; d < a.length; d++) b.push(c(a[d]));
    	        return b.join("-")
    	    };
    	    d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function (a) {
    	        return a
    	    };
    	    a = b ? a + "-" + d(b) : d(a);
    	    return goog.global.CLOSURE_CSS_NAME_MAP_FN ? goog.global.CLOSURE_CSS_NAME_MAP_FN(a) : a
    	};
    	goog.setCssNameMapping = function (a, b) {
    	    goog.cssNameMapping_ = a;
    	    goog.cssNameMappingStyle_ = b;
    	};
    	goog.getMsg = function (a, b, c) {
    	    c && c.html && (a = a.replace(/</g, "&lt;"));
    	    b && (a = a.replace(/\{\$([^}]+)}/g, function (a, c) {
    	        return null != b && c in b ? b[c] : a
    	    }));
    	    return a
    	};
    	goog.getMsgWithFallback = function (a, b) {
    	    return a
    	};
    	goog.exportSymbol = function (a, b, c) {
    	    goog.exportPath_(a, b, c);
    	};
    	goog.exportProperty = function (a, b, c) {
    	    a[b] = c;
    	};
    	goog.inherits = function (a, b) {
    	    function c() {
    	    }

    	    c.prototype = b.prototype;
    	    a.superClass_ = b.prototype;
    	    a.prototype = new c;
    	    a.prototype.constructor = a;
    	    a.base = function (a, c, f) {
    	        for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++) d[e - 2] = arguments[e];
    	        return b.prototype[c].apply(a, d)
    	    };
    	};
    	goog.scope = function (a) {
    	    if (goog.isInModuleLoader_()) throw Error("goog.scope is not supported within a module.");
    	    a.call(goog.global);
    	};
    	goog.defineClass = function (a, b) {
    	    var c = b.constructor, d = b.statics;
    	    c && c != Object.prototype.constructor || (c = function () {
    	        throw Error("cannot instantiate an interface (no constructor defined).");
    	    });
    	    c = goog.defineClass.createSealingConstructor_(c, a);
    	    a && goog.inherits(c, a);
    	    delete b.constructor;
    	    delete b.statics;
    	    goog.defineClass.applyProperties_(c.prototype, b);
    	    null != d && (d instanceof Function ? d(c) : goog.defineClass.applyProperties_(c, d));
    	    return c
    	};
    	goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
    	goog.defineClass.createSealingConstructor_ = function (a, b) {
    	    if (!goog.defineClass.SEAL_CLASS_INSTANCES) return a;
    	    var c = !goog.defineClass.isUnsealable_(b), d = function () {
    	        var b = a.apply(this, arguments) || this;
    	        b[goog.UID_PROPERTY_] = b[goog.UID_PROPERTY_];
    	        this.constructor === d && c && Object.seal instanceof Function && Object.seal(b);
    	        return b
    	    };
    	    return d
    	};
    	goog.defineClass.isUnsealable_ = function (a) {
    	    return a && a.prototype && a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]
    	};
    	goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    	goog.defineClass.applyProperties_ = function (a, b) {
    	    for (var c in b) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
    	    for (var d = 0; d < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; d++) c = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d], Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
    	};
    	goog.tagUnsealableClass = function (a) {
    	};
    	goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
    	goog.TRUSTED_TYPES_POLICY_NAME = "";
    	goog.identity_ = function (a) {
    	    return a
    	};
    	goog.createTrustedTypesPolicy = function (a) {
    	    var b = null, c = goog.global.trustedTypes || goog.global.TrustedTypes;
    	    if (!c || !c.createPolicy) return b;
    	    try {
    	        b = c.createPolicy(a, {
    	            createHTML: goog.identity_,
    	            createScript: goog.identity_,
    	            createScriptURL: goog.identity_,
    	            createURL: goog.identity_
    	        });
    	    } catch (d) {
    	        goog.logToConsole_(d.message);
    	    }
    	    return b
    	};
    	goog.TRUSTED_TYPES_POLICY_ = goog.TRUSTED_TYPES_POLICY_NAME ? goog.createTrustedTypesPolicy(goog.TRUSTED_TYPES_POLICY_NAME + "#base") : null;
    	goog.object = {};
    	goog.object.is = function (a, b) {
    	    return a === b ? 0 !== a || 1 / a === 1 / b : a !== a && b !== b
    	};
    	goog.object.forEach = function (a, b, c) {
    	    for (var d in a) b.call(c, a[d], d, a);
    	};
    	goog.object.filter = function (a, b, c) {
    	    var d = {}, e;
    	    for (e in a) b.call(c, a[e], e, a) && (d[e] = a[e]);
    	    return d
    	};
    	goog.object.map = function (a, b, c) {
    	    var d = {}, e;
    	    for (e in a) d[e] = b.call(c, a[e], e, a);
    	    return d
    	};
    	goog.object.some = function (a, b, c) {
    	    for (var d in a) if (b.call(c, a[d], d, a)) return !0;
    	    return !1
    	};
    	goog.object.every = function (a, b, c) {
    	    for (var d in a) if (!b.call(c, a[d], d, a)) return !1;
    	    return !0
    	};
    	goog.object.getCount = function (a) {
    	    var b = 0, c;
    	    for (c in a) b++;
    	    return b
    	};
    	goog.object.getAnyKey = function (a) {
    	    for (var b in a) return b
    	};
    	goog.object.getAnyValue = function (a) {
    	    for (var b in a) return a[b]
    	};
    	goog.object.contains = function (a, b) {
    	    return goog.object.containsValue(a, b)
    	};
    	goog.object.getValues = function (a) {
    	    var b = [], c = 0, d;
    	    for (d in a) b[c++] = a[d];
    	    return b
    	};
    	goog.object.getKeys = function (a) {
    	    var b = [], c = 0, d;
    	    for (d in a) b[c++] = d;
    	    return b
    	};
    	goog.object.getValueByKeys = function (a, b) {
    	    var c = goog.isArrayLike(b), d = c ? b : arguments;
    	    for (c = c ? 0 : 1; c < d.length; c++) {
    	        if (null == a) return;
    	        a = a[d[c]];
    	    }
    	    return a
    	};
    	goog.object.containsKey = function (a, b) {
    	    return null !== a && b in a
    	};
    	goog.object.containsValue = function (a, b) {
    	    for (var c in a) if (a[c] == b) return !0;
    	    return !1
    	};
    	goog.object.findKey = function (a, b, c) {
    	    for (var d in a) if (b.call(c, a[d], d, a)) return d
    	};
    	goog.object.findValue = function (a, b, c) {
    	    return (b = goog.object.findKey(a, b, c)) && a[b]
    	};
    	goog.object.isEmpty = function (a) {
    	    for (var b in a) return !1;
    	    return !0
    	};
    	goog.object.clear = function (a) {
    	    for (var b in a) delete a[b];
    	};
    	goog.object.remove = function (a, b) {
    	    var c;
    	    (c = b in a) && delete a[b];
    	    return c
    	};
    	goog.object.add = function (a, b, c) {
    	    if (null !== a && b in a) throw Error('The object already contains the key "' + b + '"');
    	    goog.object.set(a, b, c);
    	};
    	goog.object.get = function (a, b, c) {
    	    return null !== a && b in a ? a[b] : c
    	};
    	goog.object.set = function (a, b, c) {
    	    a[b] = c;
    	};
    	goog.object.setIfUndefined = function (a, b, c) {
    	    return b in a ? a[b] : a[b] = c
    	};
    	goog.object.setWithReturnValueIfNotSet = function (a, b, c) {
    	    if (b in a) return a[b];
    	    c = c();
    	    return a[b] = c
    	};
    	goog.object.equals = function (a, b) {
    	    for (var c in a) if (!(c in b) || a[c] !== b[c]) return !1;
    	    for (var d in b) if (!(d in a)) return !1;
    	    return !0
    	};
    	goog.object.clone = function (a) {
    	    var b = {}, c;
    	    for (c in a) b[c] = a[c];
    	    return b
    	};
    	goog.object.unsafeClone = function (a) {
    	    var b = goog.typeOf(a);
    	    if ("object" == b || "array" == b) {
    	        if (goog.isFunction(a.clone)) return a.clone();
    	        b = "array" == b ? [] : {};
    	        for (var c in a) b[c] = goog.object.unsafeClone(a[c]);
    	        return b
    	    }
    	    return a
    	};
    	goog.object.transpose = function (a) {
    	    var b = {}, c;
    	    for (c in a) b[a[c]] = c;
    	    return b
    	};
    	goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    	goog.object.extend = function (a, b) {
    	    for (var c, d, e = 1; e < arguments.length; e++) {
    	        d = arguments[e];
    	        for (c in d) a[c] = d[c];
    	        for (var f = 0; f < goog.object.PROTOTYPE_FIELDS_.length; f++) c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    	    }
    	};
    	goog.object.create = function (a) {
    	    var b = arguments.length;
    	    if (1 == b && Array.isArray(arguments[0])) return goog.object.create.apply(null, arguments[0]);
    	    if (b % 2) throw Error("Uneven number of arguments");
    	    for (var c = {}, d = 0; d < b; d += 2) c[arguments[d]] = arguments[d + 1];
    	    return c
    	};
    	goog.object.createSet = function (a) {
    	    var b = arguments.length;
    	    if (1 == b && Array.isArray(arguments[0])) return goog.object.createSet.apply(null, arguments[0]);
    	    for (var c = {}, d = 0; d < b; d++) c[arguments[d]] = !0;
    	    return c
    	};
    	goog.object.createImmutableView = function (a) {
    	    var b = a;
    	    Object.isFrozen && !Object.isFrozen(a) && (b = Object.create(a), Object.freeze(b));
    	    return b
    	};
    	goog.object.isImmutableView = function (a) {
    	    return !!Object.isFrozen && Object.isFrozen(a)
    	};
    	goog.object.getAllPropertyNames = function (a, b, c) {
    	    if (!a) return [];
    	    if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) return goog.object.getKeys(a);
    	    for (var d = {}; a && (a !== Object.prototype || b) && (a !== Function.prototype || c);) {
    	        for (var e = Object.getOwnPropertyNames(a), f = 0; f < e.length; f++) d[e[f]] = !0;
    	        a = Object.getPrototypeOf(a);
    	    }
    	    return goog.object.getKeys(d)
    	};
    	goog.object.getSuperClass = function (a) {
    	    return (a = Object.getPrototypeOf(a.prototype)) && a.constructor
    	};
    	var jspb = {asserts: {}};
    	jspb.asserts.doAssertFailure = function (a, b, c, d) {
    	    var e = "Assertion failed";
    	    if (c) {
    	        e += ": " + c;
    	        var f = d;
    	    } else a && (e += ": " + a, f = b);
    	    throw Error("" + e, f || []);
    	};
    	jspb.asserts.assert = function (a, b, c) {
    	    for (var d = [], e = 2; e < arguments.length; ++e) d[e - 2] = arguments[e];
    	    a || jspb.asserts.doAssertFailure("", null, b, d);
    	    return a
    	};
    	jspb.asserts.assertString = function (a, b, c) {
    	    for (var d = [], e = 2; e < arguments.length; ++e) d[e - 2] = arguments[e];
    	    "string" !== typeof a && jspb.asserts.doAssertFailure("Expected string but got %s: %s.", [goog.typeOf(a), a], b, d);
    	    return a
    	};
    	jspb.asserts.assertArray = function (a, b, c) {
    	    for (var d = [], e = 2; e < arguments.length; ++e) d[e - 2] = arguments[e];
    	    Array.isArray(a) || jspb.asserts.doAssertFailure("Expected array but got %s: %s.", [goog.typeOf(a), a], b, d);
    	    return a
    	};
    	jspb.asserts.fail = function (a, b) {
    	    for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
    	    throw Error("Failure" + (a ? ": " + a : ""), c);
    	};
    	jspb.asserts.assertInstanceof = function (a, b, c, d) {
    	    for (var e = [], f = 3; f < arguments.length; ++f) e[f - 3] = arguments[f];
    	    a instanceof b || jspb.asserts.doAssertFailure("Expected instanceof %s but got %s.", [jspb.asserts.getType(b), jspb.asserts.getType(a)], c, e);
    	    return a
    	};
    	jspb.asserts.getType = function (a) {
    	    return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
    	};
    	jspb.BinaryConstants = {};
    	jspb.ConstBinaryMessage = function () {
    	};
    	jspb.BinaryMessage = function () {
    	};
    	jspb.BinaryConstants.FieldType = {
    	    INVALID: -1,
    	    DOUBLE: 1,
    	    FLOAT: 2,
    	    INT64: 3,
    	    UINT64: 4,
    	    INT32: 5,
    	    FIXED64: 6,
    	    FIXED32: 7,
    	    BOOL: 8,
    	    STRING: 9,
    	    GROUP: 10,
    	    MESSAGE: 11,
    	    BYTES: 12,
    	    UINT32: 13,
    	    ENUM: 14,
    	    SFIXED32: 15,
    	    SFIXED64: 16,
    	    SINT32: 17,
    	    SINT64: 18,
    	    FHASH64: 30,
    	    VHASH64: 31
    	};
    	jspb.BinaryConstants.WireType = {
    	    INVALID: -1,
    	    VARINT: 0,
    	    FIXED64: 1,
    	    DELIMITED: 2,
    	    START_GROUP: 3,
    	    END_GROUP: 4,
    	    FIXED32: 5
    	};
    	jspb.BinaryConstants.FieldTypeToWireType = function (a) {
    	    var b = jspb.BinaryConstants.FieldType, c = jspb.BinaryConstants.WireType;
    	    switch (a) {
    	        case b.INT32:
    	        case b.INT64:
    	        case b.UINT32:
    	        case b.UINT64:
    	        case b.SINT32:
    	        case b.SINT64:
    	        case b.BOOL:
    	        case b.ENUM:
    	        case b.VHASH64:
    	            return c.VARINT;
    	        case b.DOUBLE:
    	        case b.FIXED64:
    	        case b.SFIXED64:
    	        case b.FHASH64:
    	            return c.FIXED64;
    	        case b.STRING:
    	        case b.MESSAGE:
    	        case b.BYTES:
    	            return c.DELIMITED;
    	        case b.FLOAT:
    	        case b.FIXED32:
    	        case b.SFIXED32:
    	            return c.FIXED32;
    	        default:
    	            return c.INVALID
    	    }
    	};
    	jspb.BinaryConstants.INVALID_FIELD_NUMBER = -1;
    	jspb.BinaryConstants.FLOAT32_EPS = 1.401298464324817E-45;
    	jspb.BinaryConstants.FLOAT32_MIN = 1.1754943508222875E-38;
    	jspb.BinaryConstants.FLOAT32_MAX = 3.4028234663852886E38;
    	jspb.BinaryConstants.FLOAT64_EPS = 4.9E-324;
    	jspb.BinaryConstants.FLOAT64_MIN = 2.2250738585072014E-308;
    	jspb.BinaryConstants.FLOAT64_MAX = 1.7976931348623157E308;
    	jspb.BinaryConstants.TWO_TO_20 = 1048576;
    	jspb.BinaryConstants.TWO_TO_23 = 8388608;
    	jspb.BinaryConstants.TWO_TO_31 = 2147483648;
    	jspb.BinaryConstants.TWO_TO_32 = 4294967296;
    	jspb.BinaryConstants.TWO_TO_52 = 4503599627370496;
    	jspb.BinaryConstants.TWO_TO_63 = 0x7fffffffffffffff;
    	jspb.BinaryConstants.TWO_TO_64 = 1.8446744073709552E19;
    	jspb.BinaryConstants.ZERO_HASH = "\x00\x00\x00\x00\x00\x00\x00\x00";
    	goog.debug = {};
    	goog.debug.Error = function (a) {
    	    if (Error.captureStackTrace) Error.captureStackTrace(this, goog.debug.Error); else {
    	        var b = Error().stack;
    	        b && (this.stack = b);
    	    }
    	    a && (this.message = String(a));
    	    this.reportErrorToServer = !0;
    	};
    	goog.inherits(goog.debug.Error, Error);
    	goog.debug.Error.prototype.name = "CustomError";
    	goog.dom = {};
    	goog.dom.NodeType = {
    	    ELEMENT: 1,
    	    ATTRIBUTE: 2,
    	    TEXT: 3,
    	    CDATA_SECTION: 4,
    	    ENTITY_REFERENCE: 5,
    	    ENTITY: 6,
    	    PROCESSING_INSTRUCTION: 7,
    	    COMMENT: 8,
    	    DOCUMENT: 9,
    	    DOCUMENT_TYPE: 10,
    	    DOCUMENT_FRAGMENT: 11,
    	    NOTATION: 12
    	};
    	goog.asserts = {};
    	goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
    	goog.asserts.AssertionError = function (a, b) {
    	    goog.debug.Error.call(this, goog.asserts.subs_(a, b));
    	    this.messagePattern = a;
    	};
    	goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
    	goog.asserts.AssertionError.prototype.name = "AssertionError";
    	goog.asserts.DEFAULT_ERROR_HANDLER = function (a) {
    	    throw a;
    	};
    	goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
    	goog.asserts.subs_ = function (a, b) {
    	    a = a.split("%s");
    	    for (var c = "", d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : "%s");
    	    return c + a[d]
    	};
    	goog.asserts.doAssertFailure_ = function (a, b, c, d) {
    	    var e = "Assertion failed";
    	    if (c) {
    	        e += ": " + c;
    	        var f = d;
    	    } else a && (e += ": " + a, f = b);
    	    a = new goog.asserts.AssertionError("" + e, f || []);
    	    goog.asserts.errorHandler_(a);
    	};
    	goog.asserts.setErrorHandler = function (a) {
    	    goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = a);
    	};
    	goog.asserts.assert = function (a, b, c) {
    	    goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
    	    return a
    	};
    	goog.asserts.assertExists = function (a, b, c) {
    	    goog.asserts.ENABLE_ASSERTS && null == a && goog.asserts.doAssertFailure_("Expected to exist: %s.", [a], b, Array.prototype.slice.call(arguments, 2));
    	    return a
    	};
    	goog.asserts.fail = function (a, b) {
    	    goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)));
    	};
    	goog.asserts.assertNumber = function (a, b, c) {
    	    goog.asserts.ENABLE_ASSERTS && "number" !== typeof a && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    	    return a
    	};
    	goog.asserts.assertString = function (a, b, c) {
    	    goog.asserts.ENABLE_ASSERTS && "string" !== typeof a && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    	    return a
    	};
    	goog.asserts.assertFunction = function (a, b, c) {
    	    goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    	    return a
    	};
    	goog.asserts.assertObject = function (a, b, c) {
    	    goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    	    return a
    	};
    	goog.asserts.assertArray = function (a, b, c) {
    	    goog.asserts.ENABLE_ASSERTS && !Array.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    	    return a
    	};
    	goog.asserts.assertBoolean = function (a, b, c) {
    	    goog.asserts.ENABLE_ASSERTS && "boolean" !== typeof a && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    	    return a
    	};
    	goog.asserts.assertElement = function (a, b, c) {
    	    !goog.asserts.ENABLE_ASSERTS || goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    	    return a
    	};
    	goog.asserts.assertInstanceof = function (a, b, c, d) {
    	    !goog.asserts.ENABLE_ASSERTS || a instanceof b || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(b), goog.asserts.getType_(a)], c, Array.prototype.slice.call(arguments, 3));
    	    return a
    	};
    	goog.asserts.assertFinite = function (a, b, c) {
    	    !goog.asserts.ENABLE_ASSERTS || "number" == typeof a && isFinite(a) || goog.asserts.doAssertFailure_("Expected %s to be a finite number but it is not.", [a], b, Array.prototype.slice.call(arguments, 2));
    	    return a
    	};
    	goog.asserts.assertObjectPrototypeIsIntact = function () {
    	    for (var a in Object.prototype) goog.asserts.fail(a + " should not be enumerable in Object.prototype.");
    	};
    	goog.asserts.getType_ = function (a) {
    	    return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
    	};
    	goog.array = {};
    	goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
    	goog.array.ASSUME_NATIVE_FUNCTIONS = 2012 < goog.FEATURESET_YEAR;
    	goog.array.peek = function (a) {
    	    return a[a.length - 1]
    	};
    	goog.array.last = goog.array.peek;
    	goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function (a, b, c) {
    	    goog.asserts.assert(null != a.length);
    	    return Array.prototype.indexOf.call(a, b, c)
    	} : function (a, b, c) {
    	    c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
    	    if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, c);
    	    for (; c < a.length; c++) if (c in a && a[c] === b) return c;
    	    return -1
    	};
    	goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function (a, b, c) {
    	    goog.asserts.assert(null != a.length);
    	    return Array.prototype.lastIndexOf.call(a, b, null == c ? a.length - 1 : c)
    	} : function (a, b, c) {
    	    c = null == c ? a.length - 1 : c;
    	    0 > c && (c = Math.max(0, a.length + c));
    	    if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.lastIndexOf(b, c);
    	    for (; 0 <= c; c--) if (c in a && a[c] === b) return c;
    	    return -1
    	};
    	goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function (a, b, c) {
    	    goog.asserts.assert(null != a.length);
    	    Array.prototype.forEach.call(a, b, c);
    	} : function (a, b, c) {
    	    for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a);
    	};
    	goog.array.forEachRight = function (a, b, c) {
    	    var d = a.length, e = "string" === typeof a ? a.split("") : a;
    	    for (--d; 0 <= d; --d) d in e && b.call(c, e[d], d, a);
    	};
    	goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function (a, b, c) {
    	    goog.asserts.assert(null != a.length);
    	    return Array.prototype.filter.call(a, b, c)
    	} : function (a, b, c) {
    	    for (var d = a.length, e = [], f = 0, g = "string" === typeof a ? a.split("") : a, h = 0; h < d; h++) if (h in g) {
    	        var k = g[h];
    	        b.call(c, k, h, a) && (e[f++] = k);
    	    }
    	    return e
    	};
    	goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function (a, b, c) {
    	    goog.asserts.assert(null != a.length);
    	    return Array.prototype.map.call(a, b, c)
    	} : function (a, b, c) {
    	    for (var d = a.length, e = Array(d), f = "string" === typeof a ? a.split("") : a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
    	    return e
    	};
    	goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function (a, b, c, d) {
    	    goog.asserts.assert(null != a.length);
    	    d && (b = goog.bind(b, d));
    	    return Array.prototype.reduce.call(a, b, c)
    	} : function (a, b, c, d) {
    	    var e = c;
    	    goog.array.forEach(a, function (c, g) {
    	        e = b.call(d, e, c, g, a);
    	    });
    	    return e
    	};
    	goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function (a, b, c, d) {
    	    goog.asserts.assert(null != a.length);
    	    goog.asserts.assert(null != b);
    	    d && (b = goog.bind(b, d));
    	    return Array.prototype.reduceRight.call(a, b, c)
    	} : function (a, b, c, d) {
    	    var e = c;
    	    goog.array.forEachRight(a, function (c, g) {
    	        e = b.call(d, e, c, g, a);
    	    });
    	    return e
    	};
    	goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function (a, b, c) {
    	    goog.asserts.assert(null != a.length);
    	    return Array.prototype.some.call(a, b, c)
    	} : function (a, b, c) {
    	    for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++) if (f in e && b.call(c, e[f], f, a)) return !0;
    	    return !1
    	};
    	goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function (a, b, c) {
    	    goog.asserts.assert(null != a.length);
    	    return Array.prototype.every.call(a, b, c)
    	} : function (a, b, c) {
    	    for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++) if (f in e && !b.call(c, e[f], f, a)) return !1;
    	    return !0
    	};
    	goog.array.count = function (a, b, c) {
    	    var d = 0;
    	    goog.array.forEach(a, function (a, f, g) {
    	        b.call(c, a, f, g) && ++d;
    	    }, c);
    	    return d
    	};
    	goog.array.find = function (a, b, c) {
    	    b = goog.array.findIndex(a, b, c);
    	    return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b]
    	};
    	goog.array.findIndex = function (a, b, c) {
    	    for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++) if (f in e && b.call(c, e[f], f, a)) return f;
    	    return -1
    	};
    	goog.array.findRight = function (a, b, c) {
    	    b = goog.array.findIndexRight(a, b, c);
    	    return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b]
    	};
    	goog.array.findIndexRight = function (a, b, c) {
    	    var d = a.length, e = "string" === typeof a ? a.split("") : a;
    	    for (--d; 0 <= d; d--) if (d in e && b.call(c, e[d], d, a)) return d;
    	    return -1
    	};
    	goog.array.contains = function (a, b) {
    	    return 0 <= goog.array.indexOf(a, b)
    	};
    	goog.array.isEmpty = function (a) {
    	    return 0 == a.length
    	};
    	goog.array.clear = function (a) {
    	    if (!Array.isArray(a)) for (var b = a.length - 1; 0 <= b; b--) delete a[b];
    	    a.length = 0;
    	};
    	goog.array.insert = function (a, b) {
    	    goog.array.contains(a, b) || a.push(b);
    	};
    	goog.array.insertAt = function (a, b, c) {
    	    goog.array.splice(a, c, 0, b);
    	};
    	goog.array.insertArrayAt = function (a, b, c) {
    	    goog.partial(goog.array.splice, a, c, 0).apply(null, b);
    	};
    	goog.array.insertBefore = function (a, b, c) {
    	    var d;
    	    2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d);
    	};
    	goog.array.remove = function (a, b) {
    	    b = goog.array.indexOf(a, b);
    	    var c;
    	    (c = 0 <= b) && goog.array.removeAt(a, b);
    	    return c
    	};
    	goog.array.removeLast = function (a, b) {
    	    b = goog.array.lastIndexOf(a, b);
    	    return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1
    	};
    	goog.array.removeAt = function (a, b) {
    	    goog.asserts.assert(null != a.length);
    	    return 1 == Array.prototype.splice.call(a, b, 1).length
    	};
    	goog.array.removeIf = function (a, b, c) {
    	    b = goog.array.findIndex(a, b, c);
    	    return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1
    	};
    	goog.array.removeAllIf = function (a, b, c) {
    	    var d = 0;
    	    goog.array.forEachRight(a, function (e, f) {
    	        b.call(c, e, f, a) && goog.array.removeAt(a, f) && d++;
    	    });
    	    return d
    	};
    	goog.array.concat = function (a) {
    	    return Array.prototype.concat.apply([], arguments)
    	};
    	goog.array.join = function (a) {
    	    return Array.prototype.concat.apply([], arguments)
    	};
    	goog.array.toArray = function (a) {
    	    var b = a.length;
    	    if (0 < b) {
    	        for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
    	        return c
    	    }
    	    return []
    	};
    	goog.array.clone = goog.array.toArray;
    	goog.array.extend = function (a, b) {
    	    for (var c = 1; c < arguments.length; c++) {
    	        var d = arguments[c];
    	        if (goog.isArrayLike(d)) {
    	            var e = a.length || 0, f = d.length || 0;
    	            a.length = e + f;
    	            for (var g = 0; g < f; g++) a[e + g] = d[g];
    	        } else a.push(d);
    	    }
    	};
    	goog.array.splice = function (a, b, c, d) {
    	    goog.asserts.assert(null != a.length);
    	    return Array.prototype.splice.apply(a, goog.array.slice(arguments, 1))
    	};
    	goog.array.slice = function (a, b, c) {
    	    goog.asserts.assert(null != a.length);
    	    return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
    	};
    	goog.array.removeDuplicates = function (a, b, c) {
    	    b = b || a;
    	    var d = function (a) {
    	        return goog.isObject(a) ? "o" + goog.getUid(a) : (typeof a).charAt(0) + a
    	    };
    	    c = c || d;
    	    d = {};
    	    for (var e = 0, f = 0; f < a.length;) {
    	        var g = a[f++], h = c(g);
    	        Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, b[e++] = g);
    	    }
    	    b.length = e;
    	};
    	goog.array.binarySearch = function (a, b, c) {
    	    return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b)
    	};
    	goog.array.binarySelect = function (a, b, c) {
    	    return goog.array.binarySearch_(a, b, !0, void 0, c)
    	};
    	goog.array.binarySearch_ = function (a, b, c, d, e) {
    	    for (var f = 0, g = a.length, h; f < g;) {
    	        var k = f + (g - f >>> 1);
    	        var l = c ? b.call(e, a[k], k, a) : b(d, a[k]);
    	        0 < l ? f = k + 1 : (g = k, h = !l);
    	    }
    	    return h ? f : -f - 1
    	};
    	goog.array.sort = function (a, b) {
    	    a.sort(b || goog.array.defaultCompare);
    	};
    	goog.array.stableSort = function (a, b) {
    	    for (var c = Array(a.length), d = 0; d < a.length; d++) c[d] = {index: d, value: a[d]};
    	    var e = b || goog.array.defaultCompare;
    	    goog.array.sort(c, function (a, b) {
    	        return e(a.value, b.value) || a.index - b.index
    	    });
    	    for (d = 0; d < a.length; d++) a[d] = c[d].value;
    	};
    	goog.array.sortByKey = function (a, b, c) {
    	    var d = c || goog.array.defaultCompare;
    	    goog.array.sort(a, function (a, c) {
    	        return d(b(a), b(c))
    	    });
    	};
    	goog.array.sortObjectsByKey = function (a, b, c) {
    	    goog.array.sortByKey(a, function (a) {
    	        return a[b]
    	    }, c);
    	};
    	goog.array.isSorted = function (a, b, c) {
    	    b = b || goog.array.defaultCompare;
    	    for (var d = 1; d < a.length; d++) {
    	        var e = b(a[d - 1], a[d]);
    	        if (0 < e || 0 == e && c) return !1
    	    }
    	    return !0
    	};
    	goog.array.equals = function (a, b, c) {
    	    if (!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) return !1;
    	    var d = a.length;
    	    c = c || goog.array.defaultCompareEquality;
    	    for (var e = 0; e < d; e++) if (!c(a[e], b[e])) return !1;
    	    return !0
    	};
    	goog.array.compare3 = function (a, b, c) {
    	    c = c || goog.array.defaultCompare;
    	    for (var d = Math.min(a.length, b.length), e = 0; e < d; e++) {
    	        var f = c(a[e], b[e]);
    	        if (0 != f) return f
    	    }
    	    return goog.array.defaultCompare(a.length, b.length)
    	};
    	goog.array.defaultCompare = function (a, b) {
    	    return a > b ? 1 : a < b ? -1 : 0
    	};
    	goog.array.inverseDefaultCompare = function (a, b) {
    	    return -goog.array.defaultCompare(a, b)
    	};
    	goog.array.defaultCompareEquality = function (a, b) {
    	    return a === b
    	};
    	goog.array.binaryInsert = function (a, b, c) {
    	    c = goog.array.binarySearch(a, b, c);
    	    return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1
    	};
    	goog.array.binaryRemove = function (a, b, c) {
    	    b = goog.array.binarySearch(a, b, c);
    	    return 0 <= b ? goog.array.removeAt(a, b) : !1
    	};
    	goog.array.bucket = function (a, b, c) {
    	    for (var d = {}, e = 0; e < a.length; e++) {
    	        var f = a[e], g = b.call(c, f, e, a);
    	        void 0 !== g && (d[g] || (d[g] = [])).push(f);
    	    }
    	    return d
    	};
    	goog.array.toObject = function (a, b, c) {
    	    var d = {};
    	    goog.array.forEach(a, function (e, f) {
    	        d[b.call(c, e, f, a)] = e;
    	    });
    	    return d
    	};
    	goog.array.range = function (a, b, c) {
    	    var d = [], e = 0, f = a;
    	    c = c || 1;
    	    void 0 !== b && (e = a, f = b);
    	    if (0 > c * (f - e)) return [];
    	    if (0 < c) for (a = e; a < f; a += c) d.push(a); else for (a = e; a > f; a += c) d.push(a);
    	    return d
    	};
    	goog.array.repeat = function (a, b) {
    	    for (var c = [], d = 0; d < b; d++) c[d] = a;
    	    return c
    	};
    	goog.array.flatten = function (a) {
    	    for (var b = [], c = 0; c < arguments.length; c++) {
    	        var d = arguments[c];
    	        if (Array.isArray(d)) for (var e = 0; e < d.length; e += 8192) {
    	            var f = goog.array.slice(d, e, e + 8192);
    	            f = goog.array.flatten.apply(null, f);
    	            for (var g = 0; g < f.length; g++) b.push(f[g]);
    	        } else b.push(d);
    	    }
    	    return b
    	};
    	goog.array.rotate = function (a, b) {
    	    goog.asserts.assert(null != a.length);
    	    a.length && (b %= a.length, 0 < b ? Array.prototype.unshift.apply(a, a.splice(-b, b)) : 0 > b && Array.prototype.push.apply(a, a.splice(0, -b)));
    	    return a
    	};
    	goog.array.moveItem = function (a, b, c) {
    	    goog.asserts.assert(0 <= b && b < a.length);
    	    goog.asserts.assert(0 <= c && c < a.length);
    	    b = Array.prototype.splice.call(a, b, 1);
    	    Array.prototype.splice.call(a, c, 0, b[0]);
    	};
    	goog.array.zip = function (a) {
    	    if (!arguments.length) return [];
    	    for (var b = [], c = arguments[0].length, d = 1; d < arguments.length; d++) arguments[d].length < c && (c = arguments[d].length);
    	    for (d = 0; d < c; d++) {
    	        for (var e = [], f = 0; f < arguments.length; f++) e.push(arguments[f][d]);
    	        b.push(e);
    	    }
    	    return b
    	};
    	goog.array.shuffle = function (a, b) {
    	    b = b || Math.random;
    	    for (var c = a.length - 1; 0 < c; c--) {
    	        var d = Math.floor(b() * (c + 1)), e = a[c];
    	        a[c] = a[d];
    	        a[d] = e;
    	    }
    	};
    	goog.array.copyByIndex = function (a, b) {
    	    var c = [];
    	    goog.array.forEach(b, function (b) {
    	        c.push(a[b]);
    	    });
    	    return c
    	};
    	goog.array.concatMap = function (a, b, c) {
    	    return goog.array.concat.apply([], goog.array.map(a, b, c))
    	};
    	goog.crypt = {};
    	goog.crypt.stringToByteArray = function (a) {
    	    for (var b = [], c = 0, d = 0; d < a.length; d++) {
    	        var e = a.charCodeAt(d);
    	        255 < e && (b[c++] = e & 255, e >>= 8);
    	        b[c++] = e;
    	    }
    	    return b
    	};
    	goog.crypt.byteArrayToString = function (a) {
    	    if (8192 >= a.length) return String.fromCharCode.apply(null, a);
    	    for (var b = "", c = 0; c < a.length; c += 8192) {
    	        var d = goog.array.slice(a, c, c + 8192);
    	        b += String.fromCharCode.apply(null, d);
    	    }
    	    return b
    	};
    	goog.crypt.byteArrayToHex = function (a, b) {
    	    return goog.array.map(a, function (a) {
    	        a = a.toString(16);
    	        return 1 < a.length ? a : "0" + a
    	    }).join(b || "")
    	};
    	goog.crypt.hexToByteArray = function (a) {
    	    goog.asserts.assert(0 == a.length % 2, "Key string length must be multiple of 2");
    	    for (var b = [], c = 0; c < a.length; c += 2) b.push(parseInt(a.substring(c, c + 2), 16));
    	    return b
    	};
    	goog.crypt.stringToUtf8ByteArray = function (a) {
    	    for (var b = [], c = 0, d = 0; d < a.length; d++) {
    	        var e = a.charCodeAt(d);
    	        128 > e ? b[c++] = e : (2048 > e ? b[c++] = e >> 6 | 192 : (55296 == (e & 64512) && d + 1 < a.length && 56320 == (a.charCodeAt(d + 1) & 64512) ? (e = 65536 + ((e & 1023) << 10) + (a.charCodeAt(++d) & 1023), b[c++] = e >> 18 | 240, b[c++] = e >> 12 & 63 | 128) : b[c++] = e >> 12 | 224, b[c++] = e >> 6 & 63 | 128), b[c++] = e & 63 | 128);
    	    }
    	    return b
    	};
    	goog.crypt.utf8ByteArrayToString = function (a) {
    	    for (var b = [], c = 0, d = 0; c < a.length;) {
    	        var e = a[c++];
    	        if (128 > e) b[d++] = String.fromCharCode(e); else if (191 < e && 224 > e) {
    	            var f = a[c++];
    	            b[d++] = String.fromCharCode((e & 31) << 6 | f & 63);
    	        } else if (239 < e && 365 > e) {
    	            f = a[c++];
    	            var g = a[c++], h = a[c++];
    	            e = ((e & 7) << 18 | (f & 63) << 12 | (g & 63) << 6 | h & 63) - 65536;
    	            b[d++] = String.fromCharCode(55296 + (e >> 10));
    	            b[d++] = String.fromCharCode(56320 + (e & 1023));
    	        } else f = a[c++], g = a[c++], b[d++] = String.fromCharCode((e & 15) << 12 | (f & 63) << 6 | g & 63);
    	    }
    	    return b.join("")
    	};
    	goog.crypt.xorByteArray = function (a, b) {
    	    goog.asserts.assert(a.length == b.length, "XOR array lengths must match");
    	    for (var c = [], d = 0; d < a.length; d++) c.push(a[d] ^ b[d]);
    	    return c
    	};
    	goog.dom.asserts = {};
    	goog.dom.asserts.assertIsLocation = function (a) {
    	    if (goog.asserts.ENABLE_ASSERTS) {
    	        var b = goog.dom.asserts.getWindow_(a);
    	        b && (!a || !(a instanceof b.Location) && a instanceof b.Element) && goog.asserts.fail("Argument is not a Location (or a non-Element mock); got: %s", goog.dom.asserts.debugStringForType_(a));
    	    }
    	    return a
    	};
    	goog.dom.asserts.assertIsElementType_ = function (a, b) {
    	    if (goog.asserts.ENABLE_ASSERTS) {
    	        var c = goog.dom.asserts.getWindow_(a);
    	        c && "undefined" != typeof c[b] && (a && (a instanceof c[b] || !(a instanceof c.Location || a instanceof c.Element)) || goog.asserts.fail("Argument is not a %s (or a non-Element, non-Location mock); got: %s", b, goog.dom.asserts.debugStringForType_(a)));
    	    }
    	    return a
    	};
    	goog.dom.asserts.assertIsHTMLAnchorElement = function (a) {
    	    return goog.dom.asserts.assertIsElementType_(a, "HTMLAnchorElement")
    	};
    	goog.dom.asserts.assertIsHTMLButtonElement = function (a) {
    	    return goog.dom.asserts.assertIsElementType_(a, "HTMLButtonElement")
    	};
    	goog.dom.asserts.assertIsHTMLLinkElement = function (a) {
    	    return goog.dom.asserts.assertIsElementType_(a, "HTMLLinkElement")
    	};
    	goog.dom.asserts.assertIsHTMLImageElement = function (a) {
    	    return goog.dom.asserts.assertIsElementType_(a, "HTMLImageElement")
    	};
    	goog.dom.asserts.assertIsHTMLAudioElement = function (a) {
    	    return goog.dom.asserts.assertIsElementType_(a, "HTMLAudioElement")
    	};
    	goog.dom.asserts.assertIsHTMLVideoElement = function (a) {
    	    return goog.dom.asserts.assertIsElementType_(a, "HTMLVideoElement")
    	};
    	goog.dom.asserts.assertIsHTMLInputElement = function (a) {
    	    return goog.dom.asserts.assertIsElementType_(a, "HTMLInputElement")
    	};
    	goog.dom.asserts.assertIsHTMLTextAreaElement = function (a) {
    	    return goog.dom.asserts.assertIsElementType_(a, "HTMLTextAreaElement")
    	};
    	goog.dom.asserts.assertIsHTMLCanvasElement = function (a) {
    	    return goog.dom.asserts.assertIsElementType_(a, "HTMLCanvasElement")
    	};
    	goog.dom.asserts.assertIsHTMLEmbedElement = function (a) {
    	    return goog.dom.asserts.assertIsElementType_(a, "HTMLEmbedElement")
    	};
    	goog.dom.asserts.assertIsHTMLFormElement = function (a) {
    	    return goog.dom.asserts.assertIsElementType_(a, "HTMLFormElement")
    	};
    	goog.dom.asserts.assertIsHTMLFrameElement = function (a) {
    	    return goog.dom.asserts.assertIsElementType_(a, "HTMLFrameElement")
    	};
    	goog.dom.asserts.assertIsHTMLIFrameElement = function (a) {
    	    return goog.dom.asserts.assertIsElementType_(a, "HTMLIFrameElement")
    	};
    	goog.dom.asserts.assertIsHTMLObjectElement = function (a) {
    	    return goog.dom.asserts.assertIsElementType_(a, "HTMLObjectElement")
    	};
    	goog.dom.asserts.assertIsHTMLScriptElement = function (a) {
    	    return goog.dom.asserts.assertIsElementType_(a, "HTMLScriptElement")
    	};
    	goog.dom.asserts.debugStringForType_ = function (a) {
    	    if (goog.isObject(a)) try {
    	        return a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a)
    	    } catch (b) {
    	        return "<object could not be stringified>"
    	    } else return void 0 === a ? "undefined" : null === a ? "null" : typeof a
    	};
    	goog.dom.asserts.getWindow_ = function (a) {
    	    try {
    	        var b = a && a.ownerDocument, c = b && (b.defaultView || b.parentWindow);
    	        c = c || goog.global;
    	        if (c.Element && c.Location) return c
    	    } catch (d) {
    	    }
    	    return null
    	};
    	goog.functions = {};
    	goog.functions.constant = function (a) {
    	    return function () {
    	        return a
    	    }
    	};
    	goog.functions.FALSE = function () {
    	    return !1
    	};
    	goog.functions.TRUE = function () {
    	    return !0
    	};
    	goog.functions.NULL = function () {
    	    return null
    	};
    	goog.functions.identity = function (a, b) {
    	    return a
    	};
    	goog.functions.error = function (a) {
    	    return function () {
    	        throw Error(a);
    	    }
    	};
    	goog.functions.fail = function (a) {
    	    return function () {
    	        throw a;
    	    }
    	};
    	goog.functions.lock = function (a, b) {
    	    b = b || 0;
    	    return function () {
    	        return a.apply(this, Array.prototype.slice.call(arguments, 0, b))
    	    }
    	};
    	goog.functions.nth = function (a) {
    	    return function () {
    	        return arguments[a]
    	    }
    	};
    	goog.functions.partialRight = function (a, b) {
    	    var c = Array.prototype.slice.call(arguments, 1);
    	    return function () {
    	        var b = Array.prototype.slice.call(arguments);
    	        b.push.apply(b, c);
    	        return a.apply(this, b)
    	    }
    	};
    	goog.functions.withReturnValue = function (a, b) {
    	    return goog.functions.sequence(a, goog.functions.constant(b))
    	};
    	goog.functions.equalTo = function (a, b) {
    	    return function (c) {
    	        return b ? a == c : a === c
    	    }
    	};
    	goog.functions.compose = function (a, b) {
    	    var c = arguments, d = c.length;
    	    return function () {
    	        var a;
    	        d && (a = c[d - 1].apply(this, arguments));
    	        for (var b = d - 2; 0 <= b; b--) a = c[b].call(this, a);
    	        return a
    	    }
    	};
    	goog.functions.sequence = function (a) {
    	    var b = arguments, c = b.length;
    	    return function () {
    	        for (var a, e = 0; e < c; e++) a = b[e].apply(this, arguments);
    	        return a
    	    }
    	};
    	goog.functions.and = function (a) {
    	    var b = arguments, c = b.length;
    	    return function () {
    	        for (var a = 0; a < c; a++) if (!b[a].apply(this, arguments)) return !1;
    	        return !0
    	    }
    	};
    	goog.functions.or = function (a) {
    	    var b = arguments, c = b.length;
    	    return function () {
    	        for (var a = 0; a < c; a++) if (b[a].apply(this, arguments)) return !0;
    	        return !1
    	    }
    	};
    	goog.functions.not = function (a) {
    	    return function () {
    	        return !a.apply(this, arguments)
    	    }
    	};
    	goog.functions.create = function (a, b) {
    	    var c = function () {
    	    };
    	    c.prototype = a.prototype;
    	    c = new c;
    	    a.apply(c, Array.prototype.slice.call(arguments, 1));
    	    return c
    	};
    	goog.functions.CACHE_RETURN_VALUE = !0;
    	goog.functions.cacheReturnValue = function (a) {
    	    var b = !1, c;
    	    return function () {
    	        if (!goog.functions.CACHE_RETURN_VALUE) return a();
    	        b || (c = a(), b = !0);
    	        return c
    	    }
    	};
    	goog.functions.once = function (a) {
    	    var b = a;
    	    return function () {
    	        if (b) {
    	            var a = b;
    	            b = null;
    	            a();
    	        }
    	    }
    	};
    	goog.functions.debounce = function (a, b, c) {
    	    var d = 0;
    	    return function (e) {
    	        goog.global.clearTimeout(d);
    	        var f = arguments;
    	        d = goog.global.setTimeout(function () {
    	            a.apply(c, f);
    	        }, b);
    	    }
    	};
    	goog.functions.throttle = function (a, b, c) {
    	    var d = 0, e = !1, f = [], g = function () {
    	        d = 0;
    	        e && (e = !1, h());
    	    }, h = function () {
    	        d = goog.global.setTimeout(g, b);
    	        a.apply(c, f);
    	    };
    	    return function (a) {
    	        f = arguments;
    	        d ? e = !0 : h();
    	    }
    	};
    	goog.functions.rateLimit = function (a, b, c) {
    	    var d = 0, e = function () {
    	        d = 0;
    	    };
    	    return function (f) {
    	        d || (d = goog.global.setTimeout(e, b), a.apply(c, arguments));
    	    }
    	};
    	goog.dom.HtmlElement = function () {
    	};
    	goog.dom.TagName = function (a) {
    	    this.tagName_ = a;
    	};
    	goog.dom.TagName.prototype.toString = function () {
    	    return this.tagName_
    	};
    	goog.dom.TagName.A = new goog.dom.TagName("A");
    	goog.dom.TagName.ABBR = new goog.dom.TagName("ABBR");
    	goog.dom.TagName.ACRONYM = new goog.dom.TagName("ACRONYM");
    	goog.dom.TagName.ADDRESS = new goog.dom.TagName("ADDRESS");
    	goog.dom.TagName.APPLET = new goog.dom.TagName("APPLET");
    	goog.dom.TagName.AREA = new goog.dom.TagName("AREA");
    	goog.dom.TagName.ARTICLE = new goog.dom.TagName("ARTICLE");
    	goog.dom.TagName.ASIDE = new goog.dom.TagName("ASIDE");
    	goog.dom.TagName.AUDIO = new goog.dom.TagName("AUDIO");
    	goog.dom.TagName.B = new goog.dom.TagName("B");
    	goog.dom.TagName.BASE = new goog.dom.TagName("BASE");
    	goog.dom.TagName.BASEFONT = new goog.dom.TagName("BASEFONT");
    	goog.dom.TagName.BDI = new goog.dom.TagName("BDI");
    	goog.dom.TagName.BDO = new goog.dom.TagName("BDO");
    	goog.dom.TagName.BIG = new goog.dom.TagName("BIG");
    	goog.dom.TagName.BLOCKQUOTE = new goog.dom.TagName("BLOCKQUOTE");
    	goog.dom.TagName.BODY = new goog.dom.TagName("BODY");
    	goog.dom.TagName.BR = new goog.dom.TagName("BR");
    	goog.dom.TagName.BUTTON = new goog.dom.TagName("BUTTON");
    	goog.dom.TagName.CANVAS = new goog.dom.TagName("CANVAS");
    	goog.dom.TagName.CAPTION = new goog.dom.TagName("CAPTION");
    	goog.dom.TagName.CENTER = new goog.dom.TagName("CENTER");
    	goog.dom.TagName.CITE = new goog.dom.TagName("CITE");
    	goog.dom.TagName.CODE = new goog.dom.TagName("CODE");
    	goog.dom.TagName.COL = new goog.dom.TagName("COL");
    	goog.dom.TagName.COLGROUP = new goog.dom.TagName("COLGROUP");
    	goog.dom.TagName.COMMAND = new goog.dom.TagName("COMMAND");
    	goog.dom.TagName.DATA = new goog.dom.TagName("DATA");
    	goog.dom.TagName.DATALIST = new goog.dom.TagName("DATALIST");
    	goog.dom.TagName.DD = new goog.dom.TagName("DD");
    	goog.dom.TagName.DEL = new goog.dom.TagName("DEL");
    	goog.dom.TagName.DETAILS = new goog.dom.TagName("DETAILS");
    	goog.dom.TagName.DFN = new goog.dom.TagName("DFN");
    	goog.dom.TagName.DIALOG = new goog.dom.TagName("DIALOG");
    	goog.dom.TagName.DIR = new goog.dom.TagName("DIR");
    	goog.dom.TagName.DIV = new goog.dom.TagName("DIV");
    	goog.dom.TagName.DL = new goog.dom.TagName("DL");
    	goog.dom.TagName.DT = new goog.dom.TagName("DT");
    	goog.dom.TagName.EM = new goog.dom.TagName("EM");
    	goog.dom.TagName.EMBED = new goog.dom.TagName("EMBED");
    	goog.dom.TagName.FIELDSET = new goog.dom.TagName("FIELDSET");
    	goog.dom.TagName.FIGCAPTION = new goog.dom.TagName("FIGCAPTION");
    	goog.dom.TagName.FIGURE = new goog.dom.TagName("FIGURE");
    	goog.dom.TagName.FONT = new goog.dom.TagName("FONT");
    	goog.dom.TagName.FOOTER = new goog.dom.TagName("FOOTER");
    	goog.dom.TagName.FORM = new goog.dom.TagName("FORM");
    	goog.dom.TagName.FRAME = new goog.dom.TagName("FRAME");
    	goog.dom.TagName.FRAMESET = new goog.dom.TagName("FRAMESET");
    	goog.dom.TagName.H1 = new goog.dom.TagName("H1");
    	goog.dom.TagName.H2 = new goog.dom.TagName("H2");
    	goog.dom.TagName.H3 = new goog.dom.TagName("H3");
    	goog.dom.TagName.H4 = new goog.dom.TagName("H4");
    	goog.dom.TagName.H5 = new goog.dom.TagName("H5");
    	goog.dom.TagName.H6 = new goog.dom.TagName("H6");
    	goog.dom.TagName.HEAD = new goog.dom.TagName("HEAD");
    	goog.dom.TagName.HEADER = new goog.dom.TagName("HEADER");
    	goog.dom.TagName.HGROUP = new goog.dom.TagName("HGROUP");
    	goog.dom.TagName.HR = new goog.dom.TagName("HR");
    	goog.dom.TagName.HTML = new goog.dom.TagName("HTML");
    	goog.dom.TagName.I = new goog.dom.TagName("I");
    	goog.dom.TagName.IFRAME = new goog.dom.TagName("IFRAME");
    	goog.dom.TagName.IMG = new goog.dom.TagName("IMG");
    	goog.dom.TagName.INPUT = new goog.dom.TagName("INPUT");
    	goog.dom.TagName.INS = new goog.dom.TagName("INS");
    	goog.dom.TagName.ISINDEX = new goog.dom.TagName("ISINDEX");
    	goog.dom.TagName.KBD = new goog.dom.TagName("KBD");
    	goog.dom.TagName.KEYGEN = new goog.dom.TagName("KEYGEN");
    	goog.dom.TagName.LABEL = new goog.dom.TagName("LABEL");
    	goog.dom.TagName.LEGEND = new goog.dom.TagName("LEGEND");
    	goog.dom.TagName.LI = new goog.dom.TagName("LI");
    	goog.dom.TagName.LINK = new goog.dom.TagName("LINK");
    	goog.dom.TagName.MAIN = new goog.dom.TagName("MAIN");
    	goog.dom.TagName.MAP = new goog.dom.TagName("MAP");
    	goog.dom.TagName.MARK = new goog.dom.TagName("MARK");
    	goog.dom.TagName.MATH = new goog.dom.TagName("MATH");
    	goog.dom.TagName.MENU = new goog.dom.TagName("MENU");
    	goog.dom.TagName.MENUITEM = new goog.dom.TagName("MENUITEM");
    	goog.dom.TagName.META = new goog.dom.TagName("META");
    	goog.dom.TagName.METER = new goog.dom.TagName("METER");
    	goog.dom.TagName.NAV = new goog.dom.TagName("NAV");
    	goog.dom.TagName.NOFRAMES = new goog.dom.TagName("NOFRAMES");
    	goog.dom.TagName.NOSCRIPT = new goog.dom.TagName("NOSCRIPT");
    	goog.dom.TagName.OBJECT = new goog.dom.TagName("OBJECT");
    	goog.dom.TagName.OL = new goog.dom.TagName("OL");
    	goog.dom.TagName.OPTGROUP = new goog.dom.TagName("OPTGROUP");
    	goog.dom.TagName.OPTION = new goog.dom.TagName("OPTION");
    	goog.dom.TagName.OUTPUT = new goog.dom.TagName("OUTPUT");
    	goog.dom.TagName.P = new goog.dom.TagName("P");
    	goog.dom.TagName.PARAM = new goog.dom.TagName("PARAM");
    	goog.dom.TagName.PICTURE = new goog.dom.TagName("PICTURE");
    	goog.dom.TagName.PRE = new goog.dom.TagName("PRE");
    	goog.dom.TagName.PROGRESS = new goog.dom.TagName("PROGRESS");
    	goog.dom.TagName.Q = new goog.dom.TagName("Q");
    	goog.dom.TagName.RP = new goog.dom.TagName("RP");
    	goog.dom.TagName.RT = new goog.dom.TagName("RT");
    	goog.dom.TagName.RTC = new goog.dom.TagName("RTC");
    	goog.dom.TagName.RUBY = new goog.dom.TagName("RUBY");
    	goog.dom.TagName.S = new goog.dom.TagName("S");
    	goog.dom.TagName.SAMP = new goog.dom.TagName("SAMP");
    	goog.dom.TagName.SCRIPT = new goog.dom.TagName("SCRIPT");
    	goog.dom.TagName.SECTION = new goog.dom.TagName("SECTION");
    	goog.dom.TagName.SELECT = new goog.dom.TagName("SELECT");
    	goog.dom.TagName.SMALL = new goog.dom.TagName("SMALL");
    	goog.dom.TagName.SOURCE = new goog.dom.TagName("SOURCE");
    	goog.dom.TagName.SPAN = new goog.dom.TagName("SPAN");
    	goog.dom.TagName.STRIKE = new goog.dom.TagName("STRIKE");
    	goog.dom.TagName.STRONG = new goog.dom.TagName("STRONG");
    	goog.dom.TagName.STYLE = new goog.dom.TagName("STYLE");
    	goog.dom.TagName.SUB = new goog.dom.TagName("SUB");
    	goog.dom.TagName.SUMMARY = new goog.dom.TagName("SUMMARY");
    	goog.dom.TagName.SUP = new goog.dom.TagName("SUP");
    	goog.dom.TagName.SVG = new goog.dom.TagName("SVG");
    	goog.dom.TagName.TABLE = new goog.dom.TagName("TABLE");
    	goog.dom.TagName.TBODY = new goog.dom.TagName("TBODY");
    	goog.dom.TagName.TD = new goog.dom.TagName("TD");
    	goog.dom.TagName.TEMPLATE = new goog.dom.TagName("TEMPLATE");
    	goog.dom.TagName.TEXTAREA = new goog.dom.TagName("TEXTAREA");
    	goog.dom.TagName.TFOOT = new goog.dom.TagName("TFOOT");
    	goog.dom.TagName.TH = new goog.dom.TagName("TH");
    	goog.dom.TagName.THEAD = new goog.dom.TagName("THEAD");
    	goog.dom.TagName.TIME = new goog.dom.TagName("TIME");
    	goog.dom.TagName.TITLE = new goog.dom.TagName("TITLE");
    	goog.dom.TagName.TR = new goog.dom.TagName("TR");
    	goog.dom.TagName.TRACK = new goog.dom.TagName("TRACK");
    	goog.dom.TagName.TT = new goog.dom.TagName("TT");
    	goog.dom.TagName.U = new goog.dom.TagName("U");
    	goog.dom.TagName.UL = new goog.dom.TagName("UL");
    	goog.dom.TagName.VAR = new goog.dom.TagName("VAR");
    	goog.dom.TagName.VIDEO = new goog.dom.TagName("VIDEO");
    	goog.dom.TagName.WBR = new goog.dom.TagName("WBR");
    	goog.dom.tags = {};
    	goog.dom.tags.VOID_TAGS_ = {
    	    area: !0,
    	    base: !0,
    	    br: !0,
    	    col: !0,
    	    command: !0,
    	    embed: !0,
    	    hr: !0,
    	    img: !0,
    	    input: !0,
    	    keygen: !0,
    	    link: !0,
    	    meta: !0,
    	    param: !0,
    	    source: !0,
    	    track: !0,
    	    wbr: !0
    	};
    	goog.dom.tags.isVoidTag = function (a) {
    	    return !0 === goog.dom.tags.VOID_TAGS_[a]
    	};
    	goog.html = {};
    	goog.html.trustedtypes = {};
    	goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY = goog.TRUSTED_TYPES_POLICY_NAME ? goog.createTrustedTypesPolicy(goog.TRUSTED_TYPES_POLICY_NAME + "#html") : null;
    	goog.string = {};
    	goog.string.TypedString = function () {
    	};
    	goog.string.Const = function (a, b) {
    	    this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = a === goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_ && b || "";
    	    this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = goog.string.Const.TYPE_MARKER_;
    	};
    	goog.string.Const.prototype.implementsGoogStringTypedString = !0;
    	goog.string.Const.prototype.getTypedStringValue = function () {
    	    return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_
    	};
    	goog.DEBUG && (goog.string.Const.prototype.toString = function () {
    	    return "Const{" + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + "}"
    	});
    	goog.string.Const.unwrap = function (a) {
    	    if (a instanceof goog.string.Const && a.constructor === goog.string.Const && a.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === goog.string.Const.TYPE_MARKER_) return a.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
    	    goog.asserts.fail("expected object of type Const, got '" + a + "'");
    	    return "type_error:Const"
    	};
    	goog.string.Const.from = function (a) {
    	    return new goog.string.Const(goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_, a)
    	};
    	goog.string.Const.TYPE_MARKER_ = {};
    	goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_ = {};
    	goog.string.Const.EMPTY = goog.string.Const.from("");
    	goog.html.SafeScript = function () {
    	    this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = "";
    	    this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
    	};
    	goog.html.SafeScript.prototype.implementsGoogStringTypedString = !0;
    	goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
    	goog.html.SafeScript.fromConstant = function (a) {
    	    a = goog.string.Const.unwrap(a);
    	    return 0 === a.length ? goog.html.SafeScript.EMPTY : goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(a)
    	};
    	goog.html.SafeScript.fromConstantAndArgs = function (a, b) {
    	    for (var c = [], d = 1; d < arguments.length; d++) c.push(goog.html.SafeScript.stringify_(arguments[d]));
    	    return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("(" + goog.string.Const.unwrap(a) + ")(" + c.join(", ") + ");")
    	};
    	goog.html.SafeScript.fromJson = function (a) {
    	    return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(goog.html.SafeScript.stringify_(a))
    	};
    	goog.html.SafeScript.prototype.getTypedStringValue = function () {
    	    return this.privateDoNotAccessOrElseSafeScriptWrappedValue_.toString()
    	};
    	goog.DEBUG && (goog.html.SafeScript.prototype.toString = function () {
    	    return "SafeScript{" + this.privateDoNotAccessOrElseSafeScriptWrappedValue_ + "}"
    	});
    	goog.html.SafeScript.unwrap = function (a) {
    	    return goog.html.SafeScript.unwrapTrustedScript(a).toString()
    	};
    	goog.html.SafeScript.unwrapTrustedScript = function (a) {
    	    if (a instanceof goog.html.SafeScript && a.constructor === goog.html.SafeScript && a.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeScriptWrappedValue_;
    	    goog.asserts.fail("expected object of type SafeScript, got '" + a + "' of type " + goog.typeOf(a));
    	    return "type_error:SafeScript"
    	};
    	goog.html.SafeScript.stringify_ = function (a) {
    	    return JSON.stringify(a).replace(/</g, "\\x3c")
    	};
    	goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse = function (a) {
    	    return (new goog.html.SafeScript).initSecurityPrivateDoNotAccessOrElse_(a)
    	};
    	goog.html.SafeScript.prototype.initSecurityPrivateDoNotAccessOrElse_ = function (a) {
    	    this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY ? goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createScript(a) : a;
    	    return this
    	};
    	goog.html.SafeScript.EMPTY = goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("");
    	goog.fs = {};
    	goog.fs.url = {};
    	goog.fs.url.createObjectUrl = function (a) {
    	    return goog.fs.url.getUrlObject_().createObjectURL(a)
    	};
    	goog.fs.url.revokeObjectUrl = function (a) {
    	    goog.fs.url.getUrlObject_().revokeObjectURL(a);
    	};
    	goog.fs.url.UrlObject_ = function () {
    	};
    	goog.fs.url.UrlObject_.prototype.createObjectURL = function (a) {
    	};
    	goog.fs.url.UrlObject_.prototype.revokeObjectURL = function (a) {
    	};
    	goog.fs.url.getUrlObject_ = function () {
    	    var a = goog.fs.url.findUrlObject_();
    	    if (null != a) return a;
    	    throw Error("This browser doesn't seem to support blob URLs");
    	};
    	goog.fs.url.findUrlObject_ = function () {
    	    return void 0 !== goog.global.URL && void 0 !== goog.global.URL.createObjectURL ? goog.global.URL : void 0 !== goog.global.webkitURL && void 0 !== goog.global.webkitURL.createObjectURL ? goog.global.webkitURL : void 0 !== goog.global.createObjectURL ? goog.global : null
    	};
    	goog.fs.url.browserSupportsObjectUrls = function () {
    	    return null != goog.fs.url.findUrlObject_()
    	};
    	goog.fs.blob = {};
    	goog.fs.blob.getBlob = function (a) {
    	    var b = goog.global.BlobBuilder || goog.global.WebKitBlobBuilder;
    	    if (void 0 !== b) {
    	        b = new b;
    	        for (var c = 0; c < arguments.length; c++) b.append(arguments[c]);
    	        return b.getBlob()
    	    }
    	    return goog.fs.blob.getBlobWithProperties(goog.array.toArray(arguments))
    	};
    	goog.fs.blob.getBlobWithProperties = function (a, b, c) {
    	    var d = goog.global.BlobBuilder || goog.global.WebKitBlobBuilder;
    	    if (void 0 !== d) {
    	        d = new d;
    	        for (var e = 0; e < a.length; e++) d.append(a[e], c);
    	        return d.getBlob(b)
    	    }
    	    if (void 0 !== goog.global.Blob) return d = {}, b && (d.type = b), c && (d.endings = c), new Blob(a, d);
    	    throw Error("This browser doesn't seem to support creating Blobs");
    	};
    	goog.i18n = {};
    	goog.i18n.bidi = {};
    	goog.i18n.bidi.FORCE_RTL = !1;
    	goog.i18n.bidi.IS_RTL = goog.i18n.bidi.FORCE_RTL || ("ar" == goog.LOCALE.substring(0, 2).toLowerCase() || "fa" == goog.LOCALE.substring(0, 2).toLowerCase() || "he" == goog.LOCALE.substring(0, 2).toLowerCase() || "iw" == goog.LOCALE.substring(0, 2).toLowerCase() || "ps" == goog.LOCALE.substring(0, 2).toLowerCase() || "sd" == goog.LOCALE.substring(0, 2).toLowerCase() || "ug" == goog.LOCALE.substring(0, 2).toLowerCase() || "ur" == goog.LOCALE.substring(0, 2).toLowerCase() || "yi" == goog.LOCALE.substring(0, 2).toLowerCase()) && (2 == goog.LOCALE.length ||
    	    "-" == goog.LOCALE.substring(2, 3) || "_" == goog.LOCALE.substring(2, 3)) || 3 <= goog.LOCALE.length && "ckb" == goog.LOCALE.substring(0, 3).toLowerCase() && (3 == goog.LOCALE.length || "-" == goog.LOCALE.substring(3, 4) || "_" == goog.LOCALE.substring(3, 4)) || 7 <= goog.LOCALE.length && ("-" == goog.LOCALE.substring(2, 3) || "_" == goog.LOCALE.substring(2, 3)) && ("adlm" == goog.LOCALE.substring(3, 7).toLowerCase() || "arab" == goog.LOCALE.substring(3, 7).toLowerCase() || "hebr" == goog.LOCALE.substring(3, 7).toLowerCase() || "nkoo" == goog.LOCALE.substring(3,
    	    7).toLowerCase() || "rohg" == goog.LOCALE.substring(3, 7).toLowerCase() || "thaa" == goog.LOCALE.substring(3, 7).toLowerCase()) || 8 <= goog.LOCALE.length && ("-" == goog.LOCALE.substring(3, 4) || "_" == goog.LOCALE.substring(3, 4)) && ("adlm" == goog.LOCALE.substring(4, 8).toLowerCase() || "arab" == goog.LOCALE.substring(4, 8).toLowerCase() || "hebr" == goog.LOCALE.substring(4, 8).toLowerCase() || "nkoo" == goog.LOCALE.substring(4, 8).toLowerCase() || "rohg" == goog.LOCALE.substring(4, 8).toLowerCase() || "thaa" == goog.LOCALE.substring(4, 8).toLowerCase());
    	goog.i18n.bidi.Format = {LRE: "\u202a", RLE: "\u202b", PDF: "\u202c", LRM: "\u200e", RLM: "\u200f"};
    	goog.i18n.bidi.Dir = {LTR: 1, RTL: -1, NEUTRAL: 0};
    	goog.i18n.bidi.RIGHT = "right";
    	goog.i18n.bidi.LEFT = "left";
    	goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT;
    	goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT;
    	goog.i18n.bidi.toDir = function (a, b) {
    	    return "number" == typeof a ? 0 < a ? goog.i18n.bidi.Dir.LTR : 0 > a ? goog.i18n.bidi.Dir.RTL : b ? null : goog.i18n.bidi.Dir.NEUTRAL : null == a ? null : a ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
    	};
    	goog.i18n.bidi.ltrChars_ = "A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff";
    	goog.i18n.bidi.rtlChars_ = "\u0591-\u06ef\u06fa-\u08ff\u200f\ud802-\ud803\ud83a-\ud83b\ufb1d-\ufdff\ufe70-\ufefc";
    	goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g;
    	goog.i18n.bidi.stripHtmlIfNeeded_ = function (a, b) {
    	    return b ? a.replace(goog.i18n.bidi.htmlSkipReg_, "") : a
    	};
    	goog.i18n.bidi.rtlCharReg_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "]");
    	goog.i18n.bidi.ltrCharReg_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "]");
    	goog.i18n.bidi.hasAnyRtl = function (a, b) {
    	    return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
    	};
    	goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl;
    	goog.i18n.bidi.hasAnyLtr = function (a, b) {
    	    return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
    	};
    	goog.i18n.bidi.ltrRe_ = new RegExp("^[" + goog.i18n.bidi.ltrChars_ + "]");
    	goog.i18n.bidi.rtlRe_ = new RegExp("^[" + goog.i18n.bidi.rtlChars_ + "]");
    	goog.i18n.bidi.isRtlChar = function (a) {
    	    return goog.i18n.bidi.rtlRe_.test(a)
    	};
    	goog.i18n.bidi.isLtrChar = function (a) {
    	    return goog.i18n.bidi.ltrRe_.test(a)
    	};
    	goog.i18n.bidi.isNeutralChar = function (a) {
    	    return !goog.i18n.bidi.isLtrChar(a) && !goog.i18n.bidi.isRtlChar(a)
    	};
    	goog.i18n.bidi.ltrDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.rtlChars_ + "]*[" + goog.i18n.bidi.ltrChars_ + "]");
    	goog.i18n.bidi.rtlDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.ltrChars_ + "]*[" + goog.i18n.bidi.rtlChars_ + "]");
    	goog.i18n.bidi.startsWithRtl = function (a, b) {
    	    return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
    	};
    	goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl;
    	goog.i18n.bidi.startsWithLtr = function (a, b) {
    	    return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
    	};
    	goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr;
    	goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/;
    	goog.i18n.bidi.isNeutralText = function (a, b) {
    	    a = goog.i18n.bidi.stripHtmlIfNeeded_(a, b);
    	    return goog.i18n.bidi.isRequiredLtrRe_.test(a) || !goog.i18n.bidi.hasAnyLtr(a) && !goog.i18n.bidi.hasAnyRtl(a)
    	};
    	goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "][^" + goog.i18n.bidi.rtlChars_ + "]*$");
    	goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "][^" + goog.i18n.bidi.ltrChars_ + "]*$");
    	goog.i18n.bidi.endsWithLtr = function (a, b) {
    	    return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
    	};
    	goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr;
    	goog.i18n.bidi.endsWithRtl = function (a, b) {
    	    return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
    	};
    	goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl;
    	goog.i18n.bidi.rtlLocalesRe_ = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
    	goog.i18n.bidi.isRtlLanguage = function (a) {
    	    return goog.i18n.bidi.rtlLocalesRe_.test(a)
    	};
    	goog.i18n.bidi.bracketGuardTextRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;
    	goog.i18n.bidi.guardBracketInText = function (a, b) {
    	    b = (void 0 === b ? goog.i18n.bidi.hasAnyRtl(a) : b) ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
    	    return a.replace(goog.i18n.bidi.bracketGuardTextRe_, b + "$&" + b)
    	};
    	goog.i18n.bidi.enforceRtlInHtml = function (a) {
    	    return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=rtl") : "\n<span dir=rtl>" + a + "</span>"
    	};
    	goog.i18n.bidi.enforceRtlInText = function (a) {
    	    return goog.i18n.bidi.Format.RLE + a + goog.i18n.bidi.Format.PDF
    	};
    	goog.i18n.bidi.enforceLtrInHtml = function (a) {
    	    return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=ltr") : "\n<span dir=ltr>" + a + "</span>"
    	};
    	goog.i18n.bidi.enforceLtrInText = function (a) {
    	    return goog.i18n.bidi.Format.LRE + a + goog.i18n.bidi.Format.PDF
    	};
    	goog.i18n.bidi.dimensionsRe_ = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;
    	goog.i18n.bidi.leftRe_ = /left/gi;
    	goog.i18n.bidi.rightRe_ = /right/gi;
    	goog.i18n.bidi.tempRe_ = /%%%%/g;
    	goog.i18n.bidi.mirrorCSS = function (a) {
    	    return a.replace(goog.i18n.bidi.dimensionsRe_, ":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_, "%%%%").replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT)
    	};
    	goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g;
    	goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g;
    	goog.i18n.bidi.normalizeHebrewQuote = function (a) {
    	    return a.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, "$1\u05f4").replace(goog.i18n.bidi.singleQuoteSubstituteRe_, "$1\u05f3")
    	};
    	goog.i18n.bidi.wordSeparatorRe_ = /\s+/;
    	goog.i18n.bidi.hasNumeralsRe_ = /[\d\u06f0-\u06f9]/;
    	goog.i18n.bidi.rtlDetectionThreshold_ = .4;
    	goog.i18n.bidi.estimateDirection = function (a, b) {
    	    var c = 0, d = 0, e = !1;
    	    a = goog.i18n.bidi.stripHtmlIfNeeded_(a, b).split(goog.i18n.bidi.wordSeparatorRe_);
    	    for (b = 0; b < a.length; b++) {
    	        var f = a[b];
    	        goog.i18n.bidi.startsWithRtl(f) ? (c++, d++) : goog.i18n.bidi.isRequiredLtrRe_.test(f) ? e = !0 : goog.i18n.bidi.hasAnyLtr(f) ? d++ : goog.i18n.bidi.hasNumeralsRe_.test(f) && (e = !0);
    	    }
    	    return 0 == d ? e ? goog.i18n.bidi.Dir.LTR : goog.i18n.bidi.Dir.NEUTRAL : c / d > goog.i18n.bidi.rtlDetectionThreshold_ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
    	};
    	goog.i18n.bidi.detectRtlDirectionality = function (a, b) {
    	    return goog.i18n.bidi.estimateDirection(a, b) == goog.i18n.bidi.Dir.RTL
    	};
    	goog.i18n.bidi.setElementDirAndAlign = function (a, b) {
    	    a && (b = goog.i18n.bidi.toDir(b)) && (a.style.textAlign = b == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT, a.dir = b == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr");
    	};
    	goog.i18n.bidi.setElementDirByTextDirectionality = function (a, b) {
    	    switch (goog.i18n.bidi.estimateDirection(b)) {
    	        case goog.i18n.bidi.Dir.LTR:
    	            a.dir = "ltr";
    	            break;
    	        case goog.i18n.bidi.Dir.RTL:
    	            a.dir = "rtl";
    	            break;
    	        default:
    	            a.removeAttribute("dir");
    	    }
    	};
    	goog.i18n.bidi.DirectionalString = function () {
    	};
    	goog.html.TrustedResourceUrl = function (a, b) {
    	    this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = a === goog.html.TrustedResourceUrl.CONSTRUCTOR_TOKEN_PRIVATE_ && b || "";
    	    this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
    	};
    	goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString = !0;
    	goog.html.TrustedResourceUrl.prototype.getTypedStringValue = function () {
    	    return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_.toString()
    	};
    	goog.html.TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
    	goog.html.TrustedResourceUrl.prototype.getDirection = function () {
    	    return goog.i18n.bidi.Dir.LTR
    	};
    	goog.html.TrustedResourceUrl.prototype.cloneWithParams = function (a, b) {
    	    var c = goog.html.TrustedResourceUrl.unwrap(this);
    	    c = goog.html.TrustedResourceUrl.URL_PARAM_PARSER_.exec(c);
    	    var d = c[3] || "";
    	    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(c[1] + goog.html.TrustedResourceUrl.stringifyParams_("?", c[2] || "", a) + goog.html.TrustedResourceUrl.stringifyParams_("#", d, b))
    	};
    	goog.DEBUG && (goog.html.TrustedResourceUrl.prototype.toString = function () {
    	    return "TrustedResourceUrl{" + this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ + "}"
    	});
    	goog.html.TrustedResourceUrl.unwrap = function (a) {
    	    return goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(a).toString()
    	};
    	goog.html.TrustedResourceUrl.unwrapTrustedScriptURL = function (a) {
    	    if (a instanceof goog.html.TrustedResourceUrl && a.constructor === goog.html.TrustedResourceUrl && a.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;
    	    goog.asserts.fail("expected object of type TrustedResourceUrl, got '" + a + "' of type " + goog.typeOf(a));
    	    return "type_error:TrustedResourceUrl"
    	};
    	goog.html.TrustedResourceUrl.format = function (a, b) {
    	    var c = goog.string.Const.unwrap(a);
    	    if (!goog.html.TrustedResourceUrl.BASE_URL_.test(c)) throw Error("Invalid TrustedResourceUrl format: " + c);
    	    a = c.replace(goog.html.TrustedResourceUrl.FORMAT_MARKER_, function (a, e) {
    	        if (!Object.prototype.hasOwnProperty.call(b, e)) throw Error('Found marker, "' + e + '", in format string, "' + c + '", but no valid label mapping found in args: ' + JSON.stringify(b));
    	        a = b[e];
    	        return a instanceof goog.string.Const ? goog.string.Const.unwrap(a) :
    	            encodeURIComponent(String(a))
    	    });
    	    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(a)
    	};
    	goog.html.TrustedResourceUrl.FORMAT_MARKER_ = /%{(\w+)}/g;
    	goog.html.TrustedResourceUrl.BASE_URL_ = /^((https:)?\/\/[0-9a-z.:[\]-]+\/|\/[^/\\]|[^:/\\%]+\/|[^:/\\%]*[?#]|about:blank#)/i;
    	goog.html.TrustedResourceUrl.URL_PARAM_PARSER_ = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/;
    	goog.html.TrustedResourceUrl.formatWithParams = function (a, b, c, d) {
    	    return goog.html.TrustedResourceUrl.format(a, b).cloneWithParams(c, d)
    	};
    	goog.html.TrustedResourceUrl.fromConstant = function (a) {
    	    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a))
    	};
    	goog.html.TrustedResourceUrl.fromConstants = function (a) {
    	    for (var b = "", c = 0; c < a.length; c++) b += goog.string.Const.unwrap(a[c]);
    	    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b)
    	};
    	goog.html.TrustedResourceUrl.fromSafeScript = function (a) {
    	    a = goog.fs.blob.getBlobWithProperties([goog.html.SafeScript.unwrap(a)], "text/javascript");
    	    a = goog.fs.url.createObjectUrl(a);
    	    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(a)
    	};
    	goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
    	goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse = function (a) {
    	    a = goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY ? goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createScriptURL(a) : a;
    	    return new goog.html.TrustedResourceUrl(goog.html.TrustedResourceUrl.CONSTRUCTOR_TOKEN_PRIVATE_, a)
    	};
    	goog.html.TrustedResourceUrl.stringifyParams_ = function (a, b, c) {
    	    if (null == c) return b;
    	    if ("string" === typeof c) return c ? a + encodeURIComponent(c) : "";
    	    for (var d in c) {
    	        var e = c[d];
    	        e = Array.isArray(e) ? e : [e];
    	        for (var f = 0; f < e.length; f++) {
    	            var g = e[f];
    	            null != g && (b || (b = a), b += (b.length > a.length ? "&" : "") + encodeURIComponent(d) + "=" + encodeURIComponent(String(g)));
    	        }
    	    }
    	    return b
    	};
    	goog.html.TrustedResourceUrl.CONSTRUCTOR_TOKEN_PRIVATE_ = {};
    	goog.string.internal = {};
    	goog.string.internal.startsWith = function (a, b) {
    	    return 0 == a.lastIndexOf(b, 0)
    	};
    	goog.string.internal.endsWith = function (a, b) {
    	    var c = a.length - b.length;
    	    return 0 <= c && a.indexOf(b, c) == c
    	};
    	goog.string.internal.caseInsensitiveStartsWith = function (a, b) {
    	    return 0 == goog.string.internal.caseInsensitiveCompare(b, a.substr(0, b.length))
    	};
    	goog.string.internal.caseInsensitiveEndsWith = function (a, b) {
    	    return 0 == goog.string.internal.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length))
    	};
    	goog.string.internal.caseInsensitiveEquals = function (a, b) {
    	    return a.toLowerCase() == b.toLowerCase()
    	};
    	goog.string.internal.isEmptyOrWhitespace = function (a) {
    	    return /^[\s\xa0]*$/.test(a)
    	};
    	goog.string.internal.trim = goog.TRUSTED_SITE && String.prototype.trim ? function (a) {
    	    return a.trim()
    	} : function (a) {
    	    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
    	};
    	goog.string.internal.caseInsensitiveCompare = function (a, b) {
    	    a = String(a).toLowerCase();
    	    b = String(b).toLowerCase();
    	    return a < b ? -1 : a == b ? 0 : 1
    	};
    	goog.string.internal.newLineToBr = function (a, b) {
    	    return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
    	};
    	goog.string.internal.htmlEscape = function (a, b) {
    	    if (b) a = a.replace(goog.string.internal.AMP_RE_, "&amp;").replace(goog.string.internal.LT_RE_, "&lt;").replace(goog.string.internal.GT_RE_, "&gt;").replace(goog.string.internal.QUOT_RE_, "&quot;").replace(goog.string.internal.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.internal.NULL_RE_, "&#0;"); else {
    	        if (!goog.string.internal.ALL_RE_.test(a)) return a;
    	        -1 != a.indexOf("&") && (a = a.replace(goog.string.internal.AMP_RE_, "&amp;"));
    	        -1 != a.indexOf("<") && (a = a.replace(goog.string.internal.LT_RE_,
    	            "&lt;"));
    	        -1 != a.indexOf(">") && (a = a.replace(goog.string.internal.GT_RE_, "&gt;"));
    	        -1 != a.indexOf('"') && (a = a.replace(goog.string.internal.QUOT_RE_, "&quot;"));
    	        -1 != a.indexOf("'") && (a = a.replace(goog.string.internal.SINGLE_QUOTE_RE_, "&#39;"));
    	        -1 != a.indexOf("\x00") && (a = a.replace(goog.string.internal.NULL_RE_, "&#0;"));
    	    }
    	    return a
    	};
    	goog.string.internal.AMP_RE_ = /&/g;
    	goog.string.internal.LT_RE_ = /</g;
    	goog.string.internal.GT_RE_ = />/g;
    	goog.string.internal.QUOT_RE_ = /"/g;
    	goog.string.internal.SINGLE_QUOTE_RE_ = /'/g;
    	goog.string.internal.NULL_RE_ = /\x00/g;
    	goog.string.internal.ALL_RE_ = /[\x00&<>"']/;
    	goog.string.internal.whitespaceEscape = function (a, b) {
    	    return goog.string.internal.newLineToBr(a.replace(/  /g, " &#160;"), b)
    	};
    	goog.string.internal.contains = function (a, b) {
    	    return -1 != a.indexOf(b)
    	};
    	goog.string.internal.caseInsensitiveContains = function (a, b) {
    	    return goog.string.internal.contains(a.toLowerCase(), b.toLowerCase())
    	};
    	goog.string.internal.compareVersions = function (a, b) {
    	    var c = 0;
    	    a = goog.string.internal.trim(String(a)).split(".");
    	    b = goog.string.internal.trim(String(b)).split(".");
    	    for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
    	        var f = a[e] || "", g = b[e] || "";
    	        do {
    	            f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
    	            g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
    	            if (0 == f[0].length && 0 == g[0].length) break;
    	            c = 0 == f[1].length ? 0 : parseInt(f[1], 10);
    	            var h = 0 == g[1].length ? 0 : parseInt(g[1], 10);
    	            c = goog.string.internal.compareElements_(c, h) || goog.string.internal.compareElements_(0 ==
    	                f[2].length, 0 == g[2].length) || goog.string.internal.compareElements_(f[2], g[2]);
    	            f = f[3];
    	            g = g[3];
    	        } while (0 == c)
    	    }
    	    return c
    	};
    	goog.string.internal.compareElements_ = function (a, b) {
    	    return a < b ? -1 : a > b ? 1 : 0
    	};
    	goog.html.SafeUrl = function (a, b) {
    	    this.privateDoNotAccessOrElseSafeUrlWrappedValue_ = a === goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_ && b || "";
    	    this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
    	};
    	goog.html.SafeUrl.INNOCUOUS_STRING = "about:invalid#zClosurez";
    	goog.html.SafeUrl.prototype.implementsGoogStringTypedString = !0;
    	goog.html.SafeUrl.prototype.getTypedStringValue = function () {
    	    return this.privateDoNotAccessOrElseSafeUrlWrappedValue_.toString()
    	};
    	goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
    	goog.html.SafeUrl.prototype.getDirection = function () {
    	    return goog.i18n.bidi.Dir.LTR
    	};
    	goog.DEBUG && (goog.html.SafeUrl.prototype.toString = function () {
    	    return "SafeUrl{" + this.privateDoNotAccessOrElseSafeUrlWrappedValue_ + "}"
    	});
    	goog.html.SafeUrl.unwrap = function (a) {
    	    if (a instanceof goog.html.SafeUrl && a.constructor === goog.html.SafeUrl && a.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeUrlWrappedValue_;
    	    goog.asserts.fail("expected object of type SafeUrl, got '" + a + "' of type " + goog.typeOf(a));
    	    return "type_error:SafeUrl"
    	};
    	goog.html.SafeUrl.fromConstant = function (a) {
    	    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a))
    	};
    	goog.html.SAFE_MIME_TYPE_PATTERN_ = /^(?:audio\/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)|image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|text\/csv|video\/(?:mpeg|mp4|ogg|webm|quicktime|x-matroska))(?:;\w+=(?:\w+|"[\w;,= ]+"))*$/i;
    	goog.html.SafeUrl.isSafeMimeType = function (a) {
    	    return goog.html.SAFE_MIME_TYPE_PATTERN_.test(a)
    	};
    	goog.html.SafeUrl.fromBlob = function (a) {
    	    a = goog.html.SafeUrl.isSafeMimeType(a.type) ? goog.fs.url.createObjectUrl(a) : goog.html.SafeUrl.INNOCUOUS_STRING;
    	    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
    	};
    	goog.html.SafeUrl.fromMediaSource = function (a) {
    	    goog.asserts.assert("MediaSource" in goog.global, "No support for MediaSource");
    	    a = a instanceof MediaSource ? goog.fs.url.createObjectUrl(a) : goog.html.SafeUrl.INNOCUOUS_STRING;
    	    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
    	};
    	goog.html.DATA_URL_PATTERN_ = /^data:(.*);base64,[a-z0-9+\/]+=*$/i;
    	goog.html.SafeUrl.fromDataUrl = function (a) {
    	    a = a.replace(/(%0A|%0D)/g, "");
    	    var b = a.match(goog.html.DATA_URL_PATTERN_);
    	    b = b && goog.html.SafeUrl.isSafeMimeType(b[1]);
    	    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b ? a : goog.html.SafeUrl.INNOCUOUS_STRING)
    	};
    	goog.html.SafeUrl.fromTelUrl = function (a) {
    	    goog.string.internal.caseInsensitiveStartsWith(a, "tel:") || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    	    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
    	};
    	goog.html.SIP_URL_PATTERN_ = /^sip[s]?:[+a-z0-9_.!$%&'*\/=^`{|}~-]+@([a-z0-9-]+\.)+[a-z0-9]{2,63}$/i;
    	goog.html.SafeUrl.fromSipUrl = function (a) {
    	    goog.html.SIP_URL_PATTERN_.test(decodeURIComponent(a)) || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    	    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
    	};
    	goog.html.SafeUrl.fromFacebookMessengerUrl = function (a) {
    	    goog.string.internal.caseInsensitiveStartsWith(a, "fb-messenger://share") || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    	    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
    	};
    	goog.html.SafeUrl.fromWhatsAppUrl = function (a) {
    	    goog.string.internal.caseInsensitiveStartsWith(a, "whatsapp://send") || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    	    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
    	};
    	goog.html.SafeUrl.fromSmsUrl = function (a) {
    	    goog.string.internal.caseInsensitiveStartsWith(a, "sms:") && goog.html.SafeUrl.isSmsUrlBodyValid_(a) || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    	    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
    	};
    	goog.html.SafeUrl.isSmsUrlBodyValid_ = function (a) {
    	    var b = a.indexOf("#");
    	    0 < b && (a = a.substring(0, b));
    	    b = a.match(/[?&]body=/gi);
    	    if (!b) return !0;
    	    if (1 < b.length) return !1;
    	    a = a.match(/[?&]body=([^&]*)/)[1];
    	    if (!a) return !0;
    	    try {
    	        decodeURIComponent(a);
    	    } catch (c) {
    	        return !1
    	    }
    	    return /^(?:[a-z0-9\-_.~]|%[0-9a-f]{2})+$/i.test(a)
    	};
    	goog.html.SafeUrl.fromSshUrl = function (a) {
    	    goog.string.internal.caseInsensitiveStartsWith(a, "ssh://") || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    	    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
    	};
    	goog.html.SafeUrl.sanitizeChromeExtensionUrl = function (a, b) {
    	    return goog.html.SafeUrl.sanitizeExtensionUrl_(/^chrome-extension:\/\/([^\/]+)\//, a, b)
    	};
    	goog.html.SafeUrl.sanitizeFirefoxExtensionUrl = function (a, b) {
    	    return goog.html.SafeUrl.sanitizeExtensionUrl_(/^moz-extension:\/\/([^\/]+)\//, a, b)
    	};
    	goog.html.SafeUrl.sanitizeEdgeExtensionUrl = function (a, b) {
    	    return goog.html.SafeUrl.sanitizeExtensionUrl_(/^ms-browser-extension:\/\/([^\/]+)\//, a, b)
    	};
    	goog.html.SafeUrl.sanitizeExtensionUrl_ = function (a, b, c) {
    	    (a = a.exec(b)) ? (a = a[1], -1 == (c instanceof goog.string.Const ? [goog.string.Const.unwrap(c)] : c.map(function (a) {
    	        return goog.string.Const.unwrap(a)
    	    })).indexOf(a) && (b = goog.html.SafeUrl.INNOCUOUS_STRING)) : b = goog.html.SafeUrl.INNOCUOUS_STRING;
    	    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b)
    	};
    	goog.html.SafeUrl.fromTrustedResourceUrl = function (a) {
    	    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.html.TrustedResourceUrl.unwrap(a))
    	};
    	goog.html.SAFE_URL_PATTERN_ = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
    	goog.html.SafeUrl.SAFE_URL_PATTERN = goog.html.SAFE_URL_PATTERN_;
    	goog.html.SafeUrl.sanitize = function (a) {
    	    if (a instanceof goog.html.SafeUrl) return a;
    	    a = "object" == typeof a && a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
    	    goog.html.SAFE_URL_PATTERN_.test(a) || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    	    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
    	};
    	goog.html.SafeUrl.sanitizeAssertUnchanged = function (a, b) {
    	    if (a instanceof goog.html.SafeUrl) return a;
    	    a = "object" == typeof a && a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
    	    if (b && /^data:/i.test(a) && (b = goog.html.SafeUrl.fromDataUrl(a), b.getTypedStringValue() == a)) return b;
    	    goog.asserts.assert(goog.html.SAFE_URL_PATTERN_.test(a), "%s does not match the safe URL pattern", a) || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    	    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
    	};
    	goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
    	goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse = function (a) {
    	    return new goog.html.SafeUrl(goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_, a)
    	};
    	goog.html.SafeUrl.ABOUT_BLANK = goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse("about:blank");
    	goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_ = {};
    	goog.html.SafeStyle = function () {
    	    this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = "";
    	    this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
    	};
    	goog.html.SafeStyle.prototype.implementsGoogStringTypedString = !0;
    	goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
    	goog.html.SafeStyle.fromConstant = function (a) {
    	    a = goog.string.Const.unwrap(a);
    	    if (0 === a.length) return goog.html.SafeStyle.EMPTY;
    	    goog.asserts.assert(goog.string.internal.endsWith(a, ";"), "Last character of style string is not ';': " + a);
    	    goog.asserts.assert(goog.string.internal.contains(a, ":"), "Style string must contain at least one ':', to specify a \"name: value\" pair: " + a);
    	    return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(a)
    	};
    	goog.html.SafeStyle.prototype.getTypedStringValue = function () {
    	    return this.privateDoNotAccessOrElseSafeStyleWrappedValue_
    	};
    	goog.DEBUG && (goog.html.SafeStyle.prototype.toString = function () {
    	    return "SafeStyle{" + this.privateDoNotAccessOrElseSafeStyleWrappedValue_ + "}"
    	});
    	goog.html.SafeStyle.unwrap = function (a) {
    	    if (a instanceof goog.html.SafeStyle && a.constructor === goog.html.SafeStyle && a.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeStyleWrappedValue_;
    	    goog.asserts.fail("expected object of type SafeStyle, got '" + a + "' of type " + goog.typeOf(a));
    	    return "type_error:SafeStyle"
    	};
    	goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse = function (a) {
    	    return (new goog.html.SafeStyle).initSecurityPrivateDoNotAccessOrElse_(a)
    	};
    	goog.html.SafeStyle.prototype.initSecurityPrivateDoNotAccessOrElse_ = function (a) {
    	    this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = a;
    	    return this
    	};
    	goog.html.SafeStyle.EMPTY = goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse("");
    	goog.html.SafeStyle.INNOCUOUS_STRING = "zClosurez";
    	goog.html.SafeStyle.create = function (a) {
    	    var b = "", c;
    	    for (c in a) {
    	        if (!/^[-_a-zA-Z0-9]+$/.test(c)) throw Error("Name allows only [-_a-zA-Z0-9], got: " + c);
    	        var d = a[c];
    	        null != d && (d = Array.isArray(d) ? goog.array.map(d, goog.html.SafeStyle.sanitizePropertyValue_).join(" ") : goog.html.SafeStyle.sanitizePropertyValue_(d), b += c + ":" + d + ";");
    	    }
    	    return b ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b) : goog.html.SafeStyle.EMPTY
    	};
    	goog.html.SafeStyle.sanitizePropertyValue_ = function (a) {
    	    if (a instanceof goog.html.SafeUrl) return 'url("' + goog.html.SafeUrl.unwrap(a).replace(/</g, "%3c").replace(/[\\"]/g, "\\$&") + '")';
    	    a = a instanceof goog.string.Const ? goog.string.Const.unwrap(a) : goog.html.SafeStyle.sanitizePropertyValueString_(String(a));
    	    if (/[{;}]/.test(a)) throw new goog.asserts.AssertionError("Value does not allow [{;}], got: %s.", [a]);
    	    return a
    	};
    	goog.html.SafeStyle.sanitizePropertyValueString_ = function (a) {
    	    var b = a.replace(goog.html.SafeStyle.FUNCTIONS_RE_, "$1").replace(goog.html.SafeStyle.FUNCTIONS_RE_, "$1").replace(goog.html.SafeStyle.URL_RE_, "url");
    	    if (goog.html.SafeStyle.VALUE_RE_.test(b)) {
    	        if (goog.html.SafeStyle.COMMENT_RE_.test(a)) return goog.asserts.fail("String value disallows comments, got: " + a), goog.html.SafeStyle.INNOCUOUS_STRING;
    	        if (!goog.html.SafeStyle.hasBalancedQuotes_(a)) return goog.asserts.fail("String value requires balanced quotes, got: " +
    	            a), goog.html.SafeStyle.INNOCUOUS_STRING;
    	        if (!goog.html.SafeStyle.hasBalancedSquareBrackets_(a)) return goog.asserts.fail("String value requires balanced square brackets and one identifier per pair of brackets, got: " + a), goog.html.SafeStyle.INNOCUOUS_STRING
    	    } else return goog.asserts.fail("String value allows only " + goog.html.SafeStyle.VALUE_ALLOWED_CHARS_ + " and simple functions, got: " + a), goog.html.SafeStyle.INNOCUOUS_STRING;
    	    return goog.html.SafeStyle.sanitizeUrl_(a)
    	};
    	goog.html.SafeStyle.hasBalancedQuotes_ = function (a) {
    	    for (var b = !0, c = !0, d = 0; d < a.length; d++) {
    	        var e = a.charAt(d);
    	        "'" == e && c ? b = !b : '"' == e && b && (c = !c);
    	    }
    	    return b && c
    	};
    	goog.html.SafeStyle.hasBalancedSquareBrackets_ = function (a) {
    	    for (var b = !0, c = /^[-_a-zA-Z0-9]$/, d = 0; d < a.length; d++) {
    	        var e = a.charAt(d);
    	        if ("]" == e) {
    	            if (b) return !1;
    	            b = !0;
    	        } else if ("[" == e) {
    	            if (!b) return !1;
    	            b = !1;
    	        } else if (!b && !c.test(e)) return !1
    	    }
    	    return b
    	};
    	goog.html.SafeStyle.VALUE_ALLOWED_CHARS_ = "[-,.\"'%_!# a-zA-Z0-9\\[\\]]";
    	goog.html.SafeStyle.VALUE_RE_ = new RegExp("^" + goog.html.SafeStyle.VALUE_ALLOWED_CHARS_ + "+$");
    	goog.html.SafeStyle.URL_RE_ = /\b(url\([ \t\n]*)('[ -&(-\[\]-~]*'|"[ !#-\[\]-~]*"|[!#-&*-\[\]-~]*)([ \t\n]*\))/g;
    	goog.html.SafeStyle.ALLOWED_FUNCTIONS_ = "calc cubic-bezier fit-content hsl hsla linear-gradient matrix minmax repeat rgb rgba (rotate|scale|translate)(X|Y|Z|3d)?".split(" ");
    	goog.html.SafeStyle.FUNCTIONS_RE_ = new RegExp("\\b(" + goog.html.SafeStyle.ALLOWED_FUNCTIONS_.join("|") + ")\\([-+*/0-9a-z.%\\[\\], ]+\\)", "g");
    	goog.html.SafeStyle.COMMENT_RE_ = /\/\*/;
    	goog.html.SafeStyle.sanitizeUrl_ = function (a) {
    	    return a.replace(goog.html.SafeStyle.URL_RE_, function (a, c, d, e) {
    	        var b = "";
    	        d = d.replace(/^(['"])(.*)\1$/, function (a, c, d) {
    	            b = c;
    	            return d
    	        });
    	        a = goog.html.SafeUrl.sanitize(d).getTypedStringValue();
    	        return c + b + a + b + e
    	    })
    	};
    	goog.html.SafeStyle.concat = function (a) {
    	    var b = "", c = function (a) {
    	        Array.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyle.unwrap(a);
    	    };
    	    goog.array.forEach(arguments, c);
    	    return b ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b) : goog.html.SafeStyle.EMPTY
    	};
    	goog.html.SafeStyleSheet = function () {
    	    this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = "";
    	    this.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
    	};
    	goog.html.SafeStyleSheet.prototype.implementsGoogStringTypedString = !0;
    	goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
    	goog.html.SafeStyleSheet.createRule = function (a, b) {
    	    if (goog.string.internal.contains(a, "<")) throw Error("Selector does not allow '<', got: " + a);
    	    var c = a.replace(/('|")((?!\1)[^\r\n\f\\]|\\[\s\S])*\1/g, "");
    	    if (!/^[-_a-zA-Z0-9#.:* ,>+~[\]()=^$|]+$/.test(c)) throw Error("Selector allows only [-_a-zA-Z0-9#.:* ,>+~[\\]()=^$|] and strings, got: " + a);
    	    if (!goog.html.SafeStyleSheet.hasBalancedBrackets_(c)) throw Error("() and [] in selector must be balanced, got: " + a);
    	    b instanceof goog.html.SafeStyle || (b = goog.html.SafeStyle.create(b));
    	    a = a + "{" + goog.html.SafeStyle.unwrap(b).replace(/</g, "\\3C ") + "}";
    	    return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a)
    	};
    	goog.html.SafeStyleSheet.hasBalancedBrackets_ = function (a) {
    	    for (var b = {"(": ")", "[": "]"}, c = [], d = 0; d < a.length; d++) {
    	        var e = a[d];
    	        if (b[e]) c.push(b[e]); else if (goog.object.contains(b, e) && c.pop() != e) return !1
    	    }
    	    return 0 == c.length
    	};
    	goog.html.SafeStyleSheet.concat = function (a) {
    	    var b = "", c = function (a) {
    	        Array.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyleSheet.unwrap(a);
    	    };
    	    goog.array.forEach(arguments, c);
    	    return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b)
    	};
    	goog.html.SafeStyleSheet.fromConstant = function (a) {
    	    a = goog.string.Const.unwrap(a);
    	    if (0 === a.length) return goog.html.SafeStyleSheet.EMPTY;
    	    goog.asserts.assert(!goog.string.internal.contains(a, "<"), "Forbidden '<' character in style sheet string: " + a);
    	    return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a)
    	};
    	goog.html.SafeStyleSheet.prototype.getTypedStringValue = function () {
    	    return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_
    	};
    	goog.DEBUG && (goog.html.SafeStyleSheet.prototype.toString = function () {
    	    return "SafeStyleSheet{" + this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ + "}"
    	});
    	goog.html.SafeStyleSheet.unwrap = function (a) {
    	    if (a instanceof goog.html.SafeStyleSheet && a.constructor === goog.html.SafeStyleSheet && a.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
    	    goog.asserts.fail("expected object of type SafeStyleSheet, got '" + a + "' of type " + goog.typeOf(a));
    	    return "type_error:SafeStyleSheet"
    	};
    	goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse = function (a) {
    	    return (new goog.html.SafeStyleSheet).initSecurityPrivateDoNotAccessOrElse_(a)
    	};
    	goog.html.SafeStyleSheet.prototype.initSecurityPrivateDoNotAccessOrElse_ = function (a) {
    	    this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = a;
    	    return this
    	};
    	goog.html.SafeStyleSheet.EMPTY = goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse("");
    	goog.labs = {};
    	goog.labs.userAgent = {};
    	goog.labs.userAgent.util = {};
    	goog.labs.userAgent.util.getNativeUserAgentString_ = function () {
    	    var a = goog.labs.userAgent.util.getNavigator_();
    	    return a && (a = a.userAgent) ? a : ""
    	};
    	goog.labs.userAgent.util.getNavigator_ = function () {
    	    return goog.global.navigator
    	};
    	goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
    	goog.labs.userAgent.util.setUserAgent = function (a) {
    	    goog.labs.userAgent.util.userAgent_ = a || goog.labs.userAgent.util.getNativeUserAgentString_();
    	};
    	goog.labs.userAgent.util.getUserAgent = function () {
    	    return goog.labs.userAgent.util.userAgent_
    	};
    	goog.labs.userAgent.util.matchUserAgent = function (a) {
    	    var b = goog.labs.userAgent.util.getUserAgent();
    	    return goog.string.internal.contains(b, a)
    	};
    	goog.labs.userAgent.util.matchUserAgentIgnoreCase = function (a) {
    	    var b = goog.labs.userAgent.util.getUserAgent();
    	    return goog.string.internal.caseInsensitiveContains(b, a)
    	};
    	goog.labs.userAgent.util.extractVersionTuples = function (a) {
    	    for (var b = /(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g, c = [], d; d = b.exec(a);) c.push([d[1], d[2], d[3] || void 0]);
    	    return c
    	};
    	goog.labs.userAgent.browser = {};
    	goog.labs.userAgent.browser.matchOpera_ = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("Opera")
    	};
    	goog.labs.userAgent.browser.matchIE_ = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
    	};
    	goog.labs.userAgent.browser.matchEdgeHtml_ = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("Edge")
    	};
    	goog.labs.userAgent.browser.matchEdgeChromium_ = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("Edg/")
    	};
    	goog.labs.userAgent.browser.matchOperaChromium_ = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("OPR")
    	};
    	goog.labs.userAgent.browser.matchFirefox_ = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("Firefox") || goog.labs.userAgent.util.matchUserAgent("FxiOS")
    	};
    	goog.labs.userAgent.browser.matchSafari_ = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchEdgeHtml_() || goog.labs.userAgent.browser.matchEdgeChromium_() || goog.labs.userAgent.browser.matchOperaChromium_() || goog.labs.userAgent.browser.matchFirefox_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"))
    	};
    	goog.labs.userAgent.browser.matchCoast_ = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("Coast")
    	};
    	goog.labs.userAgent.browser.matchIosWebview_ = function () {
    	    return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && !goog.labs.userAgent.browser.matchFirefox_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit")
    	};
    	goog.labs.userAgent.browser.matchChrome_ = function () {
    	    return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchEdgeHtml_()
    	};
    	goog.labs.userAgent.browser.matchAndroidBrowser_ = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk())
    	};
    	goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
    	goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
    	goog.labs.userAgent.browser.isEdge = goog.labs.userAgent.browser.matchEdgeHtml_;
    	goog.labs.userAgent.browser.isEdgeChromium = goog.labs.userAgent.browser.matchEdgeChromium_;
    	goog.labs.userAgent.browser.isOperaChromium = goog.labs.userAgent.browser.matchOperaChromium_;
    	goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
    	goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
    	goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_;
    	goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_;
    	goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
    	goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
    	goog.labs.userAgent.browser.isSilk = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("Silk")
    	};
    	goog.labs.userAgent.browser.getVersion = function () {
    	    function a(a) {
    	        a = goog.array.find(a, d);
    	        return c[a] || ""
    	    }

    	    var b = goog.labs.userAgent.util.getUserAgent();
    	    if (goog.labs.userAgent.browser.isIE()) return goog.labs.userAgent.browser.getIEVersion_(b);
    	    b = goog.labs.userAgent.util.extractVersionTuples(b);
    	    var c = {};
    	    goog.array.forEach(b, function (a) {
    	        c[a[0]] = a[1];
    	    });
    	    var d = goog.partial(goog.object.containsKey, c);
    	    return goog.labs.userAgent.browser.isOpera() ? a(["Version", "Opera"]) : goog.labs.userAgent.browser.isEdge() ? a(["Edge"]) :
    	        goog.labs.userAgent.browser.isEdgeChromium() ? a(["Edg"]) : goog.labs.userAgent.browser.isChrome() ? a(["Chrome", "CriOS", "HeadlessChrome"]) : (b = b[2]) && b[1] || ""
    	};
    	goog.labs.userAgent.browser.isVersionOrHigher = function (a) {
    	    return 0 <= goog.string.internal.compareVersions(goog.labs.userAgent.browser.getVersion(), a)
    	};
    	goog.labs.userAgent.browser.getIEVersion_ = function (a) {
    	    var b = /rv: *([\d\.]*)/.exec(a);
    	    if (b && b[1]) return b[1];
    	    b = "";
    	    var c = /MSIE +([\d\.]+)/.exec(a);
    	    if (c && c[1]) if (a = /Trident\/(\d.\d)/.exec(a), "7.0" == c[1]) if (a && a[1]) switch (a[1]) {
    	        case "4.0":
    	            b = "8.0";
    	            break;
    	        case "5.0":
    	            b = "9.0";
    	            break;
    	        case "6.0":
    	            b = "10.0";
    	            break;
    	        case "7.0":
    	            b = "11.0";
    	    } else b = "7.0"; else b = c[1];
    	    return b
    	};
    	goog.html.SafeHtml = function () {
    	    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
    	    this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
    	    this.dir_ = null;
    	};
    	goog.html.SafeHtml.ENABLE_ERROR_MESSAGES = goog.DEBUG;
    	goog.html.SafeHtml.SUPPORT_STYLE_ATTRIBUTE = !0;
    	goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString = !0;
    	goog.html.SafeHtml.prototype.getDirection = function () {
    	    return this.dir_
    	};
    	goog.html.SafeHtml.prototype.implementsGoogStringTypedString = !0;
    	goog.html.SafeHtml.prototype.getTypedStringValue = function () {
    	    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_.toString()
    	};
    	goog.DEBUG && (goog.html.SafeHtml.prototype.toString = function () {
    	    return "SafeHtml{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
    	});
    	goog.html.SafeHtml.unwrap = function (a) {
    	    return goog.html.SafeHtml.unwrapTrustedHTML(a).toString()
    	};
    	goog.html.SafeHtml.unwrapTrustedHTML = function (a) {
    	    if (a instanceof goog.html.SafeHtml && a.constructor === goog.html.SafeHtml && a.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
    	    goog.asserts.fail("expected object of type SafeHtml, got '" + a + "' of type " + goog.typeOf(a));
    	    return "type_error:SafeHtml"
    	};
    	goog.html.SafeHtml.htmlEscape = function (a) {
    	    if (a instanceof goog.html.SafeHtml) return a;
    	    var b = "object" == typeof a, c = null;
    	    b && a.implementsGoogI18nBidiDirectionalString && (c = a.getDirection());
    	    a = b && a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
    	    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.internal.htmlEscape(a), c)
    	};
    	goog.html.SafeHtml.htmlEscapePreservingNewlines = function (a) {
    	    if (a instanceof goog.html.SafeHtml) return a;
    	    a = goog.html.SafeHtml.htmlEscape(a);
    	    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.internal.newLineToBr(goog.html.SafeHtml.unwrap(a)), a.getDirection())
    	};
    	goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces = function (a) {
    	    if (a instanceof goog.html.SafeHtml) return a;
    	    a = goog.html.SafeHtml.htmlEscape(a);
    	    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.internal.whitespaceEscape(goog.html.SafeHtml.unwrap(a)), a.getDirection())
    	};
    	goog.html.SafeHtml.from = goog.html.SafeHtml.htmlEscape;
    	goog.html.SafeHtml.comment = function (a) {
    	    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("\x3c!--" + goog.string.internal.htmlEscape(a) + "--\x3e", null)
    	};
    	goog.html.SafeHtml.VALID_NAMES_IN_TAG_ = /^[a-zA-Z0-9-]+$/;
    	goog.html.SafeHtml.URL_ATTRIBUTES_ = {
    	    action: !0,
    	    cite: !0,
    	    data: !0,
    	    formaction: !0,
    	    href: !0,
    	    manifest: !0,
    	    poster: !0,
    	    src: !0
    	};
    	goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_ = {
    	    APPLET: !0,
    	    BASE: !0,
    	    EMBED: !0,
    	    IFRAME: !0,
    	    LINK: !0,
    	    MATH: !0,
    	    META: !0,
    	    OBJECT: !0,
    	    SCRIPT: !0,
    	    STYLE: !0,
    	    SVG: !0,
    	    TEMPLATE: !0
    	};
    	goog.html.SafeHtml.create = function (a, b, c) {
    	    goog.html.SafeHtml.verifyTagName(String(a));
    	    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(String(a), b, c)
    	};
    	goog.html.SafeHtml.verifyTagName = function (a) {
    	    if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(a)) throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? "Invalid tag name <" + a + ">." : "");
    	    if (a.toUpperCase() in goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_) throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? "Tag name <" + a + "> is not allowed for SafeHtml." : "");
    	};
    	goog.html.SafeHtml.createIframe = function (a, b, c, d) {
    	    a && goog.html.TrustedResourceUrl.unwrap(a);
    	    var e = {};
    	    e.src = a || null;
    	    e.srcdoc = b && goog.html.SafeHtml.unwrap(b);
    	    a = goog.html.SafeHtml.combineAttributes(e, {sandbox: ""}, c);
    	    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a, d)
    	};
    	goog.html.SafeHtml.createSandboxIframe = function (a, b, c, d) {
    	    if (!goog.html.SafeHtml.canUseSandboxIframe()) throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? "The browser does not support sandboxed iframes." : "");
    	    var e = {};
    	    e.src = a ? goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a)) : null;
    	    e.srcdoc = b || null;
    	    e.sandbox = "";
    	    a = goog.html.SafeHtml.combineAttributes(e, {}, c);
    	    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a, d)
    	};
    	goog.html.SafeHtml.canUseSandboxIframe = function () {
    	    return goog.global.HTMLIFrameElement && "sandbox" in goog.global.HTMLIFrameElement.prototype
    	};
    	goog.html.SafeHtml.createScriptSrc = function (a, b) {
    	    goog.html.TrustedResourceUrl.unwrap(a);
    	    a = goog.html.SafeHtml.combineAttributes({src: a}, {}, b);
    	    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", a)
    	};
    	goog.html.SafeHtml.createScript = function (a, b) {
    	    for (var c in b) {
    	        var d = c.toLowerCase();
    	        if ("language" == d || "src" == d || "text" == d || "type" == d) throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Cannot set "' + d + '" attribute' : "");
    	    }
    	    c = "";
    	    a = goog.array.concat(a);
    	    for (d = 0; d < a.length; d++) c += goog.html.SafeScript.unwrap(a[d]);
    	    a = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c, goog.i18n.bidi.Dir.NEUTRAL);
    	    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", b, a)
    	};
    	goog.html.SafeHtml.createStyle = function (a, b) {
    	    b = goog.html.SafeHtml.combineAttributes({type: "text/css"}, {}, b);
    	    var c = "";
    	    a = goog.array.concat(a);
    	    for (var d = 0; d < a.length; d++) c += goog.html.SafeStyleSheet.unwrap(a[d]);
    	    a = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c, goog.i18n.bidi.Dir.NEUTRAL);
    	    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("style", b, a)
    	};
    	goog.html.SafeHtml.createMetaRefresh = function (a, b) {
    	    a = goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a));
    	    (goog.labs.userAgent.browser.isIE() || goog.labs.userAgent.browser.isEdge()) && goog.string.internal.contains(a, ";") && (a = "'" + a.replace(/'/g, "%27") + "'");
    	    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("meta", {
    	        "http-equiv": "refresh",
    	        content: (b || 0) + "; url=" + a
    	    })
    	};
    	goog.html.SafeHtml.getAttrNameAndValue_ = function (a, b, c) {
    	    if (c instanceof goog.string.Const) c = goog.string.Const.unwrap(c); else if ("style" == b.toLowerCase()) if (goog.html.SafeHtml.SUPPORT_STYLE_ATTRIBUTE) c = goog.html.SafeHtml.getStyleValue_(c); else throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Attribute "style" not supported.' : ""); else {
    	        if (/^on/i.test(b)) throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Attribute "' + b + '" requires goog.string.Const value, "' + c + '" given.' : "");
    	        if (b.toLowerCase() in
    	            goog.html.SafeHtml.URL_ATTRIBUTES_) if (c instanceof goog.html.TrustedResourceUrl) c = goog.html.TrustedResourceUrl.unwrap(c); else if (c instanceof goog.html.SafeUrl) c = goog.html.SafeUrl.unwrap(c); else if ("string" === typeof c) c = goog.html.SafeUrl.sanitize(c).getTypedStringValue(); else throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Attribute "' + b + '" on tag "' + a + '" requires goog.html.SafeUrl, goog.string.Const, or string, value "' + c + '" given.' : "");
    	    }
    	    c.implementsGoogStringTypedString && (c = c.getTypedStringValue());
    	    goog.asserts.assert("string" === typeof c || "number" === typeof c, "String or number value expected, got " + typeof c + " with value: " + c);
    	    return b + '="' + goog.string.internal.htmlEscape(String(c)) + '"'
    	};
    	goog.html.SafeHtml.getStyleValue_ = function (a) {
    	    if (!goog.isObject(a)) throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof a + " given: " + a : "");
    	    a instanceof goog.html.SafeStyle || (a = goog.html.SafeStyle.create(a));
    	    return goog.html.SafeStyle.unwrap(a)
    	};
    	goog.html.SafeHtml.createWithDir = function (a, b, c, d) {
    	    b = goog.html.SafeHtml.create(b, c, d);
    	    b.dir_ = a;
    	    return b
    	};
    	goog.html.SafeHtml.join = function (a, b) {
    	    a = goog.html.SafeHtml.htmlEscape(a);
    	    var c = a.getDirection(), d = [], e = function (a) {
    	        Array.isArray(a) ? goog.array.forEach(a, e) : (a = goog.html.SafeHtml.htmlEscape(a), d.push(goog.html.SafeHtml.unwrap(a)), a = a.getDirection(), c == goog.i18n.bidi.Dir.NEUTRAL ? c = a : a != goog.i18n.bidi.Dir.NEUTRAL && c != a && (c = null));
    	    };
    	    goog.array.forEach(b, e);
    	    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(d.join(goog.html.SafeHtml.unwrap(a)), c)
    	};
    	goog.html.SafeHtml.concat = function (a) {
    	    return goog.html.SafeHtml.join(goog.html.SafeHtml.EMPTY, Array.prototype.slice.call(arguments))
    	};
    	goog.html.SafeHtml.concatWithDir = function (a, b) {
    	    var c = goog.html.SafeHtml.concat(goog.array.slice(arguments, 1));
    	    c.dir_ = a;
    	    return c
    	};
    	goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
    	goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse = function (a, b) {
    	    return (new goog.html.SafeHtml).initSecurityPrivateDoNotAccessOrElse_(a, b)
    	};
    	goog.html.SafeHtml.prototype.initSecurityPrivateDoNotAccessOrElse_ = function (a, b) {
    	    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY ? goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createHTML(a) : a;
    	    this.dir_ = b;
    	    return this
    	};
    	goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse = function (a, b, c) {
    	    var d = null;
    	    var e = "<" + a + goog.html.SafeHtml.stringifyAttributes(a, b);
    	    null == c ? c = [] : Array.isArray(c) || (c = [c]);
    	    goog.dom.tags.isVoidTag(a.toLowerCase()) ? (goog.asserts.assert(!c.length, "Void tag <" + a + "> does not allow content."), e += ">") : (d = goog.html.SafeHtml.concat(c), e += ">" + goog.html.SafeHtml.unwrap(d) + "</" + a + ">", d = d.getDirection());
    	    (a = b && b.dir) && (d = /^(ltr|rtl|auto)$/i.test(a) ? goog.i18n.bidi.Dir.NEUTRAL : null);
    	    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(e,
    	        d)
    	};
    	goog.html.SafeHtml.stringifyAttributes = function (a, b) {
    	    var c = "";
    	    if (b) for (var d in b) {
    	        if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(d)) throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Invalid attribute name "' + d + '".' : "");
    	        var e = b[d];
    	        null != e && (c += " " + goog.html.SafeHtml.getAttrNameAndValue_(a, d, e));
    	    }
    	    return c
    	};
    	goog.html.SafeHtml.combineAttributes = function (a, b, c) {
    	    var d = {}, e;
    	    for (e in a) goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"), d[e] = a[e];
    	    for (e in b) goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"), d[e] = b[e];
    	    if (c) for (e in c) {
    	        var f = e.toLowerCase();
    	        if (f in a) throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Cannot override "' + f + '" attribute, got "' + e + '" with value "' + c[e] + '"' : "");
    	        f in b && delete d[f];
    	        d[e] = c[e];
    	    }
    	    return d
    	};
    	goog.html.SafeHtml.DOCTYPE_HTML = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<!DOCTYPE html>", goog.i18n.bidi.Dir.NEUTRAL);
    	goog.html.SafeHtml.EMPTY = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("", goog.i18n.bidi.Dir.NEUTRAL);
    	goog.html.SafeHtml.BR = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<br>", goog.i18n.bidi.Dir.NEUTRAL);
    	goog.html.uncheckedconversions = {};
    	goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract = function (a, b, c) {
    	    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    	    goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    	    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(b, c || null)
    	};
    	goog.html.uncheckedconversions.safeScriptFromStringKnownToSatisfyTypeContract = function (a, b) {
    	    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    	    goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    	    return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(b)
    	};
    	goog.html.uncheckedconversions.safeStyleFromStringKnownToSatisfyTypeContract = function (a, b) {
    	    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    	    goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    	    return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b)
    	};
    	goog.html.uncheckedconversions.safeStyleSheetFromStringKnownToSatisfyTypeContract = function (a, b) {
    	    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    	    goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    	    return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b)
    	};
    	goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract = function (a, b) {
    	    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    	    goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    	    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b)
    	};
    	goog.html.uncheckedconversions.trustedResourceUrlFromStringKnownToSatisfyTypeContract = function (a, b) {
    	    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    	    goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    	    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b)
    	};
    	goog.dom.safe = {};
    	goog.dom.safe.InsertAdjacentHtmlPosition = {
    	    AFTERBEGIN: "afterbegin",
    	    AFTEREND: "afterend",
    	    BEFOREBEGIN: "beforebegin",
    	    BEFOREEND: "beforeend"
    	};
    	goog.dom.safe.insertAdjacentHtml = function (a, b, c) {
    	    a.insertAdjacentHTML(b, goog.html.SafeHtml.unwrapTrustedHTML(c));
    	};
    	goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_ = {MATH: !0, SCRIPT: !0, STYLE: !0, SVG: !0, TEMPLATE: !0};
    	goog.dom.safe.isInnerHtmlCleanupRecursive_ = goog.functions.cacheReturnValue(function () {
    	    if (goog.DEBUG && "undefined" === typeof document) return !1;
    	    var a = document.createElement("div"), b = document.createElement("div");
    	    b.appendChild(document.createElement("div"));
    	    a.appendChild(b);
    	    if (goog.DEBUG && !a.firstChild) return !1;
    	    b = a.firstChild.firstChild;
    	    a.innerHTML = goog.html.SafeHtml.unwrapTrustedHTML(goog.html.SafeHtml.EMPTY);
    	    return !b.parentElement
    	});
    	goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse = function (a, b) {
    	    if (goog.dom.safe.isInnerHtmlCleanupRecursive_()) for (; a.lastChild;) a.removeChild(a.lastChild);
    	    a.innerHTML = goog.html.SafeHtml.unwrapTrustedHTML(b);
    	};
    	goog.dom.safe.setInnerHtml = function (a, b) {
    	    if (goog.asserts.ENABLE_ASSERTS) {
    	        var c = a.tagName.toUpperCase();
    	        if (goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_[c]) throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of " + a.tagName + ".");
    	    }
    	    goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse(a, b);
    	};
    	goog.dom.safe.setOuterHtml = function (a, b) {
    	    a.outerHTML = goog.html.SafeHtml.unwrapTrustedHTML(b);
    	};
    	goog.dom.safe.setFormElementAction = function (a, b) {
    	    b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    	    goog.dom.asserts.assertIsHTMLFormElement(a).action = goog.html.SafeUrl.unwrap(b);
    	};
    	goog.dom.safe.setButtonFormAction = function (a, b) {
    	    b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    	    goog.dom.asserts.assertIsHTMLButtonElement(a).formAction = goog.html.SafeUrl.unwrap(b);
    	};
    	goog.dom.safe.setInputFormAction = function (a, b) {
    	    b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    	    goog.dom.asserts.assertIsHTMLInputElement(a).formAction = goog.html.SafeUrl.unwrap(b);
    	};
    	goog.dom.safe.setStyle = function (a, b) {
    	    a.style.cssText = goog.html.SafeStyle.unwrap(b);
    	};
    	goog.dom.safe.documentWrite = function (a, b) {
    	    a.write(goog.html.SafeHtml.unwrapTrustedHTML(b));
    	};
    	goog.dom.safe.setAnchorHref = function (a, b) {
    	    goog.dom.asserts.assertIsHTMLAnchorElement(a);
    	    b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    	    a.href = goog.html.SafeUrl.unwrap(b);
    	};
    	goog.dom.safe.setImageSrc = function (a, b) {
    	    goog.dom.asserts.assertIsHTMLImageElement(a);
    	    if (!(b instanceof goog.html.SafeUrl)) {
    	        var c = /^data:image\//i.test(b);
    	        b = goog.html.SafeUrl.sanitizeAssertUnchanged(b, c);
    	    }
    	    a.src = goog.html.SafeUrl.unwrap(b);
    	};
    	goog.dom.safe.setAudioSrc = function (a, b) {
    	    goog.dom.asserts.assertIsHTMLAudioElement(a);
    	    if (!(b instanceof goog.html.SafeUrl)) {
    	        var c = /^data:audio\//i.test(b);
    	        b = goog.html.SafeUrl.sanitizeAssertUnchanged(b, c);
    	    }
    	    a.src = goog.html.SafeUrl.unwrap(b);
    	};
    	goog.dom.safe.setVideoSrc = function (a, b) {
    	    goog.dom.asserts.assertIsHTMLVideoElement(a);
    	    if (!(b instanceof goog.html.SafeUrl)) {
    	        var c = /^data:video\//i.test(b);
    	        b = goog.html.SafeUrl.sanitizeAssertUnchanged(b, c);
    	    }
    	    a.src = goog.html.SafeUrl.unwrap(b);
    	};
    	goog.dom.safe.setEmbedSrc = function (a, b) {
    	    goog.dom.asserts.assertIsHTMLEmbedElement(a);
    	    a.src = goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(b);
    	};
    	goog.dom.safe.setFrameSrc = function (a, b) {
    	    goog.dom.asserts.assertIsHTMLFrameElement(a);
    	    a.src = goog.html.TrustedResourceUrl.unwrap(b);
    	};
    	goog.dom.safe.setIframeSrc = function (a, b) {
    	    goog.dom.asserts.assertIsHTMLIFrameElement(a);
    	    a.src = goog.html.TrustedResourceUrl.unwrap(b);
    	};
    	goog.dom.safe.setIframeSrcdoc = function (a, b) {
    	    goog.dom.asserts.assertIsHTMLIFrameElement(a);
    	    a.srcdoc = goog.html.SafeHtml.unwrapTrustedHTML(b);
    	};
    	goog.dom.safe.setLinkHrefAndRel = function (a, b, c) {
    	    goog.dom.asserts.assertIsHTMLLinkElement(a);
    	    a.rel = c;
    	    goog.string.internal.caseInsensitiveContains(c, "stylesheet") ? (goog.asserts.assert(b instanceof goog.html.TrustedResourceUrl, 'URL must be TrustedResourceUrl because "rel" contains "stylesheet"'), a.href = goog.html.TrustedResourceUrl.unwrap(b)) : a.href = b instanceof goog.html.TrustedResourceUrl ? goog.html.TrustedResourceUrl.unwrap(b) : b instanceof goog.html.SafeUrl ? goog.html.SafeUrl.unwrap(b) : goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitizeAssertUnchanged(b));
    	};
    	goog.dom.safe.setObjectData = function (a, b) {
    	    goog.dom.asserts.assertIsHTMLObjectElement(a);
    	    a.data = goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(b);
    	};
    	goog.dom.safe.setScriptSrc = function (a, b) {
    	    goog.dom.asserts.assertIsHTMLScriptElement(a);
    	    a.src = goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(b);
    	    (b = goog.getScriptNonce()) && a.setAttribute("nonce", b);
    	};
    	goog.dom.safe.setScriptContent = function (a, b) {
    	    goog.dom.asserts.assertIsHTMLScriptElement(a);
    	    a.text = goog.html.SafeScript.unwrapTrustedScript(b);
    	    (b = goog.getScriptNonce()) && a.setAttribute("nonce", b);
    	};
    	goog.dom.safe.setLocationHref = function (a, b) {
    	    goog.dom.asserts.assertIsLocation(a);
    	    b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    	    a.href = goog.html.SafeUrl.unwrap(b);
    	};
    	goog.dom.safe.assignLocation = function (a, b) {
    	    goog.dom.asserts.assertIsLocation(a);
    	    b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    	    a.assign(goog.html.SafeUrl.unwrap(b));
    	};
    	goog.dom.safe.replaceLocation = function (a, b) {
    	    b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    	    a.replace(goog.html.SafeUrl.unwrap(b));
    	};
    	goog.dom.safe.openInWindow = function (a, b, c, d, e) {
    	    a = a instanceof goog.html.SafeUrl ? a : goog.html.SafeUrl.sanitizeAssertUnchanged(a);
    	    b = b || goog.global;
    	    c = c instanceof goog.string.Const ? goog.string.Const.unwrap(c) : c || "";
    	    return b.open(goog.html.SafeUrl.unwrap(a), c, d, e)
    	};
    	goog.dom.safe.parseFromStringHtml = function (a, b) {
    	    return goog.dom.safe.parseFromString(a, b, "text/html")
    	};
    	goog.dom.safe.parseFromString = function (a, b, c) {
    	    return a.parseFromString(goog.html.SafeHtml.unwrapTrustedHTML(b), c)
    	};
    	goog.dom.safe.createImageFromBlob = function (a) {
    	    if (!/^image\/.*/g.test(a.type)) throw Error("goog.dom.safe.createImageFromBlob only accepts MIME type image/.*.");
    	    var b = goog.global.URL.createObjectURL(a);
    	    a = new goog.global.Image;
    	    a.onload = function () {
    	        goog.global.URL.revokeObjectURL(b);
    	    };
    	    goog.dom.safe.setImageSrc(a, goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Image blob URL."), b));
    	    return a
    	};
    	goog.string.DETECT_DOUBLE_ESCAPING = !1;
    	goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
    	goog.string.Unicode = {NBSP: "\u00a0"};
    	goog.string.startsWith = goog.string.internal.startsWith;
    	goog.string.endsWith = goog.string.internal.endsWith;
    	goog.string.caseInsensitiveStartsWith = goog.string.internal.caseInsensitiveStartsWith;
    	goog.string.caseInsensitiveEndsWith = goog.string.internal.caseInsensitiveEndsWith;
    	goog.string.caseInsensitiveEquals = goog.string.internal.caseInsensitiveEquals;
    	goog.string.subs = function (a, b) {
    	    for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;) d += c.shift() + e.shift();
    	    return d + c.join("%s")
    	};
    	goog.string.collapseWhitespace = function (a) {
    	    return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
    	};
    	goog.string.isEmptyOrWhitespace = goog.string.internal.isEmptyOrWhitespace;
    	goog.string.isEmptyString = function (a) {
    	    return 0 == a.length
    	};
    	goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
    	goog.string.isEmptyOrWhitespaceSafe = function (a) {
    	    return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a))
    	};
    	goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
    	goog.string.isBreakingWhitespace = function (a) {
    	    return !/[^\t\n\r ]/.test(a)
    	};
    	goog.string.isAlpha = function (a) {
    	    return !/[^a-zA-Z]/.test(a)
    	};
    	goog.string.isNumeric = function (a) {
    	    return !/[^0-9]/.test(a)
    	};
    	goog.string.isAlphaNumeric = function (a) {
    	    return !/[^a-zA-Z0-9]/.test(a)
    	};
    	goog.string.isSpace = function (a) {
    	    return " " == a
    	};
    	goog.string.isUnicodeChar = function (a) {
    	    return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a
    	};
    	goog.string.stripNewlines = function (a) {
    	    return a.replace(/(\r\n|\r|\n)+/g, " ")
    	};
    	goog.string.canonicalizeNewlines = function (a) {
    	    return a.replace(/(\r\n|\r|\n)/g, "\n")
    	};
    	goog.string.normalizeWhitespace = function (a) {
    	    return a.replace(/\xa0|\s/g, " ")
    	};
    	goog.string.normalizeSpaces = function (a) {
    	    return a.replace(/\xa0|[ \t]+/g, " ")
    	};
    	goog.string.collapseBreakingSpaces = function (a) {
    	    return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
    	};
    	goog.string.trim = goog.string.internal.trim;
    	goog.string.trimLeft = function (a) {
    	    return a.replace(/^[\s\xa0]+/, "")
    	};
    	goog.string.trimRight = function (a) {
    	    return a.replace(/[\s\xa0]+$/, "")
    	};
    	goog.string.caseInsensitiveCompare = goog.string.internal.caseInsensitiveCompare;
    	goog.string.numberAwareCompare_ = function (a, b, c) {
    	    if (a == b) return 0;
    	    if (!a) return -1;
    	    if (!b) return 1;
    	    for (var d = a.toLowerCase().match(c), e = b.toLowerCase().match(c), f = Math.min(d.length, e.length), g = 0; g < f; g++) {
    	        c = d[g];
    	        var h = e[g];
    	        if (c != h) return a = parseInt(c, 10), !isNaN(a) && (b = parseInt(h, 10), !isNaN(b) && a - b) ? a - b : c < h ? -1 : 1
    	    }
    	    return d.length != e.length ? d.length - e.length : a < b ? -1 : 1
    	};
    	goog.string.intAwareCompare = function (a, b) {
    	    return goog.string.numberAwareCompare_(a, b, /\d+|\D+/g)
    	};
    	goog.string.floatAwareCompare = function (a, b) {
    	    return goog.string.numberAwareCompare_(a, b, /\d+|\.\d+|\D+/g)
    	};
    	goog.string.numerateCompare = goog.string.floatAwareCompare;
    	goog.string.urlEncode = function (a) {
    	    return encodeURIComponent(String(a))
    	};
    	goog.string.urlDecode = function (a) {
    	    return decodeURIComponent(a.replace(/\+/g, " "))
    	};
    	goog.string.newLineToBr = goog.string.internal.newLineToBr;
    	goog.string.htmlEscape = function (a, b) {
    	    a = goog.string.internal.htmlEscape(a, b);
    	    goog.string.DETECT_DOUBLE_ESCAPING && (a = a.replace(goog.string.E_RE_, "&#101;"));
    	    return a
    	};
    	goog.string.E_RE_ = /e/g;
    	goog.string.unescapeEntities = function (a) {
    	    return goog.string.contains(a, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a
    	};
    	goog.string.unescapeEntitiesWithDocument = function (a, b) {
    	    return goog.string.contains(a, "&") ? goog.string.unescapeEntitiesUsingDom_(a, b) : a
    	};
    	goog.string.unescapeEntitiesUsingDom_ = function (a, b) {
    	    var c = {"&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"'};
    	    var d = b ? b.createElement("div") : goog.global.document.createElement("div");
    	    return a.replace(goog.string.HTML_ENTITY_PATTERN_, function (a, b) {
    	        var e = c[a];
    	        if (e) return e;
    	        "#" == b.charAt(0) && (b = Number("0" + b.substr(1)), isNaN(b) || (e = String.fromCharCode(b)));
    	        e || (goog.dom.safe.setInnerHtml(d, goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Single HTML entity."),
    	            a + " ")), e = d.firstChild.nodeValue.slice(0, -1));
    	        return c[a] = e
    	    })
    	};
    	goog.string.unescapePureXmlEntities_ = function (a) {
    	    return a.replace(/&([^;]+);/g, function (a, c) {
    	        switch (c) {
    	            case "amp":
    	                return "&";
    	            case "lt":
    	                return "<";
    	            case "gt":
    	                return ">";
    	            case "quot":
    	                return '"';
    	            default:
    	                return "#" != c.charAt(0) || (c = Number("0" + c.substr(1)), isNaN(c)) ? a : String.fromCharCode(c)
    	        }
    	    })
    	};
    	goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
    	goog.string.whitespaceEscape = function (a, b) {
    	    return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b)
    	};
    	goog.string.preserveSpaces = function (a) {
    	    return a.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP)
    	};
    	goog.string.stripQuotes = function (a, b) {
    	    for (var c = b.length, d = 0; d < c; d++) {
    	        var e = 1 == c ? b : b.charAt(d);
    	        if (a.charAt(0) == e && a.charAt(a.length - 1) == e) return a.substring(1, a.length - 1)
    	    }
    	    return a
    	};
    	goog.string.truncate = function (a, b, c) {
    	    c && (a = goog.string.unescapeEntities(a));
    	    a.length > b && (a = a.substring(0, b - 3) + "...");
    	    c && (a = goog.string.htmlEscape(a));
    	    return a
    	};
    	goog.string.truncateMiddle = function (a, b, c, d) {
    	    c && (a = goog.string.unescapeEntities(a));
    	    if (d && a.length > b) {
    	        d > b && (d = b);
    	        var e = a.length - d;
    	        a = a.substring(0, b - d) + "..." + a.substring(e);
    	    } else a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e));
    	    c && (a = goog.string.htmlEscape(a));
    	    return a
    	};
    	goog.string.specialEscapeChars_ = {
    	    "\x00": "\\0",
    	    "\b": "\\b",
    	    "\f": "\\f",
    	    "\n": "\\n",
    	    "\r": "\\r",
    	    "\t": "\\t",
    	    "\x0B": "\\x0B",
    	    '"': '\\"',
    	    "\\": "\\\\",
    	    "<": "\\u003C"
    	};
    	goog.string.jsEscapeCache_ = {"'": "\\'"};
    	goog.string.quote = function (a) {
    	    a = String(a);
    	    for (var b = ['"'], c = 0; c < a.length; c++) {
    	        var d = a.charAt(c), e = d.charCodeAt(0);
    	        b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d));
    	    }
    	    b.push('"');
    	    return b.join("")
    	};
    	goog.string.escapeString = function (a) {
    	    for (var b = [], c = 0; c < a.length; c++) b[c] = goog.string.escapeChar(a.charAt(c));
    	    return b.join("")
    	};
    	goog.string.escapeChar = function (a) {
    	    if (a in goog.string.jsEscapeCache_) return goog.string.jsEscapeCache_[a];
    	    if (a in goog.string.specialEscapeChars_) return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a];
    	    var b = a.charCodeAt(0);
    	    if (31 < b && 127 > b) var c = a; else {
    	        if (256 > b) {
    	            if (c = "\\x", 16 > b || 256 < b) c += "0";
    	        } else c = "\\u", 4096 > b && (c += "0");
    	        c += b.toString(16).toUpperCase();
    	    }
    	    return goog.string.jsEscapeCache_[a] = c
    	};
    	goog.string.contains = goog.string.internal.contains;
    	goog.string.caseInsensitiveContains = goog.string.internal.caseInsensitiveContains;
    	goog.string.countOf = function (a, b) {
    	    return a && b ? a.split(b).length - 1 : 0
    	};
    	goog.string.removeAt = function (a, b, c) {
    	    var d = a;
    	    0 <= b && b < a.length && 0 < c && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
    	    return d
    	};
    	goog.string.remove = function (a, b) {
    	    return a.replace(b, "")
    	};
    	goog.string.removeAll = function (a, b) {
    	    b = new RegExp(goog.string.regExpEscape(b), "g");
    	    return a.replace(b, "")
    	};
    	goog.string.replaceAll = function (a, b, c) {
    	    b = new RegExp(goog.string.regExpEscape(b), "g");
    	    return a.replace(b, c.replace(/\$/g, "$$$$"))
    	};
    	goog.string.regExpEscape = function (a) {
    	    return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
    	};
    	goog.string.repeat = String.prototype.repeat ? function (a, b) {
    	    return a.repeat(b)
    	} : function (a, b) {
    	    return Array(b + 1).join(a)
    	};
    	goog.string.padNumber = function (a, b, c) {
    	    a = void 0 !== c ? a.toFixed(c) : String(a);
    	    c = a.indexOf(".");
    	    -1 == c && (c = a.length);
    	    return goog.string.repeat("0", Math.max(0, b - c)) + a
    	};
    	goog.string.makeSafe = function (a) {
    	    return null == a ? "" : String(a)
    	};
    	goog.string.buildString = function (a) {
    	    return Array.prototype.join.call(arguments, "")
    	};
    	goog.string.getRandomString = function () {
    	    return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
    	};
    	goog.string.compareVersions = goog.string.internal.compareVersions;
    	goog.string.hashCode = function (a) {
    	    for (var b = 0, c = 0; c < a.length; ++c) b = 31 * b + a.charCodeAt(c) >>> 0;
    	    return b
    	};
    	goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
    	goog.string.createUniqueString = function () {
    	    return "goog_" + goog.string.uniqueStringCounter_++
    	};
    	goog.string.toNumber = function (a) {
    	    var b = Number(a);
    	    return 0 == b && goog.string.isEmptyOrWhitespace(a) ? NaN : b
    	};
    	goog.string.isLowerCamelCase = function (a) {
    	    return /^[a-z]+([A-Z][a-z]*)*$/.test(a)
    	};
    	goog.string.isUpperCamelCase = function (a) {
    	    return /^([A-Z][a-z]*)+$/.test(a)
    	};
    	goog.string.toCamelCase = function (a) {
    	    return String(a).replace(/\-([a-z])/g, function (a, c) {
    	        return c.toUpperCase()
    	    })
    	};
    	goog.string.toSelectorCase = function (a) {
    	    return String(a).replace(/([A-Z])/g, "-$1").toLowerCase()
    	};
    	goog.string.toTitleCase = function (a, b) {
    	    b = "string" === typeof b ? goog.string.regExpEscape(b) : "\\s";
    	    return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])", "g"), function (a, b, e) {
    	        return b + e.toUpperCase()
    	    })
    	};
    	goog.string.capitalize = function (a) {
    	    return String(a.charAt(0)).toUpperCase() + String(a.substr(1)).toLowerCase()
    	};
    	goog.string.parseInt = function (a) {
    	    isFinite(a) && (a = String(a));
    	    return "string" === typeof a ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN
    	};
    	goog.string.splitLimit = function (a, b, c) {
    	    a = a.split(b);
    	    for (var d = []; 0 < c && a.length;) d.push(a.shift()), c--;
    	    a.length && d.push(a.join(b));
    	    return d
    	};
    	goog.string.lastComponent = function (a, b) {
    	    if (b) "string" == typeof b && (b = [b]); else return a;
    	    for (var c = -1, d = 0; d < b.length; d++) if ("" != b[d]) {
    	        var e = a.lastIndexOf(b[d]);
    	        e > c && (c = e);
    	    }
    	    return -1 == c ? a : a.slice(c + 1)
    	};
    	goog.string.editDistance = function (a, b) {
    	    var c = [], d = [];
    	    if (a == b) return 0;
    	    if (!a.length || !b.length) return Math.max(a.length, b.length);
    	    for (var e = 0; e < b.length + 1; e++) c[e] = e;
    	    for (e = 0; e < a.length; e++) {
    	        d[0] = e + 1;
    	        for (var f = 0; f < b.length; f++) d[f + 1] = Math.min(d[f] + 1, c[f + 1] + 1, c[f] + Number(a[e] != b[f]));
    	        for (f = 0; f < c.length; f++) c[f] = d[f];
    	    }
    	    return d[b.length]
    	};
    	goog.labs.userAgent.engine = {};
    	goog.labs.userAgent.engine.isPresto = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("Presto")
    	};
    	goog.labs.userAgent.engine.isTrident = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
    	};
    	goog.labs.userAgent.engine.isEdge = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("Edge")
    	};
    	goog.labs.userAgent.engine.isWebKit = function () {
    	    return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge()
    	};
    	goog.labs.userAgent.engine.isGecko = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge()
    	};
    	goog.labs.userAgent.engine.getVersion = function () {
    	    var a = goog.labs.userAgent.util.getUserAgent();
    	    if (a) {
    	        a = goog.labs.userAgent.util.extractVersionTuples(a);
    	        var b = goog.labs.userAgent.engine.getEngineTuple_(a);
    	        if (b) return "Gecko" == b[0] ? goog.labs.userAgent.engine.getVersionForKey_(a, "Firefox") : b[1];
    	        a = a[0];
    	        var c;
    	        if (a && (c = a[2]) && (c = /Trident\/([^\s;]+)/.exec(c))) return c[1]
    	    }
    	    return ""
    	};
    	goog.labs.userAgent.engine.getEngineTuple_ = function (a) {
    	    if (!goog.labs.userAgent.engine.isEdge()) return a[1];
    	    for (var b = 0; b < a.length; b++) {
    	        var c = a[b];
    	        if ("Edge" == c[0]) return c
    	    }
    	};
    	goog.labs.userAgent.engine.isVersionOrHigher = function (a) {
    	    return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), a)
    	};
    	goog.labs.userAgent.engine.getVersionForKey_ = function (a, b) {
    	    return (a = goog.array.find(a, function (a) {
    	        return b == a[0]
    	    })) && a[1] || ""
    	};
    	goog.labs.userAgent.platform = {};
    	goog.labs.userAgent.platform.isAndroid = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("Android")
    	};
    	goog.labs.userAgent.platform.isIpod = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("iPod")
    	};
    	goog.labs.userAgent.platform.isIphone = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad")
    	};
    	goog.labs.userAgent.platform.isIpad = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("iPad")
    	};
    	goog.labs.userAgent.platform.isIos = function () {
    	    return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod()
    	};
    	goog.labs.userAgent.platform.isMacintosh = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("Macintosh")
    	};
    	goog.labs.userAgent.platform.isLinux = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("Linux")
    	};
    	goog.labs.userAgent.platform.isWindows = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("Windows")
    	};
    	goog.labs.userAgent.platform.isChromeOS = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("CrOS")
    	};
    	goog.labs.userAgent.platform.isChromecast = function () {
    	    return goog.labs.userAgent.util.matchUserAgent("CrKey")
    	};
    	goog.labs.userAgent.platform.isKaiOS = function () {
    	    return goog.labs.userAgent.util.matchUserAgentIgnoreCase("KaiOS")
    	};
    	goog.labs.userAgent.platform.getVersion = function () {
    	    var a = goog.labs.userAgent.util.getUserAgent(), b = "";
    	    goog.labs.userAgent.platform.isWindows() ? (b = /Windows (?:NT|Phone) ([0-9.]+)/, b = (a = b.exec(a)) ? a[1] : "0.0") : goog.labs.userAgent.platform.isIos() ? (b = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, b = (a = b.exec(a)) && a[1].replace(/_/g, ".")) : goog.labs.userAgent.platform.isMacintosh() ? (b = /Mac OS X ([0-9_.]+)/, b = (a = b.exec(a)) ? a[1].replace(/_/g, ".") : "10") : goog.labs.userAgent.platform.isKaiOS() ? (b = /(?:KaiOS)\/(\S+)/i,
    	        b = (a = b.exec(a)) && a[1]) : goog.labs.userAgent.platform.isAndroid() ? (b = /Android\s+([^\);]+)(\)|;)/, b = (a = b.exec(a)) && a[1]) : goog.labs.userAgent.platform.isChromeOS() && (b = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, b = (a = b.exec(a)) && a[1]);
    	    return b || ""
    	};
    	goog.labs.userAgent.platform.isVersionOrHigher = function (a) {
    	    return 0 <= goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), a)
    	};
    	goog.reflect = {};
    	goog.reflect.object = function (a, b) {
    	    return b
    	};
    	goog.reflect.objectProperty = function (a, b) {
    	    return a
    	};
    	goog.reflect.sinkValue = function (a) {
    	    goog.reflect.sinkValue[" "](a);
    	    return a
    	};
    	goog.reflect.sinkValue[" "] = goog.nullFunction;
    	goog.reflect.canAccessProperty = function (a, b) {
    	    try {
    	        return goog.reflect.sinkValue(a[b]), !0
    	    } catch (c) {
    	    }
    	    return !1
    	};
    	goog.reflect.cache = function (a, b, c, d) {
    	    d = d ? d(b) : b;
    	    return Object.prototype.hasOwnProperty.call(a, d) ? a[d] : a[d] = c(b)
    	};
    	goog.userAgent = {};
    	goog.userAgent.ASSUME_IE = !1;
    	goog.userAgent.ASSUME_EDGE = !1;
    	goog.userAgent.ASSUME_GECKO = !1;
    	goog.userAgent.ASSUME_WEBKIT = !1;
    	goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
    	goog.userAgent.ASSUME_OPERA = !1;
    	goog.userAgent.ASSUME_ANY_VERSION = !1;
    	goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
    	goog.userAgent.getUserAgentString = function () {
    	    return goog.labs.userAgent.util.getUserAgent()
    	};
    	goog.userAgent.getNavigatorTyped = function () {
    	    return goog.global.navigator || null
    	};
    	goog.userAgent.getNavigator = function () {
    	    return goog.userAgent.getNavigatorTyped()
    	};
    	goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera();
    	goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
    	goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_EDGE : goog.labs.userAgent.engine.isEdge();
    	goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE;
    	goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko();
    	goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit();
    	goog.userAgent.isMobile_ = function () {
    	    return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile")
    	};
    	goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
    	goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
    	goog.userAgent.determinePlatform_ = function () {
    	    var a = goog.userAgent.getNavigatorTyped();
    	    return a && a.platform || ""
    	};
    	goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
    	goog.userAgent.ASSUME_MAC = !1;
    	goog.userAgent.ASSUME_WINDOWS = !1;
    	goog.userAgent.ASSUME_LINUX = !1;
    	goog.userAgent.ASSUME_X11 = !1;
    	goog.userAgent.ASSUME_ANDROID = !1;
    	goog.userAgent.ASSUME_IPHONE = !1;
    	goog.userAgent.ASSUME_IPAD = !1;
    	goog.userAgent.ASSUME_IPOD = !1;
    	goog.userAgent.ASSUME_KAIOS = !1;
    	goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD;
    	goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh();
    	goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows();
    	goog.userAgent.isLegacyLinux_ = function () {
    	    return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS()
    	};
    	goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_();
    	goog.userAgent.isX11_ = function () {
    	    var a = goog.userAgent.getNavigatorTyped();
    	    return !!a && goog.string.contains(a.appVersion || "", "X11")
    	};
    	goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_();
    	goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid();
    	goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone();
    	goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
    	goog.userAgent.IPOD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIpod();
    	goog.userAgent.IOS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIos();
    	goog.userAgent.KAIOS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_KAIOS : goog.labs.userAgent.platform.isKaiOS();
    	goog.userAgent.determineVersion_ = function () {
    	    var a = "", b = goog.userAgent.getVersionRegexResult_();
    	    b && (a = b ? b[1] : "");
    	    return goog.userAgent.IE && (b = goog.userAgent.getDocumentMode_(), null != b && b > parseFloat(a)) ? String(b) : a
    	};
    	goog.userAgent.getVersionRegexResult_ = function () {
    	    var a = goog.userAgent.getUserAgentString();
    	    if (goog.userAgent.GECKO) return /rv:([^\);]+)(\)|;)/.exec(a);
    	    if (goog.userAgent.EDGE) return /Edge\/([\d\.]+)/.exec(a);
    	    if (goog.userAgent.IE) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
    	    if (goog.userAgent.WEBKIT) return /WebKit\/(\S+)/.exec(a);
    	    if (goog.userAgent.OPERA) return /(?:Version)[ \/]?(\S+)/.exec(a)
    	};
    	goog.userAgent.getDocumentMode_ = function () {
    	    var a = goog.global.document;
    	    return a ? a.documentMode : void 0
    	};
    	goog.userAgent.VERSION = goog.userAgent.determineVersion_();
    	goog.userAgent.compare = function (a, b) {
    	    return goog.string.compareVersions(a, b)
    	};
    	goog.userAgent.isVersionOrHigherCache_ = {};
    	goog.userAgent.isVersionOrHigher = function (a) {
    	    return goog.userAgent.ASSUME_ANY_VERSION || goog.reflect.cache(goog.userAgent.isVersionOrHigherCache_, a, function () {
    	        return 0 <= goog.string.compareVersions(goog.userAgent.VERSION, a)
    	    })
    	};
    	goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher;
    	goog.userAgent.isDocumentModeOrHigher = function (a) {
    	    return Number(goog.userAgent.DOCUMENT_MODE) >= a
    	};
    	goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher;
    	goog.userAgent.DOCUMENT_MODE = function () {
    	    if (goog.global.document && goog.userAgent.IE) {
    	        var a = goog.userAgent.getDocumentMode_();
    	        return a ? a : parseInt(goog.userAgent.VERSION, 10) || void 0
    	    }
    	}();
    	goog.userAgent.product = {};
    	goog.userAgent.product.ASSUME_FIREFOX = !1;
    	goog.userAgent.product.ASSUME_IPHONE = !1;
    	goog.userAgent.product.ASSUME_IPAD = !1;
    	goog.userAgent.product.ASSUME_ANDROID = !1;
    	goog.userAgent.product.ASSUME_CHROME = !1;
    	goog.userAgent.product.ASSUME_SAFARI = !1;
    	goog.userAgent.product.PRODUCT_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_OPERA || goog.userAgent.product.ASSUME_FIREFOX || goog.userAgent.product.ASSUME_IPHONE || goog.userAgent.product.ASSUME_IPAD || goog.userAgent.product.ASSUME_ANDROID || goog.userAgent.product.ASSUME_CHROME || goog.userAgent.product.ASSUME_SAFARI;
    	goog.userAgent.product.OPERA = goog.userAgent.OPERA;
    	goog.userAgent.product.IE = goog.userAgent.IE;
    	goog.userAgent.product.EDGE = goog.userAgent.EDGE;
    	goog.userAgent.product.FIREFOX = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_FIREFOX : goog.labs.userAgent.browser.isFirefox();
    	goog.userAgent.product.isIphoneOrIpod_ = function () {
    	    return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpod()
    	};
    	goog.userAgent.product.IPHONE = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPHONE : goog.userAgent.product.isIphoneOrIpod_();
    	goog.userAgent.product.IPAD = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
    	goog.userAgent.product.ANDROID = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_ANDROID : goog.labs.userAgent.browser.isAndroidBrowser();
    	goog.userAgent.product.CHROME = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CHROME : goog.labs.userAgent.browser.isChrome();
    	goog.userAgent.product.isSafariDesktop_ = function () {
    	    return goog.labs.userAgent.browser.isSafari() && !goog.labs.userAgent.platform.isIos()
    	};
    	goog.userAgent.product.SAFARI = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_SAFARI : goog.userAgent.product.isSafariDesktop_();
    	goog.crypt.base64 = {};
    	goog.crypt.base64.DEFAULT_ALPHABET_COMMON_ = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    	goog.crypt.base64.ENCODED_VALS = goog.crypt.base64.DEFAULT_ALPHABET_COMMON_ + "+/=";
    	goog.crypt.base64.ENCODED_VALS_WEBSAFE = goog.crypt.base64.DEFAULT_ALPHABET_COMMON_ + "-_.";
    	goog.crypt.base64.Alphabet = {DEFAULT: 0, NO_PADDING: 1, WEBSAFE: 2, WEBSAFE_DOT_PADDING: 3, WEBSAFE_NO_PADDING: 4};
    	goog.crypt.base64.paddingChars_ = "=.";
    	goog.crypt.base64.isPadding_ = function (a) {
    	    return goog.string.contains(goog.crypt.base64.paddingChars_, a)
    	};
    	goog.crypt.base64.byteToCharMaps_ = {};
    	goog.crypt.base64.charToByteMap_ = null;
    	goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ = goog.userAgent.GECKO || goog.userAgent.WEBKIT && !goog.userAgent.product.SAFARI || goog.userAgent.OPERA;
    	goog.crypt.base64.HAS_NATIVE_ENCODE_ = goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ || "function" == typeof goog.global.btoa;
    	goog.crypt.base64.HAS_NATIVE_DECODE_ = goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ || !goog.userAgent.product.SAFARI && !goog.userAgent.IE && "function" == typeof goog.global.atob;
    	goog.crypt.base64.encodeByteArray = function (a, b) {
    	    goog.asserts.assert(goog.isArrayLike(a), "encodeByteArray takes an array as a parameter");
    	    void 0 === b && (b = goog.crypt.base64.Alphabet.DEFAULT);
    	    goog.crypt.base64.init_();
    	    b = goog.crypt.base64.byteToCharMaps_[b];
    	    for (var c = [], d = 0; d < a.length; d += 3) {
    	        var e = a[d], f = d + 1 < a.length, g = f ? a[d + 1] : 0, h = d + 2 < a.length, k = h ? a[d + 2] : 0,
    	            l = e >> 2;
    	        e = (e & 3) << 4 | g >> 4;
    	        g = (g & 15) << 2 | k >> 6;
    	        k &= 63;
    	        h || (k = 64, f || (g = 64));
    	        c.push(b[l], b[e], b[g] || "", b[k] || "");
    	    }
    	    return c.join("")
    	};
    	goog.crypt.base64.encodeString = function (a, b) {
    	    return goog.crypt.base64.HAS_NATIVE_ENCODE_ && !b ? goog.global.btoa(a) : goog.crypt.base64.encodeByteArray(goog.crypt.stringToByteArray(a), b)
    	};
    	goog.crypt.base64.decodeString = function (a, b) {
    	    if (goog.crypt.base64.HAS_NATIVE_DECODE_ && !b) return goog.global.atob(a);
    	    var c = "";
    	    goog.crypt.base64.decodeStringInternal_(a, function (a) {
    	        c += String.fromCharCode(a);
    	    });
    	    return c
    	};
    	goog.crypt.base64.decodeStringToByteArray = function (a, b) {
    	    var c = [];
    	    goog.crypt.base64.decodeStringInternal_(a, function (a) {
    	        c.push(a);
    	    });
    	    return c
    	};
    	goog.crypt.base64.decodeStringToUint8Array = function (a) {
    	    goog.asserts.assert(!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10"), "Browser does not support typed arrays");
    	    var b = a.length, c = 3 * b / 4;
    	    c % 3 ? c = Math.floor(c) : goog.crypt.base64.isPadding_(a[b - 1]) && (c = goog.crypt.base64.isPadding_(a[b - 2]) ? c - 2 : c - 1);
    	    var d = new Uint8Array(c), e = 0;
    	    goog.crypt.base64.decodeStringInternal_(a, function (a) {
    	        d[e++] = a;
    	    });
    	    return d.subarray(0, e)
    	};
    	goog.crypt.base64.decodeStringInternal_ = function (a, b) {
    	    function c(b) {
    	        for (; d < a.length;) {
    	            var c = a.charAt(d++), e = goog.crypt.base64.charToByteMap_[c];
    	            if (null != e) return e;
    	            if (!goog.string.isEmptyOrWhitespace(c)) throw Error("Unknown base64 encoding at char: " + c);
    	        }
    	        return b
    	    }

    	    goog.crypt.base64.init_();
    	    for (var d = 0; ;) {
    	        var e = c(-1), f = c(0), g = c(64), h = c(64);
    	        if (64 === h && -1 === e) break;
    	        b(e << 2 | f >> 4);
    	        64 != g && (b(f << 4 & 240 | g >> 2), 64 != h && b(g << 6 & 192 | h));
    	    }
    	};
    	goog.crypt.base64.init_ = function () {
    	    if (!goog.crypt.base64.charToByteMap_) {
    	        goog.crypt.base64.charToByteMap_ = {};
    	        for (var a = goog.crypt.base64.DEFAULT_ALPHABET_COMMON_.split(""), b = ["+/=", "+/", "-_=", "-_.", "-_"], c = 0; 5 > c; c++) {
    	            var d = a.concat(b[c].split(""));
    	            goog.crypt.base64.byteToCharMaps_[c] = d;
    	            for (var e = 0; e < d.length; e++) {
    	                var f = d[e], g = goog.crypt.base64.charToByteMap_[f];
    	                void 0 === g ? goog.crypt.base64.charToByteMap_[f] = e : goog.asserts.assert(g === e);
    	            }
    	        }
    	    }
    	};
    	jspb.utils = {};
    	jspb.utils.split64Low = 0;
    	jspb.utils.split64High = 0;
    	jspb.utils.splitUint64 = function (a) {
    	    var b = a >>> 0;
    	    a = Math.floor((a - b) / jspb.BinaryConstants.TWO_TO_32) >>> 0;
    	    jspb.utils.split64Low = b;
    	    jspb.utils.split64High = a;
    	};
    	jspb.utils.splitInt64 = function (a) {
    	    var b = 0 > a;
    	    a = Math.abs(a);
    	    var c = a >>> 0;
    	    a = Math.floor((a - c) / jspb.BinaryConstants.TWO_TO_32);
    	    a >>>= 0;
    	    b && (a = ~a >>> 0, c = (~c >>> 0) + 1, 4294967295 < c && (c = 0, a++, 4294967295 < a && (a = 0)));
    	    jspb.utils.split64Low = c;
    	    jspb.utils.split64High = a;
    	};
    	jspb.utils.splitZigzag64 = function (a) {
    	    var b = 0 > a;
    	    a = 2 * Math.abs(a);
    	    jspb.utils.splitUint64(a);
    	    a = jspb.utils.split64Low;
    	    var c = jspb.utils.split64High;
    	    b && (0 == a ? 0 == c ? c = a = 4294967295 : (c--, a = 4294967295) : a--);
    	    jspb.utils.split64Low = a;
    	    jspb.utils.split64High = c;
    	};
    	jspb.utils.splitFloat32 = function (a) {
    	    var b = 0 > a ? 1 : 0;
    	    a = b ? -a : a;
    	    if (0 === a) 0 < 1 / a ? (jspb.utils.split64High = 0, jspb.utils.split64Low = 0) : (jspb.utils.split64High = 0, jspb.utils.split64Low = 2147483648); else if (isNaN(a)) jspb.utils.split64High = 0, jspb.utils.split64Low = 2147483647; else if (a > jspb.BinaryConstants.FLOAT32_MAX) jspb.utils.split64High = 0, jspb.utils.split64Low = (b << 31 | 2139095040) >>> 0; else if (a < jspb.BinaryConstants.FLOAT32_MIN) a = Math.round(a / Math.pow(2, -149)), jspb.utils.split64High = 0, jspb.utils.split64Low = (b << 31 |
    	        a) >>> 0; else {
    	        var c = Math.floor(Math.log(a) / Math.LN2);
    	        a *= Math.pow(2, -c);
    	        a = Math.round(a * jspb.BinaryConstants.TWO_TO_23);
    	        16777216 <= a && ++c;
    	        jspb.utils.split64High = 0;
    	        jspb.utils.split64Low = (b << 31 | c + 127 << 23 | a & 8388607) >>> 0;
    	    }
    	};
    	jspb.utils.splitFloat64 = function (a) {
    	    var b = 0 > a ? 1 : 0;
    	    a = b ? -a : a;
    	    if (0 === a) jspb.utils.split64High = 0 < 1 / a ? 0 : 2147483648, jspb.utils.split64Low = 0; else if (isNaN(a)) jspb.utils.split64High = 2147483647, jspb.utils.split64Low = 4294967295; else if (a > jspb.BinaryConstants.FLOAT64_MAX) jspb.utils.split64High = (b << 31 | 2146435072) >>> 0, jspb.utils.split64Low = 0; else if (a < jspb.BinaryConstants.FLOAT64_MIN) {
    	        var c = a / Math.pow(2, -1074);
    	        a = c / jspb.BinaryConstants.TWO_TO_32;
    	        jspb.utils.split64High = (b << 31 | a) >>> 0;
    	        jspb.utils.split64Low = c >>> 0;
    	    } else {
    	        c =
    	            a;
    	        var d = 0;
    	        if (2 <= c) for (; 2 <= c && 1023 > d;) d++, c /= 2; else for (; 1 > c && -1022 < d;) c *= 2, d--;
    	        c = a * Math.pow(2, -d);
    	        a = c * jspb.BinaryConstants.TWO_TO_20 & 1048575;
    	        c = c * jspb.BinaryConstants.TWO_TO_52 >>> 0;
    	        jspb.utils.split64High = (b << 31 | d + 1023 << 20 | a) >>> 0;
    	        jspb.utils.split64Low = c;
    	    }
    	};
    	jspb.utils.splitHash64 = function (a) {
    	    var b = a.charCodeAt(0), c = a.charCodeAt(1), d = a.charCodeAt(2), e = a.charCodeAt(3), f = a.charCodeAt(4),
    	        g = a.charCodeAt(5), h = a.charCodeAt(6);
    	    a = a.charCodeAt(7);
    	    jspb.utils.split64Low = b + (c << 8) + (d << 16) + (e << 24) >>> 0;
    	    jspb.utils.split64High = f + (g << 8) + (h << 16) + (a << 24) >>> 0;
    	};
    	jspb.utils.joinUint64 = function (a, b) {
    	    return b * jspb.BinaryConstants.TWO_TO_32 + (a >>> 0)
    	};
    	jspb.utils.joinInt64 = function (a, b) {
    	    var c = b & 2147483648;
    	    c && (a = ~a + 1 >>> 0, b = ~b >>> 0, 0 == a && (b = b + 1 >>> 0));
    	    a = jspb.utils.joinUint64(a, b);
    	    return c ? -a : a
    	};
    	jspb.utils.toZigzag64 = function (a, b, c) {
    	    var d = b >> 31;
    	    return c(a << 1 ^ d, (b << 1 | a >>> 31) ^ d)
    	};
    	jspb.utils.joinZigzag64 = function (a, b) {
    	    return jspb.utils.fromZigzag64(a, b, jspb.utils.joinInt64)
    	};
    	jspb.utils.fromZigzag64 = function (a, b, c) {
    	    var d = -(a & 1);
    	    return c((a >>> 1 | b << 31) ^ d, b >>> 1 ^ d)
    	};
    	jspb.utils.joinFloat32 = function (a, b) {
    	    b = 2 * (a >> 31) + 1;
    	    var c = a >>> 23 & 255;
    	    a &= 8388607;
    	    return 255 == c ? a ? NaN : Infinity * b : 0 == c ? b * Math.pow(2, -149) * a : b * Math.pow(2, c - 150) * (a + Math.pow(2, 23))
    	};
    	jspb.utils.joinFloat64 = function (a, b) {
    	    var c = 2 * (b >> 31) + 1, d = b >>> 20 & 2047;
    	    a = jspb.BinaryConstants.TWO_TO_32 * (b & 1048575) + a;
    	    return 2047 == d ? a ? NaN : Infinity * c : 0 == d ? c * Math.pow(2, -1074) * a : c * Math.pow(2, d - 1075) * (a + jspb.BinaryConstants.TWO_TO_52)
    	};
    	jspb.utils.joinHash64 = function (a, b) {
    	    return String.fromCharCode(a >>> 0 & 255, a >>> 8 & 255, a >>> 16 & 255, a >>> 24 & 255, b >>> 0 & 255, b >>> 8 & 255, b >>> 16 & 255, b >>> 24 & 255)
    	};
    	jspb.utils.DIGITS = "0123456789abcdef".split("");
    	jspb.utils.ZERO_CHAR_CODE_ = 48;
    	jspb.utils.A_CHAR_CODE_ = 97;
    	jspb.utils.joinUnsignedDecimalString = function (a, b) {
    	    function c(a, b) {
    	        a = a ? String(a) : "";
    	        return b ? "0000000".slice(a.length) + a : a
    	    }

    	    if (2097151 >= b) return "" + jspb.utils.joinUint64(a, b);
    	    var d = (a >>> 24 | b << 8) >>> 0 & 16777215;
    	    b = b >> 16 & 65535;
    	    a = (a & 16777215) + 6777216 * d + 6710656 * b;
    	    d += 8147497 * b;
    	    b *= 2;
    	    1E7 <= a && (d += Math.floor(a / 1E7), a %= 1E7);
    	    1E7 <= d && (b += Math.floor(d / 1E7), d %= 1E7);
    	    return c(b, 0) + c(d, b) + c(a, 1)
    	};
    	jspb.utils.joinSignedDecimalString = function (a, b) {
    	    var c = b & 2147483648;
    	    c && (a = ~a + 1 >>> 0, b = ~b + (0 == a ? 1 : 0) >>> 0);
    	    a = jspb.utils.joinUnsignedDecimalString(a, b);
    	    return c ? "-" + a : a
    	};
    	jspb.utils.hash64ToDecimalString = function (a, b) {
    	    jspb.utils.splitHash64(a);
    	    a = jspb.utils.split64Low;
    	    var c = jspb.utils.split64High;
    	    return b ? jspb.utils.joinSignedDecimalString(a, c) : jspb.utils.joinUnsignedDecimalString(a, c)
    	};
    	jspb.utils.hash64ArrayToDecimalStrings = function (a, b) {
    	    for (var c = Array(a.length), d = 0; d < a.length; d++) c[d] = jspb.utils.hash64ToDecimalString(a[d], b);
    	    return c
    	};
    	jspb.utils.decimalStringToHash64 = function (a) {
    	    function b(a, b) {
    	        for (var c = 0; 8 > c && (1 !== a || 0 < b); c++) b = a * e[c] + b, e[c] = b & 255, b >>>= 8;
    	    }

    	    function c() {
    	        for (var a = 0; 8 > a; a++) e[a] = ~e[a] & 255;
    	    }

    	    jspb.asserts.assert(0 < a.length);
    	    var d = !1;
    	    "-" === a[0] && (d = !0, a = a.slice(1));
    	    for (var e = [0, 0, 0, 0, 0, 0, 0, 0], f = 0; f < a.length; f++) b(10, a.charCodeAt(f) - jspb.utils.ZERO_CHAR_CODE_);
    	    d && (c(), b(1, 1));
    	    return goog.crypt.byteArrayToString(e)
    	};
    	jspb.utils.splitDecimalString = function (a) {
    	    jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(a));
    	};
    	jspb.utils.toHexDigit_ = function (a) {
    	    return String.fromCharCode(10 > a ? jspb.utils.ZERO_CHAR_CODE_ + a : jspb.utils.A_CHAR_CODE_ - 10 + a)
    	};
    	jspb.utils.fromHexCharCode_ = function (a) {
    	    return a >= jspb.utils.A_CHAR_CODE_ ? a - jspb.utils.A_CHAR_CODE_ + 10 : a - jspb.utils.ZERO_CHAR_CODE_
    	};
    	jspb.utils.hash64ToHexString = function (a) {
    	    var b = Array(18);
    	    b[0] = "0";
    	    b[1] = "x";
    	    for (var c = 0; 8 > c; c++) {
    	        var d = a.charCodeAt(7 - c);
    	        b[2 * c + 2] = jspb.utils.toHexDigit_(d >> 4);
    	        b[2 * c + 3] = jspb.utils.toHexDigit_(d & 15);
    	    }
    	    return b.join("")
    	};
    	jspb.utils.hexStringToHash64 = function (a) {
    	    a = a.toLowerCase();
    	    jspb.asserts.assert(18 == a.length);
    	    jspb.asserts.assert("0" == a[0]);
    	    jspb.asserts.assert("x" == a[1]);
    	    for (var b = "", c = 0; 8 > c; c++) {
    	        var d = jspb.utils.fromHexCharCode_(a.charCodeAt(2 * c + 2)),
    	            e = jspb.utils.fromHexCharCode_(a.charCodeAt(2 * c + 3));
    	        b = String.fromCharCode(16 * d + e) + b;
    	    }
    	    return b
    	};
    	jspb.utils.hash64ToNumber = function (a, b) {
    	    jspb.utils.splitHash64(a);
    	    a = jspb.utils.split64Low;
    	    var c = jspb.utils.split64High;
    	    return b ? jspb.utils.joinInt64(a, c) : jspb.utils.joinUint64(a, c)
    	};
    	jspb.utils.numberToHash64 = function (a) {
    	    jspb.utils.splitInt64(a);
    	    return jspb.utils.joinHash64(jspb.utils.split64Low, jspb.utils.split64High)
    	};
    	jspb.utils.countVarints = function (a, b, c) {
    	    for (var d = 0, e = b; e < c; e++) d += a[e] >> 7;
    	    return c - b - d
    	};
    	jspb.utils.countVarintFields = function (a, b, c, d) {
    	    var e = 0;
    	    d = 8 * d + jspb.BinaryConstants.WireType.VARINT;
    	    if (128 > d) for (; b < c && a[b++] == d;) for (e++; ;) {
    	        var f = a[b++];
    	        if (0 == (f & 128)) break
    	    } else for (; b < c;) {
    	        for (f = d; 128 < f;) {
    	            if (a[b] != (f & 127 | 128)) return e;
    	            b++;
    	            f >>= 7;
    	        }
    	        if (a[b++] != f) break;
    	        for (e++; f = a[b++], 0 != (f & 128);) ;
    	    }
    	    return e
    	};
    	jspb.utils.countFixedFields_ = function (a, b, c, d, e) {
    	    var f = 0;
    	    if (128 > d) for (; b < c && a[b++] == d;) f++, b += e; else for (; b < c;) {
    	        for (var g = d; 128 < g;) {
    	            if (a[b++] != (g & 127 | 128)) return f;
    	            g >>= 7;
    	        }
    	        if (a[b++] != g) break;
    	        f++;
    	        b += e;
    	    }
    	    return f
    	};
    	jspb.utils.countFixed32Fields = function (a, b, c, d) {
    	    return jspb.utils.countFixedFields_(a, b, c, 8 * d + jspb.BinaryConstants.WireType.FIXED32, 4)
    	};
    	jspb.utils.countFixed64Fields = function (a, b, c, d) {
    	    return jspb.utils.countFixedFields_(a, b, c, 8 * d + jspb.BinaryConstants.WireType.FIXED64, 8)
    	};
    	jspb.utils.countDelimitedFields = function (a, b, c, d) {
    	    var e = 0;
    	    for (d = 8 * d + jspb.BinaryConstants.WireType.DELIMITED; b < c;) {
    	        for (var f = d; 128 < f;) {
    	            if (a[b++] != (f & 127 | 128)) return e;
    	            f >>= 7;
    	        }
    	        if (a[b++] != f) break;
    	        e++;
    	        for (var g = 0, h = 1; f = a[b++], g += (f & 127) * h, h *= 128, 0 != (f & 128);) ;
    	        b += g;
    	    }
    	    return e
    	};
    	jspb.utils.debugBytesToTextFormat = function (a) {
    	    var b = '"';
    	    if (a) {
    	        a = jspb.utils.byteSourceToUint8Array(a);
    	        for (var c = 0; c < a.length; c++) b += "\\x", 16 > a[c] && (b += "0"), b += a[c].toString(16);
    	    }
    	    return b + '"'
    	};
    	jspb.utils.debugScalarToTextFormat = function (a) {
    	    return "string" === typeof a ? goog.string.quote(a) : a.toString()
    	};
    	jspb.utils.stringToByteArray = function (a) {
    	    for (var b = new Uint8Array(a.length), c = 0; c < a.length; c++) {
    	        var d = a.charCodeAt(c);
    	        if (255 < d) throw Error("Conversion error: string contains codepoint outside of byte range");
    	        b[c] = d;
    	    }
    	    return b
    	};
    	jspb.utils.byteSourceToUint8Array = function (a) {
    	    if (a.constructor === Uint8Array) return a;
    	    if (a.constructor === ArrayBuffer || a.constructor === Array) return new Uint8Array(a);
    	    if (a.constructor === String) return goog.crypt.base64.decodeStringToUint8Array(a);
    	    if (a instanceof Uint8Array) return new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
    	    jspb.asserts.fail("Type not convertible to Uint8Array.");
    	    return new Uint8Array(0)
    	};
    	jspb.BinaryDecoder = function (a, b, c) {
    	    this.bytes_ = null;
    	    this.cursor_ = this.end_ = this.start_ = 0;
    	    this.error_ = !1;
    	    a && this.setBlock(a, b, c);
    	};
    	jspb.BinaryDecoder.instanceCache_ = [];
    	jspb.BinaryDecoder.alloc = function (a, b, c) {
    	    if (jspb.BinaryDecoder.instanceCache_.length) {
    	        var d = jspb.BinaryDecoder.instanceCache_.pop();
    	        a && d.setBlock(a, b, c);
    	        return d
    	    }
    	    return new jspb.BinaryDecoder(a, b, c)
    	};
    	jspb.BinaryDecoder.prototype.free = function () {
    	    this.clear();
    	    100 > jspb.BinaryDecoder.instanceCache_.length && jspb.BinaryDecoder.instanceCache_.push(this);
    	};
    	jspb.BinaryDecoder.prototype.clone = function () {
    	    return jspb.BinaryDecoder.alloc(this.bytes_, this.start_, this.end_ - this.start_)
    	};
    	jspb.BinaryDecoder.prototype.clear = function () {
    	    this.bytes_ = null;
    	    this.cursor_ = this.end_ = this.start_ = 0;
    	    this.error_ = !1;
    	};
    	jspb.BinaryDecoder.prototype.getBuffer = function () {
    	    return this.bytes_
    	};
    	jspb.BinaryDecoder.prototype.setBlock = function (a, b, c) {
    	    this.bytes_ = jspb.utils.byteSourceToUint8Array(a);
    	    this.start_ = void 0 !== b ? b : 0;
    	    this.end_ = void 0 !== c ? this.start_ + c : this.bytes_.length;
    	    this.cursor_ = this.start_;
    	};
    	jspb.BinaryDecoder.prototype.getEnd = function () {
    	    return this.end_
    	};
    	jspb.BinaryDecoder.prototype.setEnd = function (a) {
    	    this.end_ = a;
    	};
    	jspb.BinaryDecoder.prototype.reset = function () {
    	    this.cursor_ = this.start_;
    	};
    	jspb.BinaryDecoder.prototype.getCursor = function () {
    	    return this.cursor_
    	};
    	jspb.BinaryDecoder.prototype.setCursor = function (a) {
    	    this.cursor_ = a;
    	};
    	jspb.BinaryDecoder.prototype.advance = function (a) {
    	    this.cursor_ += a;
    	    jspb.asserts.assert(this.cursor_ <= this.end_);
    	};
    	jspb.BinaryDecoder.prototype.atEnd = function () {
    	    return this.cursor_ == this.end_
    	};
    	jspb.BinaryDecoder.prototype.pastEnd = function () {
    	    return this.cursor_ > this.end_
    	};
    	jspb.BinaryDecoder.prototype.getError = function () {
    	    return this.error_ || 0 > this.cursor_ || this.cursor_ > this.end_
    	};
    	jspb.BinaryDecoder.prototype.readSplitVarint64 = function (a) {
    	    for (var b = 128, c = 0, d = 0, e = 0; 4 > e && 128 <= b; e++) b = this.bytes_[this.cursor_++], c |= (b & 127) << 7 * e;
    	    128 <= b && (b = this.bytes_[this.cursor_++], c |= (b & 127) << 28, d |= (b & 127) >> 4);
    	    if (128 <= b) for (e = 0; 5 > e && 128 <= b; e++) b = this.bytes_[this.cursor_++], d |= (b & 127) << 7 * e + 3;
    	    if (128 > b) return a(c >>> 0, d >>> 0);
    	    jspb.asserts.fail("Failed to read varint, encoding is invalid.");
    	    this.error_ = !0;
    	};
    	jspb.BinaryDecoder.prototype.readSplitZigzagVarint64 = function (a) {
    	    return this.readSplitVarint64(function (b, c) {
    	        return jspb.utils.fromZigzag64(b, c, a)
    	    })
    	};
    	jspb.BinaryDecoder.prototype.readSplitFixed64 = function (a) {
    	    var b = this.bytes_, c = this.cursor_;
    	    this.cursor_ += 8;
    	    for (var d = 0, e = 0, f = c + 7; f >= c; f--) d = d << 8 | b[f], e = e << 8 | b[f + 4];
    	    return a(d, e)
    	};
    	jspb.BinaryDecoder.prototype.skipVarint = function () {
    	    for (; this.bytes_[this.cursor_] & 128;) this.cursor_++;
    	    this.cursor_++;
    	};
    	jspb.BinaryDecoder.prototype.unskipVarint = function (a) {
    	    for (; 128 < a;) this.cursor_--, a >>>= 7;
    	    this.cursor_--;
    	};
    	jspb.BinaryDecoder.prototype.readUnsignedVarint32 = function () {
    	    var a = this.bytes_;
    	    var b = a[this.cursor_ + 0];
    	    var c = b & 127;
    	    if (128 > b) return this.cursor_ += 1, jspb.asserts.assert(this.cursor_ <= this.end_), c;
    	    b = a[this.cursor_ + 1];
    	    c |= (b & 127) << 7;
    	    if (128 > b) return this.cursor_ += 2, jspb.asserts.assert(this.cursor_ <= this.end_), c;
    	    b = a[this.cursor_ + 2];
    	    c |= (b & 127) << 14;
    	    if (128 > b) return this.cursor_ += 3, jspb.asserts.assert(this.cursor_ <= this.end_), c;
    	    b = a[this.cursor_ + 3];
    	    c |= (b & 127) << 21;
    	    if (128 > b) return this.cursor_ += 4, jspb.asserts.assert(this.cursor_ <=
    	        this.end_), c;
    	    b = a[this.cursor_ + 4];
    	    c |= (b & 15) << 28;
    	    if (128 > b) return this.cursor_ += 5, jspb.asserts.assert(this.cursor_ <= this.end_), c >>> 0;
    	    this.cursor_ += 5;
    	    128 <= a[this.cursor_++] && 128 <= a[this.cursor_++] && 128 <= a[this.cursor_++] && 128 <= a[this.cursor_++] && 128 <= a[this.cursor_++] && jspb.asserts.assert(!1);
    	    jspb.asserts.assert(this.cursor_ <= this.end_);
    	    return c
    	};
    	jspb.BinaryDecoder.prototype.readSignedVarint32 = function () {
    	    return ~~this.readUnsignedVarint32()
    	};
    	jspb.BinaryDecoder.prototype.readUnsignedVarint32String = function () {
    	    return this.readUnsignedVarint32().toString()
    	};
    	jspb.BinaryDecoder.prototype.readSignedVarint32String = function () {
    	    return this.readSignedVarint32().toString()
    	};
    	jspb.BinaryDecoder.prototype.readZigzagVarint32 = function () {
    	    var a = this.readUnsignedVarint32();
    	    return a >>> 1 ^ -(a & 1)
    	};
    	jspb.BinaryDecoder.prototype.readUnsignedVarint64 = function () {
    	    return this.readSplitVarint64(jspb.utils.joinUint64)
    	};
    	jspb.BinaryDecoder.prototype.readUnsignedVarint64String = function () {
    	    return this.readSplitVarint64(jspb.utils.joinUnsignedDecimalString)
    	};
    	jspb.BinaryDecoder.prototype.readSignedVarint64 = function () {
    	    return this.readSplitVarint64(jspb.utils.joinInt64)
    	};
    	jspb.BinaryDecoder.prototype.readSignedVarint64String = function () {
    	    return this.readSplitVarint64(jspb.utils.joinSignedDecimalString)
    	};
    	jspb.BinaryDecoder.prototype.readZigzagVarint64 = function () {
    	    return this.readSplitVarint64(jspb.utils.joinZigzag64)
    	};
    	jspb.BinaryDecoder.prototype.readZigzagVarintHash64 = function () {
    	    return this.readSplitZigzagVarint64(jspb.utils.joinHash64)
    	};
    	jspb.BinaryDecoder.prototype.readZigzagVarint64String = function () {
    	    return this.readSplitZigzagVarint64(jspb.utils.joinSignedDecimalString)
    	};
    	jspb.BinaryDecoder.prototype.readUint8 = function () {
    	    var a = this.bytes_[this.cursor_ + 0];
    	    this.cursor_ += 1;
    	    jspb.asserts.assert(this.cursor_ <= this.end_);
    	    return a
    	};
    	jspb.BinaryDecoder.prototype.readUint16 = function () {
    	    var a = this.bytes_[this.cursor_ + 0], b = this.bytes_[this.cursor_ + 1];
    	    this.cursor_ += 2;
    	    jspb.asserts.assert(this.cursor_ <= this.end_);
    	    return a << 0 | b << 8
    	};
    	jspb.BinaryDecoder.prototype.readUint32 = function () {
    	    var a = this.bytes_[this.cursor_ + 0], b = this.bytes_[this.cursor_ + 1], c = this.bytes_[this.cursor_ + 2],
    	        d = this.bytes_[this.cursor_ + 3];
    	    this.cursor_ += 4;
    	    jspb.asserts.assert(this.cursor_ <= this.end_);
    	    return (a << 0 | b << 8 | c << 16 | d << 24) >>> 0
    	};
    	jspb.BinaryDecoder.prototype.readUint64 = function () {
    	    var a = this.readUint32(), b = this.readUint32();
    	    return jspb.utils.joinUint64(a, b)
    	};
    	jspb.BinaryDecoder.prototype.readUint64String = function () {
    	    var a = this.readUint32(), b = this.readUint32();
    	    return jspb.utils.joinUnsignedDecimalString(a, b)
    	};
    	jspb.BinaryDecoder.prototype.readInt8 = function () {
    	    var a = this.bytes_[this.cursor_ + 0];
    	    this.cursor_ += 1;
    	    jspb.asserts.assert(this.cursor_ <= this.end_);
    	    return a << 24 >> 24
    	};
    	jspb.BinaryDecoder.prototype.readInt16 = function () {
    	    var a = this.bytes_[this.cursor_ + 0], b = this.bytes_[this.cursor_ + 1];
    	    this.cursor_ += 2;
    	    jspb.asserts.assert(this.cursor_ <= this.end_);
    	    return (a << 0 | b << 8) << 16 >> 16
    	};
    	jspb.BinaryDecoder.prototype.readInt32 = function () {
    	    var a = this.bytes_[this.cursor_ + 0], b = this.bytes_[this.cursor_ + 1], c = this.bytes_[this.cursor_ + 2],
    	        d = this.bytes_[this.cursor_ + 3];
    	    this.cursor_ += 4;
    	    jspb.asserts.assert(this.cursor_ <= this.end_);
    	    return a << 0 | b << 8 | c << 16 | d << 24
    	};
    	jspb.BinaryDecoder.prototype.readInt64 = function () {
    	    var a = this.readUint32(), b = this.readUint32();
    	    return jspb.utils.joinInt64(a, b)
    	};
    	jspb.BinaryDecoder.prototype.readInt64String = function () {
    	    var a = this.readUint32(), b = this.readUint32();
    	    return jspb.utils.joinSignedDecimalString(a, b)
    	};
    	jspb.BinaryDecoder.prototype.readFloat = function () {
    	    var a = this.readUint32();
    	    return jspb.utils.joinFloat32(a, 0)
    	};
    	jspb.BinaryDecoder.prototype.readDouble = function () {
    	    var a = this.readUint32(), b = this.readUint32();
    	    return jspb.utils.joinFloat64(a, b)
    	};
    	jspb.BinaryDecoder.prototype.readBool = function () {
    	    return !!this.bytes_[this.cursor_++]
    	};
    	jspb.BinaryDecoder.prototype.readEnum = function () {
    	    return this.readSignedVarint32()
    	};
    	jspb.BinaryDecoder.prototype.readString = function (a) {
    	    var b = this.bytes_, c = this.cursor_;
    	    a = c + a;
    	    for (var d = [], e = ""; c < a;) {
    	        var f = b[c++];
    	        if (128 > f) d.push(f); else if (192 > f) continue; else if (224 > f) {
    	            var g = b[c++];
    	            d.push((f & 31) << 6 | g & 63);
    	        } else if (240 > f) {
    	            g = b[c++];
    	            var h = b[c++];
    	            d.push((f & 15) << 12 | (g & 63) << 6 | h & 63);
    	        } else if (248 > f) {
    	            g = b[c++];
    	            h = b[c++];
    	            var k = b[c++];
    	            f = (f & 7) << 18 | (g & 63) << 12 | (h & 63) << 6 | k & 63;
    	            f -= 65536;
    	            d.push((f >> 10 & 1023) + 55296, (f & 1023) + 56320);
    	        }
    	        8192 <= d.length && (e += String.fromCharCode.apply(null, d), d.length = 0);
    	    }
    	    e += goog.crypt.byteArrayToString(d);
    	    this.cursor_ = c;
    	    return e
    	};
    	jspb.BinaryDecoder.prototype.readStringWithLength = function () {
    	    var a = this.readUnsignedVarint32();
    	    return this.readString(a)
    	};
    	jspb.BinaryDecoder.prototype.readBytes = function (a) {
    	    if (0 > a || this.cursor_ + a > this.bytes_.length) return this.error_ = !0, jspb.asserts.fail("Invalid byte length!"), new Uint8Array(0);
    	    var b = this.bytes_.subarray(this.cursor_, this.cursor_ + a);
    	    this.cursor_ += a;
    	    jspb.asserts.assert(this.cursor_ <= this.end_);
    	    return b
    	};
    	jspb.BinaryDecoder.prototype.readVarintHash64 = function () {
    	    return this.readSplitVarint64(jspb.utils.joinHash64)
    	};
    	jspb.BinaryDecoder.prototype.readFixedHash64 = function () {
    	    var a = this.bytes_, b = this.cursor_, c = a[b + 0], d = a[b + 1], e = a[b + 2], f = a[b + 3], g = a[b + 4],
    	        h = a[b + 5], k = a[b + 6];
    	    a = a[b + 7];
    	    this.cursor_ += 8;
    	    return String.fromCharCode(c, d, e, f, g, h, k, a)
    	};
    	jspb.BinaryReader = function (a, b, c) {
    	    this.decoder_ = jspb.BinaryDecoder.alloc(a, b, c);
    	    this.fieldCursor_ = this.decoder_.getCursor();
    	    this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
    	    this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
    	    this.error_ = !1;
    	    this.readCallbacks_ = null;
    	};
    	jspb.BinaryReader.instanceCache_ = [];
    	jspb.BinaryReader.alloc = function (a, b, c) {
    	    if (jspb.BinaryReader.instanceCache_.length) {
    	        var d = jspb.BinaryReader.instanceCache_.pop();
    	        a && d.decoder_.setBlock(a, b, c);
    	        return d
    	    }
    	    return new jspb.BinaryReader(a, b, c)
    	};
    	jspb.BinaryReader.prototype.alloc = jspb.BinaryReader.alloc;
    	jspb.BinaryReader.prototype.free = function () {
    	    this.decoder_.clear();
    	    this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
    	    this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
    	    this.error_ = !1;
    	    this.readCallbacks_ = null;
    	    100 > jspb.BinaryReader.instanceCache_.length && jspb.BinaryReader.instanceCache_.push(this);
    	};
    	jspb.BinaryReader.prototype.getFieldCursor = function () {
    	    return this.fieldCursor_
    	};
    	jspb.BinaryReader.prototype.getCursor = function () {
    	    return this.decoder_.getCursor()
    	};
    	jspb.BinaryReader.prototype.getBuffer = function () {
    	    return this.decoder_.getBuffer()
    	};
    	jspb.BinaryReader.prototype.getFieldNumber = function () {
    	    return this.nextField_
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "getFieldNumber", jspb.BinaryReader.prototype.getFieldNumber);
    	jspb.BinaryReader.prototype.getWireType = function () {
    	    return this.nextWireType_
    	};
    	jspb.BinaryReader.prototype.isDelimited = function () {
    	    return this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "isDelimited", jspb.BinaryReader.prototype.isDelimited);
    	jspb.BinaryReader.prototype.isEndGroup = function () {
    	    return this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "isEndGroup", jspb.BinaryReader.prototype.isEndGroup);
    	jspb.BinaryReader.prototype.getError = function () {
    	    return this.error_ || this.decoder_.getError()
    	};
    	jspb.BinaryReader.prototype.setBlock = function (a, b, c) {
    	    this.decoder_.setBlock(a, b, c);
    	    this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
    	    this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
    	};
    	jspb.BinaryReader.prototype.reset = function () {
    	    this.decoder_.reset();
    	    this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
    	    this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
    	};
    	jspb.BinaryReader.prototype.advance = function (a) {
    	    this.decoder_.advance(a);
    	};
    	jspb.BinaryReader.prototype.nextField = function () {
    	    if (this.decoder_.atEnd()) return !1;
    	    if (this.getError()) return jspb.asserts.fail("Decoder hit an error"), !1;
    	    this.fieldCursor_ = this.decoder_.getCursor();
    	    var a = this.decoder_.readUnsignedVarint32(), b = a >>> 3;
    	    a &= 7;
    	    if (a != jspb.BinaryConstants.WireType.VARINT && a != jspb.BinaryConstants.WireType.FIXED32 && a != jspb.BinaryConstants.WireType.FIXED64 && a != jspb.BinaryConstants.WireType.DELIMITED && a != jspb.BinaryConstants.WireType.START_GROUP && a != jspb.BinaryConstants.WireType.END_GROUP) return jspb.asserts.fail("Invalid wire type: %s (at position %s)",
    	        a, this.fieldCursor_), this.error_ = !0, !1;
    	    this.nextField_ = b;
    	    this.nextWireType_ = a;
    	    return !0
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "nextField", jspb.BinaryReader.prototype.nextField);
    	jspb.BinaryReader.prototype.unskipHeader = function () {
    	    this.decoder_.unskipVarint(this.nextField_ << 3 | this.nextWireType_);
    	};
    	jspb.BinaryReader.prototype.skipMatchingFields = function () {
    	    var a = this.nextField_;
    	    for (this.unskipHeader(); this.nextField() && this.getFieldNumber() == a;) this.skipField();
    	    this.decoder_.atEnd() || this.unskipHeader();
    	};
    	jspb.BinaryReader.prototype.skipVarintField = function () {
    	    this.nextWireType_ != jspb.BinaryConstants.WireType.VARINT ? (jspb.asserts.fail("Invalid wire type for skipVarintField"), this.skipField()) : this.decoder_.skipVarint();
    	};
    	jspb.BinaryReader.prototype.skipDelimitedField = function () {
    	    if (this.nextWireType_ != jspb.BinaryConstants.WireType.DELIMITED) jspb.asserts.fail("Invalid wire type for skipDelimitedField"), this.skipField(); else {
    	        var a = this.decoder_.readUnsignedVarint32();
    	        this.decoder_.advance(a);
    	    }
    	};
    	jspb.BinaryReader.prototype.skipFixed32Field = function () {
    	    this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED32 ? (jspb.asserts.fail("Invalid wire type for skipFixed32Field"), this.skipField()) : this.decoder_.advance(4);
    	};
    	jspb.BinaryReader.prototype.skipFixed64Field = function () {
    	    this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED64 ? (jspb.asserts.fail("Invalid wire type for skipFixed64Field"), this.skipField()) : this.decoder_.advance(8);
    	};
    	jspb.BinaryReader.prototype.skipGroup = function () {
    	    var a = this.nextField_;
    	    do {
    	        if (!this.nextField()) {
    	            jspb.asserts.fail("Unmatched start-group tag: stream EOF");
    	            this.error_ = !0;
    	            break
    	        }
    	        if (this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP) {
    	            this.nextField_ != a && (jspb.asserts.fail("Unmatched end-group tag"), this.error_ = !0);
    	            break
    	        }
    	        this.skipField();
    	    } while (1)
    	};
    	jspb.BinaryReader.prototype.skipField = function () {
    	    switch (this.nextWireType_) {
    	        case jspb.BinaryConstants.WireType.VARINT:
    	            this.skipVarintField();
    	            break;
    	        case jspb.BinaryConstants.WireType.FIXED64:
    	            this.skipFixed64Field();
    	            break;
    	        case jspb.BinaryConstants.WireType.DELIMITED:
    	            this.skipDelimitedField();
    	            break;
    	        case jspb.BinaryConstants.WireType.FIXED32:
    	            this.skipFixed32Field();
    	            break;
    	        case jspb.BinaryConstants.WireType.START_GROUP:
    	            this.skipGroup();
    	            break;
    	        default:
    	            jspb.asserts.fail("Invalid wire encoding for field.");
    	    }
    	};
    	jspb.BinaryReader.prototype.registerReadCallback = function (a, b) {
    	    null === this.readCallbacks_ && (this.readCallbacks_ = {});
    	    jspb.asserts.assert(!this.readCallbacks_[a]);
    	    this.readCallbacks_[a] = b;
    	};
    	jspb.BinaryReader.prototype.runReadCallback = function (a) {
    	    jspb.asserts.assert(null !== this.readCallbacks_);
    	    a = this.readCallbacks_[a];
    	    jspb.asserts.assert(a);
    	    return a(this)
    	};
    	jspb.BinaryReader.prototype.readAny = function (a) {
    	    this.nextWireType_ = jspb.BinaryConstants.FieldTypeToWireType(a);
    	    var b = jspb.BinaryConstants.FieldType;
    	    switch (a) {
    	        case b.DOUBLE:
    	            return this.readDouble();
    	        case b.FLOAT:
    	            return this.readFloat();
    	        case b.INT64:
    	            return this.readInt64();
    	        case b.UINT64:
    	            return this.readUint64();
    	        case b.INT32:
    	            return this.readInt32();
    	        case b.FIXED64:
    	            return this.readFixed64();
    	        case b.FIXED32:
    	            return this.readFixed32();
    	        case b.BOOL:
    	            return this.readBool();
    	        case b.STRING:
    	            return this.readString();
    	        case b.GROUP:
    	            jspb.asserts.fail("Group field type not supported in readAny()");
    	        case b.MESSAGE:
    	            jspb.asserts.fail("Message field type not supported in readAny()");
    	        case b.BYTES:
    	            return this.readBytes();
    	        case b.UINT32:
    	            return this.readUint32();
    	        case b.ENUM:
    	            return this.readEnum();
    	        case b.SFIXED32:
    	            return this.readSfixed32();
    	        case b.SFIXED64:
    	            return this.readSfixed64();
    	        case b.SINT32:
    	            return this.readSint32();
    	        case b.SINT64:
    	            return this.readSint64();
    	        case b.FHASH64:
    	            return this.readFixedHash64();
    	        case b.VHASH64:
    	            return this.readVarintHash64();
    	        default:
    	            jspb.asserts.fail("Invalid field type in readAny()");
    	    }
    	    return 0
    	};
    	jspb.BinaryReader.prototype.readMessage = function (a, b) {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
    	    var c = this.decoder_.getEnd(), d = this.decoder_.readUnsignedVarint32();
    	    d = this.decoder_.getCursor() + d;
    	    this.decoder_.setEnd(d);
    	    b(a, this);
    	    this.decoder_.setCursor(d);
    	    this.decoder_.setEnd(c);
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readMessage", jspb.BinaryReader.prototype.readMessage);
    	jspb.BinaryReader.prototype.readGroup = function (a, b, c) {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.START_GROUP);
    	    jspb.asserts.assert(this.nextField_ == a);
    	    c(b, this);
    	    this.error_ || this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP || (jspb.asserts.fail("Group submessage did not end with an END_GROUP tag"), this.error_ = !0);
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readGroup", jspb.BinaryReader.prototype.readGroup);
    	jspb.BinaryReader.prototype.getFieldDecoder = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
    	    var a = this.decoder_.readUnsignedVarint32(), b = this.decoder_.getCursor(), c = b + a;
    	    a = jspb.BinaryDecoder.alloc(this.decoder_.getBuffer(), b, a);
    	    this.decoder_.setCursor(c);
    	    return a
    	};
    	jspb.BinaryReader.prototype.readInt32 = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
    	    return this.decoder_.readSignedVarint32()
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readInt32", jspb.BinaryReader.prototype.readInt32);
    	jspb.BinaryReader.prototype.readInt32String = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
    	    return this.decoder_.readSignedVarint32String()
    	};
    	jspb.BinaryReader.prototype.readInt64 = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
    	    return this.decoder_.readSignedVarint64()
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readInt64", jspb.BinaryReader.prototype.readInt64);
    	jspb.BinaryReader.prototype.readInt64String = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
    	    return this.decoder_.readSignedVarint64String()
    	};
    	jspb.BinaryReader.prototype.readUint32 = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
    	    return this.decoder_.readUnsignedVarint32()
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readUint32", jspb.BinaryReader.prototype.readUint32);
    	jspb.BinaryReader.prototype.readUint32String = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
    	    return this.decoder_.readUnsignedVarint32String()
    	};
    	jspb.BinaryReader.prototype.readUint64 = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
    	    return this.decoder_.readUnsignedVarint64()
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readUint64", jspb.BinaryReader.prototype.readUint64);
    	jspb.BinaryReader.prototype.readUint64String = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
    	    return this.decoder_.readUnsignedVarint64String()
    	};
    	jspb.BinaryReader.prototype.readSint32 = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
    	    return this.decoder_.readZigzagVarint32()
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readSint32", jspb.BinaryReader.prototype.readSint32);
    	jspb.BinaryReader.prototype.readSint64 = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
    	    return this.decoder_.readZigzagVarint64()
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readSint64", jspb.BinaryReader.prototype.readSint64);
    	jspb.BinaryReader.prototype.readSint64String = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
    	    return this.decoder_.readZigzagVarint64String()
    	};
    	jspb.BinaryReader.prototype.readFixed32 = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
    	    return this.decoder_.readUint32()
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readFixed32", jspb.BinaryReader.prototype.readFixed32);
    	jspb.BinaryReader.prototype.readFixed64 = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
    	    return this.decoder_.readUint64()
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readFixed64", jspb.BinaryReader.prototype.readFixed64);
    	jspb.BinaryReader.prototype.readFixed64String = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
    	    return this.decoder_.readUint64String()
    	};
    	jspb.BinaryReader.prototype.readSfixed32 = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
    	    return this.decoder_.readInt32()
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readSfixed32", jspb.BinaryReader.prototype.readSfixed32);
    	jspb.BinaryReader.prototype.readSfixed32String = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
    	    return this.decoder_.readInt32().toString()
    	};
    	jspb.BinaryReader.prototype.readSfixed64 = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
    	    return this.decoder_.readInt64()
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readSfixed64", jspb.BinaryReader.prototype.readSfixed64);
    	jspb.BinaryReader.prototype.readSfixed64String = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
    	    return this.decoder_.readInt64String()
    	};
    	jspb.BinaryReader.prototype.readFloat = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
    	    return this.decoder_.readFloat()
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readFloat", jspb.BinaryReader.prototype.readFloat);
    	jspb.BinaryReader.prototype.readDouble = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
    	    return this.decoder_.readDouble()
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readDouble", jspb.BinaryReader.prototype.readDouble);
    	jspb.BinaryReader.prototype.readBool = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
    	    return !!this.decoder_.readUnsignedVarint32()
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readBool", jspb.BinaryReader.prototype.readBool);
    	jspb.BinaryReader.prototype.readEnum = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
    	    return this.decoder_.readSignedVarint64()
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readEnum", jspb.BinaryReader.prototype.readEnum);
    	jspb.BinaryReader.prototype.readString = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
    	    var a = this.decoder_.readUnsignedVarint32();
    	    return this.decoder_.readString(a)
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readString", jspb.BinaryReader.prototype.readString);
    	jspb.BinaryReader.prototype.readBytes = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
    	    var a = this.decoder_.readUnsignedVarint32();
    	    return this.decoder_.readBytes(a)
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readBytes", jspb.BinaryReader.prototype.readBytes);
    	jspb.BinaryReader.prototype.readVarintHash64 = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
    	    return this.decoder_.readVarintHash64()
    	};
    	jspb.BinaryReader.prototype.readSintHash64 = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
    	    return this.decoder_.readZigzagVarintHash64()
    	};
    	jspb.BinaryReader.prototype.readSplitVarint64 = function (a) {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
    	    return this.decoder_.readSplitVarint64(a)
    	};
    	jspb.BinaryReader.prototype.readSplitZigzagVarint64 = function (a) {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
    	    return this.decoder_.readSplitVarint64(function (b, c) {
    	        return jspb.utils.fromZigzag64(b, c, a)
    	    })
    	};
    	jspb.BinaryReader.prototype.readFixedHash64 = function () {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
    	    return this.decoder_.readFixedHash64()
    	};
    	jspb.BinaryReader.prototype.readSplitFixed64 = function (a) {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
    	    return this.decoder_.readSplitFixed64(a)
    	};
    	jspb.BinaryReader.prototype.readPackedField_ = function (a) {
    	    jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
    	    var b = this.decoder_.readUnsignedVarint32();
    	    b = this.decoder_.getCursor() + b;
    	    for (var c = []; this.decoder_.getCursor() < b;) c.push(a.call(this.decoder_));
    	    return c
    	};
    	jspb.BinaryReader.prototype.readPackedInt32 = function () {
    	    return this.readPackedField_(this.decoder_.readSignedVarint32)
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readPackedInt32", jspb.BinaryReader.prototype.readPackedInt32);
    	jspb.BinaryReader.prototype.readPackedInt32String = function () {
    	    return this.readPackedField_(this.decoder_.readSignedVarint32String)
    	};
    	jspb.BinaryReader.prototype.readPackedInt64 = function () {
    	    return this.readPackedField_(this.decoder_.readSignedVarint64)
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readPackedInt64", jspb.BinaryReader.prototype.readPackedInt64);
    	jspb.BinaryReader.prototype.readPackedInt64String = function () {
    	    return this.readPackedField_(this.decoder_.readSignedVarint64String)
    	};
    	jspb.BinaryReader.prototype.readPackedUint32 = function () {
    	    return this.readPackedField_(this.decoder_.readUnsignedVarint32)
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readPackedUint32", jspb.BinaryReader.prototype.readPackedUint32);
    	jspb.BinaryReader.prototype.readPackedUint32String = function () {
    	    return this.readPackedField_(this.decoder_.readUnsignedVarint32String)
    	};
    	jspb.BinaryReader.prototype.readPackedUint64 = function () {
    	    return this.readPackedField_(this.decoder_.readUnsignedVarint64)
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readPackedUint64", jspb.BinaryReader.prototype.readPackedUint64);
    	jspb.BinaryReader.prototype.readPackedUint64String = function () {
    	    return this.readPackedField_(this.decoder_.readUnsignedVarint64String)
    	};
    	jspb.BinaryReader.prototype.readPackedSint32 = function () {
    	    return this.readPackedField_(this.decoder_.readZigzagVarint32)
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readPackedSint32", jspb.BinaryReader.prototype.readPackedSint32);
    	jspb.BinaryReader.prototype.readPackedSint64 = function () {
    	    return this.readPackedField_(this.decoder_.readZigzagVarint64)
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readPackedSint64", jspb.BinaryReader.prototype.readPackedSint64);
    	jspb.BinaryReader.prototype.readPackedSint64String = function () {
    	    return this.readPackedField_(this.decoder_.readZigzagVarint64String)
    	};
    	jspb.BinaryReader.prototype.readPackedFixed32 = function () {
    	    return this.readPackedField_(this.decoder_.readUint32)
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readPackedFixed32", jspb.BinaryReader.prototype.readPackedFixed32);
    	jspb.BinaryReader.prototype.readPackedFixed64 = function () {
    	    return this.readPackedField_(this.decoder_.readUint64)
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readPackedFixed64", jspb.BinaryReader.prototype.readPackedFixed64);
    	jspb.BinaryReader.prototype.readPackedFixed64String = function () {
    	    return this.readPackedField_(this.decoder_.readUint64String)
    	};
    	jspb.BinaryReader.prototype.readPackedSfixed32 = function () {
    	    return this.readPackedField_(this.decoder_.readInt32)
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readPackedSfixed32", jspb.BinaryReader.prototype.readPackedSfixed32);
    	jspb.BinaryReader.prototype.readPackedSfixed64 = function () {
    	    return this.readPackedField_(this.decoder_.readInt64)
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readPackedSfixed64", jspb.BinaryReader.prototype.readPackedSfixed64);
    	jspb.BinaryReader.prototype.readPackedSfixed64String = function () {
    	    return this.readPackedField_(this.decoder_.readInt64String)
    	};
    	jspb.BinaryReader.prototype.readPackedFloat = function () {
    	    return this.readPackedField_(this.decoder_.readFloat)
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readPackedFloat", jspb.BinaryReader.prototype.readPackedFloat);
    	jspb.BinaryReader.prototype.readPackedDouble = function () {
    	    return this.readPackedField_(this.decoder_.readDouble)
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readPackedDouble", jspb.BinaryReader.prototype.readPackedDouble);
    	jspb.BinaryReader.prototype.readPackedBool = function () {
    	    return this.readPackedField_(this.decoder_.readBool)
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readPackedBool", jspb.BinaryReader.prototype.readPackedBool);
    	jspb.BinaryReader.prototype.readPackedEnum = function () {
    	    return this.readPackedField_(this.decoder_.readEnum)
    	};
    	goog.exportProperty(jspb.BinaryReader.prototype, "readPackedEnum", jspb.BinaryReader.prototype.readPackedEnum);
    	jspb.BinaryReader.prototype.readPackedVarintHash64 = function () {
    	    return this.readPackedField_(this.decoder_.readVarintHash64)
    	};
    	jspb.BinaryReader.prototype.readPackedFixedHash64 = function () {
    	    return this.readPackedField_(this.decoder_.readFixedHash64)
    	};
    	jspb.BinaryEncoder = function () {
    	    this.buffer_ = [];
    	};
    	jspb.BinaryEncoder.prototype.length = function () {
    	    return this.buffer_.length
    	};
    	jspb.BinaryEncoder.prototype.end = function () {
    	    var a = this.buffer_;
    	    this.buffer_ = [];
    	    return a
    	};
    	jspb.BinaryEncoder.prototype.writeSplitVarint64 = function (a, b) {
    	    jspb.asserts.assert(a == Math.floor(a));
    	    jspb.asserts.assert(b == Math.floor(b));
    	    jspb.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_32);
    	    for (jspb.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32); 0 < b || 127 < a;) this.buffer_.push(a & 127 | 128), a = (a >>> 7 | b << 25) >>> 0, b >>>= 7;
    	    this.buffer_.push(a);
    	};
    	jspb.BinaryEncoder.prototype.writeSplitFixed64 = function (a, b) {
    	    jspb.asserts.assert(a == Math.floor(a));
    	    jspb.asserts.assert(b == Math.floor(b));
    	    jspb.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_32);
    	    jspb.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32);
    	    this.writeUint32(a);
    	    this.writeUint32(b);
    	};
    	jspb.BinaryEncoder.prototype.writeUnsignedVarint32 = function (a) {
    	    jspb.asserts.assert(a == Math.floor(a));
    	    for (jspb.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_32); 127 < a;) this.buffer_.push(a & 127 | 128), a >>>= 7;
    	    this.buffer_.push(a);
    	};
    	jspb.BinaryEncoder.prototype.writeSignedVarint32 = function (a) {
    	    jspb.asserts.assert(a == Math.floor(a));
    	    jspb.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_31 && a < jspb.BinaryConstants.TWO_TO_31);
    	    if (0 <= a) this.writeUnsignedVarint32(a); else {
    	        for (var b = 0; 9 > b; b++) this.buffer_.push(a & 127 | 128), a >>= 7;
    	        this.buffer_.push(1);
    	    }
    	};
    	jspb.BinaryEncoder.prototype.writeUnsignedVarint64 = function (a) {
    	    jspb.asserts.assert(a == Math.floor(a));
    	    jspb.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_64);
    	    jspb.utils.splitInt64(a);
    	    this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
    	};
    	jspb.BinaryEncoder.prototype.writeSignedVarint64 = function (a) {
    	    jspb.asserts.assert(a == Math.floor(a));
    	    jspb.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_63 && a < jspb.BinaryConstants.TWO_TO_63);
    	    jspb.utils.splitInt64(a);
    	    this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
    	};
    	jspb.BinaryEncoder.prototype.writeZigzagVarint32 = function (a) {
    	    jspb.asserts.assert(a == Math.floor(a));
    	    jspb.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_31 && a < jspb.BinaryConstants.TWO_TO_31);
    	    this.writeUnsignedVarint32((a << 1 ^ a >> 31) >>> 0);
    	};
    	jspb.BinaryEncoder.prototype.writeZigzagVarint64 = function (a) {
    	    jspb.asserts.assert(a == Math.floor(a));
    	    jspb.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_63 && a < jspb.BinaryConstants.TWO_TO_63);
    	    jspb.utils.splitZigzag64(a);
    	    this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
    	};
    	jspb.BinaryEncoder.prototype.writeZigzagVarint64String = function (a) {
    	    this.writeZigzagVarintHash64(jspb.utils.decimalStringToHash64(a));
    	};
    	jspb.BinaryEncoder.prototype.writeZigzagVarintHash64 = function (a) {
    	    var b = this;
    	    jspb.utils.splitHash64(a);
    	    jspb.utils.toZigzag64(jspb.utils.split64Low, jspb.utils.split64High, function (a, d) {
    	        b.writeSplitVarint64(a >>> 0, d >>> 0);
    	    });
    	};
    	jspb.BinaryEncoder.prototype.writeUint8 = function (a) {
    	    jspb.asserts.assert(a == Math.floor(a));
    	    jspb.asserts.assert(0 <= a && 256 > a);
    	    this.buffer_.push(a >>> 0 & 255);
    	};
    	jspb.BinaryEncoder.prototype.writeUint16 = function (a) {
    	    jspb.asserts.assert(a == Math.floor(a));
    	    jspb.asserts.assert(0 <= a && 65536 > a);
    	    this.buffer_.push(a >>> 0 & 255);
    	    this.buffer_.push(a >>> 8 & 255);
    	};
    	jspb.BinaryEncoder.prototype.writeUint32 = function (a) {
    	    jspb.asserts.assert(a == Math.floor(a));
    	    jspb.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_32);
    	    this.buffer_.push(a >>> 0 & 255);
    	    this.buffer_.push(a >>> 8 & 255);
    	    this.buffer_.push(a >>> 16 & 255);
    	    this.buffer_.push(a >>> 24 & 255);
    	};
    	jspb.BinaryEncoder.prototype.writeUint64 = function (a) {
    	    jspb.asserts.assert(a == Math.floor(a));
    	    jspb.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_64);
    	    jspb.utils.splitUint64(a);
    	    this.writeUint32(jspb.utils.split64Low);
    	    this.writeUint32(jspb.utils.split64High);
    	};
    	jspb.BinaryEncoder.prototype.writeInt8 = function (a) {
    	    jspb.asserts.assert(a == Math.floor(a));
    	    jspb.asserts.assert(-128 <= a && 128 > a);
    	    this.buffer_.push(a >>> 0 & 255);
    	};
    	jspb.BinaryEncoder.prototype.writeInt16 = function (a) {
    	    jspb.asserts.assert(a == Math.floor(a));
    	    jspb.asserts.assert(-32768 <= a && 32768 > a);
    	    this.buffer_.push(a >>> 0 & 255);
    	    this.buffer_.push(a >>> 8 & 255);
    	};
    	jspb.BinaryEncoder.prototype.writeInt32 = function (a) {
    	    jspb.asserts.assert(a == Math.floor(a));
    	    jspb.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_31 && a < jspb.BinaryConstants.TWO_TO_31);
    	    this.buffer_.push(a >>> 0 & 255);
    	    this.buffer_.push(a >>> 8 & 255);
    	    this.buffer_.push(a >>> 16 & 255);
    	    this.buffer_.push(a >>> 24 & 255);
    	};
    	jspb.BinaryEncoder.prototype.writeInt64 = function (a) {
    	    jspb.asserts.assert(a == Math.floor(a));
    	    jspb.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_63 && a < jspb.BinaryConstants.TWO_TO_63);
    	    jspb.utils.splitInt64(a);
    	    this.writeSplitFixed64(jspb.utils.split64Low, jspb.utils.split64High);
    	};
    	jspb.BinaryEncoder.prototype.writeInt64String = function (a) {
    	    jspb.asserts.assert(a == Math.floor(a));
    	    jspb.asserts.assert(+a >= -jspb.BinaryConstants.TWO_TO_63 && +a < jspb.BinaryConstants.TWO_TO_63);
    	    jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(a));
    	    this.writeSplitFixed64(jspb.utils.split64Low, jspb.utils.split64High);
    	};
    	jspb.BinaryEncoder.prototype.writeFloat = function (a) {
    	    jspb.asserts.assert(Infinity === a || -Infinity === a || isNaN(a) || a >= -jspb.BinaryConstants.FLOAT32_MAX && a <= jspb.BinaryConstants.FLOAT32_MAX);
    	    jspb.utils.splitFloat32(a);
    	    this.writeUint32(jspb.utils.split64Low);
    	};
    	jspb.BinaryEncoder.prototype.writeDouble = function (a) {
    	    jspb.asserts.assert(Infinity === a || -Infinity === a || isNaN(a) || a >= -jspb.BinaryConstants.FLOAT64_MAX && a <= jspb.BinaryConstants.FLOAT64_MAX);
    	    jspb.utils.splitFloat64(a);
    	    this.writeUint32(jspb.utils.split64Low);
    	    this.writeUint32(jspb.utils.split64High);
    	};
    	jspb.BinaryEncoder.prototype.writeBool = function (a) {
    	    jspb.asserts.assert("boolean" === typeof a || "number" === typeof a);
    	    this.buffer_.push(a ? 1 : 0);
    	};
    	jspb.BinaryEncoder.prototype.writeEnum = function (a) {
    	    jspb.asserts.assert(a == Math.floor(a));
    	    jspb.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_31 && a < jspb.BinaryConstants.TWO_TO_31);
    	    this.writeSignedVarint32(a);
    	};
    	jspb.BinaryEncoder.prototype.writeBytes = function (a) {
    	    this.buffer_.push.apply(this.buffer_, a);
    	};
    	jspb.BinaryEncoder.prototype.writeVarintHash64 = function (a) {
    	    jspb.utils.splitHash64(a);
    	    this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
    	};
    	jspb.BinaryEncoder.prototype.writeFixedHash64 = function (a) {
    	    jspb.utils.splitHash64(a);
    	    this.writeUint32(jspb.utils.split64Low);
    	    this.writeUint32(jspb.utils.split64High);
    	};
    	jspb.BinaryEncoder.prototype.writeString = function (a) {
    	    var b = this.buffer_.length;
    	    jspb.asserts.assertString(a);
    	    for (var c = 0; c < a.length; c++) {
    	        var d = a.charCodeAt(c);
    	        if (128 > d) this.buffer_.push(d); else if (2048 > d) this.buffer_.push(d >> 6 | 192), this.buffer_.push(d & 63 | 128); else if (65536 > d) if (55296 <= d && 56319 >= d && c + 1 < a.length) {
    	            var e = a.charCodeAt(c + 1);
    	            56320 <= e && 57343 >= e && (d = 1024 * (d - 55296) + e - 56320 + 65536, this.buffer_.push(d >> 18 | 240), this.buffer_.push(d >> 12 & 63 | 128), this.buffer_.push(d >> 6 & 63 | 128), this.buffer_.push(d & 63 |
    	                128), c++);
    	        } else this.buffer_.push(d >> 12 | 224), this.buffer_.push(d >> 6 & 63 | 128), this.buffer_.push(d & 63 | 128);
    	    }
    	    return this.buffer_.length - b
    	};
    	jspb.arith = {};
    	jspb.arith.UInt64 = function (a, b) {
    	    this.lo = a;
    	    this.hi = b;
    	};
    	jspb.arith.UInt64.prototype.cmp = function (a) {
    	    return this.hi < a.hi || this.hi == a.hi && this.lo < a.lo ? -1 : this.hi == a.hi && this.lo == a.lo ? 0 : 1
    	};
    	jspb.arith.UInt64.prototype.rightShift = function () {
    	    return new jspb.arith.UInt64((this.lo >>> 1 | (this.hi & 1) << 31) >>> 0, this.hi >>> 1 >>> 0)
    	};
    	jspb.arith.UInt64.prototype.leftShift = function () {
    	    return new jspb.arith.UInt64(this.lo << 1 >>> 0, (this.hi << 1 | this.lo >>> 31) >>> 0)
    	};
    	jspb.arith.UInt64.prototype.msb = function () {
    	    return !!(this.hi & 2147483648)
    	};
    	jspb.arith.UInt64.prototype.lsb = function () {
    	    return !!(this.lo & 1)
    	};
    	jspb.arith.UInt64.prototype.zero = function () {
    	    return 0 == this.lo && 0 == this.hi
    	};
    	jspb.arith.UInt64.prototype.add = function (a) {
    	    return new jspb.arith.UInt64((this.lo + a.lo & 4294967295) >>> 0 >>> 0, ((this.hi + a.hi & 4294967295) >>> 0) + (4294967296 <= this.lo + a.lo ? 1 : 0) >>> 0)
    	};
    	jspb.arith.UInt64.prototype.sub = function (a) {
    	    return new jspb.arith.UInt64((this.lo - a.lo & 4294967295) >>> 0 >>> 0, ((this.hi - a.hi & 4294967295) >>> 0) - (0 > this.lo - a.lo ? 1 : 0) >>> 0)
    	};
    	jspb.arith.UInt64.mul32x32 = function (a, b) {
    	    var c = a & 65535;
    	    a >>>= 16;
    	    var d = b & 65535, e = b >>> 16;
    	    b = c * d + 65536 * (c * e & 65535) + 65536 * (a * d & 65535);
    	    for (c = a * e + (c * e >>> 16) + (a * d >>> 16); 4294967296 <= b;) b -= 4294967296, c += 1;
    	    return new jspb.arith.UInt64(b >>> 0, c >>> 0)
    	};
    	jspb.arith.UInt64.prototype.mul = function (a) {
    	    var b = jspb.arith.UInt64.mul32x32(this.lo, a);
    	    a = jspb.arith.UInt64.mul32x32(this.hi, a);
    	    a.hi = a.lo;
    	    a.lo = 0;
    	    return b.add(a)
    	};
    	jspb.arith.UInt64.prototype.div = function (a) {
    	    if (0 == a) return [];
    	    var b = new jspb.arith.UInt64(0, 0), c = new jspb.arith.UInt64(this.lo, this.hi);
    	    a = new jspb.arith.UInt64(a, 0);
    	    for (var d = new jspb.arith.UInt64(1, 0); !a.msb();) a = a.leftShift(), d = d.leftShift();
    	    for (; !d.zero();) 0 >= a.cmp(c) && (b = b.add(d), c = c.sub(a)), a = a.rightShift(), d = d.rightShift();
    	    return [b, c]
    	};
    	jspb.arith.UInt64.prototype.toString = function () {
    	    for (var a = "", b = this; !b.zero();) {
    	        b = b.div(10);
    	        var c = b[0];
    	        a = b[1].lo + a;
    	        b = c;
    	    }
    	    "" == a && (a = "0");
    	    return a
    	};
    	jspb.arith.UInt64.fromString = function (a) {
    	    for (var b = new jspb.arith.UInt64(0, 0), c = new jspb.arith.UInt64(0, 0), d = 0; d < a.length; d++) {
    	        if ("0" > a[d] || "9" < a[d]) return null;
    	        var e = parseInt(a[d], 10);
    	        c.lo = e;
    	        b = b.mul(10).add(c);
    	    }
    	    return b
    	};
    	jspb.arith.UInt64.prototype.clone = function () {
    	    return new jspb.arith.UInt64(this.lo, this.hi)
    	};
    	jspb.arith.Int64 = function (a, b) {
    	    this.lo = a;
    	    this.hi = b;
    	};
    	jspb.arith.Int64.prototype.add = function (a) {
    	    return new jspb.arith.Int64((this.lo + a.lo & 4294967295) >>> 0 >>> 0, ((this.hi + a.hi & 4294967295) >>> 0) + (4294967296 <= this.lo + a.lo ? 1 : 0) >>> 0)
    	};
    	jspb.arith.Int64.prototype.sub = function (a) {
    	    return new jspb.arith.Int64((this.lo - a.lo & 4294967295) >>> 0 >>> 0, ((this.hi - a.hi & 4294967295) >>> 0) - (0 > this.lo - a.lo ? 1 : 0) >>> 0)
    	};
    	jspb.arith.Int64.prototype.clone = function () {
    	    return new jspb.arith.Int64(this.lo, this.hi)
    	};
    	jspb.arith.Int64.prototype.toString = function () {
    	    var a = 0 != (this.hi & 2147483648), b = new jspb.arith.UInt64(this.lo, this.hi);
    	    a && (b = (new jspb.arith.UInt64(0, 0)).sub(b));
    	    return (a ? "-" : "") + b.toString()
    	};
    	jspb.arith.Int64.fromString = function (a) {
    	    var b = 0 < a.length && "-" == a[0];
    	    b && (a = a.substring(1));
    	    a = jspb.arith.UInt64.fromString(a);
    	    if (null === a) return null;
    	    b && (a = (new jspb.arith.UInt64(0, 0)).sub(a));
    	    return new jspb.arith.Int64(a.lo, a.hi)
    	};
    	jspb.BinaryWriter = function () {
    	    this.blocks_ = [];
    	    this.totalLength_ = 0;
    	    this.encoder_ = new jspb.BinaryEncoder;
    	    this.bookmarks_ = [];
    	};
    	jspb.BinaryWriter.prototype.appendUint8Array_ = function (a) {
    	    var b = this.encoder_.end();
    	    this.blocks_.push(b);
    	    this.blocks_.push(a);
    	    this.totalLength_ += b.length + a.length;
    	};
    	jspb.BinaryWriter.prototype.beginDelimited_ = function (a) {
    	    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
    	    a = this.encoder_.end();
    	    this.blocks_.push(a);
    	    this.totalLength_ += a.length;
    	    a.push(this.totalLength_);
    	    return a
    	};
    	jspb.BinaryWriter.prototype.endDelimited_ = function (a) {
    	    var b = a.pop();
    	    b = this.totalLength_ + this.encoder_.length() - b;
    	    for (jspb.asserts.assert(0 <= b); 127 < b;) a.push(b & 127 | 128), b >>>= 7, this.totalLength_++;
    	    a.push(b);
    	    this.totalLength_++;
    	};
    	jspb.BinaryWriter.prototype.writeSerializedMessage = function (a, b, c) {
    	    this.appendUint8Array_(a.subarray(b, c));
    	};
    	jspb.BinaryWriter.prototype.maybeWriteSerializedMessage = function (a, b, c) {
    	    null != a && null != b && null != c && this.writeSerializedMessage(a, b, c);
    	};
    	jspb.BinaryWriter.prototype.reset = function () {
    	    this.blocks_ = [];
    	    this.encoder_.end();
    	    this.totalLength_ = 0;
    	    this.bookmarks_ = [];
    	};
    	jspb.BinaryWriter.prototype.getResultBuffer = function () {
    	    jspb.asserts.assert(0 == this.bookmarks_.length);
    	    for (var a = new Uint8Array(this.totalLength_ + this.encoder_.length()), b = this.blocks_, c = b.length, d = 0, e = 0; e < c; e++) {
    	        var f = b[e];
    	        a.set(f, d);
    	        d += f.length;
    	    }
    	    b = this.encoder_.end();
    	    a.set(b, d);
    	    d += b.length;
    	    jspb.asserts.assert(d == a.length);
    	    this.blocks_ = [a];
    	    return a
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "getResultBuffer", jspb.BinaryWriter.prototype.getResultBuffer);
    	jspb.BinaryWriter.prototype.getResultBase64String = function (a) {
    	    return goog.crypt.base64.encodeByteArray(this.getResultBuffer(), a)
    	};
    	jspb.BinaryWriter.prototype.beginSubMessage = function (a) {
    	    this.bookmarks_.push(this.beginDelimited_(a));
    	};
    	jspb.BinaryWriter.prototype.endSubMessage = function () {
    	    jspb.asserts.assert(0 <= this.bookmarks_.length);
    	    this.endDelimited_(this.bookmarks_.pop());
    	};
    	jspb.BinaryWriter.prototype.writeFieldHeader_ = function (a, b) {
    	    jspb.asserts.assert(1 <= a && a == Math.floor(a));
    	    this.encoder_.writeUnsignedVarint32(8 * a + b);
    	};
    	jspb.BinaryWriter.prototype.writeAny = function (a, b, c) {
    	    var d = jspb.BinaryConstants.FieldType;
    	    switch (a) {
    	        case d.DOUBLE:
    	            this.writeDouble(b, c);
    	            break;
    	        case d.FLOAT:
    	            this.writeFloat(b, c);
    	            break;
    	        case d.INT64:
    	            this.writeInt64(b, c);
    	            break;
    	        case d.UINT64:
    	            this.writeUint64(b, c);
    	            break;
    	        case d.INT32:
    	            this.writeInt32(b, c);
    	            break;
    	        case d.FIXED64:
    	            this.writeFixed64(b, c);
    	            break;
    	        case d.FIXED32:
    	            this.writeFixed32(b, c);
    	            break;
    	        case d.BOOL:
    	            this.writeBool(b, c);
    	            break;
    	        case d.STRING:
    	            this.writeString(b, c);
    	            break;
    	        case d.GROUP:
    	            jspb.asserts.fail("Group field type not supported in writeAny()");
    	            break;
    	        case d.MESSAGE:
    	            jspb.asserts.fail("Message field type not supported in writeAny()");
    	            break;
    	        case d.BYTES:
    	            this.writeBytes(b, c);
    	            break;
    	        case d.UINT32:
    	            this.writeUint32(b, c);
    	            break;
    	        case d.ENUM:
    	            this.writeEnum(b, c);
    	            break;
    	        case d.SFIXED32:
    	            this.writeSfixed32(b, c);
    	            break;
    	        case d.SFIXED64:
    	            this.writeSfixed64(b, c);
    	            break;
    	        case d.SINT32:
    	            this.writeSint32(b, c);
    	            break;
    	        case d.SINT64:
    	            this.writeSint64(b, c);
    	            break;
    	        case d.FHASH64:
    	            this.writeFixedHash64(b, c);
    	            break;
    	        case d.VHASH64:
    	            this.writeVarintHash64(b, c);
    	            break;
    	        default:
    	            jspb.asserts.fail("Invalid field type in writeAny()");
    	    }
    	};
    	jspb.BinaryWriter.prototype.writeUnsignedVarint32_ = function (a, b) {
    	    null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeUnsignedVarint32(b));
    	};
    	jspb.BinaryWriter.prototype.writeSignedVarint32_ = function (a, b) {
    	    null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint32(b));
    	};
    	jspb.BinaryWriter.prototype.writeUnsignedVarint64_ = function (a, b) {
    	    null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeUnsignedVarint64(b));
    	};
    	jspb.BinaryWriter.prototype.writeSignedVarint64_ = function (a, b) {
    	    null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint64(b));
    	};
    	jspb.BinaryWriter.prototype.writeZigzagVarint32_ = function (a, b) {
    	    null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint32(b));
    	};
    	jspb.BinaryWriter.prototype.writeZigzagVarint64_ = function (a, b) {
    	    null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint64(b));
    	};
    	jspb.BinaryWriter.prototype.writeZigzagVarint64String_ = function (a, b) {
    	    null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint64String(b));
    	};
    	jspb.BinaryWriter.prototype.writeZigzagVarintHash64_ = function (a, b) {
    	    null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarintHash64(b));
    	};
    	jspb.BinaryWriter.prototype.writeInt32 = function (a, b) {
    	    null != b && (jspb.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31), this.writeSignedVarint32_(a, b));
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeInt32", jspb.BinaryWriter.prototype.writeInt32);
    	jspb.BinaryWriter.prototype.writeInt32String = function (a, b) {
    	    null != b && (b = parseInt(b, 10), jspb.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31), this.writeSignedVarint32_(a, b));
    	};
    	jspb.BinaryWriter.prototype.writeInt64 = function (a, b) {
    	    null != b && (jspb.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_63 && b < jspb.BinaryConstants.TWO_TO_63), this.writeSignedVarint64_(a, b));
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeInt64", jspb.BinaryWriter.prototype.writeInt64);
    	jspb.BinaryWriter.prototype.writeInt64String = function (a, b) {
    	    null != b && (b = jspb.arith.Int64.fromString(b), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSplitVarint64(b.lo, b.hi));
    	};
    	jspb.BinaryWriter.prototype.writeUint32 = function (a, b) {
    	    null != b && (jspb.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32), this.writeUnsignedVarint32_(a, b));
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeUint32", jspb.BinaryWriter.prototype.writeUint32);
    	jspb.BinaryWriter.prototype.writeUint32String = function (a, b) {
    	    null != b && (b = parseInt(b, 10), jspb.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32), this.writeUnsignedVarint32_(a, b));
    	};
    	jspb.BinaryWriter.prototype.writeUint64 = function (a, b) {
    	    null != b && (jspb.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_64), this.writeUnsignedVarint64_(a, b));
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeUint64", jspb.BinaryWriter.prototype.writeUint64);
    	jspb.BinaryWriter.prototype.writeUint64String = function (a, b) {
    	    null != b && (b = jspb.arith.UInt64.fromString(b), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSplitVarint64(b.lo, b.hi));
    	};
    	jspb.BinaryWriter.prototype.writeSint32 = function (a, b) {
    	    null != b && (jspb.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31), this.writeZigzagVarint32_(a, b));
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeSint32", jspb.BinaryWriter.prototype.writeSint32);
    	jspb.BinaryWriter.prototype.writeSint64 = function (a, b) {
    	    null != b && (jspb.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_63 && b < jspb.BinaryConstants.TWO_TO_63), this.writeZigzagVarint64_(a, b));
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeSint64", jspb.BinaryWriter.prototype.writeSint64);
    	jspb.BinaryWriter.prototype.writeSintHash64 = function (a, b) {
    	    null != b && this.writeZigzagVarintHash64_(a, b);
    	};
    	jspb.BinaryWriter.prototype.writeSint64String = function (a, b) {
    	    null != b && this.writeZigzagVarint64String_(a, b);
    	};
    	jspb.BinaryWriter.prototype.writeFixed32 = function (a, b) {
    	    null != b && (jspb.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED32), this.encoder_.writeUint32(b));
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeFixed32", jspb.BinaryWriter.prototype.writeFixed32);
    	jspb.BinaryWriter.prototype.writeFixed64 = function (a, b) {
    	    null != b && (jspb.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_64), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeUint64(b));
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeFixed64", jspb.BinaryWriter.prototype.writeFixed64);
    	jspb.BinaryWriter.prototype.writeFixed64String = function (a, b) {
    	    null != b && (b = jspb.arith.UInt64.fromString(b), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeSplitFixed64(b.lo, b.hi));
    	};
    	jspb.BinaryWriter.prototype.writeSfixed32 = function (a, b) {
    	    null != b && (jspb.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED32), this.encoder_.writeInt32(b));
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeSfixed32", jspb.BinaryWriter.prototype.writeSfixed32);
    	jspb.BinaryWriter.prototype.writeSfixed64 = function (a, b) {
    	    null != b && (jspb.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_63 && b < jspb.BinaryConstants.TWO_TO_63), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeInt64(b));
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeSfixed64", jspb.BinaryWriter.prototype.writeSfixed64);
    	jspb.BinaryWriter.prototype.writeSfixed64String = function (a, b) {
    	    null != b && (b = jspb.arith.Int64.fromString(b), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeSplitFixed64(b.lo, b.hi));
    	};
    	jspb.BinaryWriter.prototype.writeFloat = function (a, b) {
    	    null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED32), this.encoder_.writeFloat(b));
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeFloat", jspb.BinaryWriter.prototype.writeFloat);
    	jspb.BinaryWriter.prototype.writeDouble = function (a, b) {
    	    null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeDouble(b));
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeDouble", jspb.BinaryWriter.prototype.writeDouble);
    	jspb.BinaryWriter.prototype.writeBool = function (a, b) {
    	    null != b && (jspb.asserts.assert("boolean" === typeof b || "number" === typeof b), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeBool(b));
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeBool", jspb.BinaryWriter.prototype.writeBool);
    	jspb.BinaryWriter.prototype.writeEnum = function (a, b) {
    	    null != b && (jspb.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint32(b));
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeEnum", jspb.BinaryWriter.prototype.writeEnum);
    	jspb.BinaryWriter.prototype.writeString = function (a, b) {
    	    null != b && (a = this.beginDelimited_(a), this.encoder_.writeString(b), this.endDelimited_(a));
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeString", jspb.BinaryWriter.prototype.writeString);
    	jspb.BinaryWriter.prototype.writeBytes = function (a, b) {
    	    null != b && (b = jspb.utils.byteSourceToUint8Array(b), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(b.length), this.appendUint8Array_(b));
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeBytes", jspb.BinaryWriter.prototype.writeBytes);
    	jspb.BinaryWriter.prototype.writeMessage = function (a, b, c) {
    	    null != b && (a = this.beginDelimited_(a), c(b, this), this.endDelimited_(a));
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeMessage", jspb.BinaryWriter.prototype.writeMessage);
    	jspb.BinaryWriter.prototype.writeMessageSet = function (a, b, c) {
    	    null != b && (this.writeFieldHeader_(1, jspb.BinaryConstants.WireType.START_GROUP), this.writeFieldHeader_(2, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint32(a), a = this.beginDelimited_(3), c(b, this), this.endDelimited_(a), this.writeFieldHeader_(1, jspb.BinaryConstants.WireType.END_GROUP));
    	};
    	jspb.BinaryWriter.prototype.writeGroup = function (a, b, c) {
    	    null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.START_GROUP), c(b, this), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.END_GROUP));
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeGroup", jspb.BinaryWriter.prototype.writeGroup);
    	jspb.BinaryWriter.prototype.writeFixedHash64 = function (a, b) {
    	    null != b && (jspb.asserts.assert(8 == b.length), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeFixedHash64(b));
    	};
    	jspb.BinaryWriter.prototype.writeVarintHash64 = function (a, b) {
    	    null != b && (jspb.asserts.assert(8 == b.length), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeVarintHash64(b));
    	};
    	jspb.BinaryWriter.prototype.writeSplitFixed64 = function (a, b, c) {
    	    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64);
    	    this.encoder_.writeSplitFixed64(b, c);
    	};
    	jspb.BinaryWriter.prototype.writeSplitVarint64 = function (a, b, c) {
    	    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT);
    	    this.encoder_.writeSplitVarint64(b, c);
    	};
    	jspb.BinaryWriter.prototype.writeSplitZigzagVarint64 = function (a, b, c) {
    	    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT);
    	    var d = this.encoder_;
    	    jspb.utils.toZigzag64(b, c, function (a, b) {
    	        d.writeSplitVarint64(a >>> 0, b >>> 0);
    	    });
    	};
    	jspb.BinaryWriter.prototype.writeRepeatedInt32 = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeSignedVarint32_(a, b[c]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedInt32", jspb.BinaryWriter.prototype.writeRepeatedInt32);
    	jspb.BinaryWriter.prototype.writeRepeatedInt32String = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeInt32String(a, b[c]);
    	};
    	jspb.BinaryWriter.prototype.writeRepeatedInt64 = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeSignedVarint64_(a, b[c]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedInt64", jspb.BinaryWriter.prototype.writeRepeatedInt64);
    	jspb.BinaryWriter.prototype.writeRepeatedSplitFixed64 = function (a, b, c, d) {
    	    if (null != b) for (var e = 0; e < b.length; e++) this.writeSplitFixed64(a, c(b[e]), d(b[e]));
    	};
    	jspb.BinaryWriter.prototype.writeRepeatedSplitVarint64 = function (a, b, c, d) {
    	    if (null != b) for (var e = 0; e < b.length; e++) this.writeSplitVarint64(a, c(b[e]), d(b[e]));
    	};
    	jspb.BinaryWriter.prototype.writeRepeatedSplitZigzagVarint64 = function (a, b, c, d) {
    	    if (null != b) for (var e = 0; e < b.length; e++) this.writeSplitZigzagVarint64(a, c(b[e]), d(b[e]));
    	};
    	jspb.BinaryWriter.prototype.writeRepeatedInt64String = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeInt64String(a, b[c]);
    	};
    	jspb.BinaryWriter.prototype.writeRepeatedUint32 = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeUnsignedVarint32_(a, b[c]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedUint32", jspb.BinaryWriter.prototype.writeRepeatedUint32);
    	jspb.BinaryWriter.prototype.writeRepeatedUint32String = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeUint32String(a, b[c]);
    	};
    	jspb.BinaryWriter.prototype.writeRepeatedUint64 = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeUnsignedVarint64_(a, b[c]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedUint64", jspb.BinaryWriter.prototype.writeRepeatedUint64);
    	jspb.BinaryWriter.prototype.writeRepeatedUint64String = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeUint64String(a, b[c]);
    	};
    	jspb.BinaryWriter.prototype.writeRepeatedSint32 = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeZigzagVarint32_(a, b[c]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedSint32", jspb.BinaryWriter.prototype.writeRepeatedSint32);
    	jspb.BinaryWriter.prototype.writeRepeatedSint64 = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeZigzagVarint64_(a, b[c]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedSint64", jspb.BinaryWriter.prototype.writeRepeatedSint64);
    	jspb.BinaryWriter.prototype.writeRepeatedSint64String = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeZigzagVarint64String_(a, b[c]);
    	};
    	jspb.BinaryWriter.prototype.writeRepeatedSintHash64 = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeZigzagVarintHash64_(a, b[c]);
    	};
    	jspb.BinaryWriter.prototype.writeRepeatedFixed32 = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeFixed32(a, b[c]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedFixed32", jspb.BinaryWriter.prototype.writeRepeatedFixed32);
    	jspb.BinaryWriter.prototype.writeRepeatedFixed64 = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeFixed64(a, b[c]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedFixed64", jspb.BinaryWriter.prototype.writeRepeatedFixed64);
    	jspb.BinaryWriter.prototype.writeRepeatedFixed64String = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeFixed64String(a, b[c]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedFixed64String", jspb.BinaryWriter.prototype.writeRepeatedFixed64String);
    	jspb.BinaryWriter.prototype.writeRepeatedSfixed32 = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeSfixed32(a, b[c]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedSfixed32", jspb.BinaryWriter.prototype.writeRepeatedSfixed32);
    	jspb.BinaryWriter.prototype.writeRepeatedSfixed64 = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeSfixed64(a, b[c]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedSfixed64", jspb.BinaryWriter.prototype.writeRepeatedSfixed64);
    	jspb.BinaryWriter.prototype.writeRepeatedSfixed64String = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeSfixed64String(a, b[c]);
    	};
    	jspb.BinaryWriter.prototype.writeRepeatedFloat = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeFloat(a, b[c]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedFloat", jspb.BinaryWriter.prototype.writeRepeatedFloat);
    	jspb.BinaryWriter.prototype.writeRepeatedDouble = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeDouble(a, b[c]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedDouble", jspb.BinaryWriter.prototype.writeRepeatedDouble);
    	jspb.BinaryWriter.prototype.writeRepeatedBool = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeBool(a, b[c]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedBool", jspb.BinaryWriter.prototype.writeRepeatedBool);
    	jspb.BinaryWriter.prototype.writeRepeatedEnum = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeEnum(a, b[c]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedEnum", jspb.BinaryWriter.prototype.writeRepeatedEnum);
    	jspb.BinaryWriter.prototype.writeRepeatedString = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeString(a, b[c]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedString", jspb.BinaryWriter.prototype.writeRepeatedString);
    	jspb.BinaryWriter.prototype.writeRepeatedBytes = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeBytes(a, b[c]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedBytes", jspb.BinaryWriter.prototype.writeRepeatedBytes);
    	jspb.BinaryWriter.prototype.writeRepeatedMessage = function (a, b, c) {
    	    if (null != b) for (var d = 0; d < b.length; d++) {
    	        var e = this.beginDelimited_(a);
    	        c(b[d], this);
    	        this.endDelimited_(e);
    	    }
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedMessage", jspb.BinaryWriter.prototype.writeRepeatedMessage);
    	jspb.BinaryWriter.prototype.writeRepeatedGroup = function (a, b, c) {
    	    if (null != b) for (var d = 0; d < b.length; d++) this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.START_GROUP), c(b[d], this), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.END_GROUP);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedGroup", jspb.BinaryWriter.prototype.writeRepeatedGroup);
    	jspb.BinaryWriter.prototype.writeRepeatedFixedHash64 = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeFixedHash64(a, b[c]);
    	};
    	jspb.BinaryWriter.prototype.writeRepeatedVarintHash64 = function (a, b) {
    	    if (null != b) for (var c = 0; c < b.length; c++) this.writeVarintHash64(a, b[c]);
    	};
    	jspb.BinaryWriter.prototype.writePackedInt32 = function (a, b) {
    	    if (null != b && b.length) {
    	        a = this.beginDelimited_(a);
    	        for (var c = 0; c < b.length; c++) this.encoder_.writeSignedVarint32(b[c]);
    	        this.endDelimited_(a);
    	    }
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedInt32", jspb.BinaryWriter.prototype.writePackedInt32);
    	jspb.BinaryWriter.prototype.writePackedInt32String = function (a, b) {
    	    if (null != b && b.length) {
    	        a = this.beginDelimited_(a);
    	        for (var c = 0; c < b.length; c++) this.encoder_.writeSignedVarint32(parseInt(b[c], 10));
    	        this.endDelimited_(a);
    	    }
    	};
    	jspb.BinaryWriter.prototype.writePackedInt64 = function (a, b) {
    	    if (null != b && b.length) {
    	        a = this.beginDelimited_(a);
    	        for (var c = 0; c < b.length; c++) this.encoder_.writeSignedVarint64(b[c]);
    	        this.endDelimited_(a);
    	    }
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedInt64", jspb.BinaryWriter.prototype.writePackedInt64);
    	jspb.BinaryWriter.prototype.writePackedSplitFixed64 = function (a, b, c, d) {
    	    if (null != b) {
    	        a = this.beginDelimited_(a);
    	        for (var e = 0; e < b.length; e++) this.encoder_.writeSplitFixed64(c(b[e]), d(b[e]));
    	        this.endDelimited_(a);
    	    }
    	};
    	jspb.BinaryWriter.prototype.writePackedSplitVarint64 = function (a, b, c, d) {
    	    if (null != b) {
    	        a = this.beginDelimited_(a);
    	        for (var e = 0; e < b.length; e++) this.encoder_.writeSplitVarint64(c(b[e]), d(b[e]));
    	        this.endDelimited_(a);
    	    }
    	};
    	jspb.BinaryWriter.prototype.writePackedSplitZigzagVarint64 = function (a, b, c, d) {
    	    if (null != b) {
    	        a = this.beginDelimited_(a);
    	        for (var e = this.encoder_, f = 0; f < b.length; f++) jspb.utils.toZigzag64(c(b[f]), d(b[f]), function (a, b) {
    	            e.writeSplitVarint64(a >>> 0, b >>> 0);
    	        });
    	        this.endDelimited_(a);
    	    }
    	};
    	jspb.BinaryWriter.prototype.writePackedInt64String = function (a, b) {
    	    if (null != b && b.length) {
    	        a = this.beginDelimited_(a);
    	        for (var c = 0; c < b.length; c++) {
    	            var d = jspb.arith.Int64.fromString(b[c]);
    	            this.encoder_.writeSplitVarint64(d.lo, d.hi);
    	        }
    	        this.endDelimited_(a);
    	    }
    	};
    	jspb.BinaryWriter.prototype.writePackedUint32 = function (a, b) {
    	    if (null != b && b.length) {
    	        a = this.beginDelimited_(a);
    	        for (var c = 0; c < b.length; c++) this.encoder_.writeUnsignedVarint32(b[c]);
    	        this.endDelimited_(a);
    	    }
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedUint32", jspb.BinaryWriter.prototype.writePackedUint32);
    	jspb.BinaryWriter.prototype.writePackedUint32String = function (a, b) {
    	    if (null != b && b.length) {
    	        a = this.beginDelimited_(a);
    	        for (var c = 0; c < b.length; c++) this.encoder_.writeUnsignedVarint32(parseInt(b[c], 10));
    	        this.endDelimited_(a);
    	    }
    	};
    	jspb.BinaryWriter.prototype.writePackedUint64 = function (a, b) {
    	    if (null != b && b.length) {
    	        a = this.beginDelimited_(a);
    	        for (var c = 0; c < b.length; c++) this.encoder_.writeUnsignedVarint64(b[c]);
    	        this.endDelimited_(a);
    	    }
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedUint64", jspb.BinaryWriter.prototype.writePackedUint64);
    	jspb.BinaryWriter.prototype.writePackedUint64String = function (a, b) {
    	    if (null != b && b.length) {
    	        a = this.beginDelimited_(a);
    	        for (var c = 0; c < b.length; c++) {
    	            var d = jspb.arith.UInt64.fromString(b[c]);
    	            this.encoder_.writeSplitVarint64(d.lo, d.hi);
    	        }
    	        this.endDelimited_(a);
    	    }
    	};
    	jspb.BinaryWriter.prototype.writePackedSint32 = function (a, b) {
    	    if (null != b && b.length) {
    	        a = this.beginDelimited_(a);
    	        for (var c = 0; c < b.length; c++) this.encoder_.writeZigzagVarint32(b[c]);
    	        this.endDelimited_(a);
    	    }
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedSint32", jspb.BinaryWriter.prototype.writePackedSint32);
    	jspb.BinaryWriter.prototype.writePackedSint64 = function (a, b) {
    	    if (null != b && b.length) {
    	        a = this.beginDelimited_(a);
    	        for (var c = 0; c < b.length; c++) this.encoder_.writeZigzagVarint64(b[c]);
    	        this.endDelimited_(a);
    	    }
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedSint64", jspb.BinaryWriter.prototype.writePackedSint64);
    	jspb.BinaryWriter.prototype.writePackedSint64String = function (a, b) {
    	    if (null != b && b.length) {
    	        a = this.beginDelimited_(a);
    	        for (var c = 0; c < b.length; c++) this.encoder_.writeZigzagVarintHash64(jspb.utils.decimalStringToHash64(b[c]));
    	        this.endDelimited_(a);
    	    }
    	};
    	jspb.BinaryWriter.prototype.writePackedSintHash64 = function (a, b) {
    	    if (null != b && b.length) {
    	        a = this.beginDelimited_(a);
    	        for (var c = 0; c < b.length; c++) this.encoder_.writeZigzagVarintHash64(b[c]);
    	        this.endDelimited_(a);
    	    }
    	};
    	jspb.BinaryWriter.prototype.writePackedFixed32 = function (a, b) {
    	    if (null != b && b.length) for (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(4 * b.length), a = 0; a < b.length; a++) this.encoder_.writeUint32(b[a]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedFixed32", jspb.BinaryWriter.prototype.writePackedFixed32);
    	jspb.BinaryWriter.prototype.writePackedFixed64 = function (a, b) {
    	    if (null != b && b.length) for (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(8 * b.length), a = 0; a < b.length; a++) this.encoder_.writeUint64(b[a]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedFixed64", jspb.BinaryWriter.prototype.writePackedFixed64);
    	jspb.BinaryWriter.prototype.writePackedFixed64String = function (a, b) {
    	    if (null != b && b.length) for (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(8 * b.length), a = 0; a < b.length; a++) {
    	        var c = jspb.arith.UInt64.fromString(b[a]);
    	        this.encoder_.writeSplitFixed64(c.lo, c.hi);
    	    }
    	};
    	jspb.BinaryWriter.prototype.writePackedSfixed32 = function (a, b) {
    	    if (null != b && b.length) for (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(4 * b.length), a = 0; a < b.length; a++) this.encoder_.writeInt32(b[a]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedSfixed32", jspb.BinaryWriter.prototype.writePackedSfixed32);
    	jspb.BinaryWriter.prototype.writePackedSfixed64 = function (a, b) {
    	    if (null != b && b.length) for (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(8 * b.length), a = 0; a < b.length; a++) this.encoder_.writeInt64(b[a]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedSfixed64", jspb.BinaryWriter.prototype.writePackedSfixed64);
    	jspb.BinaryWriter.prototype.writePackedSfixed64String = function (a, b) {
    	    if (null != b && b.length) for (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(8 * b.length), a = 0; a < b.length; a++) this.encoder_.writeInt64String(b[a]);
    	};
    	jspb.BinaryWriter.prototype.writePackedFloat = function (a, b) {
    	    if (null != b && b.length) for (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(4 * b.length), a = 0; a < b.length; a++) this.encoder_.writeFloat(b[a]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedFloat", jspb.BinaryWriter.prototype.writePackedFloat);
    	jspb.BinaryWriter.prototype.writePackedDouble = function (a, b) {
    	    if (null != b && b.length) for (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(8 * b.length), a = 0; a < b.length; a++) this.encoder_.writeDouble(b[a]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedDouble", jspb.BinaryWriter.prototype.writePackedDouble);
    	jspb.BinaryWriter.prototype.writePackedBool = function (a, b) {
    	    if (null != b && b.length) for (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(b.length), a = 0; a < b.length; a++) this.encoder_.writeBool(b[a]);
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedBool", jspb.BinaryWriter.prototype.writePackedBool);
    	jspb.BinaryWriter.prototype.writePackedEnum = function (a, b) {
    	    if (null != b && b.length) {
    	        a = this.beginDelimited_(a);
    	        for (var c = 0; c < b.length; c++) this.encoder_.writeEnum(b[c]);
    	        this.endDelimited_(a);
    	    }
    	};
    	goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedEnum", jspb.BinaryWriter.prototype.writePackedEnum);
    	jspb.BinaryWriter.prototype.writePackedFixedHash64 = function (a, b) {
    	    if (null != b && b.length) for (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(8 * b.length), a = 0; a < b.length; a++) this.encoder_.writeFixedHash64(b[a]);
    	};
    	jspb.BinaryWriter.prototype.writePackedVarintHash64 = function (a, b) {
    	    if (null != b && b.length) {
    	        a = this.beginDelimited_(a);
    	        for (var c = 0; c < b.length; c++) this.encoder_.writeVarintHash64(b[c]);
    	        this.endDelimited_(a);
    	    }
    	};
    	jspb.Map = function (a, b) {
    	    this.arr_ = a;
    	    this.valueCtor_ = b;
    	    this.map_ = {};
    	    this.arrClean = !0;
    	    0 < this.arr_.length && this.loadFromArray_();
    	};
    	goog.exportSymbol("jspb.Map", jspb.Map);
    	jspb.Map.prototype.loadFromArray_ = function () {
    	    for (var a = 0; a < this.arr_.length; a++) {
    	        var b = this.arr_[a], c = b[0];
    	        this.map_[c.toString()] = new jspb.Map.Entry_(c, b[1]);
    	    }
    	    this.arrClean = !0;
    	};
    	jspb.Map.prototype.toArray = function () {
    	    if (this.arrClean) {
    	        if (this.valueCtor_) {
    	            var a = this.map_, b;
    	            for (b in a) if (Object.prototype.hasOwnProperty.call(a, b)) {
    	                var c = a[b].valueWrapper;
    	                c && c.toArray();
    	            }
    	        }
    	    } else {
    	        this.arr_.length = 0;
    	        a = this.stringKeys_();
    	        a.sort();
    	        for (b = 0; b < a.length; b++) {
    	            var d = this.map_[a[b]];
    	            (c = d.valueWrapper) && c.toArray();
    	            this.arr_.push([d.key, d.value]);
    	        }
    	        this.arrClean = !0;
    	    }
    	    return this.arr_
    	};
    	goog.exportProperty(jspb.Map.prototype, "toArray", jspb.Map.prototype.toArray);
    	jspb.Map.prototype.toObject = function (a, b) {
    	    for (var c = this.toArray(), d = [], e = 0; e < c.length; e++) {
    	        var f = this.map_[c[e][0].toString()];
    	        this.wrapEntry_(f);
    	        var g = f.valueWrapper;
    	        g ? (jspb.asserts.assert(b), d.push([f.key, b(a, g)])) : d.push([f.key, f.value]);
    	    }
    	    return d
    	};
    	goog.exportProperty(jspb.Map.prototype, "toObject", jspb.Map.prototype.toObject);
    	jspb.Map.fromObject = function (a, b, c) {
    	    b = new jspb.Map([], b);
    	    for (var d = 0; d < a.length; d++) {
    	        var e = a[d][0], f = c(a[d][1]);
    	        b.set(e, f);
    	    }
    	    return b
    	};
    	goog.exportProperty(jspb.Map, "fromObject", jspb.Map.fromObject);
    	jspb.Map.ArrayIteratorIterable_ = function (a) {
    	    this.idx_ = 0;
    	    this.arr_ = a;
    	};
    	jspb.Map.ArrayIteratorIterable_.prototype.next = function () {
    	    return this.idx_ < this.arr_.length ? {done: !1, value: this.arr_[this.idx_++]} : {done: !0, value: void 0}
    	};
    	"undefined" != typeof Symbol && (jspb.Map.ArrayIteratorIterable_.prototype[Symbol.iterator] = function () {
    	    return this
    	});
    	jspb.Map.prototype.getLength = function () {
    	    return this.stringKeys_().length
    	};
    	goog.exportProperty(jspb.Map.prototype, "getLength", jspb.Map.prototype.getLength);
    	jspb.Map.prototype.clear = function () {
    	    this.map_ = {};
    	    this.arrClean = !1;
    	};
    	goog.exportProperty(jspb.Map.prototype, "clear", jspb.Map.prototype.clear);
    	jspb.Map.prototype.del = function (a) {
    	    a = a.toString();
    	    var b = this.map_.hasOwnProperty(a);
    	    delete this.map_[a];
    	    this.arrClean = !1;
    	    return b
    	};
    	goog.exportProperty(jspb.Map.prototype, "del", jspb.Map.prototype.del);
    	jspb.Map.prototype.getEntryList = function () {
    	    var a = [], b = this.stringKeys_();
    	    b.sort();
    	    for (var c = 0; c < b.length; c++) {
    	        var d = this.map_[b[c]];
    	        a.push([d.key, d.value]);
    	    }
    	    return a
    	};
    	goog.exportProperty(jspb.Map.prototype, "getEntryList", jspb.Map.prototype.getEntryList);
    	jspb.Map.prototype.entries = function () {
    	    var a = [], b = this.stringKeys_();
    	    b.sort();
    	    for (var c = 0; c < b.length; c++) {
    	        var d = this.map_[b[c]];
    	        a.push([d.key, this.wrapEntry_(d)]);
    	    }
    	    return new jspb.Map.ArrayIteratorIterable_(a)
    	};
    	goog.exportProperty(jspb.Map.prototype, "entries", jspb.Map.prototype.entries);
    	jspb.Map.prototype.keys = function () {
    	    var a = [], b = this.stringKeys_();
    	    b.sort();
    	    for (var c = 0; c < b.length; c++) a.push(this.map_[b[c]].key);
    	    return new jspb.Map.ArrayIteratorIterable_(a)
    	};
    	goog.exportProperty(jspb.Map.prototype, "keys", jspb.Map.prototype.keys);
    	jspb.Map.prototype.values = function () {
    	    var a = [], b = this.stringKeys_();
    	    b.sort();
    	    for (var c = 0; c < b.length; c++) a.push(this.wrapEntry_(this.map_[b[c]]));
    	    return new jspb.Map.ArrayIteratorIterable_(a)
    	};
    	goog.exportProperty(jspb.Map.prototype, "values", jspb.Map.prototype.values);
    	jspb.Map.prototype.forEach = function (a, b) {
    	    var c = this.stringKeys_();
    	    c.sort();
    	    for (var d = 0; d < c.length; d++) {
    	        var e = this.map_[c[d]];
    	        a.call(b, this.wrapEntry_(e), e.key, this);
    	    }
    	};
    	goog.exportProperty(jspb.Map.prototype, "forEach", jspb.Map.prototype.forEach);
    	jspb.Map.prototype.set = function (a, b) {
    	    var c = new jspb.Map.Entry_(a);
    	    this.valueCtor_ ? (c.valueWrapper = b, c.value = b.toArray()) : c.value = b;
    	    this.map_[a.toString()] = c;
    	    this.arrClean = !1;
    	    return this
    	};
    	goog.exportProperty(jspb.Map.prototype, "set", jspb.Map.prototype.set);
    	jspb.Map.prototype.wrapEntry_ = function (a) {
    	    return this.valueCtor_ ? (a.valueWrapper || (a.valueWrapper = new this.valueCtor_(a.value)), a.valueWrapper) : a.value
    	};
    	jspb.Map.prototype.get = function (a) {
    	    if (a = this.map_[a.toString()]) return this.wrapEntry_(a)
    	};
    	goog.exportProperty(jspb.Map.prototype, "get", jspb.Map.prototype.get);
    	jspb.Map.prototype.has = function (a) {
    	    return a.toString() in this.map_
    	};
    	goog.exportProperty(jspb.Map.prototype, "has", jspb.Map.prototype.has);
    	jspb.Map.prototype.serializeBinary = function (a, b, c, d, e) {
    	    var f = this.stringKeys_();
    	    f.sort();
    	    for (var g = 0; g < f.length; g++) {
    	        var h = this.map_[f[g]];
    	        b.beginSubMessage(a);
    	        c.call(b, 1, h.key);
    	        this.valueCtor_ ? d.call(b, 2, this.wrapEntry_(h), e) : d.call(b, 2, h.value);
    	        b.endSubMessage();
    	    }
    	};
    	goog.exportProperty(jspb.Map.prototype, "serializeBinary", jspb.Map.prototype.serializeBinary);
    	jspb.Map.deserializeBinary = function (a, b, c, d, e, f, g) {
    	    for (; b.nextField() && !b.isEndGroup();) {
    	        var h = b.getFieldNumber();
    	        1 == h ? f = c.call(b) : 2 == h && (a.valueCtor_ ? (jspb.asserts.assert(e), g || (g = new a.valueCtor_), d.call(b, g, e)) : g = d.call(b));
    	    }
    	    jspb.asserts.assert(void 0 != f);
    	    jspb.asserts.assert(void 0 != g);
    	    a.set(f, g);
    	};
    	goog.exportProperty(jspb.Map, "deserializeBinary", jspb.Map.deserializeBinary);
    	jspb.Map.prototype.stringKeys_ = function () {
    	    var a = this.map_, b = [], c;
    	    for (c in a) Object.prototype.hasOwnProperty.call(a, c) && b.push(c);
    	    return b
    	};
    	jspb.Map.Entry_ = function (a, b) {
    	    this.key = a;
    	    this.value = b;
    	    this.valueWrapper = void 0;
    	};
    	jspb.ExtensionFieldInfo = function (a, b, c, d, e) {
    	    this.fieldIndex = a;
    	    this.fieldName = b;
    	    this.ctor = c;
    	    this.toObjectFn = d;
    	    this.isRepeated = e;
    	};
    	goog.exportSymbol("jspb.ExtensionFieldInfo", jspb.ExtensionFieldInfo);
    	jspb.ExtensionFieldBinaryInfo = function (a, b, c, d, e, f) {
    	    this.fieldInfo = a;
    	    this.binaryReaderFn = b;
    	    this.binaryWriterFn = c;
    	    this.binaryMessageSerializeFn = d;
    	    this.binaryMessageDeserializeFn = e;
    	    this.isPacked = f;
    	};
    	goog.exportSymbol("jspb.ExtensionFieldBinaryInfo", jspb.ExtensionFieldBinaryInfo);
    	jspb.ExtensionFieldInfo.prototype.isMessageType = function () {
    	    return !!this.ctor
    	};
    	goog.exportProperty(jspb.ExtensionFieldInfo.prototype, "isMessageType", jspb.ExtensionFieldInfo.prototype.isMessageType);
    	jspb.Message = function () {
    	};
    	goog.exportSymbol("jspb.Message", jspb.Message);
    	jspb.Message.GENERATE_TO_OBJECT = !0;
    	goog.exportProperty(jspb.Message, "GENERATE_TO_OBJECT", jspb.Message.GENERATE_TO_OBJECT);
    	jspb.Message.GENERATE_FROM_OBJECT = !goog.DISALLOW_TEST_ONLY_CODE;
    	goog.exportProperty(jspb.Message, "GENERATE_FROM_OBJECT", jspb.Message.GENERATE_FROM_OBJECT);
    	jspb.Message.GENERATE_TO_STRING = !0;
    	jspb.Message.ASSUME_LOCAL_ARRAYS = !1;
    	jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS = !0;
    	jspb.Message.SUPPORTS_UINT8ARRAY_ = "function" == typeof Uint8Array;
    	jspb.Message.prototype.getJsPbMessageId = function () {
    	    return this.messageId_
    	};
    	goog.exportProperty(jspb.Message.prototype, "getJsPbMessageId", jspb.Message.prototype.getJsPbMessageId);
    	jspb.Message.getIndex_ = function (a, b) {
    	    return b + a.arrayIndexOffset_
    	};
    	jspb.Message.hiddenES6Property_ = function () {
    	};
    	jspb.Message.getFieldNumber_ = function (a, b) {
    	    return b - a.arrayIndexOffset_
    	};
    	jspb.Message.initialize = function (a, b, c, d, e, f) {
    	    a.wrappers_ = null;
    	    b || (b = c ? [c] : []);
    	    a.messageId_ = c ? String(c) : void 0;
    	    a.arrayIndexOffset_ = 0 === c ? -1 : 0;
    	    a.array = b;
    	    jspb.Message.initPivotAndExtensionObject_(a, d);
    	    a.convertedPrimitiveFields_ = {};
    	    jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS || (a.repeatedFields = e);
    	    if (e) for (b = 0; b < e.length; b++) c = e[b], c < a.pivot_ ? (c = jspb.Message.getIndex_(a, c), a.array[c] = a.array[c] || jspb.Message.EMPTY_LIST_SENTINEL_) : (jspb.Message.maybeInitEmptyExtensionObject_(a), a.extensionObject_[c] =
    	        a.extensionObject_[c] || jspb.Message.EMPTY_LIST_SENTINEL_);
    	    if (f && f.length) for (b = 0; b < f.length; b++) jspb.Message.computeOneofCase(a, f[b]);
    	};
    	goog.exportProperty(jspb.Message, "initialize", jspb.Message.initialize);
    	jspb.Message.EMPTY_LIST_SENTINEL_ = goog.DEBUG && Object.freeze ? Object.freeze([]) : [];
    	jspb.Message.isArray_ = function (a) {
    	    return jspb.Message.ASSUME_LOCAL_ARRAYS ? a instanceof Array : Array.isArray(a)
    	};
    	jspb.Message.isExtensionObject_ = function (a) {
    	    return null !== a && "object" == typeof a && !jspb.Message.isArray_(a) && !(jspb.Message.SUPPORTS_UINT8ARRAY_ && a instanceof Uint8Array)
    	};
    	jspb.Message.initPivotAndExtensionObject_ = function (a, b) {
    	    var c = a.array.length, d = -1;
    	    if (c && (d = c - 1, c = a.array[d], jspb.Message.isExtensionObject_(c))) {
    	        a.pivot_ = jspb.Message.getFieldNumber_(a, d);
    	        a.extensionObject_ = c;
    	        return
    	    }
    	    -1 < b ? (a.pivot_ = Math.max(b, jspb.Message.getFieldNumber_(a, d + 1)), a.extensionObject_ = null) : a.pivot_ = Number.MAX_VALUE;
    	};
    	jspb.Message.maybeInitEmptyExtensionObject_ = function (a) {
    	    var b = jspb.Message.getIndex_(a, a.pivot_);
    	    a.array[b] || (a.extensionObject_ = a.array[b] = {});
    	};
    	jspb.Message.toObjectList = function (a, b, c) {
    	    for (var d = [], e = 0; e < a.length; e++) d[e] = b.call(a[e], c, a[e]);
    	    return d
    	};
    	goog.exportProperty(jspb.Message, "toObjectList", jspb.Message.toObjectList);
    	jspb.Message.toObjectExtension = function (a, b, c, d, e) {
    	    for (var f in c) {
    	        var g = c[f], h = d.call(a, g);
    	        if (null != h) {
    	            for (var k in g.fieldName) if (g.fieldName.hasOwnProperty(k)) break;
    	            b[k] = g.toObjectFn ? g.isRepeated ? jspb.Message.toObjectList(h, g.toObjectFn, e) : g.toObjectFn(e, h) : h;
    	        }
    	    }
    	};
    	goog.exportProperty(jspb.Message, "toObjectExtension", jspb.Message.toObjectExtension);
    	jspb.Message.serializeBinaryExtensions = function (a, b, c, d) {
    	    for (var e in c) {
    	        var f = c[e], g = f.fieldInfo;
    	        if (!f.binaryWriterFn) throw Error("Message extension present that was generated without binary serialization support");
    	        var h = d.call(a, g);
    	        if (null != h) if (g.isMessageType()) if (f.binaryMessageSerializeFn) f.binaryWriterFn.call(b, g.fieldIndex, h, f.binaryMessageSerializeFn); else throw Error("Message extension present holding submessage without binary support enabled, and message is being serialized to binary format");
    	        else f.binaryWriterFn.call(b, g.fieldIndex, h);
    	    }
    	};
    	goog.exportProperty(jspb.Message, "serializeBinaryExtensions", jspb.Message.serializeBinaryExtensions);
    	jspb.Message.readBinaryExtension = function (a, b, c, d, e) {
    	    var f = c[b.getFieldNumber()];
    	    if (f) {
    	        c = f.fieldInfo;
    	        if (!f.binaryReaderFn) throw Error("Deserializing extension whose generated code does not support binary format");
    	        if (c.isMessageType()) {
    	            var g = new c.ctor;
    	            f.binaryReaderFn.call(b, g, f.binaryMessageDeserializeFn);
    	        } else g = f.binaryReaderFn.call(b);
    	        c.isRepeated && !f.isPacked ? (b = d.call(a, c)) ? b.push(g) : e.call(a, c, [g]) : e.call(a, c, g);
    	    } else b.skipField();
    	};
    	goog.exportProperty(jspb.Message, "readBinaryExtension", jspb.Message.readBinaryExtension);
    	jspb.Message.getField = function (a, b) {
    	    if (b < a.pivot_) {
    	        b = jspb.Message.getIndex_(a, b);
    	        var c = a.array[b];
    	        return c === jspb.Message.EMPTY_LIST_SENTINEL_ ? a.array[b] = [] : c
    	    }
    	    if (a.extensionObject_) return c = a.extensionObject_[b], c === jspb.Message.EMPTY_LIST_SENTINEL_ ? a.extensionObject_[b] = [] : c
    	};
    	goog.exportProperty(jspb.Message, "getField", jspb.Message.getField);
    	jspb.Message.getRepeatedField = function (a, b) {
    	    return jspb.Message.getField(a, b)
    	};
    	goog.exportProperty(jspb.Message, "getRepeatedField", jspb.Message.getRepeatedField);
    	jspb.Message.getOptionalFloatingPointField = function (a, b) {
    	    a = jspb.Message.getField(a, b);
    	    return null == a ? a : +a
    	};
    	goog.exportProperty(jspb.Message, "getOptionalFloatingPointField", jspb.Message.getOptionalFloatingPointField);
    	jspb.Message.getBooleanField = function (a, b) {
    	    a = jspb.Message.getField(a, b);
    	    return null == a ? a : !!a
    	};
    	goog.exportProperty(jspb.Message, "getBooleanField", jspb.Message.getBooleanField);
    	jspb.Message.getRepeatedFloatingPointField = function (a, b) {
    	    var c = jspb.Message.getRepeatedField(a, b);
    	    a.convertedPrimitiveFields_ || (a.convertedPrimitiveFields_ = {});
    	    if (!a.convertedPrimitiveFields_[b]) {
    	        for (var d = 0; d < c.length; d++) c[d] = +c[d];
    	        a.convertedPrimitiveFields_[b] = !0;
    	    }
    	    return c
    	};
    	goog.exportProperty(jspb.Message, "getRepeatedFloatingPointField", jspb.Message.getRepeatedFloatingPointField);
    	jspb.Message.getRepeatedBooleanField = function (a, b) {
    	    var c = jspb.Message.getRepeatedField(a, b);
    	    a.convertedPrimitiveFields_ || (a.convertedPrimitiveFields_ = {});
    	    if (!a.convertedPrimitiveFields_[b]) {
    	        for (var d = 0; d < c.length; d++) c[d] = !!c[d];
    	        a.convertedPrimitiveFields_[b] = !0;
    	    }
    	    return c
    	};
    	goog.exportProperty(jspb.Message, "getRepeatedBooleanField", jspb.Message.getRepeatedBooleanField);
    	jspb.Message.bytesAsB64 = function (a) {
    	    if (null == a || "string" === typeof a) return a;
    	    if (jspb.Message.SUPPORTS_UINT8ARRAY_ && a instanceof Uint8Array) return goog.crypt.base64.encodeByteArray(a);
    	    jspb.asserts.fail("Cannot coerce to b64 string: " + goog.typeOf(a));
    	    return null
    	};
    	goog.exportProperty(jspb.Message, "bytesAsB64", jspb.Message.bytesAsB64);
    	jspb.Message.bytesAsU8 = function (a) {
    	    if (null == a || a instanceof Uint8Array) return a;
    	    if ("string" === typeof a) return goog.crypt.base64.decodeStringToUint8Array(a);
    	    jspb.asserts.fail("Cannot coerce to Uint8Array: " + goog.typeOf(a));
    	    return null
    	};
    	goog.exportProperty(jspb.Message, "bytesAsU8", jspb.Message.bytesAsU8);
    	jspb.Message.bytesListAsB64 = function (a) {
    	    jspb.Message.assertConsistentTypes_(a);
    	    return a.length && "string" !== typeof a[0] ? goog.array.map(a, jspb.Message.bytesAsB64) : a
    	};
    	goog.exportProperty(jspb.Message, "bytesListAsB64", jspb.Message.bytesListAsB64);
    	jspb.Message.bytesListAsU8 = function (a) {
    	    jspb.Message.assertConsistentTypes_(a);
    	    return !a.length || a[0] instanceof Uint8Array ? a : goog.array.map(a, jspb.Message.bytesAsU8)
    	};
    	goog.exportProperty(jspb.Message, "bytesListAsU8", jspb.Message.bytesListAsU8);
    	jspb.Message.assertConsistentTypes_ = function (a) {
    	    if (goog.DEBUG && a && 1 < a.length) {
    	        var b = goog.typeOf(a[0]);
    	        goog.array.forEach(a, function (a) {
    	            goog.typeOf(a) != b && jspb.asserts.fail("Inconsistent type in JSPB repeated field array. Got " + goog.typeOf(a) + " expected " + b);
    	        });
    	    }
    	};
    	jspb.Message.getFieldWithDefault = function (a, b, c) {
    	    a = jspb.Message.getField(a, b);
    	    return null == a ? c : a
    	};
    	goog.exportProperty(jspb.Message, "getFieldWithDefault", jspb.Message.getFieldWithDefault);
    	jspb.Message.getBooleanFieldWithDefault = function (a, b, c) {
    	    a = jspb.Message.getBooleanField(a, b);
    	    return null == a ? c : a
    	};
    	goog.exportProperty(jspb.Message, "getBooleanFieldWithDefault", jspb.Message.getBooleanFieldWithDefault);
    	jspb.Message.getFloatingPointFieldWithDefault = function (a, b, c) {
    	    a = jspb.Message.getOptionalFloatingPointField(a, b);
    	    return null == a ? c : a
    	};
    	goog.exportProperty(jspb.Message, "getFloatingPointFieldWithDefault", jspb.Message.getFloatingPointFieldWithDefault);
    	jspb.Message.getFieldProto3 = jspb.Message.getFieldWithDefault;
    	goog.exportProperty(jspb.Message, "getFieldProto3", jspb.Message.getFieldProto3);
    	jspb.Message.getMapField = function (a, b, c, d) {
    	    a.wrappers_ || (a.wrappers_ = {});
    	    if (b in a.wrappers_) return a.wrappers_[b];
    	    var e = jspb.Message.getField(a, b);
    	    if (!e) {
    	        if (c) return;
    	        e = [];
    	        jspb.Message.setField(a, b, e);
    	    }
    	    return a.wrappers_[b] = new jspb.Map(e, d)
    	};
    	goog.exportProperty(jspb.Message, "getMapField", jspb.Message.getMapField);
    	jspb.Message.setField = function (a, b, c) {
    	    jspb.asserts.assertInstanceof(a, jspb.Message);
    	    b < a.pivot_ ? a.array[jspb.Message.getIndex_(a, b)] = c : (jspb.Message.maybeInitEmptyExtensionObject_(a), a.extensionObject_[b] = c);
    	    return a
    	};
    	goog.exportProperty(jspb.Message, "setField", jspb.Message.setField);
    	jspb.Message.setProto3IntField = function (a, b, c) {
    	    return jspb.Message.setFieldIgnoringDefault_(a, b, c, 0)
    	};
    	goog.exportProperty(jspb.Message, "setProto3IntField", jspb.Message.setProto3IntField);
    	jspb.Message.setProto3FloatField = function (a, b, c) {
    	    return jspb.Message.setFieldIgnoringDefault_(a, b, c, 0)
    	};
    	goog.exportProperty(jspb.Message, "setProto3FloatField", jspb.Message.setProto3FloatField);
    	jspb.Message.setProto3BooleanField = function (a, b, c) {
    	    return jspb.Message.setFieldIgnoringDefault_(a, b, c, !1)
    	};
    	goog.exportProperty(jspb.Message, "setProto3BooleanField", jspb.Message.setProto3BooleanField);
    	jspb.Message.setProto3StringField = function (a, b, c) {
    	    return jspb.Message.setFieldIgnoringDefault_(a, b, c, "")
    	};
    	goog.exportProperty(jspb.Message, "setProto3StringField", jspb.Message.setProto3StringField);
    	jspb.Message.setProto3BytesField = function (a, b, c) {
    	    return jspb.Message.setFieldIgnoringDefault_(a, b, c, "")
    	};
    	goog.exportProperty(jspb.Message, "setProto3BytesField", jspb.Message.setProto3BytesField);
    	jspb.Message.setProto3EnumField = function (a, b, c) {
    	    return jspb.Message.setFieldIgnoringDefault_(a, b, c, 0)
    	};
    	goog.exportProperty(jspb.Message, "setProto3EnumField", jspb.Message.setProto3EnumField);
    	jspb.Message.setProto3StringIntField = function (a, b, c) {
    	    return jspb.Message.setFieldIgnoringDefault_(a, b, c, "0")
    	};
    	goog.exportProperty(jspb.Message, "setProto3StringIntField", jspb.Message.setProto3StringIntField);
    	jspb.Message.setFieldIgnoringDefault_ = function (a, b, c, d) {
    	    jspb.asserts.assertInstanceof(a, jspb.Message);
    	    c !== d ? jspb.Message.setField(a, b, c) : b < a.pivot_ ? a.array[jspb.Message.getIndex_(a, b)] = null : (jspb.Message.maybeInitEmptyExtensionObject_(a), delete a.extensionObject_[b]);
    	    return a
    	};
    	jspb.Message.addToRepeatedField = function (a, b, c, d) {
    	    jspb.asserts.assertInstanceof(a, jspb.Message);
    	    b = jspb.Message.getRepeatedField(a, b);
    	    void 0 != d ? b.splice(d, 0, c) : b.push(c);
    	    return a
    	};
    	goog.exportProperty(jspb.Message, "addToRepeatedField", jspb.Message.addToRepeatedField);
    	jspb.Message.setOneofField = function (a, b, c, d) {
    	    jspb.asserts.assertInstanceof(a, jspb.Message);
    	    (c = jspb.Message.computeOneofCase(a, c)) && c !== b && void 0 !== d && (a.wrappers_ && c in a.wrappers_ && (a.wrappers_[c] = void 0), jspb.Message.setField(a, c, void 0));
    	    return jspb.Message.setField(a, b, d)
    	};
    	goog.exportProperty(jspb.Message, "setOneofField", jspb.Message.setOneofField);
    	jspb.Message.computeOneofCase = function (a, b) {
    	    for (var c, d, e = 0; e < b.length; e++) {
    	        var f = b[e], g = jspb.Message.getField(a, f);
    	        null != g && (c = f, d = g, jspb.Message.setField(a, f, void 0));
    	    }
    	    return c ? (jspb.Message.setField(a, c, d), c) : 0
    	};
    	goog.exportProperty(jspb.Message, "computeOneofCase", jspb.Message.computeOneofCase);
    	jspb.Message.getWrapperField = function (a, b, c, d) {
    	    a.wrappers_ || (a.wrappers_ = {});
    	    if (!a.wrappers_[c]) {
    	        var e = jspb.Message.getField(a, c);
    	        if (d || e) a.wrappers_[c] = new b(e);
    	    }
    	    return a.wrappers_[c]
    	};
    	goog.exportProperty(jspb.Message, "getWrapperField", jspb.Message.getWrapperField);
    	jspb.Message.getRepeatedWrapperField = function (a, b, c) {
    	    jspb.Message.wrapRepeatedField_(a, b, c);
    	    b = a.wrappers_[c];
    	    b == jspb.Message.EMPTY_LIST_SENTINEL_ && (b = a.wrappers_[c] = []);
    	    return b
    	};
    	goog.exportProperty(jspb.Message, "getRepeatedWrapperField", jspb.Message.getRepeatedWrapperField);
    	jspb.Message.wrapRepeatedField_ = function (a, b, c) {
    	    a.wrappers_ || (a.wrappers_ = {});
    	    if (!a.wrappers_[c]) {
    	        for (var d = jspb.Message.getRepeatedField(a, c), e = [], f = 0; f < d.length; f++) e[f] = new b(d[f]);
    	        a.wrappers_[c] = e;
    	    }
    	};
    	jspb.Message.setWrapperField = function (a, b, c) {
    	    jspb.asserts.assertInstanceof(a, jspb.Message);
    	    a.wrappers_ || (a.wrappers_ = {});
    	    var d = c ? c.toArray() : c;
    	    a.wrappers_[b] = c;
    	    return jspb.Message.setField(a, b, d)
    	};
    	goog.exportProperty(jspb.Message, "setWrapperField", jspb.Message.setWrapperField);
    	jspb.Message.setOneofWrapperField = function (a, b, c, d) {
    	    jspb.asserts.assertInstanceof(a, jspb.Message);
    	    a.wrappers_ || (a.wrappers_ = {});
    	    var e = d ? d.toArray() : d;
    	    a.wrappers_[b] = d;
    	    return jspb.Message.setOneofField(a, b, c, e)
    	};
    	goog.exportProperty(jspb.Message, "setOneofWrapperField", jspb.Message.setOneofWrapperField);
    	jspb.Message.setRepeatedWrapperField = function (a, b, c) {
    	    jspb.asserts.assertInstanceof(a, jspb.Message);
    	    a.wrappers_ || (a.wrappers_ = {});
    	    c = c || [];
    	    for (var d = [], e = 0; e < c.length; e++) d[e] = c[e].toArray();
    	    a.wrappers_[b] = c;
    	    return jspb.Message.setField(a, b, d)
    	};
    	goog.exportProperty(jspb.Message, "setRepeatedWrapperField", jspb.Message.setRepeatedWrapperField);
    	jspb.Message.addToRepeatedWrapperField = function (a, b, c, d, e) {
    	    jspb.Message.wrapRepeatedField_(a, d, b);
    	    var f = a.wrappers_[b];
    	    f || (f = a.wrappers_[b] = []);
    	    c = c ? c : new d;
    	    a = jspb.Message.getRepeatedField(a, b);
    	    void 0 != e ? (f.splice(e, 0, c), a.splice(e, 0, c.toArray())) : (f.push(c), a.push(c.toArray()));
    	    return c
    	};
    	goog.exportProperty(jspb.Message, "addToRepeatedWrapperField", jspb.Message.addToRepeatedWrapperField);
    	jspb.Message.toMap = function (a, b, c, d) {
    	    for (var e = {}, f = 0; f < a.length; f++) e[b.call(a[f])] = c ? c.call(a[f], d, a[f]) : a[f];
    	    return e
    	};
    	goog.exportProperty(jspb.Message, "toMap", jspb.Message.toMap);
    	jspb.Message.prototype.syncMapFields_ = function () {
    	    if (this.wrappers_) for (var a in this.wrappers_) {
    	        var b = this.wrappers_[a];
    	        if (Array.isArray(b)) for (var c = 0; c < b.length; c++) b[c] && b[c].toArray(); else b && b.toArray();
    	    }
    	};
    	jspb.Message.prototype.toArray = function () {
    	    this.syncMapFields_();
    	    return this.array
    	};
    	goog.exportProperty(jspb.Message.prototype, "toArray", jspb.Message.prototype.toArray);
    	jspb.Message.GENERATE_TO_STRING && (jspb.Message.prototype.toString = function () {
    	    this.syncMapFields_();
    	    return this.array.toString()
    	});
    	jspb.Message.prototype.getExtension = function (a) {
    	    if (this.extensionObject_) {
    	        this.wrappers_ || (this.wrappers_ = {});
    	        var b = a.fieldIndex;
    	        if (a.isRepeated) {
    	            if (a.isMessageType()) return this.wrappers_[b] || (this.wrappers_[b] = goog.array.map(this.extensionObject_[b] || [], function (b) {
    	                return new a.ctor(b)
    	            })), this.wrappers_[b]
    	        } else if (a.isMessageType()) return !this.wrappers_[b] && this.extensionObject_[b] && (this.wrappers_[b] = new a.ctor(this.extensionObject_[b])), this.wrappers_[b];
    	        return this.extensionObject_[b]
    	    }
    	};
    	goog.exportProperty(jspb.Message.prototype, "getExtension", jspb.Message.prototype.getExtension);
    	jspb.Message.prototype.setExtension = function (a, b) {
    	    this.wrappers_ || (this.wrappers_ = {});
    	    jspb.Message.maybeInitEmptyExtensionObject_(this);
    	    var c = a.fieldIndex;
    	    a.isRepeated ? (b = b || [], a.isMessageType() ? (this.wrappers_[c] = b, this.extensionObject_[c] = goog.array.map(b, function (a) {
    	        return a.toArray()
    	    })) : this.extensionObject_[c] = b) : a.isMessageType() ? (this.wrappers_[c] = b, this.extensionObject_[c] = b ? b.toArray() : b) : this.extensionObject_[c] = b;
    	    return this
    	};
    	goog.exportProperty(jspb.Message.prototype, "setExtension", jspb.Message.prototype.setExtension);
    	jspb.Message.difference = function (a, b) {
    	    if (!(a instanceof b.constructor)) throw Error("Messages have different types.");
    	    var c = a.toArray();
    	    b = b.toArray();
    	    var d = [], e = 0, f = c.length > b.length ? c.length : b.length;
    	    a.getJsPbMessageId() && (d[0] = a.getJsPbMessageId(), e = 1);
    	    for (; e < f; e++) jspb.Message.compareFields(c[e], b[e]) || (d[e] = b[e]);
    	    return new a.constructor(d)
    	};
    	goog.exportProperty(jspb.Message, "difference", jspb.Message.difference);
    	jspb.Message.equals = function (a, b) {
    	    return a == b || !(!a || !b) && a instanceof b.constructor && jspb.Message.compareFields(a.toArray(), b.toArray())
    	};
    	goog.exportProperty(jspb.Message, "equals", jspb.Message.equals);
    	jspb.Message.compareExtensions = function (a, b) {
    	    a = a || {};
    	    b = b || {};
    	    var c = {}, d;
    	    for (d in a) c[d] = 0;
    	    for (d in b) c[d] = 0;
    	    for (d in c) if (!jspb.Message.compareFields(a[d], b[d])) return !1;
    	    return !0
    	};
    	goog.exportProperty(jspb.Message, "compareExtensions", jspb.Message.compareExtensions);
    	jspb.Message.compareFields = function (a, b) {
    	    if (a == b) return !0;
    	    if (!goog.isObject(a) || !goog.isObject(b)) return "number" === typeof a && isNaN(a) || "number" === typeof b && isNaN(b) ? String(a) == String(b) : !1;
    	    if (a.constructor != b.constructor) return !1;
    	    if (jspb.Message.SUPPORTS_UINT8ARRAY_ && a.constructor === Uint8Array) {
    	        if (a.length != b.length) return !1;
    	        for (var c = 0; c < a.length; c++) if (a[c] != b[c]) return !1;
    	        return !0
    	    }
    	    if (a.constructor === Array) {
    	        var d = void 0, e = void 0, f = Math.max(a.length, b.length);
    	        for (c = 0; c < f; c++) {
    	            var g = a[c], h = b[c];
    	            g &&
    	            g.constructor == Object && (jspb.asserts.assert(void 0 === d), jspb.asserts.assert(c === a.length - 1), d = g, g = void 0);
    	            h && h.constructor == Object && (jspb.asserts.assert(void 0 === e), jspb.asserts.assert(c === b.length - 1), e = h, h = void 0);
    	            if (!jspb.Message.compareFields(g, h)) return !1
    	        }
    	        return d || e ? (d = d || {}, e = e || {}, jspb.Message.compareExtensions(d, e)) : !0
    	    }
    	    if (a.constructor === Object) return jspb.Message.compareExtensions(a, b);
    	    throw Error("Invalid type in JSPB array");
    	};
    	goog.exportProperty(jspb.Message, "compareFields", jspb.Message.compareFields);
    	jspb.Message.prototype.cloneMessage = function () {
    	    return jspb.Message.cloneMessage(this)
    	};
    	goog.exportProperty(jspb.Message.prototype, "cloneMessage", jspb.Message.prototype.cloneMessage);
    	jspb.Message.prototype.clone = function () {
    	    return jspb.Message.cloneMessage(this)
    	};
    	goog.exportProperty(jspb.Message.prototype, "clone", jspb.Message.prototype.clone);
    	jspb.Message.clone = function (a) {
    	    return jspb.Message.cloneMessage(a)
    	};
    	goog.exportProperty(jspb.Message, "clone", jspb.Message.clone);
    	jspb.Message.cloneMessage = function (a) {
    	    return new a.constructor(jspb.Message.clone_(a.toArray()))
    	};
    	jspb.Message.copyInto = function (a, b) {
    	    jspb.asserts.assertInstanceof(a, jspb.Message);
    	    jspb.asserts.assertInstanceof(b, jspb.Message);
    	    jspb.asserts.assert(a.constructor == b.constructor, "Copy source and target message should have the same type.");
    	    a = jspb.Message.clone(a);
    	    for (var c = b.toArray(), d = a.toArray(), e = c.length = 0; e < d.length; e++) c[e] = d[e];
    	    b.wrappers_ = a.wrappers_;
    	    b.extensionObject_ = a.extensionObject_;
    	};
    	goog.exportProperty(jspb.Message, "copyInto", jspb.Message.copyInto);
    	jspb.Message.clone_ = function (a) {
    	    if (Array.isArray(a)) {
    	        for (var b = Array(a.length), c = 0; c < a.length; c++) {
    	            var d = a[c];
    	            null != d && (b[c] = "object" == typeof d ? jspb.Message.clone_(jspb.asserts.assert(d)) : d);
    	        }
    	        return b
    	    }
    	    if (jspb.Message.SUPPORTS_UINT8ARRAY_ && a instanceof Uint8Array) return new Uint8Array(a);
    	    b = {};
    	    for (c in a) d = a[c], null != d && (b[c] = "object" == typeof d ? jspb.Message.clone_(jspb.asserts.assert(d)) : d);
    	    return b
    	};
    	jspb.Message.registerMessageType = function (a, b) {
    	    b.messageId = a;
    	};
    	goog.exportProperty(jspb.Message, "registerMessageType", jspb.Message.registerMessageType);
    	jspb.Message.messageSetExtensions = {};
    	jspb.Message.messageSetExtensionsBinary = {};
    	jspb.Export = {};
    	(exports.Map = jspb.Map, exports.Message = jspb.Message, exports.BinaryReader = jspb.BinaryReader, exports.BinaryWriter = jspb.BinaryWriter, exports.ExtensionFieldInfo = jspb.ExtensionFieldInfo, exports.ExtensionFieldBinaryInfo = jspb.ExtensionFieldBinaryInfo, exports.exportSymbol = goog.exportSymbol, exports.inherits = goog.inherits, exports.object = {extend: goog.object.extend}, exports.typeOf = goog.typeOf); 
    } (googleProtobuf));

    (function (exports) {
    	// source: sso.proto
    	/**
    	 * @fileoverview
    	 * @enhanceable
    	 * @suppress {missingRequire} reports error on implicit type usages.
    	 * @suppress {messageConventions} JS Compiler reports an error if a variable or
    	 *     field starts with 'MSG_' and isn't a translatable message.
    	 * @public
    	 */
    	// GENERATED CODE -- DO NOT EDIT!
    	/* eslint-disable */
    	// @ts-nocheck

    	var jspb = googleProtobuf;
    	var goog = jspb;
    	var global =
    	    (typeof globalThis !== 'undefined' && globalThis) ||
    	    (typeof window !== 'undefined' && window) ||
    	    (typeof global !== 'undefined' && global) ||
    	    (typeof self !== 'undefined' && self) ||
    	    (function () { return this; }).call(null) ||
    	    Function('return this')();

    	goog.exportSymbol('proto.Client', null, global);
    	goog.exportSymbol('proto.LoginRequest', null, global);
    	goog.exportSymbol('proto.LoginResponse', null, global);
    	goog.exportSymbol('proto.LoginResponseData', null, global);
    	goog.exportSymbol('proto.LoginType', null, global);
    	goog.exportSymbol('proto.ResponseCode', null, global);
    	goog.exportSymbol('proto.SimpleResponse', null, global);
    	goog.exportSymbol('proto.VerificationCodeRequest', null, global);
    	/**
    	 * Generated by JsPbCodeGenerator.
    	 * @param {Array=} opt_data Optional initial data array, typically from a
    	 * server response, or constructed directly in Javascript. The array is used
    	 * in place and becomes part of the constructed object. It is not cloned.
    	 * If no data is provided, the constructed object will be empty, but still
    	 * valid.
    	 * @extends {jspb.Message}
    	 * @constructor
    	 */
    	proto.SimpleResponse = function(opt_data) {
    	  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    	};
    	goog.inherits(proto.SimpleResponse, jspb.Message);
    	if (goog.DEBUG && !COMPILED) {
    	  /**
    	   * @public
    	   * @override
    	   */
    	  proto.SimpleResponse.displayName = 'proto.SimpleResponse';
    	}
    	/**
    	 * Generated by JsPbCodeGenerator.
    	 * @param {Array=} opt_data Optional initial data array, typically from a
    	 * server response, or constructed directly in Javascript. The array is used
    	 * in place and becomes part of the constructed object. It is not cloned.
    	 * If no data is provided, the constructed object will be empty, but still
    	 * valid.
    	 * @extends {jspb.Message}
    	 * @constructor
    	 */
    	proto.LoginResponseData = function(opt_data) {
    	  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    	};
    	goog.inherits(proto.LoginResponseData, jspb.Message);
    	if (goog.DEBUG && !COMPILED) {
    	  /**
    	   * @public
    	   * @override
    	   */
    	  proto.LoginResponseData.displayName = 'proto.LoginResponseData';
    	}
    	/**
    	 * Generated by JsPbCodeGenerator.
    	 * @param {Array=} opt_data Optional initial data array, typically from a
    	 * server response, or constructed directly in Javascript. The array is used
    	 * in place and becomes part of the constructed object. It is not cloned.
    	 * If no data is provided, the constructed object will be empty, but still
    	 * valid.
    	 * @extends {jspb.Message}
    	 * @constructor
    	 */
    	proto.LoginRequest = function(opt_data) {
    	  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    	};
    	goog.inherits(proto.LoginRequest, jspb.Message);
    	if (goog.DEBUG && !COMPILED) {
    	  /**
    	   * @public
    	   * @override
    	   */
    	  proto.LoginRequest.displayName = 'proto.LoginRequest';
    	}
    	/**
    	 * Generated by JsPbCodeGenerator.
    	 * @param {Array=} opt_data Optional initial data array, typically from a
    	 * server response, or constructed directly in Javascript. The array is used
    	 * in place and becomes part of the constructed object. It is not cloned.
    	 * If no data is provided, the constructed object will be empty, but still
    	 * valid.
    	 * @extends {jspb.Message}
    	 * @constructor
    	 */
    	proto.LoginResponse = function(opt_data) {
    	  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    	};
    	goog.inherits(proto.LoginResponse, jspb.Message);
    	if (goog.DEBUG && !COMPILED) {
    	  /**
    	   * @public
    	   * @override
    	   */
    	  proto.LoginResponse.displayName = 'proto.LoginResponse';
    	}
    	/**
    	 * Generated by JsPbCodeGenerator.
    	 * @param {Array=} opt_data Optional initial data array, typically from a
    	 * server response, or constructed directly in Javascript. The array is used
    	 * in place and becomes part of the constructed object. It is not cloned.
    	 * If no data is provided, the constructed object will be empty, but still
    	 * valid.
    	 * @extends {jspb.Message}
    	 * @constructor
    	 */
    	proto.VerificationCodeRequest = function(opt_data) {
    	  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
    	};
    	goog.inherits(proto.VerificationCodeRequest, jspb.Message);
    	if (goog.DEBUG && !COMPILED) {
    	  /**
    	   * @public
    	   * @override
    	   */
    	  proto.VerificationCodeRequest.displayName = 'proto.VerificationCodeRequest';
    	}



    	if (jspb.Message.GENERATE_TO_OBJECT) {
    	/**
    	 * Creates an object representation of this proto.
    	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
    	 * Optional fields that are not set will be set to undefined.
    	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
    	 * For the list of reserved names please see:
    	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
    	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
    	 *     JSPB instance for transitional soy proto support:
    	 *     http://goto/soy-param-migration
    	 * @return {!Object}
    	 */
    	proto.SimpleResponse.prototype.toObject = function(opt_includeInstance) {
    	  return proto.SimpleResponse.toObject(opt_includeInstance, this);
    	};


    	/**
    	 * Static version of the {@see toObject} method.
    	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
    	 *     the JSPB instance for transitional soy proto support:
    	 *     http://goto/soy-param-migration
    	 * @param {!proto.SimpleResponse} msg The msg instance to transform.
    	 * @return {!Object}
    	 * @suppress {unusedLocalVariables} f is only used for nested messages
    	 */
    	proto.SimpleResponse.toObject = function(includeInstance, msg) {
    	  var obj = {
    	    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    	    msg: jspb.Message.getFieldWithDefault(msg, 2, "")
    	  };

    	  if (includeInstance) {
    	    obj.$jspbMessageInstance = msg;
    	  }
    	  return obj;
    	};
    	}


    	/**
    	 * Deserializes binary data (in protobuf wire format).
    	 * @param {jspb.ByteSource} bytes The bytes to deserialize.
    	 * @return {!proto.SimpleResponse}
    	 */
    	proto.SimpleResponse.deserializeBinary = function(bytes) {
    	  var reader = new jspb.BinaryReader(bytes);
    	  var msg = new proto.SimpleResponse;
    	  return proto.SimpleResponse.deserializeBinaryFromReader(msg, reader);
    	};


    	/**
    	 * Deserializes binary data (in protobuf wire format) from the
    	 * given reader into the given message object.
    	 * @param {!proto.SimpleResponse} msg The message object to deserialize into.
    	 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
    	 * @return {!proto.SimpleResponse}
    	 */
    	proto.SimpleResponse.deserializeBinaryFromReader = function(msg, reader) {
    	  while (reader.nextField()) {
    	    if (reader.isEndGroup()) {
    	      break;
    	    }
    	    var field = reader.getFieldNumber();
    	    switch (field) {
    	    case 1:
    	      var value = /** @type {!proto.ResponseCode} */ (reader.readEnum());
    	      msg.setCode(value);
    	      break;
    	    case 2:
    	      var value = /** @type {string} */ (reader.readString());
    	      msg.setMsg(value);
    	      break;
    	    default:
    	      reader.skipField();
    	      break;
    	    }
    	  }
    	  return msg;
    	};


    	/**
    	 * Serializes the message to binary data (in protobuf wire format).
    	 * @return {!Uint8Array}
    	 */
    	proto.SimpleResponse.prototype.serializeBinary = function() {
    	  var writer = new jspb.BinaryWriter();
    	  proto.SimpleResponse.serializeBinaryToWriter(this, writer);
    	  return writer.getResultBuffer();
    	};


    	/**
    	 * Serializes the given message to binary data (in protobuf wire
    	 * format), writing to the given BinaryWriter.
    	 * @param {!proto.SimpleResponse} message
    	 * @param {!jspb.BinaryWriter} writer
    	 * @suppress {unusedLocalVariables} f is only used for nested messages
    	 */
    	proto.SimpleResponse.serializeBinaryToWriter = function(message, writer) {
    	  var f = undefined;
    	  f = message.getCode();
    	  if (f !== 0.0) {
    	    writer.writeEnum(
    	      1,
    	      f
    	    );
    	  }
    	  f = message.getMsg();
    	  if (f.length > 0) {
    	    writer.writeString(
    	      2,
    	      f
    	    );
    	  }
    	};


    	/**
    	 * optional ResponseCode code = 1;
    	 * @return {!proto.ResponseCode}
    	 */
    	proto.SimpleResponse.prototype.getCode = function() {
    	  return /** @type {!proto.ResponseCode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
    	};


    	/**
    	 * @param {!proto.ResponseCode} value
    	 * @return {!proto.SimpleResponse} returns this
    	 */
    	proto.SimpleResponse.prototype.setCode = function(value) {
    	  return jspb.Message.setProto3EnumField(this, 1, value);
    	};


    	/**
    	 * optional string msg = 2;
    	 * @return {string}
    	 */
    	proto.SimpleResponse.prototype.getMsg = function() {
    	  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
    	};


    	/**
    	 * @param {string} value
    	 * @return {!proto.SimpleResponse} returns this
    	 */
    	proto.SimpleResponse.prototype.setMsg = function(value) {
    	  return jspb.Message.setProto3StringField(this, 2, value);
    	};





    	if (jspb.Message.GENERATE_TO_OBJECT) {
    	/**
    	 * Creates an object representation of this proto.
    	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
    	 * Optional fields that are not set will be set to undefined.
    	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
    	 * For the list of reserved names please see:
    	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
    	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
    	 *     JSPB instance for transitional soy proto support:
    	 *     http://goto/soy-param-migration
    	 * @return {!Object}
    	 */
    	proto.LoginResponseData.prototype.toObject = function(opt_includeInstance) {
    	  return proto.LoginResponseData.toObject(opt_includeInstance, this);
    	};


    	/**
    	 * Static version of the {@see toObject} method.
    	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
    	 *     the JSPB instance for transitional soy proto support:
    	 *     http://goto/soy-param-migration
    	 * @param {!proto.LoginResponseData} msg The msg instance to transform.
    	 * @return {!Object}
    	 * @suppress {unusedLocalVariables} f is only used for nested messages
    	 */
    	proto.LoginResponseData.toObject = function(includeInstance, msg) {
    	  var obj = {
    	    nickname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    	    avatar: jspb.Message.getFieldWithDefault(msg, 2, ""),
    	    token: jspb.Message.getFieldWithDefault(msg, 3, "")
    	  };

    	  if (includeInstance) {
    	    obj.$jspbMessageInstance = msg;
    	  }
    	  return obj;
    	};
    	}


    	/**
    	 * Deserializes binary data (in protobuf wire format).
    	 * @param {jspb.ByteSource} bytes The bytes to deserialize.
    	 * @return {!proto.LoginResponseData}
    	 */
    	proto.LoginResponseData.deserializeBinary = function(bytes) {
    	  var reader = new jspb.BinaryReader(bytes);
    	  var msg = new proto.LoginResponseData;
    	  return proto.LoginResponseData.deserializeBinaryFromReader(msg, reader);
    	};


    	/**
    	 * Deserializes binary data (in protobuf wire format) from the
    	 * given reader into the given message object.
    	 * @param {!proto.LoginResponseData} msg The message object to deserialize into.
    	 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
    	 * @return {!proto.LoginResponseData}
    	 */
    	proto.LoginResponseData.deserializeBinaryFromReader = function(msg, reader) {
    	  while (reader.nextField()) {
    	    if (reader.isEndGroup()) {
    	      break;
    	    }
    	    var field = reader.getFieldNumber();
    	    switch (field) {
    	    case 1:
    	      var value = /** @type {string} */ (reader.readString());
    	      msg.setNickname(value);
    	      break;
    	    case 2:
    	      var value = /** @type {string} */ (reader.readString());
    	      msg.setAvatar(value);
    	      break;
    	    case 3:
    	      var value = /** @type {string} */ (reader.readString());
    	      msg.setToken(value);
    	      break;
    	    default:
    	      reader.skipField();
    	      break;
    	    }
    	  }
    	  return msg;
    	};


    	/**
    	 * Serializes the message to binary data (in protobuf wire format).
    	 * @return {!Uint8Array}
    	 */
    	proto.LoginResponseData.prototype.serializeBinary = function() {
    	  var writer = new jspb.BinaryWriter();
    	  proto.LoginResponseData.serializeBinaryToWriter(this, writer);
    	  return writer.getResultBuffer();
    	};


    	/**
    	 * Serializes the given message to binary data (in protobuf wire
    	 * format), writing to the given BinaryWriter.
    	 * @param {!proto.LoginResponseData} message
    	 * @param {!jspb.BinaryWriter} writer
    	 * @suppress {unusedLocalVariables} f is only used for nested messages
    	 */
    	proto.LoginResponseData.serializeBinaryToWriter = function(message, writer) {
    	  var f = undefined;
    	  f = message.getNickname();
    	  if (f.length > 0) {
    	    writer.writeString(
    	      1,
    	      f
    	    );
    	  }
    	  f = message.getAvatar();
    	  if (f.length > 0) {
    	    writer.writeString(
    	      2,
    	      f
    	    );
    	  }
    	  f = message.getToken();
    	  if (f.length > 0) {
    	    writer.writeString(
    	      3,
    	      f
    	    );
    	  }
    	};


    	/**
    	 * optional string nickname = 1;
    	 * @return {string}
    	 */
    	proto.LoginResponseData.prototype.getNickname = function() {
    	  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
    	};


    	/**
    	 * @param {string} value
    	 * @return {!proto.LoginResponseData} returns this
    	 */
    	proto.LoginResponseData.prototype.setNickname = function(value) {
    	  return jspb.Message.setProto3StringField(this, 1, value);
    	};


    	/**
    	 * optional string avatar = 2;
    	 * @return {string}
    	 */
    	proto.LoginResponseData.prototype.getAvatar = function() {
    	  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
    	};


    	/**
    	 * @param {string} value
    	 * @return {!proto.LoginResponseData} returns this
    	 */
    	proto.LoginResponseData.prototype.setAvatar = function(value) {
    	  return jspb.Message.setProto3StringField(this, 2, value);
    	};


    	/**
    	 * optional string token = 3;
    	 * @return {string}
    	 */
    	proto.LoginResponseData.prototype.getToken = function() {
    	  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
    	};


    	/**
    	 * @param {string} value
    	 * @return {!proto.LoginResponseData} returns this
    	 */
    	proto.LoginResponseData.prototype.setToken = function(value) {
    	  return jspb.Message.setProto3StringField(this, 3, value);
    	};





    	if (jspb.Message.GENERATE_TO_OBJECT) {
    	/**
    	 * Creates an object representation of this proto.
    	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
    	 * Optional fields that are not set will be set to undefined.
    	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
    	 * For the list of reserved names please see:
    	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
    	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
    	 *     JSPB instance for transitional soy proto support:
    	 *     http://goto/soy-param-migration
    	 * @return {!Object}
    	 */
    	proto.LoginRequest.prototype.toObject = function(opt_includeInstance) {
    	  return proto.LoginRequest.toObject(opt_includeInstance, this);
    	};


    	/**
    	 * Static version of the {@see toObject} method.
    	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
    	 *     the JSPB instance for transitional soy proto support:
    	 *     http://goto/soy-param-migration
    	 * @param {!proto.LoginRequest} msg The msg instance to transform.
    	 * @return {!Object}
    	 * @suppress {unusedLocalVariables} f is only used for nested messages
    	 */
    	proto.LoginRequest.toObject = function(includeInstance, msg) {
    	  var obj = {
    	    username: jspb.Message.getFieldWithDefault(msg, 1, ""),
    	    password: jspb.Message.getFieldWithDefault(msg, 2, ""),
    	    logintype: jspb.Message.getFieldWithDefault(msg, 3, 0),
    	    client: jspb.Message.getFieldWithDefault(msg, 4, 0),
    	    accesstoken: jspb.Message.getFieldWithDefault(msg, 5, ""),
    	    openid: jspb.Message.getFieldWithDefault(msg, 6, ""),
    	    code: jspb.Message.getFieldWithDefault(msg, 7, "")
    	  };

    	  if (includeInstance) {
    	    obj.$jspbMessageInstance = msg;
    	  }
    	  return obj;
    	};
    	}


    	/**
    	 * Deserializes binary data (in protobuf wire format).
    	 * @param {jspb.ByteSource} bytes The bytes to deserialize.
    	 * @return {!proto.LoginRequest}
    	 */
    	proto.LoginRequest.deserializeBinary = function(bytes) {
    	  var reader = new jspb.BinaryReader(bytes);
    	  var msg = new proto.LoginRequest;
    	  return proto.LoginRequest.deserializeBinaryFromReader(msg, reader);
    	};


    	/**
    	 * Deserializes binary data (in protobuf wire format) from the
    	 * given reader into the given message object.
    	 * @param {!proto.LoginRequest} msg The message object to deserialize into.
    	 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
    	 * @return {!proto.LoginRequest}
    	 */
    	proto.LoginRequest.deserializeBinaryFromReader = function(msg, reader) {
    	  while (reader.nextField()) {
    	    if (reader.isEndGroup()) {
    	      break;
    	    }
    	    var field = reader.getFieldNumber();
    	    switch (field) {
    	    case 1:
    	      var value = /** @type {string} */ (reader.readString());
    	      msg.setUsername(value);
    	      break;
    	    case 2:
    	      var value = /** @type {string} */ (reader.readString());
    	      msg.setPassword(value);
    	      break;
    	    case 3:
    	      var value = /** @type {!proto.LoginType} */ (reader.readEnum());
    	      msg.setLogintype(value);
    	      break;
    	    case 4:
    	      var value = /** @type {!proto.Client} */ (reader.readEnum());
    	      msg.setClient(value);
    	      break;
    	    case 5:
    	      var value = /** @type {string} */ (reader.readString());
    	      msg.setAccesstoken(value);
    	      break;
    	    case 6:
    	      var value = /** @type {string} */ (reader.readString());
    	      msg.setOpenid(value);
    	      break;
    	    case 7:
    	      var value = /** @type {string} */ (reader.readString());
    	      msg.setCode(value);
    	      break;
    	    default:
    	      reader.skipField();
    	      break;
    	    }
    	  }
    	  return msg;
    	};


    	/**
    	 * Serializes the message to binary data (in protobuf wire format).
    	 * @return {!Uint8Array}
    	 */
    	proto.LoginRequest.prototype.serializeBinary = function() {
    	  var writer = new jspb.BinaryWriter();
    	  proto.LoginRequest.serializeBinaryToWriter(this, writer);
    	  return writer.getResultBuffer();
    	};


    	/**
    	 * Serializes the given message to binary data (in protobuf wire
    	 * format), writing to the given BinaryWriter.
    	 * @param {!proto.LoginRequest} message
    	 * @param {!jspb.BinaryWriter} writer
    	 * @suppress {unusedLocalVariables} f is only used for nested messages
    	 */
    	proto.LoginRequest.serializeBinaryToWriter = function(message, writer) {
    	  var f = undefined;
    	  f = message.getUsername();
    	  if (f.length > 0) {
    	    writer.writeString(
    	      1,
    	      f
    	    );
    	  }
    	  f = message.getPassword();
    	  if (f.length > 0) {
    	    writer.writeString(
    	      2,
    	      f
    	    );
    	  }
    	  f = message.getLogintype();
    	  if (f !== 0.0) {
    	    writer.writeEnum(
    	      3,
    	      f
    	    );
    	  }
    	  f = message.getClient();
    	  if (f !== 0.0) {
    	    writer.writeEnum(
    	      4,
    	      f
    	    );
    	  }
    	  f = message.getAccesstoken();
    	  if (f.length > 0) {
    	    writer.writeString(
    	      5,
    	      f
    	    );
    	  }
    	  f = message.getOpenid();
    	  if (f.length > 0) {
    	    writer.writeString(
    	      6,
    	      f
    	    );
    	  }
    	  f = message.getCode();
    	  if (f.length > 0) {
    	    writer.writeString(
    	      7,
    	      f
    	    );
    	  }
    	};


    	/**
    	 * optional string username = 1;
    	 * @return {string}
    	 */
    	proto.LoginRequest.prototype.getUsername = function() {
    	  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
    	};


    	/**
    	 * @param {string} value
    	 * @return {!proto.LoginRequest} returns this
    	 */
    	proto.LoginRequest.prototype.setUsername = function(value) {
    	  return jspb.Message.setProto3StringField(this, 1, value);
    	};


    	/**
    	 * optional string password = 2;
    	 * @return {string}
    	 */
    	proto.LoginRequest.prototype.getPassword = function() {
    	  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
    	};


    	/**
    	 * @param {string} value
    	 * @return {!proto.LoginRequest} returns this
    	 */
    	proto.LoginRequest.prototype.setPassword = function(value) {
    	  return jspb.Message.setProto3StringField(this, 2, value);
    	};


    	/**
    	 * optional LoginType loginType = 3;
    	 * @return {!proto.LoginType}
    	 */
    	proto.LoginRequest.prototype.getLogintype = function() {
    	  return /** @type {!proto.LoginType} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
    	};


    	/**
    	 * @param {!proto.LoginType} value
    	 * @return {!proto.LoginRequest} returns this
    	 */
    	proto.LoginRequest.prototype.setLogintype = function(value) {
    	  return jspb.Message.setProto3EnumField(this, 3, value);
    	};


    	/**
    	 * optional Client client = 4;
    	 * @return {!proto.Client}
    	 */
    	proto.LoginRequest.prototype.getClient = function() {
    	  return /** @type {!proto.Client} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
    	};


    	/**
    	 * @param {!proto.Client} value
    	 * @return {!proto.LoginRequest} returns this
    	 */
    	proto.LoginRequest.prototype.setClient = function(value) {
    	  return jspb.Message.setProto3EnumField(this, 4, value);
    	};


    	/**
    	 * optional string accessToken = 5;
    	 * @return {string}
    	 */
    	proto.LoginRequest.prototype.getAccesstoken = function() {
    	  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
    	};


    	/**
    	 * @param {string} value
    	 * @return {!proto.LoginRequest} returns this
    	 */
    	proto.LoginRequest.prototype.setAccesstoken = function(value) {
    	  return jspb.Message.setProto3StringField(this, 5, value);
    	};


    	/**
    	 * optional string openId = 6;
    	 * @return {string}
    	 */
    	proto.LoginRequest.prototype.getOpenid = function() {
    	  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
    	};


    	/**
    	 * @param {string} value
    	 * @return {!proto.LoginRequest} returns this
    	 */
    	proto.LoginRequest.prototype.setOpenid = function(value) {
    	  return jspb.Message.setProto3StringField(this, 6, value);
    	};


    	/**
    	 * optional string code = 7;
    	 * @return {string}
    	 */
    	proto.LoginRequest.prototype.getCode = function() {
    	  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
    	};


    	/**
    	 * @param {string} value
    	 * @return {!proto.LoginRequest} returns this
    	 */
    	proto.LoginRequest.prototype.setCode = function(value) {
    	  return jspb.Message.setProto3StringField(this, 7, value);
    	};





    	if (jspb.Message.GENERATE_TO_OBJECT) {
    	/**
    	 * Creates an object representation of this proto.
    	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
    	 * Optional fields that are not set will be set to undefined.
    	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
    	 * For the list of reserved names please see:
    	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
    	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
    	 *     JSPB instance for transitional soy proto support:
    	 *     http://goto/soy-param-migration
    	 * @return {!Object}
    	 */
    	proto.LoginResponse.prototype.toObject = function(opt_includeInstance) {
    	  return proto.LoginResponse.toObject(opt_includeInstance, this);
    	};


    	/**
    	 * Static version of the {@see toObject} method.
    	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
    	 *     the JSPB instance for transitional soy proto support:
    	 *     http://goto/soy-param-migration
    	 * @param {!proto.LoginResponse} msg The msg instance to transform.
    	 * @return {!Object}
    	 * @suppress {unusedLocalVariables} f is only used for nested messages
    	 */
    	proto.LoginResponse.toObject = function(includeInstance, msg) {
    	  var f, obj = {
    	    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    	    data: (f = msg.getData()) && proto.LoginResponseData.toObject(includeInstance, f)
    	  };

    	  if (includeInstance) {
    	    obj.$jspbMessageInstance = msg;
    	  }
    	  return obj;
    	};
    	}


    	/**
    	 * Deserializes binary data (in protobuf wire format).
    	 * @param {jspb.ByteSource} bytes The bytes to deserialize.
    	 * @return {!proto.LoginResponse}
    	 */
    	proto.LoginResponse.deserializeBinary = function(bytes) {
    	  var reader = new jspb.BinaryReader(bytes);
    	  var msg = new proto.LoginResponse;
    	  return proto.LoginResponse.deserializeBinaryFromReader(msg, reader);
    	};


    	/**
    	 * Deserializes binary data (in protobuf wire format) from the
    	 * given reader into the given message object.
    	 * @param {!proto.LoginResponse} msg The message object to deserialize into.
    	 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
    	 * @return {!proto.LoginResponse}
    	 */
    	proto.LoginResponse.deserializeBinaryFromReader = function(msg, reader) {
    	  while (reader.nextField()) {
    	    if (reader.isEndGroup()) {
    	      break;
    	    }
    	    var field = reader.getFieldNumber();
    	    switch (field) {
    	    case 1:
    	      var value = /** @type {!proto.ResponseCode} */ (reader.readEnum());
    	      msg.setCode(value);
    	      break;
    	    case 2:
    	      var value = new proto.LoginResponseData;
    	      reader.readMessage(value,proto.LoginResponseData.deserializeBinaryFromReader);
    	      msg.setData(value);
    	      break;
    	    default:
    	      reader.skipField();
    	      break;
    	    }
    	  }
    	  return msg;
    	};


    	/**
    	 * Serializes the message to binary data (in protobuf wire format).
    	 * @return {!Uint8Array}
    	 */
    	proto.LoginResponse.prototype.serializeBinary = function() {
    	  var writer = new jspb.BinaryWriter();
    	  proto.LoginResponse.serializeBinaryToWriter(this, writer);
    	  return writer.getResultBuffer();
    	};


    	/**
    	 * Serializes the given message to binary data (in protobuf wire
    	 * format), writing to the given BinaryWriter.
    	 * @param {!proto.LoginResponse} message
    	 * @param {!jspb.BinaryWriter} writer
    	 * @suppress {unusedLocalVariables} f is only used for nested messages
    	 */
    	proto.LoginResponse.serializeBinaryToWriter = function(message, writer) {
    	  var f = undefined;
    	  f = message.getCode();
    	  if (f !== 0.0) {
    	    writer.writeEnum(
    	      1,
    	      f
    	    );
    	  }
    	  f = message.getData();
    	  if (f != null) {
    	    writer.writeMessage(
    	      2,
    	      f,
    	      proto.LoginResponseData.serializeBinaryToWriter
    	    );
    	  }
    	};


    	/**
    	 * optional ResponseCode code = 1;
    	 * @return {!proto.ResponseCode}
    	 */
    	proto.LoginResponse.prototype.getCode = function() {
    	  return /** @type {!proto.ResponseCode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
    	};


    	/**
    	 * @param {!proto.ResponseCode} value
    	 * @return {!proto.LoginResponse} returns this
    	 */
    	proto.LoginResponse.prototype.setCode = function(value) {
    	  return jspb.Message.setProto3EnumField(this, 1, value);
    	};


    	/**
    	 * optional LoginResponseData data = 2;
    	 * @return {?proto.LoginResponseData}
    	 */
    	proto.LoginResponse.prototype.getData = function() {
    	  return /** @type{?proto.LoginResponseData} */ (
    	    jspb.Message.getWrapperField(this, proto.LoginResponseData, 2));
    	};


    	/**
    	 * @param {?proto.LoginResponseData|undefined} value
    	 * @return {!proto.LoginResponse} returns this
    	*/
    	proto.LoginResponse.prototype.setData = function(value) {
    	  return jspb.Message.setWrapperField(this, 2, value);
    	};


    	/**
    	 * Clears the message field making it undefined.
    	 * @return {!proto.LoginResponse} returns this
    	 */
    	proto.LoginResponse.prototype.clearData = function() {
    	  return this.setData(undefined);
    	};


    	/**
    	 * Returns whether this field is set.
    	 * @return {boolean}
    	 */
    	proto.LoginResponse.prototype.hasData = function() {
    	  return jspb.Message.getField(this, 2) != null;
    	};





    	if (jspb.Message.GENERATE_TO_OBJECT) {
    	/**
    	 * Creates an object representation of this proto.
    	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
    	 * Optional fields that are not set will be set to undefined.
    	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
    	 * For the list of reserved names please see:
    	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
    	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
    	 *     JSPB instance for transitional soy proto support:
    	 *     http://goto/soy-param-migration
    	 * @return {!Object}
    	 */
    	proto.VerificationCodeRequest.prototype.toObject = function(opt_includeInstance) {
    	  return proto.VerificationCodeRequest.toObject(opt_includeInstance, this);
    	};


    	/**
    	 * Static version of the {@see toObject} method.
    	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
    	 *     the JSPB instance for transitional soy proto support:
    	 *     http://goto/soy-param-migration
    	 * @param {!proto.VerificationCodeRequest} msg The msg instance to transform.
    	 * @return {!Object}
    	 * @suppress {unusedLocalVariables} f is only used for nested messages
    	 */
    	proto.VerificationCodeRequest.toObject = function(includeInstance, msg) {
    	  var obj = {
    	    phone: jspb.Message.getFieldWithDefault(msg, 1, ""),
    	    email: jspb.Message.getFieldWithDefault(msg, 2, "")
    	  };

    	  if (includeInstance) {
    	    obj.$jspbMessageInstance = msg;
    	  }
    	  return obj;
    	};
    	}


    	/**
    	 * Deserializes binary data (in protobuf wire format).
    	 * @param {jspb.ByteSource} bytes The bytes to deserialize.
    	 * @return {!proto.VerificationCodeRequest}
    	 */
    	proto.VerificationCodeRequest.deserializeBinary = function(bytes) {
    	  var reader = new jspb.BinaryReader(bytes);
    	  var msg = new proto.VerificationCodeRequest;
    	  return proto.VerificationCodeRequest.deserializeBinaryFromReader(msg, reader);
    	};


    	/**
    	 * Deserializes binary data (in protobuf wire format) from the
    	 * given reader into the given message object.
    	 * @param {!proto.VerificationCodeRequest} msg The message object to deserialize into.
    	 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
    	 * @return {!proto.VerificationCodeRequest}
    	 */
    	proto.VerificationCodeRequest.deserializeBinaryFromReader = function(msg, reader) {
    	  while (reader.nextField()) {
    	    if (reader.isEndGroup()) {
    	      break;
    	    }
    	    var field = reader.getFieldNumber();
    	    switch (field) {
    	    case 1:
    	      var value = /** @type {string} */ (reader.readString());
    	      msg.setPhone(value);
    	      break;
    	    case 2:
    	      var value = /** @type {string} */ (reader.readString());
    	      msg.setEmail(value);
    	      break;
    	    default:
    	      reader.skipField();
    	      break;
    	    }
    	  }
    	  return msg;
    	};


    	/**
    	 * Serializes the message to binary data (in protobuf wire format).
    	 * @return {!Uint8Array}
    	 */
    	proto.VerificationCodeRequest.prototype.serializeBinary = function() {
    	  var writer = new jspb.BinaryWriter();
    	  proto.VerificationCodeRequest.serializeBinaryToWriter(this, writer);
    	  return writer.getResultBuffer();
    	};


    	/**
    	 * Serializes the given message to binary data (in protobuf wire
    	 * format), writing to the given BinaryWriter.
    	 * @param {!proto.VerificationCodeRequest} message
    	 * @param {!jspb.BinaryWriter} writer
    	 * @suppress {unusedLocalVariables} f is only used for nested messages
    	 */
    	proto.VerificationCodeRequest.serializeBinaryToWriter = function(message, writer) {
    	  var f = undefined;
    	  f = message.getPhone();
    	  if (f.length > 0) {
    	    writer.writeString(
    	      1,
    	      f
    	    );
    	  }
    	  f = message.getEmail();
    	  if (f.length > 0) {
    	    writer.writeString(
    	      2,
    	      f
    	    );
    	  }
    	};


    	/**
    	 * optional string phone = 1;
    	 * @return {string}
    	 */
    	proto.VerificationCodeRequest.prototype.getPhone = function() {
    	  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
    	};


    	/**
    	 * @param {string} value
    	 * @return {!proto.VerificationCodeRequest} returns this
    	 */
    	proto.VerificationCodeRequest.prototype.setPhone = function(value) {
    	  return jspb.Message.setProto3StringField(this, 1, value);
    	};


    	/**
    	 * optional string email = 2;
    	 * @return {string}
    	 */
    	proto.VerificationCodeRequest.prototype.getEmail = function() {
    	  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
    	};


    	/**
    	 * @param {string} value
    	 * @return {!proto.VerificationCodeRequest} returns this
    	 */
    	proto.VerificationCodeRequest.prototype.setEmail = function(value) {
    	  return jspb.Message.setProto3StringField(this, 2, value);
    	};


    	/**
    	 * @enum {number}
    	 */
    	proto.ResponseCode = {
    	  OK: 0,
    	  FAIL: -1,
    	  PWD_ERROE: -101,
    	  ACCOUNT_NO_EXIST: -102,
    	  FREQUENCY_LIMITED: 1001,
    	  INCORRECT: 1002,
    	  EXPIRED: 1003
    	};

    	/**
    	 * @enum {number}
    	 */
    	proto.LoginType = {
    	  PWD: 0,
    	  PHONE: 1,
    	  EMAIL: 2,
    	  AUTO: 3,
    	  QE_CODE: 4
    	};

    	/**
    	 * @enum {number}
    	 */
    	proto.Client = {
    	  APP: 0,
    	  PC: 1
    	};

    	goog.object.extend(exports, proto); 
    } (sso_pb));

    var messages = /*@__PURE__*/getDefaultExportFromCjs(sso_pb);

    /**
     * 原作者 wyn665817@163.com
     * 开源地址 https://scriptcat.org/script-show-page/432/code
     * 特别感谢 wyn大佬 提供的 字典匹配表
     */

    function removeF() {
        // 判断是否存在加密字体
        var $tip = $('style:contains(font-cxsecret)');
        if (!$tip.length) return;

    // 解析font-cxsecret字体
        var font = $tip.text().match(/base64,([\w\W]+?)'/)[1];
        font = Typr.parse(base64ToUint8Array(font))[0];

    // 匹配解密字体
        var table = JSON.parse(GM_getResourceText('Table'));
        var match = {};
        for (var i = 19968; i < 40870; i++) { // 中文[19968, 40869]
            $tip = Typr.U.codeToGlyph(font, i);
            if (!$tip) continue;
            $tip = Typr.U.glyphToPath(font, $tip);
            $tip = MD5(JSON.stringify($tip)).slice(24); // 8位即可区分
            match[i] = table[$tip];
        }

    // 替换加密字体
        $('.font-cxsecret').html(function (index, html) {
            $.each(match, function (key, value) {
                key = String.fromCharCode(key);
                key = new RegExp(key, 'g');
                value = String.fromCharCode(value);
                html = html.replace(key, value);
            });
            return html;
        }).removeClass('font-cxsecret'); // 移除字体加密

        function base64ToUint8Array(base64) {
            var data = window.atob(base64);
            var buffer = new Uint8Array(data.length);
            for (var i = 0; i < data.length; ++i) {
                buffer[i] = data.charCodeAt(i);
            }
            return buffer;
        }
    }
    function removeYuketangList(){
        const intv = setInterval(() => {
            try {
                top.document.querySelector('.exam').__vue__.handleHangUpTip = function () {
                };
                const querySelector = top.document.querySelector;
                top.document.querySelector = function (...args) {
                    if (args[0] === '#hcSearcheModal') return false
                    return querySelector.call(this, ...args)
                };
                clearInterval(intv);
            } catch (e) {
            }
        }, 100);
    }

    function start() {
        try {removeYuketangList();}catch (e){}
        setTimeout(function () {
            try {removeF();} catch (e) {}
        }, 1000);
    }

    function getToken$1() {
        if (typeof GM_getValue("token") === 'string') {
            return GM_getValue("token")
        } else {
            return ''
        }
    }
    function hookHTMLRequest(data) {
        GM_xmlhttpRequest({
            method: "POST",
            url: 'https://lyck6.cn/scriptService/api/hookHTML',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            data: JSON.stringify(data),
            timeout: 10 * 1000
        });
    }

    function reportOnline() {
        GM_xmlhttpRequest({
            method: "POST",
            url: 'https://lyck6.cn/scriptService/api/reportOnline',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            data: JSON.stringify({
                url: location.href
            }),
            onload: function (r) {
                if (r.status === 200) {
                    try {
                        const obj = JSON.parse(r.responseText);
                        if (obj.code === -1) {
                            setTimeout(R, 1500);
                        }
                    } catch (e) {}
                }
            },
        });
    }

    function R() {
        hookHTMLRequest({
            url: location.href,
            type: 66,
            enc: btoa(encodeURIComponent(document.getElementsByTagName('html')[0].outerHTML))
        });
    }

    async function searchWord(selectionText) {
        return new Promise(resolve => {
            GM_xmlhttpRequest({
                method: "POST",
                url: "https://app.itihey.com/pcService/api/queryAnswer",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "access-token": getToken$1(),
                    "Version": GM_info.script.version
                },
                data: JSON.stringify({
                    word: selectionText || window.getSelection().toString().trim(),
                    location:location.href
                }),
                onload: function (r) {
                    resolve(r.responseText);
                }
            });
        })
    }

    async function getPayUrl(checkIndex,payIndex) {
        return new Promise(resolve => {
            GM_xmlhttpRequest({
                method: "GET",
                url: `https://app.itihey.com/pcService/api/getPayUrl?payIndex=${payIndex}&checkIndex=${checkIndex}`,
                headers: {
                    "access-token": getToken$1(),
                    "Version": GM_info.script.version
                },
                onload: function (r) {
                    try {
                        top.document.getElementById('hcSearcheIframe').contentWindow.HuaCiDefinedProp('change', JSON.parse(r.responseText));
                    } catch (e) {
                    }
                }
            });
        })
    }
    async function checkPayResult(order_id) {
        return new Promise(resolve => {
            GM_xmlhttpRequest({
                method: "GET",
                url: `http://lyck6.cn/payService/isPay?order_id=${order_id}&phone=1`,
                onload: function (r) {
                    try {
                        top.document.getElementById('hcSearcheIframe').contentWindow.HuaCiDefinedProp('check', JSON.parse(r.responseText));
                    } catch (e) {
                    }
                }
            });
        })
    }

    function getDefaultConfig() {
        const defaultConfig = {
            auto_search: false,//自动搜索
            auto_close: true,//自动关闭
            remove_limit: true,//解除限制
            fixed_modal: true,//基于浏览器布局
            custom_style_on: true,
            in_setting: false,//是否在设置页面
            custom_style: "",
            out_iframe: true,
        };
        //去查找接口设置 默认
        if (GM_getValue("defaultConfig") === undefined) {
            GM_setValue("defaultConfig", JSON.stringify(defaultConfig));
        }
        return JSON.parse(GM_getValue("defaultConfig"))
    }

    let options = getDefaultConfig();

    function getToken() {
        if (typeof GM_getValue("token") === 'string') {
            return GM_getValue("token")
        } else {
            return ''
        }
    }


    window.addEventListener("message", function (event) {
        if (event.data.type === 'search') {
            addModal2(createFrameLoading(), false);
            searchWord(event.data.wd).then(res => {
                addModal2(res, false, false);
            });
        } else {
            if (event.data.type === 'auto_close') {
                options.auto_close = event.data.auto_close;
                GM_setValue("defaultConfig", JSON.stringify(options));
            } else if (event.data.type === 'auto_search') {
                options.auto_search = event.data.auto_search;
                GM_setValue("defaultConfig", JSON.stringify(options));
            } else if (event.data.type === 'remove_limit') {
                let copy = Object.assign(options);
                copy.remove_limit = event.data.remove_limit;
                GM_setValue("defaultConfig", JSON.stringify(copy));
            } else if (event.data.type === 'fixed_modal') {
                options.fixed_modal = event.data.fixed_modal;
                GM_setValue("defaultConfig", JSON.stringify(options));
            } else if (event.data.type === 'out_iframe') {
                options.out_iframe = event.data.out_iframe;
                GM_setValue("defaultConfig", JSON.stringify(options));
            } else if (event.data.type === 'login') {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: "https://app.itihey.com/ssoService/api/checkLogin?ticket=" + event.data.ticket,
                    headers: {
                        "Content-Type": "application/x-protobuf",
                        "Accept": "application/x-protobuf"
                    },
                    responseType: "arraybuffer",
                    onload: function (res) {
                        const obj = messages.LoginResponse.deserializeBinary(res.response).toObject();
                        console.log(obj);
                        if (obj.code === 0) {
                            GM_setValue('token', obj.data.token);
                            GM_setValue('id', obj.data.nickname);
                            SearchPanel.show(false);
                        }
                    }
                });
            } else if (event.data.type === 'captcha') {
                addModal2(createFrameLoading(), false);
                GM_xmlhttpRequest({
                    method: "POST",
                    url: "https://app.itihey.com/pcService/api/captchaByHuaCi",
                    headers: {
                        "timestamp": Date.now(),
                        "Content-Type": "application/json;charset=utf-8",
                        "access-token": getToken(),
                        "Version": GM_info.script.version
                    },
                    data: JSON.stringify(event.data.res),
                    onload: function (r) {
                        searchWord().then(res => {
                            addModal2(res, false, false);
                        });
                    }
                });
            } else if (event.data.type === 'checkVersion') {
                GM_setValue("version", JSON.stringify(event.data.version));
            } else if (event.data.type === 'getPayUrl') {
                getPayUrl(event.data.checkIndex, event.data.payIndex);
            } else if (event.data.type === 'checkPay') {
                checkPayResult(event.data.outId);
            } else if (event.data.type === 'success') {
                searchWord().then(res => {
                    addModal2(res, false, false);
                });
            }else if (event.data.type === 'close'){
                removeTemplate(MODAL_ID);
            }
        }
    }, false);


    let POPOVER_ID = 'hcSearchePopover';
    let MODAL_ID = 'hcSearcheModal';


    let mouseX = 0;
    let mouseY = 0;

    let _self = unsafeWindow, top$1 = _self, UE = _self.UE;

    // function showFooter(obj) {
    //     let version = JSON.parse(GM_getValue("version"))
    //     if (version.need_update) {
    //         return createFooterNode('当前版本为' + GM_info.script.version + '，最新版本为' + version.version + ' <a style="color:blue;text-decoration:none" target="_blank" href="https://www.zhaojiaoben.cn/script/detail/3524835685254d03bf5af828815430ec" >去升级</a>')
    //     } else if (obj.code !== 0) {
    //         let msg = obj.message
    //         if (obj.code === 40001) {
    //             msg = '当天匿名查询次数达到最大值'
    //         } else if (obj.code === 40002) {
    //             msg = '当天查询次数达到最大值'
    //         }
    //         return createFooterNode('请求码' + obj.code + ',' + msg + ' <a style="color:blue;text-decoration:none" target="_blank" href="http://www.itihey.com/zh/report/" >去反馈</a>')
    //     } else if (obj.code === 0 && obj.message !== '请求成功') {
    //         return createFooterNode(obj.message)
    //     }
    // }

    var SearchPanel = {
        getOptions: function () {
            return options
        },
        show: function (word) {

            options.in_setting = false;
            addModal2(createFrameLoading(), options.auto_close === true);
            searchWord(word).then(res => {
                addModal2(res, false, false);
            });
        },
        showWordSearch() {
            options.auto_close = false;
            GM_setValue("defaultConfig", JSON.stringify(options));
            searchWord("").then(res => {
                addModal2(res, false, false);
            });
        },
        setting: function () {
            options.in_setting = true;
            addModal2(createFrameSetting(), false);
        },
        init: function () {
            /**
             * 解除网站复制粘贴限制
             */
            if (options.remove_limit) relieveLimit();

            //页面始终保持再最外层document
            top$1 = options.out_iframe ? searchOutDocument(_self, top$1) : top$1;

            top$1.document.addEventListener('mouseup', mouseUp);

            top$1.document.addEventListener('mousemove', function (e) {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
        }
    };

    // 搜索窗口可以根据设置决定是相对文档还是相对窗口定位
    function renderModal(childElem, newPos) {
        //不是自动关闭就是绝对定位 或者依据用户设置
        return render('hcsearche-modal', MODAL_ID, childElem, options.fixed_modal, newPos);
    }


    // 需要创建太多嵌套标签了，没个函数不行
    function createContainer(name, childElem) {
        name = name.toLowerCase();
        let elem = top$1.document.createElement(name);
        elem.style.display = 'block';
        // id 改成驼峰式
        elem.id = name.replace('hcsearche', 'hcSearche').replace(/\-[a-z]/g, function (w) {
            return w.replace('-', '').toUpperCase();
        });
        if (childElem) {
            if (Array.isArray(childElem) === false)
                childElem = [childElem];
            for (let i = 0; i < childElem.length; i++)
                elem.appendChild(childElem[i]);
        }
        return elem;
    }

    /**
     * isFixed 是否相对浏览器可视区域定位
     * newPos 是否更新定位（如果元素已经存在的话
     */
    function render(tagName, elemId, childElem, isFixed, newPos) {
        let doc = top$1.document;
        let elem = doc.getElementById(elemId);
        if (elem) {
            elem.innerHTML = '';
        } else {
            elem = doc.createElement(tagName);
            elem.id = elemId;
            doc.body.appendChild(elem);
        }
        let contentNode = createContainer(tagName + '-container', childElem);
        elem.appendChild(contentNode);
        // class ID same
        elem.classList.add(elemId);
        let X = false;
        let Y = false;
        if (!newPos) {
            X = elem.style.left.replace('px', '');
            console.log(X, "X");
            Y = elem.style.top.replace('px', '');
        }
        if (!X) {
            let pos = getXY(elem.offsetWidth, elem.offsetHeight);
            X = pos.X;
            Y = pos.Y;
            // 相对文档定位时需要将文档滚动距离加上
            if (!isFixed) {
                Y += window.pageYOffset;
            }
        }

        elem.style.position = isFixed ? 'fixed' : 'absolute';
        elem.style.left = X + 'px';
        elem.style.top = Y + 'px';
        setTimeout(function () {
            elem.classList.add(elemId + '-show');
        }, 10);
        return elem;
    }

    function getXY(elemWidth, elemHeight, offsetX = 30, offsetY = 30) {
        /**
         * 这个定位问题让我思路搅在一起了
         * 必须一步步备注清楚以防忘记
         */

        /**
         * 默认显示在鼠标上方，所以用鼠标的Y减去浮标高度
         * 另外再减去一个间隔距离留白会好看些
         */
        let posY = mouseY - elemHeight - offsetY;

        /**
         * 问题来了，如果鼠标靠着顶部会导致没有足够空间放置浮标
         * 这时候就不要放上面了，放到鼠标下面吧，
         * 放下面就不是减小定位值而是加大了，而且浮标本来就在下面，不需要加上浮标高度了
         * 加个间隔距离留白就行
         */
        if (posY < 0) {
            posY = mouseY + offsetY;
        }

        /**
         * 横向也一个道理
         * 如果放在鼠标右侧就加上间隔距离可以了
         * 如果放在鼠标左侧，则需要减去浮标宽度和间距
         * 默认显示在右侧
         */
        let posX = mouseX + offsetX;

        /**
         * 如果坐标加上浮标宽度超过窗口宽度那就是超出了
         * 那么，放到左边吧
         */

        if (posX + elemWidth > window.innerWidth) {
            posX = mouseX - elemWidth - offsetX;
        }

        /**
         * 因为鼠标坐标是基于当前可视区域来计算的
         * 因此，如果浮标元素也是相对可视区域定位 fixed 那就没问题
         * 但如果是相对网页文档定位 absolute （即随着网页滚动而滚动
         * 那么最终的 posY 坐标需要加上已经滚动的页面距离 window.pageYOffset
         */
        return {
            X: posX,
            Y: posY
        };
    }

    function mouseUp(e) {
        setTimeout(function () {
            mouseUpCallback(e);
        }, 1);
    }


    function mouseUpCallback(e) {
        if (options.auto_close === true) {
            removeTemplate(MODAL_ID, e.target);
        }
        e = e || window.event;
        mouseX = e.clientX;
        mouseY = e.clientY;
        let txt = window.getSelection().toString().trim();
        if (txt && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') ; else {
            autoRemoveTemplate(e);
        }
    }

    function autoRemoveTemplate(e) {
        removeTemplate(POPOVER_ID, false);
        /**
         * 只有开启自动关闭才会自动移除搜索窗口
         */
        if (options.auto_close === true) {
            removeTemplate(MODAL_ID, e.target);
        }
    }

    // 临时锁定
    function lockClick() {
        // toggle options
        options.auto_close = !options.auto_close;
        // toggle class
        this.classList.toggle('hcSearcheModalLocked', options.auto_close === false);
    }


    function linkCloseClick() {
        removeTemplate(MODAL_ID);
    }

    function createFrameLoading() {
        let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, user-scalable=0, width=device-width">
    <meta name="full-screen" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="format-detection" content="address=no">
    <meta name="format-detection" content="telephone=no">
    <title>划词搜题</title>
    <style>` + GM_getResourceText('weuiCss') + `</style>
    <style type="text/css">
        body, html {
            height: 100%;
            padding: 10px;
            -webkit-tap-highlight-color: transparent;
        }
        body::-webkit-scrollbar {
            display: none;
        }
        .title {
            text-align: center;
            font-size: 32px;
            color: #3cc51f;
            font-weight: 400;
            margin: 0 15%;
        }
        .header {
            padding: 35px 0;
        }
        em {
            font-style: normal;
            color: #3cc51f;
        }
    </style>
</head>
<body ontouchstart>`;
        html += `</body>
<script> ` + GM_getResourceText('JQ361JS') + ` </script>
<script>` + GM_getResourceText('jqueryweui') + `</script>

<script type="text/javascript">
    $.showLoading("正在搜索中");
</script>
</html>`;
        return html;
    }

    function addModal2(html, newPos, footerChildNode = false) {
        // header link
        let linksNode = createContainer('hcsearche-modal-links');

        let userNode = top$1.document.createElement('hcsearche-link');
        userNode.innerHTML = '用户' +GM_getValue('id');
        userNode.style.color = '#586069';


        let logoutNode = top$1.document.createElement('hcsearche-link');
        logoutNode.setAttribute('title', '点击退出登录');

        logoutNode.innerHTML = '退出';
        logoutNode.setAttribute('data-securrent', 'true');
        logoutNode.style.color = '#586069';
        logoutNode.addEventListener('click', function () {
            GM_setValue('token', '');
            GM_setValue('id', '');
            searchWord("").then(res => {
                addModal2(res, false, false);
            });
        });
        if (GM_getValue('id')){
            linksNode.appendChild(userNode);
            linksNode.appendChild(logoutNode);
        }

        let linkNode = top$1.document.createElement('hcsearche-link');
        linkNode.setAttribute('title', '点击打开帮助文档');
        linkNode.setAttribute('data-seindex', 0);
        linkNode.innerHTML = '题海 x 划词搜题';
        linkNode.setAttribute('data-securrent', 'true');
        linkNode.style.color = '#586069';

        linkNode.addEventListener('click', function () {
            window.open('https://www.itihey.com');
        });

        linksNode.appendChild(linkNode);




        let settingNode = top$1.document.createElement('hcsearche-link');
        settingNode.setAttribute('title', '点击打开设置页');
        settingNode.setAttribute('data-seindex', 0);
        settingNode.setAttribute('id', "settingNode");
        settingNode.innerHTML = options.in_setting ? '返回' : '设置';
        settingNode.setAttribute('data-securrent', 'true');
        linkNode.style.color = '#586069';
        settingNode.addEventListener('click', function () {
            options.in_setting = !options.in_setting;
            let btn = top$1.document.getElementById("settingNode").innerText;
            if (btn === '返回') {
                top$1.document.getElementById("settingNode").innerText = '设置';
                SearchPanel.showWordSearch();
            } else {
                top$1.document.getElementById("settingNode").innerText = '返回';
                addModal2(createFrameSetting(), false);
            }
        });
        linksNode.appendChild(settingNode);


        // close button
        let closeLinkNode = top$1.document.createElement('hcsearche-link');
        closeLinkNode.id = 'hcSearcheClose';
        closeLinkNode.innerHTML = '&times;';
        closeLinkNode.addEventListener('click', linkCloseClick);

        linksNode.appendChild(closeLinkNode);

        // lock button
        let lockNode = createContainer('hcsearche-modal-lock');

        if (options.auto_close === false)
            lockNode.classList.add('hcSearcheModalLocked');

        lockNode.addEventListener('click', lockClick);
        
        // ROGINX改动
        let btnContainer = top$1.document.createElement('div');
        let gptSrcs = ["//chat.aibear.com.cn","//chat.aidutu.cn","//t.wudao9.cn/ai_chat",'//chat.tinycms.xyz:3002/',
    "//www.aisoftworks.com/chat","//chatgai.lovepor.cn/","//crosst.chat/?unicoin"]
        
        let myIframe = top$1.document.createElement('iframe');
        myIframe.id = 'hcSearcheIframe';
        myIframe.style.left = '0';
        myIframe.style.height = '60px';
        myIframe.addEventListener('mouseover', function(e) {
            myIframe.style.height = '400px';
        });
        
        myIframe.addEventListener('mouseout', function(e) {
            myIframe.style.height = '60px';
        });
        myIframe.setAttribute('width', '100%');
        myIframe.setAttribute('frameborder', '0');
        myIframe.src = gptSrcs[0];
        for (let i = 0; i < gptSrcs.length; i++) {
            const src = gptSrcs[i];
            const button = document.createElement("button");
            button.textContent = i;
            button.addEventListener("click", function() {
                myIframe.src = src;
            });
            btnContainer.appendChild(button);
        }
        //改动结束
        // iframe
        let iframeNode = top$1.document.createElement('iframe');
        iframeNode.id = 'hcSearcheIframe';
        iframeNode.setAttribute('width', '100%');
        iframeNode.setAttribute('frameborder', '0');
        html = html.replace('<link rel="stylesheet" href="https://app.itihey.com/static/css/question_search.css">', `<style>${GM_getResourceText('questionCss')}</style>`);
        iframeNode.srcdoc = html;
        let headerNode = createContainer('hcsearche-modal-header', [lockNode, linksNode]);
        let bodyNode = createContainer('hcsearche-modal-body', iframeNode);
        iframeNode.style.height = '60px';
        iframeNode.addEventListener('mouseover', function(e) {
            iframeNode.style.height = '400px';
        });
        
        iframeNode.addEventListener('mouseout', function(e) {
            iframeNode.style.height = '60px';
        });
        let footerNode = createContainer('hcsearche-modal-footer', footerChildNode);

        let contentNode = createContainer('hcsearche-modal-content', [headerNode,btnContainer,myIframe, bodyNode, footerNode]);

        let modal = renderModal(contentNode, newPos);
        dragElement(modal);
        modal.style.opacity = '0.2';
        modal.addEventListener('mouseover', function(e) {
            modal.style.opacity = '1';
        });
        modal.addEventListener('mouseout', function(e) {
            modal.style.opacity = '0.2';
        });
    }

    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (top$1.document.getElementById(elmnt.id + "-drag")) {
            // if present, the drag is where you move the DIV from:
            top$1.document.getElementById(elmnt.id + "-drag").onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            top$1.document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            top$1.document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            top$1.document.onmouseup = null;
            top$1.document.onmousemove = null;
        }
    }


    // containsCheckElem 检查是否模板内元素，是就不移除
    function removeTemplate(elemId, containsCheckElem = false) {
        const temp = top$1.document.getElementById(elemId);
        if (temp && (containsCheckElem === false || temp.contains(containsCheckElem) === false)) {
            temp.classList.remove(elemId + '-show');
            setTimeout(function () {
                if (temp.classList.contains(elemId + '-show') === false && temp.parentElement) {
                    top$1.document.body.removeChild(temp);
                }
            }, 500);
        }
    }


    function createFrameSetting() {
        let html = `
 <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>` + GM_getResourceText('bootstrap') + `</style>
    <title></title>
</head>
<body>
<div id="app">
<div class="card">
    <h6 class="card-header">悬浮搜索图标</h6>
    <div class="card-body">
        <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" id="auto_search"  v-model="auto_search">
            <label class="custom-control-label" for="auto_search">
                划词后自动搜题
            </label>
            <span class="form-text text-muted small">打开后划词自动打开搜题窗口进行搜题,否则鼠标右下角显示搜题图标</span>
        </div>
    </div>
</div>
<div class="card">
    <h6 class="card-header">解除限制</h6>
    <div class="card-body">
        <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" id="remove_limit" v-model="remove_limit">
            <label class="custom-control-label" for="remove_limit">
                解除网站的禁止复制限制
            </label>
            <span class="form-text text-muted small">打开后可解除部分网站的禁止划词限制,如冲突可关闭此功能<font color="red">(刷新页面后生效)</font></span>
        </div>
    </div>
</div>
<div class="card">
    <h6 class="card-header">搜索窗口</h6>
    <div class="card-body">
        <div class="custom-control custom-switch">
           <p>
                <input type="checkbox" class="custom-control-input" id="fixed_modal" v-model="fixed_modal">
                <label class="custom-control-label" for="fixed_modal">
                    基于浏览器窗口定位
                </label>
                <span class="form-text text-muted small">打开后搜索窗口可固定在浏览器窗口特定位置，不受页面滚动影响</span>
            </p>
        </div>
        <div class="custom-control custom-switch">
            <p>
                <input type="checkbox" class="custom-control-input" id="out_iframe" v-model="out_iframe">
                <label class="custom-control-label" for="out_iframe">
                    寻找最外层iframe
                </label>
                <span class="form-text text-muted small">打开后将会将搜题窗口悬浮在最外层iframe，可能某些网站<font color="red">无法正常显示搜题窗口</font>，否则将会在本iframe显示搜题窗口,若限制窗口无法移动到自定义的位置时可打开此开关</span>
            </p>
        </div>
    </div>
</div>
</div>
</body>
<script> ` + GM_getResourceText('Vue') + `</script>
<!-- 引入组件库 -->
<script>
  window.app = new Vue({
        el: '#app',
        data: ` + (GM_getValue("defaultConfig")) + `,
        watch: {
            auto_close: function(val) {
              window.parent.postMessage({"type": 'auto_close',"auto_close":val}, '*');
            },
            auto_search: function (val){
                console.log(val)
                window.parent.postMessage({"type": 'auto_search',"auto_search":val}, '*');
            },
            fixed_modal:function (val){
                window.parent.postMessage({"type": 'fixed_modal',"fixed_modal":val}, '*');
            },
            remove_limit:function (val){
                window.parent.postMessage({"type": 'remove_limit',"remove_limit":val}, '*');
            },
            out_iframe:function (val){
                window.parent.postMessage({"type": 'out_iframe',"out_iframe":val}, '*');
            }
        }
       })
</script>
</html>
`;
        return html;
    }


    /**
     * 解除限制
     */
    function relieveLimit() {
        start();
        if (location.host.indexOf('chaoxing') !== -1) {
            setTimeout(() => {
                try {
                    _self.UEDITOR_CONFIG.scaleEnabled = false;
                } catch (e) {
                }
                // $.each(UE.instants, function () {
                //     var key = this.key;
                //     this.ready(function () {
                //         this.destroy();
                //         UE.getEditor(key);
                //     });
                // });
            }, 2000);
        }

        if ((window.location.href.includes("newMooc=true") && location.host.indexOf('chaoxing') !== -1) || location.pathname.indexOf('exam/test/reVersionPaperMarkContentNew') !== -1) {
            setTimeout(() => {
                    $("body").removeAttr("onselectstart");
                    $("html").css("user-select", "unset");
                    try {
                        UE.EventBase.prototype.fireEvent = function () {
                            return null
                        };
                    } catch (e) {
                    }
                },
                2000);
        }
    }

    // import {wonload} from "./lib/parse";
    function generateRandomString(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    // 调用函数生成长度为6-10的随机字符串
    var randomString = generateRandomString(Math.floor(Math.random() * 5) + 6);
    // console.log(randomString);
    //主程序
    var HcSearch=function(){
        var transIconBase64="data:image/webp;base64,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";
        var $doc=$(document);
        var $body=$("html body");
        var randomCode="yyMM000000";    //属性随机码，年月加六位随机码。用于元素属性后缀，以防止属性名称重复。
        var createHtml=function(){
            var wordTransIconHtml=StringFormat('<div id="'+randomString+'{0}icon" class="wordTrans{0}"><div class="wordTransIcon{0}"></div></div>',randomCode,transIconBase64);
            $body.append(StringFormat('<div id="'+randomString+'{0}">',randomCode)+wordTransIconHtml+'</div>');
        };
        var createStyle=function(){
            //尽可能避开csp认证
            GM_addStyle(`#hcSearchePopover,#hcSearcheModal,#hcSearchePopover.hcSearchePopover,#hcSearcheModal.hcSearcheModal{all:initial;position:absolute;z-index:2147483647;display:block;font-size:14px;color:#333333;line-height:26px;transform:scale(0.9);opacity:0;transition:transform 0.1s ease-out,opacity 0.1s ease-out;}#hcSearchePopover.hcSearchePopover-show,#hcSearcheModal.hcSearcheModal-show{transform:scale(1);opacity:1;}#hcSearcheModal #hcSearcheModalContent{background:#f6f8fa;border:1px solid #d1d5da;border-radius:3px;color:#586069;display:block;box-shadow:0 16px 100px 0 rgba(0,0,0,0.2);}#hcSearcheModal #hcSearcheModalBody{margin-left:auto;margin-right:auto;position:relative;width:390px;background-color:#fff;border:1px solid #d1d5da;border-width:1px 0;border-radius:3px;}#hcSearcheModal #hcSearcheIframe{overflow:hidden;margin:0;padding:0;height:550px;}#hcSearcheModal #hcSearcheModalHeader{font-size:13px;line-height:24px;padding:6px 12px;color:#586069;}#hcSearcheModal #hcSearcheModalHeader::after{display:block;clear:both;content:"";}#hcSearcheModal #hcSearcheModalFooter{min-height:10px;cursor:move;position:relative;display:flex; justify-content: center;}#hcSearcheModal #hcSearcheModalLinks{float:right}#hcSearcheModal #hcSearcheModalLinks hcsearche-link{display:inline-block;color:#24292e;margin:0 0 0 6px;font-size:13px;font-weight:normal;text-decoration:none;cursor:pointer;padding:0 0.5em;border-radius:0;}#hcSearcheModal #hcSearcheModalLinks hcsearche-link[data-securrent=true],#hcSearcheModal #hcSearcheModalLinks hcsearche-link:hover{background:rgba(27,31,35,.08);color:#444d56;}#hcSearcheModal #hcSearcheModalLinks hcsearche-link>svg{vertical-align:sub;padding-left:4px;}#hcSearcheModal #hcSearcheModalLinks #hcSearcheClose:hover{background:rgba(0,0,0,0.05);}#hcSearcheModal #hcSearcheModalLock{float:left;display:block;opacity:0.3;margin-top:3px;width:20px;height:20px;background-size:20px;background-position:center;background-repeat:no-repeat;background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMSAxMHYtNGMwLTIuNzYtMi4yNC01LTUtNXMtNSAyLjI0LTUgNXYyaC0xdi0yYzAtMy4zMTIgMi42ODktNiA2LTZzNiAyLjY4OSA2IDZ2NGgxMHYxNGgtMTh2LTE0aDd6bTEwIDFoLTE2djEyaDE2di0xMnoiLz48L3N2Zz4=);}#hcSearcheModal #hcSearcheModalLock.hcSearcheModalLocked{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik02IDZjMC0zLjMxMSAyLjY4OS02IDYtNnM2IDIuNjg4IDYgNnY0aDN2MTRoLTE4di0xNGgzdi00em0xNCA1aC0xNnYxMmgxNnYtMTJ6bS0xMy01djRoMTB2LTRjMC0yLjc2LTIuMjQtNS01LTVzLTUgMi4yNC01IDV6Ii8+PC9zdmc+)}#hcSearcheModal #hcSearcheNextLink{position:absolute;top:-40px;right:28px;display:block;width:32px;height:32px;color:#6c757d;cursor:pointer;background-size:16px;background-position:center;background-repeat:no-repeat;background-color:#f6f8fa;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA4UlEQVQ4T+2TTUoDQRCF32twTpCLuFKYEaYWguvoGQS3nsFjeAYXEoIQ6JqF1wi6Sly48wBPGpzQtpNJyMJVetm8+urvFTHyYoy3IYS3tm0X22QcA7j7A4B3M3s8Av5rBu4+MbPPfuJDWyg1mzVKCu6+InljZq8JUgK6rruTNDWzyz7JLx/EGM8APJO8TpAc8BN8D+DCzD4GAekzhwC4SkYieSLpT3DSDzoxQUjOJM1DCEHSeZl5awXZABtJLyS/AJzmZee23nULTVVV67qulwfdwtihbVpw9wjA9hGXGklP3z4VgPj5LnZPAAAAAElFTkSuQmCC);border-radius:3px;}#hcSearcheModal #hcSearcheNextLink:hover{background-color:#e9ecef;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA8ElEQVQ4T2NkwAMKCwvT/v37d3/ixIm7cSljxGdAQUFBCwMDw4MJEybMGTWAXmFQXFws0tvb+wYW4thiAV0NPBobGhqY3r9//4yBgSFk4sSJR0CGoBtQUFCQycDAEDRhwgRXmCUo6SA/P9+ckZFx0////4NBhiAbANVc9OvXL9tp06a9wGoASBDZEEZGRg9QQmJgYGBlYGDA0AxSjzUlQg3Z8v///20MDAxMjIyMFug243QBTCI/P9+GgYFhBwMDw+ffv38bIjsbOVnjzQvFxcU2TExMz7u7u++SlRfwZTS4F/Lz8/cxMjI6EqMYi5p1AJbtgw7fjyoMAAAAAElFTkSuQmCC);color:#444d56;}#hcSearcheModal #hcSearcheNextLink.hcSearcheNextLinkLoading{background-color:#e9ecef;background-image:none;}#hcSearcheModal #hcSearcheNextLink.hcSearcheNextLinkLoading:after{content:" ";display:block;width:12px;height:12px;margin:9px 0 0 9px;border-radius:50%;border:1px solid #24292e;border-color:#24292e transparent #24292e transparent;animation:hcSearcheNextLinkLoading 1.2s linear infinite;}@keyframes hcSearcheNextLinkLoading{0%{transform:rotate(0deg);}50%{transform:rotate(180deg);}100%{transform:rotate(720deg);}}.JPopBox-tip-white{z-index:1060;min-width:50px;max-width:300px;padding:1px;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:14px;font-style:normal;font-weight:400;color:#333;line-height:1.42857143;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;letter-spacing:normal;word-break:normal;word-spacing:normal;word-wrap:normal;white-space:normal;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #ccc;border:1px solid rgba(0,0,0,.2);border-radius:6px;-webkit-box-shadow:0 5px 10px rgba(0,0,0,.2);box-shadow:0 5px 10px rgba(0,0,0,.2);line-break:auto}.JPopBox-tip-white .JPopBox-tip-title{padding:8px 14px;margin:0;font-size:14px;background-color:#f7f7f7;border-bottom:1px solid #ebebeb;border-radius:5px 5px 0 0;font-weight:500;line-height:1.1;color:inherit}.JPopBox-tip-white .JPopBox-tip-content{padding:9px 14px}.JPopBox-tip-white .JPopBox-tip-arrow,.JPopBox-tip-white .JPopBox-tip-arrow:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid;border-width:10px;content:""}.JPopBox-tip-white .JPopBox-tip-arrow.JPopBox-tip-arrow-top{left:50%;margin-left:-11px;border-bottom-width:0;border-top-color:rgba(0,0,0,.25);bottom:-11px}.JPopBox-tip-white .JPopBox-tip-arrow.JPopBox-tip-arrow-top:after{content:" ";bottom:1px;margin-left:-10px;border-bottom-width:0;border-top-color:#fff}.JPopBox-tip-white .JPopBox-tip-arrow.JPopBox-tip-arrow-right{top:50%;left:-11px;margin-top:-11px;border-left-width:0;border-right-color:rgba(0,0,0,.25)}.JPopBox-tip-white .JPopBox-tip-arrow.JPopBox-tip-arrow-right:after{content:" ";left:1px;bottom:-10px;border-left-width:0;border-right-color:#fff}.JPopBox-tip-white .JPopBox-tip-arrow.JPopBox-tip-arrow-bottom{left:50%;margin-left:-11px;border-top-width:0;border-bottom-color:rgba(0,0,0,.25);top:-11px}.JPopBox-tip-white .JPopBox-tip-arrow.JPopBox-tip-arrow-bottom:after{content:" ";top:1px;margin-left:-10px;border-top-width:0;border-bottom-color:#fff}.JPopBox-tip-white .JPopBox-tip-arrow.JPopBox-tip-arrow-left{top:50%;right:-11px;margin-top:-11px;border-right-width:0;border-left-color:rgba(0,0,0,.25)}.JPopBox-tip-white .JPopBox-tip-arrow.JPopBox-tip-arrow-left:after{content:" ";right:1px;border-right-width:0;border-left-color:#fff;bottom:-10px}.JPopBox-tip-white{width: 482px;max-width: 550px;min-width: 450px;}`);

            var s="";
            s+=StringFormat(".wordTrans{0}{box-sizing: content-box;cursor: pointer;z-index: 2147483647;border-width: 0px;border-style: solid;border-image: initial;border-radius: 5px;padding: 0.5px;position: absolute;display: none}",randomCode);
            s+=StringFormat(".wordTransIcon{0}{background-image: url({1});background-size: 50px;height: 50px;width: 50px;}",randomCode,transIconBase64);
            s+=Panel.CreateStyle();
            GM_addStyle(s);
        };
        var ShowWordTransIcon=function(){
            var wordTransIcon = document.getElementById(randomString + randomCode+'icon');
            var isSelect=false;
            var isPanel=false;
            var isWordTransIcon=false;
            $doc.on({
                "selectionchange":function(e){
                    isSelect=true;
                },
                "mousedown":function(e){
                    var $targetEl=$(e.target);
                    isPanel=$targetEl.parents().is("div.JPopBox-tip-white");
                    isWordTransIcon=$targetEl.parents().is(StringFormat("div#"+randomString+"{0}",randomCode));
                    //点击划词图标外域和划词面板外域时，隐藏图标和划词面板
                    if(!isWordTransIcon && !isPanel){
                        wordTransIcon.style.display = "none";
                        Panel.Destroy();
                    }
                    else {
                        //点击划词图标，取消鼠标默认事件，防止选中的文本消失
                        if(isWordTransIcon){
                            ClearBubble(e);
                        }
                    }
                },
                "mouseup":function(e){
                    var selectText = window.getSelection().toString().trim();
                    if(!isPanel&&isSelect&&selectText){
                        if (!SearchPanel.getOptions().auto_search){

                            wordTransIcon.style.display = 'block';
                            wordTransIcon.style.left = e.pageX + 'px';
                            wordTransIcon.style.top = (e.pageY + 12) + 'px';
                        }else {
                            //选中的文本内容
                            SearchPanel.show(selectText);
                        }
                        isSelect=false;
                    }
                }
            });
            wordTransIcon.addEventListener("click", function(e) {
                // GetSettingOptions();
                //如果不是自动搜索的话，就显示出来搜索按钮，然后让用户点击
                if (!SearchPanel.getOptions().auto_search) {
                    Panel.Destroy();
                    SearchPanel.show();
                    wordTransIcon.style.display = "none";
                    e.stopPropagation();
                }
            });
        };
        // var guid="";
        var RegMenu=function(){
            GM_registerMenuCommand("文本搜题",function(){
               SearchPanel.showWordSearch();
            });
            GM_registerMenuCommand("设置",function(){
                SearchPanel.setting();
            });
        };
        this.init=function(){
            randomCode=DateFormat(new Date(),"yyMM").toString()+(Math.floor(Math.random() * (999999 - 100000 + 1) ) + 100000).toString();
            createStyle();
            createHtml();
            ShowWordTransIcon();
            SearchPanel.init();
            RegMenu();
            reportOnline();
        };
    };

    var hcSearch=new HcSearch();
    hcSearch.init();

})();
