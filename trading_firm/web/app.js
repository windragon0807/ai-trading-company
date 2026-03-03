var es = { exports: {} }, Nu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var im;
function H0() {
  if (im) return Nu;
  im = 1;
  var f = Symbol.for("react.transitional.element"), d = Symbol.for("react.fragment");
  function v(r, j, L) {
    var K = null;
    if (L !== void 0 && (K = "" + L), j.key !== void 0 && (K = "" + j.key), "key" in j) {
      L = {};
      for (var Z in j)
        Z !== "key" && (L[Z] = j[Z]);
    } else L = j;
    return j = L.ref, {
      $$typeof: f,
      type: r,
      key: K,
      ref: j !== void 0 ? j : null,
      props: L
    };
  }
  return Nu.Fragment = d, Nu.jsx = v, Nu.jsxs = v, Nu;
}
var fm;
function B0() {
  return fm || (fm = 1, es.exports = H0()), es.exports;
}
var s = B0(), as = { exports: {} }, _u = {}, ns = { exports: {} }, us = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sm;
function q0() {
  return sm || (sm = 1, (function(f) {
    function d(A, H) {
      var $ = A.length;
      A.push(H);
      t: for (; 0 < $; ) {
        var gt = $ - 1 >>> 1, tt = A[gt];
        if (0 < j(tt, H))
          A[gt] = H, A[$] = tt, $ = gt;
        else break t;
      }
    }
    function v(A) {
      return A.length === 0 ? null : A[0];
    }
    function r(A) {
      if (A.length === 0) return null;
      var H = A[0], $ = A.pop();
      if ($ !== H) {
        A[0] = $;
        t: for (var gt = 0, tt = A.length, m = tt >>> 1; gt < m; ) {
          var b = 2 * (gt + 1) - 1, D = A[b], q = b + 1, F = A[q];
          if (0 > j(D, $))
            q < tt && 0 > j(F, D) ? (A[gt] = F, A[q] = $, gt = q) : (A[gt] = D, A[b] = $, gt = b);
          else if (q < tt && 0 > j(F, $))
            A[gt] = F, A[q] = $, gt = q;
          else break t;
        }
      }
      return H;
    }
    function j(A, H) {
      var $ = A.sortIndex - H.sortIndex;
      return $ !== 0 ? $ : A.id - H.id;
    }
    if (f.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var L = performance;
      f.unstable_now = function() {
        return L.now();
      };
    } else {
      var K = Date, Z = K.now();
      f.unstable_now = function() {
        return K.now() - Z;
      };
    }
    var U = [], x = [], X = 1, Y = null, I = 3, zt = !1, xt = !1, dt = !1, Yt = !1, k = typeof setTimeout == "function" ? setTimeout : null, P = typeof clearTimeout == "function" ? clearTimeout : null, Lt = typeof setImmediate < "u" ? setImmediate : null;
    function _t(A) {
      for (var H = v(x); H !== null; ) {
        if (H.callback === null) r(x);
        else if (H.startTime <= A)
          r(x), H.sortIndex = H.expirationTime, d(U, H);
        else break;
        H = v(x);
      }
    }
    function nl(A) {
      if (dt = !1, _t(A), !xt)
        if (v(U) !== null)
          xt = !0, Jt || (Jt = !0, Vt());
        else {
          var H = v(x);
          H !== null && ul(nl, H.startTime - A);
        }
    }
    var Jt = !1, nt = -1, tl = 5, gl = -1;
    function bl() {
      return Yt ? !0 : !(f.unstable_now() - gl < tl);
    }
    function ll() {
      if (Yt = !1, Jt) {
        var A = f.unstable_now();
        gl = A;
        var H = !0;
        try {
          t: {
            xt = !1, dt && (dt = !1, P(nt), nt = -1), zt = !0;
            var $ = I;
            try {
              l: {
                for (_t(A), Y = v(U); Y !== null && !(Y.expirationTime > A && bl()); ) {
                  var gt = Y.callback;
                  if (typeof gt == "function") {
                    Y.callback = null, I = Y.priorityLevel;
                    var tt = gt(
                      Y.expirationTime <= A
                    );
                    if (A = f.unstable_now(), typeof tt == "function") {
                      Y.callback = tt, _t(A), H = !0;
                      break l;
                    }
                    Y === v(U) && r(U), _t(A);
                  } else r(U);
                  Y = v(U);
                }
                if (Y !== null) H = !0;
                else {
                  var m = v(x);
                  m !== null && ul(
                    nl,
                    m.startTime - A
                  ), H = !1;
                }
              }
              break t;
            } finally {
              Y = null, I = $, zt = !1;
            }
            H = void 0;
          }
        } finally {
          H ? Vt() : Jt = !1;
        }
      }
    }
    var Vt;
    if (typeof Lt == "function")
      Vt = function() {
        Lt(ll);
      };
    else if (typeof MessageChannel < "u") {
      var Sl = new MessageChannel(), pl = Sl.port2;
      Sl.port1.onmessage = ll, Vt = function() {
        pl.postMessage(null);
      };
    } else
      Vt = function() {
        k(ll, 0);
      };
    function ul(A, H) {
      nt = k(function() {
        A(f.unstable_now());
      }, H);
    }
    f.unstable_IdlePriority = 5, f.unstable_ImmediatePriority = 1, f.unstable_LowPriority = 4, f.unstable_NormalPriority = 3, f.unstable_Profiling = null, f.unstable_UserBlockingPriority = 2, f.unstable_cancelCallback = function(A) {
      A.callback = null;
    }, f.unstable_forceFrameRate = function(A) {
      0 > A || 125 < A ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : tl = 0 < A ? Math.floor(1e3 / A) : 5;
    }, f.unstable_getCurrentPriorityLevel = function() {
      return I;
    }, f.unstable_next = function(A) {
      switch (I) {
        case 1:
        case 2:
        case 3:
          var H = 3;
          break;
        default:
          H = I;
      }
      var $ = I;
      I = H;
      try {
        return A();
      } finally {
        I = $;
      }
    }, f.unstable_requestPaint = function() {
      Yt = !0;
    }, f.unstable_runWithPriority = function(A, H) {
      switch (A) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          A = 3;
      }
      var $ = I;
      I = A;
      try {
        return H();
      } finally {
        I = $;
      }
    }, f.unstable_scheduleCallback = function(A, H, $) {
      var gt = f.unstable_now();
      switch (typeof $ == "object" && $ !== null ? ($ = $.delay, $ = typeof $ == "number" && 0 < $ ? gt + $ : gt) : $ = gt, A) {
        case 1:
          var tt = -1;
          break;
        case 2:
          tt = 250;
          break;
        case 5:
          tt = 1073741823;
          break;
        case 4:
          tt = 1e4;
          break;
        default:
          tt = 5e3;
      }
      return tt = $ + tt, A = {
        id: X++,
        callback: H,
        priorityLevel: A,
        startTime: $,
        expirationTime: tt,
        sortIndex: -1
      }, $ > gt ? (A.sortIndex = $, d(x, A), v(U) === null && A === v(x) && (dt ? (P(nt), nt = -1) : dt = !0, ul(nl, $ - gt))) : (A.sortIndex = tt, d(U, A), xt || zt || (xt = !0, Jt || (Jt = !0, Vt()))), A;
    }, f.unstable_shouldYield = bl, f.unstable_wrapCallback = function(A) {
      var H = I;
      return function() {
        var $ = I;
        I = H;
        try {
          return A.apply(this, arguments);
        } finally {
          I = $;
        }
      };
    };
  })(us)), us;
}
var rm;
function Y0() {
  return rm || (rm = 1, ns.exports = q0()), ns.exports;
}
var cs = { exports: {} }, lt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var om;
function w0() {
  if (om) return lt;
  om = 1;
  var f = Symbol.for("react.transitional.element"), d = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), j = Symbol.for("react.profiler"), L = Symbol.for("react.consumer"), K = Symbol.for("react.context"), Z = Symbol.for("react.forward_ref"), U = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), X = Symbol.for("react.lazy"), Y = Symbol.for("react.activity"), I = Symbol.iterator;
  function zt(m) {
    return m === null || typeof m != "object" ? null : (m = I && m[I] || m["@@iterator"], typeof m == "function" ? m : null);
  }
  var xt = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, dt = Object.assign, Yt = {};
  function k(m, b, D) {
    this.props = m, this.context = b, this.refs = Yt, this.updater = D || xt;
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
  function P() {
  }
  P.prototype = k.prototype;
  function Lt(m, b, D) {
    this.props = m, this.context = b, this.refs = Yt, this.updater = D || xt;
  }
  var _t = Lt.prototype = new P();
  _t.constructor = Lt, dt(_t, k.prototype), _t.isPureReactComponent = !0;
  var nl = Array.isArray;
  function Jt() {
  }
  var nt = { H: null, A: null, T: null, S: null }, tl = Object.prototype.hasOwnProperty;
  function gl(m, b, D) {
    var q = D.ref;
    return {
      $$typeof: f,
      type: m,
      key: b,
      ref: q !== void 0 ? q : null,
      props: D
    };
  }
  function bl(m, b) {
    return gl(m.type, b, m.props);
  }
  function ll(m) {
    return typeof m == "object" && m !== null && m.$$typeof === f;
  }
  function Vt(m) {
    var b = { "=": "=0", ":": "=2" };
    return "$" + m.replace(/[=:]/g, function(D) {
      return b[D];
    });
  }
  var Sl = /\/+/g;
  function pl(m, b) {
    return typeof m == "object" && m !== null && m.key != null ? Vt("" + m.key) : b.toString(36);
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
  function A(m, b, D, q, F) {
    var G = typeof m;
    (G === "undefined" || G === "boolean") && (m = null);
    var mt = !1;
    if (m === null) mt = !0;
    else
      switch (G) {
        case "bigint":
        case "string":
        case "number":
          mt = !0;
          break;
        case "object":
          switch (m.$$typeof) {
            case f:
            case d:
              mt = !0;
              break;
            case X:
              return mt = m._init, A(
                mt(m._payload),
                b,
                D,
                q,
                F
              );
          }
      }
    if (mt)
      return F = F(m), mt = q === "" ? "." + pl(m, 0) : q, nl(F) ? (D = "", mt != null && (D = mt.replace(Sl, "$&/") + "/"), A(F, b, D, "", function(pe) {
        return pe;
      })) : F != null && (ll(F) && (F = bl(
        F,
        D + (F.key == null || m && m.key === F.key ? "" : ("" + F.key).replace(
          Sl,
          "$&/"
        ) + "/") + mt
      )), b.push(F)), 1;
    mt = 0;
    var bt = q === "" ? "." : q + ":";
    if (nl(m))
      for (var Ct = 0; Ct < m.length; Ct++)
        q = m[Ct], G = bt + pl(q, Ct), mt += A(
          q,
          b,
          D,
          G,
          F
        );
    else if (Ct = zt(m), typeof Ct == "function")
      for (m = Ct.call(m), Ct = 0; !(q = m.next()).done; )
        q = q.value, G = bt + pl(q, Ct++), mt += A(
          q,
          b,
          D,
          G,
          F
        );
    else if (G === "object") {
      if (typeof m.then == "function")
        return A(
          ul(m),
          b,
          D,
          q,
          F
        );
      throw b = String(m), Error(
        "Objects are not valid as a React child (found: " + (b === "[object Object]" ? "object with keys {" + Object.keys(m).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return mt;
  }
  function H(m, b, D) {
    if (m == null) return m;
    var q = [], F = 0;
    return A(m, q, "", "", function(G) {
      return b.call(D, G, F++);
    }), q;
  }
  function $(m) {
    if (m._status === -1) {
      var b = m._result;
      b = b(), b.then(
        function(D) {
          (m._status === 0 || m._status === -1) && (m._status = 1, m._result = D);
        },
        function(D) {
          (m._status === 0 || m._status === -1) && (m._status = 2, m._result = D);
        }
      ), m._status === -1 && (m._status = 0, m._result = b);
    }
    if (m._status === 1) return m._result.default;
    throw m._result;
  }
  var gt = typeof reportError == "function" ? reportError : function(m) {
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
  }, tt = {
    map: H,
    forEach: function(m, b, D) {
      H(
        m,
        function() {
          b.apply(this, arguments);
        },
        D
      );
    },
    count: function(m) {
      var b = 0;
      return H(m, function() {
        b++;
      }), b;
    },
    toArray: function(m) {
      return H(m, function(b) {
        return b;
      }) || [];
    },
    only: function(m) {
      if (!ll(m))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return m;
    }
  };
  return lt.Activity = Y, lt.Children = tt, lt.Component = k, lt.Fragment = v, lt.Profiler = j, lt.PureComponent = Lt, lt.StrictMode = r, lt.Suspense = U, lt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = nt, lt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(m) {
      return nt.H.useMemoCache(m);
    }
  }, lt.cache = function(m) {
    return function() {
      return m.apply(null, arguments);
    };
  }, lt.cacheSignal = function() {
    return null;
  }, lt.cloneElement = function(m, b, D) {
    if (m == null)
      throw Error(
        "The argument must be a React element, but you passed " + m + "."
      );
    var q = dt({}, m.props), F = m.key;
    if (b != null)
      for (G in b.key !== void 0 && (F = "" + b.key), b)
        !tl.call(b, G) || G === "key" || G === "__self" || G === "__source" || G === "ref" && b.ref === void 0 || (q[G] = b[G]);
    var G = arguments.length - 2;
    if (G === 1) q.children = D;
    else if (1 < G) {
      for (var mt = Array(G), bt = 0; bt < G; bt++)
        mt[bt] = arguments[bt + 2];
      q.children = mt;
    }
    return gl(m.type, F, q);
  }, lt.createContext = function(m) {
    return m = {
      $$typeof: K,
      _currentValue: m,
      _currentValue2: m,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, m.Provider = m, m.Consumer = {
      $$typeof: L,
      _context: m
    }, m;
  }, lt.createElement = function(m, b, D) {
    var q, F = {}, G = null;
    if (b != null)
      for (q in b.key !== void 0 && (G = "" + b.key), b)
        tl.call(b, q) && q !== "key" && q !== "__self" && q !== "__source" && (F[q] = b[q]);
    var mt = arguments.length - 2;
    if (mt === 1) F.children = D;
    else if (1 < mt) {
      for (var bt = Array(mt), Ct = 0; Ct < mt; Ct++)
        bt[Ct] = arguments[Ct + 2];
      F.children = bt;
    }
    if (m && m.defaultProps)
      for (q in mt = m.defaultProps, mt)
        F[q] === void 0 && (F[q] = mt[q]);
    return gl(m, G, F);
  }, lt.createRef = function() {
    return { current: null };
  }, lt.forwardRef = function(m) {
    return { $$typeof: Z, render: m };
  }, lt.isValidElement = ll, lt.lazy = function(m) {
    return {
      $$typeof: X,
      _payload: { _status: -1, _result: m },
      _init: $
    };
  }, lt.memo = function(m, b) {
    return {
      $$typeof: x,
      type: m,
      compare: b === void 0 ? null : b
    };
  }, lt.startTransition = function(m) {
    var b = nt.T, D = {};
    nt.T = D;
    try {
      var q = m(), F = nt.S;
      F !== null && F(D, q), typeof q == "object" && q !== null && typeof q.then == "function" && q.then(Jt, gt);
    } catch (G) {
      gt(G);
    } finally {
      b !== null && D.types !== null && (b.types = D.types), nt.T = b;
    }
  }, lt.unstable_useCacheRefresh = function() {
    return nt.H.useCacheRefresh();
  }, lt.use = function(m) {
    return nt.H.use(m);
  }, lt.useActionState = function(m, b, D) {
    return nt.H.useActionState(m, b, D);
  }, lt.useCallback = function(m, b) {
    return nt.H.useCallback(m, b);
  }, lt.useContext = function(m) {
    return nt.H.useContext(m);
  }, lt.useDebugValue = function() {
  }, lt.useDeferredValue = function(m, b) {
    return nt.H.useDeferredValue(m, b);
  }, lt.useEffect = function(m, b) {
    return nt.H.useEffect(m, b);
  }, lt.useEffectEvent = function(m) {
    return nt.H.useEffectEvent(m);
  }, lt.useId = function() {
    return nt.H.useId();
  }, lt.useImperativeHandle = function(m, b, D) {
    return nt.H.useImperativeHandle(m, b, D);
  }, lt.useInsertionEffect = function(m, b) {
    return nt.H.useInsertionEffect(m, b);
  }, lt.useLayoutEffect = function(m, b) {
    return nt.H.useLayoutEffect(m, b);
  }, lt.useMemo = function(m, b) {
    return nt.H.useMemo(m, b);
  }, lt.useOptimistic = function(m, b) {
    return nt.H.useOptimistic(m, b);
  }, lt.useReducer = function(m, b, D) {
    return nt.H.useReducer(m, b, D);
  }, lt.useRef = function(m) {
    return nt.H.useRef(m);
  }, lt.useState = function(m) {
    return nt.H.useState(m);
  }, lt.useSyncExternalStore = function(m, b, D) {
    return nt.H.useSyncExternalStore(
      m,
      b,
      D
    );
  }, lt.useTransition = function() {
    return nt.H.useTransition();
  }, lt.version = "19.2.4", lt;
}
var dm;
function Ns() {
  return dm || (dm = 1, cs.exports = w0()), cs.exports;
}
var is = { exports: {} }, vl = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mm;
function X0() {
  if (mm) return vl;
  mm = 1;
  var f = Ns();
  function d(U) {
    var x = "https://react.dev/errors/" + U;
    if (1 < arguments.length) {
      x += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var X = 2; X < arguments.length; X++)
        x += "&args[]=" + encodeURIComponent(arguments[X]);
    }
    return "Minified React error #" + U + "; visit " + x + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function v() {
  }
  var r = {
    d: {
      f: v,
      r: function() {
        throw Error(d(522));
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
  function L(U, x, X) {
    var Y = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: j,
      key: Y == null ? null : "" + Y,
      children: U,
      containerInfo: x,
      implementation: X
    };
  }
  var K = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function Z(U, x) {
    if (U === "font") return "";
    if (typeof x == "string")
      return x === "use-credentials" ? x : "";
  }
  return vl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, vl.createPortal = function(U, x) {
    var X = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!x || x.nodeType !== 1 && x.nodeType !== 9 && x.nodeType !== 11)
      throw Error(d(299));
    return L(U, x, null, X);
  }, vl.flushSync = function(U) {
    var x = K.T, X = r.p;
    try {
      if (K.T = null, r.p = 2, U) return U();
    } finally {
      K.T = x, r.p = X, r.d.f();
    }
  }, vl.preconnect = function(U, x) {
    typeof U == "string" && (x ? (x = x.crossOrigin, x = typeof x == "string" ? x === "use-credentials" ? x : "" : void 0) : x = null, r.d.C(U, x));
  }, vl.prefetchDNS = function(U) {
    typeof U == "string" && r.d.D(U);
  }, vl.preinit = function(U, x) {
    if (typeof U == "string" && x && typeof x.as == "string") {
      var X = x.as, Y = Z(X, x.crossOrigin), I = typeof x.integrity == "string" ? x.integrity : void 0, zt = typeof x.fetchPriority == "string" ? x.fetchPriority : void 0;
      X === "style" ? r.d.S(
        U,
        typeof x.precedence == "string" ? x.precedence : void 0,
        {
          crossOrigin: Y,
          integrity: I,
          fetchPriority: zt
        }
      ) : X === "script" && r.d.X(U, {
        crossOrigin: Y,
        integrity: I,
        fetchPriority: zt,
        nonce: typeof x.nonce == "string" ? x.nonce : void 0
      });
    }
  }, vl.preinitModule = function(U, x) {
    if (typeof U == "string")
      if (typeof x == "object" && x !== null) {
        if (x.as == null || x.as === "script") {
          var X = Z(
            x.as,
            x.crossOrigin
          );
          r.d.M(U, {
            crossOrigin: X,
            integrity: typeof x.integrity == "string" ? x.integrity : void 0,
            nonce: typeof x.nonce == "string" ? x.nonce : void 0
          });
        }
      } else x == null && r.d.M(U);
  }, vl.preload = function(U, x) {
    if (typeof U == "string" && typeof x == "object" && x !== null && typeof x.as == "string") {
      var X = x.as, Y = Z(X, x.crossOrigin);
      r.d.L(U, X, {
        crossOrigin: Y,
        integrity: typeof x.integrity == "string" ? x.integrity : void 0,
        nonce: typeof x.nonce == "string" ? x.nonce : void 0,
        type: typeof x.type == "string" ? x.type : void 0,
        fetchPriority: typeof x.fetchPriority == "string" ? x.fetchPriority : void 0,
        referrerPolicy: typeof x.referrerPolicy == "string" ? x.referrerPolicy : void 0,
        imageSrcSet: typeof x.imageSrcSet == "string" ? x.imageSrcSet : void 0,
        imageSizes: typeof x.imageSizes == "string" ? x.imageSizes : void 0,
        media: typeof x.media == "string" ? x.media : void 0
      });
    }
  }, vl.preloadModule = function(U, x) {
    if (typeof U == "string")
      if (x) {
        var X = Z(x.as, x.crossOrigin);
        r.d.m(U, {
          as: typeof x.as == "string" && x.as !== "script" ? x.as : void 0,
          crossOrigin: X,
          integrity: typeof x.integrity == "string" ? x.integrity : void 0
        });
      } else r.d.m(U);
  }, vl.requestFormReset = function(U) {
    r.d.r(U);
  }, vl.unstable_batchedUpdates = function(U, x) {
    return U(x);
  }, vl.useFormState = function(U, x, X) {
    return K.H.useFormState(U, x, X);
  }, vl.useFormStatus = function() {
    return K.H.useHostTransitionStatus();
  }, vl.version = "19.2.4", vl;
}
var hm;
function G0() {
  if (hm) return is.exports;
  hm = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (d) {
        console.error(d);
      }
  }
  return f(), is.exports = X0(), is.exports;
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
var ym;
function Q0() {
  if (ym) return _u;
  ym = 1;
  var f = Y0(), d = Ns(), v = G0();
  function r(t) {
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
  function L(t) {
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
  function K(t) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function Z(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function U(t) {
    if (L(t) !== t)
      throw Error(r(188));
  }
  function x(t) {
    var l = t.alternate;
    if (!l) {
      if (l = L(t), l === null) throw Error(r(188));
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
          if (u === e) return U(n), t;
          if (u === a) return U(n), l;
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
  function X(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t;
    for (t = t.child; t !== null; ) {
      if (l = X(t), l !== null) return l;
      t = t.sibling;
    }
    return null;
  }
  var Y = Object.assign, I = Symbol.for("react.element"), zt = Symbol.for("react.transitional.element"), xt = Symbol.for("react.portal"), dt = Symbol.for("react.fragment"), Yt = Symbol.for("react.strict_mode"), k = Symbol.for("react.profiler"), P = Symbol.for("react.consumer"), Lt = Symbol.for("react.context"), _t = Symbol.for("react.forward_ref"), nl = Symbol.for("react.suspense"), Jt = Symbol.for("react.suspense_list"), nt = Symbol.for("react.memo"), tl = Symbol.for("react.lazy"), gl = Symbol.for("react.activity"), bl = Symbol.for("react.memo_cache_sentinel"), ll = Symbol.iterator;
  function Vt(t) {
    return t === null || typeof t != "object" ? null : (t = ll && t[ll] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var Sl = Symbol.for("react.client.reference");
  function pl(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === Sl ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case dt:
        return "Fragment";
      case k:
        return "Profiler";
      case Yt:
        return "StrictMode";
      case nl:
        return "Suspense";
      case Jt:
        return "SuspenseList";
      case gl:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case xt:
          return "Portal";
        case Lt:
          return t.displayName || "Context";
        case P:
          return (t._context.displayName || "Context") + ".Consumer";
        case _t:
          var l = t.render;
          return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case nt:
          return l = t.displayName || null, l !== null ? l : pl(t.type) || "Memo";
        case tl:
          l = t._payload, t = t._init;
          try {
            return pl(t(l));
          } catch {
          }
      }
    return null;
  }
  var ul = Array.isArray, A = d.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, H = v.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, gt = [], tt = -1;
  function m(t) {
    return { current: t };
  }
  function b(t) {
    0 > tt || (t.current = gt[tt], gt[tt] = null, tt--);
  }
  function D(t, l) {
    tt++, gt[tt] = t.current, t.current = l;
  }
  var q = m(null), F = m(null), G = m(null), mt = m(null);
  function bt(t, l) {
    switch (D(G, l), D(F, t), D(q, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? Md(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = Md(l), t = Od(l, t);
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
    b(q), D(q, t);
  }
  function Ct() {
    b(q), b(F), b(G);
  }
  function pe(t) {
    t.memoizedState !== null && D(mt, t);
    var l = q.current, e = Od(l, t.type);
    l !== e && (D(F, t), D(q, e));
  }
  function Ea(t) {
    F.current === t && (b(q), b(F)), mt.current === t && (b(mt), bu._currentValue = $);
  }
  var Na, zn;
  function te(t) {
    if (Na === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        Na = l && l[1] || "", zn = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Na + t + zn;
  }
  var Ee = !1;
  function fe(t, l) {
    if (!t || Ee) return "";
    Ee = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (l) {
              var R = function() {
                throw Error();
              };
              if (Object.defineProperty(R.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(R, []);
                } catch (_) {
                  var E = _;
                }
                Reflect.construct(t, [], R);
              } else {
                try {
                  R.call();
                } catch (_) {
                  E = _;
                }
                t.call(R.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (_) {
                E = _;
              }
              (R = t()) && typeof R.catch == "function" && R.catch(function() {
              });
            }
          } catch (_) {
            if (_ && E && typeof _.stack == "string")
              return [_.stack, E.stack];
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
                  var z = `
` + o[a].replace(" at new ", " at ");
                  return t.displayName && z.includes("<anonymous>") && (z = z.replace("<anonymous>", t.displayName)), z;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      Ee = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? te(e) : "";
  }
  function Qa(t, l) {
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
        return fe(t.type, !1);
      case 11:
        return fe(t.type.render, !1);
      case 1:
        return fe(t.type, !0);
      case 31:
        return te("Activity");
      default:
        return "";
    }
  }
  function cl(t) {
    try {
      var l = "", e = null;
      do
        l += Qa(t, e), e = t, t = t.return;
      while (t);
      return l;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var wt = Object.prototype.hasOwnProperty, Vl = f.unstable_scheduleCallback, jl = f.unstable_cancelCallback, xn = f.unstable_shouldYield, Va = f.unstable_requestPaint, Xt = f.unstable_now, Ne = f.unstable_getCurrentPriorityLevel, _e = f.unstable_ImmediatePriority, se = f.unstable_UserBlockingPriority, Ae = f.unstable_NormalPriority, Tl = f.unstable_LowPriority, ml = f.unstable_IdlePriority, le = f.log, re = f.unstable_setDisableYieldValue, El = null, et = null;
  function Dl(t) {
    if (typeof le == "function" && re(t), et && typeof et.setStrictMode == "function")
      try {
        et.setStrictMode(El, t);
      } catch {
      }
  }
  var hl = Math.clz32 ? Math.clz32 : Ul, zu = Math.log, oe = Math.LN2;
  function Ul(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (zu(t) / oe | 0) | 0;
  }
  var _a = 256, Ll = 262144, ee = 4194304;
  function de(t) {
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
  function Hl(t, l, e) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = t.suspendedLanes, c = t.pingedLanes;
    t = t.warmLanes;
    var i = a & 134217727;
    return i !== 0 ? (a = i & ~u, a !== 0 ? n = de(a) : (c &= i, c !== 0 ? n = de(c) : e || (e = i & ~t, e !== 0 && (n = de(e))))) : (i = a & ~u, i !== 0 ? n = de(i) : c !== 0 ? n = de(c) : e || (e = a & ~t, e !== 0 && (n = de(e)))), n === 0 ? 0 : l !== 0 && l !== n && (l & u) === 0 && (u = n & -n, e = l & -l, u >= e || u === 32 && (e & 4194048) !== 0) ? l : n;
  }
  function Ve(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function xu(t, l) {
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
  function ae() {
    var t = ee;
    return ee <<= 1, (ee & 62914560) === 0 && (ee = 4194304), t;
  }
  function Ze(t) {
    for (var l = [], e = 0; 31 > e; e++) l.push(t);
    return l;
  }
  function me(t, l) {
    t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Ke(t, l, e, a, n, u) {
    var c = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var i = t.entanglements, o = t.expirationTimes, p = t.hiddenUpdates;
    for (e = c & ~e; 0 < e; ) {
      var z = 31 - hl(e), R = 1 << z;
      i[z] = 0, o[z] = -1;
      var E = p[z];
      if (E !== null)
        for (p[z] = null, z = 0; z < E.length; z++) {
          var _ = E[z];
          _ !== null && (_.lane &= -536870913);
        }
      e &= ~R;
    }
    a !== 0 && Cn(t, a, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(c & ~l));
  }
  function Cn(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var a = 31 - hl(l);
    t.entangledLanes |= l, t.entanglements[a] = t.entanglements[a] | 1073741824 | e & 261930;
  }
  function Aa(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var a = 31 - hl(e), n = 1 << a;
      n & l | t[a] & l && (t[a] |= l), e &= ~n;
    }
  }
  function Ta(t, l) {
    var e = l & -l;
    return e = (e & 42) !== 0 ? 1 : Rn(e), (e & (t.suspendedLanes | l)) !== 0 ? 0 : e;
  }
  function Rn(t) {
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
  function Za(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Cu() {
    var t = H.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : tm(t.type));
  }
  function Ru(t, l) {
    var e = H.p;
    try {
      return H.p = t, l();
    } finally {
      H.p = e;
    }
  }
  var he = Math.random().toString(36).slice(2), $t = "__reactFiber$" + he, yl = "__reactProps$" + he, ke = "__reactContainer$" + he, Mn = "__reactEvents$" + he, Wc = "__reactListeners$" + he, Mu = "__reactHandles$" + he, On = "__reactResources$" + he, za = "__reactMarker$" + he;
  function jn(t) {
    delete t[$t], delete t[yl], delete t[Mn], delete t[Wc], delete t[Mu];
  }
  function Je(t) {
    var l = t[$t];
    if (l) return l;
    for (var e = t.parentNode; e; ) {
      if (l = e[ke] || e[$t]) {
        if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
          for (t = qd(t); t !== null; ) {
            if (e = t[$t]) return e;
            t = qd(t);
          }
        return l;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function y(t) {
    if (t = t[$t] || t[ke]) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3)
        return t;
    }
    return null;
  }
  function N(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(r(33));
  }
  function M(t) {
    var l = t[On];
    return l || (l = t[On] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function O(t) {
    t[za] = !0;
  }
  var B = /* @__PURE__ */ new Set(), Q = {};
  function at(t, l) {
    ut(t, l), ut(t + "Capture", l);
  }
  function ut(t, l) {
    for (Q[t] = l, t = 0; t < l.length; t++)
      B.add(l[t]);
  }
  var ft = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), St = {}, Rt = {};
  function il(t) {
    return wt.call(Rt, t) ? !0 : wt.call(St, t) ? !1 : ft.test(t) ? Rt[t] = !0 : (St[t] = !0, !1);
  }
  function ct(t, l, e) {
    if (il(l))
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
  function Ut(t, l, e) {
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
  function Nl(t, l, e, a) {
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
  function el(t) {
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
  function $e(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
  }
  function Ou(t, l, e) {
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
  function Dn(t) {
    if (!t._valueTracker) {
      var l = $e(t) ? "checked" : "value";
      t._valueTracker = Ou(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function ju(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var e = l.getValue(), a = "";
    return t && (a = $e(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== e ? (l.setValue(t), !0) : !1;
  }
  function Te(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Du = /[\n"\\]/g;
  function _l(t) {
    return t.replace(
      Du,
      function(l) {
        return "\\" + l.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ka(t, l, e, a, n, u, c, i) {
    t.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.type = c : t.removeAttribute("type"), l != null ? c === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + el(l)) : t.value !== "" + el(l) && (t.value = "" + el(l)) : c !== "submit" && c !== "reset" || t.removeAttribute("value"), l != null ? Zt(t, c, el(l)) : e != null ? Zt(t, c, el(e)) : a != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.name = "" + el(i) : t.removeAttribute("name");
  }
  function Un(t, l, e, a, n, u, c, i) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), l != null || e != null) {
      if (!(u !== "submit" && u !== "reset" || l != null)) {
        Dn(t);
        return;
      }
      e = e != null ? "" + el(e) : "", l = l != null ? "" + el(l) : e, i || l === t.value || (t.value = l), t.defaultValue = l;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = i ? t.checked : !!a, t.defaultChecked = !!a, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (t.name = c), Dn(t);
  }
  function Zt(t, l, e) {
    l === "number" && Te(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
  }
  function We(t, l, e, a) {
    if (t = t.options, l) {
      l = {};
      for (var n = 0; n < e.length; n++)
        l["$" + e[n]] = !0;
      for (e = 0; e < t.length; e++)
        n = l.hasOwnProperty("$" + t[e].value), t[e].selected !== n && (t[e].selected = n), n && a && (t[e].defaultSelected = !0);
    } else {
      for (e = "" + el(e), l = null, n = 0; n < t.length; n++) {
        if (t[n].value === e) {
          t[n].selected = !0, a && (t[n].defaultSelected = !0);
          return;
        }
        l !== null || t[n].disabled || (l = t[n]);
      }
      l !== null && (l.selected = !0);
    }
  }
  function As(t, l, e) {
    if (l != null && (l = "" + el(l), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? "" + el(e) : "";
  }
  function Ts(t, l, e, a) {
    if (l == null) {
      if (a != null) {
        if (e != null) throw Error(r(92));
        if (ul(a)) {
          if (1 < a.length) throw Error(r(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), l = e;
    }
    e = el(l), t.defaultValue = e, a = t.textContent, a === e && a !== "" && a !== null && (t.value = a), Dn(t);
  }
  function ka(t, l) {
    if (l) {
      var e = t.firstChild;
      if (e && e === t.lastChild && e.nodeType === 3) {
        e.nodeValue = l;
        return;
      }
    }
    t.textContent = l;
  }
  var Om = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function zs(t, l, e) {
    var a = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : a ? t.setProperty(l, e) : typeof e != "number" || e === 0 || Om.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function xs(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(r(62));
    if (t = t.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || l != null && l.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "");
      for (var n in l)
        a = l[n], l.hasOwnProperty(n) && e[n] !== a && zs(t, n, a);
    } else
      for (var u in l)
        l.hasOwnProperty(u) && zs(t, u, l[u]);
  }
  function Fc(t) {
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
  var jm = /* @__PURE__ */ new Map([
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
  ]), Dm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Uu(t) {
    return Dm.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function ze() {
  }
  var Ic = null;
  function Pc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Ja = null, $a = null;
  function Cs(t) {
    var l = y(t);
    if (l && (t = l.stateNode)) {
      var e = t[yl] || null;
      t: switch (t = l.stateNode, l.type) {
        case "input":
          if (Ka(
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
              'input[name="' + _l(
                "" + l
              ) + '"][type="radio"]'
            ), l = 0; l < e.length; l++) {
              var a = e[l];
              if (a !== t && a.form === t.form) {
                var n = a[yl] || null;
                if (!n) throw Error(r(90));
                Ka(
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
              a = e[l], a.form === t.form && ju(a);
          }
          break t;
        case "textarea":
          As(t, e.value, e.defaultValue);
          break t;
        case "select":
          l = e.value, l != null && We(t, !!e.multiple, l, !1);
      }
    }
  }
  var ti = !1;
  function Rs(t, l, e) {
    if (ti) return t(l, e);
    ti = !0;
    try {
      var a = t(l);
      return a;
    } finally {
      if (ti = !1, (Ja !== null || $a !== null) && (Ec(), Ja && (l = Ja, t = $a, $a = Ja = null, Cs(l), t)))
        for (l = 0; l < t.length; l++) Cs(t[l]);
    }
  }
  function Ln(t, l) {
    var e = t.stateNode;
    if (e === null) return null;
    var a = e[yl] || null;
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
  var xe = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), li = !1;
  if (xe)
    try {
      var Hn = {};
      Object.defineProperty(Hn, "passive", {
        get: function() {
          li = !0;
        }
      }), window.addEventListener("test", Hn, Hn), window.removeEventListener("test", Hn, Hn);
    } catch {
      li = !1;
    }
  var Fe = null, ei = null, Lu = null;
  function Ms() {
    if (Lu) return Lu;
    var t, l = ei, e = l.length, a, n = "value" in Fe ? Fe.value : Fe.textContent, u = n.length;
    for (t = 0; t < e && l[t] === n[t]; t++) ;
    var c = e - t;
    for (a = 1; a <= c && l[e - a] === n[u - a]; a++) ;
    return Lu = n.slice(t, 1 < a ? 1 - a : void 0);
  }
  function Hu(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Bu() {
    return !0;
  }
  function Os() {
    return !1;
  }
  function zl(t) {
    function l(e, a, n, u, c) {
      this._reactName = e, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = c, this.currentTarget = null;
      for (var i in t)
        t.hasOwnProperty(i) && (e = t[i], this[i] = e ? e(u) : u[i]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Bu : Os, this.isPropagationStopped = Os, this;
    }
    return Y(l.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Bu);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Bu);
      },
      persist: function() {
      },
      isPersistent: Bu
    }), l;
  }
  var xa = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, qu = zl(xa), Bn = Y({}, xa, { view: 0, detail: 0 }), Um = zl(Bn), ai, ni, qn, Yu = Y({}, Bn, {
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
    getModifierState: ci,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== qn && (qn && t.type === "mousemove" ? (ai = t.screenX - qn.screenX, ni = t.screenY - qn.screenY) : ni = ai = 0, qn = t), ai);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : ni;
    }
  }), js = zl(Yu), Lm = Y({}, Yu, { dataTransfer: 0 }), Hm = zl(Lm), Bm = Y({}, Bn, { relatedTarget: 0 }), ui = zl(Bm), qm = Y({}, xa, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ym = zl(qm), wm = Y({}, xa, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Xm = zl(wm), Gm = Y({}, xa, { data: 0 }), Ds = zl(Gm), Qm = {
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
  }, Vm = {
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
  }, Zm = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Km(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = Zm[t]) ? !!l[t] : !1;
  }
  function ci() {
    return Km;
  }
  var km = Y({}, Bn, {
    key: function(t) {
      if (t.key) {
        var l = Qm[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = Hu(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Vm[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ci,
    charCode: function(t) {
      return t.type === "keypress" ? Hu(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Hu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Jm = zl(km), $m = Y({}, Yu, {
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
  }), Us = zl($m), Wm = Y({}, Bn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ci
  }), Fm = zl(Wm), Im = Y({}, xa, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Pm = zl(Im), th = Y({}, Yu, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), lh = zl(th), eh = Y({}, xa, {
    newState: 0,
    oldState: 0
  }), ah = zl(eh), nh = [9, 13, 27, 32], ii = xe && "CompositionEvent" in window, Yn = null;
  xe && "documentMode" in document && (Yn = document.documentMode);
  var uh = xe && "TextEvent" in window && !Yn, Ls = xe && (!ii || Yn && 8 < Yn && 11 >= Yn), Hs = " ", Bs = !1;
  function qs(t, l) {
    switch (t) {
      case "keyup":
        return nh.indexOf(l.keyCode) !== -1;
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
  function Ys(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Wa = !1;
  function ch(t, l) {
    switch (t) {
      case "compositionend":
        return Ys(l);
      case "keypress":
        return l.which !== 32 ? null : (Bs = !0, Hs);
      case "textInput":
        return t = l.data, t === Hs && Bs ? null : t;
      default:
        return null;
    }
  }
  function ih(t, l) {
    if (Wa)
      return t === "compositionend" || !ii && qs(t, l) ? (t = Ms(), Lu = ei = Fe = null, Wa = !1, t) : null;
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
        return Ls && l.locale !== "ko" ? null : l.data;
      default:
        return null;
    }
  }
  var fh = {
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
  function ws(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!fh[t.type] : l === "textarea";
  }
  function Xs(t, l, e, a) {
    Ja ? $a ? $a.push(a) : $a = [a] : Ja = a, l = Cc(l, "onChange"), 0 < l.length && (e = new qu(
      "onChange",
      "change",
      null,
      e,
      a
    ), t.push({ event: e, listeners: l }));
  }
  var wn = null, Xn = null;
  function sh(t) {
    Ad(t, 0);
  }
  function wu(t) {
    var l = N(t);
    if (ju(l)) return t;
  }
  function Gs(t, l) {
    if (t === "change") return l;
  }
  var Qs = !1;
  if (xe) {
    var fi;
    if (xe) {
      var si = "oninput" in document;
      if (!si) {
        var Vs = document.createElement("div");
        Vs.setAttribute("oninput", "return;"), si = typeof Vs.oninput == "function";
      }
      fi = si;
    } else fi = !1;
    Qs = fi && (!document.documentMode || 9 < document.documentMode);
  }
  function Zs() {
    wn && (wn.detachEvent("onpropertychange", Ks), Xn = wn = null);
  }
  function Ks(t) {
    if (t.propertyName === "value" && wu(Xn)) {
      var l = [];
      Xs(
        l,
        Xn,
        t,
        Pc(t)
      ), Rs(sh, l);
    }
  }
  function rh(t, l, e) {
    t === "focusin" ? (Zs(), wn = l, Xn = e, wn.attachEvent("onpropertychange", Ks)) : t === "focusout" && Zs();
  }
  function oh(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return wu(Xn);
  }
  function dh(t, l) {
    if (t === "click") return wu(l);
  }
  function mh(t, l) {
    if (t === "input" || t === "change")
      return wu(l);
  }
  function hh(t, l) {
    return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
  }
  var Bl = typeof Object.is == "function" ? Object.is : hh;
  function Gn(t, l) {
    if (Bl(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null)
      return !1;
    var e = Object.keys(t), a = Object.keys(l);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var n = e[a];
      if (!wt.call(l, n) || !Bl(t[n], l[n]))
        return !1;
    }
    return !0;
  }
  function ks(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Js(t, l) {
    var e = ks(t);
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
      e = ks(e);
    }
  }
  function $s(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? $s(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function Ws(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = Te(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = Te(t.document);
    }
    return l;
  }
  function ri(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var yh = xe && "documentMode" in document && 11 >= document.documentMode, Fa = null, oi = null, Qn = null, di = !1;
  function Fs(t, l, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    di || Fa == null || Fa !== Te(a) || (a = Fa, "selectionStart" in a && ri(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Qn && Gn(Qn, a) || (Qn = a, a = Cc(oi, "onSelect"), 0 < a.length && (l = new qu(
      "onSelect",
      "select",
      null,
      l,
      e
    ), t.push({ event: l, listeners: a }), l.target = Fa)));
  }
  function Ca(t, l) {
    var e = {};
    return e[t.toLowerCase()] = l.toLowerCase(), e["Webkit" + t] = "webkit" + l, e["Moz" + t] = "moz" + l, e;
  }
  var Ia = {
    animationend: Ca("Animation", "AnimationEnd"),
    animationiteration: Ca("Animation", "AnimationIteration"),
    animationstart: Ca("Animation", "AnimationStart"),
    transitionrun: Ca("Transition", "TransitionRun"),
    transitionstart: Ca("Transition", "TransitionStart"),
    transitioncancel: Ca("Transition", "TransitionCancel"),
    transitionend: Ca("Transition", "TransitionEnd")
  }, mi = {}, Is = {};
  xe && (Is = document.createElement("div").style, "AnimationEvent" in window || (delete Ia.animationend.animation, delete Ia.animationiteration.animation, delete Ia.animationstart.animation), "TransitionEvent" in window || delete Ia.transitionend.transition);
  function Ra(t) {
    if (mi[t]) return mi[t];
    if (!Ia[t]) return t;
    var l = Ia[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in Is)
        return mi[t] = l[e];
    return t;
  }
  var Ps = Ra("animationend"), tr = Ra("animationiteration"), lr = Ra("animationstart"), vh = Ra("transitionrun"), gh = Ra("transitionstart"), bh = Ra("transitioncancel"), er = Ra("transitionend"), ar = /* @__PURE__ */ new Map(), hi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  hi.push("scrollEnd");
  function ne(t, l) {
    ar.set(t, l), at(l, [t]);
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
  }, Zl = [], Pa = 0, yi = 0;
  function Gu() {
    for (var t = Pa, l = yi = Pa = 0; l < t; ) {
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
      u !== 0 && nr(e, n, u);
    }
  }
  function Qu(t, l, e, a) {
    Zl[Pa++] = t, Zl[Pa++] = l, Zl[Pa++] = e, Zl[Pa++] = a, yi |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function vi(t, l, e, a) {
    return Qu(t, l, e, a), Vu(t);
  }
  function Ma(t, l) {
    return Qu(t, null, null, l), Vu(t);
  }
  function nr(t, l, e) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= e, a = u.alternate, a !== null && (a.childLanes |= e), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && l !== null && (n = 31 - hl(e), t = u.hiddenUpdates, a = t[n], a === null ? t[n] = [l] : a.push(l), l.lane = e | 536870912), u) : null;
  }
  function Vu(t) {
    if (50 < ou)
      throw ou = 0, zf = null, Error(r(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var tn = {};
  function Sh(t, l, e, a) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ql(t, l, e, a) {
    return new Sh(t, l, e, a);
  }
  function gi(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Ce(t, l) {
    var e = t.alternate;
    return e === null ? (e = ql(
      t.tag,
      l,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 65011712, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function ur(t, l) {
    t.flags &= 65011714;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function Zu(t, l, e, a, n, u) {
    var c = 0;
    if (a = t, typeof t == "function") gi(t) && (c = 1);
    else if (typeof t == "string")
      c = A0(
        t,
        e,
        q.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case gl:
          return t = ql(31, e, l, n), t.elementType = gl, t.lanes = u, t;
        case dt:
          return Oa(e.children, n, u, l);
        case Yt:
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
              case Lt:
                c = 10;
                break t;
              case P:
                c = 9;
                break t;
              case _t:
                c = 11;
                break t;
              case nt:
                c = 14;
                break t;
              case tl:
                c = 16, a = null;
                break t;
            }
          c = 29, e = Error(
            r(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return l = ql(c, e, l, n), l.elementType = t, l.type = a, l.lanes = u, l;
  }
  function Oa(t, l, e, a) {
    return t = ql(7, t, a, l), t.lanes = e, t;
  }
  function bi(t, l, e) {
    return t = ql(6, t, null, l), t.lanes = e, t;
  }
  function cr(t) {
    var l = ql(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function Si(t, l, e) {
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
  var ir = /* @__PURE__ */ new WeakMap();
  function Kl(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = ir.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: cl(l)
      }, ir.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: cl(l)
    };
  }
  var ln = [], en = 0, Ku = null, Vn = 0, kl = [], Jl = 0, Ie = null, ye = 1, ve = "";
  function Re(t, l) {
    ln[en++] = Vn, ln[en++] = Ku, Ku = t, Vn = l;
  }
  function fr(t, l, e) {
    kl[Jl++] = ye, kl[Jl++] = ve, kl[Jl++] = Ie, Ie = t;
    var a = ye;
    t = ve;
    var n = 32 - hl(a) - 1;
    a &= ~(1 << n), e += 1;
    var u = 32 - hl(l) + n;
    if (30 < u) {
      var c = n - n % 5;
      u = (a & (1 << c) - 1).toString(32), a >>= c, n -= c, ye = 1 << 32 - hl(l) + n | e << n | a, ve = u + t;
    } else
      ye = 1 << u | e << n | a, ve = t;
  }
  function pi(t) {
    t.return !== null && (Re(t, 1), fr(t, 1, 0));
  }
  function Ei(t) {
    for (; t === Ku; )
      Ku = ln[--en], ln[en] = null, Vn = ln[--en], ln[en] = null;
    for (; t === Ie; )
      Ie = kl[--Jl], kl[Jl] = null, ve = kl[--Jl], kl[Jl] = null, ye = kl[--Jl], kl[Jl] = null;
  }
  function sr(t, l) {
    kl[Jl++] = ye, kl[Jl++] = ve, kl[Jl++] = Ie, ye = l.id, ve = l.overflow, Ie = t;
  }
  var sl = null, Ht = null, vt = !1, Pe = null, $l = !1, Ni = Error(r(519));
  function ta(t) {
    var l = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Zn(Kl(l, t)), Ni;
  }
  function rr(t) {
    var l = t.stateNode, e = t.type, a = t.memoizedProps;
    switch (l[$t] = t, l[yl] = a, e) {
      case "dialog":
        ot("cancel", l), ot("close", l);
        break;
      case "iframe":
      case "object":
      case "embed":
        ot("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < mu.length; e++)
          ot(mu[e], l);
        break;
      case "source":
        ot("error", l);
        break;
      case "img":
      case "image":
      case "link":
        ot("error", l), ot("load", l);
        break;
      case "details":
        ot("toggle", l);
        break;
      case "input":
        ot("invalid", l), Un(
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
        ot("invalid", l);
        break;
      case "textarea":
        ot("invalid", l), Ts(l, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || a.suppressHydrationWarning === !0 || Cd(l.textContent, e) ? (a.popover != null && (ot("beforetoggle", l), ot("toggle", l)), a.onScroll != null && ot("scroll", l), a.onScrollEnd != null && ot("scrollend", l), a.onClick != null && (l.onclick = ze), l = !0) : l = !1, l || ta(t, !0);
  }
  function or(t) {
    for (sl = t.return; sl; )
      switch (sl.tag) {
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
          sl = sl.return;
      }
  }
  function an(t) {
    if (t !== sl) return !1;
    if (!vt) return or(t), vt = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || Xf(t.type, t.memoizedProps)), e = !e), e && Ht && ta(t), or(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Ht = Bd(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Ht = Bd(t);
    } else
      l === 27 ? (l = Ht, ha(t.type) ? (t = Kf, Kf = null, Ht = t) : Ht = l) : Ht = sl ? Fl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function ja() {
    Ht = sl = null, vt = !1;
  }
  function _i() {
    var t = Pe;
    return t !== null && (Ml === null ? Ml = t : Ml.push.apply(
      Ml,
      t
    ), Pe = null), t;
  }
  function Zn(t) {
    Pe === null ? Pe = [t] : Pe.push(t);
  }
  var Ai = m(null), Da = null, Me = null;
  function la(t, l, e) {
    D(Ai, l._currentValue), l._currentValue = e;
  }
  function Oe(t) {
    t._currentValue = Ai.current, b(Ai);
  }
  function Ti(t, l, e) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & l) !== l ? (t.childLanes |= l, a !== null && (a.childLanes |= l)) : a !== null && (a.childLanes & l) !== l && (a.childLanes |= l), t === e) break;
      t = t.return;
    }
  }
  function zi(t, l, e, a) {
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
              u.lanes |= e, i = u.alternate, i !== null && (i.lanes |= e), Ti(
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
        c.lanes |= e, u = c.alternate, u !== null && (u.lanes |= e), Ti(c, e, t), c = null;
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
  function nn(t, l, e, a) {
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
          Bl(n.pendingProps.value, c.value) || (t !== null ? t.push(i) : t = [i]);
        }
      } else if (n === mt.current) {
        if (c = n.alternate, c === null) throw Error(r(387));
        c.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(bu) : t = [bu]);
      }
      n = n.return;
    }
    t !== null && zi(
      l,
      t,
      e,
      a
    ), l.flags |= 262144;
  }
  function ku(t) {
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
  function Ua(t) {
    Da = t, Me = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function rl(t) {
    return dr(Da, t);
  }
  function Ju(t, l) {
    return Da === null && Ua(t), dr(t, l);
  }
  function dr(t, l) {
    var e = l._currentValue;
    if (l = { context: l, memoizedValue: e, next: null }, Me === null) {
      if (t === null) throw Error(r(308));
      Me = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else Me = Me.next = l;
    return e;
  }
  var ph = typeof AbortController < "u" ? AbortController : function() {
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
  }, Eh = f.unstable_scheduleCallback, Nh = f.unstable_NormalPriority, Wt = {
    $$typeof: Lt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function xi() {
    return {
      controller: new ph(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Kn(t) {
    t.refCount--, t.refCount === 0 && Eh(Nh, function() {
      t.controller.abort();
    });
  }
  var kn = null, Ci = 0, un = 0, cn = null;
  function _h(t, l) {
    if (kn === null) {
      var e = kn = [];
      Ci = 0, un = jf(), cn = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return Ci++, l.then(mr, mr), l;
  }
  function mr() {
    if (--Ci === 0 && kn !== null) {
      cn !== null && (cn.status = "fulfilled");
      var t = kn;
      kn = null, un = 0, cn = null;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function Ah(t, l) {
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
  var hr = A.S;
  A.S = function(t, l) {
    Io = Xt(), typeof l == "object" && l !== null && typeof l.then == "function" && _h(t, l), hr !== null && hr(t, l);
  };
  var La = m(null);
  function Ri() {
    var t = La.current;
    return t !== null ? t : Dt.pooledCache;
  }
  function $u(t, l) {
    l === null ? D(La, La.current) : D(La, l.pool);
  }
  function yr() {
    var t = Ri();
    return t === null ? null : { parent: Wt._currentValue, pool: t };
  }
  var fn = Error(r(460)), Mi = Error(r(474)), Wu = Error(r(542)), Fu = { then: function() {
  } };
  function vr(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function gr(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(ze, ze), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, Sr(t), t;
      default:
        if (typeof l.status == "string") l.then(ze, ze);
        else {
          if (t = Dt, t !== null && 100 < t.shellSuspendCounter)
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
            throw t = l.reason, Sr(t), t;
        }
        throw Ba = l, fn;
    }
  }
  function Ha(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (Ba = e, fn) : e;
    }
  }
  var Ba = null;
  function br() {
    if (Ba === null) throw Error(r(459));
    var t = Ba;
    return Ba = null, t;
  }
  function Sr(t) {
    if (t === fn || t === Wu)
      throw Error(r(483));
  }
  var sn = null, Jn = 0;
  function Iu(t) {
    var l = Jn;
    return Jn += 1, sn === null && (sn = []), gr(sn, t, l);
  }
  function $n(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function Pu(t, l) {
    throw l.$$typeof === I ? Error(r(525)) : (t = Object.prototype.toString.call(l), Error(
      r(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function pr(t) {
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
      return g = Ce(g, h), g.index = 0, g.sibling = null, g;
    }
    function u(g, h, S) {
      return g.index = S, t ? (S = g.alternate, S !== null ? (S = S.index, S < h ? (g.flags |= 67108866, h) : S) : (g.flags |= 67108866, h)) : (g.flags |= 1048576, h);
    }
    function c(g) {
      return t && g.alternate === null && (g.flags |= 67108866), g;
    }
    function i(g, h, S, C) {
      return h === null || h.tag !== 6 ? (h = bi(S, g.mode, C), h.return = g, h) : (h = n(h, S), h.return = g, h);
    }
    function o(g, h, S, C) {
      var J = S.type;
      return J === dt ? z(
        g,
        h,
        S.props.children,
        C,
        S.key
      ) : h !== null && (h.elementType === J || typeof J == "object" && J !== null && J.$$typeof === tl && Ha(J) === h.type) ? (h = n(h, S.props), $n(h, S), h.return = g, h) : (h = Zu(
        S.type,
        S.key,
        S.props,
        null,
        g.mode,
        C
      ), $n(h, S), h.return = g, h);
    }
    function p(g, h, S, C) {
      return h === null || h.tag !== 4 || h.stateNode.containerInfo !== S.containerInfo || h.stateNode.implementation !== S.implementation ? (h = Si(S, g.mode, C), h.return = g, h) : (h = n(h, S.children || []), h.return = g, h);
    }
    function z(g, h, S, C, J) {
      return h === null || h.tag !== 7 ? (h = Oa(
        S,
        g.mode,
        C,
        J
      ), h.return = g, h) : (h = n(h, S), h.return = g, h);
    }
    function R(g, h, S) {
      if (typeof h == "string" && h !== "" || typeof h == "number" || typeof h == "bigint")
        return h = bi(
          "" + h,
          g.mode,
          S
        ), h.return = g, h;
      if (typeof h == "object" && h !== null) {
        switch (h.$$typeof) {
          case zt:
            return S = Zu(
              h.type,
              h.key,
              h.props,
              null,
              g.mode,
              S
            ), $n(S, h), S.return = g, S;
          case xt:
            return h = Si(
              h,
              g.mode,
              S
            ), h.return = g, h;
          case tl:
            return h = Ha(h), R(g, h, S);
        }
        if (ul(h) || Vt(h))
          return h = Oa(
            h,
            g.mode,
            S,
            null
          ), h.return = g, h;
        if (typeof h.then == "function")
          return R(g, Iu(h), S);
        if (h.$$typeof === Lt)
          return R(
            g,
            Ju(g, h),
            S
          );
        Pu(g, h);
      }
      return null;
    }
    function E(g, h, S, C) {
      var J = h !== null ? h.key : null;
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
        return J !== null ? null : i(g, h, "" + S, C);
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case zt:
            return S.key === J ? o(g, h, S, C) : null;
          case xt:
            return S.key === J ? p(g, h, S, C) : null;
          case tl:
            return S = Ha(S), E(g, h, S, C);
        }
        if (ul(S) || Vt(S))
          return J !== null ? null : z(g, h, S, C, null);
        if (typeof S.then == "function")
          return E(
            g,
            h,
            Iu(S),
            C
          );
        if (S.$$typeof === Lt)
          return E(
            g,
            h,
            Ju(g, S),
            C
          );
        Pu(g, S);
      }
      return null;
    }
    function _(g, h, S, C, J) {
      if (typeof C == "string" && C !== "" || typeof C == "number" || typeof C == "bigint")
        return g = g.get(S) || null, i(h, g, "" + C, J);
      if (typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case zt:
            return g = g.get(
              C.key === null ? S : C.key
            ) || null, o(h, g, C, J);
          case xt:
            return g = g.get(
              C.key === null ? S : C.key
            ) || null, p(h, g, C, J);
          case tl:
            return C = Ha(C), _(
              g,
              h,
              S,
              C,
              J
            );
        }
        if (ul(C) || Vt(C))
          return g = g.get(S) || null, z(h, g, C, J, null);
        if (typeof C.then == "function")
          return _(
            g,
            h,
            S,
            Iu(C),
            J
          );
        if (C.$$typeof === Lt)
          return _(
            g,
            h,
            S,
            Ju(h, C),
            J
          );
        Pu(h, C);
      }
      return null;
    }
    function w(g, h, S, C) {
      for (var J = null, pt = null, V = h, st = h = 0, yt = null; V !== null && st < S.length; st++) {
        V.index > st ? (yt = V, V = null) : yt = V.sibling;
        var Et = E(
          g,
          V,
          S[st],
          C
        );
        if (Et === null) {
          V === null && (V = yt);
          break;
        }
        t && V && Et.alternate === null && l(g, V), h = u(Et, h, st), pt === null ? J = Et : pt.sibling = Et, pt = Et, V = yt;
      }
      if (st === S.length)
        return e(g, V), vt && Re(g, st), J;
      if (V === null) {
        for (; st < S.length; st++)
          V = R(g, S[st], C), V !== null && (h = u(
            V,
            h,
            st
          ), pt === null ? J = V : pt.sibling = V, pt = V);
        return vt && Re(g, st), J;
      }
      for (V = a(V); st < S.length; st++)
        yt = _(
          V,
          g,
          st,
          S[st],
          C
        ), yt !== null && (t && yt.alternate !== null && V.delete(
          yt.key === null ? st : yt.key
        ), h = u(
          yt,
          h,
          st
        ), pt === null ? J = yt : pt.sibling = yt, pt = yt);
      return t && V.forEach(function(Sa) {
        return l(g, Sa);
      }), vt && Re(g, st), J;
    }
    function W(g, h, S, C) {
      if (S == null) throw Error(r(151));
      for (var J = null, pt = null, V = h, st = h = 0, yt = null, Et = S.next(); V !== null && !Et.done; st++, Et = S.next()) {
        V.index > st ? (yt = V, V = null) : yt = V.sibling;
        var Sa = E(g, V, Et.value, C);
        if (Sa === null) {
          V === null && (V = yt);
          break;
        }
        t && V && Sa.alternate === null && l(g, V), h = u(Sa, h, st), pt === null ? J = Sa : pt.sibling = Sa, pt = Sa, V = yt;
      }
      if (Et.done)
        return e(g, V), vt && Re(g, st), J;
      if (V === null) {
        for (; !Et.done; st++, Et = S.next())
          Et = R(g, Et.value, C), Et !== null && (h = u(Et, h, st), pt === null ? J = Et : pt.sibling = Et, pt = Et);
        return vt && Re(g, st), J;
      }
      for (V = a(V); !Et.done; st++, Et = S.next())
        Et = _(V, g, st, Et.value, C), Et !== null && (t && Et.alternate !== null && V.delete(Et.key === null ? st : Et.key), h = u(Et, h, st), pt === null ? J = Et : pt.sibling = Et, pt = Et);
      return t && V.forEach(function(L0) {
        return l(g, L0);
      }), vt && Re(g, st), J;
    }
    function jt(g, h, S, C) {
      if (typeof S == "object" && S !== null && S.type === dt && S.key === null && (S = S.props.children), typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case zt:
            t: {
              for (var J = S.key; h !== null; ) {
                if (h.key === J) {
                  if (J = S.type, J === dt) {
                    if (h.tag === 7) {
                      e(
                        g,
                        h.sibling
                      ), C = n(
                        h,
                        S.props.children
                      ), C.return = g, g = C;
                      break t;
                    }
                  } else if (h.elementType === J || typeof J == "object" && J !== null && J.$$typeof === tl && Ha(J) === h.type) {
                    e(
                      g,
                      h.sibling
                    ), C = n(h, S.props), $n(C, S), C.return = g, g = C;
                    break t;
                  }
                  e(g, h);
                  break;
                } else l(g, h);
                h = h.sibling;
              }
              S.type === dt ? (C = Oa(
                S.props.children,
                g.mode,
                C,
                S.key
              ), C.return = g, g = C) : (C = Zu(
                S.type,
                S.key,
                S.props,
                null,
                g.mode,
                C
              ), $n(C, S), C.return = g, g = C);
            }
            return c(g);
          case xt:
            t: {
              for (J = S.key; h !== null; ) {
                if (h.key === J)
                  if (h.tag === 4 && h.stateNode.containerInfo === S.containerInfo && h.stateNode.implementation === S.implementation) {
                    e(
                      g,
                      h.sibling
                    ), C = n(h, S.children || []), C.return = g, g = C;
                    break t;
                  } else {
                    e(g, h);
                    break;
                  }
                else l(g, h);
                h = h.sibling;
              }
              C = Si(S, g.mode, C), C.return = g, g = C;
            }
            return c(g);
          case tl:
            return S = Ha(S), jt(
              g,
              h,
              S,
              C
            );
        }
        if (ul(S))
          return w(
            g,
            h,
            S,
            C
          );
        if (Vt(S)) {
          if (J = Vt(S), typeof J != "function") throw Error(r(150));
          return S = J.call(S), W(
            g,
            h,
            S,
            C
          );
        }
        if (typeof S.then == "function")
          return jt(
            g,
            h,
            Iu(S),
            C
          );
        if (S.$$typeof === Lt)
          return jt(
            g,
            h,
            Ju(g, S),
            C
          );
        Pu(g, S);
      }
      return typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint" ? (S = "" + S, h !== null && h.tag === 6 ? (e(g, h.sibling), C = n(h, S), C.return = g, g = C) : (e(g, h), C = bi(S, g.mode, C), C.return = g, g = C), c(g)) : e(g, h);
    }
    return function(g, h, S, C) {
      try {
        Jn = 0;
        var J = jt(
          g,
          h,
          S,
          C
        );
        return sn = null, J;
      } catch (V) {
        if (V === fn || V === Wu) throw V;
        var pt = ql(29, V, null, g.mode);
        return pt.lanes = C, pt.return = g, pt;
      } finally {
      }
    };
  }
  var qa = pr(!0), Er = pr(!1), ea = !1;
  function Oi(t) {
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
    if (a = a.shared, (Nt & 2) !== 0) {
      var n = a.pending;
      return n === null ? l.next = l : (l.next = n.next, n.next = l), a.pending = l, l = Vu(t), nr(t, null, e), l;
    }
    return Qu(t, a, l, e), Vu(t);
  }
  function Wn(t, l, e) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, Aa(t, e);
    }
  }
  function Di(t, l) {
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
  var Ui = !1;
  function Fn() {
    if (Ui) {
      var t = cn;
      if (t !== null) throw t;
    }
  }
  function In(t, l, e, a) {
    Ui = !1;
    var n = t.updateQueue;
    ea = !1;
    var u = n.firstBaseUpdate, c = n.lastBaseUpdate, i = n.shared.pending;
    if (i !== null) {
      n.shared.pending = null;
      var o = i, p = o.next;
      o.next = null, c === null ? u = p : c.next = p, c = o;
      var z = t.alternate;
      z !== null && (z = z.updateQueue, i = z.lastBaseUpdate, i !== c && (i === null ? z.firstBaseUpdate = p : i.next = p, z.lastBaseUpdate = o));
    }
    if (u !== null) {
      var R = n.baseState;
      c = 0, z = p = o = null, i = u;
      do {
        var E = i.lane & -536870913, _ = E !== i.lane;
        if (_ ? (ht & E) === E : (a & E) === E) {
          E !== 0 && E === un && (Ui = !0), z !== null && (z = z.next = {
            lane: 0,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          });
          t: {
            var w = t, W = i;
            E = l;
            var jt = e;
            switch (W.tag) {
              case 1:
                if (w = W.payload, typeof w == "function") {
                  R = w.call(jt, R, E);
                  break t;
                }
                R = w;
                break t;
              case 3:
                w.flags = w.flags & -65537 | 128;
              case 0:
                if (w = W.payload, E = typeof w == "function" ? w.call(jt, R, E) : w, E == null) break t;
                R = Y({}, R, E);
                break t;
              case 2:
                ea = !0;
            }
          }
          E = i.callback, E !== null && (t.flags |= 64, _ && (t.flags |= 8192), _ = n.callbacks, _ === null ? n.callbacks = [E] : _.push(E));
        } else
          _ = {
            lane: E,
            tag: i.tag,
            payload: i.payload,
            callback: i.callback,
            next: null
          }, z === null ? (p = z = _, o = R) : z = z.next = _, c |= E;
        if (i = i.next, i === null) {
          if (i = n.shared.pending, i === null)
            break;
          _ = i, i = _.next, _.next = null, n.lastBaseUpdate = _, n.shared.pending = null;
        }
      } while (!0);
      z === null && (o = R), n.baseState = o, n.firstBaseUpdate = p, n.lastBaseUpdate = z, u === null && (n.shared.lanes = 0), sa |= c, t.lanes = c, t.memoizedState = R;
    }
  }
  function Nr(t, l) {
    if (typeof t != "function")
      throw Error(r(191, t));
    t.call(l);
  }
  function _r(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        Nr(e[t], l);
  }
  var rn = m(null), tc = m(0);
  function Ar(t, l) {
    t = we, D(tc, t), D(rn, l), we = t | l.baseLanes;
  }
  function Li() {
    D(tc, we), D(rn, rn.current);
  }
  function Hi() {
    we = tc.current, b(rn), b(tc);
  }
  var Yl = m(null), Wl = null;
  function ua(t) {
    var l = t.alternate;
    D(Kt, Kt.current & 1), D(Yl, t), Wl === null && (l === null || rn.current !== null || l.memoizedState !== null) && (Wl = t);
  }
  function Bi(t) {
    D(Kt, Kt.current), D(Yl, t), Wl === null && (Wl = t);
  }
  function Tr(t) {
    t.tag === 22 ? (D(Kt, Kt.current), D(Yl, t), Wl === null && (Wl = t)) : ca();
  }
  function ca() {
    D(Kt, Kt.current), D(Yl, Yl.current);
  }
  function wl(t) {
    b(Yl), Wl === t && (Wl = null), b(Kt);
  }
  var Kt = m(0);
  function lc(t) {
    for (var l = t; l !== null; ) {
      if (l.tag === 13) {
        var e = l.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || Vf(e) || Zf(e)))
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
  var je = 0, it = null, Mt = null, Ft = null, ec = !1, on = !1, Ya = !1, ac = 0, Pn = 0, dn = null, Th = 0;
  function Gt() {
    throw Error(r(321));
  }
  function qi(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!Bl(t[e], l[e])) return !1;
    return !0;
  }
  function Yi(t, l, e, a, n, u) {
    return je = u, it = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, A.H = t === null || t.memoizedState === null ? fo : tf, Ya = !1, u = e(a, n), Ya = !1, on && (u = xr(
      l,
      e,
      a,
      n
    )), zr(t), u;
  }
  function zr(t) {
    A.H = eu;
    var l = Mt !== null && Mt.next !== null;
    if (je = 0, Ft = Mt = it = null, ec = !1, Pn = 0, dn = null, l) throw Error(r(300));
    t === null || It || (t = t.dependencies, t !== null && ku(t) && (It = !0));
  }
  function xr(t, l, e, a) {
    it = t;
    var n = 0;
    do {
      if (on && (dn = null), Pn = 0, on = !1, 25 <= n) throw Error(r(301));
      if (n += 1, Ft = Mt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      A.H = so, u = l(e, a);
    } while (on);
    return u;
  }
  function zh() {
    var t = A.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? tu(l) : l, t = t.useState()[0], (Mt !== null ? Mt.memoizedState : null) !== t && (it.flags |= 1024), l;
  }
  function wi() {
    var t = ac !== 0;
    return ac = 0, t;
  }
  function Xi(t, l, e) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
  }
  function Gi(t) {
    if (ec) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      ec = !1;
    }
    je = 0, Ft = Mt = it = null, on = !1, Pn = ac = 0, dn = null;
  }
  function Al() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ft === null ? it.memoizedState = Ft = t : Ft = Ft.next = t, Ft;
  }
  function kt() {
    if (Mt === null) {
      var t = it.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Mt.next;
    var l = Ft === null ? it.memoizedState : Ft.next;
    if (l !== null)
      Ft = l, Mt = t;
    else {
      if (t === null)
        throw it.alternate === null ? Error(r(467)) : Error(r(310));
      Mt = t, t = {
        memoizedState: Mt.memoizedState,
        baseState: Mt.baseState,
        baseQueue: Mt.baseQueue,
        queue: Mt.queue,
        next: null
      }, Ft === null ? it.memoizedState = Ft = t : Ft = Ft.next = t;
    }
    return Ft;
  }
  function nc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function tu(t) {
    var l = Pn;
    return Pn += 1, dn === null && (dn = []), t = gr(dn, t, l), l = it, (Ft === null ? l.memoizedState : Ft.next) === null && (l = l.alternate, A.H = l === null || l.memoizedState === null ? fo : tf), t;
  }
  function uc(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return tu(t);
      if (t.$$typeof === Lt) return rl(t);
    }
    throw Error(r(438, String(t)));
  }
  function Qi(t) {
    var l = null, e = it.updateQueue;
    if (e !== null && (l = e.memoCache), l == null) {
      var a = it.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (l = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = nc(), it.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), a = 0; a < t; a++)
        e[a] = bl;
    return l.index++, e;
  }
  function De(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function cc(t) {
    var l = kt();
    return Vi(l, Mt, t);
  }
  function Vi(t, l, e) {
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
      var i = c = null, o = null, p = l, z = !1;
      do {
        var R = p.lane & -536870913;
        if (R !== p.lane ? (ht & R) === R : (je & R) === R) {
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
            }), R === un && (z = !0);
          else if ((je & E) === E) {
            p = p.next, E === un && (z = !0);
            continue;
          } else
            R = {
              lane: 0,
              revertLane: p.revertLane,
              gesture: null,
              action: p.action,
              hasEagerState: p.hasEagerState,
              eagerState: p.eagerState,
              next: null
            }, o === null ? (i = o = R, c = u) : o = o.next = R, it.lanes |= E, sa |= E;
          R = p.action, Ya && e(u, R), u = p.hasEagerState ? p.eagerState : e(u, R);
        } else
          E = {
            lane: R,
            revertLane: p.revertLane,
            gesture: p.gesture,
            action: p.action,
            hasEagerState: p.hasEagerState,
            eagerState: p.eagerState,
            next: null
          }, o === null ? (i = o = E, c = u) : o = o.next = E, it.lanes |= R, sa |= R;
        p = p.next;
      } while (p !== null && p !== l);
      if (o === null ? c = u : o.next = i, !Bl(u, t.memoizedState) && (It = !0, z && (e = cn, e !== null)))
        throw e;
      t.memoizedState = u, t.baseState = c, t.baseQueue = o, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function Zi(t) {
    var l = kt(), e = l.queue;
    if (e === null) throw Error(r(311));
    e.lastRenderedReducer = t;
    var a = e.dispatch, n = e.pending, u = l.memoizedState;
    if (n !== null) {
      e.pending = null;
      var c = n = n.next;
      do
        u = t(u, c.action), c = c.next;
      while (c !== n);
      Bl(u, l.memoizedState) || (It = !0), l.memoizedState = u, l.baseQueue === null && (l.baseState = u), e.lastRenderedState = u;
    }
    return [u, a];
  }
  function Cr(t, l, e) {
    var a = it, n = kt(), u = vt;
    if (u) {
      if (e === void 0) throw Error(r(407));
      e = e();
    } else e = l();
    var c = !Bl(
      (Mt || n).memoizedState,
      e
    );
    if (c && (n.memoizedState = e, It = !0), n = n.queue, Ji(Or.bind(null, a, n, t), [
      t
    ]), n.getSnapshot !== l || c || Ft !== null && Ft.memoizedState.tag & 1) {
      if (a.flags |= 2048, mn(
        9,
        { destroy: void 0 },
        Mr.bind(
          null,
          a,
          n,
          e,
          l
        ),
        null
      ), Dt === null) throw Error(r(349));
      u || (je & 127) !== 0 || Rr(a, l, e);
    }
    return e;
  }
  function Rr(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = it.updateQueue, l === null ? (l = nc(), it.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function Mr(t, l, e, a) {
    l.value = e, l.getSnapshot = a, jr(l) && Dr(t);
  }
  function Or(t, l, e) {
    return e(function() {
      jr(l) && Dr(t);
    });
  }
  function jr(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !Bl(t, e);
    } catch {
      return !0;
    }
  }
  function Dr(t) {
    var l = Ma(t, 2);
    l !== null && Ol(l, t, 2);
  }
  function Ki(t) {
    var l = Al();
    if (typeof t == "function") {
      var e = t;
      if (t = e(), Ya) {
        Dl(!0);
        try {
          e();
        } finally {
          Dl(!1);
        }
      }
    }
    return l.memoizedState = l.baseState = t, l.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: De,
      lastRenderedState: t
    }, l;
  }
  function Ur(t, l, e, a) {
    return t.baseState = e, Vi(
      t,
      Mt,
      typeof a == "function" ? a : De
    );
  }
  function xh(t, l, e, a, n) {
    if (sc(t)) throw Error(r(485));
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
      A.T !== null ? e(!0) : u.isTransition = !1, a(u), e = l.pending, e === null ? (u.next = l.pending = u, Lr(l, u)) : (u.next = e.next, l.pending = e.next = u);
    }
  }
  function Lr(t, l) {
    var e = l.action, a = l.payload, n = t.state;
    if (l.isTransition) {
      var u = A.T, c = {};
      A.T = c;
      try {
        var i = e(n, a), o = A.S;
        o !== null && o(c, i), Hr(t, l, i);
      } catch (p) {
        ki(t, l, p);
      } finally {
        u !== null && c.types !== null && (u.types = c.types), A.T = u;
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
        Br(t, l, a);
      },
      function(a) {
        return ki(t, l, a);
      }
    ) : Br(t, l, e);
  }
  function Br(t, l, e) {
    l.status = "fulfilled", l.value = e, qr(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, Lr(t, e)));
  }
  function ki(t, l, e) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        l.status = "rejected", l.reason = e, qr(l), l = l.next;
      while (l !== a);
    }
    t.action = null;
  }
  function qr(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function Yr(t, l) {
    return l;
  }
  function wr(t, l) {
    if (vt) {
      var e = Dt.formState;
      if (e !== null) {
        t: {
          var a = it;
          if (vt) {
            if (Ht) {
              l: {
                for (var n = Ht, u = $l; n.nodeType !== 8; ) {
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
                Ht = Fl(
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
    return e = Al(), e.memoizedState = e.baseState = l, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Yr,
      lastRenderedState: l
    }, e.queue = a, e = uo.bind(
      null,
      it,
      a
    ), a.dispatch = e, a = Ki(!1), u = Pi.bind(
      null,
      it,
      !1,
      a.queue
    ), a = Al(), n = {
      state: l,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = n, e = xh.bind(
      null,
      it,
      n,
      u,
      e
    ), n.dispatch = e, a.memoizedState = t, [l, e, !1];
  }
  function Xr(t) {
    var l = kt();
    return Gr(l, Mt, t);
  }
  function Gr(t, l, e) {
    if (l = Vi(
      t,
      l,
      Yr
    )[0], t = cc(De)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var a = tu(l);
      } catch (c) {
        throw c === fn ? Wu : c;
      }
    else a = l;
    l = kt();
    var n = l.queue, u = n.dispatch;
    return e !== l.memoizedState && (it.flags |= 2048, mn(
      9,
      { destroy: void 0 },
      Ch.bind(null, n, e),
      null
    )), [a, u, t];
  }
  function Ch(t, l) {
    t.action = l;
  }
  function Qr(t) {
    var l = kt(), e = Mt;
    if (e !== null)
      return Gr(l, e, t);
    kt(), l = l.memoizedState, e = kt();
    var a = e.queue.dispatch;
    return e.memoizedState = t, [l, a, !1];
  }
  function mn(t, l, e, a) {
    return t = { tag: t, create: e, deps: a, inst: l, next: null }, l = it.updateQueue, l === null && (l = nc(), it.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (a = e.next, e.next = t, t.next = a, l.lastEffect = t), t;
  }
  function Vr() {
    return kt().memoizedState;
  }
  function ic(t, l, e, a) {
    var n = Al();
    it.flags |= t, n.memoizedState = mn(
      1 | l,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function fc(t, l, e, a) {
    var n = kt();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    Mt !== null && a !== null && qi(a, Mt.memoizedState.deps) ? n.memoizedState = mn(l, u, e, a) : (it.flags |= t, n.memoizedState = mn(
      1 | l,
      u,
      e,
      a
    ));
  }
  function Zr(t, l) {
    ic(8390656, 8, t, l);
  }
  function Ji(t, l) {
    fc(2048, 8, t, l);
  }
  function Rh(t) {
    it.flags |= 4;
    var l = it.updateQueue;
    if (l === null)
      l = nc(), it.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function Kr(t) {
    var l = kt().memoizedState;
    return Rh({ ref: l, nextImpl: t }), function() {
      if ((Nt & 2) !== 0) throw Error(r(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function kr(t, l) {
    return fc(4, 2, t, l);
  }
  function Jr(t, l) {
    return fc(4, 4, t, l);
  }
  function $r(t, l) {
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
  function Wr(t, l, e) {
    e = e != null ? e.concat([t]) : null, fc(4, 4, $r.bind(null, l, t), e);
  }
  function $i() {
  }
  function Fr(t, l) {
    var e = kt();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    return l !== null && qi(l, a[1]) ? a[0] : (e.memoizedState = [t, l], t);
  }
  function Ir(t, l) {
    var e = kt();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    if (l !== null && qi(l, a[1]))
      return a[0];
    if (a = t(), Ya) {
      Dl(!0);
      try {
        t();
      } finally {
        Dl(!1);
      }
    }
    return e.memoizedState = [a, l], a;
  }
  function Wi(t, l, e) {
    return e === void 0 || (je & 1073741824) !== 0 && (ht & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = td(), it.lanes |= t, sa |= t, e);
  }
  function Pr(t, l, e, a) {
    return Bl(e, l) ? e : rn.current !== null ? (t = Wi(t, e, a), Bl(t, l) || (It = !0), t) : (je & 42) === 0 || (je & 1073741824) !== 0 && (ht & 261930) === 0 ? (It = !0, t.memoizedState = e) : (t = td(), it.lanes |= t, sa |= t, l);
  }
  function to(t, l, e, a, n) {
    var u = H.p;
    H.p = u !== 0 && 8 > u ? u : 8;
    var c = A.T, i = {};
    A.T = i, Pi(t, !1, l, e);
    try {
      var o = n(), p = A.S;
      if (p !== null && p(i, o), o !== null && typeof o == "object" && typeof o.then == "function") {
        var z = Ah(
          o,
          a
        );
        lu(
          t,
          l,
          z,
          Ql(t)
        );
      } else
        lu(
          t,
          l,
          a,
          Ql(t)
        );
    } catch (R) {
      lu(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: R },
        Ql()
      );
    } finally {
      H.p = u, c !== null && i.types !== null && (c.types = i.types), A.T = c;
    }
  }
  function Mh() {
  }
  function Fi(t, l, e, a) {
    if (t.tag !== 5) throw Error(r(476));
    var n = lo(t).queue;
    to(
      t,
      n,
      l,
      $,
      e === null ? Mh : function() {
        return eo(t), e(a);
      }
    );
  }
  function lo(t) {
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
        lastRenderedReducer: De,
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
        lastRenderedReducer: De,
        lastRenderedState: e
      },
      next: null
    }, t.memoizedState = l, t = t.alternate, t !== null && (t.memoizedState = l), l;
  }
  function eo(t) {
    var l = lo(t);
    l.next === null && (l = t.alternate.memoizedState), lu(
      t,
      l.next.queue,
      {},
      Ql()
    );
  }
  function Ii() {
    return rl(bu);
  }
  function ao() {
    return kt().memoizedState;
  }
  function no() {
    return kt().memoizedState;
  }
  function Oh(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = Ql();
          t = aa(e);
          var a = na(l, t, e);
          a !== null && (Ol(a, l, e), Wn(a, l, e)), l = { cache: xi() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function jh(t, l, e) {
    var a = Ql();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, sc(t) ? co(l, e) : (e = vi(t, l, e, a), e !== null && (Ol(e, t, a), io(e, l, a)));
  }
  function uo(t, l, e) {
    var a = Ql();
    lu(t, l, e, a);
  }
  function lu(t, l, e, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (sc(t)) co(l, n);
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
      if (e = vi(t, l, n, a), e !== null)
        return Ol(e, t, a), io(e, l, a), !0;
    }
    return !1;
  }
  function Pi(t, l, e, a) {
    if (a = {
      lane: 2,
      revertLane: jf(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, sc(t)) {
      if (l) throw Error(r(479));
    } else
      l = vi(
        t,
        e,
        a,
        2
      ), l !== null && Ol(l, t, 2);
  }
  function sc(t) {
    var l = t.alternate;
    return t === it || l !== null && l === it;
  }
  function co(t, l) {
    on = ec = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function io(t, l, e) {
    if ((e & 4194048) !== 0) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, Aa(t, e);
    }
  }
  var eu = {
    readContext: rl,
    use: uc,
    useCallback: Gt,
    useContext: Gt,
    useEffect: Gt,
    useImperativeHandle: Gt,
    useLayoutEffect: Gt,
    useInsertionEffect: Gt,
    useMemo: Gt,
    useReducer: Gt,
    useRef: Gt,
    useState: Gt,
    useDebugValue: Gt,
    useDeferredValue: Gt,
    useTransition: Gt,
    useSyncExternalStore: Gt,
    useId: Gt,
    useHostTransitionStatus: Gt,
    useFormState: Gt,
    useActionState: Gt,
    useOptimistic: Gt,
    useMemoCache: Gt,
    useCacheRefresh: Gt
  };
  eu.useEffectEvent = Gt;
  var fo = {
    readContext: rl,
    use: uc,
    useCallback: function(t, l) {
      return Al().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: rl,
    useEffect: Zr,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, ic(
        4194308,
        4,
        $r.bind(null, l, t),
        e
      );
    },
    useLayoutEffect: function(t, l) {
      return ic(4194308, 4, t, l);
    },
    useInsertionEffect: function(t, l) {
      ic(4, 2, t, l);
    },
    useMemo: function(t, l) {
      var e = Al();
      l = l === void 0 ? null : l;
      var a = t();
      if (Ya) {
        Dl(!0);
        try {
          t();
        } finally {
          Dl(!1);
        }
      }
      return e.memoizedState = [a, l], a;
    },
    useReducer: function(t, l, e) {
      var a = Al();
      if (e !== void 0) {
        var n = e(l);
        if (Ya) {
          Dl(!0);
          try {
            e(l);
          } finally {
            Dl(!1);
          }
        }
      } else n = l;
      return a.memoizedState = a.baseState = n, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: n
      }, a.queue = t, t = t.dispatch = jh.bind(
        null,
        it,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var l = Al();
      return t = { current: t }, l.memoizedState = t;
    },
    useState: function(t) {
      t = Ki(t);
      var l = t.queue, e = uo.bind(null, it, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: $i,
    useDeferredValue: function(t, l) {
      var e = Al();
      return Wi(e, t, l);
    },
    useTransition: function() {
      var t = Ki(!1);
      return t = to.bind(
        null,
        it,
        t.queue,
        !0,
        !1
      ), Al().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, l, e) {
      var a = it, n = Al();
      if (vt) {
        if (e === void 0)
          throw Error(r(407));
        e = e();
      } else {
        if (e = l(), Dt === null)
          throw Error(r(349));
        (ht & 127) !== 0 || Rr(a, l, e);
      }
      n.memoizedState = e;
      var u = { value: e, getSnapshot: l };
      return n.queue = u, Zr(Or.bind(null, a, u, t), [
        t
      ]), a.flags |= 2048, mn(
        9,
        { destroy: void 0 },
        Mr.bind(
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
      var t = Al(), l = Dt.identifierPrefix;
      if (vt) {
        var e = ve, a = ye;
        e = (a & ~(1 << 32 - hl(a) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = ac++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = Th++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: Ii,
    useFormState: wr,
    useActionState: wr,
    useOptimistic: function(t) {
      var l = Al();
      l.memoizedState = l.baseState = t;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return l.queue = e, l = Pi.bind(
        null,
        it,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: Qi,
    useCacheRefresh: function() {
      return Al().memoizedState = Oh.bind(
        null,
        it
      );
    },
    useEffectEvent: function(t) {
      var l = Al(), e = { impl: t };
      return l.memoizedState = e, function() {
        if ((Nt & 2) !== 0)
          throw Error(r(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, tf = {
    readContext: rl,
    use: uc,
    useCallback: Fr,
    useContext: rl,
    useEffect: Ji,
    useImperativeHandle: Wr,
    useInsertionEffect: kr,
    useLayoutEffect: Jr,
    useMemo: Ir,
    useReducer: cc,
    useRef: Vr,
    useState: function() {
      return cc(De);
    },
    useDebugValue: $i,
    useDeferredValue: function(t, l) {
      var e = kt();
      return Pr(
        e,
        Mt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = cc(De)[0], l = kt().memoizedState;
      return [
        typeof t == "boolean" ? t : tu(t),
        l
      ];
    },
    useSyncExternalStore: Cr,
    useId: ao,
    useHostTransitionStatus: Ii,
    useFormState: Xr,
    useActionState: Xr,
    useOptimistic: function(t, l) {
      var e = kt();
      return Ur(e, Mt, t, l);
    },
    useMemoCache: Qi,
    useCacheRefresh: no
  };
  tf.useEffectEvent = Kr;
  var so = {
    readContext: rl,
    use: uc,
    useCallback: Fr,
    useContext: rl,
    useEffect: Ji,
    useImperativeHandle: Wr,
    useInsertionEffect: kr,
    useLayoutEffect: Jr,
    useMemo: Ir,
    useReducer: Zi,
    useRef: Vr,
    useState: function() {
      return Zi(De);
    },
    useDebugValue: $i,
    useDeferredValue: function(t, l) {
      var e = kt();
      return Mt === null ? Wi(e, t, l) : Pr(
        e,
        Mt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = Zi(De)[0], l = kt().memoizedState;
      return [
        typeof t == "boolean" ? t : tu(t),
        l
      ];
    },
    useSyncExternalStore: Cr,
    useId: ao,
    useHostTransitionStatus: Ii,
    useFormState: Qr,
    useActionState: Qr,
    useOptimistic: function(t, l) {
      var e = kt();
      return Mt !== null ? Ur(e, Mt, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: Qi,
    useCacheRefresh: no
  };
  so.useEffectEvent = Kr;
  function lf(t, l, e, a) {
    l = t.memoizedState, e = e(a, l), e = e == null ? l : Y({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var ef = {
    enqueueSetState: function(t, l, e) {
      t = t._reactInternals;
      var a = Ql(), n = aa(a);
      n.payload = l, e != null && (n.callback = e), l = na(t, n, a), l !== null && (Ol(l, t, a), Wn(l, t, a));
    },
    enqueueReplaceState: function(t, l, e) {
      t = t._reactInternals;
      var a = Ql(), n = aa(a);
      n.tag = 1, n.payload = l, e != null && (n.callback = e), l = na(t, n, a), l !== null && (Ol(l, t, a), Wn(l, t, a));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var e = Ql(), a = aa(e);
      a.tag = 2, l != null && (a.callback = l), l = na(t, a, e), l !== null && (Ol(l, t, e), Wn(l, t, e));
    }
  };
  function ro(t, l, e, a, n, u, c) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, c) : l.prototype && l.prototype.isPureReactComponent ? !Gn(e, a) || !Gn(n, u) : !0;
  }
  function oo(t, l, e, a) {
    t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, a), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, a), l.state !== t && ef.enqueueReplaceState(l, l.state, null);
  }
  function wa(t, l) {
    var e = l;
    if ("ref" in l) {
      e = {};
      for (var a in l)
        a !== "ref" && (e[a] = l[a]);
    }
    if (t = t.defaultProps) {
      e === l && (e = Y({}, e));
      for (var n in t)
        e[n] === void 0 && (e[n] = t[n]);
    }
    return e;
  }
  function mo(t) {
    Xu(t);
  }
  function ho(t) {
    console.error(t);
  }
  function yo(t) {
    Xu(t);
  }
  function rc(t, l) {
    try {
      var e = t.onUncaughtError;
      e(l.value, { componentStack: l.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function vo(t, l, e) {
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
  function af(t, l, e) {
    return e = aa(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      rc(t, l);
    }, e;
  }
  function go(t) {
    return t = aa(t), t.tag = 3, t;
  }
  function bo(t, l, e, a) {
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      t.payload = function() {
        return n(u);
      }, t.callback = function() {
        vo(l, e, a);
      };
    }
    var c = e.stateNode;
    c !== null && typeof c.componentDidCatch == "function" && (t.callback = function() {
      vo(l, e, a), typeof n != "function" && (ra === null ? ra = /* @__PURE__ */ new Set([this]) : ra.add(this));
      var i = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: i !== null ? i : ""
      });
    });
  }
  function Dh(t, l, e, a, n) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (l = e.alternate, l !== null && nn(
        l,
        e,
        n,
        !0
      ), e = Yl.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return Wl === null ? Nc() : e.alternate === null && Qt === 0 && (Qt = 3), e.flags &= -257, e.flags |= 65536, e.lanes = n, a === Fu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : l.add(a), Rf(t, a, n)), !1;
          case 22:
            return e.flags |= 65536, a === Fu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), Rf(t, a, n)), !1;
        }
        throw Error(r(435, e.tag));
      }
      return Rf(t, a, n), Nc(), !1;
    }
    if (vt)
      return l = Yl.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = n, a !== Ni && (t = Error(r(422), { cause: a }), Zn(Kl(t, e)))) : (a !== Ni && (l = Error(r(423), {
        cause: a
      }), Zn(
        Kl(l, e)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = Kl(a, e), n = af(
        t.stateNode,
        a,
        n
      ), Di(t, n), Qt !== 4 && (Qt = 2)), !1;
    var u = Error(r(520), { cause: a });
    if (u = Kl(u, e), ru === null ? ru = [u] : ru.push(u), Qt !== 4 && (Qt = 2), l === null) return !0;
    a = Kl(a, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = n & -n, e.lanes |= t, t = af(e.stateNode, a, t), Di(e, t), !1;
        case 1:
          if (l = e.type, u = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (ra === null || !ra.has(u))))
            return e.flags |= 65536, n &= -n, e.lanes |= n, n = go(n), bo(
              n,
              t,
              e,
              a
            ), Di(e, n), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var nf = Error(r(461)), It = !1;
  function ol(t, l, e, a) {
    l.child = t === null ? Er(l, null, e, a) : qa(
      l,
      t.child,
      e,
      a
    );
  }
  function So(t, l, e, a, n) {
    e = e.render;
    var u = l.ref;
    if ("ref" in a) {
      var c = {};
      for (var i in a)
        i !== "ref" && (c[i] = a[i]);
    } else c = a;
    return Ua(l), a = Yi(
      t,
      l,
      e,
      c,
      u,
      n
    ), i = wi(), t !== null && !It ? (Xi(t, l, n), Ue(t, l, n)) : (vt && i && pi(l), l.flags |= 1, ol(t, l, a, n), l.child);
  }
  function po(t, l, e, a, n) {
    if (t === null) {
      var u = e.type;
      return typeof u == "function" && !gi(u) && u.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = u, Eo(
        t,
        l,
        u,
        a,
        n
      )) : (t = Zu(
        e.type,
        null,
        a,
        l,
        l.mode,
        n
      ), t.ref = l.ref, t.return = l, l.child = t);
    }
    if (u = t.child, !mf(t, n)) {
      var c = u.memoizedProps;
      if (e = e.compare, e = e !== null ? e : Gn, e(c, a) && t.ref === l.ref)
        return Ue(t, l, n);
    }
    return l.flags |= 1, t = Ce(u, a), t.ref = l.ref, t.return = l, l.child = t;
  }
  function Eo(t, l, e, a, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (Gn(u, a) && t.ref === l.ref)
        if (It = !1, l.pendingProps = a = u, mf(t, n))
          (t.flags & 131072) !== 0 && (It = !0);
        else
          return l.lanes = t.lanes, Ue(t, l, n);
    }
    return uf(
      t,
      l,
      e,
      a,
      n
    );
  }
  function No(t, l, e, a) {
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
        return _o(
          t,
          l,
          u,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && $u(
          l,
          u !== null ? u.cachePool : null
        ), u !== null ? Ar(l, u) : Li(), Tr(l);
      else
        return a = l.lanes = 536870912, _o(
          t,
          l,
          u !== null ? u.baseLanes | e : e,
          e,
          a
        );
    } else
      u !== null ? ($u(l, u.cachePool), Ar(l, u), ca(), l.memoizedState = null) : (t !== null && $u(l, null), Li(), ca());
    return ol(t, l, n, e), l.child;
  }
  function au(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function _o(t, l, e, a, n) {
    var u = Ri();
    return u = u === null ? null : { parent: Wt._currentValue, pool: u }, l.memoizedState = {
      baseLanes: e,
      cachePool: u
    }, t !== null && $u(l, null), Li(), Tr(l), t !== null && nn(t, l, a, !0), l.childLanes = n, null;
  }
  function oc(t, l) {
    return l = mc(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function Ao(t, l, e) {
    return qa(l, t.child, null, e), t = oc(l, l.pendingProps), t.flags |= 2, wl(l), l.memoizedState = null, t;
  }
  function Uh(t, l, e) {
    var a = l.pendingProps, n = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (vt) {
        if (a.mode === "hidden")
          return t = oc(l, a), l.lanes = 536870912, au(null, t);
        if (Bi(l), (t = Ht) ? (t = Hd(
          t,
          $l
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: Ie !== null ? { id: ye, overflow: ve } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = cr(t), e.return = l, l.child = e, sl = l, Ht = null)) : t = null, t === null) throw ta(l);
        return l.lanes = 536870912, null;
      }
      return oc(l, a);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var c = u.dehydrated;
      if (Bi(l), n)
        if (l.flags & 256)
          l.flags &= -257, l = Ao(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(r(558));
      else if (It || nn(t, l, e, !1), n = (e & t.childLanes) !== 0, It || n) {
        if (a = Dt, a !== null && (c = Ta(a, e), c !== 0 && c !== u.retryLane))
          throw u.retryLane = c, Ma(t, c), Ol(a, t, c), nf;
        Nc(), l = Ao(
          t,
          l,
          e
        );
      } else
        t = u.treeContext, Ht = Fl(c.nextSibling), sl = l, vt = !0, Pe = null, $l = !1, t !== null && sr(l, t), l = oc(l, a), l.flags |= 4096;
      return l;
    }
    return t = Ce(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function dc(t, l) {
    var e = l.ref;
    if (e === null)
      t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(r(284));
      (t === null || t.ref !== e) && (l.flags |= 4194816);
    }
  }
  function uf(t, l, e, a, n) {
    return Ua(l), e = Yi(
      t,
      l,
      e,
      a,
      void 0,
      n
    ), a = wi(), t !== null && !It ? (Xi(t, l, n), Ue(t, l, n)) : (vt && a && pi(l), l.flags |= 1, ol(t, l, e, n), l.child);
  }
  function To(t, l, e, a, n, u) {
    return Ua(l), l.updateQueue = null, e = xr(
      l,
      a,
      e,
      n
    ), zr(t), a = wi(), t !== null && !It ? (Xi(t, l, u), Ue(t, l, u)) : (vt && a && pi(l), l.flags |= 1, ol(t, l, e, u), l.child);
  }
  function zo(t, l, e, a, n) {
    if (Ua(l), l.stateNode === null) {
      var u = tn, c = e.contextType;
      typeof c == "object" && c !== null && (u = rl(c)), u = new e(a, u), l.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = ef, l.stateNode = u, u._reactInternals = l, u = l.stateNode, u.props = a, u.state = l.memoizedState, u.refs = {}, Oi(l), c = e.contextType, u.context = typeof c == "object" && c !== null ? rl(c) : tn, u.state = l.memoizedState, c = e.getDerivedStateFromProps, typeof c == "function" && (lf(
        l,
        e,
        c,
        a
      ), u.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (c = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), c !== u.state && ef.enqueueReplaceState(u, u.state, null), In(l, a, u, n), Fn(), u.state = l.memoizedState), typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = !0;
    } else if (t === null) {
      u = l.stateNode;
      var i = l.memoizedProps, o = wa(e, i);
      u.props = o;
      var p = u.context, z = e.contextType;
      c = tn, typeof z == "object" && z !== null && (c = rl(z));
      var R = e.getDerivedStateFromProps;
      z = typeof R == "function" || typeof u.getSnapshotBeforeUpdate == "function", i = l.pendingProps !== i, z || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i || p !== c) && oo(
        l,
        u,
        a,
        c
      ), ea = !1;
      var E = l.memoizedState;
      u.state = E, In(l, a, u, n), Fn(), p = l.memoizedState, i || E !== p || ea ? (typeof R == "function" && (lf(
        l,
        e,
        R,
        a
      ), p = l.memoizedState), (o = ea || ro(
        l,
        e,
        o,
        a,
        E,
        p,
        c
      )) ? (z || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = a, l.memoizedState = p), u.props = a, u.state = p, u.context = c, a = o) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = !1);
    } else {
      u = l.stateNode, ji(t, l), c = l.memoizedProps, z = wa(e, c), u.props = z, R = l.pendingProps, E = u.context, p = e.contextType, o = tn, typeof p == "object" && p !== null && (o = rl(p)), i = e.getDerivedStateFromProps, (p = typeof i == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (c !== R || E !== o) && oo(
        l,
        u,
        a,
        o
      ), ea = !1, E = l.memoizedState, u.state = E, In(l, a, u, n), Fn();
      var _ = l.memoizedState;
      c !== R || E !== _ || ea || t !== null && t.dependencies !== null && ku(t.dependencies) ? (typeof i == "function" && (lf(
        l,
        e,
        i,
        a
      ), _ = l.memoizedState), (z = ea || ro(
        l,
        e,
        z,
        a,
        E,
        _,
        o
      ) || t !== null && t.dependencies !== null && ku(t.dependencies)) ? (p || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, _, o), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        _,
        o
      )), typeof u.componentDidUpdate == "function" && (l.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || c === t.memoizedProps && E === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && E === t.memoizedState || (l.flags |= 1024), l.memoizedProps = a, l.memoizedState = _), u.props = a, u.state = _, u.context = o, a = z) : (typeof u.componentDidUpdate != "function" || c === t.memoizedProps && E === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && E === t.memoizedState || (l.flags |= 1024), a = !1);
    }
    return u = a, dc(t, l), a = (l.flags & 128) !== 0, u || a ? (u = l.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : u.render(), l.flags |= 1, t !== null && a ? (l.child = qa(
      l,
      t.child,
      null,
      n
    ), l.child = qa(
      l,
      null,
      e,
      n
    )) : ol(t, l, e, n), l.memoizedState = u.state, t = l.child) : t = Ue(
      t,
      l,
      n
    ), t;
  }
  function xo(t, l, e, a) {
    return ja(), l.flags |= 256, ol(t, l, e, a), l.child;
  }
  var cf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ff(t) {
    return { baseLanes: t, cachePool: yr() };
  }
  function sf(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= Gl), t;
  }
  function Co(t, l, e) {
    var a = l.pendingProps, n = !1, u = (l.flags & 128) !== 0, c;
    if ((c = u) || (c = t !== null && t.memoizedState === null ? !1 : (Kt.current & 2) !== 0), c && (n = !0, l.flags &= -129), c = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (vt) {
        if (n ? ua(l) : ca(), (t = Ht) ? (t = Hd(
          t,
          $l
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: Ie !== null ? { id: ye, overflow: ve } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = cr(t), e.return = l, l.child = e, sl = l, Ht = null)) : t = null, t === null) throw ta(l);
        return Zf(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      var i = a.children;
      return a = a.fallback, n ? (ca(), n = l.mode, i = mc(
        { mode: "hidden", children: i },
        n
      ), a = Oa(
        a,
        n,
        e,
        null
      ), i.return = l, a.return = l, i.sibling = a, l.child = i, a = l.child, a.memoizedState = ff(e), a.childLanes = sf(
        t,
        c,
        e
      ), l.memoizedState = cf, au(null, a)) : (ua(l), rf(l, i));
    }
    var o = t.memoizedState;
    if (o !== null && (i = o.dehydrated, i !== null)) {
      if (u)
        l.flags & 256 ? (ua(l), l.flags &= -257, l = of(
          t,
          l,
          e
        )) : l.memoizedState !== null ? (ca(), l.child = t.child, l.flags |= 128, l = null) : (ca(), i = a.fallback, n = l.mode, a = mc(
          { mode: "visible", children: a.children },
          n
        ), i = Oa(
          i,
          n,
          e,
          null
        ), i.flags |= 2, a.return = l, i.return = l, a.sibling = i, l.child = a, qa(
          l,
          t.child,
          null,
          e
        ), a = l.child, a.memoizedState = ff(e), a.childLanes = sf(
          t,
          c,
          e
        ), l.memoizedState = cf, l = au(null, a));
      else if (ua(l), Zf(i)) {
        if (c = i.nextSibling && i.nextSibling.dataset, c) var p = c.dgst;
        c = p, a = Error(r(419)), a.stack = "", a.digest = c, Zn({ value: a, source: null, stack: null }), l = of(
          t,
          l,
          e
        );
      } else if (It || nn(t, l, e, !1), c = (e & t.childLanes) !== 0, It || c) {
        if (c = Dt, c !== null && (a = Ta(c, e), a !== 0 && a !== o.retryLane))
          throw o.retryLane = a, Ma(t, a), Ol(c, t, a), nf;
        Vf(i) || Nc(), l = of(
          t,
          l,
          e
        );
      } else
        Vf(i) ? (l.flags |= 192, l.child = t.child, l = null) : (t = o.treeContext, Ht = Fl(
          i.nextSibling
        ), sl = l, vt = !0, Pe = null, $l = !1, t !== null && sr(l, t), l = rf(
          l,
          a.children
        ), l.flags |= 4096);
      return l;
    }
    return n ? (ca(), i = a.fallback, n = l.mode, o = t.child, p = o.sibling, a = Ce(o, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = o.subtreeFlags & 65011712, p !== null ? i = Ce(
      p,
      i
    ) : (i = Oa(
      i,
      n,
      e,
      null
    ), i.flags |= 2), i.return = l, a.return = l, a.sibling = i, l.child = a, au(null, a), a = l.child, i = t.child.memoizedState, i === null ? i = ff(e) : (n = i.cachePool, n !== null ? (o = Wt._currentValue, n = n.parent !== o ? { parent: o, pool: o } : n) : n = yr(), i = {
      baseLanes: i.baseLanes | e,
      cachePool: n
    }), a.memoizedState = i, a.childLanes = sf(
      t,
      c,
      e
    ), l.memoizedState = cf, au(t.child, a)) : (ua(l), e = t.child, t = e.sibling, e = Ce(e, {
      mode: "visible",
      children: a.children
    }), e.return = l, e.sibling = null, t !== null && (c = l.deletions, c === null ? (l.deletions = [t], l.flags |= 16) : c.push(t)), l.child = e, l.memoizedState = null, e);
  }
  function rf(t, l) {
    return l = mc(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function mc(t, l) {
    return t = ql(22, t, null, l), t.lanes = 0, t;
  }
  function of(t, l, e) {
    return qa(l, t.child, null, e), t = rf(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function Ro(t, l, e) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l), Ti(t.return, l, e);
  }
  function df(t, l, e, a, n, u) {
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
  function Mo(t, l, e) {
    var a = l.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var c = Kt.current, i = (c & 2) !== 0;
    if (i ? (c = c & 1 | 2, l.flags |= 128) : c &= 1, D(Kt, c), ol(t, l, a, e), a = vt ? Vn : 0, !i && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Ro(t, e, l);
        else if (t.tag === 19)
          Ro(t, e, l);
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
          t = e.alternate, t !== null && lc(t) === null && (n = e), e = e.sibling;
        e = n, e === null ? (n = l.child, l.child = null) : (n = e.sibling, e.sibling = null), df(
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
          if (t = n.alternate, t !== null && lc(t) === null) {
            l.child = n;
            break;
          }
          t = n.sibling, n.sibling = e, e = n, n = t;
        }
        df(
          l,
          !0,
          e,
          null,
          u,
          a
        );
        break;
      case "together":
        df(
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
  function Ue(t, l, e) {
    if (t !== null && (l.dependencies = t.dependencies), sa |= l.lanes, (e & l.childLanes) === 0)
      if (t !== null) {
        if (nn(
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
      for (t = l.child, e = Ce(t, t.pendingProps), l.child = e, e.return = l; t.sibling !== null; )
        t = t.sibling, e = e.sibling = Ce(t, t.pendingProps), e.return = l;
      e.sibling = null;
    }
    return l.child;
  }
  function mf(t, l) {
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && ku(t)));
  }
  function Lh(t, l, e) {
    switch (l.tag) {
      case 3:
        bt(l, l.stateNode.containerInfo), la(l, Wt, t.memoizedState.cache), ja();
        break;
      case 27:
      case 5:
        pe(l);
        break;
      case 4:
        bt(l, l.stateNode.containerInfo);
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
          return l.flags |= 128, Bi(l), null;
        break;
      case 13:
        var a = l.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (ua(l), l.flags |= 128, null) : (e & l.child.childLanes) !== 0 ? Co(t, l, e) : (ua(l), t = Ue(
            t,
            l,
            e
          ), t !== null ? t.sibling : null);
        ua(l);
        break;
      case 19:
        var n = (t.flags & 128) !== 0;
        if (a = (e & l.childLanes) !== 0, a || (nn(
          t,
          l,
          e,
          !1
        ), a = (e & l.childLanes) !== 0), n) {
          if (a)
            return Mo(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (n = l.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), D(Kt, Kt.current), a) break;
        return null;
      case 22:
        return l.lanes = 0, No(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        la(l, Wt, t.memoizedState.cache);
    }
    return Ue(t, l, e);
  }
  function Oo(t, l, e) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps)
        It = !0;
      else {
        if (!mf(t, e) && (l.flags & 128) === 0)
          return It = !1, Lh(
            t,
            l,
            e
          );
        It = (t.flags & 131072) !== 0;
      }
    else
      It = !1, vt && (l.flags & 1048576) !== 0 && fr(l, Vn, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var a = l.pendingProps;
          if (t = Ha(l.elementType), l.type = t, typeof t == "function")
            gi(t) ? (a = wa(t, a), l.tag = 1, l = zo(
              null,
              l,
              t,
              a,
              e
            )) : (l.tag = 0, l = uf(
              null,
              l,
              t,
              a,
              e
            ));
          else {
            if (t != null) {
              var n = t.$$typeof;
              if (n === _t) {
                l.tag = 11, l = So(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              } else if (n === nt) {
                l.tag = 14, l = po(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              }
            }
            throw l = pl(t) || t, Error(r(306, l, ""));
          }
        }
        return l;
      case 0:
        return uf(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 1:
        return a = l.type, n = wa(
          a,
          l.pendingProps
        ), zo(
          t,
          l,
          a,
          n,
          e
        );
      case 3:
        t: {
          if (bt(
            l,
            l.stateNode.containerInfo
          ), t === null) throw Error(r(387));
          a = l.pendingProps;
          var u = l.memoizedState;
          n = u.element, ji(t, l), In(l, a, null, e);
          var c = l.memoizedState;
          if (a = c.cache, la(l, Wt, a), a !== u.cache && zi(
            l,
            [Wt],
            e,
            !0
          ), Fn(), a = c.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: c.cache
            }, l.updateQueue.baseState = u, l.memoizedState = u, l.flags & 256) {
              l = xo(
                t,
                l,
                a,
                e
              );
              break t;
            } else if (a !== n) {
              n = Kl(
                Error(r(424)),
                l
              ), Zn(n), l = xo(
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
              for (Ht = Fl(t.firstChild), sl = l, vt = !0, Pe = null, $l = !0, e = Er(
                l,
                null,
                a,
                e
              ), l.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (ja(), a === n) {
              l = Ue(
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
        return dc(t, l), t === null ? (e = Gd(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = e : vt || (e = l.type, t = l.pendingProps, a = Rc(
          G.current
        ).createElement(e), a[$t] = l, a[yl] = t, dl(a, e, t), O(a), l.stateNode = a) : l.memoizedState = Gd(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return pe(l), t === null && vt && (a = l.stateNode = Yd(
          l.type,
          l.pendingProps,
          G.current
        ), sl = l, $l = !0, n = Ht, ha(l.type) ? (Kf = n, Ht = Fl(a.firstChild)) : Ht = n), ol(
          t,
          l,
          l.pendingProps.children,
          e
        ), dc(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && vt && ((n = a = Ht) && (a = o0(
          a,
          l.type,
          l.pendingProps,
          $l
        ), a !== null ? (l.stateNode = a, sl = l, Ht = Fl(a.firstChild), $l = !1, n = !0) : n = !1), n || ta(l)), pe(l), n = l.type, u = l.pendingProps, c = t !== null ? t.memoizedProps : null, a = u.children, Xf(n, u) ? a = null : c !== null && Xf(n, c) && (l.flags |= 32), l.memoizedState !== null && (n = Yi(
          t,
          l,
          zh,
          null,
          null,
          e
        ), bu._currentValue = n), dc(t, l), ol(t, l, a, e), l.child;
      case 6:
        return t === null && vt && ((t = e = Ht) && (e = d0(
          e,
          l.pendingProps,
          $l
        ), e !== null ? (l.stateNode = e, sl = l, Ht = null, t = !0) : t = !1), t || ta(l)), null;
      case 13:
        return Co(t, l, e);
      case 4:
        return bt(
          l,
          l.stateNode.containerInfo
        ), a = l.pendingProps, t === null ? l.child = qa(
          l,
          null,
          a,
          e
        ) : ol(t, l, a, e), l.child;
      case 11:
        return So(
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
        return a = l.pendingProps, la(l, l.type, a.value), ol(t, l, a.children, e), l.child;
      case 9:
        return n = l.type._context, a = l.pendingProps.children, Ua(l), n = rl(n), a = a(n), l.flags |= 1, ol(t, l, a, e), l.child;
      case 14:
        return po(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 15:
        return Eo(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 19:
        return Mo(t, l, e);
      case 31:
        return Uh(t, l, e);
      case 22:
        return No(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return Ua(l), a = rl(Wt), t === null ? (n = Ri(), n === null && (n = Dt, u = xi(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= e), n = u), l.memoizedState = { parent: a, cache: n }, Oi(l), la(l, Wt, n)) : ((t.lanes & e) !== 0 && (ji(t, l), In(l, null, null, e), Fn()), n = t.memoizedState, u = l.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, l.memoizedState = n, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = n), la(l, Wt, a)) : (a = u.cache, la(l, Wt, a), a !== n.cache && zi(
          l,
          [Wt],
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
  function Le(t) {
    t.flags |= 4;
  }
  function hf(t, l, e, a, n) {
    if ((l = (t.mode & 32) !== 0) && (l = !1), l) {
      if (t.flags |= 16777216, (n & 335544128) === n)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (nd()) t.flags |= 8192;
        else
          throw Ba = Fu, Mi;
    } else t.flags &= -16777217;
  }
  function jo(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !kd(l))
      if (nd()) t.flags |= 8192;
      else
        throw Ba = Fu, Mi;
  }
  function hc(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? ae() : 536870912, t.lanes |= l, gn |= l);
  }
  function nu(t, l) {
    if (!vt)
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
  function Bt(t) {
    var l = t.alternate !== null && t.alternate.child === t.child, e = 0, a = 0;
    if (l)
      for (var n = t.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = t, n = n.sibling;
    else
      for (n = t.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = t, n = n.sibling;
    return t.subtreeFlags |= a, t.childLanes = e, l;
  }
  function Hh(t, l, e) {
    var a = l.pendingProps;
    switch (Ei(l), l.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Bt(l), null;
      case 1:
        return Bt(l), null;
      case 3:
        return e = l.stateNode, a = null, t !== null && (a = t.memoizedState.cache), l.memoizedState.cache !== a && (l.flags |= 2048), Oe(Wt), Ct(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (an(l) ? Le(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, _i())), Bt(l), null;
      case 26:
        var n = l.type, u = l.memoizedState;
        return t === null ? (Le(l), u !== null ? (Bt(l), jo(l, u)) : (Bt(l), hf(
          l,
          n,
          null,
          a,
          e
        ))) : u ? u !== t.memoizedState ? (Le(l), Bt(l), jo(l, u)) : (Bt(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== a && Le(l), Bt(l), hf(
          l,
          n,
          t,
          a,
          e
        )), null;
      case 27:
        if (Ea(l), e = G.current, n = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && Le(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(r(166));
            return Bt(l), null;
          }
          t = q.current, an(l) ? rr(l) : (t = Yd(n, a, e), l.stateNode = t, Le(l));
        }
        return Bt(l), null;
      case 5:
        if (Ea(l), n = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && Le(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(r(166));
            return Bt(l), null;
          }
          if (u = q.current, an(l))
            rr(l);
          else {
            var c = Rc(
              G.current
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
            u[$t] = l, u[yl] = a;
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
            a && Le(l);
          }
        }
        return Bt(l), hf(
          l,
          l.type,
          t === null ? null : t.memoizedProps,
          l.pendingProps,
          e
        ), null;
      case 6:
        if (t && l.stateNode != null)
          t.memoizedProps !== a && Le(l);
        else {
          if (typeof a != "string" && l.stateNode === null)
            throw Error(r(166));
          if (t = G.current, an(l)) {
            if (t = l.stateNode, e = l.memoizedProps, a = null, n = sl, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            t[$t] = l, t = !!(t.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Cd(t.nodeValue, e)), t || ta(l, !0);
          } else
            t = Rc(t).createTextNode(
              a
            ), t[$t] = l, l.stateNode = t;
        }
        return Bt(l), null;
      case 31:
        if (e = l.memoizedState, t === null || t.memoizedState !== null) {
          if (a = an(l), e !== null) {
            if (t === null) {
              if (!a) throw Error(r(318));
              if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(557));
              t[$t] = l;
            } else
              ja(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Bt(l), t = !1;
          } else
            e = _i(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
          if (!t)
            return l.flags & 256 ? (wl(l), l) : (wl(l), null);
          if ((l.flags & 128) !== 0)
            throw Error(r(558));
        }
        return Bt(l), null;
      case 13:
        if (a = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = an(l), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(r(318));
              if (n = l.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(r(317));
              n[$t] = l;
            } else
              ja(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Bt(l), n = !1;
          } else
            n = _i(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return l.flags & 256 ? (wl(l), l) : (wl(l), null);
        }
        return wl(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = a !== null, t = t !== null && t.memoizedState !== null, e && (a = l.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), hc(l, l.updateQueue), Bt(l), null);
      case 4:
        return Ct(), t === null && Hf(l.stateNode.containerInfo), Bt(l), null;
      case 10:
        return Oe(l.type), Bt(l), null;
      case 19:
        if (b(Kt), a = l.memoizedState, a === null) return Bt(l), null;
        if (n = (l.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) nu(a, !1);
          else {
            if (Qt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (u = lc(t), u !== null) {
                  for (l.flags |= 128, nu(a, !1), t = u.updateQueue, l.updateQueue = t, hc(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                    ur(e, t), e = e.sibling;
                  return D(
                    Kt,
                    Kt.current & 1 | 2
                  ), vt && Re(l, a.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            a.tail !== null && Xt() > Sc && (l.flags |= 128, n = !0, nu(a, !1), l.lanes = 4194304);
          }
        else {
          if (!n)
            if (t = lc(u), t !== null) {
              if (l.flags |= 128, n = !0, t = t.updateQueue, l.updateQueue = t, hc(l, t), nu(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !vt)
                return Bt(l), null;
            } else
              2 * Xt() - a.renderingStartTime > Sc && e !== 536870912 && (l.flags |= 128, n = !0, nu(a, !1), l.lanes = 4194304);
          a.isBackwards ? (u.sibling = l.child, l.child = u) : (t = a.last, t !== null ? t.sibling = u : l.child = u, a.last = u);
        }
        return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = Xt(), t.sibling = null, e = Kt.current, D(
          Kt,
          n ? e & 1 | 2 : e & 1
        ), vt && Re(l, a.treeForkCount), t) : (Bt(l), null);
      case 22:
      case 23:
        return wl(l), Hi(), a = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (l.flags |= 8192) : a && (l.flags |= 8192), a ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (Bt(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : Bt(l), e = l.updateQueue, e !== null && hc(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), a = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), a !== e && (l.flags |= 2048), t !== null && b(La), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), Oe(Wt), Bt(l), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, l.tag));
  }
  function Bh(t, l) {
    switch (Ei(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return Oe(Wt), Ct(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return Ea(l), null;
      case 31:
        if (l.memoizedState !== null) {
          if (wl(l), l.alternate === null)
            throw Error(r(340));
          ja();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 13:
        if (wl(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
          if (l.alternate === null)
            throw Error(r(340));
          ja();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 19:
        return b(Kt), null;
      case 4:
        return Ct(), null;
      case 10:
        return Oe(l.type), null;
      case 22:
      case 23:
        return wl(l), Hi(), t !== null && b(La), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return Oe(Wt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Do(t, l) {
    switch (Ei(l), l.tag) {
      case 3:
        Oe(Wt), Ct();
        break;
      case 26:
      case 27:
      case 5:
        Ea(l);
        break;
      case 4:
        Ct();
        break;
      case 31:
        l.memoizedState !== null && wl(l);
        break;
      case 13:
        wl(l);
        break;
      case 19:
        b(Kt);
        break;
      case 10:
        Oe(l.type);
        break;
      case 22:
      case 23:
        wl(l), Hi(), t !== null && b(La);
        break;
      case 24:
        Oe(Wt);
    }
  }
  function uu(t, l) {
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
      Tt(l, l.return, i);
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
              var o = e, p = i;
              try {
                p();
              } catch (z) {
                Tt(
                  n,
                  o,
                  z
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (z) {
      Tt(l, l.return, z);
    }
  }
  function Uo(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        _r(l, e);
      } catch (a) {
        Tt(t, t.return, a);
      }
    }
  }
  function Lo(t, l, e) {
    e.props = wa(
      t.type,
      t.memoizedProps
    ), e.state = t.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      Tt(t, l, a);
    }
  }
  function cu(t, l) {
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
      Tt(t, l, n);
    }
  }
  function ge(t, l) {
    var e = t.ref, a = t.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          Tt(t, l, n);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (n) {
          Tt(t, l, n);
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
      Tt(t, t.return, n);
    }
  }
  function yf(t, l, e) {
    try {
      var a = t.stateNode;
      u0(a, t.type, e, l), a[yl] = l;
    } catch (n) {
      Tt(t, t.return, n);
    }
  }
  function Bo(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && ha(t.type) || t.tag === 4;
  }
  function vf(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Bo(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && ha(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function gf(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(t, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(t), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = ze));
    else if (a !== 4 && (a === 27 && ha(t.type) && (e = t.stateNode, l = null), t = t.child, t !== null))
      for (gf(t, l, e), t = t.sibling; t !== null; )
        gf(t, l, e), t = t.sibling;
  }
  function yc(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? e.insertBefore(t, l) : e.appendChild(t);
    else if (a !== 4 && (a === 27 && ha(t.type) && (e = t.stateNode), t = t.child, t !== null))
      for (yc(t, l, e), t = t.sibling; t !== null; )
        yc(t, l, e), t = t.sibling;
  }
  function qo(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var a = t.type, n = l.attributes; n.length; )
        l.removeAttributeNode(n[0]);
      dl(l, a, e), l[$t] = t, l[yl] = e;
    } catch (u) {
      Tt(t, t.return, u);
    }
  }
  var He = !1, Pt = !1, bf = !1, Yo = typeof WeakSet == "function" ? WeakSet : Set, fl = null;
  function qh(t, l) {
    if (t = t.containerInfo, Yf = Hc, t = Ws(t), ri(t)) {
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
            var c = 0, i = -1, o = -1, p = 0, z = 0, R = t, E = null;
            l: for (; ; ) {
              for (var _; R !== e || n !== 0 && R.nodeType !== 3 || (i = c + n), R !== u || a !== 0 && R.nodeType !== 3 || (o = c + a), R.nodeType === 3 && (c += R.nodeValue.length), (_ = R.firstChild) !== null; )
                E = R, R = _;
              for (; ; ) {
                if (R === t) break l;
                if (E === e && ++p === n && (i = c), E === u && ++z === a && (o = c), (_ = R.nextSibling) !== null) break;
                R = E, E = R.parentNode;
              }
              R = _;
            }
            e = i === -1 || o === -1 ? null : { start: i, end: o };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (wf = { focusedElem: t, selectionRange: e }, Hc = !1, fl = l; fl !== null; )
      if (l = fl, t = l.child, (l.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = l, fl = t;
      else
        for (; fl !== null; ) {
          switch (l = fl, u = l.alternate, t = l.flags, l.tag) {
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
                  var w = wa(
                    e.type,
                    n
                  );
                  t = a.getSnapshotBeforeUpdate(
                    w,
                    u
                  ), a.__reactInternalSnapshotBeforeUpdate = t;
                } catch (W) {
                  Tt(
                    e,
                    e.return,
                    W
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = l.stateNode.containerInfo, e = t.nodeType, e === 9)
                  Qf(t);
                else if (e === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Qf(t);
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
            t.return = l.return, fl = t;
            break;
          }
          fl = l.return;
        }
  }
  function wo(t, l, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        qe(t, e), a & 4 && uu(5, e);
        break;
      case 1:
        if (qe(t, e), a & 4)
          if (t = e.stateNode, l === null)
            try {
              t.componentDidMount();
            } catch (c) {
              Tt(e, e.return, c);
            }
          else {
            var n = wa(
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
              Tt(
                e,
                e.return,
                c
              );
            }
          }
        a & 64 && Uo(e), a & 512 && cu(e, e.return);
        break;
      case 3:
        if (qe(t, e), a & 64 && (t = e.updateQueue, t !== null)) {
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
            _r(t, l);
          } catch (c) {
            Tt(e, e.return, c);
          }
        }
        break;
      case 27:
        l === null && a & 4 && qo(e);
      case 26:
      case 5:
        qe(t, e), l === null && a & 4 && Ho(e), a & 512 && cu(e, e.return);
        break;
      case 12:
        qe(t, e);
        break;
      case 31:
        qe(t, e), a & 4 && Qo(t, e);
        break;
      case 13:
        qe(t, e), a & 4 && Vo(t, e), a & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = kh.bind(
          null,
          e
        ), m0(t, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || He, !a) {
          l = l !== null && l.memoizedState !== null || Pt, n = He;
          var u = Pt;
          He = a, (Pt = l) && !u ? Ye(
            t,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : qe(t, e), He = n, Pt = u;
        }
        break;
      case 30:
        break;
      default:
        qe(t, e);
    }
  }
  function Xo(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, Xo(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && jn(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var qt = null, xl = !1;
  function Be(t, l, e) {
    for (e = e.child; e !== null; )
      Go(t, l, e), e = e.sibling;
  }
  function Go(t, l, e) {
    if (et && typeof et.onCommitFiberUnmount == "function")
      try {
        et.onCommitFiberUnmount(El, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        Pt || ge(e, l), Be(
          t,
          l,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        Pt || ge(e, l);
        var a = qt, n = xl;
        ha(e.type) && (qt = e.stateNode, xl = !1), Be(
          t,
          l,
          e
        ), yu(e.stateNode), qt = a, xl = n;
        break;
      case 5:
        Pt || ge(e, l);
      case 6:
        if (a = qt, n = xl, qt = null, Be(
          t,
          l,
          e
        ), qt = a, xl = n, qt !== null)
          if (xl)
            try {
              (qt.nodeType === 9 ? qt.body : qt.nodeName === "HTML" ? qt.ownerDocument.body : qt).removeChild(e.stateNode);
            } catch (u) {
              Tt(
                e,
                l,
                u
              );
            }
          else
            try {
              qt.removeChild(e.stateNode);
            } catch (u) {
              Tt(
                e,
                l,
                u
              );
            }
        break;
      case 18:
        qt !== null && (xl ? (t = qt, Ud(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), Tn(t)) : Ud(qt, e.stateNode));
        break;
      case 4:
        a = qt, n = xl, qt = e.stateNode.containerInfo, xl = !0, Be(
          t,
          l,
          e
        ), qt = a, xl = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ia(2, e, l), Pt || ia(4, e, l), Be(
          t,
          l,
          e
        );
        break;
      case 1:
        Pt || (ge(e, l), a = e.stateNode, typeof a.componentWillUnmount == "function" && Lo(
          e,
          l,
          a
        )), Be(
          t,
          l,
          e
        );
        break;
      case 21:
        Be(
          t,
          l,
          e
        );
        break;
      case 22:
        Pt = (a = Pt) || e.memoizedState !== null, Be(
          t,
          l,
          e
        ), Pt = a;
        break;
      default:
        Be(
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
        Tn(t);
      } catch (e) {
        Tt(l, l.return, e);
      }
    }
  }
  function Vo(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Tn(t);
      } catch (e) {
        Tt(l, l.return, e);
      }
  }
  function Yh(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return l === null && (l = t.stateNode = new Yo()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new Yo()), l;
      default:
        throw Error(r(435, t.tag));
    }
  }
  function vc(t, l) {
    var e = Yh(t);
    l.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var n = Jh.bind(null, t, a);
        a.then(n, n);
      }
    });
  }
  function Cl(t, l) {
    var e = l.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var n = e[a], u = t, c = l, i = c;
        t: for (; i !== null; ) {
          switch (i.tag) {
            case 27:
              if (ha(i.type)) {
                qt = i.stateNode, xl = !1;
                break t;
              }
              break;
            case 5:
              qt = i.stateNode, xl = !1;
              break t;
            case 3:
            case 4:
              qt = i.stateNode.containerInfo, xl = !0;
              break t;
          }
          i = i.return;
        }
        if (qt === null) throw Error(r(160));
        Go(u, c, n), qt = null, xl = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (l.subtreeFlags & 13886)
      for (l = l.child; l !== null; )
        Zo(l, t), l = l.sibling;
  }
  var ue = null;
  function Zo(t, l) {
    var e = t.alternate, a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Cl(l, t), Rl(t), a & 4 && (ia(3, t, t.return), uu(3, t), ia(5, t, t.return));
        break;
      case 1:
        Cl(l, t), Rl(t), a & 512 && (Pt || e === null || ge(e, e.return)), a & 64 && He && (t = t.updateQueue, t !== null && (a = t.callbacks, a !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var n = ue;
        if (Cl(l, t), Rl(t), a & 512 && (Pt || e === null || ge(e, e.return)), a & 4) {
          var u = e !== null ? e.memoizedState : null;
          if (a = t.memoizedState, e === null)
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  a = t.type, e = t.memoizedProps, n = n.ownerDocument || n;
                  l: switch (a) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[za] || u[$t] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), dl(u, a, e), u[$t] = t, O(u), a = u;
                      break t;
                    case "link":
                      var c = Zd(
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
                      if (c = Zd(
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
                  u[$t] = t, O(u), a = u;
                }
                t.stateNode = a;
              } else
                Kd(
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
            u !== a ? (u === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : u.count--, a === null ? Kd(
              n,
              t.type,
              t.stateNode
            ) : Vd(
              n,
              a,
              t.memoizedProps
            )) : a === null && t.stateNode !== null && yf(
              t,
              t.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        Cl(l, t), Rl(t), a & 512 && (Pt || e === null || ge(e, e.return)), e !== null && a & 4 && yf(
          t,
          t.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (Cl(l, t), Rl(t), a & 512 && (Pt || e === null || ge(e, e.return)), t.flags & 32) {
          n = t.stateNode;
          try {
            ka(n, "");
          } catch (w) {
            Tt(t, t.return, w);
          }
        }
        a & 4 && t.stateNode != null && (n = t.memoizedProps, yf(
          t,
          n,
          e !== null ? e.memoizedProps : n
        )), a & 1024 && (bf = !0);
        break;
      case 6:
        if (Cl(l, t), Rl(t), a & 4) {
          if (t.stateNode === null)
            throw Error(r(162));
          a = t.memoizedProps, e = t.stateNode;
          try {
            e.nodeValue = a;
          } catch (w) {
            Tt(t, t.return, w);
          }
        }
        break;
      case 3:
        if (jc = null, n = ue, ue = Mc(l.containerInfo), Cl(l, t), ue = n, Rl(t), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            Tn(l.containerInfo);
          } catch (w) {
            Tt(t, t.return, w);
          }
        bf && (bf = !1, Ko(t));
        break;
      case 4:
        a = ue, ue = Mc(
          t.stateNode.containerInfo
        ), Cl(l, t), Rl(t), ue = a;
        break;
      case 12:
        Cl(l, t), Rl(t);
        break;
      case 31:
        Cl(l, t), Rl(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, vc(t, a)));
        break;
      case 13:
        Cl(l, t), Rl(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && (bc = Xt()), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, vc(t, a)));
        break;
      case 22:
        n = t.memoizedState !== null;
        var o = e !== null && e.memoizedState !== null, p = He, z = Pt;
        if (He = p || n, Pt = z || o, Cl(l, t), Pt = z, He = p, Rl(t), a & 8192)
          t: for (l = t.stateNode, l._visibility = n ? l._visibility & -2 : l._visibility | 1, n && (e === null || o || He || Pt || Xa(t)), e = null, l = t; ; ) {
            if (l.tag === 5 || l.tag === 26) {
              if (e === null) {
                o = e = l;
                try {
                  if (u = o.stateNode, n)
                    c = u.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none";
                  else {
                    i = o.stateNode;
                    var R = o.memoizedProps.style, E = R != null && R.hasOwnProperty("display") ? R.display : null;
                    i.style.display = E == null || typeof E == "boolean" ? "" : ("" + E).trim();
                  }
                } catch (w) {
                  Tt(o, o.return, w);
                }
              }
            } else if (l.tag === 6) {
              if (e === null) {
                o = l;
                try {
                  o.stateNode.nodeValue = n ? "" : o.memoizedProps;
                } catch (w) {
                  Tt(o, o.return, w);
                }
              }
            } else if (l.tag === 18) {
              if (e === null) {
                o = l;
                try {
                  var _ = o.stateNode;
                  n ? Ld(_, !0) : Ld(o.stateNode, !1);
                } catch (w) {
                  Tt(o, o.return, w);
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
        a & 4 && (a = t.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, vc(t, e))));
        break;
      case 19:
        Cl(l, t), Rl(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, vc(t, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Cl(l, t), Rl(t);
    }
  }
  function Rl(t) {
    var l = t.flags;
    if (l & 2) {
      try {
        for (var e, a = t.return; a !== null; ) {
          if (Bo(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(r(160));
        switch (e.tag) {
          case 27:
            var n = e.stateNode, u = vf(t);
            yc(t, u, n);
            break;
          case 5:
            var c = e.stateNode;
            e.flags & 32 && (ka(c, ""), e.flags &= -33);
            var i = vf(t);
            yc(t, i, c);
            break;
          case 3:
          case 4:
            var o = e.stateNode.containerInfo, p = vf(t);
            gf(
              t,
              p,
              o
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (z) {
        Tt(t, t.return, z);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function Ko(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        Ko(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), t = t.sibling;
      }
  }
  function qe(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        wo(t, l.alternate, l), l = l.sibling;
  }
  function Xa(t) {
    for (t = t.child; t !== null; ) {
      var l = t;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ia(4, l, l.return), Xa(l);
          break;
        case 1:
          ge(l, l.return);
          var e = l.stateNode;
          typeof e.componentWillUnmount == "function" && Lo(
            l,
            l.return,
            e
          ), Xa(l);
          break;
        case 27:
          yu(l.stateNode);
        case 26:
        case 5:
          ge(l, l.return), Xa(l);
          break;
        case 22:
          l.memoizedState === null && Xa(l);
          break;
        case 30:
          Xa(l);
          break;
        default:
          Xa(l);
      }
      t = t.sibling;
    }
  }
  function Ye(t, l, e) {
    for (e = e && (l.subtreeFlags & 8772) !== 0, l = l.child; l !== null; ) {
      var a = l.alternate, n = t, u = l, c = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Ye(
            n,
            u,
            e
          ), uu(4, u);
          break;
        case 1:
          if (Ye(
            n,
            u,
            e
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (p) {
              Tt(a, a.return, p);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var i = a.stateNode;
            try {
              var o = n.shared.hiddenCallbacks;
              if (o !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < o.length; n++)
                  Nr(o[n], i);
            } catch (p) {
              Tt(a, a.return, p);
            }
          }
          e && c & 64 && Uo(u), cu(u, u.return);
          break;
        case 27:
          qo(u);
        case 26:
        case 5:
          Ye(
            n,
            u,
            e
          ), e && a === null && c & 4 && Ho(u), cu(u, u.return);
          break;
        case 12:
          Ye(
            n,
            u,
            e
          );
          break;
        case 31:
          Ye(
            n,
            u,
            e
          ), e && c & 4 && Qo(n, u);
          break;
        case 13:
          Ye(
            n,
            u,
            e
          ), e && c & 4 && Vo(n, u);
          break;
        case 22:
          u.memoizedState === null && Ye(
            n,
            u,
            e
          ), cu(u, u.return);
          break;
        case 30:
          break;
        default:
          Ye(
            n,
            u,
            e
          );
      }
      l = l.sibling;
    }
  }
  function Sf(t, l) {
    var e = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && Kn(e));
  }
  function pf(t, l) {
    t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && Kn(t));
  }
  function ce(t, l, e, a) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        ko(
          t,
          l,
          e,
          a
        ), l = l.sibling;
  }
  function ko(t, l, e, a) {
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
        ), n & 2048 && uu(9, l);
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
        ), n & 2048 && (t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && Kn(t)));
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
          } catch (o) {
            Tt(l, l.return, o);
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
        ) : iu(t, l) : u._visibility & 2 ? ce(
          t,
          l,
          e,
          a
        ) : (u._visibility |= 2, hn(
          t,
          l,
          e,
          a,
          (l.subtreeFlags & 10256) !== 0 || !1
        )), n & 2048 && Sf(c, l);
        break;
      case 24:
        ce(
          t,
          l,
          e,
          a
        ), n & 2048 && pf(l.alternate, l);
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
  function hn(t, l, e, a, n) {
    for (n = n && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var u = t, c = l, i = e, o = a, p = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          hn(
            u,
            c,
            i,
            o,
            n
          ), uu(8, c);
          break;
        case 23:
          break;
        case 22:
          var z = c.stateNode;
          c.memoizedState !== null ? z._visibility & 2 ? hn(
            u,
            c,
            i,
            o,
            n
          ) : iu(
            u,
            c
          ) : (z._visibility |= 2, hn(
            u,
            c,
            i,
            o,
            n
          )), n && p & 2048 && Sf(
            c.alternate,
            c
          );
          break;
        case 24:
          hn(
            u,
            c,
            i,
            o,
            n
          ), n && p & 2048 && pf(c.alternate, c);
          break;
        default:
          hn(
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
  function iu(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var e = t, a = l, n = a.flags;
        switch (a.tag) {
          case 22:
            iu(e, a), n & 2048 && Sf(
              a.alternate,
              a
            );
            break;
          case 24:
            iu(e, a), n & 2048 && pf(a.alternate, a);
            break;
          default:
            iu(e, a);
        }
        l = l.sibling;
      }
  }
  var fu = 8192;
  function yn(t, l, e) {
    if (t.subtreeFlags & fu)
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
        yn(
          t,
          l,
          e
        ), t.flags & fu && t.memoizedState !== null && T0(
          e,
          ue,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        yn(
          t,
          l,
          e
        );
        break;
      case 3:
      case 4:
        var a = ue;
        ue = Mc(t.stateNode.containerInfo), yn(
          t,
          l,
          e
        ), ue = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = fu, fu = 16777216, yn(
          t,
          l,
          e
        ), fu = a) : yn(
          t,
          l,
          e
        ));
        break;
      default:
        yn(
          t,
          l,
          e
        );
    }
  }
  function $o(t) {
    var l = t.alternate;
    if (l !== null && (t = l.child, t !== null)) {
      l.child = null;
      do
        l = t.sibling, t.sibling = null, t = l;
      while (t !== null);
    }
  }
  function su(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          fl = a, Fo(
            a,
            t
          );
        }
      $o(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Wo(t), t = t.sibling;
  }
  function Wo(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        su(t), t.flags & 2048 && ia(9, t, t.return);
        break;
      case 3:
        su(t);
        break;
      case 12:
        su(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, gc(t)) : su(t);
        break;
      default:
        su(t);
    }
  }
  function gc(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          fl = a, Fo(
            a,
            t
          );
        }
      $o(t);
    }
    for (t = t.child; t !== null; ) {
      switch (l = t, l.tag) {
        case 0:
        case 11:
        case 15:
          ia(8, l, l.return), gc(l);
          break;
        case 22:
          e = l.stateNode, e._visibility & 2 && (e._visibility &= -3, gc(l));
          break;
        default:
          gc(l);
      }
      t = t.sibling;
    }
  }
  function Fo(t, l) {
    for (; fl !== null; ) {
      var e = fl;
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
          Kn(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, fl = a;
      else
        t: for (e = t; fl !== null; ) {
          a = fl;
          var n = a.sibling, u = a.return;
          if (Xo(a), a === e) {
            fl = null;
            break t;
          }
          if (n !== null) {
            n.return = u, fl = n;
            break t;
          }
          fl = u;
        }
    }
  }
  var wh = {
    getCacheForType: function(t) {
      var l = rl(Wt), e = l.data.get(t);
      return e === void 0 && (e = t(), l.data.set(t, e)), e;
    },
    cacheSignal: function() {
      return rl(Wt).controller.signal;
    }
  }, Xh = typeof WeakMap == "function" ? WeakMap : Map, Nt = 0, Dt = null, rt = null, ht = 0, At = 0, Xl = null, fa = !1, vn = !1, Ef = !1, we = 0, Qt = 0, sa = 0, Ga = 0, Nf = 0, Gl = 0, gn = 0, ru = null, Ml = null, _f = !1, bc = 0, Io = 0, Sc = 1 / 0, pc = null, ra = null, al = 0, oa = null, bn = null, Xe = 0, Af = 0, Tf = null, Po = null, ou = 0, zf = null;
  function Ql() {
    return (Nt & 2) !== 0 && ht !== 0 ? ht & -ht : A.T !== null ? jf() : Cu();
  }
  function td() {
    if (Gl === 0)
      if ((ht & 536870912) === 0 || vt) {
        var t = Ll;
        Ll <<= 1, (Ll & 3932160) === 0 && (Ll = 262144), Gl = t;
      } else Gl = 536870912;
    return t = Yl.current, t !== null && (t.flags |= 32), Gl;
  }
  function Ol(t, l, e) {
    (t === Dt && (At === 2 || At === 9) || t.cancelPendingCommit !== null) && (Sn(t, 0), da(
      t,
      ht,
      Gl,
      !1
    )), me(t, e), ((Nt & 2) === 0 || t !== Dt) && (t === Dt && ((Nt & 2) === 0 && (Ga |= e), Qt === 4 && da(
      t,
      ht,
      Gl,
      !1
    )), be(t));
  }
  function ld(t, l, e) {
    if ((Nt & 6) !== 0) throw Error(r(327));
    var a = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || Ve(t, l), n = a ? Vh(t, l) : Cf(t, l, !0), u = a;
    do {
      if (n === 0) {
        vn && !a && da(t, l, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, u && !Gh(e)) {
          n = Cf(t, l, !1), u = !1;
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
              n = ru;
              var o = i.current.memoizedState.isDehydrated;
              if (o && (Sn(i, c).flags |= 256), c = Cf(
                i,
                c,
                !1
              ), c !== 2) {
                if (Ef && !o) {
                  i.errorRecoveryDisabledLanes |= u, Ga |= u, n = 4;
                  break t;
                }
                u = Ml, Ml = n, u !== null && (Ml === null ? Ml = u : Ml.push.apply(
                  Ml,
                  u
                ));
              }
              n = c;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Sn(t, 0), da(t, l, 0, !0);
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
              da(
                a,
                l,
                Gl,
                !fa
              );
              break t;
            case 2:
              Ml = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((l & 62914560) === l && (n = bc + 300 - Xt(), 10 < n)) {
            if (da(
              a,
              l,
              Gl,
              !fa
            ), Hl(a, 0, !0) !== 0) break t;
            Xe = l, a.timeoutHandle = jd(
              ed.bind(
                null,
                a,
                e,
                Ml,
                pc,
                _f,
                l,
                Gl,
                Ga,
                gn,
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
          ed(
            a,
            e,
            Ml,
            pc,
            _f,
            l,
            Gl,
            Ga,
            gn,
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
  function ed(t, l, e, a, n, u, c, i, o, p, z, R, E, _) {
    if (t.timeoutHandle = -1, R = l.subtreeFlags, R & 8192 || (R & 16785408) === 16785408) {
      R = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ze
      }, Jo(
        l,
        u,
        R
      );
      var w = (u & 62914560) === u ? bc - Xt() : (u & 4194048) === u ? Io - Xt() : 0;
      if (w = z0(
        R,
        w
      ), w !== null) {
        Xe = u, t.cancelPendingCommit = w(
          rd.bind(
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
            z,
            R,
            null,
            E,
            _
          )
        ), da(t, u, c, !p);
        return;
      }
    }
    rd(
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
  function Gh(t) {
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
    l &= ~Nf, l &= ~Ga, t.suspendedLanes |= l, t.pingedLanes &= ~l, a && (t.warmLanes |= l), a = t.expirationTimes;
    for (var n = l; 0 < n; ) {
      var u = 31 - hl(n), c = 1 << u;
      a[u] = -1, n &= ~c;
    }
    e !== 0 && Cn(t, e, l);
  }
  function Ec() {
    return (Nt & 6) === 0 ? (du(0), !1) : !0;
  }
  function xf() {
    if (rt !== null) {
      if (At === 0)
        var t = rt.return;
      else
        t = rt, Me = Da = null, Gi(t), sn = null, Jn = 0, t = rt;
      for (; t !== null; )
        Do(t.alternate, t), t = t.return;
      rt = null;
    }
  }
  function Sn(t, l) {
    var e = t.timeoutHandle;
    e !== -1 && (t.timeoutHandle = -1, f0(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), Xe = 0, xf(), Dt = t, rt = e = Ce(t.current, null), ht = l, At = 0, Xl = null, fa = !1, vn = Ve(t, l), Ef = !1, gn = Gl = Nf = Ga = sa = Qt = 0, Ml = ru = null, _f = !1, (l & 8) !== 0 && (l |= l & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= l; 0 < a; ) {
        var n = 31 - hl(a), u = 1 << n;
        l |= t[n], a &= ~u;
      }
    return we = l, Gu(), e;
  }
  function ad(t, l) {
    it = null, A.H = eu, l === fn || l === Wu ? (l = br(), At = 3) : l === Mi ? (l = br(), At = 4) : At = l === nf ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, Xl = l, rt === null && (Qt = 1, rc(
      t,
      Kl(l, t.current)
    ));
  }
  function nd() {
    var t = Yl.current;
    return t === null ? !0 : (ht & 4194048) === ht ? Wl === null : (ht & 62914560) === ht || (ht & 536870912) !== 0 ? t === Wl : !1;
  }
  function ud() {
    var t = A.H;
    return A.H = eu, t === null ? eu : t;
  }
  function cd() {
    var t = A.A;
    return A.A = wh, t;
  }
  function Nc() {
    Qt = 4, fa || (ht & 4194048) !== ht && Yl.current !== null || (vn = !0), (sa & 134217727) === 0 && (Ga & 134217727) === 0 || Dt === null || da(
      Dt,
      ht,
      Gl,
      !1
    );
  }
  function Cf(t, l, e) {
    var a = Nt;
    Nt |= 2;
    var n = ud(), u = cd();
    (Dt !== t || ht !== l) && (pc = null, Sn(t, l)), l = !1;
    var c = Qt;
    t: do
      try {
        if (At !== 0 && rt !== null) {
          var i = rt, o = Xl;
          switch (At) {
            case 8:
              xf(), c = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Yl.current === null && (l = !0);
              var p = At;
              if (At = 0, Xl = null, pn(t, i, o, p), e && vn) {
                c = 0;
                break t;
              }
              break;
            default:
              p = At, At = 0, Xl = null, pn(t, i, o, p);
          }
        }
        Qh(), c = Qt;
        break;
      } catch (z) {
        ad(t, z);
      }
    while (!0);
    return l && t.shellSuspendCounter++, Me = Da = null, Nt = a, A.H = n, A.A = u, rt === null && (Dt = null, ht = 0, Gu()), c;
  }
  function Qh() {
    for (; rt !== null; ) id(rt);
  }
  function Vh(t, l) {
    var e = Nt;
    Nt |= 2;
    var a = ud(), n = cd();
    Dt !== t || ht !== l ? (pc = null, Sc = Xt() + 500, Sn(t, l)) : vn = Ve(
      t,
      l
    );
    t: do
      try {
        if (At !== 0 && rt !== null) {
          l = rt;
          var u = Xl;
          l: switch (At) {
            case 1:
              At = 0, Xl = null, pn(t, l, u, 1);
              break;
            case 2:
            case 9:
              if (vr(u)) {
                At = 0, Xl = null, fd(l);
                break;
              }
              l = function() {
                At !== 2 && At !== 9 || Dt !== t || (At = 7), be(t);
              }, u.then(l, l);
              break t;
            case 3:
              At = 7;
              break t;
            case 4:
              At = 5;
              break t;
            case 7:
              vr(u) ? (At = 0, Xl = null, fd(l)) : (At = 0, Xl = null, pn(t, l, u, 7));
              break;
            case 5:
              var c = null;
              switch (rt.tag) {
                case 26:
                  c = rt.memoizedState;
                case 5:
                case 27:
                  var i = rt;
                  if (c ? kd(c) : i.stateNode.complete) {
                    At = 0, Xl = null;
                    var o = i.sibling;
                    if (o !== null) rt = o;
                    else {
                      var p = i.return;
                      p !== null ? (rt = p, _c(p)) : rt = null;
                    }
                    break l;
                  }
              }
              At = 0, Xl = null, pn(t, l, u, 5);
              break;
            case 6:
              At = 0, Xl = null, pn(t, l, u, 6);
              break;
            case 8:
              xf(), Qt = 6;
              break t;
            default:
              throw Error(r(462));
          }
        }
        Zh();
        break;
      } catch (z) {
        ad(t, z);
      }
    while (!0);
    return Me = Da = null, A.H = a, A.A = n, Nt = e, rt !== null ? 0 : (Dt = null, ht = 0, Gu(), Qt);
  }
  function Zh() {
    for (; rt !== null && !xn(); )
      id(rt);
  }
  function id(t) {
    var l = Oo(t.alternate, t, we);
    t.memoizedProps = t.pendingProps, l === null ? _c(t) : rt = l;
  }
  function fd(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = To(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          ht
        );
        break;
      case 11:
        l = To(
          e,
          l,
          l.pendingProps,
          l.type.render,
          l.ref,
          ht
        );
        break;
      case 5:
        Gi(l);
      default:
        Do(e, l), l = rt = ur(l, we), l = Oo(e, l, we);
    }
    t.memoizedProps = t.pendingProps, l === null ? _c(t) : rt = l;
  }
  function pn(t, l, e, a) {
    Me = Da = null, Gi(l), sn = null, Jn = 0;
    var n = l.return;
    try {
      if (Dh(
        t,
        n,
        l,
        e,
        ht
      )) {
        Qt = 1, rc(
          t,
          Kl(e, t.current)
        ), rt = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw rt = n, u;
      Qt = 1, rc(
        t,
        Kl(e, t.current)
      ), rt = null;
      return;
    }
    l.flags & 32768 ? (vt || a === 1 ? t = !0 : vn || (ht & 536870912) !== 0 ? t = !1 : (fa = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Yl.current, a !== null && a.tag === 13 && (a.flags |= 16384))), sd(l, t)) : _c(l);
  }
  function _c(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        sd(
          l,
          fa
        );
        return;
      }
      t = l.return;
      var e = Hh(
        l.alternate,
        l,
        we
      );
      if (e !== null) {
        rt = e;
        return;
      }
      if (l = l.sibling, l !== null) {
        rt = l;
        return;
      }
      rt = l = t;
    } while (l !== null);
    Qt === 0 && (Qt = 5);
  }
  function sd(t, l) {
    do {
      var e = Bh(t.alternate, t);
      if (e !== null) {
        e.flags &= 32767, rt = e;
        return;
      }
      if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !l && (t = t.sibling, t !== null)) {
        rt = t;
        return;
      }
      rt = t = e;
    } while (t !== null);
    Qt = 6, rt = null;
  }
  function rd(t, l, e, a, n, u, c, i, o) {
    t.cancelPendingCommit = null;
    do
      Ac();
    while (al !== 0);
    if ((Nt & 6) !== 0) throw Error(r(327));
    if (l !== null) {
      if (l === t.current) throw Error(r(177));
      if (u = l.lanes | l.childLanes, u |= yi, Ke(
        t,
        e,
        u,
        c,
        i,
        o
      ), t === Dt && (rt = Dt = null, ht = 0), bn = l, oa = t, Xe = e, Af = u, Tf = n, Po = a, (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, $h(Ae, function() {
        return yd(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), a = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || a) {
        a = A.T, A.T = null, n = H.p, H.p = 2, c = Nt, Nt |= 4;
        try {
          qh(t, l, e);
        } finally {
          Nt = c, H.p = n, A.T = a;
        }
      }
      al = 1, od(), dd(), md();
    }
  }
  function od() {
    if (al === 1) {
      al = 0;
      var t = oa, l = bn, e = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || e) {
        e = A.T, A.T = null;
        var a = H.p;
        H.p = 2;
        var n = Nt;
        Nt |= 4;
        try {
          Zo(l, t);
          var u = wf, c = Ws(t.containerInfo), i = u.focusedElem, o = u.selectionRange;
          if (c !== i && i && i.ownerDocument && $s(
            i.ownerDocument.documentElement,
            i
          )) {
            if (o !== null && ri(i)) {
              var p = o.start, z = o.end;
              if (z === void 0 && (z = p), "selectionStart" in i)
                i.selectionStart = p, i.selectionEnd = Math.min(
                  z,
                  i.value.length
                );
              else {
                var R = i.ownerDocument || document, E = R && R.defaultView || window;
                if (E.getSelection) {
                  var _ = E.getSelection(), w = i.textContent.length, W = Math.min(o.start, w), jt = o.end === void 0 ? W : Math.min(o.end, w);
                  !_.extend && W > jt && (c = jt, jt = W, W = c);
                  var g = Js(
                    i,
                    W
                  ), h = Js(
                    i,
                    jt
                  );
                  if (g && h && (_.rangeCount !== 1 || _.anchorNode !== g.node || _.anchorOffset !== g.offset || _.focusNode !== h.node || _.focusOffset !== h.offset)) {
                    var S = R.createRange();
                    S.setStart(g.node, g.offset), _.removeAllRanges(), W > jt ? (_.addRange(S), _.extend(h.node, h.offset)) : (S.setEnd(h.node, h.offset), _.addRange(S));
                  }
                }
              }
            }
            for (R = [], _ = i; _ = _.parentNode; )
              _.nodeType === 1 && R.push({
                element: _,
                left: _.scrollLeft,
                top: _.scrollTop
              });
            for (typeof i.focus == "function" && i.focus(), i = 0; i < R.length; i++) {
              var C = R[i];
              C.element.scrollLeft = C.left, C.element.scrollTop = C.top;
            }
          }
          Hc = !!Yf, wf = Yf = null;
        } finally {
          Nt = n, H.p = a, A.T = e;
        }
      }
      t.current = l, al = 2;
    }
  }
  function dd() {
    if (al === 2) {
      al = 0;
      var t = oa, l = bn, e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        e = A.T, A.T = null;
        var a = H.p;
        H.p = 2;
        var n = Nt;
        Nt |= 4;
        try {
          wo(t, l.alternate, l);
        } finally {
          Nt = n, H.p = a, A.T = e;
        }
      }
      al = 3;
    }
  }
  function md() {
    if (al === 4 || al === 3) {
      al = 0, Va();
      var t = oa, l = bn, e = Xe, a = Po;
      (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? al = 5 : (al = 0, bn = oa = null, hd(t, t.pendingLanes));
      var n = t.pendingLanes;
      if (n === 0 && (ra = null), Za(e), l = l.stateNode, et && typeof et.onCommitFiberRoot == "function")
        try {
          et.onCommitFiberRoot(
            El,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        l = A.T, n = H.p, H.p = 2, A.T = null;
        try {
          for (var u = t.onRecoverableError, c = 0; c < a.length; c++) {
            var i = a[c];
            u(i.value, {
              componentStack: i.stack
            });
          }
        } finally {
          A.T = l, H.p = n;
        }
      }
      (Xe & 3) !== 0 && Ac(), be(t), n = t.pendingLanes, (e & 261930) !== 0 && (n & 42) !== 0 ? t === zf ? ou++ : (ou = 0, zf = t) : ou = 0, du(0);
    }
  }
  function hd(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, Kn(l)));
  }
  function Ac() {
    return od(), dd(), md(), yd();
  }
  function yd() {
    if (al !== 5) return !1;
    var t = oa, l = Af;
    Af = 0;
    var e = Za(Xe), a = A.T, n = H.p;
    try {
      H.p = 32 > e ? 32 : e, A.T = null, e = Tf, Tf = null;
      var u = oa, c = Xe;
      if (al = 0, bn = oa = null, Xe = 0, (Nt & 6) !== 0) throw Error(r(331));
      var i = Nt;
      if (Nt |= 4, Wo(u.current), ko(
        u,
        u.current,
        c,
        e
      ), Nt = i, du(0, !1), et && typeof et.onPostCommitFiberRoot == "function")
        try {
          et.onPostCommitFiberRoot(El, u);
        } catch {
        }
      return !0;
    } finally {
      H.p = n, A.T = a, hd(t, l);
    }
  }
  function vd(t, l, e) {
    l = Kl(e, l), l = af(t.stateNode, l, 2), t = na(t, l, 2), t !== null && (me(t, 2), be(t));
  }
  function Tt(t, l, e) {
    if (t.tag === 3)
      vd(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          vd(
            l,
            t,
            e
          );
          break;
        } else if (l.tag === 1) {
          var a = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (ra === null || !ra.has(a))) {
            t = Kl(e, t), e = go(2), a = na(l, e, 2), a !== null && (bo(
              e,
              a,
              l,
              t
            ), me(a, 2), be(a));
            break;
          }
        }
        l = l.return;
      }
  }
  function Rf(t, l, e) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new Xh();
      var n = /* @__PURE__ */ new Set();
      a.set(l, n);
    } else
      n = a.get(l), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(l, n));
    n.has(e) || (Ef = !0, n.add(e), t = Kh.bind(null, t, l, e), l.then(t, t));
  }
  function Kh(t, l, e) {
    var a = t.pingCache;
    a !== null && a.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, Dt === t && (ht & e) === e && (Qt === 4 || Qt === 3 && (ht & 62914560) === ht && 300 > Xt() - bc ? (Nt & 2) === 0 && Sn(t, 0) : Nf |= e, gn === ht && (gn = 0)), be(t);
  }
  function gd(t, l) {
    l === 0 && (l = ae()), t = Ma(t, l), t !== null && (me(t, l), be(t));
  }
  function kh(t) {
    var l = t.memoizedState, e = 0;
    l !== null && (e = l.retryLane), gd(t, e);
  }
  function Jh(t, l) {
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
    a !== null && a.delete(l), gd(t, e);
  }
  function $h(t, l) {
    return Vl(t, l);
  }
  var Tc = null, En = null, Mf = !1, zc = !1, Of = !1, ma = 0;
  function be(t) {
    t !== En && t.next === null && (En === null ? Tc = En = t : En = En.next = t), zc = !0, Mf || (Mf = !0, Fh());
  }
  function du(t, l) {
    if (!Of && zc) {
      Of = !0;
      do
        for (var e = !1, a = Tc; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var c = a.suspendedLanes, i = a.pingedLanes;
              u = (1 << 31 - hl(42 | t) + 1) - 1, u &= n & ~(c & ~i), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (e = !0, Ed(a, u));
          } else
            u = ht, u = Hl(
              a,
              a === Dt ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || Ve(a, u) || (e = !0, Ed(a, u));
          a = a.next;
        }
      while (e);
      Of = !1;
    }
  }
  function Wh() {
    bd();
  }
  function bd() {
    zc = Mf = !1;
    var t = 0;
    ma !== 0 && i0() && (t = ma);
    for (var l = Xt(), e = null, a = Tc; a !== null; ) {
      var n = a.next, u = Sd(a, l);
      u === 0 ? (a.next = null, e === null ? Tc = n : e.next = n, n === null && (En = e)) : (e = a, (t !== 0 || (u & 3) !== 0) && (zc = !0)), a = n;
    }
    al !== 0 && al !== 5 || du(t), ma !== 0 && (ma = 0);
  }
  function Sd(t, l) {
    for (var e = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var c = 31 - hl(u), i = 1 << c, o = n[c];
      o === -1 ? ((i & e) === 0 || (i & a) !== 0) && (n[c] = xu(i, l)) : o <= l && (t.expiredLanes |= i), u &= ~i;
    }
    if (l = Dt, e = ht, e = Hl(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, e === 0 || t === l && (At === 2 || At === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && jl(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || Ve(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (a !== null && jl(a), Za(e)) {
        case 2:
        case 8:
          e = se;
          break;
        case 32:
          e = Ae;
          break;
        case 268435456:
          e = ml;
          break;
        default:
          e = Ae;
      }
      return a = pd.bind(null, t), e = Vl(e, a), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return a !== null && a !== null && jl(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function pd(t, l) {
    if (al !== 0 && al !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (Ac() && t.callbackNode !== e)
      return null;
    var a = ht;
    return a = Hl(
      t,
      t === Dt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (ld(t, a, l), Sd(t, Xt()), t.callbackNode != null && t.callbackNode === e ? pd.bind(null, t) : null);
  }
  function Ed(t, l) {
    if (Ac()) return null;
    ld(t, l, !0);
  }
  function Fh() {
    s0(function() {
      (Nt & 6) !== 0 ? Vl(
        _e,
        Wh
      ) : bd();
    });
  }
  function jf() {
    if (ma === 0) {
      var t = un;
      t === 0 && (t = _a, _a <<= 1, (_a & 261888) === 0 && (_a = 256)), ma = t;
    }
    return ma;
  }
  function Nd(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Uu("" + t);
  }
  function _d(t, l) {
    var e = l.ownerDocument.createElement("input");
    return e.name = l.name, e.value = l.value, t.id && e.setAttribute("form", t.id), l.parentNode.insertBefore(e, l), t = new FormData(t), e.parentNode.removeChild(e), t;
  }
  function Ih(t, l, e, a, n) {
    if (l === "submit" && e && e.stateNode === n) {
      var u = Nd(
        (n[yl] || null).action
      ), c = a.submitter;
      c && (l = (l = c[yl] || null) ? Nd(l.formAction) : c.getAttribute("formAction"), l !== null && (u = l, c = null));
      var i = new qu(
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
                  var o = c ? _d(n, c) : new FormData(n);
                  Fi(
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
                typeof u == "function" && (i.preventDefault(), o = c ? _d(n, c) : new FormData(n), Fi(
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
  for (var Df = 0; Df < hi.length; Df++) {
    var Uf = hi[Df], Ph = Uf.toLowerCase(), t0 = Uf[0].toUpperCase() + Uf.slice(1);
    ne(
      Ph,
      "on" + t0
    );
  }
  ne(Ps, "onAnimationEnd"), ne(tr, "onAnimationIteration"), ne(lr, "onAnimationStart"), ne("dblclick", "onDoubleClick"), ne("focusin", "onFocus"), ne("focusout", "onBlur"), ne(vh, "onTransitionRun"), ne(gh, "onTransitionStart"), ne(bh, "onTransitionCancel"), ne(er, "onTransitionEnd"), ut("onMouseEnter", ["mouseout", "mouseover"]), ut("onMouseLeave", ["mouseout", "mouseover"]), ut("onPointerEnter", ["pointerout", "pointerover"]), ut("onPointerLeave", ["pointerout", "pointerover"]), at(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), at(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), at("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), at(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), at(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), at(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var mu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), l0 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mu)
  );
  function Ad(t, l) {
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
            } catch (z) {
              Xu(z);
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
            } catch (z) {
              Xu(z);
            }
            n.currentTarget = null, u = o;
          }
      }
    }
  }
  function ot(t, l) {
    var e = l[Mn];
    e === void 0 && (e = l[Mn] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    e.has(a) || (Td(l, t, 2, !1), e.add(a));
  }
  function Lf(t, l, e) {
    var a = 0;
    l && (a |= 4), Td(
      e,
      t,
      a,
      l
    );
  }
  var xc = "_reactListening" + Math.random().toString(36).slice(2);
  function Hf(t) {
    if (!t[xc]) {
      t[xc] = !0, B.forEach(function(e) {
        e !== "selectionchange" && (l0.has(e) || Lf(e, !1, t), Lf(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[xc] || (l[xc] = !0, Lf("selectionchange", !1, l));
    }
  }
  function Td(t, l, e, a) {
    switch (tm(l)) {
      case 2:
        var n = R0;
        break;
      case 8:
        n = M0;
        break;
      default:
        n = Ff;
    }
    e = n.bind(
      null,
      l,
      e,
      t
    ), n = void 0, !li || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (n = !0), a ? n !== void 0 ? t.addEventListener(l, e, {
      capture: !0,
      passive: n
    }) : t.addEventListener(l, e, !0) : n !== void 0 ? t.addEventListener(l, e, {
      passive: n
    }) : t.addEventListener(l, e, !1);
  }
  function Bf(t, l, e, a, n) {
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
            if (c = Je(i), c === null) return;
            if (o = c.tag, o === 5 || o === 6 || o === 26 || o === 27) {
              a = u = c;
              continue t;
            }
            i = i.parentNode;
          }
        }
        a = a.return;
      }
    Rs(function() {
      var p = u, z = Pc(e), R = [];
      t: {
        var E = ar.get(t);
        if (E !== void 0) {
          var _ = qu, w = t;
          switch (t) {
            case "keypress":
              if (Hu(e) === 0) break t;
            case "keydown":
            case "keyup":
              _ = Jm;
              break;
            case "focusin":
              w = "focus", _ = ui;
              break;
            case "focusout":
              w = "blur", _ = ui;
              break;
            case "beforeblur":
            case "afterblur":
              _ = ui;
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
              _ = js;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              _ = Hm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              _ = Fm;
              break;
            case Ps:
            case tr:
            case lr:
              _ = Ym;
              break;
            case er:
              _ = Pm;
              break;
            case "scroll":
            case "scrollend":
              _ = Um;
              break;
            case "wheel":
              _ = lh;
              break;
            case "copy":
            case "cut":
            case "paste":
              _ = Xm;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              _ = Us;
              break;
            case "toggle":
            case "beforetoggle":
              _ = ah;
          }
          var W = (l & 4) !== 0, jt = !W && (t === "scroll" || t === "scrollend"), g = W ? E !== null ? E + "Capture" : null : E;
          W = [];
          for (var h = p, S; h !== null; ) {
            var C = h;
            if (S = C.stateNode, C = C.tag, C !== 5 && C !== 26 && C !== 27 || S === null || g === null || (C = Ln(h, g), C != null && W.push(
              hu(h, C, S)
            )), jt) break;
            h = h.return;
          }
          0 < W.length && (E = new _(
            E,
            w,
            null,
            e,
            z
          ), R.push({ event: E, listeners: W }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (E = t === "mouseover" || t === "pointerover", _ = t === "mouseout" || t === "pointerout", E && e !== Ic && (w = e.relatedTarget || e.fromElement) && (Je(w) || w[ke]))
            break t;
          if ((_ || E) && (E = z.window === z ? z : (E = z.ownerDocument) ? E.defaultView || E.parentWindow : window, _ ? (w = e.relatedTarget || e.toElement, _ = p, w = w ? Je(w) : null, w !== null && (jt = L(w), W = w.tag, w !== jt || W !== 5 && W !== 27 && W !== 6) && (w = null)) : (_ = null, w = p), _ !== w)) {
            if (W = js, C = "onMouseLeave", g = "onMouseEnter", h = "mouse", (t === "pointerout" || t === "pointerover") && (W = Us, C = "onPointerLeave", g = "onPointerEnter", h = "pointer"), jt = _ == null ? E : N(_), S = w == null ? E : N(w), E = new W(
              C,
              h + "leave",
              _,
              e,
              z
            ), E.target = jt, E.relatedTarget = S, C = null, Je(z) === p && (W = new W(
              g,
              h + "enter",
              w,
              e,
              z
            ), W.target = S, W.relatedTarget = jt, C = W), jt = C, _ && w)
              l: {
                for (W = e0, g = _, h = w, S = 0, C = g; C; C = W(C))
                  S++;
                C = 0;
                for (var J = h; J; J = W(J))
                  C++;
                for (; 0 < S - C; )
                  g = W(g), S--;
                for (; 0 < C - S; )
                  h = W(h), C--;
                for (; S--; ) {
                  if (g === h || h !== null && g === h.alternate) {
                    W = g;
                    break l;
                  }
                  g = W(g), h = W(h);
                }
                W = null;
              }
            else W = null;
            _ !== null && zd(
              R,
              E,
              _,
              W,
              !1
            ), w !== null && jt !== null && zd(
              R,
              jt,
              w,
              W,
              !0
            );
          }
        }
        t: {
          if (E = p ? N(p) : window, _ = E.nodeName && E.nodeName.toLowerCase(), _ === "select" || _ === "input" && E.type === "file")
            var pt = Gs;
          else if (ws(E))
            if (Qs)
              pt = mh;
            else {
              pt = oh;
              var V = rh;
            }
          else
            _ = E.nodeName, !_ || _.toLowerCase() !== "input" || E.type !== "checkbox" && E.type !== "radio" ? p && Fc(p.elementType) && (pt = Gs) : pt = dh;
          if (pt && (pt = pt(t, p))) {
            Xs(
              R,
              pt,
              e,
              z
            );
            break t;
          }
          V && V(t, E, p), t === "focusout" && p && E.type === "number" && p.memoizedProps.value != null && Zt(E, "number", E.value);
        }
        switch (V = p ? N(p) : window, t) {
          case "focusin":
            (ws(V) || V.contentEditable === "true") && (Fa = V, oi = p, Qn = null);
            break;
          case "focusout":
            Qn = oi = Fa = null;
            break;
          case "mousedown":
            di = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            di = !1, Fs(R, e, z);
            break;
          case "selectionchange":
            if (yh) break;
          case "keydown":
          case "keyup":
            Fs(R, e, z);
        }
        var st;
        if (ii)
          t: {
            switch (t) {
              case "compositionstart":
                var yt = "onCompositionStart";
                break t;
              case "compositionend":
                yt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                yt = "onCompositionUpdate";
                break t;
            }
            yt = void 0;
          }
        else
          Wa ? qs(t, e) && (yt = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (yt = "onCompositionStart");
        yt && (Ls && e.locale !== "ko" && (Wa || yt !== "onCompositionStart" ? yt === "onCompositionEnd" && Wa && (st = Ms()) : (Fe = z, ei = "value" in Fe ? Fe.value : Fe.textContent, Wa = !0)), V = Cc(p, yt), 0 < V.length && (yt = new Ds(
          yt,
          t,
          null,
          e,
          z
        ), R.push({ event: yt, listeners: V }), st ? yt.data = st : (st = Ys(e), st !== null && (yt.data = st)))), (st = uh ? ch(t, e) : ih(t, e)) && (yt = Cc(p, "onBeforeInput"), 0 < yt.length && (V = new Ds(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          z
        ), R.push({
          event: V,
          listeners: yt
        }), V.data = st)), Ih(
          R,
          t,
          p,
          e,
          z
        );
      }
      Ad(R, l);
    });
  }
  function hu(t, l, e) {
    return {
      instance: t,
      listener: l,
      currentTarget: e
    };
  }
  function Cc(t, l) {
    for (var e = l + "Capture", a = []; t !== null; ) {
      var n = t, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = Ln(t, e), n != null && a.unshift(
        hu(t, n, u)
      ), n = Ln(t, l), n != null && a.push(
        hu(t, n, u)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function e0(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function zd(t, l, e, a, n) {
    for (var u = l._reactName, c = []; e !== null && e !== a; ) {
      var i = e, o = i.alternate, p = i.stateNode;
      if (i = i.tag, o !== null && o === a) break;
      i !== 5 && i !== 26 && i !== 27 || p === null || (o = p, n ? (p = Ln(e, u), p != null && c.unshift(
        hu(e, p, o)
      )) : n || (p = Ln(e, u), p != null && c.push(
        hu(e, p, o)
      ))), e = e.return;
    }
    c.length !== 0 && t.push({ event: l, listeners: c });
  }
  var a0 = /\r\n?/g, n0 = /\u0000|\uFFFD/g;
  function xd(t) {
    return (typeof t == "string" ? t : "" + t).replace(a0, `
`).replace(n0, "");
  }
  function Cd(t, l) {
    return l = xd(l), xd(t) === l;
  }
  function Ot(t, l, e, a, n, u) {
    switch (e) {
      case "children":
        typeof a == "string" ? l === "body" || l === "textarea" && a === "" || ka(t, a) : (typeof a == "number" || typeof a == "bigint") && l !== "body" && ka(t, "" + a);
        break;
      case "className":
        Ut(t, "class", a);
        break;
      case "tabIndex":
        Ut(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ut(t, e, a);
        break;
      case "style":
        xs(t, a, u);
        break;
      case "data":
        if (l !== "object") {
          Ut(t, "data", a);
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
        a = Uu("" + a), t.setAttribute(e, a);
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
        a = Uu("" + a), t.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (t.onclick = ze);
        break;
      case "onScroll":
        a != null && ot("scroll", t);
        break;
      case "onScrollEnd":
        a != null && ot("scrollend", t);
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
        e = Uu("" + a), t.setAttributeNS(
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
        ot("beforetoggle", t), ot("toggle", t), ct(t, "popover", a);
        break;
      case "xlinkActuate":
        Nl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Nl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Nl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Nl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Nl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Nl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Nl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Nl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Nl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        ct(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = jm.get(e) || e, ct(t, e, a));
    }
  }
  function qf(t, l, e, a, n, u) {
    switch (e) {
      case "style":
        xs(t, a, u);
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
        typeof a == "string" ? ka(t, a) : (typeof a == "number" || typeof a == "bigint") && ka(t, "" + a);
        break;
      case "onScroll":
        a != null && ot("scroll", t);
        break;
      case "onScrollEnd":
        a != null && ot("scrollend", t);
        break;
      case "onClick":
        a != null && (t.onclick = ze);
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
        if (!Q.hasOwnProperty(e))
          t: {
            if (e[0] === "o" && e[1] === "n" && (n = e.endsWith("Capture"), l = e.slice(2, n ? e.length - 7 : void 0), u = t[yl] || null, u = u != null ? u[e] : null, typeof u == "function" && t.removeEventListener(l, u, n), typeof a == "function")) {
              typeof u != "function" && u !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(l, a, n);
              break t;
            }
            e in t ? t[e] = a : a === !0 ? t.setAttribute(e, "") : ct(t, e, a);
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
        ot("error", t), ot("load", t);
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
        ot("invalid", t);
        var i = u = c = n = null, o = null, p = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var z = e[a];
            if (z != null)
              switch (a) {
                case "name":
                  n = z;
                  break;
                case "type":
                  c = z;
                  break;
                case "checked":
                  o = z;
                  break;
                case "defaultChecked":
                  p = z;
                  break;
                case "value":
                  u = z;
                  break;
                case "defaultValue":
                  i = z;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (z != null)
                    throw Error(r(137, l));
                  break;
                default:
                  Ot(t, l, a, z, e, null);
              }
          }
        Un(
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
        ot("invalid", t), a = c = u = null;
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
        l = u, e = c, t.multiple = !!a, l != null ? We(t, !!a, l, !1) : e != null && We(t, !!a, e, !0);
        return;
      case "textarea":
        ot("invalid", t), u = n = a = null;
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
        Ts(t, a, n, u);
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
        ot("beforetoggle", t), ot("toggle", t), ot("cancel", t), ot("close", t);
        break;
      case "iframe":
      case "object":
        ot("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < mu.length; a++)
          ot(mu[a], t);
        break;
      case "image":
        ot("error", t), ot("load", t);
        break;
      case "details":
        ot("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        ot("error", t), ot("load", t);
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
        if (Fc(l)) {
          for (z in e)
            e.hasOwnProperty(z) && (a = e[z], a !== void 0 && qf(
              t,
              l,
              z,
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
  function u0(t, l, e, a) {
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
        var n = null, u = null, c = null, i = null, o = null, p = null, z = null;
        for (_ in e) {
          var R = e[_];
          if (e.hasOwnProperty(_) && R != null)
            switch (_) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                o = R;
              default:
                a.hasOwnProperty(_) || Ot(t, l, _, null, a, R);
            }
        }
        for (var E in a) {
          var _ = a[E];
          if (R = e[E], a.hasOwnProperty(E) && (_ != null || R != null))
            switch (E) {
              case "type":
                u = _;
                break;
              case "name":
                n = _;
                break;
              case "checked":
                p = _;
                break;
              case "defaultChecked":
                z = _;
                break;
              case "value":
                c = _;
                break;
              case "defaultValue":
                i = _;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (_ != null)
                  throw Error(r(137, l));
                break;
              default:
                _ !== R && Ot(
                  t,
                  l,
                  E,
                  _,
                  a,
                  R
                );
            }
        }
        Ka(
          t,
          c,
          i,
          o,
          p,
          z,
          u,
          n
        );
        return;
      case "select":
        _ = c = i = E = null;
        for (u in e)
          if (o = e[u], e.hasOwnProperty(u) && o != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                _ = o;
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
        l = i, e = c, a = _, E != null ? We(t, !!e, E, !1) : !!a != !!e && (l != null ? We(t, !!e, l, !0) : We(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        _ = E = null;
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
                _ = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(r(91));
                break;
              default:
                n !== u && Ot(t, l, c, n, a, u);
            }
        As(t, E, _);
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
          if (E = a[o], _ = e[o], a.hasOwnProperty(o) && E !== _ && (E != null || _ != null))
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
                  _
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
        for (var W in e)
          E = e[W], e.hasOwnProperty(W) && E != null && !a.hasOwnProperty(W) && Ot(t, l, W, null, a, E);
        for (p in a)
          if (E = a[p], _ = e[p], a.hasOwnProperty(p) && E !== _ && (E != null || _ != null))
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
                  _
                );
            }
        return;
      default:
        if (Fc(l)) {
          for (var jt in e)
            E = e[jt], e.hasOwnProperty(jt) && E !== void 0 && !a.hasOwnProperty(jt) && qf(
              t,
              l,
              jt,
              void 0,
              a,
              E
            );
          for (z in a)
            E = a[z], _ = e[z], !a.hasOwnProperty(z) || E === _ || E === void 0 && _ === void 0 || qf(
              t,
              l,
              z,
              E,
              a,
              _
            );
          return;
        }
    }
    for (var g in e)
      E = e[g], e.hasOwnProperty(g) && E != null && !a.hasOwnProperty(g) && Ot(t, l, g, null, a, E);
    for (R in a)
      E = a[R], _ = e[R], !a.hasOwnProperty(R) || E === _ || E == null && _ == null || Ot(t, l, R, E, a, _);
  }
  function Rd(t) {
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
  function c0() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, l = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var n = e[a], u = n.transferSize, c = n.initiatorType, i = n.duration;
        if (u && i && Rd(c)) {
          for (c = 0, i = n.responseEnd, a += 1; a < e.length; a++) {
            var o = e[a], p = o.startTime;
            if (p > i) break;
            var z = o.transferSize, R = o.initiatorType;
            z && Rd(R) && (o = o.responseEnd, c += z * (o < i ? 1 : (i - p) / (o - p)));
          }
          if (--a, l += 8 * (u + c) / (n.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Yf = null, wf = null;
  function Rc(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Md(t) {
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
  function Xf(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var Gf = null;
  function i0() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Gf ? !1 : (Gf = t, !0) : (Gf = null, !1);
  }
  var jd = typeof setTimeout == "function" ? setTimeout : void 0, f0 = typeof clearTimeout == "function" ? clearTimeout : void 0, Dd = typeof Promise == "function" ? Promise : void 0, s0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Dd < "u" ? function(t) {
    return Dd.resolve(null).then(t).catch(r0);
  } : jd;
  function r0(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function ha(t) {
    return t === "head";
  }
  function Ud(t, l) {
    var e = l, a = 0;
    do {
      var n = e.nextSibling;
      if (t.removeChild(e), n && n.nodeType === 8)
        if (e = n.data, e === "/$" || e === "/&") {
          if (a === 0) {
            t.removeChild(n), Tn(l);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          yu(t.ownerDocument.documentElement);
        else if (e === "head") {
          e = t.ownerDocument.head, yu(e);
          for (var u = e.firstChild; u; ) {
            var c = u.nextSibling, i = u.nodeName;
            u[za] || i === "SCRIPT" || i === "STYLE" || i === "LINK" && u.rel.toLowerCase() === "stylesheet" || e.removeChild(u), u = c;
          }
        } else
          e === "body" && yu(t.ownerDocument.body);
      e = n;
    } while (e);
    Tn(l);
  }
  function Ld(t, l) {
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
  function Qf(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var e = l;
      switch (l = l.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Qf(e), jn(e);
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
  function o0(t, l, e, a) {
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
  function d0(t, l, e) {
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
  function Vf(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Zf(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function m0(t, l) {
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
  var Kf = null;
  function Bd(t) {
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
  function qd(t) {
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
  function Yd(t, l, e) {
    switch (l = Rc(e), t) {
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
  function yu(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    jn(t);
  }
  var Il = /* @__PURE__ */ new Map(), wd = /* @__PURE__ */ new Set();
  function Mc(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Ge = H.d;
  H.d = {
    f: h0,
    r: y0,
    D: v0,
    C: g0,
    L: b0,
    m: S0,
    X: E0,
    S: p0,
    M: N0
  };
  function h0() {
    var t = Ge.f(), l = Ec();
    return t || l;
  }
  function y0(t) {
    var l = y(t);
    l !== null && l.tag === 5 && l.type === "form" ? eo(l) : Ge.r(t);
  }
  var Nn = typeof document > "u" ? null : document;
  function Xd(t, l, e) {
    var a = Nn;
    if (a && typeof l == "string" && l) {
      var n = _l(l);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof e == "string" && (n += '[crossorigin="' + e + '"]'), wd.has(n) || (wd.add(n), t = { rel: t, crossOrigin: e, href: l }, a.querySelector(n) === null && (l = a.createElement("link"), dl(l, "link", t), O(l), a.head.appendChild(l)));
    }
  }
  function v0(t) {
    Ge.D(t), Xd("dns-prefetch", t, null);
  }
  function g0(t, l) {
    Ge.C(t, l), Xd("preconnect", t, l);
  }
  function b0(t, l, e) {
    Ge.L(t, l, e);
    var a = Nn;
    if (a && t && l) {
      var n = 'link[rel="preload"][as="' + _l(l) + '"]';
      l === "image" && e && e.imageSrcSet ? (n += '[imagesrcset="' + _l(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (n += '[imagesizes="' + _l(
        e.imageSizes
      ) + '"]')) : n += '[href="' + _l(t) + '"]';
      var u = n;
      switch (l) {
        case "style":
          u = _n(t);
          break;
        case "script":
          u = An(t);
      }
      Il.has(u) || (t = Y(
        {
          rel: "preload",
          href: l === "image" && e && e.imageSrcSet ? void 0 : t,
          as: l
        },
        e
      ), Il.set(u, t), a.querySelector(n) !== null || l === "style" && a.querySelector(vu(u)) || l === "script" && a.querySelector(gu(u)) || (l = a.createElement("link"), dl(l, "link", t), O(l), a.head.appendChild(l)));
    }
  }
  function S0(t, l) {
    Ge.m(t, l);
    var e = Nn;
    if (e && t) {
      var a = l && typeof l.as == "string" ? l.as : "script", n = 'link[rel="modulepreload"][as="' + _l(a) + '"][href="' + _l(t) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = An(t);
      }
      if (!Il.has(u) && (t = Y({ rel: "modulepreload", href: t }, l), Il.set(u, t), e.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(gu(u)))
              return;
        }
        a = e.createElement("link"), dl(a, "link", t), O(a), e.head.appendChild(a);
      }
    }
  }
  function p0(t, l, e) {
    Ge.S(t, l, e);
    var a = Nn;
    if (a && t) {
      var n = M(a).hoistableStyles, u = _n(t);
      l = l || "default";
      var c = n.get(u);
      if (!c) {
        var i = { loading: 0, preload: null };
        if (c = a.querySelector(
          vu(u)
        ))
          i.loading = 5;
        else {
          t = Y(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = Il.get(u)) && kf(t, e);
          var o = c = a.createElement("link");
          O(o), dl(o, "link", t), o._p = new Promise(function(p, z) {
            o.onload = p, o.onerror = z;
          }), o.addEventListener("load", function() {
            i.loading |= 1;
          }), o.addEventListener("error", function() {
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
  function E0(t, l) {
    Ge.X(t, l);
    var e = Nn;
    if (e && t) {
      var a = M(e).hoistableScripts, n = An(t), u = a.get(n);
      u || (u = e.querySelector(gu(n)), u || (t = Y({ src: t, async: !0 }, l), (l = Il.get(n)) && Jf(t, l), u = e.createElement("script"), O(u), dl(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function N0(t, l) {
    Ge.M(t, l);
    var e = Nn;
    if (e && t) {
      var a = M(e).hoistableScripts, n = An(t), u = a.get(n);
      u || (u = e.querySelector(gu(n)), u || (t = Y({ src: t, async: !0, type: "module" }, l), (l = Il.get(n)) && Jf(t, l), u = e.createElement("script"), O(u), dl(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function Gd(t, l, e, a) {
    var n = (n = G.current) ? Mc(n) : null;
    if (!n) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (l = _n(e.href), e = M(
          n
        ).hoistableStyles, a = e.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          t = _n(e.href);
          var u = M(
            n
          ).hoistableStyles, c = u.get(t);
          if (c || (n = n.ownerDocument || n, c = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, c), (u = n.querySelector(
            vu(t)
          )) && !u._p && (c.instance = u, c.state.loading = 5), Il.has(t) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Il.set(t, e), u || _0(
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
        return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (l = An(e), e = M(
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
  function _n(t) {
    return 'href="' + _l(t) + '"';
  }
  function vu(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Qd(t) {
    return Y({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function _0(t, l, e, a) {
    t.querySelector('link[rel="preload"][as="style"][' + l + "]") ? a.loading = 1 : (l = t.createElement("link"), a.preload = l, l.addEventListener("load", function() {
      return a.loading |= 1;
    }), l.addEventListener("error", function() {
      return a.loading |= 2;
    }), dl(l, "link", e), O(l), t.head.appendChild(l));
  }
  function An(t) {
    return '[src="' + _l(t) + '"]';
  }
  function gu(t) {
    return "script[async]" + t;
  }
  function Vd(t, l, e) {
    if (l.count++, l.instance === null)
      switch (l.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + _l(e.href) + '"]'
          );
          if (a)
            return l.instance = a, O(a), a;
          var n = Y({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), O(a), dl(a, "style", n), Oc(a, e.precedence, t), l.instance = a;
        case "stylesheet":
          n = _n(e.href);
          var u = t.querySelector(
            vu(n)
          );
          if (u)
            return l.state.loading |= 4, l.instance = u, O(u), u;
          a = Qd(e), (n = Il.get(n)) && kf(a, n), u = (t.ownerDocument || t).createElement("link"), O(u);
          var c = u;
          return c._p = new Promise(function(i, o) {
            c.onload = i, c.onerror = o;
          }), dl(u, "link", a), l.state.loading |= 4, Oc(u, e.precedence, t), l.instance = u;
        case "script":
          return u = An(e.src), (n = t.querySelector(
            gu(u)
          )) ? (l.instance = n, O(n), n) : (a = e, (n = Il.get(u)) && (a = Y({}, e), Jf(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), O(n), dl(n, "link", a), t.head.appendChild(n), l.instance = n);
        case "void":
          return null;
        default:
          throw Error(r(443, l.type));
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
  function Jf(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var jc = null;
  function Zd(t, l, e) {
    if (jc === null) {
      var a = /* @__PURE__ */ new Map(), n = jc = /* @__PURE__ */ new Map();
      n.set(e, a);
    } else
      n = jc, a = n.get(e), a || (a = /* @__PURE__ */ new Map(), n.set(e, a));
    if (a.has(t)) return a;
    for (a.set(t, null), e = e.getElementsByTagName(t), n = 0; n < e.length; n++) {
      var u = e[n];
      if (!(u[za] || u[$t] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var c = u.getAttribute(l) || "";
        c = t + c;
        var i = a.get(c);
        i ? i.push(u) : a.set(c, [u]);
      }
    }
    return a;
  }
  function Kd(t, l, e) {
    t = t.ownerDocument || t, t.head.insertBefore(
      e,
      l === "title" ? t.querySelector("head > title") : null
    );
  }
  function A0(t, l, e) {
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
  function kd(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function T0(t, l, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var n = _n(a.href), u = l.querySelector(
          vu(n)
        );
        if (u) {
          l = u._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = Dc.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = u, O(u);
          return;
        }
        u = l.ownerDocument || l, a = Qd(a), (n = Il.get(n)) && kf(a, n), u = u.createElement("link"), O(u);
        var c = u;
        c._p = new Promise(function(i, o) {
          c.onload = i, c.onerror = o;
        }), dl(u, "link", a), e.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = Dc.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var $f = 0;
  function z0(t, l) {
    return t.stylesheets && t.count === 0 && Lc(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (t.stylesheets && Lc(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + l);
      0 < t.imgBytes && $f === 0 && ($f = 62500 * c0());
      var n = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Lc(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > $f ? 50 : 800) + l
      );
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function Dc() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Lc(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Uc = null;
  function Lc(t, l) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Uc = /* @__PURE__ */ new Map(), l.forEach(x0, t), Uc = null, Dc.call(t));
  }
  function x0(t, l) {
    if (!(l.state.loading & 4)) {
      var e = Uc.get(t);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), Uc.set(t, e);
        for (var n = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var c = n[u];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (e.set(c.dataset.precedence, c), a = c);
        }
        a && e.set(null, a);
      }
      n = l.instance, c = n.getAttribute("data-precedence"), u = e.get(c) || a, u === a && e.set(null, n), e.set(c, n), this.count++, a = Dc.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), l.state.loading |= 4;
    }
  }
  var bu = {
    $$typeof: Lt,
    Provider: null,
    Consumer: null,
    _currentValue: $,
    _currentValue2: $,
    _threadCount: 0
  };
  function C0(t, l, e, a, n, u, c, i, o) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ze(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ze(0), this.hiddenUpdates = Ze(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = o, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Jd(t, l, e, a, n, u, c, i, o, p, z, R) {
    return t = new C0(
      t,
      l,
      e,
      c,
      o,
      p,
      z,
      R,
      i
    ), l = 1, u === !0 && (l |= 24), u = ql(3, null, null, l), t.current = u, u.stateNode = t, l = xi(), l.refCount++, t.pooledCache = l, l.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: l
    }, Oi(u), t;
  }
  function $d(t) {
    return t ? (t = tn, t) : tn;
  }
  function Wd(t, l, e, a, n, u) {
    n = $d(n), a.context === null ? a.context = n : a.pendingContext = n, a = aa(l), a.payload = { element: e }, u = u === void 0 ? null : u, u !== null && (a.callback = u), e = na(t, a, l), e !== null && (Ol(e, t, l), Wn(e, t, l));
  }
  function Fd(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function Wf(t, l) {
    Fd(t, l), (t = t.alternate) && Fd(t, l);
  }
  function Id(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = Ma(t, 67108864);
      l !== null && Ol(l, t, 67108864), Wf(t, 67108864);
    }
  }
  function Pd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = Ql();
      l = Rn(l);
      var e = Ma(t, l);
      e !== null && Ol(e, t, l), Wf(t, l);
    }
  }
  var Hc = !0;
  function R0(t, l, e, a) {
    var n = A.T;
    A.T = null;
    var u = H.p;
    try {
      H.p = 2, Ff(t, l, e, a);
    } finally {
      H.p = u, A.T = n;
    }
  }
  function M0(t, l, e, a) {
    var n = A.T;
    A.T = null;
    var u = H.p;
    try {
      H.p = 8, Ff(t, l, e, a);
    } finally {
      H.p = u, A.T = n;
    }
  }
  function Ff(t, l, e, a) {
    if (Hc) {
      var n = If(a);
      if (n === null)
        Bf(
          t,
          l,
          a,
          Bc,
          e
        ), lm(t, a);
      else if (j0(
        n,
        t,
        l,
        e,
        a
      ))
        a.stopPropagation();
      else if (lm(t, a), l & 4 && -1 < O0.indexOf(t)) {
        for (; n !== null; ) {
          var u = y(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var c = de(u.pendingLanes);
                  if (c !== 0) {
                    var i = u;
                    for (i.pendingLanes |= 2, i.entangledLanes |= 2; c; ) {
                      var o = 1 << 31 - hl(c);
                      i.entanglements[1] |= o, c &= ~o;
                    }
                    be(u), (Nt & 6) === 0 && (Sc = Xt() + 500, du(0));
                  }
                }
                break;
              case 31:
              case 13:
                i = Ma(u, 2), i !== null && Ol(i, u, 2), Ec(), Wf(u, 2);
            }
          if (u = If(a), u === null && Bf(
            t,
            l,
            a,
            Bc,
            e
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        Bf(
          t,
          l,
          a,
          null,
          e
        );
    }
  }
  function If(t) {
    return t = Pc(t), Pf(t);
  }
  var Bc = null;
  function Pf(t) {
    if (Bc = null, t = Je(t), t !== null) {
      var l = L(t);
      if (l === null) t = null;
      else {
        var e = l.tag;
        if (e === 13) {
          if (t = K(l), t !== null) return t;
          t = null;
        } else if (e === 31) {
          if (t = Z(l), t !== null) return t;
          t = null;
        } else if (e === 3) {
          if (l.stateNode.current.memoizedState.isDehydrated)
            return l.tag === 3 ? l.stateNode.containerInfo : null;
          t = null;
        } else l !== t && (t = null);
      }
    }
    return Bc = t, null;
  }
  function tm(t) {
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
        switch (Ne()) {
          case _e:
            return 2;
          case se:
            return 8;
          case Ae:
          case Tl:
            return 32;
          case ml:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ts = !1, ya = null, va = null, ga = null, Su = /* @__PURE__ */ new Map(), pu = /* @__PURE__ */ new Map(), ba = [], O0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function lm(t, l) {
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
        Su.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        pu.delete(l.pointerId);
    }
  }
  function Eu(t, l, e, a, n, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: l,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, l !== null && (l = y(l), l !== null && Id(l)), t) : (t.eventSystemFlags |= a, l = t.targetContainers, n !== null && l.indexOf(n) === -1 && l.push(n), t);
  }
  function j0(t, l, e, a, n) {
    switch (l) {
      case "focusin":
        return ya = Eu(
          ya,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "dragenter":
        return va = Eu(
          va,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "mouseover":
        return ga = Eu(
          ga,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return Su.set(
          u,
          Eu(
            Su.get(u) || null,
            t,
            l,
            e,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, pu.set(
          u,
          Eu(
            pu.get(u) || null,
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
  function em(t) {
    var l = Je(t.target);
    if (l !== null) {
      var e = L(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = K(e), l !== null) {
            t.blockedOn = l, Ru(t.priority, function() {
              Pd(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = Z(e), l !== null) {
            t.blockedOn = l, Ru(t.priority, function() {
              Pd(e);
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
  function qc(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var e = If(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        Ic = a, e.target.dispatchEvent(a), Ic = null;
      } else
        return l = y(e), l !== null && Id(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function am(t, l, e) {
    qc(t) && e.delete(l);
  }
  function D0() {
    ts = !1, ya !== null && qc(ya) && (ya = null), va !== null && qc(va) && (va = null), ga !== null && qc(ga) && (ga = null), Su.forEach(am), pu.forEach(am);
  }
  function Yc(t, l) {
    t.blockedOn === l && (t.blockedOn = null, ts || (ts = !0, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      D0
    )));
  }
  var wc = null;
  function nm(t) {
    wc !== t && (wc = t, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      function() {
        wc === t && (wc = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l], a = t[l + 1], n = t[l + 2];
          if (typeof a != "function") {
            if (Pf(a || e) === null)
              continue;
            break;
          }
          var u = y(e);
          u !== null && (t.splice(l, 3), l -= 3, Fi(
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
  function Tn(t) {
    function l(o) {
      return Yc(o, t);
    }
    ya !== null && Yc(ya, t), va !== null && Yc(va, t), ga !== null && Yc(ga, t), Su.forEach(l), pu.forEach(l);
    for (var e = 0; e < ba.length; e++) {
      var a = ba[e];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < ba.length && (e = ba[0], e.blockedOn === null); )
      em(e), e.blockedOn === null && ba.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var n = e[a], u = e[a + 1], c = n[yl] || null;
        if (typeof u == "function")
          c || nm(e);
        else if (c) {
          var i = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, c = u[yl] || null)
              i = c.formAction;
            else if (Pf(n) !== null) continue;
          } else i = c.action;
          typeof i == "function" ? e[a + 1] = i : (e.splice(a, 3), a -= 3), nm(e);
        }
      }
  }
  function um() {
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
  function ls(t) {
    this._internalRoot = t;
  }
  Xc.prototype.render = ls.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(r(409));
    var e = l.current, a = Ql();
    Wd(e, a, t, l, null, null);
  }, Xc.prototype.unmount = ls.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      Wd(t.current, 2, null, t, null, null), Ec(), l[ke] = null;
    }
  };
  function Xc(t) {
    this._internalRoot = t;
  }
  Xc.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = Cu();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < ba.length && l !== 0 && l < ba[e].priority; e++) ;
      ba.splice(e, 0, t), e === 0 && em(t);
    }
  };
  var cm = d.version;
  if (cm !== "19.2.4")
    throw Error(
      r(
        527,
        cm,
        "19.2.4"
      )
    );
  H.findDOMNode = function(t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function" ? Error(r(188)) : (t = Object.keys(t).join(","), Error(r(268, t)));
    return t = x(l), t = t !== null ? X(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var U0 = {
    bundleType: 0,
    version: "19.2.4",
    rendererPackageName: "react-dom",
    currentDispatcherRef: A,
    reconcilerVersion: "19.2.4"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Gc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Gc.isDisabled && Gc.supportsFiber)
      try {
        El = Gc.inject(
          U0
        ), et = Gc;
      } catch {
      }
  }
  return _u.createRoot = function(t, l) {
    if (!j(t)) throw Error(r(299));
    var e = !1, a = "", n = mo, u = ho, c = yo;
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
      um
    ), t[ke] = l.current, Hf(t), new ls(l);
  }, _u.hydrateRoot = function(t, l, e) {
    if (!j(t)) throw Error(r(299));
    var a = !1, n = "", u = mo, c = ho, i = yo, o = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (c = e.onCaughtError), e.onRecoverableError !== void 0 && (i = e.onRecoverableError), e.formState !== void 0 && (o = e.formState)), l = Jd(
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
      um
    ), l.context = $d(null), e = l.current, a = Ql(), a = Rn(a), n = aa(a), n.callback = null, na(e, n, a), e = a, l.current.lanes = e, me(l, e), be(l), t[ke] = l.current, Hf(t), new Xc(l);
  }, _u.version = "19.2.4", _u;
}
var vm;
function V0() {
  if (vm) return as.exports;
  vm = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (d) {
        console.error(d);
      }
  }
  return f(), as.exports = Q0(), as.exports;
}
var Z0 = V0(), T = Ns();
function K0(f, d = 760) {
  const v = Number(f), r = Number.isFinite(v) ? v : Number.NaN, [j, L] = T.useState(r), K = T.useRef(r), Z = T.useRef(0);
  return T.useEffect(() => {
    const U = Number(f);
    if (!Number.isFinite(U)) {
      K.current = Number.NaN, L(Number.NaN);
      return;
    }
    const x = K.current;
    if (K.current = U, !Number.isFinite(x) || Math.abs(x - U) < 1e-9) {
      L(U);
      return;
    }
    const X = performance.now(), Y = (zt) => 1 - Math.pow(1 - zt, 3), I = (zt) => {
      const xt = zt - X, dt = Math.min(1, xt / d), Yt = Y(dt), k = x + (U - x) * Yt;
      L(k), dt < 1 && (Z.current = window.requestAnimationFrame(I));
    };
    return Z.current = window.requestAnimationFrame(I), () => {
      Z.current && window.cancelAnimationFrame(Z.current);
    };
  }, [f, d]), j;
}
const _s = ["workspace", "positions", "reports"], gm = "tf.nav.active", bm = "tf.sidebar.collapsed", Sm = "tf.theme", pm = {
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
}, Au = {
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
}, k0 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}), J0 = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});
async function Se(f, d = {}) {
  const v = await fetch(f, {
    headers: { "Content-Type": "application/json" },
    ...d
  }), r = await v.json();
  if (!v.ok || r.ok === !1)
    throw new Error(r.error || `HTTP ${v.status}`);
  return r;
}
function fs(f, d) {
  try {
    const v = window.localStorage.getItem(f);
    return v ?? d;
  } catch {
    return d;
  }
}
function ss(f, d) {
  try {
    window.localStorage.setItem(f, d);
  } catch {
  }
}
function Qc(f) {
  const d = String(f || "").replace(/^#/, "").trim();
  return _s.includes(d) ? d : "workspace";
}
function zm(f) {
  return String(f || "").trim().toLowerCase() === "dark" ? "dark" : "light";
}
function $0(f) {
  return zm(f) === "dark" ? { theme: "dark", toolbarbg: "#0f1720" } : { theme: "light", toolbarbg: "#f5f7fa" };
}
function rs(f, d) {
  try {
    const v = new URL(f), r = $0(d);
    return v.searchParams.set("theme", r.theme), v.searchParams.set("toolbarbg", r.toolbarbg), v.toString();
  } catch {
    return f;
  }
}
function W0(f) {
  return String(f || "").toUpperCase().startsWith("KRX:");
}
function Pl(f, d) {
  if (f == null || Number.isNaN(Number(f))) return "-";
  const v = Number(f);
  return d === "KRW" ? J0.format(v) : k0.format(v);
}
function bs(f, d) {
  const v = Number(f || 0);
  return Number.isFinite(v) ? v === 0 ? Pl(0, d) : `${v > 0 ? "+" : "-"}${Pl(Math.abs(v), d)}` : "-";
}
function Zc(f) {
  return f === "kr" ? "KRW" : "USD";
}
function Ss(f) {
  const d = Number(f || 0);
  return !Number.isFinite(d) || d === 0 ? "" : d > 0 ? "positive" : "negative";
}
function ps(f) {
  const d = Number(f || 0);
  return Number.isFinite(d) ? d.toLocaleString(void 0, { maximumFractionDigits: 0 }) : "-";
}
function Es(f) {
  if (!f) return "-";
  const d = new Date(f);
  return Number.isNaN(d.getTime()) ? String(f) : d.toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !1
  });
}
function F0(f) {
  return f === "kr" ? "한국" : "미국";
}
function I0(f) {
  return f === "BUY" ? "매수" : f === "SELL" ? "매도" : f || "-";
}
function Tu(f) {
  return String(f || "").toUpperCase().replace(/^KRX:/, "").replace(".KS", "").replace(".KQ", "").trim();
}
function P0(f) {
  const d = Tu(f), v = Au[d];
  return d ? v ? `${v} (${d})` : `한국주식 (${d})` : String(f || "-");
}
function kc(f, d) {
  return f === "kr" ? P0(d) : String(d || "-").toUpperCase();
}
function ty(f, d) {
  if (f === "kr") {
    const v = Tu(d);
    return `KR ${Au[v] || v}`;
  }
  return `US ${String(d || "").toUpperCase()}`;
}
function ly(f) {
  const d = String(f || "").trim();
  if (!d) return d;
  const v = Object.entries(Au).find(([, j]) => j === d);
  if (v) return v[0];
  const r = Object.entries(Au).find(([, j]) => j.includes(d));
  return r ? r[0] : d;
}
function ey(f, d) {
  const v = String(d || "").toUpperCase();
  return f === "kr" ? `KRX:${Tu(v)}` : v === "BRK-B" ? "NYSE:BRK.B" : v.includes(":") ? v : `NASDAQ:${v}`;
}
function ay(f, d) {
  const v = String(f || "").toLowerCase().trim(), r = String(d || "").trim();
  return !v || !r ? "" : `/api/logo?${new URLSearchParams({
    market: v,
    symbol: r,
    size: "128"
  }).toString()}`;
}
function ny(f, d) {
  const v = String(f || d || "").replace(/\([^)]*\)/g, "").replace(/[^0-9A-Za-z가-힣]/g, "");
  return v ? v.slice(0, 1).toUpperCase() : "•";
}
function uy(f) {
  const d = Number(f == null ? void 0 : f.price);
  return Number.isFinite(d) ? String((f == null ? void 0 : f.id) || "") === "usdkrw" ? d.toLocaleString("ko-KR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : d.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : "-";
}
function cy(f, d) {
  const v = Number(d);
  if (!Number.isFinite(v)) return "-";
  const j = String((f == null ? void 0 : f.id) || "") === "usdkrw" ? "ko-KR" : "en-US";
  return v.toLocaleString(j, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
function Em(f, d = 2) {
  const v = Number(f);
  return Number.isFinite(v) ? `${v > 0 ? "+" : ""}${v.toLocaleString("en-US", {
    minimumFractionDigits: d,
    maximumFractionDigits: d
  })}` : "-";
}
function iy(f, d = 112, v = 34, r = 2) {
  const j = (f || []).map((k) => Number(k)).filter((k) => Number.isFinite(k));
  if (!j.length || j.length === 1) {
    const k = Math.round(v / 2);
    return {
      linePath: `M0 ${k} L${d} ${k}`,
      areaPath: `M0 ${k} L${d} ${k} L${d} ${v} L0 ${v} Z`
    };
  }
  const L = Math.min(...j), K = Math.max(...j), Z = K - L || 1, U = Math.max(1, d - r * 2), x = Math.max(1, v - r * 2), X = U / (j.length - 1), Y = j.map((k, P) => {
    const Lt = r + X * P, _t = r + (K - k) / Z * x;
    return {
      x: Number.isFinite(Lt) ? Lt : 0,
      y: Number.isFinite(_t) ? _t : v / 2
    };
  }), I = Y.map((k, P) => `${P === 0 ? "M" : "L"}${k.x.toFixed(2)} ${k.y.toFixed(2)}`).join(" "), zt = Y[0], xt = Y[Y.length - 1], dt = v - 1, Yt = `${I} L${xt.x.toFixed(2)} ${dt} L${zt.x.toFixed(2)} ${dt} Z`;
  return { linePath: I, areaPath: Yt };
}
function fy(f) {
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
function sy(f) {
  const d = String(f || "").trim().toLowerCase();
  return d === "live" ? "live" : d === "holiday" ? "holiday" : d === "closed" ? "closed" : d === "delayed" ? "delayed" : "";
}
function os({ item: f, field: d }) {
  const r = Number(d === "change_pct_abs" ? f == null ? void 0 : f.change_pct : f == null ? void 0 : f[d]), j = K0(r, 760);
  return Number.isFinite(r) ? d === "price" ? cy(f, j) : d === "change" ? Em(j, 2) : d === "change_pct" ? `${Em(j, 2)}%` : d === "change_pct_abs" ? `${Math.abs(j).toFixed(2)}%` : String(j) : d === "price" ? "-" : "";
}
function ry({ item: f, index: d, onSelectItem: v }) {
  const r = String((f == null ? void 0 : f.direction) || "flat"), j = r === "up" ? "up" : r === "down" ? "down" : "flat", L = Number.isFinite(Number(f == null ? void 0 : f.change)) && Number.isFinite(Number(f == null ? void 0 : f.change_pct)), K = j === "up" ? "▲" : j === "down" ? "▼" : "•", Z = typeof v == "function", U = T.useMemo(() => iy((f == null ? void 0 : f.sparkline) || []), [f == null ? void 0 : f.sparkline]), x = T.useMemo(() => fy(j), [j]), X = T.useMemo(
    () => `macroGrad-${String((f == null ? void 0 : f.id) || d).replace(/[^A-Za-z0-9_-]/g, "")}-${d}`,
    [f == null ? void 0 : f.id, d]
  ), Y = String((f == null ? void 0 : f.session_label) || "").trim(), I = sy(f == null ? void 0 : f.session_status), zt = () => {
    Z && v(f);
  }, xt = (dt) => {
    Z && (dt.key === "Enter" || dt.key === " ") && (dt.preventDefault(), v(f));
  };
  return /* @__PURE__ */ s.jsxs(
    "article",
    {
      className: `macro-card ${j}${Z ? " interactive" : ""}`,
      role: Z ? "button" : void 0,
      tabIndex: Z ? 0 : void 0,
      onClick: Z ? zt : void 0,
      onKeyDown: Z ? xt : void 0,
      "aria-label": Z ? `${String((f == null ? void 0 : f.label) || "")} 차트 보기` : void 0,
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "macro-spark", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 112 34", preserveAspectRatio: "none", "aria-hidden": "true", children: [
          /* @__PURE__ */ s.jsx("defs", { children: /* @__PURE__ */ s.jsxs("linearGradient", { id: X, x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ s.jsx("stop", { offset: "0%", stopColor: x.top }),
            /* @__PURE__ */ s.jsx("stop", { offset: "100%", stopColor: x.bottom })
          ] }) }),
          /* @__PURE__ */ s.jsx("path", { className: "macro-area", d: U.areaPath, fill: `url(#${X})` }),
          /* @__PURE__ */ s.jsx("path", { className: "macro-line", d: U.linePath })
        ] }) }),
        /* @__PURE__ */ s.jsxs("div", { className: "macro-main", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "macro-head", children: [
            /* @__PURE__ */ s.jsx("span", { className: "macro-label", children: String((f == null ? void 0 : f.label) || "-") }),
            Y ? /* @__PURE__ */ s.jsx("span", { className: `macro-badge ${I}`, children: Y }) : null
          ] }),
          /* @__PURE__ */ s.jsx("strong", { className: "macro-price", children: /* @__PURE__ */ s.jsx("span", { className: "macro-num macro-price-num", "data-indicator-id": (f == null ? void 0 : f.id) || "", "data-field": "price", children: Number.isFinite(Number(f == null ? void 0 : f.price)) ? /* @__PURE__ */ s.jsx(os, { item: f, field: "price" }) : uy(f) }) }),
          L ? /* @__PURE__ */ s.jsxs("p", { className: "macro-change", children: [
            /* @__PURE__ */ s.jsx("span", { className: "macro-num macro-change-value", "data-indicator-id": (f == null ? void 0 : f.id) || "", "data-field": "change", children: /* @__PURE__ */ s.jsx(os, { item: f, field: "change" }) }),
            /* @__PURE__ */ s.jsxs("span", { className: `macro-change-pill ${j}`, children: [
              /* @__PURE__ */ s.jsx("span", { className: "macro-change-pill-icon", "aria-hidden": "true", children: K }),
              /* @__PURE__ */ s.jsx("span", { className: "macro-num macro-change-pct", "data-indicator-id": (f == null ? void 0 : f.id) || "", "data-field": "change_pct", children: /* @__PURE__ */ s.jsx(os, { item: f, field: "change_pct_abs" }) })
            ] })
          ] }) : /* @__PURE__ */ s.jsx("p", { className: "macro-change macro-change-empty", children: "변동 정보 없음" })
        ] })
      ]
    }
  );
}
function oy({ index: f }) {
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
const dy = 8;
function my({ items: f, loading: d = !1, onSelectItem: v }) {
  return d && !(f != null && f.length) ? /* @__PURE__ */ s.jsx(s.Fragment, { children: Array.from({ length: dy }).map((r, j) => /* @__PURE__ */ s.jsx(oy, { index: j }, `macro-skeleton-${j}`)) }) : f != null && f.length ? /* @__PURE__ */ s.jsx(s.Fragment, { children: f.map((r, j) => /* @__PURE__ */ s.jsx(
    ry,
    {
      item: r,
      index: j,
      onSelectItem: v
    },
    (r == null ? void 0 : r.id) || `${(r == null ? void 0 : r.label) || "item"}-${j}`
  )) }) : /* @__PURE__ */ s.jsx("div", { className: "macro-empty", children: "핵심 지표를 불러오지 못했습니다." });
}
function hy({ overview: f, totals: d }) {
  const v = (f == null ? void 0 : f.metrics) || {}, r = Number((d == null ? void 0 : d.usdkrw) || 0), j = d != null && d.fx_stale ? "지연" : "실시간", L = [
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
      value: r > 0 ? r.toLocaleString(void 0, { maximumFractionDigits: 2 }) : "-",
      delta: r > 0 ? j : "미수신",
      tone: d != null && d.fx_stale ? "down" : "up"
    },
    {
      label: "총 자산(USD)",
      value: Pl(d == null ? void 0 : d.total_usd_est, "USD"),
      delta: "실데이터",
      tone: "neutral"
    }
  ];
  return /* @__PURE__ */ s.jsx(s.Fragment, { children: L.map((K) => {
    const Z = K.tone === "up" ? "up" : K.tone === "down" ? "down" : "";
    return /* @__PURE__ */ s.jsxs("span", { className: "market-chip", children: [
      /* @__PURE__ */ s.jsx("span", { children: K.label }),
      /* @__PURE__ */ s.jsx("b", { children: K.value }),
      /* @__PURE__ */ s.jsx("em", { className: Z, children: K.delta })
    ] }, K.label);
  }) });
}
const xm = {
  workspace: "워크스페이스",
  positions: "포지션",
  reports: "리포트"
};
function yy({ activeNav: f, onChangeNav: d }) {
  return /* @__PURE__ */ s.jsxs("aside", { id: "sidebarNav", className: "sidebar-nav", children: [
    /* @__PURE__ */ s.jsx("p", { className: "sidebar-title", children: "메뉴" }),
    /* @__PURE__ */ s.jsx("nav", { className: "sidebar-menu", "aria-label": "주요 메뉴", children: _s.map((v) => /* @__PURE__ */ s.jsx(
      "button",
      {
        type: "button",
        "data-nav": v,
        className: `nav-link ${f === v ? "active" : ""}`,
        onClick: () => d(v),
        children: xm[v]
      },
      `sidebar-${v}`
    )) })
  ] });
}
function vy({ activeNav: f, onChangeNav: d }) {
  return /* @__PURE__ */ s.jsx("nav", { id: "mobileTabBar", className: "mobile-tabbar", "aria-label": "하단 탭 메뉴", children: _s.map((v) => /* @__PURE__ */ s.jsx(
    "button",
    {
      type: "button",
      "data-nav": v,
      className: f === v ? "active" : "",
      onClick: () => d(v),
      children: xm[v]
    },
    `mobile-${v}`
  )) });
}
function Cm({ market: f, symbol: d, seedLabel: v }) {
  const [r, j] = T.useState(!1), L = T.useMemo(() => ay(f, d), [f, d]), K = T.useMemo(() => ny(v, d), [v, d]);
  return !L || r ? /* @__PURE__ */ s.jsx("span", { className: "stock-icon fallback", children: K }) : /* @__PURE__ */ s.jsx("span", { className: "stock-icon", children: /* @__PURE__ */ s.jsx(
    "img",
    {
      src: L,
      alt: `${v || d || "종목"} 로고`,
      loading: "lazy",
      decoding: "async",
      referrerPolicy: "no-referrer",
      onError: () => j(!0)
    }
  ) });
}
function Jc({ market: f, symbol: d, label: v, iconSeedLabel: r }) {
  return /* @__PURE__ */ s.jsxs("span", { className: "stock-inline", children: [
    /* @__PURE__ */ s.jsx(Cm, { market: f, symbol: d, seedLabel: r || v }),
    /* @__PURE__ */ s.jsx("span", { className: "stock-name", children: v })
  ] });
}
function gy({ active: f, positions: d, recentFills: v, agentExposure: r, onClickPositionSymbol: j }) {
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
        /* @__PURE__ */ s.jsx("tbody", { id: "openPositionRows", children: d != null && d.length ? d.slice(0, 80).map((L, K) => {
          const Z = kc(L.market, L.symbol), U = Zc(L.market);
          return /* @__PURE__ */ s.jsxs("tr", { children: [
            /* @__PURE__ */ s.jsx("td", { children: /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "symbol-link",
                title: Z,
                onClick: () => j(L),
                children: /* @__PURE__ */ s.jsx(Jc, { market: L.market, symbol: L.symbol, label: Z })
              }
            ) }),
            /* @__PURE__ */ s.jsx("td", { children: ps(L.qty) }),
            /* @__PURE__ */ s.jsx("td", { children: Pl(L.notional, U) }),
            /* @__PURE__ */ s.jsx("td", { className: Ss(L.unrealized_pnl), children: bs(L.unrealized_pnl, U) })
          ] }, `${L.market}-${L.symbol}-${K}`);
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
        /* @__PURE__ */ s.jsx("tbody", { id: "recentFillRows", children: v != null && v.length ? v.slice(0, 100).map((L, K) => {
          const Z = Zc(L.market), U = kc(L.market, L.symbol), x = Es(L.ts);
          return /* @__PURE__ */ s.jsxs("tr", { children: [
            /* @__PURE__ */ s.jsx("td", { title: x, children: x }),
            /* @__PURE__ */ s.jsx("td", { title: U, children: /* @__PURE__ */ s.jsx(Jc, { market: L.market, symbol: L.symbol, label: U }) }),
            /* @__PURE__ */ s.jsx("td", { children: I0(L.side) }),
            /* @__PURE__ */ s.jsx("td", { children: ps(L.qty) }),
            /* @__PURE__ */ s.jsx("td", { children: Pl(L.price, Z) })
          ] }, `${L.market}-${L.symbol}-${L.ts || K}`);
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
        /* @__PURE__ */ s.jsx("tbody", { id: "agentExposureRows", children: r != null && r.length ? r.slice(0, 40).map((L, K) => {
          const Z = pm[L.strategy] || pm.unassigned, U = Zc(L.market);
          return /* @__PURE__ */ s.jsxs("tr", { children: [
            /* @__PURE__ */ s.jsx("td", { children: Z.name }),
            /* @__PURE__ */ s.jsx("td", { children: F0(L.market) }),
            /* @__PURE__ */ s.jsx("td", { children: Pl(L.notional, U) }),
            /* @__PURE__ */ s.jsx("td", { className: Ss(L.pnl), children: bs(L.pnl, U) }),
            /* @__PURE__ */ s.jsx("td", { children: Z.style })
          ] }, `${L.strategy}-${L.market}-${K}`);
        }) : /* @__PURE__ */ s.jsx("tr", { children: /* @__PURE__ */ s.jsx("td", { colSpan: 5, children: "데이터 없음" }) }) })
      ] }) })
    ] })
  ] }) });
}
function by({
  active: f,
  reports: d,
  selectedReport: v,
  reportContent: r,
  operationLog: j,
  onChangeReport: L,
  onReloadReport: K
}) {
  return /* @__PURE__ */ s.jsx("section", { id: "view-reports", className: `view-pane ${f ? "active" : ""}`, children: /* @__PURE__ */ s.jsxs("div", { className: "stack-grid", children: [
    /* @__PURE__ */ s.jsxs("section", { className: "module report-module", children: [
      /* @__PURE__ */ s.jsx("h2", { children: "일일 보고서" }),
      /* @__PURE__ */ s.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ s.jsx("select", { id: "reportSelector", value: v, onChange: (Z) => L(Z.target.value), children: d.map((Z) => /* @__PURE__ */ s.jsx("option", { value: Z, children: Z }, Z)) }),
        /* @__PURE__ */ s.jsx("button", { className: "btn", id: "reloadReport", type: "button", onClick: K, children: "불러오기" })
      ] }),
      /* @__PURE__ */ s.jsx("pre", { id: "reportViewer", children: r || "보고서를 불러오는 중..." })
    ] }),
    /* @__PURE__ */ s.jsxs("section", { className: "module log-module", children: [
      /* @__PURE__ */ s.jsx("h2", { children: "운영 로그" }),
      /* @__PURE__ */ s.jsx("pre", { id: "operationLog", children: j || "준비 완료." })
    ] })
  ] }) });
}
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rm = (...f) => f.filter((d, v, r) => !!d && d.trim() !== "" && r.indexOf(d) === v).join(" ").trim();
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sy = (f) => f.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const py = (f) => f.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (d, v, r) => r ? r.toUpperCase() : v.toLowerCase()
);
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nm = (f) => {
  const d = py(f);
  return d.charAt(0).toUpperCase() + d.slice(1);
};
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Ey = {
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
const Ny = (f) => {
  for (const d in f)
    if (d.startsWith("aria-") || d === "role" || d === "title")
      return !0;
  return !1;
};
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _y = T.forwardRef(
  ({
    color: f = "currentColor",
    size: d = 24,
    strokeWidth: v = 2,
    absoluteStrokeWidth: r,
    className: j = "",
    children: L,
    iconNode: K,
    ...Z
  }, U) => T.createElement(
    "svg",
    {
      ref: U,
      ...Ey,
      width: d,
      height: d,
      stroke: f,
      strokeWidth: r ? Number(v) * 24 / Number(d) : v,
      className: Rm("lucide", j),
      ...!L && !Ny(Z) && { "aria-hidden": "true" },
      ...Z
    },
    [
      ...K.map(([x, X]) => T.createElement(x, X)),
      ...Array.isArray(L) ? L : [L]
    ]
  )
);
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pa = (f, d) => {
  const v = T.forwardRef(
    ({ className: r, ...j }, L) => T.createElement(_y, {
      ref: L,
      iconNode: d,
      className: Rm(
        `lucide-${Sy(Nm(f))}`,
        `lucide-${f}`,
        r
      ),
      ...j
    })
  );
  return v.displayName = Nm(f), v;
};
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ay = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], Ty = pa("circle-alert", Ay);
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zy = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], xy = pa("circle-check", zy);
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cy = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 6v6h4", key: "135r8i" }]
], Ry = pa("clock-3", Cy);
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const My = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], Oy = pa("loader-circle", My);
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jy = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
], Dy = pa("menu", jy);
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uy = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
], Ly = pa("moon", Uy);
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hy = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], By = pa("refresh-cw", Hy);
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qy = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], Yy = pa("sun", qy);
function wy({
  theme: f,
  onToggleTheme: d,
  onRefreshAll: v,
  sidebarCollapsed: r,
  onToggleSidebar: j
}) {
  const L = f === "dark", [K, Z] = T.useState(() => /* @__PURE__ */ new Date()), [U, x] = T.useState(!1), [X, Y] = T.useState({ type: "idle", text: "" }), I = T.useRef(null), xt = T.useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone || "", []) === "Asia/Seoul" ? "KST" : "LOCAL", dt = T.useMemo(() => K.toLocaleString("ko-KR"), [K]);
  T.useEffect(() => {
    const P = window.setInterval(() => {
      Z(/* @__PURE__ */ new Date());
    }, 1e3);
    return () => window.clearInterval(P);
  }, []), T.useEffect(() => () => {
    I.current && window.clearTimeout(I.current);
  }, []);
  const Yt = (P, Lt, _t = 1500) => {
    I.current && (window.clearTimeout(I.current), I.current = null), Y({ type: P, text: Lt }), _t > 0 && (I.current = window.setTimeout(() => {
      I.current = null, Y({ type: "idle", text: "" });
    }, _t));
  }, k = async () => {
    if (!U) {
      x(!0), Yt("loading", "동기화 중...", 0);
      try {
        await Promise.resolve(v == null ? void 0 : v()), Yt("success", "동기화 완료", 1600);
      } catch {
        Yt("error", "새로고침 실패", 2400);
      } finally {
        x(!1);
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
          onClick: j,
          children: /* @__PURE__ */ s.jsx(Dy, { className: "topbar-btn-icon", "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ s.jsx("img", { className: "brand-mark", src: "/static/favicon.svg?v=20260302b", alt: "Ryong Investment logo" }),
      /* @__PURE__ */ s.jsx("strong", { className: "brand-title", children: "Ryong Investment" })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "status-wrap", children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          className: `btn theme-icon-btn ${L ? "active" : ""}`,
          id: "themeToggle",
          type: "button",
          "aria-label": L ? "라이트 모드로 전환" : "다크 모드로 전환",
          "aria-pressed": L ? "true" : "false",
          onClick: d,
          children: L ? /* @__PURE__ */ s.jsx(Yy, { className: "topbar-btn-icon", "aria-hidden": "true" }) : /* @__PURE__ */ s.jsx(Ly, { className: "topbar-btn-icon", "aria-hidden": "true" })
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
            disabled: U,
            children: /* @__PURE__ */ s.jsx(By, { className: `topbar-btn-icon ${U ? "is-spinning" : ""}`, "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `topbar-feedback ${X.type !== "idle" ? "show" : ""} ${X.type}`,
            role: "status",
            "aria-live": "polite",
            "aria-atomic": "true",
            children: [
              X.type === "loading" ? /* @__PURE__ */ s.jsx(Oy, { className: "topbar-feedback-icon is-spinning", "aria-hidden": "true" }) : null,
              X.type === "success" ? /* @__PURE__ */ s.jsx(xy, { className: "topbar-feedback-icon", "aria-hidden": "true" }) : null,
              X.type === "error" ? /* @__PURE__ */ s.jsx(Ty, { className: "topbar-feedback-icon", "aria-hidden": "true" }) : null,
              /* @__PURE__ */ s.jsx("span", { children: X.text })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "topbar-clock", id: "localClock", title: dt, children: [
        /* @__PURE__ */ s.jsx("span", { className: "topbar-clock-icon", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx(Ry, { className: "topbar-btn-icon", "aria-hidden": "true" }) }),
        /* @__PURE__ */ s.jsxs("span", { className: "topbar-clock-main", children: [
          /* @__PURE__ */ s.jsx("span", { className: "topbar-clock-zone", children: xt }),
          /* @__PURE__ */ s.jsx("span", { className: "topbar-clock-text", children: dt })
        ] })
      ] })
    ] })
  ] });
}
const Xy = /* @__PURE__ */ new Set([
  "NASDAQ",
  "NYSE",
  "AMEX",
  "ARCA",
  "BATS",
  "OTC"
]), Gy = /* @__PURE__ */ new Set([
  "FX_IDC:USDKRW",
  "SP:SPX",
  "DJ:DJI",
  "TVC:VIX",
  "TVC:KOSPI",
  "TVC:KOSDAQ",
  "NASDAQ:IXIC",
  "CME_MINI:NQ1!"
]);
function Qy(f, d) {
  const v = String(d || "차트").trim() || "차트", r = String(f || "").trim();
  if (!r) return { market: "", symbol: "", seedLabel: v };
  const j = r.toUpperCase();
  if (/^\d{6}$/.test(j))
    return { market: "kr", symbol: j, seedLabel: v };
  if (j.startsWith("KRX:") || j.endsWith(".KS") || j.endsWith(".KQ"))
    return { market: "kr", symbol: Tu(j) || j, seedLabel: v };
  if (!j.includes(":"))
    return /^[A-Z][A-Z0-9.-]{0,9}$/.test(j) ? { market: "us", symbol: j, seedLabel: v } : { market: "", symbol: "", seedLabel: v };
  const [L, K] = j.split(":", 2), Z = String(L || "").trim(), U = String(K || "").trim();
  return !U || Gy.has(`${Z}:${U}`) ? { market: "", symbol: "", seedLabel: v } : Xy.has(Z) ? { market: "us", symbol: U, seedLabel: v } : { market: "", symbol: "", seedLabel: v };
}
function Vy({ row: f, label: d, onClick: v, className: r = "symbol-link" }) {
  return /* @__PURE__ */ s.jsx("button", { type: "button", className: r, title: d, onClick: v, children: /* @__PURE__ */ s.jsx(Jc, { market: f.market, symbol: f.symbol, label: d }) });
}
function Zy({
  active: f,
  symbolInput: d,
  onChangeSymbolInput: v,
  onSubmitSymbol: r,
  currentSymbol: j,
  openTradingViewUrl: L,
  tvWidgetUrl: K,
  chartRenderer: Z,
  localChartTitle: U,
  localChartMeta: x,
  localChartInterval: X,
  localChartIntervalOptions: Y,
  onChangeLocalChartInterval: I,
  localChartCanvasRef: zt,
  localChartViewportRef: xt,
  quickSymbols: dt,
  onClickQuickSymbol: Yt,
  overview: k,
  portfolioTotals: P,
  positions: Lt,
  onClickPositionSymbol: _t
}) {
  const nl = ((k == null ? void 0 : k.accounts) || []).find((b) => b.market === "us"), Jt = ((k == null ? void 0 : k.accounts) || []).find((b) => b.market === "kr"), nt = (k == null ? void 0 : k.metrics) || {}, tl = (Lt || []).slice(0, 5), gl = T.useMemo(() => Y || [], [Y]), bl = String(X || "30m"), ll = T.useMemo(
    () => Qy(j, U),
    [j, U]
  ), Vt = T.useRef(null), Sl = T.useRef({}), [pl, ul] = T.useState(() => ({
    x: 0,
    width: 0,
    ready: !1
  })), A = Number((P == null ? void 0 : P.usdkrw) || 0).toLocaleString(void 0, { maximumFractionDigits: 2 }), H = P != null && P.fx_stale ? "지연" : "실시간", $ = P != null && P.fx_source ? `, ${P.fx_source}` : "", gt = P != null && P.fx_quote_time_utc ? `, ${Es(P.fx_quote_time_utc)}` : "", tt = T.useCallback(
    (b) => (D) => {
      b && (D ? Sl.current[b] = D : delete Sl.current[b]);
    },
    []
  ), m = T.useCallback(() => {
    const b = Vt.current, D = Sl.current[bl];
    if (!b || !D) {
      ul((bt) => bt.ready ? { x: 0, width: 0, ready: !1 } : bt);
      return;
    }
    const q = b.getBoundingClientRect(), F = D.getBoundingClientRect(), G = Math.max(0, F.left - q.left), mt = Math.max(0, F.width);
    ul((bt) => bt.ready && Math.abs(bt.x - G) < 0.25 && Math.abs(bt.width - mt) < 0.25 ? bt : {
      x: G,
      width: mt,
      ready: mt > 0
    });
  }, [bl]);
  return T.useLayoutEffect(() => {
    m();
  }, [m, gl.length]), T.useEffect(() => {
    const b = Vt.current;
    if (!b) return;
    const D = () => m();
    window.addEventListener("resize", D);
    let q = null;
    return typeof ResizeObserver < "u" && (q = new ResizeObserver(() => m()), q.observe(b)), () => {
      window.removeEventListener("resize", D), q && q.disconnect();
    };
  }, [m]), /* @__PURE__ */ s.jsx("section", { id: "view-workspace", className: `view-pane ${f ? "active" : ""}`, children: /* @__PURE__ */ s.jsxs("div", { className: "workspace-grid", children: [
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
                value: d,
                onChange: (b) => v(b.target.value)
              }
            ),
            /* @__PURE__ */ s.jsx("button", { className: "btn accent", type: "submit", children: "차트 불러오기" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "chart-links", children: [
            /* @__PURE__ */ s.jsx("span", { id: "currentSymbol", className: "symbol-badge", children: j || "NASDAQ:AAPL" }),
            /* @__PURE__ */ s.jsx("a", { id: "openTradingView", href: L || "#", target: "_blank", rel: "noopener noreferrer", children: "트레이딩뷰 열기" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "symbol-quick-list", id: "symbolQuickList", children: (dt != null && dt.length ? dt : [{ market: "us", symbol: "AAPL", tv_symbol: "NASDAQ:AAPL" }]).map((b) => {
          const D = ty(b.market, b.symbol);
          return /* @__PURE__ */ s.jsx(
            "button",
            {
              className: "sym-chip",
              type: "button",
              onClick: () => Yt(b.tv_symbol || b.symbol, b),
              children: /* @__PURE__ */ s.jsx(
                Jc,
                {
                  market: b.market,
                  symbol: b.symbol,
                  label: D,
                  iconSeedLabel: kc(b.market, b.symbol)
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
            className: Z === "local" ? "is-hidden" : "",
            src: K || ""
          }
        ),
        /* @__PURE__ */ s.jsxs("section", { id: "localChartShell", className: `local-chart-shell ${Z === "local" ? "active" : ""}`, "aria-label": "로컬 캔들 차트", children: [
          /* @__PURE__ */ s.jsxs("header", { className: "local-chart-top", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "local-chart-identity", children: [
              /* @__PURE__ */ s.jsx("span", { className: "local-chart-identity-icon", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx(
                Cm,
                {
                  market: ll.market,
                  symbol: ll.symbol,
                  seedLabel: ll.seedLabel
                }
              ) }),
              /* @__PURE__ */ s.jsx("span", { id: "localChartTitle", className: "local-chart-title", children: U || "차트" })
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
                  ref: Vt,
                  children: [
                    /* @__PURE__ */ s.jsx(
                      "span",
                      {
                        className: `local-chart-interval-indicator ${pl.ready ? "ready" : ""}`,
                        "aria-hidden": "true",
                        style: {
                          "--interval-tab-x": `${pl.x}px`,
                          "--interval-tab-width": `${pl.width}px`
                        }
                      }
                    ),
                    gl.map((b) => /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        ref: tt(b.value),
                        type: "button",
                        role: "tab",
                        "aria-selected": bl === b.value,
                        className: `local-chart-interval-tab ${bl === b.value ? "active" : ""}`,
                        onClick: () => I == null ? void 0 : I(b.value),
                        children: b.label
                      },
                      b.value
                    ))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "local-chart-meta-wrap", children: /* @__PURE__ */ s.jsx("span", { id: "localChartMeta", className: "local-chart-meta", children: x || "데이터 로딩 중..." }) })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "local-chart-canvas-wrap", ref: xt, children: /* @__PURE__ */ s.jsx("div", { id: "localChartCanvas", className: "local-chart-canvas", ref: zt }) })
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
            /* @__PURE__ */ s.jsx("strong", { id: "signalsToday", children: String(nt.signals_today ?? "-") })
          ] }),
          /* @__PURE__ */ s.jsxs("article", { className: "metric-card", children: [
            /* @__PURE__ */ s.jsx("label", { children: "오늘 체결" }),
            /* @__PURE__ */ s.jsx("strong", { id: "fillsToday", children: String(nt.fills_today ?? "-") })
          ] }),
          /* @__PURE__ */ s.jsxs("article", { className: "metric-card metric-card-wide", children: [
            /* @__PURE__ */ s.jsx("label", { children: "최신 보고서" }),
            /* @__PURE__ */ s.jsx("strong", { id: "latestReport", children: (k == null ? void 0 : k.latest_report) || "없음" }),
            /* @__PURE__ */ s.jsxs("p", { className: "metric-meta", children: [
              "업데이트 ",
              /* @__PURE__ */ s.jsx("span", { id: "overviewUpdatedAt", children: Es(k == null ? void 0 : k.server_time_kst) })
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
            /* @__PURE__ */ s.jsx("strong", { id: "portfolioUsEquity", children: Pl(P == null ? void 0 : P.us_equity, "USD") })
          ] }),
          /* @__PURE__ */ s.jsxs("article", { className: "metric-card", children: [
            /* @__PURE__ */ s.jsx("label", { children: "한국 자산" }),
            /* @__PURE__ */ s.jsx("strong", { id: "portfolioKrEquity", children: Pl(P == null ? void 0 : P.kr_equity, "KRW") })
          ] }),
          /* @__PURE__ */ s.jsxs("article", { className: "metric-card metric-card-emphasis", children: [
            /* @__PURE__ */ s.jsx("label", { children: "총액 (USD 환산)" }),
            /* @__PURE__ */ s.jsx("strong", { id: "portfolioTotalUsd", children: Pl(P == null ? void 0 : P.total_usd_est, "USD") })
          ] }),
          /* @__PURE__ */ s.jsxs("article", { className: "metric-card metric-card-emphasis", children: [
            /* @__PURE__ */ s.jsx("label", { children: "총액 (KRW 환산)" }),
            /* @__PURE__ */ s.jsx("strong", { id: "portfolioTotalKrw", children: Pl(P == null ? void 0 : P.total_krw_est, "KRW") })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("p", { className: "fx-note", children: [
          "환산 기준 USD/KRW: ",
          /* @__PURE__ */ s.jsx("span", { id: "portfolioFxRate", children: `${A} (${H}${$}${gt})` })
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
        /* @__PURE__ */ s.jsx("ol", { className: "position-summary-list", id: "workspacePositionList", children: tl.length ? tl.map((b, D) => {
          const q = kc(b.market, b.symbol);
          return /* @__PURE__ */ s.jsxs("li", { className: "position-summary-item", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "position-summary-left", children: [
              /* @__PURE__ */ s.jsx("span", { className: "position-rank", children: String(D + 1).padStart(2, "0") }),
              /* @__PURE__ */ s.jsx(
                Vy,
                {
                  row: b,
                  label: q,
                  className: "symbol-link summary-symbol-link",
                  onClick: () => _t(b)
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "position-summary-stats", children: [
              /* @__PURE__ */ s.jsxs("span", { className: "position-stat", children: [
                /* @__PURE__ */ s.jsx("em", { children: "수량" }),
                /* @__PURE__ */ s.jsx("b", { children: ps(b.qty) })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { className: `position-stat ${Ss(b.unrealized_pnl)}`, children: [
                /* @__PURE__ */ s.jsx("em", { children: "평가손익" }),
                /* @__PURE__ */ s.jsx("b", { children: bs(b.unrealized_pnl, Zc(b.market)) })
              ] })
            ] })
          ] }, `${b.market}-${b.symbol}-${D}`);
        }) : /* @__PURE__ */ s.jsx("li", { className: "position-summary-empty", children: "보유 포지션 없음" }) })
      ] })
    ] })
  ] }) });
}
function ds(f) {
  const d = f === "dark";
  return {
    background: d ? "#141f2b" : "#ffffff",
    text: d ? "#9fb0c2" : "#6b7684",
    grid: d ? "#243546" : "#eef2f7",
    up: "#f04452",
    down: "#3f7cff",
    volumeUp: d ? "rgba(240, 68, 82, 0.55)" : "rgba(240, 68, 82, 0.38)",
    volumeDown: d ? "rgba(63, 124, 255, 0.55)" : "rgba(63, 124, 255, 0.38)"
  };
}
function Ky() {
  return {
    paused: !1,
    server_time_kst: null,
    accounts: [],
    metrics: { signals_today: 0, fills_today: 0 },
    latest_report: null
  };
}
function ky() {
  return {
    totals: {},
    positions: [],
    recent_fills: [],
    agent_exposure: [],
    quick_symbols: []
  };
}
const Jy = 4e3, $y = 5e3, Wy = 2e3, Fy = 4500, Vc = 4, ms = 92, Iy = {
  "1m": 3e3,
  "3m": 4e3,
  "5m": 5e3,
  "15m": 8e3,
  "30m": 12e3,
  "60m": 15e3,
  "4h": 3e4,
  "1d": 6e4
}, $c = [
  { value: "1m", label: "1분", range: "5d" },
  { value: "3m", label: "3분", range: "5d" },
  { value: "5m", label: "5분", range: "5d" },
  { value: "15m", label: "15분", range: "5d" },
  { value: "30m", label: "30분", range: "1mo" },
  { value: "60m", label: "1시간", range: "2mo" },
  { value: "4h", label: "4시간", range: "6mo" },
  { value: "1d", label: "1일", range: "1y" }
], Py = new Set($c.map((f) => f.value)), Kc = "30m", _m = 24, hs = 1200, Am = {
  usdkrw: "FX_IDC:USDKRW",
  nasdaq: "NASDAQ:IXIC",
  nasdaq100f: "CME_MINI:NQ1!",
  sp500: "SP:SPX",
  dowjones: "DJ:DJI",
  vix: "TVC:VIX",
  kospi: "TVC:KOSPI",
  kosdaq: "TVC:KOSDAQ"
}, ys = {
  id: "usdkrw",
  label: "달러 환율",
  tv_symbol: "FX_IDC:USDKRW"
};
function vs(f) {
  const d = String((f == null ? void 0 : f.id) || "").trim().toLowerCase();
  return d && Am[d] ? Am[d] : String((f == null ? void 0 : f.tv_symbol) || (f == null ? void 0 : f.symbol) || "").trim() || "";
}
function Tm(f) {
  return `https://www.tradingview.com/chart/?symbol=${encodeURIComponent(f)}`;
}
function tv(f) {
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
  const d = String(f || "").trim().toLowerCase();
  return Py.has(d) ? d : Kc;
}
function Qe(f) {
  var v;
  const d = ie(f);
  return ((v = $c.find((r) => r.value === d)) == null ? void 0 : v.range) || "2mo";
}
function lv(f) {
  const d = ie(f);
  return d === "1d" ? ["1y", "2y", "5y"] : d === "4h" ? ["6mo", "1y", "2y", "5y"] : d === "60m" ? ["2mo", "3mo", "6mo", "1y", "2y", "5y"] : d === "30m" ? ["1mo", "2mo", "3mo", "6mo", "1y", "2y", "5y"] : ["5d", "1mo", "2mo", "3mo", "6mo", "1y", "2y", "5y"];
}
function ev(f, d) {
  const v = lv(f), r = String(d || "").trim().toLowerCase(), j = v.indexOf(r);
  if (j < 0) {
    const L = Qe(f), K = v.indexOf(L);
    return K >= 0 && K + 1 < v.length ? v[K + 1] : v[0] || "";
  }
  return v[j + 1] || "";
}
function av(f) {
  var v;
  const d = ie(f);
  return ((v = $c.find((r) => r.value === d)) == null ? void 0 : v.label) || "30분";
}
function nv(f) {
  const d = String(f || "").trim().toLowerCase();
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
  }[d] || "최근 구간";
}
function uv(f) {
  const d = ie(f);
  return Iy[d] || 1e4;
}
function gs(f) {
  const d = String(f || "").toUpperCase().trim();
  if (!d) return "차트";
  if (d.startsWith("KRX:") || d.endsWith(".KS") || d.endsWith(".KQ")) {
    const v = Tu(d), r = Au[v];
    return r || (v ? `한국주식 ${v}` : "한국주식");
  }
  if (d.includes(":")) {
    const [, v] = d.split(":", 2);
    return v || d;
  }
  return d;
}
function cv() {
  const [f, d] = T.useState(() => zm(fs(Sm, "light"))), [v, r] = T.useState(() => {
    const y = Qc(fs(gm, "workspace"));
    return Qc(window.location.hash || y);
  }), [j, L] = T.useState(() => fs(bm, "0") === "1"), [K, Z] = T.useState(!1), [U, x] = T.useState(Ky), [X, Y] = T.useState(ky), [I, zt] = T.useState([]), [xt, dt] = T.useState(!0), [Yt, k] = T.useState(!0), [P, Lt] = T.useState([]), [_t, nl] = T.useState(""), [Jt, nt] = T.useState("불러오는 중..."), [tl, gl] = T.useState("준비 완료."), [bl, ll] = T.useState(ys.tv_symbol), [Vt, Sl] = T.useState(ys.tv_symbol), [pl, ul] = T.useState("#"), [A, H] = T.useState(""), [$, gt] = T.useState(""), [tt, m] = T.useState("tv"), [b, D] = T.useState("차트"), [q, F] = T.useState("데이터 로딩 중..."), [G, mt] = T.useState(Kc), [bt, Ct] = T.useState(Qe(Kc)), [pe, Ea] = T.useState(!1), [Na, zn] = T.useState(!1), te = j && !K, Ee = T.useRef(null), fe = T.useRef(null), Qa = T.useRef(null), cl = T.useRef(null), wt = T.useRef({
    lastLength: 0,
    userDetached: !1,
    loadedRange: "",
    loadedInterval: Kc,
    firstTime: 0,
    backfillBusy: !1,
    historyExhausted: !1,
    lastBackfillTriggeredAt: 0,
    exploringPast: !1
  }), Vl = T.useRef(null), jl = T.useRef(null), xn = T.useRef(!1), Va = T.useRef(!1), Xt = T.useRef(null), Ne = T.useRef(null), _e = T.useRef(null), se = T.useRef(!1), Ae = T.useRef(0), Tl = T.useRef(null), ml = T.useRef(null), le = T.useRef(null), re = T.useRef(!1), El = T.useRef({
    downX: null,
    downY: null,
    active: !1
  }), et = T.useCallback((y) => {
    const N = `[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] ${y}`;
    gl((M) => `${N}
${M}`.slice(0, 2e4));
  }, []);
  T.useEffect(() => {
    document.body.classList.toggle("theme-dark", f === "dark"), ss(Sm, f);
  }, [f]), T.useEffect(() => {
    ss(gm, v);
    const y = `#${v}`;
    window.location.hash !== y && (window.location.hash = v);
  }, [v]), T.useEffect(() => {
    ss(bm, j ? "1" : "0");
  }, [j]), T.useEffect(() => {
    const y = () => {
      r((N) => {
        const M = Qc(window.location.hash);
        return N === M ? N : M;
      });
    };
    return window.addEventListener("hashchange", y), () => {
      window.removeEventListener("hashchange", y);
    };
  }, []), T.useEffect(() => {
    const y = window.matchMedia("(max-width: 767px)"), N = () => Z(y.matches);
    return N(), typeof y.addEventListener == "function" ? (y.addEventListener("change", N), () => y.removeEventListener("change", N)) : (y.addListener(N), () => y.removeListener(N));
  }, []);
  const Dl = T.useCallback(() => {
    const y = fe.current, N = Qa.current || (y == null ? void 0 : y.parentElement) || y;
    if (!N) return null;
    const M = N.getBoundingClientRect(), O = Number(N.clientWidth || M.width || 0), B = Number(N.clientHeight || M.height || 0), Q = window.getComputedStyle(N), at = Number.parseFloat(Q.paddingLeft || "0") + Number.parseFloat(Q.paddingRight || "0"), ut = Number.parseFloat(Q.paddingTop || "0") + Number.parseFloat(Q.paddingBottom || "0"), ft = Math.max(1, Math.floor(O - at)), St = Math.max(1, Math.floor(B - ut));
    return { width: ft, height: St, viewportEl: N };
  }, []), hl = T.useCallback(() => {
    var ft;
    if (!fe.current || !window.LightweightCharts || typeof window.LightweightCharts.createChart != "function") return null;
    if ((ft = cl.current) != null && ft.chart) return cl.current;
    const y = ds(f), N = Dl(), M = (N == null ? void 0 : N.width) || 900, O = (N == null ? void 0 : N.height) || 520, B = window.LightweightCharts.createChart(fe.current, {
      width: M,
      height: O,
      layout: {
        background: { type: "solid", color: y.background },
        textColor: y.text
      },
      grid: {
        vertLines: { color: y.grid },
        horzLines: { color: y.grid }
      },
      crosshair: { mode: 1 },
      leftPriceScale: {
        visible: !1,
        borderVisible: !1
      },
      rightPriceScale: {
        borderColor: y.grid,
        minimumWidth: ms,
        entireTextOnly: !0
      },
      timeScale: {
        borderColor: y.grid,
        timeVisible: !0,
        secondsVisible: !1,
        rightOffset: Vc,
        rightBarStaysOnScroll: !0,
        fixLeftEdge: !0,
        lockVisibleTimeRangeOnResize: !0
      }
    }), Q = B.addCandlestickSeries({
      upColor: y.up,
      downColor: y.down,
      wickUpColor: y.up,
      wickDownColor: y.down,
      borderUpColor: y.up,
      borderDownColor: y.down,
      priceLineVisible: !0
    }), at = B.addHistogramSeries({
      priceFormat: { type: "volume" },
      priceScaleId: ""
    });
    B.priceScale("").applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 }
    });
    const ut = (St) => {
      const Rt = wt.current, il = Number(Rt.lastLength || 0);
      if (!St || !Number.isFinite(St.to) || il <= 0)
        return;
      const ct = il - 1, Ut = St.to >= ct - 0.75;
      if (Rt.userDetached = !Ut, ct - Number(St.to || 0) >= _m && Rt.userDetached && typeof Vl.current == "function") {
        const $e = Date.now();
        $e - Number(Rt.lastBackfillTriggeredAt || 0) >= hs && (Rt.lastBackfillTriggeredAt = $e, Vl.current());
      }
    };
    return B.timeScale().subscribeVisibleLogicalRangeChange(ut), cl.current = { chart: B, candleSeries: Q, volumeSeries: at, onRangeChange: ut }, cl.current;
  }, [f, Dl]), zu = T.useCallback(() => {
    var N;
    if (!((N = cl.current) != null && N.chart)) return;
    const y = ds(f);
    cl.current.chart.applyOptions({
      layout: {
        background: { type: "solid", color: y.background },
        textColor: y.text
      },
      grid: {
        vertLines: { color: y.grid },
        horzLines: { color: y.grid }
      },
      rightPriceScale: {
        borderColor: y.grid,
        minimumWidth: ms,
        entireTextOnly: !0
      },
      timeScale: {
        borderColor: y.grid,
        rightOffset: Vc,
        rightBarStaysOnScroll: !0,
        fixLeftEdge: !0,
        lockVisibleTimeRangeOnResize: !0
      }
    }), cl.current.candleSeries.applyOptions({
      upColor: y.up,
      downColor: y.down,
      wickUpColor: y.up,
      wickDownColor: y.down,
      borderUpColor: y.up,
      borderDownColor: y.down
    });
  }, [f]), oe = T.useCallback((y = !1) => {
    var Q;
    const N = (Q = cl.current) == null ? void 0 : Q.chart;
    if (!N) return;
    const M = Dl();
    if (!M) return;
    const { width: O, height: B } = M;
    typeof N.resize == "function" ? N.resize(O, B) : N.applyOptions({ width: O, height: B }), N.timeScale().applyOptions({
      rightOffset: Vc,
      rightBarStaysOnScroll: !0,
      fixLeftEdge: !0,
      lockVisibleTimeRangeOnResize: !0
    }), N.priceScale("right").applyOptions({
      minimumWidth: ms,
      entireTextOnly: !0
    }), y && (N.timeScale().fitContent(), N.timeScale().applyOptions({
      rightOffset: Vc
    }));
  }, [Dl]);
  T.useEffect(() => {
    zu(), A && gt(rs(A, f));
  }, [f, A, zu]), T.useEffect(() => {
    var O;
    const y = () => {
      oe(!1);
    };
    window.addEventListener("resize", y);
    let N = null;
    const M = Qa.current || ((O = fe.current) == null ? void 0 : O.parentElement) || fe.current;
    return typeof ResizeObserver < "u" && M && (N = new ResizeObserver(() => oe(!1)), N.observe(M)), () => {
      window.removeEventListener("resize", y), N && N.disconnect();
    };
  }, [oe]), T.useEffect(() => {
    if (tt !== "local" || v !== "workspace") return;
    const y = () => oe(!0), N = window.requestAnimationFrame(y), M = window.requestAnimationFrame(y), O = window.setTimeout(y, 120);
    return () => {
      window.cancelAnimationFrame(N), window.cancelAnimationFrame(M), window.clearTimeout(O);
    };
  }, [tt, v, te, K, oe]), T.useEffect(() => () => {
    var y, N;
    (y = cl.current) != null && y.chart && ((N = cl.current) != null && N.onRangeChange && cl.current.chart.timeScale().unsubscribeVisibleLogicalRangeChange(cl.current.onRangeChange), cl.current.chart.remove()), cl.current = null;
  }, []);
  const Ul = T.useCallback(() => {
    const y = Ee.current;
    if (!y) {
      Ea(!1), zn(!1);
      return;
    }
    const N = Math.max(0, y.scrollWidth - y.clientWidth), M = y.scrollLeft;
    Ea(M > 2), zn(M < N - 2);
  }, []);
  T.useEffect(() => {
    const y = Ee.current;
    if (!y) return;
    const N = (Q) => {
      Q.preventDefault();
    };
    Ul();
    const M = () => Ul();
    y.addEventListener("scroll", M, { passive: !0 }), y.addEventListener("dragstart", N);
    let O = null;
    typeof ResizeObserver < "u" && (O = new ResizeObserver(() => Ul()), O.observe(y));
    const B = () => Ul();
    return window.addEventListener("resize", B), () => {
      y.removeEventListener("scroll", M), y.removeEventListener("dragstart", N), O && O.disconnect(), window.removeEventListener("resize", B);
    };
  }, [Ul]), T.useEffect(() => {
    const y = Ee.current;
    if (!y) return;
    const N = () => {
      y.scrollTo({ left: 0, top: 0, behavior: "auto" }), Ul();
    };
    N();
    const M = window.requestAnimationFrame(N), O = window.requestAnimationFrame(() => {
      N();
    });
    return () => {
      window.cancelAnimationFrame(M), window.cancelAnimationFrame(O);
    };
  }, [xt, Yt, Ul]), T.useEffect(() => {
    Ul();
  }, [I, xt, Yt, Ul]), T.useEffect(() => {
    const y = window.setTimeout(() => {
      k(!1);
    }, Jy);
    return () => {
      window.clearTimeout(y);
    };
  }, []);
  const _a = T.useCallback((y) => {
    const N = Ee.current;
    if (!N) return;
    const M = Math.max(180, Math.round(N.clientWidth * 0.72));
    N.scrollBy({
      left: y * M,
      behavior: "smooth"
    }), window.setTimeout(() => {
      Ul();
    }, 260);
  }, [Ul]), Ll = T.useCallback((y, { title: N = "", fitContent: M = !0 } = {}) => {
    var Du, _l, Ka, Un;
    const O = hl();
    if (!O) return !1;
    const B = O.chart.timeScale(), Q = wt.current, at = (y.candles || []).map((Zt) => ({
      time: Number(Zt.time),
      open: Number(Zt.open),
      high: Number(Zt.high),
      low: Number(Zt.low),
      close: Number(Zt.close)
    }));
    if (!at.length) return !1;
    const ut = ds(f), ft = (y.candles || []).map((Zt) => ({
      time: Number(Zt.time),
      value: Number(Zt.volume || 0),
      color: Number(Zt.close) >= Number(Zt.open) ? ut.volumeUp : ut.volumeDown
    }));
    let St = null, Rt = null;
    const il = !M && !!Q.userDetached;
    if (il && B && (typeof B.getVisibleRange == "function" && (St = B.getVisibleRange()), typeof B.getVisibleLogicalRange == "function" && (Rt = B.getVisibleLogicalRange())), O.candleSeries.setData(at), O.volumeSeries.setData(ft), Q.lastLength = at.length, Q.firstTime = Number(((Du = at[0]) == null ? void 0 : Du.time) || 0), Q.loadedRange = String(y.range || Q.loadedRange || "").trim().toLowerCase(), Q.loadedInterval = ie(y.interval || Q.loadedInterval), M)
      B.fitContent(), Q.userDetached = !1, Q.exploringPast = !1;
    else if (il) {
      let Zt = !1;
      if (St && Number.isFinite(St.from) && Number.isFinite(St.to))
        try {
          B.setVisibleRange(St), Zt = !0;
        } catch {
          Zt = !1;
        }
      if (!Zt && Rt && Number.isFinite(Rt.from) && Number.isFinite(Rt.to))
        try {
          B.setVisibleLogicalRange(Rt);
        } catch {
        }
    }
    const ct = String(((_l = y.meta) == null ? void 0 : _l.source) || "").toLowerCase(), Nl = String(((Ka = y.meta) == null ? void 0 : Ka.source_label) || "").trim() || (ct.startsWith("naver") ? "네이버 금융" : ct.includes("hybrid") ? "야후+네이버" : "야후 파이낸스"), el = ct.includes("live") ? "실시간" : null, $e = String(((Un = y.meta) == null ? void 0 : Un.quote_time_utc) || "").trim();
    let Ou = "";
    if (el && $e) {
      const Zt = new Date($e);
      Number.isNaN(Zt.getTime()) || (Ou = ` · ${Zt.toLocaleTimeString("ko-KR", { hour12: !1 })} 업데이트`);
    }
    const Dn = N || y.label || y.symbol || y.yahoo_symbol || y.tv_symbol || "차트", ju = ie(y.interval), Te = String(y.range || "").trim().toLowerCase();
    return Te && Te !== String(bt || "").trim().toLowerCase() && Ct(Te), D(Dn), F(
      `${av(ju)} 봉 · ${nv(Te)} · ${Nl}${el ? ` (${el})` : ""}${Ou}`
    ), m("local"), M && window.requestAnimationFrame(() => {
      oe(!0), window.setTimeout(() => {
        oe(!0);
      }, 100);
    }), !0;
  }, [hl, bt, f, oe]), ee = T.useCallback(async (y, N, M = G, O = {}) => {
    const B = ie(M), Q = Qe(B), at = String(O.range || bt || Q).trim().toLowerCase() || Q, ut = await Se(
      `/api/chart/candles?query=${encodeURIComponent(y)}&interval=${encodeURIComponent(B)}&range=${encodeURIComponent(at)}`
    ), ft = N || ut.yahoo_symbol || y;
    return Ll(ut, { title: ft, fitContent: O.fitContent !== !1 });
  }, [G, bt, Ll]), de = T.useCallback(async (y, N = G, M = {}) => {
    M.fitContent !== !1 && (wt.current.userDetached = !1, wt.current.historyExhausted = !1, wt.current.backfillBusy = !1, wt.current.lastBackfillTriggeredAt = 0, wt.current.exploringPast = !1, Ct(Qe(N)));
    const O = gs(y.tv_symbol), B = await ee(y.tv_symbol, O, N, M);
    return B && (jl.current = {
      kind: "symbol",
      tvSymbol: y.tv_symbol,
      title: O
    }), B;
  }, [G, ee]), Hl = T.useCallback(async (y, N = G, M = {}) => {
    M.fitContent !== !1 && (wt.current.userDetached = !1, wt.current.historyExhausted = !1, wt.current.backfillBusy = !1, wt.current.lastBackfillTriggeredAt = 0, wt.current.exploringPast = !1, Ct(Qe(N)));
    const O = String((y == null ? void 0 : y.id) || "").trim().toLowerCase();
    if (!O) return !1;
    const B = ie(N), Q = Qe(B), at = String(M.range || bt || Q).trim().toLowerCase() || Q, ut = await Se(
      `/api/market-indicators/${encodeURIComponent(O)}/candles?interval=${encodeURIComponent(B)}&range=${encodeURIComponent(at)}`
    ), ft = String((y == null ? void 0 : y.label) || ut.label || O).trim(), St = Ll(ut, { title: ft, fitContent: M.fitContent !== !1 });
    return St && (jl.current = {
      kind: "indicator",
      indicatorId: O,
      tvSymbol: String(vs(y) || "").trim().toUpperCase(),
      title: ft
    }), St;
  }, [G, bt, Ll]), Ve = T.useCallback(async () => {
    var ut;
    if (v !== "workspace" || tt !== "local") return;
    const y = wt.current;
    if (y.backfillBusy || y.historyExhausted) return;
    const N = jl.current;
    if (!N) return;
    const M = ie(G), O = String(bt || y.loadedRange || Qe(M)).trim().toLowerCase(), B = ev(M, O);
    if (!B || B === O) {
      y.historyExhausted = !0;
      return;
    }
    y.backfillBusy = !0;
    const Q = Number(y.firstTime || 0), at = Number(y.lastLength || 0);
    try {
      let ft = null;
      if (N.kind === "indicator" && N.indicatorId ? ft = await Se(
        `/api/market-indicators/${encodeURIComponent(N.indicatorId)}/candles?interval=${encodeURIComponent(M)}&range=${encodeURIComponent(B)}`
      ) : N.kind === "symbol" && N.tvSymbol && (ft = await Se(
        `/api/chart/candles?query=${encodeURIComponent(N.tvSymbol)}&interval=${encodeURIComponent(M)}&range=${encodeURIComponent(B)}`
      )), !ft) return;
      if (!Ll(ft, {
        title: N.title || b,
        fitContent: !1
      })) {
        y.historyExhausted = !0;
        return;
      }
      const Rt = Number(((ut = (ft.candles || [])[0]) == null ? void 0 : ut.time) || 0), il = Number((ft.candles || []).length || 0), ct = String(ft.range || B).trim().toLowerCase();
      ct && Ct(ct), Rt > 0 && Q > 0 && Rt < Q || il > at || (y.historyExhausted = !0);
    } catch (ft) {
      et(`과거 구간 로드 실패: ${ft.message}`);
    } finally {
      y.backfillBusy = !1;
    }
  }, [v, tt, G, bt, b, et, Ll]);
  T.useEffect(() => (Vl.current = () => {
    Ve();
  }, () => {
    Vl.current = null;
  }), [Ve]), T.useEffect(() => {
    if (v !== "workspace" || tt !== "local") return;
    const y = window.setInterval(() => {
      var ft, St;
      const N = (ft = cl.current) == null ? void 0 : ft.chart, M = jl.current;
      if (!N || !M) return;
      const O = wt.current, B = (St = N.timeScale) == null ? void 0 : St.call(N);
      if (!B || typeof B.getVisibleLogicalRange != "function") return;
      const Q = B.getVisibleLogicalRange();
      if (!Q || !Number.isFinite(Q.from) || !Number.isFinite(Q.to)) return;
      const at = Number(O.lastLength || 0);
      if (at > 0) {
        const Rt = at - 1, il = Q.to >= Rt - 0.75;
        O.userDetached = !il;
        const ct = Rt - Number(Q.to || 0);
        O.exploringPast = ct >= _m;
      }
      if (!O.userDetached || O.backfillBusy || O.historyExhausted || !O.exploringPast) return;
      const ut = Date.now();
      ut - Number(O.lastBackfillTriggeredAt || 0) < hs || (O.lastBackfillTriggeredAt = ut, typeof Vl.current == "function" && Vl.current());
    }, 700);
    return () => {
      window.clearInterval(y);
    };
  }, [v, tt, G]), T.useEffect(() => {
    if (v !== "workspace" || tt !== "local") return;
    const y = Qa.current;
    if (!y) return;
    const N = (Q, at) => {
      El.current.downX = Number(Q), El.current.downY = Number(at), El.current.active = !0;
    }, M = (Q) => {
      N(Q.clientX, Q.clientY);
    }, O = (Q) => {
      N(Q.clientX, Q.clientY);
    }, B = (Q) => {
      if (!El.current.active) return;
      const at = Number(El.current.downX), ut = Number(El.current.downY);
      if (El.current.downX = null, El.current.downY = null, El.current.active = !1, !Number.isFinite(at) || !Number.isFinite(ut)) return;
      const ft = Number(Q == null ? void 0 : Q.clientX), St = Number(Q == null ? void 0 : Q.clientY), Rt = Number.isFinite(ft) ? Math.abs(ft - at) : 0, il = Number.isFinite(St) ? Math.abs(St - ut) : 0;
      if (Rt < 16 && il < 16) return;
      const ct = wt.current;
      if (ct.backfillBusy || ct.historyExhausted) return;
      const Ut = Date.now();
      Ut - Number(ct.lastBackfillTriggeredAt || 0) < hs || (ct.lastBackfillTriggeredAt = Ut, ct.userDetached = !0, ct.exploringPast = !0, typeof Vl.current == "function" && Vl.current());
    };
    return y.addEventListener("pointerdown", M, { passive: !0 }), y.addEventListener("mousedown", O, { passive: !0 }), window.addEventListener("pointerup", B, !0), window.addEventListener("mouseup", B, !0), window.addEventListener("touchend", B, !0), () => {
      y.removeEventListener("pointerdown", M), y.removeEventListener("mousedown", O), window.removeEventListener("pointerup", B, !0), window.removeEventListener("mouseup", B, !0), window.removeEventListener("touchend", B, !0);
    };
  }, [v, tt, G]);
  const xu = T.useCallback(async (y) => {
    const N = ly(y);
    return Se(`/api/chart/resolve?query=${encodeURIComponent(N)}`);
  }, []), ae = T.useCallback(async (y, { silent: N = !1 } = {}) => {
    const M = await xu(y), O = gs(M.tv_symbol);
    Sl(M.tv_symbol), ll(M.tv_symbol), ul(M.chart_url);
    let B = !1;
    if (W0(M.tv_symbol))
      try {
        B = await de(M, G);
      } catch (Q) {
        et(`KR 차트 로딩 실패, TradingView로 전환: ${Q.message}`);
      }
    B || (m("tv"), H(M.widget_url), gt(rs(M.widget_url, f)), jl.current = null, D(O)), Va.current = !0, N || et(`차트 변경: ${M.tv_symbol}`);
  }, [xu, de, f, et, G]), Ze = T.useCallback(async () => {
    const y = await Se("/api/overview");
    x(y);
  }, []), me = T.useCallback(async () => {
    const y = await Se("/api/portfolio");
    if (Y(y), !Va.current) {
      const N = ys, M = vs(N);
      Sl(M), ll(M), ul(Tm(M)), D(N.label);
      let O = !1;
      try {
        O = await Hl(N, G);
      } catch (B) {
        et(`초기 달러 환율 차트 로딩 실패: ${B.message}`);
      }
      O ? Va.current = !0 : await ae(M, { silent: !0 });
    }
  }, [ae, Hl, G, et]), Ke = T.useCallback(async (y) => {
    if (!y) {
      nt("보고서가 아직 없습니다.");
      return;
    }
    const N = await Se(`/api/report/${y}`);
    nt(N.content);
  }, []), Cn = T.useCallback(async () => {
    const y = await Se("/api/reports"), N = Array.isArray(y.reports) ? y.reports : [];
    if (Lt(N), !N.length) {
      nl(""), nt("보고서가 아직 없습니다.");
      return;
    }
    const M = _t && N.includes(_t) ? _t : N[0];
    nl(M), await Ke(M);
  }, [_t, Ke]), Aa = T.useCallback(async () => {
    try {
      const y = await Se("/api/market-indicators");
      zt(Array.isArray(y.items) ? y.items : []);
    } catch (y) {
      zt((N) => N.length ? N : []), et(`핵심 지표 수신 실패: ${y.message}`);
    } finally {
      dt(!1);
    }
  }, [et]), Ta = T.useCallback(async () => {
    await Ze(), await me(), await Cn(), await Aa();
  }, [Ze, me, Cn, Aa]);
  T.useEffect(() => {
    let y = !1;
    return Ta().then(() => {
      y || et("Ryong Investment 마켓 스테이션 준비 완료");
    }).catch((N) => {
      y || et(`초기화 실패: ${N.message}`);
    }), () => {
      y = !0;
    };
  }, [Ta, et]), T.useEffect(() => {
    const y = window.setInterval(async () => {
      try {
        await Ze(), await me();
      } catch {
      }
    }, $y);
    return () => window.clearInterval(y);
  }, [Ze, me]), T.useEffect(() => {
    const y = window.setInterval(async () => {
      if (document.visibilityState === "hidden") return;
      const N = Date.now(), M = Number(Ae.current || 0);
      if (!(se.current && M > 0 && N - M < Fy))
        try {
          await Aa();
        } catch {
        }
    }, Wy);
    return () => window.clearInterval(y);
  }, [Aa]), T.useEffect(() => {
    if (typeof window.WebSocket != "function" && !window.EventSource) return;
    let y = !1;
    const N = () => {
      Ne.current && (Ne.current.close(), Ne.current = null), Xt.current && (Xt.current.close(), Xt.current = null), _e.current && (window.clearTimeout(_e.current), _e.current = null), se.current = !1, Ae.current = 0;
    }, M = (at = 1800) => {
      _e.current || y || (_e.current = window.setTimeout(() => {
        _e.current = null, y || Q();
      }, at));
    }, O = (at) => {
      try {
        const ut = JSON.parse(String(at || "{}"));
        (ut == null ? void 0 : ut.ok) === !0 && Array.isArray(ut.items) && (Ae.current = Date.now(), zt(ut.items), dt(!1));
      } catch {
      }
    }, B = () => {
      if (!window.EventSource || y) return;
      Xt.current && (Xt.current.close(), Xt.current = null);
      const at = new EventSource("/api/market-indicators/stream");
      Xt.current = at, se.current = !0, at.onmessage = (ut) => {
        O(ut.data);
      }, at.onerror = () => {
        se.current = !1, at === Xt.current && (at.close(), Xt.current = null), M(2400);
      };
    }, Q = () => {
      if (N(), y) return;
      if (typeof window.WebSocket != "function") {
        B();
        return;
      }
      const ut = `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}/api/market-indicators/ws`, ft = new window.WebSocket(ut);
      Ne.current = ft;
      let St = !1;
      const Rt = window.setTimeout(() => {
        !St && ft === Ne.current && ft.close();
      }, 2600);
      ft.onopen = () => {
        St = !0, window.clearTimeout(Rt), se.current = !0, Ae.current = Date.now();
      }, ft.onmessage = (il) => {
        O(il.data);
      }, ft.onerror = () => {
        se.current = !1;
      }, ft.onclose = () => {
        if (window.clearTimeout(Rt), ft === Ne.current && (Ne.current = null), se.current = !1, !y) {
          if (!St && window.EventSource) {
            B();
            return;
          }
          M(1800);
        }
      };
    };
    return Q(), () => {
      y = !0, N();
    };
  }, []), T.useEffect(() => {
    const y = () => {
      ml.current && (ml.current.close(), ml.current = null), Tl.current && (Tl.current.close(), Tl.current = null), le.current && (window.clearTimeout(le.current), le.current = null), re.current = !1;
    };
    if (typeof window.WebSocket != "function" && !window.EventSource || v !== "workspace" || tt !== "local") {
      y();
      return;
    }
    const N = jl.current;
    if (!N) {
      y();
      return;
    }
    const M = new URLSearchParams({
      interval: ie(G),
      range: String(bt || Qe(G)).trim().toLowerCase()
    });
    if (N.kind === "indicator" && N.indicatorId)
      M.set("indicator_id", String(N.indicatorId));
    else if (N.kind === "symbol" && N.tvSymbol)
      M.set("query", String(N.tvSymbol));
    else {
      y();
      return;
    }
    let O = !1;
    const B = M.toString(), at = `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}/api/chart/ws?${B}`, ut = `/api/chart/stream?${B}`, ft = (ct) => {
      try {
        const Ut = JSON.parse(String(ct || "{}"));
        if ((Ut == null ? void 0 : Ut.ok) !== !0 || !Array.isArray(Ut == null ? void 0 : Ut.candles)) return;
        Ll(Ut, {
          title: N.title || b,
          fitContent: !1
        });
      } catch {
      }
    }, St = (ct = 1800) => {
      O || le.current || (le.current = window.setTimeout(() => {
        le.current = null, O || il();
      }, ct));
    }, Rt = () => {
      if (!window.EventSource || O) return;
      Tl.current && (Tl.current.close(), Tl.current = null);
      const ct = new EventSource(ut);
      Tl.current = ct, re.current = !0, ct.onmessage = (Ut) => {
        ft(Ut.data);
      }, ct.onerror = () => {
        ct === Tl.current && (ct.close(), Tl.current = null), re.current = !1, St(2400);
      };
    }, il = () => {
      if (O) return;
      if (typeof window.WebSocket != "function") {
        Rt();
        return;
      }
      ml.current && (ml.current.close(), ml.current = null);
      const ct = new window.WebSocket(at);
      ml.current = ct;
      let Ut = !1;
      const Nl = window.setTimeout(() => {
        !Ut && ct === ml.current && ct.close();
      }, 2600);
      ct.onopen = () => {
        Ut = !0, window.clearTimeout(Nl), re.current = !0;
      }, ct.onmessage = (el) => {
        ft(el.data);
      }, ct.onerror = () => {
        re.current = !1;
      }, ct.onclose = () => {
        if (window.clearTimeout(Nl), ct === ml.current && (ml.current = null), re.current = !1, !O) {
          if (!Ut && window.EventSource) {
            Rt();
            return;
          }
          St(1800);
        }
      };
    };
    return il(), () => {
      O = !0, ml.current && (ml.current.close(), ml.current = null), Tl.current && (Tl.current.close(), Tl.current = null), le.current && (window.clearTimeout(le.current), le.current = null), re.current = !1;
    };
  }, [v, tt, G, bt, Vt, Ll, b]), T.useEffect(() => {
    if (v !== "workspace" || tt !== "local") return;
    const y = uv(G);
    let N = !1;
    const M = async () => {
      if (N || xn.current || re.current) return;
      const B = jl.current;
      if (B) {
        xn.current = !0;
        try {
          B.kind === "indicator" ? await Hl(
            {
              id: B.indicatorId,
              label: B.title,
              tv_symbol: B.tvSymbol
            },
            G,
            { fitContent: !1 }
          ) : B.kind === "symbol" && await ee(B.tvSymbol, B.title, G, { fitContent: !1 });
        } catch (Q) {
          et(`실시간 차트 갱신 실패: ${Q.message}`);
        } finally {
          xn.current = !1;
        }
      }
    }, O = window.setInterval(() => {
      M();
    }, y);
    return () => {
      N = !0, window.clearInterval(O);
    };
  }, [v, tt, G, Hl, ee, et]);
  const Rn = te ? "app-shell sidebar-collapsed" : "app-shell", Za = T.useCallback((y) => {
    r(Qc(y));
  }, []), Cu = T.useCallback(async () => {
    await Ta(), et("수동 새로고침 완료");
  }, [Ta, et]), Ru = T.useCallback(async (y) => {
    y.preventDefault();
    const N = bl.trim();
    if (N)
      try {
        r("workspace"), await ae(N);
      } catch (M) {
        et(`검색 실패: ${M.message}`);
      }
  }, [bl, ae, et]), he = T.useCallback(async (y, N) => {
    const M = (N == null ? void 0 : N.tv_symbol) || y;
    try {
      r("workspace"), await ae(M);
    } catch (O) {
      et(`심볼 로딩 실패: ${O.message}`);
    }
  }, [ae, et]), $t = T.useCallback(async (y) => {
    try {
      r("workspace"), await ae(ey(y.market, y.symbol));
    } catch (N) {
      et(`포지션 심볼 로딩 실패: ${N.message}`);
    }
  }, [ae, et]), yl = T.useCallback(async (y) => {
    const N = vs(y), M = String(N || "").trim().toUpperCase();
    if (!M) return;
    r("workspace"), Sl(M), ll(M), ul(Tm(M)), D(String((y == null ? void 0 : y.label) || gs(M)).trim() || "차트");
    let O = !1;
    try {
      O = await Hl(y);
    } catch (B) {
      et(`지표 로컬 차트 로딩 실패, TradingView로 전환: ${B.message}`);
    }
    if (!O) {
      const B = tv(M);
      m("tv"), H(B), gt(rs(B, f)), jl.current = null;
    }
    Va.current = !0, et(`차트 변경: ${M}`);
  }, [f, Hl, et]), ke = T.useCallback(async (y) => {
    const N = ie(y);
    if (mt(N), Ct(Qe(N)), wt.current.historyExhausted = !1, wt.current.backfillBusy = !1, wt.current.lastBackfillTriggeredAt = 0, wt.current.exploringPast = !1, tt !== "local") return;
    const M = jl.current;
    if (M) {
      F("데이터 로딩 중...");
      try {
        if (M.kind === "indicator")
          await Hl(
            {
              id: M.indicatorId,
              label: M.title,
              tv_symbol: M.tvSymbol
            },
            N
          );
        else if (M.kind === "symbol" && !await ee(M.tvSymbol, M.title, N))
          throw new Error("로컬 차트 렌더링 실패");
      } catch (O) {
        et(`차트 주기 변경 실패: ${O.message}`);
      }
    }
  }, [tt, Hl, ee, et]), Mn = T.useCallback(async () => {
    _t && (await Ke(_t), et(`보고서 불러옴: ${_t}`));
  }, [_t, Ke, et]), Wc = T.useCallback(async (y) => {
    nl(y), await Ke(y);
  }, [Ke]), Mu = (X == null ? void 0 : X.totals) || {}, On = (X == null ? void 0 : X.positions) || [], za = (X == null ? void 0 : X.recent_fills) || [], jn = (X == null ? void 0 : X.agent_exposure) || [], Je = (X == null ? void 0 : X.quick_symbols) || [];
  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsx(
      wy,
      {
        theme: f,
        onToggleTheme: () => d((y) => y === "dark" ? "light" : "dark"),
        onRefreshAll: Cu,
        sidebarCollapsed: te,
        onToggleSidebar: () => L((y) => !y)
      }
    ),
    /* @__PURE__ */ s.jsxs("div", { className: "macro-strip-shell", children: [
      /* @__PURE__ */ s.jsx("span", { className: `macro-edge left ${pe ? "active" : ""}`, "aria-hidden": "true" }),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `macro-scroll-btn left ${pe ? "active" : ""}`,
          "aria-label": "왼쪽으로 스크롤",
          onClick: () => _a(-1),
          disabled: !pe,
          children: /* @__PURE__ */ s.jsx("span", { "aria-hidden": "true", children: "‹" })
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "macro-strip", id: "macroStrip", ref: Ee, children: /* @__PURE__ */ s.jsx(
        my,
        {
          items: I,
          loading: xt || Yt,
          onSelectItem: yl
        }
      ) }),
      /* @__PURE__ */ s.jsx("span", { className: `macro-edge right ${Na ? "active" : ""}`, "aria-hidden": "true" }),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `macro-scroll-btn right ${Na ? "active" : ""}`,
          "aria-label": "오른쪽으로 스크롤",
          onClick: () => _a(1),
          disabled: !Na,
          children: /* @__PURE__ */ s.jsx("span", { "aria-hidden": "true", children: "›" })
        }
      )
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "market-strip", id: "marketStrip", children: /* @__PURE__ */ s.jsx(hy, { overview: U, totals: Mu }) }),
    /* @__PURE__ */ s.jsxs("main", { className: Rn, children: [
      /* @__PURE__ */ s.jsx(yy, { activeNav: v, onChangeNav: Za }),
      /* @__PURE__ */ s.jsxs("section", { className: "content-shell", children: [
        /* @__PURE__ */ s.jsx(
          Zy,
          {
            active: v === "workspace",
            symbolInput: bl,
            onChangeSymbolInput: ll,
            onSubmitSymbol: Ru,
            currentSymbol: Vt,
            openTradingViewUrl: pl,
            tvWidgetUrl: $,
            chartRenderer: tt,
            localChartTitle: b,
            localChartMeta: q,
            localChartInterval: G,
            localChartIntervalOptions: $c,
            onChangeLocalChartInterval: ke,
            localChartCanvasRef: fe,
            localChartViewportRef: Qa,
            quickSymbols: Je,
            onClickQuickSymbol: he,
            overview: U,
            portfolioTotals: Mu,
            positions: On,
            onClickPositionSymbol: $t
          }
        ),
        /* @__PURE__ */ s.jsx(
          gy,
          {
            active: v === "positions",
            positions: On,
            recentFills: za,
            agentExposure: jn,
            onClickPositionSymbol: $t
          }
        ),
        /* @__PURE__ */ s.jsx(
          by,
          {
            active: v === "reports",
            reports: P,
            selectedReport: _t,
            reportContent: Jt,
            operationLog: tl,
            onChangeReport: Wc,
            onReloadReport: Mn
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(vy, { activeNav: v, onChangeNav: Za })
  ] });
}
const Mm = document.getElementById("appRoot");
if (!Mm)
  throw new Error("appRoot element not found");
Z0.createRoot(Mm).render(/* @__PURE__ */ s.jsx(cv, {}));
