import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} style={{ fontSize: "1.5rem" }} className="mb-3">
        {label}
      </label>
      <input
        {...rest}
        name={name}
        id={name}
        className="form-control m-2"
        style={{ fontSize: "1.5rem" }}
      />
      {error && <div className="alert alert-ganger">{error}</div>}
    </div>
  );
};

export default Input;
