import { getTick } from "./ticks.js";
import { createNode } from "./utils.js";
import { updateBoard } from "./board.js";

/* #region Create UI Elements */

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
  box.onclick = (e) => {
    // is Processed? Then stop processing again.
    // TODO: Simplify
    const isAlreadyClicked =
      e.originalTarget.attributes &&
      e.originalTarget.attributes["clicked"] &&
      e.originalTarget.attributes["clicked"].value === "1";

    if (!isAlreadyClicked) {
      e.originalTarget.setAttribute("clicked", "1");
      handleOnBoxClick(rowIndex, colIndex, e);
    }
  };

  return box;
}

/* #endregion */

/* #region Event handlers */

const handleOnBoxClick = function (rowIndex, colIndex, e) {
  let node = e.target; //TODO: Cross browser? Debugging/Works in FF as of now.

  const nextTick = getTick.next();

  node.textContent = nextTick.value;
  const updated = updateBoard(rowIndex, colIndex, nextTick.value);
  if (updated.won) alert("You Won");
}.bind({
  getTick: getTick,
});

/* #endregion */

class TicTacToe extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "closed" });

    const wrapper = createNode("div", "wrapper");
    wrapper.appendChild(createRows());

    const linkElem = createNode("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "./app/style.css");
    shadowRoot.appendChild(linkElem);

    // attach the created elements to the shadow DOM
    shadowRoot.append(wrapper);
  }

  connectedCallback() {
    // Node created.
  }
}

customElements.define("tic-tac-toe", TicTacToe);
