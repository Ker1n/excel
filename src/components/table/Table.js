import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { $ } from "@core/dom";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root) {
    super($root, {
      listeners: ["mousedown"],
    });
  }

  toHTML() {
    return createTable(35);
  }
  onMousedown(event) {
    //   console.log(event.target.getAttribute('data-resize'))
    if (event.target.dataset.resize) {
      const target = $(event.target);
      const parent = target.closest('[data-type="resizable"]');
      const coordinates = parent.getCoordinates();

      const cells = this.$root.findAll(`[data-col="${parent.data.col}"]`);

      document.onmousemove = (e) => { 
        const delta = e.pageX - coordinates.right;
        const value = coordinates.width + delta;
        parent.$el.style.width = value + "px";
        cells.forEach((el) => {
          el.style.width = value + "px";
        });
      };
      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}
