// source --> https://phdiagnosticcentre.com/wp-content/plugins/woocommerce/assets/js/frontend/add-to-cart.min.js?ver=7.5.1 
jQuery(function(o) {
    if ("undefined" == typeof wc_add_to_cart_params) return !1;
    var t = function() {
        this.requests = [], this.addRequest = this.addRequest.bind(this), this.run = this.run.bind(this), o(document.body).on("click", ".add_to_cart_button", {
            addToCartHandler: this
        }, this.onAddToCart).on("click", ".remove_from_cart_button", {
            addToCartHandler: this
        }, this.onRemoveFromCart).on("added_to_cart", this.updateButton).on("ajax_request_not_sent.adding_to_cart", this.updateButton).on("added_to_cart removed_from_cart", {
            addToCartHandler: this
        }, this.updateFragments)
    };
    t.prototype.addRequest = function(t) {
        this.requests.push(t), 1 === this.requests.length && this.run()
    }, t.prototype.run = function() {
        var t = this,
            a = t.requests[0].complete;
        t.requests[0].complete = function() {
            "function" == typeof a && a(), t.requests.shift(), 0 < t.requests.length && t.run()
        };
        const e = this.requests[0];
        window.fetch(e.url, {
            method: e.type,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: e.data
        }).then(t => {
            if (t.ok) return t.json();
            throw new Error(t.statusText)
        }).then(e.success)["catch"](t => e.error && e.error())["finally"](() => e.complete && e.complete())
    }, t.prototype.onAddToCart = function(t) {
        var e, a = o(this);
        if (a.is(".ajax_add_to_cart")) return !a.attr("data-product_id") || (t.preventDefault(), a.removeClass("added"), a.addClass("loading"), !1 === o(document.body).triggerHandler("should_send_ajax_request.adding_to_cart", [a]) ? (o(document.body).trigger("ajax_request_not_sent.adding_to_cart", [!1, !1, a]), !0) : (e = {}, o.each(a.data(), function(t, a) {
            e[t] = a
        }), o.each(a[0].dataset, function(t, a) {
            e[t] = a
        }), o(document.body).trigger("adding_to_cart", [a, e]), void t.data.addToCartHandler.addRequest({
            type: "POST",
            url: wc_add_to_cart_params.wc_ajax_url.toString().replace("%%endpoint%%", "add_to_cart"),
            data: o.param(e),
            success: function(t) {
                t && (t.error && t.product_url ? window.location = t.product_url : "yes" === wc_add_to_cart_params.cart_redirect_after_add ? window.location = wc_add_to_cart_params.cart_url : o(document.body).trigger("added_to_cart", [t.fragments, t.cart_hash, a]))
            },
            dataType: "json"
        })))
    }, t.prototype.onRemoveFromCart = function(t) {
        var a = o(this),
            e = a.closest(".woocommerce-mini-cart-item");
        t.preventDefault(), e.block({
            message: null,
            overlayCSS: {
                opacity: .6
            }
        }), t.data.addToCartHandler.addRequest({
            type: "POST",
            url: wc_add_to_cart_params.wc_ajax_url.toString().replace("%%endpoint%%", "remove_from_cart"),
            data: new URLSearchParams({
                cart_item_key: a.data("cart_item_key")
            }).toString(),
            success: function(t) {
                t && t.fragments ? o(document.body).trigger("removed_from_cart", [t.fragments, t.cart_hash, a]) : window.location = a.attr("href")
            },
            error: function() {
                window.location = a.attr("href")
            },
            dataType: "json"
        })
    }, t.prototype.updateButton = function(t, a, e, r) {
        (r = void 0 !== r && r) && (r.removeClass("loading"), a && r.addClass("added"), a && !wc_add_to_cart_params.is_cart && 0 === r.parent().find(".added_to_cart").length && r.after('<a href="' + wc_add_to_cart_params.cart_url + '" class="added_to_cart wc-forward" title="' + wc_add_to_cart_params.i18n_view_cart + '">' + wc_add_to_cart_params.i18n_view_cart + "</a>"), o(document.body).trigger("wc_cart_button_updated", [r]))
    }, t.prototype.updateFragments = function(t, a) {
        a && (o.each(a, function(t) {
            o(t).addClass("updating").fadeTo("400", "0.6").block({
                message: null,
                overlayCSS: {
                    opacity: .6
                }
            })
        }), o.each(a, function(t, a) {
            o(t).replaceWith(a), o(t).stop(!0).css("opacity", "1").unblock()
        }), o(document.body).trigger("wc_fragments_loaded"))
    }, new t
});
// source --> https://phdiagnosticcentre.com/wp-content/plugins/js_composer/assets/js/vendors/woocommerce-add-to-cart.js?ver=5.4.2 
window.jQuery(document).ready(function($) {
    $('body').on('adding_to_cart', function(event, $button, data) {
        $button && $button.hasClass('vc_gitem-link') && $button
            .addClass('vc-gitem-add-to-cart-loading-btn')
            .parents('.vc_grid-item-mini')
            .addClass('vc-woocommerce-add-to-cart-loading')
            .append($('<div class="vc_wc-load-add-to-loader-wrapper"><div class="vc_wc-load-add-to-loader"></div></div>'));
    }).on('added_to_cart', function(event, fragments, cart_hash, $button) {
        if ('undefined' === typeof($button)) {
            $button = $('.vc-gitem-add-to-cart-loading-btn');
        }
        $button && $button.hasClass('vc_gitem-link') && $button
            .removeClass('vc-gitem-add-to-cart-loading-btn')
            .parents('.vc_grid-item-mini')
            .removeClass('vc-woocommerce-add-to-cart-loading')
            .find('.vc_wc-load-add-to-loader-wrapper').remove();
    });
});
// source --> https://phdiagnosticcentre.com/wp-content/plugins/pixelyoursite/dist/scripts/jquery.bind-first-0.2.3.min.js?ver=5.9.5 
/*
 * jQuery.bind-first library v0.2.3
 * Copyright (c) 2013 Vladimir Zhuravlev
 *
 * Released under MIT License
 * @license
 *
 * Date: Thu Feb  6 10:13:59 ICT 2014
 **/
