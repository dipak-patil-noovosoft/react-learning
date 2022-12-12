import React from 'react';
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { RootStoreContext } from "../../../../../../../../../../SQL_WEB/src/Context/RootStoreContext";
import type RootStore from "../../../../../../../../../../SQL_WEB/src/Stores/RootStore";

interface ITableRowProps<T> {
    data: T,
    tableCol: {
        heading: string,
        selector: (data: T, rootStore: RootStore) => React.ReactNode
    }[];
}

function TableRows<T extends { id: string | number }>(props: ITableRowProps<T>) {
    const rootStore = useContext(RootStoreContext);
    const { data, tableCol } = props;
    return (
        <tr>
            {tableCol.map((e, index) => {
                return <td key={data.id.toString() + index.toString()} className='py-1'>{e.selector(data, rootStore)}</td>
            })}
        </tr>
    );
}

export default observer(TableRows);