import { toInlineStyles } from "../../core/utils";
import { defaultStyles } from '../../constants';
import { parse } from "../../core/parse";

const CHAR_CODES = {
  A: 65,
  Z: 90,
};
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function createCell(state, row) {
  return function(_, column) {
    const id = `${row}:${column}` 
    const width = getWidth(state.colState, column);
    const data = state.dataState[id] || "";
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    }) 
    return `
        <div 
        class="table__cell" 
        contenteditable 
        data-col="${column}"
        data-type="cell"
        data-value="${data || ''}"
        data-id='${id}'
       style='${styles}; width: ${width}'
      >
      ${parse(data)}
      </div>
  `;
  };
}

function createColumn({column, index, width}) {
  return `
        <div class="table__column" 
          data-type="resizable" 
          data-col="${index}" 
          style="width: ${width}"
        >
          ${column}
          <div class="col-resize" data-resize="col"></div>
        </div>
        `;
}

function createRow(index, content, state) {
  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : "";
    const height = getHeight(state, index);

  return `
    <div 
      class="table__row" 
      data-type="resizable" 
      data-row="${index}" 
      style="height:${height}"
      >
        <div class="table__row-info"> 
        ${index ? index : ""}
        ${resize}
        </div>
        <div class="table__row-data">${content}</div>
    </div>
    `;
}

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + "px";
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}


function toChar(_, index) {
  return String.fromCharCode(CHAR_CODES.A + index)
}

function withWidthFrom(state) {
  return function(column, index) {
    return {
      column, index, width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount = 20, state = {}) {
  const columnsCount = CHAR_CODES.Z - CHAR_CODES.A + 1;
  const rows = [];

  const cols = new Array(columnsCount)
    .fill("")
    .map(toChar)
    .map(withWidthFrom(state))
    .map(createColumn)
    .join("");

  rows.push(createRow(null, cols, {}));
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(columnsCount)
      .fill("")
      .map(createCell(state, row))
      .join("");
    rows.push(createRow(row + 1, cells, state.rowState));
  }

  return rows.join("");
}
