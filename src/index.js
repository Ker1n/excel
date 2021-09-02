import {Excel} from "./components/excel/Excel";
import {Header} from "./components/Header/Header";
import {Toolbar} from "./components/toolbar/Toolbar";
import {Formula} from "./components/formula/Formula";
import {Table} from "./components/table/Table";

import "./scss/index.scss";

const excel = new Excel("#root", {
  components: [Header, Toolbar, Formula, Table],
});

excel.render();
