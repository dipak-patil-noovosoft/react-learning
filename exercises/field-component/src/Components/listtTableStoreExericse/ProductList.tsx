import React from 'react';
import {RootStoreContext} from "../../Context/StoreContext/RootStoreContext";
import {observer} from "mobx-react";
import MyList from "./MyList";

@observer
class ProductList extends React.Component<any, any> {

    context: React.ContextType<typeof RootStoreContext> | undefined
    static contextType = RootStoreContext;

    render() {
        if (!this.context) return null
        const productStore = this.context.productStore;
        if (!productStore.listTableStore.list) return null;
        return (
            <div>
                <h1>Dipak</h1>
                <MyList
                    list={productStore.listTableStore.list}
                    store={productStore}
                />
                <button
                    onClick={() => {
                        console.log('click')
                        productStore.listTableStore.setPage(productStore.listTableStore.page + 1)
                    }}>click
                </button>
                <button
                    onClick={() => {
                        console.log('click')
                        productStore.listTableStore.setPage(productStore.listTableStore.page - 1)
                    }}>click -
                </button>
            </div>
        );
    }
}

export default ProductList;