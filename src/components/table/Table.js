import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from "@/components/table/table.resize";
import { shouldResize } from "@/components/table/table.functions";
import { TableSelection } from "./TableSelection";
import { isCell, matrix, nextSelector } from "./table.functions";
import { $ } from "../../core/dom";
import * as actions from "@core/store/actions";
import { defaultStyles } from "../../constants";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      ...options,
    });
  }

  toHTML() {
    return createTable(100, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell);

    this.$on("formula:input", (text) => {
      this.selection.current.text(text);
    });

    this.$on("formula:done", (text) => {
      this.selection.current.focus();
      this.updateTextInStore(text);
    });

    this.$on("toolbar:applyStyle", (style) => {
      this.selection.applyStyle(style);
      this.dispatch(
        actions.applyStyle({
          value: style,
          ids: this.selection.selectedIds
        })
      );
    });

    // this.subscribe((state) => state);
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit("table:select", $cell);

    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.dispatch(actions.changeStyles(styles));
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.dispatch(actions.tableResize(data));
    } catch (error) {
      console.warn(error.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      "Enter",
      "Tab",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
      "ArrowLeft",
    ];
    const { key } = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  updateTextInStore(value) {
    this.dispatch(
      actions.changeText({
        id: this.selection.current.id(),
        value,
      })
    );
  }

  onInput(event) {
    // this.$emit("table:input", $(event.target));
    this.updateTextInStore($(event.target).text());
  }
}
