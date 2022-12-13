import React from 'react';
import {observer} from "mobx-react";
import Table from "./Helpers/Table/Table";
import {Columns} from "../../Types";

interface IListProps<T> {
    list: T[]
    tableFormat: Columns<T>[]
}

@observer
class ListTable<T extends { id: string | number }> extends React.Component<IListProps<T>, any> {
    render() {
        const {list, tableFormat} = this.props;
        if (list === null) return <>loading...</>
        return (
            <div>
                <ul>
                    <Table tableCol={tableFormat} tableContent={list}/>
                </ul>
            </div>
        );
    }
}

export default ListTable;