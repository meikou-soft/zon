var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../.wrangler/tmp/bundle-VMfkbQ/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// ../.wrangler/tmp/bundle-VMfkbQ/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader.apply(null, argArray)
    ]);
  }
});

// _worker.js
var St = Object.defineProperty;
var Ie = /* @__PURE__ */ __name((e) => {
  throw TypeError(e);
}, "Ie");
var _t = /* @__PURE__ */ __name((e, t, n) => t in e ? St(e, t, { enumerable: true, configurable: true, writable: true, value: n }) : e[t] = n, "_t");
var p = /* @__PURE__ */ __name((e, t, n) => _t(e, typeof t != "symbol" ? t + "" : t, n), "p");
var Ce = /* @__PURE__ */ __name((e, t, n) => t.has(e) || Ie("Cannot " + n), "Ce");
var a = /* @__PURE__ */ __name((e, t, n) => (Ce(e, t, "read from private field"), n ? n.call(e) : t.get(e)), "a");
var x = /* @__PURE__ */ __name((e, t, n) => t.has(e) ? Ie("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), "x");
var f = /* @__PURE__ */ __name((e, t, n, s) => (Ce(e, t, "write to private field"), s ? s.call(e, n) : t.set(e, n), n), "f");
var m = /* @__PURE__ */ __name((e, t, n) => (Ce(e, t, "access private method"), n), "m");
var Me = /* @__PURE__ */ __name((e, t, n, s) => ({ set _(r) {
  f(e, t, r, n);
}, get _() {
  return a(e, t, s);
} }), "Me");
var Fe = /* @__PURE__ */ __name((e, t, n) => (s, r) => {
  let i = -1;
  return o(0);
  async function o(l) {
    if (l <= i)
      throw new Error("next() called multiple times");
    i = l;
    let c, d = false, u;
    if (e[l] ? (u = e[l][0][0], s.req.routeIndex = l) : u = l === e.length && r || void 0, u)
      try {
        c = await u(s, () => o(l + 1));
      } catch (h) {
        if (h instanceof Error && t)
          s.error = h, c = await t(h, s), d = true;
        else
          throw h;
      }
    else
      s.finalized === false && n && (c = await n(s));
    return c && (s.finalized === false || d) && (s.res = c), s;
  }
  __name(o, "o");
}, "Fe");
var jt = Symbol();
var Et = /* @__PURE__ */ __name(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: n = false, dot: s = false } = t, i = (e instanceof rt ? e.raw.headers : e.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? kt(e, { all: n, dot: s }) : {};
}, "Et");
async function kt(e, t) {
  const n = await e.formData();
  return n ? Rt(n, t) : {};
}
__name(kt, "kt");
function Rt(e, t) {
  const n = /* @__PURE__ */ Object.create(null);
  return e.forEach((s, r) => {
    t.all || r.endsWith("[]") ? Ot(n, r, s) : n[r] = s;
  }), t.dot && Object.entries(n).forEach(([s, r]) => {
    s.includes(".") && (At(n, s, r), delete n[s]);
  }), n;
}
__name(Rt, "Rt");
var Ot = /* @__PURE__ */ __name((e, t, n) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(n) : e[t] = [e[t], n] : t.endsWith("[]") ? e[t] = [n] : e[t] = n;
}, "Ot");
var At = /* @__PURE__ */ __name((e, t, n) => {
  let s = e;
  const r = t.split(".");
  r.forEach((i, o) => {
    o === r.length - 1 ? s[i] = n : ((!s[i] || typeof s[i] != "object" || Array.isArray(s[i]) || s[i] instanceof File) && (s[i] = /* @__PURE__ */ Object.create(null)), s = s[i]);
  });
}, "At");
var Ze = /* @__PURE__ */ __name((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "Ze");
var Ct = /* @__PURE__ */ __name((e) => {
  const { groups: t, path: n } = Pt(e), s = Ze(n);
  return Tt(s, t);
}, "Ct");
var Pt = /* @__PURE__ */ __name((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (n, s) => {
    const r = `@${s}`;
    return t.push([r, n]), r;
  }), { groups: t, path: e };
}, "Pt");
var Tt = /* @__PURE__ */ __name((e, t) => {
  for (let n = t.length - 1; n >= 0; n--) {
    const [s] = t[n];
    for (let r = e.length - 1; r >= 0; r--)
      if (e[r].includes(s)) {
        e[r] = e[r].replace(s, t[n][1]);
        break;
      }
  }
  return e;
}, "Tt");
var Se = {};
var Nt = /* @__PURE__ */ __name((e, t) => {
  if (e === "*")
    return "*";
  const n = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (n) {
    const s = `${e}#${t}`;
    return Se[s] || (n[2] ? Se[s] = t && t[0] !== ":" && t[0] !== "*" ? [s, n[1], new RegExp(`^${n[2]}(?=/${t})`)] : [e, n[1], new RegExp(`^${n[2]}$`)] : Se[s] = [e, n[1], true]), Se[s];
  }
  return null;
}, "Nt");
var $e = /* @__PURE__ */ __name((e, t) => {
  try {
    return t(e);
  } catch {
    return e.replace(/(?:%[0-9A-Fa-f]{2})+/g, (n) => {
      try {
        return t(n);
      } catch {
        return n;
      }
    });
  }
}, "$e");
var Ht = /* @__PURE__ */ __name((e) => $e(e, decodeURI), "Ht");
var et = /* @__PURE__ */ __name((e) => {
  const t = e.url, n = t.indexOf("/", t.charCodeAt(9) === 58 ? 13 : 8);
  let s = n;
  for (; s < t.length; s++) {
    const r = t.charCodeAt(s);
    if (r === 37) {
      const i = t.indexOf("?", s), o = t.slice(n, i === -1 ? void 0 : i);
      return Ht(o.includes("%25") ? o.replace(/%25/g, "%2525") : o);
    } else if (r === 63)
      break;
  }
  return t.slice(n, s);
}, "et");
var $t = /* @__PURE__ */ __name((e) => {
  const t = et(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "$t");
var te = /* @__PURE__ */ __name((e, t, ...n) => (n.length && (t = te(t, ...n)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "te");
var tt = /* @__PURE__ */ __name((e) => {
  if (e.charCodeAt(e.length - 1) !== 63 || !e.includes(":"))
    return null;
  const t = e.split("/"), n = [];
  let s = "";
  return t.forEach((r) => {
    if (r !== "" && !/\:/.test(r))
      s += "/" + r;
    else if (/\:/.test(r))
      if (/\?/.test(r)) {
        n.length === 0 && s === "" ? n.push("/") : n.push(s);
        const i = r.replace("?", "");
        s += "/" + i, n.push(s);
      } else
        s += "/" + r;
  }), n.filter((r, i, o) => o.indexOf(r) === i);
}, "tt");
var Pe = /* @__PURE__ */ __name((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? $e(e, st) : e) : e, "Pe");
var nt = /* @__PURE__ */ __name((e, t, n) => {
  let s;
  if (!n && t && !/[%+]/.test(t)) {
    let o = e.indexOf(`?${t}`, 8);
    for (o === -1 && (o = e.indexOf(`&${t}`, 8)); o !== -1; ) {
      const l = e.charCodeAt(o + t.length + 1);
      if (l === 61) {
        const c = o + t.length + 2, d = e.indexOf("&", c);
        return Pe(e.slice(c, d === -1 ? void 0 : d));
      } else if (l == 38 || isNaN(l))
        return "";
      o = e.indexOf(`&${t}`, o + 1);
    }
    if (s = /[%+]/.test(e), !s)
      return;
  }
  const r = {};
  s ?? (s = /[%+]/.test(e));
  let i = e.indexOf("?", 8);
  for (; i !== -1; ) {
    const o = e.indexOf("&", i + 1);
    let l = e.indexOf("=", i);
    l > o && o !== -1 && (l = -1);
    let c = e.slice(i + 1, l === -1 ? o === -1 ? void 0 : o : l);
    if (s && (c = Pe(c)), i = o, c === "")
      continue;
    let d;
    l === -1 ? d = "" : (d = e.slice(l + 1, o === -1 ? void 0 : o), s && (d = Pe(d))), n ? (r[c] && Array.isArray(r[c]) || (r[c] = []), r[c].push(d)) : r[c] ?? (r[c] = d);
  }
  return t ? r[t] : r;
}, "nt");
var Dt = nt;
var It = /* @__PURE__ */ __name((e, t) => nt(e, t, true), "It");
var st = decodeURIComponent;
var Le = /* @__PURE__ */ __name((e) => $e(e, st), "Le");
var re;
var O;
var M;
var it;
var at;
var Ne;
var L;
var Ve;
var rt = (Ve = /* @__PURE__ */ __name(class {
  constructor(e, t = "/", n = [[]]) {
    x(this, M);
    p(this, "raw");
    x(this, re);
    x(this, O);
    p(this, "routeIndex", 0);
    p(this, "path");
    p(this, "bodyCache", {});
    x(this, L, (e2) => {
      const { bodyCache: t2, raw: n2 } = this, s = t2[e2];
      if (s)
        return s;
      const r = Object.keys(t2)[0];
      return r ? t2[r].then((i) => (r === "json" && (i = JSON.stringify(i)), new Response(i)[e2]())) : t2[e2] = n2[e2]();
    });
    this.raw = e, this.path = t, f(this, O, n), f(this, re, {});
  }
  param(e) {
    return e ? m(this, M, it).call(this, e) : m(this, M, at).call(this);
  }
  query(e) {
    return Dt(this.url, e);
  }
  queries(e) {
    return It(this.url, e);
  }
  header(e) {
    if (e)
      return this.raw.headers.get(e) ?? void 0;
    const t = {};
    return this.raw.headers.forEach((n, s) => {
      t[s] = n;
    }), t;
  }
  async parseBody(e) {
    var t;
    return (t = this.bodyCache).parsedBody ?? (t.parsedBody = await Et(this, e));
  }
  json() {
    return a(this, L).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return a(this, L).call(this, "text");
  }
  arrayBuffer() {
    return a(this, L).call(this, "arrayBuffer");
  }
  blob() {
    return a(this, L).call(this, "blob");
  }
  formData() {
    return a(this, L).call(this, "formData");
  }
  addValidatedData(e, t) {
    a(this, re)[e] = t;
  }
  valid(e) {
    return a(this, re)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [jt]() {
    return a(this, O);
  }
  get matchedRoutes() {
    return a(this, O)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return a(this, O)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, "Ve"), re = /* @__PURE__ */ new WeakMap(), O = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakSet(), it = /* @__PURE__ */ __name(function(e) {
  const t = a(this, O)[0][this.routeIndex][1][e], n = m(this, M, Ne).call(this, t);
  return n ? /\%/.test(n) ? Le(n) : n : void 0;
}, "it"), at = /* @__PURE__ */ __name(function() {
  const e = {}, t = Object.keys(a(this, O)[0][this.routeIndex][1]);
  for (const n of t) {
    const s = m(this, M, Ne).call(this, a(this, O)[0][this.routeIndex][1][n]);
    s && typeof s == "string" && (e[n] = /\%/.test(s) ? Le(s) : s);
  }
  return e;
}, "at"), Ne = /* @__PURE__ */ __name(function(e) {
  return a(this, O)[1] ? a(this, O)[1][e] : e;
}, "Ne"), L = /* @__PURE__ */ new WeakMap(), Ve);
var Mt = { Stringify: 1 };
var ot = /* @__PURE__ */ __name(async (e, t, n, s, r) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const i = e.callbacks;
  return i != null && i.length ? (r ? r[0] += e : r = [e], Promise.all(i.map((l) => l({ phase: t, buffer: r, context: s }))).then((l) => Promise.all(l.filter(Boolean).map((c) => ot(c, t, false, s, r))).then(() => r[0]))) : Promise.resolve(e);
}, "ot");
var Ft = "text/plain; charset=UTF-8";
var Te = /* @__PURE__ */ __name((e, t) => ({ "Content-Type": e, ...t }), "Te");
var xe;
var me;
var H;
var ie;
var $;
var k;
var be;
var ae;
var oe;
var G;
var ye;
var ve;
var q;
var ne;
var Ke;
var Lt = (Ke = /* @__PURE__ */ __name(class {
  constructor(e, t) {
    x(this, q);
    x(this, xe);
    x(this, me);
    p(this, "env", {});
    x(this, H);
    p(this, "finalized", false);
    p(this, "error");
    x(this, ie);
    x(this, $);
    x(this, k);
    x(this, be);
    x(this, ae);
    x(this, oe);
    x(this, G);
    x(this, ye);
    x(this, ve);
    p(this, "render", (...e2) => (a(this, ae) ?? f(this, ae, (t2) => this.html(t2)), a(this, ae).call(this, ...e2)));
    p(this, "setLayout", (e2) => f(this, be, e2));
    p(this, "getLayout", () => a(this, be));
    p(this, "setRenderer", (e2) => {
      f(this, ae, e2);
    });
    p(this, "header", (e2, t2, n) => {
      this.finalized && f(this, k, new Response(a(this, k).body, a(this, k)));
      const s = a(this, k) ? a(this, k).headers : a(this, G) ?? f(this, G, new Headers());
      t2 === void 0 ? s.delete(e2) : n != null && n.append ? s.append(e2, t2) : s.set(e2, t2);
    });
    p(this, "status", (e2) => {
      f(this, ie, e2);
    });
    p(this, "set", (e2, t2) => {
      a(this, H) ?? f(this, H, /* @__PURE__ */ new Map()), a(this, H).set(e2, t2);
    });
    p(this, "get", (e2) => a(this, H) ? a(this, H).get(e2) : void 0);
    p(this, "newResponse", (...e2) => m(this, q, ne).call(this, ...e2));
    p(this, "body", (e2, t2, n) => m(this, q, ne).call(this, e2, t2, n));
    p(this, "text", (e2, t2, n) => !a(this, G) && !a(this, ie) && !t2 && !n && !this.finalized ? new Response(e2) : m(this, q, ne).call(this, e2, t2, Te(Ft, n)));
    p(this, "json", (e2, t2, n) => m(this, q, ne).call(this, JSON.stringify(e2), t2, Te("application/json", n)));
    p(this, "html", (e2, t2, n) => {
      const s = /* @__PURE__ */ __name((r) => m(this, q, ne).call(this, r, t2, Te("text/html; charset=UTF-8", n)), "s");
      return typeof e2 == "object" ? ot(e2, Mt.Stringify, false, {}).then(s) : s(e2);
    });
    p(this, "redirect", (e2, t2) => {
      const n = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(n) ? encodeURI(n) : n), this.newResponse(null, t2 ?? 302);
    });
    p(this, "notFound", () => (a(this, oe) ?? f(this, oe, () => new Response()), a(this, oe).call(this, this)));
    f(this, xe, e), t && (f(this, $, t.executionCtx), this.env = t.env, f(this, oe, t.notFoundHandler), f(this, ve, t.path), f(this, ye, t.matchResult));
  }
  get req() {
    return a(this, me) ?? f(this, me, new rt(a(this, xe), a(this, ve), a(this, ye))), a(this, me);
  }
  get event() {
    if (a(this, $) && "respondWith" in a(this, $))
      return a(this, $);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (a(this, $))
      return a(this, $);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return a(this, k) || f(this, k, new Response(null, { headers: a(this, G) ?? f(this, G, new Headers()) }));
  }
  set res(e) {
    if (a(this, k) && e) {
      e = new Response(e.body, e);
      for (const [t, n] of a(this, k).headers.entries())
        if (t !== "content-type")
          if (t === "set-cookie") {
            const s = a(this, k).headers.getSetCookie();
            e.headers.delete("set-cookie");
            for (const r of s)
              e.headers.append("set-cookie", r);
          } else
            e.headers.set(t, n);
    }
    f(this, k, e), this.finalized = true;
  }
  get var() {
    return a(this, H) ? Object.fromEntries(a(this, H)) : {};
  }
}, "Ke"), xe = /* @__PURE__ */ new WeakMap(), me = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), $ = /* @__PURE__ */ new WeakMap(), k = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakSet(), ne = /* @__PURE__ */ __name(function(e, t, n) {
  const s = a(this, k) ? new Headers(a(this, k).headers) : a(this, G) ?? new Headers();
  if (typeof t == "object" && "headers" in t) {
    const i = t.headers instanceof Headers ? t.headers : new Headers(t.headers);
    for (const [o, l] of i)
      o.toLowerCase() === "set-cookie" ? s.append(o, l) : s.set(o, l);
  }
  if (n)
    for (const [i, o] of Object.entries(n))
      if (typeof o == "string")
        s.set(i, o);
      else {
        s.delete(i);
        for (const l of o)
          s.append(i, l);
      }
  const r = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? a(this, ie);
  return new Response(e, { status: r, headers: s });
}, "ne"), Ke);
var w = "ALL";
var qt = "all";
var zt = ["get", "post", "put", "delete", "options", "patch"];
var ct = "Can not add a route since the matcher is already built.";
var lt = /* @__PURE__ */ __name(class extends Error {
}, "lt");
var Ut = "__COMPOSED_HANDLER";
var Vt = /* @__PURE__ */ __name((e) => e.text("404 Not Found", 404), "Vt");
var qe = /* @__PURE__ */ __name((e, t) => {
  if ("getResponse" in e) {
    const n = e.getResponse();
    return t.newResponse(n.body, n);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "qe");
var A;
var S;
var ut;
var C;
var W;
var _e;
var je;
var We;
var dt = (We = /* @__PURE__ */ __name(class {
  constructor(t = {}) {
    x(this, S);
    p(this, "get");
    p(this, "post");
    p(this, "put");
    p(this, "delete");
    p(this, "options");
    p(this, "patch");
    p(this, "all");
    p(this, "on");
    p(this, "use");
    p(this, "router");
    p(this, "getPath");
    p(this, "_basePath", "/");
    x(this, A, "/");
    p(this, "routes", []);
    x(this, C, Vt);
    p(this, "errorHandler", qe);
    p(this, "onError", (t2) => (this.errorHandler = t2, this));
    p(this, "notFound", (t2) => (f(this, C, t2), this));
    p(this, "fetch", (t2, ...n) => m(this, S, je).call(this, t2, n[1], n[0], t2.method));
    p(this, "request", (t2, n, s2, r2) => t2 instanceof Request ? this.fetch(n ? new Request(t2, n) : t2, s2, r2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${te("/", t2)}`, n), s2, r2)));
    p(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(m(this, S, je).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...zt, qt].forEach((i) => {
      this[i] = (o, ...l) => (typeof o == "string" ? f(this, A, o) : m(this, S, W).call(this, i, a(this, A), o), l.forEach((c) => {
        m(this, S, W).call(this, i, a(this, A), c);
      }), this);
    }), this.on = (i, o, ...l) => {
      for (const c of [o].flat()) {
        f(this, A, c);
        for (const d of [i].flat())
          l.map((u) => {
            m(this, S, W).call(this, d.toUpperCase(), a(this, A), u);
          });
      }
      return this;
    }, this.use = (i, ...o) => (typeof i == "string" ? f(this, A, i) : (f(this, A, "*"), o.unshift(i)), o.forEach((l) => {
      m(this, S, W).call(this, w, a(this, A), l);
    }), this);
    const { strict: s, ...r } = t;
    Object.assign(this, r), this.getPath = s ?? true ? t.getPath ?? et : $t;
  }
  route(t, n) {
    const s = this.basePath(t);
    return n.routes.map((r) => {
      var o;
      let i;
      n.errorHandler === qe ? i = r.handler : (i = /* @__PURE__ */ __name(async (l, c) => (await Fe([], n.errorHandler)(l, () => r.handler(l, c))).res, "i"), i[Ut] = r.handler), m(o = s, S, W).call(o, r.method, r.path, i);
    }), this;
  }
  basePath(t) {
    const n = m(this, S, ut).call(this);
    return n._basePath = te(this._basePath, t), n;
  }
  mount(t, n, s) {
    let r, i;
    s && (typeof s == "function" ? i = s : (i = s.optionHandler, s.replaceRequest === false ? r = /* @__PURE__ */ __name((c) => c, "r") : r = s.replaceRequest));
    const o = i ? (c) => {
      const d = i(c);
      return Array.isArray(d) ? d : [d];
    } : (c) => {
      let d;
      try {
        d = c.executionCtx;
      } catch {
      }
      return [c.env, d];
    };
    r || (r = (() => {
      const c = te(this._basePath, t), d = c === "/" ? 0 : c.length;
      return (u) => {
        const h = new URL(u.url);
        return h.pathname = h.pathname.slice(d) || "/", new Request(h, u);
      };
    })());
    const l = /* @__PURE__ */ __name(async (c, d) => {
      const u = await n(r(c.req.raw), ...o(c));
      if (u)
        return u;
      await d();
    }, "l");
    return m(this, S, W).call(this, w, te(t, "*"), l), this;
  }
}, "We"), A = /* @__PURE__ */ new WeakMap(), S = /* @__PURE__ */ new WeakSet(), ut = /* @__PURE__ */ __name(function() {
  const t = new dt({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, f(t, C, a(this, C)), t.routes = this.routes, t;
}, "ut"), C = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ __name(function(t, n, s) {
  t = t.toUpperCase(), n = te(this._basePath, n);
  const r = { basePath: this._basePath, path: n, method: t, handler: s };
  this.router.add(t, n, [s, r]), this.routes.push(r);
}, "W"), _e = /* @__PURE__ */ __name(function(t, n) {
  if (t instanceof Error)
    return this.errorHandler(t, n);
  throw t;
}, "_e"), je = /* @__PURE__ */ __name(function(t, n, s, r) {
  if (r === "HEAD")
    return (async () => new Response(null, await m(this, S, je).call(this, t, n, s, "GET")))();
  const i = this.getPath(t, { env: s }), o = this.router.match(r, i), l = new Lt(t, { path: i, matchResult: o, env: s, executionCtx: n, notFoundHandler: a(this, C) });
  if (o[0].length === 1) {
    let d;
    try {
      d = o[0][0][0][0](l, async () => {
        l.res = await a(this, C).call(this, l);
      });
    } catch (u) {
      return m(this, S, _e).call(this, u, l);
    }
    return d instanceof Promise ? d.then((u) => u || (l.finalized ? l.res : a(this, C).call(this, l))).catch((u) => m(this, S, _e).call(this, u, l)) : d ?? a(this, C).call(this, l);
  }
  const c = Fe(o[0], this.errorHandler, a(this, C));
  return (async () => {
    try {
      const d = await c(l);
      if (!d.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return d.res;
    } catch (d) {
      return m(this, S, _e).call(this, d, l);
    }
  })();
}, "je"), We);
var ke = "[^/]+";
var pe = ".*";
var ge = "(?:|/.*)";
var se = Symbol();
var Kt = new Set(".\\+*[^]$()");
function Wt(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === pe || e === ge ? 1 : t === pe || t === ge ? -1 : e === ke ? 1 : t === ke ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(Wt, "Wt");
var J;
var X;
var P;
var Be;
var He = (Be = /* @__PURE__ */ __name(class {
  constructor() {
    x(this, J);
    x(this, X);
    x(this, P, /* @__PURE__ */ Object.create(null));
  }
  insert(t, n, s, r, i) {
    if (t.length === 0) {
      if (a(this, J) !== void 0)
        throw se;
      if (i)
        return;
      f(this, J, n);
      return;
    }
    const [o, ...l] = t, c = o === "*" ? l.length === 0 ? ["", "", pe] : ["", "", ke] : o === "/*" ? ["", "", ge] : o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let d;
    if (c) {
      const u = c[1];
      let h = c[2] || ke;
      if (u && c[2] && (h === ".*" || (h = h.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(h))))
        throw se;
      if (d = a(this, P)[h], !d) {
        if (Object.keys(a(this, P)).some((g) => g !== pe && g !== ge))
          throw se;
        if (i)
          return;
        d = a(this, P)[h] = new He(), u !== "" && f(d, X, r.varIndex++);
      }
      !i && u !== "" && s.push([u, a(d, X)]);
    } else if (d = a(this, P)[o], !d) {
      if (Object.keys(a(this, P)).some((u) => u.length > 1 && u !== pe && u !== ge))
        throw se;
      if (i)
        return;
      d = a(this, P)[o] = new He();
    }
    d.insert(l, n, s, r, i);
  }
  buildRegExpStr() {
    const n = Object.keys(a(this, P)).sort(Wt).map((s) => {
      const r = a(this, P)[s];
      return (typeof a(r, X) == "number" ? `(${s})@${a(r, X)}` : Kt.has(s) ? `\\${s}` : s) + r.buildRegExpStr();
    });
    return typeof a(this, J) == "number" && n.unshift(`#${a(this, J)}`), n.length === 0 ? "" : n.length === 1 ? n[0] : "(?:" + n.join("|") + ")";
  }
}, "Be"), J = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), P = /* @__PURE__ */ new WeakMap(), Be);
var Re;
var we;
var Ge;
var Bt = (Ge = /* @__PURE__ */ __name(class {
  constructor() {
    x(this, Re, { varIndex: 0 });
    x(this, we, new He());
  }
  insert(e, t, n) {
    const s = [], r = [];
    for (let o = 0; ; ) {
      let l = false;
      if (e = e.replace(/\{[^}]+\}/g, (c) => {
        const d = `@\\${o}`;
        return r[o] = [d, c], o++, l = true, d;
      }), !l)
        break;
    }
    const i = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let o = r.length - 1; o >= 0; o--) {
      const [l] = r[o];
      for (let c = i.length - 1; c >= 0; c--)
        if (i[c].indexOf(l) !== -1) {
          i[c] = i[c].replace(l, r[o][1]);
          break;
        }
    }
    return a(this, we).insert(i, t, s, a(this, Re), n), s;
  }
  buildRegExp() {
    let e = a(this, we).buildRegExpStr();
    if (e === "")
      return [/^$/, [], []];
    let t = 0;
    const n = [], s = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (r, i, o) => i !== void 0 ? (n[++t] = Number(i), "$()") : (o !== void 0 && (s[Number(o)] = ++t), "")), [new RegExp(`^${e}`), n, s];
  }
}, "Ge"), Re = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), Ge);
var ht = [];
var Gt = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Ee = /* @__PURE__ */ Object.create(null);
function ft(e) {
  return Ee[e] ?? (Ee[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, n) => n ? `\\${n}` : "(?:|/.*)")}$`));
}
__name(ft, "ft");
function Jt() {
  Ee = /* @__PURE__ */ Object.create(null);
}
__name(Jt, "Jt");
function Xt(e) {
  var d;
  const t = new Bt(), n = [];
  if (e.length === 0)
    return Gt;
  const s = e.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, h], [g, v]) => u ? 1 : g ? -1 : h.length - v.length), r = /* @__PURE__ */ Object.create(null);
  for (let u = 0, h = -1, g = s.length; u < g; u++) {
    const [v, R, b] = s[u];
    v ? r[R] = [b.map(([E]) => [E, /* @__PURE__ */ Object.create(null)]), ht] : h++;
    let y;
    try {
      y = t.insert(R, h, v);
    } catch (E) {
      throw E === se ? new lt(R) : E;
    }
    v || (n[h] = b.map(([E, Z]) => {
      const ue = /* @__PURE__ */ Object.create(null);
      for (Z -= 1; Z >= 0; Z--) {
        const [T, Oe] = y[Z];
        ue[T] = Oe;
      }
      return [E, ue];
    }));
  }
  const [i, o, l] = t.buildRegExp();
  for (let u = 0, h = n.length; u < h; u++)
    for (let g = 0, v = n[u].length; g < v; g++) {
      const R = (d = n[u][g]) == null ? void 0 : d[1];
      if (!R)
        continue;
      const b = Object.keys(R);
      for (let y = 0, E = b.length; y < E; y++)
        R[b[y]] = l[R[b[y]]];
    }
  const c = [];
  for (const u in o)
    c[u] = n[o[u]];
  return [i, c, r];
}
__name(Xt, "Xt");
function ee(e, t) {
  if (e) {
    for (const n of Object.keys(e).sort((s, r) => r.length - s.length))
      if (ft(n).test(t))
        return [...e[n]];
  }
}
__name(ee, "ee");
var z;
var U;
var le;
var pt;
var gt;
var Je;
var Yt = (Je = /* @__PURE__ */ __name(class {
  constructor() {
    x(this, le);
    p(this, "name", "RegExpRouter");
    x(this, z);
    x(this, U);
    f(this, z, { [w]: /* @__PURE__ */ Object.create(null) }), f(this, U, { [w]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, n) {
    var l;
    const s = a(this, z), r = a(this, U);
    if (!s || !r)
      throw new Error(ct);
    s[e] || [s, r].forEach((c) => {
      c[e] = /* @__PURE__ */ Object.create(null), Object.keys(c[w]).forEach((d) => {
        c[e][d] = [...c[w][d]];
      });
    }), t === "/*" && (t = "*");
    const i = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const c = ft(t);
      e === w ? Object.keys(s).forEach((d) => {
        var u;
        (u = s[d])[t] || (u[t] = ee(s[d], t) || ee(s[w], t) || []);
      }) : (l = s[e])[t] || (l[t] = ee(s[e], t) || ee(s[w], t) || []), Object.keys(s).forEach((d) => {
        (e === w || e === d) && Object.keys(s[d]).forEach((u) => {
          c.test(u) && s[d][u].push([n, i]);
        });
      }), Object.keys(r).forEach((d) => {
        (e === w || e === d) && Object.keys(r[d]).forEach((u) => c.test(u) && r[d][u].push([n, i]));
      });
      return;
    }
    const o = tt(t) || [t];
    for (let c = 0, d = o.length; c < d; c++) {
      const u = o[c];
      Object.keys(r).forEach((h) => {
        var g;
        (e === w || e === h) && ((g = r[h])[u] || (g[u] = [...ee(s[h], u) || ee(s[w], u) || []]), r[h][u].push([n, i - d + c + 1]));
      });
    }
  }
  match(e, t) {
    Jt();
    const n = m(this, le, pt).call(this);
    return this.match = (s, r) => {
      const i = n[s] || n[w], o = i[2][r];
      if (o)
        return o;
      const l = r.match(i[0]);
      if (!l)
        return [[], ht];
      const c = l.indexOf("", 1);
      return [i[1][c], l];
    }, this.match(e, t);
  }
}, "Je"), z = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakSet(), pt = /* @__PURE__ */ __name(function() {
  const e = /* @__PURE__ */ Object.create(null);
  return Object.keys(a(this, U)).concat(Object.keys(a(this, z))).forEach((t) => {
    e[t] || (e[t] = m(this, le, gt).call(this, t));
  }), f(this, z, f(this, U, void 0)), e;
}, "pt"), gt = /* @__PURE__ */ __name(function(e) {
  const t = [];
  let n = e === w;
  return [a(this, z), a(this, U)].forEach((s) => {
    const r = s[e] ? Object.keys(s[e]).map((i) => [i, s[e][i]]) : [];
    r.length !== 0 ? (n || (n = true), t.push(...r)) : e !== w && t.push(...Object.keys(s[w]).map((i) => [i, s[w][i]]));
  }), n ? Xt(t) : null;
}, "gt"), Je);
var V;
var D;
var Xe;
var Qt = (Xe = /* @__PURE__ */ __name(class {
  constructor(e) {
    p(this, "name", "SmartRouter");
    x(this, V, []);
    x(this, D, []);
    f(this, V, e.routers);
  }
  add(e, t, n) {
    if (!a(this, D))
      throw new Error(ct);
    a(this, D).push([e, t, n]);
  }
  match(e, t) {
    if (!a(this, D))
      throw new Error("Fatal error");
    const n = a(this, V), s = a(this, D), r = n.length;
    let i = 0, o;
    for (; i < r; i++) {
      const l = n[i];
      try {
        for (let c = 0, d = s.length; c < d; c++)
          l.add(...s[c]);
        o = l.match(e, t);
      } catch (c) {
        if (c instanceof lt)
          continue;
        throw c;
      }
      this.match = l.match.bind(l), f(this, V, [l]), f(this, D, void 0);
      break;
    }
    if (i === r)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, o;
  }
  get activeRouter() {
    if (a(this, D) || a(this, V).length !== 1)
      throw new Error("No active router has been determined yet.");
    return a(this, V)[0];
  }
}, "Xe"), V = /* @__PURE__ */ new WeakMap(), D = /* @__PURE__ */ new WeakMap(), Xe);
var fe = /* @__PURE__ */ Object.create(null);
var K;
var j;
var Y;
var ce;
var _;
var I;
var B;
var Ye;
var xt = (Ye = /* @__PURE__ */ __name(class {
  constructor(e, t, n) {
    x(this, I);
    x(this, K);
    x(this, j);
    x(this, Y);
    x(this, ce, 0);
    x(this, _, fe);
    if (f(this, j, n || /* @__PURE__ */ Object.create(null)), f(this, K, []), e && t) {
      const s = /* @__PURE__ */ Object.create(null);
      s[e] = { handler: t, possibleKeys: [], score: 0 }, f(this, K, [s]);
    }
    f(this, Y, []);
  }
  insert(e, t, n) {
    f(this, ce, ++Me(this, ce)._);
    let s = this;
    const r = Ct(t), i = [];
    for (let o = 0, l = r.length; o < l; o++) {
      const c = r[o], d = r[o + 1], u = Nt(c, d), h = Array.isArray(u) ? u[0] : c;
      if (h in a(s, j)) {
        s = a(s, j)[h], u && i.push(u[1]);
        continue;
      }
      a(s, j)[h] = new xt(), u && (a(s, Y).push(u), i.push(u[1])), s = a(s, j)[h];
    }
    return a(s, K).push({ [e]: { handler: n, possibleKeys: i.filter((o, l, c) => c.indexOf(o) === l), score: a(this, ce) } }), s;
  }
  search(e, t) {
    var l;
    const n = [];
    f(this, _, fe);
    let r = [this];
    const i = Ze(t), o = [];
    for (let c = 0, d = i.length; c < d; c++) {
      const u = i[c], h = c === d - 1, g = [];
      for (let v = 0, R = r.length; v < R; v++) {
        const b = r[v], y = a(b, j)[u];
        y && (f(y, _, a(b, _)), h ? (a(y, j)["*"] && n.push(...m(this, I, B).call(this, a(y, j)["*"], e, a(b, _))), n.push(...m(this, I, B).call(this, y, e, a(b, _)))) : g.push(y));
        for (let E = 0, Z = a(b, Y).length; E < Z; E++) {
          const ue = a(b, Y)[E], T = a(b, _) === fe ? {} : { ...a(b, _) };
          if (ue === "*") {
            const F = a(b, j)["*"];
            F && (n.push(...m(this, I, B).call(this, F, e, a(b, _))), f(F, _, T), g.push(F));
            continue;
          }
          const [Oe, De, he] = ue;
          if (!u && !(he instanceof RegExp))
            continue;
          const N = a(b, j)[Oe], wt = i.slice(c).join("/");
          if (he instanceof RegExp) {
            const F = he.exec(wt);
            if (F) {
              if (T[De] = F[0], n.push(...m(this, I, B).call(this, N, e, a(b, _), T)), Object.keys(a(N, j)).length) {
                f(N, _, T);
                const Ae = ((l = F[0].match(/\//)) == null ? void 0 : l.length) ?? 0;
                (o[Ae] || (o[Ae] = [])).push(N);
              }
              continue;
            }
          }
          (he === true || he.test(u)) && (T[De] = u, h ? (n.push(...m(this, I, B).call(this, N, e, T, a(b, _))), a(N, j)["*"] && n.push(...m(this, I, B).call(this, a(N, j)["*"], e, T, a(b, _)))) : (f(N, _, T), g.push(N)));
        }
      }
      r = g.concat(o.shift() ?? []);
    }
    return n.length > 1 && n.sort((c, d) => c.score - d.score), [n.map(({ handler: c, params: d }) => [c, d])];
  }
}, "Ye"), K = /* @__PURE__ */ new WeakMap(), j = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), _ = /* @__PURE__ */ new WeakMap(), I = /* @__PURE__ */ new WeakSet(), B = /* @__PURE__ */ __name(function(e, t, n, s) {
  const r = [];
  for (let i = 0, o = a(e, K).length; i < o; i++) {
    const l = a(e, K)[i], c = l[t] || l[w], d = {};
    if (c !== void 0 && (c.params = /* @__PURE__ */ Object.create(null), r.push(c), n !== fe || s && s !== fe))
      for (let u = 0, h = c.possibleKeys.length; u < h; u++) {
        const g = c.possibleKeys[u], v = d[c.score];
        c.params[g] = s != null && s[g] && !v ? s[g] : n[g] ?? (s == null ? void 0 : s[g]), d[c.score] = true;
      }
  }
  return r;
}, "B"), Ye);
var Q;
var Qe;
var Zt = (Qe = /* @__PURE__ */ __name(class {
  constructor() {
    p(this, "name", "TrieRouter");
    x(this, Q);
    f(this, Q, new xt());
  }
  add(e, t, n) {
    const s = tt(t);
    if (s) {
      for (let r = 0, i = s.length; r < i; r++)
        a(this, Q).insert(e, s[r], n);
      return;
    }
    a(this, Q).insert(e, t, n);
  }
  match(e, t) {
    return a(this, Q).search(e, t);
  }
}, "Qe"), Q = /* @__PURE__ */ new WeakMap(), Qe);
var mt = /* @__PURE__ */ __name(class extends dt {
  constructor(e = {}) {
    super(e), this.router = e.router ?? new Qt({ routers: [new Yt(), new Zt()] });
  }
}, "mt");
var en = /* @__PURE__ */ __name((e) => {
  const n = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...e }, s = ((i) => typeof i == "string" ? i === "*" ? () => i : (o) => i === o ? o : null : typeof i == "function" ? i : (o) => i.includes(o) ? o : null)(n.origin), r = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(n.allowMethods);
  return async function(o, l) {
    var u;
    function c(h, g) {
      o.res.headers.set(h, g);
    }
    __name(c, "c");
    const d = s(o.req.header("origin") || "", o);
    if (d && c("Access-Control-Allow-Origin", d), n.origin !== "*") {
      const h = o.req.header("Vary");
      h ? c("Vary", h) : c("Vary", "Origin");
    }
    if (n.credentials && c("Access-Control-Allow-Credentials", "true"), (u = n.exposeHeaders) != null && u.length && c("Access-Control-Expose-Headers", n.exposeHeaders.join(",")), o.req.method === "OPTIONS") {
      n.maxAge != null && c("Access-Control-Max-Age", n.maxAge.toString());
      const h = r(o.req.header("origin") || "", o);
      h.length && c("Access-Control-Allow-Methods", h.join(","));
      let g = n.allowHeaders;
      if (!(g != null && g.length)) {
        const v = o.req.header("Access-Control-Request-Headers");
        v && (g = v.split(/\s*,\s*/));
      }
      return g != null && g.length && (c("Access-Control-Allow-Headers", g.join(",")), o.res.headers.append("Vary", "Access-Control-Request-Headers")), o.res.headers.delete("Content-Length"), o.res.headers.delete("Content-Type"), new Response(null, { headers: o.res.headers, status: 204, statusText: "No Content" });
    }
    await l();
  };
}, "en");
var tn = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var ze = /* @__PURE__ */ __name((e, t = sn) => {
  const n = /\.([a-zA-Z0-9]+?)$/, s = e.match(n);
  if (!s)
    return;
  let r = t[s[1]];
  return r && r.startsWith("text") && (r += "; charset=utf-8"), r;
}, "ze");
var nn = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var sn = nn;
var rn = /* @__PURE__ */ __name((...e) => {
  let t = e.filter((r) => r !== "").join("/");
  t = t.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const n = t.split("/"), s = [];
  for (const r of n)
    r === ".." && s.length > 0 && s.at(-1) !== ".." ? s.pop() : r !== "." && s.push(r);
  return s.join("/") || ".";
}, "rn");
var bt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var an = Object.keys(bt);
var on = "index.html";
var cn = /* @__PURE__ */ __name((e) => {
  const t = e.root ?? "./", n = e.path, s = e.join ?? rn;
  return async (r, i) => {
    var u, h, g, v;
    if (r.finalized)
      return i();
    let o;
    if (e.path)
      o = e.path;
    else
      try {
        if (o = decodeURIComponent(r.req.path), /(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(o))
          throw new Error();
      } catch {
        return await ((u = e.onNotFound) == null ? void 0 : u.call(e, r.req.path, r)), i();
      }
    let l = s(t, !n && e.rewriteRequestPath ? e.rewriteRequestPath(o) : o);
    e.isDir && await e.isDir(l) && (l = s(l, on));
    const c = e.getContent;
    let d = await c(l, r);
    if (d instanceof Response)
      return r.newResponse(d.body, d);
    if (d) {
      const R = e.mimes && ze(l, e.mimes) || ze(l);
      if (r.header("Content-Type", R || "application/octet-stream"), e.precompressed && (!R || tn.test(R))) {
        const b = new Set((h = r.req.header("Accept-Encoding")) == null ? void 0 : h.split(",").map((y) => y.trim()));
        for (const y of an) {
          if (!b.has(y))
            continue;
          const E = await c(l + bt[y], r);
          if (E) {
            d = E, r.header("Content-Encoding", y), r.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((g = e.onFound) == null ? void 0 : g.call(e, l, r)), r.body(d);
    }
    await ((v = e.onNotFound) == null ? void 0 : v.call(e, l, r)), await i();
  };
}, "cn");
var ln = /* @__PURE__ */ __name(async (e, t) => {
  let n;
  t && t.manifest ? typeof t.manifest == "string" ? n = JSON.parse(t.manifest) : n = t.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? n = JSON.parse(__STATIC_CONTENT_MANIFEST) : n = __STATIC_CONTENT_MANIFEST;
  let s;
  t && t.namespace ? s = t.namespace : s = __STATIC_CONTENT;
  const r = n[e] || e;
  if (!r)
    return null;
  const i = await s.get(r, { type: "stream" });
  return i || null;
}, "ln");
var dn = /* @__PURE__ */ __name((e) => async function(n, s) {
  return cn({ ...e, getContent: async (i) => ln(i, { manifest: e.manifest, namespace: e.namespace ? e.namespace : n.env ? n.env.__STATIC_CONTENT : void 0 }) })(n, s);
}, "dn");
var un = /* @__PURE__ */ __name((e) => dn(e), "un");
var yt = [{ id: "hanako", title: "\u30C8\u30A4\u30EC\u306E\u82B1\u5B50\u3055\u3093", subtitle: "\u5B66\u6821\u306E\u4E03\u4E0D\u601D\u8B70", description: "3\u968E\u306E\u5973\u5B50\u30C8\u30A4\u30EC\u306B\u306F\u3001\u82B1\u5B50\u3055\u3093\u3068\u3044\u3046\u5C11\u5973\u306E\u970A\u304C\u4F4F\u3093\u3067\u3044\u308B\u3068\u3044\u3046...", thumbnail: "/static/images/hanako_thumb.jpg", category: "school", scenes: [{ id: "start", background: "/static/images/school_hallway.jpg", bgm: "/static/audio/bgm_suspense.mp3", text: "\u653E\u8AB2\u5F8C\u306E\u6821\u820E\u3002\u8584\u6697\u3044\u5ECA\u4E0B\u3092\u6B69\u3044\u3066\u3044\u308B\u3068\u3001\u53CB\u9054\u306E\u7F8E\u9999\u304C\u8A00\u3063\u305F\u3002", nextScene: "scene1" }, { id: "scene1", text: "\u300C\u306D\u3048\u3001\u77E5\u3063\u3066\u308B\uFF1F3\u968E\u306E\u5973\u5B50\u30C8\u30A4\u30EC\u306B\u82B1\u5B50\u3055\u3093\u3063\u3066\u5E7D\u970A\u304C\u3044\u308B\u3093\u3060\u3063\u3066\u300D", character: "\u7F8E\u9999", nextScene: "scene2" }, { id: "scene2", text: "\u7F8E\u9999\u306E\u8A71\u306B\u3088\u308B\u3068\u30013\u968E\u306E\u5973\u5B50\u30C8\u30A4\u30EC\u306E3\u756A\u76EE\u306E\u500B\u5BA4\u3092\u30CE\u30C3\u30AF\u3057\u3066\u300C\u82B1\u5B50\u3055\u3093\u3001\u904A\u3073\u307E\u3057\u3087\u300D\u30683\u56DE\u8A00\u3046\u3068\u8FD4\u4E8B\u304C\u8FD4\u3063\u3066\u304F\u308B\u3089\u3057\u3044\u3002", choices: [{ text: "\u8A66\u3057\u3066\u307F\u308B", nextScene: "try_it" }, { text: "\u6016\u3044\u304B\u3089\u3084\u3081\u308B", nextScene: "refuse" }] }, { id: "try_it", background: "/static/images/toilet.jpg", text: "\u597D\u5947\u5FC3\u306B\u8CA0\u3051\u3066\u3001\u79C1\u305F\u3061\u306F3\u968E\u306E\u5973\u5B50\u30C8\u30A4\u30EC\u3078\u5411\u304B\u3063\u305F\u3002", effects: [{ type: "fade", duration: 1e3 }], nextScene: "knock" }, { id: "knock", text: "\u8584\u6697\u3044\u30C8\u30A4\u30EC\u306E\u524D\u3067\u3001\u79C1\u306F\u6DF1\u547C\u5438\u3092\u3057\u305F\u3002\u305D\u3057\u3066\u30013\u756A\u76EE\u306E\u500B\u5BA4\u306E\u30C9\u30A2\u30923\u56DE\u30CE\u30C3\u30AF\u3059\u308B\u3002", effects: [{ type: "sound", sound: "/static/audio/knock.mp3" }], nextScene: "call" }, { id: "call", text: "\u300C\u82B1\u5B50\u3055\u3093...\u82B1\u5B50\u3055\u3093...\u904A\u3073\u307E\u3057\u3087...\u300D", nextScene: "response" }, { id: "response", text: "\u3057\u3070\u3089\u304F\u6C88\u9ED9\u304C\u7D9A\u3044\u305F\u3002\u305D\u3057\u3066...", effects: [{ type: "sound", sound: "/static/audio/creak.mp3" }], nextScene: "voice" }, { id: "voice", text: "\u300C...\u306F\u30FC\u3044\u300D", character: "\uFF1F\uFF1F\uFF1F", effects: [{ type: "shake", duration: 500 }, { type: "sound", sound: "/static/audio/ghost_voice.mp3" }], nextScene: "door_open" }, { id: "door_open", text: "\u3086\u3063\u304F\u308A\u3068\u3001\u500B\u5BA4\u306E\u30C9\u30A2\u304C\u958B\u304D\u59CB\u3081\u305F\u3002\u305D\u3053\u306B\u306F\u8D64\u3044\u30B9\u30AB\u30FC\u30C8\u3092\u5C65\u3044\u305F\u5C11\u5973\u304C\u7ACB\u3063\u3066\u3044\u305F\u3002", background: "/static/images/hanako.jpg", effects: [{ type: "flash", duration: 200 }], nextScene: "ending_bad" }, { id: "ending_bad", text: "\u305D\u306E\u5F8C\u3001\u79C1\u305F\u3061\u304C\u3069\u3046\u306A\u3063\u305F\u304B\u306F...\u8AB0\u3082\u77E5\u3089\u306A\u3044\u3002", bgm: "/static/audio/bgm_horror.mp3", nextScene: null }, { id: "refuse", text: "\u300C\u3084\u3063\u3071\u308A\u6016\u3044\u304B\u3089\u3084\u3081\u3088\u3046\u300D\u79C1\u305F\u3061\u306F\u8DB3\u65E9\u306B\u305D\u306E\u5834\u3092\u96E2\u308C\u305F\u3002\u3067\u3082\u3001\u305D\u306E\u591C\u304B\u3089\u5947\u5999\u306A\u3053\u3068\u304C\u8D77\u304D\u59CB\u3081\u305F...", nextScene: "ending_safe" }, { id: "ending_safe", text: "\u30C8\u30A4\u30EC\u306B\u884C\u304F\u305F\u3073\u306B\u3001\u8AB0\u304B\u306B\u898B\u3089\u308C\u3066\u3044\u308B\u6C17\u304C\u3059\u308B\u3002\u82B1\u5B50\u3055\u3093\u306F\u3001\u547C\u3070\u308C\u308B\u306E\u3092\u5F85\u3063\u3066\u3044\u308B\u306E\u304B\u3082\u3057\u308C\u306A\u3044\u3002", nextScene: null }] }, { id: "stairs", title: "13\u968E\u6BB5\u306E\u546A\u3044", subtitle: "\u6DF1\u591C\u306E\u5B66\u6821", description: "\u666E\u6BB512\u6BB5\u306E\u968E\u6BB5\u304C\u3001\u6DF1\u591C\u306B\u306A\u308B\u306813\u6BB5\u306B\u306A\u308B\u3068\u3044\u3046...", thumbnail: "/static/images/stairs_thumb.jpg", category: "school", scenes: [{ id: "start", background: "/static/images/school_night.jpg", bgm: "/static/audio/bgm_dark.mp3", text: "\u809D\u8A66\u3057\u3067\u591C\u306E\u5B66\u6821\u306B\u5FCD\u3073\u8FBC\u3093\u3060\u3002\u61D0\u4E2D\u96FB\u706F\u306E\u5149\u3060\u3051\u304C\u983C\u308A\u3060\u3002", nextScene: "scene1" }, { id: "scene1", text: "\u300C\u3053\u306E\u968E\u6BB5\u3001\u663C\u9593\u306F12\u6BB5\u306A\u306E\u306B\u3001\u591C\u4E2D\u306B\u306A\u308B\u306813\u6BB5\u306B\u306A\u308B\u3063\u3066\u5642\u304C\u3042\u308B\u3093\u3060\u300D", character: "\u592A\u90CE", nextScene: "scene2" }, { id: "scene2", text: "\u78BA\u304B\u3081\u308B\u305F\u3081\u306B\u3001\u968E\u6BB5\u3092\u6570\u3048\u306A\u304C\u3089\u4E0A\u308B\u3053\u3068\u306B\u3057\u305F\u3002", choices: [{ text: "\u3086\u3063\u304F\u308A\u6570\u3048\u308B", nextScene: "count_slow" }, { text: "\u6025\u3044\u3067\u4E0A\u308B", nextScene: "count_fast" }] }, { id: "count_slow", text: "\u300C1...2...3...\u300D\u3086\u3063\u304F\u308A\u3068\u968E\u6BB5\u3092\u6570\u3048\u306A\u304C\u3089\u4E0A\u308B\u3002\u300C10...11...12...\u300D", nextScene: "thirteen" }, { id: "thirteen", text: "\u305D\u3057\u3066...\u300C13\u300D", effects: [{ type: "shake", duration: 1e3 }, { type: "sound", sound: "/static/audio/thunder.mp3" }], nextScene: "disappear" }, { id: "disappear", text: "13\u6BB5\u76EE\u3092\u8E0F\u3093\u3060\u77AC\u9593\u3001\u4E16\u754C\u304C\u6B6A\u3093\u3060\u3002\u6C17\u304C\u3064\u304F\u3068\u3001\u898B\u77E5\u3089\u306C\u5834\u6240\u306B\u7ACB\u3063\u3066\u3044\u305F\u3002", background: "/static/images/void.jpg", nextScene: "ending_lost" }, { id: "ending_lost", text: "\u305D\u308C\u4EE5\u6765\u3001\u592A\u90CE\u3092\u898B\u305F\u8005\u306F\u3044\u306A\u3044\u3002\u5B66\u6821\u306E\u968E\u6BB5\u306F\u4ECA\u3082\u3001\u591C\u306B\u306A\u308B\u306813\u6BB5\u306B\u306A\u308B\u3068\u3044\u3046\u3002", nextScene: null }, { id: "count_fast", text: "\u6016\u304F\u306A\u3063\u3066\u99C6\u3051\u4E0A\u304C\u3063\u305F\u3002\u6570\u3048\u308B\u4F59\u88D5\u306A\u3093\u3066\u306A\u304B\u3063\u305F\u3002", nextScene: "ending_escape" }, { id: "ending_escape", text: "\u7121\u4E8B\u306B\u4E0A\u306E\u968E\u306B\u305F\u3069\u308A\u7740\u3044\u305F\u3002\u3067\u3082\u3001\u4E0B\u3092\u898B\u308B\u3068\u968E\u6BB5\u304C\u6B6A\u3093\u3067\u898B\u3048\u305F\u3002\u3042\u308C\u306F\u672C\u5F53\u306B12\u6BB5\u3060\u3063\u305F\u306E\u3060\u308D\u3046\u304B\uFF1F", nextScene: null }] }, { id: "music_room", title: "\u97F3\u697D\u5BA4\u306E\u30D9\u30FC\u30C8\u30FC\u30D9\u30F3", subtitle: "\u52D5\u304F\u8096\u50CF\u753B", description: "\u6DF1\u591C\u306E\u97F3\u697D\u5BA4\u304B\u3089\u805E\u3053\u3048\u308B\u30D4\u30A2\u30CE\u306E\u97F3\u3002\u305D\u3057\u3066\u52D5\u304D\u51FA\u3059\u8096\u50CF\u753B...", thumbnail: "/static/images/music_thumb.jpg", category: "school", scenes: [{ id: "start", background: "/static/images/music_room.jpg", bgm: "/static/audio/bgm_piano.mp3", text: "\u90E8\u6D3B\u306E\u7DF4\u7FD2\u3067\u9045\u304F\u306A\u3063\u305F\u3002\u97F3\u697D\u5BA4\u306E\u524D\u3092\u901A\u308A\u304B\u304B\u308B\u3068\u3001\u4E2D\u304B\u3089\u30D4\u30A2\u30CE\u306E\u97F3\u304C\u805E\u3053\u3048\u3066\u304D\u305F\u3002", nextScene: "scene1" }, { id: "scene1", text: "\u8AB0\u3082\u3044\u306A\u3044\u306F\u305A\u306E\u97F3\u697D\u5BA4\u3002\u3067\u3082\u78BA\u304B\u306B\u300C\u30A8\u30EA\u30FC\u30BC\u306E\u305F\u3081\u306B\u300D\u304C\u6D41\u308C\u3066\u3044\u308B\u3002", effects: [{ type: "sound", sound: "/static/audio/elise.mp3" }], choices: [{ text: "\u4E2D\u3092\u8997\u304F", nextScene: "peek" }, { text: "\u9003\u3052\u308B", nextScene: "run" }] }, { id: "peek", text: "\u30C9\u30A2\u306E\u9699\u9593\u304B\u3089\u4E2D\u3092\u8997\u3044\u305F\u3002\u8AB0\u3082\u3044\u306A\u3044...\u3067\u3082\u3001\u30D4\u30A2\u30CE\u306E\u9375\u76E4\u304C\u52DD\u624B\u306B\u52D5\u3044\u3066\u3044\u308B\uFF01", effects: [{ type: "shake", duration: 500 }], nextScene: "portrait" }, { id: "portrait", text: "\u305D\u3057\u3066\u6C17\u3065\u3044\u305F\u3002\u58C1\u306E\u30D9\u30FC\u30C8\u30FC\u30D9\u30F3\u306E\u8096\u50CF\u753B...\u76EE\u304C\u3001\u3053\u3061\u3089\u3092\u898B\u3066\u3044\u308B\uFF01", background: "/static/images/beethoven.jpg", effects: [{ type: "flash", duration: 300 }], nextScene: "ending_horror" }, { id: "ending_horror", text: "\u8096\u50CF\u753B\u304C\u7B11\u3063\u305F\u6C17\u304C\u3057\u305F\u3002\u305D\u306E\u77AC\u9593\u3001\u30D4\u30A2\u30CE\u306E\u97F3\u304C\u6B62\u307E\u308A\u3001\u5ECA\u4E0B\u306E\u96FB\u6C17\u304C\u6D88\u3048\u305F\u3002\u6697\u95C7\u306E\u4E2D\u3001\u4F55\u304B\u304C\u8FD1\u3065\u3044\u3066\u304F\u308B\u97F3\u304C\u3059\u308B...", bgm: null, effects: [{ type: "fade", duration: 2e3 }], nextScene: null }, { id: "run", text: "\u6050\u6016\u3067\u8DB3\u304C\u9707\u3048\u305F\u304C\u3001\u5FC5\u6B7B\u306B\u8D70\u3063\u3066\u9003\u3052\u305F\u3002", nextScene: "ending_safe" }, { id: "ending_safe", text: "\u7FCC\u65E5\u3001\u97F3\u697D\u5BA4\u3092\u78BA\u8A8D\u3057\u305F\u304C\u4F55\u3082\u7570\u5E38\u306F\u306A\u304B\u3063\u305F\u3002\u3067\u3082\u3001\u30D9\u30FC\u30C8\u30FC\u30D9\u30F3\u306E\u8096\u50CF\u753B\u3060\u3051\u306F\u3001\u306A\u305C\u304B\u5FAE\u7B11\u3093\u3067\u3044\u308B\u3088\u3046\u306B\u898B\u3048\u305F\u3002", nextScene: null }] }, { id: "umibozu", title: "\u6D77\u574A\u4E3B\u306E\u6050\u6016", subtitle: "\u304A\u76C6\u306E\u6D77", description: "\u304A\u76C6\u306B\u6D77\u306B\u5165\u3063\u3066\u306F\u3044\u3051\u306A\u3044\u3002\u305D\u3053\u306B\u306F\u6D77\u574A\u4E3B\u304C...", thumbnail: "/static/images/sea_thumb.jpg", category: "sea", scenes: [{ id: "start", background: "/static/images/beach.jpg", bgm: "/static/audio/bgm_wave.mp3", text: "\u304A\u76C6\u306A\u306E\u306B\u53CB\u9054\u3068\u6D77\u306B\u6765\u3066\u3057\u307E\u3063\u305F\u3002\u300C\u304A\u76C6\u306E\u6D77\u306F\u5371\u967A\u3060\u300D\u3068\u7956\u6BCD\u304C\u8A00\u3063\u3066\u3044\u305F\u3051\u3069...", nextScene: "scene1" }, { id: "scene1", text: "\u6D77\u306F\u7A4F\u3084\u304B\u3067\u3001\u3068\u3066\u3082\u5371\u967A\u306B\u306F\u898B\u3048\u306A\u304B\u3063\u305F\u3002", choices: [{ text: "\u6CF3\u3050", nextScene: "swim" }, { text: "\u6D5C\u8FBA\u3067\u5F85\u3064", nextScene: "wait" }] }, { id: "swim", text: "\u6D77\u306B\u5165\u3063\u3066\u6CF3\u304E\u59CB\u3081\u305F\u3002\u6C34\u306F\u51B7\u305F\u304F\u3066\u6C17\u6301\u3061\u3044\u3044\u3002", nextScene: "shadow" }, { id: "shadow", text: "\u3057\u3070\u3089\u304F\u6CF3\u3044\u3067\u3044\u308B\u3068\u3001\u6C34\u9762\u306B\u5927\u304D\u306A\u9ED2\u3044\u5F71\u304C\u73FE\u308C\u305F\u3002", effects: [{ type: "shake", duration: 500 }], nextScene: "umibozu_appear" }, { id: "umibozu_appear", background: "/static/images/umibozu.jpg", text: "\u5DE8\u5927\u306A\u9ED2\u3044\u574A\u4E3B\u982D\u304C\u6C34\u9762\u304B\u3089\u73FE\u308C\u305F\u3002\u300C\u3072\u3057\u3083\u304F\u3092\u8CB8\u305B...\u300D", character: "\u6D77\u574A\u4E3B", effects: [{ type: "sound", sound: "/static/audio/monster_voice.mp3" }, { type: "flash", duration: 200 }], choices: [{ text: "\u3072\u3057\u3083\u304F\u3092\u6E21\u3059", nextScene: "give_ladle" }, { text: "\u7121\u8996\u3057\u3066\u9003\u3052\u308B", nextScene: "escape" }] }, { id: "give_ladle", text: "\u306A\u305C\u304B\u6301\u3063\u3066\u3044\u305F\u3072\u3057\u3083\u304F\u3092\u6E21\u3059\u3068\u3001\u6D77\u574A\u4E3B\u306F\u305D\u308C\u3067\u6D77\u6C34\u3092\u6C72\u307F\u59CB\u3081\u305F\u3002\u305D\u3057\u3066...", nextScene: "ending_sink" }, { id: "ending_sink", text: "\u6D77\u574A\u4E3B\u306F\u8239\u306B\u6C34\u3092\u5165\u308C\u59CB\u3081\u305F\u3002\u3069\u3093\u3069\u3093\u6C34\u304C\u5165\u3063\u3066\u304F\u308B\u3002\u6C88\u3080...\u6C88\u3093\u3067\u3044\u304F...", effects: [{ type: "fade", duration: 3e3 }], nextScene: null }, { id: "escape", text: "\u5FC5\u6B7B\u306B\u5CB8\u3078\u5411\u304B\u3063\u3066\u6CF3\u3044\u3060\u3002\u80CC\u5F8C\u304B\u3089\u6050\u308D\u3057\u3044\u58F0\u304C\u805E\u3053\u3048\u308B\u3002", nextScene: "ending_survive" }, { id: "ending_survive", text: "\u306A\u3093\u3068\u304B\u6D5C\u8FBA\u306B\u305F\u3069\u308A\u7740\u3044\u305F\u3002\u632F\u308A\u8FD4\u308B\u3068\u3001\u6D77\u306B\u306F\u4F55\u3082\u3044\u306A\u304B\u3063\u305F\u3002\u3067\u3082\u3001\u304A\u76C6\u306E\u6D77\u306B\u306F\u4E8C\u5EA6\u3068\u5165\u3089\u306A\u3044\u3068\u8A93\u3063\u305F\u3002", nextScene: null }, { id: "wait", text: "\u5ACC\u306A\u4E88\u611F\u304C\u3057\u3066\u6D5C\u8FBA\u3067\u5F85\u3064\u3053\u3068\u306B\u3057\u305F\u3002", nextScene: "ending_wise" }, { id: "ending_wise", text: "\u3057\u3070\u3089\u304F\u3059\u308B\u3068\u3001\u6C96\u306E\u65B9\u3067\u9ED2\u3044\u4F55\u304B\u304C\u52D5\u3044\u3066\u3044\u308B\u306E\u304C\u898B\u3048\u305F\u3002\u3084\u306F\u308A\u7956\u6BCD\u306E\u8A00\u3046\u3053\u3068\u306F\u6B63\u3057\u304B\u3063\u305F\u3002", nextScene: null }] }, { id: "kamikakushi", title: "\u5C71\u306E\u795E\u96A0\u3057", subtitle: "\u30AD\u30E3\u30F3\u30D7\u5834\u306E\u602A", description: "\u5C71\u3067\u306E\u30AD\u30E3\u30F3\u30D7\u3002\u4E00\u4EBA\u3060\u3051\u59FF\u3092\u6D88\u3057\u305F\u53CB\u4EBA\u306E\u884C\u65B9\u306F...", thumbnail: "/static/images/mountain_thumb.jpg", category: "mountain", scenes: [{ id: "start", background: "/static/images/camp.jpg", bgm: "/static/audio/bgm_forest.mp3", text: "\u590F\u4F11\u307F\u3001\u53CB\u9054\u3068\u30AD\u30E3\u30F3\u30D7\u306B\u6765\u305F\u3002\u697D\u3057\u3044\u6642\u9593\u3092\u904E\u3054\u3057\u3066\u3044\u305F\u304C\u3001\u591C\u306B\u306A\u3063\u3066\u4E00\u4EBA\u304C\u884C\u65B9\u4E0D\u660E\u306B\u306A\u3063\u305F\u3002", nextScene: "scene1" }, { id: "scene1", text: "\u300C\u5065\u592A\u306F\u3069\u3053\u306B\u884C\u3063\u305F\uFF1F\u300D\u30C8\u30A4\u30EC\u306B\u884C\u304F\u3068\u8A00\u3063\u306630\u5206\u3082\u623B\u3063\u3066\u3053\u306A\u3044\u3002", character: "\u79C1", choices: [{ text: "\u63A2\u3057\u306B\u884C\u304F", nextScene: "search" }, { text: "\u5927\u4EBA\u3092\u547C\u3076", nextScene: "call_help" }] }, { id: "search", text: "\u61D0\u4E2D\u96FB\u706F\u3092\u6301\u3063\u3066\u68EE\u306E\u4E2D\u3078\u5165\u3063\u305F\u3002\u5065\u592A\u306E\u540D\u524D\u3092\u547C\u3073\u306A\u304C\u3089\u6B69\u304F\u3002", background: "/static/images/dark_forest.jpg", nextScene: "strange_path" }, { id: "strange_path", text: "\u898B\u305F\u3053\u3068\u306E\u306A\u3044\u9053\u304C\u73FE\u308C\u305F\u3002\u3053\u3093\u306A\u9053\u3001\u663C\u9593\u306F\u306A\u304B\u3063\u305F\u306F\u305A\u3060\u3002", effects: [{ type: "fade", duration: 1e3 }], choices: [{ text: "\u9053\u3092\u9032\u3080", nextScene: "follow_path" }, { text: "\u5F15\u304D\u8FD4\u3059", nextScene: "go_back" }] }, { id: "follow_path", text: "\u9053\u3092\u9032\u3080\u3068\u3001\u53E4\u3044\u9CE5\u5C45\u304C\u73FE\u308C\u305F\u3002\u305D\u306E\u5148\u306B\u5065\u592A\u304C\u7ACB\u3063\u3066\u3044\u305F\u3002\u3067\u3082\u69D8\u5B50\u304C\u304A\u304B\u3057\u3044\u3002", background: "/static/images/torii.jpg", nextScene: "possessed" }, { id: "possessed", text: "\u300C\u5065\u592A\uFF1F\u300D\u547C\u3073\u304B\u3051\u308B\u3068\u3001\u3086\u3063\u304F\u308A\u3068\u632F\u308A\u8FD4\u3063\u305F\u3002\u305D\u306E\u76EE\u306F\u771F\u3063\u767D\u3060\u3063\u305F\u3002", effects: [{ type: "flash", duration: 200 }, { type: "sound", sound: "/static/audio/scream.mp3" }], nextScene: "ending_mystery" }, { id: "ending_mystery", text: "\u6B21\u306E\u77AC\u9593\u3001\u610F\u8B58\u3092\u5931\u3063\u305F\u3002\u6C17\u304C\u3064\u304F\u3068\u30AD\u30E3\u30F3\u30D7\u5834\u306B\u3044\u305F\u3002\u5065\u592A\u306F3\u65E5\u5F8C\u306B\u5C71\u3067\u767A\u898B\u3055\u308C\u305F\u304C\u3001\u305D\u306E3\u65E5\u9593\u306E\u8A18\u61B6\u306F\u306A\u3044\u3068\u3044\u3046\u3002", nextScene: null }, { id: "go_back", text: "\u4E0D\u6C17\u5473\u306A\u611F\u3058\u304C\u3057\u3066\u5F15\u304D\u8FD4\u3057\u305F\u3002", nextScene: "ending_safe" }, { id: "call_help", text: "\u5927\u4EBA\u3092\u547C\u3093\u3067\u635C\u7D22\u3092\u59CB\u3081\u305F\u3002", nextScene: "ending_found" }, { id: "ending_found", text: "\u5065\u592A\u306F\u7FCC\u671D\u3001\u5C71\u306E\u4E2D\u3067\u767A\u898B\u3055\u308C\u305F\u3002\u300C\u5929\u72D7\u306B\u9023\u308C\u3066\u884C\u304B\u308C\u305F\u300D\u3068\u7E70\u308A\u8FD4\u3059\u3070\u304B\u308A\u3060\u3063\u305F\u3002", nextScene: null }, { id: "ending_safe", text: "\u30AD\u30E3\u30F3\u30D7\u5834\u306B\u623B\u308B\u3068\u3001\u5065\u592A\u304C\u666E\u901A\u306B\u5EA7\u3063\u3066\u3044\u305F\u3002\u300C\u30C8\u30A4\u30EC\u3067\u8FF7\u3063\u305F\u300D\u3068\u8A00\u3046\u304C\u30011\u6642\u9593\u3082\u4F55\u3092\u3057\u3066\u3044\u305F\u306E\u3060\u308D\u3046\u304B\u3002", nextScene: null }] }, { id: "obon", title: "\u8FCE\u3048\u706B\u306E\u970A", subtitle: "\u304A\u76C6\u306E\u591C", description: "\u8FCE\u3048\u706B\u3092\u711A\u3044\u305F\u591C\u3001\u898B\u77E5\u3089\u306C\u8001\u4EBA\u304C\u73FE\u308C\u3066...", thumbnail: "/static/images/obon_thumb.jpg", category: "obon", scenes: [{ id: "start", background: "/static/images/obon_night.jpg", bgm: "/static/audio/bgm_obon.mp3", text: "\u304A\u76C6\u306E\u521D\u65E5\u3001\u8FCE\u3048\u706B\u3092\u711A\u3044\u3066\u5148\u7956\u306E\u970A\u3092\u8FCE\u3048\u308B\u6E96\u5099\u3092\u3057\u305F\u3002", nextScene: "scene1" }, { id: "scene1", text: "\u706B\u304C\u6D88\u3048\u304B\u3051\u305F\u9803\u3001\u7384\u95A2\u306B\u4EBA\u5F71\u304C\u7ACB\u3063\u3066\u3044\u308B\u3053\u3068\u306B\u6C17\u3065\u3044\u305F\u3002", effects: [{ type: "fade", duration: 1e3 }], nextScene: "oldman" }, { id: "oldman", text: "\u7740\u7269\u3092\u7740\u305F\u8001\u4EBA\u304C\u7ACB\u3063\u3066\u3044\u305F\u3002\u300C\u304A\u8FCE\u3048\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3059\u300D\u3068\u6DF1\u304F\u982D\u3092\u4E0B\u3052\u305F\u3002", character: "\u8B0E\u306E\u8001\u4EBA", choices: [{ text: "\u5BB6\u306B\u62DB\u304D\u5165\u308C\u308B", nextScene: "invite" }, { text: "\u65AD\u308B", nextScene: "refuse" }] }, { id: "invite", text: "\u8001\u4EBA\u3092\u5BB6\u306B\u5165\u308C\u305F\u3002\u4ECF\u58C7\u306E\u524D\u3067\u624B\u3092\u5408\u308F\u305B\u59CB\u3081\u308B\u3002", nextScene: "story" }, { id: "story", text: "\u300C\u79C1\u306F\u3053\u306E\u5BB6\u306E\u5148\u3005\u4EE3\u306E\u4E3B\u4EBA\u3067\u3059\u3002\u3084\u3063\u3068\u5E30\u3063\u3066\u3053\u3089\u308C\u307E\u3057\u305F\u300D", character: "\u8001\u4EBA", effects: [{ type: "shake", duration: 500 }], nextScene: "photo" }, { id: "photo", text: "\u4ECF\u58C7\u306E\u53E4\u3044\u5199\u771F\u3092\u898B\u308B\u3068\u3001\u78BA\u304B\u306B\u3053\u306E\u8001\u4EBA\u306B\u305D\u3063\u304F\u308A\u3060\u3063\u305F\u3002\u3067\u3082\u3001\u305D\u308C\u306F100\u5E74\u524D\u306B\u4EA1\u304F\u306A\u3063\u305F\u4EBA\u306E\u306F\u305A...", nextScene: "ending_ancestor" }, { id: "ending_ancestor", text: "\u671D\u306B\u306A\u308B\u3068\u8001\u4EBA\u306E\u59FF\u306F\u6D88\u3048\u3066\u3044\u305F\u3002\u4ECF\u58C7\u306B\u306F\u65B0\u3057\u3044\u7DDA\u9999\u306E\u9999\u308A\u304C\u6F02\u3063\u3066\u3044\u305F\u3002\u672C\u5F53\u306B\u5148\u7956\u304C\u5E30\u3063\u3066\u304D\u305F\u306E\u3060\u308D\u3046\u304B\u3002", nextScene: null }, { id: "refuse", text: "\u300C\u7533\u3057\u8A33\u3042\u308A\u307E\u305B\u3093\u304C...\u300D\u3068\u65AD\u3063\u305F\u3002", nextScene: "disappear" }, { id: "disappear", text: "\u8001\u4EBA\u306F\u60B2\u3057\u305D\u3046\u306A\u9854\u3092\u3057\u3066\u3001\u95C7\u306E\u4E2D\u306B\u6D88\u3048\u3066\u3044\u3063\u305F\u3002", effects: [{ type: "fade", duration: 2e3 }], nextScene: "ending_regret" }, { id: "ending_regret", text: "\u305D\u306E\u591C\u304B\u3089\u3001\u4ECF\u58C7\u306E\u5468\u308A\u3067\u4E0D\u601D\u8B70\u306A\u7269\u97F3\u304C\u3059\u308B\u3088\u3046\u306B\u306A\u3063\u305F\u3002\u65AD\u3063\u3066\u3057\u307E\u3063\u305F\u3053\u3068\u3092\u5F8C\u6094\u3057\u3066\u3044\u308B\u3002", nextScene: null }] }, { id: "kuchisake", title: "\u53E3\u88C2\u3051\u5973", subtitle: "\u90FD\u5E02\u4F1D\u8AAC", description: "\u30DE\u30B9\u30AF\u3092\u3057\u305F\u5973\u6027\u306B\u300C\u79C1\u3001\u304D\u308C\u3044\uFF1F\u300D\u3068\u805E\u304B\u308C\u305F\u3089...", thumbnail: "/static/images/kuchisake_thumb.jpg", category: "urban", scenes: [{ id: "start", background: "/static/images/evening_street.jpg", bgm: "/static/audio/bgm_urban.mp3", text: "\u587E\u306E\u5E30\u308A\u9053\u3001\u8584\u6697\u3044\u901A\u308A\u3092\u4E00\u4EBA\u3067\u6B69\u3044\u3066\u3044\u305F\u3002", nextScene: "scene1" }, { id: "scene1", text: "\u5411\u3053\u3046\u304B\u3089\u3001\u5927\u304D\u306A\u30DE\u30B9\u30AF\u3092\u3057\u305F\u5973\u6027\u304C\u6B69\u3044\u3066\u304D\u305F\u3002\u3059\u308C\u9055\u3046\u6642\u3001\u7A81\u7136\u7ACB\u3061\u6B62\u307E\u3063\u305F\u3002", nextScene: "question" }, { id: "question", text: "\u300C\u306D\u3048...\u79C1\u3001\u304D\u308C\u3044\uFF1F\u300D", character: "\u30DE\u30B9\u30AF\u306E\u5973", choices: [{ text: "\u304D\u308C\u3044\u3067\u3059", nextScene: "answer_yes" }, { text: "\u304D\u308C\u3044\u3058\u3083\u306A\u3044", nextScene: "answer_no" }, { text: "\u666E\u901A\u3067\u3059", nextScene: "answer_normal" }] }, { id: "answer_yes", text: "\u300C\u305D\u3046\uFF1F\u3058\u3083\u3042...\u3053\u308C\u3067\u3082\uFF1F\u300D", character: "\u30DE\u30B9\u30AF\u306E\u5973", nextScene: "reveal" }, { id: "reveal", background: "/static/images/kuchisake.jpg", text: "\u30DE\u30B9\u30AF\u3092\u5916\u3059\u3068\u3001\u53E3\u304C\u8033\u307E\u3067\u88C2\u3051\u3066\u3044\u305F\uFF01", effects: [{ type: "flash", duration: 300 }, { type: "sound", sound: "/static/audio/scream.mp3" }, { type: "shake", duration: 1e3 }], nextScene: "chase" }, { id: "chase", text: "\u300C\u3042\u306A\u305F\u3082\u3053\u3046\u3057\u3066\u3042\u3052\u308B\uFF01\u300D\u30CF\u30B5\u30DF\u3092\u53D6\u308A\u51FA\u3057\u3066\u8FFD\u3044\u304B\u3051\u3066\u304D\u305F\uFF01", choices: [{ text: "\u9003\u3052\u308B", nextScene: "run_away" }, { text: "\u30DD\u30DE\u30FC\u30C9\u30683\u56DE\u8A00\u3046", nextScene: "pomade" }] }, { id: "run_away", text: "\u5FC5\u6B7B\u306B\u8D70\u3063\u305F\u3002\u3067\u3082\u53E3\u88C2\u3051\u5973\u306F\u7570\u5E38\u306A\u901F\u3055\u3067\u8FFD\u3044\u304B\u3051\u3066\u304F\u308B\uFF01", nextScene: "ending_caught" }, { id: "ending_caught", text: "\u7D50\u5C40\u8FFD\u3044\u3064\u304B\u308C\u3066\u3057\u307E\u3063\u305F\u3002\u305D\u306E\u5F8C\u306E\u3053\u3068\u306F...\u601D\u3044\u51FA\u3057\u305F\u304F\u306A\u3044\u3002", effects: [{ type: "fade", duration: 3e3 }], nextScene: null }, { id: "pomade", text: "\u300C\u30DD\u30DE\u30FC\u30C9\uFF01\u30DD\u30DE\u30FC\u30C9\uFF01\u30DD\u30DE\u30FC\u30C9\uFF01\u300D", nextScene: "ending_escape" }, { id: "ending_escape", text: "\u53E3\u88C2\u3051\u5973\u306F\u6025\u306B\u52D5\u304D\u3092\u6B62\u3081\u3066\u3001\u56F0\u3063\u305F\u9854\u3092\u3057\u3066\u53BB\u3063\u3066\u3044\u3063\u305F\u3002\u90FD\u5E02\u4F1D\u8AAC\u306E\u5BFE\u51E6\u6CD5\u304C\u672C\u5F53\u306B\u52B9\u3044\u305F\u3088\u3046\u3060\u3002", nextScene: null }, { id: "answer_no", text: "\u300C\u304D\u308C\u3044\u3058\u3083\u306A\u3044...\uFF1F\u300D\u5973\u306E\u76EE\u304C\u6012\u308A\u3067\u71C3\u3048\u4E0A\u304C\u3063\u305F\u3002", nextScene: "ending_bad" }, { id: "ending_bad", text: "\u6B21\u306E\u77AC\u9593\u3001\u30CF\u30B5\u30DF\u304C\u632F\u308A\u4E0B\u308D\u3055\u308C\u305F\u3002\u305D\u308C\u304C\u6700\u5F8C\u306E\u8A18\u61B6\u3060\u3002", effects: [{ type: "flash", duration: 500 }], nextScene: null }, { id: "answer_normal", text: "\u300C\u666E\u901A...\uFF1F\u300D\u5973\u306F\u56F0\u60D1\u3057\u305F\u3088\u3046\u306A\u9854\u3092\u3057\u305F\u3002", nextScene: "ending_confused" }, { id: "ending_confused", text: "\u4E88\u60F3\u5916\u306E\u7B54\u3048\u306B\u6238\u60D1\u3063\u305F\u306E\u304B\u3001\u5973\u306F\u305D\u306E\u307E\u307E\u53BB\u3063\u3066\u3044\u3063\u305F\u3002\u6B63\u89E3\u3060\u3063\u305F\u306E\u304B\u3082\u3057\u308C\u306A\u3044\u3002", nextScene: null }] }, { id: "teketeke", title: "\u30C6\u30B1\u30C6\u30B1", subtitle: "\u7DDA\u8DEF\u306E\u602A\u7570", description: "\u4E0A\u534A\u8EAB\u3060\u3051\u306E\u4F55\u304B\u304C\u3001\u731B\u30B9\u30D4\u30FC\u30C9\u3067\u8FFD\u3044\u304B\u3051\u3066\u304F\u308B...", thumbnail: "/static/images/teketeke_thumb.jpg", category: "urban", scenes: [{ id: "start", background: "/static/images/railway.jpg", bgm: "/static/audio/bgm_tension.mp3", text: "\u591C\u9045\u304F\u3001\u7DDA\u8DEF\u6CBF\u3044\u306E\u9053\u3092\u6B69\u3044\u3066\u5E30\u3063\u3066\u3044\u305F\u3002", nextScene: "scene1" }, { id: "scene1", text: "\u9060\u304F\u304B\u3089\u5947\u5999\u306A\u97F3\u304C\u805E\u3053\u3048\u3066\u304D\u305F\u3002\u300C\u30C6\u30B1\u30C6\u30B1\u30C6\u30B1...\u300D", effects: [{ type: "sound", sound: "/static/audio/teketeke.mp3" }], nextScene: "scene2" }, { id: "scene2", text: "\u97F3\u304C\u3069\u3093\u3069\u3093\u8FD1\u3065\u3044\u3066\u304F\u308B\u3002\u632F\u308A\u8FD4\u308B\u3068...", choices: [{ text: "\u632F\u308A\u8FD4\u308B", nextScene: "look_back" }, { text: "\u632F\u308A\u8FD4\u3089\u305A\u306B\u8D70\u308B", nextScene: "run_immediately" }] }, { id: "look_back", background: "/static/images/teketeke.jpg", text: "\u4E0A\u534A\u8EAB\u3060\u3051\u306E\u5973\u304C\u3001\u8155\u3092\u4F7F\u3063\u3066\u731B\u30B9\u30D4\u30FC\u30C9\u3067\u3053\u3061\u3089\u306B\u5411\u304B\u3063\u3066\u304D\u305F\uFF01", effects: [{ type: "flash", duration: 200 }, { type: "shake", duration: 1e3 }, { type: "sound", sound: "/static/audio/horror_scream.mp3" }], nextScene: "question_teke" }, { id: "question_teke", text: "\u300C\u79C1\u306E\u4E0B\u534A\u8EAB\u3092\u77E5\u3089\u306A\u3044\uFF1F\u300D", character: "\u30C6\u30B1\u30C6\u30B1", choices: [{ text: "\u77E5\u3089\u306A\u3044", nextScene: "dont_know" }, { text: "\u7DDA\u8DEF\u306B\u3042\u308B", nextScene: "at_railway" }] }, { id: "dont_know", text: "\u300C\u3058\u3083\u3042\u3001\u3042\u306A\u305F\u306E\u4E0B\u534A\u8EAB\u3092\u3082\u3089\u3046\u308F\uFF01\u300D", character: "\u30C6\u30B1\u30C6\u30B1", nextScene: "ending_attack" }, { id: "ending_attack", text: "\u92ED\u3044\u722A\u304C\u632F\u308A\u4E0B\u308D\u3055\u308C\u305F\u3002\u305D\u308C\u4EE5\u4E0A\u306E\u3053\u3068\u306F...\u899A\u3048\u3066\u3044\u306A\u3044\u3002", effects: [{ type: "flash", duration: 500 }], nextScene: null }, { id: "at_railway", text: "\u300C\u305D\u3046...\u63A2\u3057\u3066\u304F\u308B\u300D\u30C6\u30B1\u30C6\u30B1\u306F\u7DDA\u8DEF\u306E\u65B9\u3078\u53BB\u3063\u3066\u3044\u3063\u305F\u3002", nextScene: "ending_mercy" }, { id: "ending_mercy", text: "\u547D\u306F\u52A9\u304B\u3063\u305F\u304C\u3001\u4ECA\u3067\u3082\u300C\u30C6\u30B1\u30C6\u30B1\u300D\u3068\u3044\u3046\u97F3\u3092\u805E\u304F\u3068\u3001\u3042\u306E\u6050\u6016\u304C\u8607\u308B\u3002", nextScene: null }, { id: "run_immediately", text: "\u632F\u308A\u8FD4\u3089\u305A\u306B\u5168\u529B\u3067\u8D70\u3063\u305F\u3002\u80CC\u5F8C\u304B\u3089\u300C\u30C6\u30B1\u30C6\u30B1\u300D\u3068\u3044\u3046\u97F3\u304C\u8FEB\u3063\u3066\u304F\u308B\uFF01", nextScene: "escape_attempt" }, { id: "escape_attempt", text: "\u5BB6\u307E\u3067\u3042\u3068\u5C11\u3057\u3002\u3067\u3082\u97F3\u306F\u3059\u3050\u5F8C\u308D\u307E\u3067\u6765\u3066\u3044\u308B\uFF01", effects: [{ type: "shake", duration: 500 }], nextScene: "ending_home" }, { id: "ending_home", text: "\u306A\u3093\u3068\u304B\u5BB6\u306B\u305F\u3069\u308A\u7740\u3044\u305F\u3002\u30C9\u30A2\u3092\u9589\u3081\u305F\u77AC\u9593\u3001\u5916\u3067\u4F55\u304B\u304C\u30C9\u30A2\u3092\u5F15\u3063\u63BB\u304F\u97F3\u304C\u3057\u305F\u3002\u671D\u307E\u3067\u9707\u3048\u3066\u904E\u3054\u3057\u305F\u3002", nextScene: null }] }];
var de = new mt();
de.use("/api/*", en());
de.use("/static/*", un({ root: "./public" }));
de.get("/api/stories", (e) => {
  const t = yt.map((n) => ({ id: n.id, title: n.title, subtitle: n.subtitle, description: n.description, thumbnail: n.thumbnail, category: n.category }));
  return e.json(t);
});
de.get("/api/stories/:id", (e) => {
  const t = e.req.param("id"), n = yt.find((s) => s.id === t);
  return n ? e.json(n) : e.json({ error: "Story not found" }, 404);
});
de.get("/", (e) => e.html(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>\u590F\u591C\u306E\u602A\u8AC7 - \u516B\u3064\u306E\u4E0D\u601D\u8B70\u306A\u7269\u8A9E</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap');
            
            body {
                font-family: 'Noto Serif JP', serif;
                background: linear-gradient(to bottom, #0f0f1f, #1a1a2e);
            }
            
            .horror-text {
                text-shadow: 2px 2px 4px rgba(139, 0, 0, 0.8);
            }
            
            .story-card {
                transition: all 0.3s ease;
                background: linear-gradient(135deg, #1a1a2e, #0f0f1f);
                border: 1px solid rgba(139, 0, 0, 0.3);
            }
            
            .story-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(139, 0, 0, 0.5);
                border-color: rgba(139, 0, 0, 0.7);
            }
            
            .typewriter {
                overflow: hidden;
                white-space: pre-wrap;
                animation: typing 0.05s steps(1) forwards;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            
            @keyframes flash {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
            
            .fade-in {
                animation: fadeIn 1s ease-in;
            }
            
            .shake-effect {
                animation: shake 0.5s ease-in-out;
            }
            
            .flash-effect {
                animation: flash 0.2s ease-in-out;
            }
            
            #novel-container {
                min-height: 100vh;
                background-size: cover;
                background-position: center;
                transition: background-image 1s ease-in-out;
            }
            
            .choice-button {
                background: rgba(20, 20, 40, 0.9);
                border: 2px solid rgba(139, 0, 0, 0.5);
                transition: all 0.3s ease;
            }
            
            .choice-button:hover {
                background: rgba(139, 0, 0, 0.3);
                border-color: rgba(139, 0, 0, 0.9);
                transform: scale(1.05);
            }
            
            .floating {
                animation: float 3s ease-in-out infinite;
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
        </style>
    </head>
    <body class="bg-gray-900 text-gray-100">
        <!-- Story Selection Screen -->
        <div id="story-selection" class="container mx-auto px-4 py-8">
            <div class="text-center mb-12 fade-in">
                <h1 class="text-5xl font-bold horror-text text-red-600 mb-4">
                    <i class="fas fa-ghost mr-3"></i>\u590F\u591C\u306E\u602A\u8AC7
                </h1>
                <p class="text-xl text-gray-400">\u516B\u3064\u306E\u4E0D\u601D\u8B70\u306A\u7269\u8A9E</p>
                <div class="mt-4 text-yellow-400 floating">
                    <i class="fas fa-moon text-3xl"></i>
                </div>
            </div>
            
            <div id="stories-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Stories will be loaded here -->
            </div>
        </div>
        
        <!-- Novel Game Screen -->
        <div id="novel-container" class="hidden relative">
            <div class="absolute inset-0 bg-black bg-opacity-50"></div>
            
            <div class="relative z-10 min-h-screen flex flex-col justify-end">
                <!-- Text Box -->
                <div class="bg-gray-900 bg-opacity-90 border-t-2 border-red-900 p-8 m-4 rounded-lg">
                    <div id="character-name" class="text-red-400 font-bold mb-2 hidden"></div>
                    <div id="story-text" class="text-lg leading-relaxed"></div>
                    
                    <!-- Choices -->
                    <div id="choices-container" class="mt-6 space-y-3 hidden">
                        <!-- Choices will be loaded here -->
                    </div>
                    
                    <!-- Controls -->
                    <div class="mt-6 flex justify-between items-center">
                        <button id="back-button" class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
                            <i class="fas fa-arrow-left mr-2"></i>\u623B\u308B
                        </button>
                        
                        <div class="space-x-4">
                            <button id="auto-button" class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
                                <i class="fas fa-play mr-2"></i>\u30AA\u30FC\u30C8
                            </button>
                            <button id="skip-button" class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
                                <i class="fas fa-forward mr-2"></i>\u30B9\u30AD\u30C3\u30D7
                            </button>
                            <button id="next-button" class="px-4 py-2 bg-red-800 hover:bg-red-700 rounded-lg transition">
                                \u6B21\u3078<i class="fas fa-arrow-right ml-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Audio Elements -->
        <audio id="bgm-player" loop></audio>
        <audio id="sfx-player"></audio>
        
        <script src="/static/js/novel-engine.js"><\/script>
    </body>
    </html>
  `));
var Ue = new mt();
var hn = Object.assign({ "/src/index.tsx": de });
var vt = false;
for (const [, e] of Object.entries(hn))
  e && (Ue.route("/", e), Ue.notFound(e.notFoundHandler), vt = true);
if (!vt)
  throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");

// ../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-VMfkbQ/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = Ue;

// ../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-VMfkbQ/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=bundledWorker-0.7584752894744047.mjs.map
