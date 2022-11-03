/** @jsx JCDoom */

export function JCDom(type, props, ...args) {
  const childreen = [].concat(args);

  return {
    type,
    props,
    childreen,
  };
}
