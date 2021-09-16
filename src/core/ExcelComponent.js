import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unSubscribers = [];

    this.prepare();
  }
  prepare() {}

  toHTML() {
    return "";
  }

  $emit(event, ...args) {
    const unSub = this.emitter.emit(event, ...args);
    this.unSubscribers.push(unSub);
  }

  $on(event, fn) {
    this.emitter.subscribe(event, fn);
  }

  dispatch(action) {
    this.store.dispatch(action);
  }
  
  storeChanged() {}

  isWatching(key) { 
    return this.subscribe.includes(key)
  }


  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unSubscribers.forEach((unSub) => unSub());
    this.storeSub.unSubscribe()
  }
}
