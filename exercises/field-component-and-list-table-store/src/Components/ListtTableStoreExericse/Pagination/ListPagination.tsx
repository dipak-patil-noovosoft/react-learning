import React from 'react';
import {Button, Pagination, PaginationItem} from "reactstrap";
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
            <div className=''>
                {this.props.children}
                <Pagination
                    className='my-2'
                    aria-label="Page navigation example"
                    size="lg"
                >
                    <div className='w-100 d-flex justify-content-between '>
                        <PaginationItem>
                            <Button
                                color='primary'
                                outline
                                disabled={store.listTableStore.page === 0}
                                onClick={() => store.listTableStore.setPage(store.listTableStore.page - 1)}
                            >Previous
                            </Button>
                        </PaginationItem>
                        <div>
                            <Button
                                disabled={true}
                                color='primary'
                                outline
                            >Page : {store.listTableStore.page + 1}</Button>
                        </div>
                        <PaginationItem>
                            <Button
                                color='primary'
                                outline
                                disabled={store.listTableStore.page >= store.listTableStore.totalPages - 1}
                                onClick={() => store.listTableStore.setPage(store.listTableStore.page + 1)}
                            >Next
                            </Button>
                        </PaginationItem>
                    </div>

                </Pagination>
            </div>
        );
    }
}

export default ListPagination;