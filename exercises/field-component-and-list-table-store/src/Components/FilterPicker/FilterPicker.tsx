import React, {Component} from 'react';
import Select from "../FielComponentExericse/select/Select";
import {Button, Input, Label} from "reactstrap";
import FilterPickerStore, {IFilter} from "../../Stores/FilterPickerStore";
import {observer} from "mobx-react";
import ListTableStore from "../../Stores/ListTableStore";
import {toJS} from "mobx";


interface IFilterPickerProps<T> {
    listStore: ListTableStore<T>
    filterList: Omit<IFilter, 'isSelected'>[];
    filterPickerStore: FilterPickerStore
}


@observer
class FilterPicker<T, > extends Component<IFilterPickerProps<T>, {}> {
    componentDidMount() {
        this.props.filterPickerStore.setFilterList(this.props.filterList.map((e) => ({...e, isSelected: false})))
    }

    render() {
        const {listStore, filterPickerStore} = this.props;

        //@ts-ignore
        window._filterPickerStore = toJS(filterPickerStore);

        function selectFilter(type: string, options: any) {
            if (type === 'select') {
                return <Select
                    onChange={(value) => filterPickerStore.setCurrentSelectedOption('select', value)}
                    value={filterPickerStore.getCurrentValue('select') as string}
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
                    value={(filterPickerStore.getCurrentValue('number') as number).toString()}
                    placeholder='Enter Range'
                    onChange={(e) => {
                        filterPickerStore.setCurrentSelectedOption('number', +e.target.value)
                    }}
                />

            if (type === 'boolean') {
                return <div>
                    <Input
                        type="checkbox"
                        checked={filterPickerStore.getCurrentValue('boolean') as boolean}
                        onChange={
                            () =>
                                filterPickerStore.setCurrentSelectedOption('boolean', !(filterPickerStore.getCurrentValue('boolean') as boolean))
                        }/>
                    <Label>In Stock</Label>
                </div>
            }
        }

        return (
            <div>
                <h1>FilterPicker</h1>
                <div>
                    <Select
                        onChange={(value) => {
                            filterPickerStore.setCurrentFilter(value)
                        }}
                        value={(filterPickerStore.currentSelected as string) ?? ''}
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
                        disabled={filterPickerStore.currentSelected === null || filterPickerStore.currentSelected === 'select filter'}
                        onClick={() => filterPickerStore.addFilter(filterPickerStore.currentSelected as string)}>Add
                    </Button>
                </div>
                <div>
                    {filterPickerStore.selectedFilter.map((filter) => {
                        return <div key={filter.name} className='my-2'>{selectFilter(filter.type, filter.options)}</div>
                    })}
                </div>
            </div>

        );
    }
}

export default FilterPicker;