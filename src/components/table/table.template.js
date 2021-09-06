const CHAR_CODES = {
  A: 65,
  Z: 90,
};

function createCell(_, column) {
  return `<div class="table__cell" 
          contenteditable="true" 
          data-col="${column}"
          ></div>`;
}

function createColumn(column, index) {
  return `
        <div class="table__column" data-type="resizable" data-col="${index}">
          ${column}
          <div class="col-resize" data-resize="col"></div>
        </div>
        `;
}

function createRow(index, content) {
  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : "";
  return `
    <div class="table__row">
        <div class="table__row-info">
        ${index ? index : ""}
        ${resize}
        </div>
        <div class="table__row-data">${content}</div>
    </div>
    `;
}

export function createTable(rowsCount = 20) {
  const columnsCount = CHAR_CODES.Z - CHAR_CODES.A + 1;
  const rows = [];

  const cols = new Array(columnsCount)
    .fill("")
    .map((_, index) => String.fromCharCode(CHAR_CODES.A + index))
    .map((el, index) => createColumn(el, index))
    .join("");

  rows.push(createRow(null, cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(columnsCount)
      .fill("")
      .map((el, index) => createCell(el, index))
      .join("");
    rows.push(createRow(i + 1, cells));
  }

  return rows.join("");
}
