import React from 'react';
import {RootStoreContext} from "../../Context/StoreContext/RootStoreContext";
import {observer} from "mobx-react";
import MyList from "./MyList";
import {Columns, IProduct} from "../../Types";
import ProductStore from "../../Stores/ProductStore";
import {Button} from "reactstrap";

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

@observer
class ProductList extends React.Component<any, any> {

    context: React.ContextType<typeof RootStoreContext> | undefined
    static contextType = RootStoreContext;

    render() {
        if (!this.context) return null
        const productStore: ProductStore = this.context.productStore;
        const productList = productStore.listTableStore.list;
        if (productList === null) return <>Loading...</>
        return (
            <div>
                <MyList<IProduct>
                    list={productList}
                    tableFormat={column}
                />
                <Button
                    className='mx-2 btn-success'
                    disabled={productStore.listTableStore.page === 0}
                    onClick={() => {
                        console.log('click')
                        productStore.listTableStore.setPage(productStore.listTableStore.page - 1)
                    }}> -
                </Button>
                <Button
                    className='mx-2 btn-success'
                    onClick={() => {
                        console.log('click')
                        productStore.listTableStore.setPage(productStore.listTableStore.page + 1)
                    }}> +
                </Button>
            </div>
        );
    }
}

export default ProductList;