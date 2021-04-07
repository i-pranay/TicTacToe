function createNode(nodeType, className, attrs, textContent) {
  const node = document.createElement(nodeType);

  node.setAttribute("class", className);

  if (attrs)
    for (const [key, value] of Object.entries(attrs)) {
      node.setAttribute(key, value);
    }

  if (textContent) node.textContent = textContent;

  return node;
}

export { createNode };
