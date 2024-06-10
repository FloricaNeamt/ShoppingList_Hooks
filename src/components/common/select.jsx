import React from "react";

const Select = ({ name, label, options, value, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} style={{ fontSize: "1.5rem" }}>
        {label}
      </label>
      <select
        name={name}
        id={name}
        {...rest}
        className="form-control m-2"
        style={{ fontSize: "1.5rem" }}
      >
        {value === "" && <option value=""></option>}
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
