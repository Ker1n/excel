import { ExcelComponent } from "../../core/ExcelComponent";
import { $ } from "@core/dom";
import { changeTitle } from "../../core/store/actions";
import { defaultTitle } from "../../constants";
import { debounce } from "../../core/utils";

export class Header extends ExcelComponent {
  static className = "excel__header";
  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["input"],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
        <div class="header__input">
        <input type='text' value="${title}" />
    </div>

    <div class="header__btn button">
        <i class="material-icons">
            delete
        </i>
    </div>
    <div class="header__btn button">
        <i class="material-icons">
            exit_to_app
        </i>
    </div>`;
  }

  onInput(event) {
    const target = $(event.target);
    this.dispatch(changeTitle(target.text()));
  }
}
