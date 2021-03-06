/**
 * DateInput
 *
 * Date Input control.
 */
import React from "react";
import PT from "prop-types";
import DatePicker from "react-datepicker";
import "./styles.module.scss";

const DateInput = (props) => {
  return (
    <div styleName="datepicker-wrapper">
      <DatePicker
        dateFormat="MM/dd/yyyy"
        placeholderText={props.placeholder}
        selected={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      />
    </div>
  );
};

DateInput.propTypes = {
  value: PT.string,
  onChange: PT.func.isRequired,
  placeholder: PT.string,
  onBlur: PT.func,
  onFocus: PT.func,
};

export default DateInput;
