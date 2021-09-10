import { ExcelComponent } from "../../core/ExcelComponent";

export class Header extends ExcelComponent {
  static className = "excel__header";
  constructor($root, options) {
      super($root, {
          name: 'Header',
          ...options
      })
  }

  toHTML() {
    return `
        <div class="header__input">
        <input type='text' value='Новая Таблица' />
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
}
