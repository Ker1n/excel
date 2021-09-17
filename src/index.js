import { Excel } from "./components/excel/Excel";
import { Header } from "./components/Header/Header";
import { Toolbar } from "./components/toolbar/Toolbar";
import { Formula } from "./components/formula/Formula";
import { Table } from "./components/table/Table";

import { createStore } from "./core/store/createStore";
import { rootReducer } from "./core/store/rootReducer";
import { debounce, storage } from "./core/utils";
import { initialState } from "./core/store/initialState";

import "./scss/index.scss";

const store = createStore(rootReducer, initialState);

const stateListener = debounce((state) => {
  storage("excel-state", state);
}, 300);

store.subscribe(stateListener);

const excel = new Excel("#root", {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
