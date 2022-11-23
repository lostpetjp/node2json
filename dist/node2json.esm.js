/*! @lostpetjp/node2json 0.0.1 | MIT | https://lostpet.jp/ */
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
  enumerable: true,
  configurable: true,
  writable: true,
  value
}) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)) {
    if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  }
  return a;
};
function parse(node) {
  if (1 === node.nodeType) {
    const element = node;
    const attributeMap = {};
    const attributeNames = element.getAttributeNames();
    attributeNames.forEach(name => {
      attributeMap[name] = element.getAttribute(name);
    });
    const children = node2json(element);
    return __spreadValues(__spreadValues(__spreadValues({}, attributeNames.length ? {
      attribute: attributeMap
    } : {}), null !== children ? {
      children
    } : {}), {
      tagName: element.tagName.toLowerCase()
    });
  } else if (3 === node.nodeType) {
    const text = node;
    const data = text.data.trim();
    return "" === data ? null : data;
  } else {
    return null;
  }
}
function node2json(rootE) {
  const json = [];
  for (let i = 0, a = rootE.childNodes; a.length > i; i++) {
    let node = a[i];
    let res = parse(node);
    if (null !== res) json.push(res);
  }
  return !json.length ? null : 1 === json.length ? json[0] : json;
}
export { node2json as default };