(function(t) {
    function e(e) {
        return u ? e.data("events") : t._data(e[0]).events
    }

    function n(t, n, r) {
        var i = e(t),
            a = i[n];
        if (!u) {
            var s = r ? a.splice(a.delegateCount - 1, 1)[0] : a.pop();
            return a.splice(r ? 0 : a.delegateCount || 0, 0, s), void 0
        }
        r ? i.live.unshift(i.live.pop()) : a.unshift(a.pop())
    }

    function r(e, r, i) {
        var a = r.split(/\s+/);
        e.each(function() {
            for (var e = 0; a.length > e; ++e) {
                var r = a[e].trim().match(/[^\.]+/i)[0];
                n(t(this), r, i)
            }
        })
    }

    function i(e) {
        t.fn[e + "First"] = function() {
            var n = t.makeArray(arguments),
                i = n.shift();
            return i && (t.fn[e].apply(this, arguments), r(this, i)), this
        }
    }
    var a = t.fn.jquery.split("."),
        s = parseInt(a[0]),
        f = parseInt(a[1]),
        u = 1 > s || 1 == s && 7 > f;
    i("bind"), i("one"), t.fn.delegateFirst = function() {
        var e = t.makeArray(arguments),
            n = e[1];
        return n && (e.splice(0, 2), t.fn.delegate.apply(this, arguments), r(this, n, !0)), this
    }, t.fn.liveFirst = function() {
        var e = t.makeArray(arguments);
        return e.unshift(this.selector), t.fn.delegateFirst.apply(t(document), e), this
    }, u || (t.fn.onFirst = function(e, n) {
        var i = t(this),
            a = "string" == typeof n;
        if (t.fn.on.apply(i, arguments), "object" == typeof e)
            for (type in e) e.hasOwnProperty(type) && r(i, type, a);
        else "string" == typeof e && r(i, e, a);
        return i
    })
})(jQuery);
// source --> https://phdiagnosticcentre.com/wp-content/plugins/pixelyoursite/dist/scripts/js.cookie-2.1.3.min.js?ver=2.1.3 
! function(e) {
    var n = !1;
    if ("function" == typeof define && define.amd && (define(e), n = !0), "object" == typeof exports && (module.exports = e(), n = !0), !n) {
        var o = window.Cookies,
            t = window.Cookies = e();
        t.noConflict = function() {
            return window.Cookies = o, t
        }
    }
}(function() {
    function e() {
        for (var e = 0, n = {}; e < arguments.length; e++) {
            var o = arguments[e];
            for (var t in o) n[t] = o[t]
        }
        return n
    }

    function n(o) {
        function t(n, r, i) {
            var c;
            if ("undefined" != typeof document) {
                if (arguments.length > 1) {
                    if (i = e({
                            path: "/"
                        }, t.defaults, i), "number" == typeof i.expires) {
                        var a = new Date;
                        a.setMilliseconds(a.getMilliseconds() + 864e5 * i.expires), i.expires = a
                    }
                    try {
                        c = JSON.stringify(r), /^[\{\[]/.test(c) && (r = c)
                    } catch (e) {}
                    return r = o.write ? o.write(r, n) : encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), n = encodeURIComponent(String(n)), n = n.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent), n = n.replace(/[\(\)]/g, escape), document.cookie = [n, "=", r, i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join("")
                }
                n || (c = {});
                for (var p = document.cookie ? document.cookie.split("; ") : [], s = /(%[0-9A-Z]{2})+/g, d = 0; d < p.length; d++) {
                    var f = p[d].split("="),
                        u = f.slice(1).join("=");
                    '"' === u.charAt(0) && (u = u.slice(1, -1));
                    try {
                        var l = f[0].replace(s, decodeURIComponent);
                        if (u = o.read ? o.read(u, l) : o(u, l) || u.replace(s, decodeURIComponent), this.json) try {
                            u = JSON.parse(u)
                        } catch (e) {}
                        if (n === l) {
                            c = u;
                            break
                        }
                        n || (c[l] = u)
                    } catch (e) {}
                }
                return c
            }
        }
        return t.set = t, t.get = function(e) {
            return t.call(t, e)
        }, t.getJSON = function() {
            return t.apply({
                json: !0
            }, [].slice.call(arguments))
        }, t.defaults = {}, t.remove = function(n, o) {
            t(n, "", e(o, {
                expires: -1
            }))
        }, t.withConverter = n, t
    }
    return n(function() {})
});