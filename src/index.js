/** @jsx JCDoom */

//Wrapper
export const JCDomRender = (children) => {
  return render(createElement(children));
};

export function JCDom(type, props, ...args) {
  const children = args.length ? [].concat(...args) : null;

  return {
    type,
    props: props,
    children,
  };
}

//Before auto-calling JCDom
function createElement(node) {
  console.log(node.type);
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

  node.props && setAtributes(element, node.props);

  node.children &&
    node.children
      .map(createElement)
      .forEach((child) => element.appendChild(child));

  return element;
}

function render(node) {
  node && window.document.getElementById("root").appendChild(node);
}

function setAtributes(node, props) {
  if (!props) return;

  Object.entries(props).forEach((prop) => {
    node.setAttribute(prop[0], prop[1]);
  });
}
