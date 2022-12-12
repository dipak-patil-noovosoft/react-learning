import React from 'react';
import {observer} from "mobx-react-lite";
import {Columns} from "../../../../../Types";

interface ITableRowProps<T> {
    data: T,
    tableCol: Columns<T>[];
}

function TableRows<T extends { id: number | string }>(props: ITableRowProps<T>) {
    const {data, tableCol} = props;
    return (
        <tr>
            {tableCol.map((e, index) => {
                return <td key={data.id.toString() + index.toString()}
                           className='py-1'>{e.selector(data)}</td>
            })}
        </tr>
    );
}

export default observer(TableRows);