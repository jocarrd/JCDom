/** @jsx JCDoom */

export function JCDom(type, props, ...args) {
  const children = [].concat(args);

  return createElement({
    type,
    props,
    children,
  });
}

//Before auto-calling JCDom
export function createElement(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }
  if (typeof node.type === "object") {
    return createElement(node.type);
  }

  const element = document.createElement(node.type);

  node.props && setAtributes(element, node.props);

  node.children &&
    node.children
      .map(createElement)
      .forEach((child) => element.appendChild(child));

  return element;
}

export function render(node) {
  window.document.body.appendChild(node);
}

export function setAtributes(node, props) {
  Object.entries(props).forEach((prop) => {
    node.setAttribute(prop[0], prop[1]);
  });
}
