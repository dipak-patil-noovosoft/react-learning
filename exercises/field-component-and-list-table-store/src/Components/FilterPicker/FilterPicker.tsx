import React, {Component} from 'react';
import Select from "../FielComponentExericse/select/Select";
import {Button, Input, Label} from "reactstrap";
import {toJS} from "mobx";
import FilterPickerStore from "../../Stores/FilterPickerStore";
import {observer} from "mobx-react";
import ListTableStore from "../../Stores/ListTableStore";


interface IFilterPickerProps {
    changeRange: (value: number) => void
    changeFlag: () => void
    listStore: ListTableStore<any>
    filterList: { type: string, name: string, options?: any[] }[];
}

const filterPickerStore = new FilterPickerStore();

@observer
class FilterPicker extends Component<IFilterPickerProps, {}> {
    componentDidMount() {
        filterPickerStore.setFilterList(this.props.filterList.map((e) => ({...e, isSelected: false})))
    }

    render() {
        const {listStore, changeRange, changeFlag} = this.props;

        function selectFilter(type: string, options: any) {
            if (type === 'select') {
                return <Select
                    onChange={(value) => filterPickerStore.setCurrentSelectedOption(value)}
                    value={filterPickerStore.currentSelectedOption}
                    onSearch={listStore.setFilter}
                    options={
                        ["All", ...options].map((e) => {
                            return {key: e, value: e}
                        })
                    }/>
            }
            if (type === 'number')
                return <Input
                    type='number'
                    placeholder='Enter Range'
                    onChange={(e) => {
                        changeRange(+e.target.value)
                    }}
                />

            if (type === 'boolean') {
                return <>
                    <Input type="checkbox" onClick={changeFlag}/>
                    <Label>In Stock</Label>
                </>
            }
        }

        // @ts-ignore
        window.__form = toJS(filterPickerStore);
        return (
            <div>
                <h1>FilterPicker</h1>
                <div>
                    <Select
                        onChange={(value) => {
                            filterPickerStore.setCurrentFilter(value)
                        }}
                        value={filterPickerStore.currentSelected?.name as string}
                        options={
                            [{
                                name: "select filter",
                                isSelected: false
                            }, ...filterPickerStore.filter].filter(e => !e.isSelected).map(e => ({
                                key: e.name,
                                value: e.name
                            }))
                        }/>
                    <Button
                        onClick={() => filterPickerStore.addFilter(filterPickerStore.currentSelected?.name)}>Add</Button>
                </div>
                <div>
                    {filterPickerStore.selectedFilter.map((filter) => {
                        return <div key={filter.name}>{selectFilter(filter.type, filter.options)}</div>
                    })}
                </div>
            </div>

        );
    }
}

export default FilterPicker;