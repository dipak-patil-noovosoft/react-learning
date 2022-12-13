import {browserHistory, createRouterState, HistoryAdapter, RouterStore} from "mobx-state-router";

export const routes = [
    {
        name: "home",
        pattern: "/"
    },
    {
        name: "multiInputForm",
        pattern: "/multi-input-form"
    },
    {
        name: "listTableStore",
        pattern: "/list-table-store"
    }
]
const notFound = createRouterState('notFound');

export function initRouter() {
    const routerStore = new RouterStore(routes, notFound);
    const historyAdapter = new HistoryAdapter(routerStore, browserHistory);
    historyAdapter.observeRouterStateChanges();
    return routerStore;
}