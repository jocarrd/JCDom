/** @jsx JCDoom */
let ROOT = {};
Object.assign(ROOT, { render });

export function createRoot(container) {
  ROOT.root = container;
  return ROOT;
}

function render(node) {
  window.document.getElementById(ROOT.root.id).appendChild(createElement(node));
}

export function JCDom(type, props, ...args) {
  const children = args.length
    ? [].concat(args.filter((arg) => (!!arg ? arg : "")))
    : null;

  return {
    type,
    props: props || {},
    children,
  };
}

//Before auto-calling JCDom
function createElement(node) {
  if (typeof node === "string" || typeof node === "number") {
    return document.createTextNode(node);
  }
  if (typeof node.type === "object") {
    return createElement(node.type);
  }
  if (typeof node.type === "function") {
    return createElement(node.type(node.props));
  }

  const element = document.createElement(node.type);

  setAtributes(element, node.props);
  setEvents(element, node.props);

  node.children &&
    node.children
      .map(createElement)
      .forEach((child) => element.appendChild(child));

  return element;
}

function setAtributes(node, props) {
  if (!props) return;

  Object.entries(props)
    .filter((prop) => !isEvent(prop[0]))
    .forEach((prop) => {
      node.setAttribute(prop[0], prop[1]);
    });
}

function setEvents(node, props) {
  if (!props) return;
  Object.keys(props)
    .filter(isEvent)
    .forEach((event) => {
      node.addEventListener(extractEventName(event), props[event]);
    });
}

function isEvent(name) {
  return /on/.test(name);
}

function extractEventName(name) {
  return name.slice(2).toLowerCase();
}
