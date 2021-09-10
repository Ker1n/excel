import { $ } from "../../core/dom";
import { ExcelComponent } from "../../core/ExcelComponent";

export class Formula extends ExcelComponent {
  static className = "excel__formula";

  constructor($root, options) {
    super($root, {
      name: "Formula",
      listeners: ["input", "keydown"],
      ...options,
    });
  }

  toHTML() {
    return `
      <div class="formula__info">
        fx
      </div>
      <div class="formula__input"
        id='formula'
        contenteditable='true' 
        spellcheck="false"
      >
      </div
          `;
  }

  init() {
    super.init();
    this.$formula = this.$root.find("#formula");
    console.log(this.$formula);
    this.$on("table:select", ($cell) => {
      this.$formula.text($cell.text());
    });

    this.$on("table:input", ($cell) => {
      this.$formula.text($cell.text());
    });
  }

  onInput(event) {
    const text = $(event.target).text();
    this.$emit("formula:input", text);
  }

  onKeydown(event) {
    const keys = ["Enter", "Tab"];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit("formula:done");
    }
  }
}
