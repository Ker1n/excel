import {ExcelComponent} from "../../core/ExcelComponent";

export class Table extends ExcelComponent {
    static className = 'excel__table';

    toHTML() {
        return `
        <div class="table__row">
        <div class="table__row-info">
        </div>
        <div class="table__row-data">
            <div class="table__column">
                A
            </div>
            <div class="table__column">
                B
            </div>
            <div class="table__column">
                C
            </div>
            <div class="table__column">
                D
            </div>
            <div class="table__column">
                E
            </div>
        </div>
    </div>

    <div class="table__row">
        <div class="table__row-info">
            1
        </div>
        <div class="table__row-data">
            <div class="table__cell selected" contenteditable="true">
                A1
            </div>
            <div class="table__cell" contenteditable="true">
                B1
            </div>
            <div class="table__cell" contenteditable="true">
                C1
            </div>
        </div>
    </div>
    <div class="table__row">
        <div class="table__row-info">
            1
        </div>
        <div class="table__row-data">
            <div class="table__cell selected">
                A1
            </div>
            <div class="table__cell">
                B1
            </div>
            <div class="table__cell">
                C1
            </div>
        </div>
    </div>
    <div class="table__row">
        <div class="table__row-info">
            1
        </div>
        <div class="table__row-data">
            <div class="table__cell selected">
                A1
            </div>
            <div class="table__cell">
                B1
            </div>
            <div class="table__cell">
                C1
            </div>
        </div>
    </div>
        `
    }
}
