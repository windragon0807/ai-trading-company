var Wf = { exports: {} }, iu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var um;
function q0() {
  if (um) return iu;
  um = 1;
  var f = Symbol.for("react.transitional.element"), h = Symbol.for("react.fragment");
  function m(r, O, D) {
    var X = null;
    if (D !== void 0 && (X = "" + D), O.key !== void 0 && (X = "" + O.key), "key" in O) {
      D = {};
      for (var G in O)
        G !== "key" && (D[G] = O[G]);
    } else D = O;
    return O = D.ref, {
      $$typeof: f,
      type: r,
      key: X,
      ref: O !== void 0 ? O : null,
      props: D
    };
  }
  return iu.Fragment = h, iu.jsx = m, iu.jsxs = m, iu;
}
var cm;
function Y0() {
  return cm || (cm = 1, Wf.exports = q0()), Wf.exports;
}
var s = Y0(), Ff = { exports: {} }, fu = {}, If = { exports: {} }, Pf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var im;
function X0() {
  return im || (im = 1, (function(f) {
    function h(_, q) {
      var $ = _.length;
      _.push(q);
      t: for (; 0 < $; ) {
        var W = $ - 1 >>> 1, Et = _[W];
        if (0 < O(Et, q))
          _[W] = q, _[$] = Et, $ = W;
        else break t;
      }
    }
    function m(_) {
      return _.length === 0 ? null : _[0];
    }
    function r(_) {
      if (_.length === 0) return null;
      var q = _[0], $ = _.pop();
      if ($ !== q) {
        _[0] = $;
        t: for (var W = 0, Et = _.length, d = Et >>> 1; W < d; ) {
          var b = 2 * (W + 1) - 1, U = _[b], Y = b + 1, F = _[Y];
          if (0 > O(U, $))
            Y < Et && 0 > O(F, U) ? (_[W] = F, _[Y] = $, W = Y) : (_[W] = U, _[b] = $, W = b);
          else if (Y < Et && 0 > O(F, $))
            _[W] = F, _[Y] = $, W = Y;
          else break t;
        }
      }
      return q;
    }
    function O(_, q) {
      var $ = _.sortIndex - q.sortIndex;
      return $ !== 0 ? $ : _.id - q.id;
    }
    if (f.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var D = performance;
      f.unstable_now = function() {
        return D.now();
      };
    } else {
      var X = Date, G = X.now();
      f.unstable_now = function() {
        return X.now() - G;
      };
    }
    var C = [], g = [], L = 1, R = null, B = 3, I = !1, dt = !1, ut = !1, Lt = !1, k = typeof setTimeout == "function" ? setTimeout : null, lt = typeof clearTimeout == "function" ? clearTimeout : null, _t = typeof setImmediate < "u" ? setImmediate : null;
    function Tt(_) {
      for (var q = m(g); q !== null; ) {
        if (q.callback === null) r(g);
        else if (q.startTime <= _)
          r(g), q.sortIndex = q.expirationTime, h(C, q);
        else break;
        q = m(g);
      }
    }
    function Ht(_) {
      if (ut = !1, Tt(_), !dt)
        if (m(C) !== null)
          dt = !0, zt || (zt = !0, Qt());
        else {
          var q = m(g);
          q !== null && Wt(Ht, q.startTime - _);
        }
    }
    var zt = !1, ct = -1, kt = 5, cl = -1;
    function gl() {
      return Lt ? !0 : !(f.unstable_now() - cl < kt);
    }
    function ml() {
      if (Lt = !1, zt) {
        var _ = f.unstable_now();
        cl = _;
        var q = !0;
        try {
          t: {
            dt = !1, ut && (ut = !1, lt(ct), ct = -1), I = !0;
            var $ = B;
            try {
              l: {
                for (Tt(_), R = m(C); R !== null && !(R.expirationTime > _ && gl()); ) {
                  var W = R.callback;
                  if (typeof W == "function") {
                    R.callback = null, B = R.priorityLevel;
                    var Et = W(
                      R.expirationTime <= _
                    );
                    if (_ = f.unstable_now(), typeof Et == "function") {
                      R.callback = Et, Tt(_), q = !0;
                      break l;
                    }
                    R === m(C) && r(C), Tt(_);
                  } else r(C);
                  R = m(C);
                }
                if (R !== null) q = !0;
                else {
                  var d = m(g);
                  d !== null && Wt(
                    Ht,
                    d.startTime - _
                  ), q = !1;
                }
              }
              break t;
            } finally {
              R = null, B = $, I = !1;
            }
            q = void 0;
          }
        } finally {
          q ? Qt() : zt = !1;
        }
      }
    }
    var Qt;
    if (typeof _t == "function")
      Qt = function() {
        _t(ml);
      };
    else if (typeof MessageChannel < "u") {
      var Dt = new MessageChannel(), il = Dt.port2;
      Dt.port1.onmessage = ml, Qt = function() {
        il.postMessage(null);
      };
    } else
      Qt = function() {
        k(ml, 0);
      };
    function Wt(_, q) {
      ct = k(function() {
        _(f.unstable_now());
      }, q);
    }
    f.unstable_IdlePriority = 5, f.unstable_ImmediatePriority = 1, f.unstable_LowPriority = 4, f.unstable_NormalPriority = 3, f.unstable_Profiling = null, f.unstable_UserBlockingPriority = 2, f.unstable_cancelCallback = function(_) {
      _.callback = null;
    }, f.unstable_forceFrameRate = function(_) {
      0 > _ || 125 < _ ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : kt = 0 < _ ? Math.floor(1e3 / _) : 5;
    }, f.unstable_getCurrentPriorityLevel = function() {
      return B;
    }, f.unstable_next = function(_) {
      switch (B) {
        case 1:
        case 2:
        case 3:
          var q = 3;
          break;
        default:
          q = B;
      }
      var $ = B;
      B = q;
      try {
        return _();
      } finally {
        B = $;
      }
    }, f.unstable_requestPaint = function() {
      Lt = !0;
    }, f.unstable_runWithPriority = function(_, q) {
      switch (_) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          _ = 3;
      }
      var $ = B;
      B = _;
      try {
        return q();
      } finally {
        B = $;
      }
    }, f.unstable_scheduleCallback = function(_, q, $) {
      var W = f.unstable_now();
      switch (typeof $ == "object" && $ !== null ? ($ = $.delay, $ = typeof $ == "number" && 0 < $ ? W + $ : W) : $ = W, _) {
        case 1:
          var Et = -1;
          break;
        case 2:
          Et = 250;
          break;
        case 5:
          Et = 1073741823;
          break;
        case 4:
          Et = 1e4;
          break;
        default:
          Et = 5e3;
      }
      return Et = $ + Et, _ = {
        id: L++,
        callback: q,
        priorityLevel: _,
        startTime: $,
        expirationTime: Et,
        sortIndex: -1
      }, $ > W ? (_.sortIndex = $, h(g, _), m(C) === null && _ === m(g) && (ut ? (lt(ct), ct = -1) : ut = !0, Wt(Ht, $ - W))) : (_.sortIndex = Et, h(C, _), dt || I || (dt = !0, zt || (zt = !0, Qt()))), _;
    }, f.unstable_shouldYield = gl, f.unstable_wrapCallback = function(_) {
      var q = B;
      return function() {
        var $ = B;
        B = q;
        try {
          return _.apply(this, arguments);
        } finally {
          B = $;
        }
      };
    };
  })(Pf)), Pf;
}
var fm;
function G0() {
  return fm || (fm = 1, If.exports = X0()), If.exports;
}
var ts = { exports: {} }, at = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sm;
function Q0() {
  if (sm) return at;
  sm = 1;
  var f = Symbol.for("react.transitional.element"), h = Symbol.for("react.portal"), m = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), O = Symbol.for("react.profiler"), D = Symbol.for("react.consumer"), X = Symbol.for("react.context"), G = Symbol.for("react.forward_ref"), C = Symbol.for("react.suspense"), g = Symbol.for("react.memo"), L = Symbol.for("react.lazy"), R = Symbol.for("react.activity"), B = Symbol.iterator;
  function I(d) {
    return d === null || typeof d != "object" ? null : (d = B && d[B] || d["@@iterator"], typeof d == "function" ? d : null);
  }
  var dt = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, ut = Object.assign, Lt = {};
  function k(d, b, U) {
    this.props = d, this.context = b, this.refs = Lt, this.updater = U || dt;
  }
  k.prototype.isReactComponent = {}, k.prototype.setState = function(d, b) {
    if (typeof d != "object" && typeof d != "function" && d != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, d, b, "setState");
  }, k.prototype.forceUpdate = function(d) {
    this.updater.enqueueForceUpdate(this, d, "forceUpdate");
  };
  function lt() {
  }
  lt.prototype = k.prototype;
  function _t(d, b, U) {
    this.props = d, this.context = b, this.refs = Lt, this.updater = U || dt;
  }
  var Tt = _t.prototype = new lt();
  Tt.constructor = _t, ut(Tt, k.prototype), Tt.isPureReactComponent = !0;
  var Ht = Array.isArray;
  function zt() {
  }
  var ct = { H: null, A: null, T: null, S: null }, kt = Object.prototype.hasOwnProperty;
  function cl(d, b, U) {
    var Y = U.ref;
    return {
      $$typeof: f,
      type: d,
      key: b,
      ref: Y !== void 0 ? Y : null,
      props: U
    };
  }
  function gl(d, b) {
    return cl(d.type, b, d.props);
  }
  function ml(d) {
    return typeof d == "object" && d !== null && d.$$typeof === f;
  }
  function Qt(d) {
    var b = { "=": "=0", ":": "=2" };
    return "$" + d.replace(/[=:]/g, function(U) {
      return b[U];
    });
  }
  var Dt = /\/+/g;
  function il(d, b) {
    return typeof d == "object" && d !== null && d.key != null ? Qt("" + d.key) : b.toString(36);
  }
  function Wt(d) {
    switch (d.status) {
      case "fulfilled":
        return d.value;
      case "rejected":
        throw d.reason;
      default:
        switch (typeof d.status == "string" ? d.then(zt, zt) : (d.status = "pending", d.then(
          function(b) {
            d.status === "pending" && (d.status = "fulfilled", d.value = b);
          },
          function(b) {
            d.status === "pending" && (d.status = "rejected", d.reason = b);
          }
        )), d.status) {
          case "fulfilled":
            return d.value;
          case "rejected":
            throw d.reason;
        }
    }
    throw d;
  }
  function _(d, b, U, Y, F) {
    var et = typeof d;
    (et === "undefined" || et === "boolean") && (d = null);
    var tt = !1;
    if (d === null) tt = !0;
    else
      switch (et) {
        case "bigint":
        case "string":
        case "number":
          tt = !0;
          break;
        case "object":
          switch (d.$$typeof) {
            case f:
            case h:
              tt = !0;
              break;
            case L:
              return tt = d._init, _(
                tt(d._payload),
                b,
                U,
                Y,
                F
              );
          }
      }
    if (tt)
      return F = F(d), tt = Y === "" ? "." + il(d, 0) : Y, Ht(F) ? (U = "", tt != null && (U = tt.replace(Dt, "$&/") + "/"), _(F, b, U, "", function(yl) {
        return yl;
      })) : F != null && (ml(F) && (F = gl(
        F,
        U + (F.key == null || d && d.key === F.key ? "" : ("" + F.key).replace(
          Dt,
          "$&/"
        ) + "/") + tt
      )), b.push(F)), 1;
    tt = 0;
    var nt = Y === "" ? "." : Y + ":";
    if (Ht(d))
      for (var Nt = 0; Nt < d.length; Nt++)
        Y = d[Nt], et = nt + il(Y, Nt), tt += _(
          Y,
          b,
          U,
          et,
          F
        );
    else if (Nt = I(d), typeof Nt == "function")
      for (d = Nt.call(d), Nt = 0; !(Y = d.next()).done; )
        Y = Y.value, et = nt + il(Y, Nt++), tt += _(
          Y,
          b,
          U,
          et,
          F
        );
    else if (et === "object") {
      if (typeof d.then == "function")
        return _(
          Wt(d),
          b,
          U,
          Y,
          F
        );
      throw b = String(d), Error(
        "Objects are not valid as a React child (found: " + (b === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return tt;
  }
  function q(d, b, U) {
    if (d == null) return d;
    var Y = [], F = 0;
    return _(d, Y, "", "", function(et) {
      return b.call(U, et, F++);
    }), Y;
  }
  function $(d) {
    if (d._status === -1) {
      var b = d._result;
      b = b(), b.then(
        function(U) {
          (d._status === 0 || d._status === -1) && (d._status = 1, d._result = U);
        },
        function(U) {
          (d._status === 0 || d._status === -1) && (d._status = 2, d._result = U);
        }
      ), d._status === -1 && (d._status = 0, d._result = b);
    }
    if (d._status === 1) return d._result.default;
    throw d._result;
  }
  var W = typeof reportError == "function" ? reportError : function(d) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var b = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof d == "object" && d !== null && typeof d.message == "string" ? String(d.message) : String(d),
        error: d
      });
      if (!window.dispatchEvent(b)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", d);
      return;
    }
    console.error(d);
  }, Et = {
    map: q,
    forEach: function(d, b, U) {
      q(
        d,
        function() {
          b.apply(this, arguments);
        },
        U
      );
    },
    count: function(d) {
      var b = 0;
      return q(d, function() {
        b++;
      }), b;
    },
    toArray: function(d) {
      return q(d, function(b) {
        return b;
      }) || [];
    },
    only: function(d) {
      if (!ml(d))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return d;
    }
  };
  return at.Activity = R, at.Children = Et, at.Component = k, at.Fragment = m, at.Profiler = O, at.PureComponent = _t, at.StrictMode = r, at.Suspense = C, at.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ct, at.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(d) {
      return ct.H.useMemoCache(d);
    }
  }, at.cache = function(d) {
    return function() {
      return d.apply(null, arguments);
    };
  }, at.cacheSignal = function() {
    return null;
  }, at.cloneElement = function(d, b, U) {
    if (d == null)
      throw Error(
        "The argument must be a React element, but you passed " + d + "."
      );
    var Y = ut({}, d.props), F = d.key;
    if (b != null)
      for (et in b.key !== void 0 && (F = "" + b.key), b)
        !kt.call(b, et) || et === "key" || et === "__self" || et === "__source" || et === "ref" && b.ref === void 0 || (Y[et] = b[et]);
    var et = arguments.length - 2;
    if (et === 1) Y.children = U;
    else if (1 < et) {
      for (var tt = Array(et), nt = 0; nt < et; nt++)
        tt[nt] = arguments[nt + 2];
      Y.children = tt;
    }
    return cl(d.type, F, Y);
  }, at.createContext = function(d) {
    return d = {
      $$typeof: X,
      _currentValue: d,
      _currentValue2: d,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, d.Provider = d, d.Consumer = {
      $$typeof: D,
      _context: d
    }, d;
  }, at.createElement = function(d, b, U) {
    var Y, F = {}, et = null;
    if (b != null)
      for (Y in b.key !== void 0 && (et = "" + b.key), b)
        kt.call(b, Y) && Y !== "key" && Y !== "__self" && Y !== "__source" && (F[Y] = b[Y]);
    var tt = arguments.length - 2;
    if (tt === 1) F.children = U;
    else if (1 < tt) {
      for (var nt = Array(tt), Nt = 0; Nt < tt; Nt++)
        nt[Nt] = arguments[Nt + 2];
      F.children = nt;
    }
    if (d && d.defaultProps)
      for (Y in tt = d.defaultProps, tt)
        F[Y] === void 0 && (F[Y] = tt[Y]);
    return cl(d, et, F);
  }, at.createRef = function() {
    return { current: null };
  }, at.forwardRef = function(d) {
    return { $$typeof: G, render: d };
  }, at.isValidElement = ml, at.lazy = function(d) {
    return {
      $$typeof: L,
      _payload: { _status: -1, _result: d },
      _init: $
    };
  }, at.memo = function(d, b) {
    return {
      $$typeof: g,
      type: d,
      compare: b === void 0 ? null : b
    };
  }, at.startTransition = function(d) {
    var b = ct.T, U = {};
    ct.T = U;
    try {
      var Y = d(), F = ct.S;
      F !== null && F(U, Y), typeof Y == "object" && Y !== null && typeof Y.then == "function" && Y.then(zt, W);
    } catch (et) {
      W(et);
    } finally {
      b !== null && U.types !== null && (b.types = U.types), ct.T = b;
    }
  }, at.unstable_useCacheRefresh = function() {
    return ct.H.useCacheRefresh();
  }, at.use = function(d) {
    return ct.H.use(d);
  }, at.useActionState = function(d, b, U) {
    return ct.H.useActionState(d, b, U);
  }, at.useCallback = function(d, b) {
    return ct.H.useCallback(d, b);
  }, at.useContext = function(d) {
    return ct.H.useContext(d);
  }, at.useDebugValue = function() {
  }, at.useDeferredValue = function(d, b) {
    return ct.H.useDeferredValue(d, b);
  }, at.useEffect = function(d, b) {
    return ct.H.useEffect(d, b);
  }, at.useEffectEvent = function(d) {
    return ct.H.useEffectEvent(d);
  }, at.useId = function() {
    return ct.H.useId();
  }, at.useImperativeHandle = function(d, b, U) {
    return ct.H.useImperativeHandle(d, b, U);
  }, at.useInsertionEffect = function(d, b) {
    return ct.H.useInsertionEffect(d, b);
  }, at.useLayoutEffect = function(d, b) {
    return ct.H.useLayoutEffect(d, b);
  }, at.useMemo = function(d, b) {
    return ct.H.useMemo(d, b);
  }, at.useOptimistic = function(d, b) {
    return ct.H.useOptimistic(d, b);
  }, at.useReducer = function(d, b, U) {
    return ct.H.useReducer(d, b, U);
  }, at.useRef = function(d) {
    return ct.H.useRef(d);
  }, at.useState = function(d) {
    return ct.H.useState(d);
  }, at.useSyncExternalStore = function(d, b, U) {
    return ct.H.useSyncExternalStore(
      d,
      b,
      U
    );
  }, at.useTransition = function() {
    return ct.H.useTransition();
  }, at.version = "19.2.4", at;
}
var rm;
function vs() {
  return rm || (rm = 1, ts.exports = Q0()), ts.exports;
}
var ls = { exports: {} }, hl = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var om;
function w0() {
  if (om) return hl;
  om = 1;
  var f = vs();
  function h(C) {
    var g = "https://react.dev/errors/" + C;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var L = 2; L < arguments.length; L++)
        g += "&args[]=" + encodeURIComponent(arguments[L]);
    }
    return "Minified React error #" + C + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function m() {
  }
  var r = {
    d: {
      f: m,
      r: function() {
        throw Error(h(522));
      },
      D: m,
      C: m,
      L: m,
      m,
      X: m,
      S: m,
      M: m
    },
    p: 0,
    findDOMNode: null
  }, O = Symbol.for("react.portal");
  function D(C, g, L) {
    var R = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: O,
      key: R == null ? null : "" + R,
      children: C,
      containerInfo: g,
      implementation: L
    };
  }
  var X = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function G(C, g) {
    if (C === "font") return "";
    if (typeof g == "string")
      return g === "use-credentials" ? g : "";
  }
  return hl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, hl.createPortal = function(C, g) {
    var L = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)
      throw Error(h(299));
    return D(C, g, null, L);
  }, hl.flushSync = function(C) {
    var g = X.T, L = r.p;
    try {
      if (X.T = null, r.p = 2, C) return C();
    } finally {
      X.T = g, r.p = L, r.d.f();
    }
  }, hl.preconnect = function(C, g) {
    typeof C == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, r.d.C(C, g));
  }, hl.prefetchDNS = function(C) {
    typeof C == "string" && r.d.D(C);
  }, hl.preinit = function(C, g) {
    if (typeof C == "string" && g && typeof g.as == "string") {
      var L = g.as, R = G(L, g.crossOrigin), B = typeof g.integrity == "string" ? g.integrity : void 0, I = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
      L === "style" ? r.d.S(
        C,
        typeof g.precedence == "string" ? g.precedence : void 0,
        {
          crossOrigin: R,
          integrity: B,
          fetchPriority: I
        }
      ) : L === "script" && r.d.X(C, {
        crossOrigin: R,
        integrity: B,
        fetchPriority: I,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0
      });
    }
  }, hl.preinitModule = function(C, g) {
    if (typeof C == "string")
      if (typeof g == "object" && g !== null) {
        if (g.as == null || g.as === "script") {
          var L = G(
            g.as,
            g.crossOrigin
          );
          r.d.M(C, {
            crossOrigin: L,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
            nonce: typeof g.nonce == "string" ? g.nonce : void 0
          });
        }
      } else g == null && r.d.M(C);
  }, hl.preload = function(C, g) {
    if (typeof C == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
      var L = g.as, R = G(L, g.crossOrigin);
      r.d.L(C, L, {
        crossOrigin: R,
        integrity: typeof g.integrity == "string" ? g.integrity : void 0,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0,
        type: typeof g.type == "string" ? g.type : void 0,
        fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
        referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
        imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
        imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
        media: typeof g.media == "string" ? g.media : void 0
      });
    }
  }, hl.preloadModule = function(C, g) {
    if (typeof C == "string")
      if (g) {
        var L = G(g.as, g.crossOrigin);
        r.d.m(C, {
          as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
          crossOrigin: L,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0
        });
      } else r.d.m(C);
  }, hl.requestFormReset = function(C) {
    r.d.r(C);
  }, hl.unstable_batchedUpdates = function(C, g) {
    return C(g);
  }, hl.useFormState = function(C, g, L) {
    return X.H.useFormState(C, g, L);
  }, hl.useFormStatus = function() {
    return X.H.useHostTransitionStatus();
  }, hl.version = "19.2.4", hl;
}
var dm;
function V0() {
  if (dm) return ls.exports;
  dm = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (h) {
        console.error(h);
      }
  }
  return f(), ls.exports = w0(), ls.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mm;
function Z0() {
  if (mm) return fu;
  mm = 1;
  var f = G0(), h = vs(), m = V0();
  function r(t) {
    var l = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        l += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function O(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function D(t) {
    var l = t, e = t;
    if (t.alternate) for (; l.return; ) l = l.return;
    else {
      t = l;
      do
        l = t, (l.flags & 4098) !== 0 && (e = l.return), t = l.return;
      while (t);
    }
    return l.tag === 3 ? e : null;
  }
  function X(t) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function G(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function C(t) {
    if (D(t) !== t)
      throw Error(r(188));
  }
  function g(t) {
    var l = t.alternate;
    if (!l) {
      if (l = D(t), l === null) throw Error(r(188));
      return l !== t ? null : t;
    }
    for (var e = t, a = l; ; ) {
      var n = e.return;
      if (n === null) break;
      var u = n.alternate;
      if (u === null) {
        if (a = n.return, a !== null) {
          e = a;
          continue;
        }
        break;
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === e) return C(n), t;
          if (u === a) return C(n), l;
          u = u.sibling;
        }
        throw Error(r(188));
      }
      if (e.return !== a.return) e = n, a = u;
      else {
        for (var c = !1, i = n.child; i; ) {
          if (i === e) {
            c = !0, e = n, a = u;
            break;
          }
          if (i === a) {
            c = !0, a = n, e = u;
            break;
          }
          i = i.sibling;
        }
        if (!c) {
          for (i = u.child; i; ) {
            if (i === e) {
              c = !0, e = u, a = n;
              break;
            }
            if (i === a) {
              c = !0, a = u, e = n;
              break;
            }
            i = i.sibling;
          }
          if (!c) throw Error(r(189));
        }
      }
      if (e.alternate !== a) throw Error(r(190));
    }
    if (e.tag !== 3) throw Error(r(188));
    return e.stateNode.current === e ? t : l;
  }
  function L(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t;
    for (t = t.child; t !== null; ) {
      if (l = L(t), l !== null) return l;
      t = t.sibling;
    }
    return null;
  }
  var R = Object.assign, B = Symbol.for("react.element"), I = Symbol.for("react.transitional.element"), dt = Symbol.for("react.portal"), ut = Symbol.for("react.fragment"), Lt = Symbol.for("react.strict_mode"), k = Symbol.for("react.profiler"), lt = Symbol.for("react.consumer"), _t = Symbol.for("react.context"), Tt = Symbol.for("react.forward_ref"), Ht = Symbol.for("react.suspense"), zt = Symbol.for("react.suspense_list"), ct = Symbol.for("react.memo"), kt = Symbol.for("react.lazy"), cl = Symbol.for("react.activity"), gl = Symbol.for("react.memo_cache_sentinel"), ml = Symbol.iterator;
  function Qt(t) {
    return t === null || typeof t != "object" ? null : (t = ml && t[ml] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var Dt = Symbol.for("react.client.reference");
  function il(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === Dt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case ut:
        return "Fragment";
      case k:
        return "Profiler";
      case Lt:
        return "StrictMode";
      case Ht:
        return "Suspense";
      case zt:
        return "SuspenseList";
      case cl:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case dt:
          return "Portal";
        case _t:
          return t.displayName || "Context";
        case lt:
          return (t._context.displayName || "Context") + ".Consumer";
        case Tt:
          var l = t.render;
          return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case ct:
          return l = t.displayName || null, l !== null ? l : il(t.type) || "Memo";
        case kt:
          l = t._payload, t = t._init;
          try {
            return il(t(l));
          } catch {
          }
      }
    return null;
  }
  var Wt = Array.isArray, _ = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = m.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, W = [], Et = -1;
  function d(t) {
    return { current: t };
  }
  function b(t) {
    0 > Et || (t.current = W[Et], W[Et] = null, Et--);
  }
  function U(t, l) {
    Et++, W[Et] = t.current, t.current = l;
  }
  var Y = d(null), F = d(null), et = d(null), tt = d(null);
  function nt(t, l) {
    switch (U(et, l), U(F, t), U(Y, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? Cd(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = Cd(l), t = Md(l, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    b(Y), U(Y, t);
  }
  function Nt() {
    b(Y), b(F), b(et);
  }
  function yl(t) {
    t.memoizedState !== null && U(tt, t);
    var l = Y.current, e = Md(l, t.type);
    l !== e && (U(F, t), U(Y, e));
  }
  function xe(t) {
    F.current === t && (b(Y), b(F)), tt.current === t && (b(tt), au._currentValue = $);
  }
  var Ce, ne;
  function fl(t) {
    if (Ce === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        Ce = l && l[1] || "", ne = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ce + t + ne;
  }
  var bt = !1;
  function _a(t, l) {
    if (!t || bt) return "";
    bt = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (l) {
              var M = function() {
                throw Error();
              };
              if (Object.defineProperty(M.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(M, []);
                } catch (A) {
                  var E = A;
                }
                Reflect.construct(t, [], M);
              } else {
                try {
                  M.call();
                } catch (A) {
                  E = A;
                }
                t.call(M.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (A) {
                E = A;
              }
              (M = t()) && typeof M.catch == "function" && M.catch(function() {
              });
            }
          } catch (A) {
            if (A && E && typeof A.stack == "string")
              return [A.stack, E.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var n = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      n && n.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = a.DetermineComponentFrameRoot(), c = u[0], i = u[1];
      if (c && i) {
        var o = c.split(`
`), p = i.split(`
`);
        for (n = a = 0; a < o.length && !o[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < p.length && !p[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === o.length || n === p.length)
          for (a = o.length - 1, n = p.length - 1; 1 <= a && 0 <= n && o[a] !== p[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (o[a] !== p[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || o[a] !== p[n]) {
                  var T = `
` + o[a].replace(" at new ", " at ");
                  return t.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", t.displayName)), T;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      bt = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? fl(e) : "";
  }
  function ou(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return fl(t.type);
      case 16:
        return fl("Lazy");
      case 13:
        return t.child !== l && l !== null ? fl("Suspense Fallback") : fl("Suspense");
      case 19:
        return fl("SuspenseList");
      case 0:
      case 15:
        return _a(t.type, !1);
      case 11:
        return _a(t.type.render, !1);
      case 1:
        return _a(t.type, !0);
      case 31:
        return fl("Activity");
      default:
        return "";
    }
  }
  function mn(t) {
    try {
      var l = "", e = null;
      do
        l += ou(t, e), e = t, t = t.return;
      while (t);
      return l;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var hn = Object.prototype.hasOwnProperty, Ta = f.unstable_scheduleCallback, Me = f.unstable_cancelCallback, du = f.unstable_shouldYield, mu = f.unstable_requestPaint, wt = f.unstable_now, yn = f.unstable_getCurrentPriorityLevel, za = f.unstable_ImmediatePriority, vn = f.unstable_UserBlockingPriority, _l = f.unstable_NormalPriority, Re = f.unstable_LowPriority, gn = f.unstable_IdlePriority, Wl = f.log, hu = f.unstable_setDisableYieldValue, Oe = null, Vt = null;
  function Tl(t) {
    if (typeof Wl == "function" && hu(t), Vt && typeof Vt.setStrictMode == "function")
      try {
        Vt.setStrictMode(Oe, t);
      } catch {
      }
  }
  var nl = Math.clz32 ? Math.clz32 : yu, xa = Math.log, Yc = Math.LN2;
  function yu(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (xa(t) / Yc | 0) | 0;
  }
  var Ca = 256, Ma = 262144, Ra = 4194304;
  function Fl(t) {
    var l = t & 42;
    if (l !== 0) return l;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Oa(t, l, e) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = t.suspendedLanes, c = t.pingedLanes;
    t = t.warmLanes;
    var i = a & 134217727;
    return i !== 0 ? (a = i & ~u, a !== 0 ? n = Fl(a) : (c &= i, c !== 0 ? n = Fl(c) : e || (e = i & ~t, e !== 0 && (n = Fl(e))))) : (i = a & ~u, i !== 0 ? n = Fl(i) : c !== 0 ? n = Fl(c) : e || (e = a & ~t, e !== 0 && (n = Fl(e)))), n === 0 ? 0 : l !== 0 && l !== n && (l & u) === 0 && (u = n & -n, e = l & -l, u >= e || u === 32 && (e & 4194048) !== 0) ? l : n;
  }
  function ua(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function Xc(t, l) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return l + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function vu() {
    var t = Ra;
    return Ra <<= 1, (Ra & 62914560) === 0 && (Ra = 4194304), t;
  }
  function ja(t) {
    for (var l = [], e = 0; 31 > e; e++) l.push(t);
    return l;
  }
  function ca(t, l) {
    t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Gc(t, l, e, a, n, u) {
    var c = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var i = t.entanglements, o = t.expirationTimes, p = t.hiddenUpdates;
    for (e = c & ~e; 0 < e; ) {
      var T = 31 - nl(e), M = 1 << T;
      i[T] = 0, o[T] = -1;
      var E = p[T];
      if (E !== null)
        for (p[T] = null, T = 0; T < E.length; T++) {
          var A = E[T];
          A !== null && (A.lane &= -536870913);
        }
      e &= ~M;
    }
    a !== 0 && gu(t, a, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(c & ~l));
  }
  function gu(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var a = 31 - nl(l);
    t.entangledLanes |= l, t.entanglements[a] = t.entanglements[a] | 1073741824 | e & 261930;
  }
  function N(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var a = 31 - nl(e), n = 1 << a;
      n & l | t[a] & l && (t[a] |= l), e &= ~n;
    }
  }
  function j(t, l) {
    var e = l & -l;
    return e = (e & 42) !== 0 ? 1 : H(e), (e & (t.suspendedLanes | l)) !== 0 ? 0 : e;
  }
  function H(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function V(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Q() {
    var t = q.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Id(t.type));
  }
  function K(t, l) {
    var e = q.p;
    try {
      return q.p = t, l();
    } finally {
      q.p = e;
    }
  }
  var rt = Math.random().toString(36).slice(2), ot = "__reactFiber$" + rt, it = "__reactProps$" + rt, xt = "__reactContainer$" + rt, Xt = "__reactEvents$" + rt, zl = "__reactListeners$" + rt, Ft = "__reactHandles$" + rt, ue = "__reactResources$" + rt, je = "__reactMarker$" + rt;
  function De(t) {
    delete t[ot], delete t[it], delete t[Xt], delete t[zl], delete t[Ft];
  }
  function Ul(t) {
    var l = t[ot];
    if (l) return l;
    for (var e = t.parentNode; e; ) {
      if (l = e[xt] || e[ot]) {
        if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
          for (t = Hd(t); t !== null; ) {
            if (e = t[ot]) return e;
            t = Hd(t);
          }
        return l;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function ce(t) {
    if (t = t[ot] || t[xt]) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3)
        return t;
    }
    return null;
  }
  function ia(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(r(33));
  }
  function Ue(t) {
    var l = t[ue];
    return l || (l = t[ue] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function Gt(t) {
    t[je] = !0;
  }
  var bn = /* @__PURE__ */ new Set(), Sn = {};
  function Il(t, l) {
    ie(t, l), ie(t + "Capture", l);
  }
  function ie(t, l) {
    for (Sn[t] = l, t = 0; t < l.length; t++)
      bn.add(l[t]);
  }
  var el = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), bu = {}, bs = {};
  function Rm(t) {
    return hn.call(bs, t) ? !0 : hn.call(bu, t) ? !1 : el.test(t) ? bs[t] = !0 : (bu[t] = !0, !1);
  }
  function Su(t, l, e) {
    if (Rm(l))
      if (e === null) t.removeAttribute(l);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(l);
            return;
          case "boolean":
            var a = l.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              t.removeAttribute(l);
              return;
            }
        }
        t.setAttribute(l, "" + e);
      }
  }
  function pu(t, l, e) {
    if (e === null) t.removeAttribute(l);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttribute(l, "" + e);
    }
  }
  function fe(t, l, e, a) {
    if (a === null) t.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttributeNS(l, e, "" + a);
    }
  }
  function Ll(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Ss(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
  }
  function Om(t, l, e) {
    var a = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      l
    );
    if (!t.hasOwnProperty(l) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var n = a.get, u = a.set;
      return Object.defineProperty(t, l, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(c) {
          e = "" + c, u.call(this, c);
        }
      }), Object.defineProperty(t, l, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return e;
        },
        setValue: function(c) {
          e = "" + c;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[l];
        }
      };
    }
  }
  function Qc(t) {
    if (!t._valueTracker) {
      var l = Ss(t) ? "checked" : "value";
      t._valueTracker = Om(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function ps(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var e = l.getValue(), a = "";
    return t && (a = Ss(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== e ? (l.setValue(t), !0) : !1;
  }
  function Eu(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var jm = /[\n"\\]/g;
  function Hl(t) {
    return t.replace(
      jm,
      function(l) {
        return "\\" + l.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function wc(t, l, e, a, n, u, c, i) {
    t.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.type = c : t.removeAttribute("type"), l != null ? c === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + Ll(l)) : t.value !== "" + Ll(l) && (t.value = "" + Ll(l)) : c !== "submit" && c !== "reset" || t.removeAttribute("value"), l != null ? Vc(t, c, Ll(l)) : e != null ? Vc(t, c, Ll(e)) : a != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.name = "" + Ll(i) : t.removeAttribute("name");
  }
  function Es(t, l, e, a, n, u, c, i) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), l != null || e != null) {
      if (!(u !== "submit" && u !== "reset" || l != null)) {
        Qc(t);
        return;
      }
      e = e != null ? "" + Ll(e) : "", l = l != null ? "" + Ll(l) : e, i || l === t.value || (t.value = l), t.defaultValue = l;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = i ? t.checked : !!a, t.defaultChecked = !!a, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (t.name = c), Qc(t);
  }
  function Vc(t, l, e) {
    l === "number" && Eu(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
  }
  function Da(t, l, e, a) {
    if (t = t.options, l) {
      l = {};
      for (var n = 0; n < e.length; n++)
        l["$" + e[n]] = !0;
      for (e = 0; e < t.length; e++)
        n = l.hasOwnProperty("$" + t[e].value), t[e].selected !== n && (t[e].selected = n), n && a && (t[e].defaultSelected = !0);
    } else {
      for (e = "" + Ll(e), l = null, n = 0; n < t.length; n++) {
        if (t[n].value === e) {
          t[n].selected = !0, a && (t[n].defaultSelected = !0);
          return;
        }
        l !== null || t[n].disabled || (l = t[n]);
      }
      l !== null && (l.selected = !0);
    }
  }
  function Ns(t, l, e) {
    if (l != null && (l = "" + Ll(l), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? "" + Ll(e) : "";
  }
  function As(t, l, e, a) {
    if (l == null) {
      if (a != null) {
        if (e != null) throw Error(r(92));
        if (Wt(a)) {
          if (1 < a.length) throw Error(r(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), l = e;
    }
    e = Ll(l), t.defaultValue = e, a = t.textContent, a === e && a !== "" && a !== null && (t.value = a), Qc(t);
  }
  function Ua(t, l) {
    if (l) {
      var e = t.firstChild;
      if (e && e === t.lastChild && e.nodeType === 3) {
        e.nodeValue = l;
        return;
      }
    }
    t.textContent = l;
  }
  var Dm = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function _s(t, l, e) {
    var a = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : a ? t.setProperty(l, e) : typeof e != "number" || e === 0 || Dm.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function Ts(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(r(62));
    if (t = t.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || l != null && l.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "");
      for (var n in l)
        a = l[n], l.hasOwnProperty(n) && e[n] !== a && _s(t, n, a);
    } else
      for (var u in l)
        l.hasOwnProperty(u) && _s(t, u, l[u]);
  }
  function Zc(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Um = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Lm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Nu(t) {
    return Lm.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function se() {
  }
  var Kc = null;
  function kc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var La = null, Ha = null;
  function zs(t) {
    var l = ce(t);
    if (l && (t = l.stateNode)) {
      var e = t[it] || null;
      t: switch (t = l.stateNode, l.type) {
        case "input":
          if (wc(
            t,
            e.value,
            e.defaultValue,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name
          ), l = e.name, e.type === "radio" && l != null) {
            for (e = t; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll(
              'input[name="' + Hl(
                "" + l
              ) + '"][type="radio"]'
            ), l = 0; l < e.length; l++) {
              var a = e[l];
              if (a !== t && a.form === t.form) {
                var n = a[it] || null;
                if (!n) throw Error(r(90));
                wc(
                  a,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name
                );
              }
            }
            for (l = 0; l < e.length; l++)
              a = e[l], a.form === t.form && ps(a);
          }
          break t;
        case "textarea":
          Ns(t, e.value, e.defaultValue);
          break t;
        case "select":
          l = e.value, l != null && Da(t, !!e.multiple, l, !1);
      }
    }
  }
  var Jc = !1;
  function xs(t, l, e) {
    if (Jc) return t(l, e);
    Jc = !0;
    try {
      var a = t(l);
      return a;
    } finally {
      if (Jc = !1, (La !== null || Ha !== null) && (sc(), La && (l = La, t = Ha, Ha = La = null, zs(l), t)))
        for (l = 0; l < t.length; l++) zs(t[l]);
    }
  }
  function pn(t, l) {
    var e = t.stateNode;
    if (e === null) return null;
    var a = e[it] || null;
    if (a === null) return null;
    e = a[l];
    t: switch (l) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) || (t = t.type, a = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !a;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (e && typeof e != "function")
      throw Error(
        r(231, l, typeof e)
      );
    return e;
  }
  var re = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), $c = !1;
  if (re)
    try {
      var En = {};
      Object.defineProperty(En, "passive", {
        get: function() {
          $c = !0;
        }
      }), window.addEventListener("test", En, En), window.removeEventListener("test", En, En);
    } catch {
      $c = !1;
    }
  var Le = null, Wc = null, Au = null;
  function Cs() {
    if (Au) return Au;
    var t, l = Wc, e = l.length, a, n = "value" in Le ? Le.value : Le.textContent, u = n.length;
    for (t = 0; t < e && l[t] === n[t]; t++) ;
    var c = e - t;
    for (a = 1; a <= c && l[e - a] === n[u - a]; a++) ;
    return Au = n.slice(t, 1 < a ? 1 - a : void 0);
  }
  function _u(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Tu() {
    return !0;
  }
  function Ms() {
    return !1;
  }
  function bl(t) {
    function l(e, a, n, u, c) {
      this._reactName = e, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = c, this.currentTarget = null;
      for (var i in t)
        t.hasOwnProperty(i) && (e = t[i], this[i] = e ? e(u) : u[i]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Tu : Ms, this.isPropagationStopped = Ms, this;
    }
    return R(l.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Tu);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Tu);
      },
      persist: function() {
      },
      isPersistent: Tu
    }), l;
  }
  var fa = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, zu = bl(fa), Nn = R({}, fa, { view: 0, detail: 0 }), Hm = bl(Nn), Fc, Ic, An, xu = R({}, Nn, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: ti,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== An && (An && t.type === "mousemove" ? (Fc = t.screenX - An.screenX, Ic = t.screenY - An.screenY) : Ic = Fc = 0, An = t), Fc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Ic;
    }
  }), Rs = bl(xu), Bm = R({}, xu, { dataTransfer: 0 }), qm = bl(Bm), Ym = R({}, Nn, { relatedTarget: 0 }), Pc = bl(Ym), Xm = R({}, fa, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Gm = bl(Xm), Qm = R({}, fa, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), wm = bl(Qm), Vm = R({}, fa, { data: 0 }), Os = bl(Vm), Zm = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Km = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, km = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Jm(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = km[t]) ? !!l[t] : !1;
  }
  function ti() {
    return Jm;
  }
  var $m = R({}, Nn, {
    key: function(t) {
      if (t.key) {
        var l = Zm[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = _u(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Km[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ti,
    charCode: function(t) {
      return t.type === "keypress" ? _u(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? _u(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Wm = bl($m), Fm = R({}, xu, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), js = bl(Fm), Im = R({}, Nn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ti
  }), Pm = bl(Im), th = R({}, fa, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), lh = bl(th), eh = R({}, xu, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), ah = bl(eh), nh = R({}, fa, {
    newState: 0,
    oldState: 0
  }), uh = bl(nh), ch = [9, 13, 27, 32], li = re && "CompositionEvent" in window, _n = null;
  re && "documentMode" in document && (_n = document.documentMode);
  var ih = re && "TextEvent" in window && !_n, Ds = re && (!li || _n && 8 < _n && 11 >= _n), Us = " ", Ls = !1;
  function Hs(t, l) {
    switch (t) {
      case "keyup":
        return ch.indexOf(l.keyCode) !== -1;
      case "keydown":
        return l.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Bs(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Ba = !1;
  function fh(t, l) {
    switch (t) {
      case "compositionend":
        return Bs(l);
      case "keypress":
        return l.which !== 32 ? null : (Ls = !0, Us);
      case "textInput":
        return t = l.data, t === Us && Ls ? null : t;
      default:
        return null;
    }
  }
  function sh(t, l) {
    if (Ba)
      return t === "compositionend" || !li && Hs(t, l) ? (t = Cs(), Au = Wc = Le = null, Ba = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(l.ctrlKey || l.altKey || l.metaKey) || l.ctrlKey && l.altKey) {
          if (l.char && 1 < l.char.length)
            return l.char;
          if (l.which) return String.fromCharCode(l.which);
        }
        return null;
      case "compositionend":
        return Ds && l.locale !== "ko" ? null : l.data;
      default:
        return null;
    }
  }
  var rh = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function qs(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!rh[t.type] : l === "textarea";
  }
  function Ys(t, l, e, a) {
    La ? Ha ? Ha.push(a) : Ha = [a] : La = a, l = vc(l, "onChange"), 0 < l.length && (e = new zu(
      "onChange",
      "change",
      null,
      e,
      a
    ), t.push({ event: e, listeners: l }));
  }
  var Tn = null, zn = null;
  function oh(t) {
    Nd(t, 0);
  }
  function Cu(t) {
    var l = ia(t);
    if (ps(l)) return t;
  }
  function Xs(t, l) {
    if (t === "change") return l;
  }
  var Gs = !1;
  if (re) {
    var ei;
    if (re) {
      var ai = "oninput" in document;
      if (!ai) {
        var Qs = document.createElement("div");
        Qs.setAttribute("oninput", "return;"), ai = typeof Qs.oninput == "function";
      }
      ei = ai;
    } else ei = !1;
    Gs = ei && (!document.documentMode || 9 < document.documentMode);
  }
  function ws() {
    Tn && (Tn.detachEvent("onpropertychange", Vs), zn = Tn = null);
  }
  function Vs(t) {
    if (t.propertyName === "value" && Cu(zn)) {
      var l = [];
      Ys(
        l,
        zn,
        t,
        kc(t)
      ), xs(oh, l);
    }
  }
  function dh(t, l, e) {
    t === "focusin" ? (ws(), Tn = l, zn = e, Tn.attachEvent("onpropertychange", Vs)) : t === "focusout" && ws();
  }
  function mh(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Cu(zn);
  }
  function hh(t, l) {
    if (t === "click") return Cu(l);
  }
  function yh(t, l) {
    if (t === "input" || t === "change")
      return Cu(l);
  }
  function vh(t, l) {
    return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
  }
  var xl = typeof Object.is == "function" ? Object.is : vh;
  function xn(t, l) {
    if (xl(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null)
      return !1;
    var e = Object.keys(t), a = Object.keys(l);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var n = e[a];
      if (!hn.call(l, n) || !xl(t[n], l[n]))
        return !1;
    }
    return !0;
  }
  function Zs(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Ks(t, l) {
    var e = Zs(t);
    t = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (a = t + e.textContent.length, t <= l && a >= l)
          return { node: e, offset: l - t };
        t = a;
      }
      t: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break t;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = Zs(e);
    }
  }
  function ks(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? ks(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function Js(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = Eu(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = Eu(t.document);
    }
    return l;
  }
  function ni(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var gh = re && "documentMode" in document && 11 >= document.documentMode, qa = null, ui = null, Cn = null, ci = !1;
  function $s(t, l, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    ci || qa == null || qa !== Eu(a) || (a = qa, "selectionStart" in a && ni(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Cn && xn(Cn, a) || (Cn = a, a = vc(ui, "onSelect"), 0 < a.length && (l = new zu(
      "onSelect",
      "select",
      null,
      l,
      e
    ), t.push({ event: l, listeners: a }), l.target = qa)));
  }
  function sa(t, l) {
    var e = {};
    return e[t.toLowerCase()] = l.toLowerCase(), e["Webkit" + t] = "webkit" + l, e["Moz" + t] = "moz" + l, e;
  }
  var Ya = {
    animationend: sa("Animation", "AnimationEnd"),
    animationiteration: sa("Animation", "AnimationIteration"),
    animationstart: sa("Animation", "AnimationStart"),
    transitionrun: sa("Transition", "TransitionRun"),
    transitionstart: sa("Transition", "TransitionStart"),
    transitioncancel: sa("Transition", "TransitionCancel"),
    transitionend: sa("Transition", "TransitionEnd")
  }, ii = {}, Ws = {};
  re && (Ws = document.createElement("div").style, "AnimationEvent" in window || (delete Ya.animationend.animation, delete Ya.animationiteration.animation, delete Ya.animationstart.animation), "TransitionEvent" in window || delete Ya.transitionend.transition);
  function ra(t) {
    if (ii[t]) return ii[t];
    if (!Ya[t]) return t;
    var l = Ya[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in Ws)
        return ii[t] = l[e];
    return t;
  }
  var Fs = ra("animationend"), Is = ra("animationiteration"), Ps = ra("animationstart"), bh = ra("transitionrun"), Sh = ra("transitionstart"), ph = ra("transitioncancel"), tr = ra("transitionend"), lr = /* @__PURE__ */ new Map(), fi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  fi.push("scrollEnd");
  function Zl(t, l) {
    lr.set(t, l), Il(l, [t]);
  }
  var Mu = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var l = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(l)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Bl = [], Xa = 0, si = 0;
  function Ru() {
    for (var t = Xa, l = si = Xa = 0; l < t; ) {
      var e = Bl[l];
      Bl[l++] = null;
      var a = Bl[l];
      Bl[l++] = null;
      var n = Bl[l];
      Bl[l++] = null;
      var u = Bl[l];
      if (Bl[l++] = null, a !== null && n !== null) {
        var c = a.pending;
        c === null ? n.next = n : (n.next = c.next, c.next = n), a.pending = n;
      }
      u !== 0 && er(e, n, u);
    }
  }
  function Ou(t, l, e, a) {
    Bl[Xa++] = t, Bl[Xa++] = l, Bl[Xa++] = e, Bl[Xa++] = a, si |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function ri(t, l, e, a) {
    return Ou(t, l, e, a), ju(t);
  }
  function oa(t, l) {
    return Ou(t, null, null, l), ju(t);
  }
  function er(t, l, e) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= e, a = u.alternate, a !== null && (a.childLanes |= e), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && l !== null && (n = 31 - nl(e), t = u.hiddenUpdates, a = t[n], a === null ? t[n] = [l] : a.push(l), l.lane = e | 536870912), u) : null;
  }
  function ju(t) {
    if (50 < Wn)
      throw Wn = 0, pf = null, Error(r(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Ga = {};
  function Eh(t, l, e, a) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Cl(t, l, e, a) {
    return new Eh(t, l, e, a);
  }
  function oi(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function oe(t, l) {
    var e = t.alternate;
    return e === null ? (e = Cl(
      t.tag,
      l,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 65011712, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function ar(t, l) {
    t.flags &= 65011714;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function Du(t, l, e, a, n, u) {
    var c = 0;
    if (a = t, typeof t == "function") oi(t) && (c = 1);
    else if (typeof t == "string")
      c = z0(
        t,
        e,
        Y.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case cl:
          return t = Cl(31, e, l, n), t.elementType = cl, t.lanes = u, t;
        case ut:
          return da(e.children, n, u, l);
        case Lt:
          c = 8, n |= 24;
          break;
        case k:
          return t = Cl(12, e, l, n | 2), t.elementType = k, t.lanes = u, t;
        case Ht:
          return t = Cl(13, e, l, n), t.elementType = Ht, t.lanes = u, t;
        case zt:
          return t = Cl(19, e, l, n), t.elementType = zt, t.lanes = u, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case _t:
                c = 10;
                break t;
              case lt:
                c = 9;
                break t;
              case Tt:
                c = 11;
                break t;
              case ct:
                c = 14;
                break t;
              case kt:
                c = 16, a = null;
                break t;
            }
          c = 29, e = Error(
            r(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return l = Cl(c, e, l, n), l.elementType = t, l.type = a, l.lanes = u, l;
  }
  function da(t, l, e, a) {
    return t = Cl(7, t, a, l), t.lanes = e, t;
  }
  function di(t, l, e) {
    return t = Cl(6, t, null, l), t.lanes = e, t;
  }
  function nr(t) {
    var l = Cl(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function mi(t, l, e) {
    return l = Cl(
      4,
      t.children !== null ? t.children : [],
      t.key,
      l
    ), l.lanes = e, l.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, l;
  }
  var ur = /* @__PURE__ */ new WeakMap();
  function ql(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = ur.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: mn(l)
      }, ur.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: mn(l)
    };
  }
  var Qa = [], wa = 0, Uu = null, Mn = 0, Yl = [], Xl = 0, He = null, Pl = 1, te = "";
  function de(t, l) {
    Qa[wa++] = Mn, Qa[wa++] = Uu, Uu = t, Mn = l;
  }
  function cr(t, l, e) {
    Yl[Xl++] = Pl, Yl[Xl++] = te, Yl[Xl++] = He, He = t;
    var a = Pl;
    t = te;
    var n = 32 - nl(a) - 1;
    a &= ~(1 << n), e += 1;
    var u = 32 - nl(l) + n;
    if (30 < u) {
      var c = n - n % 5;
      u = (a & (1 << c) - 1).toString(32), a >>= c, n -= c, Pl = 1 << 32 - nl(l) + n | e << n | a, te = u + t;
    } else
      Pl = 1 << u | e << n | a, te = t;
  }
  function hi(t) {
    t.return !== null && (de(t, 1), cr(t, 1, 0));
  }
  function yi(t) {
    for (; t === Uu; )
      Uu = Qa[--wa], Qa[wa] = null, Mn = Qa[--wa], Qa[wa] = null;
    for (; t === He; )
      He = Yl[--Xl], Yl[Xl] = null, te = Yl[--Xl], Yl[Xl] = null, Pl = Yl[--Xl], Yl[Xl] = null;
  }
  function ir(t, l) {
    Yl[Xl++] = Pl, Yl[Xl++] = te, Yl[Xl++] = He, Pl = l.id, te = l.overflow, He = t;
  }
  var sl = null, Bt = null, gt = !1, Be = null, Gl = !1, vi = Error(r(519));
  function qe(t) {
    var l = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Rn(ql(l, t)), vi;
  }
  function fr(t) {
    var l = t.stateNode, e = t.type, a = t.memoizedProps;
    switch (l[ot] = t, l[it] = a, e) {
      case "dialog":
        ht("cancel", l), ht("close", l);
        break;
      case "iframe":
      case "object":
      case "embed":
        ht("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < In.length; e++)
          ht(In[e], l);
        break;
      case "source":
        ht("error", l);
        break;
      case "img":
      case "image":
      case "link":
        ht("error", l), ht("load", l);
        break;
      case "details":
        ht("toggle", l);
        break;
      case "input":
        ht("invalid", l), Es(
          l,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        );
        break;
      case "select":
        ht("invalid", l);
        break;
      case "textarea":
        ht("invalid", l), As(l, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || a.suppressHydrationWarning === !0 || zd(l.textContent, e) ? (a.popover != null && (ht("beforetoggle", l), ht("toggle", l)), a.onScroll != null && ht("scroll", l), a.onScrollEnd != null && ht("scrollend", l), a.onClick != null && (l.onclick = se), l = !0) : l = !1, l || qe(t, !0);
  }
  function sr(t) {
    for (sl = t.return; sl; )
      switch (sl.tag) {
        case 5:
        case 31:
        case 13:
          Gl = !1;
          return;
        case 27:
        case 3:
          Gl = !0;
          return;
        default:
          sl = sl.return;
      }
  }
  function Va(t) {
    if (t !== sl) return !1;
    if (!gt) return sr(t), gt = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || Lf(t.type, t.memoizedProps)), e = !e), e && Bt && qe(t), sr(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Bt = Ld(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Bt = Ld(t);
    } else
      l === 27 ? (l = Bt, Ie(t.type) ? (t = Xf, Xf = null, Bt = t) : Bt = l) : Bt = sl ? wl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function ma() {
    Bt = sl = null, gt = !1;
  }
  function gi() {
    var t = Be;
    return t !== null && (Nl === null ? Nl = t : Nl.push.apply(
      Nl,
      t
    ), Be = null), t;
  }
  function Rn(t) {
    Be === null ? Be = [t] : Be.push(t);
  }
  var bi = d(null), ha = null, me = null;
  function Ye(t, l, e) {
    U(bi, l._currentValue), l._currentValue = e;
  }
  function he(t) {
    t._currentValue = bi.current, b(bi);
  }
  function Si(t, l, e) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & l) !== l ? (t.childLanes |= l, a !== null && (a.childLanes |= l)) : a !== null && (a.childLanes & l) !== l && (a.childLanes |= l), t === e) break;
      t = t.return;
    }
  }
  function pi(t, l, e, a) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var c = n.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var i = u;
          u = n;
          for (var o = 0; o < l.length; o++)
            if (i.context === l[o]) {
              u.lanes |= e, i = u.alternate, i !== null && (i.lanes |= e), Si(
                u.return,
                e,
                t
              ), a || (c = null);
              break t;
            }
          u = i.next;
        }
      } else if (n.tag === 18) {
        if (c = n.return, c === null) throw Error(r(341));
        c.lanes |= e, u = c.alternate, u !== null && (u.lanes |= e), Si(c, e, t), c = null;
      } else c = n.child;
      if (c !== null) c.return = n;
      else
        for (c = n; c !== null; ) {
          if (c === t) {
            c = null;
            break;
          }
          if (n = c.sibling, n !== null) {
            n.return = c.return, c = n;
            break;
          }
          c = c.return;
        }
      n = c;
    }
  }
  function Za(t, l, e, a) {
    t = null;
    for (var n = l, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var c = n.alternate;
        if (c === null) throw Error(r(387));
        if (c = c.memoizedProps, c !== null) {
          var i = n.type;
          xl(n.pendingProps.value, c.value) || (t !== null ? t.push(i) : t = [i]);
        }
      } else if (n === tt.current) {
        if (c = n.alternate, c === null) throw Error(r(387));
        c.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(au) : t = [au]);
      }
      n = n.return;
    }
    t !== null && pi(
      l,
      t,
      e,
      a
    ), l.flags |= 262144;
  }
  function Lu(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!xl(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function ya(t) {
    ha = t, me = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function rl(t) {
    return rr(ha, t);
  }
  function Hu(t, l) {
    return ha === null && ya(t), rr(t, l);
  }
  function rr(t, l) {
    var e = l._currentValue;
    if (l = { context: l, memoizedValue: e, next: null }, me === null) {
      if (t === null) throw Error(r(308));
      me = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else me = me.next = l;
    return e;
  }
  var Nh = typeof AbortController < "u" ? AbortController : function() {
    var t = [], l = this.signal = {
      aborted: !1,
      addEventListener: function(e, a) {
        t.push(a);
      }
    };
    this.abort = function() {
      l.aborted = !0, t.forEach(function(e) {
        return e();
      });
    };
  }, Ah = f.unstable_scheduleCallback, _h = f.unstable_NormalPriority, It = {
    $$typeof: _t,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ei() {
    return {
      controller: new Nh(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function On(t) {
    t.refCount--, t.refCount === 0 && Ah(_h, function() {
      t.controller.abort();
    });
  }
  var jn = null, Ni = 0, Ka = 0, ka = null;
  function Th(t, l) {
    if (jn === null) {
      var e = jn = [];
      Ni = 0, Ka = zf(), ka = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return Ni++, l.then(or, or), l;
  }
  function or() {
    if (--Ni === 0 && jn !== null) {
      ka !== null && (ka.status = "fulfilled");
      var t = jn;
      jn = null, Ka = 0, ka = null;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function zh(t, l) {
    var e = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(n) {
        e.push(n);
      }
    };
    return t.then(
      function() {
        a.status = "fulfilled", a.value = l;
        for (var n = 0; n < e.length; n++) (0, e[n])(l);
      },
      function(n) {
        for (a.status = "rejected", a.reason = n, n = 0; n < e.length; n++)
          (0, e[n])(void 0);
      }
    ), a;
  }
  var dr = _.S;
  _.S = function(t, l) {
    Wo = wt(), typeof l == "object" && l !== null && typeof l.then == "function" && Th(t, l), dr !== null && dr(t, l);
  };
  var va = d(null);
  function Ai() {
    var t = va.current;
    return t !== null ? t : Ut.pooledCache;
  }
  function Bu(t, l) {
    l === null ? U(va, va.current) : U(va, l.pool);
  }
  function mr() {
    var t = Ai();
    return t === null ? null : { parent: It._currentValue, pool: t };
  }
  var Ja = Error(r(460)), _i = Error(r(474)), qu = Error(r(542)), Yu = { then: function() {
  } };
  function hr(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function yr(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(se, se), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, gr(t), t;
      default:
        if (typeof l.status == "string") l.then(se, se);
        else {
          if (t = Ut, t !== null && 100 < t.shellSuspendCounter)
            throw Error(r(482));
          t = l, t.status = "pending", t.then(
            function(a) {
              if (l.status === "pending") {
                var n = l;
                n.status = "fulfilled", n.value = a;
              }
            },
            function(a) {
              if (l.status === "pending") {
                var n = l;
                n.status = "rejected", n.reason = a;
              }
            }
          );
        }
        switch (l.status) {
          case "fulfilled":
            return l.value;
          case "rejected":
            throw t = l.reason, gr(t), t;
        }
        throw ba = l, Ja;
    }
  }
  function ga(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (ba = e, Ja) : e;
    }
  }
  var ba = null;
  function vr() {
    if (ba === null) throw Error(r(459));
    var t = ba;
    return ba = null, t;
  }
  function gr(t) {
    if (t === Ja || t === qu)
      throw Error(r(483));
  }
  var $a = null, Dn = 0;
  function Xu(t) {
    var l = Dn;
    return Dn += 1, $a === null && ($a = []), yr($a, t, l);
  }
  function Un(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function Gu(t, l) {
    throw l.$$typeof === B ? Error(r(525)) : (t = Object.prototype.toString.call(l), Error(
      r(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function br(t) {
    function l(v, y) {
      if (t) {
        var S = v.deletions;
        S === null ? (v.deletions = [y], v.flags |= 16) : S.push(y);
      }
    }
    function e(v, y) {
      if (!t) return null;
      for (; y !== null; )
        l(v, y), y = y.sibling;
      return null;
    }
    function a(v) {
      for (var y = /* @__PURE__ */ new Map(); v !== null; )
        v.key !== null ? y.set(v.key, v) : y.set(v.index, v), v = v.sibling;
      return y;
    }
    function n(v, y) {
      return v = oe(v, y), v.index = 0, v.sibling = null, v;
    }
    function u(v, y, S) {
      return v.index = S, t ? (S = v.alternate, S !== null ? (S = S.index, S < y ? (v.flags |= 67108866, y) : S) : (v.flags |= 67108866, y)) : (v.flags |= 1048576, y);
    }
    function c(v) {
      return t && v.alternate === null && (v.flags |= 67108866), v;
    }
    function i(v, y, S, x) {
      return y === null || y.tag !== 6 ? (y = di(S, v.mode, x), y.return = v, y) : (y = n(y, S), y.return = v, y);
    }
    function o(v, y, S, x) {
      var J = S.type;
      return J === ut ? T(
        v,
        y,
        S.props.children,
        x,
        S.key
      ) : y !== null && (y.elementType === J || typeof J == "object" && J !== null && J.$$typeof === kt && ga(J) === y.type) ? (y = n(y, S.props), Un(y, S), y.return = v, y) : (y = Du(
        S.type,
        S.key,
        S.props,
        null,
        v.mode,
        x
      ), Un(y, S), y.return = v, y);
    }
    function p(v, y, S, x) {
      return y === null || y.tag !== 4 || y.stateNode.containerInfo !== S.containerInfo || y.stateNode.implementation !== S.implementation ? (y = mi(S, v.mode, x), y.return = v, y) : (y = n(y, S.children || []), y.return = v, y);
    }
    function T(v, y, S, x, J) {
      return y === null || y.tag !== 7 ? (y = da(
        S,
        v.mode,
        x,
        J
      ), y.return = v, y) : (y = n(y, S), y.return = v, y);
    }
    function M(v, y, S) {
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
        return y = di(
          "" + y,
          v.mode,
          S
        ), y.return = v, y;
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case I:
            return S = Du(
              y.type,
              y.key,
              y.props,
              null,
              v.mode,
              S
            ), Un(S, y), S.return = v, S;
          case dt:
            return y = mi(
              y,
              v.mode,
              S
            ), y.return = v, y;
          case kt:
            return y = ga(y), M(v, y, S);
        }
        if (Wt(y) || Qt(y))
          return y = da(
            y,
            v.mode,
            S,
            null
          ), y.return = v, y;
        if (typeof y.then == "function")
          return M(v, Xu(y), S);
        if (y.$$typeof === _t)
          return M(
            v,
            Hu(v, y),
            S
          );
        Gu(v, y);
      }
      return null;
    }
    function E(v, y, S, x) {
      var J = y !== null ? y.key : null;
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
        return J !== null ? null : i(v, y, "" + S, x);
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case I:
            return S.key === J ? o(v, y, S, x) : null;
          case dt:
            return S.key === J ? p(v, y, S, x) : null;
          case kt:
            return S = ga(S), E(v, y, S, x);
        }
        if (Wt(S) || Qt(S))
          return J !== null ? null : T(v, y, S, x, null);
        if (typeof S.then == "function")
          return E(
            v,
            y,
            Xu(S),
            x
          );
        if (S.$$typeof === _t)
          return E(
            v,
            y,
            Hu(v, S),
            x
          );
        Gu(v, S);
      }
      return null;
    }
    function A(v, y, S, x, J) {
      if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
        return v = v.get(S) || null, i(y, v, "" + x, J);
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case I:
            return v = v.get(
              x.key === null ? S : x.key
            ) || null, o(y, v, x, J);
          case dt:
            return v = v.get(
              x.key === null ? S : x.key
            ) || null, p(y, v, x, J);
          case kt:
            return x = ga(x), A(
              v,
              y,
              S,
              x,
              J
            );
        }
        if (Wt(x) || Qt(x))
          return v = v.get(S) || null, T(y, v, x, J, null);
        if (typeof x.then == "function")
          return A(
            v,
            y,
            S,
            Xu(x),
            J
          );
        if (x.$$typeof === _t)
          return A(
            v,
            y,
            S,
            Hu(y, x),
            J
          );
        Gu(y, x);
      }
      return null;
    }
    function w(v, y, S, x) {
      for (var J = null, St = null, Z = y, st = y = 0, vt = null; Z !== null && st < S.length; st++) {
        Z.index > st ? (vt = Z, Z = null) : vt = Z.sibling;
        var pt = E(
          v,
          Z,
          S[st],
          x
        );
        if (pt === null) {
          Z === null && (Z = vt);
          break;
        }
        t && Z && pt.alternate === null && l(v, Z), y = u(pt, y, st), St === null ? J = pt : St.sibling = pt, St = pt, Z = vt;
      }
      if (st === S.length)
        return e(v, Z), gt && de(v, st), J;
      if (Z === null) {
        for (; st < S.length; st++)
          Z = M(v, S[st], x), Z !== null && (y = u(
            Z,
            y,
            st
          ), St === null ? J = Z : St.sibling = Z, St = Z);
        return gt && de(v, st), J;
      }
      for (Z = a(Z); st < S.length; st++)
        vt = A(
          Z,
          v,
          st,
          S[st],
          x
        ), vt !== null && (t && vt.alternate !== null && Z.delete(
          vt.key === null ? st : vt.key
        ), y = u(
          vt,
          y,
          st
        ), St === null ? J = vt : St.sibling = vt, St = vt);
      return t && Z.forEach(function(aa) {
        return l(v, aa);
      }), gt && de(v, st), J;
    }
    function P(v, y, S, x) {
      if (S == null) throw Error(r(151));
      for (var J = null, St = null, Z = y, st = y = 0, vt = null, pt = S.next(); Z !== null && !pt.done; st++, pt = S.next()) {
        Z.index > st ? (vt = Z, Z = null) : vt = Z.sibling;
        var aa = E(v, Z, pt.value, x);
        if (aa === null) {
          Z === null && (Z = vt);
          break;
        }
        t && Z && aa.alternate === null && l(v, Z), y = u(aa, y, st), St === null ? J = aa : St.sibling = aa, St = aa, Z = vt;
      }
      if (pt.done)
        return e(v, Z), gt && de(v, st), J;
      if (Z === null) {
        for (; !pt.done; st++, pt = S.next())
          pt = M(v, pt.value, x), pt !== null && (y = u(pt, y, st), St === null ? J = pt : St.sibling = pt, St = pt);
        return gt && de(v, st), J;
      }
      for (Z = a(Z); !pt.done; st++, pt = S.next())
        pt = A(Z, v, st, pt.value, x), pt !== null && (t && pt.alternate !== null && Z.delete(pt.key === null ? st : pt.key), y = u(pt, y, st), St === null ? J = pt : St.sibling = pt, St = pt);
      return t && Z.forEach(function(B0) {
        return l(v, B0);
      }), gt && de(v, st), J;
    }
    function jt(v, y, S, x) {
      if (typeof S == "object" && S !== null && S.type === ut && S.key === null && (S = S.props.children), typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case I:
            t: {
              for (var J = S.key; y !== null; ) {
                if (y.key === J) {
                  if (J = S.type, J === ut) {
                    if (y.tag === 7) {
                      e(
                        v,
                        y.sibling
                      ), x = n(
                        y,
                        S.props.children
                      ), x.return = v, v = x;
                      break t;
                    }
                  } else if (y.elementType === J || typeof J == "object" && J !== null && J.$$typeof === kt && ga(J) === y.type) {
                    e(
                      v,
                      y.sibling
                    ), x = n(y, S.props), Un(x, S), x.return = v, v = x;
                    break t;
                  }
                  e(v, y);
                  break;
                } else l(v, y);
                y = y.sibling;
              }
              S.type === ut ? (x = da(
                S.props.children,
                v.mode,
                x,
                S.key
              ), x.return = v, v = x) : (x = Du(
                S.type,
                S.key,
                S.props,
                null,
                v.mode,
                x
              ), Un(x, S), x.return = v, v = x);
            }
            return c(v);
          case dt:
            t: {
              for (J = S.key; y !== null; ) {
                if (y.key === J)
                  if (y.tag === 4 && y.stateNode.containerInfo === S.containerInfo && y.stateNode.implementation === S.implementation) {
                    e(
                      v,
                      y.sibling
                    ), x = n(y, S.children || []), x.return = v, v = x;
                    break t;
                  } else {
                    e(v, y);
                    break;
                  }
                else l(v, y);
                y = y.sibling;
              }
              x = mi(S, v.mode, x), x.return = v, v = x;
            }
            return c(v);
          case kt:
            return S = ga(S), jt(
              v,
              y,
              S,
              x
            );
        }
        if (Wt(S))
          return w(
            v,
            y,
            S,
            x
          );
        if (Qt(S)) {
          if (J = Qt(S), typeof J != "function") throw Error(r(150));
          return S = J.call(S), P(
            v,
            y,
            S,
            x
          );
        }
        if (typeof S.then == "function")
          return jt(
            v,
            y,
            Xu(S),
            x
          );
        if (S.$$typeof === _t)
          return jt(
            v,
            y,
            Hu(v, S),
            x
          );
        Gu(v, S);
      }
      return typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint" ? (S = "" + S, y !== null && y.tag === 6 ? (e(v, y.sibling), x = n(y, S), x.return = v, v = x) : (e(v, y), x = di(S, v.mode, x), x.return = v, v = x), c(v)) : e(v, y);
    }
    return function(v, y, S, x) {
      try {
        Dn = 0;
        var J = jt(
          v,
          y,
          S,
          x
        );
        return $a = null, J;
      } catch (Z) {
        if (Z === Ja || Z === qu) throw Z;
        var St = Cl(29, Z, null, v.mode);
        return St.lanes = x, St.return = v, St;
      } finally {
      }
    };
  }
  var Sa = br(!0), Sr = br(!1), Xe = !1;
  function Ti(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function zi(t, l) {
    t = t.updateQueue, l.updateQueue === t && (l.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Ge(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Qe(t, l, e) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (At & 2) !== 0) {
      var n = a.pending;
      return n === null ? l.next = l : (l.next = n.next, n.next = l), a.pending = l, l = ju(t), er(t, null, e), l;
    }
    return Ou(t, a, l, e), ju(t);
  }
  function Ln(t, l, e) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, N(t, e);
    }
  }
  function xi(t, l) {
    var e = t.updateQueue, a = t.alternate;
    if (a !== null && (a = a.updateQueue, e === a)) {
      var n = null, u = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var c = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null
          };
          u === null ? n = u = c : u = u.next = c, e = e.next;
        } while (e !== null);
        u === null ? n = u = l : u = u.next = l;
      } else n = u = l;
      e = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks
      }, t.updateQueue = e;
      return;
    }
    t = e.lastBaseUpdate, t === null ? e.firstBaseUpdate = l : t.next = l, e.lastBaseUpdate = l;
  }
  var Ci = !1;
  function Hn() {
    if (Ci) {
      var t = ka;
      if (t !== null) throw t;
    }
  }
  function Bn(t, l, e, a) {
    Ci = !1;
    var n = t.updateQueue;
    Xe = !1;
    var u = n.firstBaseUpdate, c = n.lastBaseUpdate, i = n.shared.pending;
    if (i !== null) {
      n.shared.pending = null;
      var o = i, p = o.next;
      o.next = null, c === null ? u = p : c.next = p, c = o;
      var T = t.alternate;
      T !== null && (T = T.updateQueue, i = T.lastBaseUpdate, i !== c && (i === null ? T.firstBaseUpdate = p : i.next = p, T.lastBaseUpdate = o));
    }
    if (u !== null) {
      var M = n.baseState;
      c = 0, T = p = o = null, i = u;
      do {
        var E = i.lane & -536870913, A = E !== i.lane;
        if (A ? (yt & E) === E : (a & E) === E) {
          E !== 0 && E === Ka && (Ci = !0), T !== null && (T = T.next = {
            lane: 0,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          });
          t: {
            var w = t, P = i;
            E = l;
            var jt = e;
            switch (P.tag) {
              case 1:
                if (w = P.payload, typeof w == "function") {
                  M = w.call(jt, M, E);
                  break t;
                }
                M = w;
                break t;
              case 3:
                w.flags = w.flags & -65537 | 128;
              case 0:
                if (w = P.payload, E = typeof w == "function" ? w.call(jt, M, E) : w, E == null) break t;
                M = R({}, M, E);
                break t;
              case 2:
                Xe = !0;
            }
          }
          E = i.callback, E !== null && (t.flags |= 64, A && (t.flags |= 8192), A = n.callbacks, A === null ? n.callbacks = [E] : A.push(E));
        } else
          A = {
            lane: E,
            tag: i.tag,
            payload: i.payload,
            callback: i.callback,
            next: null
          }, T === null ? (p = T = A, o = M) : T = T.next = A, c |= E;
        if (i = i.next, i === null) {
          if (i = n.shared.pending, i === null)
            break;
          A = i, i = A.next, A.next = null, n.lastBaseUpdate = A, n.shared.pending = null;
        }
      } while (!0);
      T === null && (o = M), n.baseState = o, n.firstBaseUpdate = p, n.lastBaseUpdate = T, u === null && (n.shared.lanes = 0), ke |= c, t.lanes = c, t.memoizedState = M;
    }
  }
  function pr(t, l) {
    if (typeof t != "function")
      throw Error(r(191, t));
    t.call(l);
  }
  function Er(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        pr(e[t], l);
  }
  var Wa = d(null), Qu = d(0);
  function Nr(t, l) {
    t = Ae, U(Qu, t), U(Wa, l), Ae = t | l.baseLanes;
  }
  function Mi() {
    U(Qu, Ae), U(Wa, Wa.current);
  }
  function Ri() {
    Ae = Qu.current, b(Wa), b(Qu);
  }
  var Ml = d(null), Ql = null;
  function we(t) {
    var l = t.alternate;
    U(Jt, Jt.current & 1), U(Ml, t), Ql === null && (l === null || Wa.current !== null || l.memoizedState !== null) && (Ql = t);
  }
  function Oi(t) {
    U(Jt, Jt.current), U(Ml, t), Ql === null && (Ql = t);
  }
  function Ar(t) {
    t.tag === 22 ? (U(Jt, Jt.current), U(Ml, t), Ql === null && (Ql = t)) : Ve();
  }
  function Ve() {
    U(Jt, Jt.current), U(Ml, Ml.current);
  }
  function Rl(t) {
    b(Ml), Ql === t && (Ql = null), b(Jt);
  }
  var Jt = d(0);
  function wu(t) {
    for (var l = t; l !== null; ) {
      if (l.tag === 13) {
        var e = l.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || qf(e) || Yf(e)))
          return l;
      } else if (l.tag === 19 && (l.memoizedProps.revealOrder === "forwards" || l.memoizedProps.revealOrder === "backwards" || l.memoizedProps.revealOrder === "unstable_legacy-backwards" || l.memoizedProps.revealOrder === "together")) {
        if ((l.flags & 128) !== 0) return l;
      } else if (l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === t) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === t) return null;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
    return null;
  }
  var ye = 0, ft = null, Rt = null, Pt = null, Vu = !1, Fa = !1, pa = !1, Zu = 0, qn = 0, Ia = null, xh = 0;
  function Zt() {
    throw Error(r(321));
  }
  function ji(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!xl(t[e], l[e])) return !1;
    return !0;
  }
  function Di(t, l, e, a, n, u) {
    return ye = u, ft = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, _.H = t === null || t.memoizedState === null ? co : Ji, pa = !1, u = e(a, n), pa = !1, Fa && (u = Tr(
      l,
      e,
      a,
      n
    )), _r(t), u;
  }
  function _r(t) {
    _.H = Gn;
    var l = Rt !== null && Rt.next !== null;
    if (ye = 0, Pt = Rt = ft = null, Vu = !1, qn = 0, Ia = null, l) throw Error(r(300));
    t === null || tl || (t = t.dependencies, t !== null && Lu(t) && (tl = !0));
  }
  function Tr(t, l, e, a) {
    ft = t;
    var n = 0;
    do {
      if (Fa && (Ia = null), qn = 0, Fa = !1, 25 <= n) throw Error(r(301));
      if (n += 1, Pt = Rt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      _.H = io, u = l(e, a);
    } while (Fa);
    return u;
  }
  function Ch() {
    var t = _.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? Yn(l) : l, t = t.useState()[0], (Rt !== null ? Rt.memoizedState : null) !== t && (ft.flags |= 1024), l;
  }
  function Ui() {
    var t = Zu !== 0;
    return Zu = 0, t;
  }
  function Li(t, l, e) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
  }
  function Hi(t) {
    if (Vu) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      Vu = !1;
    }
    ye = 0, Pt = Rt = ft = null, Fa = !1, qn = Zu = 0, Ia = null;
  }
  function vl() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Pt === null ? ft.memoizedState = Pt = t : Pt = Pt.next = t, Pt;
  }
  function $t() {
    if (Rt === null) {
      var t = ft.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Rt.next;
    var l = Pt === null ? ft.memoizedState : Pt.next;
    if (l !== null)
      Pt = l, Rt = t;
    else {
      if (t === null)
        throw ft.alternate === null ? Error(r(467)) : Error(r(310));
      Rt = t, t = {
        memoizedState: Rt.memoizedState,
        baseState: Rt.baseState,
        baseQueue: Rt.baseQueue,
        queue: Rt.queue,
        next: null
      }, Pt === null ? ft.memoizedState = Pt = t : Pt = Pt.next = t;
    }
    return Pt;
  }
  function Ku() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Yn(t) {
    var l = qn;
    return qn += 1, Ia === null && (Ia = []), t = yr(Ia, t, l), l = ft, (Pt === null ? l.memoizedState : Pt.next) === null && (l = l.alternate, _.H = l === null || l.memoizedState === null ? co : Ji), t;
  }
  function ku(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Yn(t);
      if (t.$$typeof === _t) return rl(t);
    }
    throw Error(r(438, String(t)));
  }
  function Bi(t) {
    var l = null, e = ft.updateQueue;
    if (e !== null && (l = e.memoCache), l == null) {
      var a = ft.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (l = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = Ku(), ft.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), a = 0; a < t; a++)
        e[a] = gl;
    return l.index++, e;
  }
  function ve(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function Ju(t) {
    var l = $t();
    return qi(l, Rt, t);
  }
  function qi(t, l, e) {
    var a = t.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = e;
    var n = t.baseQueue, u = a.pending;
    if (u !== null) {
      if (n !== null) {
        var c = n.next;
        n.next = u.next, u.next = c;
      }
      l.baseQueue = n = u, a.pending = null;
    }
    if (u = t.baseState, n === null) t.memoizedState = u;
    else {
      l = n.next;
      var i = c = null, o = null, p = l, T = !1;
      do {
        var M = p.lane & -536870913;
        if (M !== p.lane ? (yt & M) === M : (ye & M) === M) {
          var E = p.revertLane;
          if (E === 0)
            o !== null && (o = o.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: p.action,
              hasEagerState: p.hasEagerState,
              eagerState: p.eagerState,
              next: null
            }), M === Ka && (T = !0);
          else if ((ye & E) === E) {
            p = p.next, E === Ka && (T = !0);
            continue;
          } else
            M = {
              lane: 0,
              revertLane: p.revertLane,
              gesture: null,
              action: p.action,
              hasEagerState: p.hasEagerState,
              eagerState: p.eagerState,
              next: null
            }, o === null ? (i = o = M, c = u) : o = o.next = M, ft.lanes |= E, ke |= E;
          M = p.action, pa && e(u, M), u = p.hasEagerState ? p.eagerState : e(u, M);
        } else
          E = {
            lane: M,
            revertLane: p.revertLane,
            gesture: p.gesture,
            action: p.action,
            hasEagerState: p.hasEagerState,
            eagerState: p.eagerState,
            next: null
          }, o === null ? (i = o = E, c = u) : o = o.next = E, ft.lanes |= M, ke |= M;
        p = p.next;
      } while (p !== null && p !== l);
      if (o === null ? c = u : o.next = i, !xl(u, t.memoizedState) && (tl = !0, T && (e = ka, e !== null)))
        throw e;
      t.memoizedState = u, t.baseState = c, t.baseQueue = o, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function Yi(t) {
    var l = $t(), e = l.queue;
    if (e === null) throw Error(r(311));
    e.lastRenderedReducer = t;
    var a = e.dispatch, n = e.pending, u = l.memoizedState;
    if (n !== null) {
      e.pending = null;
      var c = n = n.next;
      do
        u = t(u, c.action), c = c.next;
      while (c !== n);
      xl(u, l.memoizedState) || (tl = !0), l.memoizedState = u, l.baseQueue === null && (l.baseState = u), e.lastRenderedState = u;
    }
    return [u, a];
  }
  function zr(t, l, e) {
    var a = ft, n = $t(), u = gt;
    if (u) {
      if (e === void 0) throw Error(r(407));
      e = e();
    } else e = l();
    var c = !xl(
      (Rt || n).memoizedState,
      e
    );
    if (c && (n.memoizedState = e, tl = !0), n = n.queue, Qi(Mr.bind(null, a, n, t), [
      t
    ]), n.getSnapshot !== l || c || Pt !== null && Pt.memoizedState.tag & 1) {
      if (a.flags |= 2048, Pa(
        9,
        { destroy: void 0 },
        Cr.bind(
          null,
          a,
          n,
          e,
          l
        ),
        null
      ), Ut === null) throw Error(r(349));
      u || (ye & 127) !== 0 || xr(a, l, e);
    }
    return e;
  }
  function xr(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = ft.updateQueue, l === null ? (l = Ku(), ft.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function Cr(t, l, e, a) {
    l.value = e, l.getSnapshot = a, Rr(l) && Or(t);
  }
  function Mr(t, l, e) {
    return e(function() {
      Rr(l) && Or(t);
    });
  }
  function Rr(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !xl(t, e);
    } catch {
      return !0;
    }
  }
  function Or(t) {
    var l = oa(t, 2);
    l !== null && Al(l, t, 2);
  }
  function Xi(t) {
    var l = vl();
    if (typeof t == "function") {
      var e = t;
      if (t = e(), pa) {
        Tl(!0);
        try {
          e();
        } finally {
          Tl(!1);
        }
      }
    }
    return l.memoizedState = l.baseState = t, l.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ve,
      lastRenderedState: t
    }, l;
  }
  function jr(t, l, e, a) {
    return t.baseState = e, qi(
      t,
      Rt,
      typeof a == "function" ? a : ve
    );
  }
  function Mh(t, l, e, a, n) {
    if (Fu(t)) throw Error(r(485));
    if (t = l.action, t !== null) {
      var u = {
        payload: n,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(c) {
          u.listeners.push(c);
        }
      };
      _.T !== null ? e(!0) : u.isTransition = !1, a(u), e = l.pending, e === null ? (u.next = l.pending = u, Dr(l, u)) : (u.next = e.next, l.pending = e.next = u);
    }
  }
  function Dr(t, l) {
    var e = l.action, a = l.payload, n = t.state;
    if (l.isTransition) {
      var u = _.T, c = {};
      _.T = c;
      try {
        var i = e(n, a), o = _.S;
        o !== null && o(c, i), Ur(t, l, i);
      } catch (p) {
        Gi(t, l, p);
      } finally {
        u !== null && c.types !== null && (u.types = c.types), _.T = u;
      }
    } else
      try {
        u = e(n, a), Ur(t, l, u);
      } catch (p) {
        Gi(t, l, p);
      }
  }
  function Ur(t, l, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        Lr(t, l, a);
      },
      function(a) {
        return Gi(t, l, a);
      }
    ) : Lr(t, l, e);
  }
  function Lr(t, l, e) {
    l.status = "fulfilled", l.value = e, Hr(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, Dr(t, e)));
  }
  function Gi(t, l, e) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        l.status = "rejected", l.reason = e, Hr(l), l = l.next;
      while (l !== a);
    }
    t.action = null;
  }
  function Hr(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function Br(t, l) {
    return l;
  }
  function qr(t, l) {
    if (gt) {
      var e = Ut.formState;
      if (e !== null) {
        t: {
          var a = ft;
          if (gt) {
            if (Bt) {
              l: {
                for (var n = Bt, u = Gl; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break l;
                  }
                  if (n = wl(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break l;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                Bt = wl(
                  n.nextSibling
                ), a = n.data === "F!";
                break t;
              }
            }
            qe(a);
          }
          a = !1;
        }
        a && (l = e[0]);
      }
    }
    return e = vl(), e.memoizedState = e.baseState = l, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Br,
      lastRenderedState: l
    }, e.queue = a, e = ao.bind(
      null,
      ft,
      a
    ), a.dispatch = e, a = Xi(!1), u = ki.bind(
      null,
      ft,
      !1,
      a.queue
    ), a = vl(), n = {
      state: l,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = n, e = Mh.bind(
      null,
      ft,
      n,
      u,
      e
    ), n.dispatch = e, a.memoizedState = t, [l, e, !1];
  }
  function Yr(t) {
    var l = $t();
    return Xr(l, Rt, t);
  }
  function Xr(t, l, e) {
    if (l = qi(
      t,
      l,
      Br
    )[0], t = Ju(ve)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var a = Yn(l);
      } catch (c) {
        throw c === Ja ? qu : c;
      }
    else a = l;
    l = $t();
    var n = l.queue, u = n.dispatch;
    return e !== l.memoizedState && (ft.flags |= 2048, Pa(
      9,
      { destroy: void 0 },
      Rh.bind(null, n, e),
      null
    )), [a, u, t];
  }
  function Rh(t, l) {
    t.action = l;
  }
  function Gr(t) {
    var l = $t(), e = Rt;
    if (e !== null)
      return Xr(l, e, t);
    $t(), l = l.memoizedState, e = $t();
    var a = e.queue.dispatch;
    return e.memoizedState = t, [l, a, !1];
  }
  function Pa(t, l, e, a) {
    return t = { tag: t, create: e, deps: a, inst: l, next: null }, l = ft.updateQueue, l === null && (l = Ku(), ft.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (a = e.next, e.next = t, t.next = a, l.lastEffect = t), t;
  }
  function Qr() {
    return $t().memoizedState;
  }
  function $u(t, l, e, a) {
    var n = vl();
    ft.flags |= t, n.memoizedState = Pa(
      1 | l,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function Wu(t, l, e, a) {
    var n = $t();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    Rt !== null && a !== null && ji(a, Rt.memoizedState.deps) ? n.memoizedState = Pa(l, u, e, a) : (ft.flags |= t, n.memoizedState = Pa(
      1 | l,
      u,
      e,
      a
    ));
  }
  function wr(t, l) {
    $u(8390656, 8, t, l);
  }
  function Qi(t, l) {
    Wu(2048, 8, t, l);
  }
  function Oh(t) {
    ft.flags |= 4;
    var l = ft.updateQueue;
    if (l === null)
      l = Ku(), ft.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function Vr(t) {
    var l = $t().memoizedState;
    return Oh({ ref: l, nextImpl: t }), function() {
      if ((At & 2) !== 0) throw Error(r(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function Zr(t, l) {
    return Wu(4, 2, t, l);
  }
  function Kr(t, l) {
    return Wu(4, 4, t, l);
  }
  function kr(t, l) {
    if (typeof l == "function") {
      t = t();
      var e = l(t);
      return function() {
        typeof e == "function" ? e() : l(null);
      };
    }
    if (l != null)
      return t = t(), l.current = t, function() {
        l.current = null;
      };
  }
  function Jr(t, l, e) {
    e = e != null ? e.concat([t]) : null, Wu(4, 4, kr.bind(null, l, t), e);
  }
  function wi() {
  }
  function $r(t, l) {
    var e = $t();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    return l !== null && ji(l, a[1]) ? a[0] : (e.memoizedState = [t, l], t);
  }
  function Wr(t, l) {
    var e = $t();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    if (l !== null && ji(l, a[1]))
      return a[0];
    if (a = t(), pa) {
      Tl(!0);
      try {
        t();
      } finally {
        Tl(!1);
      }
    }
    return e.memoizedState = [a, l], a;
  }
  function Vi(t, l, e) {
    return e === void 0 || (ye & 1073741824) !== 0 && (yt & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = Io(), ft.lanes |= t, ke |= t, e);
  }
  function Fr(t, l, e, a) {
    return xl(e, l) ? e : Wa.current !== null ? (t = Vi(t, e, a), xl(t, l) || (tl = !0), t) : (ye & 42) === 0 || (ye & 1073741824) !== 0 && (yt & 261930) === 0 ? (tl = !0, t.memoizedState = e) : (t = Io(), ft.lanes |= t, ke |= t, l);
  }
  function Ir(t, l, e, a, n) {
    var u = q.p;
    q.p = u !== 0 && 8 > u ? u : 8;
    var c = _.T, i = {};
    _.T = i, ki(t, !1, l, e);
    try {
      var o = n(), p = _.S;
      if (p !== null && p(i, o), o !== null && typeof o == "object" && typeof o.then == "function") {
        var T = zh(
          o,
          a
        );
        Xn(
          t,
          l,
          T,
          Dl(t)
        );
      } else
        Xn(
          t,
          l,
          a,
          Dl(t)
        );
    } catch (M) {
      Xn(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: M },
        Dl()
      );
    } finally {
      q.p = u, c !== null && i.types !== null && (c.types = i.types), _.T = c;
    }
  }
  function jh() {
  }
  function Zi(t, l, e, a) {
    if (t.tag !== 5) throw Error(r(476));
    var n = Pr(t).queue;
    Ir(
      t,
      n,
      l,
      $,
      e === null ? jh : function() {
        return to(t), e(a);
      }
    );
  }
  function Pr(t) {
    var l = t.memoizedState;
    if (l !== null) return l;
    l = {
      memoizedState: $,
      baseState: $,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ve,
        lastRenderedState: $
      },
      next: null
    };
    var e = {};
    return l.next = {
      memoizedState: e,
      baseState: e,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ve,
        lastRenderedState: e
      },
      next: null
    }, t.memoizedState = l, t = t.alternate, t !== null && (t.memoizedState = l), l;
  }
  function to(t) {
    var l = Pr(t);
    l.next === null && (l = t.alternate.memoizedState), Xn(
      t,
      l.next.queue,
      {},
      Dl()
    );
  }
  function Ki() {
    return rl(au);
  }
  function lo() {
    return $t().memoizedState;
  }
  function eo() {
    return $t().memoizedState;
  }
  function Dh(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = Dl();
          t = Ge(e);
          var a = Qe(l, t, e);
          a !== null && (Al(a, l, e), Ln(a, l, e)), l = { cache: Ei() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function Uh(t, l, e) {
    var a = Dl();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Fu(t) ? no(l, e) : (e = ri(t, l, e, a), e !== null && (Al(e, t, a), uo(e, l, a)));
  }
  function ao(t, l, e) {
    var a = Dl();
    Xn(t, l, e, a);
  }
  function Xn(t, l, e, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Fu(t)) no(l, n);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = l.lastRenderedReducer, u !== null))
        try {
          var c = l.lastRenderedState, i = u(c, e);
          if (n.hasEagerState = !0, n.eagerState = i, xl(i, c))
            return Ou(t, l, n, 0), Ut === null && Ru(), !1;
        } catch {
        } finally {
        }
      if (e = ri(t, l, n, a), e !== null)
        return Al(e, t, a), uo(e, l, a), !0;
    }
    return !1;
  }
  function ki(t, l, e, a) {
    if (a = {
      lane: 2,
      revertLane: zf(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Fu(t)) {
      if (l) throw Error(r(479));
    } else
      l = ri(
        t,
        e,
        a,
        2
      ), l !== null && Al(l, t, 2);
  }
  function Fu(t) {
    var l = t.alternate;
    return t === ft || l !== null && l === ft;
  }
  function no(t, l) {
    Fa = Vu = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function uo(t, l, e) {
    if ((e & 4194048) !== 0) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, N(t, e);
    }
  }
  var Gn = {
    readContext: rl,
    use: ku,
    useCallback: Zt,
    useContext: Zt,
    useEffect: Zt,
    useImperativeHandle: Zt,
    useLayoutEffect: Zt,
    useInsertionEffect: Zt,
    useMemo: Zt,
    useReducer: Zt,
    useRef: Zt,
    useState: Zt,
    useDebugValue: Zt,
    useDeferredValue: Zt,
    useTransition: Zt,
    useSyncExternalStore: Zt,
    useId: Zt,
    useHostTransitionStatus: Zt,
    useFormState: Zt,
    useActionState: Zt,
    useOptimistic: Zt,
    useMemoCache: Zt,
    useCacheRefresh: Zt
  };
  Gn.useEffectEvent = Zt;
  var co = {
    readContext: rl,
    use: ku,
    useCallback: function(t, l) {
      return vl().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: rl,
    useEffect: wr,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, $u(
        4194308,
        4,
        kr.bind(null, l, t),
        e
      );
    },
    useLayoutEffect: function(t, l) {
      return $u(4194308, 4, t, l);
    },
    useInsertionEffect: function(t, l) {
      $u(4, 2, t, l);
    },
    useMemo: function(t, l) {
      var e = vl();
      l = l === void 0 ? null : l;
      var a = t();
      if (pa) {
        Tl(!0);
        try {
          t();
        } finally {
          Tl(!1);
        }
      }
      return e.memoizedState = [a, l], a;
    },
    useReducer: function(t, l, e) {
      var a = vl();
      if (e !== void 0) {
        var n = e(l);
        if (pa) {
          Tl(!0);
          try {
            e(l);
          } finally {
            Tl(!1);
          }
        }
      } else n = l;
      return a.memoizedState = a.baseState = n, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: n
      }, a.queue = t, t = t.dispatch = Uh.bind(
        null,
        ft,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var l = vl();
      return t = { current: t }, l.memoizedState = t;
    },
    useState: function(t) {
      t = Xi(t);
      var l = t.queue, e = ao.bind(null, ft, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: wi,
    useDeferredValue: function(t, l) {
      var e = vl();
      return Vi(e, t, l);
    },
    useTransition: function() {
      var t = Xi(!1);
      return t = Ir.bind(
        null,
        ft,
        t.queue,
        !0,
        !1
      ), vl().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, l, e) {
      var a = ft, n = vl();
      if (gt) {
        if (e === void 0)
          throw Error(r(407));
        e = e();
      } else {
        if (e = l(), Ut === null)
          throw Error(r(349));
        (yt & 127) !== 0 || xr(a, l, e);
      }
      n.memoizedState = e;
      var u = { value: e, getSnapshot: l };
      return n.queue = u, wr(Mr.bind(null, a, u, t), [
        t
      ]), a.flags |= 2048, Pa(
        9,
        { destroy: void 0 },
        Cr.bind(
          null,
          a,
          u,
          e,
          l
        ),
        null
      ), e;
    },
    useId: function() {
      var t = vl(), l = Ut.identifierPrefix;
      if (gt) {
        var e = te, a = Pl;
        e = (a & ~(1 << 32 - nl(a) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = Zu++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = xh++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: Ki,
    useFormState: qr,
    useActionState: qr,
    useOptimistic: function(t) {
      var l = vl();
      l.memoizedState = l.baseState = t;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return l.queue = e, l = ki.bind(
        null,
        ft,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: Bi,
    useCacheRefresh: function() {
      return vl().memoizedState = Dh.bind(
        null,
        ft
      );
    },
    useEffectEvent: function(t) {
      var l = vl(), e = { impl: t };
      return l.memoizedState = e, function() {
        if ((At & 2) !== 0)
          throw Error(r(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, Ji = {
    readContext: rl,
    use: ku,
    useCallback: $r,
    useContext: rl,
    useEffect: Qi,
    useImperativeHandle: Jr,
    useInsertionEffect: Zr,
    useLayoutEffect: Kr,
    useMemo: Wr,
    useReducer: Ju,
    useRef: Qr,
    useState: function() {
      return Ju(ve);
    },
    useDebugValue: wi,
    useDeferredValue: function(t, l) {
      var e = $t();
      return Fr(
        e,
        Rt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = Ju(ve)[0], l = $t().memoizedState;
      return [
        typeof t == "boolean" ? t : Yn(t),
        l
      ];
    },
    useSyncExternalStore: zr,
    useId: lo,
    useHostTransitionStatus: Ki,
    useFormState: Yr,
    useActionState: Yr,
    useOptimistic: function(t, l) {
      var e = $t();
      return jr(e, Rt, t, l);
    },
    useMemoCache: Bi,
    useCacheRefresh: eo
  };
  Ji.useEffectEvent = Vr;
  var io = {
    readContext: rl,
    use: ku,
    useCallback: $r,
    useContext: rl,
    useEffect: Qi,
    useImperativeHandle: Jr,
    useInsertionEffect: Zr,
    useLayoutEffect: Kr,
    useMemo: Wr,
    useReducer: Yi,
    useRef: Qr,
    useState: function() {
      return Yi(ve);
    },
    useDebugValue: wi,
    useDeferredValue: function(t, l) {
      var e = $t();
      return Rt === null ? Vi(e, t, l) : Fr(
        e,
        Rt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = Yi(ve)[0], l = $t().memoizedState;
      return [
        typeof t == "boolean" ? t : Yn(t),
        l
      ];
    },
    useSyncExternalStore: zr,
    useId: lo,
    useHostTransitionStatus: Ki,
    useFormState: Gr,
    useActionState: Gr,
    useOptimistic: function(t, l) {
      var e = $t();
      return Rt !== null ? jr(e, Rt, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: Bi,
    useCacheRefresh: eo
  };
  io.useEffectEvent = Vr;
  function $i(t, l, e, a) {
    l = t.memoizedState, e = e(a, l), e = e == null ? l : R({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var Wi = {
    enqueueSetState: function(t, l, e) {
      t = t._reactInternals;
      var a = Dl(), n = Ge(a);
      n.payload = l, e != null && (n.callback = e), l = Qe(t, n, a), l !== null && (Al(l, t, a), Ln(l, t, a));
    },
    enqueueReplaceState: function(t, l, e) {
      t = t._reactInternals;
      var a = Dl(), n = Ge(a);
      n.tag = 1, n.payload = l, e != null && (n.callback = e), l = Qe(t, n, a), l !== null && (Al(l, t, a), Ln(l, t, a));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var e = Dl(), a = Ge(e);
      a.tag = 2, l != null && (a.callback = l), l = Qe(t, a, e), l !== null && (Al(l, t, e), Ln(l, t, e));
    }
  };
  function fo(t, l, e, a, n, u, c) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, c) : l.prototype && l.prototype.isPureReactComponent ? !xn(e, a) || !xn(n, u) : !0;
  }
  function so(t, l, e, a) {
    t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, a), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, a), l.state !== t && Wi.enqueueReplaceState(l, l.state, null);
  }
  function Ea(t, l) {
    var e = l;
    if ("ref" in l) {
      e = {};
      for (var a in l)
        a !== "ref" && (e[a] = l[a]);
    }
    if (t = t.defaultProps) {
      e === l && (e = R({}, e));
      for (var n in t)
        e[n] === void 0 && (e[n] = t[n]);
    }
    return e;
  }
  function ro(t) {
    Mu(t);
  }
  function oo(t) {
    console.error(t);
  }
  function mo(t) {
    Mu(t);
  }
  function Iu(t, l) {
    try {
      var e = t.onUncaughtError;
      e(l.value, { componentStack: l.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function ho(t, l, e) {
    try {
      var a = t.onCaughtError;
      a(e.value, {
        componentStack: e.stack,
        errorBoundary: l.tag === 1 ? l.stateNode : null
      });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function Fi(t, l, e) {
    return e = Ge(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      Iu(t, l);
    }, e;
  }
  function yo(t) {
    return t = Ge(t), t.tag = 3, t;
  }
  function vo(t, l, e, a) {
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      t.payload = function() {
        return n(u);
      }, t.callback = function() {
        ho(l, e, a);
      };
    }
    var c = e.stateNode;
    c !== null && typeof c.componentDidCatch == "function" && (t.callback = function() {
      ho(l, e, a), typeof n != "function" && (Je === null ? Je = /* @__PURE__ */ new Set([this]) : Je.add(this));
      var i = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: i !== null ? i : ""
      });
    });
  }
  function Lh(t, l, e, a, n) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (l = e.alternate, l !== null && Za(
        l,
        e,
        n,
        !0
      ), e = Ml.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return Ql === null ? rc() : e.alternate === null && Kt === 0 && (Kt = 3), e.flags &= -257, e.flags |= 65536, e.lanes = n, a === Yu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : l.add(a), Af(t, a, n)), !1;
          case 22:
            return e.flags |= 65536, a === Yu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), Af(t, a, n)), !1;
        }
        throw Error(r(435, e.tag));
      }
      return Af(t, a, n), rc(), !1;
    }
    if (gt)
      return l = Ml.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = n, a !== vi && (t = Error(r(422), { cause: a }), Rn(ql(t, e)))) : (a !== vi && (l = Error(r(423), {
        cause: a
      }), Rn(
        ql(l, e)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = ql(a, e), n = Fi(
        t.stateNode,
        a,
        n
      ), xi(t, n), Kt !== 4 && (Kt = 2)), !1;
    var u = Error(r(520), { cause: a });
    if (u = ql(u, e), $n === null ? $n = [u] : $n.push(u), Kt !== 4 && (Kt = 2), l === null) return !0;
    a = ql(a, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = n & -n, e.lanes |= t, t = Fi(e.stateNode, a, t), xi(e, t), !1;
        case 1:
          if (l = e.type, u = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (Je === null || !Je.has(u))))
            return e.flags |= 65536, n &= -n, e.lanes |= n, n = yo(n), vo(
              n,
              t,
              e,
              a
            ), xi(e, n), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var Ii = Error(r(461)), tl = !1;
  function ol(t, l, e, a) {
    l.child = t === null ? Sr(l, null, e, a) : Sa(
      l,
      t.child,
      e,
      a
    );
  }
  function go(t, l, e, a, n) {
    e = e.render;
    var u = l.ref;
    if ("ref" in a) {
      var c = {};
      for (var i in a)
        i !== "ref" && (c[i] = a[i]);
    } else c = a;
    return ya(l), a = Di(
      t,
      l,
      e,
      c,
      u,
      n
    ), i = Ui(), t !== null && !tl ? (Li(t, l, n), ge(t, l, n)) : (gt && i && hi(l), l.flags |= 1, ol(t, l, a, n), l.child);
  }
  function bo(t, l, e, a, n) {
    if (t === null) {
      var u = e.type;
      return typeof u == "function" && !oi(u) && u.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = u, So(
        t,
        l,
        u,
        a,
        n
      )) : (t = Du(
        e.type,
        null,
        a,
        l,
        l.mode,
        n
      ), t.ref = l.ref, t.return = l, l.child = t);
    }
    if (u = t.child, !cf(t, n)) {
      var c = u.memoizedProps;
      if (e = e.compare, e = e !== null ? e : xn, e(c, a) && t.ref === l.ref)
        return ge(t, l, n);
    }
    return l.flags |= 1, t = oe(u, a), t.ref = l.ref, t.return = l, l.child = t;
  }
  function So(t, l, e, a, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (xn(u, a) && t.ref === l.ref)
        if (tl = !1, l.pendingProps = a = u, cf(t, n))
          (t.flags & 131072) !== 0 && (tl = !0);
        else
          return l.lanes = t.lanes, ge(t, l, n);
    }
    return Pi(
      t,
      l,
      e,
      a,
      n
    );
  }
  function po(t, l, e, a) {
    var n = a.children, u = t !== null ? t.memoizedState : null;
    if (t === null && l.stateNode === null && (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((l.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | e : e, t !== null) {
          for (a = l.child = t.child, n = 0; a !== null; )
            n = n | a.lanes | a.childLanes, a = a.sibling;
          a = n & ~u;
        } else a = 0, l.child = null;
        return Eo(
          t,
          l,
          u,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Bu(
          l,
          u !== null ? u.cachePool : null
        ), u !== null ? Nr(l, u) : Mi(), Ar(l);
      else
        return a = l.lanes = 536870912, Eo(
          t,
          l,
          u !== null ? u.baseLanes | e : e,
          e,
          a
        );
    } else
      u !== null ? (Bu(l, u.cachePool), Nr(l, u), Ve(), l.memoizedState = null) : (t !== null && Bu(l, null), Mi(), Ve());
    return ol(t, l, n, e), l.child;
  }
  function Qn(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function Eo(t, l, e, a, n) {
    var u = Ai();
    return u = u === null ? null : { parent: It._currentValue, pool: u }, l.memoizedState = {
      baseLanes: e,
      cachePool: u
    }, t !== null && Bu(l, null), Mi(), Ar(l), t !== null && Za(t, l, a, !0), l.childLanes = n, null;
  }
  function Pu(t, l) {
    return l = lc(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function No(t, l, e) {
    return Sa(l, t.child, null, e), t = Pu(l, l.pendingProps), t.flags |= 2, Rl(l), l.memoizedState = null, t;
  }
  function Hh(t, l, e) {
    var a = l.pendingProps, n = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (gt) {
        if (a.mode === "hidden")
          return t = Pu(l, a), l.lanes = 536870912, Qn(null, t);
        if (Oi(l), (t = Bt) ? (t = Ud(
          t,
          Gl
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: He !== null ? { id: Pl, overflow: te } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = nr(t), e.return = l, l.child = e, sl = l, Bt = null)) : t = null, t === null) throw qe(l);
        return l.lanes = 536870912, null;
      }
      return Pu(l, a);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var c = u.dehydrated;
      if (Oi(l), n)
        if (l.flags & 256)
          l.flags &= -257, l = No(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(r(558));
      else if (tl || Za(t, l, e, !1), n = (e & t.childLanes) !== 0, tl || n) {
        if (a = Ut, a !== null && (c = j(a, e), c !== 0 && c !== u.retryLane))
          throw u.retryLane = c, oa(t, c), Al(a, t, c), Ii;
        rc(), l = No(
          t,
          l,
          e
        );
      } else
        t = u.treeContext, Bt = wl(c.nextSibling), sl = l, gt = !0, Be = null, Gl = !1, t !== null && ir(l, t), l = Pu(l, a), l.flags |= 4096;
      return l;
    }
    return t = oe(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function tc(t, l) {
    var e = l.ref;
    if (e === null)
      t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(r(284));
      (t === null || t.ref !== e) && (l.flags |= 4194816);
    }
  }
  function Pi(t, l, e, a, n) {
    return ya(l), e = Di(
      t,
      l,
      e,
      a,
      void 0,
      n
    ), a = Ui(), t !== null && !tl ? (Li(t, l, n), ge(t, l, n)) : (gt && a && hi(l), l.flags |= 1, ol(t, l, e, n), l.child);
  }
  function Ao(t, l, e, a, n, u) {
    return ya(l), l.updateQueue = null, e = Tr(
      l,
      a,
      e,
      n
    ), _r(t), a = Ui(), t !== null && !tl ? (Li(t, l, u), ge(t, l, u)) : (gt && a && hi(l), l.flags |= 1, ol(t, l, e, u), l.child);
  }
  function _o(t, l, e, a, n) {
    if (ya(l), l.stateNode === null) {
      var u = Ga, c = e.contextType;
      typeof c == "object" && c !== null && (u = rl(c)), u = new e(a, u), l.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Wi, l.stateNode = u, u._reactInternals = l, u = l.stateNode, u.props = a, u.state = l.memoizedState, u.refs = {}, Ti(l), c = e.contextType, u.context = typeof c == "object" && c !== null ? rl(c) : Ga, u.state = l.memoizedState, c = e.getDerivedStateFromProps, typeof c == "function" && ($i(
        l,
        e,
        c,
        a
      ), u.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (c = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), c !== u.state && Wi.enqueueReplaceState(u, u.state, null), Bn(l, a, u, n), Hn(), u.state = l.memoizedState), typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = !0;
    } else if (t === null) {
      u = l.stateNode;
      var i = l.memoizedProps, o = Ea(e, i);
      u.props = o;
      var p = u.context, T = e.contextType;
      c = Ga, typeof T == "object" && T !== null && (c = rl(T));
      var M = e.getDerivedStateFromProps;
      T = typeof M == "function" || typeof u.getSnapshotBeforeUpdate == "function", i = l.pendingProps !== i, T || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i || p !== c) && so(
        l,
        u,
        a,
        c
      ), Xe = !1;
      var E = l.memoizedState;
      u.state = E, Bn(l, a, u, n), Hn(), p = l.memoizedState, i || E !== p || Xe ? (typeof M == "function" && ($i(
        l,
        e,
        M,
        a
      ), p = l.memoizedState), (o = Xe || fo(
        l,
        e,
        o,
        a,
        E,
        p,
        c
      )) ? (T || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = a, l.memoizedState = p), u.props = a, u.state = p, u.context = c, a = o) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = !1);
    } else {
      u = l.stateNode, zi(t, l), c = l.memoizedProps, T = Ea(e, c), u.props = T, M = l.pendingProps, E = u.context, p = e.contextType, o = Ga, typeof p == "object" && p !== null && (o = rl(p)), i = e.getDerivedStateFromProps, (p = typeof i == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (c !== M || E !== o) && so(
        l,
        u,
        a,
        o
      ), Xe = !1, E = l.memoizedState, u.state = E, Bn(l, a, u, n), Hn();
      var A = l.memoizedState;
      c !== M || E !== A || Xe || t !== null && t.dependencies !== null && Lu(t.dependencies) ? (typeof i == "function" && ($i(
        l,
        e,
        i,
        a
      ), A = l.memoizedState), (T = Xe || fo(
        l,
        e,
        T,
        a,
        E,
        A,
        o
      ) || t !== null && t.dependencies !== null && Lu(t.dependencies)) ? (p || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, A, o), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        A,
        o
      )), typeof u.componentDidUpdate == "function" && (l.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || c === t.memoizedProps && E === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && E === t.memoizedState || (l.flags |= 1024), l.memoizedProps = a, l.memoizedState = A), u.props = a, u.state = A, u.context = o, a = T) : (typeof u.componentDidUpdate != "function" || c === t.memoizedProps && E === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && E === t.memoizedState || (l.flags |= 1024), a = !1);
    }
    return u = a, tc(t, l), a = (l.flags & 128) !== 0, u || a ? (u = l.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : u.render(), l.flags |= 1, t !== null && a ? (l.child = Sa(
      l,
      t.child,
      null,
      n
    ), l.child = Sa(
      l,
      null,
      e,
      n
    )) : ol(t, l, e, n), l.memoizedState = u.state, t = l.child) : t = ge(
      t,
      l,
      n
    ), t;
  }
  function To(t, l, e, a) {
    return ma(), l.flags |= 256, ol(t, l, e, a), l.child;
  }
  var tf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function lf(t) {
    return { baseLanes: t, cachePool: mr() };
  }
  function ef(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= jl), t;
  }
  function zo(t, l, e) {
    var a = l.pendingProps, n = !1, u = (l.flags & 128) !== 0, c;
    if ((c = u) || (c = t !== null && t.memoizedState === null ? !1 : (Jt.current & 2) !== 0), c && (n = !0, l.flags &= -129), c = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (gt) {
        if (n ? we(l) : Ve(), (t = Bt) ? (t = Ud(
          t,
          Gl
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: He !== null ? { id: Pl, overflow: te } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = nr(t), e.return = l, l.child = e, sl = l, Bt = null)) : t = null, t === null) throw qe(l);
        return Yf(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      var i = a.children;
      return a = a.fallback, n ? (Ve(), n = l.mode, i = lc(
        { mode: "hidden", children: i },
        n
      ), a = da(
        a,
        n,
        e,
        null
      ), i.return = l, a.return = l, i.sibling = a, l.child = i, a = l.child, a.memoizedState = lf(e), a.childLanes = ef(
        t,
        c,
        e
      ), l.memoizedState = tf, Qn(null, a)) : (we(l), af(l, i));
    }
    var o = t.memoizedState;
    if (o !== null && (i = o.dehydrated, i !== null)) {
      if (u)
        l.flags & 256 ? (we(l), l.flags &= -257, l = nf(
          t,
          l,
          e
        )) : l.memoizedState !== null ? (Ve(), l.child = t.child, l.flags |= 128, l = null) : (Ve(), i = a.fallback, n = l.mode, a = lc(
          { mode: "visible", children: a.children },
          n
        ), i = da(
          i,
          n,
          e,
          null
        ), i.flags |= 2, a.return = l, i.return = l, a.sibling = i, l.child = a, Sa(
          l,
          t.child,
          null,
          e
        ), a = l.child, a.memoizedState = lf(e), a.childLanes = ef(
          t,
          c,
          e
        ), l.memoizedState = tf, l = Qn(null, a));
      else if (we(l), Yf(i)) {
        if (c = i.nextSibling && i.nextSibling.dataset, c) var p = c.dgst;
        c = p, a = Error(r(419)), a.stack = "", a.digest = c, Rn({ value: a, source: null, stack: null }), l = nf(
          t,
          l,
          e
        );
      } else if (tl || Za(t, l, e, !1), c = (e & t.childLanes) !== 0, tl || c) {
        if (c = Ut, c !== null && (a = j(c, e), a !== 0 && a !== o.retryLane))
          throw o.retryLane = a, oa(t, a), Al(c, t, a), Ii;
        qf(i) || rc(), l = nf(
          t,
          l,
          e
        );
      } else
        qf(i) ? (l.flags |= 192, l.child = t.child, l = null) : (t = o.treeContext, Bt = wl(
          i.nextSibling
        ), sl = l, gt = !0, Be = null, Gl = !1, t !== null && ir(l, t), l = af(
          l,
          a.children
        ), l.flags |= 4096);
      return l;
    }
    return n ? (Ve(), i = a.fallback, n = l.mode, o = t.child, p = o.sibling, a = oe(o, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = o.subtreeFlags & 65011712, p !== null ? i = oe(
      p,
      i
    ) : (i = da(
      i,
      n,
      e,
      null
    ), i.flags |= 2), i.return = l, a.return = l, a.sibling = i, l.child = a, Qn(null, a), a = l.child, i = t.child.memoizedState, i === null ? i = lf(e) : (n = i.cachePool, n !== null ? (o = It._currentValue, n = n.parent !== o ? { parent: o, pool: o } : n) : n = mr(), i = {
      baseLanes: i.baseLanes | e,
      cachePool: n
    }), a.memoizedState = i, a.childLanes = ef(
      t,
      c,
      e
    ), l.memoizedState = tf, Qn(t.child, a)) : (we(l), e = t.child, t = e.sibling, e = oe(e, {
      mode: "visible",
      children: a.children
    }), e.return = l, e.sibling = null, t !== null && (c = l.deletions, c === null ? (l.deletions = [t], l.flags |= 16) : c.push(t)), l.child = e, l.memoizedState = null, e);
  }
  function af(t, l) {
    return l = lc(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function lc(t, l) {
    return t = Cl(22, t, null, l), t.lanes = 0, t;
  }
  function nf(t, l, e) {
    return Sa(l, t.child, null, e), t = af(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function xo(t, l, e) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l), Si(t.return, l, e);
  }
  function uf(t, l, e, a, n, u) {
    var c = t.memoizedState;
    c === null ? t.memoizedState = {
      isBackwards: l,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: e,
      tailMode: n,
      treeForkCount: u
    } : (c.isBackwards = l, c.rendering = null, c.renderingStartTime = 0, c.last = a, c.tail = e, c.tailMode = n, c.treeForkCount = u);
  }
  function Co(t, l, e) {
    var a = l.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var c = Jt.current, i = (c & 2) !== 0;
    if (i ? (c = c & 1 | 2, l.flags |= 128) : c &= 1, U(Jt, c), ol(t, l, a, e), a = gt ? Mn : 0, !i && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && xo(t, e, l);
        else if (t.tag === 19)
          xo(t, e, l);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === l) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (n) {
      case "forwards":
        for (e = l.child, n = null; e !== null; )
          t = e.alternate, t !== null && wu(t) === null && (n = e), e = e.sibling;
        e = n, e === null ? (n = l.child, l.child = null) : (n = e.sibling, e.sibling = null), uf(
          l,
          !1,
          n,
          e,
          u,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, n = l.child, l.child = null; n !== null; ) {
          if (t = n.alternate, t !== null && wu(t) === null) {
            l.child = n;
            break;
          }
          t = n.sibling, n.sibling = e, e = n, n = t;
        }
        uf(
          l,
          !0,
          e,
          null,
          u,
          a
        );
        break;
      case "together":
        uf(
          l,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      default:
        l.memoizedState = null;
    }
    return l.child;
  }
  function ge(t, l, e) {
    if (t !== null && (l.dependencies = t.dependencies), ke |= l.lanes, (e & l.childLanes) === 0)
      if (t !== null) {
        if (Za(
          t,
          l,
          e,
          !1
        ), (e & l.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && l.child !== t.child)
      throw Error(r(153));
    if (l.child !== null) {
      for (t = l.child, e = oe(t, t.pendingProps), l.child = e, e.return = l; t.sibling !== null; )
        t = t.sibling, e = e.sibling = oe(t, t.pendingProps), e.return = l;
      e.sibling = null;
    }
    return l.child;
  }
  function cf(t, l) {
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Lu(t)));
  }
  function Bh(t, l, e) {
    switch (l.tag) {
      case 3:
        nt(l, l.stateNode.containerInfo), Ye(l, It, t.memoizedState.cache), ma();
        break;
      case 27:
      case 5:
        yl(l);
        break;
      case 4:
        nt(l, l.stateNode.containerInfo);
        break;
      case 10:
        Ye(
          l,
          l.type,
          l.memoizedProps.value
        );
        break;
      case 31:
        if (l.memoizedState !== null)
          return l.flags |= 128, Oi(l), null;
        break;
      case 13:
        var a = l.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (we(l), l.flags |= 128, null) : (e & l.child.childLanes) !== 0 ? zo(t, l, e) : (we(l), t = ge(
            t,
            l,
            e
          ), t !== null ? t.sibling : null);
        we(l);
        break;
      case 19:
        var n = (t.flags & 128) !== 0;
        if (a = (e & l.childLanes) !== 0, a || (Za(
          t,
          l,
          e,
          !1
        ), a = (e & l.childLanes) !== 0), n) {
          if (a)
            return Co(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (n = l.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), U(Jt, Jt.current), a) break;
        return null;
      case 22:
        return l.lanes = 0, po(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        Ye(l, It, t.memoizedState.cache);
    }
    return ge(t, l, e);
  }
  function Mo(t, l, e) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps)
        tl = !0;
      else {
        if (!cf(t, e) && (l.flags & 128) === 0)
          return tl = !1, Bh(
            t,
            l,
            e
          );
        tl = (t.flags & 131072) !== 0;
      }
    else
      tl = !1, gt && (l.flags & 1048576) !== 0 && cr(l, Mn, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var a = l.pendingProps;
          if (t = ga(l.elementType), l.type = t, typeof t == "function")
            oi(t) ? (a = Ea(t, a), l.tag = 1, l = _o(
              null,
              l,
              t,
              a,
              e
            )) : (l.tag = 0, l = Pi(
              null,
              l,
              t,
              a,
              e
            ));
          else {
            if (t != null) {
              var n = t.$$typeof;
              if (n === Tt) {
                l.tag = 11, l = go(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              } else if (n === ct) {
                l.tag = 14, l = bo(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              }
            }
            throw l = il(t) || t, Error(r(306, l, ""));
          }
        }
        return l;
      case 0:
        return Pi(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 1:
        return a = l.type, n = Ea(
          a,
          l.pendingProps
        ), _o(
          t,
          l,
          a,
          n,
          e
        );
      case 3:
        t: {
          if (nt(
            l,
            l.stateNode.containerInfo
          ), t === null) throw Error(r(387));
          a = l.pendingProps;
          var u = l.memoizedState;
          n = u.element, zi(t, l), Bn(l, a, null, e);
          var c = l.memoizedState;
          if (a = c.cache, Ye(l, It, a), a !== u.cache && pi(
            l,
            [It],
            e,
            !0
          ), Hn(), a = c.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: c.cache
            }, l.updateQueue.baseState = u, l.memoizedState = u, l.flags & 256) {
              l = To(
                t,
                l,
                a,
                e
              );
              break t;
            } else if (a !== n) {
              n = ql(
                Error(r(424)),
                l
              ), Rn(n), l = To(
                t,
                l,
                a,
                e
              );
              break t;
            } else {
              switch (t = l.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (Bt = wl(t.firstChild), sl = l, gt = !0, Be = null, Gl = !0, e = Sr(
                l,
                null,
                a,
                e
              ), l.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (ma(), a === n) {
              l = ge(
                t,
                l,
                e
              );
              break t;
            }
            ol(t, l, a, e);
          }
          l = l.child;
        }
        return l;
      case 26:
        return tc(t, l), t === null ? (e = Xd(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = e : gt || (e = l.type, t = l.pendingProps, a = gc(
          et.current
        ).createElement(e), a[ot] = l, a[it] = t, dl(a, e, t), Gt(a), l.stateNode = a) : l.memoizedState = Xd(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return yl(l), t === null && gt && (a = l.stateNode = Bd(
          l.type,
          l.pendingProps,
          et.current
        ), sl = l, Gl = !0, n = Bt, Ie(l.type) ? (Xf = n, Bt = wl(a.firstChild)) : Bt = n), ol(
          t,
          l,
          l.pendingProps.children,
          e
        ), tc(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && gt && ((n = a = Bt) && (a = m0(
          a,
          l.type,
          l.pendingProps,
          Gl
        ), a !== null ? (l.stateNode = a, sl = l, Bt = wl(a.firstChild), Gl = !1, n = !0) : n = !1), n || qe(l)), yl(l), n = l.type, u = l.pendingProps, c = t !== null ? t.memoizedProps : null, a = u.children, Lf(n, u) ? a = null : c !== null && Lf(n, c) && (l.flags |= 32), l.memoizedState !== null && (n = Di(
          t,
          l,
          Ch,
          null,
          null,
          e
        ), au._currentValue = n), tc(t, l), ol(t, l, a, e), l.child;
      case 6:
        return t === null && gt && ((t = e = Bt) && (e = h0(
          e,
          l.pendingProps,
          Gl
        ), e !== null ? (l.stateNode = e, sl = l, Bt = null, t = !0) : t = !1), t || qe(l)), null;
      case 13:
        return zo(t, l, e);
      case 4:
        return nt(
          l,
          l.stateNode.containerInfo
        ), a = l.pendingProps, t === null ? l.child = Sa(
          l,
          null,
          a,
          e
        ) : ol(t, l, a, e), l.child;
      case 11:
        return go(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 7:
        return ol(
          t,
          l,
          l.pendingProps,
          e
        ), l.child;
      case 8:
        return ol(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 12:
        return ol(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 10:
        return a = l.pendingProps, Ye(l, l.type, a.value), ol(t, l, a.children, e), l.child;
      case 9:
        return n = l.type._context, a = l.pendingProps.children, ya(l), n = rl(n), a = a(n), l.flags |= 1, ol(t, l, a, e), l.child;
      case 14:
        return bo(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 15:
        return So(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 19:
        return Co(t, l, e);
      case 31:
        return Hh(t, l, e);
      case 22:
        return po(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return ya(l), a = rl(It), t === null ? (n = Ai(), n === null && (n = Ut, u = Ei(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= e), n = u), l.memoizedState = { parent: a, cache: n }, Ti(l), Ye(l, It, n)) : ((t.lanes & e) !== 0 && (zi(t, l), Bn(l, null, null, e), Hn()), n = t.memoizedState, u = l.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, l.memoizedState = n, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = n), Ye(l, It, a)) : (a = u.cache, Ye(l, It, a), a !== n.cache && pi(
          l,
          [It],
          e,
          !0
        ))), ol(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 29:
        throw l.pendingProps;
    }
    throw Error(r(156, l.tag));
  }
  function be(t) {
    t.flags |= 4;
  }
  function ff(t, l, e, a, n) {
    if ((l = (t.mode & 32) !== 0) && (l = !1), l) {
      if (t.flags |= 16777216, (n & 335544128) === n)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (ed()) t.flags |= 8192;
        else
          throw ba = Yu, _i;
    } else t.flags &= -16777217;
  }
  function Ro(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Zd(l))
      if (ed()) t.flags |= 8192;
      else
        throw ba = Yu, _i;
  }
  function ec(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? vu() : 536870912, t.lanes |= l, an |= l);
  }
  function wn(t, l) {
    if (!gt)
      switch (t.tailMode) {
        case "hidden":
          l = t.tail;
          for (var e = null; l !== null; )
            l.alternate !== null && (e = l), l = l.sibling;
          e === null ? t.tail = null : e.sibling = null;
          break;
        case "collapsed":
          e = t.tail;
          for (var a = null; e !== null; )
            e.alternate !== null && (a = e), e = e.sibling;
          a === null ? l || t.tail === null ? t.tail = null : t.tail.sibling = null : a.sibling = null;
      }
  }
  function qt(t) {
    var l = t.alternate !== null && t.alternate.child === t.child, e = 0, a = 0;
    if (l)
      for (var n = t.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = t, n = n.sibling;
    else
      for (n = t.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = t, n = n.sibling;
    return t.subtreeFlags |= a, t.childLanes = e, l;
  }
  function qh(t, l, e) {
    var a = l.pendingProps;
    switch (yi(l), l.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return qt(l), null;
      case 1:
        return qt(l), null;
      case 3:
        return e = l.stateNode, a = null, t !== null && (a = t.memoizedState.cache), l.memoizedState.cache !== a && (l.flags |= 2048), he(It), Nt(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (Va(l) ? be(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, gi())), qt(l), null;
      case 26:
        var n = l.type, u = l.memoizedState;
        return t === null ? (be(l), u !== null ? (qt(l), Ro(l, u)) : (qt(l), ff(
          l,
          n,
          null,
          a,
          e
        ))) : u ? u !== t.memoizedState ? (be(l), qt(l), Ro(l, u)) : (qt(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== a && be(l), qt(l), ff(
          l,
          n,
          t,
          a,
          e
        )), null;
      case 27:
        if (xe(l), e = et.current, n = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && be(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(r(166));
            return qt(l), null;
          }
          t = Y.current, Va(l) ? fr(l) : (t = Bd(n, a, e), l.stateNode = t, be(l));
        }
        return qt(l), null;
      case 5:
        if (xe(l), n = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && be(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(r(166));
            return qt(l), null;
          }
          if (u = Y.current, Va(l))
            fr(l);
          else {
            var c = gc(
              et.current
            );
            switch (u) {
              case 1:
                u = c.createElementNS(
                  "http://www.w3.org/2000/svg",
                  n
                );
                break;
              case 2:
                u = c.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  n
                );
                break;
              default:
                switch (n) {
                  case "svg":
                    u = c.createElementNS(
                      "http://www.w3.org/2000/svg",
                      n
                    );
                    break;
                  case "math":
                    u = c.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    u = c.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof a.is == "string" ? c.createElement("select", {
                      is: a.is
                    }) : c.createElement("select"), a.multiple ? u.multiple = !0 : a.size && (u.size = a.size);
                    break;
                  default:
                    u = typeof a.is == "string" ? c.createElement(n, { is: a.is }) : c.createElement(n);
                }
            }
            u[ot] = l, u[it] = a;
            t: for (c = l.child; c !== null; ) {
              if (c.tag === 5 || c.tag === 6)
                u.appendChild(c.stateNode);
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                c.child.return = c, c = c.child;
                continue;
              }
              if (c === l) break t;
              for (; c.sibling === null; ) {
                if (c.return === null || c.return === l)
                  break t;
                c = c.return;
              }
              c.sibling.return = c.return, c = c.sibling;
            }
            l.stateNode = u;
            t: switch (dl(u, n, a), n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break t;
              case "img":
                a = !0;
                break t;
              default:
                a = !1;
            }
            a && be(l);
          }
        }
        return qt(l), ff(
          l,
          l.type,
          t === null ? null : t.memoizedProps,
          l.pendingProps,
          e
        ), null;
      case 6:
        if (t && l.stateNode != null)
          t.memoizedProps !== a && be(l);
        else {
          if (typeof a != "string" && l.stateNode === null)
            throw Error(r(166));
          if (t = et.current, Va(l)) {
            if (t = l.stateNode, e = l.memoizedProps, a = null, n = sl, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            t[ot] = l, t = !!(t.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || zd(t.nodeValue, e)), t || qe(l, !0);
          } else
            t = gc(t).createTextNode(
              a
            ), t[ot] = l, l.stateNode = t;
        }
        return qt(l), null;
      case 31:
        if (e = l.memoizedState, t === null || t.memoizedState !== null) {
          if (a = Va(l), e !== null) {
            if (t === null) {
              if (!a) throw Error(r(318));
              if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(557));
              t[ot] = l;
            } else
              ma(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            qt(l), t = !1;
          } else
            e = gi(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
          if (!t)
            return l.flags & 256 ? (Rl(l), l) : (Rl(l), null);
          if ((l.flags & 128) !== 0)
            throw Error(r(558));
        }
        return qt(l), null;
      case 13:
        if (a = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = Va(l), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(r(318));
              if (n = l.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(r(317));
              n[ot] = l;
            } else
              ma(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            qt(l), n = !1;
          } else
            n = gi(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return l.flags & 256 ? (Rl(l), l) : (Rl(l), null);
        }
        return Rl(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = a !== null, t = t !== null && t.memoizedState !== null, e && (a = l.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), ec(l, l.updateQueue), qt(l), null);
      case 4:
        return Nt(), t === null && Rf(l.stateNode.containerInfo), qt(l), null;
      case 10:
        return he(l.type), qt(l), null;
      case 19:
        if (b(Jt), a = l.memoizedState, a === null) return qt(l), null;
        if (n = (l.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) wn(a, !1);
          else {
            if (Kt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (u = wu(t), u !== null) {
                  for (l.flags |= 128, wn(a, !1), t = u.updateQueue, l.updateQueue = t, ec(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                    ar(e, t), e = e.sibling;
                  return U(
                    Jt,
                    Jt.current & 1 | 2
                  ), gt && de(l, a.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            a.tail !== null && wt() > ic && (l.flags |= 128, n = !0, wn(a, !1), l.lanes = 4194304);
          }
        else {
          if (!n)
            if (t = wu(u), t !== null) {
              if (l.flags |= 128, n = !0, t = t.updateQueue, l.updateQueue = t, ec(l, t), wn(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !gt)
                return qt(l), null;
            } else
              2 * wt() - a.renderingStartTime > ic && e !== 536870912 && (l.flags |= 128, n = !0, wn(a, !1), l.lanes = 4194304);
          a.isBackwards ? (u.sibling = l.child, l.child = u) : (t = a.last, t !== null ? t.sibling = u : l.child = u, a.last = u);
        }
        return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = wt(), t.sibling = null, e = Jt.current, U(
          Jt,
          n ? e & 1 | 2 : e & 1
        ), gt && de(l, a.treeForkCount), t) : (qt(l), null);
      case 22:
      case 23:
        return Rl(l), Ri(), a = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (l.flags |= 8192) : a && (l.flags |= 8192), a ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (qt(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : qt(l), e = l.updateQueue, e !== null && ec(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), a = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), a !== e && (l.flags |= 2048), t !== null && b(va), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), he(It), qt(l), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, l.tag));
  }
  function Yh(t, l) {
    switch (yi(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return he(It), Nt(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return xe(l), null;
      case 31:
        if (l.memoizedState !== null) {
          if (Rl(l), l.alternate === null)
            throw Error(r(340));
          ma();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 13:
        if (Rl(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
          if (l.alternate === null)
            throw Error(r(340));
          ma();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 19:
        return b(Jt), null;
      case 4:
        return Nt(), null;
      case 10:
        return he(l.type), null;
      case 22:
      case 23:
        return Rl(l), Ri(), t !== null && b(va), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return he(It), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Oo(t, l) {
    switch (yi(l), l.tag) {
      case 3:
        he(It), Nt();
        break;
      case 26:
      case 27:
      case 5:
        xe(l);
        break;
      case 4:
        Nt();
        break;
      case 31:
        l.memoizedState !== null && Rl(l);
        break;
      case 13:
        Rl(l);
        break;
      case 19:
        b(Jt);
        break;
      case 10:
        he(l.type);
        break;
      case 22:
      case 23:
        Rl(l), Ri(), t !== null && b(va);
        break;
      case 24:
        he(It);
    }
  }
  function Vn(t, l) {
    try {
      var e = l.updateQueue, a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        e = n;
        do {
          if ((e.tag & t) === t) {
            a = void 0;
            var u = e.create, c = e.inst;
            a = u(), c.destroy = a;
          }
          e = e.next;
        } while (e !== n);
      }
    } catch (i) {
      Mt(l, l.return, i);
    }
  }
  function Ze(t, l, e) {
    try {
      var a = l.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & t) === t) {
            var c = a.inst, i = c.destroy;
            if (i !== void 0) {
              c.destroy = void 0, n = l;
              var o = e, p = i;
              try {
                p();
              } catch (T) {
                Mt(
                  n,
                  o,
                  T
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (T) {
      Mt(l, l.return, T);
    }
  }
  function jo(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        Er(l, e);
      } catch (a) {
        Mt(t, t.return, a);
      }
    }
  }
  function Do(t, l, e) {
    e.props = Ea(
      t.type,
      t.memoizedProps
    ), e.state = t.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      Mt(t, l, a);
    }
  }
  function Zn(t, l) {
    try {
      var e = t.ref;
      if (e !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var a = t.stateNode;
            break;
          case 30:
            a = t.stateNode;
            break;
          default:
            a = t.stateNode;
        }
        typeof e == "function" ? t.refCleanup = e(a) : e.current = a;
      }
    } catch (n) {
      Mt(t, l, n);
    }
  }
  function le(t, l) {
    var e = t.ref, a = t.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          Mt(t, l, n);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (n) {
          Mt(t, l, n);
        }
      else e.current = null;
  }
  function Uo(t) {
    var l = t.type, e = t.memoizedProps, a = t.stateNode;
    try {
      t: switch (l) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && a.focus();
          break t;
        case "img":
          e.src ? a.src = e.src : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (n) {
      Mt(t, t.return, n);
    }
  }
  function sf(t, l, e) {
    try {
      var a = t.stateNode;
      i0(a, t.type, e, l), a[it] = l;
    } catch (n) {
      Mt(t, t.return, n);
    }
  }
  function Lo(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Ie(t.type) || t.tag === 4;
  }
  function rf(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Lo(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Ie(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function of(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(t, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(t), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = se));
    else if (a !== 4 && (a === 27 && Ie(t.type) && (e = t.stateNode, l = null), t = t.child, t !== null))
      for (of(t, l, e), t = t.sibling; t !== null; )
        of(t, l, e), t = t.sibling;
  }
  function ac(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? e.insertBefore(t, l) : e.appendChild(t);
    else if (a !== 4 && (a === 27 && Ie(t.type) && (e = t.stateNode), t = t.child, t !== null))
      for (ac(t, l, e), t = t.sibling; t !== null; )
        ac(t, l, e), t = t.sibling;
  }
  function Ho(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var a = t.type, n = l.attributes; n.length; )
        l.removeAttributeNode(n[0]);
      dl(l, a, e), l[ot] = t, l[it] = e;
    } catch (u) {
      Mt(t, t.return, u);
    }
  }
  var Se = !1, ll = !1, df = !1, Bo = typeof WeakSet == "function" ? WeakSet : Set, ul = null;
  function Xh(t, l) {
    if (t = t.containerInfo, Df = _c, t = Js(t), ni(t)) {
      if ("selectionStart" in t)
        var e = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          e = (e = t.ownerDocument) && e.defaultView || window;
          var a = e.getSelection && e.getSelection();
          if (a && a.rangeCount !== 0) {
            e = a.anchorNode;
            var n = a.anchorOffset, u = a.focusNode;
            a = a.focusOffset;
            try {
              e.nodeType, u.nodeType;
            } catch {
              e = null;
              break t;
            }
            var c = 0, i = -1, o = -1, p = 0, T = 0, M = t, E = null;
            l: for (; ; ) {
              for (var A; M !== e || n !== 0 && M.nodeType !== 3 || (i = c + n), M !== u || a !== 0 && M.nodeType !== 3 || (o = c + a), M.nodeType === 3 && (c += M.nodeValue.length), (A = M.firstChild) !== null; )
                E = M, M = A;
              for (; ; ) {
                if (M === t) break l;
                if (E === e && ++p === n && (i = c), E === u && ++T === a && (o = c), (A = M.nextSibling) !== null) break;
                M = E, E = M.parentNode;
              }
              M = A;
            }
            e = i === -1 || o === -1 ? null : { start: i, end: o };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (Uf = { focusedElem: t, selectionRange: e }, _c = !1, ul = l; ul !== null; )
      if (l = ul, t = l.child, (l.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = l, ul = t;
      else
        for (; ul !== null; ) {
          switch (l = ul, u = l.alternate, t = l.flags, l.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = l.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (e = 0; e < t.length; e++)
                  n = t[e], n.ref.impl = n.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && u !== null) {
                t = void 0, e = l, n = u.memoizedProps, u = u.memoizedState, a = e.stateNode;
                try {
                  var w = Ea(
                    e.type,
                    n
                  );
                  t = a.getSnapshotBeforeUpdate(
                    w,
                    u
                  ), a.__reactInternalSnapshotBeforeUpdate = t;
                } catch (P) {
                  Mt(
                    e,
                    e.return,
                    P
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = l.stateNode.containerInfo, e = t.nodeType, e === 9)
                  Bf(t);
                else if (e === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Bf(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(r(163));
          }
          if (t = l.sibling, t !== null) {
            t.return = l.return, ul = t;
            break;
          }
          ul = l.return;
        }
  }
  function qo(t, l, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ee(t, e), a & 4 && Vn(5, e);
        break;
      case 1:
        if (Ee(t, e), a & 4)
          if (t = e.stateNode, l === null)
            try {
              t.componentDidMount();
            } catch (c) {
              Mt(e, e.return, c);
            }
          else {
            var n = Ea(
              e.type,
              l.memoizedProps
            );
            l = l.memoizedState;
            try {
              t.componentDidUpdate(
                n,
                l,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (c) {
              Mt(
                e,
                e.return,
                c
              );
            }
          }
        a & 64 && jo(e), a & 512 && Zn(e, e.return);
        break;
      case 3:
        if (Ee(t, e), a & 64 && (t = e.updateQueue, t !== null)) {
          if (l = null, e.child !== null)
            switch (e.child.tag) {
              case 27:
              case 5:
                l = e.child.stateNode;
                break;
              case 1:
                l = e.child.stateNode;
            }
          try {
            Er(t, l);
          } catch (c) {
            Mt(e, e.return, c);
          }
        }
        break;
      case 27:
        l === null && a & 4 && Ho(e);
      case 26:
      case 5:
        Ee(t, e), l === null && a & 4 && Uo(e), a & 512 && Zn(e, e.return);
        break;
      case 12:
        Ee(t, e);
        break;
      case 31:
        Ee(t, e), a & 4 && Go(t, e);
        break;
      case 13:
        Ee(t, e), a & 4 && Qo(t, e), a & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = $h.bind(
          null,
          e
        ), y0(t, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || Se, !a) {
          l = l !== null && l.memoizedState !== null || ll, n = Se;
          var u = ll;
          Se = a, (ll = l) && !u ? Ne(
            t,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : Ee(t, e), Se = n, ll = u;
        }
        break;
      case 30:
        break;
      default:
        Ee(t, e);
    }
  }
  function Yo(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, Yo(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && De(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Yt = null, Sl = !1;
  function pe(t, l, e) {
    for (e = e.child; e !== null; )
      Xo(t, l, e), e = e.sibling;
  }
  function Xo(t, l, e) {
    if (Vt && typeof Vt.onCommitFiberUnmount == "function")
      try {
        Vt.onCommitFiberUnmount(Oe, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        ll || le(e, l), pe(
          t,
          l,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        ll || le(e, l);
        var a = Yt, n = Sl;
        Ie(e.type) && (Yt = e.stateNode, Sl = !1), pe(
          t,
          l,
          e
        ), tu(e.stateNode), Yt = a, Sl = n;
        break;
      case 5:
        ll || le(e, l);
      case 6:
        if (a = Yt, n = Sl, Yt = null, pe(
          t,
          l,
          e
        ), Yt = a, Sl = n, Yt !== null)
          if (Sl)
            try {
              (Yt.nodeType === 9 ? Yt.body : Yt.nodeName === "HTML" ? Yt.ownerDocument.body : Yt).removeChild(e.stateNode);
            } catch (u) {
              Mt(
                e,
                l,
                u
              );
            }
          else
            try {
              Yt.removeChild(e.stateNode);
            } catch (u) {
              Mt(
                e,
                l,
                u
              );
            }
        break;
      case 18:
        Yt !== null && (Sl ? (t = Yt, jd(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), dn(t)) : jd(Yt, e.stateNode));
        break;
      case 4:
        a = Yt, n = Sl, Yt = e.stateNode.containerInfo, Sl = !0, pe(
          t,
          l,
          e
        ), Yt = a, Sl = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ze(2, e, l), ll || Ze(4, e, l), pe(
          t,
          l,
          e
        );
        break;
      case 1:
        ll || (le(e, l), a = e.stateNode, typeof a.componentWillUnmount == "function" && Do(
          e,
          l,
          a
        )), pe(
          t,
          l,
          e
        );
        break;
      case 21:
        pe(
          t,
          l,
          e
        );
        break;
      case 22:
        ll = (a = ll) || e.memoizedState !== null, pe(
          t,
          l,
          e
        ), ll = a;
        break;
      default:
        pe(
          t,
          l,
          e
        );
    }
  }
  function Go(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        dn(t);
      } catch (e) {
        Mt(l, l.return, e);
      }
    }
  }
  function Qo(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        dn(t);
      } catch (e) {
        Mt(l, l.return, e);
      }
  }
  function Gh(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return l === null && (l = t.stateNode = new Bo()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new Bo()), l;
      default:
        throw Error(r(435, t.tag));
    }
  }
  function nc(t, l) {
    var e = Gh(t);
    l.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var n = Wh.bind(null, t, a);
        a.then(n, n);
      }
    });
  }
  function pl(t, l) {
    var e = l.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var n = e[a], u = t, c = l, i = c;
        t: for (; i !== null; ) {
          switch (i.tag) {
            case 27:
              if (Ie(i.type)) {
                Yt = i.stateNode, Sl = !1;
                break t;
              }
              break;
            case 5:
              Yt = i.stateNode, Sl = !1;
              break t;
            case 3:
            case 4:
              Yt = i.stateNode.containerInfo, Sl = !0;
              break t;
          }
          i = i.return;
        }
        if (Yt === null) throw Error(r(160));
        Xo(u, c, n), Yt = null, Sl = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (l.subtreeFlags & 13886)
      for (l = l.child; l !== null; )
        wo(l, t), l = l.sibling;
  }
  var Kl = null;
  function wo(t, l) {
    var e = t.alternate, a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        pl(l, t), El(t), a & 4 && (Ze(3, t, t.return), Vn(3, t), Ze(5, t, t.return));
        break;
      case 1:
        pl(l, t), El(t), a & 512 && (ll || e === null || le(e, e.return)), a & 64 && Se && (t = t.updateQueue, t !== null && (a = t.callbacks, a !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var n = Kl;
        if (pl(l, t), El(t), a & 512 && (ll || e === null || le(e, e.return)), a & 4) {
          var u = e !== null ? e.memoizedState : null;
          if (a = t.memoizedState, e === null)
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  a = t.type, e = t.memoizedProps, n = n.ownerDocument || n;
                  l: switch (a) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[je] || u[ot] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), dl(u, a, e), u[ot] = t, Gt(u), a = u;
                      break t;
                    case "link":
                      var c = wd(
                        "link",
                        "href",
                        n
                      ).get(a + (e.href || ""));
                      if (c) {
                        for (var i = 0; i < c.length; i++)
                          if (u = c[i], u.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && u.getAttribute("rel") === (e.rel == null ? null : e.rel) && u.getAttribute("title") === (e.title == null ? null : e.title) && u.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                            c.splice(i, 1);
                            break l;
                          }
                      }
                      u = n.createElement(a), dl(u, a, e), n.head.appendChild(u);
                      break;
                    case "meta":
                      if (c = wd(
                        "meta",
                        "content",
                        n
                      ).get(a + (e.content || ""))) {
                        for (i = 0; i < c.length; i++)
                          if (u = c[i], u.getAttribute("content") === (e.content == null ? null : "" + e.content) && u.getAttribute("name") === (e.name == null ? null : e.name) && u.getAttribute("property") === (e.property == null ? null : e.property) && u.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && u.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                            c.splice(i, 1);
                            break l;
                          }
                      }
                      u = n.createElement(a), dl(u, a, e), n.head.appendChild(u);
                      break;
                    default:
                      throw Error(r(468, a));
                  }
                  u[ot] = t, Gt(u), a = u;
                }
                t.stateNode = a;
              } else
                Vd(
                  n,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Qd(
                n,
                a,
                t.memoizedProps
              );
          else
            u !== a ? (u === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : u.count--, a === null ? Vd(
              n,
              t.type,
              t.stateNode
            ) : Qd(
              n,
              a,
              t.memoizedProps
            )) : a === null && t.stateNode !== null && sf(
              t,
              t.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        pl(l, t), El(t), a & 512 && (ll || e === null || le(e, e.return)), e !== null && a & 4 && sf(
          t,
          t.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (pl(l, t), El(t), a & 512 && (ll || e === null || le(e, e.return)), t.flags & 32) {
          n = t.stateNode;
          try {
            Ua(n, "");
          } catch (w) {
            Mt(t, t.return, w);
          }
        }
        a & 4 && t.stateNode != null && (n = t.memoizedProps, sf(
          t,
          n,
          e !== null ? e.memoizedProps : n
        )), a & 1024 && (df = !0);
        break;
      case 6:
        if (pl(l, t), El(t), a & 4) {
          if (t.stateNode === null)
            throw Error(r(162));
          a = t.memoizedProps, e = t.stateNode;
          try {
            e.nodeValue = a;
          } catch (w) {
            Mt(t, t.return, w);
          }
        }
        break;
      case 3:
        if (pc = null, n = Kl, Kl = bc(l.containerInfo), pl(l, t), Kl = n, El(t), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            dn(l.containerInfo);
          } catch (w) {
            Mt(t, t.return, w);
          }
        df && (df = !1, Vo(t));
        break;
      case 4:
        a = Kl, Kl = bc(
          t.stateNode.containerInfo
        ), pl(l, t), El(t), Kl = a;
        break;
      case 12:
        pl(l, t), El(t);
        break;
      case 31:
        pl(l, t), El(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, nc(t, a)));
        break;
      case 13:
        pl(l, t), El(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && (cc = wt()), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, nc(t, a)));
        break;
      case 22:
        n = t.memoizedState !== null;
        var o = e !== null && e.memoizedState !== null, p = Se, T = ll;
        if (Se = p || n, ll = T || o, pl(l, t), ll = T, Se = p, El(t), a & 8192)
          t: for (l = t.stateNode, l._visibility = n ? l._visibility & -2 : l._visibility | 1, n && (e === null || o || Se || ll || Na(t)), e = null, l = t; ; ) {
            if (l.tag === 5 || l.tag === 26) {
              if (e === null) {
                o = e = l;
                try {
                  if (u = o.stateNode, n)
                    c = u.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none";
                  else {
                    i = o.stateNode;
                    var M = o.memoizedProps.style, E = M != null && M.hasOwnProperty("display") ? M.display : null;
                    i.style.display = E == null || typeof E == "boolean" ? "" : ("" + E).trim();
                  }
                } catch (w) {
                  Mt(o, o.return, w);
                }
              }
            } else if (l.tag === 6) {
              if (e === null) {
                o = l;
                try {
                  o.stateNode.nodeValue = n ? "" : o.memoizedProps;
                } catch (w) {
                  Mt(o, o.return, w);
                }
              }
            } else if (l.tag === 18) {
              if (e === null) {
                o = l;
                try {
                  var A = o.stateNode;
                  n ? Dd(A, !0) : Dd(o.stateNode, !1);
                } catch (w) {
                  Mt(o, o.return, w);
                }
              }
            } else if ((l.tag !== 22 && l.tag !== 23 || l.memoizedState === null || l === t) && l.child !== null) {
              l.child.return = l, l = l.child;
              continue;
            }
            if (l === t) break t;
            for (; l.sibling === null; ) {
              if (l.return === null || l.return === t) break t;
              e === l && (e = null), l = l.return;
            }
            e === l && (e = null), l.sibling.return = l.return, l = l.sibling;
          }
        a & 4 && (a = t.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, nc(t, e))));
        break;
      case 19:
        pl(l, t), El(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, nc(t, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        pl(l, t), El(t);
    }
  }
  function El(t) {
    var l = t.flags;
    if (l & 2) {
      try {
        for (var e, a = t.return; a !== null; ) {
          if (Lo(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(r(160));
        switch (e.tag) {
          case 27:
            var n = e.stateNode, u = rf(t);
            ac(t, u, n);
            break;
          case 5:
            var c = e.stateNode;
            e.flags & 32 && (Ua(c, ""), e.flags &= -33);
            var i = rf(t);
            ac(t, i, c);
            break;
          case 3:
          case 4:
            var o = e.stateNode.containerInfo, p = rf(t);
            of(
              t,
              p,
              o
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (T) {
        Mt(t, t.return, T);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function Vo(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        Vo(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), t = t.sibling;
      }
  }
  function Ee(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        qo(t, l.alternate, l), l = l.sibling;
  }
  function Na(t) {
    for (t = t.child; t !== null; ) {
      var l = t;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ze(4, l, l.return), Na(l);
          break;
        case 1:
          le(l, l.return);
          var e = l.stateNode;
          typeof e.componentWillUnmount == "function" && Do(
            l,
            l.return,
            e
          ), Na(l);
          break;
        case 27:
          tu(l.stateNode);
        case 26:
        case 5:
          le(l, l.return), Na(l);
          break;
        case 22:
          l.memoizedState === null && Na(l);
          break;
        case 30:
          Na(l);
          break;
        default:
          Na(l);
      }
      t = t.sibling;
    }
  }
  function Ne(t, l, e) {
    for (e = e && (l.subtreeFlags & 8772) !== 0, l = l.child; l !== null; ) {
      var a = l.alternate, n = t, u = l, c = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Ne(
            n,
            u,
            e
          ), Vn(4, u);
          break;
        case 1:
          if (Ne(
            n,
            u,
            e
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (p) {
              Mt(a, a.return, p);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var i = a.stateNode;
            try {
              var o = n.shared.hiddenCallbacks;
              if (o !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < o.length; n++)
                  pr(o[n], i);
            } catch (p) {
              Mt(a, a.return, p);
            }
          }
          e && c & 64 && jo(u), Zn(u, u.return);
          break;
        case 27:
          Ho(u);
        case 26:
        case 5:
          Ne(
            n,
            u,
            e
          ), e && a === null && c & 4 && Uo(u), Zn(u, u.return);
          break;
        case 12:
          Ne(
            n,
            u,
            e
          );
          break;
        case 31:
          Ne(
            n,
            u,
            e
          ), e && c & 4 && Go(n, u);
          break;
        case 13:
          Ne(
            n,
            u,
            e
          ), e && c & 4 && Qo(n, u);
          break;
        case 22:
          u.memoizedState === null && Ne(
            n,
            u,
            e
          ), Zn(u, u.return);
          break;
        case 30:
          break;
        default:
          Ne(
            n,
            u,
            e
          );
      }
      l = l.sibling;
    }
  }
  function mf(t, l) {
    var e = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && On(e));
  }
  function hf(t, l) {
    t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && On(t));
  }
  function kl(t, l, e, a) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        Zo(
          t,
          l,
          e,
          a
        ), l = l.sibling;
  }
  function Zo(t, l, e, a) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        kl(
          t,
          l,
          e,
          a
        ), n & 2048 && Vn(9, l);
        break;
      case 1:
        kl(
          t,
          l,
          e,
          a
        );
        break;
      case 3:
        kl(
          t,
          l,
          e,
          a
        ), n & 2048 && (t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && On(t)));
        break;
      case 12:
        if (n & 2048) {
          kl(
            t,
            l,
            e,
            a
          ), t = l.stateNode;
          try {
            var u = l.memoizedProps, c = u.id, i = u.onPostCommit;
            typeof i == "function" && i(
              c,
              l.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (o) {
            Mt(l, l.return, o);
          }
        } else
          kl(
            t,
            l,
            e,
            a
          );
        break;
      case 31:
        kl(
          t,
          l,
          e,
          a
        );
        break;
      case 13:
        kl(
          t,
          l,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        u = l.stateNode, c = l.alternate, l.memoizedState !== null ? u._visibility & 2 ? kl(
          t,
          l,
          e,
          a
        ) : Kn(t, l) : u._visibility & 2 ? kl(
          t,
          l,
          e,
          a
        ) : (u._visibility |= 2, tn(
          t,
          l,
          e,
          a,
          (l.subtreeFlags & 10256) !== 0 || !1
        )), n & 2048 && mf(c, l);
        break;
      case 24:
        kl(
          t,
          l,
          e,
          a
        ), n & 2048 && hf(l.alternate, l);
        break;
      default:
        kl(
          t,
          l,
          e,
          a
        );
    }
  }
  function tn(t, l, e, a, n) {
    for (n = n && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var u = t, c = l, i = e, o = a, p = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          tn(
            u,
            c,
            i,
            o,
            n
          ), Vn(8, c);
          break;
        case 23:
          break;
        case 22:
          var T = c.stateNode;
          c.memoizedState !== null ? T._visibility & 2 ? tn(
            u,
            c,
            i,
            o,
            n
          ) : Kn(
            u,
            c
          ) : (T._visibility |= 2, tn(
            u,
            c,
            i,
            o,
            n
          )), n && p & 2048 && mf(
            c.alternate,
            c
          );
          break;
        case 24:
          tn(
            u,
            c,
            i,
            o,
            n
          ), n && p & 2048 && hf(c.alternate, c);
          break;
        default:
          tn(
            u,
            c,
            i,
            o,
            n
          );
      }
      l = l.sibling;
    }
  }
  function Kn(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var e = t, a = l, n = a.flags;
        switch (a.tag) {
          case 22:
            Kn(e, a), n & 2048 && mf(
              a.alternate,
              a
            );
            break;
          case 24:
            Kn(e, a), n & 2048 && hf(a.alternate, a);
            break;
          default:
            Kn(e, a);
        }
        l = l.sibling;
      }
  }
  var kn = 8192;
  function ln(t, l, e) {
    if (t.subtreeFlags & kn)
      for (t = t.child; t !== null; )
        Ko(
          t,
          l,
          e
        ), t = t.sibling;
  }
  function Ko(t, l, e) {
    switch (t.tag) {
      case 26:
        ln(
          t,
          l,
          e
        ), t.flags & kn && t.memoizedState !== null && x0(
          e,
          Kl,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        ln(
          t,
          l,
          e
        );
        break;
      case 3:
      case 4:
        var a = Kl;
        Kl = bc(t.stateNode.containerInfo), ln(
          t,
          l,
          e
        ), Kl = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = kn, kn = 16777216, ln(
          t,
          l,
          e
        ), kn = a) : ln(
          t,
          l,
          e
        ));
        break;
      default:
        ln(
          t,
          l,
          e
        );
    }
  }
  function ko(t) {
    var l = t.alternate;
    if (l !== null && (t = l.child, t !== null)) {
      l.child = null;
      do
        l = t.sibling, t.sibling = null, t = l;
      while (t !== null);
    }
  }
  function Jn(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          ul = a, $o(
            a,
            t
          );
        }
      ko(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Jo(t), t = t.sibling;
  }
  function Jo(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Jn(t), t.flags & 2048 && Ze(9, t, t.return);
        break;
      case 3:
        Jn(t);
        break;
      case 12:
        Jn(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, uc(t)) : Jn(t);
        break;
      default:
        Jn(t);
    }
  }
  function uc(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          ul = a, $o(
            a,
            t
          );
        }
      ko(t);
    }
    for (t = t.child; t !== null; ) {
      switch (l = t, l.tag) {
        case 0:
        case 11:
        case 15:
          Ze(8, l, l.return), uc(l);
          break;
        case 22:
          e = l.stateNode, e._visibility & 2 && (e._visibility &= -3, uc(l));
          break;
        default:
          uc(l);
      }
      t = t.sibling;
    }
  }
  function $o(t, l) {
    for (; ul !== null; ) {
      var e = ul;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Ze(8, e, l);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          On(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, ul = a;
      else
        t: for (e = t; ul !== null; ) {
          a = ul;
          var n = a.sibling, u = a.return;
          if (Yo(a), a === e) {
            ul = null;
            break t;
          }
          if (n !== null) {
            n.return = u, ul = n;
            break t;
          }
          ul = u;
        }
    }
  }
  var Qh = {
    getCacheForType: function(t) {
      var l = rl(It), e = l.data.get(t);
      return e === void 0 && (e = t(), l.data.set(t, e)), e;
    },
    cacheSignal: function() {
      return rl(It).controller.signal;
    }
  }, wh = typeof WeakMap == "function" ? WeakMap : Map, At = 0, Ut = null, mt = null, yt = 0, Ct = 0, Ol = null, Ke = !1, en = !1, yf = !1, Ae = 0, Kt = 0, ke = 0, Aa = 0, vf = 0, jl = 0, an = 0, $n = null, Nl = null, gf = !1, cc = 0, Wo = 0, ic = 1 / 0, fc = null, Je = null, al = 0, $e = null, nn = null, _e = 0, bf = 0, Sf = null, Fo = null, Wn = 0, pf = null;
  function Dl() {
    return (At & 2) !== 0 && yt !== 0 ? yt & -yt : _.T !== null ? zf() : Q();
  }
  function Io() {
    if (jl === 0)
      if ((yt & 536870912) === 0 || gt) {
        var t = Ma;
        Ma <<= 1, (Ma & 3932160) === 0 && (Ma = 262144), jl = t;
      } else jl = 536870912;
    return t = Ml.current, t !== null && (t.flags |= 32), jl;
  }
  function Al(t, l, e) {
    (t === Ut && (Ct === 2 || Ct === 9) || t.cancelPendingCommit !== null) && (un(t, 0), We(
      t,
      yt,
      jl,
      !1
    )), ca(t, e), ((At & 2) === 0 || t !== Ut) && (t === Ut && ((At & 2) === 0 && (Aa |= e), Kt === 4 && We(
      t,
      yt,
      jl,
      !1
    )), ee(t));
  }
  function Po(t, l, e) {
    if ((At & 6) !== 0) throw Error(r(327));
    var a = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || ua(t, l), n = a ? Kh(t, l) : Nf(t, l, !0), u = a;
    do {
      if (n === 0) {
        en && !a && We(t, l, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, u && !Vh(e)) {
          n = Nf(t, l, !1), u = !1;
          continue;
        }
        if (n === 2) {
          if (u = l, t.errorRecoveryDisabledLanes & u)
            var c = 0;
          else
            c = t.pendingLanes & -536870913, c = c !== 0 ? c : c & 536870912 ? 536870912 : 0;
          if (c !== 0) {
            l = c;
            t: {
              var i = t;
              n = $n;
              var o = i.current.memoizedState.isDehydrated;
              if (o && (un(i, c).flags |= 256), c = Nf(
                i,
                c,
                !1
              ), c !== 2) {
                if (yf && !o) {
                  i.errorRecoveryDisabledLanes |= u, Aa |= u, n = 4;
                  break t;
                }
                u = Nl, Nl = n, u !== null && (Nl === null ? Nl = u : Nl.push.apply(
                  Nl,
                  u
                ));
              }
              n = c;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          un(t, 0), We(t, l, 0, !0);
          break;
        }
        t: {
          switch (a = t, u = n, u) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((l & 4194048) !== l) break;
            case 6:
              We(
                a,
                l,
                jl,
                !Ke
              );
              break t;
            case 2:
              Nl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((l & 62914560) === l && (n = cc + 300 - wt(), 10 < n)) {
            if (We(
              a,
              l,
              jl,
              !Ke
            ), Oa(a, 0, !0) !== 0) break t;
            _e = l, a.timeoutHandle = Rd(
              td.bind(
                null,
                a,
                e,
                Nl,
                fc,
                gf,
                l,
                jl,
                Aa,
                an,
                Ke,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break t;
          }
          td(
            a,
            e,
            Nl,
            fc,
            gf,
            l,
            jl,
            Aa,
            an,
            Ke,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ee(t);
  }
  function td(t, l, e, a, n, u, c, i, o, p, T, M, E, A) {
    if (t.timeoutHandle = -1, M = l.subtreeFlags, M & 8192 || (M & 16785408) === 16785408) {
      M = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: se
      }, Ko(
        l,
        u,
        M
      );
      var w = (u & 62914560) === u ? cc - wt() : (u & 4194048) === u ? Wo - wt() : 0;
      if (w = C0(
        M,
        w
      ), w !== null) {
        _e = u, t.cancelPendingCommit = w(
          fd.bind(
            null,
            t,
            l,
            u,
            e,
            a,
            n,
            c,
            i,
            o,
            T,
            M,
            null,
            E,
            A
          )
        ), We(t, u, c, !p);
        return;
      }
    }
    fd(
      t,
      l,
      u,
      e,
      a,
      n,
      c,
      i,
      o
    );
  }
  function Vh(t) {
    for (var l = t; ; ) {
      var e = l.tag;
      if ((e === 0 || e === 11 || e === 15) && l.flags & 16384 && (e = l.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var n = e[a], u = n.getSnapshot;
          n = n.value;
          try {
            if (!xl(u(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (e = l.child, l.subtreeFlags & 16384 && e !== null)
        e.return = l, l = e;
      else {
        if (l === t) break;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) return !0;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    }
    return !0;
  }
  function We(t, l, e, a) {
    l &= ~vf, l &= ~Aa, t.suspendedLanes |= l, t.pingedLanes &= ~l, a && (t.warmLanes |= l), a = t.expirationTimes;
    for (var n = l; 0 < n; ) {
      var u = 31 - nl(n), c = 1 << u;
      a[u] = -1, n &= ~c;
    }
    e !== 0 && gu(t, e, l);
  }
  function sc() {
    return (At & 6) === 0 ? (Fn(0), !1) : !0;
  }
  function Ef() {
    if (mt !== null) {
      if (Ct === 0)
        var t = mt.return;
      else
        t = mt, me = ha = null, Hi(t), $a = null, Dn = 0, t = mt;
      for (; t !== null; )
        Oo(t.alternate, t), t = t.return;
      mt = null;
    }
  }
  function un(t, l) {
    var e = t.timeoutHandle;
    e !== -1 && (t.timeoutHandle = -1, r0(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), _e = 0, Ef(), Ut = t, mt = e = oe(t.current, null), yt = l, Ct = 0, Ol = null, Ke = !1, en = ua(t, l), yf = !1, an = jl = vf = Aa = ke = Kt = 0, Nl = $n = null, gf = !1, (l & 8) !== 0 && (l |= l & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= l; 0 < a; ) {
        var n = 31 - nl(a), u = 1 << n;
        l |= t[n], a &= ~u;
      }
    return Ae = l, Ru(), e;
  }
  function ld(t, l) {
    ft = null, _.H = Gn, l === Ja || l === qu ? (l = vr(), Ct = 3) : l === _i ? (l = vr(), Ct = 4) : Ct = l === Ii ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, Ol = l, mt === null && (Kt = 1, Iu(
      t,
      ql(l, t.current)
    ));
  }
  function ed() {
    var t = Ml.current;
    return t === null ? !0 : (yt & 4194048) === yt ? Ql === null : (yt & 62914560) === yt || (yt & 536870912) !== 0 ? t === Ql : !1;
  }
  function ad() {
    var t = _.H;
    return _.H = Gn, t === null ? Gn : t;
  }
  function nd() {
    var t = _.A;
    return _.A = Qh, t;
  }
  function rc() {
    Kt = 4, Ke || (yt & 4194048) !== yt && Ml.current !== null || (en = !0), (ke & 134217727) === 0 && (Aa & 134217727) === 0 || Ut === null || We(
      Ut,
      yt,
      jl,
      !1
    );
  }
  function Nf(t, l, e) {
    var a = At;
    At |= 2;
    var n = ad(), u = nd();
    (Ut !== t || yt !== l) && (fc = null, un(t, l)), l = !1;
    var c = Kt;
    t: do
      try {
        if (Ct !== 0 && mt !== null) {
          var i = mt, o = Ol;
          switch (Ct) {
            case 8:
              Ef(), c = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ml.current === null && (l = !0);
              var p = Ct;
              if (Ct = 0, Ol = null, cn(t, i, o, p), e && en) {
                c = 0;
                break t;
              }
              break;
            default:
              p = Ct, Ct = 0, Ol = null, cn(t, i, o, p);
          }
        }
        Zh(), c = Kt;
        break;
      } catch (T) {
        ld(t, T);
      }
    while (!0);
    return l && t.shellSuspendCounter++, me = ha = null, At = a, _.H = n, _.A = u, mt === null && (Ut = null, yt = 0, Ru()), c;
  }
  function Zh() {
    for (; mt !== null; ) ud(mt);
  }
  function Kh(t, l) {
    var e = At;
    At |= 2;
    var a = ad(), n = nd();
    Ut !== t || yt !== l ? (fc = null, ic = wt() + 500, un(t, l)) : en = ua(
      t,
      l
    );
    t: do
      try {
        if (Ct !== 0 && mt !== null) {
          l = mt;
          var u = Ol;
          l: switch (Ct) {
            case 1:
              Ct = 0, Ol = null, cn(t, l, u, 1);
              break;
            case 2:
            case 9:
              if (hr(u)) {
                Ct = 0, Ol = null, cd(l);
                break;
              }
              l = function() {
                Ct !== 2 && Ct !== 9 || Ut !== t || (Ct = 7), ee(t);
              }, u.then(l, l);
              break t;
            case 3:
              Ct = 7;
              break t;
            case 4:
              Ct = 5;
              break t;
            case 7:
              hr(u) ? (Ct = 0, Ol = null, cd(l)) : (Ct = 0, Ol = null, cn(t, l, u, 7));
              break;
            case 5:
              var c = null;
              switch (mt.tag) {
                case 26:
                  c = mt.memoizedState;
                case 5:
                case 27:
                  var i = mt;
                  if (c ? Zd(c) : i.stateNode.complete) {
                    Ct = 0, Ol = null;
                    var o = i.sibling;
                    if (o !== null) mt = o;
                    else {
                      var p = i.return;
                      p !== null ? (mt = p, oc(p)) : mt = null;
                    }
                    break l;
                  }
              }
              Ct = 0, Ol = null, cn(t, l, u, 5);
              break;
            case 6:
              Ct = 0, Ol = null, cn(t, l, u, 6);
              break;
            case 8:
              Ef(), Kt = 6;
              break t;
            default:
              throw Error(r(462));
          }
        }
        kh();
        break;
      } catch (T) {
        ld(t, T);
      }
    while (!0);
    return me = ha = null, _.H = a, _.A = n, At = e, mt !== null ? 0 : (Ut = null, yt = 0, Ru(), Kt);
  }
  function kh() {
    for (; mt !== null && !du(); )
      ud(mt);
  }
  function ud(t) {
    var l = Mo(t.alternate, t, Ae);
    t.memoizedProps = t.pendingProps, l === null ? oc(t) : mt = l;
  }
  function cd(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = Ao(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          yt
        );
        break;
      case 11:
        l = Ao(
          e,
          l,
          l.pendingProps,
          l.type.render,
          l.ref,
          yt
        );
        break;
      case 5:
        Hi(l);
      default:
        Oo(e, l), l = mt = ar(l, Ae), l = Mo(e, l, Ae);
    }
    t.memoizedProps = t.pendingProps, l === null ? oc(t) : mt = l;
  }
  function cn(t, l, e, a) {
    me = ha = null, Hi(l), $a = null, Dn = 0;
    var n = l.return;
    try {
      if (Lh(
        t,
        n,
        l,
        e,
        yt
      )) {
        Kt = 1, Iu(
          t,
          ql(e, t.current)
        ), mt = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw mt = n, u;
      Kt = 1, Iu(
        t,
        ql(e, t.current)
      ), mt = null;
      return;
    }
    l.flags & 32768 ? (gt || a === 1 ? t = !0 : en || (yt & 536870912) !== 0 ? t = !1 : (Ke = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Ml.current, a !== null && a.tag === 13 && (a.flags |= 16384))), id(l, t)) : oc(l);
  }
  function oc(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        id(
          l,
          Ke
        );
        return;
      }
      t = l.return;
      var e = qh(
        l.alternate,
        l,
        Ae
      );
      if (e !== null) {
        mt = e;
        return;
      }
      if (l = l.sibling, l !== null) {
        mt = l;
        return;
      }
      mt = l = t;
    } while (l !== null);
    Kt === 0 && (Kt = 5);
  }
  function id(t, l) {
    do {
      var e = Yh(t.alternate, t);
      if (e !== null) {
        e.flags &= 32767, mt = e;
        return;
      }
      if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !l && (t = t.sibling, t !== null)) {
        mt = t;
        return;
      }
      mt = t = e;
    } while (t !== null);
    Kt = 6, mt = null;
  }
  function fd(t, l, e, a, n, u, c, i, o) {
    t.cancelPendingCommit = null;
    do
      dc();
    while (al !== 0);
    if ((At & 6) !== 0) throw Error(r(327));
    if (l !== null) {
      if (l === t.current) throw Error(r(177));
      if (u = l.lanes | l.childLanes, u |= si, Gc(
        t,
        e,
        u,
        c,
        i,
        o
      ), t === Ut && (mt = Ut = null, yt = 0), nn = l, $e = t, _e = e, bf = u, Sf = n, Fo = a, (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Fh(_l, function() {
        return md(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), a = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || a) {
        a = _.T, _.T = null, n = q.p, q.p = 2, c = At, At |= 4;
        try {
          Xh(t, l, e);
        } finally {
          At = c, q.p = n, _.T = a;
        }
      }
      al = 1, sd(), rd(), od();
    }
  }
  function sd() {
    if (al === 1) {
      al = 0;
      var t = $e, l = nn, e = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || e) {
        e = _.T, _.T = null;
        var a = q.p;
        q.p = 2;
        var n = At;
        At |= 4;
        try {
          wo(l, t);
          var u = Uf, c = Js(t.containerInfo), i = u.focusedElem, o = u.selectionRange;
          if (c !== i && i && i.ownerDocument && ks(
            i.ownerDocument.documentElement,
            i
          )) {
            if (o !== null && ni(i)) {
              var p = o.start, T = o.end;
              if (T === void 0 && (T = p), "selectionStart" in i)
                i.selectionStart = p, i.selectionEnd = Math.min(
                  T,
                  i.value.length
                );
              else {
                var M = i.ownerDocument || document, E = M && M.defaultView || window;
                if (E.getSelection) {
                  var A = E.getSelection(), w = i.textContent.length, P = Math.min(o.start, w), jt = o.end === void 0 ? P : Math.min(o.end, w);
                  !A.extend && P > jt && (c = jt, jt = P, P = c);
                  var v = Ks(
                    i,
                    P
                  ), y = Ks(
                    i,
                    jt
                  );
                  if (v && y && (A.rangeCount !== 1 || A.anchorNode !== v.node || A.anchorOffset !== v.offset || A.focusNode !== y.node || A.focusOffset !== y.offset)) {
                    var S = M.createRange();
                    S.setStart(v.node, v.offset), A.removeAllRanges(), P > jt ? (A.addRange(S), A.extend(y.node, y.offset)) : (S.setEnd(y.node, y.offset), A.addRange(S));
                  }
                }
              }
            }
            for (M = [], A = i; A = A.parentNode; )
              A.nodeType === 1 && M.push({
                element: A,
                left: A.scrollLeft,
                top: A.scrollTop
              });
            for (typeof i.focus == "function" && i.focus(), i = 0; i < M.length; i++) {
              var x = M[i];
              x.element.scrollLeft = x.left, x.element.scrollTop = x.top;
            }
          }
          _c = !!Df, Uf = Df = null;
        } finally {
          At = n, q.p = a, _.T = e;
        }
      }
      t.current = l, al = 2;
    }
  }
  function rd() {
    if (al === 2) {
      al = 0;
      var t = $e, l = nn, e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        e = _.T, _.T = null;
        var a = q.p;
        q.p = 2;
        var n = At;
        At |= 4;
        try {
          qo(t, l.alternate, l);
        } finally {
          At = n, q.p = a, _.T = e;
        }
      }
      al = 3;
    }
  }
  function od() {
    if (al === 4 || al === 3) {
      al = 0, mu();
      var t = $e, l = nn, e = _e, a = Fo;
      (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? al = 5 : (al = 0, nn = $e = null, dd(t, t.pendingLanes));
      var n = t.pendingLanes;
      if (n === 0 && (Je = null), V(e), l = l.stateNode, Vt && typeof Vt.onCommitFiberRoot == "function")
        try {
          Vt.onCommitFiberRoot(
            Oe,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        l = _.T, n = q.p, q.p = 2, _.T = null;
        try {
          for (var u = t.onRecoverableError, c = 0; c < a.length; c++) {
            var i = a[c];
            u(i.value, {
              componentStack: i.stack
            });
          }
        } finally {
          _.T = l, q.p = n;
        }
      }
      (_e & 3) !== 0 && dc(), ee(t), n = t.pendingLanes, (e & 261930) !== 0 && (n & 42) !== 0 ? t === pf ? Wn++ : (Wn = 0, pf = t) : Wn = 0, Fn(0);
    }
  }
  function dd(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, On(l)));
  }
  function dc() {
    return sd(), rd(), od(), md();
  }
  function md() {
    if (al !== 5) return !1;
    var t = $e, l = bf;
    bf = 0;
    var e = V(_e), a = _.T, n = q.p;
    try {
      q.p = 32 > e ? 32 : e, _.T = null, e = Sf, Sf = null;
      var u = $e, c = _e;
      if (al = 0, nn = $e = null, _e = 0, (At & 6) !== 0) throw Error(r(331));
      var i = At;
      if (At |= 4, Jo(u.current), Zo(
        u,
        u.current,
        c,
        e
      ), At = i, Fn(0, !1), Vt && typeof Vt.onPostCommitFiberRoot == "function")
        try {
          Vt.onPostCommitFiberRoot(Oe, u);
        } catch {
        }
      return !0;
    } finally {
      q.p = n, _.T = a, dd(t, l);
    }
  }
  function hd(t, l, e) {
    l = ql(e, l), l = Fi(t.stateNode, l, 2), t = Qe(t, l, 2), t !== null && (ca(t, 2), ee(t));
  }
  function Mt(t, l, e) {
    if (t.tag === 3)
      hd(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          hd(
            l,
            t,
            e
          );
          break;
        } else if (l.tag === 1) {
          var a = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Je === null || !Je.has(a))) {
            t = ql(e, t), e = yo(2), a = Qe(l, e, 2), a !== null && (vo(
              e,
              a,
              l,
              t
            ), ca(a, 2), ee(a));
            break;
          }
        }
        l = l.return;
      }
  }
  function Af(t, l, e) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new wh();
      var n = /* @__PURE__ */ new Set();
      a.set(l, n);
    } else
      n = a.get(l), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(l, n));
    n.has(e) || (yf = !0, n.add(e), t = Jh.bind(null, t, l, e), l.then(t, t));
  }
  function Jh(t, l, e) {
    var a = t.pingCache;
    a !== null && a.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, Ut === t && (yt & e) === e && (Kt === 4 || Kt === 3 && (yt & 62914560) === yt && 300 > wt() - cc ? (At & 2) === 0 && un(t, 0) : vf |= e, an === yt && (an = 0)), ee(t);
  }
  function yd(t, l) {
    l === 0 && (l = vu()), t = oa(t, l), t !== null && (ca(t, l), ee(t));
  }
  function $h(t) {
    var l = t.memoizedState, e = 0;
    l !== null && (e = l.retryLane), yd(t, e);
  }
  function Wh(t, l) {
    var e = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var a = t.stateNode, n = t.memoizedState;
        n !== null && (e = n.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      case 22:
        a = t.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    a !== null && a.delete(l), yd(t, e);
  }
  function Fh(t, l) {
    return Ta(t, l);
  }
  var mc = null, fn = null, _f = !1, hc = !1, Tf = !1, Fe = 0;
  function ee(t) {
    t !== fn && t.next === null && (fn === null ? mc = fn = t : fn = fn.next = t), hc = !0, _f || (_f = !0, Ph());
  }
  function Fn(t, l) {
    if (!Tf && hc) {
      Tf = !0;
      do
        for (var e = !1, a = mc; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var c = a.suspendedLanes, i = a.pingedLanes;
              u = (1 << 31 - nl(42 | t) + 1) - 1, u &= n & ~(c & ~i), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (e = !0, Sd(a, u));
          } else
            u = yt, u = Oa(
              a,
              a === Ut ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || ua(a, u) || (e = !0, Sd(a, u));
          a = a.next;
        }
      while (e);
      Tf = !1;
    }
  }
  function Ih() {
    vd();
  }
  function vd() {
    hc = _f = !1;
    var t = 0;
    Fe !== 0 && s0() && (t = Fe);
    for (var l = wt(), e = null, a = mc; a !== null; ) {
      var n = a.next, u = gd(a, l);
      u === 0 ? (a.next = null, e === null ? mc = n : e.next = n, n === null && (fn = e)) : (e = a, (t !== 0 || (u & 3) !== 0) && (hc = !0)), a = n;
    }
    al !== 0 && al !== 5 || Fn(t), Fe !== 0 && (Fe = 0);
  }
  function gd(t, l) {
    for (var e = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var c = 31 - nl(u), i = 1 << c, o = n[c];
      o === -1 ? ((i & e) === 0 || (i & a) !== 0) && (n[c] = Xc(i, l)) : o <= l && (t.expiredLanes |= i), u &= ~i;
    }
    if (l = Ut, e = yt, e = Oa(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, e === 0 || t === l && (Ct === 2 || Ct === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && Me(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || ua(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (a !== null && Me(a), V(e)) {
        case 2:
        case 8:
          e = vn;
          break;
        case 32:
          e = _l;
          break;
        case 268435456:
          e = gn;
          break;
        default:
          e = _l;
      }
      return a = bd.bind(null, t), e = Ta(e, a), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return a !== null && a !== null && Me(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function bd(t, l) {
    if (al !== 0 && al !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (dc() && t.callbackNode !== e)
      return null;
    var a = yt;
    return a = Oa(
      t,
      t === Ut ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (Po(t, a, l), gd(t, wt()), t.callbackNode != null && t.callbackNode === e ? bd.bind(null, t) : null);
  }
  function Sd(t, l) {
    if (dc()) return null;
    Po(t, l, !0);
  }
  function Ph() {
    o0(function() {
      (At & 6) !== 0 ? Ta(
        za,
        Ih
      ) : vd();
    });
  }
  function zf() {
    if (Fe === 0) {
      var t = Ka;
      t === 0 && (t = Ca, Ca <<= 1, (Ca & 261888) === 0 && (Ca = 256)), Fe = t;
    }
    return Fe;
  }
  function pd(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Nu("" + t);
  }
  function Ed(t, l) {
    var e = l.ownerDocument.createElement("input");
    return e.name = l.name, e.value = l.value, t.id && e.setAttribute("form", t.id), l.parentNode.insertBefore(e, l), t = new FormData(t), e.parentNode.removeChild(e), t;
  }
  function t0(t, l, e, a, n) {
    if (l === "submit" && e && e.stateNode === n) {
      var u = pd(
        (n[it] || null).action
      ), c = a.submitter;
      c && (l = (l = c[it] || null) ? pd(l.formAction) : c.getAttribute("formAction"), l !== null && (u = l, c = null));
      var i = new zu(
        "action",
        "action",
        null,
        a,
        n
      );
      t.push({
        event: i,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (Fe !== 0) {
                  var o = c ? Ed(n, c) : new FormData(n);
                  Zi(
                    e,
                    {
                      pending: !0,
                      data: o,
                      method: n.method,
                      action: u
                    },
                    null,
                    o
                  );
                }
              } else
                typeof u == "function" && (i.preventDefault(), o = c ? Ed(n, c) : new FormData(n), Zi(
                  e,
                  {
                    pending: !0,
                    data: o,
                    method: n.method,
                    action: u
                  },
                  u,
                  o
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var xf = 0; xf < fi.length; xf++) {
    var Cf = fi[xf], l0 = Cf.toLowerCase(), e0 = Cf[0].toUpperCase() + Cf.slice(1);
    Zl(
      l0,
      "on" + e0
    );
  }
  Zl(Fs, "onAnimationEnd"), Zl(Is, "onAnimationIteration"), Zl(Ps, "onAnimationStart"), Zl("dblclick", "onDoubleClick"), Zl("focusin", "onFocus"), Zl("focusout", "onBlur"), Zl(bh, "onTransitionRun"), Zl(Sh, "onTransitionStart"), Zl(ph, "onTransitionCancel"), Zl(tr, "onTransitionEnd"), ie("onMouseEnter", ["mouseout", "mouseover"]), ie("onMouseLeave", ["mouseout", "mouseover"]), ie("onPointerEnter", ["pointerout", "pointerover"]), ie("onPointerLeave", ["pointerout", "pointerover"]), Il(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Il(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Il("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Il(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Il(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Il(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var In = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), a0 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(In)
  );
  function Nd(t, l) {
    l = (l & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var a = t[e], n = a.event;
      a = a.listeners;
      t: {
        var u = void 0;
        if (l)
          for (var c = a.length - 1; 0 <= c; c--) {
            var i = a[c], o = i.instance, p = i.currentTarget;
            if (i = i.listener, o !== u && n.isPropagationStopped())
              break t;
            u = i, n.currentTarget = p;
            try {
              u(n);
            } catch (T) {
              Mu(T);
            }
            n.currentTarget = null, u = o;
          }
        else
          for (c = 0; c < a.length; c++) {
            if (i = a[c], o = i.instance, p = i.currentTarget, i = i.listener, o !== u && n.isPropagationStopped())
              break t;
            u = i, n.currentTarget = p;
            try {
              u(n);
            } catch (T) {
              Mu(T);
            }
            n.currentTarget = null, u = o;
          }
      }
    }
  }
  function ht(t, l) {
    var e = l[Xt];
    e === void 0 && (e = l[Xt] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    e.has(a) || (Ad(l, t, 2, !1), e.add(a));
  }
  function Mf(t, l, e) {
    var a = 0;
    l && (a |= 4), Ad(
      e,
      t,
      a,
      l
    );
  }
  var yc = "_reactListening" + Math.random().toString(36).slice(2);
  function Rf(t) {
    if (!t[yc]) {
      t[yc] = !0, bn.forEach(function(e) {
        e !== "selectionchange" && (a0.has(e) || Mf(e, !1, t), Mf(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[yc] || (l[yc] = !0, Mf("selectionchange", !1, l));
    }
  }
  function Ad(t, l, e, a) {
    switch (Id(l)) {
      case 2:
        var n = O0;
        break;
      case 8:
        n = j0;
        break;
      default:
        n = Zf;
    }
    e = n.bind(
      null,
      l,
      e,
      t
    ), n = void 0, !$c || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (n = !0), a ? n !== void 0 ? t.addEventListener(l, e, {
      capture: !0,
      passive: n
    }) : t.addEventListener(l, e, !0) : n !== void 0 ? t.addEventListener(l, e, {
      passive: n
    }) : t.addEventListener(l, e, !1);
  }
  function Of(t, l, e, a, n) {
    var u = a;
    if ((l & 1) === 0 && (l & 2) === 0 && a !== null)
      t: for (; ; ) {
        if (a === null) return;
        var c = a.tag;
        if (c === 3 || c === 4) {
          var i = a.stateNode.containerInfo;
          if (i === n) break;
          if (c === 4)
            for (c = a.return; c !== null; ) {
              var o = c.tag;
              if ((o === 3 || o === 4) && c.stateNode.containerInfo === n)
                return;
              c = c.return;
            }
          for (; i !== null; ) {
            if (c = Ul(i), c === null) return;
            if (o = c.tag, o === 5 || o === 6 || o === 26 || o === 27) {
              a = u = c;
              continue t;
            }
            i = i.parentNode;
          }
        }
        a = a.return;
      }
    xs(function() {
      var p = u, T = kc(e), M = [];
      t: {
        var E = lr.get(t);
        if (E !== void 0) {
          var A = zu, w = t;
          switch (t) {
            case "keypress":
              if (_u(e) === 0) break t;
            case "keydown":
            case "keyup":
              A = Wm;
              break;
            case "focusin":
              w = "focus", A = Pc;
              break;
            case "focusout":
              w = "blur", A = Pc;
              break;
            case "beforeblur":
            case "afterblur":
              A = Pc;
              break;
            case "click":
              if (e.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              A = Rs;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              A = qm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              A = Pm;
              break;
            case Fs:
            case Is:
            case Ps:
              A = Gm;
              break;
            case tr:
              A = lh;
              break;
            case "scroll":
            case "scrollend":
              A = Hm;
              break;
            case "wheel":
              A = ah;
              break;
            case "copy":
            case "cut":
            case "paste":
              A = wm;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              A = js;
              break;
            case "toggle":
            case "beforetoggle":
              A = uh;
          }
          var P = (l & 4) !== 0, jt = !P && (t === "scroll" || t === "scrollend"), v = P ? E !== null ? E + "Capture" : null : E;
          P = [];
          for (var y = p, S; y !== null; ) {
            var x = y;
            if (S = x.stateNode, x = x.tag, x !== 5 && x !== 26 && x !== 27 || S === null || v === null || (x = pn(y, v), x != null && P.push(
              Pn(y, x, S)
            )), jt) break;
            y = y.return;
          }
          0 < P.length && (E = new A(
            E,
            w,
            null,
            e,
            T
          ), M.push({ event: E, listeners: P }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (E = t === "mouseover" || t === "pointerover", A = t === "mouseout" || t === "pointerout", E && e !== Kc && (w = e.relatedTarget || e.fromElement) && (Ul(w) || w[xt]))
            break t;
          if ((A || E) && (E = T.window === T ? T : (E = T.ownerDocument) ? E.defaultView || E.parentWindow : window, A ? (w = e.relatedTarget || e.toElement, A = p, w = w ? Ul(w) : null, w !== null && (jt = D(w), P = w.tag, w !== jt || P !== 5 && P !== 27 && P !== 6) && (w = null)) : (A = null, w = p), A !== w)) {
            if (P = Rs, x = "onMouseLeave", v = "onMouseEnter", y = "mouse", (t === "pointerout" || t === "pointerover") && (P = js, x = "onPointerLeave", v = "onPointerEnter", y = "pointer"), jt = A == null ? E : ia(A), S = w == null ? E : ia(w), E = new P(
              x,
              y + "leave",
              A,
              e,
              T
            ), E.target = jt, E.relatedTarget = S, x = null, Ul(T) === p && (P = new P(
              v,
              y + "enter",
              w,
              e,
              T
            ), P.target = S, P.relatedTarget = jt, x = P), jt = x, A && w)
              l: {
                for (P = n0, v = A, y = w, S = 0, x = v; x; x = P(x))
                  S++;
                x = 0;
                for (var J = y; J; J = P(J))
                  x++;
                for (; 0 < S - x; )
                  v = P(v), S--;
                for (; 0 < x - S; )
                  y = P(y), x--;
                for (; S--; ) {
                  if (v === y || y !== null && v === y.alternate) {
                    P = v;
                    break l;
                  }
                  v = P(v), y = P(y);
                }
                P = null;
              }
            else P = null;
            A !== null && _d(
              M,
              E,
              A,
              P,
              !1
            ), w !== null && jt !== null && _d(
              M,
              jt,
              w,
              P,
              !0
            );
          }
        }
        t: {
          if (E = p ? ia(p) : window, A = E.nodeName && E.nodeName.toLowerCase(), A === "select" || A === "input" && E.type === "file")
            var St = Xs;
          else if (qs(E))
            if (Gs)
              St = yh;
            else {
              St = mh;
              var Z = dh;
            }
          else
            A = E.nodeName, !A || A.toLowerCase() !== "input" || E.type !== "checkbox" && E.type !== "radio" ? p && Zc(p.elementType) && (St = Xs) : St = hh;
          if (St && (St = St(t, p))) {
            Ys(
              M,
              St,
              e,
              T
            );
            break t;
          }
          Z && Z(t, E, p), t === "focusout" && p && E.type === "number" && p.memoizedProps.value != null && Vc(E, "number", E.value);
        }
        switch (Z = p ? ia(p) : window, t) {
          case "focusin":
            (qs(Z) || Z.contentEditable === "true") && (qa = Z, ui = p, Cn = null);
            break;
          case "focusout":
            Cn = ui = qa = null;
            break;
          case "mousedown":
            ci = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ci = !1, $s(M, e, T);
            break;
          case "selectionchange":
            if (gh) break;
          case "keydown":
          case "keyup":
            $s(M, e, T);
        }
        var st;
        if (li)
          t: {
            switch (t) {
              case "compositionstart":
                var vt = "onCompositionStart";
                break t;
              case "compositionend":
                vt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                vt = "onCompositionUpdate";
                break t;
            }
            vt = void 0;
          }
        else
          Ba ? Hs(t, e) && (vt = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (vt = "onCompositionStart");
        vt && (Ds && e.locale !== "ko" && (Ba || vt !== "onCompositionStart" ? vt === "onCompositionEnd" && Ba && (st = Cs()) : (Le = T, Wc = "value" in Le ? Le.value : Le.textContent, Ba = !0)), Z = vc(p, vt), 0 < Z.length && (vt = new Os(
          vt,
          t,
          null,
          e,
          T
        ), M.push({ event: vt, listeners: Z }), st ? vt.data = st : (st = Bs(e), st !== null && (vt.data = st)))), (st = ih ? fh(t, e) : sh(t, e)) && (vt = vc(p, "onBeforeInput"), 0 < vt.length && (Z = new Os(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          T
        ), M.push({
          event: Z,
          listeners: vt
        }), Z.data = st)), t0(
          M,
          t,
          p,
          e,
          T
        );
      }
      Nd(M, l);
    });
  }
  function Pn(t, l, e) {
    return {
      instance: t,
      listener: l,
      currentTarget: e
    };
  }
  function vc(t, l) {
    for (var e = l + "Capture", a = []; t !== null; ) {
      var n = t, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = pn(t, e), n != null && a.unshift(
        Pn(t, n, u)
      ), n = pn(t, l), n != null && a.push(
        Pn(t, n, u)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function n0(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function _d(t, l, e, a, n) {
    for (var u = l._reactName, c = []; e !== null && e !== a; ) {
      var i = e, o = i.alternate, p = i.stateNode;
      if (i = i.tag, o !== null && o === a) break;
      i !== 5 && i !== 26 && i !== 27 || p === null || (o = p, n ? (p = pn(e, u), p != null && c.unshift(
        Pn(e, p, o)
      )) : n || (p = pn(e, u), p != null && c.push(
        Pn(e, p, o)
      ))), e = e.return;
    }
    c.length !== 0 && t.push({ event: l, listeners: c });
  }
  var u0 = /\r\n?/g, c0 = /\u0000|\uFFFD/g;
  function Td(t) {
    return (typeof t == "string" ? t : "" + t).replace(u0, `
`).replace(c0, "");
  }
  function zd(t, l) {
    return l = Td(l), Td(t) === l;
  }
  function Ot(t, l, e, a, n, u) {
    switch (e) {
      case "children":
        typeof a == "string" ? l === "body" || l === "textarea" && a === "" || Ua(t, a) : (typeof a == "number" || typeof a == "bigint") && l !== "body" && Ua(t, "" + a);
        break;
      case "className":
        pu(t, "class", a);
        break;
      case "tabIndex":
        pu(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        pu(t, e, a);
        break;
      case "style":
        Ts(t, a, u);
        break;
      case "data":
        if (l !== "object") {
          pu(t, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (l !== "a" || e !== "href")) {
          t.removeAttribute(e);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = Nu("" + a), t.setAttribute(e, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          t.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (e === "formAction" ? (l !== "input" && Ot(t, l, "name", n.name, n, null), Ot(
            t,
            l,
            "formEncType",
            n.formEncType,
            n,
            null
          ), Ot(
            t,
            l,
            "formMethod",
            n.formMethod,
            n,
            null
          ), Ot(
            t,
            l,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (Ot(t, l, "encType", n.encType, n, null), Ot(t, l, "method", n.method, n, null), Ot(t, l, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = Nu("" + a), t.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (t.onclick = se);
        break;
      case "onScroll":
        a != null && ht("scroll", t);
        break;
      case "onScrollEnd":
        a != null && ht("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(r(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(r(60));
            t.innerHTML = e;
          }
        }
        break;
      case "multiple":
        t.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        t.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        e = Nu("" + a), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          e
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, "" + a) : t.removeAttribute(e);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, "") : t.removeAttribute(e);
        break;
      case "capture":
      case "download":
        a === !0 ? t.setAttribute(e, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, a) : t.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? t.setAttribute(e, a) : t.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? t.removeAttribute(e) : t.setAttribute(e, a);
        break;
      case "popover":
        ht("beforetoggle", t), ht("toggle", t), Su(t, "popover", a);
        break;
      case "xlinkActuate":
        fe(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        fe(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        fe(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        fe(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        fe(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        fe(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        fe(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        fe(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        fe(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Su(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = Um.get(e) || e, Su(t, e, a));
    }
  }
  function jf(t, l, e, a, n, u) {
    switch (e) {
      case "style":
        Ts(t, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(r(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(r(60));
            t.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string" ? Ua(t, a) : (typeof a == "number" || typeof a == "bigint") && Ua(t, "" + a);
        break;
      case "onScroll":
        a != null && ht("scroll", t);
        break;
      case "onScrollEnd":
        a != null && ht("scrollend", t);
        break;
      case "onClick":
        a != null && (t.onclick = se);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Sn.hasOwnProperty(e))
          t: {
            if (e[0] === "o" && e[1] === "n" && (n = e.endsWith("Capture"), l = e.slice(2, n ? e.length - 7 : void 0), u = t[it] || null, u = u != null ? u[e] : null, typeof u == "function" && t.removeEventListener(l, u, n), typeof a == "function")) {
              typeof u != "function" && u !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(l, a, n);
              break t;
            }
            e in t ? t[e] = a : a === !0 ? t.setAttribute(e, "") : Su(t, e, a);
          }
    }
  }
  function dl(t, l, e) {
    switch (l) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        ht("error", t), ht("load", t);
        var a = !1, n = !1, u;
        for (u in e)
          if (e.hasOwnProperty(u)) {
            var c = e[u];
            if (c != null)
              switch (u) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  n = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, l));
                default:
                  Ot(t, l, u, c, e, null);
              }
          }
        n && Ot(t, l, "srcSet", e.srcSet, e, null), a && Ot(t, l, "src", e.src, e, null);
        return;
      case "input":
        ht("invalid", t);
        var i = u = c = n = null, o = null, p = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var T = e[a];
            if (T != null)
              switch (a) {
                case "name":
                  n = T;
                  break;
                case "type":
                  c = T;
                  break;
                case "checked":
                  o = T;
                  break;
                case "defaultChecked":
                  p = T;
                  break;
                case "value":
                  u = T;
                  break;
                case "defaultValue":
                  i = T;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (T != null)
                    throw Error(r(137, l));
                  break;
                default:
                  Ot(t, l, a, T, e, null);
              }
          }
        Es(
          t,
          u,
          i,
          o,
          p,
          c,
          n,
          !1
        );
        return;
      case "select":
        ht("invalid", t), a = c = u = null;
        for (n in e)
          if (e.hasOwnProperty(n) && (i = e[n], i != null))
            switch (n) {
              case "value":
                u = i;
                break;
              case "defaultValue":
                c = i;
                break;
              case "multiple":
                a = i;
              default:
                Ot(t, l, n, i, e, null);
            }
        l = u, e = c, t.multiple = !!a, l != null ? Da(t, !!a, l, !1) : e != null && Da(t, !!a, e, !0);
        return;
      case "textarea":
        ht("invalid", t), u = n = a = null;
        for (c in e)
          if (e.hasOwnProperty(c) && (i = e[c], i != null))
            switch (c) {
              case "value":
                a = i;
                break;
              case "defaultValue":
                n = i;
                break;
              case "children":
                u = i;
                break;
              case "dangerouslySetInnerHTML":
                if (i != null) throw Error(r(91));
                break;
              default:
                Ot(t, l, c, i, e, null);
            }
        As(t, a, n, u);
        return;
      case "option":
        for (o in e)
          if (e.hasOwnProperty(o) && (a = e[o], a != null))
            switch (o) {
              case "selected":
                t.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                Ot(t, l, o, a, e, null);
            }
        return;
      case "dialog":
        ht("beforetoggle", t), ht("toggle", t), ht("cancel", t), ht("close", t);
        break;
      case "iframe":
      case "object":
        ht("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < In.length; a++)
          ht(In[a], t);
        break;
      case "image":
        ht("error", t), ht("load", t);
        break;
      case "details":
        ht("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        ht("error", t), ht("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (p in e)
          if (e.hasOwnProperty(p) && (a = e[p], a != null))
            switch (p) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, l));
              default:
                Ot(t, l, p, a, e, null);
            }
        return;
      default:
        if (Zc(l)) {
          for (T in e)
            e.hasOwnProperty(T) && (a = e[T], a !== void 0 && jf(
              t,
              l,
              T,
              a,
              e,
              void 0
            ));
          return;
        }
    }
    for (i in e)
      e.hasOwnProperty(i) && (a = e[i], a != null && Ot(t, l, i, a, e, null));
  }
  function i0(t, l, e, a) {
    switch (l) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var n = null, u = null, c = null, i = null, o = null, p = null, T = null;
        for (A in e) {
          var M = e[A];
          if (e.hasOwnProperty(A) && M != null)
            switch (A) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                o = M;
              default:
                a.hasOwnProperty(A) || Ot(t, l, A, null, a, M);
            }
        }
        for (var E in a) {
          var A = a[E];
          if (M = e[E], a.hasOwnProperty(E) && (A != null || M != null))
            switch (E) {
              case "type":
                u = A;
                break;
              case "name":
                n = A;
                break;
              case "checked":
                p = A;
                break;
              case "defaultChecked":
                T = A;
                break;
              case "value":
                c = A;
                break;
              case "defaultValue":
                i = A;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (A != null)
                  throw Error(r(137, l));
                break;
              default:
                A !== M && Ot(
                  t,
                  l,
                  E,
                  A,
                  a,
                  M
                );
            }
        }
        wc(
          t,
          c,
          i,
          o,
          p,
          T,
          u,
          n
        );
        return;
      case "select":
        A = c = i = E = null;
        for (u in e)
          if (o = e[u], e.hasOwnProperty(u) && o != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                A = o;
              default:
                a.hasOwnProperty(u) || Ot(
                  t,
                  l,
                  u,
                  null,
                  a,
                  o
                );
            }
        for (n in a)
          if (u = a[n], o = e[n], a.hasOwnProperty(n) && (u != null || o != null))
            switch (n) {
              case "value":
                E = u;
                break;
              case "defaultValue":
                i = u;
                break;
              case "multiple":
                c = u;
              default:
                u !== o && Ot(
                  t,
                  l,
                  n,
                  u,
                  a,
                  o
                );
            }
        l = i, e = c, a = A, E != null ? Da(t, !!e, E, !1) : !!a != !!e && (l != null ? Da(t, !!e, l, !0) : Da(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        A = E = null;
        for (i in e)
          if (n = e[i], e.hasOwnProperty(i) && n != null && !a.hasOwnProperty(i))
            switch (i) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ot(t, l, i, null, a, n);
            }
        for (c in a)
          if (n = a[c], u = e[c], a.hasOwnProperty(c) && (n != null || u != null))
            switch (c) {
              case "value":
                E = n;
                break;
              case "defaultValue":
                A = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(r(91));
                break;
              default:
                n !== u && Ot(t, l, c, n, a, u);
            }
        Ns(t, E, A);
        return;
      case "option":
        for (var w in e)
          if (E = e[w], e.hasOwnProperty(w) && E != null && !a.hasOwnProperty(w))
            switch (w) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Ot(
                  t,
                  l,
                  w,
                  null,
                  a,
                  E
                );
            }
        for (o in a)
          if (E = a[o], A = e[o], a.hasOwnProperty(o) && E !== A && (E != null || A != null))
            switch (o) {
              case "selected":
                t.selected = E && typeof E != "function" && typeof E != "symbol";
                break;
              default:
                Ot(
                  t,
                  l,
                  o,
                  E,
                  a,
                  A
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var P in e)
          E = e[P], e.hasOwnProperty(P) && E != null && !a.hasOwnProperty(P) && Ot(t, l, P, null, a, E);
        for (p in a)
          if (E = a[p], A = e[p], a.hasOwnProperty(p) && E !== A && (E != null || A != null))
            switch (p) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (E != null)
                  throw Error(r(137, l));
                break;
              default:
                Ot(
                  t,
                  l,
                  p,
                  E,
                  a,
                  A
                );
            }
        return;
      default:
        if (Zc(l)) {
          for (var jt in e)
            E = e[jt], e.hasOwnProperty(jt) && E !== void 0 && !a.hasOwnProperty(jt) && jf(
              t,
              l,
              jt,
              void 0,
              a,
              E
            );
          for (T in a)
            E = a[T], A = e[T], !a.hasOwnProperty(T) || E === A || E === void 0 && A === void 0 || jf(
              t,
              l,
              T,
              E,
              a,
              A
            );
          return;
        }
    }
    for (var v in e)
      E = e[v], e.hasOwnProperty(v) && E != null && !a.hasOwnProperty(v) && Ot(t, l, v, null, a, E);
    for (M in a)
      E = a[M], A = e[M], !a.hasOwnProperty(M) || E === A || E == null && A == null || Ot(t, l, M, E, a, A);
  }
  function xd(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function f0() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, l = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var n = e[a], u = n.transferSize, c = n.initiatorType, i = n.duration;
        if (u && i && xd(c)) {
          for (c = 0, i = n.responseEnd, a += 1; a < e.length; a++) {
            var o = e[a], p = o.startTime;
            if (p > i) break;
            var T = o.transferSize, M = o.initiatorType;
            T && xd(M) && (o = o.responseEnd, c += T * (o < i ? 1 : (i - p) / (o - p)));
          }
          if (--a, l += 8 * (u + c) / (n.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Df = null, Uf = null;
  function gc(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Cd(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Md(t, l) {
    if (t === 0)
      switch (l) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && l === "foreignObject" ? 0 : t;
  }
  function Lf(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var Hf = null;
  function s0() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Hf ? !1 : (Hf = t, !0) : (Hf = null, !1);
  }
  var Rd = typeof setTimeout == "function" ? setTimeout : void 0, r0 = typeof clearTimeout == "function" ? clearTimeout : void 0, Od = typeof Promise == "function" ? Promise : void 0, o0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Od < "u" ? function(t) {
    return Od.resolve(null).then(t).catch(d0);
  } : Rd;
  function d0(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Ie(t) {
    return t === "head";
  }
  function jd(t, l) {
    var e = l, a = 0;
    do {
      var n = e.nextSibling;
      if (t.removeChild(e), n && n.nodeType === 8)
        if (e = n.data, e === "/$" || e === "/&") {
          if (a === 0) {
            t.removeChild(n), dn(l);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          tu(t.ownerDocument.documentElement);
        else if (e === "head") {
          e = t.ownerDocument.head, tu(e);
          for (var u = e.firstChild; u; ) {
            var c = u.nextSibling, i = u.nodeName;
            u[je] || i === "SCRIPT" || i === "STYLE" || i === "LINK" && u.rel.toLowerCase() === "stylesheet" || e.removeChild(u), u = c;
          }
        } else
          e === "body" && tu(t.ownerDocument.body);
      e = n;
    } while (e);
    dn(l);
  }
  function Dd(t, l) {
    var e = t;
    t = 0;
    do {
      var a = e.nextSibling;
      if (e.nodeType === 1 ? l ? (e._stashedDisplay = e.style.display, e.style.display = "none") : (e.style.display = e._stashedDisplay || "", e.getAttribute("style") === "" && e.removeAttribute("style")) : e.nodeType === 3 && (l ? (e._stashedText = e.nodeValue, e.nodeValue = "") : e.nodeValue = e._stashedText || ""), a && a.nodeType === 8)
        if (e = a.data, e === "/$") {
          if (t === 0) break;
          t--;
        } else
          e !== "$" && e !== "$?" && e !== "$~" && e !== "$!" || t++;
      e = a;
    } while (e);
  }
  function Bf(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var e = l;
      switch (l = l.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Bf(e), De(e);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(e);
    }
  }
  function m0(t, l, e, a) {
    for (; t.nodeType === 1; ) {
      var n = e;
      if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[je])
          switch (l) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (u = t.getAttribute("rel"), u === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (u !== n.rel || t.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || t.getAttribute("title") !== (n.title == null ? null : n.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (u = t.getAttribute("src"), (u !== (n.src == null ? null : n.src) || t.getAttribute("type") !== (n.type == null ? null : n.type) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && u && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (l === "input" && t.type === "hidden") {
        var u = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && t.getAttribute("name") === u)
          return t;
      } else return t;
      if (t = wl(t.nextSibling), t === null) break;
    }
    return null;
  }
  function h0(t, l, e) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = wl(t.nextSibling), t === null)) return null;
    return t;
  }
  function Ud(t, l) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = wl(t.nextSibling), t === null)) return null;
    return t;
  }
  function qf(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Yf(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function y0(t, l) {
    var e = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = l;
    else if (t.data !== "$?" || e.readyState !== "loading")
      l();
    else {
      var a = function() {
        l(), e.removeEventListener("DOMContentLoaded", a);
      };
      e.addEventListener("DOMContentLoaded", a), t._reactRetry = a;
    }
  }
  function wl(t) {
    for (; t != null; t = t.nextSibling) {
      var l = t.nodeType;
      if (l === 1 || l === 3) break;
      if (l === 8) {
        if (l = t.data, l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&" || l === "F!" || l === "F")
          break;
        if (l === "/$" || l === "/&") return null;
      }
    }
    return t;
  }
  var Xf = null;
  function Ld(t) {
    t = t.nextSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "/$" || e === "/&") {
          if (l === 0)
            return wl(t.nextSibling);
          l--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || l++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Hd(t) {
    t = t.previousSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (l === 0) return t;
          l--;
        } else e !== "/$" && e !== "/&" || l++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Bd(t, l, e) {
    switch (l = gc(e), t) {
      case "html":
        if (t = l.documentElement, !t) throw Error(r(452));
        return t;
      case "head":
        if (t = l.head, !t) throw Error(r(453));
        return t;
      case "body":
        if (t = l.body, !t) throw Error(r(454));
        return t;
      default:
        throw Error(r(451));
    }
  }
  function tu(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    De(t);
  }
  var Vl = /* @__PURE__ */ new Map(), qd = /* @__PURE__ */ new Set();
  function bc(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Te = q.d;
  q.d = {
    f: v0,
    r: g0,
    D: b0,
    C: S0,
    L: p0,
    m: E0,
    X: A0,
    S: N0,
    M: _0
  };
  function v0() {
    var t = Te.f(), l = sc();
    return t || l;
  }
  function g0(t) {
    var l = ce(t);
    l !== null && l.tag === 5 && l.type === "form" ? to(l) : Te.r(t);
  }
  var sn = typeof document > "u" ? null : document;
  function Yd(t, l, e) {
    var a = sn;
    if (a && typeof l == "string" && l) {
      var n = Hl(l);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof e == "string" && (n += '[crossorigin="' + e + '"]'), qd.has(n) || (qd.add(n), t = { rel: t, crossOrigin: e, href: l }, a.querySelector(n) === null && (l = a.createElement("link"), dl(l, "link", t), Gt(l), a.head.appendChild(l)));
    }
  }
  function b0(t) {
    Te.D(t), Yd("dns-prefetch", t, null);
  }
  function S0(t, l) {
    Te.C(t, l), Yd("preconnect", t, l);
  }
  function p0(t, l, e) {
    Te.L(t, l, e);
    var a = sn;
    if (a && t && l) {
      var n = 'link[rel="preload"][as="' + Hl(l) + '"]';
      l === "image" && e && e.imageSrcSet ? (n += '[imagesrcset="' + Hl(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (n += '[imagesizes="' + Hl(
        e.imageSizes
      ) + '"]')) : n += '[href="' + Hl(t) + '"]';
      var u = n;
      switch (l) {
        case "style":
          u = rn(t);
          break;
        case "script":
          u = on(t);
      }
      Vl.has(u) || (t = R(
        {
          rel: "preload",
          href: l === "image" && e && e.imageSrcSet ? void 0 : t,
          as: l
        },
        e
      ), Vl.set(u, t), a.querySelector(n) !== null || l === "style" && a.querySelector(lu(u)) || l === "script" && a.querySelector(eu(u)) || (l = a.createElement("link"), dl(l, "link", t), Gt(l), a.head.appendChild(l)));
    }
  }
  function E0(t, l) {
    Te.m(t, l);
    var e = sn;
    if (e && t) {
      var a = l && typeof l.as == "string" ? l.as : "script", n = 'link[rel="modulepreload"][as="' + Hl(a) + '"][href="' + Hl(t) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = on(t);
      }
      if (!Vl.has(u) && (t = R({ rel: "modulepreload", href: t }, l), Vl.set(u, t), e.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(eu(u)))
              return;
        }
        a = e.createElement("link"), dl(a, "link", t), Gt(a), e.head.appendChild(a);
      }
    }
  }
  function N0(t, l, e) {
    Te.S(t, l, e);
    var a = sn;
    if (a && t) {
      var n = Ue(a).hoistableStyles, u = rn(t);
      l = l || "default";
      var c = n.get(u);
      if (!c) {
        var i = { loading: 0, preload: null };
        if (c = a.querySelector(
          lu(u)
        ))
          i.loading = 5;
        else {
          t = R(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = Vl.get(u)) && Gf(t, e);
          var o = c = a.createElement("link");
          Gt(o), dl(o, "link", t), o._p = new Promise(function(p, T) {
            o.onload = p, o.onerror = T;
          }), o.addEventListener("load", function() {
            i.loading |= 1;
          }), o.addEventListener("error", function() {
            i.loading |= 2;
          }), i.loading |= 4, Sc(c, l, a);
        }
        c = {
          type: "stylesheet",
          instance: c,
          count: 1,
          state: i
        }, n.set(u, c);
      }
    }
  }
  function A0(t, l) {
    Te.X(t, l);
    var e = sn;
    if (e && t) {
      var a = Ue(e).hoistableScripts, n = on(t), u = a.get(n);
      u || (u = e.querySelector(eu(n)), u || (t = R({ src: t, async: !0 }, l), (l = Vl.get(n)) && Qf(t, l), u = e.createElement("script"), Gt(u), dl(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function _0(t, l) {
    Te.M(t, l);
    var e = sn;
    if (e && t) {
      var a = Ue(e).hoistableScripts, n = on(t), u = a.get(n);
      u || (u = e.querySelector(eu(n)), u || (t = R({ src: t, async: !0, type: "module" }, l), (l = Vl.get(n)) && Qf(t, l), u = e.createElement("script"), Gt(u), dl(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function Xd(t, l, e, a) {
    var n = (n = et.current) ? bc(n) : null;
    if (!n) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (l = rn(e.href), e = Ue(
          n
        ).hoistableStyles, a = e.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          t = rn(e.href);
          var u = Ue(
            n
          ).hoistableStyles, c = u.get(t);
          if (c || (n = n.ownerDocument || n, c = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, c), (u = n.querySelector(
            lu(t)
          )) && !u._p && (c.instance = u, c.state.loading = 5), Vl.has(t) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Vl.set(t, e), u || T0(
            n,
            t,
            e,
            c.state
          ))), l && a === null)
            throw Error(r(528, ""));
          return c;
        }
        if (l && a !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (l = on(e), e = Ue(
          n
        ).hoistableScripts, a = e.get(l), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, t));
    }
  }
  function rn(t) {
    return 'href="' + Hl(t) + '"';
  }
  function lu(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Gd(t) {
    return R({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function T0(t, l, e, a) {
    t.querySelector('link[rel="preload"][as="style"][' + l + "]") ? a.loading = 1 : (l = t.createElement("link"), a.preload = l, l.addEventListener("load", function() {
      return a.loading |= 1;
    }), l.addEventListener("error", function() {
      return a.loading |= 2;
    }), dl(l, "link", e), Gt(l), t.head.appendChild(l));
  }
  function on(t) {
    return '[src="' + Hl(t) + '"]';
  }
  function eu(t) {
    return "script[async]" + t;
  }
  function Qd(t, l, e) {
    if (l.count++, l.instance === null)
      switch (l.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + Hl(e.href) + '"]'
          );
          if (a)
            return l.instance = a, Gt(a), a;
          var n = R({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), Gt(a), dl(a, "style", n), Sc(a, e.precedence, t), l.instance = a;
        case "stylesheet":
          n = rn(e.href);
          var u = t.querySelector(
            lu(n)
          );
          if (u)
            return l.state.loading |= 4, l.instance = u, Gt(u), u;
          a = Gd(e), (n = Vl.get(n)) && Gf(a, n), u = (t.ownerDocument || t).createElement("link"), Gt(u);
          var c = u;
          return c._p = new Promise(function(i, o) {
            c.onload = i, c.onerror = o;
          }), dl(u, "link", a), l.state.loading |= 4, Sc(u, e.precedence, t), l.instance = u;
        case "script":
          return u = on(e.src), (n = t.querySelector(
            eu(u)
          )) ? (l.instance = n, Gt(n), n) : (a = e, (n = Vl.get(u)) && (a = R({}, e), Qf(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), Gt(n), dl(n, "link", a), t.head.appendChild(n), l.instance = n);
        case "void":
          return null;
        default:
          throw Error(r(443, l.type));
      }
    else
      l.type === "stylesheet" && (l.state.loading & 4) === 0 && (a = l.instance, l.state.loading |= 4, Sc(a, e.precedence, t));
    return l.instance;
  }
  function Sc(t, l, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, c = 0; c < a.length; c++) {
      var i = a[c];
      if (i.dataset.precedence === l) u = i;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (l = e.nodeType === 9 ? e.head : e, l.insertBefore(t, l.firstChild));
  }
  function Gf(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
  }
  function Qf(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var pc = null;
  function wd(t, l, e) {
    if (pc === null) {
      var a = /* @__PURE__ */ new Map(), n = pc = /* @__PURE__ */ new Map();
      n.set(e, a);
    } else
      n = pc, a = n.get(e), a || (a = /* @__PURE__ */ new Map(), n.set(e, a));
    if (a.has(t)) return a;
    for (a.set(t, null), e = e.getElementsByTagName(t), n = 0; n < e.length; n++) {
      var u = e[n];
      if (!(u[je] || u[ot] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var c = u.getAttribute(l) || "";
        c = t + c;
        var i = a.get(c);
        i ? i.push(u) : a.set(c, [u]);
      }
    }
    return a;
  }
  function Vd(t, l, e) {
    t = t.ownerDocument || t, t.head.insertBefore(
      e,
      l === "title" ? t.querySelector("head > title") : null
    );
  }
  function z0(t, l, e) {
    if (e === 1 || l.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof l.precedence != "string" || typeof l.href != "string" || l.href === "")
          break;
        return !0;
      case "link":
        if (typeof l.rel != "string" || typeof l.href != "string" || l.href === "" || l.onLoad || l.onError)
          break;
        switch (l.rel) {
          case "stylesheet":
            return t = l.disabled, typeof l.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (l.async && typeof l.async != "function" && typeof l.async != "symbol" && !l.onLoad && !l.onError && l.src && typeof l.src == "string")
          return !0;
    }
    return !1;
  }
  function Zd(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function x0(t, l, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var n = rn(a.href), u = l.querySelector(
          lu(n)
        );
        if (u) {
          l = u._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = Ec.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = u, Gt(u);
          return;
        }
        u = l.ownerDocument || l, a = Gd(a), (n = Vl.get(n)) && Gf(a, n), u = u.createElement("link"), Gt(u);
        var c = u;
        c._p = new Promise(function(i, o) {
          c.onload = i, c.onerror = o;
        }), dl(u, "link", a), e.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = Ec.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var wf = 0;
  function C0(t, l) {
    return t.stylesheets && t.count === 0 && Ac(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (t.stylesheets && Ac(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + l);
      0 < t.imgBytes && wf === 0 && (wf = 62500 * f0());
      var n = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Ac(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > wf ? 50 : 800) + l
      );
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function Ec() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Ac(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Nc = null;
  function Ac(t, l) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Nc = /* @__PURE__ */ new Map(), l.forEach(M0, t), Nc = null, Ec.call(t));
  }
  function M0(t, l) {
    if (!(l.state.loading & 4)) {
      var e = Nc.get(t);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), Nc.set(t, e);
        for (var n = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var c = n[u];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (e.set(c.dataset.precedence, c), a = c);
        }
        a && e.set(null, a);
      }
      n = l.instance, c = n.getAttribute("data-precedence"), u = e.get(c) || a, u === a && e.set(null, n), e.set(c, n), this.count++, a = Ec.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), l.state.loading |= 4;
    }
  }
  var au = {
    $$typeof: _t,
    Provider: null,
    Consumer: null,
    _currentValue: $,
    _currentValue2: $,
    _threadCount: 0
  };
  function R0(t, l, e, a, n, u, c, i, o) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ja(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ja(0), this.hiddenUpdates = ja(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = o, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Kd(t, l, e, a, n, u, c, i, o, p, T, M) {
    return t = new R0(
      t,
      l,
      e,
      c,
      o,
      p,
      T,
      M,
      i
    ), l = 1, u === !0 && (l |= 24), u = Cl(3, null, null, l), t.current = u, u.stateNode = t, l = Ei(), l.refCount++, t.pooledCache = l, l.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: l
    }, Ti(u), t;
  }
  function kd(t) {
    return t ? (t = Ga, t) : Ga;
  }
  function Jd(t, l, e, a, n, u) {
    n = kd(n), a.context === null ? a.context = n : a.pendingContext = n, a = Ge(l), a.payload = { element: e }, u = u === void 0 ? null : u, u !== null && (a.callback = u), e = Qe(t, a, l), e !== null && (Al(e, t, l), Ln(e, t, l));
  }
  function $d(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function Vf(t, l) {
    $d(t, l), (t = t.alternate) && $d(t, l);
  }
  function Wd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = oa(t, 67108864);
      l !== null && Al(l, t, 67108864), Vf(t, 67108864);
    }
  }
  function Fd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = Dl();
      l = H(l);
      var e = oa(t, l);
      e !== null && Al(e, t, l), Vf(t, l);
    }
  }
  var _c = !0;
  function O0(t, l, e, a) {
    var n = _.T;
    _.T = null;
    var u = q.p;
    try {
      q.p = 2, Zf(t, l, e, a);
    } finally {
      q.p = u, _.T = n;
    }
  }
  function j0(t, l, e, a) {
    var n = _.T;
    _.T = null;
    var u = q.p;
    try {
      q.p = 8, Zf(t, l, e, a);
    } finally {
      q.p = u, _.T = n;
    }
  }
  function Zf(t, l, e, a) {
    if (_c) {
      var n = Kf(a);
      if (n === null)
        Of(
          t,
          l,
          a,
          Tc,
          e
        ), Pd(t, a);
      else if (U0(
        n,
        t,
        l,
        e,
        a
      ))
        a.stopPropagation();
      else if (Pd(t, a), l & 4 && -1 < D0.indexOf(t)) {
        for (; n !== null; ) {
          var u = ce(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var c = Fl(u.pendingLanes);
                  if (c !== 0) {
                    var i = u;
                    for (i.pendingLanes |= 2, i.entangledLanes |= 2; c; ) {
                      var o = 1 << 31 - nl(c);
                      i.entanglements[1] |= o, c &= ~o;
                    }
                    ee(u), (At & 6) === 0 && (ic = wt() + 500, Fn(0));
                  }
                }
                break;
              case 31:
              case 13:
                i = oa(u, 2), i !== null && Al(i, u, 2), sc(), Vf(u, 2);
            }
          if (u = Kf(a), u === null && Of(
            t,
            l,
            a,
            Tc,
            e
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        Of(
          t,
          l,
          a,
          null,
          e
        );
    }
  }
  function Kf(t) {
    return t = kc(t), kf(t);
  }
  var Tc = null;
  function kf(t) {
    if (Tc = null, t = Ul(t), t !== null) {
      var l = D(t);
      if (l === null) t = null;
      else {
        var e = l.tag;
        if (e === 13) {
          if (t = X(l), t !== null) return t;
          t = null;
        } else if (e === 31) {
          if (t = G(l), t !== null) return t;
          t = null;
        } else if (e === 3) {
          if (l.stateNode.current.memoizedState.isDehydrated)
            return l.tag === 3 ? l.stateNode.containerInfo : null;
          t = null;
        } else l !== t && (t = null);
      }
    }
    return Tc = t, null;
  }
  function Id(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (yn()) {
          case za:
            return 2;
          case vn:
            return 8;
          case _l:
          case Re:
            return 32;
          case gn:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Jf = !1, Pe = null, ta = null, la = null, nu = /* @__PURE__ */ new Map(), uu = /* @__PURE__ */ new Map(), ea = [], D0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Pd(t, l) {
    switch (t) {
      case "focusin":
      case "focusout":
        Pe = null;
        break;
      case "dragenter":
      case "dragleave":
        ta = null;
        break;
      case "mouseover":
      case "mouseout":
        la = null;
        break;
      case "pointerover":
      case "pointerout":
        nu.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        uu.delete(l.pointerId);
    }
  }
  function cu(t, l, e, a, n, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: l,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, l !== null && (l = ce(l), l !== null && Wd(l)), t) : (t.eventSystemFlags |= a, l = t.targetContainers, n !== null && l.indexOf(n) === -1 && l.push(n), t);
  }
  function U0(t, l, e, a, n) {
    switch (l) {
      case "focusin":
        return Pe = cu(
          Pe,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "dragenter":
        return ta = cu(
          ta,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "mouseover":
        return la = cu(
          la,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return nu.set(
          u,
          cu(
            nu.get(u) || null,
            t,
            l,
            e,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, uu.set(
          u,
          cu(
            uu.get(u) || null,
            t,
            l,
            e,
            a,
            n
          )
        ), !0;
    }
    return !1;
  }
  function tm(t) {
    var l = Ul(t.target);
    if (l !== null) {
      var e = D(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = X(e), l !== null) {
            t.blockedOn = l, K(t.priority, function() {
              Fd(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = G(e), l !== null) {
            t.blockedOn = l, K(t.priority, function() {
              Fd(e);
            });
            return;
          }
        } else if (l === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function zc(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var e = Kf(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        Kc = a, e.target.dispatchEvent(a), Kc = null;
      } else
        return l = ce(e), l !== null && Wd(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function lm(t, l, e) {
    zc(t) && e.delete(l);
  }
  function L0() {
    Jf = !1, Pe !== null && zc(Pe) && (Pe = null), ta !== null && zc(ta) && (ta = null), la !== null && zc(la) && (la = null), nu.forEach(lm), uu.forEach(lm);
  }
  function xc(t, l) {
    t.blockedOn === l && (t.blockedOn = null, Jf || (Jf = !0, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      L0
    )));
  }
  var Cc = null;
  function em(t) {
    Cc !== t && (Cc = t, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      function() {
        Cc === t && (Cc = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l], a = t[l + 1], n = t[l + 2];
          if (typeof a != "function") {
            if (kf(a || e) === null)
              continue;
            break;
          }
          var u = ce(e);
          u !== null && (t.splice(l, 3), l -= 3, Zi(
            u,
            {
              pending: !0,
              data: n,
              method: e.method,
              action: a
            },
            a,
            n
          ));
        }
      }
    ));
  }
  function dn(t) {
    function l(o) {
      return xc(o, t);
    }
    Pe !== null && xc(Pe, t), ta !== null && xc(ta, t), la !== null && xc(la, t), nu.forEach(l), uu.forEach(l);
    for (var e = 0; e < ea.length; e++) {
      var a = ea[e];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < ea.length && (e = ea[0], e.blockedOn === null); )
      tm(e), e.blockedOn === null && ea.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var n = e[a], u = e[a + 1], c = n[it] || null;
        if (typeof u == "function")
          c || em(e);
        else if (c) {
          var i = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, c = u[it] || null)
              i = c.formAction;
            else if (kf(n) !== null) continue;
          } else i = c.action;
          typeof i == "function" ? e[a + 1] = i : (e.splice(a, 3), a -= 3), em(e);
        }
      }
  }
  function am() {
    function t(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(c) {
            return n = c;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function l() {
      n !== null && (n(), n = null), a || setTimeout(e, 20);
    }
    function e() {
      if (!a && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, n = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", l), navigation.addEventListener("navigateerror", l), setTimeout(e, 100), function() {
        a = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", l), navigation.removeEventListener("navigateerror", l), n !== null && (n(), n = null);
      };
    }
  }
  function $f(t) {
    this._internalRoot = t;
  }
  Mc.prototype.render = $f.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(r(409));
    var e = l.current, a = Dl();
    Jd(e, a, t, l, null, null);
  }, Mc.prototype.unmount = $f.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      Jd(t.current, 2, null, t, null, null), sc(), l[xt] = null;
    }
  };
  function Mc(t) {
    this._internalRoot = t;
  }
  Mc.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = Q();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < ea.length && l !== 0 && l < ea[e].priority; e++) ;
      ea.splice(e, 0, t), e === 0 && tm(t);
    }
  };
  var nm = h.version;
  if (nm !== "19.2.4")
    throw Error(
      r(
        527,
        nm,
        "19.2.4"
      )
    );
  q.findDOMNode = function(t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function" ? Error(r(188)) : (t = Object.keys(t).join(","), Error(r(268, t)));
    return t = g(l), t = t !== null ? L(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var H0 = {
    bundleType: 0,
    version: "19.2.4",
    rendererPackageName: "react-dom",
    currentDispatcherRef: _,
    reconcilerVersion: "19.2.4"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Rc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Rc.isDisabled && Rc.supportsFiber)
      try {
        Oe = Rc.inject(
          H0
        ), Vt = Rc;
      } catch {
      }
  }
  return fu.createRoot = function(t, l) {
    if (!O(t)) throw Error(r(299));
    var e = !1, a = "", n = ro, u = oo, c = mo;
    return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (n = l.onUncaughtError), l.onCaughtError !== void 0 && (u = l.onCaughtError), l.onRecoverableError !== void 0 && (c = l.onRecoverableError)), l = Kd(
      t,
      1,
      !1,
      null,
      null,
      e,
      a,
      null,
      n,
      u,
      c,
      am
    ), t[xt] = l.current, Rf(t), new $f(l);
  }, fu.hydrateRoot = function(t, l, e) {
    if (!O(t)) throw Error(r(299));
    var a = !1, n = "", u = ro, c = oo, i = mo, o = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (c = e.onCaughtError), e.onRecoverableError !== void 0 && (i = e.onRecoverableError), e.formState !== void 0 && (o = e.formState)), l = Kd(
      t,
      1,
      !0,
      l,
      e ?? null,
      a,
      n,
      o,
      u,
      c,
      i,
      am
    ), l.context = kd(null), e = l.current, a = Dl(), a = H(a), n = Ge(a), n.callback = null, Qe(e, n, a), e = a, l.current.lanes = e, ca(l, e), ee(l), t[xt] = l.current, Rf(t), new Mc(l);
  }, fu.version = "19.2.4", fu;
}
var hm;
function K0() {
  if (hm) return Ff.exports;
  hm = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (h) {
        console.error(h);
      }
  }
  return f(), Ff.exports = Z0(), Ff.exports;
}
var k0 = K0(), z = vs();
function J0(f, h = 760) {
  const m = Number(f), r = Number.isFinite(m) ? m : Number.NaN, [O, D] = z.useState(r), X = z.useRef(r), G = z.useRef(0);
  return z.useEffect(() => {
    const C = Number(f);
    if (!Number.isFinite(C)) {
      X.current = Number.NaN, D(Number.NaN);
      return;
    }
    const g = X.current;
    if (X.current = C, !Number.isFinite(g) || Math.abs(g - C) < 1e-9) {
      D(C);
      return;
    }
    const L = performance.now(), R = (I) => 1 - Math.pow(1 - I, 3), B = (I) => {
      const dt = I - L, ut = Math.min(1, dt / h), Lt = R(ut), k = g + (C - g) * Lt;
      D(k), ut < 1 && (G.current = window.requestAnimationFrame(B));
    };
    return G.current = window.requestAnimationFrame(B), () => {
      G.current && window.cancelAnimationFrame(G.current);
    };
  }, [f, h]), O;
}
const gs = ["workspace", "positions", "reports"], ym = "tf.nav.active", vm = "tf.sidebar.collapsed", gm = "tf.theme", bm = {
  trend: {
    name: "하준 PM",
    style: "추세추종 · 강한 모멘텀 위주"
  },
  meanrev: {
    name: "서윤 PM",
    style: "평균회귀 · 과열/과매도 역추세"
  },
  event: {
    name: "민재 PM",
    style: "이벤트 드리븐 · 뉴스/공시 민감"
  },
  unassigned: {
    name: "운용 보조",
    style: "분류 전 포지션"
  }
}, su = {
  "005930": "삼성전자",
  "000660": "SK하이닉스",
  373220: "LG에너지솔루션",
  207940: "삼성바이오로직스",
  "005380": "현대차",
  "035420": "NAVER",
  "051910": "LG화학",
  "068270": "셀트리온",
  "006400": "삼성SDI",
  "003670": "포스코퓨처엠",
  105560: "KB금융",
  "055550": "신한지주",
  "035720": "카카오",
  "028260": "삼성물산",
  "012330": "현대모비스",
  "096770": "SK이노베이션",
  "066570": "LG전자",
  "034730": "SK",
  "017670": "SK텔레콤",
  "000270": "기아",
  "018260": "삼성SDS",
  "015760": "한국전력",
  251270: "넷마블",
  138040: "메리츠금융지주",
  "009150": "삼성전기",
  "011200": "HMM",
  "086790": "하나금융지주",
  "032830": "삼성생명",
  "010130": "고려아연",
  259960: "크래프톤",
  "003550": "LG",
  "047810": "한국항공우주",
  323410: "카카오뱅크",
  "011170": "롯데케미칼",
  "024110": "기업은행",
  267250: "HD현대",
  "042700": "한미반도체",
  336260: "두산퓨얼셀",
  196170: "알테오젠",
  "003490": "대한항공"
}, $0 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}), W0 = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});
async function ae(f, h = {}) {
  const m = await fetch(f, {
    headers: { "Content-Type": "application/json" },
    ...h
  }), r = await m.json();
  if (!m.ok || r.ok === !1)
    throw new Error(r.error || `HTTP ${m.status}`);
  return r;
}
function es(f, h) {
  try {
    const m = window.localStorage.getItem(f);
    return m ?? h;
  } catch {
    return h;
  }
}
function as(f, h) {
  try {
    window.localStorage.setItem(f, h);
  } catch {
  }
}
function Dc(f) {
  const h = String(f || "").replace(/^#/, "").trim();
  return gs.includes(h) ? h : "workspace";
}
function _m(f) {
  return String(f || "").trim().toLowerCase() === "dark" ? "dark" : "light";
}
function F0(f) {
  return _m(f) === "dark" ? { theme: "dark", toolbarbg: "#0f1720" } : { theme: "light", toolbarbg: "#f5f7fa" };
}
function ns(f, h) {
  try {
    const m = new URL(f), r = F0(h);
    return m.searchParams.set("theme", r.theme), m.searchParams.set("toolbarbg", r.toolbarbg), m.toString();
  } catch {
    return f;
  }
}
function I0(f) {
  return String(f || "").toUpperCase().startsWith("KRX:");
}
function $l(f, h) {
  if (f == null || Number.isNaN(Number(f))) return "-";
  const m = Number(f);
  return h === "KRW" ? W0.format(m) : $0.format(m);
}
function ds(f, h) {
  const m = Number(f || 0);
  return Number.isFinite(m) ? m === 0 ? $l(0, h) : `${m > 0 ? "+" : "-"}${$l(Math.abs(m), h)}` : "-";
}
function Uc(f) {
  return f === "kr" ? "KRW" : "USD";
}
function ms(f) {
  const h = Number(f || 0);
  return !Number.isFinite(h) || h === 0 ? "" : h > 0 ? "positive" : "negative";
}
function hs(f) {
  const h = Number(f || 0);
  return Number.isFinite(h) ? h.toLocaleString(void 0, { maximumFractionDigits: 0 }) : "-";
}
function ys(f) {
  if (!f) return "-";
  const h = new Date(f);
  return Number.isNaN(h.getTime()) ? String(f) : h.toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !1
  });
}
function P0(f) {
  return f === "kr" ? "한국" : "미국";
}
function ty(f) {
  return f === "BUY" ? "매수" : f === "SELL" ? "매도" : f || "-";
}
function ru(f) {
  return String(f || "").toUpperCase().replace(/^KRX:/, "").replace(".KS", "").replace(".KQ", "").trim();
}
function ly(f) {
  const h = ru(f), m = su[h];
  return h ? m ? `${m} (${h})` : `한국주식 (${h})` : String(f || "-");
}
function Hc(f, h) {
  return f === "kr" ? ly(h) : String(h || "-").toUpperCase();
}
function ey(f, h) {
  if (f === "kr") {
    const m = ru(h);
    return `KR ${su[m] || m}`;
  }
  return `US ${String(h || "").toUpperCase()}`;
}
function ay(f) {
  const h = String(f || "").trim();
  if (!h) return h;
  const m = Object.entries(su).find(([, O]) => O === h);
  if (m) return m[0];
  const r = Object.entries(su).find(([, O]) => O.includes(h));
  return r ? r[0] : h;
}
function ny(f, h) {
  const m = String(h || "").toUpperCase();
  return f === "kr" ? `KRX:${ru(m)}` : m === "BRK-B" ? "NYSE:BRK.B" : m.includes(":") ? m : `NASDAQ:${m}`;
}
function uy(f, h) {
  const m = String(f || "").toLowerCase().trim(), r = String(h || "").trim();
  return !m || !r ? "" : `/api/logo?${new URLSearchParams({
    market: m,
    symbol: r,
    size: "128"
  }).toString()}`;
}
function cy(f, h) {
  const m = String(f || h || "").replace(/\([^)]*\)/g, "").replace(/[^0-9A-Za-z가-힣]/g, "");
  return m ? m.slice(0, 1).toUpperCase() : "•";
}
function iy(f) {
  const h = Number(f == null ? void 0 : f.price);
  return Number.isFinite(h) ? String((f == null ? void 0 : f.id) || "") === "usdkrw" ? h.toLocaleString("ko-KR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : h.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : "-";
}
function fy(f, h) {
  const m = Number(h);
  if (!Number.isFinite(m)) return "-";
  const O = String((f == null ? void 0 : f.id) || "") === "usdkrw" ? "ko-KR" : "en-US";
  return m.toLocaleString(O, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
function Sm(f, h = 2) {
  const m = Number(f);
  return Number.isFinite(m) ? `${m > 0 ? "+" : ""}${m.toLocaleString("en-US", {
    minimumFractionDigits: h,
    maximumFractionDigits: h
  })}` : "-";
}
function sy(f, h = 112, m = 34, r = 2) {
  const O = (f || []).map((k) => Number(k)).filter((k) => Number.isFinite(k));
  if (!O.length || O.length === 1) {
    const k = Math.round(m / 2);
    return {
      linePath: `M0 ${k} L${h} ${k}`,
      areaPath: `M0 ${k} L${h} ${k} L${h} ${m} L0 ${m} Z`
    };
  }
  const D = Math.min(...O), X = Math.max(...O), G = X - D || 1, C = Math.max(1, h - r * 2), g = Math.max(1, m - r * 2), L = C / (O.length - 1), R = O.map((k, lt) => {
    const _t = r + L * lt, Tt = r + (X - k) / G * g;
    return {
      x: Number.isFinite(_t) ? _t : 0,
      y: Number.isFinite(Tt) ? Tt : m / 2
    };
  }), B = R.map((k, lt) => `${lt === 0 ? "M" : "L"}${k.x.toFixed(2)} ${k.y.toFixed(2)}`).join(" "), I = R[0], dt = R[R.length - 1], ut = m - 1, Lt = `${B} L${dt.x.toFixed(2)} ${ut} L${I.x.toFixed(2)} ${ut} Z`;
  return { linePath: B, areaPath: Lt };
}
function ry(f) {
  return f === "up" ? {
    top: "rgba(240, 68, 82, 0.22)",
    bottom: "rgba(240, 68, 82, 0.01)"
  } : f === "down" ? {
    top: "rgba(63, 124, 255, 0.22)",
    bottom: "rgba(63, 124, 255, 0.01)"
  } : {
    top: "rgba(130, 149, 173, 0.20)",
    bottom: "rgba(130, 149, 173, 0.01)"
  };
}
function oy(f) {
  const h = String(f || "").trim().toLowerCase();
  return h === "live" ? "live" : h === "holiday" ? "holiday" : h === "closed" ? "closed" : h === "delayed" ? "delayed" : "";
}
function us({ item: f, field: h }) {
  const r = Number(h === "change_pct_abs" ? f == null ? void 0 : f.change_pct : f == null ? void 0 : f[h]), O = J0(r, 760);
  return Number.isFinite(r) ? h === "price" ? fy(f, O) : h === "change" ? Sm(O, 2) : h === "change_pct" ? `${Sm(O, 2)}%` : h === "change_pct_abs" ? `${Math.abs(O).toFixed(2)}%` : String(O) : h === "price" ? "-" : "";
}
function dy({ item: f, index: h, onSelectItem: m }) {
  const r = String((f == null ? void 0 : f.direction) || "flat"), O = r === "up" ? "up" : r === "down" ? "down" : "flat", D = Number.isFinite(Number(f == null ? void 0 : f.change)) && Number.isFinite(Number(f == null ? void 0 : f.change_pct)), X = O === "up" ? "▲" : O === "down" ? "▼" : "•", G = typeof m == "function", C = z.useMemo(() => sy((f == null ? void 0 : f.sparkline) || []), [f == null ? void 0 : f.sparkline]), g = z.useMemo(() => ry(O), [O]), L = z.useMemo(
    () => `macroGrad-${String((f == null ? void 0 : f.id) || h).replace(/[^A-Za-z0-9_-]/g, "")}-${h}`,
    [f == null ? void 0 : f.id, h]
  ), R = String((f == null ? void 0 : f.session_label) || "").trim(), B = oy(f == null ? void 0 : f.session_status), I = () => {
    G && m(f);
  }, dt = (ut) => {
    G && (ut.key === "Enter" || ut.key === " ") && (ut.preventDefault(), m(f));
  };
  return /* @__PURE__ */ s.jsxs(
    "article",
    {
      className: `macro-card ${O}${G ? " interactive" : ""}`,
      role: G ? "button" : void 0,
      tabIndex: G ? 0 : void 0,
      onClick: G ? I : void 0,
      onKeyDown: G ? dt : void 0,
      "aria-label": G ? `${String((f == null ? void 0 : f.label) || "")} 차트 보기` : void 0,
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "macro-spark", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 112 34", preserveAspectRatio: "none", "aria-hidden": "true", children: [
          /* @__PURE__ */ s.jsx("defs", { children: /* @__PURE__ */ s.jsxs("linearGradient", { id: L, x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ s.jsx("stop", { offset: "0%", stopColor: g.top }),
            /* @__PURE__ */ s.jsx("stop", { offset: "100%", stopColor: g.bottom })
          ] }) }),
          /* @__PURE__ */ s.jsx("path", { className: "macro-area", d: C.areaPath, fill: `url(#${L})` }),
          /* @__PURE__ */ s.jsx("path", { className: "macro-line", d: C.linePath })
        ] }) }),
        /* @__PURE__ */ s.jsxs("div", { className: "macro-main", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "macro-head", children: [
            /* @__PURE__ */ s.jsx("span", { className: "macro-label", children: String((f == null ? void 0 : f.label) || "-") }),
            R ? /* @__PURE__ */ s.jsx("span", { className: `macro-badge ${B}`, children: R }) : null
          ] }),
          /* @__PURE__ */ s.jsx("strong", { className: "macro-price", children: /* @__PURE__ */ s.jsx("span", { className: "macro-num macro-price-num", "data-indicator-id": (f == null ? void 0 : f.id) || "", "data-field": "price", children: Number.isFinite(Number(f == null ? void 0 : f.price)) ? /* @__PURE__ */ s.jsx(us, { item: f, field: "price" }) : iy(f) }) }),
          D ? /* @__PURE__ */ s.jsxs("p", { className: "macro-change", children: [
            /* @__PURE__ */ s.jsx("span", { className: "macro-num macro-change-value", "data-indicator-id": (f == null ? void 0 : f.id) || "", "data-field": "change", children: /* @__PURE__ */ s.jsx(us, { item: f, field: "change" }) }),
            /* @__PURE__ */ s.jsxs("span", { className: `macro-change-pill ${O}`, children: [
              /* @__PURE__ */ s.jsx("span", { className: "macro-change-pill-icon", "aria-hidden": "true", children: X }),
              /* @__PURE__ */ s.jsx("span", { className: "macro-num macro-change-pct", "data-indicator-id": (f == null ? void 0 : f.id) || "", "data-field": "change_pct", children: /* @__PURE__ */ s.jsx(us, { item: f, field: "change_pct_abs" }) })
            ] })
          ] }) : /* @__PURE__ */ s.jsx("p", { className: "macro-change macro-change-empty", children: "변동 정보 없음" })
        ] })
      ]
    }
  );
}
function my({ index: f }) {
  return /* @__PURE__ */ s.jsxs("article", { className: "macro-card macro-card-skeleton", "aria-hidden": "true", "data-skeleton-index": f, children: [
    /* @__PURE__ */ s.jsx("div", { className: "macro-spark", children: /* @__PURE__ */ s.jsx("div", { className: "macro-skel macro-skel-spark" }) }),
    /* @__PURE__ */ s.jsxs("div", { className: "macro-main", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "macro-head", children: [
        /* @__PURE__ */ s.jsx("span", { className: "macro-skel macro-skel-label" }),
        /* @__PURE__ */ s.jsx("span", { className: "macro-skel macro-skel-badge" })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "macro-skel macro-skel-price" }),
      /* @__PURE__ */ s.jsx("div", { className: "macro-skel macro-skel-change" })
    ] })
  ] });
}
const hy = 8;
function yy({ items: f, loading: h = !1, onSelectItem: m }) {
  return h && !(f != null && f.length) ? /* @__PURE__ */ s.jsx(s.Fragment, { children: Array.from({ length: hy }).map((r, O) => /* @__PURE__ */ s.jsx(my, { index: O }, `macro-skeleton-${O}`)) }) : f != null && f.length ? /* @__PURE__ */ s.jsx(s.Fragment, { children: f.map((r, O) => /* @__PURE__ */ s.jsx(
    dy,
    {
      item: r,
      index: O,
      onSelectItem: m
    },
    (r == null ? void 0 : r.id) || `${(r == null ? void 0 : r.label) || "item"}-${O}`
  )) }) : /* @__PURE__ */ s.jsx("div", { className: "macro-empty", children: "핵심 지표를 불러오지 못했습니다." });
}
const Tm = {
  workspace: "워크스페이스",
  positions: "포지션",
  reports: "리포트"
};
function vy({ activeNav: f, onChangeNav: h }) {
  return /* @__PURE__ */ s.jsxs("aside", { id: "sidebarNav", className: "sidebar-nav", children: [
    /* @__PURE__ */ s.jsx("p", { className: "sidebar-title", children: "메뉴" }),
    /* @__PURE__ */ s.jsx("nav", { className: "sidebar-menu", "aria-label": "주요 메뉴", children: gs.map((m) => /* @__PURE__ */ s.jsx(
      "button",
      {
        type: "button",
        "data-nav": m,
        className: `nav-link ${f === m ? "active" : ""}`,
        onClick: () => h(m),
        children: Tm[m]
      },
      `sidebar-${m}`
    )) })
  ] });
}
function gy({ activeNav: f, onChangeNav: h }) {
  return /* @__PURE__ */ s.jsx("nav", { id: "mobileTabBar", className: "mobile-tabbar", "aria-label": "하단 탭 메뉴", children: gs.map((m) => /* @__PURE__ */ s.jsx(
    "button",
    {
      type: "button",
      "data-nav": m,
      className: f === m ? "active" : "",
      onClick: () => h(m),
      children: Tm[m]
    },
    `mobile-${m}`
  )) });
}
function zm({ market: f, symbol: h, seedLabel: m }) {
  const [r, O] = z.useState(!1), D = z.useMemo(() => uy(f, h), [f, h]), X = z.useMemo(() => cy(m, h), [m, h]);
  return !D || r ? /* @__PURE__ */ s.jsx("span", { className: "stock-icon fallback", children: X }) : /* @__PURE__ */ s.jsx("span", { className: "stock-icon", children: /* @__PURE__ */ s.jsx(
    "img",
    {
      src: D,
      alt: `${m || h || "종목"} 로고`,
      loading: "lazy",
      decoding: "async",
      referrerPolicy: "no-referrer",
      onError: () => O(!0)
    }
  ) });
}
function Bc({ market: f, symbol: h, label: m, iconSeedLabel: r }) {
  return /* @__PURE__ */ s.jsxs("span", { className: "stock-inline", children: [
    /* @__PURE__ */ s.jsx(zm, { market: f, symbol: h, seedLabel: r || m }),
    /* @__PURE__ */ s.jsx("span", { className: "stock-name", children: m })
  ] });
}
function by({ active: f, positions: h, recentFills: m, agentExposure: r, onClickPositionSymbol: O }) {
  return /* @__PURE__ */ s.jsx("section", { id: "view-positions", className: `view-pane ${f ? "active" : ""}`, children: /* @__PURE__ */ s.jsxs("div", { className: "stack-grid", children: [
    /* @__PURE__ */ s.jsxs("section", { className: "module position-module", children: [
      /* @__PURE__ */ s.jsx("h2", { children: "보유 포지션" }),
      /* @__PURE__ */ s.jsx("div", { className: "table-wrap", children: /* @__PURE__ */ s.jsxs("table", { children: [
        /* @__PURE__ */ s.jsx("thead", { children: /* @__PURE__ */ s.jsxs("tr", { children: [
          /* @__PURE__ */ s.jsx("th", { children: "종목" }),
          /* @__PURE__ */ s.jsx("th", { children: "수량" }),
          /* @__PURE__ */ s.jsx("th", { children: "노출금액" }),
          /* @__PURE__ */ s.jsx("th", { children: "평가손익" })
        ] }) }),
        /* @__PURE__ */ s.jsx("tbody", { id: "openPositionRows", children: h != null && h.length ? h.slice(0, 80).map((D, X) => {
          const G = Hc(D.market, D.symbol), C = Uc(D.market);
          return /* @__PURE__ */ s.jsxs("tr", { children: [
            /* @__PURE__ */ s.jsx("td", { children: /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "symbol-link",
                title: G,
                onClick: () => O(D),
                children: /* @__PURE__ */ s.jsx(Bc, { market: D.market, symbol: D.symbol, label: G })
              }
            ) }),
            /* @__PURE__ */ s.jsx("td", { children: hs(D.qty) }),
            /* @__PURE__ */ s.jsx("td", { children: $l(D.notional, C) }),
            /* @__PURE__ */ s.jsx("td", { className: ms(D.unrealized_pnl), children: ds(D.unrealized_pnl, C) })
          ] }, `${D.market}-${D.symbol}-${X}`);
        }) : /* @__PURE__ */ s.jsx("tr", { children: /* @__PURE__ */ s.jsx("td", { colSpan: 4, children: "보유 포지션 없음" }) }) })
      ] }) })
    ] }),
    /* @__PURE__ */ s.jsxs("section", { className: "module fill-module", children: [
      /* @__PURE__ */ s.jsx("h2", { children: "투자 내역" }),
      /* @__PURE__ */ s.jsx("div", { className: "table-wrap", children: /* @__PURE__ */ s.jsxs("table", { children: [
        /* @__PURE__ */ s.jsx("thead", { children: /* @__PURE__ */ s.jsxs("tr", { children: [
          /* @__PURE__ */ s.jsx("th", { children: "시간" }),
          /* @__PURE__ */ s.jsx("th", { children: "종목" }),
          /* @__PURE__ */ s.jsx("th", { children: "방향" }),
          /* @__PURE__ */ s.jsx("th", { children: "수량" }),
          /* @__PURE__ */ s.jsx("th", { children: "가격" })
        ] }) }),
        /* @__PURE__ */ s.jsx("tbody", { id: "recentFillRows", children: m != null && m.length ? m.slice(0, 100).map((D, X) => {
          const G = Uc(D.market), C = Hc(D.market, D.symbol), g = ys(D.ts);
          return /* @__PURE__ */ s.jsxs("tr", { children: [
            /* @__PURE__ */ s.jsx("td", { title: g, children: g }),
            /* @__PURE__ */ s.jsx("td", { title: C, children: /* @__PURE__ */ s.jsx(Bc, { market: D.market, symbol: D.symbol, label: C }) }),
            /* @__PURE__ */ s.jsx("td", { children: ty(D.side) }),
            /* @__PURE__ */ s.jsx("td", { children: hs(D.qty) }),
            /* @__PURE__ */ s.jsx("td", { children: $l(D.price, G) })
          ] }, `${D.market}-${D.symbol}-${D.ts || X}`);
        }) : /* @__PURE__ */ s.jsx("tr", { children: /* @__PURE__ */ s.jsx("td", { colSpan: 5, children: "체결 내역 없음" }) }) })
      ] }) })
    ] }),
    /* @__PURE__ */ s.jsxs("section", { className: "module agent-module", children: [
      /* @__PURE__ */ s.jsx("h2", { children: "직원별 투자 현황" }),
      /* @__PURE__ */ s.jsx("div", { className: "table-wrap", children: /* @__PURE__ */ s.jsxs("table", { children: [
        /* @__PURE__ */ s.jsx("thead", { children: /* @__PURE__ */ s.jsxs("tr", { children: [
          /* @__PURE__ */ s.jsx("th", { children: "직원" }),
          /* @__PURE__ */ s.jsx("th", { children: "시장" }),
          /* @__PURE__ */ s.jsx("th", { children: "노출금액" }),
          /* @__PURE__ */ s.jsx("th", { children: "손익" }),
          /* @__PURE__ */ s.jsx("th", { children: "투자 성향" })
        ] }) }),
        /* @__PURE__ */ s.jsx("tbody", { id: "agentExposureRows", children: r != null && r.length ? r.slice(0, 40).map((D, X) => {
          const G = bm[D.strategy] || bm.unassigned, C = Uc(D.market);
          return /* @__PURE__ */ s.jsxs("tr", { children: [
            /* @__PURE__ */ s.jsx("td", { children: G.name }),
            /* @__PURE__ */ s.jsx("td", { children: P0(D.market) }),
            /* @__PURE__ */ s.jsx("td", { children: $l(D.notional, C) }),
            /* @__PURE__ */ s.jsx("td", { className: ms(D.pnl), children: ds(D.pnl, C) }),
            /* @__PURE__ */ s.jsx("td", { children: G.style })
          ] }, `${D.strategy}-${D.market}-${X}`);
        }) : /* @__PURE__ */ s.jsx("tr", { children: /* @__PURE__ */ s.jsx("td", { colSpan: 5, children: "데이터 없음" }) }) })
      ] }) })
    ] })
  ] }) });
}
function Sy({
  active: f,
  reports: h,
  selectedReport: m,
  reportContent: r,
  operationLog: O,
  onChangeReport: D,
  onReloadReport: X
}) {
  return /* @__PURE__ */ s.jsx("section", { id: "view-reports", className: `view-pane ${f ? "active" : ""}`, children: /* @__PURE__ */ s.jsxs("div", { className: "stack-grid", children: [
    /* @__PURE__ */ s.jsxs("section", { className: "module report-module", children: [
      /* @__PURE__ */ s.jsx("h2", { children: "일일 보고서" }),
      /* @__PURE__ */ s.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ s.jsx("select", { id: "reportSelector", value: m, onChange: (G) => D(G.target.value), children: h.map((G) => /* @__PURE__ */ s.jsx("option", { value: G, children: G }, G)) }),
        /* @__PURE__ */ s.jsx("button", { className: "btn", id: "reloadReport", type: "button", onClick: X, children: "불러오기" })
      ] }),
      /* @__PURE__ */ s.jsx("pre", { id: "reportViewer", children: r || "보고서를 불러오는 중..." })
    ] }),
    /* @__PURE__ */ s.jsxs("section", { className: "module log-module", children: [
      /* @__PURE__ */ s.jsx("h2", { children: "운영 로그" }),
      /* @__PURE__ */ s.jsx("pre", { id: "operationLog", children: O || "준비 완료." })
    ] })
  ] }) });
}
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xm = (...f) => f.filter((h, m, r) => !!h && h.trim() !== "" && r.indexOf(h) === m).join(" ").trim();
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const py = (f) => f.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ey = (f) => f.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (h, m, r) => r ? r.toUpperCase() : m.toLowerCase()
);
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pm = (f) => {
  const h = Ey(f);
  return h.charAt(0).toUpperCase() + h.slice(1);
};
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Ny = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ay = (f) => {
  for (const h in f)
    if (h.startsWith("aria-") || h === "role" || h === "title")
      return !0;
  return !1;
};
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _y = z.forwardRef(
  ({
    color: f = "currentColor",
    size: h = 24,
    strokeWidth: m = 2,
    absoluteStrokeWidth: r,
    className: O = "",
    children: D,
    iconNode: X,
    ...G
  }, C) => z.createElement(
    "svg",
    {
      ref: C,
      ...Ny,
      width: h,
      height: h,
      stroke: f,
      strokeWidth: r ? Number(m) * 24 / Number(h) : m,
      className: xm("lucide", O),
      ...!D && !Ay(G) && { "aria-hidden": "true" },
      ...G
    },
    [
      ...X.map(([g, L]) => z.createElement(g, L)),
      ...Array.isArray(D) ? D : [D]
    ]
  )
);
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const na = (f, h) => {
  const m = z.forwardRef(
    ({ className: r, ...O }, D) => z.createElement(_y, {
      ref: D,
      iconNode: h,
      className: xm(
        `lucide-${py(pm(f))}`,
        `lucide-${f}`,
        r
      ),
      ...O
    })
  );
  return m.displayName = pm(f), m;
};
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ty = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], zy = na("circle-alert", Ty);
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xy = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], Cy = na("circle-check", xy);
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const My = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 6v6h4", key: "135r8i" }]
], Ry = na("clock-3", My);
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oy = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], jy = na("loader-circle", Oy);
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dy = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
], Uy = na("menu", Dy);
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ly = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
], Hy = na("moon", Ly);
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const By = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], qy = na("refresh-cw", By);
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yy = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], Xy = na("sun", Yy);
function Gy({
  theme: f,
  onToggleTheme: h,
  onRefreshAll: m,
  sidebarCollapsed: r,
  onToggleSidebar: O
}) {
  const D = f === "dark", [X, G] = z.useState(() => /* @__PURE__ */ new Date()), [C, g] = z.useState(!1), [L, R] = z.useState({ type: "idle", text: "" }), B = z.useRef(null), dt = z.useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone || "", []) === "Asia/Seoul" ? "KST" : "LOCAL", ut = z.useMemo(() => X.toLocaleString("ko-KR"), [X]);
  z.useEffect(() => {
    const lt = window.setInterval(() => {
      G(/* @__PURE__ */ new Date());
    }, 1e3);
    return () => window.clearInterval(lt);
  }, []), z.useEffect(() => () => {
    B.current && window.clearTimeout(B.current);
  }, []);
  const Lt = (lt, _t, Tt = 1500) => {
    B.current && (window.clearTimeout(B.current), B.current = null), R({ type: lt, text: _t }), Tt > 0 && (B.current = window.setTimeout(() => {
      B.current = null, R({ type: "idle", text: "" });
    }, Tt));
  }, k = async () => {
    if (!C) {
      g(!0), Lt("loading", "동기화 중...", 0);
      try {
        await Promise.resolve(m == null ? void 0 : m()), Lt("success", "동기화 완료", 1600);
      } catch {
        Lt("error", "새로고침 실패", 2400);
      } finally {
        g(!1);
      }
    }
  };
  return /* @__PURE__ */ s.jsxs("header", { className: "topbar", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "brand-wrap", children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          id: "sidebarToggle",
          className: `sidebar-toggle ${r ? "active" : ""}`,
          type: "button",
          "aria-label": r ? "사이드바 펼치기" : "사이드바 접기",
          onClick: O,
          children: /* @__PURE__ */ s.jsx(Uy, { className: "topbar-btn-icon", "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ s.jsx("img", { className: "brand-mark", src: "/static/favicon.svg?v=20260302b", alt: "Ryong Investment logo" }),
      /* @__PURE__ */ s.jsx("strong", { className: "brand-title", children: "Ryong Investment" })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "status-wrap", children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          className: `btn theme-icon-btn ${D ? "active" : ""}`,
          id: "themeToggle",
          type: "button",
          "aria-label": D ? "라이트 모드로 전환" : "다크 모드로 전환",
          "aria-pressed": D ? "true" : "false",
          onClick: h,
          children: D ? /* @__PURE__ */ s.jsx(Xy, { className: "topbar-btn-icon", "aria-hidden": "true" }) : /* @__PURE__ */ s.jsx(Hy, { className: "topbar-btn-icon", "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ s.jsxs("div", { className: "refresh-action", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            className: "btn refresh-icon-btn",
            id: "refreshAll",
            type: "button",
            "aria-label": "데이터 새로고침",
            onClick: k,
            disabled: C,
            children: /* @__PURE__ */ s.jsx(qy, { className: `topbar-btn-icon ${C ? "is-spinning" : ""}`, "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `topbar-feedback ${L.type !== "idle" ? "show" : ""} ${L.type}`,
            role: "status",
            "aria-live": "polite",
            "aria-atomic": "true",
            children: [
              L.type === "loading" ? /* @__PURE__ */ s.jsx(jy, { className: "topbar-feedback-icon is-spinning", "aria-hidden": "true" }) : null,
              L.type === "success" ? /* @__PURE__ */ s.jsx(Cy, { className: "topbar-feedback-icon", "aria-hidden": "true" }) : null,
              L.type === "error" ? /* @__PURE__ */ s.jsx(zy, { className: "topbar-feedback-icon", "aria-hidden": "true" }) : null,
              /* @__PURE__ */ s.jsx("span", { children: L.text })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "topbar-clock", id: "localClock", title: ut, children: [
        /* @__PURE__ */ s.jsx("span", { className: "topbar-clock-icon", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx(Ry, { className: "topbar-btn-icon", "aria-hidden": "true" }) }),
        /* @__PURE__ */ s.jsxs("span", { className: "topbar-clock-main", children: [
          /* @__PURE__ */ s.jsx("span", { className: "topbar-clock-zone", children: dt }),
          /* @__PURE__ */ s.jsx("span", { className: "topbar-clock-text", children: ut })
        ] })
      ] })
    ] })
  ] });
}
const Qy = /* @__PURE__ */ new Set([
  "NASDAQ",
  "NYSE",
  "AMEX",
  "ARCA",
  "BATS",
  "OTC"
]), wy = /* @__PURE__ */ new Set([
  "FX_IDC:USDKRW",
  "SP:SPX",
  "DJ:DJI",
  "TVC:VIX",
  "TVC:KOSPI",
  "TVC:KOSDAQ",
  "NASDAQ:IXIC",
  "CME_MINI:NQ1!"
]);
function Vy(f, h) {
  const m = String(h || "차트").trim() || "차트", r = String(f || "").trim();
  if (!r) return { market: "", symbol: "", seedLabel: m };
  const O = r.toUpperCase();
  if (/^\d{6}$/.test(O))
    return { market: "kr", symbol: O, seedLabel: m };
  if (O.startsWith("KRX:") || O.endsWith(".KS") || O.endsWith(".KQ"))
    return { market: "kr", symbol: ru(O) || O, seedLabel: m };
  if (!O.includes(":"))
    return /^[A-Z][A-Z0-9.-]{0,9}$/.test(O) ? { market: "us", symbol: O, seedLabel: m } : { market: "", symbol: "", seedLabel: m };
  const [D, X] = O.split(":", 2), G = String(D || "").trim(), C = String(X || "").trim();
  return !C || wy.has(`${G}:${C}`) ? { market: "", symbol: "", seedLabel: m } : Qy.has(G) ? { market: "us", symbol: C, seedLabel: m } : { market: "", symbol: "", seedLabel: m };
}
function Zy({ row: f, label: h, onClick: m, className: r = "symbol-link" }) {
  return /* @__PURE__ */ s.jsx("button", { type: "button", className: r, title: h, onClick: m, children: /* @__PURE__ */ s.jsx(Bc, { market: f.market, symbol: f.symbol, label: h }) });
}
function Ky({
  active: f,
  symbolInput: h,
  onChangeSymbolInput: m,
  onSubmitSymbol: r,
  currentSymbol: O,
  openTradingViewUrl: D,
  tvWidgetUrl: X,
  chartRenderer: G,
  localChartTitle: C,
  localChartMeta: g,
  localChartInterval: L,
  localChartIntervalOptions: R,
  onChangeLocalChartInterval: B,
  localChartCanvasRef: I,
  localChartViewportRef: dt,
  quickSymbols: ut,
  onClickQuickSymbol: Lt,
  overview: k,
  portfolioTotals: lt,
  positions: _t,
  onClickPositionSymbol: Tt
}) {
  const Ht = ((k == null ? void 0 : k.accounts) || []).find((b) => b.market === "us"), zt = ((k == null ? void 0 : k.accounts) || []).find((b) => b.market === "kr"), ct = (k == null ? void 0 : k.metrics) || {}, kt = (_t || []).slice(0, 5), cl = z.useMemo(() => R || [], [R]), gl = String(L || "30m"), ml = z.useMemo(
    () => Vy(O, C),
    [O, C]
  ), Qt = z.useRef(null), Dt = z.useRef({}), [il, Wt] = z.useState(() => ({
    x: 0,
    width: 0,
    ready: !1
  })), _ = Number((lt == null ? void 0 : lt.usdkrw) || 0).toLocaleString(void 0, { maximumFractionDigits: 2 }), q = lt != null && lt.fx_stale ? "지연" : "실시간", $ = lt != null && lt.fx_source ? `, ${lt.fx_source}` : "", W = lt != null && lt.fx_quote_time_utc ? `, ${ys(lt.fx_quote_time_utc)}` : "", Et = z.useCallback(
    (b) => (U) => {
      b && (U ? Dt.current[b] = U : delete Dt.current[b]);
    },
    []
  ), d = z.useCallback(() => {
    const b = Qt.current, U = Dt.current[gl];
    if (!b || !U) {
      Wt((nt) => nt.ready ? { x: 0, width: 0, ready: !1 } : nt);
      return;
    }
    const Y = b.getBoundingClientRect(), F = U.getBoundingClientRect(), et = Math.max(0, F.left - Y.left), tt = Math.max(0, F.width);
    Wt((nt) => nt.ready && Math.abs(nt.x - et) < 0.25 && Math.abs(nt.width - tt) < 0.25 ? nt : {
      x: et,
      width: tt,
      ready: tt > 0
    });
  }, [gl]);
  return z.useLayoutEffect(() => {
    d();
  }, [d, cl.length]), z.useEffect(() => {
    const b = Qt.current;
    if (!b) return;
    const U = () => d();
    window.addEventListener("resize", U);
    let Y = null;
    return typeof ResizeObserver < "u" && (Y = new ResizeObserver(() => d()), Y.observe(b)), () => {
      window.removeEventListener("resize", U), Y && Y.disconnect();
    };
  }, [d]), /* @__PURE__ */ s.jsx("section", { id: "view-workspace", className: `view-pane ${f ? "active" : ""}`, children: /* @__PURE__ */ s.jsxs("div", { className: "workspace-grid", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "workspace-main", children: [
      /* @__PURE__ */ s.jsxs("section", { className: "module chart-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "chart-toolbar", children: [
          /* @__PURE__ */ s.jsxs("form", { id: "symbolSearchForm", className: "symbol-form", onSubmit: r, children: [
            /* @__PURE__ */ s.jsx(
              "input",
              {
                id: "symbolInput",
                type: "text",
                placeholder: "AAPL / NASDAQ:AAPL / 005930",
                autoComplete: "off",
                value: h,
                onChange: (b) => m(b.target.value)
              }
            ),
            /* @__PURE__ */ s.jsx("button", { className: "btn accent", type: "submit", children: "차트 불러오기" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "chart-links", children: [
            /* @__PURE__ */ s.jsx("span", { id: "currentSymbol", className: "symbol-badge", children: O || "NASDAQ:AAPL" }),
            /* @__PURE__ */ s.jsx("a", { id: "openTradingView", href: D || "#", target: "_blank", rel: "noopener noreferrer", children: "트레이딩뷰 열기" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "symbol-quick-list", id: "symbolQuickList", children: (ut != null && ut.length ? ut : [{ market: "us", symbol: "AAPL", tv_symbol: "NASDAQ:AAPL" }]).map((b) => {
          const U = ey(b.market, b.symbol);
          return /* @__PURE__ */ s.jsx(
            "button",
            {
              className: "sym-chip",
              type: "button",
              onClick: () => Lt(b.tv_symbol || b.symbol, b),
              children: /* @__PURE__ */ s.jsx(
                Bc,
                {
                  market: b.market,
                  symbol: b.symbol,
                  label: U,
                  iconSeedLabel: Hc(b.market, b.symbol)
                }
              )
            },
            `${b.market}-${b.symbol}-${b.tv_symbol || ""}`
          );
        }) })
      ] }),
      /* @__PURE__ */ s.jsxs("section", { className: "module chart-stage", children: [
        /* @__PURE__ */ s.jsx(
          "iframe",
          {
            id: "tvChartFrame",
            title: "TradingView Chart",
            loading: "lazy",
            referrerPolicy: "no-referrer-when-downgrade",
            className: G === "local" ? "is-hidden" : "",
            src: X || ""
          }
        ),
        /* @__PURE__ */ s.jsxs("section", { id: "localChartShell", className: `local-chart-shell ${G === "local" ? "active" : ""}`, "aria-label": "로컬 캔들 차트", children: [
          /* @__PURE__ */ s.jsxs("header", { className: "local-chart-top", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "local-chart-identity", children: [
              /* @__PURE__ */ s.jsx("span", { className: "local-chart-identity-icon", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx(
                zm,
                {
                  market: ml.market,
                  symbol: ml.symbol,
                  seedLabel: ml.seedLabel
                }
              ) }),
              /* @__PURE__ */ s.jsx("span", { id: "localChartTitle", className: "local-chart-title", children: C || "차트" })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "local-chart-interval-group", children: [
              /* @__PURE__ */ s.jsx("span", { className: "local-chart-interval-label", children: "주기" }),
              /* @__PURE__ */ s.jsxs(
                "div",
                {
                  id: "localChartIntervalSelect",
                  className: "local-chart-interval-tabs",
                  role: "tablist",
                  "aria-label": "차트 주기 선택",
                  ref: Qt,
                  children: [
                    /* @__PURE__ */ s.jsx(
                      "span",
                      {
                        className: `local-chart-interval-indicator ${il.ready ? "ready" : ""}`,
                        "aria-hidden": "true",
                        style: {
                          "--interval-tab-x": `${il.x}px`,
                          "--interval-tab-width": `${il.width}px`
                        }
                      }
                    ),
                    cl.map((b) => /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        ref: Et(b.value),
                        type: "button",
                        role: "tab",
                        "aria-selected": gl === b.value,
                        className: `local-chart-interval-tab ${gl === b.value ? "active" : ""}`,
                        onClick: () => B == null ? void 0 : B(b.value),
                        children: b.label
                      },
                      b.value
                    ))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "local-chart-meta-wrap", children: /* @__PURE__ */ s.jsx("span", { id: "localChartMeta", className: "local-chart-meta", children: g || "데이터 로딩 중..." }) })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "local-chart-canvas-wrap", ref: dt, children: /* @__PURE__ */ s.jsx("div", { id: "localChartCanvas", className: "local-chart-canvas", ref: I }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("aside", { className: "workspace-side", children: [
      /* @__PURE__ */ s.jsxs("section", { className: "module metrics-module", children: [
        /* @__PURE__ */ s.jsxs("header", { className: "panel-head", children: [
          /* @__PURE__ */ s.jsxs("div", { children: [
            /* @__PURE__ */ s.jsx("p", { className: "panel-kicker", children: "Workspace Overview" }),
            /* @__PURE__ */ s.jsx("h2", { children: "실시간 지표" })
          ] }),
          /* @__PURE__ */ s.jsx("span", { id: "overviewStatusPill", className: `panel-state-pill ${k != null && k.paused ? "paused" : ""}`, children: k != null && k.paused ? "PAUSED" : "RUNNING" })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "metric-grid", children: [
          /* @__PURE__ */ s.jsxs("article", { className: "metric-card metric-card-emphasis", children: [
            /* @__PURE__ */ s.jsx("label", { children: "미국 자산" }),
            /* @__PURE__ */ s.jsx("strong", { id: "usEquity", children: $l(Ht == null ? void 0 : Ht.equity, "USD") })
          ] }),
          /* @__PURE__ */ s.jsxs("article", { className: "metric-card metric-card-emphasis", children: [
            /* @__PURE__ */ s.jsx("label", { children: "한국 자산" }),
            /* @__PURE__ */ s.jsx("strong", { id: "krEquity", children: $l(zt == null ? void 0 : zt.equity, "KRW") })
          ] }),
          /* @__PURE__ */ s.jsxs("article", { className: "metric-card", children: [
            /* @__PURE__ */ s.jsx("label", { children: "오늘 신호" }),
            /* @__PURE__ */ s.jsx("strong", { id: "signalsToday", children: String(ct.signals_today ?? "-") })
          ] }),
          /* @__PURE__ */ s.jsxs("article", { className: "metric-card", children: [
            /* @__PURE__ */ s.jsx("label", { children: "오늘 체결" }),
            /* @__PURE__ */ s.jsx("strong", { id: "fillsToday", children: String(ct.fills_today ?? "-") })
          ] }),
          /* @__PURE__ */ s.jsxs("article", { className: "metric-card metric-card-wide", children: [
            /* @__PURE__ */ s.jsx("label", { children: "최신 보고서" }),
            /* @__PURE__ */ s.jsx("strong", { id: "latestReport", children: (k == null ? void 0 : k.latest_report) || "없음" }),
            /* @__PURE__ */ s.jsxs("p", { className: "metric-meta", children: [
              "업데이트 ",
              /* @__PURE__ */ s.jsx("span", { id: "overviewUpdatedAt", children: ys(k == null ? void 0 : k.server_time_kst) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("section", { className: "module total-module", children: [
        /* @__PURE__ */ s.jsx("header", { className: "panel-head", children: /* @__PURE__ */ s.jsxs("div", { children: [
          /* @__PURE__ */ s.jsx("p", { className: "panel-kicker", children: "Firm Balance" }),
          /* @__PURE__ */ s.jsx("h2", { children: "회사 총자산" })
        ] }) }),
        /* @__PURE__ */ s.jsxs("div", { className: "total-grid", children: [
          /* @__PURE__ */ s.jsxs("article", { className: "metric-card", children: [
            /* @__PURE__ */ s.jsx("label", { children: "미국 자산" }),
            /* @__PURE__ */ s.jsx("strong", { id: "portfolioUsEquity", children: $l(lt == null ? void 0 : lt.us_equity, "USD") })
          ] }),
          /* @__PURE__ */ s.jsxs("article", { className: "metric-card", children: [
            /* @__PURE__ */ s.jsx("label", { children: "한국 자산" }),
            /* @__PURE__ */ s.jsx("strong", { id: "portfolioKrEquity", children: $l(lt == null ? void 0 : lt.kr_equity, "KRW") })
          ] }),
          /* @__PURE__ */ s.jsxs("article", { className: "metric-card metric-card-emphasis", children: [
            /* @__PURE__ */ s.jsx("label", { children: "총액 (USD 환산)" }),
            /* @__PURE__ */ s.jsx("strong", { id: "portfolioTotalUsd", children: $l(lt == null ? void 0 : lt.total_usd_est, "USD") })
          ] }),
          /* @__PURE__ */ s.jsxs("article", { className: "metric-card metric-card-emphasis", children: [
            /* @__PURE__ */ s.jsx("label", { children: "총액 (KRW 환산)" }),
            /* @__PURE__ */ s.jsx("strong", { id: "portfolioTotalKrw", children: $l(lt == null ? void 0 : lt.total_krw_est, "KRW") })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("p", { className: "fx-note", children: [
          "환산 기준 USD/KRW: ",
          /* @__PURE__ */ s.jsx("span", { id: "portfolioFxRate", children: `${_} (${q}${$}${W})` })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("section", { className: "module position-summary-module", children: [
        /* @__PURE__ */ s.jsxs("header", { className: "panel-head", children: [
          /* @__PURE__ */ s.jsxs("div", { children: [
            /* @__PURE__ */ s.jsx("p", { className: "panel-kicker", children: "Top Holdings" }),
            /* @__PURE__ */ s.jsx("h2", { children: "보유 포지션 요약" })
          ] }),
          /* @__PURE__ */ s.jsx("span", { className: "panel-caption", children: "상위 5" })
        ] }),
        /* @__PURE__ */ s.jsx("ol", { className: "position-summary-list", id: "workspacePositionList", children: kt.length ? kt.map((b, U) => {
          const Y = Hc(b.market, b.symbol);
          return /* @__PURE__ */ s.jsxs("li", { className: "position-summary-item", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "position-summary-left", children: [
              /* @__PURE__ */ s.jsx("span", { className: "position-rank", children: String(U + 1).padStart(2, "0") }),
              /* @__PURE__ */ s.jsx(
                Zy,
                {
                  row: b,
                  label: Y,
                  className: "symbol-link summary-symbol-link",
                  onClick: () => Tt(b)
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "position-summary-stats", children: [
              /* @__PURE__ */ s.jsxs("span", { className: "position-stat", children: [
                /* @__PURE__ */ s.jsx("em", { children: "수량" }),
                /* @__PURE__ */ s.jsx("b", { children: hs(b.qty) })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { className: `position-stat ${ms(b.unrealized_pnl)}`, children: [
                /* @__PURE__ */ s.jsx("em", { children: "평가손익" }),
                /* @__PURE__ */ s.jsx("b", { children: ds(b.unrealized_pnl, Uc(b.market)) })
              ] })
            ] })
          ] }, `${b.market}-${b.symbol}-${U}`);
        }) : /* @__PURE__ */ s.jsx("li", { className: "position-summary-empty", children: "보유 포지션 없음" }) })
      ] })
    ] })
  ] }) });
}
function ky() {
  const [f, h] = z.useState(() => _m(es(gm, "light"))), [m, r] = z.useState(() => {
    const C = Dc(es(ym, "workspace"));
    return Dc(window.location.hash || C);
  }), [O, D] = z.useState(() => es(vm, "0") === "1"), [X, G] = z.useState(!1);
  return z.useEffect(() => {
    document.body.classList.toggle("theme-dark", f === "dark"), as(gm, f);
  }, [f]), z.useEffect(() => {
    as(ym, m);
    const C = `#${m}`;
    window.location.hash !== C && (window.location.hash = m);
  }, [m]), z.useEffect(() => {
    as(vm, O ? "1" : "0");
  }, [O]), z.useEffect(() => {
    const C = () => {
      r((g) => {
        const L = Dc(window.location.hash);
        return g === L ? g : L;
      });
    };
    return window.addEventListener("hashchange", C), () => {
      window.removeEventListener("hashchange", C);
    };
  }, []), z.useEffect(() => {
    const C = window.matchMedia("(max-width: 767px)"), g = () => G(C.matches);
    return g(), typeof C.addEventListener == "function" ? (C.addEventListener("change", g), () => C.removeEventListener("change", g)) : (C.addListener(g), () => C.removeListener(g));
  }, []), {
    theme: f,
    setTheme: h,
    activeNav: m,
    setActiveNav: r,
    sidebarCollapsed: O,
    setSidebarCollapsed: D,
    mobile: X
  };
}
function cs(f) {
  const h = f === "dark";
  return {
    background: h ? "#141f2b" : "#ffffff",
    text: h ? "#9fb0c2" : "#6b7684",
    grid: h ? "#243546" : "#eef2f7",
    up: "#f04452",
    down: "#3f7cff",
    volumeUp: h ? "rgba(240, 68, 82, 0.55)" : "rgba(240, 68, 82, 0.38)",
    volumeDown: h ? "rgba(63, 124, 255, 0.55)" : "rgba(63, 124, 255, 0.38)"
  };
}
function Jy() {
  return {
    paused: !1,
    server_time_kst: null,
    accounts: [],
    metrics: { signals_today: 0, fills_today: 0 },
    latest_report: null
  };
}
function $y() {
  return {
    totals: {},
    positions: [],
    recent_fills: [],
    agent_exposure: [],
    quick_symbols: []
  };
}
const Wy = 4e3, Fy = 5e3, Iy = 2e3, Py = 4500, Oc = 4, is = 92, tv = {
  "1m": 3e3,
  "3m": 4e3,
  "5m": 5e3,
  "15m": 8e3,
  "30m": 12e3,
  "60m": 15e3,
  "4h": 3e4,
  "1d": 6e4
}, qc = [
  { value: "1m", label: "1분", range: "5d" },
  { value: "3m", label: "3분", range: "5d" },
  { value: "5m", label: "5분", range: "5d" },
  { value: "15m", label: "15분", range: "5d" },
  { value: "30m", label: "30분", range: "1mo" },
  { value: "60m", label: "1시간", range: "2mo" },
  { value: "4h", label: "4시간", range: "6mo" },
  { value: "1d", label: "1일", range: "1y" }
], lv = new Set(qc.map((f) => f.value)), Lc = "30m", Em = 24, fs = 1200, Nm = {
  usdkrw: "FX_IDC:USDKRW",
  nasdaq: "NASDAQ:IXIC",
  nasdaq100f: "CME_MINI:NQ1!",
  sp500: "SP:SPX",
  dowjones: "DJ:DJI",
  vix: "TVC:VIX",
  kospi: "TVC:KOSPI",
  kosdaq: "TVC:KOSDAQ"
}, ss = {
  id: "usdkrw",
  label: "달러 환율",
  tv_symbol: "FX_IDC:USDKRW"
};
function rs(f) {
  const h = String((f == null ? void 0 : f.id) || "").trim().toLowerCase();
  return h && Nm[h] ? Nm[h] : String((f == null ? void 0 : f.tv_symbol) || (f == null ? void 0 : f.symbol) || "").trim() || "";
}
function Am(f) {
  return `https://www.tradingview.com/chart/?symbol=${encodeURIComponent(f)}`;
}
function ev(f) {
  return `https://s.tradingview.com/widgetembed/?${new URLSearchParams({
    symbol: f,
    interval: "30",
    hidesidetoolbar: "0",
    symboledit: "1",
    saveimage: "1",
    toolbarbg: "#f5f7fa",
    theme: "light",
    style: "1",
    timezone: "Asia/Seoul",
    withdateranges: "1",
    hide_top_toolbar: "0",
    allow_symbol_change: "1",
    locale: "kr",
    details: "1",
    hotlist: "1",
    calendar: "1"
  }).toString()}`;
}
function Jl(f) {
  const h = String(f || "").trim().toLowerCase();
  return lv.has(h) ? h : Lc;
}
function ze(f) {
  var m;
  const h = Jl(f);
  return ((m = qc.find((r) => r.value === h)) == null ? void 0 : m.range) || "2mo";
}
function av(f) {
  const h = Jl(f);
  return h === "1d" ? ["1y", "2y", "5y"] : h === "4h" ? ["6mo", "1y", "2y", "5y"] : h === "60m" ? ["2mo", "3mo", "6mo", "1y", "2y", "5y"] : h === "30m" ? ["1mo", "2mo", "3mo", "6mo", "1y", "2y", "5y"] : ["5d", "1mo", "2mo", "3mo", "6mo", "1y", "2y", "5y"];
}
function nv(f, h) {
  const m = av(f), r = String(h || "").trim().toLowerCase(), O = m.indexOf(r);
  if (O < 0) {
    const D = ze(f), X = m.indexOf(D);
    return X >= 0 && X + 1 < m.length ? m[X + 1] : m[0] || "";
  }
  return m[O + 1] || "";
}
function uv(f) {
  var m;
  const h = Jl(f);
  return ((m = qc.find((r) => r.value === h)) == null ? void 0 : m.label) || "30분";
}
function cv(f) {
  const h = String(f || "").trim().toLowerCase();
  return {
    "1d": "최근 1일",
    "5d": "최근 5일",
    "1mo": "최근 1개월",
    "2mo": "최근 2개월",
    "3mo": "최근 3개월",
    "6mo": "최근 6개월",
    "1y": "최근 1년",
    "2y": "최근 2년",
    "5y": "최근 5년"
  }[h] || "최근 구간";
}
function iv(f) {
  const h = Jl(f);
  return tv[h] || 1e4;
}
function os(f) {
  const h = String(f || "").toUpperCase().trim();
  if (!h) return "차트";
  if (h.startsWith("KRX:") || h.endsWith(".KS") || h.endsWith(".KQ")) {
    const m = ru(h), r = su[m];
    return r || (m ? `한국주식 ${m}` : "한국주식");
  }
  if (h.includes(":")) {
    const [, m] = h.split(":", 2);
    return m || h;
  }
  return h;
}
function jc() {
}
function Cm({
  wsUrl: f = "",
  sseUrl: h = "",
  wsRetryMs: m = 1800,
  sseRetryMs: r = 2400,
  openTimeoutMs: O = 2600,
  onMessage: D = jc,
  onActiveChange: X = jc,
  onOpen: G = jc
}) {
  const C = typeof window.WebSocket == "function", g = typeof window.EventSource == "function";
  if (!C && !g)
    return jc;
  let L = null, R = null, B = null, I = !1;
  const dt = () => {
    B && (window.clearTimeout(B), B = null);
  }, ut = () => {
    L && (L.close(), L = null);
  }, Lt = () => {
    R && (R.close(), R = null);
  }, k = () => {
    I = !0, dt(), ut(), Lt(), X(!1);
  }, lt = (Ht, zt) => {
    I || B || (B = window.setTimeout(() => {
      B = null, I || zt();
    }, Ht));
  }, _t = (Ht) => {
    !g || I || !h || (Lt(), R = new EventSource(h), X(!0), G("sse"), R.onmessage = (zt) => {
      D(zt.data);
    }, R.onerror = () => {
      R && (R.close(), R = null), X(!1), lt(r, Ht);
    });
  }, Tt = () => {
    if (I) return;
    if (!C || !f) {
      _t(Tt);
      return;
    }
    ut(), L = new window.WebSocket(f);
    let Ht = !1;
    const zt = window.setTimeout(() => {
      !Ht && L && L.close();
    }, O);
    L.onopen = () => {
      Ht = !0, window.clearTimeout(zt), X(!0), G("ws");
    }, L.onmessage = (ct) => {
      D(ct.data);
    }, L.onerror = () => {
      X(!1);
    }, L.onclose = () => {
      if (window.clearTimeout(zt), L && (L = null), X(!1), !I) {
        if (!Ht && g) {
          _t(Tt);
          return;
        }
        lt(m, Tt);
      }
    };
  };
  return Tt(), k;
}
function fv({ log: f }) {
  const [h, m] = z.useState([]), [r, O] = z.useState(!0), [D, X] = z.useState(!0), G = z.useRef(!1), C = z.useRef(0), g = z.useCallback(async () => {
    try {
      const L = await ae("/api/market-indicators");
      m(Array.isArray(L.items) ? L.items : []);
    } catch (L) {
      m((R) => R.length ? R : []), f(`핵심 지표 수신 실패: ${L.message}`);
    } finally {
      O(!1);
    }
  }, [f]);
  return z.useEffect(() => {
    const L = window.setInterval(async () => {
      if (document.visibilityState === "hidden") return;
      const R = Date.now(), B = Number(C.current || 0);
      if (!(G.current && B > 0 && R - B < Py))
        try {
          await g();
        } catch {
        }
    }, Iy);
    return () => window.clearInterval(L);
  }, [g]), z.useEffect(() => {
    if (typeof window.WebSocket != "function" && !window.EventSource) return;
    const L = window.location.protocol === "https:" ? "wss" : "ws", R = Cm({
      wsUrl: `${L}://${window.location.host}/api/market-indicators/ws`,
      sseUrl: "/api/market-indicators/stream",
      wsRetryMs: 1800,
      sseRetryMs: 2400,
      openTimeoutMs: 2600,
      onOpen: (B) => {
        G.current = !0, B === "ws" && (C.current = Date.now());
      },
      onActiveChange: (B) => {
        G.current = !!B;
      },
      onMessage: (B) => {
        try {
          const I = JSON.parse(String(B || "{}"));
          (I == null ? void 0 : I.ok) === !0 && Array.isArray(I.items) && (C.current = Date.now(), m(I.items), O(!1));
        } catch {
        }
      }
    });
    return () => {
      R(), G.current = !1, C.current = 0;
    };
  }, []), {
    marketIndicators: h,
    marketIndicatorsBooting: r,
    marketIndicatorsSkeletonDemo: D,
    setMarketIndicatorsSkeletonDemo: X,
    loadMarketIndicators: g
  };
}
function sv({
  macroStripRef: f,
  marketIndicators: h,
  marketIndicatorsBooting: m,
  marketIndicatorsSkeletonDemo: r,
  setMarketIndicatorsSkeletonDemo: O
}) {
  const [D, X] = z.useState(!1), [G, C] = z.useState(!1), g = z.useCallback(() => {
    const R = f.current;
    if (!R) {
      X(!1), C(!1);
      return;
    }
    const B = Math.max(0, R.scrollWidth - R.clientWidth), I = R.scrollLeft;
    X(I > 2), C(I < B - 2);
  }, [f]);
  z.useEffect(() => {
    const R = f.current;
    if (!R) return;
    const B = (Lt) => {
      Lt.preventDefault();
    };
    g();
    const I = () => g();
    R.addEventListener("scroll", I, { passive: !0 }), R.addEventListener("dragstart", B);
    let dt = null;
    typeof ResizeObserver < "u" && (dt = new ResizeObserver(() => g()), dt.observe(R));
    const ut = () => g();
    return window.addEventListener("resize", ut), () => {
      R.removeEventListener("scroll", I), R.removeEventListener("dragstart", B), dt && dt.disconnect(), window.removeEventListener("resize", ut);
    };
  }, [f, g]), z.useEffect(() => {
    const R = f.current;
    if (!R) return;
    const B = () => {
      R.scrollTo({ left: 0, top: 0, behavior: "auto" }), g();
    };
    B();
    const I = window.requestAnimationFrame(B), dt = window.requestAnimationFrame(() => {
      B();
    });
    return () => {
      window.cancelAnimationFrame(I), window.cancelAnimationFrame(dt);
    };
  }, [f, m, r, g]), z.useEffect(() => {
    g();
  }, [h, m, r, g]), z.useEffect(() => {
    const R = window.setTimeout(() => {
      O(!1);
    }, Wy);
    return () => {
      window.clearTimeout(R);
    };
  }, [O]);
  const L = z.useCallback((R) => {
    const B = f.current;
    if (!B) return;
    const I = Math.max(180, Math.round(B.clientWidth * 0.72));
    B.scrollBy({
      left: R * I,
      behavior: "smooth"
    }), window.setTimeout(() => {
      g();
    }, 260);
  }, [f, g]);
  return {
    canScrollMacroPrev: D,
    canScrollMacroNext: G,
    scrollMacroBy: L
  };
}
function rv() {
  const [f, h] = z.useState([]), [m, r] = z.useState(""), [O, D] = z.useState("불러오는 중..."), X = z.useCallback(async (g) => {
    if (!g) {
      D("보고서가 아직 없습니다.");
      return;
    }
    const L = await ae(`/api/report/${g}`);
    D(L.content);
  }, []), G = z.useCallback(async () => {
    const g = await ae("/api/reports"), L = Array.isArray(g.reports) ? g.reports : [];
    if (h(L), !L.length) {
      r(""), D("보고서가 아직 없습니다.");
      return;
    }
    const R = m && L.includes(m) ? m : L[0];
    r(R), await X(R);
  }, [m, X]), C = z.useCallback(async (g) => {
    r(g), await X(g);
  }, [X]);
  return {
    reports: f,
    selectedReport: m,
    reportContent: O,
    loadReport: X,
    loadReports: G,
    changeReport: C
  };
}
function ov() {
  const {
    theme: f,
    setTheme: h,
    activeNav: m,
    setActiveNav: r,
    sidebarCollapsed: O,
    setSidebarCollapsed: D,
    mobile: X
  } = ky(), [G, C] = z.useState(Jy), [g, L] = z.useState($y), { reports: R, selectedReport: B, reportContent: I, loadReport: dt, loadReports: ut, changeReport: Lt } = rv(), [k, lt] = z.useState("준비 완료."), [_t, Tt] = z.useState(ss.tv_symbol), [Ht, zt] = z.useState(ss.tv_symbol), [ct, kt] = z.useState("#"), [cl, gl] = z.useState(""), [ml, Qt] = z.useState(""), [Dt, il] = z.useState("tv"), [Wt, _] = z.useState("차트"), [q, $] = z.useState("데이터 로딩 중..."), [W, Et] = z.useState(Lc), [d, b] = z.useState(ze(Lc)), U = O && !X, Y = z.useRef(null), F = z.useRef(null), et = z.useRef(null), tt = z.useRef(null), nt = z.useRef({
    lastLength: 0,
    userDetached: !1,
    loadedRange: "",
    loadedInterval: Lc,
    firstTime: 0,
    backfillBusy: !1,
    historyExhausted: !1,
    lastBackfillTriggeredAt: 0,
    exploringPast: !1
  }), Nt = z.useRef(null), yl = z.useRef(null), xe = z.useRef(!1), Ce = z.useRef(!1), ne = z.useRef(!1), fl = z.useRef({
    downX: null,
    downY: null,
    active: !1
  }), bt = z.useCallback((N) => {
    const j = `[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] ${N}`;
    lt((H) => `${j}
${H}`.slice(0, 2e4));
  }, []), {
    marketIndicators: _a,
    marketIndicatorsBooting: ou,
    marketIndicatorsSkeletonDemo: mn,
    setMarketIndicatorsSkeletonDemo: hn,
    loadMarketIndicators: Ta
  } = fv({ log: bt }), Me = z.useCallback(() => {
    const N = F.current, j = et.current || (N == null ? void 0 : N.parentElement) || N;
    if (!j) return null;
    const H = j.getBoundingClientRect(), V = Number(j.clientWidth || H.width || 0), Q = Number(j.clientHeight || H.height || 0), K = window.getComputedStyle(j), rt = Number.parseFloat(K.paddingLeft || "0") + Number.parseFloat(K.paddingRight || "0"), ot = Number.parseFloat(K.paddingTop || "0") + Number.parseFloat(K.paddingBottom || "0"), it = Math.max(1, Math.floor(V - rt)), xt = Math.max(1, Math.floor(Q - ot));
    return { width: it, height: xt, viewportEl: j };
  }, []), du = z.useCallback(() => {
    var it;
    if (!F.current || !window.LightweightCharts || typeof window.LightweightCharts.createChart != "function") return null;
    if ((it = tt.current) != null && it.chart) return tt.current;
    const N = cs(f), j = Me(), H = (j == null ? void 0 : j.width) || 900, V = (j == null ? void 0 : j.height) || 520, Q = window.LightweightCharts.createChart(F.current, {
      width: H,
      height: V,
      layout: {
        background: { type: "solid", color: N.background },
        textColor: N.text
      },
      grid: {
        vertLines: { color: N.grid },
        horzLines: { color: N.grid }
      },
      crosshair: { mode: 1 },
      leftPriceScale: {
        visible: !1,
        borderVisible: !1
      },
      rightPriceScale: {
        borderColor: N.grid,
        minimumWidth: is,
        entireTextOnly: !0
      },
      timeScale: {
        borderColor: N.grid,
        timeVisible: !0,
        secondsVisible: !1,
        rightOffset: Oc,
        rightBarStaysOnScroll: !0,
        fixLeftEdge: !0,
        lockVisibleTimeRangeOnResize: !0
      }
    }), K = Q.addCandlestickSeries({
      upColor: N.up,
      downColor: N.down,
      wickUpColor: N.up,
      wickDownColor: N.down,
      borderUpColor: N.up,
      borderDownColor: N.down,
      priceLineVisible: !0
    }), rt = Q.addHistogramSeries({
      priceFormat: { type: "volume" },
      priceScaleId: ""
    });
    Q.priceScale("").applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 }
    });
    const ot = (xt) => {
      const Xt = nt.current, zl = Number(Xt.lastLength || 0);
      if (!xt || !Number.isFinite(xt.to) || zl <= 0)
        return;
      const Ft = zl - 1, ue = xt.to >= Ft - 0.75;
      if (Xt.userDetached = !ue, Ft - Number(xt.to || 0) >= Em && Xt.userDetached && typeof Nt.current == "function") {
        const Ul = Date.now();
        Ul - Number(Xt.lastBackfillTriggeredAt || 0) >= fs && (Xt.lastBackfillTriggeredAt = Ul, Nt.current());
      }
    };
    return Q.timeScale().subscribeVisibleLogicalRangeChange(ot), tt.current = { chart: Q, candleSeries: K, volumeSeries: rt, onRangeChange: ot }, tt.current;
  }, [f, Me]), mu = z.useCallback(() => {
    var j;
    if (!((j = tt.current) != null && j.chart)) return;
    const N = cs(f);
    tt.current.chart.applyOptions({
      layout: {
        background: { type: "solid", color: N.background },
        textColor: N.text
      },
      grid: {
        vertLines: { color: N.grid },
        horzLines: { color: N.grid }
      },
      rightPriceScale: {
        borderColor: N.grid,
        minimumWidth: is,
        entireTextOnly: !0
      },
      timeScale: {
        borderColor: N.grid,
        rightOffset: Oc,
        rightBarStaysOnScroll: !0,
        fixLeftEdge: !0,
        lockVisibleTimeRangeOnResize: !0
      }
    }), tt.current.candleSeries.applyOptions({
      upColor: N.up,
      downColor: N.down,
      wickUpColor: N.up,
      wickDownColor: N.down,
      borderUpColor: N.up,
      borderDownColor: N.down
    });
  }, [f]), wt = z.useCallback((N = !1) => {
    var K;
    const j = (K = tt.current) == null ? void 0 : K.chart;
    if (!j) return;
    const H = Me();
    if (!H) return;
    const { width: V, height: Q } = H;
    typeof j.resize == "function" ? j.resize(V, Q) : j.applyOptions({ width: V, height: Q }), j.timeScale().applyOptions({
      rightOffset: Oc,
      rightBarStaysOnScroll: !0,
      fixLeftEdge: !0,
      lockVisibleTimeRangeOnResize: !0
    }), j.priceScale("right").applyOptions({
      minimumWidth: is,
      entireTextOnly: !0
    }), N && (j.timeScale().fitContent(), j.timeScale().applyOptions({
      rightOffset: Oc
    }));
  }, [Me]);
  z.useEffect(() => {
    mu(), cl && Qt(ns(cl, f));
  }, [f, cl, mu]), z.useEffect(() => {
    var V;
    const N = () => {
      wt(!1);
    };
    window.addEventListener("resize", N);
    let j = null;
    const H = et.current || ((V = F.current) == null ? void 0 : V.parentElement) || F.current;
    return typeof ResizeObserver < "u" && H && (j = new ResizeObserver(() => wt(!1)), j.observe(H)), () => {
      window.removeEventListener("resize", N), j && j.disconnect();
    };
  }, [wt]), z.useEffect(() => {
    if (Dt !== "local" || m !== "workspace") return;
    const N = () => wt(!0), j = window.requestAnimationFrame(N), H = window.requestAnimationFrame(N), V = window.setTimeout(N, 120);
    return () => {
      window.cancelAnimationFrame(j), window.cancelAnimationFrame(H), window.clearTimeout(V);
    };
  }, [Dt, m, U, X, wt]), z.useEffect(() => () => {
    var N, j;
    (N = tt.current) != null && N.chart && ((j = tt.current) != null && j.onRangeChange && tt.current.chart.timeScale().unsubscribeVisibleLogicalRangeChange(tt.current.onRangeChange), tt.current.chart.remove()), tt.current = null;
  }, []);
  const { canScrollMacroPrev: yn, canScrollMacroNext: za, scrollMacroBy: vn } = sv({
    macroStripRef: Y,
    marketIndicators: _a,
    marketIndicatorsBooting: ou,
    marketIndicatorsSkeletonDemo: mn,
    setMarketIndicatorsSkeletonDemo: hn
  }), _l = z.useCallback((N, { title: j = "", fitContent: H = !0 } = {}) => {
    var bn, Sn, Il, ie;
    const V = du();
    if (!V) return !1;
    const Q = V.chart.timeScale(), K = nt.current, rt = (N.candles || []).map((el) => ({
      time: Number(el.time),
      open: Number(el.open),
      high: Number(el.high),
      low: Number(el.low),
      close: Number(el.close)
    }));
    if (!rt.length) return !1;
    const ot = cs(f), it = (N.candles || []).map((el) => ({
      time: Number(el.time),
      value: Number(el.volume || 0),
      color: Number(el.close) >= Number(el.open) ? ot.volumeUp : ot.volumeDown
    }));
    let xt = null, Xt = null;
    const zl = !H && !!K.userDetached;
    if (zl && Q && (typeof Q.getVisibleRange == "function" && (xt = Q.getVisibleRange()), typeof Q.getVisibleLogicalRange == "function" && (Xt = Q.getVisibleLogicalRange())), V.candleSeries.setData(rt), V.volumeSeries.setData(it), K.lastLength = rt.length, K.firstTime = Number(((bn = rt[0]) == null ? void 0 : bn.time) || 0), K.loadedRange = String(N.range || K.loadedRange || "").trim().toLowerCase(), K.loadedInterval = Jl(N.interval || K.loadedInterval), H)
      Q.fitContent(), K.userDetached = !1, K.exploringPast = !1;
    else if (zl) {
      let el = !1;
      if (xt && Number.isFinite(xt.from) && Number.isFinite(xt.to))
        try {
          Q.setVisibleRange(xt), el = !0;
        } catch {
          el = !1;
        }
      if (!el && Xt && Number.isFinite(Xt.from) && Number.isFinite(Xt.to))
        try {
          Q.setVisibleLogicalRange(Xt);
        } catch {
        }
    }
    const Ft = String(((Sn = N.meta) == null ? void 0 : Sn.source) || "").toLowerCase(), je = String(((Il = N.meta) == null ? void 0 : Il.source_label) || "").trim() || (Ft.startsWith("naver") ? "네이버 금융" : Ft.includes("hybrid") ? "야후+네이버" : "야후 파이낸스"), De = Ft.includes("live") ? "실시간" : null, Ul = String(((ie = N.meta) == null ? void 0 : ie.quote_time_utc) || "").trim();
    let ce = "";
    if (De && Ul) {
      const el = new Date(Ul);
      Number.isNaN(el.getTime()) || (ce = ` · ${el.toLocaleTimeString("ko-KR", { hour12: !1 })} 업데이트`);
    }
    const ia = j || N.label || N.symbol || N.yahoo_symbol || N.tv_symbol || "차트", Ue = Jl(N.interval), Gt = String(N.range || "").trim().toLowerCase();
    return Gt && Gt !== String(d || "").trim().toLowerCase() && b(Gt), _(ia), $(
      `${uv(Ue)} 봉 · ${cv(Gt)} · ${je}${De ? ` (${De})` : ""}${ce}`
    ), il("local"), H && window.requestAnimationFrame(() => {
      wt(!0), window.setTimeout(() => {
        wt(!0);
      }, 100);
    }), !0;
  }, [du, d, f, wt]), Re = z.useCallback(async (N, j, H = W, V = {}) => {
    const Q = Jl(H), K = ze(Q), rt = String(V.range || d || K).trim().toLowerCase() || K, ot = await ae(
      `/api/chart/candles?query=${encodeURIComponent(N)}&interval=${encodeURIComponent(Q)}&range=${encodeURIComponent(rt)}`
    ), it = j || ot.yahoo_symbol || N;
    return _l(ot, { title: it, fitContent: V.fitContent !== !1 });
  }, [W, d, _l]), gn = z.useCallback(async (N, j = W, H = {}) => {
    H.fitContent !== !1 && (nt.current.userDetached = !1, nt.current.historyExhausted = !1, nt.current.backfillBusy = !1, nt.current.lastBackfillTriggeredAt = 0, nt.current.exploringPast = !1, b(ze(j)));
    const V = os(N.tv_symbol), Q = await Re(N.tv_symbol, V, j, H);
    return Q && (yl.current = {
      kind: "symbol",
      tvSymbol: N.tv_symbol,
      title: V
    }), Q;
  }, [W, Re]), Wl = z.useCallback(async (N, j = W, H = {}) => {
    H.fitContent !== !1 && (nt.current.userDetached = !1, nt.current.historyExhausted = !1, nt.current.backfillBusy = !1, nt.current.lastBackfillTriggeredAt = 0, nt.current.exploringPast = !1, b(ze(j)));
    const V = String((N == null ? void 0 : N.id) || "").trim().toLowerCase();
    if (!V) return !1;
    const Q = Jl(j), K = ze(Q), rt = String(H.range || d || K).trim().toLowerCase() || K, ot = await ae(
      `/api/market-indicators/${encodeURIComponent(V)}/candles?interval=${encodeURIComponent(Q)}&range=${encodeURIComponent(rt)}`
    ), it = String((N == null ? void 0 : N.label) || ot.label || V).trim(), xt = _l(ot, { title: it, fitContent: H.fitContent !== !1 });
    return xt && (yl.current = {
      kind: "indicator",
      indicatorId: V,
      tvSymbol: String(rs(N) || "").trim().toUpperCase(),
      title: it
    }), xt;
  }, [W, d, _l]), hu = z.useCallback(async () => {
    var ot;
    if (m !== "workspace" || Dt !== "local") return;
    const N = nt.current;
    if (N.backfillBusy || N.historyExhausted) return;
    const j = yl.current;
    if (!j) return;
    const H = Jl(W), V = String(d || N.loadedRange || ze(H)).trim().toLowerCase(), Q = nv(H, V);
    if (!Q || Q === V) {
      N.historyExhausted = !0;
      return;
    }
    N.backfillBusy = !0;
    const K = Number(N.firstTime || 0), rt = Number(N.lastLength || 0);
    try {
      let it = null;
      if (j.kind === "indicator" && j.indicatorId ? it = await ae(
        `/api/market-indicators/${encodeURIComponent(j.indicatorId)}/candles?interval=${encodeURIComponent(H)}&range=${encodeURIComponent(Q)}`
      ) : j.kind === "symbol" && j.tvSymbol && (it = await ae(
        `/api/chart/candles?query=${encodeURIComponent(j.tvSymbol)}&interval=${encodeURIComponent(H)}&range=${encodeURIComponent(Q)}`
      )), !it) return;
      if (!_l(it, {
        title: j.title || Wt,
        fitContent: !1
      })) {
        N.historyExhausted = !0;
        return;
      }
      const Xt = Number(((ot = (it.candles || [])[0]) == null ? void 0 : ot.time) || 0), zl = Number((it.candles || []).length || 0), Ft = String(it.range || Q).trim().toLowerCase();
      Ft && b(Ft), Xt > 0 && K > 0 && Xt < K || zl > rt || (N.historyExhausted = !0);
    } catch (it) {
      bt(`과거 구간 로드 실패: ${it.message}`);
    } finally {
      N.backfillBusy = !1;
    }
  }, [m, Dt, W, d, Wt, bt, _l]);
  z.useEffect(() => (Nt.current = () => {
    hu();
  }, () => {
    Nt.current = null;
  }), [hu]), z.useEffect(() => {
    if (m !== "workspace" || Dt !== "local") return;
    const N = window.setInterval(() => {
      var it, xt;
      const j = (it = tt.current) == null ? void 0 : it.chart, H = yl.current;
      if (!j || !H) return;
      const V = nt.current, Q = (xt = j.timeScale) == null ? void 0 : xt.call(j);
      if (!Q || typeof Q.getVisibleLogicalRange != "function") return;
      const K = Q.getVisibleLogicalRange();
      if (!K || !Number.isFinite(K.from) || !Number.isFinite(K.to)) return;
      const rt = Number(V.lastLength || 0);
      if (rt > 0) {
        const Xt = rt - 1, zl = K.to >= Xt - 0.75;
        V.userDetached = !zl;
        const Ft = Xt - Number(K.to || 0);
        V.exploringPast = Ft >= Em;
      }
      if (!V.userDetached || V.backfillBusy || V.historyExhausted || !V.exploringPast) return;
      const ot = Date.now();
      ot - Number(V.lastBackfillTriggeredAt || 0) < fs || (V.lastBackfillTriggeredAt = ot, typeof Nt.current == "function" && Nt.current());
    }, 700);
    return () => {
      window.clearInterval(N);
    };
  }, [m, Dt, W]), z.useEffect(() => {
    if (m !== "workspace" || Dt !== "local") return;
    const N = et.current;
    if (!N) return;
    const j = (K, rt) => {
      fl.current.downX = Number(K), fl.current.downY = Number(rt), fl.current.active = !0;
    }, H = (K) => {
      j(K.clientX, K.clientY);
    }, V = (K) => {
      j(K.clientX, K.clientY);
    }, Q = (K) => {
      if (!fl.current.active) return;
      const rt = Number(fl.current.downX), ot = Number(fl.current.downY);
      if (fl.current.downX = null, fl.current.downY = null, fl.current.active = !1, !Number.isFinite(rt) || !Number.isFinite(ot)) return;
      const it = Number(K == null ? void 0 : K.clientX), xt = Number(K == null ? void 0 : K.clientY), Xt = Number.isFinite(it) ? Math.abs(it - rt) : 0, zl = Number.isFinite(xt) ? Math.abs(xt - ot) : 0;
      if (Xt < 16 && zl < 16) return;
      const Ft = nt.current;
      if (Ft.backfillBusy || Ft.historyExhausted) return;
      const ue = Date.now();
      ue - Number(Ft.lastBackfillTriggeredAt || 0) < fs || (Ft.lastBackfillTriggeredAt = ue, Ft.userDetached = !0, Ft.exploringPast = !0, typeof Nt.current == "function" && Nt.current());
    };
    return N.addEventListener("pointerdown", H, { passive: !0 }), N.addEventListener("mousedown", V, { passive: !0 }), window.addEventListener("pointerup", Q, !0), window.addEventListener("mouseup", Q, !0), window.addEventListener("touchend", Q, !0), () => {
      N.removeEventListener("pointerdown", H), N.removeEventListener("mousedown", V), window.removeEventListener("pointerup", Q, !0), window.removeEventListener("mouseup", Q, !0), window.removeEventListener("touchend", Q, !0);
    };
  }, [m, Dt, W]);
  const Oe = z.useCallback(async (N) => {
    const j = ay(N);
    return ae(`/api/chart/resolve?query=${encodeURIComponent(j)}`);
  }, []), Vt = z.useCallback(async (N, { silent: j = !1 } = {}) => {
    const H = await Oe(N), V = os(H.tv_symbol);
    zt(H.tv_symbol), Tt(H.tv_symbol), kt(H.chart_url);
    let Q = !1;
    if (I0(H.tv_symbol))
      try {
        Q = await gn(H, W);
      } catch (K) {
        bt(`KR 차트 로딩 실패, TradingView로 전환: ${K.message}`);
      }
    Q || (il("tv"), gl(H.widget_url), Qt(ns(H.widget_url, f)), yl.current = null, _(V)), Ce.current = !0, j || bt(`차트 변경: ${H.tv_symbol}`);
  }, [Oe, gn, f, bt, W]), Tl = z.useCallback(async () => {
    const N = await ae("/api/overview");
    C(N);
  }, []), nl = z.useCallback(async () => {
    const N = await ae("/api/portfolio");
    if (L(N), !Ce.current) {
      const j = ss, H = rs(j);
      zt(H), Tt(H), kt(Am(H)), _(j.label);
      let V = !1;
      try {
        V = await Wl(j, W);
      } catch (Q) {
        bt(`초기 달러 환율 차트 로딩 실패: ${Q.message}`);
      }
      V ? Ce.current = !0 : await Vt(H, { silent: !0 });
    }
  }, [Vt, Wl, W, bt]), xa = z.useCallback(async () => {
    await Tl(), await nl(), await ut(), await Ta();
  }, [Tl, nl, ut, Ta]);
  z.useEffect(() => {
    let N = !1;
    return xa().then(() => {
      N || bt("Ryong Investment 마켓 스테이션 준비 완료");
    }).catch((j) => {
      N || bt(`초기화 실패: ${j.message}`);
    }), () => {
      N = !0;
    };
  }, [xa, bt]), z.useEffect(() => {
    const N = window.setInterval(async () => {
      try {
        await Tl(), await nl();
      } catch {
      }
    }, Fy);
    return () => window.clearInterval(N);
  }, [Tl, nl]), z.useEffect(() => {
    if (typeof window.WebSocket != "function" && !window.EventSource || m !== "workspace" || Dt !== "local") {
      ne.current = !1;
      return;
    }
    const N = yl.current;
    if (!N) {
      ne.current = !1;
      return;
    }
    const j = new URLSearchParams({
      interval: Jl(W),
      range: String(d || ze(W)).trim().toLowerCase()
    });
    if (N.kind === "indicator" && N.indicatorId)
      j.set("indicator_id", String(N.indicatorId));
    else if (N.kind === "symbol" && N.tvSymbol)
      j.set("query", String(N.tvSymbol));
    else {
      ne.current = !1;
      return;
    }
    const H = j.toString(), V = window.location.protocol === "https:" ? "wss" : "ws", Q = Cm({
      wsUrl: `${V}://${window.location.host}/api/chart/ws?${H}`,
      sseUrl: `/api/chart/stream?${H}`,
      wsRetryMs: 1800,
      sseRetryMs: 2400,
      openTimeoutMs: 2600,
      onActiveChange: (K) => {
        ne.current = !!K;
      },
      onMessage: (K) => {
        try {
          const rt = JSON.parse(String(K || "{}"));
          if ((rt == null ? void 0 : rt.ok) !== !0 || !Array.isArray(rt == null ? void 0 : rt.candles)) return;
          _l(rt, {
            title: N.title || Wt,
            fitContent: !1
          });
        } catch {
        }
      }
    });
    return () => {
      Q(), ne.current = !1;
    };
  }, [m, Dt, W, d, Ht, _l, Wt]), z.useEffect(() => {
    if (m !== "workspace" || Dt !== "local") return;
    const N = iv(W);
    let j = !1;
    const H = async () => {
      if (j || xe.current || ne.current) return;
      const Q = yl.current;
      if (Q) {
        xe.current = !0;
        try {
          Q.kind === "indicator" ? await Wl(
            {
              id: Q.indicatorId,
              label: Q.title,
              tv_symbol: Q.tvSymbol
            },
            W,
            { fitContent: !1 }
          ) : Q.kind === "symbol" && await Re(Q.tvSymbol, Q.title, W, { fitContent: !1 });
        } catch (K) {
          bt(`실시간 차트 갱신 실패: ${K.message}`);
        } finally {
          xe.current = !1;
        }
      }
    }, V = window.setInterval(() => {
      H();
    }, N);
    return () => {
      j = !0, window.clearInterval(V);
    };
  }, [m, Dt, W, Wl, Re, bt]);
  const Yc = U ? "app-shell sidebar-collapsed" : "app-shell", yu = z.useCallback((N) => {
    r(Dc(N));
  }, []), Ca = z.useCallback(async () => {
    await xa(), bt("수동 새로고침 완료");
  }, [xa, bt]), Ma = z.useCallback(async (N) => {
    N.preventDefault();
    const j = _t.trim();
    if (j)
      try {
        r("workspace"), await Vt(j);
      } catch (H) {
        bt(`검색 실패: ${H.message}`);
      }
  }, [_t, Vt, bt]), Ra = z.useCallback(async (N, j) => {
    const H = (j == null ? void 0 : j.tv_symbol) || N;
    try {
      r("workspace"), await Vt(H);
    } catch (V) {
      bt(`심볼 로딩 실패: ${V.message}`);
    }
  }, [Vt, bt]), Fl = z.useCallback(async (N) => {
    try {
      r("workspace"), await Vt(ny(N.market, N.symbol));
    } catch (j) {
      bt(`포지션 심볼 로딩 실패: ${j.message}`);
    }
  }, [Vt, bt]), Oa = z.useCallback(async (N) => {
    const j = rs(N), H = String(j || "").trim().toUpperCase();
    if (!H) return;
    r("workspace"), zt(H), Tt(H), kt(Am(H)), _(String((N == null ? void 0 : N.label) || os(H)).trim() || "차트");
    let V = !1;
    try {
      V = await Wl(N);
    } catch (Q) {
      bt(`지표 로컬 차트 로딩 실패, TradingView로 전환: ${Q.message}`);
    }
    if (!V) {
      const Q = ev(H);
      il("tv"), gl(Q), Qt(ns(Q, f)), yl.current = null;
    }
    Ce.current = !0, bt(`차트 변경: ${H}`);
  }, [f, Wl, bt]), ua = z.useCallback(async (N) => {
    const j = Jl(N);
    if (Et(j), b(ze(j)), nt.current.historyExhausted = !1, nt.current.backfillBusy = !1, nt.current.lastBackfillTriggeredAt = 0, nt.current.exploringPast = !1, Dt !== "local") return;
    const H = yl.current;
    if (H) {
      $("데이터 로딩 중...");
      try {
        if (H.kind === "indicator")
          await Wl(
            {
              id: H.indicatorId,
              label: H.title,
              tv_symbol: H.tvSymbol
            },
            j
          );
        else if (H.kind === "symbol" && !await Re(H.tvSymbol, H.title, j))
          throw new Error("로컬 차트 렌더링 실패");
      } catch (V) {
        bt(`차트 주기 변경 실패: ${V.message}`);
      }
    }
  }, [Dt, Wl, Re, bt]), Xc = z.useCallback(async () => {
    B && (await dt(B), bt(`보고서 불러옴: ${B}`));
  }, [B, dt, bt]), vu = (g == null ? void 0 : g.totals) || {}, ja = (g == null ? void 0 : g.positions) || [], ca = (g == null ? void 0 : g.recent_fills) || [], Gc = (g == null ? void 0 : g.agent_exposure) || [], gu = (g == null ? void 0 : g.quick_symbols) || [];
  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsx(
      Gy,
      {
        theme: f,
        onToggleTheme: () => h((N) => N === "dark" ? "light" : "dark"),
        onRefreshAll: Ca,
        sidebarCollapsed: U,
        onToggleSidebar: () => D((N) => !N)
      }
    ),
    /* @__PURE__ */ s.jsxs("div", { className: "macro-strip-shell", children: [
      /* @__PURE__ */ s.jsx("span", { className: `macro-edge left ${yn ? "active" : ""}`, "aria-hidden": "true" }),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `macro-scroll-btn left ${yn ? "active" : ""}`,
          "aria-label": "왼쪽으로 스크롤",
          onClick: () => vn(-1),
          disabled: !yn,
          children: /* @__PURE__ */ s.jsx("span", { "aria-hidden": "true", children: "‹" })
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "macro-strip", id: "macroStrip", ref: Y, children: /* @__PURE__ */ s.jsx(
        yy,
        {
          items: _a,
          loading: ou || mn,
          onSelectItem: Oa
        }
      ) }),
      /* @__PURE__ */ s.jsx("span", { className: `macro-edge right ${za ? "active" : ""}`, "aria-hidden": "true" }),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `macro-scroll-btn right ${za ? "active" : ""}`,
          "aria-label": "오른쪽으로 스크롤",
          onClick: () => vn(1),
          disabled: !za,
          children: /* @__PURE__ */ s.jsx("span", { "aria-hidden": "true", children: "›" })
        }
      )
    ] }),
    /* @__PURE__ */ s.jsxs("main", { className: Yc, children: [
      /* @__PURE__ */ s.jsx(vy, { activeNav: m, onChangeNav: yu }),
      /* @__PURE__ */ s.jsxs("section", { className: "content-shell", children: [
        /* @__PURE__ */ s.jsx(
          Ky,
          {
            active: m === "workspace",
            symbolInput: _t,
            onChangeSymbolInput: Tt,
            onSubmitSymbol: Ma,
            currentSymbol: Ht,
            openTradingViewUrl: ct,
            tvWidgetUrl: ml,
            chartRenderer: Dt,
            localChartTitle: Wt,
            localChartMeta: q,
            localChartInterval: W,
            localChartIntervalOptions: qc,
            onChangeLocalChartInterval: ua,
            localChartCanvasRef: F,
            localChartViewportRef: et,
            quickSymbols: gu,
            onClickQuickSymbol: Ra,
            overview: G,
            portfolioTotals: vu,
            positions: ja,
            onClickPositionSymbol: Fl
          }
        ),
        /* @__PURE__ */ s.jsx(
          by,
          {
            active: m === "positions",
            positions: ja,
            recentFills: ca,
            agentExposure: Gc,
            onClickPositionSymbol: Fl
          }
        ),
        /* @__PURE__ */ s.jsx(
          Sy,
          {
            active: m === "reports",
            reports: R,
            selectedReport: B,
            reportContent: I,
            operationLog: k,
            onChangeReport: Lt,
            onReloadReport: Xc
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(gy, { activeNav: m, onChangeNav: yu })
  ] });
}
const Mm = document.getElementById("appRoot");
if (!Mm)
  throw new Error("appRoot element not found");
k0.createRoot(Mm).render(/* @__PURE__ */ s.jsx(ov, {}));
