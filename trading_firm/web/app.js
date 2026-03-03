var as = { exports: {} }, _u = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cm;
function j0() {
  if (cm) return _u;
  cm = 1;
  var f = Symbol.for("react.transitional.element"), y = Symbol.for("react.fragment");
  function v(o, j, H) {
    var Z = null;
    if (H !== void 0 && (Z = "" + H), j.key !== void 0 && (Z = "" + j.key), "key" in j) {
      H = {};
      for (var V in j)
        V !== "key" && (H[V] = j[V]);
    } else H = j;
    return j = H.ref, {
      $$typeof: f,
      type: o,
      key: Z,
      ref: j !== void 0 ? j : null,
      props: H
    };
  }
  return _u.Fragment = y, _u.jsx = v, _u.jsxs = v, _u;
}
var im;
function U0() {
  return im || (im = 1, as.exports = j0()), as.exports;
}
var s = U0(), ns = { exports: {} }, Nu = {}, us = { exports: {} }, cs = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fm;
function H0() {
  return fm || (fm = 1, (function(f) {
    function y(_, L) {
      var J = _.length;
      _.push(L);
      t: for (; 0 < J; ) {
        var bt = J - 1 >>> 1, Et = _[bt];
        if (0 < j(Et, L))
          _[bt] = L, _[J] = Et, J = bt;
        else break t;
      }
    }
    function v(_) {
      return _.length === 0 ? null : _[0];
    }
    function o(_) {
      if (_.length === 0) return null;
      var L = _[0], J = _.pop();
      if (J !== L) {
        _[0] = J;
        t: for (var bt = 0, Et = _.length, m = Et >>> 1; bt < m; ) {
          var b = 2 * (bt + 1) - 1, M = _[b], q = b + 1, W = _[q];
          if (0 > j(M, J))
            q < Et && 0 > j(W, M) ? (_[bt] = W, _[q] = J, bt = q) : (_[bt] = M, _[b] = J, bt = b);
          else if (q < Et && 0 > j(W, J))
            _[bt] = W, _[q] = J, bt = q;
          else break t;
        }
      }
      return L;
    }
    function j(_, L) {
      var J = _.sortIndex - L.sortIndex;
      return J !== 0 ? J : _.id - L.id;
    }
    if (f.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var H = performance;
      f.unstable_now = function() {
        return H.now();
      };
    } else {
      var Z = Date, V = Z.now();
      f.unstable_now = function() {
        return Z.now() - V;
      };
    }
    var D = [], z = [], w = 1, X = null, it = 3, Rt = !1, Mt = !1, gt = !1, Pt = !1, k = typeof setTimeout == "function" ? setTimeout : null, at = typeof clearTimeout == "function" ? clearTimeout : null, Yt = typeof setImmediate < "u" ? setImmediate : null;
    function Ot(_) {
      for (var L = v(z); L !== null; ) {
        if (L.callback === null) o(z);
        else if (L.startTime <= _)
          o(z), L.sortIndex = L.expirationTime, y(D, L);
        else break;
        L = v(z);
      }
    }
    function nl(_) {
      if (gt = !1, Ot(_), !Mt)
        if (v(D) !== null)
          Mt = !0, Jt || (Jt = !0, Qt());
        else {
          var L = v(z);
          L !== null && ul(nl, L.startTime - _);
        }
    }
    var Jt = !1, tt = -1, tl = 5, pl = -1;
    function El() {
      return Pt ? !0 : !(f.unstable_now() - pl < tl);
    }
    function hl() {
      if (Pt = !1, Jt) {
        var _ = f.unstable_now();
        pl = _;
        var L = !0;
        try {
          t: {
            Mt = !1, gt && (gt = !1, at(tt), tt = -1), Rt = !0;
            var J = it;
            try {
              l: {
                for (Ot(_), X = v(D); X !== null && !(X.expirationTime > _ && El()); ) {
                  var bt = X.callback;
                  if (typeof bt == "function") {
                    X.callback = null, it = X.priorityLevel;
                    var Et = bt(
                      X.expirationTime <= _
                    );
                    if (_ = f.unstable_now(), typeof Et == "function") {
                      X.callback = Et, Ot(_), L = !0;
                      break l;
                    }
                    X === v(D) && o(D), Ot(_);
                  } else o(D);
                  X = v(D);
                }
                if (X !== null) L = !0;
                else {
                  var m = v(z);
                  m !== null && ul(
                    nl,
                    m.startTime - _
                  ), L = !1;
                }
              }
              break t;
            } finally {
              X = null, it = J, Rt = !1;
            }
            L = void 0;
          }
        } finally {
          L ? Qt() : Jt = !1;
        }
      }
    }
    var Qt;
    if (typeof Yt == "function")
      Qt = function() {
        Yt(hl);
      };
    else if (typeof MessageChannel < "u") {
      var fl = new MessageChannel(), yl = fl.port2;
      fl.port1.onmessage = hl, Qt = function() {
        yl.postMessage(null);
      };
    } else
      Qt = function() {
        k(hl, 0);
      };
    function ul(_, L) {
      tt = k(function() {
        _(f.unstable_now());
      }, L);
    }
    f.unstable_IdlePriority = 5, f.unstable_ImmediatePriority = 1, f.unstable_LowPriority = 4, f.unstable_NormalPriority = 3, f.unstable_Profiling = null, f.unstable_UserBlockingPriority = 2, f.unstable_cancelCallback = function(_) {
      _.callback = null;
    }, f.unstable_forceFrameRate = function(_) {
      0 > _ || 125 < _ ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : tl = 0 < _ ? Math.floor(1e3 / _) : 5;
    }, f.unstable_getCurrentPriorityLevel = function() {
      return it;
    }, f.unstable_next = function(_) {
      switch (it) {
        case 1:
        case 2:
        case 3:
          var L = 3;
          break;
        default:
          L = it;
      }
      var J = it;
      it = L;
      try {
        return _();
      } finally {
        it = J;
      }
    }, f.unstable_requestPaint = function() {
      Pt = !0;
    }, f.unstable_runWithPriority = function(_, L) {
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
      var J = it;
      it = _;
      try {
        return L();
      } finally {
        it = J;
      }
    }, f.unstable_scheduleCallback = function(_, L, J) {
      var bt = f.unstable_now();
      switch (typeof J == "object" && J !== null ? (J = J.delay, J = typeof J == "number" && 0 < J ? bt + J : bt) : J = bt, _) {
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
      return Et = J + Et, _ = {
        id: w++,
        callback: L,
        priorityLevel: _,
        startTime: J,
        expirationTime: Et,
        sortIndex: -1
      }, J > bt ? (_.sortIndex = J, y(z, _), v(D) === null && _ === v(z) && (gt ? (at(tt), tt = -1) : gt = !0, ul(nl, J - bt))) : (_.sortIndex = Et, y(D, _), Mt || Rt || (Mt = !0, Jt || (Jt = !0, Qt()))), _;
    }, f.unstable_shouldYield = El, f.unstable_wrapCallback = function(_) {
      var L = it;
      return function() {
        var J = it;
        it = L;
        try {
          return _.apply(this, arguments);
        } finally {
          it = J;
        }
      };
    };
  })(cs)), cs;
}
var sm;
function L0() {
  return sm || (sm = 1, us.exports = H0()), us.exports;
}
var is = { exports: {} }, P = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rm;
function B0() {
  if (rm) return P;
  rm = 1;
  var f = Symbol.for("react.transitional.element"), y = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), j = Symbol.for("react.profiler"), H = Symbol.for("react.consumer"), Z = Symbol.for("react.context"), V = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), z = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), X = Symbol.for("react.activity"), it = Symbol.iterator;
  function Rt(m) {
    return m === null || typeof m != "object" ? null : (m = it && m[it] || m["@@iterator"], typeof m == "function" ? m : null);
  }
  var Mt = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, gt = Object.assign, Pt = {};
  function k(m, b, M) {
    this.props = m, this.context = b, this.refs = Pt, this.updater = M || Mt;
  }
  k.prototype.isReactComponent = {}, k.prototype.setState = function(m, b) {
    if (typeof m != "object" && typeof m != "function" && m != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, m, b, "setState");
  }, k.prototype.forceUpdate = function(m) {
    this.updater.enqueueForceUpdate(this, m, "forceUpdate");
  };
  function at() {
  }
  at.prototype = k.prototype;
  function Yt(m, b, M) {
    this.props = m, this.context = b, this.refs = Pt, this.updater = M || Mt;
  }
  var Ot = Yt.prototype = new at();
  Ot.constructor = Yt, gt(Ot, k.prototype), Ot.isPureReactComponent = !0;
  var nl = Array.isArray;
  function Jt() {
  }
  var tt = { H: null, A: null, T: null, S: null }, tl = Object.prototype.hasOwnProperty;
  function pl(m, b, M) {
    var q = M.ref;
    return {
      $$typeof: f,
      type: m,
      key: b,
      ref: q !== void 0 ? q : null,
      props: M
    };
  }
  function El(m, b) {
    return pl(m.type, b, m.props);
  }
  function hl(m) {
    return typeof m == "object" && m !== null && m.$$typeof === f;
  }
  function Qt(m) {
    var b = { "=": "=0", ":": "=2" };
    return "$" + m.replace(/[=:]/g, function(M) {
      return b[M];
    });
  }
  var fl = /\/+/g;
  function yl(m, b) {
    return typeof m == "object" && m !== null && m.key != null ? Qt("" + m.key) : b.toString(36);
  }
  function ul(m) {
    switch (m.status) {
      case "fulfilled":
        return m.value;
      case "rejected":
        throw m.reason;
      default:
        switch (typeof m.status == "string" ? m.then(Jt, Jt) : (m.status = "pending", m.then(
          function(b) {
            m.status === "pending" && (m.status = "fulfilled", m.value = b);
          },
          function(b) {
            m.status === "pending" && (m.status = "rejected", m.reason = b);
          }
        )), m.status) {
          case "fulfilled":
            return m.value;
          case "rejected":
            throw m.reason;
        }
    }
    throw m;
  }
  function _(m, b, M, q, W) {
    var lt = typeof m;
    (lt === "undefined" || lt === "boolean") && (m = null);
    var rt = !1;
    if (m === null) rt = !0;
    else
      switch (lt) {
        case "bigint":
        case "string":
        case "number":
          rt = !0;
          break;
        case "object":
          switch (m.$$typeof) {
            case f:
            case y:
              rt = !0;
              break;
            case w:
              return rt = m._init, _(
                rt(m._payload),
                b,
                M,
                q,
                W
              );
          }
      }
    if (rt)
      return W = W(m), rt = q === "" ? "." + yl(m, 0) : q, nl(W) ? (M = "", rt != null && (M = rt.replace(fl, "$&/") + "/"), _(W, b, M, "", function(vl) {
        return vl;
      })) : W != null && (hl(W) && (W = El(
        W,
        M + (W.key == null || m && m.key === W.key ? "" : ("" + W.key).replace(
          fl,
          "$&/"
        ) + "/") + rt
      )), b.push(W)), 1;
    rt = 0;
    var I = q === "" ? "." : q + ":";
    if (nl(m))
      for (var Lt = 0; Lt < m.length; Lt++)
        q = m[Lt], lt = I + yl(q, Lt), rt += _(
          q,
          b,
          M,
          lt,
          W
        );
    else if (Lt = Rt(m), typeof Lt == "function")
      for (m = Lt.call(m), Lt = 0; !(q = m.next()).done; )
        q = q.value, lt = I + yl(q, Lt++), rt += _(
          q,
          b,
          M,
          lt,
          W
        );
    else if (lt === "object") {
      if (typeof m.then == "function")
        return _(
          ul(m),
          b,
          M,
          q,
          W
        );
      throw b = String(m), Error(
        "Objects are not valid as a React child (found: " + (b === "[object Object]" ? "object with keys {" + Object.keys(m).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return rt;
  }
  function L(m, b, M) {
    if (m == null) return m;
    var q = [], W = 0;
    return _(m, q, "", "", function(lt) {
      return b.call(M, lt, W++);
    }), q;
  }
  function J(m) {
    if (m._status === -1) {
      var b = m._result;
      b = b(), b.then(
        function(M) {
          (m._status === 0 || m._status === -1) && (m._status = 1, m._result = M);
        },
        function(M) {
          (m._status === 0 || m._status === -1) && (m._status = 2, m._result = M);
        }
      ), m._status === -1 && (m._status = 0, m._result = b);
    }
    if (m._status === 1) return m._result.default;
    throw m._result;
  }
  var bt = typeof reportError == "function" ? reportError : function(m) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var b = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof m == "object" && m !== null && typeof m.message == "string" ? String(m.message) : String(m),
        error: m
      });
      if (!window.dispatchEvent(b)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", m);
      return;
    }
    console.error(m);
  }, Et = {
    map: L,
    forEach: function(m, b, M) {
      L(
        m,
        function() {
          b.apply(this, arguments);
        },
        M
      );
    },
    count: function(m) {
      var b = 0;
      return L(m, function() {
        b++;
      }), b;
    },
    toArray: function(m) {
      return L(m, function(b) {
        return b;
      }) || [];
    },
    only: function(m) {
      if (!hl(m))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return m;
    }
  };
  return P.Activity = X, P.Children = Et, P.Component = k, P.Fragment = v, P.Profiler = j, P.PureComponent = Yt, P.StrictMode = o, P.Suspense = D, P.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = tt, P.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(m) {
      return tt.H.useMemoCache(m);
    }
  }, P.cache = function(m) {
    return function() {
      return m.apply(null, arguments);
    };
  }, P.cacheSignal = function() {
    return null;
  }, P.cloneElement = function(m, b, M) {
    if (m == null)
      throw Error(
        "The argument must be a React element, but you passed " + m + "."
      );
    var q = gt({}, m.props), W = m.key;
    if (b != null)
      for (lt in b.key !== void 0 && (W = "" + b.key), b)
        !tl.call(b, lt) || lt === "key" || lt === "__self" || lt === "__source" || lt === "ref" && b.ref === void 0 || (q[lt] = b[lt]);
    var lt = arguments.length - 2;
    if (lt === 1) q.children = M;
    else if (1 < lt) {
      for (var rt = Array(lt), I = 0; I < lt; I++)
        rt[I] = arguments[I + 2];
      q.children = rt;
    }
    return pl(m.type, W, q);
  }, P.createContext = function(m) {
    return m = {
      $$typeof: Z,
      _currentValue: m,
      _currentValue2: m,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, m.Provider = m, m.Consumer = {
      $$typeof: H,
      _context: m
    }, m;
  }, P.createElement = function(m, b, M) {
    var q, W = {}, lt = null;
    if (b != null)
      for (q in b.key !== void 0 && (lt = "" + b.key), b)
        tl.call(b, q) && q !== "key" && q !== "__self" && q !== "__source" && (W[q] = b[q]);
    var rt = arguments.length - 2;
    if (rt === 1) W.children = M;
    else if (1 < rt) {
      for (var I = Array(rt), Lt = 0; Lt < rt; Lt++)
        I[Lt] = arguments[Lt + 2];
      W.children = I;
    }
    if (m && m.defaultProps)
      for (q in rt = m.defaultProps, rt)
        W[q] === void 0 && (W[q] = rt[q]);
    return pl(m, lt, W);
  }, P.createRef = function() {
    return { current: null };
  }, P.forwardRef = function(m) {
    return { $$typeof: V, render: m };
  }, P.isValidElement = hl, P.lazy = function(m) {
    return {
      $$typeof: w,
      _payload: { _status: -1, _result: m },
      _init: J
    };
  }, P.memo = function(m, b) {
    return {
      $$typeof: z,
      type: m,
      compare: b === void 0 ? null : b
    };
  }, P.startTransition = function(m) {
    var b = tt.T, M = {};
    tt.T = M;
    try {
      var q = m(), W = tt.S;
      W !== null && W(M, q), typeof q == "object" && q !== null && typeof q.then == "function" && q.then(Jt, bt);
    } catch (lt) {
      bt(lt);
    } finally {
      b !== null && M.types !== null && (b.types = M.types), tt.T = b;
    }
  }, P.unstable_useCacheRefresh = function() {
    return tt.H.useCacheRefresh();
  }, P.use = function(m) {
    return tt.H.use(m);
  }, P.useActionState = function(m, b, M) {
    return tt.H.useActionState(m, b, M);
  }, P.useCallback = function(m, b) {
    return tt.H.useCallback(m, b);
  }, P.useContext = function(m) {
    return tt.H.useContext(m);
  }, P.useDebugValue = function() {
  }, P.useDeferredValue = function(m, b) {
    return tt.H.useDeferredValue(m, b);
  }, P.useEffect = function(m, b) {
    return tt.H.useEffect(m, b);
  }, P.useEffectEvent = function(m) {
    return tt.H.useEffectEvent(m);
  }, P.useId = function() {
    return tt.H.useId();
  }, P.useImperativeHandle = function(m, b, M) {
    return tt.H.useImperativeHandle(m, b, M);
  }, P.useInsertionEffect = function(m, b) {
    return tt.H.useInsertionEffect(m, b);
  }, P.useLayoutEffect = function(m, b) {
    return tt.H.useLayoutEffect(m, b);
  }, P.useMemo = function(m, b) {
    return tt.H.useMemo(m, b);
  }, P.useOptimistic = function(m, b) {
    return tt.H.useOptimistic(m, b);
  }, P.useReducer = function(m, b, M) {
    return tt.H.useReducer(m, b, M);
  }, P.useRef = function(m) {
    return tt.H.useRef(m);
  }, P.useState = function(m) {
    return tt.H.useState(m);
  }, P.useSyncExternalStore = function(m, b, M) {
    return tt.H.useSyncExternalStore(
      m,
      b,
      M
    );
  }, P.useTransition = function() {
    return tt.H.useTransition();
  }, P.version = "19.2.4", P;
}
var om;
function Ts() {
  return om || (om = 1, is.exports = B0()), is.exports;
}
var fs = { exports: {} }, Sl = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dm;
function q0() {
  if (dm) return Sl;
  dm = 1;
  var f = Ts();
  function y(D) {
    var z = "https://react.dev/errors/" + D;
    if (1 < arguments.length) {
      z += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var w = 2; w < arguments.length; w++)
        z += "&args[]=" + encodeURIComponent(arguments[w]);
    }
    return "Minified React error #" + D + "; visit " + z + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function v() {
  }
  var o = {
    d: {
      f: v,
      r: function() {
        throw Error(y(522));
      },
      D: v,
      C: v,
      L: v,
      m: v,
      X: v,
      S: v,
      M: v
    },
    p: 0,
    findDOMNode: null
  }, j = Symbol.for("react.portal");
  function H(D, z, w) {
    var X = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: j,
      key: X == null ? null : "" + X,
      children: D,
      containerInfo: z,
      implementation: w
    };
  }
  var Z = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function V(D, z) {
    if (D === "font") return "";
    if (typeof z == "string")
      return z === "use-credentials" ? z : "";
  }
  return Sl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, Sl.createPortal = function(D, z) {
    var w = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!z || z.nodeType !== 1 && z.nodeType !== 9 && z.nodeType !== 11)
      throw Error(y(299));
    return H(D, z, null, w);
  }, Sl.flushSync = function(D) {
    var z = Z.T, w = o.p;
    try {
      if (Z.T = null, o.p = 2, D) return D();
    } finally {
      Z.T = z, o.p = w, o.d.f();
    }
  }, Sl.preconnect = function(D, z) {
    typeof D == "string" && (z ? (z = z.crossOrigin, z = typeof z == "string" ? z === "use-credentials" ? z : "" : void 0) : z = null, o.d.C(D, z));
  }, Sl.prefetchDNS = function(D) {
    typeof D == "string" && o.d.D(D);
  }, Sl.preinit = function(D, z) {
    if (typeof D == "string" && z && typeof z.as == "string") {
      var w = z.as, X = V(w, z.crossOrigin), it = typeof z.integrity == "string" ? z.integrity : void 0, Rt = typeof z.fetchPriority == "string" ? z.fetchPriority : void 0;
      w === "style" ? o.d.S(
        D,
        typeof z.precedence == "string" ? z.precedence : void 0,
        {
          crossOrigin: X,
          integrity: it,
          fetchPriority: Rt
        }
      ) : w === "script" && o.d.X(D, {
        crossOrigin: X,
        integrity: it,
        fetchPriority: Rt,
        nonce: typeof z.nonce == "string" ? z.nonce : void 0
      });
    }
  }, Sl.preinitModule = function(D, z) {
    if (typeof D == "string")
      if (typeof z == "object" && z !== null) {
        if (z.as == null || z.as === "script") {
          var w = V(
            z.as,
            z.crossOrigin
          );
          o.d.M(D, {
            crossOrigin: w,
            integrity: typeof z.integrity == "string" ? z.integrity : void 0,
            nonce: typeof z.nonce == "string" ? z.nonce : void 0
          });
        }
      } else z == null && o.d.M(D);
  }, Sl.preload = function(D, z) {
    if (typeof D == "string" && typeof z == "object" && z !== null && typeof z.as == "string") {
      var w = z.as, X = V(w, z.crossOrigin);
      o.d.L(D, w, {
        crossOrigin: X,
        integrity: typeof z.integrity == "string" ? z.integrity : void 0,
        nonce: typeof z.nonce == "string" ? z.nonce : void 0,
        type: typeof z.type == "string" ? z.type : void 0,
        fetchPriority: typeof z.fetchPriority == "string" ? z.fetchPriority : void 0,
        referrerPolicy: typeof z.referrerPolicy == "string" ? z.referrerPolicy : void 0,
        imageSrcSet: typeof z.imageSrcSet == "string" ? z.imageSrcSet : void 0,
        imageSizes: typeof z.imageSizes == "string" ? z.imageSizes : void 0,
        media: typeof z.media == "string" ? z.media : void 0
      });
    }
  }, Sl.preloadModule = function(D, z) {
    if (typeof D == "string")
      if (z) {
        var w = V(z.as, z.crossOrigin);
        o.d.m(D, {
          as: typeof z.as == "string" && z.as !== "script" ? z.as : void 0,
          crossOrigin: w,
          integrity: typeof z.integrity == "string" ? z.integrity : void 0
        });
      } else o.d.m(D);
  }, Sl.requestFormReset = function(D) {
    o.d.r(D);
  }, Sl.unstable_batchedUpdates = function(D, z) {
    return D(z);
  }, Sl.useFormState = function(D, z, w) {
    return Z.H.useFormState(D, z, w);
  }, Sl.useFormStatus = function() {
    return Z.H.useHostTransitionStatus();
  }, Sl.version = "19.2.4", Sl;
}
var mm;
function Y0() {
  if (mm) return fs.exports;
  mm = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (y) {
        console.error(y);
      }
  }
  return f(), fs.exports = q0(), fs.exports;
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
var hm;
function X0() {
  if (hm) return Nu;
  hm = 1;
  var f = L0(), y = Ts(), v = Y0();
  function o(t) {
    var l = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        l += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function j(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function H(t) {
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
  function Z(t) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function V(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function D(t) {
    if (H(t) !== t)
      throw Error(o(188));
  }
  function z(t) {
    var l = t.alternate;
    if (!l) {
      if (l = H(t), l === null) throw Error(o(188));
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
          if (u === e) return D(n), t;
          if (u === a) return D(n), l;
          u = u.sibling;
        }
        throw Error(o(188));
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
          if (!c) throw Error(o(189));
        }
      }
      if (e.alternate !== a) throw Error(o(190));
    }
    if (e.tag !== 3) throw Error(o(188));
    return e.stateNode.current === e ? t : l;
  }
  function w(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t;
    for (t = t.child; t !== null; ) {
      if (l = w(t), l !== null) return l;
      t = t.sibling;
    }
    return null;
  }
  var X = Object.assign, it = Symbol.for("react.element"), Rt = Symbol.for("react.transitional.element"), Mt = Symbol.for("react.portal"), gt = Symbol.for("react.fragment"), Pt = Symbol.for("react.strict_mode"), k = Symbol.for("react.profiler"), at = Symbol.for("react.consumer"), Yt = Symbol.for("react.context"), Ot = Symbol.for("react.forward_ref"), nl = Symbol.for("react.suspense"), Jt = Symbol.for("react.suspense_list"), tt = Symbol.for("react.memo"), tl = Symbol.for("react.lazy"), pl = Symbol.for("react.activity"), El = Symbol.for("react.memo_cache_sentinel"), hl = Symbol.iterator;
  function Qt(t) {
    return t === null || typeof t != "object" ? null : (t = hl && t[hl] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var fl = Symbol.for("react.client.reference");
  function yl(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === fl ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case gt:
        return "Fragment";
      case k:
        return "Profiler";
      case Pt:
        return "StrictMode";
      case nl:
        return "Suspense";
      case Jt:
        return "SuspenseList";
      case pl:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case Mt:
          return "Portal";
        case Yt:
          return t.displayName || "Context";
        case at:
          return (t._context.displayName || "Context") + ".Consumer";
        case Ot:
          var l = t.render;
          return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case tt:
          return l = t.displayName || null, l !== null ? l : yl(t.type) || "Memo";
        case tl:
          l = t._payload, t = t._init;
          try {
            return yl(t(l));
          } catch {
          }
      }
    return null;
  }
  var ul = Array.isArray, _ = y.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = v.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, J = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, bt = [], Et = -1;
  function m(t) {
    return { current: t };
  }
  function b(t) {
    0 > Et || (t.current = bt[Et], bt[Et] = null, Et--);
  }
  function M(t, l) {
    Et++, bt[Et] = t.current, t.current = l;
  }
  var q = m(null), W = m(null), lt = m(null), rt = m(null);
  function I(t, l) {
    switch (M(lt, l), M(W, t), M(q, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? Rd(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = Rd(l), t = Od(l, t);
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
    b(q), M(q, t);
  }
  function Lt() {
    b(q), b(W), b(lt);
  }
  function vl(t) {
    t.memoizedState !== null && M(rt, t);
    var l = q.current, e = Od(l, t.type);
    l !== e && (M(W, t), M(q, e));
  }
  function fe(t) {
    W.current === t && (b(q), b(W)), rt.current === t && (b(rt), pu._currentValue = J);
  }
  var pa, On;
  function te(t) {
    if (pa === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        pa = l && l[1] || "", On = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + pa + t + On;
  }
  var Ka = !1;
  function Ea(t, l) {
    if (!t || Ka) return "";
    Ka = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (l) {
              var C = function() {
                throw Error();
              };
              if (Object.defineProperty(C.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(C, []);
                } catch (T) {
                  var E = T;
                }
                Reflect.construct(t, [], C);
              } else {
                try {
                  C.call();
                } catch (T) {
                  E = T;
                }
                t.call(C.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (T) {
                E = T;
              }
              (C = t()) && typeof C.catch == "function" && C.catch(function() {
              });
            }
          } catch (T) {
            if (T && E && typeof T.stack == "string")
              return [T.stack, E.stack];
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
        var r = c.split(`
`), p = i.split(`
`);
        for (n = a = 0; a < r.length && !r[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < p.length && !p[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === r.length || n === p.length)
          for (a = r.length - 1, n = p.length - 1; 1 <= a && 0 <= n && r[a] !== p[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (r[a] !== p[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || r[a] !== p[n]) {
                  var N = `
` + r[a].replace(" at new ", " at ");
                  return t.displayName && N.includes("<anonymous>") && (N = N.replace("<anonymous>", t.displayName)), N;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      Ka = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? te(e) : "";
  }
  function Aa(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return te(t.type);
      case 16:
        return te("Lazy");
      case 13:
        return t.child !== l && l !== null ? te("Suspense Fallback") : te("Suspense");
      case 19:
        return te("SuspenseList");
      case 0:
      case 15:
        return Ea(t.type, !1);
      case 11:
        return Ea(t.type.render, !1);
      case 1:
        return Ea(t.type, !0);
      case 31:
        return te("Activity");
      default:
        return "";
    }
  }
  function pe(t) {
    try {
      var l = "", e = null;
      do
        l += Aa(t, e), e = t, t = t.return;
      while (t);
      return l;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Ve = Object.prototype.hasOwnProperty, ll = f.unstable_scheduleCallback, Xt = f.unstable_cancelCallback, se = f.unstable_shouldYield, le = f.unstable_requestPaint, sl = f.unstable_now, Ja = f.unstable_getCurrentPriorityLevel, wl = f.unstable_ImmediatePriority, re = f.unstable_UserBlockingPriority, ee = f.unstable_NormalPriority, Ee = f.unstable_LowPriority, Al = f.unstable_IdlePriority, Tl = f.log, ae = f.unstable_setDisableYieldValue, Nl = null, Gt = null;
  function ct(t) {
    if (typeof Tl == "function" && ae(t), Gt && typeof Gt.setStrictMode == "function")
      try {
        Gt.setStrictMode(Nl, t);
      } catch {
      }
  }
  var cl = Math.clz32 ? Math.clz32 : oe, Cu = Math.log, Ru = Math.LN2;
  function oe(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Cu(t) / Ru | 0) | 0;
  }
  var gl = 256, Ta = 262144, Ll = 4194304;
  function zl(t) {
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
  function _a(t, l, e) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = t.suspendedLanes, c = t.pingedLanes;
    t = t.warmLanes;
    var i = a & 134217727;
    return i !== 0 ? (a = i & ~u, a !== 0 ? n = zl(a) : (c &= i, c !== 0 ? n = zl(c) : e || (e = i & ~t, e !== 0 && (n = zl(e))))) : (i = a & ~u, i !== 0 ? n = zl(i) : c !== 0 ? n = zl(c) : e || (e = a & ~t, e !== 0 && (n = zl(e)))), n === 0 ? 0 : l !== 0 && l !== n && (l & u) === 0 && (u = n & -n, e = l & -l, u >= e || u === 32 && (e & 4194048) !== 0) ? l : n;
  }
  function xl(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function Ou(t, l) {
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
  function Dn() {
    var t = Ll;
    return Ll <<= 1, (Ll & 62914560) === 0 && (Ll = 4194304), t;
  }
  function Cl(t) {
    for (var l = [], e = 0; 31 > e; e++) l.push(t);
    return l;
  }
  function de(t, l) {
    t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function ka(t, l, e, a, n, u) {
    var c = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var i = t.entanglements, r = t.expirationTimes, p = t.hiddenUpdates;
    for (e = c & ~e; 0 < e; ) {
      var N = 31 - cl(e), C = 1 << N;
      i[N] = 0, r[N] = -1;
      var E = p[N];
      if (E !== null)
        for (p[N] = null, N = 0; N < E.length; N++) {
          var T = E[N];
          T !== null && (T.lane &= -536870913);
        }
      e &= ~C;
    }
    a !== 0 && Ae(t, a, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(c & ~l));
  }
  function Ae(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var a = 31 - cl(l);
    t.entangledLanes |= l, t.entanglements[a] = t.entanglements[a] | 1073741824 | e & 261930;
  }
  function Mn(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var a = 31 - cl(e), n = 1 << a;
      n & l | t[a] & l && (t[a] |= l), e &= ~n;
    }
  }
  function Na(t, l) {
    var e = l & -l;
    return e = (e & 42) !== 0 ? 1 : we(e), (e & (t.suspendedLanes | l)) !== 0 ? 0 : e;
  }
  function we(t) {
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
  function jn(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Du() {
    var t = L.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Pd(t.type));
  }
  function Un(t, l) {
    var e = L.p;
    try {
      return L.p = t, l();
    } finally {
      L.p = e;
    }
  }
  var me = Math.random().toString(36).slice(2), el = "__reactFiber$" + me, bl = "__reactProps$" + me, Ze = "__reactContainer$" + me, $a = "__reactEvents$" + me, $c = "__reactListeners$" + me, Wc = "__reactHandles$" + me, Mu = "__reactResources$" + me, za = "__reactMarker$" + me;
  function Wa(t) {
    delete t[el], delete t[bl], delete t[$a], delete t[$c], delete t[Wc];
  }
  function Te(t) {
    var l = t[el];
    if (l) return l;
    for (var e = t.parentNode; e; ) {
      if (l = e[Ze] || e[el]) {
        if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
          for (t = Bd(t); t !== null; ) {
            if (e = t[el]) return e;
            t = Bd(t);
          }
        return l;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function Ke(t) {
    if (t = t[el] || t[Ze]) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3)
        return t;
    }
    return null;
  }
  function xa(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(o(33));
  }
  function Je(t) {
    var l = t[Mu];
    return l || (l = t[Mu] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function d(t) {
    t[za] = !0;
  }
  var A = /* @__PURE__ */ new Set(), O = {};
  function U(t, l) {
    B(t, l), B(t + "Capture", l);
  }
  function B(t, l) {
    for (O[t] = l, t = 0; t < l.length; t++)
      A.add(l[t]);
  }
  var G = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ft = {}, st = {};
  function nt(t) {
    return Ve.call(st, t) ? !0 : Ve.call(ft, t) ? !1 : G.test(t) ? st[t] = !0 : (ft[t] = !0, !1);
  }
  function vt(t, l, e) {
    if (nt(l))
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
  function Tt(t, l, e) {
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
  function jt(t, l, e, a) {
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
  function F(t) {
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
  function Bt(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
  }
  function Ca(t, l, e) {
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
  function he(t) {
    if (!t._valueTracker) {
      var l = Bt(t) ? "checked" : "value";
      t._valueTracker = Ca(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function ke(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var e = l.getValue(), a = "";
    return t && (a = Bt(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== e ? (l.setValue(t), !0) : !1;
  }
  function Ra(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Fc = /[\n"\\]/g;
  function Rl(t) {
    return t.replace(
      Fc,
      function(l) {
        return "\\" + l.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function $e(t, l, e, a, n, u, c, i) {
    t.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.type = c : t.removeAttribute("type"), l != null ? c === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + F(l)) : t.value !== "" + F(l) && (t.value = "" + F(l)) : c !== "submit" && c !== "reset" || t.removeAttribute("value"), l != null ? Fa(t, c, F(l)) : e != null ? Fa(t, c, F(e)) : a != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.name = "" + F(i) : t.removeAttribute("name");
  }
  function Hn(t, l, e, a, n, u, c, i) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), l != null || e != null) {
      if (!(u !== "submit" && u !== "reset" || l != null)) {
        he(t);
        return;
      }
      e = e != null ? "" + F(e) : "", l = l != null ? "" + F(l) : e, i || l === t.value || (t.value = l), t.defaultValue = l;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = i ? t.checked : !!a, t.defaultChecked = !!a, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (t.name = c), he(t);
  }
  function Fa(t, l, e) {
    l === "number" && Ra(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
  }
  function _e(t, l, e, a) {
    if (t = t.options, l) {
      l = {};
      for (var n = 0; n < e.length; n++)
        l["$" + e[n]] = !0;
      for (e = 0; e < t.length; e++)
        n = l.hasOwnProperty("$" + t[e].value), t[e].selected !== n && (t[e].selected = n), n && a && (t[e].defaultSelected = !0);
    } else {
      for (e = "" + F(e), l = null, n = 0; n < t.length; n++) {
        if (t[n].value === e) {
          t[n].selected = !0, a && (t[n].defaultSelected = !0);
          return;
        }
        l !== null || t[n].disabled || (l = t[n]);
      }
      l !== null && (l.selected = !0);
    }
  }
  function Ln(t, l, e) {
    if (l != null && (l = "" + F(l), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? "" + F(e) : "";
  }
  function kt(t, l, e, a) {
    if (l == null) {
      if (a != null) {
        if (e != null) throw Error(o(92));
        if (ul(a)) {
          if (1 < a.length) throw Error(o(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), l = e;
    }
    e = F(l), t.defaultValue = e, a = t.textContent, a === e && a !== "" && a !== null && (t.value = a), he(t);
  }
  function We(t, l) {
    if (l) {
      var e = t.firstChild;
      if (e && e === t.lastChild && e.nodeType === 3) {
        e.nodeValue = l;
        return;
      }
    }
    t.textContent = l;
  }
  var Cm = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Ns(t, l, e) {
    var a = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : a ? t.setProperty(l, e) : typeof e != "number" || e === 0 || Cm.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function zs(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(o(62));
    if (t = t.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || l != null && l.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "");
      for (var n in l)
        a = l[n], l.hasOwnProperty(n) && e[n] !== a && Ns(t, n, a);
    } else
      for (var u in l)
        l.hasOwnProperty(u) && Ns(t, u, l[u]);
  }
  function Ic(t) {
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
  var Rm = /* @__PURE__ */ new Map([
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
  ]), Om = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ju(t) {
    return Om.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Ne() {
  }
  var Pc = null;
  function ti(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Ia = null, Pa = null;
  function xs(t) {
    var l = Ke(t);
    if (l && (t = l.stateNode)) {
      var e = t[bl] || null;
      t: switch (t = l.stateNode, l.type) {
        case "input":
          if ($e(
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
              'input[name="' + Rl(
                "" + l
              ) + '"][type="radio"]'
            ), l = 0; l < e.length; l++) {
              var a = e[l];
              if (a !== t && a.form === t.form) {
                var n = a[bl] || null;
                if (!n) throw Error(o(90));
                $e(
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
              a = e[l], a.form === t.form && ke(a);
          }
          break t;
        case "textarea":
          Ln(t, e.value, e.defaultValue);
          break t;
        case "select":
          l = e.value, l != null && _e(t, !!e.multiple, l, !1);
      }
    }
  }
  var li = !1;
  function Cs(t, l, e) {
    if (li) return t(l, e);
    li = !0;
    try {
      var a = t(l);
      return a;
    } finally {
      if (li = !1, (Ia !== null || Pa !== null) && (pc(), Ia && (l = Ia, t = Pa, Pa = Ia = null, xs(l), t)))
        for (l = 0; l < t.length; l++) xs(t[l]);
    }
  }
  function Bn(t, l) {
    var e = t.stateNode;
    if (e === null) return null;
    var a = e[bl] || null;
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
        o(231, l, typeof e)
      );
    return e;
  }
  var ze = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ei = !1;
  if (ze)
    try {
      var qn = {};
      Object.defineProperty(qn, "passive", {
        get: function() {
          ei = !0;
        }
      }), window.addEventListener("test", qn, qn), window.removeEventListener("test", qn, qn);
    } catch {
      ei = !1;
    }
  var Fe = null, ai = null, Uu = null;
  function Rs() {
    if (Uu) return Uu;
    var t, l = ai, e = l.length, a, n = "value" in Fe ? Fe.value : Fe.textContent, u = n.length;
    for (t = 0; t < e && l[t] === n[t]; t++) ;
    var c = e - t;
    for (a = 1; a <= c && l[e - a] === n[u - a]; a++) ;
    return Uu = n.slice(t, 1 < a ? 1 - a : void 0);
  }
  function Hu(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Lu() {
    return !0;
  }
  function Os() {
    return !1;
  }
  function Ol(t) {
    function l(e, a, n, u, c) {
      this._reactName = e, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = c, this.currentTarget = null;
      for (var i in t)
        t.hasOwnProperty(i) && (e = t[i], this[i] = e ? e(u) : u[i]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Lu : Os, this.isPropagationStopped = Os, this;
    }
    return X(l.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Lu);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Lu);
      },
      persist: function() {
      },
      isPersistent: Lu
    }), l;
  }
  var Oa = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Bu = Ol(Oa), Yn = X({}, Oa, { view: 0, detail: 0 }), Dm = Ol(Yn), ni, ui, Xn, qu = X({}, Yn, {
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
    getModifierState: ii,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Xn && (Xn && t.type === "mousemove" ? (ni = t.screenX - Xn.screenX, ui = t.screenY - Xn.screenY) : ui = ni = 0, Xn = t), ni);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : ui;
    }
  }), Ds = Ol(qu), Mm = X({}, qu, { dataTransfer: 0 }), jm = Ol(Mm), Um = X({}, Yn, { relatedTarget: 0 }), ci = Ol(Um), Hm = X({}, Oa, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Lm = Ol(Hm), Bm = X({}, Oa, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), qm = Ol(Bm), Ym = X({}, Oa, { data: 0 }), Ms = Ol(Ym), Xm = {
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
  }, Gm = {
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
  }, Qm = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Vm(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = Qm[t]) ? !!l[t] : !1;
  }
  function ii() {
    return Vm;
  }
  var wm = X({}, Yn, {
    key: function(t) {
      if (t.key) {
        var l = Xm[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = Hu(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Gm[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ii,
    charCode: function(t) {
      return t.type === "keypress" ? Hu(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Hu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Zm = Ol(wm), Km = X({}, qu, {
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
  }), js = Ol(Km), Jm = X({}, Yn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ii
  }), km = Ol(Jm), $m = X({}, Oa, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Wm = Ol($m), Fm = X({}, qu, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Im = Ol(Fm), Pm = X({}, Oa, {
    newState: 0,
    oldState: 0
  }), th = Ol(Pm), lh = [9, 13, 27, 32], fi = ze && "CompositionEvent" in window, Gn = null;
  ze && "documentMode" in document && (Gn = document.documentMode);
  var eh = ze && "TextEvent" in window && !Gn, Us = ze && (!fi || Gn && 8 < Gn && 11 >= Gn), Hs = " ", Ls = !1;
  function Bs(t, l) {
    switch (t) {
      case "keyup":
        return lh.indexOf(l.keyCode) !== -1;
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
  function qs(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var tn = !1;
  function ah(t, l) {
    switch (t) {
      case "compositionend":
        return qs(l);
      case "keypress":
        return l.which !== 32 ? null : (Ls = !0, Hs);
      case "textInput":
        return t = l.data, t === Hs && Ls ? null : t;
      default:
        return null;
    }
  }
  function nh(t, l) {
    if (tn)
      return t === "compositionend" || !fi && Bs(t, l) ? (t = Rs(), Uu = ai = Fe = null, tn = !1, t) : null;
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
        return Us && l.locale !== "ko" ? null : l.data;
      default:
        return null;
    }
  }
  var uh = {
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
  function Ys(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!uh[t.type] : l === "textarea";
  }
  function Xs(t, l, e, a) {
    Ia ? Pa ? Pa.push(a) : Pa = [a] : Ia = a, l = xc(l, "onChange"), 0 < l.length && (e = new Bu(
      "onChange",
      "change",
      null,
      e,
      a
    ), t.push({ event: e, listeners: l }));
  }
  var Qn = null, Vn = null;
  function ch(t) {
    Td(t, 0);
  }
  function Yu(t) {
    var l = xa(t);
    if (ke(l)) return t;
  }
  function Gs(t, l) {
    if (t === "change") return l;
  }
  var Qs = !1;
  if (ze) {
    var si;
    if (ze) {
      var ri = "oninput" in document;
      if (!ri) {
        var Vs = document.createElement("div");
        Vs.setAttribute("oninput", "return;"), ri = typeof Vs.oninput == "function";
      }
      si = ri;
    } else si = !1;
    Qs = si && (!document.documentMode || 9 < document.documentMode);
  }
  function ws() {
    Qn && (Qn.detachEvent("onpropertychange", Zs), Vn = Qn = null);
  }
  function Zs(t) {
    if (t.propertyName === "value" && Yu(Vn)) {
      var l = [];
      Xs(
        l,
        Vn,
        t,
        ti(t)
      ), Cs(ch, l);
    }
  }
  function ih(t, l, e) {
    t === "focusin" ? (ws(), Qn = l, Vn = e, Qn.attachEvent("onpropertychange", Zs)) : t === "focusout" && ws();
  }
  function fh(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Yu(Vn);
  }
  function sh(t, l) {
    if (t === "click") return Yu(l);
  }
  function rh(t, l) {
    if (t === "input" || t === "change")
      return Yu(l);
  }
  function oh(t, l) {
    return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
  }
  var Bl = typeof Object.is == "function" ? Object.is : oh;
  function wn(t, l) {
    if (Bl(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null)
      return !1;
    var e = Object.keys(t), a = Object.keys(l);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var n = e[a];
      if (!Ve.call(l, n) || !Bl(t[n], l[n]))
        return !1;
    }
    return !0;
  }
  function Ks(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Js(t, l) {
    var e = Ks(t);
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
      e = Ks(e);
    }
  }
  function ks(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? ks(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function $s(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = Ra(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = Ra(t.document);
    }
    return l;
  }
  function oi(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var dh = ze && "documentMode" in document && 11 >= document.documentMode, ln = null, di = null, Zn = null, mi = !1;
  function Ws(t, l, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    mi || ln == null || ln !== Ra(a) || (a = ln, "selectionStart" in a && oi(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Zn && wn(Zn, a) || (Zn = a, a = xc(di, "onSelect"), 0 < a.length && (l = new Bu(
      "onSelect",
      "select",
      null,
      l,
      e
    ), t.push({ event: l, listeners: a }), l.target = ln)));
  }
  function Da(t, l) {
    var e = {};
    return e[t.toLowerCase()] = l.toLowerCase(), e["Webkit" + t] = "webkit" + l, e["Moz" + t] = "moz" + l, e;
  }
  var en = {
    animationend: Da("Animation", "AnimationEnd"),
    animationiteration: Da("Animation", "AnimationIteration"),
    animationstart: Da("Animation", "AnimationStart"),
    transitionrun: Da("Transition", "TransitionRun"),
    transitionstart: Da("Transition", "TransitionStart"),
    transitioncancel: Da("Transition", "TransitionCancel"),
    transitionend: Da("Transition", "TransitionEnd")
  }, hi = {}, Fs = {};
  ze && (Fs = document.createElement("div").style, "AnimationEvent" in window || (delete en.animationend.animation, delete en.animationiteration.animation, delete en.animationstart.animation), "TransitionEvent" in window || delete en.transitionend.transition);
  function Ma(t) {
    if (hi[t]) return hi[t];
    if (!en[t]) return t;
    var l = en[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in Fs)
        return hi[t] = l[e];
    return t;
  }
  var Is = Ma("animationend"), Ps = Ma("animationiteration"), tr = Ma("animationstart"), mh = Ma("transitionrun"), hh = Ma("transitionstart"), yh = Ma("transitioncancel"), lr = Ma("transitionend"), er = /* @__PURE__ */ new Map(), yi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  yi.push("scrollEnd");
  function ne(t, l) {
    er.set(t, l), U(l, [t]);
  }
  var Xu = typeof reportError == "function" ? reportError : function(t) {
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
  }, Zl = [], an = 0, vi = 0;
  function Gu() {
    for (var t = an, l = vi = an = 0; l < t; ) {
      var e = Zl[l];
      Zl[l++] = null;
      var a = Zl[l];
      Zl[l++] = null;
      var n = Zl[l];
      Zl[l++] = null;
      var u = Zl[l];
      if (Zl[l++] = null, a !== null && n !== null) {
        var c = a.pending;
        c === null ? n.next = n : (n.next = c.next, c.next = n), a.pending = n;
      }
      u !== 0 && ar(e, n, u);
    }
  }
  function Qu(t, l, e, a) {
    Zl[an++] = t, Zl[an++] = l, Zl[an++] = e, Zl[an++] = a, vi |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function gi(t, l, e, a) {
    return Qu(t, l, e, a), Vu(t);
  }
  function ja(t, l) {
    return Qu(t, null, null, l), Vu(t);
  }
  function ar(t, l, e) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= e, a = u.alternate, a !== null && (a.childLanes |= e), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && l !== null && (n = 31 - cl(e), t = u.hiddenUpdates, a = t[n], a === null ? t[n] = [l] : a.push(l), l.lane = e | 536870912), u) : null;
  }
  function Vu(t) {
    if (50 < mu)
      throw mu = 0, xf = null, Error(o(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var nn = {};
  function vh(t, l, e, a) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ql(t, l, e, a) {
    return new vh(t, l, e, a);
  }
  function bi(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function xe(t, l) {
    var e = t.alternate;
    return e === null ? (e = ql(
      t.tag,
      l,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 65011712, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function nr(t, l) {
    t.flags &= 65011714;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function wu(t, l, e, a, n, u) {
    var c = 0;
    if (a = t, typeof t == "function") bi(t) && (c = 1);
    else if (typeof t == "string")
      c = E0(
        t,
        e,
        q.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case pl:
          return t = ql(31, e, l, n), t.elementType = pl, t.lanes = u, t;
        case gt:
          return Ua(e.children, n, u, l);
        case Pt:
          c = 8, n |= 24;
          break;
        case k:
          return t = ql(12, e, l, n | 2), t.elementType = k, t.lanes = u, t;
        case nl:
          return t = ql(13, e, l, n), t.elementType = nl, t.lanes = u, t;
        case Jt:
          return t = ql(19, e, l, n), t.elementType = Jt, t.lanes = u, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case Yt:
                c = 10;
                break t;
              case at:
                c = 9;
                break t;
              case Ot:
                c = 11;
                break t;
              case tt:
                c = 14;
                break t;
              case tl:
                c = 16, a = null;
                break t;
            }
          c = 29, e = Error(
            o(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return l = ql(c, e, l, n), l.elementType = t, l.type = a, l.lanes = u, l;
  }
  function Ua(t, l, e, a) {
    return t = ql(7, t, a, l), t.lanes = e, t;
  }
  function Si(t, l, e) {
    return t = ql(6, t, null, l), t.lanes = e, t;
  }
  function ur(t) {
    var l = ql(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function pi(t, l, e) {
    return l = ql(
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
  var cr = /* @__PURE__ */ new WeakMap();
  function Kl(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = cr.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: pe(l)
      }, cr.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: pe(l)
    };
  }
  var un = [], cn = 0, Zu = null, Kn = 0, Jl = [], kl = 0, Ie = null, ye = 1, ve = "";
  function Ce(t, l) {
    un[cn++] = Kn, un[cn++] = Zu, Zu = t, Kn = l;
  }
  function ir(t, l, e) {
    Jl[kl++] = ye, Jl[kl++] = ve, Jl[kl++] = Ie, Ie = t;
    var a = ye;
    t = ve;
    var n = 32 - cl(a) - 1;
    a &= ~(1 << n), e += 1;
    var u = 32 - cl(l) + n;
    if (30 < u) {
      var c = n - n % 5;
      u = (a & (1 << c) - 1).toString(32), a >>= c, n -= c, ye = 1 << 32 - cl(l) + n | e << n | a, ve = u + t;
    } else
      ye = 1 << u | e << n | a, ve = t;
  }
  function Ei(t) {
    t.return !== null && (Ce(t, 1), ir(t, 1, 0));
  }
  function Ai(t) {
    for (; t === Zu; )
      Zu = un[--cn], un[cn] = null, Kn = un[--cn], un[cn] = null;
    for (; t === Ie; )
      Ie = Jl[--kl], Jl[kl] = null, ve = Jl[--kl], Jl[kl] = null, ye = Jl[--kl], Jl[kl] = null;
  }
  function fr(t, l) {
    Jl[kl++] = ye, Jl[kl++] = ve, Jl[kl++] = Ie, ye = l.id, ve = l.overflow, Ie = t;
  }
  var rl = null, Ut = null, yt = !1, Pe = null, $l = !1, Ti = Error(o(519));
  function ta(t) {
    var l = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Jn(Kl(l, t)), Ti;
  }
  function sr(t) {
    var l = t.stateNode, e = t.type, a = t.memoizedProps;
    switch (l[el] = t, l[bl] = a, e) {
      case "dialog":
        dt("cancel", l), dt("close", l);
        break;
      case "iframe":
      case "object":
      case "embed":
        dt("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < yu.length; e++)
          dt(yu[e], l);
        break;
      case "source":
        dt("error", l);
        break;
      case "img":
      case "image":
      case "link":
        dt("error", l), dt("load", l);
        break;
      case "details":
        dt("toggle", l);
        break;
      case "input":
        dt("invalid", l), Hn(
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
        dt("invalid", l);
        break;
      case "textarea":
        dt("invalid", l), kt(l, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || a.suppressHydrationWarning === !0 || xd(l.textContent, e) ? (a.popover != null && (dt("beforetoggle", l), dt("toggle", l)), a.onScroll != null && dt("scroll", l), a.onScrollEnd != null && dt("scrollend", l), a.onClick != null && (l.onclick = Ne), l = !0) : l = !1, l || ta(t, !0);
  }
  function rr(t) {
    for (rl = t.return; rl; )
      switch (rl.tag) {
        case 5:
        case 31:
        case 13:
          $l = !1;
          return;
        case 27:
        case 3:
          $l = !0;
          return;
        default:
          rl = rl.return;
      }
  }
  function fn(t) {
    if (t !== rl) return !1;
    if (!yt) return rr(t), yt = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || Qf(t.type, t.memoizedProps)), e = !e), e && Ut && ta(t), rr(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(317));
      Ut = Ld(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(317));
      Ut = Ld(t);
    } else
      l === 27 ? (l = Ut, ha(t.type) ? (t = Jf, Jf = null, Ut = t) : Ut = l) : Ut = rl ? Fl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Ha() {
    Ut = rl = null, yt = !1;
  }
  function _i() {
    var t = Pe;
    return t !== null && (Ul === null ? Ul = t : Ul.push.apply(
      Ul,
      t
    ), Pe = null), t;
  }
  function Jn(t) {
    Pe === null ? Pe = [t] : Pe.push(t);
  }
  var Ni = m(null), La = null, Re = null;
  function la(t, l, e) {
    M(Ni, l._currentValue), l._currentValue = e;
  }
  function Oe(t) {
    t._currentValue = Ni.current, b(Ni);
  }
  function zi(t, l, e) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & l) !== l ? (t.childLanes |= l, a !== null && (a.childLanes |= l)) : a !== null && (a.childLanes & l) !== l && (a.childLanes |= l), t === e) break;
      t = t.return;
    }
  }
  function xi(t, l, e, a) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var c = n.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var i = u;
          u = n;
          for (var r = 0; r < l.length; r++)
            if (i.context === l[r]) {
              u.lanes |= e, i = u.alternate, i !== null && (i.lanes |= e), zi(
                u.return,
                e,
                t
              ), a || (c = null);
              break t;
            }
          u = i.next;
        }
      } else if (n.tag === 18) {
        if (c = n.return, c === null) throw Error(o(341));
        c.lanes |= e, u = c.alternate, u !== null && (u.lanes |= e), zi(c, e, t), c = null;
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
  function sn(t, l, e, a) {
    t = null;
    for (var n = l, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var c = n.alternate;
        if (c === null) throw Error(o(387));
        if (c = c.memoizedProps, c !== null) {
          var i = n.type;
          Bl(n.pendingProps.value, c.value) || (t !== null ? t.push(i) : t = [i]);
        }
      } else if (n === rt.current) {
        if (c = n.alternate, c === null) throw Error(o(387));
        c.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(pu) : t = [pu]);
      }
      n = n.return;
    }
    t !== null && xi(
      l,
      t,
      e,
      a
    ), l.flags |= 262144;
  }
  function Ku(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Bl(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Ba(t) {
    La = t, Re = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function ol(t) {
    return or(La, t);
  }
  function Ju(t, l) {
    return La === null && Ba(t), or(t, l);
  }
  function or(t, l) {
    var e = l._currentValue;
    if (l = { context: l, memoizedValue: e, next: null }, Re === null) {
      if (t === null) throw Error(o(308));
      Re = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else Re = Re.next = l;
    return e;
  }
  var gh = typeof AbortController < "u" ? AbortController : function() {
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
  }, bh = f.unstable_scheduleCallback, Sh = f.unstable_NormalPriority, $t = {
    $$typeof: Yt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ci() {
    return {
      controller: new gh(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function kn(t) {
    t.refCount--, t.refCount === 0 && bh(Sh, function() {
      t.controller.abort();
    });
  }
  var $n = null, Ri = 0, rn = 0, on = null;
  function ph(t, l) {
    if ($n === null) {
      var e = $n = [];
      Ri = 0, rn = jf(), on = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return Ri++, l.then(dr, dr), l;
  }
  function dr() {
    if (--Ri === 0 && $n !== null) {
      on !== null && (on.status = "fulfilled");
      var t = $n;
      $n = null, rn = 0, on = null;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function Eh(t, l) {
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
  var mr = _.S;
  _.S = function(t, l) {
    Fo = sl(), typeof l == "object" && l !== null && typeof l.then == "function" && ph(t, l), mr !== null && mr(t, l);
  };
  var qa = m(null);
  function Oi() {
    var t = qa.current;
    return t !== null ? t : Dt.pooledCache;
  }
  function ku(t, l) {
    l === null ? M(qa, qa.current) : M(qa, l.pool);
  }
  function hr() {
    var t = Oi();
    return t === null ? null : { parent: $t._currentValue, pool: t };
  }
  var dn = Error(o(460)), Di = Error(o(474)), $u = Error(o(542)), Wu = { then: function() {
  } };
  function yr(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function vr(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(Ne, Ne), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, br(t), t;
      default:
        if (typeof l.status == "string") l.then(Ne, Ne);
        else {
          if (t = Dt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(o(482));
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
            throw t = l.reason, br(t), t;
        }
        throw Xa = l, dn;
    }
  }
  function Ya(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (Xa = e, dn) : e;
    }
  }
  var Xa = null;
  function gr() {
    if (Xa === null) throw Error(o(459));
    var t = Xa;
    return Xa = null, t;
  }
  function br(t) {
    if (t === dn || t === $u)
      throw Error(o(483));
  }
  var mn = null, Wn = 0;
  function Fu(t) {
    var l = Wn;
    return Wn += 1, mn === null && (mn = []), vr(mn, t, l);
  }
  function Fn(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function Iu(t, l) {
    throw l.$$typeof === it ? Error(o(525)) : (t = Object.prototype.toString.call(l), Error(
      o(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function Sr(t) {
    function l(g, h) {
      if (t) {
        var S = g.deletions;
        S === null ? (g.deletions = [h], g.flags |= 16) : S.push(h);
      }
    }
    function e(g, h) {
      if (!t) return null;
      for (; h !== null; )
        l(g, h), h = h.sibling;
      return null;
    }
    function a(g) {
      for (var h = /* @__PURE__ */ new Map(); g !== null; )
        g.key !== null ? h.set(g.key, g) : h.set(g.index, g), g = g.sibling;
      return h;
    }
    function n(g, h) {
      return g = xe(g, h), g.index = 0, g.sibling = null, g;
    }
    function u(g, h, S) {
      return g.index = S, t ? (S = g.alternate, S !== null ? (S = S.index, S < h ? (g.flags |= 67108866, h) : S) : (g.flags |= 67108866, h)) : (g.flags |= 1048576, h);
    }
    function c(g) {
      return t && g.alternate === null && (g.flags |= 67108866), g;
    }
    function i(g, h, S, x) {
      return h === null || h.tag !== 6 ? (h = Si(S, g.mode, x), h.return = g, h) : (h = n(h, S), h.return = g, h);
    }
    function r(g, h, S, x) {
      var K = S.type;
      return K === gt ? N(
        g,
        h,
        S.props.children,
        x,
        S.key
      ) : h !== null && (h.elementType === K || typeof K == "object" && K !== null && K.$$typeof === tl && Ya(K) === h.type) ? (h = n(h, S.props), Fn(h, S), h.return = g, h) : (h = wu(
        S.type,
        S.key,
        S.props,
        null,
        g.mode,
        x
      ), Fn(h, S), h.return = g, h);
    }
    function p(g, h, S, x) {
      return h === null || h.tag !== 4 || h.stateNode.containerInfo !== S.containerInfo || h.stateNode.implementation !== S.implementation ? (h = pi(S, g.mode, x), h.return = g, h) : (h = n(h, S.children || []), h.return = g, h);
    }
    function N(g, h, S, x, K) {
      return h === null || h.tag !== 7 ? (h = Ua(
        S,
        g.mode,
        x,
        K
      ), h.return = g, h) : (h = n(h, S), h.return = g, h);
    }
    function C(g, h, S) {
      if (typeof h == "string" && h !== "" || typeof h == "number" || typeof h == "bigint")
        return h = Si(
          "" + h,
          g.mode,
          S
        ), h.return = g, h;
      if (typeof h == "object" && h !== null) {
        switch (h.$$typeof) {
          case Rt:
            return S = wu(
              h.type,
              h.key,
              h.props,
              null,
              g.mode,
              S
            ), Fn(S, h), S.return = g, S;
          case Mt:
            return h = pi(
              h,
              g.mode,
              S
            ), h.return = g, h;
          case tl:
            return h = Ya(h), C(g, h, S);
        }
        if (ul(h) || Qt(h))
          return h = Ua(
            h,
            g.mode,
            S,
            null
          ), h.return = g, h;
        if (typeof h.then == "function")
          return C(g, Fu(h), S);
        if (h.$$typeof === Yt)
          return C(
            g,
            Ju(g, h),
            S
          );
        Iu(g, h);
      }
      return null;
    }
    function E(g, h, S, x) {
      var K = h !== null ? h.key : null;
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
        return K !== null ? null : i(g, h, "" + S, x);
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case Rt:
            return S.key === K ? r(g, h, S, x) : null;
          case Mt:
            return S.key === K ? p(g, h, S, x) : null;
          case tl:
            return S = Ya(S), E(g, h, S, x);
        }
        if (ul(S) || Qt(S))
          return K !== null ? null : N(g, h, S, x, null);
        if (typeof S.then == "function")
          return E(
            g,
            h,
            Fu(S),
            x
          );
        if (S.$$typeof === Yt)
          return E(
            g,
            h,
            Ju(g, S),
            x
          );
        Iu(g, S);
      }
      return null;
    }
    function T(g, h, S, x, K) {
      if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
        return g = g.get(S) || null, i(h, g, "" + x, K);
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case Rt:
            return g = g.get(
              x.key === null ? S : x.key
            ) || null, r(h, g, x, K);
          case Mt:
            return g = g.get(
              x.key === null ? S : x.key
            ) || null, p(h, g, x, K);
          case tl:
            return x = Ya(x), T(
              g,
              h,
              S,
              x,
              K
            );
        }
        if (ul(x) || Qt(x))
          return g = g.get(S) || null, N(h, g, x, K, null);
        if (typeof x.then == "function")
          return T(
            g,
            h,
            S,
            Fu(x),
            K
          );
        if (x.$$typeof === Yt)
          return T(
            g,
            h,
            S,
            Ju(h, x),
            K
          );
        Iu(h, x);
      }
      return null;
    }
    function Y(g, h, S, x) {
      for (var K = null, St = null, Q = h, ut = h = 0, ht = null; Q !== null && ut < S.length; ut++) {
        Q.index > ut ? (ht = Q, Q = null) : ht = Q.sibling;
        var pt = E(
          g,
          Q,
          S[ut],
          x
        );
        if (pt === null) {
          Q === null && (Q = ht);
          break;
        }
        t && Q && pt.alternate === null && l(g, Q), h = u(pt, h, ut), St === null ? K = pt : St.sibling = pt, St = pt, Q = ht;
      }
      if (ut === S.length)
        return e(g, Q), yt && Ce(g, ut), K;
      if (Q === null) {
        for (; ut < S.length; ut++)
          Q = C(g, S[ut], x), Q !== null && (h = u(
            Q,
            h,
            ut
          ), St === null ? K = Q : St.sibling = Q, St = Q);
        return yt && Ce(g, ut), K;
      }
      for (Q = a(Q); ut < S.length; ut++)
        ht = T(
          Q,
          g,
          ut,
          S[ut],
          x
        ), ht !== null && (t && ht.alternate !== null && Q.delete(
          ht.key === null ? ut : ht.key
        ), h = u(
          ht,
          h,
          ut
        ), St === null ? K = ht : St.sibling = ht, St = ht);
      return t && Q.forEach(function(Sa) {
        return l(g, Sa);
      }), yt && Ce(g, ut), K;
    }
    function $(g, h, S, x) {
      if (S == null) throw Error(o(151));
      for (var K = null, St = null, Q = h, ut = h = 0, ht = null, pt = S.next(); Q !== null && !pt.done; ut++, pt = S.next()) {
        Q.index > ut ? (ht = Q, Q = null) : ht = Q.sibling;
        var Sa = E(g, Q, pt.value, x);
        if (Sa === null) {
          Q === null && (Q = ht);
          break;
        }
        t && Q && Sa.alternate === null && l(g, Q), h = u(Sa, h, ut), St === null ? K = Sa : St.sibling = Sa, St = Sa, Q = ht;
      }
      if (pt.done)
        return e(g, Q), yt && Ce(g, ut), K;
      if (Q === null) {
        for (; !pt.done; ut++, pt = S.next())
          pt = C(g, pt.value, x), pt !== null && (h = u(pt, h, ut), St === null ? K = pt : St.sibling = pt, St = pt);
        return yt && Ce(g, ut), K;
      }
      for (Q = a(Q); !pt.done; ut++, pt = S.next())
        pt = T(Q, g, ut, pt.value, x), pt !== null && (t && pt.alternate !== null && Q.delete(pt.key === null ? ut : pt.key), h = u(pt, h, ut), St === null ? K = pt : St.sibling = pt, St = pt);
      return t && Q.forEach(function(M0) {
        return l(g, M0);
      }), yt && Ce(g, ut), K;
    }
    function Ct(g, h, S, x) {
      if (typeof S == "object" && S !== null && S.type === gt && S.key === null && (S = S.props.children), typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case Rt:
            t: {
              for (var K = S.key; h !== null; ) {
                if (h.key === K) {
                  if (K = S.type, K === gt) {
                    if (h.tag === 7) {
                      e(
                        g,
                        h.sibling
                      ), x = n(
                        h,
                        S.props.children
                      ), x.return = g, g = x;
                      break t;
                    }
                  } else if (h.elementType === K || typeof K == "object" && K !== null && K.$$typeof === tl && Ya(K) === h.type) {
                    e(
                      g,
                      h.sibling
                    ), x = n(h, S.props), Fn(x, S), x.return = g, g = x;
                    break t;
                  }
                  e(g, h);
                  break;
                } else l(g, h);
                h = h.sibling;
              }
              S.type === gt ? (x = Ua(
                S.props.children,
                g.mode,
                x,
                S.key
              ), x.return = g, g = x) : (x = wu(
                S.type,
                S.key,
                S.props,
                null,
                g.mode,
                x
              ), Fn(x, S), x.return = g, g = x);
            }
            return c(g);
          case Mt:
            t: {
              for (K = S.key; h !== null; ) {
                if (h.key === K)
                  if (h.tag === 4 && h.stateNode.containerInfo === S.containerInfo && h.stateNode.implementation === S.implementation) {
                    e(
                      g,
                      h.sibling
                    ), x = n(h, S.children || []), x.return = g, g = x;
                    break t;
                  } else {
                    e(g, h);
                    break;
                  }
                else l(g, h);
                h = h.sibling;
              }
              x = pi(S, g.mode, x), x.return = g, g = x;
            }
            return c(g);
          case tl:
            return S = Ya(S), Ct(
              g,
              h,
              S,
              x
            );
        }
        if (ul(S))
          return Y(
            g,
            h,
            S,
            x
          );
        if (Qt(S)) {
          if (K = Qt(S), typeof K != "function") throw Error(o(150));
          return S = K.call(S), $(
            g,
            h,
            S,
            x
          );
        }
        if (typeof S.then == "function")
          return Ct(
            g,
            h,
            Fu(S),
            x
          );
        if (S.$$typeof === Yt)
          return Ct(
            g,
            h,
            Ju(g, S),
            x
          );
        Iu(g, S);
      }
      return typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint" ? (S = "" + S, h !== null && h.tag === 6 ? (e(g, h.sibling), x = n(h, S), x.return = g, g = x) : (e(g, h), x = Si(S, g.mode, x), x.return = g, g = x), c(g)) : e(g, h);
    }
    return function(g, h, S, x) {
      try {
        Wn = 0;
        var K = Ct(
          g,
          h,
          S,
          x
        );
        return mn = null, K;
      } catch (Q) {
        if (Q === dn || Q === $u) throw Q;
        var St = ql(29, Q, null, g.mode);
        return St.lanes = x, St.return = g, St;
      } finally {
      }
    };
  }
  var Ga = Sr(!0), pr = Sr(!1), ea = !1;
  function Mi(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function ji(t, l) {
    t = t.updateQueue, l.updateQueue === t && (l.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function aa(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function na(t, l, e) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (At & 2) !== 0) {
      var n = a.pending;
      return n === null ? l.next = l : (l.next = n.next, n.next = l), a.pending = l, l = Vu(t), ar(t, null, e), l;
    }
    return Qu(t, a, l, e), Vu(t);
  }
  function In(t, l, e) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, Mn(t, e);
    }
  }
  function Ui(t, l) {
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
  var Hi = !1;
  function Pn() {
    if (Hi) {
      var t = on;
      if (t !== null) throw t;
    }
  }
  function tu(t, l, e, a) {
    Hi = !1;
    var n = t.updateQueue;
    ea = !1;
    var u = n.firstBaseUpdate, c = n.lastBaseUpdate, i = n.shared.pending;
    if (i !== null) {
      n.shared.pending = null;
      var r = i, p = r.next;
      r.next = null, c === null ? u = p : c.next = p, c = r;
      var N = t.alternate;
      N !== null && (N = N.updateQueue, i = N.lastBaseUpdate, i !== c && (i === null ? N.firstBaseUpdate = p : i.next = p, N.lastBaseUpdate = r));
    }
    if (u !== null) {
      var C = n.baseState;
      c = 0, N = p = r = null, i = u;
      do {
        var E = i.lane & -536870913, T = E !== i.lane;
        if (T ? (mt & E) === E : (a & E) === E) {
          E !== 0 && E === rn && (Hi = !0), N !== null && (N = N.next = {
            lane: 0,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          });
          t: {
            var Y = t, $ = i;
            E = l;
            var Ct = e;
            switch ($.tag) {
              case 1:
                if (Y = $.payload, typeof Y == "function") {
                  C = Y.call(Ct, C, E);
                  break t;
                }
                C = Y;
                break t;
              case 3:
                Y.flags = Y.flags & -65537 | 128;
              case 0:
                if (Y = $.payload, E = typeof Y == "function" ? Y.call(Ct, C, E) : Y, E == null) break t;
                C = X({}, C, E);
                break t;
              case 2:
                ea = !0;
            }
          }
          E = i.callback, E !== null && (t.flags |= 64, T && (t.flags |= 8192), T = n.callbacks, T === null ? n.callbacks = [E] : T.push(E));
        } else
          T = {
            lane: E,
            tag: i.tag,
            payload: i.payload,
            callback: i.callback,
            next: null
          }, N === null ? (p = N = T, r = C) : N = N.next = T, c |= E;
        if (i = i.next, i === null) {
          if (i = n.shared.pending, i === null)
            break;
          T = i, i = T.next, T.next = null, n.lastBaseUpdate = T, n.shared.pending = null;
        }
      } while (!0);
      N === null && (r = C), n.baseState = r, n.firstBaseUpdate = p, n.lastBaseUpdate = N, u === null && (n.shared.lanes = 0), sa |= c, t.lanes = c, t.memoizedState = C;
    }
  }
  function Er(t, l) {
    if (typeof t != "function")
      throw Error(o(191, t));
    t.call(l);
  }
  function Ar(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        Er(e[t], l);
  }
  var hn = m(null), Pu = m(0);
  function Tr(t, l) {
    t = Ye, M(Pu, t), M(hn, l), Ye = t | l.baseLanes;
  }
  function Li() {
    M(Pu, Ye), M(hn, hn.current);
  }
  function Bi() {
    Ye = Pu.current, b(hn), b(Pu);
  }
  var Yl = m(null), Wl = null;
  function ua(t) {
    var l = t.alternate;
    M(Zt, Zt.current & 1), M(Yl, t), Wl === null && (l === null || hn.current !== null || l.memoizedState !== null) && (Wl = t);
  }
  function qi(t) {
    M(Zt, Zt.current), M(Yl, t), Wl === null && (Wl = t);
  }
  function _r(t) {
    t.tag === 22 ? (M(Zt, Zt.current), M(Yl, t), Wl === null && (Wl = t)) : ca();
  }
  function ca() {
    M(Zt, Zt.current), M(Yl, Yl.current);
  }
  function Xl(t) {
    b(Yl), Wl === t && (Wl = null), b(Zt);
  }
  var Zt = m(0);
  function tc(t) {
    for (var l = t; l !== null; ) {
      if (l.tag === 13) {
        var e = l.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || Zf(e) || Kf(e)))
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
  var De = 0, et = null, zt = null, Wt = null, lc = !1, yn = !1, Qa = !1, ec = 0, lu = 0, vn = null, Ah = 0;
  function Vt() {
    throw Error(o(321));
  }
  function Yi(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!Bl(t[e], l[e])) return !1;
    return !0;
  }
  function Xi(t, l, e, a, n, u) {
    return De = u, et = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, _.H = t === null || t.memoizedState === null ? io : lf, Qa = !1, u = e(a, n), Qa = !1, yn && (u = zr(
      l,
      e,
      a,
      n
    )), Nr(t), u;
  }
  function Nr(t) {
    _.H = nu;
    var l = zt !== null && zt.next !== null;
    if (De = 0, Wt = zt = et = null, lc = !1, lu = 0, vn = null, l) throw Error(o(300));
    t === null || Ft || (t = t.dependencies, t !== null && Ku(t) && (Ft = !0));
  }
  function zr(t, l, e, a) {
    et = t;
    var n = 0;
    do {
      if (yn && (vn = null), lu = 0, yn = !1, 25 <= n) throw Error(o(301));
      if (n += 1, Wt = zt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      _.H = fo, u = l(e, a);
    } while (yn);
    return u;
  }
  function Th() {
    var t = _.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? eu(l) : l, t = t.useState()[0], (zt !== null ? zt.memoizedState : null) !== t && (et.flags |= 1024), l;
  }
  function Gi() {
    var t = ec !== 0;
    return ec = 0, t;
  }
  function Qi(t, l, e) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
  }
  function Vi(t) {
    if (lc) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      lc = !1;
    }
    De = 0, Wt = zt = et = null, yn = !1, lu = ec = 0, vn = null;
  }
  function _l() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Wt === null ? et.memoizedState = Wt = t : Wt = Wt.next = t, Wt;
  }
  function Kt() {
    if (zt === null) {
      var t = et.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = zt.next;
    var l = Wt === null ? et.memoizedState : Wt.next;
    if (l !== null)
      Wt = l, zt = t;
    else {
      if (t === null)
        throw et.alternate === null ? Error(o(467)) : Error(o(310));
      zt = t, t = {
        memoizedState: zt.memoizedState,
        baseState: zt.baseState,
        baseQueue: zt.baseQueue,
        queue: zt.queue,
        next: null
      }, Wt === null ? et.memoizedState = Wt = t : Wt = Wt.next = t;
    }
    return Wt;
  }
  function ac() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function eu(t) {
    var l = lu;
    return lu += 1, vn === null && (vn = []), t = vr(vn, t, l), l = et, (Wt === null ? l.memoizedState : Wt.next) === null && (l = l.alternate, _.H = l === null || l.memoizedState === null ? io : lf), t;
  }
  function nc(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return eu(t);
      if (t.$$typeof === Yt) return ol(t);
    }
    throw Error(o(438, String(t)));
  }
  function wi(t) {
    var l = null, e = et.updateQueue;
    if (e !== null && (l = e.memoCache), l == null) {
      var a = et.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (l = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = ac(), et.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), a = 0; a < t; a++)
        e[a] = El;
    return l.index++, e;
  }
  function Me(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function uc(t) {
    var l = Kt();
    return Zi(l, zt, t);
  }
  function Zi(t, l, e) {
    var a = t.queue;
    if (a === null) throw Error(o(311));
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
      var i = c = null, r = null, p = l, N = !1;
      do {
        var C = p.lane & -536870913;
        if (C !== p.lane ? (mt & C) === C : (De & C) === C) {
          var E = p.revertLane;
          if (E === 0)
            r !== null && (r = r.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: p.action,
              hasEagerState: p.hasEagerState,
              eagerState: p.eagerState,
              next: null
            }), C === rn && (N = !0);
          else if ((De & E) === E) {
            p = p.next, E === rn && (N = !0);
            continue;
          } else
            C = {
              lane: 0,
              revertLane: p.revertLane,
              gesture: null,
              action: p.action,
              hasEagerState: p.hasEagerState,
              eagerState: p.eagerState,
              next: null
            }, r === null ? (i = r = C, c = u) : r = r.next = C, et.lanes |= E, sa |= E;
          C = p.action, Qa && e(u, C), u = p.hasEagerState ? p.eagerState : e(u, C);
        } else
          E = {
            lane: C,
            revertLane: p.revertLane,
            gesture: p.gesture,
            action: p.action,
            hasEagerState: p.hasEagerState,
            eagerState: p.eagerState,
            next: null
          }, r === null ? (i = r = E, c = u) : r = r.next = E, et.lanes |= C, sa |= C;
        p = p.next;
      } while (p !== null && p !== l);
      if (r === null ? c = u : r.next = i, !Bl(u, t.memoizedState) && (Ft = !0, N && (e = on, e !== null)))
        throw e;
      t.memoizedState = u, t.baseState = c, t.baseQueue = r, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function Ki(t) {
    var l = Kt(), e = l.queue;
    if (e === null) throw Error(o(311));
    e.lastRenderedReducer = t;
    var a = e.dispatch, n = e.pending, u = l.memoizedState;
    if (n !== null) {
      e.pending = null;
      var c = n = n.next;
      do
        u = t(u, c.action), c = c.next;
      while (c !== n);
      Bl(u, l.memoizedState) || (Ft = !0), l.memoizedState = u, l.baseQueue === null && (l.baseState = u), e.lastRenderedState = u;
    }
    return [u, a];
  }
  function xr(t, l, e) {
    var a = et, n = Kt(), u = yt;
    if (u) {
      if (e === void 0) throw Error(o(407));
      e = e();
    } else e = l();
    var c = !Bl(
      (zt || n).memoizedState,
      e
    );
    if (c && (n.memoizedState = e, Ft = !0), n = n.queue, $i(Or.bind(null, a, n, t), [
      t
    ]), n.getSnapshot !== l || c || Wt !== null && Wt.memoizedState.tag & 1) {
      if (a.flags |= 2048, gn(
        9,
        { destroy: void 0 },
        Rr.bind(
          null,
          a,
          n,
          e,
          l
        ),
        null
      ), Dt === null) throw Error(o(349));
      u || (De & 127) !== 0 || Cr(a, l, e);
    }
    return e;
  }
  function Cr(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = et.updateQueue, l === null ? (l = ac(), et.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function Rr(t, l, e, a) {
    l.value = e, l.getSnapshot = a, Dr(l) && Mr(t);
  }
  function Or(t, l, e) {
    return e(function() {
      Dr(l) && Mr(t);
    });
  }
  function Dr(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !Bl(t, e);
    } catch {
      return !0;
    }
  }
  function Mr(t) {
    var l = ja(t, 2);
    l !== null && Hl(l, t, 2);
  }
  function Ji(t) {
    var l = _l();
    if (typeof t == "function") {
      var e = t;
      if (t = e(), Qa) {
        ct(!0);
        try {
          e();
        } finally {
          ct(!1);
        }
      }
    }
    return l.memoizedState = l.baseState = t, l.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Me,
      lastRenderedState: t
    }, l;
  }
  function jr(t, l, e, a) {
    return t.baseState = e, Zi(
      t,
      zt,
      typeof a == "function" ? a : Me
    );
  }
  function _h(t, l, e, a, n) {
    if (fc(t)) throw Error(o(485));
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
      _.T !== null ? e(!0) : u.isTransition = !1, a(u), e = l.pending, e === null ? (u.next = l.pending = u, Ur(l, u)) : (u.next = e.next, l.pending = e.next = u);
    }
  }
  function Ur(t, l) {
    var e = l.action, a = l.payload, n = t.state;
    if (l.isTransition) {
      var u = _.T, c = {};
      _.T = c;
      try {
        var i = e(n, a), r = _.S;
        r !== null && r(c, i), Hr(t, l, i);
      } catch (p) {
        ki(t, l, p);
      } finally {
        u !== null && c.types !== null && (u.types = c.types), _.T = u;
      }
    } else
      try {
        u = e(n, a), Hr(t, l, u);
      } catch (p) {
        ki(t, l, p);
      }
  }
  function Hr(t, l, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        Lr(t, l, a);
      },
      function(a) {
        return ki(t, l, a);
      }
    ) : Lr(t, l, e);
  }
  function Lr(t, l, e) {
    l.status = "fulfilled", l.value = e, Br(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, Ur(t, e)));
  }
  function ki(t, l, e) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        l.status = "rejected", l.reason = e, Br(l), l = l.next;
      while (l !== a);
    }
    t.action = null;
  }
  function Br(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function qr(t, l) {
    return l;
  }
  function Yr(t, l) {
    if (yt) {
      var e = Dt.formState;
      if (e !== null) {
        t: {
          var a = et;
          if (yt) {
            if (Ut) {
              l: {
                for (var n = Ut, u = $l; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break l;
                  }
                  if (n = Fl(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break l;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                Ut = Fl(
                  n.nextSibling
                ), a = n.data === "F!";
                break t;
              }
            }
            ta(a);
          }
          a = !1;
        }
        a && (l = e[0]);
      }
    }
    return e = _l(), e.memoizedState = e.baseState = l, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: qr,
      lastRenderedState: l
    }, e.queue = a, e = no.bind(
      null,
      et,
      a
    ), a.dispatch = e, a = Ji(!1), u = tf.bind(
      null,
      et,
      !1,
      a.queue
    ), a = _l(), n = {
      state: l,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = n, e = _h.bind(
      null,
      et,
      n,
      u,
      e
    ), n.dispatch = e, a.memoizedState = t, [l, e, !1];
  }
  function Xr(t) {
    var l = Kt();
    return Gr(l, zt, t);
  }
  function Gr(t, l, e) {
    if (l = Zi(
      t,
      l,
      qr
    )[0], t = uc(Me)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var a = eu(l);
      } catch (c) {
        throw c === dn ? $u : c;
      }
    else a = l;
    l = Kt();
    var n = l.queue, u = n.dispatch;
    return e !== l.memoizedState && (et.flags |= 2048, gn(
      9,
      { destroy: void 0 },
      Nh.bind(null, n, e),
      null
    )), [a, u, t];
  }
  function Nh(t, l) {
    t.action = l;
  }
  function Qr(t) {
    var l = Kt(), e = zt;
    if (e !== null)
      return Gr(l, e, t);
    Kt(), l = l.memoizedState, e = Kt();
    var a = e.queue.dispatch;
    return e.memoizedState = t, [l, a, !1];
  }
  function gn(t, l, e, a) {
    return t = { tag: t, create: e, deps: a, inst: l, next: null }, l = et.updateQueue, l === null && (l = ac(), et.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (a = e.next, e.next = t, t.next = a, l.lastEffect = t), t;
  }
  function Vr() {
    return Kt().memoizedState;
  }
  function cc(t, l, e, a) {
    var n = _l();
    et.flags |= t, n.memoizedState = gn(
      1 | l,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function ic(t, l, e, a) {
    var n = Kt();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    zt !== null && a !== null && Yi(a, zt.memoizedState.deps) ? n.memoizedState = gn(l, u, e, a) : (et.flags |= t, n.memoizedState = gn(
      1 | l,
      u,
      e,
      a
    ));
  }
  function wr(t, l) {
    cc(8390656, 8, t, l);
  }
  function $i(t, l) {
    ic(2048, 8, t, l);
  }
  function zh(t) {
    et.flags |= 4;
    var l = et.updateQueue;
    if (l === null)
      l = ac(), et.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function Zr(t) {
    var l = Kt().memoizedState;
    return zh({ ref: l, nextImpl: t }), function() {
      if ((At & 2) !== 0) throw Error(o(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function Kr(t, l) {
    return ic(4, 2, t, l);
  }
  function Jr(t, l) {
    return ic(4, 4, t, l);
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
  function $r(t, l, e) {
    e = e != null ? e.concat([t]) : null, ic(4, 4, kr.bind(null, l, t), e);
  }
  function Wi() {
  }
  function Wr(t, l) {
    var e = Kt();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    return l !== null && Yi(l, a[1]) ? a[0] : (e.memoizedState = [t, l], t);
  }
  function Fr(t, l) {
    var e = Kt();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    if (l !== null && Yi(l, a[1]))
      return a[0];
    if (a = t(), Qa) {
      ct(!0);
      try {
        t();
      } finally {
        ct(!1);
      }
    }
    return e.memoizedState = [a, l], a;
  }
  function Fi(t, l, e) {
    return e === void 0 || (De & 1073741824) !== 0 && (mt & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = Po(), et.lanes |= t, sa |= t, e);
  }
  function Ir(t, l, e, a) {
    return Bl(e, l) ? e : hn.current !== null ? (t = Fi(t, e, a), Bl(t, l) || (Ft = !0), t) : (De & 42) === 0 || (De & 1073741824) !== 0 && (mt & 261930) === 0 ? (Ft = !0, t.memoizedState = e) : (t = Po(), et.lanes |= t, sa |= t, l);
  }
  function Pr(t, l, e, a, n) {
    var u = L.p;
    L.p = u !== 0 && 8 > u ? u : 8;
    var c = _.T, i = {};
    _.T = i, tf(t, !1, l, e);
    try {
      var r = n(), p = _.S;
      if (p !== null && p(i, r), r !== null && typeof r == "object" && typeof r.then == "function") {
        var N = Eh(
          r,
          a
        );
        au(
          t,
          l,
          N,
          Vl(t)
        );
      } else
        au(
          t,
          l,
          a,
          Vl(t)
        );
    } catch (C) {
      au(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: C },
        Vl()
      );
    } finally {
      L.p = u, c !== null && i.types !== null && (c.types = i.types), _.T = c;
    }
  }
  function xh() {
  }
  function Ii(t, l, e, a) {
    if (t.tag !== 5) throw Error(o(476));
    var n = to(t).queue;
    Pr(
      t,
      n,
      l,
      J,
      e === null ? xh : function() {
        return lo(t), e(a);
      }
    );
  }
  function to(t) {
    var l = t.memoizedState;
    if (l !== null) return l;
    l = {
      memoizedState: J,
      baseState: J,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Me,
        lastRenderedState: J
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
        lastRenderedReducer: Me,
        lastRenderedState: e
      },
      next: null
    }, t.memoizedState = l, t = t.alternate, t !== null && (t.memoizedState = l), l;
  }
  function lo(t) {
    var l = to(t);
    l.next === null && (l = t.alternate.memoizedState), au(
      t,
      l.next.queue,
      {},
      Vl()
    );
  }
  function Pi() {
    return ol(pu);
  }
  function eo() {
    return Kt().memoizedState;
  }
  function ao() {
    return Kt().memoizedState;
  }
  function Ch(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = Vl();
          t = aa(e);
          var a = na(l, t, e);
          a !== null && (Hl(a, l, e), In(a, l, e)), l = { cache: Ci() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function Rh(t, l, e) {
    var a = Vl();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, fc(t) ? uo(l, e) : (e = gi(t, l, e, a), e !== null && (Hl(e, t, a), co(e, l, a)));
  }
  function no(t, l, e) {
    var a = Vl();
    au(t, l, e, a);
  }
  function au(t, l, e, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (fc(t)) uo(l, n);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = l.lastRenderedReducer, u !== null))
        try {
          var c = l.lastRenderedState, i = u(c, e);
          if (n.hasEagerState = !0, n.eagerState = i, Bl(i, c))
            return Qu(t, l, n, 0), Dt === null && Gu(), !1;
        } catch {
        } finally {
        }
      if (e = gi(t, l, n, a), e !== null)
        return Hl(e, t, a), co(e, l, a), !0;
    }
    return !1;
  }
  function tf(t, l, e, a) {
    if (a = {
      lane: 2,
      revertLane: jf(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, fc(t)) {
      if (l) throw Error(o(479));
    } else
      l = gi(
        t,
        e,
        a,
        2
      ), l !== null && Hl(l, t, 2);
  }
  function fc(t) {
    var l = t.alternate;
    return t === et || l !== null && l === et;
  }
  function uo(t, l) {
    yn = lc = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function co(t, l, e) {
    if ((e & 4194048) !== 0) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, Mn(t, e);
    }
  }
  var nu = {
    readContext: ol,
    use: nc,
    useCallback: Vt,
    useContext: Vt,
    useEffect: Vt,
    useImperativeHandle: Vt,
    useLayoutEffect: Vt,
    useInsertionEffect: Vt,
    useMemo: Vt,
    useReducer: Vt,
    useRef: Vt,
    useState: Vt,
    useDebugValue: Vt,
    useDeferredValue: Vt,
    useTransition: Vt,
    useSyncExternalStore: Vt,
    useId: Vt,
    useHostTransitionStatus: Vt,
    useFormState: Vt,
    useActionState: Vt,
    useOptimistic: Vt,
    useMemoCache: Vt,
    useCacheRefresh: Vt
  };
  nu.useEffectEvent = Vt;
  var io = {
    readContext: ol,
    use: nc,
    useCallback: function(t, l) {
      return _l().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: ol,
    useEffect: wr,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, cc(
        4194308,
        4,
        kr.bind(null, l, t),
        e
      );
    },
    useLayoutEffect: function(t, l) {
      return cc(4194308, 4, t, l);
    },
    useInsertionEffect: function(t, l) {
      cc(4, 2, t, l);
    },
    useMemo: function(t, l) {
      var e = _l();
      l = l === void 0 ? null : l;
      var a = t();
      if (Qa) {
        ct(!0);
        try {
          t();
        } finally {
          ct(!1);
        }
      }
      return e.memoizedState = [a, l], a;
    },
    useReducer: function(t, l, e) {
      var a = _l();
      if (e !== void 0) {
        var n = e(l);
        if (Qa) {
          ct(!0);
          try {
            e(l);
          } finally {
            ct(!1);
          }
        }
      } else n = l;
      return a.memoizedState = a.baseState = n, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: n
      }, a.queue = t, t = t.dispatch = Rh.bind(
        null,
        et,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var l = _l();
      return t = { current: t }, l.memoizedState = t;
    },
    useState: function(t) {
      t = Ji(t);
      var l = t.queue, e = no.bind(null, et, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: Wi,
    useDeferredValue: function(t, l) {
      var e = _l();
      return Fi(e, t, l);
    },
    useTransition: function() {
      var t = Ji(!1);
      return t = Pr.bind(
        null,
        et,
        t.queue,
        !0,
        !1
      ), _l().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, l, e) {
      var a = et, n = _l();
      if (yt) {
        if (e === void 0)
          throw Error(o(407));
        e = e();
      } else {
        if (e = l(), Dt === null)
          throw Error(o(349));
        (mt & 127) !== 0 || Cr(a, l, e);
      }
      n.memoizedState = e;
      var u = { value: e, getSnapshot: l };
      return n.queue = u, wr(Or.bind(null, a, u, t), [
        t
      ]), a.flags |= 2048, gn(
        9,
        { destroy: void 0 },
        Rr.bind(
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
      var t = _l(), l = Dt.identifierPrefix;
      if (yt) {
        var e = ve, a = ye;
        e = (a & ~(1 << 32 - cl(a) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = ec++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = Ah++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: Pi,
    useFormState: Yr,
    useActionState: Yr,
    useOptimistic: function(t) {
      var l = _l();
      l.memoizedState = l.baseState = t;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return l.queue = e, l = tf.bind(
        null,
        et,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: wi,
    useCacheRefresh: function() {
      return _l().memoizedState = Ch.bind(
        null,
        et
      );
    },
    useEffectEvent: function(t) {
      var l = _l(), e = { impl: t };
      return l.memoizedState = e, function() {
        if ((At & 2) !== 0)
          throw Error(o(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, lf = {
    readContext: ol,
    use: nc,
    useCallback: Wr,
    useContext: ol,
    useEffect: $i,
    useImperativeHandle: $r,
    useInsertionEffect: Kr,
    useLayoutEffect: Jr,
    useMemo: Fr,
    useReducer: uc,
    useRef: Vr,
    useState: function() {
      return uc(Me);
    },
    useDebugValue: Wi,
    useDeferredValue: function(t, l) {
      var e = Kt();
      return Ir(
        e,
        zt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = uc(Me)[0], l = Kt().memoizedState;
      return [
        typeof t == "boolean" ? t : eu(t),
        l
      ];
    },
    useSyncExternalStore: xr,
    useId: eo,
    useHostTransitionStatus: Pi,
    useFormState: Xr,
    useActionState: Xr,
    useOptimistic: function(t, l) {
      var e = Kt();
      return jr(e, zt, t, l);
    },
    useMemoCache: wi,
    useCacheRefresh: ao
  };
  lf.useEffectEvent = Zr;
  var fo = {
    readContext: ol,
    use: nc,
    useCallback: Wr,
    useContext: ol,
    useEffect: $i,
    useImperativeHandle: $r,
    useInsertionEffect: Kr,
    useLayoutEffect: Jr,
    useMemo: Fr,
    useReducer: Ki,
    useRef: Vr,
    useState: function() {
      return Ki(Me);
    },
    useDebugValue: Wi,
    useDeferredValue: function(t, l) {
      var e = Kt();
      return zt === null ? Fi(e, t, l) : Ir(
        e,
        zt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = Ki(Me)[0], l = Kt().memoizedState;
      return [
        typeof t == "boolean" ? t : eu(t),
        l
      ];
    },
    useSyncExternalStore: xr,
    useId: eo,
    useHostTransitionStatus: Pi,
    useFormState: Qr,
    useActionState: Qr,
    useOptimistic: function(t, l) {
      var e = Kt();
      return zt !== null ? jr(e, zt, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: wi,
    useCacheRefresh: ao
  };
  fo.useEffectEvent = Zr;
  function ef(t, l, e, a) {
    l = t.memoizedState, e = e(a, l), e = e == null ? l : X({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var af = {
    enqueueSetState: function(t, l, e) {
      t = t._reactInternals;
      var a = Vl(), n = aa(a);
      n.payload = l, e != null && (n.callback = e), l = na(t, n, a), l !== null && (Hl(l, t, a), In(l, t, a));
    },
    enqueueReplaceState: function(t, l, e) {
      t = t._reactInternals;
      var a = Vl(), n = aa(a);
      n.tag = 1, n.payload = l, e != null && (n.callback = e), l = na(t, n, a), l !== null && (Hl(l, t, a), In(l, t, a));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var e = Vl(), a = aa(e);
      a.tag = 2, l != null && (a.callback = l), l = na(t, a, e), l !== null && (Hl(l, t, e), In(l, t, e));
    }
  };
  function so(t, l, e, a, n, u, c) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, c) : l.prototype && l.prototype.isPureReactComponent ? !wn(e, a) || !wn(n, u) : !0;
  }
  function ro(t, l, e, a) {
    t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, a), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, a), l.state !== t && af.enqueueReplaceState(l, l.state, null);
  }
  function Va(t, l) {
    var e = l;
    if ("ref" in l) {
      e = {};
      for (var a in l)
        a !== "ref" && (e[a] = l[a]);
    }
    if (t = t.defaultProps) {
      e === l && (e = X({}, e));
      for (var n in t)
        e[n] === void 0 && (e[n] = t[n]);
    }
    return e;
  }
  function oo(t) {
    Xu(t);
  }
  function mo(t) {
    console.error(t);
  }
  function ho(t) {
    Xu(t);
  }
  function sc(t, l) {
    try {
      var e = t.onUncaughtError;
      e(l.value, { componentStack: l.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function yo(t, l, e) {
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
  function nf(t, l, e) {
    return e = aa(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      sc(t, l);
    }, e;
  }
  function vo(t) {
    return t = aa(t), t.tag = 3, t;
  }
  function go(t, l, e, a) {
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      t.payload = function() {
        return n(u);
      }, t.callback = function() {
        yo(l, e, a);
      };
    }
    var c = e.stateNode;
    c !== null && typeof c.componentDidCatch == "function" && (t.callback = function() {
      yo(l, e, a), typeof n != "function" && (ra === null ? ra = /* @__PURE__ */ new Set([this]) : ra.add(this));
      var i = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: i !== null ? i : ""
      });
    });
  }
  function Oh(t, l, e, a, n) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (l = e.alternate, l !== null && sn(
        l,
        e,
        n,
        !0
      ), e = Yl.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return Wl === null ? Ec() : e.alternate === null && wt === 0 && (wt = 3), e.flags &= -257, e.flags |= 65536, e.lanes = n, a === Wu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : l.add(a), Of(t, a, n)), !1;
          case 22:
            return e.flags |= 65536, a === Wu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), Of(t, a, n)), !1;
        }
        throw Error(o(435, e.tag));
      }
      return Of(t, a, n), Ec(), !1;
    }
    if (yt)
      return l = Yl.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = n, a !== Ti && (t = Error(o(422), { cause: a }), Jn(Kl(t, e)))) : (a !== Ti && (l = Error(o(423), {
        cause: a
      }), Jn(
        Kl(l, e)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = Kl(a, e), n = nf(
        t.stateNode,
        a,
        n
      ), Ui(t, n), wt !== 4 && (wt = 2)), !1;
    var u = Error(o(520), { cause: a });
    if (u = Kl(u, e), du === null ? du = [u] : du.push(u), wt !== 4 && (wt = 2), l === null) return !0;
    a = Kl(a, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = n & -n, e.lanes |= t, t = nf(e.stateNode, a, t), Ui(e, t), !1;
        case 1:
          if (l = e.type, u = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (ra === null || !ra.has(u))))
            return e.flags |= 65536, n &= -n, e.lanes |= n, n = vo(n), go(
              n,
              t,
              e,
              a
            ), Ui(e, n), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var uf = Error(o(461)), Ft = !1;
  function dl(t, l, e, a) {
    l.child = t === null ? pr(l, null, e, a) : Ga(
      l,
      t.child,
      e,
      a
    );
  }
  function bo(t, l, e, a, n) {
    e = e.render;
    var u = l.ref;
    if ("ref" in a) {
      var c = {};
      for (var i in a)
        i !== "ref" && (c[i] = a[i]);
    } else c = a;
    return Ba(l), a = Xi(
      t,
      l,
      e,
      c,
      u,
      n
    ), i = Gi(), t !== null && !Ft ? (Qi(t, l, n), je(t, l, n)) : (yt && i && Ei(l), l.flags |= 1, dl(t, l, a, n), l.child);
  }
  function So(t, l, e, a, n) {
    if (t === null) {
      var u = e.type;
      return typeof u == "function" && !bi(u) && u.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = u, po(
        t,
        l,
        u,
        a,
        n
      )) : (t = wu(
        e.type,
        null,
        a,
        l,
        l.mode,
        n
      ), t.ref = l.ref, t.return = l, l.child = t);
    }
    if (u = t.child, !hf(t, n)) {
      var c = u.memoizedProps;
      if (e = e.compare, e = e !== null ? e : wn, e(c, a) && t.ref === l.ref)
        return je(t, l, n);
    }
    return l.flags |= 1, t = xe(u, a), t.ref = l.ref, t.return = l, l.child = t;
  }
  function po(t, l, e, a, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (wn(u, a) && t.ref === l.ref)
        if (Ft = !1, l.pendingProps = a = u, hf(t, n))
          (t.flags & 131072) !== 0 && (Ft = !0);
        else
          return l.lanes = t.lanes, je(t, l, n);
    }
    return cf(
      t,
      l,
      e,
      a,
      n
    );
  }
  function Eo(t, l, e, a) {
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
        return Ao(
          t,
          l,
          u,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && ku(
          l,
          u !== null ? u.cachePool : null
        ), u !== null ? Tr(l, u) : Li(), _r(l);
      else
        return a = l.lanes = 536870912, Ao(
          t,
          l,
          u !== null ? u.baseLanes | e : e,
          e,
          a
        );
    } else
      u !== null ? (ku(l, u.cachePool), Tr(l, u), ca(), l.memoizedState = null) : (t !== null && ku(l, null), Li(), ca());
    return dl(t, l, n, e), l.child;
  }
  function uu(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function Ao(t, l, e, a, n) {
    var u = Oi();
    return u = u === null ? null : { parent: $t._currentValue, pool: u }, l.memoizedState = {
      baseLanes: e,
      cachePool: u
    }, t !== null && ku(l, null), Li(), _r(l), t !== null && sn(t, l, a, !0), l.childLanes = n, null;
  }
  function rc(t, l) {
    return l = dc(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function To(t, l, e) {
    return Ga(l, t.child, null, e), t = rc(l, l.pendingProps), t.flags |= 2, Xl(l), l.memoizedState = null, t;
  }
  function Dh(t, l, e) {
    var a = l.pendingProps, n = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (yt) {
        if (a.mode === "hidden")
          return t = rc(l, a), l.lanes = 536870912, uu(null, t);
        if (qi(l), (t = Ut) ? (t = Hd(
          t,
          $l
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: Ie !== null ? { id: ye, overflow: ve } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = ur(t), e.return = l, l.child = e, rl = l, Ut = null)) : t = null, t === null) throw ta(l);
        return l.lanes = 536870912, null;
      }
      return rc(l, a);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var c = u.dehydrated;
      if (qi(l), n)
        if (l.flags & 256)
          l.flags &= -257, l = To(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(o(558));
      else if (Ft || sn(t, l, e, !1), n = (e & t.childLanes) !== 0, Ft || n) {
        if (a = Dt, a !== null && (c = Na(a, e), c !== 0 && c !== u.retryLane))
          throw u.retryLane = c, ja(t, c), Hl(a, t, c), uf;
        Ec(), l = To(
          t,
          l,
          e
        );
      } else
        t = u.treeContext, Ut = Fl(c.nextSibling), rl = l, yt = !0, Pe = null, $l = !1, t !== null && fr(l, t), l = rc(l, a), l.flags |= 4096;
      return l;
    }
    return t = xe(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function oc(t, l) {
    var e = l.ref;
    if (e === null)
      t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(o(284));
      (t === null || t.ref !== e) && (l.flags |= 4194816);
    }
  }
  function cf(t, l, e, a, n) {
    return Ba(l), e = Xi(
      t,
      l,
      e,
      a,
      void 0,
      n
    ), a = Gi(), t !== null && !Ft ? (Qi(t, l, n), je(t, l, n)) : (yt && a && Ei(l), l.flags |= 1, dl(t, l, e, n), l.child);
  }
  function _o(t, l, e, a, n, u) {
    return Ba(l), l.updateQueue = null, e = zr(
      l,
      a,
      e,
      n
    ), Nr(t), a = Gi(), t !== null && !Ft ? (Qi(t, l, u), je(t, l, u)) : (yt && a && Ei(l), l.flags |= 1, dl(t, l, e, u), l.child);
  }
  function No(t, l, e, a, n) {
    if (Ba(l), l.stateNode === null) {
      var u = nn, c = e.contextType;
      typeof c == "object" && c !== null && (u = ol(c)), u = new e(a, u), l.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = af, l.stateNode = u, u._reactInternals = l, u = l.stateNode, u.props = a, u.state = l.memoizedState, u.refs = {}, Mi(l), c = e.contextType, u.context = typeof c == "object" && c !== null ? ol(c) : nn, u.state = l.memoizedState, c = e.getDerivedStateFromProps, typeof c == "function" && (ef(
        l,
        e,
        c,
        a
      ), u.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (c = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), c !== u.state && af.enqueueReplaceState(u, u.state, null), tu(l, a, u, n), Pn(), u.state = l.memoizedState), typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = !0;
    } else if (t === null) {
      u = l.stateNode;
      var i = l.memoizedProps, r = Va(e, i);
      u.props = r;
      var p = u.context, N = e.contextType;
      c = nn, typeof N == "object" && N !== null && (c = ol(N));
      var C = e.getDerivedStateFromProps;
      N = typeof C == "function" || typeof u.getSnapshotBeforeUpdate == "function", i = l.pendingProps !== i, N || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i || p !== c) && ro(
        l,
        u,
        a,
        c
      ), ea = !1;
      var E = l.memoizedState;
      u.state = E, tu(l, a, u, n), Pn(), p = l.memoizedState, i || E !== p || ea ? (typeof C == "function" && (ef(
        l,
        e,
        C,
        a
      ), p = l.memoizedState), (r = ea || so(
        l,
        e,
        r,
        a,
        E,
        p,
        c
      )) ? (N || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = a, l.memoizedState = p), u.props = a, u.state = p, u.context = c, a = r) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = !1);
    } else {
      u = l.stateNode, ji(t, l), c = l.memoizedProps, N = Va(e, c), u.props = N, C = l.pendingProps, E = u.context, p = e.contextType, r = nn, typeof p == "object" && p !== null && (r = ol(p)), i = e.getDerivedStateFromProps, (p = typeof i == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (c !== C || E !== r) && ro(
        l,
        u,
        a,
        r
      ), ea = !1, E = l.memoizedState, u.state = E, tu(l, a, u, n), Pn();
      var T = l.memoizedState;
      c !== C || E !== T || ea || t !== null && t.dependencies !== null && Ku(t.dependencies) ? (typeof i == "function" && (ef(
        l,
        e,
        i,
        a
      ), T = l.memoizedState), (N = ea || so(
        l,
        e,
        N,
        a,
        E,
        T,
        r
      ) || t !== null && t.dependencies !== null && Ku(t.dependencies)) ? (p || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, T, r), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        T,
        r
      )), typeof u.componentDidUpdate == "function" && (l.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || c === t.memoizedProps && E === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && E === t.memoizedState || (l.flags |= 1024), l.memoizedProps = a, l.memoizedState = T), u.props = a, u.state = T, u.context = r, a = N) : (typeof u.componentDidUpdate != "function" || c === t.memoizedProps && E === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && E === t.memoizedState || (l.flags |= 1024), a = !1);
    }
    return u = a, oc(t, l), a = (l.flags & 128) !== 0, u || a ? (u = l.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : u.render(), l.flags |= 1, t !== null && a ? (l.child = Ga(
      l,
      t.child,
      null,
      n
    ), l.child = Ga(
      l,
      null,
      e,
      n
    )) : dl(t, l, e, n), l.memoizedState = u.state, t = l.child) : t = je(
      t,
      l,
      n
    ), t;
  }
  function zo(t, l, e, a) {
    return Ha(), l.flags |= 256, dl(t, l, e, a), l.child;
  }
  var ff = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function sf(t) {
    return { baseLanes: t, cachePool: hr() };
  }
  function rf(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= Ql), t;
  }
  function xo(t, l, e) {
    var a = l.pendingProps, n = !1, u = (l.flags & 128) !== 0, c;
    if ((c = u) || (c = t !== null && t.memoizedState === null ? !1 : (Zt.current & 2) !== 0), c && (n = !0, l.flags &= -129), c = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (yt) {
        if (n ? ua(l) : ca(), (t = Ut) ? (t = Hd(
          t,
          $l
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: Ie !== null ? { id: ye, overflow: ve } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = ur(t), e.return = l, l.child = e, rl = l, Ut = null)) : t = null, t === null) throw ta(l);
        return Kf(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      var i = a.children;
      return a = a.fallback, n ? (ca(), n = l.mode, i = dc(
        { mode: "hidden", children: i },
        n
      ), a = Ua(
        a,
        n,
        e,
        null
      ), i.return = l, a.return = l, i.sibling = a, l.child = i, a = l.child, a.memoizedState = sf(e), a.childLanes = rf(
        t,
        c,
        e
      ), l.memoizedState = ff, uu(null, a)) : (ua(l), of(l, i));
    }
    var r = t.memoizedState;
    if (r !== null && (i = r.dehydrated, i !== null)) {
      if (u)
        l.flags & 256 ? (ua(l), l.flags &= -257, l = df(
          t,
          l,
          e
        )) : l.memoizedState !== null ? (ca(), l.child = t.child, l.flags |= 128, l = null) : (ca(), i = a.fallback, n = l.mode, a = dc(
          { mode: "visible", children: a.children },
          n
        ), i = Ua(
          i,
          n,
          e,
          null
        ), i.flags |= 2, a.return = l, i.return = l, a.sibling = i, l.child = a, Ga(
          l,
          t.child,
          null,
          e
        ), a = l.child, a.memoizedState = sf(e), a.childLanes = rf(
          t,
          c,
          e
        ), l.memoizedState = ff, l = uu(null, a));
      else if (ua(l), Kf(i)) {
        if (c = i.nextSibling && i.nextSibling.dataset, c) var p = c.dgst;
        c = p, a = Error(o(419)), a.stack = "", a.digest = c, Jn({ value: a, source: null, stack: null }), l = df(
          t,
          l,
          e
        );
      } else if (Ft || sn(t, l, e, !1), c = (e & t.childLanes) !== 0, Ft || c) {
        if (c = Dt, c !== null && (a = Na(c, e), a !== 0 && a !== r.retryLane))
          throw r.retryLane = a, ja(t, a), Hl(c, t, a), uf;
        Zf(i) || Ec(), l = df(
          t,
          l,
          e
        );
      } else
        Zf(i) ? (l.flags |= 192, l.child = t.child, l = null) : (t = r.treeContext, Ut = Fl(
          i.nextSibling
        ), rl = l, yt = !0, Pe = null, $l = !1, t !== null && fr(l, t), l = of(
          l,
          a.children
        ), l.flags |= 4096);
      return l;
    }
    return n ? (ca(), i = a.fallback, n = l.mode, r = t.child, p = r.sibling, a = xe(r, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = r.subtreeFlags & 65011712, p !== null ? i = xe(
      p,
      i
    ) : (i = Ua(
      i,
      n,
      e,
      null
    ), i.flags |= 2), i.return = l, a.return = l, a.sibling = i, l.child = a, uu(null, a), a = l.child, i = t.child.memoizedState, i === null ? i = sf(e) : (n = i.cachePool, n !== null ? (r = $t._currentValue, n = n.parent !== r ? { parent: r, pool: r } : n) : n = hr(), i = {
      baseLanes: i.baseLanes | e,
      cachePool: n
    }), a.memoizedState = i, a.childLanes = rf(
      t,
      c,
      e
    ), l.memoizedState = ff, uu(t.child, a)) : (ua(l), e = t.child, t = e.sibling, e = xe(e, {
      mode: "visible",
      children: a.children
    }), e.return = l, e.sibling = null, t !== null && (c = l.deletions, c === null ? (l.deletions = [t], l.flags |= 16) : c.push(t)), l.child = e, l.memoizedState = null, e);
  }
  function of(t, l) {
    return l = dc(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function dc(t, l) {
    return t = ql(22, t, null, l), t.lanes = 0, t;
  }
  function df(t, l, e) {
    return Ga(l, t.child, null, e), t = of(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function Co(t, l, e) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l), zi(t.return, l, e);
  }
  function mf(t, l, e, a, n, u) {
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
  function Ro(t, l, e) {
    var a = l.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var c = Zt.current, i = (c & 2) !== 0;
    if (i ? (c = c & 1 | 2, l.flags |= 128) : c &= 1, M(Zt, c), dl(t, l, a, e), a = yt ? Kn : 0, !i && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Co(t, e, l);
        else if (t.tag === 19)
          Co(t, e, l);
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
          t = e.alternate, t !== null && tc(t) === null && (n = e), e = e.sibling;
        e = n, e === null ? (n = l.child, l.child = null) : (n = e.sibling, e.sibling = null), mf(
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
          if (t = n.alternate, t !== null && tc(t) === null) {
            l.child = n;
            break;
          }
          t = n.sibling, n.sibling = e, e = n, n = t;
        }
        mf(
          l,
          !0,
          e,
          null,
          u,
          a
        );
        break;
      case "together":
        mf(
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
  function je(t, l, e) {
    if (t !== null && (l.dependencies = t.dependencies), sa |= l.lanes, (e & l.childLanes) === 0)
      if (t !== null) {
        if (sn(
          t,
          l,
          e,
          !1
        ), (e & l.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && l.child !== t.child)
      throw Error(o(153));
    if (l.child !== null) {
      for (t = l.child, e = xe(t, t.pendingProps), l.child = e, e.return = l; t.sibling !== null; )
        t = t.sibling, e = e.sibling = xe(t, t.pendingProps), e.return = l;
      e.sibling = null;
    }
    return l.child;
  }
  function hf(t, l) {
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Ku(t)));
  }
  function Mh(t, l, e) {
    switch (l.tag) {
      case 3:
        I(l, l.stateNode.containerInfo), la(l, $t, t.memoizedState.cache), Ha();
        break;
      case 27:
      case 5:
        vl(l);
        break;
      case 4:
        I(l, l.stateNode.containerInfo);
        break;
      case 10:
        la(
          l,
          l.type,
          l.memoizedProps.value
        );
        break;
      case 31:
        if (l.memoizedState !== null)
          return l.flags |= 128, qi(l), null;
        break;
      case 13:
        var a = l.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (ua(l), l.flags |= 128, null) : (e & l.child.childLanes) !== 0 ? xo(t, l, e) : (ua(l), t = je(
            t,
            l,
            e
          ), t !== null ? t.sibling : null);
        ua(l);
        break;
      case 19:
        var n = (t.flags & 128) !== 0;
        if (a = (e & l.childLanes) !== 0, a || (sn(
          t,
          l,
          e,
          !1
        ), a = (e & l.childLanes) !== 0), n) {
          if (a)
            return Ro(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (n = l.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), M(Zt, Zt.current), a) break;
        return null;
      case 22:
        return l.lanes = 0, Eo(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        la(l, $t, t.memoizedState.cache);
    }
    return je(t, l, e);
  }
  function Oo(t, l, e) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps)
        Ft = !0;
      else {
        if (!hf(t, e) && (l.flags & 128) === 0)
          return Ft = !1, Mh(
            t,
            l,
            e
          );
        Ft = (t.flags & 131072) !== 0;
      }
    else
      Ft = !1, yt && (l.flags & 1048576) !== 0 && ir(l, Kn, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var a = l.pendingProps;
          if (t = Ya(l.elementType), l.type = t, typeof t == "function")
            bi(t) ? (a = Va(t, a), l.tag = 1, l = No(
              null,
              l,
              t,
              a,
              e
            )) : (l.tag = 0, l = cf(
              null,
              l,
              t,
              a,
              e
            ));
          else {
            if (t != null) {
              var n = t.$$typeof;
              if (n === Ot) {
                l.tag = 11, l = bo(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              } else if (n === tt) {
                l.tag = 14, l = So(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              }
            }
            throw l = yl(t) || t, Error(o(306, l, ""));
          }
        }
        return l;
      case 0:
        return cf(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 1:
        return a = l.type, n = Va(
          a,
          l.pendingProps
        ), No(
          t,
          l,
          a,
          n,
          e
        );
      case 3:
        t: {
          if (I(
            l,
            l.stateNode.containerInfo
          ), t === null) throw Error(o(387));
          a = l.pendingProps;
          var u = l.memoizedState;
          n = u.element, ji(t, l), tu(l, a, null, e);
          var c = l.memoizedState;
          if (a = c.cache, la(l, $t, a), a !== u.cache && xi(
            l,
            [$t],
            e,
            !0
          ), Pn(), a = c.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: c.cache
            }, l.updateQueue.baseState = u, l.memoizedState = u, l.flags & 256) {
              l = zo(
                t,
                l,
                a,
                e
              );
              break t;
            } else if (a !== n) {
              n = Kl(
                Error(o(424)),
                l
              ), Jn(n), l = zo(
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
              for (Ut = Fl(t.firstChild), rl = l, yt = !0, Pe = null, $l = !0, e = pr(
                l,
                null,
                a,
                e
              ), l.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (Ha(), a === n) {
              l = je(
                t,
                l,
                e
              );
              break t;
            }
            dl(t, l, a, e);
          }
          l = l.child;
        }
        return l;
      case 26:
        return oc(t, l), t === null ? (e = Gd(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = e : yt || (e = l.type, t = l.pendingProps, a = Cc(
          lt.current
        ).createElement(e), a[el] = l, a[bl] = t, ml(a, e, t), d(a), l.stateNode = a) : l.memoizedState = Gd(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return vl(l), t === null && yt && (a = l.stateNode = qd(
          l.type,
          l.pendingProps,
          lt.current
        ), rl = l, $l = !0, n = Ut, ha(l.type) ? (Jf = n, Ut = Fl(a.firstChild)) : Ut = n), dl(
          t,
          l,
          l.pendingProps.children,
          e
        ), oc(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && yt && ((n = a = Ut) && (a = f0(
          a,
          l.type,
          l.pendingProps,
          $l
        ), a !== null ? (l.stateNode = a, rl = l, Ut = Fl(a.firstChild), $l = !1, n = !0) : n = !1), n || ta(l)), vl(l), n = l.type, u = l.pendingProps, c = t !== null ? t.memoizedProps : null, a = u.children, Qf(n, u) ? a = null : c !== null && Qf(n, c) && (l.flags |= 32), l.memoizedState !== null && (n = Xi(
          t,
          l,
          Th,
          null,
          null,
          e
        ), pu._currentValue = n), oc(t, l), dl(t, l, a, e), l.child;
      case 6:
        return t === null && yt && ((t = e = Ut) && (e = s0(
          e,
          l.pendingProps,
          $l
        ), e !== null ? (l.stateNode = e, rl = l, Ut = null, t = !0) : t = !1), t || ta(l)), null;
      case 13:
        return xo(t, l, e);
      case 4:
        return I(
          l,
          l.stateNode.containerInfo
        ), a = l.pendingProps, t === null ? l.child = Ga(
          l,
          null,
          a,
          e
        ) : dl(t, l, a, e), l.child;
      case 11:
        return bo(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 7:
        return dl(
          t,
          l,
          l.pendingProps,
          e
        ), l.child;
      case 8:
        return dl(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 12:
        return dl(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 10:
        return a = l.pendingProps, la(l, l.type, a.value), dl(t, l, a.children, e), l.child;
      case 9:
        return n = l.type._context, a = l.pendingProps.children, Ba(l), n = ol(n), a = a(n), l.flags |= 1, dl(t, l, a, e), l.child;
      case 14:
        return So(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 15:
        return po(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 19:
        return Ro(t, l, e);
      case 31:
        return Dh(t, l, e);
      case 22:
        return Eo(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return Ba(l), a = ol($t), t === null ? (n = Oi(), n === null && (n = Dt, u = Ci(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= e), n = u), l.memoizedState = { parent: a, cache: n }, Mi(l), la(l, $t, n)) : ((t.lanes & e) !== 0 && (ji(t, l), tu(l, null, null, e), Pn()), n = t.memoizedState, u = l.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, l.memoizedState = n, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = n), la(l, $t, a)) : (a = u.cache, la(l, $t, a), a !== n.cache && xi(
          l,
          [$t],
          e,
          !0
        ))), dl(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 29:
        throw l.pendingProps;
    }
    throw Error(o(156, l.tag));
  }
  function Ue(t) {
    t.flags |= 4;
  }
  function yf(t, l, e, a, n) {
    if ((l = (t.mode & 32) !== 0) && (l = !1), l) {
      if (t.flags |= 16777216, (n & 335544128) === n)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (ad()) t.flags |= 8192;
        else
          throw Xa = Wu, Di;
    } else t.flags &= -16777217;
  }
  function Do(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Kd(l))
      if (ad()) t.flags |= 8192;
      else
        throw Xa = Wu, Di;
  }
  function mc(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? Dn() : 536870912, t.lanes |= l, En |= l);
  }
  function cu(t, l) {
    if (!yt)
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
  function Ht(t) {
    var l = t.alternate !== null && t.alternate.child === t.child, e = 0, a = 0;
    if (l)
      for (var n = t.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = t, n = n.sibling;
    else
      for (n = t.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = t, n = n.sibling;
    return t.subtreeFlags |= a, t.childLanes = e, l;
  }
  function jh(t, l, e) {
    var a = l.pendingProps;
    switch (Ai(l), l.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ht(l), null;
      case 1:
        return Ht(l), null;
      case 3:
        return e = l.stateNode, a = null, t !== null && (a = t.memoizedState.cache), l.memoizedState.cache !== a && (l.flags |= 2048), Oe($t), Lt(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (fn(l) ? Ue(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, _i())), Ht(l), null;
      case 26:
        var n = l.type, u = l.memoizedState;
        return t === null ? (Ue(l), u !== null ? (Ht(l), Do(l, u)) : (Ht(l), yf(
          l,
          n,
          null,
          a,
          e
        ))) : u ? u !== t.memoizedState ? (Ue(l), Ht(l), Do(l, u)) : (Ht(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== a && Ue(l), Ht(l), yf(
          l,
          n,
          t,
          a,
          e
        )), null;
      case 27:
        if (fe(l), e = lt.current, n = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && Ue(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(o(166));
            return Ht(l), null;
          }
          t = q.current, fn(l) ? sr(l) : (t = qd(n, a, e), l.stateNode = t, Ue(l));
        }
        return Ht(l), null;
      case 5:
        if (fe(l), n = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && Ue(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(o(166));
            return Ht(l), null;
          }
          if (u = q.current, fn(l))
            sr(l);
          else {
            var c = Cc(
              lt.current
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
            u[el] = l, u[bl] = a;
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
            t: switch (ml(u, n, a), n) {
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
            a && Ue(l);
          }
        }
        return Ht(l), yf(
          l,
          l.type,
          t === null ? null : t.memoizedProps,
          l.pendingProps,
          e
        ), null;
      case 6:
        if (t && l.stateNode != null)
          t.memoizedProps !== a && Ue(l);
        else {
          if (typeof a != "string" && l.stateNode === null)
            throw Error(o(166));
          if (t = lt.current, fn(l)) {
            if (t = l.stateNode, e = l.memoizedProps, a = null, n = rl, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            t[el] = l, t = !!(t.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || xd(t.nodeValue, e)), t || ta(l, !0);
          } else
            t = Cc(t).createTextNode(
              a
            ), t[el] = l, l.stateNode = t;
        }
        return Ht(l), null;
      case 31:
        if (e = l.memoizedState, t === null || t.memoizedState !== null) {
          if (a = fn(l), e !== null) {
            if (t === null) {
              if (!a) throw Error(o(318));
              if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(557));
              t[el] = l;
            } else
              Ha(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Ht(l), t = !1;
          } else
            e = _i(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
          if (!t)
            return l.flags & 256 ? (Xl(l), l) : (Xl(l), null);
          if ((l.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Ht(l), null;
      case 13:
        if (a = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = fn(l), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(o(318));
              if (n = l.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(o(317));
              n[el] = l;
            } else
              Ha(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Ht(l), n = !1;
          } else
            n = _i(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return l.flags & 256 ? (Xl(l), l) : (Xl(l), null);
        }
        return Xl(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = a !== null, t = t !== null && t.memoizedState !== null, e && (a = l.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), mc(l, l.updateQueue), Ht(l), null);
      case 4:
        return Lt(), t === null && Bf(l.stateNode.containerInfo), Ht(l), null;
      case 10:
        return Oe(l.type), Ht(l), null;
      case 19:
        if (b(Zt), a = l.memoizedState, a === null) return Ht(l), null;
        if (n = (l.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) cu(a, !1);
          else {
            if (wt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (u = tc(t), u !== null) {
                  for (l.flags |= 128, cu(a, !1), t = u.updateQueue, l.updateQueue = t, mc(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                    nr(e, t), e = e.sibling;
                  return M(
                    Zt,
                    Zt.current & 1 | 2
                  ), yt && Ce(l, a.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            a.tail !== null && sl() > bc && (l.flags |= 128, n = !0, cu(a, !1), l.lanes = 4194304);
          }
        else {
          if (!n)
            if (t = tc(u), t !== null) {
              if (l.flags |= 128, n = !0, t = t.updateQueue, l.updateQueue = t, mc(l, t), cu(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !yt)
                return Ht(l), null;
            } else
              2 * sl() - a.renderingStartTime > bc && e !== 536870912 && (l.flags |= 128, n = !0, cu(a, !1), l.lanes = 4194304);
          a.isBackwards ? (u.sibling = l.child, l.child = u) : (t = a.last, t !== null ? t.sibling = u : l.child = u, a.last = u);
        }
        return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = sl(), t.sibling = null, e = Zt.current, M(
          Zt,
          n ? e & 1 | 2 : e & 1
        ), yt && Ce(l, a.treeForkCount), t) : (Ht(l), null);
      case 22:
      case 23:
        return Xl(l), Bi(), a = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (l.flags |= 8192) : a && (l.flags |= 8192), a ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (Ht(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : Ht(l), e = l.updateQueue, e !== null && mc(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), a = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), a !== e && (l.flags |= 2048), t !== null && b(qa), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), Oe($t), Ht(l), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, l.tag));
  }
  function Uh(t, l) {
    switch (Ai(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return Oe($t), Lt(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return fe(l), null;
      case 31:
        if (l.memoizedState !== null) {
          if (Xl(l), l.alternate === null)
            throw Error(o(340));
          Ha();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 13:
        if (Xl(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
          if (l.alternate === null)
            throw Error(o(340));
          Ha();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 19:
        return b(Zt), null;
      case 4:
        return Lt(), null;
      case 10:
        return Oe(l.type), null;
      case 22:
      case 23:
        return Xl(l), Bi(), t !== null && b(qa), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return Oe($t), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Mo(t, l) {
    switch (Ai(l), l.tag) {
      case 3:
        Oe($t), Lt();
        break;
      case 26:
      case 27:
      case 5:
        fe(l);
        break;
      case 4:
        Lt();
        break;
      case 31:
        l.memoizedState !== null && Xl(l);
        break;
      case 13:
        Xl(l);
        break;
      case 19:
        b(Zt);
        break;
      case 10:
        Oe(l.type);
        break;
      case 22:
      case 23:
        Xl(l), Bi(), t !== null && b(qa);
        break;
      case 24:
        Oe($t);
    }
  }
  function iu(t, l) {
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
      Nt(l, l.return, i);
    }
  }
  function ia(t, l, e) {
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
              var r = e, p = i;
              try {
                p();
              } catch (N) {
                Nt(
                  n,
                  r,
                  N
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (N) {
      Nt(l, l.return, N);
    }
  }
  function jo(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        Ar(l, e);
      } catch (a) {
        Nt(t, t.return, a);
      }
    }
  }
  function Uo(t, l, e) {
    e.props = Va(
      t.type,
      t.memoizedProps
    ), e.state = t.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      Nt(t, l, a);
    }
  }
  function fu(t, l) {
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
      Nt(t, l, n);
    }
  }
  function ge(t, l) {
    var e = t.ref, a = t.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          Nt(t, l, n);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (n) {
          Nt(t, l, n);
        }
      else e.current = null;
  }
  function Ho(t) {
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
      Nt(t, t.return, n);
    }
  }
  function vf(t, l, e) {
    try {
      var a = t.stateNode;
      e0(a, t.type, e, l), a[bl] = l;
    } catch (n) {
      Nt(t, t.return, n);
    }
  }
  function Lo(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && ha(t.type) || t.tag === 4;
  }
  function gf(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Lo(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && ha(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function bf(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(t, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(t), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = Ne));
    else if (a !== 4 && (a === 27 && ha(t.type) && (e = t.stateNode, l = null), t = t.child, t !== null))
      for (bf(t, l, e), t = t.sibling; t !== null; )
        bf(t, l, e), t = t.sibling;
  }
  function hc(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? e.insertBefore(t, l) : e.appendChild(t);
    else if (a !== 4 && (a === 27 && ha(t.type) && (e = t.stateNode), t = t.child, t !== null))
      for (hc(t, l, e), t = t.sibling; t !== null; )
        hc(t, l, e), t = t.sibling;
  }
  function Bo(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var a = t.type, n = l.attributes; n.length; )
        l.removeAttributeNode(n[0]);
      ml(l, a, e), l[el] = t, l[bl] = e;
    } catch (u) {
      Nt(t, t.return, u);
    }
  }
  var He = !1, It = !1, Sf = !1, qo = typeof WeakSet == "function" ? WeakSet : Set, il = null;
  function Hh(t, l) {
    if (t = t.containerInfo, Xf = Hc, t = $s(t), oi(t)) {
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
            var c = 0, i = -1, r = -1, p = 0, N = 0, C = t, E = null;
            l: for (; ; ) {
              for (var T; C !== e || n !== 0 && C.nodeType !== 3 || (i = c + n), C !== u || a !== 0 && C.nodeType !== 3 || (r = c + a), C.nodeType === 3 && (c += C.nodeValue.length), (T = C.firstChild) !== null; )
                E = C, C = T;
              for (; ; ) {
                if (C === t) break l;
                if (E === e && ++p === n && (i = c), E === u && ++N === a && (r = c), (T = C.nextSibling) !== null) break;
                C = E, E = C.parentNode;
              }
              C = T;
            }
            e = i === -1 || r === -1 ? null : { start: i, end: r };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (Gf = { focusedElem: t, selectionRange: e }, Hc = !1, il = l; il !== null; )
      if (l = il, t = l.child, (l.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = l, il = t;
      else
        for (; il !== null; ) {
          switch (l = il, u = l.alternate, t = l.flags, l.tag) {
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
                  var Y = Va(
                    e.type,
                    n
                  );
                  t = a.getSnapshotBeforeUpdate(
                    Y,
                    u
                  ), a.__reactInternalSnapshotBeforeUpdate = t;
                } catch ($) {
                  Nt(
                    e,
                    e.return,
                    $
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = l.stateNode.containerInfo, e = t.nodeType, e === 9)
                  wf(t);
                else if (e === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      wf(t);
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
              if ((t & 1024) !== 0) throw Error(o(163));
          }
          if (t = l.sibling, t !== null) {
            t.return = l.return, il = t;
            break;
          }
          il = l.return;
        }
  }
  function Yo(t, l, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Be(t, e), a & 4 && iu(5, e);
        break;
      case 1:
        if (Be(t, e), a & 4)
          if (t = e.stateNode, l === null)
            try {
              t.componentDidMount();
            } catch (c) {
              Nt(e, e.return, c);
            }
          else {
            var n = Va(
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
              Nt(
                e,
                e.return,
                c
              );
            }
          }
        a & 64 && jo(e), a & 512 && fu(e, e.return);
        break;
      case 3:
        if (Be(t, e), a & 64 && (t = e.updateQueue, t !== null)) {
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
            Ar(t, l);
          } catch (c) {
            Nt(e, e.return, c);
          }
        }
        break;
      case 27:
        l === null && a & 4 && Bo(e);
      case 26:
      case 5:
        Be(t, e), l === null && a & 4 && Ho(e), a & 512 && fu(e, e.return);
        break;
      case 12:
        Be(t, e);
        break;
      case 31:
        Be(t, e), a & 4 && Qo(t, e);
        break;
      case 13:
        Be(t, e), a & 4 && Vo(t, e), a & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = wh.bind(
          null,
          e
        ), r0(t, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || He, !a) {
          l = l !== null && l.memoizedState !== null || It, n = He;
          var u = It;
          He = a, (It = l) && !u ? qe(
            t,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : Be(t, e), He = n, It = u;
        }
        break;
      case 30:
        break;
      default:
        Be(t, e);
    }
  }
  function Xo(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, Xo(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && Wa(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var qt = null, Dl = !1;
  function Le(t, l, e) {
    for (e = e.child; e !== null; )
      Go(t, l, e), e = e.sibling;
  }
  function Go(t, l, e) {
    if (Gt && typeof Gt.onCommitFiberUnmount == "function")
      try {
        Gt.onCommitFiberUnmount(Nl, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        It || ge(e, l), Le(
          t,
          l,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        It || ge(e, l);
        var a = qt, n = Dl;
        ha(e.type) && (qt = e.stateNode, Dl = !1), Le(
          t,
          l,
          e
        ), gu(e.stateNode), qt = a, Dl = n;
        break;
      case 5:
        It || ge(e, l);
      case 6:
        if (a = qt, n = Dl, qt = null, Le(
          t,
          l,
          e
        ), qt = a, Dl = n, qt !== null)
          if (Dl)
            try {
              (qt.nodeType === 9 ? qt.body : qt.nodeName === "HTML" ? qt.ownerDocument.body : qt).removeChild(e.stateNode);
            } catch (u) {
              Nt(
                e,
                l,
                u
              );
            }
          else
            try {
              qt.removeChild(e.stateNode);
            } catch (u) {
              Nt(
                e,
                l,
                u
              );
            }
        break;
      case 18:
        qt !== null && (Dl ? (t = qt, jd(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), Rn(t)) : jd(qt, e.stateNode));
        break;
      case 4:
        a = qt, n = Dl, qt = e.stateNode.containerInfo, Dl = !0, Le(
          t,
          l,
          e
        ), qt = a, Dl = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ia(2, e, l), It || ia(4, e, l), Le(
          t,
          l,
          e
        );
        break;
      case 1:
        It || (ge(e, l), a = e.stateNode, typeof a.componentWillUnmount == "function" && Uo(
          e,
          l,
          a
        )), Le(
          t,
          l,
          e
        );
        break;
      case 21:
        Le(
          t,
          l,
          e
        );
        break;
      case 22:
        It = (a = It) || e.memoizedState !== null, Le(
          t,
          l,
          e
        ), It = a;
        break;
      default:
        Le(
          t,
          l,
          e
        );
    }
  }
  function Qo(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Rn(t);
      } catch (e) {
        Nt(l, l.return, e);
      }
    }
  }
  function Vo(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Rn(t);
      } catch (e) {
        Nt(l, l.return, e);
      }
  }
  function Lh(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return l === null && (l = t.stateNode = new qo()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new qo()), l;
      default:
        throw Error(o(435, t.tag));
    }
  }
  function yc(t, l) {
    var e = Lh(t);
    l.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var n = Zh.bind(null, t, a);
        a.then(n, n);
      }
    });
  }
  function Ml(t, l) {
    var e = l.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var n = e[a], u = t, c = l, i = c;
        t: for (; i !== null; ) {
          switch (i.tag) {
            case 27:
              if (ha(i.type)) {
                qt = i.stateNode, Dl = !1;
                break t;
              }
              break;
            case 5:
              qt = i.stateNode, Dl = !1;
              break t;
            case 3:
            case 4:
              qt = i.stateNode.containerInfo, Dl = !0;
              break t;
          }
          i = i.return;
        }
        if (qt === null) throw Error(o(160));
        Go(u, c, n), qt = null, Dl = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (l.subtreeFlags & 13886)
      for (l = l.child; l !== null; )
        wo(l, t), l = l.sibling;
  }
  var ue = null;
  function wo(t, l) {
    var e = t.alternate, a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ml(l, t), jl(t), a & 4 && (ia(3, t, t.return), iu(3, t), ia(5, t, t.return));
        break;
      case 1:
        Ml(l, t), jl(t), a & 512 && (It || e === null || ge(e, e.return)), a & 64 && He && (t = t.updateQueue, t !== null && (a = t.callbacks, a !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var n = ue;
        if (Ml(l, t), jl(t), a & 512 && (It || e === null || ge(e, e.return)), a & 4) {
          var u = e !== null ? e.memoizedState : null;
          if (a = t.memoizedState, e === null)
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  a = t.type, e = t.memoizedProps, n = n.ownerDocument || n;
                  l: switch (a) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[za] || u[el] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), ml(u, a, e), u[el] = t, d(u), a = u;
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
                      u = n.createElement(a), ml(u, a, e), n.head.appendChild(u);
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
                      u = n.createElement(a), ml(u, a, e), n.head.appendChild(u);
                      break;
                    default:
                      throw Error(o(468, a));
                  }
                  u[el] = t, d(u), a = u;
                }
                t.stateNode = a;
              } else
                Zd(
                  n,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Vd(
                n,
                a,
                t.memoizedProps
              );
          else
            u !== a ? (u === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : u.count--, a === null ? Zd(
              n,
              t.type,
              t.stateNode
            ) : Vd(
              n,
              a,
              t.memoizedProps
            )) : a === null && t.stateNode !== null && vf(
              t,
              t.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        Ml(l, t), jl(t), a & 512 && (It || e === null || ge(e, e.return)), e !== null && a & 4 && vf(
          t,
          t.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (Ml(l, t), jl(t), a & 512 && (It || e === null || ge(e, e.return)), t.flags & 32) {
          n = t.stateNode;
          try {
            We(n, "");
          } catch (Y) {
            Nt(t, t.return, Y);
          }
        }
        a & 4 && t.stateNode != null && (n = t.memoizedProps, vf(
          t,
          n,
          e !== null ? e.memoizedProps : n
        )), a & 1024 && (Sf = !0);
        break;
      case 6:
        if (Ml(l, t), jl(t), a & 4) {
          if (t.stateNode === null)
            throw Error(o(162));
          a = t.memoizedProps, e = t.stateNode;
          try {
            e.nodeValue = a;
          } catch (Y) {
            Nt(t, t.return, Y);
          }
        }
        break;
      case 3:
        if (Dc = null, n = ue, ue = Rc(l.containerInfo), Ml(l, t), ue = n, jl(t), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            Rn(l.containerInfo);
          } catch (Y) {
            Nt(t, t.return, Y);
          }
        Sf && (Sf = !1, Zo(t));
        break;
      case 4:
        a = ue, ue = Rc(
          t.stateNode.containerInfo
        ), Ml(l, t), jl(t), ue = a;
        break;
      case 12:
        Ml(l, t), jl(t);
        break;
      case 31:
        Ml(l, t), jl(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, yc(t, a)));
        break;
      case 13:
        Ml(l, t), jl(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && (gc = sl()), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, yc(t, a)));
        break;
      case 22:
        n = t.memoizedState !== null;
        var r = e !== null && e.memoizedState !== null, p = He, N = It;
        if (He = p || n, It = N || r, Ml(l, t), It = N, He = p, jl(t), a & 8192)
          t: for (l = t.stateNode, l._visibility = n ? l._visibility & -2 : l._visibility | 1, n && (e === null || r || He || It || wa(t)), e = null, l = t; ; ) {
            if (l.tag === 5 || l.tag === 26) {
              if (e === null) {
                r = e = l;
                try {
                  if (u = r.stateNode, n)
                    c = u.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none";
                  else {
                    i = r.stateNode;
                    var C = r.memoizedProps.style, E = C != null && C.hasOwnProperty("display") ? C.display : null;
                    i.style.display = E == null || typeof E == "boolean" ? "" : ("" + E).trim();
                  }
                } catch (Y) {
                  Nt(r, r.return, Y);
                }
              }
            } else if (l.tag === 6) {
              if (e === null) {
                r = l;
                try {
                  r.stateNode.nodeValue = n ? "" : r.memoizedProps;
                } catch (Y) {
                  Nt(r, r.return, Y);
                }
              }
            } else if (l.tag === 18) {
              if (e === null) {
                r = l;
                try {
                  var T = r.stateNode;
                  n ? Ud(T, !0) : Ud(r.stateNode, !1);
                } catch (Y) {
                  Nt(r, r.return, Y);
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
        a & 4 && (a = t.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, yc(t, e))));
        break;
      case 19:
        Ml(l, t), jl(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, yc(t, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Ml(l, t), jl(t);
    }
  }
  function jl(t) {
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
        if (e == null) throw Error(o(160));
        switch (e.tag) {
          case 27:
            var n = e.stateNode, u = gf(t);
            hc(t, u, n);
            break;
          case 5:
            var c = e.stateNode;
            e.flags & 32 && (We(c, ""), e.flags &= -33);
            var i = gf(t);
            hc(t, i, c);
            break;
          case 3:
          case 4:
            var r = e.stateNode.containerInfo, p = gf(t);
            bf(
              t,
              p,
              r
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (N) {
        Nt(t, t.return, N);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function Zo(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        Zo(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), t = t.sibling;
      }
  }
  function Be(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        Yo(t, l.alternate, l), l = l.sibling;
  }
  function wa(t) {
    for (t = t.child; t !== null; ) {
      var l = t;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ia(4, l, l.return), wa(l);
          break;
        case 1:
          ge(l, l.return);
          var e = l.stateNode;
          typeof e.componentWillUnmount == "function" && Uo(
            l,
            l.return,
            e
          ), wa(l);
          break;
        case 27:
          gu(l.stateNode);
        case 26:
        case 5:
          ge(l, l.return), wa(l);
          break;
        case 22:
          l.memoizedState === null && wa(l);
          break;
        case 30:
          wa(l);
          break;
        default:
          wa(l);
      }
      t = t.sibling;
    }
  }
  function qe(t, l, e) {
    for (e = e && (l.subtreeFlags & 8772) !== 0, l = l.child; l !== null; ) {
      var a = l.alternate, n = t, u = l, c = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          qe(
            n,
            u,
            e
          ), iu(4, u);
          break;
        case 1:
          if (qe(
            n,
            u,
            e
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (p) {
              Nt(a, a.return, p);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var i = a.stateNode;
            try {
              var r = n.shared.hiddenCallbacks;
              if (r !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < r.length; n++)
                  Er(r[n], i);
            } catch (p) {
              Nt(a, a.return, p);
            }
          }
          e && c & 64 && jo(u), fu(u, u.return);
          break;
        case 27:
          Bo(u);
        case 26:
        case 5:
          qe(
            n,
            u,
            e
          ), e && a === null && c & 4 && Ho(u), fu(u, u.return);
          break;
        case 12:
          qe(
            n,
            u,
            e
          );
          break;
        case 31:
          qe(
            n,
            u,
            e
          ), e && c & 4 && Qo(n, u);
          break;
        case 13:
          qe(
            n,
            u,
            e
          ), e && c & 4 && Vo(n, u);
          break;
        case 22:
          u.memoizedState === null && qe(
            n,
            u,
            e
          ), fu(u, u.return);
          break;
        case 30:
          break;
        default:
          qe(
            n,
            u,
            e
          );
      }
      l = l.sibling;
    }
  }
  function pf(t, l) {
    var e = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && kn(e));
  }
  function Ef(t, l) {
    t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && kn(t));
  }
  function ce(t, l, e, a) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        Ko(
          t,
          l,
          e,
          a
        ), l = l.sibling;
  }
  function Ko(t, l, e, a) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        ce(
          t,
          l,
          e,
          a
        ), n & 2048 && iu(9, l);
        break;
      case 1:
        ce(
          t,
          l,
          e,
          a
        );
        break;
      case 3:
        ce(
          t,
          l,
          e,
          a
        ), n & 2048 && (t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && kn(t)));
        break;
      case 12:
        if (n & 2048) {
          ce(
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
          } catch (r) {
            Nt(l, l.return, r);
          }
        } else
          ce(
            t,
            l,
            e,
            a
          );
        break;
      case 31:
        ce(
          t,
          l,
          e,
          a
        );
        break;
      case 13:
        ce(
          t,
          l,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        u = l.stateNode, c = l.alternate, l.memoizedState !== null ? u._visibility & 2 ? ce(
          t,
          l,
          e,
          a
        ) : su(t, l) : u._visibility & 2 ? ce(
          t,
          l,
          e,
          a
        ) : (u._visibility |= 2, bn(
          t,
          l,
          e,
          a,
          (l.subtreeFlags & 10256) !== 0 || !1
        )), n & 2048 && pf(c, l);
        break;
      case 24:
        ce(
          t,
          l,
          e,
          a
        ), n & 2048 && Ef(l.alternate, l);
        break;
      default:
        ce(
          t,
          l,
          e,
          a
        );
    }
  }
  function bn(t, l, e, a, n) {
    for (n = n && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var u = t, c = l, i = e, r = a, p = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          bn(
            u,
            c,
            i,
            r,
            n
          ), iu(8, c);
          break;
        case 23:
          break;
        case 22:
          var N = c.stateNode;
          c.memoizedState !== null ? N._visibility & 2 ? bn(
            u,
            c,
            i,
            r,
            n
          ) : su(
            u,
            c
          ) : (N._visibility |= 2, bn(
            u,
            c,
            i,
            r,
            n
          )), n && p & 2048 && pf(
            c.alternate,
            c
          );
          break;
        case 24:
          bn(
            u,
            c,
            i,
            r,
            n
          ), n && p & 2048 && Ef(c.alternate, c);
          break;
        default:
          bn(
            u,
            c,
            i,
            r,
            n
          );
      }
      l = l.sibling;
    }
  }
  function su(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var e = t, a = l, n = a.flags;
        switch (a.tag) {
          case 22:
            su(e, a), n & 2048 && pf(
              a.alternate,
              a
            );
            break;
          case 24:
            su(e, a), n & 2048 && Ef(a.alternate, a);
            break;
          default:
            su(e, a);
        }
        l = l.sibling;
      }
  }
  var ru = 8192;
  function Sn(t, l, e) {
    if (t.subtreeFlags & ru)
      for (t = t.child; t !== null; )
        Jo(
          t,
          l,
          e
        ), t = t.sibling;
  }
  function Jo(t, l, e) {
    switch (t.tag) {
      case 26:
        Sn(
          t,
          l,
          e
        ), t.flags & ru && t.memoizedState !== null && A0(
          e,
          ue,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Sn(
          t,
          l,
          e
        );
        break;
      case 3:
      case 4:
        var a = ue;
        ue = Rc(t.stateNode.containerInfo), Sn(
          t,
          l,
          e
        ), ue = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = ru, ru = 16777216, Sn(
          t,
          l,
          e
        ), ru = a) : Sn(
          t,
          l,
          e
        ));
        break;
      default:
        Sn(
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
  function ou(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          il = a, Wo(
            a,
            t
          );
        }
      ko(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        $o(t), t = t.sibling;
  }
  function $o(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        ou(t), t.flags & 2048 && ia(9, t, t.return);
        break;
      case 3:
        ou(t);
        break;
      case 12:
        ou(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, vc(t)) : ou(t);
        break;
      default:
        ou(t);
    }
  }
  function vc(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          il = a, Wo(
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
          ia(8, l, l.return), vc(l);
          break;
        case 22:
          e = l.stateNode, e._visibility & 2 && (e._visibility &= -3, vc(l));
          break;
        default:
          vc(l);
      }
      t = t.sibling;
    }
  }
  function Wo(t, l) {
    for (; il !== null; ) {
      var e = il;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          ia(8, e, l);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          kn(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, il = a;
      else
        t: for (e = t; il !== null; ) {
          a = il;
          var n = a.sibling, u = a.return;
          if (Xo(a), a === e) {
            il = null;
            break t;
          }
          if (n !== null) {
            n.return = u, il = n;
            break t;
          }
          il = u;
        }
    }
  }
  var Bh = {
    getCacheForType: function(t) {
      var l = ol($t), e = l.data.get(t);
      return e === void 0 && (e = t(), l.data.set(t, e)), e;
    },
    cacheSignal: function() {
      return ol($t).controller.signal;
    }
  }, qh = typeof WeakMap == "function" ? WeakMap : Map, At = 0, Dt = null, ot = null, mt = 0, _t = 0, Gl = null, fa = !1, pn = !1, Af = !1, Ye = 0, wt = 0, sa = 0, Za = 0, Tf = 0, Ql = 0, En = 0, du = null, Ul = null, _f = !1, gc = 0, Fo = 0, bc = 1 / 0, Sc = null, ra = null, al = 0, oa = null, An = null, Xe = 0, Nf = 0, zf = null, Io = null, mu = 0, xf = null;
  function Vl() {
    return (At & 2) !== 0 && mt !== 0 ? mt & -mt : _.T !== null ? jf() : Du();
  }
  function Po() {
    if (Ql === 0)
      if ((mt & 536870912) === 0 || yt) {
        var t = Ta;
        Ta <<= 1, (Ta & 3932160) === 0 && (Ta = 262144), Ql = t;
      } else Ql = 536870912;
    return t = Yl.current, t !== null && (t.flags |= 32), Ql;
  }
  function Hl(t, l, e) {
    (t === Dt && (_t === 2 || _t === 9) || t.cancelPendingCommit !== null) && (Tn(t, 0), da(
      t,
      mt,
      Ql,
      !1
    )), de(t, e), ((At & 2) === 0 || t !== Dt) && (t === Dt && ((At & 2) === 0 && (Za |= e), wt === 4 && da(
      t,
      mt,
      Ql,
      !1
    )), be(t));
  }
  function td(t, l, e) {
    if ((At & 6) !== 0) throw Error(o(327));
    var a = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || xl(t, l), n = a ? Gh(t, l) : Rf(t, l, !0), u = a;
    do {
      if (n === 0) {
        pn && !a && da(t, l, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, u && !Yh(e)) {
          n = Rf(t, l, !1), u = !1;
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
              n = du;
              var r = i.current.memoizedState.isDehydrated;
              if (r && (Tn(i, c).flags |= 256), c = Rf(
                i,
                c,
                !1
              ), c !== 2) {
                if (Af && !r) {
                  i.errorRecoveryDisabledLanes |= u, Za |= u, n = 4;
                  break t;
                }
                u = Ul, Ul = n, u !== null && (Ul === null ? Ul = u : Ul.push.apply(
                  Ul,
                  u
                ));
              }
              n = c;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Tn(t, 0), da(t, l, 0, !0);
          break;
        }
        t: {
          switch (a = t, u = n, u) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((l & 4194048) !== l) break;
            case 6:
              da(
                a,
                l,
                Ql,
                !fa
              );
              break t;
            case 2:
              Ul = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((l & 62914560) === l && (n = gc + 300 - sl(), 10 < n)) {
            if (da(
              a,
              l,
              Ql,
              !fa
            ), _a(a, 0, !0) !== 0) break t;
            Xe = l, a.timeoutHandle = Dd(
              ld.bind(
                null,
                a,
                e,
                Ul,
                Sc,
                _f,
                l,
                Ql,
                Za,
                En,
                fa,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break t;
          }
          ld(
            a,
            e,
            Ul,
            Sc,
            _f,
            l,
            Ql,
            Za,
            En,
            fa,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    be(t);
  }
  function ld(t, l, e, a, n, u, c, i, r, p, N, C, E, T) {
    if (t.timeoutHandle = -1, C = l.subtreeFlags, C & 8192 || (C & 16785408) === 16785408) {
      C = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ne
      }, Jo(
        l,
        u,
        C
      );
      var Y = (u & 62914560) === u ? gc - sl() : (u & 4194048) === u ? Fo - sl() : 0;
      if (Y = T0(
        C,
        Y
      ), Y !== null) {
        Xe = u, t.cancelPendingCommit = Y(
          sd.bind(
            null,
            t,
            l,
            u,
            e,
            a,
            n,
            c,
            i,
            r,
            N,
            C,
            null,
            E,
            T
          )
        ), da(t, u, c, !p);
        return;
      }
    }
    sd(
      t,
      l,
      u,
      e,
      a,
      n,
      c,
      i,
      r
    );
  }
  function Yh(t) {
    for (var l = t; ; ) {
      var e = l.tag;
      if ((e === 0 || e === 11 || e === 15) && l.flags & 16384 && (e = l.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var n = e[a], u = n.getSnapshot;
          n = n.value;
          try {
            if (!Bl(u(), n)) return !1;
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
  function da(t, l, e, a) {
    l &= ~Tf, l &= ~Za, t.suspendedLanes |= l, t.pingedLanes &= ~l, a && (t.warmLanes |= l), a = t.expirationTimes;
    for (var n = l; 0 < n; ) {
      var u = 31 - cl(n), c = 1 << u;
      a[u] = -1, n &= ~c;
    }
    e !== 0 && Ae(t, e, l);
  }
  function pc() {
    return (At & 6) === 0 ? (hu(0), !1) : !0;
  }
  function Cf() {
    if (ot !== null) {
      if (_t === 0)
        var t = ot.return;
      else
        t = ot, Re = La = null, Vi(t), mn = null, Wn = 0, t = ot;
      for (; t !== null; )
        Mo(t.alternate, t), t = t.return;
      ot = null;
    }
  }
  function Tn(t, l) {
    var e = t.timeoutHandle;
    e !== -1 && (t.timeoutHandle = -1, u0(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), Xe = 0, Cf(), Dt = t, ot = e = xe(t.current, null), mt = l, _t = 0, Gl = null, fa = !1, pn = xl(t, l), Af = !1, En = Ql = Tf = Za = sa = wt = 0, Ul = du = null, _f = !1, (l & 8) !== 0 && (l |= l & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= l; 0 < a; ) {
        var n = 31 - cl(a), u = 1 << n;
        l |= t[n], a &= ~u;
      }
    return Ye = l, Gu(), e;
  }
  function ed(t, l) {
    et = null, _.H = nu, l === dn || l === $u ? (l = gr(), _t = 3) : l === Di ? (l = gr(), _t = 4) : _t = l === uf ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, Gl = l, ot === null && (wt = 1, sc(
      t,
      Kl(l, t.current)
    ));
  }
  function ad() {
    var t = Yl.current;
    return t === null ? !0 : (mt & 4194048) === mt ? Wl === null : (mt & 62914560) === mt || (mt & 536870912) !== 0 ? t === Wl : !1;
  }
  function nd() {
    var t = _.H;
    return _.H = nu, t === null ? nu : t;
  }
  function ud() {
    var t = _.A;
    return _.A = Bh, t;
  }
  function Ec() {
    wt = 4, fa || (mt & 4194048) !== mt && Yl.current !== null || (pn = !0), (sa & 134217727) === 0 && (Za & 134217727) === 0 || Dt === null || da(
      Dt,
      mt,
      Ql,
      !1
    );
  }
  function Rf(t, l, e) {
    var a = At;
    At |= 2;
    var n = nd(), u = ud();
    (Dt !== t || mt !== l) && (Sc = null, Tn(t, l)), l = !1;
    var c = wt;
    t: do
      try {
        if (_t !== 0 && ot !== null) {
          var i = ot, r = Gl;
          switch (_t) {
            case 8:
              Cf(), c = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Yl.current === null && (l = !0);
              var p = _t;
              if (_t = 0, Gl = null, _n(t, i, r, p), e && pn) {
                c = 0;
                break t;
              }
              break;
            default:
              p = _t, _t = 0, Gl = null, _n(t, i, r, p);
          }
        }
        Xh(), c = wt;
        break;
      } catch (N) {
        ed(t, N);
      }
    while (!0);
    return l && t.shellSuspendCounter++, Re = La = null, At = a, _.H = n, _.A = u, ot === null && (Dt = null, mt = 0, Gu()), c;
  }
  function Xh() {
    for (; ot !== null; ) cd(ot);
  }
  function Gh(t, l) {
    var e = At;
    At |= 2;
    var a = nd(), n = ud();
    Dt !== t || mt !== l ? (Sc = null, bc = sl() + 500, Tn(t, l)) : pn = xl(
      t,
      l
    );
    t: do
      try {
        if (_t !== 0 && ot !== null) {
          l = ot;
          var u = Gl;
          l: switch (_t) {
            case 1:
              _t = 0, Gl = null, _n(t, l, u, 1);
              break;
            case 2:
            case 9:
              if (yr(u)) {
                _t = 0, Gl = null, id(l);
                break;
              }
              l = function() {
                _t !== 2 && _t !== 9 || Dt !== t || (_t = 7), be(t);
              }, u.then(l, l);
              break t;
            case 3:
              _t = 7;
              break t;
            case 4:
              _t = 5;
              break t;
            case 7:
              yr(u) ? (_t = 0, Gl = null, id(l)) : (_t = 0, Gl = null, _n(t, l, u, 7));
              break;
            case 5:
              var c = null;
              switch (ot.tag) {
                case 26:
                  c = ot.memoizedState;
                case 5:
                case 27:
                  var i = ot;
                  if (c ? Kd(c) : i.stateNode.complete) {
                    _t = 0, Gl = null;
                    var r = i.sibling;
                    if (r !== null) ot = r;
                    else {
                      var p = i.return;
                      p !== null ? (ot = p, Ac(p)) : ot = null;
                    }
                    break l;
                  }
              }
              _t = 0, Gl = null, _n(t, l, u, 5);
              break;
            case 6:
              _t = 0, Gl = null, _n(t, l, u, 6);
              break;
            case 8:
              Cf(), wt = 6;
              break t;
            default:
              throw Error(o(462));
          }
        }
        Qh();
        break;
      } catch (N) {
        ed(t, N);
      }
    while (!0);
    return Re = La = null, _.H = a, _.A = n, At = e, ot !== null ? 0 : (Dt = null, mt = 0, Gu(), wt);
  }
  function Qh() {
    for (; ot !== null && !se(); )
      cd(ot);
  }
  function cd(t) {
    var l = Oo(t.alternate, t, Ye);
    t.memoizedProps = t.pendingProps, l === null ? Ac(t) : ot = l;
  }
  function id(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = _o(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          mt
        );
        break;
      case 11:
        l = _o(
          e,
          l,
          l.pendingProps,
          l.type.render,
          l.ref,
          mt
        );
        break;
      case 5:
        Vi(l);
      default:
        Mo(e, l), l = ot = nr(l, Ye), l = Oo(e, l, Ye);
    }
    t.memoizedProps = t.pendingProps, l === null ? Ac(t) : ot = l;
  }
  function _n(t, l, e, a) {
    Re = La = null, Vi(l), mn = null, Wn = 0;
    var n = l.return;
    try {
      if (Oh(
        t,
        n,
        l,
        e,
        mt
      )) {
        wt = 1, sc(
          t,
          Kl(e, t.current)
        ), ot = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw ot = n, u;
      wt = 1, sc(
        t,
        Kl(e, t.current)
      ), ot = null;
      return;
    }
    l.flags & 32768 ? (yt || a === 1 ? t = !0 : pn || (mt & 536870912) !== 0 ? t = !1 : (fa = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Yl.current, a !== null && a.tag === 13 && (a.flags |= 16384))), fd(l, t)) : Ac(l);
  }
  function Ac(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        fd(
          l,
          fa
        );
        return;
      }
      t = l.return;
      var e = jh(
        l.alternate,
        l,
        Ye
      );
      if (e !== null) {
        ot = e;
        return;
      }
      if (l = l.sibling, l !== null) {
        ot = l;
        return;
      }
      ot = l = t;
    } while (l !== null);
    wt === 0 && (wt = 5);
  }
  function fd(t, l) {
    do {
      var e = Uh(t.alternate, t);
      if (e !== null) {
        e.flags &= 32767, ot = e;
        return;
      }
      if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !l && (t = t.sibling, t !== null)) {
        ot = t;
        return;
      }
      ot = t = e;
    } while (t !== null);
    wt = 6, ot = null;
  }
  function sd(t, l, e, a, n, u, c, i, r) {
    t.cancelPendingCommit = null;
    do
      Tc();
    while (al !== 0);
    if ((At & 6) !== 0) throw Error(o(327));
    if (l !== null) {
      if (l === t.current) throw Error(o(177));
      if (u = l.lanes | l.childLanes, u |= vi, ka(
        t,
        e,
        u,
        c,
        i,
        r
      ), t === Dt && (ot = Dt = null, mt = 0), An = l, oa = t, Xe = e, Nf = u, zf = n, Io = a, (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Kh(ee, function() {
        return hd(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), a = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || a) {
        a = _.T, _.T = null, n = L.p, L.p = 2, c = At, At |= 4;
        try {
          Hh(t, l, e);
        } finally {
          At = c, L.p = n, _.T = a;
        }
      }
      al = 1, rd(), od(), dd();
    }
  }
  function rd() {
    if (al === 1) {
      al = 0;
      var t = oa, l = An, e = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || e) {
        e = _.T, _.T = null;
        var a = L.p;
        L.p = 2;
        var n = At;
        At |= 4;
        try {
          wo(l, t);
          var u = Gf, c = $s(t.containerInfo), i = u.focusedElem, r = u.selectionRange;
          if (c !== i && i && i.ownerDocument && ks(
            i.ownerDocument.documentElement,
            i
          )) {
            if (r !== null && oi(i)) {
              var p = r.start, N = r.end;
              if (N === void 0 && (N = p), "selectionStart" in i)
                i.selectionStart = p, i.selectionEnd = Math.min(
                  N,
                  i.value.length
                );
              else {
                var C = i.ownerDocument || document, E = C && C.defaultView || window;
                if (E.getSelection) {
                  var T = E.getSelection(), Y = i.textContent.length, $ = Math.min(r.start, Y), Ct = r.end === void 0 ? $ : Math.min(r.end, Y);
                  !T.extend && $ > Ct && (c = Ct, Ct = $, $ = c);
                  var g = Js(
                    i,
                    $
                  ), h = Js(
                    i,
                    Ct
                  );
                  if (g && h && (T.rangeCount !== 1 || T.anchorNode !== g.node || T.anchorOffset !== g.offset || T.focusNode !== h.node || T.focusOffset !== h.offset)) {
                    var S = C.createRange();
                    S.setStart(g.node, g.offset), T.removeAllRanges(), $ > Ct ? (T.addRange(S), T.extend(h.node, h.offset)) : (S.setEnd(h.node, h.offset), T.addRange(S));
                  }
                }
              }
            }
            for (C = [], T = i; T = T.parentNode; )
              T.nodeType === 1 && C.push({
                element: T,
                left: T.scrollLeft,
                top: T.scrollTop
              });
            for (typeof i.focus == "function" && i.focus(), i = 0; i < C.length; i++) {
              var x = C[i];
              x.element.scrollLeft = x.left, x.element.scrollTop = x.top;
            }
          }
          Hc = !!Xf, Gf = Xf = null;
        } finally {
          At = n, L.p = a, _.T = e;
        }
      }
      t.current = l, al = 2;
    }
  }
  function od() {
    if (al === 2) {
      al = 0;
      var t = oa, l = An, e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        e = _.T, _.T = null;
        var a = L.p;
        L.p = 2;
        var n = At;
        At |= 4;
        try {
          Yo(t, l.alternate, l);
        } finally {
          At = n, L.p = a, _.T = e;
        }
      }
      al = 3;
    }
  }
  function dd() {
    if (al === 4 || al === 3) {
      al = 0, le();
      var t = oa, l = An, e = Xe, a = Io;
      (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? al = 5 : (al = 0, An = oa = null, md(t, t.pendingLanes));
      var n = t.pendingLanes;
      if (n === 0 && (ra = null), jn(e), l = l.stateNode, Gt && typeof Gt.onCommitFiberRoot == "function")
        try {
          Gt.onCommitFiberRoot(
            Nl,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        l = _.T, n = L.p, L.p = 2, _.T = null;
        try {
          for (var u = t.onRecoverableError, c = 0; c < a.length; c++) {
            var i = a[c];
            u(i.value, {
              componentStack: i.stack
            });
          }
        } finally {
          _.T = l, L.p = n;
        }
      }
      (Xe & 3) !== 0 && Tc(), be(t), n = t.pendingLanes, (e & 261930) !== 0 && (n & 42) !== 0 ? t === xf ? mu++ : (mu = 0, xf = t) : mu = 0, hu(0);
    }
  }
  function md(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, kn(l)));
  }
  function Tc() {
    return rd(), od(), dd(), hd();
  }
  function hd() {
    if (al !== 5) return !1;
    var t = oa, l = Nf;
    Nf = 0;
    var e = jn(Xe), a = _.T, n = L.p;
    try {
      L.p = 32 > e ? 32 : e, _.T = null, e = zf, zf = null;
      var u = oa, c = Xe;
      if (al = 0, An = oa = null, Xe = 0, (At & 6) !== 0) throw Error(o(331));
      var i = At;
      if (At |= 4, $o(u.current), Ko(
        u,
        u.current,
        c,
        e
      ), At = i, hu(0, !1), Gt && typeof Gt.onPostCommitFiberRoot == "function")
        try {
          Gt.onPostCommitFiberRoot(Nl, u);
        } catch {
        }
      return !0;
    } finally {
      L.p = n, _.T = a, md(t, l);
    }
  }
  function yd(t, l, e) {
    l = Kl(e, l), l = nf(t.stateNode, l, 2), t = na(t, l, 2), t !== null && (de(t, 2), be(t));
  }
  function Nt(t, l, e) {
    if (t.tag === 3)
      yd(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          yd(
            l,
            t,
            e
          );
          break;
        } else if (l.tag === 1) {
          var a = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (ra === null || !ra.has(a))) {
            t = Kl(e, t), e = vo(2), a = na(l, e, 2), a !== null && (go(
              e,
              a,
              l,
              t
            ), de(a, 2), be(a));
            break;
          }
        }
        l = l.return;
      }
  }
  function Of(t, l, e) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new qh();
      var n = /* @__PURE__ */ new Set();
      a.set(l, n);
    } else
      n = a.get(l), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(l, n));
    n.has(e) || (Af = !0, n.add(e), t = Vh.bind(null, t, l, e), l.then(t, t));
  }
  function Vh(t, l, e) {
    var a = t.pingCache;
    a !== null && a.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, Dt === t && (mt & e) === e && (wt === 4 || wt === 3 && (mt & 62914560) === mt && 300 > sl() - gc ? (At & 2) === 0 && Tn(t, 0) : Tf |= e, En === mt && (En = 0)), be(t);
  }
  function vd(t, l) {
    l === 0 && (l = Dn()), t = ja(t, l), t !== null && (de(t, l), be(t));
  }
  function wh(t) {
    var l = t.memoizedState, e = 0;
    l !== null && (e = l.retryLane), vd(t, e);
  }
  function Zh(t, l) {
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
        throw Error(o(314));
    }
    a !== null && a.delete(l), vd(t, e);
  }
  function Kh(t, l) {
    return ll(t, l);
  }
  var _c = null, Nn = null, Df = !1, Nc = !1, Mf = !1, ma = 0;
  function be(t) {
    t !== Nn && t.next === null && (Nn === null ? _c = Nn = t : Nn = Nn.next = t), Nc = !0, Df || (Df = !0, kh());
  }
  function hu(t, l) {
    if (!Mf && Nc) {
      Mf = !0;
      do
        for (var e = !1, a = _c; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var c = a.suspendedLanes, i = a.pingedLanes;
              u = (1 << 31 - cl(42 | t) + 1) - 1, u &= n & ~(c & ~i), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (e = !0, pd(a, u));
          } else
            u = mt, u = _a(
              a,
              a === Dt ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || xl(a, u) || (e = !0, pd(a, u));
          a = a.next;
        }
      while (e);
      Mf = !1;
    }
  }
  function Jh() {
    gd();
  }
  function gd() {
    Nc = Df = !1;
    var t = 0;
    ma !== 0 && n0() && (t = ma);
    for (var l = sl(), e = null, a = _c; a !== null; ) {
      var n = a.next, u = bd(a, l);
      u === 0 ? (a.next = null, e === null ? _c = n : e.next = n, n === null && (Nn = e)) : (e = a, (t !== 0 || (u & 3) !== 0) && (Nc = !0)), a = n;
    }
    al !== 0 && al !== 5 || hu(t), ma !== 0 && (ma = 0);
  }
  function bd(t, l) {
    for (var e = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var c = 31 - cl(u), i = 1 << c, r = n[c];
      r === -1 ? ((i & e) === 0 || (i & a) !== 0) && (n[c] = Ou(i, l)) : r <= l && (t.expiredLanes |= i), u &= ~i;
    }
    if (l = Dt, e = mt, e = _a(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, e === 0 || t === l && (_t === 2 || _t === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && Xt(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || xl(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (a !== null && Xt(a), jn(e)) {
        case 2:
        case 8:
          e = re;
          break;
        case 32:
          e = ee;
          break;
        case 268435456:
          e = Al;
          break;
        default:
          e = ee;
      }
      return a = Sd.bind(null, t), e = ll(e, a), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return a !== null && a !== null && Xt(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Sd(t, l) {
    if (al !== 0 && al !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (Tc() && t.callbackNode !== e)
      return null;
    var a = mt;
    return a = _a(
      t,
      t === Dt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (td(t, a, l), bd(t, sl()), t.callbackNode != null && t.callbackNode === e ? Sd.bind(null, t) : null);
  }
  function pd(t, l) {
    if (Tc()) return null;
    td(t, l, !0);
  }
  function kh() {
    c0(function() {
      (At & 6) !== 0 ? ll(
        wl,
        Jh
      ) : gd();
    });
  }
  function jf() {
    if (ma === 0) {
      var t = rn;
      t === 0 && (t = gl, gl <<= 1, (gl & 261888) === 0 && (gl = 256)), ma = t;
    }
    return ma;
  }
  function Ed(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : ju("" + t);
  }
  function Ad(t, l) {
    var e = l.ownerDocument.createElement("input");
    return e.name = l.name, e.value = l.value, t.id && e.setAttribute("form", t.id), l.parentNode.insertBefore(e, l), t = new FormData(t), e.parentNode.removeChild(e), t;
  }
  function $h(t, l, e, a, n) {
    if (l === "submit" && e && e.stateNode === n) {
      var u = Ed(
        (n[bl] || null).action
      ), c = a.submitter;
      c && (l = (l = c[bl] || null) ? Ed(l.formAction) : c.getAttribute("formAction"), l !== null && (u = l, c = null));
      var i = new Bu(
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
                if (ma !== 0) {
                  var r = c ? Ad(n, c) : new FormData(n);
                  Ii(
                    e,
                    {
                      pending: !0,
                      data: r,
                      method: n.method,
                      action: u
                    },
                    null,
                    r
                  );
                }
              } else
                typeof u == "function" && (i.preventDefault(), r = c ? Ad(n, c) : new FormData(n), Ii(
                  e,
                  {
                    pending: !0,
                    data: r,
                    method: n.method,
                    action: u
                  },
                  u,
                  r
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var Uf = 0; Uf < yi.length; Uf++) {
    var Hf = yi[Uf], Wh = Hf.toLowerCase(), Fh = Hf[0].toUpperCase() + Hf.slice(1);
    ne(
      Wh,
      "on" + Fh
    );
  }
  ne(Is, "onAnimationEnd"), ne(Ps, "onAnimationIteration"), ne(tr, "onAnimationStart"), ne("dblclick", "onDoubleClick"), ne("focusin", "onFocus"), ne("focusout", "onBlur"), ne(mh, "onTransitionRun"), ne(hh, "onTransitionStart"), ne(yh, "onTransitionCancel"), ne(lr, "onTransitionEnd"), B("onMouseEnter", ["mouseout", "mouseover"]), B("onMouseLeave", ["mouseout", "mouseover"]), B("onPointerEnter", ["pointerout", "pointerover"]), B("onPointerLeave", ["pointerout", "pointerover"]), U(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), U(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), U("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), U(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), U(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), U(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var yu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Ih = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(yu)
  );
  function Td(t, l) {
    l = (l & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var a = t[e], n = a.event;
      a = a.listeners;
      t: {
        var u = void 0;
        if (l)
          for (var c = a.length - 1; 0 <= c; c--) {
            var i = a[c], r = i.instance, p = i.currentTarget;
            if (i = i.listener, r !== u && n.isPropagationStopped())
              break t;
            u = i, n.currentTarget = p;
            try {
              u(n);
            } catch (N) {
              Xu(N);
            }
            n.currentTarget = null, u = r;
          }
        else
          for (c = 0; c < a.length; c++) {
            if (i = a[c], r = i.instance, p = i.currentTarget, i = i.listener, r !== u && n.isPropagationStopped())
              break t;
            u = i, n.currentTarget = p;
            try {
              u(n);
            } catch (N) {
              Xu(N);
            }
            n.currentTarget = null, u = r;
          }
      }
    }
  }
  function dt(t, l) {
    var e = l[$a];
    e === void 0 && (e = l[$a] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    e.has(a) || (_d(l, t, 2, !1), e.add(a));
  }
  function Lf(t, l, e) {
    var a = 0;
    l && (a |= 4), _d(
      e,
      t,
      a,
      l
    );
  }
  var zc = "_reactListening" + Math.random().toString(36).slice(2);
  function Bf(t) {
    if (!t[zc]) {
      t[zc] = !0, A.forEach(function(e) {
        e !== "selectionchange" && (Ih.has(e) || Lf(e, !1, t), Lf(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[zc] || (l[zc] = !0, Lf("selectionchange", !1, l));
    }
  }
  function _d(t, l, e, a) {
    switch (Pd(l)) {
      case 2:
        var n = z0;
        break;
      case 8:
        n = x0;
        break;
      default:
        n = If;
    }
    e = n.bind(
      null,
      l,
      e,
      t
    ), n = void 0, !ei || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (n = !0), a ? n !== void 0 ? t.addEventListener(l, e, {
      capture: !0,
      passive: n
    }) : t.addEventListener(l, e, !0) : n !== void 0 ? t.addEventListener(l, e, {
      passive: n
    }) : t.addEventListener(l, e, !1);
  }
  function qf(t, l, e, a, n) {
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
              var r = c.tag;
              if ((r === 3 || r === 4) && c.stateNode.containerInfo === n)
                return;
              c = c.return;
            }
          for (; i !== null; ) {
            if (c = Te(i), c === null) return;
            if (r = c.tag, r === 5 || r === 6 || r === 26 || r === 27) {
              a = u = c;
              continue t;
            }
            i = i.parentNode;
          }
        }
        a = a.return;
      }
    Cs(function() {
      var p = u, N = ti(e), C = [];
      t: {
        var E = er.get(t);
        if (E !== void 0) {
          var T = Bu, Y = t;
          switch (t) {
            case "keypress":
              if (Hu(e) === 0) break t;
            case "keydown":
            case "keyup":
              T = Zm;
              break;
            case "focusin":
              Y = "focus", T = ci;
              break;
            case "focusout":
              Y = "blur", T = ci;
              break;
            case "beforeblur":
            case "afterblur":
              T = ci;
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
              T = Ds;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              T = jm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              T = km;
              break;
            case Is:
            case Ps:
            case tr:
              T = Lm;
              break;
            case lr:
              T = Wm;
              break;
            case "scroll":
            case "scrollend":
              T = Dm;
              break;
            case "wheel":
              T = Im;
              break;
            case "copy":
            case "cut":
            case "paste":
              T = qm;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              T = js;
              break;
            case "toggle":
            case "beforetoggle":
              T = th;
          }
          var $ = (l & 4) !== 0, Ct = !$ && (t === "scroll" || t === "scrollend"), g = $ ? E !== null ? E + "Capture" : null : E;
          $ = [];
          for (var h = p, S; h !== null; ) {
            var x = h;
            if (S = x.stateNode, x = x.tag, x !== 5 && x !== 26 && x !== 27 || S === null || g === null || (x = Bn(h, g), x != null && $.push(
              vu(h, x, S)
            )), Ct) break;
            h = h.return;
          }
          0 < $.length && (E = new T(
            E,
            Y,
            null,
            e,
            N
          ), C.push({ event: E, listeners: $ }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (E = t === "mouseover" || t === "pointerover", T = t === "mouseout" || t === "pointerout", E && e !== Pc && (Y = e.relatedTarget || e.fromElement) && (Te(Y) || Y[Ze]))
            break t;
          if ((T || E) && (E = N.window === N ? N : (E = N.ownerDocument) ? E.defaultView || E.parentWindow : window, T ? (Y = e.relatedTarget || e.toElement, T = p, Y = Y ? Te(Y) : null, Y !== null && (Ct = H(Y), $ = Y.tag, Y !== Ct || $ !== 5 && $ !== 27 && $ !== 6) && (Y = null)) : (T = null, Y = p), T !== Y)) {
            if ($ = Ds, x = "onMouseLeave", g = "onMouseEnter", h = "mouse", (t === "pointerout" || t === "pointerover") && ($ = js, x = "onPointerLeave", g = "onPointerEnter", h = "pointer"), Ct = T == null ? E : xa(T), S = Y == null ? E : xa(Y), E = new $(
              x,
              h + "leave",
              T,
              e,
              N
            ), E.target = Ct, E.relatedTarget = S, x = null, Te(N) === p && ($ = new $(
              g,
              h + "enter",
              Y,
              e,
              N
            ), $.target = S, $.relatedTarget = Ct, x = $), Ct = x, T && Y)
              l: {
                for ($ = Ph, g = T, h = Y, S = 0, x = g; x; x = $(x))
                  S++;
                x = 0;
                for (var K = h; K; K = $(K))
                  x++;
                for (; 0 < S - x; )
                  g = $(g), S--;
                for (; 0 < x - S; )
                  h = $(h), x--;
                for (; S--; ) {
                  if (g === h || h !== null && g === h.alternate) {
                    $ = g;
                    break l;
                  }
                  g = $(g), h = $(h);
                }
                $ = null;
              }
            else $ = null;
            T !== null && Nd(
              C,
              E,
              T,
              $,
              !1
            ), Y !== null && Ct !== null && Nd(
              C,
              Ct,
              Y,
              $,
              !0
            );
          }
        }
        t: {
          if (E = p ? xa(p) : window, T = E.nodeName && E.nodeName.toLowerCase(), T === "select" || T === "input" && E.type === "file")
            var St = Gs;
          else if (Ys(E))
            if (Qs)
              St = rh;
            else {
              St = fh;
              var Q = ih;
            }
          else
            T = E.nodeName, !T || T.toLowerCase() !== "input" || E.type !== "checkbox" && E.type !== "radio" ? p && Ic(p.elementType) && (St = Gs) : St = sh;
          if (St && (St = St(t, p))) {
            Xs(
              C,
              St,
              e,
              N
            );
            break t;
          }
          Q && Q(t, E, p), t === "focusout" && p && E.type === "number" && p.memoizedProps.value != null && Fa(E, "number", E.value);
        }
        switch (Q = p ? xa(p) : window, t) {
          case "focusin":
            (Ys(Q) || Q.contentEditable === "true") && (ln = Q, di = p, Zn = null);
            break;
          case "focusout":
            Zn = di = ln = null;
            break;
          case "mousedown":
            mi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            mi = !1, Ws(C, e, N);
            break;
          case "selectionchange":
            if (dh) break;
          case "keydown":
          case "keyup":
            Ws(C, e, N);
        }
        var ut;
        if (fi)
          t: {
            switch (t) {
              case "compositionstart":
                var ht = "onCompositionStart";
                break t;
              case "compositionend":
                ht = "onCompositionEnd";
                break t;
              case "compositionupdate":
                ht = "onCompositionUpdate";
                break t;
            }
            ht = void 0;
          }
        else
          tn ? Bs(t, e) && (ht = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (ht = "onCompositionStart");
        ht && (Us && e.locale !== "ko" && (tn || ht !== "onCompositionStart" ? ht === "onCompositionEnd" && tn && (ut = Rs()) : (Fe = N, ai = "value" in Fe ? Fe.value : Fe.textContent, tn = !0)), Q = xc(p, ht), 0 < Q.length && (ht = new Ms(
          ht,
          t,
          null,
          e,
          N
        ), C.push({ event: ht, listeners: Q }), ut ? ht.data = ut : (ut = qs(e), ut !== null && (ht.data = ut)))), (ut = eh ? ah(t, e) : nh(t, e)) && (ht = xc(p, "onBeforeInput"), 0 < ht.length && (Q = new Ms(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          N
        ), C.push({
          event: Q,
          listeners: ht
        }), Q.data = ut)), $h(
          C,
          t,
          p,
          e,
          N
        );
      }
      Td(C, l);
    });
  }
  function vu(t, l, e) {
    return {
      instance: t,
      listener: l,
      currentTarget: e
    };
  }
  function xc(t, l) {
    for (var e = l + "Capture", a = []; t !== null; ) {
      var n = t, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = Bn(t, e), n != null && a.unshift(
        vu(t, n, u)
      ), n = Bn(t, l), n != null && a.push(
        vu(t, n, u)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function Ph(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Nd(t, l, e, a, n) {
    for (var u = l._reactName, c = []; e !== null && e !== a; ) {
      var i = e, r = i.alternate, p = i.stateNode;
      if (i = i.tag, r !== null && r === a) break;
      i !== 5 && i !== 26 && i !== 27 || p === null || (r = p, n ? (p = Bn(e, u), p != null && c.unshift(
        vu(e, p, r)
      )) : n || (p = Bn(e, u), p != null && c.push(
        vu(e, p, r)
      ))), e = e.return;
    }
    c.length !== 0 && t.push({ event: l, listeners: c });
  }
  var t0 = /\r\n?/g, l0 = /\u0000|\uFFFD/g;
  function zd(t) {
    return (typeof t == "string" ? t : "" + t).replace(t0, `
`).replace(l0, "");
  }
  function xd(t, l) {
    return l = zd(l), zd(t) === l;
  }
  function xt(t, l, e, a, n, u) {
    switch (e) {
      case "children":
        typeof a == "string" ? l === "body" || l === "textarea" && a === "" || We(t, a) : (typeof a == "number" || typeof a == "bigint") && l !== "body" && We(t, "" + a);
        break;
      case "className":
        Tt(t, "class", a);
        break;
      case "tabIndex":
        Tt(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Tt(t, e, a);
        break;
      case "style":
        zs(t, a, u);
        break;
      case "data":
        if (l !== "object") {
          Tt(t, "data", a);
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
        a = ju("" + a), t.setAttribute(e, a);
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
          typeof u == "function" && (e === "formAction" ? (l !== "input" && xt(t, l, "name", n.name, n, null), xt(
            t,
            l,
            "formEncType",
            n.formEncType,
            n,
            null
          ), xt(
            t,
            l,
            "formMethod",
            n.formMethod,
            n,
            null
          ), xt(
            t,
            l,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (xt(t, l, "encType", n.encType, n, null), xt(t, l, "method", n.method, n, null), xt(t, l, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = ju("" + a), t.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (t.onclick = Ne);
        break;
      case "onScroll":
        a != null && dt("scroll", t);
        break;
      case "onScrollEnd":
        a != null && dt("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(o(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(o(60));
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
        e = ju("" + a), t.setAttributeNS(
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
        dt("beforetoggle", t), dt("toggle", t), vt(t, "popover", a);
        break;
      case "xlinkActuate":
        jt(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        jt(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        jt(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        jt(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        jt(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        jt(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        jt(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        jt(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        jt(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        vt(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = Rm.get(e) || e, vt(t, e, a));
    }
  }
  function Yf(t, l, e, a, n, u) {
    switch (e) {
      case "style":
        zs(t, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(o(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(o(60));
            t.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string" ? We(t, a) : (typeof a == "number" || typeof a == "bigint") && We(t, "" + a);
        break;
      case "onScroll":
        a != null && dt("scroll", t);
        break;
      case "onScrollEnd":
        a != null && dt("scrollend", t);
        break;
      case "onClick":
        a != null && (t.onclick = Ne);
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
        if (!O.hasOwnProperty(e))
          t: {
            if (e[0] === "o" && e[1] === "n" && (n = e.endsWith("Capture"), l = e.slice(2, n ? e.length - 7 : void 0), u = t[bl] || null, u = u != null ? u[e] : null, typeof u == "function" && t.removeEventListener(l, u, n), typeof a == "function")) {
              typeof u != "function" && u !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(l, a, n);
              break t;
            }
            e in t ? t[e] = a : a === !0 ? t.setAttribute(e, "") : vt(t, e, a);
          }
    }
  }
  function ml(t, l, e) {
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
        dt("error", t), dt("load", t);
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
                  throw Error(o(137, l));
                default:
                  xt(t, l, u, c, e, null);
              }
          }
        n && xt(t, l, "srcSet", e.srcSet, e, null), a && xt(t, l, "src", e.src, e, null);
        return;
      case "input":
        dt("invalid", t);
        var i = u = c = n = null, r = null, p = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var N = e[a];
            if (N != null)
              switch (a) {
                case "name":
                  n = N;
                  break;
                case "type":
                  c = N;
                  break;
                case "checked":
                  r = N;
                  break;
                case "defaultChecked":
                  p = N;
                  break;
                case "value":
                  u = N;
                  break;
                case "defaultValue":
                  i = N;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (N != null)
                    throw Error(o(137, l));
                  break;
                default:
                  xt(t, l, a, N, e, null);
              }
          }
        Hn(
          t,
          u,
          i,
          r,
          p,
          c,
          n,
          !1
        );
        return;
      case "select":
        dt("invalid", t), a = c = u = null;
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
                xt(t, l, n, i, e, null);
            }
        l = u, e = c, t.multiple = !!a, l != null ? _e(t, !!a, l, !1) : e != null && _e(t, !!a, e, !0);
        return;
      case "textarea":
        dt("invalid", t), u = n = a = null;
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
                if (i != null) throw Error(o(91));
                break;
              default:
                xt(t, l, c, i, e, null);
            }
        kt(t, a, n, u);
        return;
      case "option":
        for (r in e)
          if (e.hasOwnProperty(r) && (a = e[r], a != null))
            switch (r) {
              case "selected":
                t.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                xt(t, l, r, a, e, null);
            }
        return;
      case "dialog":
        dt("beforetoggle", t), dt("toggle", t), dt("cancel", t), dt("close", t);
        break;
      case "iframe":
      case "object":
        dt("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < yu.length; a++)
          dt(yu[a], t);
        break;
      case "image":
        dt("error", t), dt("load", t);
        break;
      case "details":
        dt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        dt("error", t), dt("load", t);
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
                throw Error(o(137, l));
              default:
                xt(t, l, p, a, e, null);
            }
        return;
      default:
        if (Ic(l)) {
          for (N in e)
            e.hasOwnProperty(N) && (a = e[N], a !== void 0 && Yf(
              t,
              l,
              N,
              a,
              e,
              void 0
            ));
          return;
        }
    }
    for (i in e)
      e.hasOwnProperty(i) && (a = e[i], a != null && xt(t, l, i, a, e, null));
  }
  function e0(t, l, e, a) {
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
        var n = null, u = null, c = null, i = null, r = null, p = null, N = null;
        for (T in e) {
          var C = e[T];
          if (e.hasOwnProperty(T) && C != null)
            switch (T) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                r = C;
              default:
                a.hasOwnProperty(T) || xt(t, l, T, null, a, C);
            }
        }
        for (var E in a) {
          var T = a[E];
          if (C = e[E], a.hasOwnProperty(E) && (T != null || C != null))
            switch (E) {
              case "type":
                u = T;
                break;
              case "name":
                n = T;
                break;
              case "checked":
                p = T;
                break;
              case "defaultChecked":
                N = T;
                break;
              case "value":
                c = T;
                break;
              case "defaultValue":
                i = T;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (T != null)
                  throw Error(o(137, l));
                break;
              default:
                T !== C && xt(
                  t,
                  l,
                  E,
                  T,
                  a,
                  C
                );
            }
        }
        $e(
          t,
          c,
          i,
          r,
          p,
          N,
          u,
          n
        );
        return;
      case "select":
        T = c = i = E = null;
        for (u in e)
          if (r = e[u], e.hasOwnProperty(u) && r != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                T = r;
              default:
                a.hasOwnProperty(u) || xt(
                  t,
                  l,
                  u,
                  null,
                  a,
                  r
                );
            }
        for (n in a)
          if (u = a[n], r = e[n], a.hasOwnProperty(n) && (u != null || r != null))
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
                u !== r && xt(
                  t,
                  l,
                  n,
                  u,
                  a,
                  r
                );
            }
        l = i, e = c, a = T, E != null ? _e(t, !!e, E, !1) : !!a != !!e && (l != null ? _e(t, !!e, l, !0) : _e(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        T = E = null;
        for (i in e)
          if (n = e[i], e.hasOwnProperty(i) && n != null && !a.hasOwnProperty(i))
            switch (i) {
              case "value":
                break;
              case "children":
                break;
              default:
                xt(t, l, i, null, a, n);
            }
        for (c in a)
          if (n = a[c], u = e[c], a.hasOwnProperty(c) && (n != null || u != null))
            switch (c) {
              case "value":
                E = n;
                break;
              case "defaultValue":
                T = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(o(91));
                break;
              default:
                n !== u && xt(t, l, c, n, a, u);
            }
        Ln(t, E, T);
        return;
      case "option":
        for (var Y in e)
          if (E = e[Y], e.hasOwnProperty(Y) && E != null && !a.hasOwnProperty(Y))
            switch (Y) {
              case "selected":
                t.selected = !1;
                break;
              default:
                xt(
                  t,
                  l,
                  Y,
                  null,
                  a,
                  E
                );
            }
        for (r in a)
          if (E = a[r], T = e[r], a.hasOwnProperty(r) && E !== T && (E != null || T != null))
            switch (r) {
              case "selected":
                t.selected = E && typeof E != "function" && typeof E != "symbol";
                break;
              default:
                xt(
                  t,
                  l,
                  r,
                  E,
                  a,
                  T
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
        for (var $ in e)
          E = e[$], e.hasOwnProperty($) && E != null && !a.hasOwnProperty($) && xt(t, l, $, null, a, E);
        for (p in a)
          if (E = a[p], T = e[p], a.hasOwnProperty(p) && E !== T && (E != null || T != null))
            switch (p) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (E != null)
                  throw Error(o(137, l));
                break;
              default:
                xt(
                  t,
                  l,
                  p,
                  E,
                  a,
                  T
                );
            }
        return;
      default:
        if (Ic(l)) {
          for (var Ct in e)
            E = e[Ct], e.hasOwnProperty(Ct) && E !== void 0 && !a.hasOwnProperty(Ct) && Yf(
              t,
              l,
              Ct,
              void 0,
              a,
              E
            );
          for (N in a)
            E = a[N], T = e[N], !a.hasOwnProperty(N) || E === T || E === void 0 && T === void 0 || Yf(
              t,
              l,
              N,
              E,
              a,
              T
            );
          return;
        }
    }
    for (var g in e)
      E = e[g], e.hasOwnProperty(g) && E != null && !a.hasOwnProperty(g) && xt(t, l, g, null, a, E);
    for (C in a)
      E = a[C], T = e[C], !a.hasOwnProperty(C) || E === T || E == null && T == null || xt(t, l, C, E, a, T);
  }
  function Cd(t) {
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
  function a0() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, l = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var n = e[a], u = n.transferSize, c = n.initiatorType, i = n.duration;
        if (u && i && Cd(c)) {
          for (c = 0, i = n.responseEnd, a += 1; a < e.length; a++) {
            var r = e[a], p = r.startTime;
            if (p > i) break;
            var N = r.transferSize, C = r.initiatorType;
            N && Cd(C) && (r = r.responseEnd, c += N * (r < i ? 1 : (i - p) / (r - p)));
          }
          if (--a, l += 8 * (u + c) / (n.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Xf = null, Gf = null;
  function Cc(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Rd(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Od(t, l) {
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
  function Qf(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var Vf = null;
  function n0() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Vf ? !1 : (Vf = t, !0) : (Vf = null, !1);
  }
  var Dd = typeof setTimeout == "function" ? setTimeout : void 0, u0 = typeof clearTimeout == "function" ? clearTimeout : void 0, Md = typeof Promise == "function" ? Promise : void 0, c0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Md < "u" ? function(t) {
    return Md.resolve(null).then(t).catch(i0);
  } : Dd;
  function i0(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function ha(t) {
    return t === "head";
  }
  function jd(t, l) {
    var e = l, a = 0;
    do {
      var n = e.nextSibling;
      if (t.removeChild(e), n && n.nodeType === 8)
        if (e = n.data, e === "/$" || e === "/&") {
          if (a === 0) {
            t.removeChild(n), Rn(l);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          gu(t.ownerDocument.documentElement);
        else if (e === "head") {
          e = t.ownerDocument.head, gu(e);
          for (var u = e.firstChild; u; ) {
            var c = u.nextSibling, i = u.nodeName;
            u[za] || i === "SCRIPT" || i === "STYLE" || i === "LINK" && u.rel.toLowerCase() === "stylesheet" || e.removeChild(u), u = c;
          }
        } else
          e === "body" && gu(t.ownerDocument.body);
      e = n;
    } while (e);
    Rn(l);
  }
  function Ud(t, l) {
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
  function wf(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var e = l;
      switch (l = l.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          wf(e), Wa(e);
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
  function f0(t, l, e, a) {
    for (; t.nodeType === 1; ) {
      var n = e;
      if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[za])
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
      if (t = Fl(t.nextSibling), t === null) break;
    }
    return null;
  }
  function s0(t, l, e) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Fl(t.nextSibling), t === null)) return null;
    return t;
  }
  function Hd(t, l) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Fl(t.nextSibling), t === null)) return null;
    return t;
  }
  function Zf(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Kf(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function r0(t, l) {
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
  function Fl(t) {
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
  var Jf = null;
  function Ld(t) {
    t = t.nextSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "/$" || e === "/&") {
          if (l === 0)
            return Fl(t.nextSibling);
          l--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || l++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Bd(t) {
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
  function qd(t, l, e) {
    switch (l = Cc(e), t) {
      case "html":
        if (t = l.documentElement, !t) throw Error(o(452));
        return t;
      case "head":
        if (t = l.head, !t) throw Error(o(453));
        return t;
      case "body":
        if (t = l.body, !t) throw Error(o(454));
        return t;
      default:
        throw Error(o(451));
    }
  }
  function gu(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    Wa(t);
  }
  var Il = /* @__PURE__ */ new Map(), Yd = /* @__PURE__ */ new Set();
  function Rc(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Ge = L.d;
  L.d = {
    f: o0,
    r: d0,
    D: m0,
    C: h0,
    L: y0,
    m: v0,
    X: b0,
    S: g0,
    M: S0
  };
  function o0() {
    var t = Ge.f(), l = pc();
    return t || l;
  }
  function d0(t) {
    var l = Ke(t);
    l !== null && l.tag === 5 && l.type === "form" ? lo(l) : Ge.r(t);
  }
  var zn = typeof document > "u" ? null : document;
  function Xd(t, l, e) {
    var a = zn;
    if (a && typeof l == "string" && l) {
      var n = Rl(l);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof e == "string" && (n += '[crossorigin="' + e + '"]'), Yd.has(n) || (Yd.add(n), t = { rel: t, crossOrigin: e, href: l }, a.querySelector(n) === null && (l = a.createElement("link"), ml(l, "link", t), d(l), a.head.appendChild(l)));
    }
  }
  function m0(t) {
    Ge.D(t), Xd("dns-prefetch", t, null);
  }
  function h0(t, l) {
    Ge.C(t, l), Xd("preconnect", t, l);
  }
  function y0(t, l, e) {
    Ge.L(t, l, e);
    var a = zn;
    if (a && t && l) {
      var n = 'link[rel="preload"][as="' + Rl(l) + '"]';
      l === "image" && e && e.imageSrcSet ? (n += '[imagesrcset="' + Rl(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (n += '[imagesizes="' + Rl(
        e.imageSizes
      ) + '"]')) : n += '[href="' + Rl(t) + '"]';
      var u = n;
      switch (l) {
        case "style":
          u = xn(t);
          break;
        case "script":
          u = Cn(t);
      }
      Il.has(u) || (t = X(
        {
          rel: "preload",
          href: l === "image" && e && e.imageSrcSet ? void 0 : t,
          as: l
        },
        e
      ), Il.set(u, t), a.querySelector(n) !== null || l === "style" && a.querySelector(bu(u)) || l === "script" && a.querySelector(Su(u)) || (l = a.createElement("link"), ml(l, "link", t), d(l), a.head.appendChild(l)));
    }
  }
  function v0(t, l) {
    Ge.m(t, l);
    var e = zn;
    if (e && t) {
      var a = l && typeof l.as == "string" ? l.as : "script", n = 'link[rel="modulepreload"][as="' + Rl(a) + '"][href="' + Rl(t) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Cn(t);
      }
      if (!Il.has(u) && (t = X({ rel: "modulepreload", href: t }, l), Il.set(u, t), e.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(Su(u)))
              return;
        }
        a = e.createElement("link"), ml(a, "link", t), d(a), e.head.appendChild(a);
      }
    }
  }
  function g0(t, l, e) {
    Ge.S(t, l, e);
    var a = zn;
    if (a && t) {
      var n = Je(a).hoistableStyles, u = xn(t);
      l = l || "default";
      var c = n.get(u);
      if (!c) {
        var i = { loading: 0, preload: null };
        if (c = a.querySelector(
          bu(u)
        ))
          i.loading = 5;
        else {
          t = X(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = Il.get(u)) && kf(t, e);
          var r = c = a.createElement("link");
          d(r), ml(r, "link", t), r._p = new Promise(function(p, N) {
            r.onload = p, r.onerror = N;
          }), r.addEventListener("load", function() {
            i.loading |= 1;
          }), r.addEventListener("error", function() {
            i.loading |= 2;
          }), i.loading |= 4, Oc(c, l, a);
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
  function b0(t, l) {
    Ge.X(t, l);
    var e = zn;
    if (e && t) {
      var a = Je(e).hoistableScripts, n = Cn(t), u = a.get(n);
      u || (u = e.querySelector(Su(n)), u || (t = X({ src: t, async: !0 }, l), (l = Il.get(n)) && $f(t, l), u = e.createElement("script"), d(u), ml(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function S0(t, l) {
    Ge.M(t, l);
    var e = zn;
    if (e && t) {
      var a = Je(e).hoistableScripts, n = Cn(t), u = a.get(n);
      u || (u = e.querySelector(Su(n)), u || (t = X({ src: t, async: !0, type: "module" }, l), (l = Il.get(n)) && $f(t, l), u = e.createElement("script"), d(u), ml(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function Gd(t, l, e, a) {
    var n = (n = lt.current) ? Rc(n) : null;
    if (!n) throw Error(o(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (l = xn(e.href), e = Je(
          n
        ).hoistableStyles, a = e.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          t = xn(e.href);
          var u = Je(
            n
          ).hoistableStyles, c = u.get(t);
          if (c || (n = n.ownerDocument || n, c = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, c), (u = n.querySelector(
            bu(t)
          )) && !u._p && (c.instance = u, c.state.loading = 5), Il.has(t) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Il.set(t, e), u || p0(
            n,
            t,
            e,
            c.state
          ))), l && a === null)
            throw Error(o(528, ""));
          return c;
        }
        if (l && a !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (l = Cn(e), e = Je(
          n
        ).hoistableScripts, a = e.get(l), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, t));
    }
  }
  function xn(t) {
    return 'href="' + Rl(t) + '"';
  }
  function bu(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Qd(t) {
    return X({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function p0(t, l, e, a) {
    t.querySelector('link[rel="preload"][as="style"][' + l + "]") ? a.loading = 1 : (l = t.createElement("link"), a.preload = l, l.addEventListener("load", function() {
      return a.loading |= 1;
    }), l.addEventListener("error", function() {
      return a.loading |= 2;
    }), ml(l, "link", e), d(l), t.head.appendChild(l));
  }
  function Cn(t) {
    return '[src="' + Rl(t) + '"]';
  }
  function Su(t) {
    return "script[async]" + t;
  }
  function Vd(t, l, e) {
    if (l.count++, l.instance === null)
      switch (l.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + Rl(e.href) + '"]'
          );
          if (a)
            return l.instance = a, d(a), a;
          var n = X({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), d(a), ml(a, "style", n), Oc(a, e.precedence, t), l.instance = a;
        case "stylesheet":
          n = xn(e.href);
          var u = t.querySelector(
            bu(n)
          );
          if (u)
            return l.state.loading |= 4, l.instance = u, d(u), u;
          a = Qd(e), (n = Il.get(n)) && kf(a, n), u = (t.ownerDocument || t).createElement("link"), d(u);
          var c = u;
          return c._p = new Promise(function(i, r) {
            c.onload = i, c.onerror = r;
          }), ml(u, "link", a), l.state.loading |= 4, Oc(u, e.precedence, t), l.instance = u;
        case "script":
          return u = Cn(e.src), (n = t.querySelector(
            Su(u)
          )) ? (l.instance = n, d(n), n) : (a = e, (n = Il.get(u)) && (a = X({}, e), $f(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), d(n), ml(n, "link", a), t.head.appendChild(n), l.instance = n);
        case "void":
          return null;
        default:
          throw Error(o(443, l.type));
      }
    else
      l.type === "stylesheet" && (l.state.loading & 4) === 0 && (a = l.instance, l.state.loading |= 4, Oc(a, e.precedence, t));
    return l.instance;
  }
  function Oc(t, l, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, c = 0; c < a.length; c++) {
      var i = a[c];
      if (i.dataset.precedence === l) u = i;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (l = e.nodeType === 9 ? e.head : e, l.insertBefore(t, l.firstChild));
  }
  function kf(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
  }
  function $f(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var Dc = null;
  function wd(t, l, e) {
    if (Dc === null) {
      var a = /* @__PURE__ */ new Map(), n = Dc = /* @__PURE__ */ new Map();
      n.set(e, a);
    } else
      n = Dc, a = n.get(e), a || (a = /* @__PURE__ */ new Map(), n.set(e, a));
    if (a.has(t)) return a;
    for (a.set(t, null), e = e.getElementsByTagName(t), n = 0; n < e.length; n++) {
      var u = e[n];
      if (!(u[za] || u[el] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var c = u.getAttribute(l) || "";
        c = t + c;
        var i = a.get(c);
        i ? i.push(u) : a.set(c, [u]);
      }
    }
    return a;
  }
  function Zd(t, l, e) {
    t = t.ownerDocument || t, t.head.insertBefore(
      e,
      l === "title" ? t.querySelector("head > title") : null
    );
  }
  function E0(t, l, e) {
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
  function Kd(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function A0(t, l, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var n = xn(a.href), u = l.querySelector(
          bu(n)
        );
        if (u) {
          l = u._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = Mc.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = u, d(u);
          return;
        }
        u = l.ownerDocument || l, a = Qd(a), (n = Il.get(n)) && kf(a, n), u = u.createElement("link"), d(u);
        var c = u;
        c._p = new Promise(function(i, r) {
          c.onload = i, c.onerror = r;
        }), ml(u, "link", a), e.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = Mc.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var Wf = 0;
  function T0(t, l) {
    return t.stylesheets && t.count === 0 && Uc(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (t.stylesheets && Uc(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + l);
      0 < t.imgBytes && Wf === 0 && (Wf = 62500 * a0());
      var n = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Uc(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > Wf ? 50 : 800) + l
      );
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function Mc() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Uc(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var jc = null;
  function Uc(t, l) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, jc = /* @__PURE__ */ new Map(), l.forEach(_0, t), jc = null, Mc.call(t));
  }
  function _0(t, l) {
    if (!(l.state.loading & 4)) {
      var e = jc.get(t);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), jc.set(t, e);
        for (var n = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var c = n[u];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (e.set(c.dataset.precedence, c), a = c);
        }
        a && e.set(null, a);
      }
      n = l.instance, c = n.getAttribute("data-precedence"), u = e.get(c) || a, u === a && e.set(null, n), e.set(c, n), this.count++, a = Mc.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), l.state.loading |= 4;
    }
  }
  var pu = {
    $$typeof: Yt,
    Provider: null,
    Consumer: null,
    _currentValue: J,
    _currentValue2: J,
    _threadCount: 0
  };
  function N0(t, l, e, a, n, u, c, i, r) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Cl(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Cl(0), this.hiddenUpdates = Cl(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = r, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Jd(t, l, e, a, n, u, c, i, r, p, N, C) {
    return t = new N0(
      t,
      l,
      e,
      c,
      r,
      p,
      N,
      C,
      i
    ), l = 1, u === !0 && (l |= 24), u = ql(3, null, null, l), t.current = u, u.stateNode = t, l = Ci(), l.refCount++, t.pooledCache = l, l.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: l
    }, Mi(u), t;
  }
  function kd(t) {
    return t ? (t = nn, t) : nn;
  }
  function $d(t, l, e, a, n, u) {
    n = kd(n), a.context === null ? a.context = n : a.pendingContext = n, a = aa(l), a.payload = { element: e }, u = u === void 0 ? null : u, u !== null && (a.callback = u), e = na(t, a, l), e !== null && (Hl(e, t, l), In(e, t, l));
  }
  function Wd(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function Ff(t, l) {
    Wd(t, l), (t = t.alternate) && Wd(t, l);
  }
  function Fd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = ja(t, 67108864);
      l !== null && Hl(l, t, 67108864), Ff(t, 67108864);
    }
  }
  function Id(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = Vl();
      l = we(l);
      var e = ja(t, l);
      e !== null && Hl(e, t, l), Ff(t, l);
    }
  }
  var Hc = !0;
  function z0(t, l, e, a) {
    var n = _.T;
    _.T = null;
    var u = L.p;
    try {
      L.p = 2, If(t, l, e, a);
    } finally {
      L.p = u, _.T = n;
    }
  }
  function x0(t, l, e, a) {
    var n = _.T;
    _.T = null;
    var u = L.p;
    try {
      L.p = 8, If(t, l, e, a);
    } finally {
      L.p = u, _.T = n;
    }
  }
  function If(t, l, e, a) {
    if (Hc) {
      var n = Pf(a);
      if (n === null)
        qf(
          t,
          l,
          a,
          Lc,
          e
        ), tm(t, a);
      else if (R0(
        n,
        t,
        l,
        e,
        a
      ))
        a.stopPropagation();
      else if (tm(t, a), l & 4 && -1 < C0.indexOf(t)) {
        for (; n !== null; ) {
          var u = Ke(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var c = zl(u.pendingLanes);
                  if (c !== 0) {
                    var i = u;
                    for (i.pendingLanes |= 2, i.entangledLanes |= 2; c; ) {
                      var r = 1 << 31 - cl(c);
                      i.entanglements[1] |= r, c &= ~r;
                    }
                    be(u), (At & 6) === 0 && (bc = sl() + 500, hu(0));
                  }
                }
                break;
              case 31:
              case 13:
                i = ja(u, 2), i !== null && Hl(i, u, 2), pc(), Ff(u, 2);
            }
          if (u = Pf(a), u === null && qf(
            t,
            l,
            a,
            Lc,
            e
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        qf(
          t,
          l,
          a,
          null,
          e
        );
    }
  }
  function Pf(t) {
    return t = ti(t), ts(t);
  }
  var Lc = null;
  function ts(t) {
    if (Lc = null, t = Te(t), t !== null) {
      var l = H(t);
      if (l === null) t = null;
      else {
        var e = l.tag;
        if (e === 13) {
          if (t = Z(l), t !== null) return t;
          t = null;
        } else if (e === 31) {
          if (t = V(l), t !== null) return t;
          t = null;
        } else if (e === 3) {
          if (l.stateNode.current.memoizedState.isDehydrated)
            return l.tag === 3 ? l.stateNode.containerInfo : null;
          t = null;
        } else l !== t && (t = null);
      }
    }
    return Lc = t, null;
  }
  function Pd(t) {
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
        switch (Ja()) {
          case wl:
            return 2;
          case re:
            return 8;
          case ee:
          case Ee:
            return 32;
          case Al:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ls = !1, ya = null, va = null, ga = null, Eu = /* @__PURE__ */ new Map(), Au = /* @__PURE__ */ new Map(), ba = [], C0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function tm(t, l) {
    switch (t) {
      case "focusin":
      case "focusout":
        ya = null;
        break;
      case "dragenter":
      case "dragleave":
        va = null;
        break;
      case "mouseover":
      case "mouseout":
        ga = null;
        break;
      case "pointerover":
      case "pointerout":
        Eu.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Au.delete(l.pointerId);
    }
  }
  function Tu(t, l, e, a, n, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: l,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, l !== null && (l = Ke(l), l !== null && Fd(l)), t) : (t.eventSystemFlags |= a, l = t.targetContainers, n !== null && l.indexOf(n) === -1 && l.push(n), t);
  }
  function R0(t, l, e, a, n) {
    switch (l) {
      case "focusin":
        return ya = Tu(
          ya,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "dragenter":
        return va = Tu(
          va,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "mouseover":
        return ga = Tu(
          ga,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return Eu.set(
          u,
          Tu(
            Eu.get(u) || null,
            t,
            l,
            e,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Au.set(
          u,
          Tu(
            Au.get(u) || null,
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
  function lm(t) {
    var l = Te(t.target);
    if (l !== null) {
      var e = H(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = Z(e), l !== null) {
            t.blockedOn = l, Un(t.priority, function() {
              Id(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = V(e), l !== null) {
            t.blockedOn = l, Un(t.priority, function() {
              Id(e);
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
  function Bc(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var e = Pf(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        Pc = a, e.target.dispatchEvent(a), Pc = null;
      } else
        return l = Ke(e), l !== null && Fd(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function em(t, l, e) {
    Bc(t) && e.delete(l);
  }
  function O0() {
    ls = !1, ya !== null && Bc(ya) && (ya = null), va !== null && Bc(va) && (va = null), ga !== null && Bc(ga) && (ga = null), Eu.forEach(em), Au.forEach(em);
  }
  function qc(t, l) {
    t.blockedOn === l && (t.blockedOn = null, ls || (ls = !0, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      O0
    )));
  }
  var Yc = null;
  function am(t) {
    Yc !== t && (Yc = t, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      function() {
        Yc === t && (Yc = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l], a = t[l + 1], n = t[l + 2];
          if (typeof a != "function") {
            if (ts(a || e) === null)
              continue;
            break;
          }
          var u = Ke(e);
          u !== null && (t.splice(l, 3), l -= 3, Ii(
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
  function Rn(t) {
    function l(r) {
      return qc(r, t);
    }
    ya !== null && qc(ya, t), va !== null && qc(va, t), ga !== null && qc(ga, t), Eu.forEach(l), Au.forEach(l);
    for (var e = 0; e < ba.length; e++) {
      var a = ba[e];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < ba.length && (e = ba[0], e.blockedOn === null); )
      lm(e), e.blockedOn === null && ba.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var n = e[a], u = e[a + 1], c = n[bl] || null;
        if (typeof u == "function")
          c || am(e);
        else if (c) {
          var i = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, c = u[bl] || null)
              i = c.formAction;
            else if (ts(n) !== null) continue;
          } else i = c.action;
          typeof i == "function" ? e[a + 1] = i : (e.splice(a, 3), a -= 3), am(e);
        }
      }
  }
  function nm() {
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
  function es(t) {
    this._internalRoot = t;
  }
  Xc.prototype.render = es.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(o(409));
    var e = l.current, a = Vl();
    $d(e, a, t, l, null, null);
  }, Xc.prototype.unmount = es.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      $d(t.current, 2, null, t, null, null), pc(), l[Ze] = null;
    }
  };
  function Xc(t) {
    this._internalRoot = t;
  }
  Xc.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = Du();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < ba.length && l !== 0 && l < ba[e].priority; e++) ;
      ba.splice(e, 0, t), e === 0 && lm(t);
    }
  };
  var um = y.version;
  if (um !== "19.2.4")
    throw Error(
      o(
        527,
        um,
        "19.2.4"
      )
    );
  L.findDOMNode = function(t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function" ? Error(o(188)) : (t = Object.keys(t).join(","), Error(o(268, t)));
    return t = z(l), t = t !== null ? w(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var D0 = {
    bundleType: 0,
    version: "19.2.4",
    rendererPackageName: "react-dom",
    currentDispatcherRef: _,
    reconcilerVersion: "19.2.4"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Gc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Gc.isDisabled && Gc.supportsFiber)
      try {
        Nl = Gc.inject(
          D0
        ), Gt = Gc;
      } catch {
      }
  }
  return Nu.createRoot = function(t, l) {
    if (!j(t)) throw Error(o(299));
    var e = !1, a = "", n = oo, u = mo, c = ho;
    return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (n = l.onUncaughtError), l.onCaughtError !== void 0 && (u = l.onCaughtError), l.onRecoverableError !== void 0 && (c = l.onRecoverableError)), l = Jd(
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
      nm
    ), t[Ze] = l.current, Bf(t), new es(l);
  }, Nu.hydrateRoot = function(t, l, e) {
    if (!j(t)) throw Error(o(299));
    var a = !1, n = "", u = oo, c = mo, i = ho, r = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (c = e.onCaughtError), e.onRecoverableError !== void 0 && (i = e.onRecoverableError), e.formState !== void 0 && (r = e.formState)), l = Jd(
      t,
      1,
      !0,
      l,
      e ?? null,
      a,
      n,
      r,
      u,
      c,
      i,
      nm
    ), l.context = kd(null), e = l.current, a = Vl(), a = we(a), n = aa(a), n.callback = null, na(e, n, a), e = a, l.current.lanes = e, de(l, e), be(l), t[Ze] = l.current, Bf(t), new Xc(l);
  }, Nu.version = "19.2.4", Nu;
}
var ym;
function G0() {
  if (ym) return ns.exports;
  ym = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (y) {
        console.error(y);
      }
  }
  return f(), ns.exports = X0(), ns.exports;
}
var Q0 = G0(), R = Ts();
function V0(f, y = 760) {
  const v = Number(f), o = Number.isFinite(v) ? v : Number.NaN, [j, H] = R.useState(o), Z = R.useRef(o), V = R.useRef(0);
  return R.useEffect(() => {
    const D = Number(f);
    if (!Number.isFinite(D)) {
      Z.current = Number.NaN, H(Number.NaN);
      return;
    }
    const z = Z.current;
    if (Z.current = D, !Number.isFinite(z) || Math.abs(z - D) < 1e-9) {
      H(D);
      return;
    }
    const w = performance.now(), X = (Rt) => 1 - Math.pow(1 - Rt, 3), it = (Rt) => {
      const Mt = Rt - w, gt = Math.min(1, Mt / y), Pt = X(gt), k = z + (D - z) * Pt;
      H(k), gt < 1 && (V.current = window.requestAnimationFrame(it));
    };
    return V.current = window.requestAnimationFrame(it), () => {
      V.current && window.cancelAnimationFrame(V.current);
    };
  }, [f, y]), j;
}
const _s = ["workspace", "positions", "reports"], vm = "tf.nav.active", gm = "tf.sidebar.collapsed", bm = "tf.theme", Sm = {
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
}, zu = {
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
}, w0 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}), Z0 = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});
async function Se(f, y = {}) {
  const v = await fetch(f, {
    headers: { "Content-Type": "application/json" },
    ...y
  }), o = await v.json();
  if (!v.ok || o.ok === !1)
    throw new Error(o.error || `HTTP ${v.status}`);
  return o;
}
function ss(f, y) {
  try {
    const v = window.localStorage.getItem(f);
    return v ?? y;
  } catch {
    return y;
  }
}
function rs(f, y) {
  try {
    window.localStorage.setItem(f, y);
  } catch {
  }
}
function Qc(f) {
  const y = String(f || "").replace(/^#/, "").trim();
  return _s.includes(y) ? y : "workspace";
}
function _m(f) {
  return String(f || "").trim().toLowerCase() === "dark" ? "dark" : "light";
}
function K0(f) {
  return _m(f) === "dark" ? { theme: "dark", toolbarbg: "#0f1720" } : { theme: "light", toolbarbg: "#f5f7fa" };
}
function os(f, y) {
  try {
    const v = new URL(f), o = K0(y);
    return v.searchParams.set("theme", o.theme), v.searchParams.set("toolbarbg", o.toolbarbg), v.toString();
  } catch {
    return f;
  }
}
function J0(f) {
  return String(f || "").toUpperCase().startsWith("KRX:");
}
function Pl(f, y) {
  if (f == null || Number.isNaN(Number(f))) return "-";
  const v = Number(f);
  return y === "KRW" ? Z0.format(v) : w0.format(v);
}
function Ss(f, y) {
  const v = Number(f || 0);
  return Number.isFinite(v) ? v === 0 ? Pl(0, y) : `${v > 0 ? "+" : "-"}${Pl(Math.abs(v), y)}` : "-";
}
function wc(f) {
  return f === "kr" ? "KRW" : "USD";
}
function ps(f) {
  const y = Number(f || 0);
  return !Number.isFinite(y) || y === 0 ? "" : y > 0 ? "positive" : "negative";
}
function Es(f) {
  const y = Number(f || 0);
  return Number.isFinite(y) ? y.toLocaleString(void 0, { maximumFractionDigits: 0 }) : "-";
}
function As(f) {
  if (!f) return "-";
  const y = new Date(f);
  return Number.isNaN(y.getTime()) ? String(f) : y.toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !1
  });
}
function k0(f) {
  return f === "kr" ? "한국" : "미국";
}
function $0(f) {
  return f === "BUY" ? "매수" : f === "SELL" ? "매도" : f || "-";
}
function xu(f) {
  return String(f || "").toUpperCase().replace(/^KRX:/, "").replace(".KS", "").replace(".KQ", "").trim();
}
function W0(f) {
  const y = xu(f), v = zu[y];
  return y ? v ? `${v} (${y})` : `한국주식 (${y})` : String(f || "-");
}
function Kc(f, y) {
  return f === "kr" ? W0(y) : String(y || "-").toUpperCase();
}
function F0(f, y) {
  if (f === "kr") {
    const v = xu(y);
    return `KR ${zu[v] || v}`;
  }
  return `US ${String(y || "").toUpperCase()}`;
}
function I0(f) {
  const y = String(f || "").trim();
  if (!y) return y;
  const v = Object.entries(zu).find(([, j]) => j === y);
  if (v) return v[0];
  const o = Object.entries(zu).find(([, j]) => j.includes(y));
  return o ? o[0] : y;
}
function P0(f, y) {
  const v = String(y || "").toUpperCase();
  return f === "kr" ? `KRX:${xu(v)}` : v === "BRK-B" ? "NYSE:BRK.B" : v.includes(":") ? v : `NASDAQ:${v}`;
}
function ty(f, y) {
  const v = String(f || "").toLowerCase().trim(), o = String(y || "").trim();
  return !v || !o ? "" : `/api/logo?${new URLSearchParams({
    market: v,
    symbol: o,
    size: "128"
  }).toString()}`;
}
function ly(f, y) {
  const v = String(f || y || "").replace(/\([^)]*\)/g, "").replace(/[^0-9A-Za-z가-힣]/g, "");
  return v ? v.slice(0, 1).toUpperCase() : "•";
}
function ey(f) {
  const y = Number(f == null ? void 0 : f.price);
  return Number.isFinite(y) ? String((f == null ? void 0 : f.id) || "") === "usdkrw" ? y.toLocaleString("ko-KR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : y.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : "-";
}
function ay(f, y) {
  const v = Number(y);
  if (!Number.isFinite(v)) return "-";
  const j = String((f == null ? void 0 : f.id) || "") === "usdkrw" ? "ko-KR" : "en-US";
  return v.toLocaleString(j, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
function pm(f, y = 2) {
  const v = Number(f);
  return Number.isFinite(v) ? `${v > 0 ? "+" : ""}${v.toLocaleString("en-US", {
    minimumFractionDigits: y,
    maximumFractionDigits: y
  })}` : "-";
}
function ny(f, y = 112, v = 34, o = 2) {
  const j = (f || []).map((k) => Number(k)).filter((k) => Number.isFinite(k));
  if (!j.length || j.length === 1) {
    const k = Math.round(v / 2);
    return {
      linePath: `M0 ${k} L${y} ${k}`,
      areaPath: `M0 ${k} L${y} ${k} L${y} ${v} L0 ${v} Z`
    };
  }
  const H = Math.min(...j), Z = Math.max(...j), V = Z - H || 1, D = Math.max(1, y - o * 2), z = Math.max(1, v - o * 2), w = D / (j.length - 1), X = j.map((k, at) => {
    const Yt = o + w * at, Ot = o + (Z - k) / V * z;
    return {
      x: Number.isFinite(Yt) ? Yt : 0,
      y: Number.isFinite(Ot) ? Ot : v / 2
    };
  }), it = X.map((k, at) => `${at === 0 ? "M" : "L"}${k.x.toFixed(2)} ${k.y.toFixed(2)}`).join(" "), Rt = X[0], Mt = X[X.length - 1], gt = v - 1, Pt = `${it} L${Mt.x.toFixed(2)} ${gt} L${Rt.x.toFixed(2)} ${gt} Z`;
  return { linePath: it, areaPath: Pt };
}
function uy(f) {
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
function cy(f) {
  const y = String(f || "").trim().toLowerCase();
  return y === "live" ? "live" : y === "holiday" ? "holiday" : y === "closed" ? "closed" : y === "delayed" ? "delayed" : "";
}
function ds({ item: f, field: y }) {
  const o = Number(y === "change_pct_abs" ? f == null ? void 0 : f.change_pct : f == null ? void 0 : f[y]), j = V0(o, 760);
  return Number.isFinite(o) ? y === "price" ? ay(f, j) : y === "change" ? pm(j, 2) : y === "change_pct" ? `${pm(j, 2)}%` : y === "change_pct_abs" ? `${Math.abs(j).toFixed(2)}%` : String(j) : y === "price" ? "-" : "";
}
function iy({ item: f, index: y, onSelectItem: v }) {
  const o = String((f == null ? void 0 : f.direction) || "flat"), j = o === "up" ? "up" : o === "down" ? "down" : "flat", H = Number.isFinite(Number(f == null ? void 0 : f.change)) && Number.isFinite(Number(f == null ? void 0 : f.change_pct)), Z = j === "up" ? "▲" : j === "down" ? "▼" : "•", V = typeof v == "function", D = R.useMemo(() => ny((f == null ? void 0 : f.sparkline) || []), [f == null ? void 0 : f.sparkline]), z = R.useMemo(() => uy(j), [j]), w = R.useMemo(
    () => `macroGrad-${String((f == null ? void 0 : f.id) || y).replace(/[^A-Za-z0-9_-]/g, "")}-${y}`,
    [f == null ? void 0 : f.id, y]
  ), X = String((f == null ? void 0 : f.session_label) || "").trim(), it = cy(f == null ? void 0 : f.session_status), Rt = () => {
    V && v(f);
  }, Mt = (gt) => {
    V && (gt.key === "Enter" || gt.key === " ") && (gt.preventDefault(), v(f));
  };
  return /* @__PURE__ */ s.jsxs(
    "article",
    {
      className: `macro-card ${j}${V ? " interactive" : ""}`,
      role: V ? "button" : void 0,
      tabIndex: V ? 0 : void 0,
      onClick: V ? Rt : void 0,
      onKeyDown: V ? Mt : void 0,
      "aria-label": V ? `${String((f == null ? void 0 : f.label) || "")} 차트 보기` : void 0,
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "macro-spark", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 112 34", preserveAspectRatio: "none", "aria-hidden": "true", children: [
          /* @__PURE__ */ s.jsx("defs", { children: /* @__PURE__ */ s.jsxs("linearGradient", { id: w, x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ s.jsx("stop", { offset: "0%", stopColor: z.top }),
            /* @__PURE__ */ s.jsx("stop", { offset: "100%", stopColor: z.bottom })
          ] }) }),
          /* @__PURE__ */ s.jsx("path", { className: "macro-area", d: D.areaPath, fill: `url(#${w})` }),
          /* @__PURE__ */ s.jsx("path", { className: "macro-line", d: D.linePath })
        ] }) }),
        /* @__PURE__ */ s.jsxs("div", { className: "macro-main", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "macro-head", children: [
            /* @__PURE__ */ s.jsx("span", { className: "macro-label", children: String((f == null ? void 0 : f.label) || "-") }),
            X ? /* @__PURE__ */ s.jsx("span", { className: `macro-badge ${it}`, children: X }) : null
          ] }),
          /* @__PURE__ */ s.jsx("strong", { className: "macro-price", children: /* @__PURE__ */ s.jsx("span", { className: "macro-num macro-price-num", "data-indicator-id": (f == null ? void 0 : f.id) || "", "data-field": "price", children: Number.isFinite(Number(f == null ? void 0 : f.price)) ? /* @__PURE__ */ s.jsx(ds, { item: f, field: "price" }) : ey(f) }) }),
          H ? /* @__PURE__ */ s.jsxs("p", { className: "macro-change", children: [
            /* @__PURE__ */ s.jsx("span", { className: "macro-num macro-change-value", "data-indicator-id": (f == null ? void 0 : f.id) || "", "data-field": "change", children: /* @__PURE__ */ s.jsx(ds, { item: f, field: "change" }) }),
            /* @__PURE__ */ s.jsxs("span", { className: `macro-change-pill ${j}`, children: [
              /* @__PURE__ */ s.jsx("span", { className: "macro-change-pill-icon", "aria-hidden": "true", children: Z }),
              /* @__PURE__ */ s.jsx("span", { className: "macro-num macro-change-pct", "data-indicator-id": (f == null ? void 0 : f.id) || "", "data-field": "change_pct", children: /* @__PURE__ */ s.jsx(ds, { item: f, field: "change_pct_abs" }) })
            ] })
          ] }) : /* @__PURE__ */ s.jsx("p", { className: "macro-change macro-change-empty", children: "변동 정보 없음" })
        ] })
      ]
    }
  );
}
function fy({ index: f }) {
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
const sy = 8;
function ry({ items: f, loading: y = !1, onSelectItem: v }) {
  return y && !(f != null && f.length) ? /* @__PURE__ */ s.jsx(s.Fragment, { children: Array.from({ length: sy }).map((o, j) => /* @__PURE__ */ s.jsx(fy, { index: j }, `macro-skeleton-${j}`)) }) : f != null && f.length ? /* @__PURE__ */ s.jsx(s.Fragment, { children: f.map((o, j) => /* @__PURE__ */ s.jsx(
    iy,
    {
      item: o,
      index: j,
      onSelectItem: v
    },
    (o == null ? void 0 : o.id) || `${(o == null ? void 0 : o.label) || "item"}-${j}`
  )) }) : /* @__PURE__ */ s.jsx("div", { className: "macro-empty", children: "핵심 지표를 불러오지 못했습니다." });
}
function oy({ overview: f, totals: y }) {
  const v = (f == null ? void 0 : f.metrics) || {}, o = Number((y == null ? void 0 : y.usdkrw) || 0), j = y != null && y.fx_stale ? "지연" : "실시간", H = [
    {
      label: "운영상태",
      value: f != null && f.paused ? "중지" : "정상",
      delta: f != null && f.paused ? "주의" : "안정",
      tone: f != null && f.paused ? "down" : "up"
    },
    { label: "오늘 신호", value: `${Number(v.signals_today || 0).toLocaleString()}건`, delta: "엔진", tone: "neutral" },
    { label: "오늘 체결", value: `${Number(v.fills_today || 0).toLocaleString()}건`, delta: "실행", tone: "neutral" },
    {
      label: "USD/KRW",
      value: o > 0 ? o.toLocaleString(void 0, { maximumFractionDigits: 2 }) : "-",
      delta: o > 0 ? j : "미수신",
      tone: y != null && y.fx_stale ? "down" : "up"
    },
    {
      label: "총 자산(USD)",
      value: Pl(y == null ? void 0 : y.total_usd_est, "USD"),
      delta: "실데이터",
      tone: "neutral"
    }
  ];
  return /* @__PURE__ */ s.jsx(s.Fragment, { children: H.map((Z) => {
    const V = Z.tone === "up" ? "up" : Z.tone === "down" ? "down" : "";
    return /* @__PURE__ */ s.jsxs("span", { className: "market-chip", children: [
      /* @__PURE__ */ s.jsx("span", { children: Z.label }),
      /* @__PURE__ */ s.jsx("b", { children: Z.value }),
      /* @__PURE__ */ s.jsx("em", { className: V, children: Z.delta })
    ] }, Z.label);
  }) });
}
const Nm = {
  workspace: "워크스페이스",
  positions: "포지션",
  reports: "리포트"
};
function dy({ activeNav: f, onChangeNav: y }) {
  return /* @__PURE__ */ s.jsxs("aside", { id: "sidebarNav", className: "sidebar-nav", children: [
    /* @__PURE__ */ s.jsx("p", { className: "sidebar-title", children: "메뉴" }),
    /* @__PURE__ */ s.jsx("nav", { className: "sidebar-menu", "aria-label": "주요 메뉴", children: _s.map((v) => /* @__PURE__ */ s.jsx(
      "button",
      {
        type: "button",
        "data-nav": v,
        className: `nav-link ${f === v ? "active" : ""}`,
        onClick: () => y(v),
        children: Nm[v]
      },
      `sidebar-${v}`
    )) })
  ] });
}
function my({ activeNav: f, onChangeNav: y }) {
  return /* @__PURE__ */ s.jsx("nav", { id: "mobileTabBar", className: "mobile-tabbar", "aria-label": "하단 탭 메뉴", children: _s.map((v) => /* @__PURE__ */ s.jsx(
    "button",
    {
      type: "button",
      "data-nav": v,
      className: f === v ? "active" : "",
      onClick: () => y(v),
      children: Nm[v]
    },
    `mobile-${v}`
  )) });
}
function zm({ market: f, symbol: y, seedLabel: v }) {
  const [o, j] = R.useState(!1), H = R.useMemo(() => ty(f, y), [f, y]), Z = R.useMemo(() => ly(v, y), [v, y]);
  return !H || o ? /* @__PURE__ */ s.jsx("span", { className: "stock-icon fallback", children: Z }) : /* @__PURE__ */ s.jsx("span", { className: "stock-icon", children: /* @__PURE__ */ s.jsx(
    "img",
    {
      src: H,
      alt: `${v || y || "종목"} 로고`,
      loading: "lazy",
      decoding: "async",
      referrerPolicy: "no-referrer",
      onError: () => j(!0)
    }
  ) });
}
function Jc({ market: f, symbol: y, label: v, iconSeedLabel: o }) {
  return /* @__PURE__ */ s.jsxs("span", { className: "stock-inline", children: [
    /* @__PURE__ */ s.jsx(zm, { market: f, symbol: y, seedLabel: o || v }),
    /* @__PURE__ */ s.jsx("span", { className: "stock-name", children: v })
  ] });
}
function hy({ active: f, positions: y, recentFills: v, agentExposure: o, onClickPositionSymbol: j }) {
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
        /* @__PURE__ */ s.jsx("tbody", { id: "openPositionRows", children: y != null && y.length ? y.slice(0, 80).map((H, Z) => {
          const V = Kc(H.market, H.symbol), D = wc(H.market);
          return /* @__PURE__ */ s.jsxs("tr", { children: [
            /* @__PURE__ */ s.jsx("td", { children: /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "symbol-link",
                title: V,
                onClick: () => j(H),
                children: /* @__PURE__ */ s.jsx(Jc, { market: H.market, symbol: H.symbol, label: V })
              }
            ) }),
            /* @__PURE__ */ s.jsx("td", { children: Es(H.qty) }),
            /* @__PURE__ */ s.jsx("td", { children: Pl(H.notional, D) }),
            /* @__PURE__ */ s.jsx("td", { className: ps(H.unrealized_pnl), children: Ss(H.unrealized_pnl, D) })
          ] }, `${H.market}-${H.symbol}-${Z}`);
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
        /* @__PURE__ */ s.jsx("tbody", { id: "recentFillRows", children: v != null && v.length ? v.slice(0, 100).map((H, Z) => {
          const V = wc(H.market), D = Kc(H.market, H.symbol), z = As(H.ts);
          return /* @__PURE__ */ s.jsxs("tr", { children: [
            /* @__PURE__ */ s.jsx("td", { title: z, children: z }),
            /* @__PURE__ */ s.jsx("td", { title: D, children: /* @__PURE__ */ s.jsx(Jc, { market: H.market, symbol: H.symbol, label: D }) }),
            /* @__PURE__ */ s.jsx("td", { children: $0(H.side) }),
            /* @__PURE__ */ s.jsx("td", { children: Es(H.qty) }),
            /* @__PURE__ */ s.jsx("td", { children: Pl(H.price, V) })
          ] }, `${H.market}-${H.symbol}-${H.ts || Z}`);
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
        /* @__PURE__ */ s.jsx("tbody", { id: "agentExposureRows", children: o != null && o.length ? o.slice(0, 40).map((H, Z) => {
          const V = Sm[H.strategy] || Sm.unassigned, D = wc(H.market);
          return /* @__PURE__ */ s.jsxs("tr", { children: [
            /* @__PURE__ */ s.jsx("td", { children: V.name }),
            /* @__PURE__ */ s.jsx("td", { children: k0(H.market) }),
            /* @__PURE__ */ s.jsx("td", { children: Pl(H.notional, D) }),
            /* @__PURE__ */ s.jsx("td", { className: ps(H.pnl), children: Ss(H.pnl, D) }),
            /* @__PURE__ */ s.jsx("td", { children: V.style })
          ] }, `${H.strategy}-${H.market}-${Z}`);
        }) : /* @__PURE__ */ s.jsx("tr", { children: /* @__PURE__ */ s.jsx("td", { colSpan: 5, children: "데이터 없음" }) }) })
      ] }) })
    ] })
  ] }) });
}
function yy({
  active: f,
  reports: y,
  selectedReport: v,
  reportContent: o,
  operationLog: j,
  onChangeReport: H,
  onReloadReport: Z
}) {
  return /* @__PURE__ */ s.jsx("section", { id: "view-reports", className: `view-pane ${f ? "active" : ""}`, children: /* @__PURE__ */ s.jsxs("div", { className: "stack-grid", children: [
    /* @__PURE__ */ s.jsxs("section", { className: "module report-module", children: [
      /* @__PURE__ */ s.jsx("h2", { children: "일일 보고서" }),
      /* @__PURE__ */ s.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ s.jsx("select", { id: "reportSelector", value: v, onChange: (V) => H(V.target.value), children: y.map((V) => /* @__PURE__ */ s.jsx("option", { value: V, children: V }, V)) }),
        /* @__PURE__ */ s.jsx("button", { className: "btn", id: "reloadReport", type: "button", onClick: Z, children: "불러오기" })
      ] }),
      /* @__PURE__ */ s.jsx("pre", { id: "reportViewer", children: o || "보고서를 불러오는 중..." })
    ] }),
    /* @__PURE__ */ s.jsxs("section", { className: "module log-module", children: [
      /* @__PURE__ */ s.jsx("h2", { children: "운영 로그" }),
      /* @__PURE__ */ s.jsx("pre", { id: "operationLog", children: j || "준비 완료." })
    ] })
  ] }) });
}
function vy({
  globalSearchInput: f,
  onGlobalSearchInputChange: y,
  onGlobalSearchKeyDown: v,
  theme: o,
  onToggleTheme: j,
  paused: H,
  onRefreshAll: Z,
  sidebarCollapsed: V,
  onToggleSidebar: D
}) {
  const z = o === "dark";
  return /* @__PURE__ */ s.jsxs("header", { className: "topbar", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "brand-wrap", children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          id: "sidebarToggle",
          className: `sidebar-toggle ${V ? "active" : ""}`,
          type: "button",
          "aria-label": V ? "사이드바 펼치기" : "사이드바 접기",
          onClick: D,
          children: "☰"
        }
      ),
      /* @__PURE__ */ s.jsx("img", { className: "brand-mark", src: "/static/favicon.svg?v=20260302b", alt: "Ryong Investment logo" }),
      /* @__PURE__ */ s.jsx("strong", { className: "brand-title", children: "Ryong Investment" })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "status-wrap", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "search-shell", children: [
        /* @__PURE__ */ s.jsx("span", { className: "search-icon", "aria-hidden": "true", children: "⌕" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "globalSearchInput",
            className: "search-input",
            type: "text",
            placeholder: "종목/뉴스/이슈 검색",
            value: f,
            onChange: (w) => y(w.target.value),
            onKeyDown: v
          }
        )
      ] }),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          className: `btn theme-btn ${z ? "active" : ""}`,
          id: "themeToggle",
          type: "button",
          "aria-pressed": z ? "true" : "false",
          onClick: j,
          children: z ? "라이트 모드" : "다크 모드"
        }
      ),
      /* @__PURE__ */ s.jsx("span", { className: `pill ${H ? "paused" : ""}`, id: "runState", children: H ? "중지" : "운영중" }),
      /* @__PURE__ */ s.jsx("button", { className: "btn accent", id: "refreshAll", type: "button", onClick: Z, children: "새로고침" })
    ] })
  ] });
}
const gy = /* @__PURE__ */ new Set([
  "NASDAQ",
  "NYSE",
  "AMEX",
  "ARCA",
  "BATS",
  "OTC"
]), by = /* @__PURE__ */ new Set([
  "FX_IDC:USDKRW",
  "SP:SPX",
  "DJ:DJI",
  "TVC:VIX",
  "TVC:KOSPI",
  "TVC:KOSDAQ",
  "NASDAQ:IXIC",
  "CME_MINI:NQ1!"
]);
function Sy(f, y) {
  const v = String(y || "차트").trim() || "차트", o = String(f || "").trim();
  if (!o) return { market: "", symbol: "", seedLabel: v };
  const j = o.toUpperCase();
  if (/^\d{6}$/.test(j))
    return { market: "kr", symbol: j, seedLabel: v };
  if (j.startsWith("KRX:") || j.endsWith(".KS") || j.endsWith(".KQ"))
    return { market: "kr", symbol: xu(j) || j, seedLabel: v };
  if (!j.includes(":"))
    return /^[A-Z][A-Z0-9.-]{0,9}$/.test(j) ? { market: "us", symbol: j, seedLabel: v } : { market: "", symbol: "", seedLabel: v };
  const [H, Z] = j.split(":", 2), V = String(H || "").trim(), D = String(Z || "").trim();
  return !D || by.has(`${V}:${D}`) ? { market: "", symbol: "", seedLabel: v } : gy.has(V) ? { market: "us", symbol: D, seedLabel: v } : { market: "", symbol: "", seedLabel: v };
}
function py({ row: f, label: y, onClick: v, className: o = "symbol-link" }) {
  return /* @__PURE__ */ s.jsx("button", { type: "button", className: o, title: y, onClick: v, children: /* @__PURE__ */ s.jsx(Jc, { market: f.market, symbol: f.symbol, label: y }) });
}
function Ey({
  active: f,
  symbolInput: y,
  onChangeSymbolInput: v,
  onSubmitSymbol: o,
  currentSymbol: j,
  openTradingViewUrl: H,
  tvWidgetUrl: Z,
  chartRenderer: V,
  localChartTitle: D,
  localChartMeta: z,
  localChartInterval: w,
  localChartIntervalOptions: X,
  onChangeLocalChartInterval: it,
  localChartCanvasRef: Rt,
  localChartViewportRef: Mt,
  quickSymbols: gt,
  onClickQuickSymbol: Pt,
  overview: k,
  portfolioTotals: at,
  positions: Yt,
  onClickPositionSymbol: Ot
}) {
  const nl = ((k == null ? void 0 : k.accounts) || []).find((b) => b.market === "us"), Jt = ((k == null ? void 0 : k.accounts) || []).find((b) => b.market === "kr"), tt = (k == null ? void 0 : k.metrics) || {}, tl = (Yt || []).slice(0, 5), pl = R.useMemo(() => X || [], [X]), El = String(w || "30m"), hl = R.useMemo(
    () => Sy(j, D),
    [j, D]
  ), Qt = R.useRef(null), fl = R.useRef({}), [yl, ul] = R.useState(() => ({
    x: 0,
    width: 0,
    ready: !1
  })), _ = Number((at == null ? void 0 : at.usdkrw) || 0).toLocaleString(void 0, { maximumFractionDigits: 2 }), L = at != null && at.fx_stale ? "지연" : "실시간", J = at != null && at.fx_source ? `, ${at.fx_source}` : "", bt = at != null && at.fx_quote_time_utc ? `, ${As(at.fx_quote_time_utc)}` : "", Et = R.useCallback(
    (b) => (M) => {
      b && (M ? fl.current[b] = M : delete fl.current[b]);
    },
    []
  ), m = R.useCallback(() => {
    const b = Qt.current, M = fl.current[El];
    if (!b || !M) {
      ul((I) => I.ready ? { x: 0, width: 0, ready: !1 } : I);
      return;
    }
    const q = b.getBoundingClientRect(), W = M.getBoundingClientRect(), lt = Math.max(0, W.left - q.left), rt = Math.max(0, W.width);
    ul((I) => I.ready && Math.abs(I.x - lt) < 0.25 && Math.abs(I.width - rt) < 0.25 ? I : {
      x: lt,
      width: rt,
      ready: rt > 0
    });
  }, [El]);
  return R.useLayoutEffect(() => {
    m();
  }, [m, pl.length]), R.useEffect(() => {
    const b = Qt.current;
    if (!b) return;
    const M = () => m();
    window.addEventListener("resize", M);
    let q = null;
    return typeof ResizeObserver < "u" && (q = new ResizeObserver(() => m()), q.observe(b)), () => {
      window.removeEventListener("resize", M), q && q.disconnect();
    };
  }, [m]), /* @__PURE__ */ s.jsx("section", { id: "view-workspace", className: `view-pane ${f ? "active" : ""}`, children: /* @__PURE__ */ s.jsxs("div", { className: "workspace-grid", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "workspace-main", children: [
      /* @__PURE__ */ s.jsxs("section", { className: "module chart-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "chart-toolbar", children: [
          /* @__PURE__ */ s.jsxs("form", { id: "symbolSearchForm", className: "symbol-form", onSubmit: o, children: [
            /* @__PURE__ */ s.jsx(
              "input",
              {
                id: "symbolInput",
                type: "text",
                placeholder: "AAPL / NASDAQ:AAPL / 005930",
                autoComplete: "off",
                value: y,
                onChange: (b) => v(b.target.value)
              }
            ),
            /* @__PURE__ */ s.jsx("button", { className: "btn accent", type: "submit", children: "차트 불러오기" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "chart-links", children: [
            /* @__PURE__ */ s.jsx("span", { id: "currentSymbol", className: "symbol-badge", children: j || "NASDAQ:AAPL" }),
            /* @__PURE__ */ s.jsx("a", { id: "openTradingView", href: H || "#", target: "_blank", rel: "noopener noreferrer", children: "트레이딩뷰 열기" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "symbol-quick-list", id: "symbolQuickList", children: (gt != null && gt.length ? gt : [{ market: "us", symbol: "AAPL", tv_symbol: "NASDAQ:AAPL" }]).map((b) => {
          const M = F0(b.market, b.symbol);
          return /* @__PURE__ */ s.jsx(
            "button",
            {
              className: "sym-chip",
              type: "button",
              onClick: () => Pt(b.tv_symbol || b.symbol, b),
              children: /* @__PURE__ */ s.jsx(
                Jc,
                {
                  market: b.market,
                  symbol: b.symbol,
                  label: M,
                  iconSeedLabel: Kc(b.market, b.symbol)
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
            className: V === "local" ? "is-hidden" : "",
            src: Z || ""
          }
        ),
        /* @__PURE__ */ s.jsxs("section", { id: "localChartShell", className: `local-chart-shell ${V === "local" ? "active" : ""}`, "aria-label": "로컬 캔들 차트", children: [
          /* @__PURE__ */ s.jsxs("header", { className: "local-chart-top", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "local-chart-identity", children: [
              /* @__PURE__ */ s.jsx("span", { className: "local-chart-identity-icon", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx(
                zm,
                {
                  market: hl.market,
                  symbol: hl.symbol,
                  seedLabel: hl.seedLabel
                }
              ) }),
              /* @__PURE__ */ s.jsx("span", { id: "localChartTitle", className: "local-chart-title", children: D || "차트" })
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
                        className: `local-chart-interval-indicator ${yl.ready ? "ready" : ""}`,
                        "aria-hidden": "true",
                        style: {
                          "--interval-tab-x": `${yl.x}px`,
                          "--interval-tab-width": `${yl.width}px`
                        }
                      }
                    ),
                    pl.map((b) => /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        ref: Et(b.value),
                        type: "button",
                        role: "tab",
                        "aria-selected": El === b.value,
                        className: `local-chart-interval-tab ${El === b.value ? "active" : ""}`,
                        onClick: () => it == null ? void 0 : it(b.value),
                        children: b.label
                      },
                      b.value
                    ))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "local-chart-meta-wrap", children: /* @__PURE__ */ s.jsx("span", { id: "localChartMeta", className: "local-chart-meta", children: z || "데이터 로딩 중..." }) })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "local-chart-canvas-wrap", ref: Mt, children: /* @__PURE__ */ s.jsx("div", { id: "localChartCanvas", className: "local-chart-canvas", ref: Rt }) })
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
            /* @__PURE__ */ s.jsx("strong", { id: "usEquity", children: Pl(nl == null ? void 0 : nl.equity, "USD") })
          ] }),
          /* @__PURE__ */ s.jsxs("article", { className: "metric-card metric-card-emphasis", children: [
            /* @__PURE__ */ s.jsx("label", { children: "한국 자산" }),
            /* @__PURE__ */ s.jsx("strong", { id: "krEquity", children: Pl(Jt == null ? void 0 : Jt.equity, "KRW") })
          ] }),
          /* @__PURE__ */ s.jsxs("article", { className: "metric-card", children: [
            /* @__PURE__ */ s.jsx("label", { children: "오늘 신호" }),
            /* @__PURE__ */ s.jsx("strong", { id: "signalsToday", children: String(tt.signals_today ?? "-") })
          ] }),
          /* @__PURE__ */ s.jsxs("article", { className: "metric-card", children: [
            /* @__PURE__ */ s.jsx("label", { children: "오늘 체결" }),
            /* @__PURE__ */ s.jsx("strong", { id: "fillsToday", children: String(tt.fills_today ?? "-") })
          ] }),
          /* @__PURE__ */ s.jsxs("article", { className: "metric-card metric-card-wide", children: [
            /* @__PURE__ */ s.jsx("label", { children: "최신 보고서" }),
            /* @__PURE__ */ s.jsx("strong", { id: "latestReport", children: (k == null ? void 0 : k.latest_report) || "없음" }),
            /* @__PURE__ */ s.jsxs("p", { className: "metric-meta", children: [
              "업데이트 ",
              /* @__PURE__ */ s.jsx("span", { id: "overviewUpdatedAt", children: As(k == null ? void 0 : k.server_time_kst) })
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
            /* @__PURE__ */ s.jsx("strong", { id: "portfolioUsEquity", children: Pl(at == null ? void 0 : at.us_equity, "USD") })
          ] }),
          /* @__PURE__ */ s.jsxs("article", { className: "metric-card", children: [
            /* @__PURE__ */ s.jsx("label", { children: "한국 자산" }),
            /* @__PURE__ */ s.jsx("strong", { id: "portfolioKrEquity", children: Pl(at == null ? void 0 : at.kr_equity, "KRW") })
          ] }),
          /* @__PURE__ */ s.jsxs("article", { className: "metric-card metric-card-emphasis", children: [
            /* @__PURE__ */ s.jsx("label", { children: "총액 (USD 환산)" }),
            /* @__PURE__ */ s.jsx("strong", { id: "portfolioTotalUsd", children: Pl(at == null ? void 0 : at.total_usd_est, "USD") })
          ] }),
          /* @__PURE__ */ s.jsxs("article", { className: "metric-card metric-card-emphasis", children: [
            /* @__PURE__ */ s.jsx("label", { children: "총액 (KRW 환산)" }),
            /* @__PURE__ */ s.jsx("strong", { id: "portfolioTotalKrw", children: Pl(at == null ? void 0 : at.total_krw_est, "KRW") })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("p", { className: "fx-note", children: [
          "환산 기준 USD/KRW: ",
          /* @__PURE__ */ s.jsx("span", { id: "portfolioFxRate", children: `${_} (${L}${J}${bt})` })
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
        /* @__PURE__ */ s.jsx("ol", { className: "position-summary-list", id: "workspacePositionList", children: tl.length ? tl.map((b, M) => {
          const q = Kc(b.market, b.symbol);
          return /* @__PURE__ */ s.jsxs("li", { className: "position-summary-item", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "position-summary-left", children: [
              /* @__PURE__ */ s.jsx("span", { className: "position-rank", children: String(M + 1).padStart(2, "0") }),
              /* @__PURE__ */ s.jsx(
                py,
                {
                  row: b,
                  label: q,
                  className: "symbol-link summary-symbol-link",
                  onClick: () => Ot(b)
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "position-summary-stats", children: [
              /* @__PURE__ */ s.jsxs("span", { className: "position-stat", children: [
                /* @__PURE__ */ s.jsx("em", { children: "수량" }),
                /* @__PURE__ */ s.jsx("b", { children: Es(b.qty) })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { className: `position-stat ${ps(b.unrealized_pnl)}`, children: [
                /* @__PURE__ */ s.jsx("em", { children: "평가손익" }),
                /* @__PURE__ */ s.jsx("b", { children: Ss(b.unrealized_pnl, wc(b.market)) })
              ] })
            ] })
          ] }, `${b.market}-${b.symbol}-${M}`);
        }) : /* @__PURE__ */ s.jsx("li", { className: "position-summary-empty", children: "보유 포지션 없음" }) })
      ] })
    ] })
  ] }) });
}
function ms(f) {
  const y = f === "dark";
  return {
    background: y ? "#141f2b" : "#ffffff",
    text: y ? "#9fb0c2" : "#6b7684",
    grid: y ? "#243546" : "#eef2f7",
    up: "#f04452",
    down: "#3f7cff",
    volumeUp: y ? "rgba(240, 68, 82, 0.55)" : "rgba(240, 68, 82, 0.38)",
    volumeDown: y ? "rgba(63, 124, 255, 0.55)" : "rgba(63, 124, 255, 0.38)"
  };
}
function Ay() {
  return {
    paused: !1,
    server_time_kst: null,
    accounts: [],
    metrics: { signals_today: 0, fills_today: 0 },
    latest_report: null
  };
}
function Ty() {
  return {
    totals: {},
    positions: [],
    recent_fills: [],
    agent_exposure: [],
    quick_symbols: []
  };
}
const _y = 4e3, Vc = 4, hs = 92, Ny = {
  "1m": 3e3,
  "3m": 4e3,
  "5m": 5e3,
  "15m": 8e3,
  "30m": 12e3,
  "60m": 15e3,
  "4h": 3e4,
  "1d": 6e4
}, kc = [
  { value: "1m", label: "1분", range: "5d" },
  { value: "3m", label: "3분", range: "5d" },
  { value: "5m", label: "5분", range: "5d" },
  { value: "15m", label: "15분", range: "5d" },
  { value: "30m", label: "30분", range: "1mo" },
  { value: "60m", label: "1시간", range: "2mo" },
  { value: "4h", label: "4시간", range: "6mo" },
  { value: "1d", label: "1일", range: "1y" }
], zy = new Set(kc.map((f) => f.value)), Zc = "30m", Em = 24, ys = 1200, Am = {
  usdkrw: "FX_IDC:USDKRW",
  nasdaq: "NASDAQ:IXIC",
  nasdaq100f: "CME_MINI:NQ1!",
  sp500: "SP:SPX",
  dowjones: "DJ:DJI",
  vix: "TVC:VIX",
  kospi: "TVC:KOSPI",
  kosdaq: "TVC:KOSDAQ"
}, vs = {
  id: "usdkrw",
  label: "달러 환율",
  tv_symbol: "FX_IDC:USDKRW"
};
function gs(f) {
  const y = String((f == null ? void 0 : f.id) || "").trim().toLowerCase();
  return y && Am[y] ? Am[y] : String((f == null ? void 0 : f.tv_symbol) || (f == null ? void 0 : f.symbol) || "").trim() || "";
}
function Tm(f) {
  return `https://www.tradingview.com/chart/?symbol=${encodeURIComponent(f)}`;
}
function xy(f) {
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
function ie(f) {
  const y = String(f || "").trim().toLowerCase();
  return zy.has(y) ? y : Zc;
}
function Qe(f) {
  var v;
  const y = ie(f);
  return ((v = kc.find((o) => o.value === y)) == null ? void 0 : v.range) || "2mo";
}
function Cy(f) {
  const y = ie(f);
  return y === "1d" ? ["1y", "2y", "5y"] : y === "4h" ? ["6mo", "1y", "2y", "5y"] : y === "60m" ? ["2mo", "3mo", "6mo", "1y", "2y", "5y"] : y === "30m" ? ["1mo", "2mo", "3mo", "6mo", "1y", "2y", "5y"] : ["5d", "1mo", "2mo", "3mo", "6mo", "1y", "2y", "5y"];
}
function Ry(f, y) {
  const v = Cy(f), o = String(y || "").trim().toLowerCase(), j = v.indexOf(o);
  if (j < 0) {
    const H = Qe(f), Z = v.indexOf(H);
    return Z >= 0 && Z + 1 < v.length ? v[Z + 1] : v[0] || "";
  }
  return v[j + 1] || "";
}
function Oy(f) {
  var v;
  const y = ie(f);
  return ((v = kc.find((o) => o.value === y)) == null ? void 0 : v.label) || "30분";
}
function Dy(f) {
  const y = String(f || "").trim().toLowerCase();
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
  }[y] || "최근 구간";
}
function My(f) {
  const y = ie(f);
  return Ny[y] || 1e4;
}
function bs(f) {
  const y = String(f || "").toUpperCase().trim();
  if (!y) return "차트";
  if (y.startsWith("KRX:") || y.endsWith(".KS") || y.endsWith(".KQ")) {
    const v = xu(y), o = zu[v];
    return o || (v ? `한국주식 ${v}` : "한국주식");
  }
  if (y.includes(":")) {
    const [, v] = y.split(":", 2);
    return v || y;
  }
  return y;
}
function jy() {
  const [f, y] = R.useState(() => _m(ss(bm, "light"))), [v, o] = R.useState(() => {
    const d = Qc(ss(vm, "workspace"));
    return Qc(window.location.hash || d);
  }), [j, H] = R.useState(() => ss(gm, "0") === "1"), [Z, V] = R.useState(!1), [D, z] = R.useState(Ay), [w, X] = R.useState(Ty), [it, Rt] = R.useState([]), [Mt, gt] = R.useState(!0), [Pt, k] = R.useState(!0), [at, Yt] = R.useState([]), [Ot, nl] = R.useState(""), [Jt, tt] = R.useState("불러오는 중..."), [tl, pl] = R.useState("준비 완료."), [El, hl] = R.useState(""), [Qt, fl] = R.useState(vs.tv_symbol), [yl, ul] = R.useState(vs.tv_symbol), [_, L] = R.useState("#"), [J, bt] = R.useState(""), [Et, m] = R.useState(""), [b, M] = R.useState("tv"), [q, W] = R.useState("차트"), [lt, rt] = R.useState("데이터 로딩 중..."), [I, Lt] = R.useState(Zc), [vl, fe] = R.useState(Qe(Zc)), [pa, On] = R.useState(!1), [te, Ka] = R.useState(!1), Ea = j && !Z, Aa = R.useRef(null), pe = R.useRef(null), Ve = R.useRef(null), ll = R.useRef(null), Xt = R.useRef({
    lastLength: 0,
    userDetached: !1,
    loadedRange: "",
    loadedInterval: Zc,
    firstTime: 0,
    backfillBusy: !1,
    historyExhausted: !1,
    lastBackfillTriggeredAt: 0,
    exploringPast: !1
  }), se = R.useRef(null), le = R.useRef(null), sl = R.useRef(!1), Ja = R.useRef(!1), wl = R.useRef(null), re = R.useRef(null), ee = R.useRef(null), Ee = R.useRef(!1), Al = R.useRef(null), Tl = R.useRef(null), ae = R.useRef(null), Nl = R.useRef(!1), Gt = R.useRef({
    downX: null,
    downY: null,
    active: !1
  }), ct = R.useCallback((d) => {
    const A = `[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] ${d}`;
    pl((O) => `${A}
${O}`.slice(0, 2e4));
  }, []);
  R.useEffect(() => {
    document.body.classList.toggle("theme-dark", f === "dark"), rs(bm, f);
  }, [f]), R.useEffect(() => {
    rs(vm, v);
    const d = `#${v}`;
    window.location.hash !== d && (window.location.hash = v);
  }, [v]), R.useEffect(() => {
    rs(gm, j ? "1" : "0");
  }, [j]), R.useEffect(() => {
    const d = () => {
      o((A) => {
        const O = Qc(window.location.hash);
        return A === O ? A : O;
      });
    };
    return window.addEventListener("hashchange", d), () => {
      window.removeEventListener("hashchange", d);
    };
  }, []), R.useEffect(() => {
    const d = window.matchMedia("(max-width: 767px)"), A = () => V(d.matches);
    return A(), typeof d.addEventListener == "function" ? (d.addEventListener("change", A), () => d.removeEventListener("change", A)) : (d.addListener(A), () => d.removeListener(A));
  }, []);
  const cl = R.useCallback(() => {
    const d = pe.current, A = Ve.current || (d == null ? void 0 : d.parentElement) || d;
    if (!A) return null;
    const O = A.getBoundingClientRect(), U = Number(A.clientWidth || O.width || 0), B = Number(A.clientHeight || O.height || 0), G = window.getComputedStyle(A), ft = Number.parseFloat(G.paddingLeft || "0") + Number.parseFloat(G.paddingRight || "0"), st = Number.parseFloat(G.paddingTop || "0") + Number.parseFloat(G.paddingBottom || "0"), nt = Math.max(1, Math.floor(U - ft)), vt = Math.max(1, Math.floor(B - st));
    return { width: nt, height: vt, viewportEl: A };
  }, []), Cu = R.useCallback(() => {
    var nt;
    if (!pe.current || !window.LightweightCharts || typeof window.LightweightCharts.createChart != "function") return null;
    if ((nt = ll.current) != null && nt.chart) return ll.current;
    const d = ms(f), A = cl(), O = (A == null ? void 0 : A.width) || 900, U = (A == null ? void 0 : A.height) || 520, B = window.LightweightCharts.createChart(pe.current, {
      width: O,
      height: U,
      layout: {
        background: { type: "solid", color: d.background },
        textColor: d.text
      },
      grid: {
        vertLines: { color: d.grid },
        horzLines: { color: d.grid }
      },
      crosshair: { mode: 1 },
      leftPriceScale: {
        visible: !1,
        borderVisible: !1
      },
      rightPriceScale: {
        borderColor: d.grid,
        minimumWidth: hs,
        entireTextOnly: !0
      },
      timeScale: {
        borderColor: d.grid,
        timeVisible: !0,
        secondsVisible: !1,
        rightOffset: Vc,
        rightBarStaysOnScroll: !0,
        fixLeftEdge: !0,
        lockVisibleTimeRangeOnResize: !0
      }
    }), G = B.addCandlestickSeries({
      upColor: d.up,
      downColor: d.down,
      wickUpColor: d.up,
      wickDownColor: d.down,
      borderUpColor: d.up,
      borderDownColor: d.down,
      priceLineVisible: !0
    }), ft = B.addHistogramSeries({
      priceFormat: { type: "volume" },
      priceScaleId: ""
    });
    B.priceScale("").applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 }
    });
    const st = (vt) => {
      const Tt = Xt.current, jt = Number(Tt.lastLength || 0);
      if (!vt || !Number.isFinite(vt.to) || jt <= 0)
        return;
      const F = jt - 1, Bt = vt.to >= F - 0.75;
      if (Tt.userDetached = !Bt, F - Number(vt.to || 0) >= Em && Tt.userDetached && typeof se.current == "function") {
        const ke = Date.now();
        ke - Number(Tt.lastBackfillTriggeredAt || 0) >= ys && (Tt.lastBackfillTriggeredAt = ke, se.current());
      }
    };
    return B.timeScale().subscribeVisibleLogicalRangeChange(st), ll.current = { chart: B, candleSeries: G, volumeSeries: ft, onRangeChange: st }, ll.current;
  }, [f, cl]), Ru = R.useCallback(() => {
    var A;
    if (!((A = ll.current) != null && A.chart)) return;
    const d = ms(f);
    ll.current.chart.applyOptions({
      layout: {
        background: { type: "solid", color: d.background },
        textColor: d.text
      },
      grid: {
        vertLines: { color: d.grid },
        horzLines: { color: d.grid }
      },
      rightPriceScale: {
        borderColor: d.grid,
        minimumWidth: hs,
        entireTextOnly: !0
      },
      timeScale: {
        borderColor: d.grid,
        rightOffset: Vc,
        rightBarStaysOnScroll: !0,
        fixLeftEdge: !0,
        lockVisibleTimeRangeOnResize: !0
      }
    }), ll.current.candleSeries.applyOptions({
      upColor: d.up,
      downColor: d.down,
      wickUpColor: d.up,
      wickDownColor: d.down,
      borderUpColor: d.up,
      borderDownColor: d.down
    });
  }, [f]), oe = R.useCallback((d = !1) => {
    var G;
    const A = (G = ll.current) == null ? void 0 : G.chart;
    if (!A) return;
    const O = cl();
    if (!O) return;
    const { width: U, height: B } = O;
    typeof A.resize == "function" ? A.resize(U, B) : A.applyOptions({ width: U, height: B }), A.timeScale().applyOptions({
      rightOffset: Vc,
      rightBarStaysOnScroll: !0,
      fixLeftEdge: !0,
      lockVisibleTimeRangeOnResize: !0
    }), A.priceScale("right").applyOptions({
      minimumWidth: hs,
      entireTextOnly: !0
    }), d && (A.timeScale().fitContent(), A.timeScale().applyOptions({
      rightOffset: Vc
    }));
  }, [cl]);
  R.useEffect(() => {
    Ru(), J && m(os(J, f));
  }, [f, J, Ru]), R.useEffect(() => {
    var U;
    const d = () => {
      oe(!1);
    };
    window.addEventListener("resize", d);
    let A = null;
    const O = Ve.current || ((U = pe.current) == null ? void 0 : U.parentElement) || pe.current;
    return typeof ResizeObserver < "u" && O && (A = new ResizeObserver(() => oe(!1)), A.observe(O)), () => {
      window.removeEventListener("resize", d), A && A.disconnect();
    };
  }, [oe]), R.useEffect(() => {
    if (b !== "local" || v !== "workspace") return;
    const d = () => oe(!0), A = window.requestAnimationFrame(d), O = window.requestAnimationFrame(d), U = window.setTimeout(d, 120);
    return () => {
      window.cancelAnimationFrame(A), window.cancelAnimationFrame(O), window.clearTimeout(U);
    };
  }, [b, v, Ea, Z, oe]), R.useEffect(() => () => {
    var d, A;
    (d = ll.current) != null && d.chart && ((A = ll.current) != null && A.onRangeChange && ll.current.chart.timeScale().unsubscribeVisibleLogicalRangeChange(ll.current.onRangeChange), ll.current.chart.remove()), ll.current = null;
  }, []);
  const gl = R.useCallback(() => {
    const d = Aa.current;
    if (!d) {
      On(!1), Ka(!1);
      return;
    }
    const A = Math.max(0, d.scrollWidth - d.clientWidth), O = d.scrollLeft;
    On(O > 2), Ka(O < A - 2);
  }, []);
  R.useEffect(() => {
    const d = Aa.current;
    if (!d) return;
    const A = (G) => {
      G.preventDefault();
    };
    gl();
    const O = () => gl();
    d.addEventListener("scroll", O, { passive: !0 }), d.addEventListener("dragstart", A);
    let U = null;
    typeof ResizeObserver < "u" && (U = new ResizeObserver(() => gl()), U.observe(d));
    const B = () => gl();
    return window.addEventListener("resize", B), () => {
      d.removeEventListener("scroll", O), d.removeEventListener("dragstart", A), U && U.disconnect(), window.removeEventListener("resize", B);
    };
  }, [gl]), R.useEffect(() => {
    const d = Aa.current;
    if (!d) return;
    const A = () => {
      d.scrollTo({ left: 0, top: 0, behavior: "auto" }), gl();
    };
    A();
    const O = window.requestAnimationFrame(A), U = window.requestAnimationFrame(() => {
      A();
    });
    return () => {
      window.cancelAnimationFrame(O), window.cancelAnimationFrame(U);
    };
  }, [Mt, Pt, gl]), R.useEffect(() => {
    gl();
  }, [it, Mt, Pt, gl]), R.useEffect(() => {
    const d = window.setTimeout(() => {
      k(!1);
    }, _y);
    return () => {
      window.clearTimeout(d);
    };
  }, []);
  const Ta = R.useCallback((d) => {
    const A = Aa.current;
    if (!A) return;
    const O = Math.max(180, Math.round(A.clientWidth * 0.72));
    A.scrollBy({
      left: d * O,
      behavior: "smooth"
    }), window.setTimeout(() => {
      gl();
    }, 260);
  }, [gl]), Ll = R.useCallback((d, { title: A = "", fitContent: O = !0 } = {}) => {
    var Hn, Fa, _e, Ln;
    const U = Cu();
    if (!U) return !1;
    const B = U.chart.timeScale(), G = Xt.current, ft = (d.candles || []).map((kt) => ({
      time: Number(kt.time),
      open: Number(kt.open),
      high: Number(kt.high),
      low: Number(kt.low),
      close: Number(kt.close)
    }));
    if (!ft.length) return !1;
    const st = ms(f), nt = (d.candles || []).map((kt) => ({
      time: Number(kt.time),
      value: Number(kt.volume || 0),
      color: Number(kt.close) >= Number(kt.open) ? st.volumeUp : st.volumeDown
    }));
    let vt = null, Tt = null;
    const jt = !O && !!G.userDetached;
    if (jt && B && (typeof B.getVisibleRange == "function" && (vt = B.getVisibleRange()), typeof B.getVisibleLogicalRange == "function" && (Tt = B.getVisibleLogicalRange())), U.candleSeries.setData(ft), U.volumeSeries.setData(nt), G.lastLength = ft.length, G.firstTime = Number(((Hn = ft[0]) == null ? void 0 : Hn.time) || 0), G.loadedRange = String(d.range || G.loadedRange || "").trim().toLowerCase(), G.loadedInterval = ie(d.interval || G.loadedInterval), O)
      B.fitContent(), G.userDetached = !1, G.exploringPast = !1;
    else if (jt) {
      let kt = !1;
      if (vt && Number.isFinite(vt.from) && Number.isFinite(vt.to))
        try {
          B.setVisibleRange(vt), kt = !0;
        } catch {
          kt = !1;
        }
      if (!kt && Tt && Number.isFinite(Tt.from) && Number.isFinite(Tt.to))
        try {
          B.setVisibleLogicalRange(Tt);
        } catch {
        }
    }
    const F = String(((Fa = d.meta) == null ? void 0 : Fa.source) || "").toLowerCase(), Ca = String(((_e = d.meta) == null ? void 0 : _e.source_label) || "").trim() || (F.startsWith("naver") ? "네이버 금융" : F.includes("hybrid") ? "야후+네이버" : "야후 파이낸스"), he = F.includes("live") ? "실시간" : null, ke = String(((Ln = d.meta) == null ? void 0 : Ln.quote_time_utc) || "").trim();
    let Ra = "";
    if (he && ke) {
      const kt = new Date(ke);
      Number.isNaN(kt.getTime()) || (Ra = ` · ${kt.toLocaleTimeString("ko-KR", { hour12: !1 })} 업데이트`);
    }
    const Fc = A || d.label || d.symbol || d.yahoo_symbol || d.tv_symbol || "차트", Rl = ie(d.interval), $e = String(d.range || "").trim().toLowerCase();
    return $e && $e !== String(vl || "").trim().toLowerCase() && fe($e), W(Fc), rt(
      `${Oy(Rl)} 봉 · ${Dy($e)} · ${Ca}${he ? ` (${he})` : ""}${Ra}`
    ), M("local"), O && window.requestAnimationFrame(() => {
      oe(!0), window.setTimeout(() => {
        oe(!0);
      }, 100);
    }), !0;
  }, [Cu, vl, f, oe]), zl = R.useCallback(async (d, A, O = I, U = {}) => {
    const B = ie(O), G = Qe(B), ft = String(U.range || vl || G).trim().toLowerCase() || G, st = await Se(
      `/api/chart/candles?query=${encodeURIComponent(d)}&interval=${encodeURIComponent(B)}&range=${encodeURIComponent(ft)}`
    ), nt = A || st.yahoo_symbol || d;
    return Ll(st, { title: nt, fitContent: U.fitContent !== !1 });
  }, [I, vl, Ll]), _a = R.useCallback(async (d, A = I, O = {}) => {
    O.fitContent !== !1 && (Xt.current.userDetached = !1, Xt.current.historyExhausted = !1, Xt.current.backfillBusy = !1, Xt.current.lastBackfillTriggeredAt = 0, Xt.current.exploringPast = !1, fe(Qe(A)));
    const U = bs(d.tv_symbol), B = await zl(d.tv_symbol, U, A, O);
    return B && (le.current = {
      kind: "symbol",
      tvSymbol: d.tv_symbol,
      title: U
    }), B;
  }, [I, zl]), xl = R.useCallback(async (d, A = I, O = {}) => {
    O.fitContent !== !1 && (Xt.current.userDetached = !1, Xt.current.historyExhausted = !1, Xt.current.backfillBusy = !1, Xt.current.lastBackfillTriggeredAt = 0, Xt.current.exploringPast = !1, fe(Qe(A)));
    const U = String((d == null ? void 0 : d.id) || "").trim().toLowerCase();
    if (!U) return !1;
    const B = ie(A), G = Qe(B), ft = String(O.range || vl || G).trim().toLowerCase() || G, st = await Se(
      `/api/market-indicators/${encodeURIComponent(U)}/candles?interval=${encodeURIComponent(B)}&range=${encodeURIComponent(ft)}`
    ), nt = String((d == null ? void 0 : d.label) || st.label || U).trim(), vt = Ll(st, { title: nt, fitContent: O.fitContent !== !1 });
    return vt && (le.current = {
      kind: "indicator",
      indicatorId: U,
      tvSymbol: String(gs(d) || "").trim().toUpperCase(),
      title: nt
    }), vt;
  }, [I, vl, Ll]), Ou = R.useCallback(async () => {
    var st;
    if (v !== "workspace" || b !== "local") return;
    const d = Xt.current;
    if (d.backfillBusy || d.historyExhausted) return;
    const A = le.current;
    if (!A) return;
    const O = ie(I), U = String(vl || d.loadedRange || Qe(O)).trim().toLowerCase(), B = Ry(O, U);
    if (!B || B === U) {
      d.historyExhausted = !0;
      return;
    }
    d.backfillBusy = !0;
    const G = Number(d.firstTime || 0), ft = Number(d.lastLength || 0);
    try {
      let nt = null;
      if (A.kind === "indicator" && A.indicatorId ? nt = await Se(
        `/api/market-indicators/${encodeURIComponent(A.indicatorId)}/candles?interval=${encodeURIComponent(O)}&range=${encodeURIComponent(B)}`
      ) : A.kind === "symbol" && A.tvSymbol && (nt = await Se(
        `/api/chart/candles?query=${encodeURIComponent(A.tvSymbol)}&interval=${encodeURIComponent(O)}&range=${encodeURIComponent(B)}`
      )), !nt) return;
      if (!Ll(nt, {
        title: A.title || q,
        fitContent: !1
      })) {
        d.historyExhausted = !0;
        return;
      }
      const Tt = Number(((st = (nt.candles || [])[0]) == null ? void 0 : st.time) || 0), jt = Number((nt.candles || []).length || 0), F = String(nt.range || B).trim().toLowerCase();
      F && fe(F), Tt > 0 && G > 0 && Tt < G || jt > ft || (d.historyExhausted = !0);
    } catch (nt) {
      ct(`과거 구간 로드 실패: ${nt.message}`);
    } finally {
      d.backfillBusy = !1;
    }
  }, [v, b, I, vl, q, ct, Ll]);
  R.useEffect(() => (se.current = () => {
    Ou();
  }, () => {
    se.current = null;
  }), [Ou]), R.useEffect(() => {
    if (v !== "workspace" || b !== "local") return;
    const d = window.setInterval(() => {
      var nt, vt;
      const A = (nt = ll.current) == null ? void 0 : nt.chart, O = le.current;
      if (!A || !O) return;
      const U = Xt.current, B = (vt = A.timeScale) == null ? void 0 : vt.call(A);
      if (!B || typeof B.getVisibleLogicalRange != "function") return;
      const G = B.getVisibleLogicalRange();
      if (!G || !Number.isFinite(G.from) || !Number.isFinite(G.to)) return;
      const ft = Number(U.lastLength || 0);
      if (ft > 0) {
        const Tt = ft - 1, jt = G.to >= Tt - 0.75;
        U.userDetached = !jt;
        const F = Tt - Number(G.to || 0);
        U.exploringPast = F >= Em;
      }
      if (!U.userDetached || U.backfillBusy || U.historyExhausted || !U.exploringPast) return;
      const st = Date.now();
      st - Number(U.lastBackfillTriggeredAt || 0) < ys || (U.lastBackfillTriggeredAt = st, typeof se.current == "function" && se.current());
    }, 700);
    return () => {
      window.clearInterval(d);
    };
  }, [v, b, I]), R.useEffect(() => {
    if (v !== "workspace" || b !== "local") return;
    const d = Ve.current;
    if (!d) return;
    const A = (G, ft) => {
      Gt.current.downX = Number(G), Gt.current.downY = Number(ft), Gt.current.active = !0;
    }, O = (G) => {
      A(G.clientX, G.clientY);
    }, U = (G) => {
      A(G.clientX, G.clientY);
    }, B = (G) => {
      if (!Gt.current.active) return;
      const ft = Number(Gt.current.downX), st = Number(Gt.current.downY);
      if (Gt.current.downX = null, Gt.current.downY = null, Gt.current.active = !1, !Number.isFinite(ft) || !Number.isFinite(st)) return;
      const nt = Number(G == null ? void 0 : G.clientX), vt = Number(G == null ? void 0 : G.clientY), Tt = Number.isFinite(nt) ? Math.abs(nt - ft) : 0, jt = Number.isFinite(vt) ? Math.abs(vt - st) : 0;
      if (Tt < 16 && jt < 16) return;
      const F = Xt.current;
      if (F.backfillBusy || F.historyExhausted) return;
      const Bt = Date.now();
      Bt - Number(F.lastBackfillTriggeredAt || 0) < ys || (F.lastBackfillTriggeredAt = Bt, F.userDetached = !0, F.exploringPast = !0, typeof se.current == "function" && se.current());
    };
    return d.addEventListener("pointerdown", O, { passive: !0 }), d.addEventListener("mousedown", U, { passive: !0 }), window.addEventListener("pointerup", B, !0), window.addEventListener("mouseup", B, !0), window.addEventListener("touchend", B, !0), () => {
      d.removeEventListener("pointerdown", O), d.removeEventListener("mousedown", U), window.removeEventListener("pointerup", B, !0), window.removeEventListener("mouseup", B, !0), window.removeEventListener("touchend", B, !0);
    };
  }, [v, b, I]);
  const Dn = R.useCallback(async (d) => {
    const A = I0(d);
    return Se(`/api/chart/resolve?query=${encodeURIComponent(A)}`);
  }, []), Cl = R.useCallback(async (d, { silent: A = !1 } = {}) => {
    const O = await Dn(d), U = bs(O.tv_symbol);
    ul(O.tv_symbol), fl(O.tv_symbol), L(O.chart_url);
    let B = !1;
    if (J0(O.tv_symbol))
      try {
        B = await _a(O, I);
      } catch (G) {
        ct(`KR 차트 로딩 실패, TradingView로 전환: ${G.message}`);
      }
    B || (M("tv"), bt(O.widget_url), m(os(O.widget_url, f)), le.current = null, W(U)), Ja.current = !0, A || ct(`차트 변경: ${O.tv_symbol}`);
  }, [Dn, _a, f, ct, I]), de = R.useCallback(async () => {
    const d = await Se("/api/overview");
    z(d);
  }, []), ka = R.useCallback(async () => {
    const d = await Se("/api/portfolio");
    if (X(d), !Ja.current) {
      const A = vs, O = gs(A);
      ul(O), fl(O), L(Tm(O)), W(A.label);
      let U = !1;
      try {
        U = await xl(A, I);
      } catch (B) {
        ct(`초기 달러 환율 차트 로딩 실패: ${B.message}`);
      }
      U ? Ja.current = !0 : await Cl(O, { silent: !0 });
    }
  }, [Cl, xl, I, ct]), Ae = R.useCallback(async (d) => {
    if (!d) {
      tt("보고서가 아직 없습니다.");
      return;
    }
    const A = await Se(`/api/report/${d}`);
    tt(A.content);
  }, []), Mn = R.useCallback(async () => {
    const d = await Se("/api/reports"), A = Array.isArray(d.reports) ? d.reports : [];
    if (Yt(A), !A.length) {
      nl(""), tt("보고서가 아직 없습니다.");
      return;
    }
    const O = Ot && A.includes(Ot) ? Ot : A[0];
    nl(O), await Ae(O);
  }, [Ot, Ae]), Na = R.useCallback(async () => {
    try {
      const d = await Se("/api/market-indicators");
      Rt(Array.isArray(d.items) ? d.items : []);
    } catch (d) {
      Rt((A) => A.length ? A : []), ct(`핵심 지표 수신 실패: ${d.message}`);
    } finally {
      gt(!1);
    }
  }, [ct]), we = R.useCallback(async () => {
    await de(), await ka(), await Mn(), await Na();
  }, [de, ka, Mn, Na]);
  R.useEffect(() => {
    let d = !1;
    return we().then(() => {
      d || ct("Ryong Investment 마켓 스테이션 준비 완료");
    }).catch((A) => {
      d || ct(`초기화 실패: ${A.message}`);
    }), () => {
      d = !0;
    };
  }, [we, ct]), R.useEffect(() => {
    const d = window.setInterval(async () => {
      try {
        await de(), await ka(), Ee.current || await Na();
      } catch {
      }
    }, 5e3);
    return () => window.clearInterval(d);
  }, [de, ka, Na]), R.useEffect(() => {
    if (typeof window.WebSocket != "function" && !window.EventSource) return;
    let d = !1;
    const A = () => {
      re.current && (re.current.close(), re.current = null), wl.current && (wl.current.close(), wl.current = null), ee.current && (window.clearTimeout(ee.current), ee.current = null), Ee.current = !1;
    }, O = (ft = 1800) => {
      ee.current || d || (ee.current = window.setTimeout(() => {
        ee.current = null, d || G();
      }, ft));
    }, U = (ft) => {
      try {
        const st = JSON.parse(String(ft || "{}"));
        (st == null ? void 0 : st.ok) === !0 && Array.isArray(st.items) && (Rt(st.items), gt(!1));
      } catch {
      }
    }, B = () => {
      if (!window.EventSource || d) return;
      wl.current && (wl.current.close(), wl.current = null);
      const ft = new EventSource("/api/market-indicators/stream");
      wl.current = ft, Ee.current = !0, ft.onmessage = (st) => {
        U(st.data);
      }, ft.onerror = () => {
        Ee.current = !1, ft === wl.current && (ft.close(), wl.current = null), O(2400);
      };
    }, G = () => {
      if (A(), d) return;
      if (typeof window.WebSocket != "function") {
        B();
        return;
      }
      const st = `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}/api/market-indicators/ws`, nt = new window.WebSocket(st);
      re.current = nt;
      let vt = !1;
      const Tt = window.setTimeout(() => {
        !vt && nt === re.current && nt.close();
      }, 2600);
      nt.onopen = () => {
        vt = !0, window.clearTimeout(Tt), Ee.current = !0;
      }, nt.onmessage = (jt) => {
        U(jt.data);
      }, nt.onerror = () => {
        Ee.current = !1;
      }, nt.onclose = () => {
        if (window.clearTimeout(Tt), nt === re.current && (re.current = null), Ee.current = !1, !d) {
          if (!vt && window.EventSource) {
            B();
            return;
          }
          O(1800);
        }
      };
    };
    return G(), () => {
      d = !0, A();
    };
  }, []), R.useEffect(() => {
    const d = () => {
      Tl.current && (Tl.current.close(), Tl.current = null), Al.current && (Al.current.close(), Al.current = null), ae.current && (window.clearTimeout(ae.current), ae.current = null), Nl.current = !1;
    };
    if (typeof window.WebSocket != "function" && !window.EventSource || v !== "workspace" || b !== "local") {
      d();
      return;
    }
    const A = le.current;
    if (!A) {
      d();
      return;
    }
    const O = new URLSearchParams({
      interval: ie(I),
      range: String(vl || Qe(I)).trim().toLowerCase()
    });
    if (A.kind === "indicator" && A.indicatorId)
      O.set("indicator_id", String(A.indicatorId));
    else if (A.kind === "symbol" && A.tvSymbol)
      O.set("query", String(A.tvSymbol));
    else {
      d();
      return;
    }
    let U = !1;
    const B = O.toString(), ft = `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}/api/chart/ws?${B}`, st = `/api/chart/stream?${B}`, nt = (F) => {
      try {
        const Bt = JSON.parse(String(F || "{}"));
        if ((Bt == null ? void 0 : Bt.ok) !== !0 || !Array.isArray(Bt == null ? void 0 : Bt.candles)) return;
        Ll(Bt, {
          title: A.title || q,
          fitContent: !1
        });
      } catch {
      }
    }, vt = (F = 1800) => {
      U || ae.current || (ae.current = window.setTimeout(() => {
        ae.current = null, U || jt();
      }, F));
    }, Tt = () => {
      if (!window.EventSource || U) return;
      Al.current && (Al.current.close(), Al.current = null);
      const F = new EventSource(st);
      Al.current = F, Nl.current = !0, F.onmessage = (Bt) => {
        nt(Bt.data);
      }, F.onerror = () => {
        F === Al.current && (F.close(), Al.current = null), Nl.current = !1, vt(2400);
      };
    }, jt = () => {
      if (U) return;
      if (typeof window.WebSocket != "function") {
        Tt();
        return;
      }
      Tl.current && (Tl.current.close(), Tl.current = null);
      const F = new window.WebSocket(ft);
      Tl.current = F;
      let Bt = !1;
      const Ca = window.setTimeout(() => {
        !Bt && F === Tl.current && F.close();
      }, 2600);
      F.onopen = () => {
        Bt = !0, window.clearTimeout(Ca), Nl.current = !0;
      }, F.onmessage = (he) => {
        nt(he.data);
      }, F.onerror = () => {
        Nl.current = !1;
      }, F.onclose = () => {
        if (window.clearTimeout(Ca), F === Tl.current && (Tl.current = null), Nl.current = !1, !U) {
          if (!Bt && window.EventSource) {
            Tt();
            return;
          }
          vt(1800);
        }
      };
    };
    return jt(), () => {
      U = !0, Tl.current && (Tl.current.close(), Tl.current = null), Al.current && (Al.current.close(), Al.current = null), ae.current && (window.clearTimeout(ae.current), ae.current = null), Nl.current = !1;
    };
  }, [v, b, I, vl, yl, Ll, q]), R.useEffect(() => {
    if (v !== "workspace" || b !== "local") return;
    const d = My(I);
    let A = !1;
    const O = async () => {
      if (A || sl.current || Nl.current) return;
      const B = le.current;
      if (B) {
        sl.current = !0;
        try {
          B.kind === "indicator" ? await xl(
            {
              id: B.indicatorId,
              label: B.title,
              tv_symbol: B.tvSymbol
            },
            I,
            { fitContent: !1 }
          ) : B.kind === "symbol" && await zl(B.tvSymbol, B.title, I, { fitContent: !1 });
        } catch (G) {
          ct(`실시간 차트 갱신 실패: ${G.message}`);
        } finally {
          sl.current = !1;
        }
      }
    }, U = window.setInterval(() => {
      O();
    }, d);
    return () => {
      A = !0, window.clearInterval(U);
    };
  }, [v, b, I, xl, zl, ct]);
  const jn = Ea ? "app-shell sidebar-collapsed" : "app-shell", Du = D != null && D.server_time_kst ? `KST ${new Date(D.server_time_kst).toLocaleString()}` : "--", Un = R.useCallback((d) => {
    o(Qc(d));
  }, []), me = R.useCallback(async () => {
    await we(), ct("수동 새로고침 완료");
  }, [we, ct]), el = R.useCallback(async (d) => {
    d.preventDefault();
    const A = Qt.trim();
    if (A)
      try {
        o("workspace"), await Cl(A);
      } catch (O) {
        ct(`검색 실패: ${O.message}`);
      }
  }, [Qt, Cl, ct]), bl = R.useCallback(async (d) => {
    if (d.key !== "Enter") return;
    d.preventDefault();
    const A = El.trim();
    if (A) {
      fl(A);
      try {
        o("workspace"), await Cl(A);
      } catch (O) {
        ct(`검색 실패: ${O.message}`);
      }
    }
  }, [El, Cl, ct]), Ze = R.useCallback(async (d, A) => {
    const O = (A == null ? void 0 : A.tv_symbol) || d;
    try {
      o("workspace"), await Cl(O);
    } catch (U) {
      ct(`심볼 로딩 실패: ${U.message}`);
    }
  }, [Cl, ct]), $a = R.useCallback(async (d) => {
    try {
      o("workspace"), await Cl(P0(d.market, d.symbol));
    } catch (A) {
      ct(`포지션 심볼 로딩 실패: ${A.message}`);
    }
  }, [Cl, ct]), $c = R.useCallback(async (d) => {
    const A = gs(d), O = String(A || "").trim().toUpperCase();
    if (!O) return;
    o("workspace"), ul(O), fl(O), L(Tm(O)), W(String((d == null ? void 0 : d.label) || bs(O)).trim() || "차트");
    let U = !1;
    try {
      U = await xl(d);
    } catch (B) {
      ct(`지표 로컬 차트 로딩 실패, TradingView로 전환: ${B.message}`);
    }
    if (!U) {
      const B = xy(O);
      M("tv"), bt(B), m(os(B, f)), le.current = null;
    }
    Ja.current = !0, ct(`차트 변경: ${O}`);
  }, [f, xl, ct]), Wc = R.useCallback(async (d) => {
    const A = ie(d);
    if (Lt(A), fe(Qe(A)), Xt.current.historyExhausted = !1, Xt.current.backfillBusy = !1, Xt.current.lastBackfillTriggeredAt = 0, Xt.current.exploringPast = !1, b !== "local") return;
    const O = le.current;
    if (O) {
      rt("데이터 로딩 중...");
      try {
        if (O.kind === "indicator")
          await xl(
            {
              id: O.indicatorId,
              label: O.title,
              tv_symbol: O.tvSymbol
            },
            A
          );
        else if (O.kind === "symbol" && !await zl(O.tvSymbol, O.title, A))
          throw new Error("로컬 차트 렌더링 실패");
      } catch (U) {
        ct(`차트 주기 변경 실패: ${U.message}`);
      }
    }
  }, [b, xl, zl, ct]), Mu = R.useCallback(async () => {
    Ot && (await Ae(Ot), ct(`보고서 불러옴: ${Ot}`));
  }, [Ot, Ae, ct]), za = R.useCallback(async (d) => {
    nl(d), await Ae(d);
  }, [Ae]), Wa = (w == null ? void 0 : w.totals) || {}, Te = (w == null ? void 0 : w.positions) || [], Ke = (w == null ? void 0 : w.recent_fills) || [], xa = (w == null ? void 0 : w.agent_exposure) || [], Je = (w == null ? void 0 : w.quick_symbols) || [];
  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsx(
      vy,
      {
        globalSearchInput: El,
        onGlobalSearchInputChange: hl,
        onGlobalSearchKeyDown: bl,
        theme: f,
        onToggleTheme: () => y((d) => d === "dark" ? "light" : "dark"),
        paused: !!(D != null && D.paused),
        onRefreshAll: me,
        sidebarCollapsed: Ea,
        onToggleSidebar: () => H((d) => !d)
      }
    ),
    /* @__PURE__ */ s.jsx("div", { className: "status-line", children: /* @__PURE__ */ s.jsx("p", { id: "serverClock", children: Du }) }),
    /* @__PURE__ */ s.jsxs("div", { className: "macro-strip-shell", children: [
      /* @__PURE__ */ s.jsx("span", { className: `macro-edge left ${pa ? "active" : ""}`, "aria-hidden": "true" }),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `macro-scroll-btn left ${pa ? "active" : ""}`,
          "aria-label": "왼쪽으로 스크롤",
          onClick: () => Ta(-1),
          disabled: !pa,
          children: /* @__PURE__ */ s.jsx("span", { "aria-hidden": "true", children: "‹" })
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "macro-strip", id: "macroStrip", ref: Aa, children: /* @__PURE__ */ s.jsx(
        ry,
        {
          items: it,
          loading: Mt || Pt,
          onSelectItem: $c
        }
      ) }),
      /* @__PURE__ */ s.jsx("span", { className: `macro-edge right ${te ? "active" : ""}`, "aria-hidden": "true" }),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `macro-scroll-btn right ${te ? "active" : ""}`,
          "aria-label": "오른쪽으로 스크롤",
          onClick: () => Ta(1),
          disabled: !te,
          children: /* @__PURE__ */ s.jsx("span", { "aria-hidden": "true", children: "›" })
        }
      )
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "market-strip", id: "marketStrip", children: /* @__PURE__ */ s.jsx(oy, { overview: D, totals: Wa }) }),
    /* @__PURE__ */ s.jsxs("main", { className: jn, children: [
      /* @__PURE__ */ s.jsx(dy, { activeNav: v, onChangeNav: Un }),
      /* @__PURE__ */ s.jsxs("section", { className: "content-shell", children: [
        /* @__PURE__ */ s.jsx(
          Ey,
          {
            active: v === "workspace",
            symbolInput: Qt,
            onChangeSymbolInput: fl,
            onSubmitSymbol: el,
            currentSymbol: yl,
            openTradingViewUrl: _,
            tvWidgetUrl: Et,
            chartRenderer: b,
            localChartTitle: q,
            localChartMeta: lt,
            localChartInterval: I,
            localChartIntervalOptions: kc,
            onChangeLocalChartInterval: Wc,
            localChartCanvasRef: pe,
            localChartViewportRef: Ve,
            quickSymbols: Je,
            onClickQuickSymbol: Ze,
            overview: D,
            portfolioTotals: Wa,
            positions: Te,
            onClickPositionSymbol: $a
          }
        ),
        /* @__PURE__ */ s.jsx(
          hy,
          {
            active: v === "positions",
            positions: Te,
            recentFills: Ke,
            agentExposure: xa,
            onClickPositionSymbol: $a
          }
        ),
        /* @__PURE__ */ s.jsx(
          yy,
          {
            active: v === "reports",
            reports: at,
            selectedReport: Ot,
            reportContent: Jt,
            operationLog: tl,
            onChangeReport: za,
            onReloadReport: Mu
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(my, { activeNav: v, onChangeNav: Un })
  ] });
}
const xm = document.getElementById("appRoot");
if (!xm)
  throw new Error("appRoot element not found");
Q0.createRoot(xm).render(/* @__PURE__ */ s.jsx(jy, {}));
