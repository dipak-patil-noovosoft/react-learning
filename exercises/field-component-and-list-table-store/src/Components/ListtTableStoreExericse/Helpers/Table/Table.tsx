import React from 'react';
import TableRows from "./TableRows/TableRows";
import {observer} from "mobx-react-lite";
import {Columns} from "../../../../Types";

interface ITableProps<T> {
    tableContent: T[];
    tableCol: Columns<T>[];
}


function Table<T extends { id: string | number }>(props: ITableProps<T>) {
    const {tableContent, tableCol} = props;
    return (
        <div>
            <table>
                <tbody>
                <tr>
                    {tableCol.map((e, index) => <th key={index}>{e.heading}</th>)}
                </tr>
                {tableContent.map((e, index) => {
                    return <TableRows key={index} data={e} tableCol={tableCol}/>
                })}
                </tbody>
            </table>
        </div>
    );
}

export default observer(Table);