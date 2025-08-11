var S = Object.defineProperty;
var U = (t, r, e) => r in t ? S(t, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[r] = e;
var j = (t, r, e) => U(t, typeof r != "symbol" ? r + "" : r, e);
import { UMB_AUTH_CONTEXT as R } from "@umbraco-cms/backoffice/auth";
const z = {
  type: "jumoo-tm-connector",
  alias: "jumoo-tm-ai-connector",
  name: "Ai Connector",
  meta: {
    icon: "jumoo-tm-ai-logo",
    label: "Ai connector",
    alias: "aiConnector"
  }
}, _ = {
  type: "localization",
  alias: "jumoo.ai.localization",
  name: "AI Localization",
  js: () => import("./en-iVnosgzb.js"),
  meta: {
    culture: "en"
  }
}, E = [_], I = {
  type: "jumoo-tm-connector-config",
  alias: "jumoo-ai-config",
  name: "Ai Connector Config",
  elementName: "jumoo-ai-config",
  js: () => import("./config.view-DMuj5PBW.js")
}, N = {
  type: "jumoo-tm-connector-pending",
  alias: "jumoo-ai-pending",
  name: "Ai Connector Pending",
  elementName: "jumoo-ai-pending",
  js: () => import("./pending.view-CFwf7tAg.js")
}, W = [I, N], k = {
  type: "icons",
  alias: "jumoo.tm.icons.ai",
  name: "Translation Manager Ai Icon",
  js: () => import("./icons-B1E8Trm2.js")
}, H = [k], D = {
  type: "jumoo-tm-ai-translator",
  alias: "OpenAiTranslator",
  name: "OpenAI Config",
  js: () => import("./config-element-CrwbhvTY.js"),
  elementName: "jumoo-tm-ai-openai-config"
}, P = [D], B = {
  type: "jumoo-tm-ai-translator",
  alias: "GitHubAiTranslator",
  name: "GitHub Config",
  js: () => import("./config-element-L0mjTBZ8.js"),
  elementName: "jumoo-tm-ai-github-config"
}, G = [B], J = [...P, ...G];
var L = async (t, r) => {
  let e = typeof r == "function" ? await r(t) : r;
  if (e) return t.scheme === "bearer" ? `Bearer ${e}` : t.scheme === "basic" ? `Basic ${btoa(e)}` : e;
}, M = { bodySerializer: (t) => JSON.stringify(t, (r, e) => typeof e == "bigint" ? e.toString() : e) }, V = (t) => {
  switch (t) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, Q = (t) => {
  switch (t) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
}, X = (t) => {
  switch (t) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, A = ({ allowReserved: t, explode: r, name: e, style: s, value: a }) => {
  if (!r) {
    let o = (t ? a : a.map((l) => encodeURIComponent(l))).join(Q(s));
    switch (s) {
      case "label":
        return `.${o}`;
      case "matrix":
        return `;${e}=${o}`;
      case "simple":
        return o;
      default:
        return `${e}=${o}`;
    }
  }
  let i = V(s), n = a.map((o) => s === "label" || s === "simple" ? t ? o : encodeURIComponent(o) : b({ allowReserved: t, name: e, value: o })).join(i);
  return s === "label" || s === "matrix" ? i + n : n;
}, b = ({ allowReserved: t, name: r, value: e }) => {
  if (e == null) return "";
  if (typeof e == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${r}=${t ? e : encodeURIComponent(e)}`;
}, v = ({ allowReserved: t, explode: r, name: e, style: s, value: a }) => {
  if (a instanceof Date) return `${e}=${a.toISOString()}`;
  if (s !== "deepObject" && !r) {
    let o = [];
    Object.entries(a).forEach(([m, u]) => {
      o = [...o, m, t ? u : encodeURIComponent(u)];
    });
    let l = o.join(",");
    switch (s) {
      case "form":
        return `${e}=${l}`;
      case "label":
        return `.${l}`;
      case "matrix":
        return `;${e}=${l}`;
      default:
        return l;
    }
  }
  let i = X(s), n = Object.entries(a).map(([o, l]) => b({ allowReserved: t, name: s === "deepObject" ? `${e}[${o}]` : o, value: l })).join(i);
  return s === "label" || s === "matrix" ? i + n : n;
}, F = /\{[^{}]+\}/g, K = ({ path: t, url: r }) => {
  let e = r, s = r.match(F);
  if (s) for (let a of s) {
    let i = !1, n = a.substring(1, a.length - 1), o = "simple";
    n.endsWith("*") && (i = !0, n = n.substring(0, n.length - 1)), n.startsWith(".") ? (n = n.substring(1), o = "label") : n.startsWith(";") && (n = n.substring(1), o = "matrix");
    let l = t[n];
    if (l == null) continue;
    if (Array.isArray(l)) {
      e = e.replace(a, A({ explode: i, name: n, style: o, value: l }));
      continue;
    }
    if (typeof l == "object") {
      e = e.replace(a, v({ explode: i, name: n, style: o, value: l }));
      continue;
    }
    if (o === "matrix") {
      e = e.replace(a, `;${b({ name: n, value: l })}`);
      continue;
    }
    let m = encodeURIComponent(o === "label" ? `.${l}` : l);
    e = e.replace(a, m);
  }
  return e;
}, x = ({ allowReserved: t, array: r, object: e } = {}) => (s) => {
  let a = [];
  if (s && typeof s == "object") for (let i in s) {
    let n = s[i];
    if (n != null) {
      if (Array.isArray(n)) {
        a = [...a, A({ allowReserved: t, explode: !0, name: i, style: "form", value: n, ...r })];
        continue;
      }
      if (typeof n == "object") {
        a = [...a, v({ allowReserved: t, explode: !0, name: i, style: "deepObject", value: n, ...e })];
        continue;
      }
      a = [...a, b({ allowReserved: t, name: i, value: n })];
    }
  }
  return a.join("&");
}, Y = (t) => {
  var e;
  if (!t) return "stream";
  let r = (e = t.split(";")[0]) == null ? void 0 : e.trim();
  if (r) {
    if (r.startsWith("application/json") || r.endsWith("+json")) return "json";
    if (r === "multipart/form-data") return "formData";
    if (["application/", "audio/", "image/", "video/"].some((s) => r.startsWith(s))) return "blob";
    if (r.startsWith("text/")) return "text";
  }
}, Z = async ({ security: t, ...r }) => {
  for (let e of t) {
    let s = await L(e, r.auth);
    if (!s) continue;
    let a = e.name ?? "Authorization";
    switch (e.in) {
      case "query":
        r.query || (r.query = {}), r.query[a] = s;
        break;
      case "cookie":
        r.headers.append("Cookie", `${a}=${s}`);
        break;
      case "header":
      default:
        r.headers.set(a, s);
        break;
    }
    return;
  }
}, w = (t) => ee({ baseUrl: t.baseUrl, path: t.path, query: t.query, querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : x(t.querySerializer), url: t.url }), ee = ({ baseUrl: t, path: r, query: e, querySerializer: s, url: a }) => {
  let i = a.startsWith("/") ? a : `/${a}`, n = (t ?? "") + i;
  r && (n = K({ path: r, url: n }));
  let o = e ? s(e) : "";
  return o.startsWith("?") && (o = o.substring(1)), o && (n += `?${o}`), n;
}, C = (t, r) => {
  var s;
  let e = { ...t, ...r };
  return (s = e.baseUrl) != null && s.endsWith("/") && (e.baseUrl = e.baseUrl.substring(0, e.baseUrl.length - 1)), e.headers = O(t.headers, r.headers), e;
}, O = (...t) => {
  let r = new Headers();
  for (let e of t) {
    if (!e || typeof e != "object") continue;
    let s = e instanceof Headers ? e.entries() : Object.entries(e);
    for (let [a, i] of s) if (i === null) r.delete(a);
    else if (Array.isArray(i)) for (let n of i) r.append(a, n);
    else i !== void 0 && r.set(a, typeof i == "object" ? JSON.stringify(i) : i);
  }
  return r;
}, g = class {
  constructor() {
    j(this, "_fns");
    this._fns = [];
  }
  clear() {
    this._fns = [];
  }
  exists(t) {
    return this._fns.indexOf(t) !== -1;
  }
  eject(t) {
    let r = this._fns.indexOf(t);
    r !== -1 && (this._fns = [...this._fns.slice(0, r), ...this._fns.slice(r + 1)]);
  }
  use(t) {
    this._fns = [...this._fns, t];
  }
}, te = () => ({ error: new g(), request: new g(), response: new g() }), re = x({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), ne = { "Content-Type": "application/json" }, T = (t = {}) => ({ ...M, headers: ne, parseAs: "auto", querySerializer: re, ...t }), oe = (t = {}) => {
  let r = C(T(), t), e = () => ({ ...r }), s = (n) => (r = C(r, n), e()), a = te(), i = async (n) => {
    let o = { ...r, ...n, fetch: n.fetch ?? r.fetch ?? globalThis.fetch, headers: O(r.headers, n.headers) };
    o.security && await Z({ ...o, security: o.security }), o.body && o.bodySerializer && (o.body = o.bodySerializer(o.body)), (o.body === void 0 || o.body === "") && o.headers.delete("Content-Type");
    let l = w(o), m = { redirect: "follow", ...o }, u = new Request(l, m);
    for (let f of a.request._fns) u = await f(u, o);
    let q = o.fetch, c = await q(u);
    for (let f of a.response._fns) c = await f(c, u, o);
    let d = { request: u, response: c };
    if (c.ok) {
      if (c.status === 204 || c.headers.get("Content-Length") === "0") return { data: {}, ...d };
      let f = (o.parseAs === "auto" ? Y(c.headers.get("Content-Type")) : o.parseAs) ?? "json";
      if (f === "stream") return { data: c.body, ...d };
      let y = await c[f]();
      return f === "json" && (o.responseValidator && await o.responseValidator(y), o.responseTransformer && (y = await o.responseTransformer(y))), { data: y, ...d };
    }
    let h = await c.text();
    try {
      h = JSON.parse(h);
    } catch {
    }
    let p = h;
    for (let f of a.error._fns) p = await f(h, c, u, o);
    if (p = p || {}, o.throwOnError) throw p;
    return { error: p, ...d };
  };
  return { buildUrl: w, connect: (n) => i({ ...n, method: "CONNECT" }), delete: (n) => i({ ...n, method: "DELETE" }), get: (n) => i({ ...n, method: "GET" }), getConfig: e, head: (n) => i({ ...n, method: "HEAD" }), interceptors: a, options: (n) => i({ ...n, method: "OPTIONS" }), patch: (n) => i({ ...n, method: "PATCH" }), post: (n) => i({ ...n, method: "POST" }), put: (n) => i({ ...n, method: "PUT" }), request: i, setConfig: s, trace: (n) => i({ ...n, method: "TRACE" }) };
};
const $ = oe(
  T({
    baseUrl: "http://localhost:11591",
    throwOnError: !0
  })
), ie = (t, r) => {
  r.registerMany([
    z,
    ...H,
    ...W,
    ...E,
    ...J
  ]), t.consumeContext(R, (e) => {
    if (!e) return;
    const s = e.getOpenApiConfiguration();
    $.setConfig({
      baseUrl: s.base,
      credentials: s.credentials
    }), $.interceptors.request.use(async (a, i) => {
      const n = await e.getLatestToken();
      return a.headers.set("Authorization", `Bearer ${n}`), a;
    });
  });
};
export {
  $ as c,
  ie as o
};
//# sourceMappingURL=index-CB8sLN95.js.map
