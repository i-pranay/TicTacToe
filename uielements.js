import { getTick } from "./ticks.js";
import { updateBoard, getBoard } from "./board.js";

function createNode(nodeType, className, attrs, textContent) {
  const node = document.createElement(nodeType);

  node.setAttribute("class", className);

  if (attrs)
    Object.entries(attrs).forEach((key, value) =>
      node.setAttribute(key, value)
    );

  if (textContent) node.textContent = textContent;

  return node;
}

function createRows() {
  let rows = createNode("span", "rows");

  for (let rowIndex = 0; rowIndex < 3; rowIndex++)
    rows.appendChild(createRow(rowIndex));

  return rows;
}

function createRow(rowIndex) {
  const row = createNode("span", "row");

  for (let colIndex = 0; colIndex < 3; colIndex++) {
    row.appendChild(createBox(rowIndex, colIndex));
  }

  return row;
}

function createBox(rowIndex, colIndex) {
  const box = createNode("div", "box");
  box.setAttribute("clicked", "0");

  box.onclick = (e) => handleBoxClick(rowIndex, colIndex, e);
  //   //TODO: Move to func outside
  //   const currentText = this.textContent;
  //   console.log(e.target.attributes["clicked"]);
  //   const clicked =
  //     e.target &&
  //     e.target.attributes &&
  //     e.target.attributes["clicked"] &&
  //     e.target.attributes["clicked"].value === "0";
  //   console.log(`processed: ${clicked}`);
  //   const shouldUpdate = (clicked && !currentText) || currentText === "";
  //   if (shouldUpdate) {
  //     e, target.setAttribute("clicked", "1");
  //     onBoxClick(e, rowIndex, colIndex);
  //   }
  // };
  //   box.textContent = `${rowIndex} ${colIndex}`;
  return box;
}

function c(rowIndex, colIndex, e) {
  let node = e.target;

  //is already Processed ?
  //TODO: Has issues
  const isAlreadyClicked =
    node.attributes &&
    node.attributes["clicked"] &&
    node.attributes["clicked"].value === "1";

  if (!isAlreadyClicked) {
    const nextTick = getTick.next();

    node.textContent = nextTick.value;
    const updated = updateBoard(rowIndex, colIndex, nextTick.value);
    if (updated.won) alert("You Won");
  }
}
const handleBoxClick = c.bind({
  getTick: getTick,
});

class TicTacToe extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.setAttribute("style", "wrapper");
    wrapper.appendChild(createRows());

    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "style.css");
    shadowRoot.appendChild(linkElem);

    // attach the created elements to the shadow DOM
    shadowRoot.append(wrapper);
  }

  connectedCallback() {
    //console.log("Connected cb");
  }
}

customElements.define("tic-tac-toe", TicTacToe);
