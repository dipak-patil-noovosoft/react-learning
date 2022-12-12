import React from 'react';
import {IProduct} from "../../Types";
import ProductStore from "../../Stores/ProductStore";

interface IListProps {
    list: IProduct[] | null,
    store: ProductStore
}

class List extends React.Component<IListProps, any> {

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default List;