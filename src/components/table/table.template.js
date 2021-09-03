const CHAR_CODES = {
  A: 65,
  Z: 90,
};

function createCell() {
  return `<div class="table__cell" contenteditable="true"></div>`;
}

function createColumn(column) {
  return `<div class="table__column">${column}</div>`;
}

function createRow(index, content) {
  return `
    <div class="table__row">
        <div class="table__row-info">${index ? index : ""}</div>
        <div class="table__row-data">${content}</div>
    </div>
    `;
}

export function createTable(rowsCount = 20) {
  const columnsCount = CHAR_CODES.Z - CHAR_CODES.A + 1;
  const rows = [];

  const cols = new Array(columnsCount)
    .fill('')
    .map((_, index) => String.fromCharCode(CHAR_CODES.A + index))
    .map((el) => createColumn(el))
    .join('');


  rows.push(createRow(null, cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(columnsCount)
        .fill('')
        .map((el) => createCell(el))
        .join('')
    rows.push(createRow(i + 1, cells));
  }
console.log(rows)
  return rows.join('');
}
