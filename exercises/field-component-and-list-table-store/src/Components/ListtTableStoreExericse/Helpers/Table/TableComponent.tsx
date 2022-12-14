import React from 'react';
import TableRows from "./TableRows/TableRows";
import {observer} from "mobx-react-lite";
import {Columns} from "../../../../Types";
import {Table} from "reactstrap";

interface ITableProps<T> {
    tableContent: T[];
    tableCol: Columns<T>[];
}


function TableComponent<T extends { id: string | number }>(props: ITableProps<T>) {
    const {tableContent, tableCol} = props;
    return (
        <div>
            <Table className='w-100 m-0'  bordered hover>
                <tbody>
                <tr>
                    {tableCol.map((e, index) => <th key={index}>{e.heading}</th>)}
                </tr>
                {tableContent.map((e, index) => {
                    return <TableRows key={index} data={e} tableCol={tableCol}/>
                })}
                </tbody>
            </Table>
        </div>
    );
}

export default observer(TableComponent);