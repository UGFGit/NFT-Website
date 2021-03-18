import React, { ReactNode } from 'react';
import '../static/styles/multiple-group.scss';
import DeleteIcon from '../static/images/delete-black-btn.png';

interface MultipleGroupProps{
    values: any[];
    renderItem: (value: any, index: number) => ReactNode;
    handleAdd: (value: any) => void;
    handleRemove: (value: any) => void;
    defaultValue: any;
}

function MultipleGroup({ values, renderItem, defaultValue, handleAdd, handleRemove }: MultipleGroupProps){

    const onAdded = () => {
        let newValues = values.slice();
        newValues.push(defaultValue);
        handleAdd(newValues);
    }

    const onDelete = (index: number) => {
        let newValues = values.slice();
        delete newValues[index];
        handleRemove(newValues.filter(value => Boolean(value)));
    }

    return(
        <div className = "multiple-group-root">
            {values.map((value, index) => (
                <div key = {index} className = "multiple-group-items-wrap">
                    <div className = "divader"/>
                    {renderItem(value, index)}
                    <div onClick = {() => onDelete(index)} className = "multiple-group-items-remove-btn">
                        <img alt ="" src = {DeleteIcon}/>
                    </div>
                </div>
            ))}
            <button onClick = {onAdded} className = "multiple-group-added-btn">
                Add one more
            </button>
        </div>
    )
}

export default MultipleGroup;