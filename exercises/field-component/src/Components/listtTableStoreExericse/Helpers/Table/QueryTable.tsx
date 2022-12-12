import { observer } from "mobx-react-lite";

interface IQueryTableProps {
    queryResult: (string | number)[][];
}

function QueryTable(props: IQueryTableProps) {
    const { queryResult } = props;
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        {queryResult[0].map((e, index) => <th key={index}>----</th>)}
                    </tr>
                    {queryResult.map((queryRow, index) => (
                        <tr key={index}>
                            {queryRow.map((value, index) => (
                                <td key={index} className='py-1'>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default observer(QueryTable);