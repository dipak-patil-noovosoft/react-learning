import React, {PureComponent} from 'react';
import {Columns, IProduct} from "../../Types";
import {RootStoreContext} from "../../Context/StoreContext/RootStoreContext";
import ProductStore, {IProductResponse} from "../../Stores/ProductStore";
import ListTable from "./ListTable";
import ListPagination from "./Pagination/ListPagination";
import {observer} from "mobx-react";
import FilterPicker from "../FilterPicker/FilterPicker";
import FilterPickerStore from "../../Stores/FilterPickerStore";
import {toJS} from "mobx";

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

const filterPickerStore = new FilterPickerStore();

@observer
class FilterPickerList extends PureComponent {

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
        let product = productStore.listTableStore.list?.products ?? [];
        const category = productStore.categories.list;
        if (category === null) return <>Loading...</>

        //Filtering COZ: Dummy-API
        if (filterPickerStore.filter.length) {
            product = product.filter((product) => (filterPickerStore.getCurrentValue('number')) ? product.price < (filterPickerStore.getCurrentValue('number')) : true)
            if (filterPickerStore.getCurrentValue('boolean')) product = product.filter(product => product.stock > 50);
        }
        return (
            <div className='container'>
                <FilterPicker<IProductResponse>
                    filterPickerStore={filterPickerStore}
                    listStore={productStore.listTableStore}
                    filterList={[
                        {
                            type: "select",
                            name: "category",
                            options: toJS(category),
                            defaultValue: "All"
                        },
                        {
                            type: "number",
                            name: "price",
                            defaultValue: 0
                        },
                        {
                            type: "boolean",
                            name: "stock",
                            defaultValue: false
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
