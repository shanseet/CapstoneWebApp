import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function DateSelect(props) {

    return (
        <div className="mb-3" style={{ position: "relative" }}>
            <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={props.start}
                onChange={start => props.setStart(start)}
                isClearable
                placeholderText="start date"
                maxDate={props.end}
                showDisabledMonthNavigation
            />
            &nbsp; to &nbsp;
            <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={props.end}
                onChange={end => props.setEnd(end)}
                isClearable
                placeholderText="end date"
                minDate={props.start}
                showDisabledMonthNavigation
            />
            &nbsp;
            <button className="btn btn-outline-secondary btn-sm" onClick={props.handleFilter}>
                <i className="fa fa-filter"></i>
            </button>
        </div>
    )
}

export default DateSelect;