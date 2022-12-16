import React from 'react';
import {RootStoreContext} from "../../Context/StoreContext/RootStoreContext";
import {observer} from "mobx-react";
import {Columns, IProduct} from "../../Types";
import ProductStore from "../../Stores/ProductStore";
import {Input} from "reactstrap";
import FormStore from "../../Stores/FormStore";
import Field from "../FielComponentExericse/Field/Field";
import Select from "../FielComponentExericse/select/Select";
import ListPagination from "./Pagination/ListPagination";
import ListTable from "./ListTable";
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
        heading: "Category",
        selector: (data) => data.category
    }
]

const productListFormData = {query: '', select: "All"}

const formStore = new FormStore(productListFormData);

@observer
class ProductList extends React.Component<any, any> {

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
        // @ts-ignore
        window.___lst = toJS(productStore)
        const productList = productStore.listTableStore.list;
        const category = productStore.categories.list;
        if (productList === null) return <>Loading...</>
        if (category === null) return <>Loading...</>
        const product = productList.products;
        return (
            <div className='container'>
                <h1 className='text-center'>Product</h1>
                <Field
                    name='query'
                    label="Search"
                    formStore={formStore}
                    required={true}
                    render={(onChange, value, required) => {
                        return (<>
                            <Input
                                value={value}
                                required={required}
                                onChange={(e) => {
                                    onChange(e.target.value as string)
                                    productStore.listTableStore.setSearchQuery(e.target.value);
                                    productStore.listTableStore.setPage(0);
                                }}
                            />
                        </>)
                    }}
                />
                <Field
                    name='select'
                    label='Select'
                    required={false}
                    formStore={formStore}
                    render={(onChange, value, required, isDisabled) => {
                        return <Select
                            value={value}
                            onChange={onChange}
                            isDisabled={isDisabled}
                            onSearch={productStore.listTableStore.setFilter}
                            options={
                                ["All", ...category].map((e) => {
                                    return {key: e, value: e}
                                })
                            }
                        />
                    }}
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

export default ProductList;