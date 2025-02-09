const FilterFields = ({
    outerDiv = "flex h-[40px] items-center justify-start gap-2",
    labelHTML, labelClass = "font-medium mb-2 w-[28%] text-left",
    labelTag,
    selectID,
    selectClass = "p-2 border rounded w-[50%] cursor-pointer",
    options,
    value,
    onChange
}) => {
    return (
        <div className={outerDiv}>
            <label htmlFor={labelHTML} className={labelClass}>{labelTag}</label>
            <select
                id={selectID}
                className={selectClass}
                value={value}
                onChange={onChange}
            >
                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))};
            </select>
        </div>
    );
}

export default FilterFields;