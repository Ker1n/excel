import { ExcelComponent } from "../../core/ExcelComponent";

export class Formula extends ExcelComponent {
  static className = "excel__formula";

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: [
        `input`,
        'click'
      ]
    })
  }

  toHTML() {
    return `
        <div class="formula__info">
                    fx
                </div>
                <div class="formula__input">
                    <input type="text" 
                    contenteditable='true' 
                    spellcheck="false">
                </div>
                `;
  }

  onInput(event) {
    console.log('in Input Formula ', event.target.value)
  }
  onClick() {
    console.log('lsd');
  }
}
