import React from "react";

const FilterSection = ({ iconURL, labelName, options, selectedValue, onChange, placeholder }) => {
    return (
        <div className="filter-section">
            <div className="thumb">
                <img src={iconURL} alt={labelName} />
            </div>
            <span className="type">{labelName}</span>
            <select className="select-bar" value={selectedValue} onChange={onChange}>
                <option value="" disabled>{placeholder}</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
    );
};

export default FilterSection;
