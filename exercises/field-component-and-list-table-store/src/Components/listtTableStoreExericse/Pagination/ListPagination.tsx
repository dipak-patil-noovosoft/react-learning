import React from 'react';
import {Button} from "reactstrap";
import {observer} from "mobx-react";
import ListTableStore from "../../../Stores/ListTableStore";

interface IPaginationProps<T> {
    store: T
    children: React.ReactNode;
}

@observer
class ListPagination<T extends { listTableStore: ListTableStore<unknown> }> extends React.Component<IPaginationProps<T>, any> {
    render() {
        const {store} = this.props;
        return (
            <div>
                {this.props.children}
                <Button
                    className='mx-2 btn-success'
                    disabled={store.listTableStore.page === 0}
                    onClick={() => {
                        store.listTableStore.setPage(store.listTableStore.page - 1)
                    }}> -
                </Button>
                <Button
                    className='mx-2 btn-success'
                    disabled={store.listTableStore.page === store.listTableStore.total - 1}
                    onClick={() => {
                        store.listTableStore.setPage(store.listTableStore.page + 1)
                    }}> +
                </Button>
            </div>
        );
    }
}

export default ListPagination;