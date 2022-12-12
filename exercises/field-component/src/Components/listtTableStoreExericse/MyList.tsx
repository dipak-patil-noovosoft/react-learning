import React from 'react';
import {IProduct} from "../../Types";
import ProductStore from "../../Stores/ProductStore";

interface IListProps {
    list: IProduct[] | null,
    store: ProductStore
}

class List extends React.Component<any, any> {
    constructor(props: IListProps) {
        super(props);
    }

    render() {
        return (
            <div>ok</div>
        );
    }
}

export default List;