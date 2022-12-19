import React, {PureComponent} from 'react';
import {Columns, IProduct} from "../../Types";
import {RootStoreContext} from "../../Context/StoreContext/RootStoreContext";
import ProductStore from "../../Stores/ProductStore";
import ListTable from "./ListTable";
import ListPagination from "./Pagination/ListPagination";
import {observer} from "mobx-react";
import FilterPicker from "../FilterPicker/FilterPicker";
import {action, makeObservable, observable} from "mobx";

const column: Columns<IProduct>[] = [
    {
        heading: "Title",
        selector: (data) => data.title
    },
    {
        heading: "Brand",
        selector: (data) => data.brand
    },
    {
        heading: "Price",
        selector: (data) => data.price
    },
    {
        heading: "Stock",
        selector: (data) => data.stock
    },
    {
        heading: "Category",
        selector: (data) => data.category
    }
]

class TestStore {
    @observable range: number = 0;
    @observable isAvailable: boolean = false;

    constructor() {
        makeObservable(this)
    }

    @action setRange = (value: number) => this.range = value;
    @action changeFlag = () => this.isAvailable = !this.isAvailable;
}

const testStore = new TestStore();

@observer
class FilterPickerList extends PureComponent<{}, {}> {

    context: React.ContextType<typeof RootStoreContext> | undefined
    static contextType = RootStoreContext;

    componentDidMount() {
        if (!this.context) return null
        this.context.productStore.listTableStore.fetchData();
        this.context.productStore.categories.fetchData();
    }

    render() {
        if (!this.context) return null
        const productStore: ProductStore = this.context.productStore;
        const listStore = productStore.listTableStore;
        const category = productStore.categories.list;
        if (category === null) return <>Loading...</>
        let product = listStore.list?.products ?? [];
        product = product.filter((e) => e.price > testStore.range);
        console.log(testStore.isAvailable)
        if (testStore.isAvailable) product = product.filter((e) => e.stock > 50);
        return (
            <div className='container'>
                <FilterPicker
                    changeRange={testStore.setRange}
                    changeFlag={testStore.changeFlag}
                    listStore={listStore}
                    filterList={[
                        {
                            type: "select",
                            name: "category",
                            options: category
                        },
                        {
                            type: "number",
                            name: "price"
                        },
                        {
                            type: "boolean",
                            name: "stock"
                        }
                    ]}
                />

                <ListPagination<ProductStore> store={productStore}>
                    <ListTable<IProduct>
                        list={product}
                        tableFormat={column}
                    />
                </ListPagination>
            </div>
        );
    }
}

export default FilterPickerList;
